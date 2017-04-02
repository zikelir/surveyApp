angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $window, $state) {
    $scope.firstName = "";
    $scope.lastName = "";
    $scope.email = "";
    $scope.phone = "";
    $scope.comment = "";
    $scope.surveyData = [];


    $scope.persistSurvey = function() {
        this.surveyData.push(" nome: " + this.firstName);
        this.surveyData.push(" sobrenome: " + this.lastName);
        this.surveyData.push(" email: " + this.email);
        this.surveyData.push(" tel: " + this.phone);
        this.surveyData.push(" comentários: " + this.comment);
        console.log($scope.surveyData);
        $window.localStorage.setItem(this.firstName, this.surveyData);
        this.surveyData = [];
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.phone = "";
        this.comment = "";
    }
})

// .controller('ChatsCtrl', function($scope, Chats) {
//     // With the new view caching in Ionic, Controllers are only called
//     // when they are recreated or on app start, instead of every page change.
//     // To listen for when this page is active (for example, to refresh data),
//     // listen for the $ionicView.enter event:
//     //
//     //$scope.$on('$ionicView.enter', function(e) {
//     //});

//     $scope.chats = Chats.all();
//     $scope.remove = function(chat) {
//         Chats.remove(chat);
//     };
// })

// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//     $scope.chat = Chats.get($stateParams.chatId);
// })

.controller('AccountCtrl', function($scope, $window, $state, $ionicPopup, $timeout, $q) {

    // Triggered on a button click, or some other target

    $scope.$on("$ionicView.beforeEnter", function(event, data) {
        // handle event
        // $scope.showPopup = function() {
        $scope.data = {};

        $ionicPopup.prompt({
            title: 'Password Check',
            template: 'Enter your secret password',
            title: 'Enter Password',
            inputType: 'password',
            inputPlaceholder: 'Your password',
            scope: $scope,
            buttons: [{
                    text: 'Cancel',
                    onTap: function(e) {
                        return false;
                    }
                },
                {
                    text: '<b>Confirm</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if ($scope.data.wifi === 12345) {
                            return true;
                        }
                    }
                },
            ]
        }).then(function(res) {
            if (res === true) {
                $state.go("tab.account");
            } else {
                $state.go("tab.dash");
            }
            console.log('Tapped!', res);
        }, function(err) {
            $state.go("tab.dash");
            console.log('Err:', err);
        }, function(msg) {
            console.log('message:', msg);
        });


        // };


        // $ionicPopup.prompt({
        //     title: 'Password Check',
        //     template: 'Enter your secret password',
        // inputType: 'password',
        // inputPlaceholder: 'Your password'
        // }).then(
        //     function(res) {
        //         console.log(res);
        //         if (res === 12345) {
        //             console.log("ok");
        //             $state.go("tab.account");
        //         } else {
        //             $state.go("tab.dash");
        //         }
        //     });

    });


    $scope.localstorage = [];

    for (var i = 0, len = $window.localStorage.length; i < len; i++) {
        var key = $window.localStorage.key(i);
        var value = $window.localStorage[key];
        console.log("Pessoa " + i + " -> " + value);
        $scope.localstorage.push("Pessoa " + i + " -> " + value);
    }

});