angular.module("qn.text", [])
.controller('textController', ['$scope', function ($scope) {
    
    if (!$scope.ngModel.dbId) {
        $scope.ngModel.text = '';
        $scope.ngModel.value = '';
        $scope.ngModel.type = 1;
    }
    $scope.removeElement = function (id) {
        $('[data-id=' + id + ']').remove();
        $scope.ngModel.remove = true;
    }
    
}])
.directive('text', function ($compile) {
    return {
        restrict: 'E',
        replace: 'true',
        scope: {
            ngModel: '='
        },
        controller: 'textController',
        templateUrl: '/public/javascripts/angular/templates/text.html',
        require: 'ngModel'
    };
});