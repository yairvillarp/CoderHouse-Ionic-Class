angular.module('callsServices', ['ngResource'])
.factory('url', function(){
  var api = '/api';
  return {
    getUrl: function() {
      return api
    }
  }
})
.factory('setHeader', function($http){
  return $http.defaults.headers;
})
.factory('crudService', function ($resource, url) {
    var urlString = url.getUrl()
    return $resource(urlString);
})
;
