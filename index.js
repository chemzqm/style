var style = window.getComputedStyle
  || window.currentStyle;

var allStyles = style(document.documentElement, ''),
allStyles = Array.prototype.slice.call(allStyles);

//so we can get the css prefix only once
var prefix = (function () {
  var pre = (allStyles.join('')
      .match(/-(moz|webkit|ms)-/) || (allStyles.OLink === '' && ['', 'o'])
    )[1];
  return {
    css: '-' + pre + '-',
    js: pre
  }
})();

var stylesMap = (function () {
  var map = {};
  allStyles.forEach(function(prop) {
    if (prop.indexOf(prefix.css) === 0) {
      map[prop.replace(prefix.css,'')] = prop;
    } else {
      map[prop] = prop;
    }
  })
  return map;
})();

var transformProps = ['rotate', 'rotateX', 'rotateY', 'rotateZ',
  'translate', 'translateX', 'translateY', 'translateZ',
  'skew', 'skewX', 'skewY'];

module.exports = Style;

function Style(el) {
  var v;
  var transforms = [];
  var _props = {};
  var isList = (typeof el.length !== 'undefined');
  var els = isList ? el : [el];
  return {
    set: function(props) {
      for (var prop in props) {
        var v = props[prop];
        if (/^rotate/.test(prop)) {
          v = v + 'deg';
        } else if (typeof v === 'number' && prop !== 'opacity') {
          v = v + 'px';
        }
        if (transformProps.indexOf(prop) !== -1) {
          transforms.push(prop + '(' + v + ')');
        } else {
          _props[stylesMap[prop]] = v;
        }
      }
      if (transforms.length) {
        _props[prefix.js + 'Transform'] = transforms.join(' ');
      }
      els.forEach(function(el) {
        //set all properties once
        for (var p in _props) {
          el.style[p] = _props[p];
        }
      })
    },
    get: function (prop) {
      var node = els[0];
      v = node.style[prop];
      if (v) return parseProperty(v);
      if (transformProps.indexOf(prop) !== -1) {
        var transform = node.style[prefix.js + 'Transform'];
        if (!transform) return;
        var reg = new RegExp(prop + '\\((.+?)\\)');
        v = transform.match(reg)[1];
        return /,/.test(v)? v: parseInt(v, 10);
      }
      var p = stylesMap[prop];
      if (!p) throw new Error('css ' + prop + ' is not supported');
      v = style(node).getPropertyValue(p);
      return parseProperty(v);
    }
  }
}

function parseProperty(v) {
  return (/^-?\d+(px|s)?$/.test(v)) ? parseInt(v, 10) : v;
}
