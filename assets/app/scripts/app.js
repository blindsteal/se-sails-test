'use strict';

/**
 * @ngdoc overview
 * @name finanzomatApp
 * @description
 * # finanzomatApp
 *
 * Main module of the application.
 */
angular
  .module('finanzomatApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'ui.bootstrap-slider',
    'ngSails'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider
            .otherwise('/');

        // $locationProvider.html5Mode(true);

        $stateProvider
            .state('editor', {
                url: '/editor',
                templateUrl: 'app/views/editor/editor.html',
                controller: 'EditorCtrl'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'app/views/about.html',
                controller: 'AboutCtrl'
            })
            .state('profiling', {
                url: '/',
                templateUrl: 'app/views/selfprofiling/selfprofiling.html',
                controller: 'SelfprofilingCtrl'
            });
  });
