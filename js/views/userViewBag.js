var app = app || {};

app.userViewBag = (function () {
    function showLoginPage(selector) {
        $.get('templates/login.html', function (templ) {
            $(selector).html(templ);
            $('#loginButton').on('click', function () {
                var username = $('#username').val(),
                    password = $('#password').val();

                Sammy(function() {
                    this.trigger('login', {username: username, password: password});
                })
            })
        })
    }

    function showRegisterPage(selector) {
        $.get('templates/register.html', function (templ) {
            $(selector).html(templ);
            $('#registerButton').on('click', function () {
                var username = $('#username').val(),
                    password = $('#password').val(),
                    fullName = $('#fullName').val();

                Sammy(function() {
                    this.trigger('register', {username: username, password: password, fullName: fullName});
                })
            })
        })
    }

    function showEditProfilePage(selector) {
        $.get('templates/editProfile.html', function (templ) {
            var data = {
                fullName: sessionStorage['fullName'],
                username: sessionStorage['username']
            };

            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('#editProfileButton').on('click', function () {
                var username = $('#username').val(),
                    password = $('#password').val(),
                    fullName = $('#fullName').val();

                Sammy(function() {
                    this.trigger('editProfile', {username: username, password: password, fullName: fullName});
                })
            })
        })
    }

    return {
        load: function () {
            return {
                showLoginPage: showLoginPage,
                showRegisterPage: showRegisterPage,
                showEditProfilePage: showEditProfilePage
            }
        }
    }
}());