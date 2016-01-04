'use strict';

var app = angular.module('confusionApp');

app.constant('baseUrl', 'http://localhost:3000/');

app.service('menuFactory', function($resource, baseUrl) {
  var promotions = [{
    _id: 0,
    name: 'Weekend Grand Buffet',
    image: 'images/buffet.png',
    label: 'New',
    price: '19.99',
    description: 'Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person ',
  }];

  this.getDishes = function() {
    return $resource(baseUrl + 'dishes/:id', {}, { update: { method: 'PUT' } });
  };

  this.getPromotions = function() {
    return $resource(baseUrl + 'promotions/:id');
  }
});

app.factory('corporateFactory', function($resource, baseUrl) {

  var corpfac = {};

  corpfac.getLeaders = function() {
    return $resource(baseUrl + 'leadership/:id');
  };

  return corpfac;
});

app.service('feedbackFactory', function($resource, baseUrl) {
  this.getFeedback = function(feedback) {
    return $resource(baseUrl + 'feedback/:id');
  };
});
