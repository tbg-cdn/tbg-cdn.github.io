(function ($) {

    window.XtButtonView = vc.shortcode_view.extend({events:function () {
        return _.extend({'click button':'buttonClick'
        }, window.VcToggleView.__super__.events);
    },
        buttonClick:function (e) {
            e.preventDefault();
        },
        changeShortcodeParams:function (model) {
            var params = model.get('params');
            window.XtButtonView.__super__.changeShortcodeParams.call(this, model);
            if (_.isObject(params)) {
                this.$el.find('.wpb_element_wrapper').css("","");
            }
        }
    });

})(window.jQuery);