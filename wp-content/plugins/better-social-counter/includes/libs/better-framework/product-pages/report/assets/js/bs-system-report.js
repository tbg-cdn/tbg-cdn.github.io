(function ($) {


    var BS_Product_System_Status = function () {

        this.init();
        this.copy();
        this.textarea_click();
    }


    BS_Product_System_Status.prototype = {

        init: function () {

            var self = this;

            $("#bs-get-system-report").on('click', function (e) {
                e.preventDefault();
                var animation_speed = 300,
                    $contianer = $("#bs-system-container");

                //hide get system report section
                $(this)
                    .closest('.bs-pages-list-item')
                    .slideUp(animation_speed);

                //remove hide class of parent element and display system report
                $contianer
                    .closest('.bs-pages-list-item')
                    .removeClass('bs-item-hide');
                $contianer
                    .slideDown(animation_speed);

                //automatic copy data to clipboard
                $contianer
                    .delay(animation_speed)
                    .queue(function (n) {
                        self._select_all();
                        n();
                    })
            });
        },

        copy: function () {

            var self = this;
            $("#bs-copy-system-report").on('click', function (e) {
                e.preventDefault();

                self._select_all();
                document.execCommand('copy');

            });
        },
        textarea_click: function () {
            var self = this;
            $("#bs-system-container ").on('click', '.bs-output', function () {
                self._select_all();
            });
        },
        _select_all: function () {

            $("#bs-system-container textarea").focus().select();
        },
        _get_ajax_params: function (params) {
            var default_obj = {},
                default_params = $("#bs-pages-hidden-params").serializeArray();

            if (default_params) {
                for (var i = 0; i < default_params.length; i++) {
                    default_obj[ default_params[ i ].name ] = default_params[ i ].value;
                }
            }

            return $.extend(default_obj, params);
        },
    }

    $(document).ready(function () {

        new BS_Product_System_Status();
    })
})(jQuery)