var myNews = angular.module('myNews', ['ngRoute', 'ngResource','ngDialog']);
myNews.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                //controller: 'Ctrl'
            })
            .when('/gallery', {
                templateUrl: 'templates/gallery.html',
            })
            .when('/aquatic',{
                templateUrl: 'templates/aquatic.html',
                controller: 'productsCtrl',
            })
            .when('/avenue',{
                templateUrl: 'templates/avenue.html',
            })
            .when('/bamboo',{
                templateUrl: 'templates/bamboo.html'
            })
            .when('/desert',{
                templateUrl: 'templates/desert.html'
            })
            .when('/ficus',{
                templateUrl: 'templates/ficus.html'
            })
            .when('/flowers',{
                templateUrl: 'templates/flowers.html'
            })
            .when('/fruit',{
                templateUrl: 'templates/fruit.html'
            })
            .when('/indoor',{
                templateUrl: 'templates/indoor.html'
            })
            .when('/outdoor',{
                templateUrl: 'templates/outdoor.html'
            })
            .when('/ornamental',{
                templateUrl: 'templates/ornamental.html'
            })
            .when('/palms',{
                templateUrl: 'templates/palms.html'
            })
            .when('/weather',{
                templateUrl: 'templates/weather.html',
                controller: 'weatherCtrl'
            })
});
// Example of how to set default values for all dialogs
        myNews.config(['ngDialogProvider', function (ngDialogProvider) {
            ngDialogProvider.setDefaults({
                className: 'ngdialog-theme-default',
                plain: false,
                showClose: true,
                closeByDocument: true,
                closeByEscape: true,
                appendTo: false,
                preCloseCallback: function () {
                    console.log('default pre-close callback');
                }
            });
        }]);
myNews.controller('weatherCtrl', ['$scope', '$resource','$routeParams', function ($scope, $resource,$routeParams) {
    $scope.getTemp = function(days) {
        $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {
           callback: "JSON_CALLBACK"
        }, {
           get: {
           method: "JSONP"
        }
        });
        $scope.weatherResult = $scope.weatherAPI.get({
            q: $scope.city, 
            cnt: days,
            appid: '6471c8ef66b0d2a929e4975271376a3c'
        });
        $scope.weatherRes = true;
        console.log($scope.weatherResult);
        $scope.days = days;
        }
        //$scope.dateFormat = 'mediumDate';
        $scope.getDate = function(d) {
            return new Date(d * 1000);
        };
        $scope.tempCelsius = function(k) {
            return (k - 273.15).toFixed(0); // Kelvin to Celsius
        };
    }]);
myNews.controller('productsCtrl',['$scope','ngDialog',function($scope,ngDialog){
      $scope.openTimed = function (img) {
                var dialog = ngDialog.open({
                    template: '<img src="'+img+'">',
                    plain: true,
                    closeByDocument: false,
                    closeByEscape: false
                });
            };
}]);
myNews.directive('weatherForm',function() {
    return {
        restrict: 'E',
        replace: false,
        templateUrl: 'templates/weather-form.html'
    }
});
myNews.directive('resultForecast',function() {
    return {
        restrict: 'E',
        replace: false,
        templateUrl: 'templates/result-forecast.html',
        scope: {
            result: '=',
            getDateFormat: '&',
            getTempFormat: '&',
            getDateFormatText: '@',
            getTemparature: '&',
            activeClassDays: '@',
        }
    }
});
/****Follow scroll*****/
    /* $( document ).ready(function() {
        var element = $('#scrollform');
        //originalY = element.offset().top;
        console.log(element, jQuery.fn.jquery)
        var originalY = element.offset().top;
        // Space between element and top of screen (when scrolling)
        var topMargin = 20;
        // Should probably be set in CSS; but here just for emphasis
        element.css('position', 'relative');
        $(window).on('scroll', function(event) {
        var scrollTop = $(window).scrollTop();
        element.stop(false, false).animate({
        top: scrollTop < originalY
        ? 0
        : scrollTop - originalY + topMargin
        }, 300);
        });
    });*/
/****Follow scroll*****/