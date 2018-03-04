angular.module("qn.multipleChoice", [])
.controller('multipleChoiceController', ['$scope', function ($scope) {

    if (!$scope.ngModel.dbId) { 
        $scope.ngModel.text = '';
        $scope.ngModel.value = '';
        $scope.ngModel.type = 4;
        $scope.ngModel.options = [
            "option 1",
            "option 2",
            "option 3",
        ]
        $scope.values = [];
    }
    
    $scope.$watchCollection('values', function () {
        $scope.ngModel.value = "";
        for (var i in $scope.values) {
            if ($scope.values[i]){
                $scope.ngModel.value += $scope.ngModel.options[i] + ";";
            }
        }
    });
    
    $scope.removeElement = function (id) {
        $('[data-id=' + id + ']').remove();
        $scope.ngModel.remove = true;
    }
    
}])
.directive('multipleChoice', function ($compile) {
    return {
        restrict: 'E',
        replace: 'true',
        scope: {
            ngModel: '=',
        },
        controller: 'multipleChoiceController',
        templateUrl: '/public/javascripts/angular/templates/multiple-choice.html',
        require: 'ngModel'
    };
});