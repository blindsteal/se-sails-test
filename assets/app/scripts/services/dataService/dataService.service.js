'use strict';

angular.module('finanzomatApp')
  .factory('dataService', function ($http) {
        var data = {
            intentions: [],
            attributes: [],
            items: [],
            individuals: [] 
        };

        var updateIntentions = function() {

        };

        var updateItems = function () {

        };

        var updateAttributes = function () {

        };

        var submitIntention = function(int) {

        };

        var submitItem = function (item) {

        };

        var submitAttribute = function (attr) {

        };

        var deleteIntention = function(id){

        };

        var deleteAttribute = function(id){

        };

        var deleteItem = function(id){

        };

        var getData = function(){
            return data;
        };

        var linkIntention = function (item, intention){

        };

        var unlinkIntention = function (item, intention){

        };

        var submitScore = function (item, score){

        };

        updateIntentions();
        updateAttributes();
        updateItems();

        // Public API here
        return {
            updateAttributes: updateAttributes,
            submitAttribute: submitAttribute,
            deleteAttribute: deleteAttribute,
            updateItems: updateItems,
            submitItem: submitItem,
            deleteItem: deleteItem,
            updateIntentions: updateIntentions,
            submitIntention: submitIntention,
            deleteIntention: deleteIntention,
            linkIntention: linkIntention,
            unlinkIntention: unlinkIntention,
            submitScore: submitScore,
            getData: getData
        };
  });
