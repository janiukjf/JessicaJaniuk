'use strict'

angular.module('Janiuk', [
	'ui.router',
	'Janiuk.controllers',
	'Janiuk.services',
]).config(['$stateProvider', '$urlRouterProvider',  ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');

	var viewUrl = (relativeUrl) => {
		return `/app/views/${relativeUrl}`;
	}
    
    $stateProvider
        .state('app', {
            url: '/',
            templateUrl: viewUrl("home.html"),
            controller: "HomeCtrl",
            controllerAs: "vm"
        })
        .state('about', {
        	url: '/about',
        	templateUrl: viewUrl("about.html"),
        })
        .state('connect', {
        	url: '/connect',
        	templateUrl: viewUrl("connect.html"),
        })
        .state('photography', {
        	url: '/photography',
        	templateUrl: viewUrl("photography.html"),
        })
        .state('r2d2', {
        	url: '/r2d2',
        	templateUrl: viewUrl("r2d2.html"),
        })
        .state('blog', {
        	url: '/blog',
        	templateUrl: viewUrl("blog.html"),
        	controller: "BlogCtrl",
        	controllerAs: "vm"
        });
}]);

angular.module('Janiuk.controllers',[]);
angular.module('Janiuk.services',[]);