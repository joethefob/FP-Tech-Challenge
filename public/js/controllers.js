'use strict';

/* Controller */
angular.module('myApp.controllers', [])
	.controller('AppCtrl', function($scope, $http) {
        $scope.data = {
            availableStyles: null,
            availableColours: null,
            availableSizes: null,

            selectedStyle: null,
            selectedColour: null,
            selectedSize: null,
        };

    	$http.get("/api/apparel").then(function(response) {
            $scope.data.availableStyles = response.data;
    	});

        $scope.$watch('data.selectedStyle', function() {
            $http.get("/api/apparel/" + $scope.data.selectedStyle).then(function(response) {
                $scope.data.availableColours = response.data.colours;
                $scope.data.availableSizes = response.data.sizes;
            });

            $scope.data.selectedColour = null;
            $scope.data.selectedSize = null;
        });
    });