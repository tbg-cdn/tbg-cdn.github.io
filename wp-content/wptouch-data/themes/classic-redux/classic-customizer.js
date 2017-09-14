
function doClassicCustomizerReady() {

	// Post thumbnails select
	jQuery( '[id$=_use_thumbnails]' ).on( 'change wptouch.customizerReady', 'select', function() {
		var thumbSetting = jQuery( '[id$=_thumbnail_type] *' );

		switch( jQuery( this ).val() ) {
			default:
				thumbSetting.show();
			break;
			case 'none':
				thumbSetting.hide();
			break;
		}
	});

	// Thumbnail Image
	var thumbnailSelect = jQuery( '[id$=_thumbnail_type]' );

	thumbnailSelect.on( 'change wptouch.customizerReady', 'select', function(){
		if ( jQuery( this ).val() == 'featured' ) {
			thumbnailSelect.next().find( '*' ).hide();
		} else {
			thumbnailSelect.next().find( '*' ).show();
		}
	});

	// Tab-bar

	jQuery( '[id$=show_tab_bar]' ).on( 'change wptouch.customizerReady', 'input', function(){
		if ( jQuery( this ).is( ':checked' ) ) {
			jQuery( '[id$=tab_bar_cat_tags], [id$=max_cat_tags]' ).show();
		} else {
			jQuery( '[id$=tab_bar_cat_tags], [id$=max_cat_tags]' ).hide();
		}
	});

	jQuery( '[id$=tab_bar_cat_tags]' ).on( 'change wptouch.customizerReady', 'select', function() {
		var thumbSetting = jQuery( '[id$=max_cat_tags] *' );

		switch( jQuery( this ).val() ) {
			case 'none':
				thumbSetting.hide();
			break;
			default:
				thumbSetting.show();
			break;
		}
	});

	jQuery( '#customize-theme-controls ul li' ).find( 'select' ).trigger( 'wptouch.customizerReady' );
	jQuery( '[id$=show_tab_bar]' ).find( 'input' ).trigger( 'wptouch.customizerReady' );
}


jQuery( window ).load( function() { doClassicCustomizerReady(); } );