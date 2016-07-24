import db from './db';
import pokemons from './data.json';
import types from './types.json';

export default function fill() {
  db.write(() => {
    const types = db.objects('Type')
    const pokemons = db.objects('Pokemon');
    db.delete(types);
    db.delete(pokemons);
  });

  if (db.objects('Type').length === 0) {
    db.write(() => {
      types.forEach(type => {
        db.create('Type', {
          name: type.name,
          immunes: type.immunes.map(i => ({name: i})),
          weaknesses: type.weaknesses.map(i => ({name: i})),
          strengths: type.strengths.map(i => ({name: i})),
        }, true);
      });
    });
  }

  if (db.objects('Pokemon').length === 0) {
    db.write(() =>
      pokemons.forEach(pokemon => {
        db.create('Pokemon', {
          id: pokemon.index,
          name: pokemon.name,
          image: pokemon.image,
          type: pokemon.types.map(t => ({name: t})),
          description: pokemon.description,
        }, true)
      })
    );
  }
}
