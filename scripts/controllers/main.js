'use strict';

angular.module('nantesjugApp')
    .controller('MenuCtrl', function ($scope, $location) {
      $scope.urlIs = function (viewLocation) {
        return $location.path() === viewLocation;
      };
      $scope.urlStartsWith = function (viewLocation) {
        return $location.path().indexOf(viewLocation) === 0;
      };
    })
    .controller('MainCtrl', function ($scope) {
      $scope.event = nj.getNextEvent();
      $scope.nextNextEvents = nj.getNextNextEvents();
      $scope.today = nj.getToday();

      var eventDetailledView = {};
      if (typeof $scope.event !== 'undefined') {
        eventDetailledView[$scope.event.id] = true;
      }
      $scope.eventDetailledView = eventDetailledView;
      $scope.eventToggleViewDisabled = true;
      $scope.getEventPlaceUrl = nj.getEventPlaceUrl;
    })
    .controller('EventsCtrl', function ($scope) {
      $scope.today = nj.getToday();
      $scope.nextEvents = nj.getNextEvents().reverse();
      $scope.previousEvents = nj.getPreviousEvents().reverse();
      $scope.searchText = '';
      $scope.getEventPlaceUrl = nj.getEventPlaceUrl;

      //Events detailled view
      var eventDetailledView = {};
      $scope.nextEvents.forEach(function (event) {
        eventDetailledView[event.id] = false;
      });
      $scope.previousEvents.forEach(function (event) {
        eventDetailledView[event.id] = false;
      });
      $scope.eventDetailledView = eventDetailledView;
      $scope.eventToggleViewDisabled = false;

      $scope.toggleDetail = function (evendId) {
        $scope.eventDetailledView[evendId] = !$scope.eventDetailledView[evendId];
      };
    })
    .controller('EventCtrl', function ($scope, $routeParams) {
      $scope.event = nj.getEvent($routeParams.eventId);
      $scope.today = nj.getToday();
      $scope.getEventPlaceUrl = nj.getEventPlaceUrl;

      var eventDetailledView = {};
      eventDetailledView[$scope.event.id] = true;
      $scope.eventDetailledView = eventDetailledView;
      $scope.eventToggleViewDisabled = false;

      $scope.toggleDetail = function (evendId) {
        $scope.eventDetailledView[evendId] = !$scope.eventDetailledView[evendId];
      };

    })
    .controller('SpeakersCtrl', function ($scope) {
      $scope.speakers = nj.getSpeakers();
      $scope.searchText = '';
      $scope.getSpeakerPhotoUrl = nj.getSpeakerPhotoUrl;

    })
    .controller('SpeakerCtrl', function ($scope, $routeParams, $timeout) {
      var speaker = nj.getSpeaker($routeParams.speakerId);
      var subjects = nj.getSpeakerSubjects($routeParams.speakerId);
      $scope.speaker = speaker;
      $scope.subjects = subjects;
      $scope.getSpeakerPhotoUrl = nj.getSpeakerPhotoUrl;
      $timeout(function(){
        $(document).trigger('speakerLoaded');
      }, 0);
    })
;
