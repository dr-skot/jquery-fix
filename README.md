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

Toggle it.

```javascript
$('.fixable').fix('toggle')
```

`fix` can also take a boolean value; `fix(true)` is the same as `fix()`, and `fix(false)` is the same as `unfix()`. Any argument besides `'toggle'` is evaluated as a boolean.

## Example

[example.html](https://github.com/dr-skot/jquery-fix/blob/master/example.html)

## Under the hood

Basically `fix` just sets css `position` to `'fixed'` and `top` to where the element's top is. But this pulls the element out of the document flow; to prevent reflowing, `fix` inserts a blank placeholder into the DOM, just before the element being fixed. When you `unfix`, it hides but does not remove this placeholder. So when you're traversing the DOM keep in mind that the placeholder will be there if you've called `fix` (or `unfix`). It's assigned a class of `fix-placeholder`, so you can easily exclude it from your selectors if you need to.

`fix` stores data in `$(element).data('fix')`. If you don't want to break it, don't mess with this data.

## Issues

Only sure this works with jQuery 1.3.2 right now.

## Authors

[Scott Shepherd](https://github.com/dr-skot)