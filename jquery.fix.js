/**
 * jquery-fix 0.1.0
 * https://github.com/dr-skot/jquery-fix
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
	    clone.css('marginTop', margin - diff);
	}
	diff = clone.offset().left - orig.offset().left;
	if (diff != 0) {
	    var margin = parseInt(clone.css('marginLeft'));
	    clone.css('marginLeft', margin - diff);
	}
    };

    var matchMargins = function(orig, clone) {
	clone.css('marginTop', orig.css('marginTop'));
	clone.css('marginLeft', orig.css('marginLeft'));
    };
    
    
    var methods = {
	
	fix : function() {
	    // set explicit measurements first
	    return this.each(function() {
		var $this = $(this);
		// skip placeholders and their contents
		var alreadyFixed = $this.data('fix') != null;
		var inPlaceholder = $this.hasClass('fix-placeholder') ||
		    $this.parents('.fix-placeholder').length > 0
		if (!alreadyFixed && !inPlaceholder) { 
		    var style = $this.attr('style');
		    var placeholder = $this.clone().addClass("fix-placeholder").css({opacity: 0});
		    placeholder.find('*').addClass("fix-placeholder"); // all subelements have this class
		    // lift the original out
		    $this.css( { top: $this.offset().top,
				 left: $this.offset().left,
				 width: $this.width(),
				 height: $this.height(),
				 position: "fixed",
			         zIndex: 10000,
			       });
		    // put the placeholder in
		    placeholder.insertBefore($this);
		    // adjust the margins in the original until its elements line up with placeholder
		    adjustMargins(placeholder, $this);
		    matchChildren(placeholder, $this, adjustMargins);
		    // save the data
		    $this.data("fix", { style: style, placeholder: placeholder });
		}
	    });
	},
	
	unfix : function() { 
	    return this.each(function() {
		var $this = $(this);
		var data = $this.data("fix");
		if (data) {
		    $this.attr('style', data.style || null);
		    var placeholder = data.placeholder;
		    matchChildren(placeholder, $this, matchMargins);
		    placeholder.remove();
		    $this.data('fix', null);
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
		var $this = $(this);
		if (!$this.data('fix') && !methods.isPlaceholder.apply($this)) result = false;
	    });
	    return result;
	},

	isPlaceholder : function() {
	    return this.hasClass('fix-placeholder') || this.parents('.fix-placeholder').length > 0;
	},

	excludePlaceholders : function() {
	    return $.grep(this, function() {
		var $this = $(this);
		var isPlaceholder = $this.hasClass('fix-placeholder');
		var inPlaceholder = $this.parents('.fix-placeholder').length > 0;
		return !isPlaceholder && !inPlaceholder;
	    });
	},
	
    };
    
    $.fn.fix = function() {
	
	// default action is fix
	if (arguments.length == 0) return methods.fix.apply(this);
	
	// toggle if first argument is 'toggle'
	if (arguments[0] === 'toggle') return methods.toggle.apply(this);
	
	// boolean inquiries
	if (arguments[0] === 'anyFixed?') return methods.anyFixed.apply(this);
	if (arguments[0] === 'allFixed?') return methods.allFixed.apply(this);

	// TODO implement
	// exclude placeholders
	// if (arguments[0] === 'excludePlaceholders') return methods.excludePlaceholders.apply(this);
	
	// otherwise fix or unfix depending on boolean value of arg 1
	else return methods[arguments[0] ? 'fix' : 'unfix'].apply(this);
	
    };
    
    // convenience synonym for fix(false)
    $.fn.unfix = function() {
	return this.fix(false);
    };

    $.fn.isFixed = function() {
	return this.fix(arguments[0] === "all" ? "allFixed?" : "anyFixed?");
    };
    
})( jQuery );

