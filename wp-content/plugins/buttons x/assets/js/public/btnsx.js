  /*! WOW - v1.1.2 - 2015-04-07
* Copyright (c) 2015 Matthieu Aussaguel; Licensed MIT */(function(){var a,b,c,d,e,f=function(a,b){return function(){return a.apply(b,arguments)}},g=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};b=function(){function a(){}return a.prototype.extend=function(a,b){var c,d;for(c in b)d=b[c],null==a[c]&&(a[c]=d);return a},a.prototype.isMobile=function(a){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)},a.prototype.createEvent=function(a,b,c,d){var e;return null==b&&(b=!1),null==c&&(c=!1),null==d&&(d=null),null!=document.createEvent?(e=document.createEvent("CustomEvent"),e.initCustomEvent(a,b,c,d)):null!=document.createEventObject?(e=document.createEventObject(),e.eventType=a):e.eventName=a,e},a.prototype.emitEvent=function(a,b){return null!=a.dispatchEvent?a.dispatchEvent(b):b in(null!=a)?a[b]():"on"+b in(null!=a)?a["on"+b]():void 0},a.prototype.addEvent=function(a,b,c){return null!=a.addEventListener?a.addEventListener(b,c,!1):null!=a.attachEvent?a.attachEvent("on"+b,c):a[b]=c},a.prototype.removeEvent=function(a,b,c){return null!=a.removeEventListener?a.removeEventListener(b,c,!1):null!=a.detachEvent?a.detachEvent("on"+b,c):delete a[b]},a.prototype.innerHeight=function(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight},a}(),c=this.WeakMap||this.MozWeakMap||(c=function(){function a(){this.keys=[],this.values=[]}return a.prototype.get=function(a){var b,c,d,e,f;for(f=this.keys,b=d=0,e=f.length;e>d;b=++d)if(c=f[b],c===a)return this.values[b]},a.prototype.set=function(a,b){var c,d,e,f,g;for(g=this.keys,c=e=0,f=g.length;f>e;c=++e)if(d=g[c],d===a)return void(this.values[c]=b);return this.keys.push(a),this.values.push(b)},a}()),a=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(a=function(){function a(){"undefined"!=typeof console&&null!==console&&console.warn("MutationObserver is not supported by your browser."),"undefined"!=typeof console&&null!==console&&console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}return a.notSupported=!0,a.prototype.observe=function(){},a}()),d=this.getComputedStyle||function(a){return this.getPropertyValue=function(b){var c;return"float"===b&&(b="styleFloat"),e.test(b)&&b.replace(e,function(a,b){return b.toUpperCase()}),(null!=(c=a.currentStyle)?c[b]:void 0)||null},this},e=/(\-([a-z]){1})/g,this.WOW=function(){function e(a){null==a&&(a={}),this.scrollCallback=f(this.scrollCallback,this),this.scrollHandler=f(this.scrollHandler,this),this.resetAnimation=f(this.resetAnimation,this),this.start=f(this.start,this),this.scrolled=!0,this.config=this.util().extend(a,this.defaults),this.animationNameCache=new c,this.wowEvent=this.util().createEvent(this.config.boxClass)}return e.prototype.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0,callback:null},e.prototype.init=function(){var a;return this.element=window.document.documentElement,"interactive"===(a=document.readyState)||"complete"===a?this.start():this.util().addEvent(document,"DOMContentLoaded",this.start),this.finished=[]},e.prototype.start=function(){var b,c,d,e;if(this.stopped=!1,this.boxes=function(){var a,c,d,e;for(d=this.element.querySelectorAll("."+this.config.boxClass),e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.all=function(){var a,c,d,e;for(d=this.boxes,e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.boxes.length)if(this.disabled())this.resetStyle();else for(e=this.boxes,c=0,d=e.length;d>c;c++)b=e[c],this.applyStyle(b,!0);return this.disabled()||(this.util().addEvent(window,"scroll",this.scrollHandler),this.util().addEvent(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live?new a(function(a){return function(b){var c,d,e,f,g;for(g=[],c=0,d=b.length;d>c;c++)f=b[c],g.push(function(){var a,b,c,d;for(c=f.addedNodes||[],d=[],a=0,b=c.length;b>a;a++)e=c[a],d.push(this.doSync(e));return d}.call(a));return g}}(this)).observe(document.body,{childList:!0,subtree:!0}):void 0},e.prototype.stop=function(){return this.stopped=!0,this.util().removeEvent(window,"scroll",this.scrollHandler),this.util().removeEvent(window,"resize",this.scrollHandler),null!=this.interval?clearInterval(this.interval):void 0},e.prototype.sync=function(){return a.notSupported?this.doSync(this.element):void 0},e.prototype.doSync=function(a){var b,c,d,e,f;if(null==a&&(a=this.element),1===a.nodeType){for(a=a.parentNode||a,e=a.querySelectorAll("."+this.config.boxClass),f=[],c=0,d=e.length;d>c;c++)b=e[c],g.call(this.all,b)<0?(this.boxes.push(b),this.all.push(b),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(b,!0),f.push(this.scrolled=!0)):f.push(void 0);return f}},e.prototype.show=function(a){return this.applyStyle(a),a.className=a.className+" "+this.config.animateClass,null!=this.config.callback&&this.config.callback(a),this.util().emitEvent(a,this.wowEvent),this.util().addEvent(a,"animationend",this.resetAnimation),this.util().addEvent(a,"oanimationend",this.resetAnimation),this.util().addEvent(a,"webkitAnimationEnd",this.resetAnimation),this.util().addEvent(a,"MSAnimationEnd",this.resetAnimation),a},e.prototype.applyStyle=function(a,b){var c,d,e;return d=a.getAttribute("data-wow-duration"),c=a.getAttribute("data-wow-delay"),e=a.getAttribute("data-wow-iteration"),this.animate(function(f){return function(){return f.customStyle(a,b,d,c,e)}}(this))},e.prototype.animate=function(){return"requestAnimationFrame"in window?function(a){return window.requestAnimationFrame(a)}:function(a){return a()}}(),e.prototype.resetStyle=function(){var a,b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.style.visibility="visible");return e},e.prototype.resetAnimation=function(a){var b;return a.type.toLowerCase().indexOf("animationend")>=0?(b=a.target||a.srcElement,b.className=b.className.replace(this.config.animateClass,"").trim()):void 0},e.prototype.customStyle=function(a,b,c,d,e){return b&&this.cacheAnimationName(a),a.style.visibility=b?"hidden":"visible",c&&this.vendorSet(a.style,{animationDuration:c}),d&&this.vendorSet(a.style,{animationDelay:d}),e&&this.vendorSet(a.style,{animationIterationCount:e}),this.vendorSet(a.style,{animationName:b?"none":this.cachedAnimationName(a)}),a},e.prototype.vendors=["moz","webkit"],e.prototype.vendorSet=function(a,b){var c,d,e,f;d=[];for(c in b)e=b[c],a[""+c]=e,d.push(function(){var b,d,g,h;for(g=this.vendors,h=[],b=0,d=g.length;d>b;b++)f=g[b],h.push(a[""+f+c.charAt(0).toUpperCase()+c.substr(1)]=e);return h}.call(this));return d},e.prototype.vendorCSS=function(a,b){var c,e,f,g,h,i;for(h=d(a),g=h.getPropertyCSSValue(b),f=this.vendors,c=0,e=f.length;e>c;c++)i=f[c],g=g||h.getPropertyCSSValue("-"+i+"-"+b);return g},e.prototype.animationName=function(a){var b;try{b=this.vendorCSS(a,"animation-name").cssText}catch(c){b=d(a).getPropertyValue("animation-name")}return"none"===b?"":b},e.prototype.cacheAnimationName=function(a){return this.animationNameCache.set(a,this.animationName(a))},e.prototype.cachedAnimationName=function(a){return this.animationNameCache.get(a)},e.prototype.scrollHandler=function(){return this.scrolled=!0},e.prototype.scrollCallback=function(){var a;return!this.scrolled||(this.scrolled=!1,this.boxes=function(){var b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],a&&(this.isVisible(a)?this.show(a):e.push(a));return e}.call(this),this.boxes.length||this.config.live)?void 0:this.stop()},e.prototype.offsetTop=function(a){for(var b;void 0===a.offsetTop;)a=a.parentNode;for(b=a.offsetTop;a=a.offsetParent;)b+=a.offsetTop;return b},e.prototype.isVisible=function(a){var b,c,d,e,f;return c=a.getAttribute("data-wow-offset")||this.config.offset,f=window.pageYOffset,e=f+Math.min(this.element.clientHeight,this.util().innerHeight())-c,d=this.offsetTop(a),b=d+a.clientHeight,e>=d&&b>=f},e.prototype.util=function(){return null!=this._util?this._util:this._util=new b},e.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},e}()}).call(this);

/**
 * http://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen
 * @since  1.7.8
 * @param  {string}  url
 * @param  {string}  title
 * @param  {string}  w
 * @param  {string}  h
 * @return {object} winref
 */
function btnsxPopupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}

function btnsx_share_iframe( link, w, h ){
    var width, height;
    if( !(w) ){
        width = (((window.innerWidth)*60)/100);
    }else{
        width = w;
    }
    if( !(h) ){
        height = (((window.innerHeight)*40)/100);
    }else{
        height = h;
    }
    return !btnsxPopupCenter(link, 'Buttons X', width, height);
}

jQuery( document ).ready( function($) {
    var $btn = $('.btnsx-btn');
    var fontArr = [];
    $btn.each( function() {
        var viewSize = $( window ).width();

        // Google Fonts
            var id = $( this ).attr( 'id' );
            var baseFonts = ['Inherit', 'Arial', 'Bookman Old Style', 'Comic Sans MS', 'Courier', 'Garamond', 'Georgia', 'Helvetica', 'Impact', 'MS Sans Serif', 'MS Serif', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana'];
            var font = $(this).data( 'font-primary' );
            var fontWeight = $(this).data('font-primary-weight');
            if(!fontWeight){
                fontWeight = '400';
            }
            var font2 = $( this ).data( 'font-secondary' );
            var font2Weight = $(this).data('font-secondary-weight');
            var $head = $( 'head' );
            var $headlinklast = $head.find( 'link[rel="stylesheet"]:last' );
            if( font != null ){
                font = font.replace(' ', '+');
                if( font.indexOf(fontArr) != -1 ){
                    fontArr.push(font);
                    if( $.inArray( font, baseFonts ) < 0 ){
                        var linkElement = '<link rel="stylesheet" type="text/css" id="' + id + '-gfont" href="https://fonts.googleapis.com/css?family=' + font + ':'+ fontWeight +'">';
                        if ( $headlinklast.length ) {
                            $headlinklast.after( linkElement) ;
                        } else {
                            $head.append( linkElement );
                        }
                    }
                }
            }
            if( font2 != null ){
                font2 = font2.replace(' ', '+');
                if( $.inArray( font2, fontArr ) < 0 ){
                    fontArr.push(font2);
                    if( $.inArray( font2, baseFonts ) < 0 ){
                        var linkElement = '<link rel="stylesheet" type="text/css" id="' + id + '-gfont" href="https://fonts.googleapis.com/css?family=' + font2 + ':'+ font2Weight +'">';
                        if ( $headlinklast.length ) {
                            $headlinklast.after( linkElement );
                        }
                        else {
                            $head.append( linkElement );
                        }
                    }
                }
            }

        // Menu Toggle
            var btn = $(this);
            var btnParent = $(this).parent();
            var btnMenu = $(this).attr('id')+'-dropdown';
            if( btn.attr('data-toggle-hover') ){
              btnParent.on('mouseenter', function(){
                $('#'+btnMenu).stop( true, true ).fadeIn(100);
                $(this).toggleClass('btnsx-open');
              });
              btnParent.on('mouseleave', function(){
                $('#'+btnMenu).stop( true, true ).fadeOut('fast');
                $(this).toggleClass('btnsx-open');
              });
            } else if ( btn.attr('data-toggle') ) {
              btn.on('click',function(){
                if( btnParent.hasClass('btnsx-open') ) {
                  $('#'+btnMenu).stop( true, true ).fadeOut('fast');
                }else{
                  $('#'+btnMenu).stop( true, true ).fadeIn(100);
                }
              });
            }

        // To Top
            if( $( this ).hasClass( 'btnsx-top' ) ){
                $( this ).on( 'click', function(){
                    $( 'html, body' ).animate({ scrollTop: 0 }, 'fast');
                });
            }

        // Animations
            // click animation
            $( this ).on( 'click', function(){
                var animation = $( this ).data( 'animation' );
                if( animation != 'click' )
                    return;
                var animationType = $( this ).data( 'animationType' );
                if( animationType != null ){
                    $( this ).animation();
                }
            });

            // hover animation
                // Icon Image
                var iconImg = $( this ).find( '.btnsx-icon-img' ).attr( 'src' );
                var iconImgHover = $( this ).find( '.btnsx-icon-img' ).data( 'hover' );
            $( this ).on( 'mouseenter', function(e){
                e.preventDefault();
                if( iconImgHover != '' ) {
                    $(this).find( '.btnsx-icon-img' ).attr( 'src', iconImgHover );
                }
                var animation = $( this ).data( 'animation' );
                if( animation != 'hover' )
                    return;
                var animationType = $( this ).data( 'animationType' );
                if( animationType != null ){
                    // var btnIconClass = '.btnsx-icon';
                    // var animationType = jQuery( this ).data( 'animationType' );
                    $( this ).animation();
                }
            });

            $( this ).on( 'mouseleave', function(e){
                e.preventDefault();
                if( iconImg != '' ) {
                    $(this).find( '.btnsx-icon-img' ).attr( 'src', iconImg );
                }
            });

        // Google Analytics ???
            $( this ).on( 'click', function(e){
                var analytics = $( this ).data( 'ga' );
                var id = $( this ).attr( 'id' );
                if( analytics != 'true' )
                    return;
                var eventCategory = $( this ).data( 'gaCategory' );
                if( eventCategory != '' ) {
                    eventCategory = eventCategory;
                }
                var eventLabel = $( this ).data( 'gaLabel' );
                if( eventLabel != '' ) {
                    eventLabel = eventLabel;
                }
                var eventValue = $( this ).data( 'gaValue' );
                if( eventValue != '' ) {
                    eventValue = eventValue;
                }
                var nonInteraction = $( this ).data( 'gaNoninteraction' );
                if( nonInteraction != '' ) {
                    nonInteraction = nonInteraction;
                }
                ga( 'send', {
                  'hitType': 'event',          // Required.
                  'eventCategory': eventCategory,   // Required.
                  'eventAction': 'click',      // Required.
                  'eventLabel': eventLabel,
                  'eventValue': eventValue,
                  'nonInteraction': nonInteraction
                });
            });

        // Reveal Animation
          wow = new WOW(
            {
              boxClass:     'btnsx-reveal',      // default
              animateClass: 'btnsx-animated', // default
              offset:       0,          // default
              mobile:       true,       // default
              live:         true        // default
            }
          )
          wow.init();
    });
    var fbEl = $('.btnsx-social-fb').length;
    // Facebook Script
      if( fbEl > 0 ) {
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }
    var twEl = $('.btnsx-social-tw').length;
    // Twitter Script
      if( twEl > 0 ) {
        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
      }
    var gpEl = $('.btnsx-social-gp').length;
    // Google Plus Script
      if( gpEl > 0 ) {
        (function() {
            var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
            po.src = 'https://apis.google.com/js/platform.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
        })();
      }
    var liEl = $('.btnsx-social-li').length;
    // LinkedIn Script
      if( liEl > 0 ) {
        $.getScript( 'https://platform.linkedin.com/in.js' );
      }
    $btn.on("click",function(e){
        // stop navigation if it is morphing button
        var btnType = $(this).data('type');
        if( btnType == 'btnsx-morph' ){
            e.preventDefault();
        }
        // auto add to cart for woocommerce
        var addToCart = $btn.data('addtocart');
        if( addToCart ){
            var str = jQuery("form.cart").serialize();
            var link = $(this).attr("href") + "?&" + str;
            $(this).attr("href",link);
        }
    });
});
jQuery.fn.extend({
    animation: function () {
        var btnId = jQuery(this);
        var btnIconClass = '.btnsx-icon';
        var animationType = jQuery( this ).data( 'animationType' );
        btnId.find( btnIconClass ).addClass( 'btnsx-animation-' + animationType + ' btnsx-animated' );
        btnId.bind( 'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function () {
            btnId.find( btnIconClass ).removeClass(function (index, css) {
                return (css.match(/(^|\s)btnsx-animation-\S+/g) || []).join(' ');
            });
        });
    },
    dividerResponsiveness: function ( viewSize, icon, iconDivider, iconDividerOrigPos, iconPadTop, padLeft, padRight, iconFloat, iconOW ) {
        if( viewSize <= '1100' ) {
            var iconPadTopOrig = iconPadTop;
            var iconPadTop = + iconPadTop + 4;
            if( iconDivider.length > 0 ) {
                if( iconFloat === 'none' || iconFloat === 'left' ) {
                    var iconDividerPos = + padLeft + iconOW;
                    iconDivider.css( 'left', iconDividerPos );
                }
            }
            if( iconFloat === 'left' ) {
                icon.css( 'padding-top', iconPadTop );
            }
            if( iconFloat === 'right' ) {
                if( iconDivider.length > 0 ) {
                    var btnWidth = $( this ).outerWidth();
                    var iconDividerPos = + padRight + iconOW;
                    var combinedWidth = + btnWidth - iconDividerPos;
                    iconDivider.css({
                        'left': combinedWidth
                    });
                }
                icon.css( 'padding-top', iconPadTop );
            }
        } else {
            var iconPadTopOrig = iconPadTop;
            iconDivider.css( 'left', iconDividerOrigPos );
            icon.css( 'padding-top', iconPadTopOrig );
        }
    }
});
// Button Dropdown
  +function ($) {
    'use strict';

    // DROPDOWN CLASS DEFINITION
    // =========================

    var backdrop = '.btnsx-dropdown-backdrop'
    var toggle   = '[data-toggle="btnsx-dropdown"]'
    var Dropdown = function (element) {
      $(element).on('click.bs.dropdown', this.toggle)
    }

    Dropdown.VERSION = '3.3.5'

    function getParent($this) {
      var selector = $this.attr('data-target')

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
      }

      var $parent = selector && $(selector)

      return $parent && $parent.length ? $parent : $this.parent()
    }

    function clearMenus(e) {
      if (e && e.which === 3) return
      $(backdrop).remove()
      $(toggle).each(function () {
        var $this         = $(this)
        var $parent       = getParent($this)
        var relatedTarget = { relatedTarget: this }

        if (!$parent.hasClass('btnsx-open')) return

        if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

        $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

        if (e.isDefaultPrevented()) return

        $this.attr('aria-expanded', 'false')
        $parent.removeClass('btnsx-open').trigger('hidden.bs.dropdown', relatedTarget)
      })
    }

    Dropdown.prototype.toggle = function (e) {
      var $this = $(this)

      if ($this.is('.disabled, :disabled')) return

      var $parent  = getParent($this)
      var isActive = $parent.hasClass('btnsx-open')

      clearMenus()

      if (!isActive) {
        if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
          // if mobile we use a backdrop because click events don't delegate
          $(document.createElement('div'))
            .addClass('btnsx-dropdown-backdrop')
            .insertAfter($(this))
            .on('click', clearMenus)
        }

        var relatedTarget = { relatedTarget: this }
        $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

        if (e.isDefaultPrevented()) return

        $this
          .trigger('focus')
          .attr('aria-expanded', 'true')

        $parent
          .toggleClass('btnsx-open')
          .trigger('shown.bs.dropdown', relatedTarget)
      }

      return false
    }

    Dropdown.prototype.keydown = function (e) {
      if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

      var $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      var $parent  = getParent($this)
      var isActive = $parent.hasClass('btnsx-open')

      if (!isActive && e.which != 27 || isActive && e.which == 27) {
        if (e.which == 27) $parent.find(toggle).trigger('focus')
        return $this.trigger('click')
      }

      var desc = ' li:not(.disabled):visible a'
      var $items = $parent.find('.dropdown-menu' + desc)

      if (!$items.length) return

      var index = $items.index(e.target)

      if (e.which == 38 && index > 0)                 index--         // up
      if (e.which == 40 && index < $items.length - 1) index++         // down
      if (!~index)                                    index = 0

      $items.eq(index).trigger('focus')
    }


    // DROPDOWN PLUGIN DEFINITION
    // ==========================

    function Plugin(option) {
      return this.each(function () {
        var $this = $(this)
        var data  = $this.data('bs.dropdown')

        if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
        if (typeof option == 'string') data[option].call($this)
      })
    }

    var old = $.fn.dropdown

    $.fn.dropdown             = Plugin
    $.fn.dropdown.Constructor = Dropdown


    // DROPDOWN NO CONFLICT
    // ====================

    $.fn.dropdown.noConflict = function () {
      $.fn.dropdown = old
      return this
    }


    // APPLY TO STANDARD DROPDOWN ELEMENTS
    // ===================================

    $(document)
      .on('click.bs.dropdown.data-api', clearMenus)
      .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
      .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
      .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
      .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)
  }(jQuery);
// Gravity Forms Trigger
    jQuery(document).ready(function($){
        $("body").on("click",".btnsx-gravity-form",function(e){
            e.preventDefault();
            $(this).unbind('click');
            if( $(this).next("button[id*='gform']").length > 0 ){
                $(this).next('button').trigger("click");
            }
            if( $(this).parent().next("button[id*='gform']").length > 0 ){
                $(this).parent().next('button').trigger("click");
            }
            if( $(this).parent().parent().next("button[id*='gform']").length > 0 ){
                $(this).parent().parent().next('button').trigger("click");
            }
        });
    });
