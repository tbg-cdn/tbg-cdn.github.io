Extension Name: AMP for WPtouch
Extension URI: http://www.wptouch.com/extensions/amp
Author: BraveNewCode Inc.
Description: Add Google Accelerated Mobile Pages support to your website integrated with WPtouch, zero configuration required.
Version: 1.1.7
Depends-on: 4.1

== Long Description ==

The Accelerated Mobile Pages (AMP) extension adds support for Google's lightning-fast mobile post reading format and enhances the AMP for WordPress plugin if installed. Your mobile theme's branding settings are automatically applied.

Includes the AMP for WordPress plugin (https://github.com/Automattic/amp-wp/) if you’re not already using it.

Mobile themes can use the wptouch_amp_inject_css( $additional_css ) filter to inject CSS into the stylesheet

== Changelog ==

= Version 1.1.7 =

* Fixed: Better compatibility with NextGEN Gallery (prevent JavaScript from being forced into footer)

= Version 1.1.6 =

* Fixed: CDATA tag is now removed from ld+json type Javascript elements

= Version 1.1.5 =

* Allow ld+json type JavaScript elements

= Version 1.1.4 =

* Changed: Replace call to foundation_get_settings()

= Version 1.1.3 =

* Changed: Display of featured image in header now controllable by mobile theme settings
* Changed: Rich snippet metadata no longer output if featured image is not large enough for spec

= Version 1.1.2 =

* Added: AMP extension prevents output of rich snippet metadata if no featured image is present
* Added: Tools for debugging
* Changed: Improved font support when using default font pairings

= Version 1.1.1 =

* Added: AMP extension disables display when no site icon has been selected to avoid AMP format errors

= Version 1.1 =

* Added: RTL support
* Added: Luma-corrected site name colour for sites using a light header background
* Fixed: Compatibility with Nextgen Gallery (prevent JavaScript from being forced into footer)

= Version 1.0 =

* Initial release
* Embeds Google AdSense ad as configured in the Basic Ads extension
* Applies Google Fonts selected via basic font pairings and the Advanced Type Extension
* Applies colors selected for active mobile theme
* Includes support for ads from the Basic Ads and Multi-Ads extensions
* Includes AMP for WordPress 0.3.2
