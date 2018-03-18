
# Comic Quiz Exercise
For best performance, please use Chrome 65

This quiz has been tested in:
* Chrome 65 on Windows 10 and Mac OS High Sierra
* Firefox 59 on Windows 10 and Mac OS High Sierra
* Chrome on Android 8.1 Oreo

Some special things to note about this quiz, were it to be used in production.
This quiz is reliant on:
* HTML template tags, currently supported in all modern browsers (91% worldwide). IE 11 and below do not support the HTML template tag. To support legacy browsers, a check is required to verify that the HTML template tag is supported. This  check is not included.
* CSS grid, which is currently support in all modern browsers (86% worldwide). IE 10 and 11 require prefixes to support CSS grid. CSS grid is mostly (albeit partially) supported in IE 10 and 11.
* ES6 (ES2015) and ES5 code (specifically let, const, forEach, and arrow functions). If IE 11 is an important portion of your site's traffic, I'd recommend using a transpiler, such as Babel, to transpile all ES6 code to ES5. Most of these features are supported in all modern browsers natively, but arrow functions are not supported in IE 11. Let and const are both supported in IE, but no browsers below. forEach is supported in IE 10 and 11, but not below.