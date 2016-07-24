import Realm from 'realm';

export default {
  name: 'Type',
  primaryKey: 'name',
  properties: {
    name: 'string',
    weaknesses: {type: 'list', objectType: 'Type'},
    strengths: {type: 'list', objectType: 'Type'},
    immunes: {type: 'list', objectType: 'Type'},
  },
};
