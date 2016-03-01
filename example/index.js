var mod = angular.module('adminr-core-test',['adminr-md-layout']);

mod.config(function(AdminrMdLayoutProvider){
    AdminrMdLayoutProvider.setAsRootContainer()
})


mod.config(function(AdminrMdLayoutProvider) {
    AdminrMdLayoutProvider.brandTitle = 'MdLayout example'
    AdminrMdLayoutProvider.sidemenu.setHomePage('Dashboard', 'dashboard.html').setIcon('view-dashboard')
    AdminrMdLayoutProvider.sidemenu.addPage('users', 'Users', {url:'/users', templateUrl:'users.html'}).setIcon('account')
        .addPage('userDetail','User detail',{url:'/users/:id',templateUrl:'user-detail.html'})
    AdminrMdLayoutProvider.sidemenu.addPage('table-panel', 'Table panel', {url:'/table-panel', templateUrl:'table-panel.html'}).setIcon('account-multiple')
})
