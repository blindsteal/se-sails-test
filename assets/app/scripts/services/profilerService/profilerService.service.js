'use strict';

angular.module('finanzomatApp')
  .factory('profilerService', function ($sails) {
        var data = {
            intentions: []
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

        var getTopAttributes = function(intention){
            $sails.get('/intention/topattributes/'+intention.id).success(function(response){
                console.log('received TOP attributes: '+JSON.stringify(response));
            }).error(function(response){
                console.log('Unable to get '+JSON.stringify(response));
            });
        };

        var getData = function(){
            return data;
        };

        // Public API here
        return {
            update: update,
            getTopAttributes: getTopAttributes,
            getData: getData
        };
  });
