angular.module('qn.services.api', [])
.factory('qnService', ['$http',
    function ($http) {
            
        var createQuestionnaire = function (questionnaire) {
            return $http.post('/dashboard/questionnaire', questionnaire)
                .then(function (response) {
                    return response.status === 200;
                });
        };
        
        return {
            createQuestionnaire: createQuestionnaire,
        };
    }]
);
