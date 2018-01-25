// ****************************************************************************************************
// Last modified on
// 07-MAR-2017
// ****************************************************************************************************
//==================================================================================================
// File name: base-2.js
//==================================================================================================
//**************************************************************************************************
// JTestBase
//**************************************************************************************************
function TBase(params) {
	// this.Control = params;
	// console.log(this)
	if(params) return;
	this.owner = params.owner;
};

TBase.prototype.classID = "TBase";

//**************************************************************************************************
// TObject
//**************************************************************************************************
Class.Inherits(TObject, TBase);
function TObject(params) {
	TObject.prototype.parent.call(this, params);
	if(params == undefined) return;
	
	this.params = $.extend({}, params);
	this.initialize();	
};

TObject.prototype.classID = "JTest";

TObject.prototype.initialize = function() {
	this.events = {};
	// this.events.OnInit = new TEvent(this);
	this.events.OnInit = new EventHandler(this);
	this.events.OnInit.add(function(sender, params, params2) {
		console.log({who:sender, seq:"1", params:params, params2:params2})
	});
	
	Object.defineProperty(this, 'test', {
		get: function() {
			return this.classID;
		},
		set: function(name) {
			this.classID = name
		}
	});
};

//**************************************************************************************************
// JTest
//**************************************************************************************************
Class.Inherits(JTest, TObject);
function JTest(params) {
	JTest.prototype.parent.call(this, params);
};

JTest.prototype.classID = "JTest";

JTest.prototype.initialize = function() {
	JTest.prototype.parent.prototype.initialize.call(this);
	this.events.OnInit.add(function(sender, params, params2) {
		console.log({who:sender, seq:"2", params:params, params2:params2})
	});
};

// JTest.prototype.alert = function(message) {
	// JTest.prototype.parent.prototype.alert.call(this, message); 

	// console.log("this 2");
// };

//**************************************************************************************************
// JTest2
//**************************************************************************************************
// Class.Inherits(JTest2, JTest);
// function JTest2(params) {
	// JTest2.prototype.parent.call(this, params);
// };

// JTest2.prototype.alert = function(message) {
	// JTest2.prototype.parent.prototype.alert.call(this, message); 
	// JTest2.prototype.base(this, alert, message);
	// this.parent.prototype.alert.call(this, message); 
	
	// console.log("this 3 ");
	// console.log(this);
// };
