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

test('fix creates a placeholder', 4, function () {
    equal(1, $('.fixable').length, "should be one fixable at first");
    $('.fixable').fix();
    equal(2, $('.fixable').length, "should be two after fixing");
    equal(1, $('.fixable.fix-placeholder').length, "placeholder should have a class of fix-placeholder");
    equal(0, $('.fixable.fix-placeholder').css("opacity"), "placeholder should be invisible");
});

})( jQuery );