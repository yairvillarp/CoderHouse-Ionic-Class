angular.module('callsServices', ['ngResource'])
.factory('url', function(){
  return {
    getUrl: function() {
      var api = '/api';
      return api;
    }
  }
})
.factory('setHeader', function($http){
  return $http.defaults.headers;
})
.factory('crudService', function ($http, url) {
    return $http;
})
;
