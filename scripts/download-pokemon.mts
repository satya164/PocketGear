/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from 'fs';
import * as path from 'path';

import type { Pokemon, PokemonType } from '../src/types';

const OUTPUT_DIR = path.join(import.meta.dirname, '..', 'data');
const SPRITES_DIR = path.join(OUTPUT_DIR, 'sprites');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'pokemon.json');

function capitalize(s: string) {
  return s
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function getId(url: string) {
  return parseInt(url.split('/').filter(Boolean).pop()!);
}

async function getItemName(
  url: string,
  cache: Map<string, string>
): Promise<string> {
  if (cache.has(url)) {
    return cache.get(url)!;
  }

  const item = await fetch(url).then((r) => r.json());

  const name =
    item.names.find((n: any) => n.language.name === 'en')?.name ||
    capitalize(item.name);

  cache.set(url, name);

  return name;
}

async function processPokemon(
  id: number,
  chains: Map<string, any>,
  items: Map<string, string>,
  allIds: Set<number>
): Promise<Pokemon> {
  console.log(`Processing Pokemon #${id}...`);

  const [poke, species] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((r) => r.json()),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((r) =>
      r.json()
    ),
  ]);

  const chainUrl = species.evolution_chain.url;

  if (!chains.has(chainUrl)) {
    const chain = await fetch(chainUrl).then((r) => r.json());
    chains.set(chainUrl, chain.chain);
  }

  const chain = chains.get(chainUrl);

  // Build evolution data
  const evolution: { parent?: number; children?: any[] } = {};

  const findEvolution = async (node: any, parentId?: number): Promise<void> => {
    const nodeId = getId(node.species.url);

    if (nodeId === id && parentId) {
      evolution.parent = parentId;
    }

    if (nodeId === id && node.evolves_to.length > 0) {
      evolution.children = (
        await Promise.all(
          node.evolves_to.map(async (evo: any) => {
            const evoId = getId(evo.species.url);

            if (!allIds.has(evoId)) {
              return null;
            }

            const details = evo.evolution_details[0] || {};

            const triggerName = details.trigger?.name;
            let trigger: 'level-up' | 'trade' | 'use-item' | 'other';

            if (triggerName === 'level-up') {
              trigger = 'level-up';
            } else if (triggerName === 'trade') {
              trigger = 'trade';
            } else if (triggerName === 'use-item') {
              trigger = 'use-item';
            } else {
              trigger = 'other';
            }

            const child: any = { id: evoId, trigger };

            if (details.min_level) {
              child.min_level = details.min_level;
            }

            if (details.min_happiness) {
              child.min_happiness = details.min_happiness;
            }

            if (
              details.time_of_day === 'day' ||
              details.time_of_day === 'night'
            ) {
              child.time_of_day = details.time_of_day;
            }

            if (details.item) {
              child.item = await getItemName(details.item.url, items);
            }

            if (details.held_item) {
              child.held_item = await getItemName(details.held_item.url, items);
            }

            return child;
          })
        )
      ).filter(Boolean);
    }

    for (const evo of node.evolves_to) {
      await findEvolution(evo, nodeId);
    }
  };

  await findEvolution(chain);

  const getStat = (statName: string) => {
    const stat = poke.stats.find((s: any) => s.stat.name === statName);

    if (!stat) {
      throw new Error(`Missing stat '${statName}' for Pokemon #${id}`);
    }

    return stat.base_stat;
  };

  const name = species.names.find((n: any) => n.language.name === 'en')?.name;

  if (!name) {
    throw new Error(`Missing English name for Pokemon #${id}`);
  }

  const category = species.genera.find(
    (g: any) => g.language.name === 'en'
  )?.genus;

  if (!category) {
    throw new Error(`Missing category for Pokemon #${id}`);
  }

  const flavorText = species.flavor_text_entries.find(
    (e: any) => e.language.name === 'en'
  )?.flavor_text;

  if (!flavorText) {
    throw new Error(`Missing description for Pokemon #${id}`);
  }

  const types = poke.types
    .sort((a: any, b: any) => a.slot - b.slot)
    .map((t: any) => capitalize(t.type.name) as PokemonType);

  const hasEvolution = evolution.parent || evolution.children?.length;

  return {
    id,
    name,
    types,
    category,
    description: flavorText.replace(/\n|\f/g, ' ').trim(),
    height: poke.height / 10,
    weight: poke.weight / 10,
    stats: {
      hp: getStat('hp'),
      attack: getStat('attack'),
      defense: getStat('defense'),
      special_attack: getStat('special-attack'),
      special_defense: getStat('special-defense'),
      speed: getStat('speed'),
    },
    ...(hasEvolution ? { evolution } : {}),
    capture_rate: species.capture_rate,
    is_legendary: species.is_legendary,
    is_mythical: species.is_mythical,
    generation: getId(species.generation.url),
  };
}

async function downloadSprite(id: number): Promise<void> {
  const filepath = path.join(SPRITES_DIR, `${id}.png`);

  if (fs.existsSync(filepath)) {
    return;
  }

  const response = await fetch(
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  );

  if (response.ok) {
    fs.writeFileSync(filepath, new Uint8Array(await response.arrayBuffer()));
    console.log(`Downloaded sprite #${id}`);
  }
}

async function main(): Promise<void> {
  fs.mkdirSync(SPRITES_DIR, { recursive: true });

  const limit = process.argv[2] ? parseInt(process.argv[2], 10) : undefined;

  const { count: totalCount } = await fetch(
    'https://pokeapi.co/api/v2/pokemon-species?limit=1'
  ).then((r) => r.json());

  const count = limit || totalCount;

  console.log(`Downloading ${count} Pokemon...`);

  const pokemon: Pokemon[] = [];
  const chains = new Map<string, any>();
  const items = new Map<string, string>();
  const allIds = new Set(Array.from({ length: count }, (_, i) => i + 1));

  for (let id = 1; id <= count; id++) {
    try {
      pokemon.push(await processPokemon(id, chains, items, allIds));
      await downloadSprite(id);
    } catch (e) {
      console.error(`Error #${id}:`, (e as Error).message);
    }
  }

  pokemon.sort((a, b) => a.id - b.id);

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(pokemon, null, 2));

  console.log(`Saved ${pokemon.length} Pokemon to ${OUTPUT_FILE}`);
}

main();
