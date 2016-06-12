var app = app || {};


(function () {
    var router = Sammy(function () {
        var selector = '#wrapper';
        var requester = app.requester.load('kid_Zk-9Kju21W', '5048c805f6b549bc9d7824bb7d87bbdc', 'https://baas.kinvey.com/');

        var userViewBag = app.userViewBag.load();
        var homeViewBag = app.homeViewBag.load();
        var phonesViewBag = app.phonesViewBag.load();

        var userModel = app.userModel.load(requester);
        var phonesModel = app.phonesModel.load(requester);

        var userController = app.userController.load(userViewBag, userModel);
        var homeController = app.homeController.load(homeViewBag);
        var phonesController = app.phonesController.load(phonesViewBag, phonesModel);

        this.before({except:{path:'#\/(login\/|register\/)?'}}, function() {
            if(!sessionStorage['sessionId']) {
                this.redirect('#/');
                return false;
            }
        });

        this.before(function() {
            if(!sessionStorage['sessionId']) {
                $('#menu').hide();
            } else {
                $('#menu').show();
            }
        });

        this.get('#/', function() {
            homeController.loadWelcomePage(selector);
        });

        this.get('#/home/', function() {
            homeController.loadHomePage(selector);
        });

        this.get('#/login/', function() {
            userController.loadLoginPage(selector);
        });

        this.get('#/register/', function() {
            userController.loadRegisterPage(selector);
        });

        this.get('#/logout/', function() {
            userController.logout();
        });

        this.get('#/phonebook/', function() {
            phonesController.loadMyPhones(selector);
        });

        this.get('#/addPhone/', function() {
            phonesController.loadAddPhone(selector);
        });

        this.get('#/editProfile/', function() {
            userController.loadEditProfile(selector);
        });

        this.bind('redirectUrl', function(ev, data) {
            this.redirect(data.url);
        });

        this.bind('login', function(ev, data) {
            userController.login(data);
        });

        this.bind('register', function(ev, data) {
            userController.register(data);
        });

        this.bind('addPhone', function(ev, data) {
            phonesController.addPhone(data);
        });

        this.bind('showEditPhone', function(ev, data) {
            phonesController.loadEditPhone(selector, data);
        });

        this.bind('editPhone', function(ev, data) {
            phonesController.editPhone(data);
        });

        this.bind('showDeletePhone', function(ev, data) {
            phonesController.loadDeletePhone(selector, data);
        });

        this.bind('deletePhone', function(ev, data) {
            phonesController.deletePhone(data._id);
        });

        this.bind('editProfile', function(ev, data) {
            userController.editProfile(data);
        })
    });

    router.run('#/');
}());

