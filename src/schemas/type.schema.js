import Realm from 'realm';

export default {
  name: 'Type',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    vulnerableTo: {type: 'list', objectType: 'Type'},
    resistantTo: {type: 'list', objectType: 'Type'},
  },
};
