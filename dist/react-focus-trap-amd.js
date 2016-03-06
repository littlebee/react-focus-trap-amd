(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactFocusTrapAmd"] = factory(require("react"));
	else
		root["ReactFocusTrapAmd"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	ReactFocusTrap = __webpack_require__(2);

	module.exports = ReactFocusTrap;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var FocalPoint = __webpack_require__(3);
	var React = __webpack_require__(4);

	var FocusTrap = React.createClass({
	  displayName: 'FocusTrap',

	  propTypes: {
	    active: React.PropTypes.bool,
	    onExit: React.PropTypes.func
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      active: true,
	      className: 'focus-trap',
	      role: 'dialog'
	    };
	  },

	  render: function render() {
	    var _props = this.props;
	    var active = _props.active;
	    var className = _props.className;
	    var children = _props.children;
	    var element = _props.element;
	    var onExit = _props.onExit;
	    var role = _props.role;

	    if (!active) return null;

	    return React.createElement('div', { className: className + '-wrapper', onKeyUp: this._onKeyUp, role: role }, React.createElement('div', { 'aria-hidden': 'true', className: className + '-backdrop', onClick: onExit }), React.createElement(FocalPoint, { ref: 'focus', className: className, element: element }, children));
	  },

	  _onKeyUp: function _onKeyUp(e) {
	    if (e.key === 'Escape' && 'onExit' in this.props) {
	      this.props.onExit();
	    }
	  }
	});

	module.exports = FocusTrap;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * FocalPoint
	 * The container that will maintain focus
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	function _objectWithoutProperties(obj, keys) {
	  var target = {};for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	  }return target;
	}

	var React = __webpack_require__(4);
	var stack = [];
	var timer = null;

	/**
	 * To support server-side rendering, do not push the active element
	 * when not in the browser environment
	 */
	if (typeof document !== 'undefined' && document.activeElement) {
	  stack.push(document.activeElement);
	}

	var FocalPoint = React.createClass({
	  displayName: 'FocalPoint',

	  getDefaultProps: function getDefaultProps() {
	    return {
	      element: 'div',
	      tabIndex: '0'
	    };
	  },

	  contains: function contains(element) {
	    return this.refs.root.contains(element);
	  },

	  focus: function focus() {
	    return this.refs.root.focus();
	  },

	  trapFocus: function trapFocus(e) {
	    clearTimeout(timer);
	    timer = setTimeout(function (_) {
	      return stack[stack.length - 1].focus();
	    }, 10);
	  },

	  returnFocus: function returnFocus() {
	    var anchor = this.state.anchor;

	    // When transitioning between pages using hash route state,
	    // this anchor is some times lost. Do not attempt to focus
	    // on a non-existent anchor.
	    if (anchor && (typeof anchor === 'undefined' ? 'undefined' : _typeof(anchor)) === 'object' && typeof anchor.focus === 'function') {
	      anchor.focus();
	    }
	  },

	  componentDidMount: function componentDidMount() {
	    stack.push(this);

	    this.setState({ anchor: document.activeElement });
	    this.trapFocus();

	    document.addEventListener('focus', this._onBlur, true);
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    var _this = this;

	    stack = stack.filter(function (i) {
	      return i !== _this;
	    });

	    document.removeEventListener('focus', this._onBlur, true);

	    clearTimeout(timer);

	    this.returnFocus();
	  },

	  render: function render() {
	    var _props = this.props;
	    var children = _props.children;
	    var Element = _props.element;

	    var safe = _objectWithoutProperties(_props, ['children', 'element']);

	    return React.createElement(Element, _extends({ ref: 'root' }, safe), children);
	  },

	  _onBlur: function _onBlur(event) {
	    var current = stack[stack.length - 1];

	    if (current && current.contains(event.target) === false) {
	      event.preventDefault();
	      this.trapFocus();
	    }
	  }
	});

	module.exports = FocalPoint;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }
/******/ ])
});
;