angular.module("qn.yesNo", [])
.controller('yesNoController', ['$scope', function ($scope) {

    if (!$scope.ngModel.dbId) {
        $scope.ngModel.text = '';
        $scope.ngModel.value = '';
        $scope.ngModel.type = 2;
    }
    $scope.removeElement = function (id) {
        $('[data-id=' + id + ']').remove();
        $scope.ngModel.remove = true;
    }
    
}])
.directive('yesNo', function ($compile) {
    return {
        restrict: 'E',
        replace: 'true',
        scope: {
            ngModel: '=',
        },
        controller: 'yesNoController',
        templateUrl: '/public/javascripts/angular/templates/yes-no.html',
        require: 'ngModel'
    };
});