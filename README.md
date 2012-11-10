# jquery-fix

Simple jQuery plugin for fixing/unfixing the position of DOM elements.

## Installation

```html
<script src="/path/to/jquery.js"></script>
<script src="/path/to/jquery.fix.js"></script>
```

## Usage

Make a div.

```html
<div class="fixable">
  ...
</div>
```

Fix it.

```javascript
$('.fixable').fix()
```

Unfix it.

```javascript
$('.fixable').unfix()
```

`fix` can also take a boolean value; `fix(true)` is the same as `fix()`, and `fix(false)` is the same as `unfix()`.

Toggle it.

```javascript
$('.fixable').fix('toggle')
```

Inquire about it.
```javascript
if ($('.fixable').isFixed()) {
  ...
}
```

`isFixed()` returns true if any element in the selector is fixed. Want to know if *all* of them are fixed? Try `isFixed('all')`.

`fix('anyFixed?')` is a synonym for `isFixed()`. `fix('allFixed?')` is the same as `isFixed('all')`.

## Example

[example.html](https://github.com/dr-skot/jquery-fix/blob/master/example.html)

## Under the hood

Basically `fix` just sets an element's css `position` to `'fixed'`. But because this lifts the element out of the document flow, various adjustments have to be made to insure that fixing the element doesn't change its appearance, or disturb the rest of the page.

**Location and size.** `fix` locks the element's current location and size by explictly setting css `top`, `left`, `width` and `height` to the appropriate values. It also sets `z-index` to 10000.

**Margins.** Collapsed margins may uncollapse when an element is pulled out of the document flow, causing various positioning errors. `fix` corrects this by adjusting margins on the element and its subelements as necessary.

**Placeholder.** To prevent the rest of the document from reflowing when the element is lifted out, `fix` inserts a placeholder into the DOM. The placeholder is a clone of the original element with an opacity of 0. So while you're traversing the DOM keep in mind that this placeholder will be there if you've called `fix`. It and all its subelements are assigned a class of `fix-placeholder`, so you can exclude it from your selectors if you need to:

```javascript
$('.fixable').length;  // call this N
$('.fixable').fix();
$('.fixable').length; // 2 * N, because of placeholders
$('.fixable').not('.fix-placeholder').length; // N
```

Note that the `fix` and `unfix` automatically ignore these placeholders, so it is okay to do this:

```javascript
$('.fixable').fix()
...
$('.fixable').unfix() // same as $('.fixable').not('.fix-placeholder').unfix();
```

When you `unfix` an element, its css style attribute reverts to what it was before you called `fix`, and the placeholder is destroyed. If the margins of its subelements were adjusted, these are restored to their original values.

## Caveats

`fix` stores data in `$(element).data('fix')`. If you don't want to break it, don't mess with this data.

Also `fix` assumes no side effects will be generated when adding the `'fix-placeholder'` class, so do not associate any css styles with this class name.

## Authors

[Scott Shepherd](https://github.com/dr-skot)