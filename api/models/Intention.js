/**
* Intention.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var _ = require('lodash');

module.exports = {

    attributes: {
        name: 'string',
        desc: 'string',
        subject: 'string',
        predicate: 'string',

        items: {
            collection: 'item',
            via: 'intentions'
        }

    },

    getTopAttributes: function(opts, cb){
        var id = opts.id;
        Intention.findOne(id).populate('items').exec(function(error, intention){
            var attributes = [];
            async.each(intention.items, function(item, asyncCb){
                Item.findOne(item.id).populate('scores').exec(function (errorIt, itemPop){
                    async.each(itemPop.scores, function(score, asyncCb2){
                        CaScore.findOne(score.id).populate('attribute').exec(function (errorSc, scorePop){
                            attributes.push(scorePop.attribute);
                            asyncCb2();
                        });
                    }, function(err2){
                        asyncCb();
                    });
                });
            }, function(err){

                //TODO: count & return top

                cb(null, attributes);
            });
        });
    }
};

