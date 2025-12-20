import type { ImageSourcePropType } from 'react-native';

const spriteContext = require.context('../data/sprites', false, /\.png$/);

const spriteMap: Record<number, ImageSourcePropType> = {};

spriteContext.keys().forEach((key: string) => {
  // Extract ID from filename like "./1.png" -> 1
  const match = key.match(/\.\/(\d+)\.png$/);
  if (match) {
    const id = parseInt(match[1], 10);
    spriteMap[id] = spriteContext(key);
  }
});

export function getSprite(id: number): ImageSourcePropType | undefined {
  return spriteMap[id];
}

export default spriteMap;
