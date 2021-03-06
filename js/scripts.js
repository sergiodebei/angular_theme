var app = angular
	.module('wp', ['ngRoute', 'ngSanitize'])
	.config(function($routeProvider, $locationProvider) {
	    $routeProvider
		    .when('/', {
		    	templateUrl: templateUrl + '/partials/main.html',
		        controller: 'Main'
		    })
		    .when('/blog', {
		      	templateUrl: templateUrl + '/partials/blog.html'
		    })
		    .when('/blog/:category/:slug', {
				templateUrl: templateUrl + '/partials/single.html',
				controller: 'Content'
		    })
		    .when('/blog/category/:slug', {
	    		templateUrl: templateUrl + '/partials/category.html',
	    		controller: 'Category'
	    	})
		    .when('/about', {
		        templateUrl: templateUrl + '/partials/about.html',
		        controller: 'Init'
		    })
		    .when('/contact', {
		        template: '<h1>contact</h1>'
		    })
		    .when('/:slug', {
		      	templateUrl: templateUrl + '/partials/pages.html'
		    })
		    .otherwise({
		        redirectTo: '/404',
		        templateUrl: templateUrl + '/partials/404.html'
		    });

	    // enable html5Mode for pushstate ('#'-less URLs)
	    $locationProvider.html5Mode(true);
	    // Remove # from the URL with $locationProvider
	    $locationProvider.hashPrefix('!');
	})

	.factory('sharedResources', function($http, $q) {

		var data = [ "wp-json/wp/v2/posts/", "wp-json/wp/v2/categories"];

		return {
			getPosts: getPosts
		};

		function getPosts() {

			// var promises = data.map(function (datum) {
			// 	return $http.get(datum);
			// })

			// var taskCompletion = $q.all(promises);

			// taskCompletion.then(function (responses) {
			// 	list = responses[0].data;
			// });

		  	return data;
		}
	})

	.controller('Init', function($scope, $http, $routeParams, $q, sharedResources){

		//test factory 
		var data = sharedResources.getPosts();
		console.log('data', data);

		$scope.poster = '';

	    var data = [ "wp-json/wp/v2/posts/", "wp-json/wp/v2/categories"];

	    var promises = data.map(function (datum) {
	        return $http.get(datum);
	    })

	    var taskCompletion = $q.all(promises);

	    taskCompletion.then(function (responses) {
	    	$scope.poster = responses[0].data;
	    });

	})

	.controller('Main', function($scope, $http, $routeParams) {

		$scope.posts = '';

	    $http.get('wp-json/wp/v2/posts/')
	    	.then(function(res){
	    		// console.log(res.data);
		    	$scope.posts = res.data;
			},function (error){
	    		console.log(error, 'can not get data.');
			});

	})

	.controller('Content', function($scope, $http, $routeParams) {
		// console.log($routeParams.slug);

		$scope.post = '';

		$http.get('wp-json/wp/v2/posts?filter[name]=' + $routeParams.slug)
			.then(function(response){
				
				angular.forEach(response.data, function(post, key) {
					if($routeParams.slug === post.slug){
						// console.log(post);
						$scope.post = post;
					}
				});

			},function (error){
	    		console.log(error, 'can not get data.');
			});
		
	})

	.controller('Menu', function($scope, $http, $routeParams) {

		$scope.menu = '';

	    $http.get('wp-json/wp-api-menus/v2/menus/2')
	    	.then(function(res){
	    		// console.log('res',res.data.items);
		    	$scope.menu = res.data.items;
			},function (error){
	    		console.log(error, 'can not get data.');
			});

	})

	.controller('Category', function($scope, $http, $routeParams) {

		$scope.categories = '';
		$scope.posts_by_categories = [];
		$scope.category_slug = $routeParams.category;
		$scope.category_id = '';

		// console.log('ctd',$scope.category_slug);

	    $http.get('wp-json/wp/v2/categories')
	    	.then(function(res){
	    		// console.log('res',res.data);
		    	$scope.categories = res.data;
			},function (error){
	    		console.log(error, 'can not get data.');
			});

		$http.get('wp-json/wp/v2/posts/')
			.then(function(response){

				angular.forEach($scope.categories, function(categories, j) {
					if(categories.name === $scope.category_slug){
						$scope.category_id = categories.id;
						// console.log($scope.category_id);
					}
				});
				angular.forEach(response.data, function(post, i) {
					if(post.categories.length > 0 && post.categories.indexOf($scope.category_id) != -1){
						if($scope.posts_by_categories.indexOf(post) === -1){
						    $scope.posts_by_categories.push(post);
					 	}
					}
				});

			},function (error){
	    		console.log(error, 'can not get data.');
			});

	})

	.filter('searchFilter', function() {
	    return function(arr, search_string) {
	        if(!search_string) {
	            return arr;
	        }
	        search_string = search_string.toLowerCase();
	        var result = [];
	        angular.forEach(arr, function(el){
	            if(el.title.rendered.toLowerCase().indexOf(search_string) != -1) {
	                result.push(el);
	            }
	        });
	        return result;
	    };
	});









