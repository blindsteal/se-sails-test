'use strict';

angular.module('finanzomatApp')
  .factory('dataService', function ($http, $sails) {
        var data = {
            intentions: [],
            attributes: [],
            items: [],
            labels: [],
            caScores: []
        };

        var updateRecord = function(updated, model){
            _.remove(data[model+'s'], {id: updated.id});
            data[model+'s'].push(updated);
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
                        updateRecord(response, model);
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

        var del = function(object, model){
            $sails.delete('/'+model+'/'+object.id)
                .success(function(response){
                    console.log(model+' deleted: '+JSON.stringify(response));
                    _.remove(data[model+'s'], {id: object.id});
                }).error(function(response){
                    console.log('Unable to delete '+model+': '+JSON.stringify(response));
                });
        };

        var link = function(from, to, model, toModel, relation){
            var url = '/'+model+'/'+from.id+'/'+relation;
            if(_.contains(_.pluck(data[toModel+'s'], 'id'), to.id)){
                $sails.post(url+'/'+to.id)
                    .success(function(response){
                        console.log(url+' called: '+JSON.stringify(response));
                        updateRecord(response, model);
                    })
                    .error(function(response){
                        console.log(url+' failed: '+JSON.stringify(response));
                    });
            }
            else{
                $sails.post(url, to)
                    .success(function(response){
                        console.log(url+' called: '+JSON.stringify(response));
                        updateRecord(response, model);
                    })
                    .error(function(response){
                        console.log(url+' failed: '+JSON.stringify(response));
                    });
            }
        };

        var unlink = function(from, to, model, toModel, relation){
            var url = '/'+model+'/'+from.id+'/'+relation+'/'+to.id;
            $sails.delete(url)
                .success(function(response){
                    console.log(url+' called: '+JSON.stringify(response));
                    updateRecord(response, model);
                })
                .error(function(response){
                    console.log(url+' failed: '+JSON.stringify(response));
                });
        };

        var getData = function(){
            return data;
        };

        update('intention');
        update('attribute');
        update('item');
        update('label');
        update('cascore');

        // Public API here
        return {
            submit: submit,
            update: update,
            del: del,
            link: link,
            unlink: unlink,
            getData: getData
        };
  });
