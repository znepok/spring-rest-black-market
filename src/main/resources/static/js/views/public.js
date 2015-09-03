var $ = require("jquery"),
    _ = require("underscore"),
    prefix = "currency-black-market:",
    URI = require('URIjs');
    Backbone = require("backbone");

var View = Backbone.View.extend({
    el: $(".container"),
    initialize: function () {
        _.bindAll(this, "render");
        this.model.bind("change", this.render);
    },
    render: function () {
        var $tbody = this.$("#ads-list tbody");

        $tbody.empty();
        _.each(this.model.embedded(prefix + "ads"), function (data) {
            $tbody.append(new AdView({model: data}).render().el);
        }, this);

        this.$("#next").toggle(!!this.model.link("next"));
        this.$("#prev").toggle(!!this.model.link("prev"));
    },
    events: {
/*        "click #next": "goNext",
        "click #prev": "goPrev",*/
        "click .navigation": function(e) {
            e.preventDefault(e);
            this.go(e.target.id);
        }
    },/*
    goNext: function (e) {
        e.preventDefault(e);
        this.go("next");
    },
    goPrev: function (e) {
        e.preventDefault(e);
        this.go("prev");
    },*/
    go: function (where) {
        var data = URI(this.model.link(where).href()).query(true);
        this.model.fetch({data: data});
    }
});

var AdView = Backbone.View.extend({
    tagName: "tr",
    template: _.template($("#ad-template").html()),
    render: function () {
        this.$el.html(this.template(this.model));
        return this;
    }
});

module.exports = {
    View: View,
    AdView: AdView
};