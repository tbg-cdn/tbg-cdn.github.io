var Better_Ads_Manager_Admin = (function($) {
    "use strict";

    return {

        init: function(){
            Better_Ads_Manager_Admin.update_responsive_fields();

            $('.bf-select-option-container  select[name="bf-metabox-option[better_ads_banner_options][type]"]').on( 'change', function () {
                Better_Ads_Manager_Admin.update_responsive_fields();
            });
        },

        update_responsive_fields: function () {
            var value = $('.bf-select-option-container  select[name="bf-metabox-option[better_ads_banner_options][type]"] option:selected').attr('value'),
                $resp = $( '.bf-section[data-id="responsive_options"] .better-ads-table' );

            if( value == 'code' ){
                $resp.addClass('show-sizes')
            }else{
                $resp.removeClass('show-sizes')
            }
        }

    };
})(jQuery);

// Load when ready
jQuery(document).ready(function() {
    Better_Ads_Manager_Admin.init();
});
