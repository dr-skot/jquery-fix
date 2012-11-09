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
    
    // pairs up matching subnodes of two dom elements, and passes each pair to a given function
    var matchChildren = function(orig, clone, fn) {
	var numChildren = orig.children().length;
	for (var i = 0; i < numChildren; i++) {
	    var origChild = orig.children().eq(i);
	    var cloneChild = clone.children().eq(i);
	    fn(origChild, cloneChild);
	    matchChildren(origChild, cloneChild, fn);
	}
    };
    
    // some margins uncollapse when you set position:fixed; this method recollapses them
    var adjustMargins = function(orig, clone) {
	var diff = clone.offset().top - orig.offset().top;
	if (diff != 0) {
	    var margin = parseInt(clone.css('marginTop'));
	    clone.css('marginTop', margin-diff);
	}
	diff = clone.offset().left - orig.offset().left;
	if (diff != 0) {
	    var margin = parseInt(clone.css('marginLeft'));
	    clone.css('marginLeft', margin-diff);
	}
    };

    var matchMargins = function(orig, clone) {
	clone.css('marginTop', orig.css('marginTop'));
	clone.css('marginLeft', orig.css('marginLeft'));
    };
    
    
    var methods = {
	
	fix : function() {
	    // set explicit measurements first
	    this.each(function() {
		var $this = $(this);
		var placeholder = $this.clone().addClass("fix-placeholder").css("opacity", 0);
		$this.width($this.width()).height($this.height());
		$this.css( { top: $this.offset().top,
                             left: $this.offset().left,
                             position: "fixed" });
		placeholder.insertBefore($this);
		$this.data("fix", { placeholder: placeholder });
		adjustMargins(placeholder, $this);
		matchChildren(placeholder, $this, adjustMargins);
	    });
	},
	
	unfix : function() { 
	    return this.each(function() {
		var $this = $(this);
		var data = $this.data("fix");
		if (data) {
		    var placeholder = data.placeholder
		    $this.css({			
			width: placeholder.css('width'),
			height: placeholder.css('height'),
			top: placeholder.css('top'),
			left: placeholder.css('left'),
			position: placeholder.css('position'),
		    });
		    placeholder.remove();
		    matchChildren(placeholder, $this, matchMargins);
		    $this.data("data", null);
		}
	    });
	},
	
	toggle : function() { 
	    return this.each(function() {
		var $this = $(this);
		if ($this.data('fix')) methods.unfix.apply(this);
		else methods.fix.apply(this);
	    })
		},
	
	isFixed : function() {
	    return methods.anyFixed.apply(this);
	},
	
	// TODO return early
	anyFixed : function() {
	    result = false;
	    this.each(function() {
		if ($(this).data('fix')) result = true;
	    });
	    return result;
	},
	
	// TODO return early
	allFixed : function() {
	    result = true;
	    this.each(function() {
		if (!$(this).data('fix')) result = false;
	    });
	    return result;
	},
	
    };
    
    $.fn.fix = function() {
	
	// default action is fix
	if (arguments.length == 0) return methods.fix.apply(this);
	
	// toggle if first argument is 'toggle'
	if (arguments[0] === 'toggle') methods.toggle.apply(this);
	
	// otherwise fix or unfix depending on boolean value of arg 1
	else return methods[arguments[0] ? 'fix' : 'unfix'].apply(this);
	
    };
    
    // convenience synonym for fix(false)
    $.fn.unfix = function() {
	return this.fix(false);
    };
    
})( jQuery );

