/* @flow */

export default {
  name: 'Pokemon',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    type: { type: 'list', objectType: 'Type' },
    description: 'string',
    category: 'string',
    max_cp: 'int',
    max_hp: 'int',
  },
};
