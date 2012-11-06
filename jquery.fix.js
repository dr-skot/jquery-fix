/**
 * jquery-fix 0.1.0
 * 
 * Fix and unfix the position of DOM elements
 *
 * Copyright (c) 2012 Scott Shepherd
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function( $ ){

  var methods = {

    init : function() { 
	return this.each(function(){   
	    // insure fix data, with placeholder and fixed flag
	    var $this = $(this)
	    if (!$this.data('fix')) {
		var placeholder = $('<div class=".fix-placeholder" style="display:none" />');
		placeholder.insertBefore($this);
		$this.data('fix', { fixed: false, placeholder: placeholder });
            }
	});
    },

    // TODO should collect the existing css settings, store them in data, and restore them
    // in unfix
    fix : function() {
	// set explicit measurements first
	this.each(function() {
	    var $this = $(this);
	    var data = $this.data('fix');
	    if (!data.fixed) {
		var css = {
		    top: $this.offset().top, 
		    left: $this.offset().left,
		    width: $this.width(),
		    height: $this.height(),
		}
		data.placeholder.width($this.outerWidth(true)) // true means include margins
		data.placeholder.height($this.outerHeight(true))
		$this.css(css);
	    }
	})
	// then set the position to fixed
	return this.each(function() {
	    var $this = $(this);
	    var data = $this.data('fix');
	    if (!data.fixed) {
		$this.css({ position: 'fixed' });
		data.placeholder.show();
		data.fixed = true;
	    }
	})
    },

    unfix : function() { 
	return this.each(function() {
	    var $this = $(this);
	    var data = $this.data('fix');
	    if (data.fixed) {
		console.log('unfix ')
		console.log($this)
		console.log($this.position())
		data.placeholder.hide();
		$this.css({ top: '', left: '', width: '', height: '', position: '' });
		data.fixed = false;
	    }
	})
    },

    toggle : function() { 
	return this.each(function() {
	    var $this = $(this);
	    var data = $this.data('fix');
	    $this.fix(!data.fixed)
	})
    },

  };

  $.fn.fix = function() {
      methods['init'].apply(this);

      // default action is fix
      if (arguments.length == 0) return methods['fix'].apply(this);

      // toggle if first argument is 'toggle'
      if (arguments[0] === 'toggle') methods['toggle'].apply(this);
      
      // otherwise fix or unfix depending on boolean value of arg 1
      else return methods[arguments[0] ? 'fix' : 'unfix'].apply(this);
      
  };

  // convenience synonym for fix(false)
  $.fn.unfix = function() {
      return this.fix(false);
  };

})( jQuery );

