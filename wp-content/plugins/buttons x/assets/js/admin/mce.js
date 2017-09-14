(function() {
	tinymce.PluginManager.add('btnsx_mce_button', function( editor, url ) {
	   	function getValues() {
	    	return editor.settings.btnsxButtonsList;
	   	}
	   	function getSocialValues() {
	    	return editor.settings.btnsxSocialButtonsList;
	   	}
	   	function getDualValues() {
	    	return editor.settings.btnsxDualButtonsList;
	   	}
	   	function getCounterValues() {
	    	return editor.settings.btnsxCounterButtonsList;
	   	}
	   	var Btns = [{
			text: 'Buttons',
			onclick: function() {
				editor.windowManager.open( {
					title: 'Insert Button',
					width: 400,
					height: 100,
					body: [
						{
							type: 'listbox',
							name: 'listboxName',
							label: 'Buttons',
							'values': getValues()
						}
					],
					onsubmit: function( e ) {
						editor.insertContent( '[btnsx id="' + e.data.listboxName + '"]');
					}
				});
			}
		}];
		Btns.push({
			text: 'Dual Buttons',
			onclick: function() {
				editor.windowManager.open( {
					title: 'Insert Dual Button',
					width: 400,
					height: 100,
					body: [
						{
							type: 'listbox',
							name: 'listboxName',
							label: 'Dual Buttons',
							'values': getDualValues()
						}
					],
					onsubmit: function( e ) {
						editor.insertContent( '[btnsx_dual id="' + e.data.listboxName + '"]');
					}
				});
			}
		});
		Btns.push({
			text: 'Social Buttons',
			onclick: function() {
				editor.windowManager.open( {
					title: 'Insert Social Button',
					width: 400,
					height: 100,
					body: [
						{
							type: 'listbox',
							name: 'listboxName',
							label: 'Social Buttons',
							'values': getSocialValues()
						}
					],
					onsubmit: function( e ) {
						editor.insertContent( '[btnsx_social id="' + e.data.listboxName + '"]');
					}
				});
			}
		});
		Btns.push({
			text: 'Social Counters',
			onclick: function() {
				editor.windowManager.open( {
					title: 'Insert Social Counters',
					width: 400,
					height: 100,
					body: [
						{
							type: 'listbox',
							name: 'listboxName',
							label: 'Social Counters',
							'values': getCounterValues()
						}
					],
					onsubmit: function( e ) {
						editor.insertContent( '[btnsx_social_counter id="' + e.data.listboxName + '"]');
					}
				});
			}
		});
		editor.addButton('btnsx_mce_button', {
			icon: 'btnsx-logo dashicons-btnsx-logo',
			tooltip: 'Buttons X',
			type: 'menubutton',
			menu: Btns
		});
	});
})();