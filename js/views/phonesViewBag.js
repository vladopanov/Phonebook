var app = app || {};

app.phonesViewBag = (function () {
    function showMyPhones(selector, data) {
        $.get('templates/phonebook.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);

            $('#addPhoneButton').on('click', function () {
                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/addPhone/'});
                });
            });

            $('.editButton').on('click', function () {
                var dataId = $(this).parent().parent().attr('data-id');

                var phone = data.phones.filter(function (a) {
                    return a.id == dataId;
                });

                if (phone.length) {
                    Sammy(function () {
                        this.trigger('showEditPhone', phone[0]);
                    })
                }
            });
            $('.deleteButton').on('click', function () {
                var dataId = $(this).parent().parent().attr('data-id');

                var phone = data.phones.filter(function (a) {
                    return a.id == dataId;
                });

                if (phone.length) {
                    Sammy(function () {
                        this.trigger('showDeletePhone', phone[0]);
                    })
                }
            })
        })
    }

    function showAddPhone(selector) {
        $.get('templates/addPhone.html', function (templ) {
            $(selector).html(templ);
            $('#addPhoneButton').on('click', function () {
                var personName = $('#personName').val(),
                    phoneNumber = $('#phoneNumber').val();

                Sammy(function () {
                this.trigger('addPhone', {person: personName, number: phoneNumber});
                })
            })
        })
    }

    function showEditPhone(selector, data) {
        $.get('templates/editPhone.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('#editPhoneButton').on('click', function() {
                var personName = $('#personName').val(),
                    phoneNumber = $('#phoneNumber').val(),
                    id = $(this).parent().parent().attr('data-id');

                Sammy(function () {
                    this.trigger('editPhone', {person: personName, number: phoneNumber, _id: id});
                })
            })
        })
    }

    function showDeletePhone(selector, data) {
        $.get('templates/deletePhone.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('#confirmDeleteButton').on('click', function() {
                var id = $(this).parent().parent().attr('data-id');

                Sammy(function () {
                    this.trigger('deletePhone', {_id:id});
                })
            })
        })
    }

    return {
        load: function () {
            return {
                showMyPhones: showMyPhones,
                showAddPhone: showAddPhone,
                showEditPhone: showEditPhone,
                showDeletePhone: showDeletePhone
            }
        }
    }
}());