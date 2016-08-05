/* @flow */

export default {
  name: 'Pokemon',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    type: {
      type: 'list',
      objectType: 'Type',
    },
    description: 'string',
    category: 'string',
    max_cp: 'int',
    max_hp: 'int',
    stamina: 'int',
    attack: 'int',
    defense: 'int',
    capture_rate: 'float',
    flee_rate: 'float',
    height: 'Height',
    weight: 'Weight',
    evolution_chain: {
      type: 'list',
      objectType: 'Evolution',
    },
  },
};
