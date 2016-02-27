mod = angular.module('adminr-md-layout',['adminr-basic-layout','adminr-core','ngMaterial','ngMdIcons'])


require('./components/layout.coffee')

mod.run(['$templateCache',($templateCache)->
  $templateCache.put('adminr-md-layout',require('./views/layout.html'))
])


mod.provider('AdminrMdLayout',['AdminrContainerManagerProvider',(AdminrContainerManagerProvider)->

  class AdminrMdLayoutStructure

    brandTitle: null

    setAsRootContainer:()->
      AdminrContainerManagerProvider.setViewForRootContainer('adminr-md-layout')
#    setAsRootContainerWithLogin:()->
#      AdminrMdLoginProvider.setAsRootContainerView()
#      AdminrMdLoginProvider.setLoggedView('adminr-md-layout')
    setBrandTitle:(title)->
      @brandTitle = title
    $get:()->
      return @

  return new AdminrMdLayoutStructure()
])
#mod.controller('SBAdminCtrl',['$scope','$state','AdminrSBAdmin',($scope,$state,AdminrSBAdmin)->
#  $scope.brandTitle = AdminrSBAdmin.brandTitle
#])
