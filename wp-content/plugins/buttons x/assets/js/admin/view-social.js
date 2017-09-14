jQuery.fn.extend({
    btnsxFacebook: function () {
        var fbEl = jQuery( this );
        var fbUrl = jQuery( '#btnsx_opt_fb_url' ).val();
        var fbWidth = jQuery( '#btnsx_opt_fb_width' ).val();
        var fbHeight = jQuery( '#btnsx_opt_fb_height' ).val();
        var fbLayout = jQuery( '#btnsx_opt_fb_layout' ).val();
        var fbAction = jQuery( '#btnsx_opt_fb_action' ).val();
        var fbColorScheme = jQuery( '#btnsx_opt_fb_colorscheme' ).val();
        var fbFaces = jQuery( '#btnsx_opt_fb_show_faces' ).val();
        var fbShare = jQuery( '#btnsx_opt_fb_share' ).val();
        var fbKidDirectedSite = jQuery( '#btnsx_opt_fb_kid_directed_site' ).val();
        fbEl.attr({ 
        	'data-href': fbUrl,
        	'data-width': fbWidth,
        	'data-height': fbHeight,
        	'data-layout': fbLayout,
        	'data-action': fbAction,
        	'data-colorscheme': fbColorScheme,
        	'data-show-faces': fbFaces,
        	'data-share': fbShare,
        	'data-kid-directed-site': fbKidDirectedSite
        });
        if( typeof FB !== 'undefined' ){
        	FB.XFBML.parse( document.getElementById( 'btnsx-preview-container' ) );
        }
    },
    btnsxTwitter: function() {
		var twType = jQuery( '#btnsx_opt_tw_type' ).val();
		var twUrl = jQuery( '#btnsx_opt_tw_url' ).val();
		var twText = jQuery( '#btnsx_opt_tw_text' ).val();
		var twUsername = jQuery( '#btnsx_opt_tw_username' ).val();
		var twRecommend = jQuery( '#btnsx_opt_tw_related' ).val();
		var twHashtag = jQuery( '#btnsx_opt_tw_hashtag' ).val();
		var twCount = jQuery( '#btnsx_opt_tw_count' ).val();
		var twSize = jQuery( '#btnsx_opt_tw_size' ).val();
		var twDnt = jQuery( '#btnsx_opt_tw_dnt' ).val();
		var twScreenName = jQuery( '#btnsx_opt_tw_screen_name' ).val();
		var twHref,twClass;

		if( twUsername == '' || twUsername == 'undefined' ) {
			twUsername = 'twitter';
		}

		if( twHashtag == '' || twHashtag == 'undefined' ) {
			twHashtag = 'ButtonsX';
		}

		if( twSize === '1' ) {
			twSize = 'large';
		}else{
			twSize = 'small';
		}

		if( twDnt === '1' ) {
			twDnt = 'true';
		}else{
			twDnt = 'false';
		}

		if( twScreenName === '1' ) {
			twScreenName = 'true';
		}else{
			twScreenName = 'false';
		}

		if( twType === 'tweet' ) {
			twHref = 'https://twitter.com/share';
			twClass = 'twitter-share-button';
		}else if( twType === 'follow' ) {
			twHref = 'https://twitter.com/' + twUsername;
			twClass = 'twitter-follow-button';
		}else if( twType === 'hashtag' ) {
			twHref = 'https://twitter.com/intent/tweet?button_hashtag=' + twHashtag;
			twClass = 'twitter-hashtag-button';
		}else{
			twHref = 'https://twitter.com/intent/tweet?screen_name=' + twUsername;
			twClass = 'twitter-mention-button';
		}

		jQuery( '#btnsx-twitter-container' ).html( '<a id="btnsx-tw" href="'+ twHref +'" class="' + twClass + '"></a>' );
		var twEl = jQuery( '#btnsx-tw' );
		
		twEl.attr({ 
			'href': twHref, 
        	'data-url': twUrl,
        	'data-text': twText,
        	'data-size': twSize,
        	'data-count': twCount,
        	'data-count-url': twUrl,
        	'data-via': twUsername,
        	'data-related': twRecommend,
        	'data-hashtags': twHashtag,
        	'data-dnt': twDnt,
        	'data-show-screen-name': twScreenName
        });
        if( typeof twttr !== 'undefined' ){
        	twttr.widgets.load();
        }
    },
    btnsxGooglePlus: function () {
        var gpEl = jQuery( this );
		var gpType = jQuery( '#btnsx_opt_gp_type' ).val();
		var gpOneSize = jQuery( '#btnsx_opt_gp_one_size' ).val();
		var gpOneLayout = jQuery( '#btnsx_opt_gp_one_layout' ).val();
		var gpUrl = jQuery( '#btnsx_opt_gp_url' ).val();
		var gpUser = jQuery( '#btnsx_opt_gp_user' ).val();
		var gpSize = jQuery( '#btnsx_opt_gp_size' ).val();
		var gpFollowLayout = jQuery( '#btnsx_opt_gp_follow_layout' ).val();
		var gpShareLayout = jQuery( '#btnsx_opt_gp_share_layout' ).val();
		var gpWidth = jQuery( '#btnsx_opt_gp_width' ).val();
		var gpClass, gpAnnotation;

		jQuery( '#btnsx-googleplus-container' ).html( '<div id="btnsx-gp" class=""></div>' );
		var gpEl = jQuery( '#btnsx-gp' );
		
		if( gpType === 'one' ){
			gpClass = 'g-plusone';
		}else if( gpType === 'follow' ){
			gpClass = 'g-follow';
		}else{
			gpClass = 'g-plus';
		}
		
		if( gpType === 'one' ) {
			gpAnnotation = gpOneLayout;
			gpSize = gpOneSize;
		}else if( gpType === 'follow' ) {
			gpAnnotation = gpFollowLayout;
			gpUrl = gpUser;
			gpEl.attr('data-rel', 'publisher');
			if ( gpSize == 'medium' ) {
				gpEl.attr( 'data-height', '20' );
			} else if ( gpSize == 'large' ) {
				gpEl.attr( 'data-height', '24' );
			} else {
				gpEl.attr( 'data-height', '15' );
			}
		}else if( gpType === 'share' ) {
			gpAnnotation = gpShareLayout;
			gpEl.attr({ 
				'data-action': 'share',
				'data-rel': 'author'
			});
			// if ( gpSize == 'medium' ) {
			// 	gpEl.attr( 'data-height', '20' );
			// } else if ( gpSize == 'large' ) {
			// 	gpEl.attr( 'data-height', '24' );
			// } else {
			// 	gpEl.attr( 'data-height', '15' );
			// }
		}
		
        gpEl.attr({
        	'class': gpClass,
        	'data-size': gpSize,
        	'data-annotation': gpAnnotation,
        	'data-width': gpWidth,
        	'data-href': gpUrl
        });

        if( gpType == 'share' ) {
        	gpEl.removeAttr( 'data-size' );
        }

        if( gpWidth == '' ) {
        	gpEl.removeAttr( 'data-width' );
        }

        if( typeof gapi !== 'undefined' ){
        	gapi.plusone.go( '#btnsx-googleplus-container' );
	        gapi.follow.go( '#btnsx-googleplus-container' );
	        gapi.plus.go( '#btnsx-googleplus-container' );
        }
    },
    btnsxLinkedin: function () {
		var liUrl = jQuery( '#btnsx_opt_li_url' ).val();
		var liCounterType = jQuery( '#btnsx_opt_li_counter_type' ).val();

		jQuery( '#btnsx-linkedin-container' ).find( 'script' ).remove();
		jQuery( '#btnsx-linkedin-container' ).append( '<script id="btnsx-li" type="IN/Share" data-counter="right"></script>' );
		var liEl = jQuery( '#btnsx-li' );

		liEl.attr({
        	'data-url': liUrl,
        	'data-counter': liCounterType
        });

		if( liCounterType === 'none' ) {
			liEl.removeAttr( 'data-counter' );
		}

        if (typeof (IN) != 'undefined') {
		    IN.parse();
		}
		jQuery( '#btnsx-linkedin-container .IN-widget' ).hide();
		jQuery( '#btnsx-linkedin-container .IN-widget:last' ).fadeIn();
    }
});
jQuery( document ).ready( function( $ ) {

	// Checkbox Values
	$('.btnsx-checkbox').each(function(){
		$(this).on('change',function(){
			if( $(this).is(':checked') ){
	    		$(this).val(1);
	    	} else {
	    		$(this).val(0);
	    	}
	    });
	});

	// Variables
	var socialBtnContainer = $( '#btnsx-preview-container' );
	var socialBtnFbContainer = $( '#btnsx-fb-container' );
	var socialBtnTwContainer = $( '#btnsx-twitter-container' );
	var socialBtnGpContainer = $( '#btnsx-googleplus-container' );
	var socialBtnLiContainer = $( '#btnsx-linkedin-container' );
	var socialBtnLoader = $( '#btnsx-preview-loader' );

	// Facebook script
		(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

		var fb = $( '#btnsx_opt_social_facebook' );
		var enableFb = fb.val();
		if( enableFb === '1' ){
			socialBtnFbContainer.fadeIn();
		} else {
			socialBtnFbContainer.hide();
		}
		$('#btnsx_opt_social_facebook').on('change',function(){
			var val = $(this).val();
			if( val === '0' ){
				socialBtnFbContainer.hide();
			}else{
				socialBtnFbContainer.fadeIn();
			}
		});
		
		// Variables
		var fbEl = $( '#btnsx-fb' );
		var fbType = $( '#btnsx_opt_fb_type' );
		var fbTypeVal = $( '#btnsx_opt_fb_type' ).val();
		var fbUrl = $( '#btnsx_opt_fb_url' );
	    var fbWidth = $( '#btnsx_opt_fb_width' );
	    var fbHeight = $( '#btnsx_opt_fb_height' );
	    var fbLayout = $( '#btnsx_opt_fb_layout' );
	    var fbAction = $( '#btnsx_opt_fb_action' );
	    var fbColorScheme = $( '#btnsx_opt_fb_colorscheme' );
	    var fbFaces = $( '#btnsx_opt_fb_show_faces' );
	    var fbShare = $( '#btnsx_opt_fb_share' );
	    var fbKidDirectedSite = $( '#btnsx_opt_fb_kid_directed_site' );

	    switch( fbTypeVal ){
			case 'like':
				fbEl.removeClass('fb-follow fb-share-button fb-send').addClass('fb-like');
			    fbWidth.closest('.m12').fadeIn();
			    fbHeight.closest('.m12').hide();
			    fbLayout.closest('.m12').fadeIn();
			    fbAction.closest('.m12').fadeIn();
			    fbColorScheme.closest('.m12').fadeIn();
			    fbFaces.closest('.m12').fadeIn();
			    fbShare.closest('.m12').fadeIn();
			    fbKidDirectedSite.closest('.m12').fadeIn();
			break;
			case 'follow':
				fbEl.removeClass('fb-like fb-share-button fb-send').addClass('fb-follow');
				fbUrl.val( 'https://www.facebook.com/gautam.thapar1' );
			    fbWidth.closest('.m12').fadeIn();
			    fbHeight.closest('.m12').fadeIn();
			    fbLayout.closest('.m12').fadeIn();
			    fbAction.closest('.m12').hide();
			    fbColorScheme.closest('.m12').fadeIn();
			    fbFaces.closest('.m12').fadeIn();
			    fbShare.closest('.m12').hide();
			    fbKidDirectedSite.closest('.m12').fadeIn();
			break;
			case 'share':
				fbEl.removeClass('fb-like fb-follow fb-send').addClass('fb-share-button');
				// fbLayout.select2( 'val', 'box_count' );
			    fbWidth.closest('.m12').hide();
			    fbHeight.closest('.m12').hide();
			    fbLayout.closest('.m12').fadeIn();
			    fbAction.closest('.m12').hide();
			    fbColorScheme.closest('.m12').hide();
			    fbFaces.closest('.m12').hide();
			    fbShare.closest('.m12').hide();
			    fbKidDirectedSite.closest('.m12').hide();
			break;
			case 'send':
				fbEl.removeClass('fb-like fb-follow fb-share-button').addClass('fb-send');
			    fbWidth.closest('.m12').hide();
			    fbHeight.closest('.m12').hide();
			    fbLayout.closest('.m12').hide();
			    fbAction.closest('.m12').hide();
			    fbColorScheme.closest('.m12').hide();
			    fbFaces.closest('.m12').hide();
			    fbShare.closest('.m12').hide();
			    fbKidDirectedSite.closest('.m12').hide();
			break;
		}
		fbEl.btnsxFacebook();
		fbType.on( 'change', function(){
			var val = $(this).val();
			var fbEl = $( '#btnsx-fb' );
			var fbUrl = $( '#btnsx_opt_fb_url' );
			var fbLayout = $( '#btnsx_opt_fb_layout' );
			switch( val ){
				case 'like':
					fbEl.removeClass('fb-follow fb-share-button fb-send').addClass('fb-like');
					fbEl.btnsxFacebook();
				    fbWidth.closest('.m12').fadeIn();
				    fbHeight.closest('.m12').hide();
				    fbLayout.closest('.m12').fadeIn();
				    fbAction.closest('.m12').fadeIn();
				    fbColorScheme.closest('.m12').fadeIn();
				    fbFaces.closest('.m12').fadeIn();
				    fbShare.closest('.m12').fadeIn();
				    fbKidDirectedSite.closest('.m12').fadeIn();
				break;
				case 'follow':
					fbEl.removeClass('fb-like fb-share-button fb-send').addClass('fb-follow');
					// fbUrl.val( 'https://www.facebook.com/gautam.thapar1' );
					fbEl.btnsxFacebook();
				    fbWidth.closest('.m12').fadeIn();
				    fbHeight.closest('.m12').fadeIn();
				    fbLayout.closest('.m12').fadeIn();
				    fbAction.closest('.m12').hide();
				    fbColorScheme.closest('.m12').fadeIn();
				    fbFaces.closest('.m12').fadeIn();
				    fbShare.closest('.m12').hide();
				    fbKidDirectedSite.closest('.m12').fadeIn();
				break;
				case 'share':
					fbEl.removeClass('fb-like fb-follow fb-send').addClass('fb-share-button');
					// fbLayout.select2( 'val', 'box_count' );
					fbEl.btnsxFacebook();
				    fbWidth.closest('.m12').hide();
				    fbHeight.closest('.m12').hide();
				    fbLayout.closest('.m12').fadeIn();
				    fbAction.closest('.m12').hide();
				    fbColorScheme.closest('.m12').hide();
				    fbFaces.closest('.m12').hide();
				    fbShare.closest('.m12').hide();
				    fbKidDirectedSite.closest('.m12').hide();
				break;
				case 'send':
					fbEl.removeClass('fb-like fb-follow fb-share-button').addClass('fb-send');
					fbEl.btnsxFacebook();
				    fbWidth.closest('.m12').hide();
				    fbHeight.closest('.m12').hide();
				    fbLayout.closest('.m12').hide();
				    fbAction.closest('.m12').hide();
				    fbColorScheme.closest('.m12').hide();
				    fbFaces.closest('.m12').hide();
				    fbShare.closest('.m12').hide();
				    fbKidDirectedSite.closest('.m12').hide();
				break;
			}
		});

		$( '#btnsx_opt_fb_url, #btnsx_opt_fb_width, #btnsx_opt_fb_height' ).on( 'keyup input propertychange', function(){
			$( '#btnsx-fb' ).btnsxFacebook();
		});
		$( '#btnsx_opt_fb_layout, #btnsx_opt_fb_action, #btnsx_opt_fb_show_faces, #btnsx_opt_fb_share, #btnsx_opt_fb_colorscheme, #btnsx_opt_fb_like_kid_directed_site' ).on( 'change', function(){
			$( '#btnsx-fb' ).btnsxFacebook();
		});

	// Twitter Script
		!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

		var tw = $( '#btnsx_opt_social_twitter' );
		var enableTw = tw.val();
		if( enableTw === '1' ){
			socialBtnTwContainer.fadeIn().css( 'display', 'inline-block' );
		} else {
			socialBtnTwContainer.hide();
		}
		$('#btnsx_opt_social_twitter').on('change',function(){
			var val = $(this).val();
			if( val === '0' ){
				socialBtnTwContainer.hide();
			}else{
				socialBtnTwContainer.fadeIn().css( 'display', 'inline-block' );
			}
		});

		// Variables
		var twEl = $( '#btnsx-twitter' );
		var twType = $( '#btnsx_opt_tw_type' );
		var twTypeVal = $( '#btnsx_opt_tw_type' ).val();
		var twUrl = $( '#btnsx_opt_tw_url' );
		var twText = $( '#btnsx_opt_tw_text' );
		var twUsername = $( '#btnsx_opt_tw_username' );
		var twRecommend = $( '#btnsx_opt_tw_related' );
		var twHashtag = $( '#btnsx_opt_tw_hashtag' );
		var twCount = $( '#btnsx_opt_tw_count' );
		var twSize = $( '#btnsx_opt_tw_size' );
		var twDnt = $( '#btnsx_opt_tw_dnt' );
		var twScreenName = $( '#btnsx_opt_tw_screen_name' );

		switch( twTypeVal ){
			case 'tweet':
				twEl.removeClass('twitter-follow-button twitter-hashtag-button twitter-mention-button').addClass('twitter-share-button');
			    twUrl.closest('.m12').fadeIn();
			    twText.closest('.m12').fadeIn();
			    twUsername.closest('.m12').fadeIn();
			    twRecommend.closest('.m12').fadeIn();
			    twHashtag.closest('.m12').fadeIn();
			    twCount.closest('.m12').fadeIn();
			    twSize.closest('.m12').fadeIn();
			    twDnt.closest('.m12').fadeIn();
			    twScreenName.closest('.m12').hide();
			break;
			case 'follow':
				twEl.removeClass('twitter-share-button twitter-hashtag-button twitter-mention-button').addClass('twitter-follow-button');
			    twUrl.closest('.m12').hide();
			    twText.closest('.m12').hide();
			    twUsername.closest('.m12').fadeIn();
			    twRecommend.closest('.m12').hide();
			    twHashtag.closest('.m12').hide();
			    twCount.closest('.m12').hide();
			    twSize.closest('.m12').fadeIn();
			    twDnt.closest('.m12').fadeIn();
			    twScreenName.closest('.m12').fadeIn();
			break;
			case 'hashtag':
				twEl.removeClass('twitter-follow-button twitter-share-button twitter-mention-button').addClass('twitter-hashtag-button');
			    twUrl.closest('.m12').fadeIn();
			    twText.closest('.m12').fadeIn();
			    twUsername.closest('.m12').hide();
			    twRecommend.closest('.m12').fadeIn();
			    twHashtag.closest('.m12').fadeIn();
			    twCount.closest('.m12').hide();
			    twSize.closest('.m12').fadeIn();
			    twDnt.closest('.m12').fadeIn();
			    twScreenName.closest('.m12').hide();
			break;
			case 'mention':
				twEl.removeClass('twitter-follow-button twitter-share-button twitter-hashtag-button').addClass('twitter-mention-button');
			    twUrl.closest('.m12').hide();
			    twText.closest('.m12').fadeIn();
			    twUsername.closest('.m12').fadeIn();
			    twRecommend.closest('.m12').fadeIn();
			    twHashtag.closest('.m12').hide();
			    twCount.closest('.m12').hide();
			    twSize.closest('.m12').fadeIn();
			    twDnt.closest('.m12').fadeIn();
			    twScreenName.closest('.m12').fadeIn();
			break;
		}
		socialBtnTwContainer.btnsxTwitter();
		twType.on( 'change', function(){
			var val = $(this).val();
			switch( val ){
				case 'tweet':
					$( '#btnsx-twitter-container' ).btnsxTwitter();
				    twUrl.closest('.m12').fadeIn();
				    twText.closest('.m12').fadeIn();
				    twUsername.closest('.m12').fadeIn();
				    twRecommend.closest('.m12').fadeIn();
				    twHashtag.closest('.m12').fadeIn();
				    twCount.closest('.m12').fadeIn();
				    twSize.closest('.m12').fadeIn();
				    twDnt.closest('.m12').fadeIn();
				    twScreenName.closest('.m12').hide();
				break;
				case 'follow':
					$( '#btnsx-twitter-container' ).btnsxTwitter();
				    twUrl.closest('.m12').hide();
				    twText.closest('.m12').hide();
				    twUsername.closest('.m12').fadeIn();
				    twRecommend.closest('.m12').hide();
				    twHashtag.closest('.m12').hide();
				    twCount.closest('.m12').hide();
				    twSize.closest('.m12').fadeIn();
				    twDnt.closest('.m12').fadeIn();
				    twScreenName.closest('.m12').fadeIn();
				break;
				case 'hashtag':
					$( '#btnsx-twitter-container' ).btnsxTwitter();
				    twUrl.closest('.m12').fadeIn();
				    twText.closest('.m12').fadeIn();
				    twUsername.closest('.m12').hide();
				    twRecommend.closest('.m12').fadeIn();
				    twHashtag.closest('.m12').fadeIn();
				    twCount.closest('.m12').hide();
				    twSize.closest('.m12').fadeIn();
				    twDnt.closest('.m12').fadeIn();
				    twScreenName.closest('.m12').hide();
				break;
				case 'mention':
					$( '#btnsx-twitter-container' ).btnsxTwitter();
				    twUrl.closest('.m12').fadeIn();
				    twText.closest('.m12').fadeIn();
				    twUsername.closest('.m12').fadeIn();
				    twRecommend.closest('.m12').fadeIn();
				    twHashtag.closest('.m12').fadeIn();
				    twCount.closest('.m12').hide();
				    twSize.closest('.m12').fadeIn();
				    twDnt.closest('.m12').fadeIn();
				    twScreenName.closest('.m12').hide();
				break;
			}
		});

		$( '#btnsx_opt_tw_button_text, #btnsx_opt_tw_url, #btnsx_opt_tw_text, #btnsx_opt_tw_username, #btnsx_opt_tw_related, #btnsx_opt_tw_hashtag' ).on( 'keyup input propertychange', function(){
			$( '#btnsx-twitter' ).btnsxTwitter();
		});
		$( '#btnsx_opt_tw_count, #btnsx_opt_tw_size, #btnsx_opt_tw_dnt, #btnsx_opt_tw_screen_name' ).on( 'change', function(){
			$( '#btnsx-twitter' ).btnsxTwitter();
		});

	// Google+ Script
		(function() {
    		var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    		po.src = 'https://apis.google.com/js/platform.js';
    		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  		})();

		var gp = $( '#btnsx_opt_social_googleplus' );
		var enableGp = gp.val();
		if( enableGp === '1' ){
			socialBtnGpContainer.fadeIn();
		} else {
			socialBtnGpContainer.hide();
		}
		$('#btnsx_opt_social_googleplus').on('change',function(){
			var val = $(this).val();
			if( val === '1' ){
				socialBtnGpContainer.fadeIn();
			}else{
				socialBtnGpContainer.hide();
			}
		});

		$( '#btnsx-googleplus-container' ).html( '<div id="btnsx-gp" class="g-plusone"></div>' );

		// Variables
		var gpEl = $( '#btnsx-gp' );
		var gpType = $( '#btnsx_opt_gp_type' );
		var gpTypeVal = gpType.val();
		var gpOneSize = $( '#btnsx_opt_gp_one_size' );
		var gpOneLayout = $( '#btnsx_opt_gp_one_layout' );
		var gpUrl = $( '#btnsx_opt_gp_url' );
		var gpUser = $( '#btnsx_opt_gp_user' );
		var gpSize = $( '#btnsx_opt_gp_size' );
		var gpFollowLayout = $( '#btnsx_opt_gp_follow_layout' );
		var gpShareLayout = $( '#btnsx_opt_gp_share_layout' );
		var gpWidth = $( '#btnsx_opt_gp_width' );

	    switch( gpTypeVal ){
			case 'one':
			    gpOneSize.closest('.m12').fadeIn();
			    gpOneLayout.closest('.m12').fadeIn();
			    gpUrl.closest('.m12').fadeIn();
			    gpWidth.closest('.m12').fadeIn();
			    gpUser.closest('.m12').hide();
			    gpSize.closest('.m12').hide();
			    gpFollowLayout.closest('.m12').hide();
			    gpShareLayout.closest('.m12').hide();
			break;
			case 'follow':
			    gpOneSize.closest('.m12').hide();
			    gpOneLayout.closest('.m12').hide();
			    gpUrl.closest('.m12').hide();
			    gpWidth.closest('.m12').hide();
			    gpUser.closest('.m12').fadeIn();
			    gpSize.closest('.m12').fadeIn();
			    gpFollowLayout.closest('.m12').fadeIn();
			    gpShareLayout.closest('.m12').hide();
			    if( gpUser.val() == '' ){
			    	alert('Please enter "Google plus user page or profile URL" to see the button in preview.');
			    }
			break;
			case 'share':
				gpOneSize.closest('.m12').hide();
			    gpOneLayout.closest('.m12').hide();
			    gpUrl.closest('.m12').fadeIn();
			    gpWidth.closest('.m12').fadeIn();
			    gpUser.closest('.m12').hide();
			    gpSize.closest('.m12').hide();
			    gpFollowLayout.closest('.m12').hide();
			    gpShareLayout.closest('.m12').fadeIn();
			break;
		}
		gpEl.btnsxGooglePlus();
		gpType.on( 'change', function(){
			var val = $(this).val();
			var gpEl = $( '#btnsx-gp' );
			switch( val ){
				case 'one':
					$( '#btnsx-gp' ).btnsxGooglePlus();
				    gpOneSize.closest('.m12').fadeIn();
				    gpOneLayout.closest('.m12').fadeIn();
				    gpUrl.closest('.m12').fadeIn();
				    gpWidth.closest('.m12').fadeIn();
				    gpUser.closest('.m12').hide();
				    gpSize.closest('.m12').hide();
				    gpFollowLayout.closest('.m12').hide();
				    gpShareLayout.closest('.m12').hide();
				break;
				case 'follow':
					$( '#btnsx-gp' ).btnsxGooglePlus();
				    gpOneSize.closest('.m12').hide();
				    gpOneLayout.closest('.m12').hide();
				    gpUrl.closest('.m12').hide();
				    gpWidth.closest('.m12').hide();
				    gpUser.closest('.m12').fadeIn();
				    gpSize.closest('.m12').fadeIn();
				    gpFollowLayout.closest('.m12').fadeIn();
				    gpShareLayout.closest('.m12').hide();
				    if( gpUser.val() == '' ){
				    	alert('Please enter "Google plus user page or profile URL" to see the button in preview.');
				    }
				break;
				case 'share':
					$( '#btnsx-gp' ).btnsxGooglePlus();
					gpOneSize.closest('.m12').hide();
				    gpOneLayout.closest('.m12').hide();
				    gpUrl.closest('.m12').fadeIn();
				    gpWidth.closest('.m12').fadeIn();
				    gpUser.closest('.m12').hide();
				    gpSize.closest('.m12').hide();
				    gpFollowLayout.closest('.m12').hide();
				    gpShareLayout.closest('.m12').fadeIn();
				break;
			}
		});

		$( '#btnsx_opt_gp_url, #btnsx_opt_gp_user, #btnsx_opt_gp_width' ).on( 'keyup input propertychange', function(){
			$( '#btnsx-gp' ).btnsxGooglePlus();
		});
		$( '#btnsx_opt_gp_type, #btnsx_opt_gp_one_size, #btnsx_opt_gp_one_layout, #btnsx_opt_gp_size, #btnsx_opt_gp_follow_layout, #btnsx_opt_gp_share_layout' ).on( 'change', function(){
			$( '#btnsx-gp' ).btnsxGooglePlus();
		});

	// LinkedIn Script
		
		$.getScript( 'https://platform.linkedin.com/in.js' );

		var li = $( '#btnsx_opt_social_linkedin' );
		var liUrl = $( '#btnsx_opt_li_url' ).val();
		var liCounterType = $( '#btnsx_opt_li_counter_type' ).val();
		var enableLi = li.val();
		
		if( enableLi === '1' ){
			socialBtnLiContainer.fadeIn();
		} else {
			socialBtnLiContainer.hide();
		}

		$( '#btnsx-linkedin-container' ).btnsxLinkedin();

		$('#btnsx_opt_social_linkedin').on('change',function(){
			var val = $(this).val();
			if( val === '1' ){
				socialBtnLiContainer.fadeIn();
			}else{
				socialBtnLiContainer.hide();
			}
		});

		$( '#btnsx_opt_li_url' ).on( 'keyup input propertychange', function(){
			$( '#btnsx-li' ).btnsxLinkedin();
		});
		$( '#btnsx_opt_li_counter_type' ).on( 'change', function(){
			$( '#btnsx-li' ).btnsxLinkedin();
		});

		socialBtnLoader.hide();

});