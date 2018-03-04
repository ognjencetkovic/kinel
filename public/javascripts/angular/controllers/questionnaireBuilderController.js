'use strict'
angular.module('qn.questionnaireBuilderController', []).controller('qnBuilderCtrl', ['$scope', '$http', '$compile', 'qnService', function ($scope, $http, $compile, qnService) {


    $scope.questionnaire = { title: "" };    
    $scope.indexCount = 0;
    $scope.questions = [];
    $scope.selectedQuestion = {};

    $scope.addOption = function () {
        $scope.selectedQuestion.options.push("");
    }

    $scope.removeOption = function (id) {
        $scope.selectedQuestion.options.splice(id, 1);
    }
    
    $scope.saveQuestionnaire = function () {
        if (!$scope.questionnaire.title){
            $scope.titleMissing = true;
            return;
        } else {
            $scope.titleMissing = false;
        }
        setQuestions();
        qnService.createQuestionnaire({ questionnaire : $scope.questionnaire}).then(function (success) {
            if (success){
                $scope.complete = true;
            }
        });
    }

    var setQuestions = function () {
        var idsInOrder = $("#dropzone").sortable("toArray", { attribute: 'data-id' });
        for (var i = 0; i < idsInOrder.length; i++) {
            $scope.questions[idsInOrder[i]].order = i;
        }
        $scope.questionnaire.questions = []
        $scope.questions.map(function (q) {
            $scope.questionnaire.questions.push({
                id: q.dbId,
                text: q.text,
                type: q.type,
                value: q.value,
                options: q.options ? q.options.toString() : "",
                order: q.order,
                remove: q.remove
            });
        });
    }

    $scope.initQuestionnaire = function (questionnaire) {
        $scope.questionnaire.title = questionnaire.title;
        $scope.questionnaire.id = questionnaire.id;
        questionnaire.questions = questionnaire.questions.map(function (q) {
            if (q.type === 3 || q.type === 4) {
                q.options = q.options.split(',');
            }
            q.dbId = q.id;
            delete q.id;
            renderComponent(q.type, null, q);
        });
    }

    var initBuilder = function () {
        $(".drop-component").draggable({
            connectToSortable: "#dropzone",
            appendTo: '#dropzone',
            revert: 'invalid',
            helper: 'clone',
            stop: function (event, ui) {
                if (ui.helper) {
                    var type = $(this).data('type');
                    renderComponent(type, $(ui.helper[0]));
                }
            }
        });

        $('#dropzone').droppable({
            drop: function (event, ui) {
                if (ui.helper) {
                    $('.selected').removeClass('selected');
                    $(ui.helper[0]).addClass('selected');
                    updateSelectedQuestion($(ui.helper[0]).data('id'));
                }
            }
        });

        $("#dropzone").sortable({
            revert: true,
        });

        $("#dropzone").on('click', '.form-group', function () {
            $('.selected').removeClass('selected');
            $(this).addClass('selected');
            updateSelectedQuestion($(this).data('id'));
        });

    }
    
    var renderComponent = function (type, clone, question) {
        var elem = null;
        switch (type) {
            case 1:
                elem = $compile('<text ng-model="questions[' + $scope.indexCount + ']"></text>')($scope);
                break;
            case 2:
                elem = $compile('<yes-no ng-model="questions[' + $scope.indexCount + ']"></yes-no>')($scope);
                break;
            case 3:
                elem = $compile('<single-choice ng-model="questions[' + $scope.indexCount + ']"></single-choice>')($scope);
                break;
            case 4:
                elem = $compile('<multiple-choice ng-model="questions[' + $scope.indexCount + ']"></multiple-choice>')($scope);
                break;
            case 5:
                elem = $compile('<page-divider ng-model="questions[' + $scope.indexCount + ']"></page-divider>')($scope);
                break;
        }
        var qn = {};
        if (question) {
            qn = question;
        }
        qn.id = $scope.indexCount;
        $scope.questions[$scope.indexCount] = qn;
        $scope.selectedQuestion = $scope.questions[$scope.indexCount];
        $scope.indexCount++;
        if (clone) {
            $(clone).replaceWith(elem);
        } else {
            $('#dropzone').append(elem);
        }
    }

    var updateSelectedQuestion = function (id) {
        for (var i in $scope.questions) {
            if ($scope.questions[i].id === id) {
                $scope.selectedQuestion = $scope.questions[i];
                $scope.$apply();
            }
        }
    };

    initBuilder();

}]);