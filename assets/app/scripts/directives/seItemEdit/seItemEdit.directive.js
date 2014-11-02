'use strict';

angular.module('finanzomatApp')
    .directive('seItemEdit', function () {
        return {
            templateUrl: 'app/scripts/directives/seItemEdit/seItemEdit.html',
            restrict: 'E',
            scope: {
                item: '=item'
            },
            controller: function ($scope, dataService) {
                $scope.scoreToAdd = undefined;
                $scope.intentionToAdd = undefined;
                $scope.data = dataService.getData();

                $scope.removeScore = function(item, score){
                    _.remove($scope.item.scores, {attributeId:score.attributeId});
                };

                $scope.removeIntention = function(item, intention){
                    _.remove($scope.item.intentions, {id:intention.id});
                    dataService.unlinkIntention(item, intention);
                };

                $scope.addIntention = function (item, intention) {
                    item.intentions = (item.intentions === undefined) ? [] : item.intentions;
                    if (_.contains(_.pluck(item.intentions, 'id'), intention.id)) {
                        $scope.intentionToAdd = undefined;
                        return;
                    }
                    dataService.linkIntention(item, intention);
                    $scope.intentionToAdd = undefined;
                };

                $scope.addScore = function (item, score) {
                    dataService.submitScore(item, score);
                    $scope.scoreToAdd = undefined;
                };

                $scope.saveItem = function () {
                    if(!$scope.item.parentId) $scope.item.parentId = -1;
                    dataService.submit($scope.item, 'item');
                };
            },
            link: function (scope, element, attrs) {
            }
        };
    });