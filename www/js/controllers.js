angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $window, $state, $cordovaFile, $ionicPlatform, $timeout, $ionicModal, $ionicSideMenuDelegate, Surveys, $http) {
    $scope.firstName = "";
    $scope.conclusion = "";
    $scope.email = "";
    $scope.course = "";
    $scope.comment = "";
    $scope.other = "";
    $scope.surveyData = [];
    $scope.conclusion = {
        model: null,
        availableOptions: [
            { id: '2017/1', name: '2017/1' },
            { id: '2017/2', name: '2017/2' },
            { id: '2018/1', name: '2018/1' },
            { id: '2018/2', name: '2018/2' },
            { id: '2019/1', name: '2019/1' },
            { id: '2019/2', name: '2019/2' },
            { id: '2020/1', name: '2020/1' },
            { id: '2020/2', name: '2020/2' },
            { id: '2021/1', name: '2021/1' },
            { id: '2021/2', name: '2021/2' },
            { id: '2022/1', name: '2022/1' },
            { id: '2022/2', name: '2022/2' },
            { id: 'concluded', name: 'concluded' }
        ]
    };


    $scope.persistSurvey = function() {
        this.surveyData.push(" nome: " + this.firstName);
        this.surveyData.push(" conclusion: " + this.conclusion.model);
        this.surveyData.push(" email: " + this.email);
        this.surveyData.push(" course: " + this.course);
        this.surveyData.push(" comentários: " + this.comment);
        console.log($scope.surveyData);
        $window.localStorage.setItem(this.firstName, this.surveyData);
        this.surveyData = [];
        this.firstName = "";
        this.course = "";
        this.email = "";
        this.course = "";
        this.comment = "";
        alert('saved! :)');
    }

    // $ionicPlatform.ready(function() {
    //     console.log('device ready');
    //     angular.element(document).ready(function() {
    //         angular.element(document.body).injector().invoke(['$cordovaFile', function($cordovaFile) {
    //             $cordovaFile.getFreeDiskSpace()
    //                 .then(function(success) {
    //                     console.log(success);
    //                 }, function(error) {
    //                     console.log(error);
    //                 });

    //             // CREATE
    //             $cordovaFile.createDir(cordova.file.dataDirectory, "new_dir", false)
    //                 .then(function(success) {
    //                     console.log(success);
    //                 }, function(error) {
    //                     console.log(error);
    //                 });

    //             $cordovaFile.createFile(cordova.file.dataDirectory, "new_file.txt", true)
    //                 .then(function(success) {
    //                     console.log(success);
    //                 }, function(error) {
    //                     console.log(error);
    //                 });

    //             // WRITE
    //             $cordovaFile.writeFile(cordova.file.dataDirectory, "file.txt", "text", true)
    //                 .then(function(success) {
    //                     console.log(success);
    //                 }, function(error) {
    //                     console.log(error);
    //                 });

    //             $cordovaFile.writeExistingFile(cordova.file.dataDirectory, "file.txt", "text")
    //                 .then(function(success) {
    //                     console.log(success);
    //                 }, function(error) {
    //                     console.log(error);
    //                 });



    //             // READ
    //             $cordovaFile.readAsText(cordova.file.dataDirectory, $scope.inputs.readFile)
    //                 .then(function(success) {
    //                     console.log(success);
    //                 }, function(error) {
    //                     console.log(error);
    //                 });


    //         }]);
    //     }); //

    // });

    $scope.surveys = [];
    $scope.selectedStations = null;
    $scope.stations = [];
    $scope.mySelectedStation;
    var date = new Date();
    $scope.date = date;
    $scope.startSurvey = function(station) {
        station.train_arrive1 = new Date();
    };

    var createSurvey = function(survey) {
        var newSurvey = Surveys.newSurvey(survey);
        $scope.surveys.push(newSurvey);
        Surveys.save($scope.surveys);
        $scope.selectSurvey(newSurvey, $scope.surveys.length - 1);
        $ionicPlatform.ready(function() {
            alert('cordova.file.dataDirectory: ' + cordova); //I get [object Object]
            alert('cordova.file.dataDirectory: ' + cordova.file.dataDirectory); // I get file is undefined
            $cordovaFile.writeFile(cordova.file.dataDirectory, 'surveys.json', $scope.surveys, true).then(function(result) {
                alert('Success! Survey created!');
            }, function(err) {
                console.log("ERROR");
            })
        });
    }

    $scope.newSurvey = function(survey) {
        createSurvey(survey);
    };


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