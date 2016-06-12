var app = app || {};

app.phonesModel = (function () {
    function PhonesModel(requester) {
        this.requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/phones/';
    }

    PhonesModel.prototype.getPhonesByCreatorId = function(userId) {
        var requestUrl = this.serviceUrl + '?query={"_acl.creator":"'+ userId + '"}';
        return this.requester.get(requestUrl, true);
    };

    PhonesModel.prototype.addPhone = function(data) {
        return this.requester.post(this.serviceUrl, data, true);
    };

    PhonesModel.prototype.editPhone = function(noteId, data) {
        var requestUrl = this.serviceUrl + noteId;
        return this.requester.put(requestUrl, data, true);
    };

    PhonesModel.prototype.deletePhone = function(noteId) {
        var requestUrl = this.serviceUrl + noteId;
        return this.requester.delete(requestUrl, true);
    };

    return {
        load: function (requester) {
            return new PhonesModel(requester);
        }
    }
}());