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

                $scope.removeScore = function(item, score){
                    dataService.unlink(item, score, 'item', 'cascore', 'scores');
                    dataService.del(score, 'cascore');
                    _.remove($scope.item.scores, {attributeId:score.attributeId});
                };

                $scope.removeIntention = function(item, intention){
                    dataService.unlink(item, intention, 'item', 'intention', 'intentions');
                    _.remove($scope.item.intentions, {id:intention.id});
                };

                $scope.addIntention = function (item, intention) {
                    item.intentions = (item.intentions === undefined) ? [] : item.intentions;
                    if (_.contains(_.pluck(item.intentions, 'id'), intention.id)) {
                        $scope.intentionToAdd = undefined;
                        return;
                    }
                    dataService.link(item, intention, 'item', 'intention', 'intentions');
                    $scope.item.intentions.push(intention);
                    $scope.intentionToAdd = undefined;
                };

                $scope.addScore = function (item, score) {
                    if(!item.scores){
                        item.scores = [];
                    }
                    dataService.link(item, score, 'item', 'cascore', 'scores');
                    //dataService.link(score, {id:score.attribute}, 'cascore', 'attribute', 'attribute');
                    $scope.item.scores.push(score);
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