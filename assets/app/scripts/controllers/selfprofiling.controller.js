'use strict';

angular.module('finanzomatApp')
    .controller('SelfprofilingCtrl', function ($scope, profilerService) {
        $scope.data = profilerService.getData();
        $scope.userprofile = {
            name: 'Philipp FrameAlots',
            intention: {},
            attributes: {}
        };

        profilerService.update('intention');

        $scope.consoleFB = function () {
            console.log('Philipp FrameAlots profile changed: ' + JSON.stringify($scope.userprofile));
            profilerService.getTopAttributes({id: $scope.userprofile.intention});
        };

    });
