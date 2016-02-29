(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var mod;

mod = angular.module('adminr-md-layout');

mod.controller('AppCtrl', ["$scope", "$timeout", "$mdSidenav", "$log", function($scope, $timeout, $mdSidenav, $log) {

  /**
   * Supplies a function that will continue to operate until the
   * time is up.
   */
  var buildDelayedToggler, buildToggler, debounce;
  debounce = function(func, wait, context) {
    var timer;
    timer = void 0;
    return function() {
      var context;
      var args;
      context = $scope;
      args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout((function() {
        timer = void 0;
        func.apply(context, args);
      }), wait || 10);
    };
  };

  /**
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
   */
  buildDelayedToggler = function(navID) {
    return debounce((function() {
      $mdSidenav(navID).toggle().then(function() {
        $log.debug('toggle ' + navID + ' is done');
      });
    }), 200);
  };
  buildToggler = function(navID) {
    return function() {
      $mdSidenav(navID).toggle().then(function() {
        $log.debug('toggle ' + navID + ' is done');
      });
    };
  };
  $scope.toggleLeft = buildDelayedToggler('left');
  $scope.toggleRight = buildToggler('right');
  $scope.isOpenRight = function() {
    return $mdSidenav('right').isOpen();
  };
}]).controller('LeftCtrl', ["$scope", "$timeout", "$mdSidenav", "$log", function($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function() {
    $mdSidenav('left').close().then(function() {
      $log.debug('close LEFT is done');
    });
  };
}]).controller('RightCtrl', ["$scope", "$timeout", "$mdSidenav", "$log", function($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function() {
    $mdSidenav('right').close().then(function() {
      $log.debug('close RIGHT is done');
    });
  };
}]);


},{}],2:[function(require,module,exports){
var mod;

mod = angular.module('adminr-md-layout', ['adminr-basic-layout', 'adminr-core', 'ngMaterial', 'ngMdIcons']);

require('./components/layout.coffee');

mod.run([
  '$templateCache', function($templateCache) {
    return $templateCache.put('adminr-md-layout', require('./views/layout.html'));
  }
]);

mod.provider('AdminrMdLayout', [
  'AdminrContainerManagerProvider', function(AdminrContainerManagerProvider) {
    var AdminrMdLayoutStructure;
    AdminrMdLayoutStructure = (function() {
      function AdminrMdLayoutStructure() {}

      AdminrMdLayoutStructure.prototype.brandTitle = null;

      AdminrMdLayoutStructure.prototype.setAsRootContainer = function() {
        return AdminrContainerManagerProvider.setViewForRootContainer('adminr-md-layout');
      };

      AdminrMdLayoutStructure.prototype.setBrandTitle = function(title) {
        return this.brandTitle = title;
      };

      AdminrMdLayoutStructure.prototype.$get = function() {
        return this;
      };

      return AdminrMdLayoutStructure;

    })();
    return new AdminrMdLayoutStructure();
  }
]);


},{"./components/layout.coffee":1,"./views/layout.html":3}],3:[function(require,module,exports){
module.exports = '<div ng-controller="AppCtrl" layout="column" style="height:100%" ng-cloak flex>\n    <md-toolbar>\n        <div class="md-toolbar-tools">\n            <md-button ng-click="toggleLeft()" class="md-icon-button" hide-gt-md show-md>\n                <ng-md-icon icon="reorder"></ng-md-icon>\n            </md-button>\n            <h2>\n                <span>title</span>\n            </h2>\n            <span flex></span>\n            <md-menu md-offset="0 60">\n                <md-button ng-click="$mdOpenMenu($event)" class="md-icon-button">\n                    <ng-md-icon icon="account_circle"></ng-md-icon>\n                </md-button>\n                <md-menu-content width="4">\n                    <md-menu-item>\n                        <md-button ng-click="ctrl.redial($event)">\n                            <md-icon md-svg-icon="call:dialpad" md-menu-align-target></md-icon>\n                            Redial\n                        </md-button>\n                    </md-menu-item>\n                </md-menu-content>\n            </md-menu>\n        </div>\n    </md-toolbar>\n    <section layout="row" flex>\n        <md-sidenav class="md-sidenav-left md-whiteframe-z2" md-component-id="left" md-is-locked-open="$mdMedia(\'gt-md\')">\n            <md-toolbar class="md-theme-indigo" hide-gt-md show-md>\n                <h1 class="md-toolbar-tools">Sidenav Left</h1>\n            </md-toolbar>\n            <md-content layout-padding ng-controller="LeftCtrl">\n                <md-button ng-click="close()" class="md-primary" hide-gt-md>\n                    Close Sidenav Left\n                </md-button>\n                <p hide-md show-gt-md>\n                    This sidenav is locked open on your device. To go back to the default behavior,\n                    narrow your display.\n                </p>\n            </md-content>\n        </md-sidenav>\n        <md-content flex layout-padding>\n            <div layout="column" layout-fill layout-align="top center">\n                <!--<p>-->\n                    <!--The left sidenav will \'lock open\' on a medium (>=960px wide) device.-->\n                <!--</p>-->\n                <!--<p>-->\n                    <!--The right sidenav will focus on a specific child element.-->\n                <!--</p>-->\n                <!--<div>-->\n                    <!--<md-button ng-click="toggleLeft()"-->\n                               <!--class="md-primary" hide-gt-md>-->\n                        <!--Toggle left-->\n                    <!--</md-button>-->\n                <!--</div>-->\n                <!--<div>-->\n                    <!--<md-button ng-click="toggleRight()"-->\n                               <!--ng-hide="isOpenRight()"-->\n                               <!--class="md-primary">-->\n                        <!--Toggle right-->\n                    <!--</md-button>-->\n                <!--</div>-->\n            </div>\n            <div flex></div>\n        </md-content>\n        <md-sidenav class="md-sidenav-right md-whiteframe-z2" md-component-id="right" adminr-container="\'adminr-md-layout-right\'">\n            <!--<md-toolbar class="md-theme-light">-->\n                <!--<h1 class="md-toolbar-tools">Sidenav Right</h1>-->\n            <!--</md-toolbar>-->\n            <!--<md-content layout-padding>-->\n                <!--<form>-->\n                    <!--<md-input-container>-->\n                        <!--<label for="testInput">Test input</label>-->\n                        <!--<input type="text" id="testInput"-->\n                               <!--ng-model="data" md-autofocus>-->\n                    <!--</md-input-container>-->\n                <!--</form>-->\n                <!--<md-button ng-click="close()" class="md-primary">-->\n                    <!--Close Sidenav Right-->\n                <!--</md-button>-->\n            <!--</md-content>-->\n        </md-sidenav>\n    </section>\n</div>';
},{}]},{},[2]);
