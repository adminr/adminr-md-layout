(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var mod;

mod = angular.module('adminr-md-layout');

mod.controller('MdLayoutCtrl', [
  '$scope', '$timeout', '$mdSidenav', '$log', 'AdminrMdLayout', function($scope, $timeout, $mdSidenav, $log, AdminrMdLayout) {
    var buildDelayedToggler, buildToggler, debounce;
    $scope.brandTitle = AdminrMdLayout.brandTitle;

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
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
  }
]).controller('LeftCtrl', [
  '$scope', '$timeout', '$mdSidenav', '$log', function($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function() {
      $mdSidenav('left').close().then(function() {
        $log.debug('close LEFT is done');
      });
    };
  }
]);


},{}],2:[function(require,module,exports){
var mod;

mod = angular.module('adminr-md-layout', ['adminr-basic-layout', 'adminr-core', 'ngMaterial']);

require('./components/layout.coffee');

mod.run([
  '$templateCache', function($templateCache) {
    $templateCache.put('adminr-md-layout', require('./views/layout.html'));
    return $templateCache.put('adminr-md-layout-side-menu', require('./views/side-menu.html'));
  }
]);

mod.provider('AdminrMdLayout', [
  'AdminrContainerManagerProvider', 'AdminrBasicLayoutProvider', function(AdminrContainerManagerProvider, AdminrBasicLayoutProvider) {
    var AdminrMdLayoutStructure;
    AdminrMdLayoutStructure = (function() {
      function AdminrMdLayoutStructure() {}

      AdminrMdLayoutStructure.prototype.sidemenu = AdminrBasicLayoutProvider;

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


},{"./components/layout.coffee":1,"./views/layout.html":3,"./views/side-menu.html":4}],3:[function(require,module,exports){
module.exports = '<div ng-controller="MdLayoutCtrl" layout="column" style="height:100%" ng-cloak flex>\n    <md-toolbar>\n        <div class="md-toolbar-tools">\n            <md-button ng-click="toggleLeft()" class="md-icon-button" hide-gt-md show-md>\n                <i class="mdi mdi-menu mdi-24px"></i>\n            </md-button>\n            <h2>\n                <span>{{brandTitle}}</span>\n            </h2>\n            <div adminr-container="\'navbar-left-content\'" optional-container></div>\n            <span flex></span>\n            <div adminr-container="\'navbar-right-content\'" optional-container></div>\n            <md-menu md-offset="0 60">\n                <md-button ng-click="$mdOpenMenu($event)" class="md-icon-button">\n                    <i class="mdi mdi-account-circle mdi-24px"></i>\n                </md-button>\n                <md-menu-content adminr-container="\'adminr-md-layout-top-menu\'">\n                    <!--<md-menu-item>-->\n                        <!--<md-button ng-click="datasource.logout()">-->\n                            <!--<i class="mdi mdi-logout"></i>-->\n                            <!--Logout-->\n                        <!--</md-button>-->\n                    <!--</md-menu-item>-->\n                </md-menu-content>\n            </md-menu>\n        </div>\n    </md-toolbar>\n    <section layout="row" flex style="overflow: auto;">\n        <md-sidenav class="md-sidenav-left md-whiteframe-z2" md-component-id="left" md-is-locked-open="$mdMedia(\'gt-md\')">\n            <md-toolbar class="md-theme-indigo" hide-gt-md show-md>\n                <div class="md-toolbar-tools">\n                    <md-button ng-click="toggleLeft()" class="md-icon-button" hide-gt-md show-md>\n                        <i class="mdi mdi-arrow-left mdi-24px"></i>\n                    </md-button>\n                    <h1>{{brandTitle}}</h1>\n                </div>\n            </md-toolbar>\n            <md-content ng-controller="LeftCtrl" ng-include="\'adminr-md-layout-side-menu\'">\n            </md-content>\n        </md-sidenav>\n        <md-content class="layout-content" flex layout-padding ui-view>\n\n        </md-content>\n        <!--<md-sidenav class="md-sidenav-right md-whiteframe-z2" md-component-id="right" adminr-container="\'adminr-md-layout-right\'">-->\n        <!--</md-sidenav>-->\n    </section>\n</div>';
},{}],4:[function(require,module,exports){
module.exports = '<ul class="sidenav">\n    <li ng-class="{active:$homePage.isCurrent($page)}" layout="row">\n        <md-button ui-sref="{{$homePage.stateName}}" ng-click="toggleLeft()" flex>\n            <i class="mdi mdi-{{$homePage.getIcon()}} mdi-18px"></i>{{$homePage.name}}\n        </md-button>\n    </li>\n    <li ng-repeat="page in $rootPage.children" ng-class="{active:page.isCurrent($page)}" layout="row">\n        <md-button ui-sref="{{page.stateName}}" ng-click="toggleLeft()" flex>\n            <i class="mdi mdi-{{page.getIcon()}} mdi-18px"></i>{{page.name}}\n        </md-button>\n    </li>\n</ul>\n';
},{}]},{},[2]);
