# jquery-fix

Simple jQuery plugin for fixing/unfixing the position of DOM elements.

## Installation

Include script after the jQuery library (unless you are packaging scripts somehow else):

    <script src="/path/to/jquery-fix.js"></script>

## Usage

Make a div

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

`fix` can also take a boolean value; `fix(true)` is the same as `fix()`, and `fix(false)` is equivalent to `unfix()`.

## Example

See `example.html`

## How it works

Basically `fix` just sets css `position` to `'fixed'` and `top` to whatever the element's top is. But this the element out of the document flow, so in order to prevent reflowing `fix` inserts an invisible placeholder into the DOM. When you `unfix`, it hides but does not remove this placeholder.

`fix` stores data in `$(element).data('fix')`. If you don't want to break it, don't mess with this data.

## Issues

Only sure this works with jquery 1.3.2

## Authors

[Scott Shepherd](https://github.com/dr-skot)