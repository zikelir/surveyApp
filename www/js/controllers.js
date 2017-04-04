angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $window, $state, $cordovaFile) {
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
        alert('saved! :)');
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

        $scope.showPopup = function() {
            $scope.data = {}

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<input type="password" ng-model="data.wifi">',
                title: 'Enter the manager Password',
                subTitle: 'restricted area',
                scope: $scope,
                buttons: [{
                        text: 'Cancel/Back',
                        onTap: function(e) {
                            $state.go("tab.dash");
                            // e.preventDefault();
                        }
                    },
                    {
                        text: '<b>Confirm</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if ($scope.data.wifi === 12345) {
                                //don't allow the user to close unless he enters wifi password
                                // e.preventDefault();
                                $state.go("tab.account");
                            }
                            if ($scope.data.wifi != 12345) {
                                // e.preventDefault();
                                $state.go("tab.dash");
                            }
                        }
                    },
                ]
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
            $timeout(function() {
                // myPopup.close(); //close the popup after 3 seconds for some reason
                $state.go("tab.dash");
            }, 300000000);
        };
        // A confirm dialog
        $scope.showConfirm = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Consume Ice Cream',
                template: 'Are you sure you want to eat this ice cream?'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });
        };

        $scope.showPopup();


    });


    $scope.localstorage = [];
    $scope.aux = [];

    for (var i = 0, len = $window.localStorage.length; i < len; i++) {
        var key = $window.localStorage.key(i);
        var value = $window.localStorage[key];
        console.log("Pessoa " + i + " -> " + value);
        $scope.localstorage.push("Pessoa " + i + " -> " + value);
    }
});