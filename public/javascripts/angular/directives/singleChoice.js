angular.module("qn.singleChoice", [])
.controller('singleChoiceController', ['$scope', function ($scope) {

    if (!$scope.ngModel.dbId) {
        $scope.ngModel.text = '';
        $scope.ngModel.value = '';
        $scope.ngModel.type = 3;
        $scope.ngModel.options = [
            "option 1",
            "option 2",
            "option 3",
        ]
    } 
    $scope.removeElement = function (id) {
        $('[data-id=' + id + ']').remove();
        $scope.ngModel.remove = true;
    }
    
}])
.directive('singleChoice', function ($compile) {
    return {
        restrict: 'E',
        replace: 'true',
        scope: {
            ngModel: '=',
        },
        controller: 'singleChoiceController',
        templateUrl: '/public/javascripts/angular/templates/single-choice.html',
        require: 'ngModel'
    };
});