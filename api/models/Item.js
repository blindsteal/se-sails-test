/**
* Item.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      name: 'string',
      desc: 'string',
      level: 'integer',

      intentions: {
          collection: 'intention',
          via: 'items',
          dominant: true
      },

      scores: {
          collection: 'caScore',
          via: 'item'
      },

      parent: {
          model: 'item'
      },

      children: {
          collection: 'item',
          via: 'parent'
      }

  }
};

