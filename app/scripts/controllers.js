'use strict';

var app = angular.module('confusionApp');

app.controller('MenuController', function($scope, $menuFactory) {

  $scope.tab = 1;
  $scope.filtText = '';
  $scope.showDetails = false;
  $scope.dishes = $menuFactory.getDishes();

  $scope.select = function(setTab) {
    $scope.tab = setTab;

    if (setTab === 2) {
      $scope.filtText = "appetizer";
    } else if (setTab === 3) {
      $scope.filtText = "mains";
    } else if (setTab === 4) {
      $scope.filtText = "dessert";
    } else {
      $scope.filtText = "";
    }
  };

  $scope.isSelected = function(checkTab) {
    return ($scope.tab === checkTab);
  };

  $scope.toggleDetails = function() {
    $scope.showDetails = !$scope.showDetails;
  };
});

app.controller('ContactController', ['$scope', function($scope) {

  $scope.feedback = {
    mychannel: "",
    firstName: "",
    lastName: "",
    agree: false,
    email: ""
  };

  var channels = [{
    value: "tel",
    label: "Tel."
  }, {
    value: "Email",
    label: "Email"
  }];

  $scope.channels = channels;
  $scope.invalidChannelSelection = false;

}]);

app.controller('FeedbackController', ['$scope', function($scope) {

  $scope.sendFeedback = function() {

    console.log($scope.feedback);

    if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
      $scope.invalidChannelSelection = true;
      console.log('incorrect');
    } else {
      $scope.invalidChannelSelection = false;
      $scope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: ""
      };
      $scope.feedback.mychannel = "";
      $scope.feedbackForm.$setPristine();
      console.log($scope.feedback);
    }
  };
}]);

app.controller('DishDetailController', function($scope, $routeParams, $menuFactory) {
  $scope.dish = $menuFactory.getDish(parseInt($routeParams.id, 10));
  $scope.sortField = 'date';
});

app.controller('DishCommentController', ['$scope', function($scope) {

  var defComment = {
    author: '',
    comment: '',
    rating: 5
  };
  $scope.comment = angular.copy(defComment);

  $scope.submitComment = function() {
    $scope.comment.date = new Date().toISOString();
    $scope.dish.comments.push($scope.comment);
    $scope.commentForm.$setPristine();
    $scope.comment = angular.copy(defComment);
    // $scope.commentForm.reset();
    // $scope.comment = defComment;
  };

  $scope.date = new Date().toISOString();
}]);
