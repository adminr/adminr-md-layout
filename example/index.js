var mod = angular.module('adminr-core-test',['adminr-md-layout']);

mod.config(function(AdminrMdLayoutProvider){
    AdminrMdLayoutProvider.setAsRootContainer()
})

//
//mod.config(function(AdminrBasicLayoutProvider) {
//    AdminrBasicLayoutProvider.setHomePage('Dashboard', 'dashboard.html')
//    AdminrBasicLayoutProvider.addPage('users', 'Users', {url:'/users', templateUrl:'users.html'}).setIcon('users')
//        .addPage('userDetail','User detail',{url:'/users/:id',templateUrl:'user-detail.html'})
//    AdminrBasicLayoutProvider.addPage('table-panel', 'Table panel', {url:'/table-panel', templateUrl:'table-panel.html'}).setIcon('users')
//})
//
//mod.controller('TestCtrl',function($scope,AdminrDataSources){
//    $scope.datasource = AdminrDataSources.getDataSource('Test')
//    $scope.me = $scope.datasource.getResource('Me').get()
//    $scope.users = $scope.datasource.getResource('User').query()
//})
//
//mod.controller('UserDetailCtrl',function($scope,AdminrDataSources,$state){
//    datasource = AdminrDataSources.getDataSource('Test')
//    $scope.user = datasource.getResource('User').get({id:$state.params.id})
//})