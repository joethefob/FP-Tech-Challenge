'use strict';

/* Controller */
angular.module('myApp.controllers', [])
	.controller('AppCtrl', function($scope, $http) {
        $scope.data = {
            availableStyles: null,
            availableColours: null,
            availableSizes: null,
            weight: 0,
            price: 0,
        };

        $scope.userInput = {
            selectedStyle: null,
            selectedColour: null,
            selectedSize: null,
            amount: 0,
        };

        $scope.getQuote = function(userInput) {
            var req = {
                "style_code": userInput.selectedStyle,
                "colour_code": userInput.selectedColour,
                "size_code": userInput.selectedSize,
            };
            console.log(req);
            $http.post("/api/quote", req).then(function(response) {
                console.log(response);
            });
        }

    	$http.get("/api/apparel").then(function(response) {
            $scope.data.availableStyles = response.data;
    	});

        $scope.$watch('userInput.selectedStyle', function() {
            $http.get("/api/apparel/" + $scope.userInput.selectedStyle).then(function(response) {
                $scope.data.availableColours = response.data.colours;
                $scope.data.availableSizes = response.data.sizes;
                $scope.data.weight = response.data.weight;
            });

            $scope.data.selectedColour = null;
            $scope.data.selectedSize = null;
            $scope.data.weight = 0;
        });
    });