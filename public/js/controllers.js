'use strict';

/* Controller */
angular.module('myApp.controllers', [])
	.controller('AppCtrl', function($scope, $http) {
    // $scope.data = {
    //  repeatSelect: null,
    //  availableOptions: [
    //    { style_code: '1', name: 'Option A'},
    //    {id: '2', name: 'Option B'},
    //    {id: '3', name: 'Option D'}
    //  ],
    //  test: "hello"

        $scope.data = {
            selectedStyle: null,
            availableStyles: null
        };

    	$http.get("/api/apparel").then(function(response) {
            $scope.data.availableStyles = response.data;
    	});
    });