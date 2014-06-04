var style = require('style');
var assert = require('assert');

describe('get should works', function () {

  it('should get display', function() {
    var display = style(document.body).get('display');
    assert(display === 'block');
  })

  it('should get border-top-width from computed styles', function() {
    var bt = style(document.body).get('border-top-width');
    assert(bt === 0);
  })

  it('should get width from computed styles', function () {
    var el = document.createElement('div');
    document.body.appendChild(el);
    var w = style(el).get('width');
    var width = window.getComputedStyle(el).width;
    assert(w + 'px' === width);
  });

  it('should get borderTopWidth from styles', function() {
    var el = document.createElement('div');
    document.body.appendChild(el);
    el.style.borderTopWidth = '10px';
    var bt = style(el).get('borderTopWidth');
    assert(bt === 10);
  })


  it('should get rotate and translateX', function () {
    var el = document.createElement('div');
    document.body.appendChild(el);
    el.style.webkitTransform = 'rotate(60deg) translateX(-10px)';
    el.style.transform = 'rotate(60deg) translateX(-10px)';
    var rotate = style(el).get('rotate');
    var translateX = style(el).get('translateX');
    assert(rotate == 60);
    assert(translateX == -10);
  })

  it('should set one transform property', function () {
    var el = document.createElement('div');
    document.body.appendChild(el);
    style(el).set({
      rotate: 60,
      top: 10
    });
    var rotate = style(el).get('rotate');
    var top = style(el).get('top');
    console.log(rotate);
    console.log(top);
    assert(rotate === 60);
    assert(top === 10);
  })

  it('should set two transform properties', function () {
    var el = document.createElement('div');
    document.body.appendChild(el);
    style(el).set({
      opacity: 0,
      rotate: 60,
      translateX: 20
    });
    var rotate = style(el).get('rotate');
    var translateX = style(el).get('translateX');
    var opacity = style(el).get('opacity');
    assert(rotate === 60);
    assert(translateX === 20);
    assert(opacity === 0);
  })
})
