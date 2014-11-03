'use strict';

angular.module('finanzomatApp')
    .directive('seAttributeEdit', function () {
        return {
            templateUrl: 'app/scripts/directives/seAttributeEdit/seAttributeEdit.html',
            restrict: 'E',
            scope: {
                attribute: '=attribute'
            },
            controller: function ($scope, dataService) {
                $scope.newLabel = undefined;

                $scope.saveAttribute = function () {
                    dataService.submit($scope.attribute, 'attribute');
                };
                $scope.addLabel = function(attribute){
                    if(!attribute.labels){
                        attribute.labels = [];
                    }
                    dataService.link(attribute, $scope.newLabel, 'attribute', 'label', 'labels');
                    attribute.labels.push($scope.newLabel);
                    $scope.newLabel = undefined;

                };
                $scope.removeLabel = function(attribute, label){
                    dataService.unlink(attribute, label, 'attribute', 'label', 'labels');
                    dataService.del(label, 'label');
                    _.remove(attribute.labels, {text: label.text});
                };
            },
            link: function (scope, element, attrs) {
            }
        };
    });