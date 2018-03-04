angular.module("qn.pageDivider", [])
.controller('pageDividerController', ['$scope', function ($scope) {

    $scope.ngModel.type = 5;
    $scope.removeElement = function (id) {
        $('[data-id=' + id + ']').remove();
        $scope.ngModel.remove = true;
    }
    
}])
.directive('pageDivider', function ($compile) {
    return {
        restrict: 'E',
        replace: 'true',
        scope: {
            ngModel: '=',
        },
        controller: 'pageDividerController',
        templateUrl: '/public/javascripts/angular/templates/page-divider.html',
        require: 'ngModel'
    };
});