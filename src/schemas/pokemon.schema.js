/* @flow */

export default {
  name: 'Pokemon',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    description: 'string',
    type: { type: 'list', objectType: 'Type' },
  },
};
