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

## API

### style(el | els)

Init with node or nodeList.

### .get(prop)

Get style with css property name. Property name could be javascript style property or properties from `getComputedStyle`.

It should be prefixed if prop name is javascript style property.

### .set(props)

Set style with object, 
