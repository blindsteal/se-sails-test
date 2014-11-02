'use strict';

angular.module('finanzomatApp')
    .controller('EditorCtrl', function ($scope, $http, dataService) {
        $scope.data = dataService.getData();

        $scope.newItem = undefined;
        $scope.newAttribute = undefined;
        $scope.newIntention = undefined;

        $scope.attributeFilter = undefined;

        $scope.loadItem = function (id) {
            $scope.newItem = _.cloneDeep(_.find($scope.data.items, {id: id}));
        };

        $scope.loadAttribute = function (id) {
            $scope.newAttribute = _.cloneDeep(_.find($scope.data.attributes, {id: id}));
        };

        $scope.loadIntention = function (id) {
            $scope.newIntention = _.cloneDeep(_.find($scope.data.intentions, {id: id}));
        };

        $scope.deleteIntention = function(id){
            dataService.deleteIntention(id);
        };

        $scope.deleteAttribute = function(id){
            dataService.deleteAttribute(id);
        };

        $scope.deleteItem = function(id){
            dataService.deleteItem(id);
        };

        $scope.hasAttribute = function(attributeName) {
            return function(item) {
                if(!attributeName) return true;
                return _.contains(_.pluck(item.attributes, 'name'), attributeName);
            };
        };

    });