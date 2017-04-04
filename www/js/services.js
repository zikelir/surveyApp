angular.module('starter.services', [])

.factory('Surveys', function($http, $q) {
    // var surveys = [{}];
    // var i = 1;
    // return {
    //     all: function() {
    //         var surveyString = window.localStorage['surveys'];
    //         if (surveyString) {
    //             return angular.fromJson(surveyString);
    //         }
    //         return [];
    //     },
    //     save: function(surveys) {
    //         window.localStorage['surveys'] = angular.toJson(surveys);
    //     },
    //     newSurvey: function(survey) {
    //         return {
    //             survey_id: i++,
    //             station_name: survey.stationName,
    //             line: survey.line,
    //             time: survey.time,
    //             direction: survey.direction,
    //             element_id: survey.elementID,
    //             component_id: survey.componentID,
    //             surveyor: survey.surveyor,
    //             notes: survey.dashNote,
    //         };
    //     },
    //     get: function(surveyId) {
    //         return surveys[surveyId];
    //     },
    //     getLastActiveIndex: function() {
    //         return parseInt(window.localStorage['lastActiveSurvey']) || 0;
    //     },
    //     setLastActiveIndex: function(index) {
    //         window.localStorage['lastActiveSurvey'] = index;
    //     }
    // }

    var self = this;

    var __apiUrl = 'https://mysurveyapi.mybluemix.net';
    self.sendPeopleToDatabase = function(obj) {
        var deferred = $q.defer();

        $http.post(__apiUrl + '/cache', obj).then(success, fail);

        function success(result) {
            deferred.resolve(result.data);
        }

        function fail(error) {
            console.error(error);
            deferred.reject(error.data);
        }

        return deferred.promise;
    };
    return self;
})

.factory('Chats', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/ben.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/max.png'
    }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/adam.jpg'
    }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/perry.png'
    }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
    }];

    return {
        all: function() {
            return chats;
        },
        remove: function(chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function(chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
});