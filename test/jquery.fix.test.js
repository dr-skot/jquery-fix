(function( $ ) {
    
    var before = {
	setup: function () {
	    $("#qunit-fixture")
		.append($('<div class="upper-thing test-item">top</div>'))
		.append($('<div class="fixable test-item">middle</div>'))
		.append($('<div class="under-thing test-item">bottom</div>'));
	}
    };
    
    
    module('basics ', before);
    
    test('fix sets position to fixed', 3, function () {
	var fixables = $('.fixable');
	equal( fixables.css('position'), 'static','position is unfixed at first');
	fixables.fix();
	equal(fixables.css('position'), 'fixed', 'position is fixed after fixing');
	fixables.unfix();
	equal(fixables.css('position'), 'static', 'position is unfixed after unfixing');
    });

    test('fix(true) and fix(false) are the same as fix() and unfix()', 4, function() {
	var fixables = $('.fixable');
	fixables.fix(true)
	equal(fixables.css('position'), 'fixed', 'position is fixed after fix(true)');
	fixables.fix(false);
	equal(fixables.css('position'), 'static', 'position is unfixed after fix(false)');
	var fixables = $('.fixable');
	fixables.fix("arbitrary true value")
	equal(fixables.css('position'), 'fixed', 'position is fixed after fix("arbitrary true value")');
	fixables.fix(0);
	equal(fixables.css('position'), 'static', 'position is unfixed after fix(0)');
    });

    test('fix creates a placeholder', 4, function () {
	equal(1, $('.fixable').length, "one fixable at first");
	$('.fixable').fix();
	equal($('.fixable').length, 2, "two fixables after fixing (1 + clone)");
	equal($('.fixable.fix-placeholder').length, 1, "placeholder has a class of fix-placeholder");
	equal($('.fixable.fix-placeholder').css("opacity"), 0, "placeholder is invisible");
    });
    
    test('placeholders disappear after unfix', 1, function () {
	$('.fixable').fix();
	$('.fixable').unfix();
	equal($('.fixable').length, 1, "only one fixable after unfixing");
    });

    test('cannot fix an already-fixed element', 4, function() {
	fixables = $('.fixable');
	fixables.fix();
	equal($('.fixable').length, 2, "fixable and one placeholder exist after first fix()");
	fixables.fix();
	equal($('.fixable').length, 2, "still only fixable and one placeholder after second fix()");
	fixables.unfix();
	equal($('.fixable').length, 1, "placeholder disappears after unfix()");
	equal(fixables.css('position'), 'static', "position reverts to static after unfix()");
    });
    
    test('cannot fix a placeholder', 3, function() {
	$('.fixable').fix();
	equal($('.fixable.fix-placeholder').length, 1, "one placeholder after fixing fixable");
	$('.fixable.fix-placeholder').fix();
	equal($('.fixable.fix-placeholder').length, 1, "still one placeholder after fixing placeholder");
	equal($('.fixable.fix-placeholder').css('position'), 'static', "placeholder not fixed after fixing it");
    });

    test('cannot fix a subelement of a placeholder', 5, function() {
	$('.fixable').html('<p class="inner-thing">inner thing</p>');
	$('.fixable').fix();
	equal($('.inner-thing').length, 2, "two inner things after fix");
	equal($('.fix-placeholder').find('.inner-thing').length, 1, "one inner thing in the placeholder");
	$('.fix-placeholder').find('.inner-thing').fix();
	equal($('.inner-thing').length, 2, "still only two inner things after fixing placeholder's innner thing");
	equal($('.fix-placeholder').find('.inner-thing').length, 1, "one inner thing in the placeholder");
	equal($('.fix-placeholder').find('.inner-thing').css('position'), 'static', "placeholder's inner thing is not fixed");
    });

    // TODO does not currently pass
    test("'exclude-placeholders' excludes placeholders", 2, function() {
	$('.fixable').fix();
	equal(1, $('.fixable.fix-placeholder').length, "one placeholder after fixing");
	equal(0, $('.fixable.fix-placeholder').fix('excludePlaceholders').length, 
	      "placeholder is excluded by 'exclude-placeholders'");
    });
	 


})( jQuery );