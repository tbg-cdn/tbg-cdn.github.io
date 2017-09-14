/**
 * btnsx.js v1.0
 * 
 * Copyright 2015, Gautam Thapar
 * http://www.gautamthapar.me
 */

(function($){

	$(document).ready(function(){

		// render basic button view
		var BtnView = Backbone.View.extend({
		    
		    el: $('#poststuff'),

		    events: {
		    	// preview image
		    	'propertychange #btnsx_opt_preview_background_image_image': 'changePreviewBackgroundImage',
			    'keyup #btnsx_opt_preview_background_image_image': 'changePreviewBackgroundImage',
			    'input #btnsx_opt_preview_background_image_image': 'changePreviewBackgroundImage',

			    // 'change #btnsx_opt_preview_background_image_repeat': 'changePreviewBackgroundImageRepeat',

			    'change #btnsx_opt_preview_background_image_position': 'changePreviewBackgroundImagePosition',

			    'propertychange #btnsx_opt_preview_background_overlay': 'changePreviewBackgroundOverlay',
			    'keyup #btnsx_opt_preview_background_overlay': 'changePreviewBackgroundOverlay',
			    'input #btnsx_opt_preview_background_overlay': 'changePreviewBackgroundOverlay',
		    },

		    initialize: function(){

			    _.bindAll( this, 'render' ); // every function that uses 'this' as the current object should be in here

			    this.btnContainer = $('#btnsx-preview-container');
			    this.btnPreviewBackground = $('#btnsx_opt_preview_background');
		    	this.btnPreviewContainer = $('#btnsx-preview .inside');
		    	this.btnPreviewOverlay = $('#btnsx-preview-overlay');
		    	this.btnPreviewContainerOverlay = $('#btnsx-preview .inside, #btnsx-preview-overlay');
		    	this.btnPreviewLoader = $('#btnsx-preview-loader');
		    	this.btnContainer = $('#btnsx-preview-container');
		    	this.btnPreviewBackgroundValue = $('#btnsx_opt_preview_background').val();
		    	this.btnPreviewBackgroundImageValue = $('#btnsx_opt_preview_background_image_image').val();
		    	// this.btnPreviewBackgroundImageRepeatValue = $('#btnsx_opt_preview_background_image_repeat').val();
		    	this.btnPreviewBackgroundImagePositionValue = $('#btnsx_opt_preview_background_image_position').val();
		    	this.btnPreviewBackgroundOverlayValue = $('#btnsx_opt_preview_background_overlay').val();
		    	this.btnCss = $('#btnsx_opt_css');
		    	this.btnCssVal = $('#btnsx_opt_css').val();

		    	this.btnTab = $('#btnsx_opt_tab');

			    this.render();

		    },

		    render: function(){

		    	// Active Tab
		    		if(this.btnTab.val()!=null){
		    			$( '#'+this.btnTab.val()).click();
		    		}

		    	// preview
		    		// set preview button
			    	// this.btnContainer.append('');
		    		// Preview Button
			    	this.btnPreview = $('#btnsx-preview-btn');
			    	// set preview background on render
					this.btnPreviewContainer.css( 'background-color', this.btnPreviewBackgroundValue );
					this.btnPreviewOverlay.css( 'background-color', this.btnPreviewBackgroundValue );
					// change preview background when value changes
					this.btnPreviewBackground.btnsxRGBA({
						targetElement: this.btnPreviewContainerOverlay,
						css: 'background-color'
					});
					if( this.btnPreviewBackgroundImageValue != '' ){
						this.btnPreviewContainer.css('background-image', 'url("' + this.btnPreviewBackgroundImageValue + '")' );
					}
					if( this.btnPreviewBackgroundImageRepeatValue != '' ){
						this.btnPreviewContainer.css('background-repeat', this.btnPreviewBackgroundImageRepeatValue );
					}
					if( this.btnPreviewBackgroundImagePositionValue != '' ){
						this.btnPreviewContainer.css('background-position', this.btnPreviewBackgroundImagePositionValue );
					}
					if( this.btnPreviewBackgroundOverlayValue != '' ){
						this.btnPreviewOverlay.css('opacity', this.btnPreviewBackgroundOverlayValue );
					}

				// Apply custom CSS
					if( this.btnCssVal != '' || this.btnCssVal != undefined ){
						var id = $("#btnsx_opt_id").val();
					   	var newId = new RegExp("btnsx-"+id, "g");
					   	var css = this.btnCssVal.replace( newId, "btnsx-preview-btn, #btnsx-preview-btn-tablet, #btnsx-preview-btn-mobile" );
						$( "#btnsx-preview-btn-css" ).text(css);
					}

			    // Fire up css editor
				    $('textarea[data-btnsx-editor]').each(function () {
				    	var textarea = $(this);

				    	var mode = textarea.data('btnsx-editor');

				    	var editDiv = $('<div>', {
				    		position: 'relative',
				    		width: "100%",
				    		height: "100px",
				    		'class': textarea.attr('class')
				    	}).insertBefore(textarea);

				    	textarea.css('display', 'none');

				    	var editor = ace.edit(editDiv[0]);
				    	editor.$blockScrolling = Infinity;
				    	// var id = $("#btnsx_opt_id").val();
					   	// var newId = new RegExp("btnsx-"+id, "g");
				    	editor.renderer.setShowGutter(true);
				    	editor.getSession().setUseWorker(false);
				    	editor.getSession().setUseWrapMode(true);
				    	var textareaVal = textarea.val(); // .replace( "btnsx-preview-btn", newId );
				    	editor.getSession().setValue(textareaVal.replace(/\s\s/g, ''));
				    	editor.getSession().setMode("ace/mode/" + mode);
				    	editor.setShowPrintMargin(false);

				    	editor.getSession().on('change', function(e) {
					   		// fetch current button id from id field
					   		var id = $("#btnsx_opt_id").val();
					   		var newId = new RegExp("btnsx-"+id, "g");
					   		if( textarea.attr('id') == "btnsx_opt_css" ){
					   			// replace all id's with demo id
					   			var value = editor.getSession().getValue(); // .replace(new RegExp("btnsx-"+id, "g"),"btnsx-preview-btn, #btnsx-preview-btn-tablet, #btnsx-preview-btn-mobile")
					   			$( "#btnsx-preview-btn-css" ).text(value);
					   			$( "#btnsx_opt_css" ).text(value);
					   		}
					   		if( textarea.attr('id') == "btnsx_opt_gradient_css_normal" ){
					   			var value = editor.getSession().getValue();
					   			$('#btnsx-preview .inside').find( "#btnsx-gradient-custom-style" ).remove();
					   			$('#btnsx-preview .inside').prepend('<style type="text/css" id="btnsx-gradient-custom-style">.btnsx-btn{'+value+'}</style>');
					   			$( "#btnsx_opt_gradient_css_normal" ).text(value);
					   		}
					   		if( textarea.attr('id') == "btnsx_opt_gradient_css_hover" ){
					   			var value = editor.getSession().getValue();
					   			$('#btnsx-preview .inside').find( "#btnsx-gradient-custom-hover-style" ).remove();
					   			$('#btnsx-preview .inside').prepend('<style type="text/css" id="btnsx-gradient-custom-hover-style">.btnsx-btn:hover{'+value+'}</style>');
					   			$( "#btnsx_opt_gradient_css_hover" ).text(value);
					   		}
					   		if( textarea.attr('id') == "btnsx_opt_box_shadow_css_normal" ){
					   			var value = editor.getSession().getValue();
					   			$('#btnsx-preview .inside').find( "#btnsx-box-shadow-custom-style" ).remove();
					   			$('#btnsx-preview .inside').prepend('<style type="text/css" id="btnsx-box-shadow-custom-style">.btnsx-btn{'+value+'}</style>');
					   			$( "#btnsx_opt_box_shadow_css_normal" ).text(value);
					   		}
					   		if( textarea.attr('id') == "btnsx_opt_box_shadow_css_hover" ){
					   			var value = editor.getSession().getValue();
					   			$('#btnsx-preview .inside').find( "#btnsx-box-shadow-custom-hover-style" ).remove();
					   			$('#btnsx-preview .inside').prepend('<style type="text/css" id="btnsx-box-shadow-custom-hover-style">.btnsx-btn:hover{'+value+'}</style>');
					   			$( "#btnsx_opt_box_shadow_css_hover" ).text(value);
					   		}
						});

			           	// copy back to textarea on form submit...
			           	$("#save,#publish").click(function () {
			           		textarea.val(editor.getSession().getValue());
			           	});
					});

		    },

		    changePreviewBackgroundImage: function(e) {
		    	this.btnPreviewContainer.css('background-image','url(' + e.target.value + ')');
		    },

		    // changePreviewBackgroundImageRepeat: function(e) {
		    // 	this.btnPreviewContainer.css('background-repeat',e.target.value);
		    // },

		    changePreviewBackgroundImagePosition: function(e) {
		    	this.btnPreviewContainer.css('background-position',e.target.value);
		    },

		    changePreviewBackgroundOverlay: function(e) {
		    	this.btnPreviewOverlay.css('opacity',e.target.value);
		    }
		    
		});

		var btnView = new BtnView();
		// Save active tab
		$( '#btnsx-tabs nav' ).find('li').on('click',function(){
			$( '#btnsx_opt_tab' ).val( $(this).attr('id') );
		});

		var tabsGroup = function( id ){
			if( id === 'btnsx-content-options' ){
				$('li[id^="btnsx-tabs-0"]').slideToggle('fast');
				var val = $('#btnsx_opt_tab_group_content').val();
				$('#btnsx_opt_tab_group_content').val(val === '0' ? '1' : '0');
			} else if( id === 'btnsx-style-options' ) {
				$('li[id^="btnsx-tabs-1"]').slideToggle('fast');
				var val = $('#btnsx_opt_tab_group_style').val();
				$('#btnsx_opt_tab_group_style').val(val === '0' ? '1' : '0');
			} else if( id === 'btnsx-advanced-options' ) {
				$('li[id^="btnsx-tabs-2"]').slideToggle('fast');
				var val = $('#btnsx_opt_tab_group_advanced').val();
				$('#btnsx_opt_tab_group_advanced').val(val === '0' ? '1' : '0');
			} else if( id === 'btnsx-expert-options' ) {
				$('li[id^="btnsx-tabs-3"]').slideToggle('fast');
				var val = $('#btnsx_opt_tab_group_expert').val();
				$('#btnsx_opt_tab_group_expert').val(val === '0' ? '1' : '0');
			}
		}

		// set tabs group
		$( '.btnsx-tabs-group' ).on('click',function(){
			tabsGroup($(this).attr('id'));
		})

	});

})(jQuery);
/**
 * Buttons X - Background View
 * 
 * Copyright 2015, Gautam Thapar
 * http://www.gautamthapar.me
 */

(function($){

	$(document).ready(function(){

		// render basic button view
		var BtnBackgroundView = Backbone.View.extend({
		    
		    el: $('#poststuff'),

		    events: {
				// background
				    // Hover Color
				    // 'change #btnsx_opt_background_color_hover': 'changeBackgroundColorHover',
				    // 'change #btnsx_opt_background_color_normal': 'changeBackgroundColorNormal'
				    
				    'click #btnsx_opt_background_color_hover_copy_btn': 'copyBackgroundColorHover',
				    'click #btnsx_opt_background_color_normal_copy_btn': 'copyBackgroundColorNormal'
		    },

		    initialize: function(){

			    _.bindAll( this, 'render' ); // every function that uses 'this' as the current object should be in here

			    // ASSIGN VARIABLES
			    
			    // background
			    	this.btnBackgroundColorNormal = $('#btnsx_opt_background_color_normal');
			    	this.btnBackgroundColorNormalValue = $('#btnsx_opt_background_color_normal').val();
			    	this.btnBackgroundColorHover = $('#btnsx_opt_background_color_hover');
			    	this.btnBackgroundColorHoverValue = $('#btnsx_opt_background_color_hover').val();

			    this.render();

		    },

		    render: function(){

		    	// preview
			    	this.btnPreview = $('#btnsx-preview-btn');

				// background
					$('#btnsx-preview .inside').prepend( '<style type="text/css" id="btnsx-background-color-normal-style">.btnsx-btn{background-color:'+ this.btnBackgroundColorNormalValue +'!important;}</style>' );
					$('#btnsx-preview .inside').prepend( '<style type="text/css" id="btnsx-background-color-hover-style">.btnsx-btn:hover{background-color:'+ this.btnBackgroundColorHoverValue +'!important;}</style>' );
					// change background color when value changes
					this.btnBackgroundColorNormal.btnsxRGBA({
						change: function( event, ui ){
							$('#btnsx-background-color-normal-style').remove();
							$('#btnsx-preview .inside').prepend( '<style type="text/css" id="btnsx-background-color-normal-style">.btnsx-btn{background-color:'+ ui.color.toString() +'!important;}</style>' );
						}
					});
					this.btnBackgroundColorHover.btnsxRGBA({
						change: function( event, ui ){
							$('#btnsx-background-color-hover-style').remove();
							$('#btnsx-preview .inside').prepend( '<style type="text/css" id="btnsx-background-color-hover-style">.btnsx-btn:hover{background-color:'+ ui.color.toString() +'!important;}</style>' );
						}
					});

		    },
		    // change button background image normal
		    copyBackgroundColorHover: function(e){
		    	$('#btnsx_opt_background_color_hover_copy_btn').btnsxCopy();
		    },
		    copyBackgroundColorNormal: function(e){
		    	$('#btnsx_opt_background_color_normal_copy_btn').btnsxCopy();
		    }
		});
		var btnBackgroundView = new BtnBackgroundView();

		var BtnBackgroundImageView = Backbone.View.extend({
		    
		    el: $('#poststuff'),

		    events: {
				// background
				    // IMAGE
				    // normal
				    'propertychange #btnsx_opt_background_image_normal': 'changeBackgroundImageNormal',
				    'keyup #btnsx_opt_background_image_normal': 'changeBackgroundImageNormal',
				    'input #btnsx_opt_background_image_normal': 'changeBackgroundImageNormal',
				    // hover
				    'mouseenter #btnsx-preview-btn': 'changeBackgroundImageHover',
				    'mouseleave #btnsx-preview-btn': 'changeBackgroundImageNormal',
				    // copy
				    'click #btnsx_opt_background_image_hover_copy_btn': 'copyBackgroundImageHover',
				    'click #btnsx_opt_background_image_normal_copy_btn': 'copyBackgroundImageNormal',
				    'change #btnsx_opt_background_image_repeat': 'changeBackgroundImageRepeat',
				    'change #btnsx_opt_background_image_position': 'changeBackgroundImagePosition',
		    },

		    initialize: function(){

			    _.bindAll( this, 'render', 'changeBackgroundImageNormal', 'changeBackgroundImageHover', 'changeBackgroundImageRepeat', 'changeBackgroundImagePosition' ); // every function that uses 'this' as the current object should be in here

			    // ASSIGN VARIABLES
			    
			    // background
			    	this.btnBackgroundImageNormal = $('#btnsx_opt_background_image_normal');
			    	this.btnBackgroundImageNormalValue = $('#btnsx_opt_background_image_normal').val();
			    	this.btnBackgroundImageHover = $('#btnsx_opt_background_image_hover');
			    	this.btnBackgroundImageHoverValue = $('#btnsx_opt_background_image_hover').val();
			    	this.btnBackgroundImageRepeat = $('#btnsx_opt_background_image_repeat');
			    	this.btnBackgroundImageRepeatValue = $('#btnsx_opt_background_image_repeat').val();
			    	this.btnBackgroundImagePosition = $('#btnsx_opt_background_image_position');
			    	this.btnBackgroundImagePositionValue = $('#btnsx_opt_background_image_position').val();

			    this.render();

		    },

		    render: function(){

		    	// preview
			    	this.btnPreview = $('#btnsx-preview-btn');

				// background
					// IMAGE
					// normal
					if( this.btnBackgroundImageNormalValue != '' ){
						this.btnPreview.css('background-image', 'url("' + this.btnBackgroundImageNormalValue + '")' );
					}
					this.btnPreview.css('background-repeat', this.btnBackgroundImageRepeatValue );
					this.btnPreview.css('background-position', this.btnBackgroundImagePositionValue );
		    },
		    // change button background image normal
		    changeBackgroundImageNormal: function(e){
		    	this.btnBackgroundImageNormalValue = this.btnBackgroundImageNormal.val();
		    	if( this.btnBackgroundImageNormalValue != '' ){
		    		this.btnPreview.css( 'background-image', 'url("' + this.btnBackgroundImageNormalValue + '")' );
		    	}else{
		    		this.btnPreview.css( 'background-image', '' );
		    	}
		    },
		    // change button background image hover
		    changeBackgroundImageHover: function(e){
		    	this.btnBackgroundImageHoverValue = this.btnBackgroundImageHover.val();
		    	if( this.btnBackgroundImageHoverValue != '' ){
		    		this.btnPreview.css( 'background-image', 'url("' + this.btnBackgroundImageHoverValue + '")' );
		    	}else{
		    		this.btnPreview.css( 'background-image', '' );
		    	}
		    },
		    copyBackgroundImageHover: function(e){
		    	$('#btnsx_opt_background_image_hover_copy_btn').btnsxCopy();
		    	this.changeBackgroundImageNormal();
		    },
		    copyBackgroundImageNormal: function(e){
		    	$('#btnsx_opt_background_image_normal_copy_btn').btnsxCopy();
		    },
		    changeBackgroundImageRepeat: function(e){
		    	console.log('works');
		    	this.btnPreview.css( 'background-repeat', e.target.value );
		    },
		    changeBackgroundImagePosition: function(e){
		    	this.btnPreview.css( 'background-position', e.target.value );
		    }
		});
		var btnBackgroundImageView = new BtnBackgroundImageView();
	
	});

})(jQuery);
/**
 * Buttons X - Border View
 * 
 * Copyright 2015, Gautam Thapar
 * http://www.gautamthapar.me
 */

(function($){

	$(document).ready(function(){

		// render basic button view
		var BtnBorderView = Backbone.View.extend({
		    
		    el: $('#poststuff'),

		    events: {
				// border
					// size
				    'propertychange #btnsx_opt_border_normal_size': 'changeBorderSize',
				    'keyup #btnsx_opt_border_normal_size': 'changeBorderSize',
				    'input #btnsx_opt_border_normal_size': 'changeBorderSize',
				    // style
				    'change #btnsx_opt_border_normal_style': 'changeBorderStyle',
				    // Width
				    'change #btnsx_opt_border_normal_top': 'changeBorderTop',
				    'change #btnsx_opt_border_normal_bottom': 'changeBorderBottom',
				    'change #btnsx_opt_border_normal_left': 'changeBorderLeft',
				    'change #btnsx_opt_border_normal_right': 'changeBorderRight',
				    // hover
				    'mouseenter #btnsx-preview-btn': 'changeBorderHover',
				    // normal
				    'mouseleave #btnsx-preview-btn': 'changeBorderNormal',
				    // radius top left
				    'propertychange #btnsx_opt_border_normal_radius_top_left': 'changeBorderRadiusTopLeft',
				    'keyup #btnsx_opt_border_normal_radius_top_left': 'changeBorderRadiusTopLeft',
				    'input #btnsx_opt_border_normal_radius_top_left': 'changeBorderRadiusTopLeft',
				    // radius top right
				    'propertychange #btnsx_opt_border_normal_radius_top_right': 'changeBorderRadiusTopRight',
				    'keyup #btnsx_opt_border_normal_radius_top_right': 'changeBorderRadiusTopRight',
				    'input #btnsx_opt_border_normal_radius_top_right': 'changeBorderRadiusTopRight',
				    // radius bottom left
				    'propertychange #btnsx_opt_border_normal_radius_bottom_left': 'changeBorderRadiusBottomLeft',
				    'keyup #btnsx_opt_border_normal_radius_bottom_left': 'changeBorderRadiusBottomLeft',
				    'input #btnsx_opt_border_normal_radius_bottom_left': 'changeBorderRadiusBottomLeft',
				    // radius bottom right
				    'propertychange #btnsx_opt_border_normal_radius_bottom_right': 'changeBorderRadiusBottomRight',
				    'keyup #btnsx_opt_border_normal_radius_bottom_right': 'changeBorderRadiusBottomRight',
				    'input #btnsx_opt_border_normal_radius_bottom_right': 'changeBorderRadiusBottomRight',
				    // Copy to border hover
				    'click #btnsx_border_hover_collapsible_copy_btn': 'copyBorderHover',
				    // Copy to border normal
				    'click #btnsx_border_normal_collapsible_copy_btn': 'copyBorderNormal',
				    // Copy to border radius normal
				    'click #btnsx_border_hover_radius_collapsible_copy_btn': 'copyBorderRadiusHover',
				    // Copy to border radius hover
				    'click #btnsx_border_normal_radius_collapsible_copy_btn': 'copyBorderRadiusNormal',

				    // All
				    'propertychange #btnsx_opt_border_normal_radius_all': 'changeBorderRadiusAll',
				    'keyup #btnsx_opt_border_normal_radius_all': 'changeBorderRadiusAll',
				    'input #btnsx_opt_border_normal_radius_all': 'changeBorderRadiusAll',
				    // Hover All
				    'propertychange #btnsx_opt_border_hover_radius_all': 'changeBorderRadiusHoverAll',
				    'keyup #btnsx_opt_border_hover_radius_all': 'changeBorderRadiusHoverAll',
				    'input #btnsx_opt_border_hover_radius_all': 'changeBorderRadiusHoverAll',
		    },

		    initialize: function(){

			    _.bindAll( this, 'render', 'changeBorderSize', 'changeBorderStyle', 'changeBorderHover', 'changeBorderNormal', 'changeBorderRadiusTopLeft', 'changeBorderRadiusTopRight', 'changeBorderRadiusBottomLeft', 'changeBorderRadiusBottomRight' ); // every function that uses 'this' as the current object should be in here

			    // ASSIGN VARIABLES
			    
			    // border
			    	this.btnBorderSizeNormal = $('#btnsx_opt_border_normal_size');
			    	this.btnBorderSizeNormalValue = $('#btnsx_opt_border_normal_size').val();
			    	this.btnBorderStyleNormal = $('#btnsx_opt_border_normal_style');
			    	this.btnBorderStyleNormalValue = $('#btnsx_opt_border_normal_style').val();
			    	this.btnBorderColorNormal = $('#btnsx_opt_border_normal_color');
			    	this.btnBorderColorNormalValue = $('#btnsx_opt_border_normal_color').val();
			    	this.btnBorderTopNormal = $('#btnsx_opt_border_normal_top');
			    	this.btnBorderTopNormalValue = $('#btnsx_opt_border_normal_top').val();
			    	this.btnBorderBottomNormal = $('#btnsx_opt_border_normal_bottom');
			    	this.btnBorderBottomNormalValue = $('#btnsx_opt_border_normal_bottom').val();
			    	this.btnBorderLeftNormal = $('#btnsx_opt_border_normal_left');
			    	this.btnBorderLeftNormalValue = $('#btnsx_opt_border_normal_left').val();
			    	this.btnBorderRightNormal = $('#btnsx_opt_border_normal_right');
			    	this.btnBorderRightNormalValue = $('#btnsx_opt_border_normal_right').val();

			    	this.btnBorderSizeHover = $('#btnsx_opt_border_hover_size');
			    	this.btnBorderSizeHoverValue = $('#btnsx_opt_border_hover_size').val();
			    	this.btnBorderStyleHover = $('#btnsx_opt_border_hover_style');
			    	this.btnBorderStyleHoverValue = $('#btnsx_opt_border_hover_style').val();
			    	this.btnBorderColorHover = $('#btnsx_opt_border_hover_color');
			    	this.btnBorderColorHoverValue = $('#btnsx_opt_border_hover_color').val();

			    	this.btnBorderRadiusTopLeftNormal = $('#btnsx_opt_border_normal_radius_top_left');
			    	this.btnBorderRadiusTopLeftNormalValue = $('#btnsx_opt_border_normal_radius_top_left').val();
			    	this.btnBorderRadiusTopRightNormal = $('#btnsx_opt_border_normal_radius_top_right');
			    	this.btnBorderRadiusTopRightNormalValue = $('#btnsx_opt_border_normal_radius_top_right').val();

			    	this.btnBorderRadiusBottomLeftNormal = $('#btnsx_opt_border_normal_radius_bottom_left');
			    	this.btnBorderRadiusBottomLeftNormalValue = $('#btnsx_opt_border_normal_radius_bottom_left').val();
			    	this.btnBorderRadiusBottomRightNormal = $('#btnsx_opt_border_normal_radius_bottom_right');
			    	this.btnBorderRadiusBottomRightNormalValue = $('#btnsx_opt_border_normal_radius_bottom_right').val();

			    	this.btnBorderRadiusTopLeftHover = $('#btnsx_opt_border_hover_radius_top_left');
			    	this.btnBorderRadiusTopLeftHoverValue = $('#btnsx_opt_border_hover_radius_top_left').val();
			    	this.btnBorderRadiusTopRightHover = $('#btnsx_opt_border_hover_radius_top_right');
			    	this.btnBorderRadiusTopRightHoverValue = $('#btnsx_opt_border_hover_radius_top_right').val();

			    	this.btnBorderRadiusBottomLeftHover = $('#btnsx_opt_border_hover_radius_bottom_left');
			    	this.btnBorderRadiusBottomLeftHoverValue = $('#btnsx_opt_border_hover_radius_bottom_left').val();
			    	this.btnBorderRadiusBottomRightHover = $('#btnsx_opt_border_hover_radius_bottom_right');
			    	this.btnBorderRadiusBottomRightHoverValue = $('#btnsx_opt_border_hover_radius_bottom_right').val();

			    this.render();

		    },

		    render: function(){

		    	// preview
			    	this.btnPreview = $('#btnsx-preview-btn');

			    // change border width
					if( this.btnBorderTopNormalValue == '0' || this.btnBorderTopNormalValue == '' ){
			    		this.btnPreview.css('border-top-width','0');
			    	} else {
			    		this.btnPreview.css('border-top-width',this.btnBorderSizeNormalValue + 'px');
			    	}
			    	if( this.btnBorderBottomNormalValue == '0' || this.btnBorderBottomNormalValue == '' ){
			    		this.btnPreview.css('border-bottom-width','0');
			    	} else {
			    		this.btnPreview.css('border-bottom-width',this.btnBorderSizeNormalValue + 'px');
			    	}
			    	if( this.btnBorderLeftNormalValue == '0' || this.btnBorderLeftNormalValue == '' ){
			    		this.btnPreview.css('border-left-width','0');
			    	} else {
			    		this.btnPreview.css('border-left-width',this.btnBorderSizeNormalValue + 'px');
			    	}
			    	if( this.btnBorderRightNormalValue == '0' || this.btnBorderRightNormalValue == '' ){
			    		this.btnPreview.css('border-right-width','0');
			    	} else {
			    		this.btnPreview.css('border-right-width',this.btnBorderSizeNormalValue + 'px');
			    	}

			    // set border
					this.btnPreview.css({
						'border-style' : this.btnBorderStyleNormalValue,
						'border-color' : this.btnBorderColorNormalValue
					});
					
				// change border color when value changes
					this.btnBorderColorNormal.btnsxRGBA({
						targetElement: this.btnPreview,
						css: 'border-color'
					});
					this.btnBorderColorHover.btnsxRGBA();

				// set border radius top left
					this.btnPreview.css('border-top-left-radius',this.btnBorderRadiusTopLeftNormalValue + 'px');
				// set border radius top right
					this.btnPreview.css('border-top-right-radius',this.btnBorderRadiusTopRightNormalValue + 'px');
				// set border radius bottom left
					this.btnPreview.css('border-bottom-left-radius',this.btnBorderRadiusBottomLeftNormalValue + 'px');
				// set border radius bottom right
					this.btnPreview.css('border-bottom-right-radius',this.btnBorderRadiusBottomRightNormalValue + 'px');

		    },
		    // change border size
		    changeBorderSize: function(e){
		    	this.changeBorderWidth();
		    },
		    // change border style
		    changeBorderStyle: function(e){
		    	this.btnPreview.css('border-style',e.target.value);
		    },
		    // change border width
		    changeBorderTop: function(e){
		    	var val = $('#btnsx_opt_border_normal_size').val();
		    	if( e.target.value == '0' || e.target.value == '' ){
		    		this.btnPreview.css('border-top-width','0');
		    	}else{
		    		this.btnPreview.css('border-top-width',val + 'px');
		    	}
		    },
		    changeBorderBottom: function(e){
		    	var val = $('#btnsx_opt_border_normal_size').val();
		    	if( e.target.value == '0' || e.target.value == '' ){
		    		this.btnPreview.css('border-bottom-width','0');
		    	}else{
		    		this.btnPreview.css('border-bottom-width',val + 'px');
		    	}
		    },
		    changeBorderLeft: function(e){
		    	var val = $('#btnsx_opt_border_normal_size').val();
		    	if( e.target.value == '0' || e.target.value == '' ){
		    		this.btnPreview.css('border-left-width','0');
		    	}else{
		    		this.btnPreview.css('border-left-width',val + 'px');
		    	}
		    },
		    changeBorderRight: function(e){
		    	var val = $('#btnsx_opt_border_normal_size').val();
		    	if( e.target.value == '0' || e.target.value == '' ){
		    		this.btnPreview.css('border-right-width','0');
		    	}else{
		    		this.btnPreview.css('border-right-width',val + 'px');
		    	}
		    },
		    // change border values on hover
		    changeBorderHover: function(){
		    	var borderSizeNormal = $('#btnsx_opt_border_normal_size').val();
		    	var borderSizeHover = $('#btnsx_opt_border_hover_size').val();
		    	if( borderSizeHover != '' ){
		    		this.changeBorderHoverWidth();
		    	}else{
		    		this.changeBorderWidth();
		    	}
		    	var borderStyleNormal = $('#btnsx_opt_border_style_normal').val();
		    	var borderStyleHover = $('#btnsx_opt_border_hover_style').val();
		    	if( borderStyleHover != '' ){
		    		this.btnPreview.css('border-style',borderStyleHover);
		    	} else {
		    		this.btnPreview.css('border-style',borderStyleNormal);
		    	}
		    	this.btnBorderColorHoverValue = this.btnBorderColorHover.val();
		    	this.btnPreview.css( 'border-color', this.btnBorderColorHoverValue );
		    	// Radius
		    	var btnBorderRadiusTopLeftHoverValue = this.btnBorderRadiusTopLeftHover.val();
		    	var btnBorderRadiusTopRightHoverValue = this.btnBorderRadiusTopRightHover.val();
		    	var btnBorderRadiusBottomLeftHoverValue = this.btnBorderRadiusBottomLeftHover.val();
		    	var btnBorderRadiusBottomRightHoverValue = this.btnBorderRadiusBottomRightHover.val();
		    	this.btnPreview.css('border-top-left-radius',btnBorderRadiusTopLeftHoverValue + 'px');
		    	this.btnPreview.css('border-top-right-radius',btnBorderRadiusTopRightHoverValue + 'px');
		    	this.btnPreview.css('border-bottom-left-radius',btnBorderRadiusBottomLeftHoverValue + 'px');
		    	this.btnPreview.css('border-bottom-right-radius',btnBorderRadiusBottomRightHoverValue + 'px');
		    },
		    changeBorderWidth: function(){
		    	var top = $('#btnsx_opt_border_normal_top').val();
		    	var bottom = $('#btnsx_opt_border_normal_bottom').val();
		    	var left = $('#btnsx_opt_border_normal_left').val();
		    	var right = $('#btnsx_opt_border_normal_right').val();
		    	var borderSizeNormal = $('#btnsx_opt_border_normal_size').val();
		    	if( top == '0' || top == '' ){
		    		this.btnPreview.css('border-top-width','0');
		    	}else{
		    		this.btnPreview.css('border-top-width',borderSizeNormal + 'px');
		    	}
		    	if( bottom == '0' || bottom == '' ){
		    		this.btnPreview.css('border-bottom-width','0');
		    	}else{
		    		this.btnPreview.css('border-bottom-width',borderSizeNormal + 'px');
		    	}
		    	if( left == '0' || left == '' ){
		    		this.btnPreview.css('border-left-width','0');
		    	}else{
		    		this.btnPreview.css('border-left-width',borderSizeNormal + 'px');
		    	}
		    	if( right == '0' || right == '' ){
		    		this.btnPreview.css('border-right-width','0');
		    	}else{
		    		this.btnPreview.css('border-right-width',borderSizeNormal + 'px');
		    	}
		    },
		    changeBorderHoverWidth: function(){
		    	var top = $('#btnsx_opt_border_hover_top').val();
		    	var bottom = $('#btnsx_opt_border_hover_bottom').val();
		    	var left = $('#btnsx_opt_border_hover_left').val();
		    	var right = $('#btnsx_opt_border_hover_right').val();
		    	var borderSizeHover = $('#btnsx_opt_border_hover_size').val();
		    	if( top == '0' || top == '' ){
		    		this.btnPreview.css('border-top-width','0');
		    	}else{
		    		this.btnPreview.css('border-top-width',borderSizeHover + 'px');
		    	}
		    	if( bottom == '0' || bottom == '' ){
		    		this.btnPreview.css('border-bottom-width','0');
		    	}else{
		    		this.btnPreview.css('border-bottom-width',borderSizeHover + 'px');
		    	}
		    	if( left == '0' || left == '' ){
		    		this.btnPreview.css('border-left-width','0');
		    	}else{
		    		this.btnPreview.css('border-left-width',borderSizeHover + 'px');
		    	}
		    	if( right == '0' || right == '' ){
		    		this.btnPreview.css('border-right-width','0');
		    	}else{
		    		this.btnPreview.css('border-right-width',borderSizeHover + 'px');
		    	}
		    },
		    // change border values on mouseleave
		    changeBorderNormal: function(){
		    	this.changeBorderWidth();
		    	borderStyleNormal = $('#btnsx_opt_border_normal_style').val();
		    	this.btnPreview.css('border-style',borderStyleNormal);
		    	this.btnBorderColorNormalValue = this.btnBorderColorNormal.val();
		    	this.btnPreview.css( 'border-color', this.btnBorderColorNormalValue );
		    	// Radius
		    	var btnBorderRadiusTopLeftNormalValue = this.btnBorderRadiusTopLeftNormal.val();
		    	var btnBorderRadiusTopRightNormalValue = this.btnBorderRadiusTopRightNormal.val();
		    	var btnBorderRadiusBottomLeftNormalValue = this.btnBorderRadiusBottomLeftNormal.val();
		    	var btnBorderRadiusBottomRightNormalValue = this.btnBorderRadiusBottomRightNormal.val();
		    	this.btnPreview.css('border-top-left-radius',btnBorderRadiusTopLeftNormalValue + 'px');
		    	this.btnPreview.css('border-top-right-radius',btnBorderRadiusTopRightNormalValue + 'px');
		    	this.btnPreview.css('border-bottom-left-radius',btnBorderRadiusBottomLeftNormalValue + 'px');
		    	this.btnPreview.css('border-bottom-right-radius',btnBorderRadiusBottomRightNormalValue + 'px');
		    },
		    // change border radius top left
		    changeBorderRadiusTopLeft: function(e){
		    	this.btnPreview.css('border-top-left-radius',e.target.value + 'px');
		    },
		    // change border radius top left
		    changeBorderRadiusTopRight: function(e){
		    	this.btnPreview.css('border-top-right-radius',e.target.value + 'px');
		    },
		    // change border radius bottom left
		    changeBorderRadiusBottomLeft: function(e){
		    	this.btnPreview.css('border-bottom-left-radius',e.target.value + 'px');
		    },
		    // change border radius bottom left
		    changeBorderRadiusBottomRight: function(e){
		    	this.btnPreview.css('border-bottom-right-radius',e.target.value + 'px');
		    },
		    // copy hover values
		    copyBorderHover: function(e){
		    	$('#btnsx_border_hover_collapsible_copy_btn').btnsxCopy();
		    	var top = $('#btnsx_opt_border_normal_top').val();
		    	if( top == '1' ){
		    		document.getElementById("btnsx_opt_border_normal_top").checked = true;
		    	}else{
		    		document.getElementById("btnsx_opt_border_normal_top").checked = false;
		    	}
		    	var bottom = $('#btnsx_opt_border_normal_bottom').val();
		    	if( bottom == '1' ){
		    		document.getElementById("btnsx_opt_border_normal_bottom").checked = true;
		    	}else{
		    		document.getElementById("btnsx_opt_border_normal_bottom").checked = false;
		    	}
		    	var left = $('#btnsx_opt_border_normal_left').val();
		    	if( left == '1' ){
		    		document.getElementById("btnsx_opt_border_normal_left").checked = true;
		    	}else{
		    		document.getElementById("btnsx_opt_border_normal_left").checked = false;
		    	}
		    	var right = $('#btnsx_opt_border_normal_right').val();
		    	if( right == '1' ){
		    		document.getElementById("btnsx_opt_border_normal_right").checked = true;
		    	}else{
		    		document.getElementById("btnsx_opt_border_normal_right").checked = false;
		    	}
		    	this.changeBorderNormal();
		    },
		    copyBorderNormal: function(e){
		    	$('#btnsx_border_normal_collapsible_copy_btn').btnsxCopy();
		    	var top = $('#btnsx_opt_border_hover_top').val();
		    	if( top == '1' ){
		    		document.getElementById("btnsx_opt_border_hover_top").checked = true;
		    	}else{
		    		document.getElementById("btnsx_opt_border_hover_top").checked = false;
		    	}
		    	var bottom = $('#btnsx_opt_border_hover_bottom').val();
		    	if( bottom == '1' ){
		    		document.getElementById("btnsx_opt_border_hover_bottom").checked = true;
		    	}else{
		    		document.getElementById("btnsx_opt_border_hover_bottom").checked = false;
		    	}
		    	var left = $('#btnsx_opt_border_hover_left').val();
		    	if( left == '1' ){
		    		document.getElementById("btnsx_opt_border_hover_left").checked = true;
		    	}else{
		    		document.getElementById("btnsx_opt_border_hover_left").checked = false;
		    	}
		    	var right = $('#btnsx_opt_border_hover_right').val();
		    	if( right == '1' ){
		    		document.getElementById("btnsx_opt_border_hover_right").checked = true;
		    	}else{
		    		document.getElementById("btnsx_opt_border_hover_right").checked = false;
		    	}
		    },
		    // copy hover values
		    copyBorderRadiusHover: function(e){
		    	$('#btnsx_border_hover_radius_collapsible_copy_btn').btnsxCopy();
		    	this.changeBorderNormal();
		    },
		    copyBorderRadiusNormal: function(e){
		    	$('#btnsx_border_normal_radius_collapsible_copy_btn').btnsxCopy();
		    },
		    changeBorderRadiusAll: function(e){
		    	var val = e.target.value;
		    	$('#btnsx_opt_border_normal_radius_top_left').val(val);
		    	this.changeBorderRadiusTopLeft(e);
		    	$('#btnsx_opt_border_normal_radius_top_right').val(val);
		    	this.changeBorderRadiusTopRight(e);
		    	$('#btnsx_opt_border_normal_radius_bottom_left').val(val);
		    	this.changeBorderRadiusBottomLeft(e);
		    	$('#btnsx_opt_border_normal_radius_bottom_right').val(val);
		    	this.changeBorderRadiusBottomRight(e);
		    },
		    changeBorderRadiusHoverAll: function(e){
		    	var val = e.target.value;
		    	$('#btnsx_opt_border_hover_radius_top_left').val(val);
		    	$('#btnsx_opt_border_hover_radius_top_right').val(val);
		    	$('#btnsx_opt_border_hover_radius_bottom_left').val(val);
		    	$('#btnsx_opt_border_hover_radius_bottom_right').val(val);
		    }
		});
		var btnBorderView = new BtnBorderView();
	
	});

})(jQuery);
/**
 * Buttons X - Shadow View
 * 
 * Copyright 2015, Gautam Thapar
 * http://www.gautamthapar.me
 */

(function($){

	$(document).ready(function(){

		// render button view
		var BtnShadowView = Backbone.View.extend({
		    
		    el: $('#poststuff'),

		    events: {
				'click .btn-btnsx_box_shadow_normal.btnsx-btn-remove': 'triggerBoxShadow',
				'click .btn-btnsx_box_shadow_hover.btnsx-btn-remove': 'triggerBoxShadow'
		    },

		    initialize: function(){

		    	// ASSIGN VARIABLES
			    
			    // Normal
			    	this.btnShadowNormalHorizontal = $('input[name="btnsx_opt_box_shadow_normal_horizontal[]"]');
			    	this.btnShadowNormalVertical = $('input[name="btnsx_opt_box_shadow_normal_vertical[]"]');
			    	this.btnShadowNormalBlur = $('input[name="btnsx_opt_box_shadow_normal_blur[]"]');
			    	this.btnShadowNormalSpread = $('input[name="btnsx_opt_box_shadow_normal_spread[]"]');
			    	this.btnShadowNormalPosition = $('select[name="btnsx_opt_box_shadow_normal_position[]"]');
			    	this.btnShadowNormalColor = $('input[name="btnsx_opt_box_shadow_normal_color[]"]');

			    // Hover
			    	this.btnShadowHoverHorizontal = $('input[name="btnsx_opt_box_shadow_hover_horizontal[]"]');
			    	this.btnShadowHoverVertical = $('input[name="btnsx_opt_box_shadow_hover_vertical[]"]');
			    	this.btnShadowHoverBlur = $('input[name="btnsx_opt_box_shadow_hover_blur[]"]');
			    	this.btnShadowHoverSpread = $('input[name="btnsx_opt_box_shadow_hover_spread[]"]');
			    	this.btnShadowHoverPosition = $('select[name="btnsx_opt_box_shadow_hover_position[]"]');
			    	this.btnShadowHoverColor = $('input[name="btnsx_opt_box_shadow_hover_color[]"]');

			    // CSS
			    	// Normal
			    	this.btnShadowCssNormal = $('#btnsx_opt_box_shadow_css_normal');
			    	this.btnShadowCssNormalValue = $('#btnsx_opt_box_shadow_css_normal').val();
			    	// Hover
			    	this.btnShadowCssHover = $('#btnsx_opt_box_shadow_css_hover');
			    	this.btnShadowCssHoverValue = $('#btnsx_opt_box_shadow_css_hover').val();

			    _.bindAll( this, 'render', 'triggerBoxShadow' ); // every function that uses 'this' as the current object should be in here

			    this.render();

		    },

		    render: function(){

		    	// preview
			    	this.btnPreview = $('#btnsx-preview-btn');
			    	// replace add button with remove if more than one add more button
			    	$('.btnsx-btn-add.btn-btnsx_box_shadow_normal').each(function(i){
			    		if(i!=0){
			    			$(this).removeClass('btnsx-btn-add').addClass('btnsx-btn-remove').text('Remove');
			    		}
			    	});
			    	// replace add button with remove if more than one add more button
			    	$('.btnsx-btn-add.btn-btnsx_box_shadow_hover').each(function(i){
			    		if(i!=0){
			    			$(this).removeClass('btnsx-btn-add').addClass('btnsx-btn-remove').text('Remove');
			    		}
			    	});

			    // SHADOW
					// set normal shadow
					$(document).boxShadow({
				        multipleCount: $( ".btnsx_box_shadow_normal" ).length,
				        styleID: "btnsx-box-shadow-normal-style"
					});
					// set hover shadow
					$(document).boxShadow({
						horizontal: 'input[name="btnsx_opt_box_shadow_hover_horizontal[]"]',
				        vertical: 'input[name="btnsx_opt_box_shadow_hover_vertical[]"]',
				        blur: 'input[name="btnsx_opt_box_shadow_hover_blur[]"]',
				        spread: 'input[name="btnsx_opt_box_shadow_hover_spread[]"]',
				        position: 'select[name="btnsx_opt_box_shadow_hover_position[]"]',
				        color: 'input[name="btnsx_opt_box_shadow_hover_color[]"]',
				        multipleCount: $( ".btnsx_box_shadow_hover" ).length,
				        styleID: "btnsx-box-shadow-hover-style",
				        styleClass: "btnsx-btn:hover"
					});
					// Apply custom CSS
					if( this.btnShadowCssNormalValue != '' || this.btnShadowCssNormalValue != undefined ){
						$('#btnsx-preview .inside').find( "#btnsx-box-shadow-custom-style" ).remove();
					   	$('#btnsx-preview .inside').prepend('<style type="text/css" id="btnsx-box-shadow-custom-style">.btnsx-btn{'+this.btnShadowCssNormalValue+'}</style>');
					}
					if( this.btnShadowCssHoverValue != '' || this.btnShadowCssHoverValue != undefined ){
						$('#btnsx-preview .inside').find( "#btnsx-box-shadow-custom-hover-style" ).remove();
					   	$('#btnsx-preview .inside').prepend('<style type="text/css" id="btnsx-box-shadow-custom-hover-style">.btnsx-btn{'+this.btnShadowCssHoverValue+'}</style>');
					}
					// set normal shadow on change
					$( document ).on('propertychange keyup input change','input[name="btnsx_opt_box_shadow_normal_horizontal[]"], input[name="btnsx_opt_box_shadow_normal_vertical[]"], input[name="btnsx_opt_box_shadow_normal_spread[]"], input[name="btnsx_opt_box_shadow_normal_blur[]"], select[name="btnsx_opt_box_shadow_normal_position[]"], input[name="btnsx_opt_box_shadow_normal_color[]"]',function(){
						$('input[name="btnsx_opt_box_shadow_normal_horizontal[]"]').boxShadow({
							multipleCount: $( ".btnsx_box_shadow_normal" ).length,
			        		styleID: "btnsx-box-shadow-normal-style"
						});
					});
					// set hover shadow on change
					$( document ).on('propertychange keyup input change','input[name="btnsx_opt_box_shadow_hover_horizontal[]"], input[name="btnsx_opt_box_shadow_hover_vertical[]"], input[name="btnsx_opt_box_shadow_hover_spread[]"], input[name="btnsx_opt_box_shadow_hover_blur[]"], select[name="btnsx_opt_box_shadow_hover_position[]"], input[name="btnsx_opt_box_shadow_hover_color[]"]',function(){
						$('input[name="btnsx_opt_box_shadow_hover_horizontal[]"]').boxShadow({
							horizontal: 'input[name="btnsx_opt_box_shadow_hover_horizontal[]"]',
					        vertical: 'input[name="btnsx_opt_box_shadow_hover_vertical[]"]',
					        blur: 'input[name="btnsx_opt_box_shadow_hover_blur[]"]',
					        spread: 'input[name="btnsx_opt_box_shadow_hover_spread[]"]',
					        position: 'select[name="btnsx_opt_box_shadow_hover_position[]"]',
					        color: 'input[name="btnsx_opt_box_shadow_hover_color[]"]',
					        multipleCount: $( ".btnsx_box_shadow_hover" ).length,
					        styleID: "btnsx-box-shadow-hover-style",
					        styleClass: "btnsx-btn:hover"
						});
					});
					
					// box shadow when normal color value changes
					this.btnShadowNormalColor.btnsxRGBA({
						change: function(event, ui){
							$(this).val(ui.color.toString());
							$(document).boxShadow({
						        multipleCount: $( ".btnsx_box_shadow_normal" ).length,
						        styleID: "btnsx-box-shadow-normal-style"
							});
						}
					});

					// box shadow when hover color value changes
					this.btnShadowHoverColor.btnsxRGBA({
						change: function(event, ui){
							$(this).val(ui.color.toString());
							$(document).boxShadow({
								horizontal: 'input[name="btnsx_opt_box_shadow_hover_horizontal[]"]',
						        vertical: 'input[name="btnsx_opt_box_shadow_hover_vertical[]"]',
						        blur: 'input[name="btnsx_opt_box_shadow_hover_blur[]"]',
						        spread: 'input[name="btnsx_opt_box_shadow_hover_spread[]"]',
						        position: 'select[name="btnsx_opt_box_shadow_hover_position[]"]',
						        color: 'input[name="btnsx_opt_box_shadow_hover_color[]"]',
						        multipleCount: $( ".btnsx_box_shadow_hover" ).length,
						        styleID: "btnsx-box-shadow-hover-style",
						        styleClass: "btnsx-btn:hover"
							});
						}
					});

					$('.btnsx-btn-add.btn-btnsx_box_shadow_normal').on('click',function(e){
						e.preventDefault();
						$(this).clonerAdd({
                            container: "btnsx-tabs",
                            cloneId: "btnsx_opt_box_shadow_normal",
                            cloneClass: "btnsx_box_shadow_normal",
                            prefix: "btnsx_opt_box_shadow_normal"
                        });
                        $('.collapsible').off().collapsible({
					      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
					    });
					    $('input[name="btnsx_opt_box_shadow_normal_color[]"]:last').btnsxRGBA({
							change: function(event, ui){
								$(this).val(ui.color.toString());
								$(document).boxShadow({
							        multipleCount: $( ".btnsx_box_shadow_normal" ).length,
							        styleID: "btnsx-box-shadow-normal-style"
								});
							}
						});
					});

					$('.btnsx-btn-add.btn-btnsx_box_shadow_hover').on('click',function(e){
						e.preventDefault();
						$(this).clonerAdd({
                            container: "btnsx-tabs",
                            cloneId: "btnsx_opt_box_shadow_hover",
                            cloneClass: "btnsx_box_shadow_hover",
                            prefix: "btnsx_opt_box_shadow_hover"
                        });
                        $('.collapsible').off().collapsible({
					      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
					    });
					    $('input[name="btnsx_opt_box_shadow_hover_color[]"]:last').btnsxRGBA({
							change: function(event, ui){
								$(this).val(ui.color.toString());
								$(document).boxShadow({
									horizontal: 'input[name="btnsx_opt_box_shadow_hover_horizontal[]"]',
							        vertical: 'input[name="btnsx_opt_box_shadow_hover_vertical[]"]',
							        blur: 'input[name="btnsx_opt_box_shadow_hover_blur[]"]',
							        spread: 'input[name="btnsx_opt_box_shadow_hover_spread[]"]',
							        position: 'select[name="btnsx_opt_box_shadow_hover_position[]"]',
							        color: 'input[name="btnsx_opt_box_shadow_hover_color[]"]',
							        multipleCount: $( ".btnsx_box_shadow_hover" ).length,
							        styleID: "btnsx-box-shadow-hover-style",
							        styleClass: "btnsx-btn:hover"
								});
							}
						});
					});
					// console.log(this.btnShadowNormalHorizontal.length);
		    },

		    triggerBoxShadow: function(e){
		    	e.preventDefault();
		    	$(e.target).closest('li').slideUp('fast', function () {
                	$(this).remove();
                	// update box shadow
                	$(e.target).boxShadow({
				        multipleCount: $( ".btnsx_box_shadow_normal" ).length,
				        styleID: "btnsx-box-shadow-normal-style"
					});
					$(e.target).boxShadow({
				        horizontal: 'input[name="btnsx_opt_box_shadow_hover_horizontal[]"]',
				        vertical: 'input[name="btnsx_opt_box_shadow_hover_vertical[]"]',
				        blur: 'input[name="btnsx_opt_box_shadow_hover_blur[]"]',
				        spread: 'input[name="btnsx_opt_box_shadow_hover_spread[]"]',
				        position: 'select[name="btnsx_opt_box_shadow_hover_position[]"]',
				        color: 'input[name="btnsx_opt_box_shadow_hover_color[]"]',
				        multipleCount: $( ".btnsx_box_shadow_hover" ).length,
				        styleID: "btnsx-box-shadow-hover-style",
				        styleClass: "btnsx-btn:hover"
					});
                });
		    }
		});
		var btnShadowView = new BtnShadowView();

		// Copy
		$(document).on('click','button[id^=btnsx_opt_box_shadow]',function(e){
			if( $(this).data('highlight') != undefined){
				$(this).btnsxCopy();
				$(e.target).boxShadow({
			        multipleCount: $( ".btnsx_box_shadow_normal" ).length,
			        styleID: "btnsx-box-shadow-normal-style"
				});
				$(e.target).boxShadow({
			        horizontal: 'input[name="btnsx_opt_box_shadow_hover_horizontal[]"]',
			        vertical: 'input[name="btnsx_opt_box_shadow_hover_vertical[]"]',
			        blur: 'input[name="btnsx_opt_box_shadow_hover_blur[]"]',
			        spread: 'input[name="btnsx_opt_box_shadow_hover_spread[]"]',
			        position: 'select[name="btnsx_opt_box_shadow_hover_position[]"]',
			        color: 'input[name="btnsx_opt_box_shadow_hover_color[]"]',
			        multipleCount: $( ".btnsx_box_shadow_hover" ).length,
			        styleID: "btnsx-box-shadow-hover-style",
			        styleClass: "btnsx-btn:hover"
				});
			}else{
				return;
			}
		});
	
	});

})(jQuery);
/**
 * Buttons X - General View
 * 
 * Copyright 2015, Gautam Thapar
 * http://www.gautamthapar.me
 */

/**
 * function to show/hide link type dependencies
 * @since  1.8.0
 * @param  {array}  id
 */
function btnsxLinkDependencies( id ){
	var options = [ '#btnsx_opt_link', '#btnsx_opt_link_post', '#btnsx_opt_link_menu_display', '#btnsx_opt_link_edd_id', '#btnsx_opt_link_redirect_url', '#btnsx_opt_link_woocommerce_id', '#btnsx_opt_link_popup_maker', '#btnsx_opt_link_wpvl_type', '#btnsx_opt_link_wpvl_id', '#btnsx_opt_link_wpvl_width', '#btnsx_opt_link_wpvl_height', '#btnsx_opt_link_popuppress', '#btnsx_opt_link_ninja_popup', '#btnsx_opt_link_layered_popup', '#btnsx_opt_link_frame_width', '#btnsx_opt_link_frame_height', '#btnsx_opt_link_email', '#btnsx_opt_link_email_subject', '#btnsx_opt_link_skype_id', '#btnsx_opt_link_telephone', '#btnsx_opt_link_sms_content', '#btnsx_opt_link_menu_type', '#btnsx_opt_link_menu', '#btnsx_opt_link_wistia_video_id' ];
	// hide all options
	jQuery.each( options, function(i,v) {
		jQuery(v).closest('.m12').hide();
	});
	// display dependencies
	if( id.length > 0 ){
		jQuery.each( id, function(i,v) {
			if( jQuery.inArray( v, options ) !== -1 ){
				jQuery(v).closest('.m12').fadeIn('slow');
			}
		});
	}
}

(function($){

	$(document).ready(function(){

		// render basic button view
		var BtnGeneralView = Backbone.View.extend({
		    
		    el: $('#poststuff'),

		    events: {
		    	// general
			    	// width events
				    'propertychange #btnsx_opt_width': 'changeWidth',
				    'keyup #btnsx_opt_width': 'changeWidth',
				    'input #btnsx_opt_width': 'changeWidth',
				    // height events
				    'propertychange #btnsx_opt_height': 'changeHeight',
				    'keyup #btnsx_opt_height': 'changeHeight',
				    'input #btnsx_opt_height': 'changeHeight',
				    // size events
				    'change #btnsx_opt_size': 'changeSize',
				    // disabled events
				    'change #btnsx_opt_disabled': 'changeDisabled',
				    // embossed events
				    'change #btnsx_opt_embossed': 'changeEmbossed',
				    // full width events
				    'change #btnsx_opt_full_width': 'changeFullWidth',
				    // container events
				    // 'change #btnsx_opt_container': 'changeContainer',
				    // wrap center events
				    // 'change #btnsx_opt_wrap_center': 'changeWrapCenter',
				    // link events
				    'change #btnsx_opt_link_type': 'changeLinkType',
				    'change #btnsx_opt_link_target': 'changeLinkTarget',
				    'change #btnsx_opt_link_menu_type': 'changeLinkMenuType',
				    // margin events
				    // margin top
				    'propertychange #btnsx_opt_margin_top': 'changeMarginTop',
				    'keyup #btnsx_opt_margin_top': 'changeMarginTop',
				    'input #btnsx_opt_margin_top': 'changeMarginTop',
				    // margin bottom
				    'propertychange #btnsx_opt_margin_bottom': 'changeMarginBottom',
				    'keyup #btnsx_opt_margin_bottom': 'changeMarginBottom',
				    'input #btnsx_opt_margin_bottom': 'changeMarginBottom',
				    // margin left
				    'propertychange #btnsx_opt_margin_left': 'changeMarginLeft',
				    'keyup #btnsx_opt_margin_left': 'changeMarginLeft',
				    'input #btnsx_opt_margin_left': 'changeMarginLeft',
				    // margin right
				    'propertychange #btnsx_opt_margin_right': 'changeMarginRight',
				    'keyup #btnsx_opt_margin_right': 'changeMarginRight',
				    'input #btnsx_opt_margin_right': 'changeMarginRight',
				    // margin all
				    'propertychange #btnsx_opt_margin_all': 'changeMarginAll',
				    'keyup #btnsx_opt_margin_all': 'changeMarginAll',
				    'input #btnsx_opt_margin_all': 'changeMarginAll',
				    // padding events
				    // padding top
				    'propertychange #btnsx_opt_padding_top': 'changePaddingTop',
				    'keyup #btnsx_opt_padding_top': 'changePaddingTop',
				    'input #btnsx_opt_padding_top': 'changePaddingTop',
				    // padding bottom
				    'propertychange #btnsx_opt_padding_bottom': 'changePaddingBottom',
				    'keyup #btnsx_opt_padding_bottom': 'changePaddingBottom',
				    'input #btnsx_opt_padding_bottom': 'changePaddingBottom',
				    // padding left
				    'propertychange #btnsx_opt_padding_left': 'changePaddingLeft',
				    'keyup #btnsx_opt_padding_left': 'changePaddingLeft',
				    'input #btnsx_opt_padding_left': 'changePaddingLeft',
				    // padding right
				    'propertychange #btnsx_opt_padding_right': 'changePaddingRight',
				    'keyup #btnsx_opt_padding_right': 'changePaddingRight',
				    'input #btnsx_opt_padding_right': 'changePaddingRight',
				    // padding all
				    'propertychange #btnsx_opt_padding_all': 'changePaddingAll',
				    'keyup #btnsx_opt_padding_all': 'changePaddingAll',
				    'input #btnsx_opt_padding_all': 'changePaddingAll',
				    'click .btn-btnsx_link_menu_custom.btnsx-btn-remove': 'removeCustomLink',

		    },

		    initialize: function(){

			    _.bindAll( this, 'render', 'changeWidth', 'changeHeight', 'changeSize', 'changeLinkType', 'changeLinkTarget', 'changeMarginTop', 'changeMarginBottom', 'changeMarginLeft', 'changeMarginRight', 'changePaddingTop', 'changePaddingBottom', 'changePaddingLeft', 'changePaddingRight' ); // every function that uses 'this' as the current object should be in here

			    // ASSIGN VARIABLES
			    
			    // general
			    	this.btnId = $('#btnsx_opt_id');
			    	this.btnWidthVal = $('#btnsx_opt_width').val();
			    	this.btnHeightVal = $('#btnsx_opt_height').val();
			    	this.btnSizeVal = $('#btnsx_opt_size').val();
			    	this.btnDisabled = $('#btnsx_opt_disabled');
			    	this.btnEmbossed = $('#btnsx_opt_embossed');
			    	this.btnFullWidth = $('#btnsx_opt_full_width');
			    	this.btnContainer = $('#btnsx_opt_container');
			    	this.btnPreviewContainer = $('#btnsx-preview-container');
			    	this.btnWrapCenter = $('#btnsx_opt_wrap_center');
			    	// Link
			    	this.btnLinkType = $('#btnsx_opt_link_type');
			    	this.btnLinkTarget = $('#btnsx_opt_link_target');
			    	this.btnLinkMenuType = $('#btnsx_opt_link_menu_type');
			    	// margin
			    	this.btnMarginTop = $('#btnsx_opt_margin_top');
			    	this.btnMarginTopValue = this.btnMarginTop.val();
			    	this.btnMarginBottom = $('#btnsx_opt_margin_bottom');
			    	this.btnMarginBottomValue = this.btnMarginBottom.val();
			    	this.btnMarginLeft = $('#btnsx_opt_margin_left');
			    	this.btnMarginLeftValue = this.btnMarginLeft.val();
			    	this.btnMarginRight = $('#btnsx_opt_margin_right');
			    	this.btnMarginRightValue = this.btnMarginRight.val();
			    	// padding
			    	this.btnPaddingTop = $('#btnsx_opt_padding_top');
			    	this.btnPaddingTopValue = this.btnPaddingTop.val();
			    	this.btnPaddingBottom = $('#btnsx_opt_padding_bottom');
			    	this.btnPaddingBottomValue = this.btnPaddingBottom.val();
			    	this.btnPaddingLeft = $('#btnsx_opt_padding_left');
			    	this.btnPaddingLeftValue = this.btnPaddingLeft.val();
			    	this.btnPaddingRight = $('#btnsx_opt_padding_right');
			    	this.btnPaddingRightValue = this.btnPaddingRight.val();
			    	// Primary Text
			    	this.btnTextFontSize = $('#btnsx_opt_text_font_size');
			    	this.btnTextFontSizeValue = $('#btnsx_opt_text_font_size').val();
			    	this.btnTextPaddingTop = $('#btnsx_opt_text_padding_top');
			    	this.btnTextPaddingTopValue = $('#btnsx_opt_text_padding_top').val();
			    	this.btnTextPaddingBottom = $('#btnsx_opt_text_padding_bottom');
			    	this.btnTextPaddingBottomValue = $('#btnsx_opt_text_padding_bottom').val();
			    	this.btnTextPaddingLeft = $('#btnsx_opt_text_padding_left');
			    	this.btnTextPaddingLeftValue = $('#btnsx_opt_text_padding_left').val();
			    	this.btnTextPaddingRight = $('#btnsx_opt_text_padding_right');
			    	this.btnTextPaddingRightValue = $('#btnsx_opt_text_padding_right').val();
			    	// Dependents
			    	this.btnLinkTypeDependents;

			    this.render();

		    },

		    render: function(){

		    	// preview
			    	this.btnPreview = $('#btnsx-preview-btn');
			    	this.btnTextPrimary = $('#btnsx-btn-text');

				// general
				    // set button width
				    this.btnPreview.width(this.btnWidthVal);
				    if( this.btnWidthVal != '' ){
				    	this.btnPreview.css({
				    		'margin-left': 'auto',
				    		'margin-right': 'auto'
				    	});
				    }
				    // set button height
				    this.btnPreview.height(this.btnHeightVal);
				    // set button size based values
				    if( this.btnSizeVal == 'huge' ){
				    	if(this.btnTextFontSizeValue == '' || this.btnTextFontSizeValue == undefined){
				    		this.btnTextPrimary.css({
					    		'font-size' : '22px',
					    		'line-height' : '22px'
					    	});
				    		this.btnTextFontSize.attr( 'value', '22' );
				    	}
				    	if(this.btnTextPaddingTopValue == '' || this.btnTextPaddingTopValue == undefined){
				    		this.btnTextPrimary.css( 'padding-top', '15px' );
				    		this.btnTextPaddingTop.attr( 'value', '15' );
				    	}
				    	if(this.btnTextPaddingLeftValue == '' || this.btnTextPaddingLeftValue == undefined){
				    		this.btnTextPrimary.css( 'padding-left', '20px' );
				    		this.btnTextPaddingLeft.attr( 'value', '20' );
				    	}
				    	if(this.btnTextPaddingBottomValue == '' || this.btnTextPaddingBottomValue == undefined){
				    		this.btnTextPrimary.css( 'padding-bottom', '16px' );
				    		this.btnTextPaddingBottom.attr( 'value', '16' );
				    	}
				    	if(this.btnTextPaddingRightValue == '' || this.btnTextPaddingRightValue == undefined){
				    		this.btnTextPrimary.css( 'padding-right', '20px' );
				    		this.btnTextPaddingRight.attr( 'value', '20' );
				    	}
				    } else if( this.btnSizeVal == 'large' ) {
				    	if(this.btnTextFontSizeValue == '' || this.btnTextFontSizeValue == undefined){
				    		this.btnTextPrimary.css({
					    		'font-size' : '17px',
					    		'line-height' : '17px'
					    	});
				    		this.btnTextFontSize.attr( 'value', '17' );
				    	}
				    	if(this.btnTextPaddingTopValue == '' || this.btnTextPaddingTopValue == undefined){
				    		this.btnTextPrimary.css( 'padding-top', '12' );
				    		this.btnTextPaddingTop.attr( 'value', '12' );
				    	}
				    	if(this.btnTextPaddingLeftValue == '' || this.btnTextPaddingLeftValue == undefined){
				    		this.btnTextPrimary.css( 'padding-left', '18' );
				    		this.btnTextPaddingLeft.attr( 'value', '18' );
				    	}
				    	if(this.btnTextPaddingBottomValue == '' || this.btnTextPaddingBottomValue == undefined){
				    		this.btnTextPrimary.css( 'padding-bottom', '13' );
				    		this.btnTextPaddingBottom.attr( 'value', '13' );
				    	}
				    	if(this.btnTextPaddingRightValue == '' || this.btnTextPaddingRightValue == undefined){
				    		this.btnTextPrimary.css( 'padding-right', '18' );
				    		this.btnTextPaddingRight.attr( 'value', '18' );
				    	}
				    } else if( this.btnSizeVal == 'wide' ) {
				    	if(this.btnTextFontSizeValue == '' || this.btnTextFontSizeValue == undefined){
				    		this.btnTextPrimary.css({
					    		'font-size' : '15px',
					    		'line-height' : '15px'
					    	});
				    		this.btnTextFontSize.attr( 'value', '15' );
				    	}
				    	if(this.btnTextPaddingTopValue == '' || this.btnTextPaddingTopValue == undefined){
				    		this.btnTextPrimary.css( 'padding-top', '9' );
				    		this.btnTextPaddingTop.attr( 'value', '9' );
				    	}
				    	if(this.btnTextPaddingLeftValue == '' || this.btnTextPaddingLeftValue == undefined){
				    		this.btnTextPrimary.css( 'padding-left', '30' );
				    		this.btnTextPaddingLeft.attr( 'value', '30' );
				    	}
				    	if(this.btnTextPaddingBottomValue == '' || this.btnTextPaddingBottomValue == undefined){
				    		this.btnTextPrimary.css( 'padding-bottom', '10' );
				    		this.btnTextPaddingBottom.attr( 'value', '10' );
				    	}
				    	if(this.btnTextPaddingRightValue == '' || this.btnTextPaddingRightValue == undefined){
				    		this.btnTextPrimary.css( 'padding-right', '30' );
				    		this.btnTextPaddingRight.attr( 'value', '30' );
				    	}
				    } else if( this.btnSizeVal == 'small' ) {
				    	if(this.btnTextFontSizeValue == '' || this.btnTextFontSizeValue == undefined){
				    		this.btnTextPrimary.css({
					    		'font-size' : '13px',
					    		'line-height' : '13px'
					    	});
				    		this.btnTextFontSize.attr( 'value', '13' );
				    	}
				    	if(this.btnTextPaddingTopValue == '' || this.btnTextPaddingTopValue == undefined){
				    		this.btnTextPrimary.css( 'padding-top', '6' );
				    		this.btnTextPaddingTop.attr( 'value', '6' );
				    	}
				    	if(this.btnTextPaddingLeftValue == '' || this.btnTextPaddingLeftValue == undefined){
				    		this.btnTextPrimary.css( 'padding-left', '13' );
				    		this.btnTextPaddingLeft.attr( 'value', '13' );
				    	}
				    	if(this.btnTextPaddingBottomValue == '' || this.btnTextPaddingBottomValue == undefined){
				    		this.btnTextPrimary.css( 'padding-bottom', '7' );
				    		this.btnTextPaddingBottom.attr( 'value', '7' );
				    	}
				    	if(this.btnTextPaddingRightValue == '' || this.btnTextPaddingRightValue == undefined){
				    		this.btnTextPrimary.css( 'padding-right', '13' );
				    		this.btnTextPaddingRight.attr( 'value', '13' );
				    	}
				    } else if( this.btnSizeVal == 'mini' ) {
				    	if(this.btnTextFontSizeValue == '' || this.btnTextFontSizeValue == undefined){
				    		this.btnTextPrimary.css({
					    		'font-size' : '11px',
					    		'line-height' : '11px'
					    	});
				    		this.btnTextFontSize.attr( 'value', '11' );
				    	}
				    	if(this.btnTextPaddingTopValue == '' || this.btnTextPaddingTopValue == undefined){
				    		this.btnTextPrimary.css( 'padding-top', '4' );
				    		this.btnTextPaddingTop.attr( 'value', '4' );
				    	}
				    	if(this.btnTextPaddingLeftValue == '' || this.btnTextPaddingLeftValue == undefined){
				    		this.btnTextPrimary.css( 'padding-left', '7' );
				    		this.btnTextPaddingLeft.attr( 'value', '7' );
				    	}
				    	if(this.btnTextPaddingBottomValue == '' || this.btnTextPaddingBottomValue == undefined){
				    		this.btnTextPrimary.css( 'padding-bottom', '5' );
				    		this.btnTextPaddingBottom.attr( 'value', '5' );
				    	}
				    	if(this.btnTextPaddingRightValue == '' || this.btnTextPaddingRightValue == undefined){
				    		this.btnTextPrimary.css( 'padding-right', '7' );
				    		this.btnTextPaddingRight.attr( 'value', '7' );
				    	}
				    }
				    // set button disabled state
				    if( this.btnDisabled.is(':checked') ){
			    		$(this.btnPreview).addClass('btnsx-btn-disabled');
			    	}else{
			    		$(this.btnPreview).removeClass('btnsx-btn-disabled');
			    	}
			    	// set button embossed state
			    	if( this.btnEmbossed.is(':checked') ){
			    		$(this.btnPreview).addClass('btnsx-btn-embossed');
			    	}else{
			    		$(this.btnPreview).removeClass('btnsx-btn-embossed');
			    	}
			    	// set button full width state
			    	if( this.btnFullWidth.is(':checked') ){
			    		$(this.btnPreview).addClass('btnsx-btn-block');
			    		if( this.btnPreviewContainer.hasClass('btnsx-btn-group') ){
			    			this.container.css('width','100%');
			    		}
			    	}else{
			    		$(this.btnPreview).removeClass('btnsx-btn-block');
			    		if( this.btnPreviewContainer.hasClass('btnsx-btn-group') ){
			    			this.container.css('width','auto');
			    		}
			    	}
			    	// console.log(this.btnLinkType.val());
			    	jQuery('.btnsx_link_menu_custom').hide();
			    	// set link options
			    	var btnLinkTypeVal = this.btnLinkType.val();
			    	if( btnLinkTypeVal == 'menu' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_menu_type', '#btnsx_opt_link_menu_display' ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
				    	// custom menu type
				    	var menuType = this.btnLinkMenuType.val();
				    	if( menuType == 'wordpress' ){
				    		jQuery('#btnsx_opt_link_menu').closest('.m12').fadeIn('slow');
					    	jQuery('.btnsx_link_menu_custom').hide();
					    } else if( menuType == 'custom' ) {
				    		jQuery('#btnsx_opt_link_menu').closest('.m12').hide();
				    		jQuery('.btnsx_link_menu_custom').fadeIn('slow');
				    	} else {
				    		jQuery('#btnsx_opt_link_menu').closest('.m12').hide();
				    		jQuery('.btnsx_link_menu_custom').hide();
				    	}
			    	} else if( btnLinkTypeVal == 'post' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_post' ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
			    	} else if( btnLinkTypeVal == 'edd_checkout' || btnLinkTypeVal == 'edd_straight_to_gateway' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_edd_id' ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
			    	} else if( btnLinkTypeVal == 'login_redirect_custom_page' || btnLinkTypeVal == 'logout_redirect_custom_page' || btnLinkTypeVal == 'lost_password_redirect_custom_page' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_redirect_url' ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
			    	} else if( btnLinkTypeVal == 'url' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link' ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
			    	} else if( btnLinkTypeVal == 'url_unescaped' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link' ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
			    	} else if( btnLinkTypeVal == 'woocommerce_add_to_cart' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_woocommerce_id' ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
			    	} else if( btnLinkTypeVal == 'popup_maker' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_popup_maker' ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
				    } else if( btnLinkTypeVal == 'wp_video_lightbox' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_wpvl_type', '#btnsx_opt_link_wpvl_id', '#btnsx_opt_link_wpvl_width', '#btnsx_opt_link_wpvl_height'  ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
				    } else if( btnLinkTypeVal == 'popuppress' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_popuppress'  ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
				    } else if( btnLinkTypeVal == 'ninja_popup' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_ninja_popup'  ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
				    } else if( btnLinkTypeVal == 'layered_popup' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_layered_popup'  ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
				    } else if( btnLinkTypeVal == 'mailto' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_email', '#btnsx_opt_link_email_subject'  ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
					} else if( btnLinkTypeVal == 'skype_call' || btnLinkTypeVal == 'skype_chat' || btnLinkTypeVal == 'skype_video_call' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_skype_id'  ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
					} else if( btnLinkTypeVal == 'sms' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_telephone', '#btnsx_opt_link_sms_content'  ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
					} else if( btnLinkTypeVal == 'tel' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_telephone' ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
					} else if( btnLinkTypeVal == 'wistia_popover' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_wistia_video_id' ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
					} else {
				    	this.btnLinkTypeDependents = [];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
			    	}

			    	// iframe
			    	if( this.btnLinkTarget.val() == 'iframe' ){
				    	jQuery('#btnsx_opt_link_frame_width,#btnsx_opt_link_frame_height').closest('.m12').fadeIn('slow');
			    	}else{
			    		jQuery('#btnsx_opt_link_frame_width,#btnsx_opt_link_frame_height').closest('.m12').hide();
			    	}

				    // change preview button margin & padding
				    this.btnPreview.css({
				    	'margin-top' : this.btnMarginTopValue + 'px',
				    	'margin-bottom' : this.btnMarginBottomValue + 'px',
				    	'padding-top' : this.btnPaddingTopValue + 'px',
				    	'padding-bottom' : this.btnPaddingBottomValue + 'px',
				    	'padding-left' : this.btnPaddingLeftValue + 'px',
				    	'padding-right' : this.btnPaddingRightValue + 'px'
				    });

				    if( this.btnWidthVal = '' ) {
				    	this.btnPreview.css({
					    	'margin-left' : this.btnMarginLeftValue + 'px',
					    	'margin-right' : this.btnMarginRightValue + 'px'
					    });
				    }

				    // replace add button with remove if more than one add more button
			    	$('.btnsx-btn-add.btn-btnsx_link_menu_custom').each(function(i){
			    		if(i!=0){
			    			$(this).removeClass('btnsx-btn-add').addClass('btnsx-btn-remove').text('Remove');
			    		}
			    	});

				    $('.btnsx-btn-add.btn-btnsx_link_menu_custom').on('click',function(e){
						e.preventDefault();
						$(this).clonerAdd({
                            container: "btnsx-tabs",
                            cloneId: "btnsx_opt_link_menu_custom",
                            cloneClass: "btnsx_link_menu_custom",
                            prefix: "btnsx_opt_link_menu_custom"
                        });
                        $('.collapsible').off().collapsible({
					      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
					    });
                    });
				
		    },
		    // change button width when width value changes
		    changeWidth: function(e){
		      	this.btnPreview.width(e.target.value);
		      	this.btnMarginLeftValue = this.btnMarginLeft.val();
		      	this.btnMarginRightValue = this.btnMarginRight.val();
		      	if( e.target.value != '' ){
			    	this.btnPreview.css({
			    		'display': 'block',
			    		'margin-left': 'auto',
			    		'margin-right': 'auto'
			    	});
			    }else{
			    	this.btnPreview.css({
			    		'display': 'inline-block',
			    		'margin-left': this.btnMarginLeftValue + 'px',
			    		'margin-right': this.btnMarginRightValue + 'px'
			    	});
			    }
		    },
		    // change button height when height value changes
		    changeHeight: function(e){
		      	this.btnPreview.height(e.target.value);
		    },
		    // change button size when size value changes
		    changeSize: function(e){
			    if( e.target.value == 'huge' ){
				    this.btnTextFontSize.attr( 'value', '22' );
			    	this.btnTextPaddingTop.attr( 'value', '15' );
			    	this.btnTextPaddingBottom.attr( 'value', '16' );
			    	this.btnTextPaddingLeft.attr( 'value', '20' );
			    	this.btnTextPaddingRight.attr( 'value', '20' );
			    	this.btnTextPrimary.css({
			    		'font-size' : '22px',
			    		'line-height' : '22px',
			    		'padding' : '15px 20px 16px 20px'
			    	});
			    	this.btnPreview.css('padding','0');
			    	this.btnPaddingTop.attr( 'value', '15' );
			    	this.btnPaddingLeft.attr( 'value', '20' );
			    	this.btnPaddingBottom.attr( 'value', '16' );
			    	this.btnPaddingRight.attr( 'value', '20' );
			    } else if( e.target.value == 'large' ) {
			    	this.btnTextFontSize.attr( 'value', '17' );
			    	this.btnTextPaddingTop.attr( 'value', '12' );
			    	this.btnTextPaddingBottom.attr( 'value', '13' );
			    	this.btnTextPaddingLeft.attr( 'value', '18' );
			    	this.btnTextPaddingRight.attr( 'value', '18' );
			    	this.btnTextPrimary.css({
			    		'font-size' : '17px',
			    		'line-height' : '17px',
			    		'padding' : '12px 18px 13px 18px'
			    	});
			    	this.btnPreview.css('padding','0');
			    	this.btnPaddingTop.attr( 'value', '12' );
			    	this.btnPaddingLeft.attr( 'value', '18' );
			    	this.btnPaddingBottom.attr( 'value', '13' );
			    	this.btnPaddingRight.attr( 'value', '18' );
			    } else if( e.target.value == 'wide' ) {
			    	this.btnTextFontSize.attr( 'value', '15' );
			    	this.btnTextPaddingTop.attr( 'value', '9' );
			    	this.btnTextPaddingBottom.attr( 'value', '10' );
			    	this.btnTextPaddingLeft.attr( 'value', '30' );
			    	this.btnTextPaddingRight.attr( 'value', '30' );
			    	this.btnTextPrimary.css({
			    		'font-size' : '15px',
			    		'line-height' : '15px',
			    		'padding' : '9px 30px 10px 30px'
			    	});
			    	this.btnPreview.css('padding','0');
			    	this.btnPaddingTop.attr( 'value', '9' );
			    	this.btnPaddingLeft.attr( 'value', '30' );
			    	this.btnPaddingBottom.attr( 'value', '10' );
			    	this.btnPaddingRight.attr( 'value', '30' );
			    } else if( e.target.value == 'small' ) {
			    	this.btnTextFontSize.attr( 'value', '13' );
			    	this.btnTextPaddingTop.attr( 'value', '6' );
			    	this.btnTextPaddingBottom.attr( 'value', '8' );
			    	this.btnTextPaddingLeft.attr( 'value', '13' );
			    	this.btnTextPaddingRight.attr( 'value', '13' );
			    	this.btnTextPrimary.css({
			    		'font-size' : '13px',
			    		'line-height' : '13px',
			    		'padding' : '6px 13px 8px 13px'
			    	});
			    	this.btnPreview.css('padding','0');
			    	this.btnPaddingTop.attr( 'value', '6' );
			    	this.btnPaddingLeft.attr( 'value', '13' );
			    	this.btnPaddingBottom.attr( 'value', '8' );
			    	this.btnPaddingRight.attr( 'value', '13' );
			    } else if( e.target.value == 'mini' ) {
			    	this.btnTextFontSize.attr( 'value', '11' );
			    	this.btnTextPaddingTop.attr( 'value', '4' );
			    	this.btnTextPaddingBottom.attr( 'value', '5' );
			    	this.btnTextPaddingLeft.attr( 'value', '7' );
			    	this.btnTextPaddingRight.attr( 'value', '7' );
			    	this.btnTextPrimary.css({
			    		'font-size' : '11px',
			    		'line-height' : '11px',
			    		'padding' : '4px 7px 5px 7px'
			    	});
			    	this.btnPreview.css('padding','0');
			    	this.btnPaddingTop.attr( 'value', '4' );
			    	this.btnPaddingLeft.attr( 'value', '7' );
			    	this.btnPaddingBottom.attr( 'value', '5' );
			    	this.btnPaddingRight.attr( 'value', '7' );
			    }
		    },
		    // change button state when disabled is checked
		    changeDisabled: function(e){
		    	if( $(e.target).is(':checked') ){
		    		$(this.btnPreview).addClass('btnsx-btn-disabled');
		    	}else{
		    		$(this.btnPreview).removeClass('btnsx-btn-disabled');
		    	}
		    },
		    // change button state when embossed is checked
		    changeEmbossed: function(e){
		    	if( $(e.target).is(':checked') ){
		    		$(this.btnPreview).addClass('btnsx-btn-embossed');
		    	}else{
		    		$(this.btnPreview).removeClass('btnsx-btn-embossed');
		    	}
		    },
		    // change button state when full width is checked
		    changeFullWidth: function(e){
		    	this.btnWidthVal = $('#btnsx_opt_width').val();
		    	this.btnMarginLeftValue = this.btnMarginLeft.val();
		      	this.btnMarginRightValue = this.btnMarginRight.val();
		    	if( $(e.target).is(':checked') ){
		    		if( this.btnPreviewContainer.hasClass('btnsx-btn-group') ){
		    			this.btnPreviewContainer.css('width','100%');
		    		}
		    		$(this.btnPreview).addClass('btnsx-btn-block');
		    		$('#btnsx_opt_width').val('');
		    		$(this.btnPreview).css({
		    			'width': '',
		    			'margin-left': this.btnMarginLeftValue + 'px',
			    		'margin-right': this.btnMarginRightValue + 'px'
		    		});
		    	}else{
		    		if( this.btnPreviewContainer.hasClass('btnsx-btn-group') ){
		    			this.btnPreviewContainer.css('width','auto');
		    		}
		    		$(this.btnPreview).removeClass('btnsx-btn-block');
		    		if( this.btnWidthVal != '' ){
		    			$(this.btnPreview).css({
			    			'margin-left': 'auto',
				    		'margin-right': 'auto'
			    		});
		    		}else{
		    			$(this.btnPreview).css('display','inline-block');
		    		}
		    	}
		    },
		    changeLinkMenuType: function(e){
		    	var btnLinkMenuTypeVal = $(e.target).val();
		    	console.log(btnLinkMenuTypeVal);
		    	if( btnLinkMenuTypeVal == 'wordpress' ){
		    		$('#btnsx_opt_link_menu').closest('.m12').fadeIn('slow');
		    		$('.btnsx_link_menu_custom').hide();
		    	} else {
		    		$('#btnsx_opt_link_menu').closest('.m12').hide();
		    		$('.btnsx_link_menu_custom').fadeIn('slow');
		    	}
		    },
		    // change link options
		    changeLinkType: function(e){
		    	$('.btnsx_link_menu_custom').hide();
		    	var btnLinkTypeVal = $(e.target).val();
		    	if( btnLinkTypeVal == 'menu' ){
		    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_menu_type', '#btnsx_opt_link_menu_display' ];
			    	btnsxLinkDependencies( this.btnLinkTypeDependents );
			    	var menuType = this.btnLinkMenuType.val();
			    	if( menuType == 'wordpress' ){
			    		jQuery('#btnsx_opt_link_menu').closest('.m12').fadeIn('slow');
				    	jQuery('.btnsx_link_menu_custom').hide();
				    } else if( menuType == 'custom' ) {
			    		jQuery('#btnsx_opt_link_menu').closest('.m12').hide();
			    		jQuery('.btnsx_link_menu_custom').fadeIn('slow');
			    	} else {
			    		jQuery('#btnsx_opt_link_menu').closest('.m12').hide();
			    		jQuery('.btnsx_link_menu_custom').hide();
			    	}
		    	} else if( btnLinkTypeVal == 'post' ){
		    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_post' ];
			    	btnsxLinkDependencies( this.btnLinkTypeDependents );
		    	} else if( btnLinkTypeVal == 'edd_checkout' || btnLinkTypeVal == 'edd_straight_to_gateway' ){
		    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_edd_id' ];
			    	btnsxLinkDependencies( this.btnLinkTypeDependents );
		    	} else if( btnLinkTypeVal == 'login_redirect_custom_page' || btnLinkTypeVal == 'logout_redirect_custom_page' || btnLinkTypeVal == 'lost_password_redirect_custom_page' ){
		    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_redirect_url' ];
			    	btnsxLinkDependencies( this.btnLinkTypeDependents );
		    	} else if( btnLinkTypeVal == 'url' ){
		    		this.btnLinkTypeDependents = [ '#btnsx_opt_link' ];
			    	btnsxLinkDependencies( this.btnLinkTypeDependents );
		    	} else if( btnLinkTypeVal == 'url_unescaped' ){
		    		this.btnLinkTypeDependents = [ '#btnsx_opt_link' ];
			    	btnsxLinkDependencies( this.btnLinkTypeDependents );
		    	} else if( btnLinkTypeVal == 'woocommerce_add_to_cart' ){
		    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_woocommerce_id' ];
			    	btnsxLinkDependencies( this.btnLinkTypeDependents );
		    	} else if( btnLinkTypeVal == 'popup_maker' ){
		    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_popup_maker' ];
			    	btnsxLinkDependencies( this.btnLinkTypeDependents );
			    } else if( btnLinkTypeVal == 'wp_video_lightbox' ){
		    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_wpvl_type', '#btnsx_opt_link_wpvl_id', '#btnsx_opt_link_wpvl_width', '#btnsx_opt_link_wpvl_height'  ];
			    	btnsxLinkDependencies( this.btnLinkTypeDependents );
				} else if( btnLinkTypeVal == 'popuppress' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_popuppress'  ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
				} else if( btnLinkTypeVal == 'ninja_popup' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_ninja_popup'  ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
				} else if( btnLinkTypeVal == 'layered_popup' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_layered_popup'  ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
				} else if( btnLinkTypeVal == 'mailto' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_email', '#btnsx_opt_link_email_subject'  ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
				} else if( btnLinkTypeVal == 'skype_call' || btnLinkTypeVal == 'skype_chat' || btnLinkTypeVal == 'skype_video_call' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_skype_id'  ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
				} else if( btnLinkTypeVal == 'sms' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_telephone', '#btnsx_opt_link_sms_content'  ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
				} else if( btnLinkTypeVal == 'tel' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_telephone' ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
				} else if( btnLinkTypeVal == 'wistia_popover' ){
			    		this.btnLinkTypeDependents = [ '#btnsx_opt_link_wistia_video_id' ];
				    	btnsxLinkDependencies( this.btnLinkTypeDependents );
				} else {
			    	this.btnLinkTypeDependents = [];
			    	btnsxLinkDependencies( this.btnLinkTypeDependents );
		    	}

		    	if( $('#btnsx_opt_link_target').val() == 'iframe' ){
		    		jQuery('#btnsx_opt_link_frame_width,#btnsx_opt_link_frame_height').closest('.m12').fadeIn('slow');
		    	}else{
		    		jQuery('#btnsx_opt_link_frame_width,#btnsx_opt_link_frame_height').closest('.m12').hide();
		    	}
		    },
		    // change link target options
		    changeLinkTarget: function(e){
		    	if( $(e.target).val() == 'iframe' ){
		    		jQuery('#btnsx_opt_link_frame_width,#btnsx_opt_link_frame_height').closest('.m12').fadeIn('slow');
		    	}else{
		    		jQuery('#btnsx_opt_link_frame_width,#btnsx_opt_link_frame_height').closest('.m12').hide();
		    	}
		    },
		    // change button margin top
		    changeMarginTop: function(e){
		    	this.btnPreview.css( 'margin-top', e.target.value + 'px' );
		    },
		    // change button margin bottom
		    changeMarginBottom: function(e){
		    	this.btnPreview.css( 'margin-bottom', e.target.value + 'px' );
		    },
		    // change button margin left
		    changeMarginLeft: function(e){
		    	this.btnWidthVal = $('#btnsx_opt_width').val();
		    	if( this.btnWidthVal == '' ){
		    		this.btnPreview.css( 'margin-left', e.target.value + 'px' );
		    	}
		    },
		    // change button margin right
		    changeMarginRight: function(e){
		    	this.btnWidthVal = $('#btnsx_opt_width').val();
		    	if( this.btnWidthVal == '' ){
		    		this.btnPreview.css( 'margin-right', e.target.value + 'px' );
		    	}
		    },
		    //
		    changeMarginAll: function(e){
		    	$('#btnsx_opt_margin_top').val(e.target.value);
		    	$('#btnsx_opt_margin_bottom').val(e.target.value);
		    	$('#btnsx_opt_margin_right').val(e.target.value);
		    	$('#btnsx_opt_margin_left').val(e.target.value);
		    	this.changeMarginTop(e);
		    	this.changeMarginBottom(e);
		    	this.changeMarginLeft(e);
		    	this.changeMarginRight(e);
		    },
		    // change button padding top
		    changePaddingTop: function(e){
		    	this.btnPreview.css( 'padding-top', e.target.value + 'px' );
		    },
		    // change button padding bottom
		    changePaddingBottom: function(e){
		    	this.btnPreview.css( 'padding-bottom', e.target.value + 'px' );
		    },
		    // change button padding left
		    changePaddingLeft: function(e){
		    	this.btnPreview.css( 'padding-left', e.target.value + 'px' );
		    },
		    // change button padding right
		    changePaddingRight: function(e){
		    	this.btnPreview.css( 'padding-right', e.target.value + 'px' );
		    },
		    changePaddingAll: function(e){
		    	$('#btnsx_opt_padding_top').val(e.target.value);
		    	$('#btnsx_opt_padding_bottom').val(e.target.value);
		    	$('#btnsx_opt_padding_right').val(e.target.value);
		    	$('#btnsx_opt_padding_left').val(e.target.value);
		    	this.changePaddingTop(e);
		    	this.changePaddingBottom(e);
		    	this.changePaddingLeft(e);
		    	this.changePaddingRight(e);
		    },
		    removeCustomLink: function(e){
		    	e.preventDefault();
		    	$(e.target).closest('li').slideUp('fast', function () {
                	$(this).remove();
                });
		    },
		});
		var btnGeneralView = new BtnGeneralView();

	});

})(jQuery);
/**
 * Buttons X - Gradient View
 * 
 * Copyright 2015, Gautam Thapar
 * http://www.gautamthapar.me
 */

(function($){

	$(document).ready(function(){

		// render basic button view
		var BtnGradientView = Backbone.View.extend({
		    
		    el: $('#poststuff'),

		    events: {
				// gradient
					'change #btnsx_opt_gradient_type_normal': 'changeGradientType',
					'change #btnsx_opt_gradient_type_hover': 'changeGradientHoverType',
					// 'click #btnsx_opt_gradient_type_normal_copy_btn': 'copyGradientNormal',
					// 'click #btnsx_opt_gradient_type_hover_copy_btn': 'copyGradientHover',
					'click .btn-btnsx_gradient_stop_normal.btnsx-btn-remove': 'triggerGradient',
					'click .btn-btnsx_gradient_stop_hover.btnsx-btn-remove': 'triggerGradient',
		    },

		    initialize: function(){

			    _.bindAll( this, 'render' ); // every function that uses 'this' as the current object should be in here

			    // ASSIGN VARIABLES
			    
			    // gradient
			    	// type
			    		this.btnGradientTypeNormal = $('#btnsx_opt_gradient_type_normal');
			    		this.btnGradientTypeNormalValue = $('#btnsx_opt_gradient_type_normal').val();
			    		this.btnGradientTypeHover = $('#btnsx_opt_gradient_type_hover');
			    		this.btnGradientTypeHoverValue = $('#btnsx_opt_gradient_type_hover').val();
			    
			    	// Normal
				    	this.btnGradientStopNormalColor = $('input[name="btnsx_opt_gradient_stop_normal_color[]"]');
				    	this.btnGradientStopNormalLocation = $('input[name="btnsx_opt_gradient_stop_normal_location[]"]');

				    // Hover
				    	this.btnGradientStopHoverColor = $('input[name="btnsx_opt_gradient_stop_hover_color[]"]');
				    	this.btnGradientStopHoverLocation = $('input[name="btnsx_opt_gradient_stop_hover_location[]"]');

				    // CSS
				    	// Normal
				    	this.btnGradientCssNormal = $('#btnsx_opt_gradient_css_normal');
				    	this.btnGradientCssNormalValue = $('#btnsx_opt_gradient_css_normal').val();
				    	// Hover
				    	this.btnGradientCssHover = $('#btnsx_opt_gradient_css_hover');
				    	this.btnGradientCssHoverValue = $('#btnsx_opt_gradient_css_hover').val();

			    this.render();

		    },

		    render: function(){

		    	// preview
			    	this.btnPreview = $('#btnsx-preview-btn');
			    	this.btnPreviewContainer = $('#btnsx-preview .inside');

		    	// replace add button with remove if more than one add more button
			    	$('.btnsx-btn-add.btn-btnsx_gradient_stop_normal').each(function(i){
			    		if(i!=0){
			    			$(this).removeClass('btnsx-btn-add').addClass('btnsx-btn-remove').text('Remove');
			    		}
			    	});
			    	$('.btnsx-btn-add.btn-btnsx_gradient_stop_hover').each(function(i){
			    		if(i!=0){
			    			$(this).removeClass('btnsx-btn-add').addClass('btnsx-btn-remove').text('Remove');
			    		}
			    	});

				// gradient
					// set normal gradient
					$(document).gradientStop({
				        multipleCount: $( ".btnsx_gradient_stop_normal" ).length,
				        styleID: "btnsx-gradient-normal-style"
					});
					// set hover gradient
					$(document).gradientStop({
						type: 'select[name="btnsx_opt_gradient_type_hover"]',
						color: 'input[name="btnsx_opt_gradient_stop_hover_color[]"]',
						location: "input[name='btnsx_opt_gradient_stop_hover_location[]']",
				        multipleCount: $( ".btnsx_gradient_stop_hover" ).length,
				        styleID: "btnsx-gradient-hover-style",
				        styleClass: "btnsx-btn:hover"
					});
					// set normal gradient on change
					$( document ).on('propertychange keyup input change','input[name="btnsx_opt_gradient_stop_normal_color[]"], input[name="btnsx_opt_gradient_stop_normal_location[]"]',function(){
						$('input[name="btnsx_opt_gradient_stop_normal_color[]"]').gradientStop({
							multipleCount: $( ".btnsx_gradient_stop_normal" ).length,
			        		styleID: "btnsx-gradient-normal-style"
						});
					});
					// set hover gradient on change
					$( document ).on('propertychange keyup input change','input[name="btnsx_opt_gradient_stop_hover_color[]"], input[name="btnsx_opt_gradient_stop_hover_location[]"]',function(){
						$('input[name="btnsx_opt_gradient_stop_hover_horizontal[]"]').gradientStop({
							type: 'select[name="btnsx_opt_gradient_type_hover"]',
							color: 'input[name="btnsx_opt_gradient_stop_hover_color[]"]',
							location: "input[name='btnsx_opt_gradient_stop_hover_location[]']",
					        multipleCount: $( ".btnsx_gradient_stop_hover" ).length,
					        styleID: "btnsx-gradient-hover-style",
					        styleClass: "btnsx-btn:hover"
						});
					});

					// gradient when normal color value changes
					this.btnGradientStopNormalColor.btnsxRGBA({
						change: function(event, ui){
							$(this).val(ui.color.toString());
							$(document).gradientStop({
						        multipleCount: $( ".btnsx_gradient_stop_normal" ).length,
			        			styleID: "btnsx-gradient-normal-style"
							});
						}
					});

					// gradient when hover color value changes
					this.btnGradientStopHoverColor.btnsxRGBA({
						change: function(event, ui){
							$(this).val(ui.color.toString());
							$(document).gradientStop({
								type: 'select[name="btnsx_opt_gradient_type_hover"]',
								color: 'input[name="btnsx_opt_gradient_stop_hover_color[]"]',
								location: "input[name='btnsx_opt_gradient_stop_hover_location[]']",
						        multipleCount: $( ".btnsx_gradient_stop_hover" ).length,
						        styleID: "btnsx-gradient-hover-style",
						        styleClass: "btnsx-btn:hover"
							});
						}
					});

				// clone
					$('.btnsx-btn-add.btn-btnsx_gradient_stop_normal').on('click',function(e){
						e.preventDefault();
						$(this).clonerAdd({
                            container: "btnsx-tabs",
                            cloneId: "btnsx_opt_gradient_stop_normal",
                            cloneClass: "btnsx_gradient_stop_normal",
                            prefix: "btnsx_opt_gradient_stop_normal"
                        });
                        $('.collapsible').off().collapsible({
					      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
					    });
					    $('input[name="btnsx_opt_gradient_stop_normal_color[]"]:last').btnsxRGBA({
							change: function(event, ui){
								$(this).val(ui.color.toString());
								$(document).gradientStop({
							        multipleCount: $( ".btnsx_gradient_stop_normal" ).length,
				        			styleID: "btnsx-gradient-normal-style"
								});
							}
						});
					});

					$('.btnsx-btn-add.btn-btnsx_gradient_stop_hover').on('click',function(e){
						e.preventDefault();
						$(this).clonerAdd({
                            container: "btnsx-tabs",
                            cloneId: "btnsx_opt_gradient_stop_hover",
                            cloneClass: "btnsx_gradient_stop_hover",
                            prefix: "btnsx_opt_gradient_stop_hover"
                        });
                        $('.collapsible').off().collapsible({
					      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
					    });
					    $('input[name="btnsx_opt_gradient_stop_hover_color[]"]:last').btnsxRGBA({
							change: function(event, ui){
								$(this).val(ui.color.toString());
								$(document).gradientStop({
									type: 'select[name="btnsx_opt_gradient_type_hover"]',
									color: 'input[name="btnsx_opt_gradient_stop_hover_color[]"]',
									location: "input[name='btnsx_opt_gradient_stop_hover_location[]']",
							        multipleCount: $( ".btnsx_gradient_stop_hover" ).length,
							        styleID: "btnsx-gradient-hover-style",
							        styleClass: "btnsx-btn:hover"
								});
							}
						});
					});

				// Apply custom CSS
					if( this.btnGradientCssNormalValue != '' || this.btnGradientCssNormalValue != undefined ){
						$('#btnsx-preview .inside').find( "#btnsx-gradient-custom-style" ).remove();
					   	$('#btnsx-preview .inside').prepend('<style type="text/css" id="btnsx-gradient-custom-style">.btnsx-btn{'+this.btnGradientCssNormalValue+'}</style>');
					}
					if( this.btnGradientCssHoverValue != '' || this.btnGradientCssHoverValue != undefined ){
						$('#btnsx-preview .inside').find( "#btnsx-gradient-custom-hover-style" ).remove();
					   	$('#btnsx-preview .inside').prepend('<style type="text/css" id="btnsx-gradient-custom-hover-style">.btnsx-btn:hover{'+this.btnGradientCssHoverValue+'}</style>');
					}

		    },
		    changeGradientType: function(e){
		    	e.preventDefault();
		    	$(e.target).gradientStop({
			        multipleCount: $( ".btnsx_gradient_stop_normal" ).length,
		        	styleID: "btnsx-gradient-normal-style"
				});
		    },
		    changeGradientHoverType: function(e){
		    	e.preventDefault();
		    	$(e.target).gradientStop({
		    		type: 'select[name="btnsx_opt_gradient_type_hover"]',
					color: 'input[name="btnsx_opt_gradient_stop_hover_color[]"]',
					location: "input[name='btnsx_opt_gradient_stop_hover_location[]']",
			        multipleCount: $( ".btnsx_gradient_stop_hover" ).length,
			        styleID: "btnsx-gradient-hover-style",
			        styleClass: "btnsx-btn:hover"
				});
		    },
		    triggerGradient: function(e){
		    	e.preventDefault();
		    	$(e.target).closest('li').slideUp('fast', function () {
                	$(this).remove();
                	// update gradient
                	$(e.target).gradientStop({
				        multipleCount: $( ".btnsx_gradient_stop_normal" ).length,
			        	styleID: "btnsx-gradient-normal-style"
					});
					$(e.target).gradientStop({
				        color: 'input[name="btnsx_opt_gradient_stop_hover_color[]"]',
						location: "input[name='btnsx_opt_gradient_stop_hover_location[]']",
				        multipleCount: $( ".btnsx_gradient_stop_hover" ).length,
				        styleID: "btnsx-gradient-hover-style",
				        styleClass: "btnsx-btn:hover"
					});
                });
		    },
		    copyGradientNormal: function(e){
		    	$('#btnsx_opt_gradient_type_normal_copy_btn').btnsxCopy();
		    	this.triggerGradient();
		    },
		    copyGradientHover: function(e){
		    	$('#btnsx_opt_gradient_type_hover_copy_btn').btnsxCopy();
		    	this.triggerGradient();
		    }
		});
		var btnGradientView = new BtnGradientView();

		$(document).on('click','button[id^=btnsx_opt_gradient_stop]',function(e){
			if( $(this).data('highlight') != undefined){
				$(this).btnsxCopy();
				$(e.target).gradientStop({
			        multipleCount: $( ".btnsx_gradient_stop_normal" ).length,
		        	styleID: "btnsx-gradient-normal-style"
				});
				$(e.target).gradientStop({
			        color: 'input[name="btnsx_opt_gradient_stop_hover_color[]"]',
					location: "input[name='btnsx_opt_gradient_stop_hover_location[]']",
			        multipleCount: $( ".btnsx_gradient_stop_hover" ).length,
			        styleID: "btnsx-gradient-hover-style",
			        styleClass: "btnsx-btn:hover"
				});
			}
		});

	});

})(jQuery);
/**
 * Buttons X - Icon View
 * 
 * Copyright 2015, Gautam Thapar
 * http://www.gautamthapar.me
 */

(function($){

	jQuery.fn.extend({
	    animation: function () {
	        var btnId = jQuery( this );
	        var btnIconClass = '.btnsx-icon-show';
	        var animationType = jQuery( '#btnsx_opt_icon_animation_type' ).val();
	        btnId.find( btnIconClass ).addClass( 'btnsx-animation-' + animationType + ' btnsx-animated' );
	        btnId.bind( 'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function () {
	        	btnId.find( btnIconClass ).attr( 'class', function (i, c) {
	            	return c.replace( 'btnsx-animation-' + animationType + ' btnsx-animated', '');
	        	});
	    	});
	    }
	});

	$(document).ready(function(){

		// click animation
    	$( '#btnsx-preview-btn' ).on( 'click', function(e){
    		e.preventDefault();
    		var animation = $( '#btnsx_opt_icon_animation' ).val();
    		if( animation != 'click' )
    			return;
    		var animationType = $( '#btnsx_opt_icon_animation_type' ).val();
	        if( animationType != null ){
	            $( this ).animation();
	        }
    	});

    	// hover animation
    	$( '#btnsx-preview-btn' ).on( 'mouseenter mouseleave', function(e){
    		e.preventDefault();
    		var animation = $( '#btnsx_opt_icon_animation' ).val();
    		if( animation != 'hover' )
    			return;
    		var animationType = $( '#btnsx_opt_icon_animation_type' ).val();
	        if( animationType != null ){
	            $( this ).animation();
	        }
    	});

		// render basic button view
		var BtnIconView = Backbone.View.extend({
		    
		    el: $('#poststuff'),

		    events: {
				// icon
					// icon
				    'change #btnsx_opt_icon': 'changeIcon',
				    // size
				    'propertychange #btnsx_opt_icon_size': 'changeIconSize',
				    'keyup #btnsx_opt_icon_size': 'changeIconSize',
				    'input #btnsx_opt_icon_size': 'changeIconSize',
				    // icon alignment
				    'change #btnsx_opt_icon_alignment': 'changeIconAlignment',
				    // vertical alignment
				    'propertychange #btnsx_opt_icon_vertical_position': 'changeIconVerticalPosition',
				    'keyup #btnsx_opt_icon_vertical_position': 'changeIconVerticalPosition',
				    'input #btnsx_opt_icon_vertical_position': 'changeIconVerticalPosition',
				    // COLOR
				    // Hover Color
				    'mouseenter .btnsx-btn': 'changeIconColorHover',
				    'mouseleave .btnsx-btn': 'changeIconColorNormal',
				    // IMAGE
				    'propertychange #btnsx_opt_icon_image': 'changeIconImage',
				    'keyup #btnsx_opt_icon_image': 'changeIconImage',
				    'input #btnsx_opt_icon_image': 'changeIconImage',
				    // 'propertychange #btnsx_opt_icon_image_hover': 'changeIconImageAlt',
				    // 'keyup #btnsx_opt_icon_image_hover': 'changeIconImageAlt',
				    // 'input #btnsx_opt_icon_image_hover': 'changeIconImageAlt',
				    'mouseenter #btnsx-preview-btn': 'changeIconImageHover',
				    'mouseleave #btnsx-preview-btn': 'changeIconImageNormal',
				    // SHADOW
				    // horizontal
				    'propertychange #btnsx_opt_icon_shadow_horizontal': 'changeIconShadow',
				    'keyup #btnsx_opt_icon_shadow_horizontal': 'changeIconShadow',
				    'input #btnsx_opt_icon_shadow_horizontal': 'changeIconShadow',
				    // vertical
				    'propertychange #btnsx_opt_icon_shadow_vertical': 'changeIconShadow',
				    'keyup #btnsx_opt_icon_shadow_vertical': 'changeIconShadow',
				    'input #btnsx_opt_icon_shadow_vertical': 'changeIconShadow',
				    // blur
				    'propertychange #btnsx_opt_icon_shadow_blur': 'changeIconShadow',
				    'keyup #btnsx_opt_icon_shadow_blur': 'changeIconShadow',
				    'input #btnsx_opt_icon_shadow_blur': 'changeIconShadow',
				    // color
				    'propertychange #btnsx_opt_icon_shadow_color': 'changeIconShadow',
				    'keyup #btnsx_opt_icon_shadow_color': 'changeIconShadow',
				    'input #btnsx_opt_icon_shadow_color': 'changeIconShadow',
				    // DIVIDER
				    // position
				    'propertychange #btnsx_opt_icon_divider_position': 'changeIconDivider',
				    'keyup #btnsx_opt_icon_divider_position': 'changeIconDivider',
				    'input #btnsx_opt_icon_divider_position': 'changeIconDivider',
				    // size
				    'propertychange #btnsx_opt_icon_divider_size': 'changeIconDivider',
				    'keyup #btnsx_opt_icon_divider_size': 'changeIconDivider',
				    'input #btnsx_opt_icon_divider_size': 'changeIconDivider',
				    // color
				    'propertychange #btnsx_opt_icon_divider_color': 'changeIconDivider',
				    'keyup #btnsx_opt_icon_divider_color': 'changeIconDivider',
				    'input #btnsx_opt_icon_divider_color': 'changeIconDivider',
				    // Animation
				    // type
				    'change #btnsx_opt_icon_animation_type': 'changeIconAnimationType',
				    // PADDING
				    // padding top
				    'propertychange #btnsx_opt_icon_padding_top': 'changeIconPaddingTop',
				    'keyup #btnsx_opt_icon_padding_top': 'changeIconPaddingTop',
				    'input #btnsx_opt_icon_padding_top': 'changeIconPaddingTop',
				    // padding bottom
				    'propertychange #btnsx_opt_icon_padding_bottom': 'changeIconPaddingBottom',
				    'keyup #btnsx_opt_icon_padding_bottom': 'changeIconPaddingBottom',
				    'input #btnsx_opt_icon_padding_bottom': 'changeIconPaddingBottom',
				    // padding left
				    'propertychange #btnsx_opt_icon_padding_left': 'changeIconPaddingLeft',
				    'keyup #btnsx_opt_icon_padding_left': 'changeIconPaddingLeft',
				    'input #btnsx_opt_icon_padding_left': 'changeIconPaddingLeft',
				    // padding right
				    'propertychange #btnsx_opt_icon_padding_right': 'changeIconPaddingRight',
				    'keyup #btnsx_opt_icon_padding_right': 'changeIconPaddingRight',
				    'input #btnsx_opt_icon_padding_right': 'changeIconPaddingRight',
				    // IMAGE POSITION
				    // position
				    'change #btnsx_opt_icon_image_position_enable': 'changeIconImagePosition',
				    // top
				    'propertychange #btnsx_opt_icon_image_position_top': 'changeIconImagePositionTop',
				    'keyup #btnsx_opt_icon_image_position_top': 'changeIconImagePositionTop',
				    'input #btnsx_opt_icon_image_position_top': 'changeIconImagePositionTop',
				    // padding bottom
				    'propertychange #btnsx_opt_icon_image_position_bottom': 'changeIconImagePositionBottom',
				    'keyup #btnsx_opt_icon_image_position_bottom': 'changeIconImagePositionBottom',
				    'input #btnsx_opt_icon_image_position_bottom': 'changeIconImagePositionBottom',
				    // padding left
				    'propertychange #btnsx_opt_icon_image_position_left': 'changeIconImagePositionLeft',
				    'keyup #btnsx_opt_icon_image_position_left': 'changeIconImagePositionLeft',
				    'input #btnsx_opt_icon_image_position_left': 'changeIconImagePositionLeft',
				    // padding right
				    'propertychange #btnsx_opt_icon_image_position_right': 'changeIconImagePositionRight',
				    'keyup #btnsx_opt_icon_image_position_right': 'changeIconImagePositionRight',
				    'input #btnsx_opt_icon_image_position_right': 'changeIconImagePositionRight',

				    // All padding
				   	'propertychange #btnsx_opt_icon_padding_all': 'changeAllPadding',
				    'keyup #btnsx_opt_icon_padding_all': 'changeAllPadding',
				    'input #btnsx_opt_icon_padding_all': 'changeAllPadding',

				    // Copy
				    'click #btnsx_opt_icon_color_normal_copy_btn': 'copyIconColorNormal',
				    'click #btnsx_opt_icon_color_hover_copy_btn': 'copyIconColorHover',
				    'click #btnsx_opt_icon_image_copy_btn': 'copyIconImageNormal',
				    'click #btnsx_opt_icon_image_hover_copy_btn': 'copyIconImageHover',

				    // All
				    'propertychange #btnsx_opt_icon_image_position_all': 'changeIconImagePositionAll',
				    'keyup #btnsx_opt_icon_image_position_all': 'changeIconImagePositionAll',
				    'input #btnsx_opt_icon_image_position_all': 'changeIconImagePositionAll',

		    },

		    initialize: function(){

			    _.bindAll( this, 'render', 'changeIcon', 'changeIconSize', 'changeIconAlignment', 'changeIconVerticalPosition', 'changeIconColorNormal', 'changeIconColorHover', 'changeIconImage', 'changeIconImageNormal', 'changeIconImageHover', 'changeIconShadow', 'changeIconPaddingTop', 'changeIconPaddingBottom', 'changeIconPaddingLeft', 'changeIconPaddingRight', 'changeIconDivider', 'changeIconAnimationType', 'changeIconImagePosition', 'changeIconImagePositionTop', 'changeIconImagePositionBottom', 'changeIconImagePositionLeft', 'changeIconImagePositionRight' ); // every function that uses 'this' as the current object should be in here

			    // ASSIGN VARIABLES

			    // icon
			    	this.btnIcon = $('#btnsx_opt_icon');
			    	this.btnIconValue = $('#btnsx_opt_icon').val();
			    	this.btnIconSize = $('#btnsx_opt_icon_size');
			    	this.btnIconSizeValue = $('#btnsx_opt_icon_size').val();
			    	this.btnIconAlignment = $('#btnsx_opt_icon_alignment');
			    	this.btnIconAlignmentValue = $('#btnsx_opt_icon_alignment').val();
			    	this.btnIconVerticalPosition = $('#btnsx_opt_icon_vertical_position');
			    	this.btnIconVerticalPositionValue = $('#btnsx_opt_icon_vertical_position').val();
			    // color
			    	this.btnIconColorNormal = $('#btnsx_opt_icon_color_normal');
			    	this.btnIconColorNormalValue = $('#btnsx_opt_icon_color_normal').val();
			    	this.btnIconColorHover = $('#btnsx_opt_icon_color_hover');
			    // image
			    	this.btnIconImage = $('#btnsx_opt_icon_image');
			    	this.btnIconImageValue = $('#btnsx_opt_icon_image').val();
			    	this.btnIconImageHover = $('#btnsx_opt_icon_image_hover');
			    	this.btnIconImageHoverValue = $('#btnsx_opt_icon_image_hover').val();
			    	this.btnIconImagePositionTab = $('#btnsx-icon-image-position-tab');
			    	this.btnIconImagePosition = $('#btnsx_opt_icon_image_position_enable');
			    	this.btnIconImagePositionValue = $('#btnsx_opt_icon_image_position_enable').val();
			    	this.btnIconImagePositionTop = $('#btnsx_opt_icon_image_position_top');
			    	this.btnIconImagePositionTopValue = $('#btnsx_opt_icon_image_position_top').val();
			    	this.btnIconImagePositionBottom = $('#btnsx_opt_icon_image_position_bottom');
			    	this.btnIconImagePositionBottomValue = $('#btnsx_opt_icon_image_position_bottom').val();
			    	this.btnIconImagePositionLeft = $('#btnsx_opt_icon_image_position_left');
			    	this.btnIconImagePositionLeftValue = $('#btnsx_opt_icon_image_position_left').val();
			    	this.btnIconImagePositionRight = $('#btnsx_opt_icon_image_position_right');
			    	this.btnIconImagePositionRightValue = $('#btnsx_opt_icon_image_position_right').val();
			    // shadow
			    	this.btnIconShadowHorizontal = $('#btnsx_opt_icon_shadow_horizontal');
			    	this.btnIconShadowHorizontalValue = $('#btnsx_opt_icon_shadow_horizontal').val();
			    	this.btnIconShadowVertical = $('#btnsx_opt_icon_shadow_vertical');
			    	this.btnIconShadowVerticalValue = $('#btnsx_opt_icon_shadow_vertical').val();
			    	this.btnIconShadowBlur = $('#btnsx_opt_icon_shadow_blur');
			    	this.btnIconShadowBlurValue = $('#btnsx_opt_icon_shadow_blur').val();
			    	this.btnIconShadowColor = $('#btnsx_opt_icon_shadow_color');
			    	this.btnIconShadowColorValue = $('#btnsx_opt_icon_shadow_color').val();
			    // divider
			    	this.btnIconDividerPosition = $('#btnsx_opt_icon_divider_position');
			    	this.btnIconDividerPositionValue = $('#btnsx_opt_icon_divider_position').val();
			    	this.btnIconDividerSize = $('#btnsx_opt_icon_divider_size');
			    	this.btnIconDividerSizeValue = $('#btnsx_opt_icon_divider_size').val();
			    	this.btnIconDividerColor = $('#btnsx_opt_icon_divider_color');
			    	this.btnIconDividerColorValue = $('#btnsx_opt_icon_divider_color').val();
			    // animation
			    	this.btnIconAnimation = $('#btnsx_opt_icon_animation');
			    	this.btnIconAnimationValue = $('#btnsx_opt_icon_animation').val();
			    	this.btnIconAnimationType = $('#btnsx_opt_icon_animation_type');
			    	this.btnIconAnimationTypeValue = $('#btnsx_opt_icon_animation_type').val();
			    // padding
			    	this.btnIconPaddingTop = $('#btnsx_opt_icon_padding_top');
			    	this.btnIconPaddingTopValue = this.btnIconPaddingTop.val();
			    	this.btnIconPaddingBottom = $('#btnsx_opt_icon_padding_bottom');
			    	this.btnIconPaddingBottomValue = this.btnIconPaddingBottom.val();
			    	this.btnIconPaddingLeft = $('#btnsx_opt_icon_padding_left');
			    	this.btnIconPaddingLeftValue = this.btnIconPaddingLeft.val();
			    	this.btnIconPaddingRight = $('#btnsx_opt_icon_padding_right');
			    	this.btnIconPaddingRightValue = this.btnIconPaddingRight.val();


			    this.render();

		    },

		    render: function(){

		    	// preview
			    	this.btnPreview = $('#btnsx-preview-btn');
			    	this.btnPreviewIcon = $('.btnsx-btn-icon');
			    	this.btnPreviewIconImage = $('.btnsx-btn-icon-img');
			    	this.btnPreviewDivider = $('#btnsx-btn-divider');
			    	this.btnPreviewText = $('#btnsx-btn-text');

				// Icon
					// set icon
					if( this.btnIconValue != null ) {
						this.btnPreviewIcon.addClass(this.btnIconValue);
						this.btnPreviewIcon.removeClass('btnsx-icon-hide').addClass('btnsx-icon-show');
					}
					// set icon size
					this.btnPreviewIcon.css({
			    		'font-size':this.btnIconSizeValue + 'px',
						'line-height':this.btnIconSizeValue + 'px'
			    	});
			    	// set icon alignment
			    	if( this.btnIconAlignmentValue == 'extreme_left' || this.btnIconAlignmentValue == 'extreme_right' ){
			    		var align = this.btnIconAlignmentValue.replace('extreme_','');
			    		this.btnPreviewIcon.removeClass('pull-left pull-right').addClass('pull-'+align);
			    		$('.btnsx-icon-prev').removeClass('btnsx-icon-show').addClass('btnsx-icon-show');
			    		$('.btnsx-icon-next').removeClass('btnsx-icon-hide').addClass('btnsx-icon-hide');
			    	}
			    	if( this.btnIconAlignmentValue == 'none' || this.btnIconAlignmentValue == 'left' || this.btnIconAlignmentValue == null ){
			    		this.btnPreviewIcon.removeClass('pull-left pull-right');
			    		$('.btnsx-icon-prev').removeClass('btnsx-icon-hide').addClass('btnsx-icon-show');
			    		$('.btnsx-icon-next').removeClass('btnsx-icon-show').addClass('btnsx-icon-hide');
			    	}
			    	if( this.btnIconAlignmentValue == 'right' ){
			    		$('.btnsx-icon-prev').removeClass('btnsx-icon-show').addClass('btnsx-icon-hide');
			    		$('.btnsx-icon-next').removeClass('btnsx-icon-hide').addClass('btnsx-icon-show');
			    	}
			    	// set icon vertical position
			    	this.btnPreviewIcon.css('line-height',this.btnIconVerticalPositionValue + 'px');
				// COLOR
					// change icon color when value changes
					this.btnPreviewIcon.css( 'color', this.btnIconColorNormalValue );
					this.btnIconColorNormal.btnsxRGBA({
						targetElement: this.btnPreviewIcon,
						css: 'color'
					});
					this.btnIconColorHover.btnsxRGBA();
				// IMAGE
					if( this.btnIconImageValue != '' ) {
						this.btnPreviewIcon.append('<img id="btnsx-btn-icon-img" class="btnsx-btn-icon-img" src="' + this.btnIconImageValue + '">');
						if( $('#btnsx_opt_icon_alignment').val() == 'right' ){
				    		var previewIcon = $('.btnsx-icon-next');
				    	} else {
							var previewIcon = $('.btnsx-icon-prev');
				    	}
				    	previewIcon.css('display','initial');
					}
					if( this.btnIconImagePositionValue == '1' ) {
						this.btnIconImagePositionTab.show();
						this.btnPreview.find('.btnsx-btn-icon-img').css('position','absolute');
					}else{
						this.btnIconImagePositionTab.hide();
					}
					// position
					$('.btnsx-btn-icon-img').css('top', this.btnIconImagePositionTopValue + 'px');
					$('.btnsx-btn-icon-img').css('bottom', this.btnIconImagePositionBottomValue + 'px');
					$('.btnsx-btn-icon-img').css('left', this.btnIconImagePositionLeftValue + 'px');
					$('.btnsx-btn-icon-img').css('right', this.btnIconImagePositionRightValue + 'px');
				// SHADOW
					// set icon shadow
					this.btnIconShadowValue = this.btnIconShadowHorizontalValue + 'px ' + this.btnIconShadowVerticalValue + 'px ' + this.btnIconShadowBlurValue + 'px ' + this.btnIconShadowColorValue;
					this.btnIconShadowColor.btnsxRGBA();
					this.btnPreviewIcon.css('text-shadow',this.btnIconShadowValue);
				// DIVIDER
					// set icon divider
					this.btnIconDividerColor.btnsxRGBA({
						targetElement: this.btnPreviewDivider,
						css: 'border-color'
					});
					this.btnPreviewDivider.css({
						'border-left-width': this.btnIconDividerSizeValue + 'px',
						'border-color': this.btnIconDividerColorValue,
						'left':	this.btnIconDividerPositionValue + 'px'
					});
				// ANIMATION
					// this.btnPreviewIcon.addClass('btnsx-animation-' + this.btnIconAnimationTypeValue + ' btnsx-animated');
				// PADDING
					// set icon padding top
					this.btnPreviewIcon.css('padding-top',this.btnIconPaddingTopValue + 'px');
					// set icon padding bottom
					this.btnPreviewIcon.css('padding-bottom',this.btnIconPaddingBottomValue + 'px');
					// set icon padding left
					this.btnPreviewIcon.css('padding-left',this.btnIconPaddingLeftValue + 'px');
					// set icon padding right
					this.btnPreviewIcon.css('padding-right',this.btnIconPaddingRightValue + 'px');

		    },
		    // change icon
		    changeIcon: function(e){
		    	this.btnPreviewIcon.attr('class',
                	function (i, c) {
                    	return c.replace(/\b fa-\S+/g, '');
                });
		    	this.btnPreviewIcon.addClass(e.target.value);
		    	if( e.target.value != '' ){
		    		this.btnPreview.find('img').css('display','none');
		    		this.btnIconImage.val('');
		    	}
		    	if( $('#btnsx_opt_icon_alignment').val() == 'right' ){
		    		var previewIcon = $('.btnsx-icon-next');
		    	} else {
					var previewIcon = $('.btnsx-icon-prev');
		    	}
		    	previewIcon.removeClass('btnsx-icon-hide').addClass('btnsx-icon-show');
		    },
		    // change icon size
		    changeIconSize: function(e){
		    	this.btnPreviewIcon.css({
		    		'font-size':e.target.value + 'px',
					'line-height':e.target.value + 'px'
		    	});
		    },
		    // change icon alignment
		    changeIconAlignment: function(e){
		    	var previewIconPrev = $('.btnsx-icon-prev');
		    	var previewIconNext = $('.btnsx-icon-next');
		    	if( e.target.value == 'right' ){
		    		previewIconPrev.removeClass('btnsx-icon-show').addClass('btnsx-icon-hide');
		    		previewIconNext.removeClass('pull-left pull-right btnsx-icon-hide').addClass('btnsx-icon-show');
		    	}
		    	if( e.target.value == 'none' || e.target.value == 'left' ){
		    		previewIconPrev.removeClass('pull-left pull-right btnsx-icon-hide').addClass('btnsx-icon-show');
		    		previewIconNext.removeClass('btnsx-icon-show').addClass('btnsx-icon-hide');
		    	} else if( e.target.value == 'extreme_left' ) {
		    		previewIconPrev.removeClass('pull-left pull-right btnsx-icon-hide').addClass('pull-left btnsx-icon-show');
		    		previewIconNext.removeClass('btnsx-icon-show').addClass('btnsx-icon-hide');
		    	} else if( e.target.value == 'extreme_right' ) {
		    		previewIconPrev.removeClass('pull-left pull-right btnsx-icon-hide').addClass('pull-right btnsx-icon-show');
		    		previewIconNext.removeClass('btnsx-icon-show').addClass('btnsx-icon-hide');
		    	}
		    },
		    // change icon vertical position
		    changeIconVerticalPosition: function(e){
		    	this.btnPreviewIcon.css('line-height',e.target.value + 'px');
		    },
		    // change button secondary text color hover
		    changeIconColorHover: function(e){
		    	this.btnIconColorHoverValue = this.btnIconColorHover.val();
		    	this.btnPreviewIcon.css( 'color', this.btnIconColorHoverValue );
		    },
		    // change button secondary text color normal
		    changeIconColorNormal: function(e){
		    	this.btnIconColorNormalValue = this.btnIconColorNormal.val();
		    	this.btnPreviewIcon.css( 'color', this.btnIconColorNormalValue );
		    },
		    // change icon
		    changeIconImage: function(e){
		    	this.btnPreviewIcon.find('#btnsx-btn-icon-img').remove();
		    	var previewIcon = $('.btnsx-btn-icon');
		    	if( e.target.value != '' ) {
			    	previewIcon.append('<img id="btnsx-btn-icon-img" class="btnsx-btn-icon-img" src="' + e.target.value + '">');
		    	}
		    	$('#btnsx_opt_icon').select2('val','');
		    	this.btnPreviewIconImage.css('display','initial');
		    	if( $('#btnsx_opt_icon_alignment').val() == 'right' ){
		    		previewIcon = $('.btnsx-icon-next');
		    	} else {
					previewIcon = $('.btnsx-icon-prev');
		    	}
		    	previewIcon.removeClass('btnsx-icon-hide').addClass('btnsx-icon-show');
		    },
		    changeIconImageAlt: function(e){
		    	this.btnPreviewIcon.find('#btnsx-btn-icon-img').remove();
		    	if( e.target.value != '' ) {
			    	if( $('#btnsx_opt_icon_alignment').val() == 'right' ){
			    		var previewIcon = $('.btnsx-icon-next');
			    	} else {
						var previewIcon = $('.btnsx-icon-prev');
			    	}
			    	previewIcon.append('<img id="btnsx-btn-icon-img" class="btnsx-btn-icon-img" src="' + e.target.value + '">');
		    	}
		    },
		    changeIconImageNormal: function(e){
		    	var previewIcon = $('.btnsx-btn-icon');
		    	var val = this.btnIconImage.val();
		    	if( val != '' ) {
		    		previewIcon.find('#btnsx-btn-icon-img').attr('src',val);
		    	}
		    	this.btnPreviewIconImage.css('display','initial');
		    	if( $('#btnsx_opt_icon_alignment').val() == 'right' ){
		    		previewIcon = $('.btnsx-icon-next');
		    	} else {
					previewIcon = $('.btnsx-icon-prev');
		    	}
		    	previewIcon.removeClass('btnsx-icon-hide').addClass('btnsx-icon-show');
		    },
		    changeIconImageHover: function(e){
		    	var previewIcon = $('.btnsx-btn-icon');
		    	var val = this.btnIconImageHover.val();
		    	if( val != '' ) {
		    		previewIcon.find('#btnsx-btn-icon-img').attr('src',val);
		    	}
		    	this.btnPreviewIconImage.css('display','initial');
		    	if( $('#btnsx_opt_icon_alignment').val() == 'right' ){
		    		previewIcon = $('.btnsx-icon-next');
		    	} else {
					previewIcon = $('.btnsx-icon-prev');
		    	}
		    	previewIcon.removeClass('btnsx-icon-hide').addClass('btnsx-icon-show');
		    },
		    // change button secondary text shadow
		    changeIconShadow: function(e){
		    	this.btnIconShadowHorizontalValue = ( this.btnIconShadowHorizontal.val() != '' ) ? this.btnIconShadowHorizontal.val() : '1';
		    	this.btnIconShadowVerticalValue = ( this.btnIconShadowVertical.val() != '' ) ? this.btnIconShadowVertical.val() : '1';
		    	this.btnIconShadowBlurValue = ( this.btnIconShadowBlur.val() != '' ) ? this.btnIconShadowBlur.val() : '1';
		    	this.btnIconShadowColorValue = ( this.btnIconShadowColor.val() != '' ) ? this.btnIconShadowColor.val() : '#000';
		    	this.btnIconShadowValue = this.btnIconShadowHorizontalValue + 'px ' + this.btnIconShadowVerticalValue + 'px ' + this.btnIconShadowBlurValue + 'px ' + this.btnIconShadowColorValue;
		    	this.btnPreviewIcon.css('text-shadow',this.btnIconShadowValue);
		    },
		    changeIconDivider:  function(e){
		    	this.btnIconDividerPositionValue = this.btnIconDividerPosition.val();
		    	this.btnIconDividerSizeValue = this.btnIconDividerSize.val();
		    	this.btnIconDividerColorValue = ( this.btnIconDividerColor.val() != '' ) ? this.btnIconDividerColor.val() : '#000';
				this.btnPreviewDivider.css({
					'border-left-width': this.btnIconDividerSizeValue + 'px',
					'border-color': this.btnIconDividerColorValue,
					'left':	this.btnIconDividerPositionValue + 'px'
				});
		    },
		    // change icon padding top
		    changeIconPaddingTop: function(e){
		    	this.btnPreviewIcon.css( 'padding-top', e.target.value + 'px' );
		    },
		    // change icon padding bottom
		    changeIconPaddingBottom: function(e){
		    	this.btnPreviewIcon.css( 'padding-bottom', e.target.value + 'px' );
		    },
		    // change icon padding left
		    changeIconPaddingLeft: function(e){
		    	this.btnPreviewIcon.css( 'padding-left', e.target.value + 'px' );
		    },
		    // change icon padding right
		    changeIconPaddingRight: function(e){
		    	this.btnPreviewIcon.css( 'padding-right', e.target.value + 'px' );
		    },
		    // change icon animation type
		    changeIconAnimationType: function(e){
		    	this.btnPreviewIcon.removeClass(function (index, css) {
				    return (css.match(/(^|\s)btnsx-animation-\S+/g) || []).join(' ');
				});
				this.btnPreviewIcon.removeClass('btnsx-animated');
				this.btnPreviewIcon.addClass('btnsx-animation-' + e.target.value + ' btnsx-animated');
		    },
		    // change icon image position
		    changeIconImagePosition: function(e){
		    	if( e.target.value == '1' ) {
		    		this.btnIconImagePositionTab.fadeIn();
		    		this.btnPreview.find('img').css('position','absolute');
		    	} else {
		    		this.btnIconImagePositionTab.hide();
		    		this.btnPreview.find('img').css('position','initial');
		    	}
		    },
		    changeIconImagePositionTop: function(e){
		    	this.btnPreview.find('img').css('top', e.target.value + 'px');
		    	if( e.target.value == '' ){
		    		this.btnPreview.find('img').css('top', '');
		    	}
		    },
		    changeIconImagePositionBottom: function(e){
		    	this.btnPreview.find('img').css('bottom', e.target.value + 'px');
		    	if( e.target.value == '' ){
		    		this.btnPreview.find('img').css('bottom', '');
		    	}
		    },
		    changeIconImagePositionLeft: function(e){
		    	this.btnPreview.find('img').css('left', e.target.value + 'px');
		    	if( e.target.value == '' ){
		    		this.btnPreview.find('img').css('left', '');
		    	}
		    },
		    changeIconImagePositionRight: function(e){
		    	this.btnPreview.find('img').css('right', e.target.value + 'px');
		    	if( e.target.value == '' ){
		    		this.btnPreview.find('img').css('right', '');
		    	}
		    },
		    changeAllPadding: function(e){
		    	$('#btnsx_opt_icon_padding_top').val(e.target.value);
		    	$('#btnsx_opt_icon_padding_bottom').val(e.target.value);
		    	$('#btnsx_opt_icon_padding_right').val(e.target.value);
		    	$('#btnsx_opt_icon_padding_left').val(e.target.value);
		    	this.changeIconPaddingTop(e);
		    	this.changeIconPaddingBottom(e);
		    	this.changeIconPaddingLeft(e);
		    	this.changeIconPaddingRight(e);
		    },
		    copyIconColorNormal: function(e){
		    	$('#btnsx_opt_icon_color_normal_copy_btn').btnsxCopy();
		    },
		    copyIconColorHover: function(e){
		    	$('#btnsx_opt_icon_color_hover_copy_btn').btnsxCopy();
		    },
		    copyIconImageNormal: function(e){
		    	$('#btnsx_opt_icon_image_copy_btn').btnsxCopy();
		    	this.changeIconImageHover();
		    },
		    copyIconImageHover: function(e){
		    	$('#btnsx_opt_icon_image_hover_copy_btn').btnsxCopy();
		    	this.changeIconImageNormal();
		    },
		    changeIconImagePositionAll: function(e){
		    	var val = e.target.value;
		    	$('#btnsx_opt_icon_image_position_top').val(val);
		    	this.changeIconImagePositionTop(e);
		    	$('#btnsx_opt_icon_image_position_bottom').val(val);
		    	this.changeIconImagePositionBottom(e);
		    	$('#btnsx_opt_icon_image_position_right').val(val);
		    	this.changeIconImagePositionRight(e);
		    	$('#btnsx_opt_icon_image_position_left').val(val);
		    	this.changeIconImagePositionLeft(e);
		    }
		});

		var btnIconView = new BtnIconView();
	
	});

})(jQuery);
/**
 * Buttons X - Primary Text View
 * 
 * Copyright 2015, Gautam Thapar
 * http://www.gautamthapar.me
 */

(function($){

	$(document).ready(function(){

		// render basic button view
		var BtnPrimaryTextView = Backbone.View.extend({
		    
		    el: $('#poststuff'),

		    events: {
				// primary text
					// text
				    'propertychange #btnsx_opt_text': 'changeText',
				    'keyup #btnsx_opt_text': 'changeText',
				    'input #btnsx_opt_text': 'changeText',
				    // text transform
				    'change #btnsx_opt_text_transform': 'changeTextTransform',
				    // text alignment
				    'change #btnsx_opt_text_alignment': 'changeTextAlignment',
				    // FONT
				    // font size
				    'propertychange #btnsx_opt_text_font_size': 'changeTextFontSize',
				    'keyup #btnsx_opt_text_font_size': 'changeTextFontSize',
				    'input #btnsx_opt_text_font_size': 'changeTextFontSize',
				    // font style
				    'change #btnsx_opt_text_font_style': 'changeTextFontStyle',
				    // font weight
				    'change #btnsx_opt_text_font_weight': 'changeTextFontWeight',
				    // font family
				    'change #btnsx_opt_text_font_family': 'changeTextFontFamily',
				    // COLOR
				    'mouseenter #btnsx-preview-btn': 'changeTextColorHover',
				    'mouseleave #btnsx-preview-btn': 'changeTextColorNormal',
				    // SHADOW
				    // horizontal
				    'propertychange #btnsx_opt_text_shadow_horizontal': 'changeTextShadow',
				    'keyup #btnsx_opt_text_shadow_horizontal': 'changeTextShadow',
				    'input #btnsx_opt_text_shadow_horizontal': 'changeTextShadow',
				    // vertical
				    'propertychange #btnsx_opt_text_shadow_vertical': 'changeTextShadow',
				    'keyup #btnsx_opt_text_shadow_vertical': 'changeTextShadow',
				    'input #btnsx_opt_text_shadow_vertical': 'changeTextShadow',
				    // blur
				    'propertychange #btnsx_opt_text_shadow_blur': 'changeTextShadow',
				    'keyup #btnsx_opt_text_shadow_blur': 'changeTextShadow',
				    'input #btnsx_opt_text_shadow_blur': 'changeTextShadow',
				    // color
				    'propertychange #btnsx_opt_text_shadow_color': 'changeTextShadow',
				    'keyup #btnsx_opt_text_shadow_color': 'changeTextShadow',
				    'input #btnsx_opt_text_shadow_color': 'changeTextShadow',
				    // PADDING
				    // padding top
				    'propertychange #btnsx_opt_text_padding_top': 'changeTextPaddingTop',
				    'keyup #btnsx_opt_text_padding_top': 'changeTextPaddingTop',
				    'input #btnsx_opt_text_padding_top': 'changeTextPaddingTop',
				    // padding bottom
				    'propertychange #btnsx_opt_text_padding_bottom': 'changeTextPaddingBottom',
				    'keyup #btnsx_opt_text_padding_bottom': 'changeTextPaddingBottom',
				    'input #btnsx_opt_text_padding_bottom': 'changeTextPaddingBottom',
				    // padding left
				    'propertychange #btnsx_opt_text_padding_left': 'changeTextPaddingLeft',
				    'keyup #btnsx_opt_text_padding_left': 'changeTextPaddingLeft',
				    'input #btnsx_opt_text_padding_left': 'changeTextPaddingLeft',
				    // padding right
				    'propertychange #btnsx_opt_text_padding_right': 'changeTextPaddingRight',
				    'keyup #btnsx_opt_text_padding_right': 'changeTextPaddingRight',
				    'input #btnsx_opt_text_padding_right': 'changeTextPaddingRight',
				    // copy
			    	'click #btnsx_opt_text_color_normal_copy_btn': 'copyColorNormal',
			    	'click #btnsx_opt_text_color_hover_copy_btn': 'copyColorHover',
			    	// padding all
				    'propertychange #btnsx_opt_text_padding_all': 'changeTextPaddingAll',
				    'keyup #btnsx_opt_text_padding_all': 'changeTextPaddingAll',
				    'input #btnsx_opt_text_padding_all': 'changeTextPaddingAll',

		    },

		    initialize: function(){

			    _.bindAll( this, 'render', 'changeText', 'changeTextTransform', 'changeTextAlignment', 'changeTextFontSize', 'changeTextFontStyle', 'changeTextFontWeight', 'changeTextFontFamily', 'changeTextPaddingTop', 'changeTextPaddingBottom', 'changeTextPaddingLeft', 'changeTextPaddingRight', 'changeTextColorHover', 'changeTextColorNormal', 'changeTextShadow' ); // every function that uses 'this' as the current object should be in here

			    // ASSIGN VARIABLES
			    
			    // preview
			    	this.btnPreviewBackground = $('#btnsx_opt_preview_background');
			    	this.btnPreviewContainer = $('#btnsx-preview .inside');
			    	this.btnPreviewLoader = $('#btnsx-preview-loader');
			    	this.btnContainer = $('#btnsx-preview-container');
			    	this.btnPreviewBackgroundValue = $('#btnsx_opt_preview_background').val();

			    // primary text
			    	this.btnText = $('#btnsx_opt_text');
			    	this.btnTextValue = $('#btnsx_opt_text').val();
			    	this.btnTextTransform = $('#btnsx_opt_text_transform');
			    	this.btnTextTransformValue = $('#btnsx_opt_text_transform').val();
			    	this.btnTextAlignment = $('#btnsx_opt_text_alignment');
			    	this.btnTextAlignmentValue = $('#btnsx_opt_text_alignment').val();
			    	// font
			    	this.btnTextFontSize = $('#btnsx_opt_text_font_size');
			    	this.btnTextFontSizeValue = $('#btnsx_opt_text_font_size').val();
			    	this.btnTextFontStyle = $('#btnsx_opt_text_font_style');
			    	this.btnTextFontStyleValue = $('#btnsx_opt_text_font_style').val();
			    	this.btnTextFontWeight = $('#btnsx_opt_text_font_weight');
			    	this.btnTextFontWeightValue = $('#btnsx_opt_text_font_weight').val();
			    	this.btnTextFontFamily = $('#btnsx_opt_text_font_family');
			    	this.btnTextFontFamilyValue = $('#btnsx_opt_text_font_family').val();
			    	// color
			    	this.btnTextColorNormal = $('#btnsx_opt_text_color_normal');
			    	this.btnTextColorNormalValue = $('#btnsx_opt_text_color_normal').val();
			    	this.btnTextColorHover = $('#btnsx_opt_text_color_hover');
			    	// shadow
			    	this.btnTextShadowHorizontal = $('#btnsx_opt_text_shadow_horizontal');
			    	this.btnTextShadowHorizontalValue = $('#btnsx_opt_text_shadow_horizontal').val();
			    	this.btnTextShadowVertical = $('#btnsx_opt_text_shadow_vertical');
			    	this.btnTextShadowVerticalValue = $('#btnsx_opt_text_shadow_vertical').val();
			    	this.btnTextShadowBlur = $('#btnsx_opt_text_shadow_blur');
			    	this.btnTextShadowBlurValue = $('#btnsx_opt_text_shadow_blur').val();
			    	this.btnTextShadowColor = $('#btnsx_opt_text_shadow_color');
			    	this.btnTextShadowColorValue = $('#btnsx_opt_text_shadow_color').val();
			    	// padding
			    	this.btnTextPaddingTop = $('#btnsx_opt_text_padding_top');
			    	this.btnTextPaddingTopValue = this.btnTextPaddingTop.val();
			    	this.btnTextPaddingBottom = $('#btnsx_opt_text_padding_bottom');
			    	this.btnTextPaddingBottomValue = this.btnTextPaddingBottom.val();
			    	this.btnTextPaddingLeft = $('#btnsx_opt_text_padding_left');
			    	this.btnTextPaddingLeftValue = this.btnTextPaddingLeft.val();
			    	this.btnTextPaddingRight = $('#btnsx_opt_text_padding_right');
			    	this.btnTextPaddingRightValue = this.btnTextPaddingRight.val();

			    this.render();

		    },

		    render: function(){

		    	// preview
			    	this.btnPreview = $('#btnsx-preview-btn');
			    	this.btnPreviewTextPrimary = $('#btnsx-btn-text');
				// primary
					// set button text
					this.btnPreviewTextPrimary.text(this.btnTextValue);
					if( this.btnTextValue == '' ){
						this.btnPreviewTextPrimary.hide();
					}
					// set button text transform
					this.btnPreviewTextPrimary.css('text-transform',this.btnTextTransformValue);
					// set button text alignment
					this.btnPreview.css('text-align',this.btnTextAlignmentValue);
					// FONT
					// set button text font size
					this.btnPreviewTextPrimary.css({
						'font-size':this.btnTextFontSizeValue + 'px',
						'line-height':this.btnTextFontSizeValue + 'px'
					});
					// set button text font style
					this.btnPreviewTextPrimary.css('font-style',this.btnTextFontStyleValue);
					// set button text font weight
					this.btnPreviewTextPrimary.css('font-weight',this.btnTextFontWeightValue);
					// set button text font family
					var fontFamily = this.btnTextFontFamilyValue;

					$('#btnsx_opt_text_font_weight').select2('val','');
					$('#btnsx_opt_text_font_weight option').prop('disabled','disabled');

					// if( $.inArray(this.btnTextFontFamilyValue, [null, '', 'Inherit', 'Arial', 'Bookman Old Style', 'Comic Sans MS', 'Courier', 'Garamond', 'Georgia', 'Helvetica', 'Impact', 'MS Sans Serif', 'MS Serif', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana']) < 0 ){
						var fwv = this.btnTextFontWeightValue;
						var fsv = this.btnTextFontStyleValue;
			    		$.getJSON( view_translations.google_web_fonts, function( data ) {
							$.each( data, function( key, val ) {
								if( key == 'items' ){
									$.each( val, function( k, v ) {
										if( v.family == fontFamily ){
											$.each( v.variants, function( a, b ) {
												if( b == 'regular' ){
													b = '400';
												}else if( b == 'italic' ){
													b = '400italic';
												}
												$('#btnsx_opt_text_font_weight-option-'+b).removeAttr('disabled');
											});
										}
									});
								}
							});
							$('#btnsx_opt_text_font_weight').select2('val',fwv);
							$('#btnsx_opt_text_font_style').select2('val',fsv);
						});
						
			    		if ($.inArray(this.btnTextFontFamilyValue, [null,'','Inherit', 'Arial', 'Bookman Old Style', 'Comic Sans MS', 'Courier', 'Garamond', 'Georgia', 'Helvetica', 'Impact', 'MS Sans Serif', 'MS Serif', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana']) < 0) {
			    			var $head = $("head");
			    			var fontFamily = $('#btnsx_opt_text_font_family').val();
	                        var weightValue = $('#btnsx_opt_text_font_weight').val();
	                        if( weightValue === undefined || weightValue === null ){
	                        	weightValue = '400';
	                        }
	                        var linkValue = fontFamily + ':' + weightValue;
	                        var $headlinklast = $head.find("link[rel='stylesheet']:last");
	                        var linkElement = "<link rel='stylesheet' type='text/css' id='btnsx-primary-google-webfonts' href='https://fonts.googleapis.com/css?family=" + linkValue + "'>";
	                        if( weightValue != 'default' ){
	                            if ($headlinklast.length) {
	                                $headlinklast.after(linkElement);
	                            }
	                            else {
	                                $head.append(linkElement);
	                            }
	                        }
	                    }
			    		this.btnPreviewTextPrimary.css('font-family',this.btnTextFontFamilyValue);
			    	// }
					// this.btnPreviewTextPrimary.css('font-family',this.btnTextFontFamilyValue);
					// COLOR
					this.btnPreviewTextPrimary.css('color','#'+this.btnTextColorNormalValue);
					// change primary text color when value changes
					this.btnTextColorNormal.btnsxRGBA({
						targetElement: this.btnPreviewTextPrimary,
						css: 'color'
					});
					this.btnTextColorHover.btnsxRGBA();
					// SHADOW
					// set primary text shadow
					var horShadow = this.btnTextShadowHorizontalValue;
					var verShadow = this.btnTextShadowVerticalValue;
					var blurShadow = this.btnTextShadowBlurValue != '' ? this.btnTextShadowBlurValue : '0';
					if( horShadow != '0' || verShadow != '0' ){
						this.btnTextShadowValue = horShadow + 'px ' + verShadow + 'px ' + blurShadow + 'px ' + this.btnTextShadowColorValue;
					}
					this.btnTextShadowColor.btnsxRGBA();
					this.btnPreviewTextPrimary.css('text-shadow',this.btnTextShadowValue);
					// PADDING
					// set button padding top
					this.btnPreviewTextPrimary.css('padding-top',this.btnTextPaddingTopValue + 'px');
					// set button padding bottom
					this.btnPreviewTextPrimary.css('padding-bottom',this.btnTextPaddingBottomValue + 'px');
					// set button padding left
					this.btnPreviewTextPrimary.css('padding-left',this.btnTextPaddingLeftValue + 'px');
					// set button padding right
					this.btnPreviewTextPrimary.css('padding-right',this.btnTextPaddingRightValue + 'px');

		    },
		    // change button primary text
		    changeText: function(e){
		    	this.btnPreviewTextPrimary.text(e.target.value);
		    	if( e.target.value != ''){
		    		this.btnPreviewTextPrimary.css('display','inline-block');
		    	}else{
		    		this.btnPreviewTextPrimary.hide();
		    	}
		    },
		    // change button primary text transform
		    changeTextTransform: function(e){
		    	this.btnPreviewTextPrimary.css('text-transform',e.target.value);
		    },
		    // change button primary text alignment
		    changeTextAlignment: function(e){
		    	this.btnPreview.css('text-align',e.target.value);
		    },
		    // change button primary text font size
		    changeTextFontSize: function(e){
		    	this.btnTextFontSizeValue = $('#btnsx_opt_text_font_size').val();
		    	this.btnPreviewTextPrimary.css({
					'font-size':this.btnTextFontSizeValue + 'px',
					'line-height':this.btnTextFontSizeValue + 'px'
				});
		    },
		    // change button primary text font style
		    changeTextFontStyle: function(e){
		    	this.btnPreviewTextPrimary.css('font-style',e.target.value);
		    },
		    // change button primary text font weight
		    changeTextFontWeight: function(e){
		    	var primaryFontFamily = $('#btnsx-primary-google-webfonts');
		    	if( primaryFontFamily.length > 0 ){
		    		var $head = $("head");
		    		$('#btnsx-primary-google-webfonts').remove();
		    		this.btnTextFontFamilyValue = $('#btnsx_opt_text_font_family').val();
		    		$head.append('<link rel="stylesheet" type="text/css" id="btnsx-primary-google-webfonts" href="https://fonts.googleapis.com/css?family=' + this.btnTextFontFamilyValue + ':' + e.target.value + '">' );
		    	}
		    	this.btnTextFontStyle.select2('val','');
		    	this.btnPreviewTextPrimary.css('font-weight',e.target.value);
		    },
		    // change button primary text font family
		    changeTextFontFamily: function(e){
		    	$('head').find('link#btnsx-primary-google-webfonts').remove();
		    	$('head').find('link#btnsx-primary-google-webfonts').remove();
		    	var fontWeight = $('#btnsx_opt_text_font_weight').val();
		    	// if( $.inArray(e.target.value, ['', 'Inherit', 'Arial', 'Bookman Old Style', 'Comic Sans MS', 'Courier', 'Garamond', 'Georgia', 'Helvetica', 'Impact', 'MS Sans Serif', 'MS Serif', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana']) < 0 ){
		    		$.getJSON( view_translations.google_web_fonts, function( data ) {
						$.each( data, function( key, val ) {
							if( key == 'items' ){
								$('#btnsx_opt_text_font_weight').select2('val','');
								$('#btnsx_opt_text_font_weight option').prop('disabled','disabled');
								$.each( val, function( k, v ) {
									if( v.family == e.target.value ){
										$.each( v.variants, function( a, b ) {
											if( b == 'regular' ){
												b = '400';
											}else if( b == 'italic' ){
												b = '400italic';
											}
											$('#btnsx_opt_text_font_weight-option-'+b).removeAttr('disabled');
										});
									}
								});
								$('#btnsx_opt_text_font_weight').select2();
							}
						});
					});
					
		    		if ($.inArray(e.target.value, [null,'','Inherit', 'Arial', 'Bookman Old Style', 'Comic Sans MS', 'Courier', 'Garamond', 'Georgia', 'Helvetica', 'Impact', 'MS Sans Serif', 'MS Serif', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana']) < 0) {
		    			var $head = $("head");
		    			var fontFamily = $('#btnsx_opt_text_font_family').val();
                        var weightValue = $('#btnsx_opt_text_font_weight').val();
                        if( weightValue === undefined || weightValue === null ){
                        	weightValue = '400';
                        }
                        var linkValue = fontFamily + ':' + weightValue;
                        var $headlinklast = $head.find("link[rel='stylesheet']:last");
                        $('#btnsx-primary-google-webfonts').remove();
                        var linkElement = "<link rel='stylesheet' type='text/css' id='btnsx-primary-google-webfonts' href='https://fonts.googleapis.com/css?family=" + linkValue + "'>";
                        if( weightValue != 'default' ){
                            if ($headlinklast.length) {
                                $headlinklast.after(linkElement);
                            }
                            else {
                                $head.append(linkElement);
                            }
                        }
                    }
		    		this.btnPreviewTextPrimary.css('font-family',e.target.value);
		    	// }
		    },
		    // change button primary text color hover
		    changeTextColorHover: function(e){
		    	this.btnTextColorHoverValue = this.btnTextColorHover.val();
		    	this.btnPreviewTextPrimary.css( 'color', this.btnTextColorHoverValue );
		    },
		    // change button primary text color normal
		    changeTextColorNormal: function(e){
		    	this.btnTextColorNormalValue = this.btnTextColorNormal.val();
		    	this.btnPreviewTextPrimary.css( 'color', this.btnTextColorNormalValue );
		    },
		    // change button primary text shadow
		    changeTextShadow: function(e){
		    	this.btnTextShadowHorizontalValue = this.btnTextShadowHorizontal.val() != '' ? this.btnTextShadowHorizontal.val() : '';
		    	this.btnTextShadowVerticalValue = this.btnTextShadowVertical.val() != '' ? this.btnTextShadowVertical.val() : '';
		    	this.btnTextShadowBlurValue = ( this.btnTextShadowBlur.val() != '' ) ? this.btnTextShadowBlur.val() : '0';
		    	this.btnTextShadowColorValue = ( this.btnTextShadowColor.val() != '' ) ? this.btnTextShadowColor.val() : '#000';
		    	this.btnTextShadowValue = this.btnTextShadowHorizontalValue + 'px ' + this.btnTextShadowVerticalValue + 'px ' + this.btnTextShadowBlurValue + 'px ' + this.btnTextShadowColorValue;
		    	if( this.btnTextShadowHorizontalValue == '0' && this.btnTextShadowVerticalValue == '0' ){
		    		this.btnPreviewTextPrimary.css('text-shadow','');
		    	}else{
		    		this.btnPreviewTextPrimary.css('text-shadow',this.btnTextShadowValue);
		    	}
		    },
		    // change button primary text padding top
		    changeTextPaddingTop: function(e){
		    	this.btnTextPaddingTopValue = $('#btnsx_opt_text_padding_top').val();
		    	this.btnPreviewTextPrimary.css( 'padding-top', this.btnTextPaddingTopValue + 'px' );
		    },
		    // change button primary text padding bottom
		    changeTextPaddingBottom: function(e){
		    	this.btnTextPaddingBottomValue = $('#btnsx_opt_text_padding_bottom').val();
		    	this.btnPreviewTextPrimary.css( 'padding-bottom', this.btnTextPaddingBottomValue + 'px' );
		    },
		    // change button primary text padding left
		    changeTextPaddingLeft: function(e){
		    	this.btnTextPaddingLeftValue = $('#btnsx_opt_text_padding_left').val();
		    	this.btnPreviewTextPrimary.css( 'padding-left', this.btnTextPaddingLeftValue + 'px' );
		    },
		    // change button primary text padding right
		    changeTextPaddingRight: function(e){
		    	this.btnTextPaddingRightValue = $('#btnsx_opt_text_padding_right').val();
		    	this.btnPreviewTextPrimary.css( 'padding-right', this.btnTextPaddingRightValue + 'px' );
		    },
		    copyColorNormal: function(e){
		    	$('#btnsx_opt_text_color_normal_copy_btn').btnsxCopy();
		    },
		    copyColorHover: function(e){
		    	$('#btnsx_opt_text_color_hover_copy_btn').btnsxCopy();
		    },
		    changeTextPaddingAll: function(e){
		    	$('#btnsx_opt_text_padding_top').val(e.target.value);
		    	$('#btnsx_opt_text_padding_bottom').val(e.target.value);
		    	$('#btnsx_opt_text_padding_right').val(e.target.value);
		    	$('#btnsx_opt_text_padding_left').val(e.target.value);
		    	this.changeTextPaddingTop(e);
		    	this.changeTextPaddingBottom(e);
		    	this.changeTextPaddingLeft(e);
		    	this.changeTextPaddingRight(e);
		    },
		    
		});

		var btnPrimaryTextView = new BtnPrimaryTextView();
	
	});

})(jQuery);
/**
 * Buttons X - Responsive Mobile View
 * 
 * Copyright 2016, Gautam Thapar
 * https://www.thewebsitedev.com/
 */

(function($){

	$(document).ready(function(){

		// render basic button view
		var BtnResponsiveMobileView = Backbone.View.extend({
		    
		    el: $('#poststuff'),

		    events: {
				// Layout
					// width
				    'propertychange #btnsx_opt_mobile_width': 'changeWidth',
				    'keyup #btnsx_opt_mobile_width': 'changeWidth',
				    'input #btnsx_opt_mobile_width': 'changeWidth',
				    // height
				    'propertychange #btnsx_opt_mobile_height': 'changeHeight',
				    'keyup #btnsx_opt_mobile_height': 'changeHeight',
				    'input #btnsx_opt_mobile_height': 'changeHeight',
				// Primary Text
					// font size
				    'propertychange #btnsx_opt_mobile_text_font_size': 'changePrimaryFontSize',
				    'keyup #btnsx_opt_mobile_text_font_size': 'changePrimaryFontSize',
				    'input #btnsx_opt_mobile_text_font_size': 'changePrimaryFontSize',
				    // COLOR
				    'mouseenter #btnsx-preview-btn-mobile': 'changePrimaryTextColorHover',
				    'mouseleave #btnsx-preview-btn-mobile': 'changePrimaryTextColorNormal',
				    // Padding All
				    'propertychange #btnsx_opt_mobile_text_padding_all': 'changePrimaryPaddingAll',
				    'keyup #btnsx_opt_mobile_text_padding_all': 'changePrimaryPaddingAll',
				    'input #btnsx_opt_mobile_text_padding_all': 'changePrimaryPaddingAll',
				    // Padding Top
				    'propertychange #btnsx_opt_mobile_text_padding_top': 'changePrimaryPaddingTop',
				    'keyup #btnsx_opt_mobile_text_padding_top': 'changePrimaryPaddingTop',
				    'input #btnsx_opt_mobile_text_padding_top': 'changePrimaryPaddingTop',
				    // Padding Bottom
				    'propertychange #btnsx_opt_mobile_text_padding_bottom': 'changePrimaryPaddingBottom',
				    'keyup #btnsx_opt_mobile_text_padding_bottom': 'changePrimaryPaddingBottom',
				    'input #btnsx_opt_mobile_text_padding_bottom': 'changePrimaryPaddingBottom',
				    // Padding Left
				    'propertychange #btnsx_opt_mobile_text_padding_left': 'changePrimaryPaddingLeft',
				    'keyup #btnsx_opt_mobile_text_padding_left': 'changePrimaryPaddingLeft',
				    'input #btnsx_opt_mobile_text_padding_left': 'changePrimaryPaddingLeft',
				    // Padding Right
				    'propertychange #btnsx_opt_mobile_text_padding_right': 'changePrimaryPaddingRight',
				    'keyup #btnsx_opt_mobile_text_padding_right': 'changePrimaryPaddingRight',
				    'input #btnsx_opt_mobile_text_padding_right': 'changePrimaryPaddingRight',
		    	// Secondary Text
					// font size
				    'propertychange #btnsx_opt_mobile_text_secondary_font_size': 'changeSecondaryFontSize',
				    'keyup #btnsx_opt_mobile_text_secondary_font_size': 'changeSecondaryFontSize',
				    'input #btnsx_opt_mobile_text_secondary_font_size': 'changeSecondaryFontSize',
				    // Padding All
				    'propertychange #btnsx_opt_mobile_text_secondary_padding_all': 'changeSecondaryPaddingAll',
				    'keyup #btnsx_opt_mobile_text_secondary_padding_all': 'changeSecondaryPaddingAll',
				    'input #btnsx_opt_mobile_text_secondary_padding_all': 'changeSecondaryPaddingAll',
				    // Padding Top
				    'propertychange #btnsx_opt_mobile_text_secondary_padding_top': 'changeSecondaryPaddingTop',
				    'keyup #btnsx_opt_mobile_text_secondary_padding_top': 'changeSecondaryPaddingTop',
				    'input #btnsx_opt_mobile_text_secondary_padding_top': 'changeSecondaryPaddingTop',
				    // Padding Bottom
				    'propertychange #btnsx_opt_mobile_text_secondary_padding_bottom': 'changeSecondaryPaddingBottom',
				    'keyup #btnsx_opt_mobile_text_secondary_padding_bottom': 'changeSecondaryPaddingBottom',
				    'input #btnsx_opt_mobile_text_secondary_padding_bottom': 'changeSecondaryPaddingBottom',
				    // Padding Left
				    'propertychange #btnsx_opt_mobile_text_secondary_padding_left': 'changeSecondaryPaddingLeft',
				    'keyup #btnsx_opt_mobile_text_secondary_padding_left': 'changeSecondaryPaddingLeft',
				    'input #btnsx_opt_mobile_text_secondary_padding_left': 'changeSecondaryPaddingLeft',
				    // Padding Right
				    'propertychange #btnsx_opt_mobile_text_secondary_padding_right': 'changeSecondaryPaddingRight',
				    'keyup #btnsx_opt_mobile_text_secondary_padding_right': 'changeSecondaryPaddingRight',
				    'input #btnsx_opt_mobile_text_secondary_padding_right': 'changeSecondaryPaddingRight',
		    	// Icon
					// font size
				    'propertychange #btnsx_opt_mobile_icon_size': 'changeIconSize',
				    'keyup #btnsx_opt_mobile_icon_size': 'changeIconSize',
				    'input #btnsx_opt_mobile_icon_size': 'changeIconSize',
				    // divider
				    'propertychange #btnsx_opt_mobile_icon_divider_size': 'changeIconDividerSize',
				    'keyup #btnsx_opt_mobile_icon_divider_size': 'changeIconDividerSize',
				    'input #btnsx_opt_mobile_icon_divider_size': 'changeIconDividerSize',
				    // divider position
				    'propertychange #btnsx_opt_mobile_icon_divider_position': 'changeIconDividerPosition',
				    'keyup #btnsx_opt_mobile_icon_divider_position': 'changeIconDividerPosition',
				    'input #btnsx_opt_mobile_icon_divider_position': 'changeIconDividerPosition',
				    // Padding All
				    'propertychange #btnsx_opt_mobile_icon_padding_all': 'changeIconPaddingAll',
				    'keyup #btnsx_opt_mobile_icon_padding_all': 'changeIconPaddingAll',
				    'input #btnsx_opt_mobile_icon_padding_all': 'changeIconPaddingAll',
				    // Padding Top
				    'propertychange #btnsx_opt_mobile_icon_padding_top': 'changeIconPaddingTop',
				    'keyup #btnsx_opt_mobile_icon_padding_top': 'changeIconPaddingTop',
				    'input #btnsx_opt_mobile_icon_padding_top': 'changeIconPaddingTop',
				    // Padding Bottom
				    'propertychange #btnsx_opt_mobile_icon_padding_bottom': 'changeIconPaddingBottom',
				    'keyup #btnsx_opt_mobile_icon_padding_bottom': 'changeIconPaddingBottom',
				    'input #btnsx_opt_mobile_icon_padding_bottom': 'changeIconPaddingBottom',
				    // Padding Left
				    'propertychange #btnsx_opt_mobile_icon_padding_left': 'changeIconPaddingLeft',
				    'keyup #btnsx_opt_mobile_icon_padding_left': 'changeIconPaddingLeft',
				    'input #btnsx_opt_mobile_icon_padding_left': 'changeIconPaddingLeft',
				    // Padding Right
				    'propertychange #btnsx_opt_mobile_icon_padding_right': 'changeIconPaddingRight',
				    'keyup #btnsx_opt_mobile_icon_padding_right': 'changeIconPaddingRight',
				    'input #btnsx_opt_mobile_icon_padding_right': 'changeIconPaddingRight',
		    	// Padding
		    		// Padding All
				    'propertychange #btnsx_opt_mobile_padding_all': 'changePaddingAll',
				    'keyup #btnsx_opt_mobile_padding_all': 'changePaddingAll',
				    'input #btnsx_opt_mobile_padding_all': 'changePaddingAll',
				    // Padding Top
				    'propertychange #btnsx_opt_mobile_padding_top': 'changePaddingTop',
				    'keyup #btnsx_opt_mobile_padding_top': 'changePaddingTop',
				    'input #btnsx_opt_mobile_padding_top': 'changePaddingTop',
				    // Padding Bottom
				    'propertychange #btnsx_opt_mobile_padding_bottom': 'changePaddingBottom',
				    'keyup #btnsx_opt_mobile_padding_bottom': 'changePaddingBottom',
				    'input #btnsx_opt_mobile_padding_bottom': 'changePaddingBottom',
				    // Padding Left
				    'propertychange #btnsx_opt_mobile_padding_left': 'changePaddingLeft',
				    'keyup #btnsx_opt_mobile_padding_left': 'changePaddingLeft',
				    'input #btnsx_opt_mobile_padding_left': 'changePaddingLeft',
				    // Padding Right
				    'propertychange #btnsx_opt_mobile_padding_right': 'changePaddingRight',
				    'keyup #btnsx_opt_mobile_padding_right': 'changePaddingRight',
				    'input #btnsx_opt_mobile_padding_right': 'changePaddingRight',
		    	// Copy
		    		'click #btnsx_responsive_mobile_collapsible_copy_btn': 'copy',
		    },
		    initialize: function(){
			    _.bindAll( this, 'render', 'changeWidth', 'changeHeight', 'changePrimaryFontSize', 'changePrimaryPaddingAll', 'changePrimaryPaddingTop', 'changePrimaryPaddingBottom', 'changePrimaryPaddingLeft', 'changePrimaryPaddingRight', 'changeSecondaryFontSize', 'changeSecondaryPaddingAll', 'changeSecondaryPaddingTop', 'changeSecondaryPaddingBottom', 'changeSecondaryPaddingLeft', 'changeSecondaryPaddingRight', 'changeIconSize', 'changeIconDividerSize', 'changeIconDividerPosition', 'changeIconPaddingAll', 'changeIconPaddingTop', 'changeIconPaddingBottom', 'changeIconPaddingLeft', 'changeIconPaddingRight', 'changePaddingAll', 'changePaddingTop', 'changePaddingBottom', 'changePaddingLeft', 'changePaddingRight', 'copy' );
		    },
		    // change width
		    changeWidth: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-mobile').css('width',e.target.value+'px');
		    	}
		    },
		    // change height
		    changeHeight: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-mobile').css('height',e.target.value+'px');
		    	}
		    },
		    // change primary text font size
		    changePrimaryFontSize: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-btn-text-mobile').css('font-size',e.target.value+'px');
		    	}
		    },
		    // change button primary text color hover
		    changePrimaryTextColorHover: function(e){
		    	var val = $('#btnsx_opt_text_color_hover').val();
		    	$('#btnsx-btn-text-mobile').css( 'color', val );
		    },
		    // change button primary text color normal
		    changePrimaryTextColorNormal: function(e){
		    	var val = $('#btnsx_opt_text_color_normal').val();
		    	$('#btnsx-btn-text-mobile').css( 'color', val );
		    },
		    // change primary padding all
		    changePrimaryPaddingAll: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx_opt_mobile_text_padding_top,#btnsx_opt_mobile_text_padding_bottom,#btnsx_opt_mobile_text_padding_left,#btnsx_opt_mobile_text_padding_right').val(e.target.value);
		    		this.changePrimaryPaddingTop(e);
		    		this.changePrimaryPaddingBottom(e);
		    		this.changePrimaryPaddingLeft(e);
		    		this.changePrimaryPaddingRight(e);
		    	}
		    },
		    // change primary padding top
		    changePrimaryPaddingTop: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-btn-text-mobile').css('padding-top',e.target.value+'px');
		    	}
		    },
		    // change primary padding bottom
		    changePrimaryPaddingBottom: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-btn-text-mobile').css('padding-bottom',e.target.value+'px');
		    	}
		    },
		    // change primary padding left
		    changePrimaryPaddingLeft: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-btn-text-mobile').css('padding-left',e.target.value+'px');
		    	}
		    },
		    // change primary padding right
		    changePrimaryPaddingRight: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-btn-text-mobile').css('padding-right',e.target.value+'px');
		    	}
		    },
		    // change secondary text font size
		    changeSecondaryFontSize: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-btn-text-secondary-mobile').css('font-size',e.target.value+'px');
		    	}
		    },
		    // change secondary padding all
		    changeSecondaryPaddingAll: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx_opt_mobile_text_secondary_padding_top,#btnsx_opt_mobile_text_secondary_padding_bottom,#btnsx_opt_mobile_text_secondary_padding_left,#btnsx_opt_mobile_text_secondary_padding_right').val(e.target.value);
		    		this.changeSecondaryPaddingTop(e);
		    		this.changeSecondaryPaddingBottom(e);
		    		this.changeSecondaryPaddingLeft(e);
		    		this.changeSecondaryPaddingRight(e);
		    	}
		    },
		    // change secondary padding top
		    changeSecondaryPaddingTop: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-btn-text-secondary-mobile').css('padding-top',e.target.value+'px');
		    	}
		    },
		    // change secondary padding bottom
		    changeSecondaryPaddingBottom: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-btn-text-secondary-mobile').css('padding-bottom',e.target.value+'px');
		    	}
		    },
		    // change secondary padding left
		    changeSecondaryPaddingLeft: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-btn-text-secondary-mobile').css('padding-left',e.target.value+'px');
		    	}
		    },
		    // change secondary padding right
		    changeSecondaryPaddingRight: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-btn-text-secondary-mobile').css('padding-right',e.target.value+'px');
		    	}
		    },
		    // change icon text font size
		    changeIconSize: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-mobile .btnsx-btn-icon').css('font-size',e.target.value+'px');
		    	}
		    },
		    // change icon text font size
		    changeIconDividerSize: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-mobile .btnsx-btn-icon').css('border-left-width',e.target.value+'px');
		    	}
		    },
		    // change icon position
		    changeIconDividerPosition: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-mobile .btnsx-btn-icon').css('left',e.target.value+'px');
		    	}
		    },
		    // change Icon padding all
		    changeIconPaddingAll: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx_opt_mobile_icon_padding_top,#btnsx_opt_mobile_icon_padding_bottom,#btnsx_opt_mobile_icon_padding_left,#btnsx_opt_mobile_icon_padding_right').val(e.target.value);
		    		this.changeIconPaddingTop(e);
		    		this.changeIconPaddingBottom(e);
		    		this.changeIconPaddingLeft(e);
		    		this.changeIconPaddingRight(e);
		    	}
		    },
		    // change Icon padding top
		    changeIconPaddingTop: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-mobile .btnsx-btn-icon').css('padding-top',e.target.value+'px');
		    	}
		    },
		    // change Icon padding bottom
		    changeIconPaddingBottom: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-mobile .btnsx-btn-icon').css('padding-bottom',e.target.value+'px');
		    	}
		    },
		    // change Icon padding left
		    changeIconPaddingLeft: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-mobile .btnsx-btn-icon').css('padding-left',e.target.value+'px');
		    	}
		    },
		    // change Icon padding right
		    changeIconPaddingRight: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-mobile .btnsx-btn-icon').css('padding-right',e.target.value+'px');
		    	}
		    },
		    // change padding all
		    changePaddingAll: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx_opt_mobile_padding_top,#btnsx_opt_mobile_padding_bottom,#btnsx_opt_mobile_padding_left,#btnsx_opt_mobile_padding_right').val(e.target.value);
		    		this.changePaddingTop(e);
		    		this.changePaddingBottom(e);
		    		this.changePaddingLeft(e);
		    		this.changePaddingRight(e);
		    	}
		    },
		    // change padding top
		    changePaddingTop: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-mobile').css('padding-top',e.target.value+'px');
		    	}
		    },
		    // change padding bottom
		    changePaddingBottom: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-mobile').css('padding-bottom',e.target.value+'px');
		    	}
		    },
		    // change padding left
		    changePaddingLeft: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-mobile').css('padding-left',e.target.value+'px');
		    	}
		    },
		    // change padding right
		    changePaddingRight: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-mobile').css('padding-right',e.target.value+'px');
		    	}
		    },
		    // copy elements
		    copy: function(e){
		    	$('#btnsx_responsive_mobile_collapsible_copy_btn').btnsxCopy();
		    	$('#btnsx-preview-btn-tablet').css('width',$('#btnsx_opt_tablet_width').val()+'px');
		    	$('#btnsx-preview-btn-tablet').css('height',$('#btnsx_opt_tablet_height').val()+'px');
		    	$('#btnsx-btn-text-tablet').css('font-size',$('#btnsx_opt_tablet_text_font_size').val()+'px');
		    	$('#btnsx-btn-text-tablet').css('padding-top',$('#btnsx_opt_tablet_text_padding_top').val()+'px');
		    	$('#btnsx-btn-text-tablet').css('padding-bottom',$('#btnsx_opt_tablet_text_padding_bottom').val()+'px');
		    	$('#btnsx-btn-text-tablet').css('padding-left',$('#btnsx_opt_tablet_text_padding_left').val()+'px');
		    	$('#btnsx-btn-text-tablet').css('padding-right',$('#btnsx_opt_tablet_text_padding_right').val()+'px');
		    	$('#btnsx-btn-text-secondary-tablet').css('font-size',$('#btnsx_opt_tablet_text_secondary_font_size').val()+'px');
		    	$('#btnsx-btn-text-secondary-tablet').css('padding-top',$('#btnsx_opt_tablet_text_secondary_padding_top').val()+'px');
		    	$('#btnsx-btn-text-secondary-tablet').css('padding-bottom',$('#btnsx_opt_tablet_text_secondary_padding_bottom').val()+'px');
		    	$('#btnsx-btn-text-secondary-tablet').css('padding-left',$('#btnsx_opt_tablet_text_secondary_padding_left').val()+'px');
		    	$('#btnsx-btn-text-secondary-tablet').css('padding-right',$('#btnsx_opt_tablet_text_secondary_padding_right').val()+'px');
		    	$('#btnsx-preview-btn-tablet .btnsx-btn-icon').css('font-size',$('#btnsx_opt_tablet_icon_size').val()+'px');
		    	$('#btnsx-preview-btn-tablet .btnsx-btn-icon').css('border-left-width',$('#btnsx_opt_tablet_icon_divider_size').val()+'px');
		    	$('#btnsx-preview-btn-tablet .btnsx-btn-icon').css('left',$('#btnsx_opt_tablet_icon_divider_position').val()+'px');
		    	$('#btnsx-preview-btn-tablet .btnsx-btn-icon').css('padding-top',$('#btnsx_opt_tablet_icon_padding_top').val()+'px');
		    	$('#btnsx-preview-btn-tablet .btnsx-btn-icon').css('padding-bottom',$('#btnsx_opt_tablet_icon_padding_bottom').val()+'px');
		    	$('#btnsx-preview-btn-tablet .btnsx-btn-icon').css('padding-left',$('#btnsx_opt_tablet_icon_padding_left').val()+'px');
		    	$('#btnsx-preview-btn-tablet .btnsx-btn-icon').css('padding-right',$('#btnsx_opt_tablet_icon_padding_right').val()+'px');
		    	$('#btnsx-preview-btn-tablet').css('padding-top',$('#btnsx_opt_tablet_padding_top').val()+'px');
		    	$('#btnsx-preview-btn-tablet').css('padding-bottom',$('#btnsx_opt_tablet_padding_bottom').val()+'px');
		    	$('#btnsx-preview-btn-tablet').css('padding-left',$('#btnsx_opt_tablet_padding_left').val()+'px');
		    	$('#btnsx-preview-btn-tablet').css('padding-right',$('#btnsx_opt_tablet_padding_right').val()+'px');
		    },
		});
		var btnResponsiveMobileView = new BtnResponsiveMobileView();
	
	});

})(jQuery);
/**
 * Buttons X - Responsive Tablet View
 * 
 * Copyright 2016, Gautam Thapar
 * https://www.thewebsitedev.com/
 */

(function($){

	$(document).ready(function(){

		// render basic button view
		var BtnResponsiveTabletView = Backbone.View.extend({
		    
		    el: $('#poststuff'),

		    events: {
				// Layout
					// width
				    'propertychange #btnsx_opt_tablet_width': 'changeWidth',
				    'keyup #btnsx_opt_tablet_width': 'changeWidth',
				    'input #btnsx_opt_tablet_width': 'changeWidth',
				    // height
				    'propertychange #btnsx_opt_tablet_height': 'changeHeight',
				    'keyup #btnsx_opt_tablet_height': 'changeHeight',
				    'input #btnsx_opt_tablet_height': 'changeHeight',
				// Primary Text
					// font size
				    'propertychange #btnsx_opt_tablet_text_font_size': 'changePrimaryFontSize',
				    'keyup #btnsx_opt_tablet_text_font_size': 'changePrimaryFontSize',
				    'input #btnsx_opt_tablet_text_font_size': 'changePrimaryFontSize',
				    // COLOR
				    'mouseenter #btnsx-preview-btn-tablet': 'changePrimaryTextColorHover',
				    'mouseleave #btnsx-preview-btn-tablet': 'changePrimaryTextColorNormal',
				    // Padding All
				    'propertychange #btnsx_opt_tablet_text_padding_all': 'changePrimaryPaddingAll',
				    'keyup #btnsx_opt_tablet_text_padding_all': 'changePrimaryPaddingAll',
				    'input #btnsx_opt_tablet_text_padding_all': 'changePrimaryPaddingAll',
				    // Padding Top
				    'propertychange #btnsx_opt_tablet_text_padding_top': 'changePrimaryPaddingTop',
				    'keyup #btnsx_opt_tablet_text_padding_top': 'changePrimaryPaddingTop',
				    'input #btnsx_opt_tablet_text_padding_top': 'changePrimaryPaddingTop',
				    // Padding Bottom
				    'propertychange #btnsx_opt_tablet_text_padding_bottom': 'changePrimaryPaddingBottom',
				    'keyup #btnsx_opt_tablet_text_padding_bottom': 'changePrimaryPaddingBottom',
				    'input #btnsx_opt_tablet_text_padding_bottom': 'changePrimaryPaddingBottom',
				    // Padding Left
				    'propertychange #btnsx_opt_tablet_text_padding_left': 'changePrimaryPaddingLeft',
				    'keyup #btnsx_opt_tablet_text_padding_left': 'changePrimaryPaddingLeft',
				    'input #btnsx_opt_tablet_text_padding_left': 'changePrimaryPaddingLeft',
				    // Padding Right
				    'propertychange #btnsx_opt_tablet_text_padding_right': 'changePrimaryPaddingRight',
				    'keyup #btnsx_opt_tablet_text_padding_right': 'changePrimaryPaddingRight',
				    'input #btnsx_opt_tablet_text_padding_right': 'changePrimaryPaddingRight',
		    	// Secondary Text
					// font size
				    'propertychange #btnsx_opt_tablet_text_secondary_font_size': 'changeSecondaryFontSize',
				    'keyup #btnsx_opt_tablet_text_secondary_font_size': 'changeSecondaryFontSize',
				    'input #btnsx_opt_tablet_text_secondary_font_size': 'changeSecondaryFontSize',
				    // Padding All
				    'propertychange #btnsx_opt_tablet_text_secondary_padding_all': 'changeSecondaryPaddingAll',
				    'keyup #btnsx_opt_tablet_text_secondary_padding_all': 'changeSecondaryPaddingAll',
				    'input #btnsx_opt_tablet_text_secondary_padding_all': 'changeSecondaryPaddingAll',
				    // Padding Top
				    'propertychange #btnsx_opt_tablet_text_secondary_padding_top': 'changeSecondaryPaddingTop',
				    'keyup #btnsx_opt_tablet_text_secondary_padding_top': 'changeSecondaryPaddingTop',
				    'input #btnsx_opt_tablet_text_secondary_padding_top': 'changeSecondaryPaddingTop',
				    // Padding Bottom
				    'propertychange #btnsx_opt_tablet_text_secondary_padding_bottom': 'changeSecondaryPaddingBottom',
				    'keyup #btnsx_opt_tablet_text_secondary_padding_bottom': 'changeSecondaryPaddingBottom',
				    'input #btnsx_opt_tablet_text_secondary_padding_bottom': 'changeSecondaryPaddingBottom',
				    // Padding Left
				    'propertychange #btnsx_opt_tablet_text_secondary_padding_left': 'changeSecondaryPaddingLeft',
				    'keyup #btnsx_opt_tablet_text_secondary_padding_left': 'changeSecondaryPaddingLeft',
				    'input #btnsx_opt_tablet_text_secondary_padding_left': 'changeSecondaryPaddingLeft',
				    // Padding Right
				    'propertychange #btnsx_opt_tablet_text_secondary_padding_right': 'changeSecondaryPaddingRight',
				    'keyup #btnsx_opt_tablet_text_secondary_padding_right': 'changeSecondaryPaddingRight',
				    'input #btnsx_opt_tablet_text_secondary_padding_right': 'changeSecondaryPaddingRight',
		    	// Icon
					// font size
				    'propertychange #btnsx_opt_tablet_icon_size': 'changeIconSize',
				    'keyup #btnsx_opt_tablet_icon_size': 'changeIconSize',
				    'input #btnsx_opt_tablet_icon_size': 'changeIconSize',
				    // divider
				    'propertychange #btnsx_opt_tablet_icon_divider_size': 'changeIconDividerSize',
				    'keyup #btnsx_opt_tablet_icon_divider_size': 'changeIconDividerSize',
				    'input #btnsx_opt_tablet_icon_divider_size': 'changeIconDividerSize',
				    // divider position
				    'propertychange #btnsx_opt_tablet_icon_divider_position': 'changeIconDividerPosition',
				    'keyup #btnsx_opt_tablet_icon_divider_position': 'changeIconDividerPosition',
				    'input #btnsx_opt_tablet_icon_divider_position': 'changeIconDividerPosition',
				    // Padding All
				    'propertychange #btnsx_opt_tablet_icon_padding_all': 'changeIconPaddingAll',
				    'keyup #btnsx_opt_tablet_icon_padding_all': 'changeIconPaddingAll',
				    'input #btnsx_opt_tablet_icon_padding_all': 'changeIconPaddingAll',
				    // Padding Top
				    'propertychange #btnsx_opt_tablet_icon_padding_top': 'changeIconPaddingTop',
				    'keyup #btnsx_opt_tablet_icon_padding_top': 'changeIconPaddingTop',
				    'input #btnsx_opt_tablet_icon_padding_top': 'changeIconPaddingTop',
				    // Padding Bottom
				    'propertychange #btnsx_opt_tablet_icon_padding_bottom': 'changeIconPaddingBottom',
				    'keyup #btnsx_opt_tablet_icon_padding_bottom': 'changeIconPaddingBottom',
				    'input #btnsx_opt_tablet_icon_padding_bottom': 'changeIconPaddingBottom',
				    // Padding Left
				    'propertychange #btnsx_opt_tablet_icon_padding_left': 'changeIconPaddingLeft',
				    'keyup #btnsx_opt_tablet_icon_padding_left': 'changeIconPaddingLeft',
				    'input #btnsx_opt_tablet_icon_padding_left': 'changeIconPaddingLeft',
				    // Padding Right
				    'propertychange #btnsx_opt_tablet_icon_padding_right': 'changeIconPaddingRight',
				    'keyup #btnsx_opt_tablet_icon_padding_right': 'changeIconPaddingRight',
				    'input #btnsx_opt_tablet_icon_padding_right': 'changeIconPaddingRight',
		    	// Padding
		    		// Padding All
				    'propertychange #btnsx_opt_tablet_padding_all': 'changePaddingAll',
				    'keyup #btnsx_opt_tablet_padding_all': 'changePaddingAll',
				    'input #btnsx_opt_tablet_padding_all': 'changePaddingAll',
				    // Padding Top
				    'propertychange #btnsx_opt_tablet_padding_top': 'changePaddingTop',
				    'keyup #btnsx_opt_tablet_padding_top': 'changePaddingTop',
				    'input #btnsx_opt_tablet_padding_top': 'changePaddingTop',
				    // Padding Bottom
				    'propertychange #btnsx_opt_tablet_padding_bottom': 'changePaddingBottom',
				    'keyup #btnsx_opt_tablet_padding_bottom': 'changePaddingBottom',
				    'input #btnsx_opt_tablet_padding_bottom': 'changePaddingBottom',
				    // Padding Left
				    'propertychange #btnsx_opt_tablet_padding_left': 'changePaddingLeft',
				    'keyup #btnsx_opt_tablet_padding_left': 'changePaddingLeft',
				    'input #btnsx_opt_tablet_padding_left': 'changePaddingLeft',
				    // Padding Right
				    'propertychange #btnsx_opt_tablet_padding_right': 'changePaddingRight',
				    'keyup #btnsx_opt_tablet_padding_right': 'changePaddingRight',
				    'input #btnsx_opt_tablet_padding_right': 'changePaddingRight',
				// Copy
		    		'click #btnsx_responsive_tablet_collapsible_copy_btn': 'copy',
		    },
		    initialize: function(){
			    _.bindAll( this, 'render', 'changeWidth', 'changeHeight', 'changePrimaryFontSize', 'changePrimaryPaddingAll', 'changePrimaryPaddingTop', 'changePrimaryPaddingBottom', 'changePrimaryPaddingLeft', 'changePrimaryPaddingRight', 'changeSecondaryFontSize', 'changeSecondaryPaddingAll', 'changeSecondaryPaddingTop', 'changeSecondaryPaddingBottom', 'changeSecondaryPaddingLeft', 'changeSecondaryPaddingRight', 'changeIconSize', 'changeIconDividerSize', 'changeIconDividerPosition', 'changeIconPaddingAll', 'changeIconPaddingTop', 'changeIconPaddingBottom', 'changeIconPaddingLeft', 'changeIconPaddingRight', 'changePaddingAll', 'changePaddingTop', 'changePaddingBottom', 'changePaddingLeft', 'changePaddingRight', 'copy' );
		    },
		    // change width
		    changeWidth: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-tablet').css('width',e.target.value+'px');
		    	}
		    },
		    // change height
		    changeHeight: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-tablet').css('height',e.target.value+'px');
		    	}
		    },
		    // change primary text font size
		    changePrimaryFontSize: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-btn-text-tablet').css('font-size',e.target.value+'px');
		    	}
		    },
		    // change primary padding all
		    changePrimaryPaddingAll: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx_opt_tablet_text_padding_top,#btnsx_opt_tablet_text_padding_bottom,#btnsx_opt_tablet_text_padding_left,#btnsx_opt_tablet_text_padding_right').val(e.target.value);
		    		this.changePrimaryPaddingTop(e);
		    		this.changePrimaryPaddingBottom(e);
		    		this.changePrimaryPaddingLeft(e);
		    		this.changePrimaryPaddingRight(e);
		    	}
		    },
		    // change primary padding top
		    changePrimaryPaddingTop: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-btn-text-tablet').css('padding-top',e.target.value+'px');
		    	}
		    },
		    // change primary padding bottom
		    changePrimaryPaddingBottom: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-btn-text-tablet').css('padding-bottom',e.target.value+'px');
		    	}
		    },
		    // change primary padding left
		    changePrimaryPaddingLeft: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-btn-text-tablet').css('padding-left',e.target.value+'px');
		    	}
		    },
		    // change primary padding right
		    changePrimaryPaddingRight: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-btn-text-tablet').css('padding-right',e.target.value+'px');
		    	}
		    },
		    // change button primary text color hover
		    changePrimaryTextColorHover: function(e){
		    	var val = $('#btnsx_opt_text_color_hover').val();
		    	$('#btnsx-btn-text-tablet').css( 'color', val );
		    },
		    // change button primary text color normal
		    changePrimaryTextColorNormal: function(e){
		    	var val = $('#btnsx_opt_text_color_normal').val();
		    	$('#btnsx-btn-text-tablet').css( 'color', val );
		    },
		    // change secondary text font size
		    changeSecondaryFontSize: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-btn-text-secondary-tablet').css('font-size',e.target.value+'px');
		    	}
		    },
		    // change secondary padding all
		    changeSecondaryPaddingAll: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx_opt_tablet_text_secondary_padding_top,#btnsx_opt_tablet_text_secondary_padding_bottom,#btnsx_opt_tablet_text_secondary_padding_left,#btnsx_opt_tablet_text_secondary_padding_right').val(e.target.value);
		    		this.changeSecondaryPaddingTop(e);
		    		this.changeSecondaryPaddingBottom(e);
		    		this.changeSecondaryPaddingLeft(e);
		    		this.changeSecondaryPaddingRight(e);
		    	}
		    },
		    // change secondary padding top
		    changeSecondaryPaddingTop: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-btn-text-secondary-tablet').css('padding-top',e.target.value+'px');
		    	}
		    },
		    // change secondary padding bottom
		    changeSecondaryPaddingBottom: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-btn-text-secondary-tablet').css('padding-bottom',e.target.value+'px');
		    	}
		    },
		    // change secondary padding left
		    changeSecondaryPaddingLeft: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-btn-text-secondary-tablet').css('padding-left',e.target.value+'px');
		    	}
		    },
		    // change secondary padding right
		    changeSecondaryPaddingRight: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-btn-text-secondary-tablet').css('padding-right',e.target.value+'px');
		    	}
		    },
		    // change icon text font size
		    changeIconSize: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-tablet .btnsx-btn-icon').css('font-size',e.target.value+'px');
		    	}
		    },
		    // change icon text font size
		    changeIconDividerSize: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-tablet .btnsx-btn-icon').css('border-left-width',e.target.value+'px');
		    	}
		    },
		    // change icon position
		    changeIconDividerPosition: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-tablet .btnsx-btn-icon').css('left',e.target.value+'px');
		    	}
		    },
		    // change Icon padding all
		    changeIconPaddingAll: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx_opt_tablet_icon_padding_top,#btnsx_opt_tablet_icon_padding_bottom,#btnsx_opt_tablet_icon_padding_left,#btnsx_opt_tablet_icon_padding_right').val(e.target.value);
		    		this.changeIconPaddingTop(e);
		    		this.changeIconPaddingBottom(e);
		    		this.changeIconPaddingLeft(e);
		    		this.changeIconPaddingRight(e);
		    	}
		    },
		    // change Icon padding top
		    changeIconPaddingTop: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-tablet .btnsx-btn-icon').css('padding-top',e.target.value+'px');
		    	}
		    },
		    // change Icon padding bottom
		    changeIconPaddingBottom: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-tablet .btnsx-btn-icon').css('padding-bottom',e.target.value+'px');
		    	}
		    },
		    // change Icon padding left
		    changeIconPaddingLeft: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-tablet .btnsx-btn-icon').css('padding-left',e.target.value+'px');
		    	}
		    },
		    // change Icon padding right
		    changeIconPaddingRight: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-tablet .btnsx-btn-icon').css('padding-right',e.target.value+'px');
		    	}
		    },
		    // change padding all
		    changePaddingAll: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx_opt_tablet_padding_top,#btnsx_opt_tablet_padding_bottom,#btnsx_opt_tablet_padding_left,#btnsx_opt_tablet_padding_right').val(e.target.value);
		    		this.changePaddingTop(e);
		    		this.changePaddingBottom(e);
		    		this.changePaddingLeft(e);
		    		this.changePaddingRight(e);
		    	}
		    },
		    // change padding top
		    changePaddingTop: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-tablet').css('padding-top',e.target.value+'px');
		    	}
		    },
		    // change padding bottom
		    changePaddingBottom: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-tablet').css('padding-bottom',e.target.value+'px');
		    	}
		    },
		    // change padding left
		    changePaddingLeft: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-tablet').css('padding-left',e.target.value+'px');
		    	}
		    },
		    // change padding right
		    changePaddingRight: function(e){
		    	if( e.target.value != '' ){
		    		$('#btnsx-preview-btn-tablet').css('padding-right',e.target.value+'px');
		    	}
		    },
		    // copy elements
		    copy: function(e){
		    	$('#btnsx_responsive_tablet_collapsible_copy_btn').btnsxCopy();
		    	$('#btnsx-preview-btn-mobile').css('width',$('#btnsx_opt_mobile_width').val()+'px');
		    	$('#btnsx-preview-btn-mobile').css('height',$('#btnsx_opt_mobile_height').val()+'px');
		    	$('#btnsx-btn-text-mobile').css('font-size',$('#btnsx_opt_mobile_text_font_size').val()+'px');
		    	$('#btnsx-btn-text-mobile').css('padding-top',$('#btnsx_opt_mobile_text_padding_top').val()+'px');
		    	$('#btnsx-btn-text-mobile').css('padding-bottom',$('#btnsx_opt_mobile_text_padding_bottom').val()+'px');
		    	$('#btnsx-btn-text-mobile').css('padding-left',$('#btnsx_opt_mobile_text_padding_left').val()+'px');
		    	$('#btnsx-btn-text-mobile').css('padding-right',$('#btnsx_opt_mobile_text_padding_right').val()+'px');
		    	$('#btnsx-btn-text-secondary-mobile').css('font-size',$('#btnsx_opt_mobile_text_secondary_font_size').val()+'px');
		    	$('#btnsx-btn-text-secondary-mobile').css('padding-top',$('#btnsx_opt_mobile_text_secondary_padding_top').val()+'px');
		    	$('#btnsx-btn-text-secondary-mobile').css('padding-bottom',$('#btnsx_opt_mobile_text_secondary_padding_bottom').val()+'px');
		    	$('#btnsx-btn-text-secondary-mobile').css('padding-left',$('#btnsx_opt_mobile_text_secondary_padding_left').val()+'px');
		    	$('#btnsx-btn-text-secondary-mobile').css('padding-right',$('#btnsx_opt_mobile_text_secondary_padding_right').val()+'px');
		    	$('#btnsx-preview-btn-mobile .btnsx-btn-icon').css('font-size',$('#btnsx_opt_mobile_icon_size').val()+'px');
		    	$('#btnsx-preview-btn-mobile .btnsx-btn-icon').css('border-left-width',$('#btnsx_opt_mobile_icon_divider_size').val()+'px');
		    	$('#btnsx-preview-btn-mobile .btnsx-btn-icon').css('left',$('#btnsx_opt_mobile_icon_divider_position').val()+'px');
		    	$('#btnsx-preview-btn-mobile .btnsx-btn-icon').css('padding-top',$('#btnsx_opt_mobile_icon_padding_top').val()+'px');
		    	$('#btnsx-preview-btn-mobile .btnsx-btn-icon').css('padding-bottom',$('#btnsx_opt_mobile_icon_padding_bottom').val()+'px');
		    	$('#btnsx-preview-btn-mobile .btnsx-btn-icon').css('padding-left',$('#btnsx_opt_mobile_icon_padding_left').val()+'px');
		    	$('#btnsx-preview-btn-mobile .btnsx-btn-icon').css('padding-right',$('#btnsx_opt_mobile_icon_padding_right').val()+'px');
		    	$('#btnsx-preview-btn-mobile').css('padding-top',$('#btnsx_opt_mobile_padding_top').val()+'px');
		    	$('#btnsx-preview-btn-mobile').css('padding-bottom',$('#btnsx_opt_mobile_padding_bottom').val()+'px');
		    	$('#btnsx-preview-btn-mobile').css('padding-left',$('#btnsx_opt_mobile_padding_left').val()+'px');
		    	$('#btnsx-preview-btn-mobile').css('padding-right',$('#btnsx_opt_mobile_padding_right').val()+'px');
		    }
		});
		var btnResponsiveTabletView = new BtnResponsiveTabletView();
	
	});

})(jQuery);
/**
 * Buttons X - Secondary Text View
 * 
 * Copyright 2015, Gautam Thapar
 * http://www.gautamthapar.me
 */

(function($){

	$(document).ready(function(){

		// render basic button view
		var BtnTextSecondaryView = Backbone.View.extend({
		    
		    el: $('#poststuff'),

		    events: {
				// secondary text
					// text
				    'propertychange #btnsx_opt_text_secondary': 'changeTextSecondary',
				    'keyup #btnsx_opt_text_secondary': 'changeTextSecondary',
				    'input #btnsx_opt_text_secondary': 'changeTextSecondary',
				    // text transform
				    'change #btnsx_opt_text_secondary_transform': 'changeTextSecondaryTransform',
				    // text position
				    'change #btnsx_opt_text_secondary_position': 'changeTextSecondaryPosition',
				    // text alignment
				    'change #btnsx_opt_text_secondary_alignment': 'changeTextSecondaryAlignment',
				    // FONT
				    // font size
				    'propertychange #btnsx_opt_text_secondary_font_size': 'changeTextSecondaryFontSize',
				    'keyup #btnsx_opt_text_secondary_font_size': 'changeTextSecondaryFontSize',
				    'input #btnsx_opt_text_secondary_font_size': 'changeTextSecondaryFontSize',
				    // font style
				    'change #btnsx_opt_text_secondary_font_style': 'changeTextSecondaryFontStyle',
				    // font weight
				    'change #btnsx_opt_text_secondary_font_weight': 'changeTextSecondaryFontWeight',
				    // font family
				    'change #btnsx_opt_text_secondary_font_family': 'changeTextSecondaryFontFamily',
				    // COLOR
				    // Hover Color
				    'mouseenter #btnsx-preview-btn': 'changeTextSecondaryColorHover',
				    'mouseleave #btnsx-preview-btn': 'changeTextSecondaryColorNormal',
				    // SHADOW
				    // horizontal
				    'propertychange #btnsx_opt_text_secondary_shadow_horizontal': 'changeTextSecondaryShadow',
				    'keyup #btnsx_opt_text_secondary_shadow_horizontal': 'changeTextSecondaryShadow',
				    'input #btnsx_opt_text_secondary_shadow_horizontal': 'changeTextSecondaryShadow',
				    // vertical
				    'propertychange #btnsx_opt_text_secondary_shadow_vertical': 'changeTextSecondaryShadow',
				    'keyup #btnsx_opt_text_secondary_shadow_vertical': 'changeTextSecondaryShadow',
				    'input #btnsx_opt_text_secondary_shadow_vertical': 'changeTextSecondaryShadow',
				    // blur
				    'propertychange #btnsx_opt_text_secondary_shadow_blur': 'changeTextSecondaryShadow',
				    'keyup #btnsx_opt_text_secondary_shadow_blur': 'changeTextSecondaryShadow',
				    'input #btnsx_opt_text_secondary_shadow_blur': 'changeTextSecondaryShadow',
				    // color
				    'propertychange #btnsx_opt_text_secondary_shadow_color': 'changeTextSecondaryShadow',
				    'keyup #btnsx_opt_text_secondary_shadow_color': 'changeTextSecondaryShadow',
				    'input #btnsx_opt_text_secondary_shadow_color': 'changeTextSecondaryShadow',
				    // PADDING
				    // padding top
				    'propertychange #btnsx_opt_text_secondary_padding_top': 'changeTextSecondaryPaddingTop',
				    'keyup #btnsx_opt_text_secondary_padding_top': 'changeTextSecondaryPaddingTop',
				    'input #btnsx_opt_text_secondary_padding_top': 'changeTextSecondaryPaddingTop',
				    // padding bottom
				    'propertychange #btnsx_opt_text_secondary_padding_bottom': 'changeTextSecondaryPaddingBottom',
				    'keyup #btnsx_opt_text_secondary_padding_bottom': 'changeTextSecondaryPaddingBottom',
				    'input #btnsx_opt_text_secondary_padding_bottom': 'changeTextSecondaryPaddingBottom',
				    // padding left
				    'propertychange #btnsx_opt_text_secondary_padding_left': 'changeTextSecondaryPaddingLeft',
				    'keyup #btnsx_opt_text_secondary_padding_left': 'changeTextSecondaryPaddingLeft',
				    'input #btnsx_opt_text_secondary_padding_left': 'changeTextSecondaryPaddingLeft',
				    // padding right
				    'propertychange #btnsx_opt_text_secondary_padding_right': 'changeTextSecondaryPaddingRight',
				    'keyup #btnsx_opt_text_secondary_padding_right': 'changeTextSecondaryPaddingRight',
				    'input #btnsx_opt_text_secondary_padding_right': 'changeTextSecondaryPaddingRight',
				    // copy
			    	'click #btnsx_opt_text_secondary_color_normal_copy_btn': 'copyColorNormal',
			    	'click #btnsx_opt_text_secondary_color_hover_copy_btn': 'copyColorHover',
			    	// padding all
				    'propertychange #btnsx_opt_text_secondary_padding_all': 'changeTextSecondaryPaddingAll',
				    'keyup #btnsx_opt_text_secondary_padding_all': 'changeTextSecondaryPaddingAll',
				    'input #btnsx_opt_text_secondary_padding_all': 'changeTextSecondaryPaddingAll',
		    },

		    initialize: function(){

			    _.bindAll( this, 'render', 'changeTextSecondary', 'changeTextSecondaryTransform', 'changeTextSecondaryPosition', 'changeTextSecondaryAlignment', 'changeTextSecondaryFontSize', 'changeTextSecondaryFontStyle', 'changeTextSecondaryFontWeight', 'changeTextSecondaryFontFamily', 'changeTextSecondaryColorHover', 'changeTextSecondaryColorNormal', 'changeTextSecondaryShadow', 'changeTextSecondaryPaddingTop', 'changeTextSecondaryPaddingBottom', 'changeTextSecondaryPaddingLeft', 'changeTextSecondaryPaddingRight' ); // every function that uses 'this' as the current object should be in here

			    // ASSIGN VARIABLES
			    
			    // preview
			    	this.btnPreviewBackground = $('#btnsx_opt_preview_background');
			    	this.btnPreviewContainer = $('#btnsx-preview .inside');
			    	this.btnPreviewLoader = $('#btnsx-preview-loader');
			    	this.btnContainer = $('#btnsx-preview-container');
			    	this.btnPreviewBackgroundValue = $('#btnsx_opt_preview_background').val();

			    // secondary text
			    	this.btnTextSecondary = $('#btnsx_opt_text_secondary');
			    	this.btnTextSecondaryValue = $('#btnsx_opt_text_secondary').val();
			    	this.btnTextSecondaryTransform = $('#btnsx_opt_text_secondary_transform');
			    	this.btnTextSecondaryTransformValue = $('#btnsx_opt_text_secondary_transform').val();
			    	this.btnTextSecondaryPosition = $('#btnsx_opt_text_secondary_position');
			    	this.btnTextSecondaryPositionValue = $('#btnsx_opt_text_secondary_position').val();
			    	this.btnTextSecondaryAlignment = $('#btnsx_opt_text_secondary_alignment');
			    	this.btnTextSecondaryAlignmentValue = $('#btnsx_opt_text_secondary_alignment').val();
			    	// font
			    	this.btnTextSecondaryFontSize = $('#btnsx_opt_text_secondary_font_size');
			    	this.btnTextSecondaryFontSizeValue = $('#btnsx_opt_text_secondary_font_size').val();
			    	this.btnTextSecondaryFontStyle = $('#btnsx_opt_text_secondary_font_style');
			    	this.btnTextSecondaryFontStyleValue = $('#btnsx_opt_text_secondary_font_style').val();
			    	this.btnTextSecondaryFontWeight = $('#btnsx_opt_text_secondary_font_weight');
			    	this.btnTextSecondaryFontWeightValue = $('#btnsx_opt_text_secondary_font_weight').val();
			    	this.btnTextSecondaryFontFamily = $('#btnsx_opt_text_secondary_font_family');
			    	this.btnTextSecondaryFontFamilyValue = $('#btnsx_opt_text_secondary_font_family').val();
			    	// color
			    	this.btnTextSecondaryColorNormal = $('#btnsx_opt_text_secondary_color_normal');
			    	this.btnTextSecondaryColorNormalValue = $('#btnsx_opt_text_secondary_color_normal').val();
			    	this.btnTextSecondaryColorHover = $('#btnsx_opt_text_secondary_color_hover');
			    	// shadow
			    	this.btnTextSecondaryShadowHorizontal = $('#btnsx_opt_text_secondary_shadow_horizontal');
			    	this.btnTextSecondaryShadowHorizontalValue = $('#btnsx_opt_text_secondary_shadow_horizontal').val();
			    	this.btnTextSecondaryShadowVertical = $('#btnsx_opt_text_secondary_shadow_vertical');
			    	this.btnTextSecondaryShadowVerticalValue = $('#btnsx_opt_text_secondary_shadow_vertical').val();
			    	this.btnTextSecondaryShadowBlur = $('#btnsx_opt_text_secondary_shadow_blur');
			    	this.btnTextSecondaryShadowBlurValue = $('#btnsx_opt_text_secondary_shadow_blur').val();
			    	this.btnTextSecondaryShadowColor = $('#btnsx_opt_text_secondary_shadow_color');
			    	this.btnTextSecondaryShadowColorValue = $('#btnsx_opt_text_secondary_shadow_color').val();
			    	// padding
			    	this.btnTextSecondaryPaddingTop = $('#btnsx_opt_text_secondary_padding_top');
			    	this.btnTextSecondaryPaddingTopValue = this.btnTextSecondaryPaddingTop.val();
			    	this.btnTextSecondaryPaddingBottom = $('#btnsx_opt_text_secondary_padding_bottom');
			    	this.btnTextSecondaryPaddingBottomValue = this.btnTextSecondaryPaddingBottom.val();
			    	this.btnTextSecondaryPaddingLeft = $('#btnsx_opt_text_secondary_padding_left');
			    	this.btnTextSecondaryPaddingLeftValue = this.btnTextSecondaryPaddingLeft.val();
			    	this.btnTextSecondaryPaddingRight = $('#btnsx_opt_text_secondary_padding_right');
			    	this.btnTextSecondaryPaddingRightValue = this.btnTextSecondaryPaddingRight.val();


			    this.render();

		    },

		    render: function(){

		    	// preview
			    	this.btnPreview = $('#btnsx-preview-btn');
			    	this.btnPreviewTextSecondary = $('#btnsx-btn-text-secondary');

				// secondary text
					// set button text
					this.btnPreviewTextSecondary.text(this.btnTextSecondaryValue);
					if(this.btnTextSecondaryValue!=''){
						this.btnPreviewTextSecondary.css('display','inline');
					}
					// set button text transform
					this.btnPreviewTextSecondary.css('text-transform',this.btnTextSecondaryTransformValue);
					// set button text alignment
					this.btnPreviewTextSecondary.css('text-align',this.btnTextSecondaryAlignmentValue);
					// set button text position
					this.btnPreviewTextSecondary.css('display',this.btnTextSecondaryPositionValue);
					if( this.btnTextSecondaryPositionValue == 'block' ){
						// show text alignment option
						this.btnTextSecondaryAlignment.parent().parent().fadeIn();
					} else if ( this.btnTextSecondaryPositionValue == 'inline' ){
						// hide alignment option by default
						this.btnTextSecondaryAlignment.parent().parent().hide();
					} else {
						// hide alignment option by default
						this.btnTextSecondaryAlignment.parent().parent().hide();
					}
					// FONT
					// set button text secondary font size
					this.btnPreviewTextSecondary.css({
						'font-size':this.btnTextSecondaryFontSizeValue + 'px',
						'line-height':this.btnTextSecondaryFontSizeValue + 'px'
					});
					// set button text secondary font style
					this.btnPreviewTextSecondary.css('font-style',this.btnTextSecondaryFontStyleValue);
					// set button text secondary font weight
					this.btnPreviewTextSecondary.css('font-weight',this.btnTextSecondaryFontWeightValue);
					// set button text secondary font family
					var fontFamilySecondary = this.btnTextSecondaryFontFamilyValue;

					$('#btnsx_opt_text_secondary_font_weight').select2('val','');
					$('#btnsx_opt_text_secondary_font_weight option').prop('disabled','disabled');

					// if( $.inArray(this.btnTextSecondaryFontFamilyValue, [null, '', 'Inherit', 'Arial', 'Bookman Old Style', 'Comic Sans MS', 'Courier', 'Garamond', 'Georgia', 'Helvetica', 'Impact', 'MS Sans Serif', 'MS Serif', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana']) < 0 ){
						var fwv = this.btnTextSecondaryFontWeightValue;
						var fsv = this.btnTextSecondaryFontStyleValue;
			    		$.getJSON( view_translations.google_web_fonts, function( data ) {
							$.each( data, function( key, val ) {
								if( key == 'items' ){
									$.each( val, function( k, v ) {
										if( v.family == fontFamily ){
											$.each( v.variants, function( a, b ) {
												if( b == 'regular' ){
													b = '400';
												}else if( b == 'italic' ){
													b = '400italic';
												}
												$('#btnsx_opt_text_secondary_font_weight-option-'+b).removeAttr('disabled');
											});
										}
									});
								}
							});
							$('#btnsx_opt_text_secondary_font_weight').select2('val',fwv);
							$('#btnsx_opt_text_secondary_font_style').select2('val',fsv);
						});
						
			    		if ($.inArray(fontFamilySecondary, [null,'','Inherit', 'Arial', 'Bookman Old Style', 'Comic Sans MS', 'Courier', 'Garamond', 'Georgia', 'Helvetica', 'Impact', 'MS Sans Serif', 'MS Serif', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana']) < 0) {
			    			var $head = $("head");
			    			var fontFamily = $('#btnsx_opt_text_secondary_font_family').val();
	                        var weightValue = $('#btnsx_opt_text_secondary_font_weight').val();
	                        if( weightValue === undefined || weightValue === null ){
	                        	weightValue = '400';
	                        }
	                        var linkValue = fontFamily + ':' + weightValue;
	                        var $headlinklast = $head.find("link[rel='stylesheet']:last");
	                        $('#btnsx-secondary-google-webfonts').remove();
	                        var linkElement = "<link rel='stylesheet' type='text/css' id='btnsx-secondary-google-webfonts' href='https://fonts.googleapis.com/css?family=" + linkValue + "'>";
	                        if( weightValue != 'default' ){
	                            if ($headlinklast.length) {
	                                $headlinklast.after(linkElement);
	                            }
	                            else {
	                                $head.append(linkElement);
	                            }
	                        }
	                    }
			    		this.btnPreviewTextSecondary.css('font-family',fontFamilySecondary);
			    	// }
					// COLOR
					// set secondary text color
					this.btnPreviewTextSecondary.css('color','#'+this.btnTextSecondaryColorNormalValue);
					// change secondary text color when value changes
					this.btnTextSecondaryColorNormal.btnsxRGBA({
						targetElement: this.btnPreviewTextSecondary,
						css: 'color'
					});
					this.btnTextSecondaryColorHover.btnsxRGBA();
					// SHADOW
					// set secondary text shadow
					var horSecShadow = this.btnTextSecondaryShadowHorizontalValue;
					var verSecShadow = this.btnTextSecondaryShadowVerticalValue;
					var blurSecShadow = this.btnTextSecondaryShadowBlurValue != '' ? this.btnTextSecondaryShadowBlurValue : '0';
					if( horSecShadow != '0' || verSecShadow != '0' ){
						this.btnTextSecondaryShadowValue = horSecShadow + 'px ' + verSecShadow + 'px ' + blurSecShadow + 'px ' + this.btnTextSecondaryShadowColorValue;
					}
					this.btnTextSecondaryShadowColor.btnsxRGBA();
					this.btnPreviewTextSecondary.css('text-shadow',this.btnTextSecondaryShadowValue);
					// PADDING
					// set secondary text padding top
					this.btnPreviewTextSecondary.css('padding-top',this.btnTextSecondaryPaddingTopValue + 'px');
					// set secondary text padding bottom
					this.btnPreviewTextSecondary.css('padding-bottom',this.btnTextSecondaryPaddingBottomValue + 'px');
					// set secondary text padding left
					this.btnPreviewTextSecondary.css('padding-left',this.btnTextSecondaryPaddingLeftValue + 'px');
					// set secondary text padding right
					this.btnPreviewTextSecondary.css('padding-right',this.btnTextSecondaryPaddingRightValue + 'px');


					// hide loader
		    		// this.btnPreviewLoader.hide();
			    	// display preview button
			    	// this.btnPreview.fadeIn();

		    },
		    // change button secondary text
		    changeTextSecondary: function(e){
		    	this.btnPreviewTextSecondary.text(e.target.value);
		    	var position = $('#btnsx_opt_text_secondary_position').val();
		    	if( position != null ){
		    		this.btnPreviewTextSecondary.css('display',position);
		    	}else{
		    		this.btnPreviewTextSecondary.css('display','inline');
		    	}
		    	if(e.target.value == ''){
		    		this.btnPreviewTextSecondary.css('display','none');
		    	}
		    },
		    // change button secondary text transform
		    changeTextSecondaryTransform: function(e){
		    	this.btnPreviewTextSecondary.css('text-transform',e.target.value);
		    },
		    // change button secondary text position
		    changeTextSecondaryPosition: function(e){
		    	this.btnPreviewTextSecondary.css('display',e.target.value);
		    	if( e.target.value == 'block' ){
					// show text alignment option
					this.btnTextSecondaryAlignment.parent().parent().fadeIn();
				} else if ( e.target.value == 'inline' ){
					// hide alignment option by default
					$('#btnsx_opt_text_secondary_alignment').parent().parent().hide();
				} else {
					// hide alignment option by default
					$('#btnsx_opt_text_secondary_alignment').parent().parent().hide();
				}
		    },
		    // change button secondary text alignment
		    changeTextSecondaryAlignment: function(e){
		    	this.btnPreviewTextSecondary.css('text-align',e.target.value);
		    },
		    // change button secondary text font size
		    changeTextSecondaryFontSize: function(e){
		    	this.btnTextSecondaryFontSizeValue = $('#btnsx_opt_text_secondary_font_size').val();
		    	this.btnPreviewTextSecondary.css({
					'font-size':this.btnTextSecondaryFontSizeValue + 'px',
					'line-height':this.btnTextSecondaryFontSizeValue + 'px'
				});
		    },
		    // change button secondary text font style
		    changeTextSecondaryFontStyle: function(e){
		    	this.btnPreviewTextSecondary.css('font-style',e.target.value);
		    },
		    // change button secondary text font weight
		    changeTextSecondaryFontWeight: function(e){
		    	var secondaryFontFamily = $('#btnsx-secondary-google-webfonts');
		    	if( secondaryFontFamily.length > 0 ){
		    		var $head = $("head");
		    		$('#btnsx-secondary-google-webfonts').remove();
		    		this.btnTextSecondaryFontFamilyValue = $('#btnsx_opt_text_secondary_font_family').val();
		    		$head.append('<link rel="stylesheet" type="text/css" id="btnsx-secondary-google-webfonts" href="https://fonts.googleapis.com/css?family=' + this.btnTextSecondaryFontFamilyValue + ':' + e.target.value + '">' );
		    	}
		    	this.btnPreviewTextSecondary.css('font-weight',e.target.value);
		    },
		    // change button secondary text font family
		    changeTextSecondaryFontFamily: function(e){
		    	$('head').find('link#btnsx-secondary-google-webfonts').remove();
		    	$('head').find('link#btnsx-secondary-google-webfonts').remove();
		    	// if( $.inArray(e.target.value, ['', 'Inherit', 'Arial', 'Bookman Old Style', 'Comic Sans MS', 'Courier', 'Garamond', 'Georgia', 'Helvetica', 'Impact', 'MS Sans Serif', 'MS Serif', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana']) < 0 ){
		    		$.getJSON( view_translations.google_web_fonts, function( data ) {
						$.each( data, function( key, val ) {
							if( key == 'items' ){
								$('#btnsx_opt_text_secondary_font_weight').select2('val','');
								$('#btnsx_opt_text_secondary_font_weight option').prop('disabled','disabled');
								$.each( val, function( k, v ) {
									if( v.family == e.target.value ){
										$.each( v.variants, function( a, b ) {
											if( b == 'regular' ){
												b = '400';
											}else if( b == 'italic' ){
												b = '400italic';
											}
											$('#btnsx_opt_text_secondary_font_weight-option-'+b).removeAttr('disabled');
										});
									}
								});
								$('#btnsx_opt_text_secondary_font_weight').select2();
							}
						});
					});
					
		    		if ($.inArray(e.targetvalue, [null,'','Inherit', 'Arial', 'Bookman Old Style', 'Comic Sans MS', 'Courier', 'Garamond', 'Georgia', 'Helvetica', 'Impact', 'MS Sans Serif', 'MS Serif', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana']) < 0) {
		    			var $head = $("head");
		    			var fontFamily = $('#btnsx_opt_text_secondary_font_family').val();
                        var weightValue = $('#btnsx_opt_text_secondary_font_weight').val();
                        if( weightValue === undefined || weightValue === null ){
                        	weightValue = '400';
                        }
                        var linkValue = fontFamily + ':' + weightValue;
                        var $headlinklast = $head.find("link[rel='stylesheet']:last");
                        var linkElement = "<link rel='stylesheet' type='text/css' id='btnsx-secondary-google-webfonts' href='https://fonts.googleapis.com/css?family=" + linkValue + "'>";
                        if( weightValue != 'default' ){
                            if ($headlinklast.length) {
                                $headlinklast.after(linkElement);
                            }
                            else {
                                $head.append(linkElement);
                            }
                        }
                    }
		    		this.btnPreviewTextSecondary.css('font-family',e.target.value);
		    	// }
		    },
		    // change button secondary text color hover
		    changeTextSecondaryColorHover: function(e){
		    	this.btnTextSecondaryColorHoverValue = this.btnTextSecondaryColorHover.val();
		    	this.btnPreviewTextSecondary.css( 'color', this.btnTextSecondaryColorHoverValue );
		    },
		    // change button secondary text color normal
		    changeTextSecondaryColorNormal: function(e){
		    	this.btnTextSecondaryColorNormalValue = this.btnTextSecondaryColorNormal.val();
		    	this.btnPreviewTextSecondary.css( 'color', this.btnTextSecondaryColorNormalValue );
		    },
		    // change button secondary text shadow
		    changeTextSecondaryShadow: function(e){
		    	this.btnTextSecondaryShadowHorizontalValue = ( this.btnTextSecondaryShadowHorizontal.val() != '' ) ? this.btnTextSecondaryShadowHorizontal.val() : '';
		    	this.btnTextSecondaryShadowVerticalValue = ( this.btnTextSecondaryShadowVertical.val() != '' ) ? this.btnTextSecondaryShadowVertical.val() : '';
		    	this.btnTextSecondaryShadowBlurValue = ( this.btnTextSecondaryShadowBlur.val() != '' ) ? this.btnTextSecondaryShadowBlur.val() : '0';
		    	this.btnTextSecondaryShadowColorValue = ( this.btnTextSecondaryShadowColor.val() != '' ) ? this.btnTextSecondaryShadowColor.val() : '#000';
		    	this.btnTextSecondaryShadowValue = this.btnTextSecondaryShadowHorizontalValue + 'px ' + this.btnTextSecondaryShadowVerticalValue + 'px ' + this.btnTextSecondaryShadowBlurValue + 'px ' + this.btnTextSecondaryShadowColorValue;
		    	
		    	if( this.btnTextSecondaryShadowHorizontalValue == '0' && this.btnTextSecondaryShadowVerticalValue == '0' ){
		    		this.btnPreviewTextSecondary.css('text-shadow','');
		    	}else{
		    		this.btnPreviewTextSecondary.css('text-shadow',this.btnTextSecondaryShadowValue);
		    	}
		    },
		    // change button secondary text padding top
		    changeTextSecondaryPaddingTop: function(e){
		    	this.btnTextSecondaryPaddingTopValue = $('#btnsx_opt_text_secondary_padding_top').val();
		    	this.btnPreviewTextSecondary.css( 'padding-top', this.btnTextSecondaryPaddingTopValue + 'px' );
		    },
		    // change button secondary text padding bottom
		    changeTextSecondaryPaddingBottom: function(e){
		    	this.btnTextSecondaryPaddingBottomValue = $('#btnsx_opt_text_secondary_padding_bottom').val();
		    	this.btnPreviewTextSecondary.css( 'padding-bottom', this.btnTextSecondaryPaddingBottomValue + 'px' );
		    },
		    // change button secondary text padding left
		    changeTextSecondaryPaddingLeft: function(e){
		    	this.btnTextSecondaryPaddingLeftValue = $('#btnsx_opt_text_secondary_padding_left').val();
		    	this.btnPreviewTextSecondary.css( 'padding-left', this.btnTextSecondaryPaddingLeftValue + 'px' );
		    },
		    // change button secondary text padding right
		    changeTextSecondaryPaddingRight: function(e){
		    	this.btnTextSecondaryPaddingRightValue = $('#btnsx_opt_text_secondary_padding_right').val();
		    	this.btnPreviewTextSecondary.css( 'padding-right', this.btnTextSecondaryPaddingRightValue + 'px' );
		    },
		    copyColorNormal: function(e){
		    	$('#btnsx_opt_text_secondary_color_normal_copy_btn').btnsxCopy();
		    },
		    copyColorHover: function(e){
		    	$('#btnsx_opt_text_secondary_color_hover_copy_btn').btnsxCopy();
		    },
		    changeTextSecondaryPaddingAll: function(e){
		    	$('#btnsx_opt_text_secondary_padding_top').val(e.target.value);
		    	$('#btnsx_opt_text_secondary_padding_bottom').val(e.target.value);
		    	$('#btnsx_opt_text_secondary_padding_right').val(e.target.value);
		    	$('#btnsx_opt_text_secondary_padding_left').val(e.target.value);
		    	this.changeTextSecondaryPaddingTop(e);
		    	this.changeTextSecondaryPaddingBottom(e);
		    	this.changeTextSecondaryPaddingLeft(e);
		    	this.changeTextSecondaryPaddingRight(e);
		    },
		    
		});

		var btnTextSecondaryView = new BtnTextSecondaryView();
	
	});

})(jQuery);
/**
 * Buttons X - Animation View
 * 
 * Copyright 2015, Gautam Thapar
 * http://www.gautamthapar.me
 */

(function($){
	$(document).ready(function(){

		var animation = $( '#btnsx_opt_animation_hover' ).val();
	    if( $( '#btnsx_opt_animation_hover' ) != '' ){
	        $( '#btnsx-preview-btn' ).addClass( 'btnsx-' + animation );
	    }

	    var bg_normal = $('#btnsx_opt_background_color_normal').val();
	    var bg_hover = $('#btnsx_opt_background_color_hover').val();
	        $( '#btnsx-preview .inside' ).prepend( '<style type="text/css" id="btnsx-animation-hover-style">.btnsx-btn:before{background-color:'+ bg_hover +'!important;}</style>' );

	    switch(animation) {
	            case 'hvr-back-pulse':
	                // $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-bounce-to-bottom':
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-bounce-to-top':
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-bounce-to-left':
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-bounce-to-right':
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-radial-in':
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-radial-out':
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-rectangle-in':
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-rectangle-out':
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-shutter-in-horizontal':
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-shutter-in-vertical':
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-shutter-out-horizontal':
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-shutter-out-vertical':
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-sweep-to-bottom':
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-sweep-to-top':
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-sweep-to-left':
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-sweep-to-right':
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-overline-from-center':
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-overline-from-left':
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-overline-from-right':
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-overline-reveal':
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-trim':
	                $('#btnsx-animation-hover-style').remove();
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-underline-from-center':
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-underline-from-left':
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-underline-from-right':
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-underline-reveal':
	                $('#btnsx-background-color-hover-style').remove();
	                break;
	            case 'hvr-bounce-in':
	                $( '#btnsx-animation-hover-style').remove();
	                break;
	            case 'hvr-back-pulse':
	                $( '#btnsx-preview .inside' ).prepend( '<style type="text/css" id="btnsx-animation-hover-keyframe">@-webkit-keyframes btnsx-hvr-back-pulse { 50% { background-color: '+bg_hover+'; } } @keyframes btnsx-hvr-back-pulse { 50% { background-color: '+bg_hover+'; } }</style>' );
	                break;
	            case 'hvr-curl-top-right':
	                $( '#btnsx-animation-hover-style').remove();
	                break;
	            case 'hvr-curl-bottom-left':
	                $( '#btnsx-animation-hover-style').remove();
	                break;
	            case 'hvr-curl-bottom-right':
	                $( '#btnsx-animation-hover-style').remove();
	                break;
	            case 'hvr-curl-top-left':
	                $( '#btnsx-animation-hover-style').remove();
	                break;
	            default:
	                // do nothing
	    }

	    $('#btnsx-preview-loader').hide();
		$('#btnsx-preview-btn').fadeIn('slow');

	    // hover animation
	        $( '#btnsx_opt_animation_hover' ).on( 'change', function(e){
	            e.preventDefault();
	            var preview = $( '#btnsx-preview-btn' );
	            preview.removeClass (function (index, css) {
	                return (css.match (/(^|\s)btnsx-hvr-\S+/g) || []).join(' ');
	            });
	            $( '#btnsx-preview .inside' ).find('#btnsx-animation-hover-style').remove();
	            $( '#btnsx-preview .inside' ).find('#btnsx-animation-hover-keyframe').remove();
	            var bg_normal = $('#btnsx_opt_background_color_normal').val();
	            var bg_hover = $('#btnsx_opt_background_color_hover').val();
	            $( '#btnsx-preview .inside' ).prepend( '<style type="text/css" id="btnsx-animation-hover-style">.btnsx-btn:before{background-color:'+ bg_hover +'!important;}</style>' );
	            var animation = $( this ).val();
	            if( animation != '0' ){
	                preview.addClass( 'btnsx-' + animation );
	            }
	            switch(animation) {
	                case 'hvr-back-pulse':
	                    // $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-bounce-to-bottom':
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-bounce-to-top':
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-bounce-to-left':
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-bounce-to-right':
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-radial-in':
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-radial-out':
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-rectangle-in':
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-rectangle-out':
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-shutter-in-horizontal':
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-shutter-in-vertical':
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-shutter-out-horizontal':
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-shutter-out-vertical':
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-sweep-to-bottom':
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-sweep-to-top':
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-sweep-to-left':
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-sweep-to-right':
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-overline-from-center':
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-overline-from-left':
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-overline-from-right':
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-overline-reveal':
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-trim':
	                    $('#btnsx-animation-hover-style').remove();
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-underline-from-center':
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-underline-from-left':
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-underline-from-right':
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-underline-reveal':
	                    $('#btnsx-background-color-hover-style').remove();
	                    break;
	                case 'hvr-bounce-in':
	                    $( '#btnsx-animation-hover-style').remove();
	                    break;
	                case 'hvr-back-pulse':
	                    $( '#btnsx-preview .inside' ).prepend( '<style type="text/css" id="btnsx-animation-hover-keyframe">@-webkit-keyframes btnsx-hvr-back-pulse { 50% { background-color: '+bg_hover+'; } } @keyframes btnsx-hvr-back-pulse { 50% { background-color: '+bg_hover+'; } }</style>' );
	                    break;
	                case 'hvr-curl-top-right':
	                    $( '#btnsx-animation-hover-style').remove();
	                    break;
	                case 'hvr-curl-bottom-left':
	                    $( '#btnsx-animation-hover-style').remove();
	                    break;
	                case 'hvr-curl-bottom-right':
	                    $( '#btnsx-animation-hover-style').remove();
	                    break;
	                case 'hvr-curl-top-left':
	                    $( '#btnsx-animation-hover-style').remove();
	                    break;
	                default:
	                    // do nothing
	            }
	        });

	    // Reveal Animation
	        $( '#btnsx_opt_animation_reveal' ).on( 'change', function(e){
	            var preview = $( '#btnsx-preview-btn' );
	            preview.removeClass(function (index, css) {
	                return (css.match (/(^|\s)btnsx-animation-\S+/g) || []).join(' ');
	            });
	            preview.removeClass('btnsx-animated');
	            preview.addClass('btnsx-animation-' + e.target.value + ' btnsx-animated');
	            preview.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
	                preview.removeClass('btnsx-animated');
	            });
	        });

	    // Button Tooltip
	        var tooltipText = $( '#btnsx_opt_tooltip_text' ).val();
	        var tooltipAnimation = $( '#btnsx_opt_tooltip_animation' ).val();
	        if( tooltipAnimation == '' ){
	            tooltipAnimation = 'fade';
	        }
	        var tooltipPosition = $( '#btnsx_opt_tooltip_position' ).val();
	        if( tooltipPosition == '' ){
	            tooltipPosition = 'top';
	        }
	        var tooltipTheme = $( '#btnsx_opt_tooltip_theme' ).val();
	        if( tooltipTheme == '' ){
	            tooltipTheme = 'top';
	        }
	        if( tooltipText !== '' ) {
	            $('#btnsx-preview-btn').tooltipster({
	                content: tooltipText,
	                animation: tooltipAnimation,
	                position: tooltipPosition,
	                delay: 100,
	                theme: tooltipTheme,
	                touchDevices: true,
	                trigger: 'hover',
	                contentAsHTML: true,
	                hideOnClick: true,
	                interactive: true
	            });
	        } else {
	            $('#btnsx-preview-btn').tooltipster({
	                delay: 100,
	                touchDevices: true,
	                trigger: 'hover',
	                contentAsHTML: true,
	                hideOnClick: true,
	                interactive: true
	            });
	        }

	        $('#btnsx_opt_tooltip_text').on('propertychange keyup input',function(){
	            var text = $(this).val();
	            $('#btnsx-preview-btn').tooltipster( 'content', text );
	        });

	        $('#btnsx_opt_tooltip_position').on('change',function(){
	            var option = $(this).val();
	            $('#btnsx-preview-btn').tooltipster( 'option', 'position', option );
	        });

	        $('#btnsx_opt_tooltip_animation').on('change',function(){
	            var option = $(this).val();
	            $('#btnsx-preview-btn').tooltipster( 'option', 'animation', option );
	        });

	        $('#btnsx_opt_tooltip_theme').on('change',function(){
	            var option = $(this).val();
	            $('#btnsx-preview-btn').tooltipster( 'option', 'theme', option );
	        });

	    // Responsive Accordion
	    	$('.btnsx-responsive-accordion').each(function(e){
  				var target = $(this).attr('href');
  				$(target).closest('.col.m12').slideUp('fast');
  				$(this).find('i').removeClass('fa-caret-up').addClass('fa-caret-down');
	    	});
  			$('.btnsx-responsive-accordion').on('click',function(e){
  				e.preventDefault();
  				var $this = $(this);
  				var icon = $this.find('i');
  				var iconUp = icon.hasClass('fa-caret-up');
  				var target = $(this).attr('href');
  				$(target).closest('.col.m12').slideToggle('fast',function(){
  					if(iconUp){
  						icon.removeClass('fa-caret-up').addClass('fa-caret-down');
  					}else{
  						icon.removeClass('fa-caret-down').addClass('fa-caret-up');
  					}
  				});
  			});

  		// Responsive Bar
  			function btnsxResponsiveBtn(type,btn){
  				// Layout
	  				var width = $('#btnsx_opt_'+type+'_width').val();
					if( width != '' ){
						btn.css('width',width+'px');
					}
					var height = $('#btnsx_opt_'+type+'_height').val();
					if( height != '' ){
						btn.css('height',height+'px');
					}

				// Primary Text
					var primaryTxtSize = $('#btnsx_opt_'+type+'_text_font_size').val();
					if( primaryTxtSize != '' ){
						btn.find('.btnsx-text-primary').css('font-size',primaryTxtSize+'px');
					}
					var primaryTxtPadTop = $('#btnsx_opt_'+type+'_text_padding_top').val();
					if( primaryTxtPadTop != '' ){
						btn.find('.btnsx-text-primary').css('padding-top',primaryTxtPadTop+'px');
					}
					var primaryTxtPadBottom = $('#btnsx_opt_'+type+'_text_padding_bottom').val();
					if( primaryTxtPadBottom != '' ){
						btn.find('.btnsx-text-primary').css('padding-bottom',primaryTxtPadBottom+'px');
					}
					var primaryTxtPadLeft = $('#btnsx_opt_'+type+'_text_padding_left').val();
					if( primaryTxtPadLeft != '' ){
						btn.find('.btnsx-text-primary').css('padding-left',primaryTxtPadLeft+'px');
					}
					var primaryTxtPadRight = $('#btnsx_opt_'+type+'_text_padding_right').val();
					if( primaryTxtPadRight != '' ){
						btn.find('.btnsx-text-primary').css('padding-right',primaryTxtPadRight+'px');
					}

				// Secondary Text
					var secondaryTxtSize = $('#btnsx_opt_'+type+'_text_secondary_font_size').val();
					if( secondaryTxtSize != '' ){
						btn.find('.btnsx-text-secondary').css('font-size',secondaryTxtSize+'px');
					}
					var secondaryTxtPadTop = $('#btnsx_opt_'+type+'_text_secondary_padding_top').val();
					if( secondaryTxtPadTop != '' ){
						btn.find('.btnsx-text-secondary').css('padding-top',secondaryTxtPadTop+'px');
					}
					var secondaryTxtPadBottom = $('#btnsx_opt_'+type+'_text_secondary_padding_bottom').val();
					if( secondaryTxtPadBottom != '' ){
						btn.find('.btnsx-text-secondary').css('padding-bottom',secondaryTxtPadBottom+'px');
					}
					var secondaryTxtPadLeft = $('#btnsx_opt_'+type+'_text_secondary_padding_left').val();
					if( secondaryTxtPadLeft != '' ){
						btn.find('.btnsx-text-secondary').css('padding-left',secondaryTxtPadLeft+'px');
					}
					var secondaryTxtPadRight = $('#btnsx_opt_'+type+'_text_secondary_padding_right').val();
					if( secondaryTxtPadRight != '' ){
						btn.find('.btnsx-text-secondary').css('padding-right',secondaryTxtPadRight+'px');
					}

				// Icon
					var iconSize = $('#btnsx_opt_'+type+'_icon_size').val();
					if( iconSize != '' ){
						btn.find('.btnsx-btn-icon').css('font-size',iconSize+'px');
					}
					var dividerSize = $('#btnsx_opt_'+type+'_icon_divider_size').val();
					if( dividerSize != '' ){
						btn.find('.btnsx-divider').css('border-left-width',dividerSize+'px');
					}
					var dividerPos = $('#btnsx_opt_'+type+'_icon_divider_position').val();
					if( dividerPos != '' ){
						btn.find('.btnsx-divider').css('position',dividerPos+'px');
					}
					var iconPadTop = $('#btnsx_opt_'+type+'_icon_padding_top').val();
					if( iconPadTop != '' ){
						btn.find('.btnsx-btn-icon').css('padding-top',iconPadTop+'px');
					}
					var iconPadBottom = $('#btnsx_opt_'+type+'_icon_padding_bottom').val();
					if( iconPadBottom != '' ){
						btn.find('.btnsx-btn-icon').css('padding-bottom',iconPadBottom+'px');
					}
					var iconPadLeft = $('#btnsx_opt_'+type+'_icon_padding_left').val();
					if( iconPadLeft != '' ){
						btn.find('.btnsx-btn-icon').css('padding-left',iconPadLeft+'px');
					}
					var iconPadRight = $('#btnsx_opt_'+type+'_icon_padding_right').val();
					if( iconPadRight != '' ){
						btn.find('.btnsx-btn-icon').css('padding-right',iconPadRight+'px');
					}

				// Padding
					var padTop = $('#btnsx_opt_'+type+'_padding_top').val();
					if( padTop == '0' || padTop != '' ){
						btn.css('padding-top',padTop+'px');
					}
					var padBottom = $('#btnsx_opt_'+type+'_padding_bottom').val();
					if( padBottom == '0' || padBottom != '' ){
						btn.css('padding-bottom',padBottom+'px');
					}
					var padLeft = $('#btnsx_opt_'+type+'_padding_left').val();
					if( padLeft == '0' | padLeft != '' ){
						btn.css('padding-left',padLeft+'px');
					}
					var padRight = $('#btnsx_opt_'+type+'_padding_right').val();
					if( padRight == '0' || padRight != '' ){
						btn.css('padding-right',padRight+'px');
					}
  			}
  			function btnsxResponsiveClone(type){
  				var clone = $('#btnsx-preview-btn').clone().css('display','none').appendTo('#btnsx-preview-container');
				clone.attr('id','btnsx-preview-btn-'+type);
				clone.find('#btnsx-btn-divider').attr('id','btnsx-btn-divider-'+type);
				clone.find('#btnsx-btn-text').attr('id','btnsx-btn-text-'+type);
				clone.find('#btnsx-btn-icon').attr('id','btnsx-btn-icon-'+type);
				clone.find('#btnsx-btn-text-secondary').attr('id','btnsx-btn-text-secondary-'+type);
				btnsxResponsiveBtn(type,$('#btnsx-preview-btn-'+type));
				$('#btnsx-preview-btn').hide();
				$('#btnsx-preview-btn-tablet').hide();
				$('#btnsx-preview-btn-mobile').hide();
				clone.fadeIn();
  			}
  			$('.btnsx-responsive-bar-item').on('click',function(){
  				$('#btnsx-responsive-bar').children().removeClass('active');
  				$(this).addClass('active');
  				var id = $(this).attr('id');
  				if( id == 'btnsx-responsive-bar-tablet' ){
  					if( $('#btnsx-preview-btn-tablet').length <= 0 ){
  						btnsxResponsiveClone('tablet');
  					}else{
  						$('#btnsx-preview-btn-tablet').fadeIn();
  						$('#btnsx-preview-btn-mobile').hide();
  						$('#btnsx-preview-btn').hide();
  					}
  				}else if( id == 'btnsx-responsive-bar-mobile' ){
  					if( $('#btnsx-preview-btn-mobile').length <= 0 ){
  						btnsxResponsiveClone('mobile');
  					}else{
  						$('#btnsx-preview-btn-mobile').fadeIn();
  						$('#btnsx-preview-btn-tablet').hide();
  						$('#btnsx-preview-btn').hide();
  					}
  				}else{
  					$('#btnsx-preview-btn-mobile').hide();
  					$('#btnsx-preview-btn-tablet').hide();
  					$('#btnsx-preview-btn').fadeIn();
  				}
  			});
  			// Realtime Mobile
	  			$('#btnsx_opt_mobile_width').on('propertychange keyup input',function(){
					$('#btnsx-preview-btn-mobile').css('width',$(this).val()+'px');
	  			});
	  			$('#btnsx_opt_mobile_height').on('propertychange keyup input',function(){
					$('#btnsx-preview-btn-mobile').css('height',$(this).val()+'px');
	  			});

	});
	// Display button only after everything is loaded
})(jQuery);