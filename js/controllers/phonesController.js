var app = app || {};

app.phonesController = (function () {
    function PhonesController(viewBag, model) {
        this.model = model;
        this.viewBag = viewBag;
    }

    PhonesController.prototype.loadMyPhones = function (selector) {
        var _this = this;
        var userId = sessionStorage['userId'];
        this.model.getPhonesByCreatorId(userId)
            .then(function (data) {
                var result = {
                    phones: []
                };

                data.forEach(function (phone) {
                    result.phones.push({
                        person: phone.person,
                        number: phone.number,
                        id: phone._id
                    })
                });

                _this.viewBag.showMyPhones(selector, result);
            })
    };

    PhonesController.prototype.loadAddPhone = function (selector) {
        this.viewBag.showAddPhone(selector);
    };

    PhonesController.prototype.addPhone = function (data) {
        var result = {
            person: data.person,
            number: data.number,
            author: sessionStorage['username']
        };

        this.model.addPhone(result)
            .then(function (success) {
                noty({ text: 'Successfully added.', type: 'success'});
                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/phonebook/'});
                });
            }).done();
    };

    PhonesController.prototype.loadEditPhone = function (selector, data) {
        this.viewBag.showEditPhone(selector, data);
    };

    PhonesController.prototype.editPhone = function (data) {
        data.author = sessionStorage['username'];
        this.model.editPhone(data._id, data)
            .then(function (success) {
                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/phonebook/'});
                });
            }).done();
    };

    PhonesController.prototype.loadDeletePhone = function (selector, data) {
        this.viewBag.showDeletePhone(selector, data);
    };

    PhonesController.prototype.deletePhone = function (noteId) {
        this.model.deletePhone(noteId)
            .then(function (success) {
                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/phonebook/'});
                });
            }).done();
    };

    return {
        load: function (viewBag, model) {
            return new PhonesController(viewBag, model);
        }
    };
}());