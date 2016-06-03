'use strict';

/* Controller */
angular.module('myApp.controllers', [])
	.controller('AppCtrl', function($scope, $http) {
        $scope.data = {
            availableStyles: null,
            availableColours: null,
            availableSizes: null,
            weight: null,
            price: null,
            order_cost: null,
            sales_comp: null,
            markup: null,
            final_cost: null,
        };

        $scope.userInput = {
            selectedStyle: null,
            selectedColour: null,
            selectedSize: null,
            amount: null,
        };

        $scope.getQuote = function(userInput) {
            if (userInput.selectedStyle === null || userInput.selectedColour === null || userInput.size_code === null) {
                return;
            }

            var req = {
                "style_code": userInput.selectedStyle,
                "colour_code": userInput.selectedColour,
                "size_code": userInput.selectedSize,
            };
            console.log(req);
            $http.post("/api/quote", req).then(function(response) {
                var price = JSON.parse(response.data);
                var order_cost = price * userInput.amount;
                var sales_comp = 0.07 * (order_cost + getShippingCost());
                var markup = 0;
                if (order_cost <= 800) {
                    markup = 0.5 * order_cost;
                } else {
                    markup = 0.45 * order_cost;
                }
                $scope.data.price = price;
                $scope.data.order_cost = order_cost;
                $scope.data.sales_comp = sales_comp;
                $scope.data.markup = markup;
                $scope.data.final_cost = price + order_cost + sales_comp + markup;
            });
        }

        var reset = function() {
            $scope.userInput.selectedColour = null;
            $scope.userInput.selectedSize = null;
            $scope.userInput.amount = null;
            $scope.data.weight = null;
            $scope.data.price = null;
            $scope.data.order_cost = null;
            $scope.data.sales_comp = null;
            $scope.data.markup = null;
            $scope.data.final_cost = null;
        }

        var getShippingCost = function() {
            var weight = $scope.data.weight;
            var amount = $scope.userInput.amount;

            if (weight <= 0.4) {
                if (amount < 48) {
                    return amount;
                } else {
                    return 0.75 * amount;
                }
            } else {
                if (amount < 48) {
                    return 0.5 * amount;
                } else {
                    return 0.25 * amount;
                }
            }
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

            reset();
        });
    });