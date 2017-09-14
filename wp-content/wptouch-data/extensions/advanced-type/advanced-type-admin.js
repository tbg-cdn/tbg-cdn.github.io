jQuery( document ).ready( function() {
	advancedTypeAdminReady();
});

function advancedTypeAdminReady(){

	// Advanced Type Options
	jQuery( '#advanced_type_source' ).on( 'change', function() {

		var googleDiv = jQuery( '#section-addon-type-subsets' );
		var typekitDiv = jQuery( '#section-addon-type-typekit' );
		var  fontDeck = jQuery( '#section-addon-type-fontdeck' );

		switch( jQuery( this ).val() ) {
			default:
				googleDiv.hide();
				typekitDiv.hide();
				fontDeck.hide();
				break;
			case 'google':
				googleDiv.fadeIn();
				typekitDiv.hide();
				fontDeck.hide();
				break;
			case 'typekit':
				googleDiv.hide();
				typekitDiv.fadeIn();
				fontDeck.hide();
				break;
			case 'fontdeck':
				googleDiv.hide();
				typekitDiv.hide();
				fontDeck.fadeIn();
				break;
		}

	} ).trigger( 'change' );

	// Reload Typekit button
	var reloadTypekitButton = jQuery( '#advanced_type_reload_typekit' );
	reloadTypekitButton.click( function( e ) {
		var ajaxParams = {
			typekit_id: jQuery( advanced_type_typekit_kit ).val()
		};

		reloadTypekitButton.attr( 'disabled', 'disabled' );
		wptouchAdminAjax( 'advanced-type-reload-typekit', ajaxParams, function( result ) {
			reloadTypekitButton.removeAttr( 'disabled' );
			reloadTypekitButton.after( ' <span class="reload-typekit"></span>' );
			setTimeout( function(){ jQuery( '.reload-typekit' ).fadeOut( function() { jQuery( this ).remove(); } ); }, 1500 );
		});
		e.preventDefault();
	});

}
