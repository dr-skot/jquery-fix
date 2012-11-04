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
	    var $this = $(this)
	    var data = $this.data('fix')
	    if (!data) {
		var placeholder = $('<div style="width:100%; display:none"/>');
		placeholder.insertBefore($this);
		data = { fixed: false, placeholder: placeholder };
		$this.data('fix', data)
            }
	    data.placeholder.width($this.width())
	    data.placeholder.height($this.height())
	});
    },

    fix : function() {
	return this.each(function() {
	    var $this = $(this);
	    var data = $this.data('fix');
	    if (!data.fixed) {
		$this.css({ top: $this.position().top, position: 'fixed' });
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
		data.placeholder.hide();
		$this.css({ top: null, position: null });
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

