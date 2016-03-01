mod = angular.module('adminr-md-layout',['adminr-basic-layout','adminr-core','ngMaterial','ngMdIcons'])


require('./components/layout.coffee')

mod.run(['$templateCache',($templateCache)->
  $templateCache.put('adminr-md-layout',require('./views/layout.html'))
  $templateCache.put('adminr-md-layout-side-menu',require('./views/side-menu.html'))
])


mod.provider('AdminrMdLayout',['AdminrContainerManagerProvider','AdminrBasicLayoutProvider',(AdminrContainerManagerProvider,AdminrBasicLayoutProvider)->

  class AdminrMdLayoutStructure

    sidemenu: AdminrBasicLayoutProvider

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
