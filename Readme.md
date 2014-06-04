# Style

Get and set css stylies easier.

You can get computed style value (for transform properties from styles).

``` js
var style = require('style');
style(el).get('rotateX'); // 60 return numberic properties as number
```

To get the number css property, it should be ended with `px` or it's a tranform property.

You can set css with object.

``` js
var style = require('style');
style(el).set( {
  rotate: 60,
  top: -10
});
```

number properties will be suffixed with `px`.

**note**, to gain better performance while scrolling (get styles would cause a reflow), other transform properties will not be preserved!

