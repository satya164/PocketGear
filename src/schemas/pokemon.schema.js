import Realm from 'realm';

export default {
  name: 'Pokemon',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    image: 'string',
    description: 'string',
    type: {type: 'list', objectType: 'Type'},
  },
};
