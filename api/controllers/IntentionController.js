/**
 * IntentionController
 *
 * @description :: Server-side logic for managing Intentions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    topattributes: function(req, res){
        Intention.getTopAttributes({id: req.param('id')}, function(err, attributes){
            res.send(attributes);
        });
    }
	
};

