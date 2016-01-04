'use strict';

var app = angular.module('confusionApp');

app.controller('MenuController', function($scope, menuFactory) {

  $scope.tab = 1;
  $scope.filtText = '';
  $scope.showDetails = false;
  $scope.showMenu = false;
  $scope.message = 'Loading...';
  $scope.dishes = menuFactory.getDishes().query(
    function(res) {
      $scope.dishes = res;
      $scope.showMenu = true;
    },
    function(err) {
      $scope.message = 'Error: ' + err.status + ' ' + err.statusText;
    }
  );

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

app.controller('FeedbackController', function($scope, feedbackFactory) {
  $scope.sendFeedback = function() {
    if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
      $scope.invalidChannelSelection = true;
    } else {
      $scope.invalidChannelSelection = false;
      feedbackFactory.getFeedback().save($scope.feedback);
      $scope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: ""
      };
      $scope.feedback.mychannel = "";
      $scope.feedbackForm.$setPristine();
    }
  };
});

app.controller('DishDetailController', function($scope, $stateParams, menuFactory) {
  $scope.message = 'Loading...';
  $scope.showDish = false;
  $scope.dish = menuFactory.getDishes().get({ id: parseInt($stateParams.id, 10) }).$promise
    .then(
      function(res) {
        $scope.dish = res;
        $scope.showDish = true;
      },
      function(err) {
        $scope.message = 'Error: ' + err.status + ' ' + err.statusText;
      }
    );

  $scope.sortField = 'date';
});

app.controller('DishCommentController', function($scope, menuFactory) {

  var defComment = {
    author: '',
    comment: '',
    rating: 5
  };
  $scope.comment = angular.copy(defComment);

  $scope.submitComment = function() {
    $scope.comment.date = new Date().toISOString();
    $scope.dish.comments.push($scope.comment);
    menuFactory.getDishes().update({ id: $scope.dish.id }, $scope.dish);
    $scope.commentForm.$setPristine();
    $scope.comment = angular.copy(defComment);
  };

  $scope.date = new Date().toISOString();
});

app.controller('IndexController', function($scope, menuFactory, corporateFactory) {
  $scope.featured = menuFactory.getDishes().get({ id: 0 }).$promise
    .then(
      function(res) {
        $scope.featured = res;
        $scope.showFeatured = true;
      },
      function(err) {
        $scope.message = 'Error: ' + err.status + ' ' + err.statusText;
      }
    )
  $scope.message = 'Loading...';
  $scope.showFeatured = false;

  $scope.showPromo = false;
  $scope.promoMessage = 'Loading...';
  $scope.promo = menuFactory.getPromotions().get({ id: 0 }).$promise
    .then(
      function(res) {
        $scope.promo = res;
        $scope.showPromo = true;
      },
      function(err) {
        $scope.promoMessage = 'Error: ' + err.status + ' ' + err.statusText;
      }
    )

  $scope.showEc = false;
  $scope.ecMessage = 'Loading...';
  $scope.ec = corporateFactory.getLeaders().get({ id: 3 }).$promise
    .then(
      function(res) {
        $scope.ec = res;
        $scope.showEc = true;
      },
      function(err) {
        $scope.ecMessage = 'Error: ' + err.status + ' ' + err.statusText;
      }
    )
});

app.controller('AboutController', function($scope, corporateFactory) {
  $scope.showLeaders = false;
  $scope.message = 'Loading...';
  $scope.leaders = corporateFactory.getLeaders().query(
    function(res) {
      $scope.leaders = res;
      $scope.showLeaders = true;
    },
    function(err) {
      $scope.message = 'Error: ' + err.status + ' ' + err.statusText;
    }
  );
});
