// ****************************************************************************************************
// Last modified on
// 07-MAR-2017
// ****************************************************************************************************
//==================================================================================================
// File name: eventhandler-2.js
//==================================================================================================
//**************************************************************************************************
// TEvent (replacement for Eventhandler)
//**************************************************************************************************
function TEvent(target, options) {
	this.target = target;
	this.callback = $.Callbacks(options);
};

TEvent.prototype.add = function(eventCallback) {
	this.callback.add(eventCallback);
};

TEvent.prototype.remove = function(eventCallback) {
	this.callback.remove(eventCallback);
};

TEvent.prototype.trigger = function(params) {
	this.callback.fire(this.target, params);
	// return this.callback.fireWidth(this.target, params);
};

// TEvent.prototype.trigger2 = function(params, callback) {
	// this.callback.fire(this.target, params);
	// if (typeof(callback) === "function") callback(this.target);
// };

TEvent.prototype.trigger2 = function(params, callback) {
	this.callback.fire(this.target, params);
	if (typeof(params) === "function") params(this.target);
};
