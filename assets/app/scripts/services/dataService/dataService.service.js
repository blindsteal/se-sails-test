'use strict';

angular.module('finanzomatApp')
  .factory('dataService', function ($http, $sails) {
        var data = {
            intentions: [],
            attributes: [],
            items: [],
            individuals: [] 
        };

        var update = function(model) {
            $sails.get('/'+model).success(function(response){
                console.log(model+' connected: '+JSON.stringify(response));

                data[model+'s'] = response;

                $sails.on(model, function(message){
                    console.log('Received message: '+JSON.stringify(message));

                });
            }).error(function(response){
                console.log('Unable to get '+JSON.stringify(response));
            });
        };

        var submit = function(object, model){
            var pluralize = model + 's';
            if(_.has(object, '$$hashKey')) delete object['$$hashKey'];
            if(_.contains(_.pluck(data[pluralize], 'id'), object.id)){
                $sails.put('/'+model+'/'+object.id, object)
                    .success(function(response){
                        console.log(model+' updated: '+JSON.stringify(response));
                        _.remove(data[pluralize], {id: int.id});
                        data[pluralize].push(response);
                    }).error(function(response){
                        console.log('Unable to update '+model+': '+JSON.stringify(response));
                    });
            }
            else{
                $sails.post('/'+model, object)
                    .success(function(response){
                        console.log(model+' created: '+JSON.stringify(response));
                        data[pluralize].push(response);
                    }).error(function(response){
                        console.log('Unable to create '+model+': '+JSON.stringify(response));
                    });
            }
        };

        var del = function(id, model){
            $sails.delete('/'+model+'/'+id)
                .success(function(response){
                    console.log(model+' deleted: '+JSON.stringify(response));
                    _.remove(data[model+'s'], {id: id});
                }).error(function(response){
                    console.log('Unable to delete '+model+': '+JSON.stringify(response));
                });
        };

        var getData = function(){
            return data;
        };

        var linkIntention = function (item, intention){

        };

        var unlinkIntention = function (item, intention){

        };

        update('intention');
        update('attribute');
        update('item');

        // Public API here
        return {
            linkIntention: linkIntention,
            unlinkIntention: unlinkIntention,
            submit: submit,
            update: update,
            del: del,
            getData: getData
        };
  });
