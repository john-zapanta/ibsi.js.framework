//==================================================================================================
// File name: utils.js
// 12-FEB-2015 ihms.1.0.0.6
//==================================================================================================
function alerts(s) {
    var ret = "";
    var c = arguments.length;
    for (var x = 0; x < c; x++) {
       if(ret == "") {
           ret = arguments[x]
       } else {
           ret = ret +"\n"+ arguments[x];
       };
    };

    alert(ret);
    return ret
};

if(typeof Array.prototype.indexOf !== 'function') {
    Array.prototype.indexOf = function(s) {
        return $.inArray(s, this);
    };
};

if(typeof Array.prototype.pushUnique !== 'function') {
    Array.prototype.pushUnique = function(v, callback) {
		if(this.indexOf(v) == -1) {
			this.push(v);
			if(callback) {
				callback(v);
			}
		};
    };
};

if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  };
};

String.prototype.splitInt= function(del) {
	var ArrayData = $.map(this.split(del), function(value){
	    return parseInt(value, 10);
	    // or return +value; which handles float values as well
	});
	
	return ArrayData;
};

String.prototype.format = function(s) {
    var str = this.toString();
    var c = arguments.length;
    for (var x = 0; x < c; x++) {
       str = str.replaceAll("{"+(x)+"}", arguments[x]);
//     str = str.replace("{"+(x)+"}", arguments[x]);
    };

    return str.replace(/ +(?= )/g,"").trim();
};

String.prototype.replaceAll = function(str1, str2, ignore)
{
   return this.replace(new RegExp(str1.replace(/([\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, function(c){return "\\" + c;}), "g"+(ignore?"i":"")), str2);
};

String.prototype.replaceAt = function(index, character) {
      return this.substr(0, index) + character + this.substr(index+character.length);
};

Number.prototype.formatMoney = function(zeroPrefix) {
	var len = 32;
	var noLimit = false;
	var f;
	
	if(this == null) {
		return "";
	};

	if(zeroPrefix === undefined) {
		zeroPrefix = "0";		
		noLimit = true;
		f = parseFloat(this);
	} else {
		len = zeroPrefix.length;
		f = parseFloat(this).toFixed(len);
	};
	
	var parts = f.toString().split(".");
	if(noLimit) {
		return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
	} else {
		return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + (parts[1] ? parts[1] : zeroPrefix);
	}
};

Number.prototype.strZero = function(width) {
    var n = Math.abs(this);
    var zeros = Math.max(0, width - Math.floor(n).toString().length );
    var zeroString = Math.pow(10,zeros).toString().substr(1);
    if( this < 0 ) {
        zeroString = '-' + zeroString;
    };

    return zeroString+n;
};

function DefaultValue(v, def) {
    if(v == null) {
        return def
    } else {
        return v;
    };
};

function defaultValue(v, def) {
	return v == undefined ? def : v;
};

function GetPathName() {
    var Paths = window.location.pathname.split("/");
    if(Paths[0] == "") {
        Paths.splice(0,1);
    };

    return "/"+Paths.join("/");
};

function GetRequestParams() {
  var searchString = window.location.search.substring(1)
    , params = searchString.split("&")
    , hash = {}
    ;

  for (var i = 0; i < params.length; i++) {
    var val = params[i].split("=");
    hash[unescape(val[0])] = unescape(val[1]);
  }
  return hash;
};

function GetUrlRequestParamsObject(url) {
	var requestParams2 = url.split("?");
	var requestParams = requestParams2.length > 1 ? requestParams2[1] : "";
	// var searchString = requestParams;
    var params = requestParams.split("&");
    var hash = {};

  for (var i = 0; i < params.length; i++) {
    var val = params[i].split("=");
    hash[unescape(val[0])] = unescape(val[1]);
  }
  
  return hash;
};

function RequestParamsToObject(requestParams) {
  var searchString = requestParams
    , params = searchString.split("&")
    , hash = {}
    ;

  for (var i = 0; i < params.length; i++) {
    var val = params[i].split("=");
    hash[unescape(val[0])] = unescape(val[1]);
  }
  return hash;
};

function ObjectToRequestParams(params) {
	var Params = [];
	for(var Name in params) {
			Params.push(Name +"="+ params[Name]);
	};

	return Params.join("&");
};

function HttpRequestParams(encode) {
    var aParams = [];
    var Encode = encode;

    this.Add = function(Name, Value, NoEncode) {
//      aParams[Name] = encodeURI(Value);
//      aParams[Name] = encodeURIComponent(Value);

        if(Encode) {
            aParams[Name] = encodeURIComponent(Value)
       } else {
            aParams[Name] = Value;
       };
    };

    this.QueryString = function(delimeter) {
        var Params = [];
        for(var Name in aParams) {
            Params.push(Name +"="+ aParams[Name]);
        };

        return Params.join(delimeter ? delimeter : "&");
//        return Params.join(If(delimeter, delimeter, "&"));
    };
};

function CreateElement(type, parent, id, css) {
    var isPassword = type.toLowerCase() == "password";
    if(isPassword) {
        type = "input";
    };

    var element = $("<" + type + ">");
    if(type.toLowerCase() == "iframe") {
        element.attr("frameBorder", 0)
    };
    if(isPassword) {
        $(element)[0].setAttribute("type", "password");
    };
    if(parent) { $(parent).append(element) };
    if(id) { element.attr("id", id) };
    if(css) { element.addClass(css) };

    return element;
};

function CreateElementEx(type, parent, callback, css) {
    var e = CreateElement(type, parent);
	if(css) {
		e.addClass(css);
	}
	
	if(callback) { 
		callback(e);
	}
	
    return e;
};

function GetSvg(e, svg, size, base) {
	desktop.GetSvg(svg, {
		base: base,
		init: function(params) {
			params.size = size;
		},
		result: function(data) {
			e.html(data)
		}
	});
}
;
function supportStorage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}//==================================================================================================
// File name: base.js
//==================================================================================================
// http://javascript.crockford.com/prototypal.html
var Class = new __Class();

function __Class() {
};

__Class.prototype.Inherits = function(C, P) {
    C.prototype = new P();
    C.prototype.constructor = C;
    C.prototype.parent = P;
	
	// if(C.prototype.version == 2)
		// console.log({name:C.name, ancestor:P.name});
};

//**************************************************************************************************
// jObject
//**************************************************************************************************
function jObject(params) {
    if (params == undefined) {		
		return;
	}
	
	this.initialize(this.params = params);
	// this.initEvents(this.events = {})
	// this.initMethods(this.methods = new MethodHandler(this))
	
	// if (params.init) 
		// params.init(this)
	
	// this.events.OnInit.trigger(function(sender) {
		// sender.afterInitialize();
	// });
	
	this.events.OnPreInit.trigger2(function(sender) {
		sender.events.OnInit.trigger2(function(sender) {
			sender.afterInitialize();
		});
	});
	
	// this.afterInitialize();
}

jObject.prototype.version = 2;
jObject.prototype.classID = "jObject";

jObject.prototype.debug = function(message) {
	var debugMsg = {
		at: this.classID,
		debug: message
	};
	
	console.log(debugMsg)
};

jObject.prototype.logTimeout = function(timeout, message) {
	var self = this;
	setTimeout(function() {
		self.log(message);
	}, timeout);
};

jObject.prototype.initialize = function(params) {
	this.log = this.debug; // I really prefer log instead of debug
	
	this.id = params.id;
	this.creator = params.creator;
	
	this.events = {};
	this.methods = new MethodHandler(this);
	
	this.events.OnPreInit = new EventHandler(this);
	this.events.OnPreInit.add(function(sender) {
		// sender.debug(sender.classID)
		if (sender.params.init) {
			sender.params.init(sender);
		}
	});
	
	this.events.OnInit = new EventHandler(this);
	
	// this.initEvents(this.events = {})
	// this.initMethods(this.methods = new MethodHandler(this))
};

jObject.prototype.initEvents = function(events) {
	// events.OnPreInit = new EventHandler(this)
	// events.OnPreInit.add(function(sender) {
		// if (sender.params.init) 
			// sender.params.init(sender)
	// })
	
	// events.OnInit = new EventHandler(this)
};

jObject.prototype.initMethods = function(methods) {
};

jObject.prototype.afterInitialize = function() {
};

//**************************************************************************************************
// JObject
//**************************************************************************************************
function JObject(params) {
    if(params == undefined) {
        return;
    } else {
		this.initialize(params);
		this.afterInitialize(params);
	};
};

JObject.prototype.classID = "JObject";

JObject.prototype.initialize = function(params) {
	this.params = params;
};

JObject.prototype.afterInitialize = function(params) {
};

//**************************************************************************************************
// JBasePainter
//**************************************************************************************************
function JBasePainter(Control) {
    if(Control == undefined) {
        return;
    };

    this.Control = Control;
};

JBasePainter.prototype.classID = "JBasePainter";

JBasePainter.prototype.Paint = function() {
};

JBasePainter.prototype.AfterPaint = function() {
};

JBasePainter.prototype.DefaultStyles = function() {
    return undefined;
};

JBasePainter.prototype.GetParam = function(name, value) {
    return this.Control.PaintParam(name, value);
};

//**************************************************************************************************
// JList
//**************************************************************************************************
function JList(numericName) {
	this.numericName = numericName;
	this.items = [];
	this.names = [];
};

JList.prototype.add = function(name, item, callback) {
	// var i = this.names.indexOf(name);
	// if(i > -1) {
		// this.names.splice(i, 1);
		// this.items.splice(i, 1);
	// };
	
	if(this.numericName) {
		this.names.push(parseInt(name))
	} else {
		this.names.push(name);
	}
	
	if(callback) {
		this.items.push(callback(item))
	} else {
		this.items.push(item);
	}
	
	return item;
};

JList.prototype.clear = function() {
	this.items = [];
	this.names = [];
};

JList.prototype.get = function(name) {
	if(this.numericName) {
		name = parseInt(name)
	}
		
	var index = this.names.indexOf(name);
    
	if(index > -1) {
		return this.items[index]
	} else {
		return undefined;
	}
};

JList.prototype.getByIndex = function(index) {
	return this.items[index];
};

JList.prototype.exists = function(name) {
	if(this.numericName) {
		name = parseInt(name)
	}
	
	return this.names.indexOf(name) > -1;
};

JList.prototype.each = function(callback) {
	// $(this.items).each(function(i, item) {
		// callback(i, item);
	// };

	var items = $(this.items);
	items.each(function(i, item, itemsx) {
		callback(i, item, items);
	});
};

JList.prototype.each2 = function(callback) {
	var items = $(this.items);
	// var items = this.items;
	items.each(function(i, itemsx) {
		callback(i, items);
	});
};

JList.prototype.getValues = function(callback) {
	$(this.items).each(function(i, value) {
		callback(i, value);
	});
};

JList.prototype.getNames = function(callback) {
	$(this.names).each(function(i, name) {
		if(this.numericName) {
			name = parseInt(name)
		}
		
		callback(i, name);
	});
};

JList.prototype.count = function() {
	return this.items.length
};
// ****************************************************************************************************
// function EventHandler(target, nextEvent) {
	// this.handlers = [];
	// this.target = target;
	// this.nextEvent = nextEvent;
// };

// EventHandler.prototype.add = function(handler) {
	// this.handlers.push(handler);
// };

// EventHandler.prototype.remove = function(handler) {
	// var i = this.handlers.indexOf(handler);
	// if(i > -1) {
		// this.handlers.splice(i, 1);
	// };
// };

// EventHandler.prototype.trigger = function(params) {
	// var self = this;
	// $(this.handlers).each(function(i, handler) {
		// handler(self.target, params);
	// });
// };

// EventHandler.prototype.trigger2 = function(params, callback) {
	// var self = this;
	// $(this.handlers).each(function(i, handler) {
		// handler(self.target, params);
	// });

	// if (typeof(params) === "function")
		// params(self.target)
// };

function EventHandler(target, options) {
	this.target = target;
	this.callback = $.Callbacks(options);
};

EventHandler.prototype.add = function(eventCallback) {
	this.callback.add(eventCallback);
};

EventHandler.prototype.remove = function(eventCallback) {
	this.callback.remove(eventCallback);
};

EventHandler.prototype.trigger = function(params) {
	this.callback.fire(this.target, params);
};

EventHandler.prototype.trigger2 = function(params, callback) {
	this.callback.fire(this.target, params);
	if (typeof(params) === "function") {
		params(this.target);
	}
};

// ****************************************************************************************************
function MethodHandler(target) {
	this.handlers = [];
	// this.handlers2 = [];
	this.handlerNames = [];
	// this.handlerNames2 = [];
	this.target = target;
	
	this.list = new JList();
};

MethodHandler.prototype.add = function(name, handler) {
	var item = this.list.get(name);
	
	if(item) {
		item.push(handler);
	} else {
		this.list.add(name, [handler]);
	};
	
	// var j = this.handlerNames2.indexOf(name);
	
	// if(j == -1) {
		// var k = this.handlers2.push({name:name, handlers:[]});
		// this.handlers2[k-1].handlers.push(handler);
	// } else {
		// this.handlers2[j].handlers.push(handler);
	// };
	
	var i = this.handlerNames.indexOf(name);
	
	if(i > -1) {
		this.handlers.splice(i, 1);
		this.handlerNames.splice(i, 1);
	};
	
	// if(i == -1) {
		this.handlers.push(handler);
		this.handlerNames.push(name);
	// } else {
		// this.handlers.push[i] = handler;
	// };
};

MethodHandler.prototype.call = function(name, params) {
	// var result = undefined;
	// var i = this.handlerNames.indexOf(name);
	// if(i > -1) {
		// result = this.handlers[i](this.target, params);
	// };
	
	// return result;
	var item = this.list.get(name);
	var self = this;
	var result = undefined;
	$(item).each(function(i, handler) {
		result = handler(self.target, params, result);
	});
	
	return result;
};

MethodHandler.prototype.call2 = function(name, params) {
	var item = this.list.get(name);
	var self = this;
	var result;
	$(item).each(function(i, handler) {
		result = handler(self.target, params, result);
	});
	
	return result;
};

//****************************************************************************************************
//**************************************************************************************************
// TrackViewport is for responsive design. 
// Allows elements to re-position depending on the screen size.
//**************************************************************************************************
function TrackViewport(options) {
	this.view = "";
	this.options = options;
	this.trackElement = $("#body-container");
};

TrackViewport.prototype.width = function() {
	return this.trackElement.width();
	// return $("#body-container").width();
};

TrackViewport.prototype.reset = function() {
	this.view = "";
};

TrackViewport.prototype.refresh = function() {
	var v =  this.options.calc(this);
	if(v != this.view) {
		this.view = v;
		this.options.update(this);
	}
};
//==================================================================================================
// File name: controls.js
//==================================================================================================
// function JControl(Params)
//==================================================================================================
//**************************************************************************************************
// JControl
//**************************************************************************************************
function JControl(Params) {
    if (Params == undefined) {
        return;
    };

    this.ID = Params.ID;
    this.PaintParams = Params.Painter;
    this.Painter;
    this.PainterClass;

    if (this.PaintParams && this.PaintParams.painterClass) {
        this.Painter = new this.PaintParams.painterClass(this)
    } else { //if (this.DefaultPainter() !== undefined) {
        this.Painter = this.DefaultPainter();
    };

    this.Initialize(Params);
    this.AfterInitialize(Params);
		
    if(!Params.DelayPainting) {
        this.Paint();
        this.AfterPaint();  
    };
	
	// if Params.DelayPainting call Resume from Control
};

JControl.prototype.Resume = function(callBack) {
	this.Paint();
	this.AfterPaint();
	if(callBack) {
		callBack(this);
	}
};

JControl.prototype.Initialize = function(Params) {
	this.Params = Params;
    if(Params && !Params.Styles) {
        if(this.Painter && this.Painter.DefaultStyles) {
            Params.Styles = this.Painter.DefaultStyles();
        };
    };
};

JControl.prototype.AfterInitialize = function(Params) {
};

JControl.prototype.ControlOptions = function() {
    return {};
};

JControl.prototype.DefaultPainter = function() {
    return undefined;
};

JControl.prototype.Element = function() {
    // return $("#" + this.ID);
   return this.elementContainer;
};

JControl.prototype.ElementData = function(Data, Value) {
    if (Value) {
        return this.Element().data(Data, Value)
    } else {
        return this.Element().data(Data)
    }
};

JControl.prototype.Position = function() {
    return this.Element().position();
};

JControl.prototype.Width = function() {
    return this.Element().width();
};

JControl.prototype.Height = function() {
    return this.Element().height();
};

JControl.prototype.SetBounds = function(Left, Top, Width, Height) {
    this.Element().css("top", Top);
    this.Element().css("left", Left);
    this.Element().width(Width);
    this.Element().height(Height);
};

// This is called by the painter after painting...
JControl.prototype.Ready = function() {
};

JControl.prototype.Paint = function() {
    if (this.Painter !== undefined) {
	// alerts(this.classID);
             // alerts(this.Painter.classID, this.Painter.Control);
        if (arguments.length > 0) {
            //          this.Painter.Paint(Array.prototype.slice.call(arguments, 0));
            this.Painter.Paint.apply(null, Array.prototype.slice.call(arguments, 0));
        //          this.Painter.prototype.Paint.apply(Array.prototype.slice.call(arguments, 0));
        } else {
            this.Painter.Paint();
			// alerts(this.Painter.classID);
        //          this.Painter.prototype.Paint();
        }
    };
};

JControl.prototype.AfterPaint = function() {
};

JControl.prototype.PaintParam = function(Name, Value) {
    return DefaultValue(this.PaintParams[Name], Value);
};

//**************************************************************************************************
// JControlPainter
//**************************************************************************************************
Class.Inherits(JControlPainter, JBasePainter);
function JControlPainter(Control) {
	JControlPainter.prototype.parent.call(this, Control);
	// JControlPainter.prototype.super(this)
	this.Control = Control;
};

JControlPainter.prototype.classID = "JControlPainter";
JControlPainter.prototype.type = "";

// JControlPainter.prototype.Element = function() {
    // return this.elementContainer;
// };

JControlPainter.prototype.Paint = function() {
	JControlPainter.prototype.parent.prototype.Paint.call(this); 
	// JControlPainter.prototype.base(this);
};

JControlPainter.prototype.SetContainer = function(container) {
	container.data("control", this.Control);
	container.data("object", this.Control);
	this.Control.elementContainer = this.container = container;
	// if(this.container && this.type) {
		// this.container.attr("control-type", this.type);
	// };
	// this.Control.elementContainer = container;
	if(container && this.type) {
		container.attr("control-type", this.type);
	};
};
//*****************************************************************************************************
// Last modified on*/
// ihms.1.0.0.3 */
//*****************************************************************************************************
function JDrag(Node, Target, Params) {
	var self = this;
	this.Node = Node;
	this.Target = Target;
	this.Params = Params;

	// this.SizeMode = DefaultValue(Params.SizeMode, "default");
	this.SizeMode = "default";

	var Ready = false;
	this.DragCallback;

	this.Node.Ready = false; // Add a custom properties to node to track movement events...
	this.Node.Moving = false; // Add a custom properties to node to track movement events...
    this.Node.Sizing = false; // Add a custom properties to node to track movement events...

	this.Node.data("drag", this);

	this.Node.on({
        mousemove: this.UpdateCursor,
        mousedown: this.InitBegin,
        mouseout: function(e) {
        	$("body").css("cursor", "default");
        }
    });
	
	if(Params.Init) { 
		Params.Init(this);
	}
};

JDrag.prototype.InitBegin = function(e) {
	var self = $(e.target).data("drag");
	if(!self) { 
		return;
	}

	self.Node.Ready = false;
	self.Node.Moving = false;
	self.Node.Sizing = false;

	self.Params.InitDrag(self, false);

	if(self.SizeMode == "move") {
        if(!self.Params.AllowDrag(self)) {
        	return;
        };
    } else if(self.SizeMode != "default") {
        if(!self.Params.AllowSize(self)) {
        	return;
        };
    };

	self.Node.Ready = (self.SizeMode == "move" || self.SizeMode != "default");

//	if(!self.Node.Ready || e.target.NoDrag || $(e.target) !== $(self.Node)) {
//	if(!self.Node.Ready || e.target.NoDrag || $(e.target) != self.Node) {
	if(!self.Node.Ready || e.target.NoDrag) {
		return;
	};

	e.preventDefault();

    var xy1 = self.Target.offset();
    var xy2 = self.Target.parent().offset();

    self.Target.OffsetW = self.Target.width(); // Add a custom properties to node to track movement events...
    self.Target.OffsetH = self.Target.height(); // Add a custom properties to node to track movement events...
    self.Target.OffsetX = e.pageX - xy1.left + xy2.left;
    self.Target.OffsetY = e.pageY - xy1.top + xy2.top;// - $("#header-container").height() - 9;

    self.Target.Width = self.Target.width(); // Add a custom properties to node to track movement events...
    self.Target.Height = self.Target.height(); // Add a custom properties to node to track movement events...
    self.Target.Left = xy1.left - xy2.left;
    self.Target.Top = xy1.top - xy2.top;
    self.Target.X = e.pageX;
    self.Target.Y = e.pageY;

	if(self.SizeMode == "move") {
        self.DragCallback = self.DragNode
	} else {
        self.DragCallback = self.SizeNode;
	}

	self.Node.off({
        mousemove: self.UpdateCursor,
        mouseout: self.CursorOut
    });

	$("body").on({
        mousemove: self.DragCallback,
        mouseup: self.DragEnd
    });

    $("body").data("drag", self);
};

JDrag.prototype.CursorOut = function(e) {
	$("body").css("cursor", 'default');
};

JDrag.prototype.DragEnd = function(e) {
	var self = $("body").data("drag");

	$("body").off({
        mousemove: self.DragCallback,
        mouseup: self.DragEnd
    });

	if(self.Params.DragEnd) {
    	self.Params.DragEnd(self);
	};

	self.Node.Moving = false;
	self.Node.Sizing = false;

	self.Node.on({
        mousemove: self.UpdateCursor,
        mouseout: self.CursorOut
    });
};

JDrag.prototype.DragNode = function(e) {
	var self = $("body").data("drag");

	e.preventDefault();

	if(!self.Node.Moving) {
    	self.Node.Moving = true;
    	self.Params.InitDrag(self, true);
	};

	var PageX = e.pageX;
	var PageY = e.pageY;
	var X = PageX - self.Target.X;
	var Y = PageY - self.Target.Y;

    var Top = self.Target.Top + Y;
    var Left = self.Target.Left + X;

	if(self.Params.Dragging) {
    	self.Params.Dragging(self, Left, Top, null, null);
	} else {
        self.Target.css("top", Top);
        self.Target.css("left", Left);
	};

	$("body").css("cursor", self.SizeMode);
//	$(self.Target).text(("pageY:{0},pageX:{1};Y:{2},X:{3}").format(PageY,PageX,Y,X));
};

JDrag.prototype.SizeNode = function(e) {
	var self = $("body").data("drag");

	e.preventDefault();

	if(!self.Node.Moving) {
    	self.Node.Moving = true;
    	self.Params.InitDrag(self, true);
	};

	var PageX = e.pageX;
	var PageY = e.pageY;
	var X = PageX - self.Target.X;
	var Y = PageY - self.Target.Y;

    var Top = null;
    var Left = null;
	var Width = null;
	var Height = null;

	if(self.SizeMode == "n-resize" || self.SizeMode == "ne-resize" || self.SizeMode == "nw-resize") {
		Top = self.Target.Top + Y;
		Height = self.Target.Height - Y;
	};

	if(self.SizeMode == "w-resize" || self.SizeMode == "sw-resize" || self.SizeMode == "nw-resize") {
		Left = self.Target.Left + X;
		Width = self.Target.Width - X;
	};

	if(self.SizeMode == "e-resize" || self.SizeMode == "se-resize" || self.SizeMode == "ne-resize") {
		Width = self.Target.Width + X;
	};

	if(self.SizeMode == "s-resize" || self.SizeMode == "se-resize" || self.SizeMode == "sw-resize") {
		Height = self.Target.Height + Y;
	};

	if(self.Params.Dragging) {
    	self.Params.Dragging(self, Left, Top, Width, Height);
	} else {
        self.Target.css("top", Top);
        self.Target.css("left", Left);
	};

	$("body").css("cursor", self.SizeMode);
//	$(self.Target).text(("pageY:{0},pageX:{1};Y:{2},X:{3}").format(PageY,PageX,Y,X));
};

JDrag.prototype.UpdateCursor = function(event) {
	var target = $(event.target);
	var self = target.data("drag");
	if(!self) {
		return;
	}

    var offset = self.Params.SizeOffset;
    var xy = target.offset();
    var x = event.pageX - xy.left + 1;
    var y = event.pageY - xy.top + 1;
    var w = target.width();
    var h = target.height();

	self.SizeMode = "default";

	if(self.Params.Moving) {
        self.SizeMode = 'move';
        if(!self.Params.AllowDrag(self)) {
        	return;
        };
	} else {
        self.SizeMode = 'default';
	};

    // if(!self.Params.Moving && !self.Params.AllowSize(self)) {
    	// return;
    // };

	event.preventDefault();

    // var xcursor = self.SizeMode;
    // var ycursor = self.SizeMode;

    // if(x <= offset)
        // xcursor = "w-resize"
    // else if(x >= w-offset)
        // xcursor = "e-resize";

    // if(y <= offset)
        // ycursor = "n-resize"
    // else if(y >= h-offset)
        // ycursor = "s-resize";

    // if(ycursor == 'n-resize' && xcursor =='e-resize')
        // self.SizeMode = 'ne-resize'
    // else if(ycursor == 'n-resize' && xcursor =='w-resize')
        // self.SizeMode = 'nw-resize'
    // else if(ycursor == 's-resize' && xcursor =='e-resize')
        // self.SizeMode = 'se-resize'
    // else if(ycursor == 's-resize' && xcursor =='w-resize')
        // self.SizeMode = 'sw-resize'
    // else if(xcursor != self.SizeMode)
        // self.SizeMode = xcursor
    // else
        // self.SizeMode = ycursor;

	$("body").css("cursor", self.SizeMode);
};

//*****************************************************************************************************
// Last modified on*/
// ihms.1.0.0.3 */
//*****************************************************************************************************
function JSimpleDrag(Params) {
	this.Params = Params;
	this.Owner = Params.Owner;
	this.Node = Params.Node;
	this.Target = Params.Target;

	this.Node.data("drag", this);

	if(desktop.mobile) {
		this.Node.on({
			"touchstart": this.InitBegin
		})
	} else {
		this.Node.on({
			"mousedown": this.InitBegin
		})
	}
	
	if(Params.Init) {
		Params.Init(this);
	}
};

JSimpleDrag.prototype.InitBegin = function(e) {
	var self = $(e.target).data("drag");
	if(!self) {
		return;
	}

	self.Params.InitDrag(self);

	e.preventDefault();

	if(!desktop.mobile)  {
		self.pageX = e.pageX;
		self.pageY = e.pageY;
	} else {
		self.pageX = e.originalEvent.touches[0].pageX;
		self.pageY = e.originalEvent.touches[0].pageY;
	};

	if(desktop.mobile) {
		$("body").on({
			"touchmove": self.DragNode,
			"touchend": self.DragEnd,
			"touchcancel": self.DragEnd,
		})
	} else {
		$("body").on({
			"mousemove": self.DragNode,
			"mouseup": self.DragEnd
		});
	}

    $("body").data("drag", self);
};

JSimpleDrag.prototype.DragNode = function(e) {
	var self = $("body").data("drag");

	if(!desktop.mobile)  {
		e.preventDefault();
		self.Params.Dragging(self, e.pageX - self.pageX, e.pageY - self.pageY);
	} else {
		self.Params.Dragging(self, e.originalEvent.touches[0].pageX - self.pageX, e.originalEvent.touches[0].pageY - self.pageY);
	};
};

JSimpleDrag.prototype.DragEnd = function(e) {
	var self = $("body").data("drag");

	if(!desktop.mobile)  {
		$("body").off({
			"mousemove": self.DragNode,
			"mouseup": self.DragEnd
		});
	} else {
		$("body").off({
			"touchmove": self.DragNode,
			"touchend": self.DragEnd,
			"touchcancel": self.DragEnd,
		})
	};

	if(self.Params.DragEnd) {
    	self.Params.DragEnd(self);
	};
};

//*****************************************************************************************************
// Last modified on*/
// ihms.1.0.0.3 */
//*****************************************************************************************************
function jResize(params) {
	this.params = params;
	this.owner = params.owner;
	this.sizer = params.sizer;
	this.target = params.target;
	this.target2 = params.target2;
	this.parent = params.parent;
	this.orientation = params.orientation;

	this.sizer.data("drag", this);

	this.sizer.on({
        mousedown: this.initBegin
    });
	
	if(params.init) { 
		params.init(this);
	}
};

jResize.prototype.initBegin = function(e) {
	var self = $(e.target).data("drag");
	if(!self) {
		return;
	}

	self.params.initDrag(self);

	e.preventDefault();

    self.pageX = e.pageX;
    self.pageY = e.pageY;

	$("body").on({
        mousemove: self.dragNode,
        mouseup: self.dragEnd
    });

    $("body").data("drag", self);
};

jResize.prototype.dragEnd = function(e) {
	var self = $("body").data("drag");

	$("body").off({
        mousemove: self.dragNode,
        mouseup: self.dragEnd
    });

	if(self.params.dragEnd) {
    	self.params.dragEnd(self);
	};
};

jResize.prototype.dragNode = function(e) {
	var self = $("body").data("drag");

	e.preventDefault();

   	self.params.dragging(self, e.pageX - self.pageX, e.pageY - self.pageY);
};
// ****************************************************************************************************
// *Last modified on
// *21-SEP-2014 ihms.0.0.0.4
// ****************************************************************************************************
// var __dateformat = "dd/MM/yyyy"; // 21-SEP-2014 ihms.0.0.0.4
var __dateformat = "MM/dd/yyyy"; // 21-SEP-2014 ihms.0.0.0.4
// var __dateformat = "yyyy/MM/dd"; // 21-SEP-2014 ihms.0.0.0.4
var __timeformat = "hh:mm:ss tt"; // 21-SEP-2014 ihms.0.0.0.4
var __datetimeformat = "MM/dd/yyyy hh:mm:ss tt"; // 21-SEP-2014 ihms.0.0.0.4

function __parseDate(p1, p2) {
	return Date.parseExact(p2, p1);
};

function __formatDate(format, date) {
	return date.toString(format);
};

//this function expects a string date format 2013-07-01T00:00:00
String.prototype.convertDate = function(format) {	
	var dp = [];
	if(this != null) {
		dp = this.split("T");
	};
	
	var value = null;
	if(dp.length == 2) {
		var date = __parseDate("yyyy-MM-dd", dp[0]);
		if(format) {
			value = __formatDate(format, date)
		} else {
			value = date;
		}		
	} else if(format) {
		value = "";
	}
	
	return value;
};

//this function expects a string date format 2013-07-01T00:00:00
String.prototype.convertDate2 = function(format) {	
	return Date.parse(this.substring(0, 19)).toString(format);
};

String.prototype.parseDate = function(format) {	
	return __parseDate(format, this);
};

Date.prototype.sameDay = function(date) {
    return (this.getDate() == date.getDate() && this.getMonth() == date.getMonth() && this.getFullYear() == date.getFullYear());
};

Date.prototype.daysInMonth = function() {
    var date = new Date(this);
    var m = date.getMonth();
    var y = date.getFullYear();
    var days = 32 - new Date(y, m, 32).getDate();
    
    return days;
};

Date.prototype.addDays = function(days) {
    this.setDate(this.getDate()+days);
    return this;
};

Date.prototype.addMonths = function(months) {
	var d = this.getDate();
	this.setDate(1);
    this.setMonth(this.getMonth()+months);
	var days = this.daysInMonth();
	if(d > days) {
		d = days;
	};

	this.setDate(d);
    return this;
};

Date.prototype.addYears = function(years) {
    this.setFullYear(this.getFullYear()+years);
    return this;
};

Date.prototype.addHours = function(hours) {
    this.setHours(this.getHours()+hours);
    return this;
};

Date.prototype.addMinutes = function(minutes) {
    this.setMinutes(this.getMinutes()+minutes);
    return this;
};

Date.prototype.offsetTimeZone = function() {
    var d = new Date(this);
    var offset = d.getTimezoneOffset();
    d.setMinutes(d.getMinutes()+offset);
    return d;
};

Date.prototype.format = function(format) {
	return this.toString(format);
};
// ****************************************************************************************************
// Last modified on
// 14-SEP-2014 ihms.0.0.0.1
// 24-SEP-2014 ihms.0.0.0.5
// 01-OCT-2014 ihms.0.0.0.8
// 22-OCT-2014 ihms.0.0.1.3
// 02-FEB-2015 ihms.1.0.0.1 added getBinding and getControl to object Dataset
// ****************************************************************************************************

//==================================================================================================
// BaseDataset (work in progress, this will become the base class of Dataset)
//==================================================================================================
function BaseDataset(rawData) {
	this.data = rawData;
	this.delta = [];
	this.deltaKeys = [];
	this.recNo = 0;
	// this.controls is an array of data-aware controls
	this.controls = [];
	this.primaryKey = "";
	this.enableEvents = true;
	
	this.Events = {};
	this.Events.OnEdit = new EventHandler(this);
	this.Events.OnEditState = new EventHandler(this);
	// this.Events.OnInitEditDialog = new EventHandler(this);
	// this.Events.OnEditDialog = new EventHandler(this);
	this.Events.OnNewRecord = new EventHandler(this);
	this.Events.OnDelete = new EventHandler(this);
	this.Events.OnCancel = new EventHandler(this);
	this.Events.OnPost = new EventHandler(this);
	this.Events.OnValidate = new EventHandler(this);
	this.Events.OnAfterPost = new EventHandler(this);
	this.Events.OnServerPost = new EventHandler(this);
	this.Events.OnFetchData = new EventHandler(this);
	this.Events.OnReset = new EventHandler(this);
	this.Events.OnChanged = new EventHandler(this);
	this.Events.OnMoveRecord = new EventHandler(this);
	// this.Events.OnError = new EventHandler(this);
	// this.Events.OnWarning = new EventHandler(this);
	
};

/******************************************************************************************************
	Dataset.prototype.append = function() 
	Dataset.prototype.applyUpdate = function(msg, error, noEvent) 
	Dataset.prototype.asDate = function(fname, recno) 
	Dataset.prototype.asFloat = function(fname, recno) 
	Dataset.prototype.bindControl = function(control, binding, custom) 
	Dataset.prototype.bof = function() 
	Dataset.prototype.cancel = function() 
	Dataset.prototype.changed = function(fname, noUpdateControls) 
	Dataset.prototype.clear = function()
	Dataset.prototype.columnByName = function(fname)
	Dataset.prototype.count = function() 
	Dataset.prototype.dateValue = function(value) 
	Dataset.prototype.each = function(callback)
	Dataset.prototype.edit = function() 
	Dataset.prototype.empty = function() 
	Dataset.prototype.eof = function() 
	Dataset.prototype.error = function(msg, error, result) 
	Dataset.prototype.fetch = function(params) 
	Dataset.prototype.first = function(noEvent) 
	Dataset.prototype.formatDateTime = function(fname, format) 
	Dataset.prototype.formatDateTime2 = function(fname, format) 
	Dataset.prototype.get = function(fname, recno) 
	Dataset.prototype.getBinding = function(fname) 
	Dataset.prototype.getColumnKey = function() 
	Dataset.prototype.getControl = function(fname) 
	Dataset.prototype.getDefault = function(fname, ifNullValue, recno) // returns default value if value is null
	Dataset.prototype.getKey = function(recno) 
	Dataset.prototype.gotoKey = function(value) 
	Dataset.prototype.isNull = function(fname) 
	Dataset.prototype.keyIsNumeric = function() 
	Dataset.prototype.locate = function(fname, value) 
	Dataset.prototype.lookup = function(value, fname) 
	Dataset.prototype.next = function(noEvent) 
	Dataset.prototype.parseKeyValue = function(value) 
	Dataset.prototype.post = function(callback) 
	Dataset.prototype.previous = function(noEvent) 
	Dataset.prototype.raw = function(fname, recno) 
	Dataset.prototype.resetData = function(rawData, resetMode, noUnbind) 
	Dataset.prototype.serverPost = function(callback) 
	Dataset.prototype.set = function(fname, value, recno, noEvents) 
	Dataset.prototype.setDateTime = function(fname, value, recno, noEvents) 
	Dataset.prototype.setEditing = function(editing) 
	Dataset.prototype.setReadonly = function(fname, readonly) 
	Dataset.prototype.setRequired = function(fname, required) 
	Dataset.prototype.sort = function(fname, order)
	Dataset.prototype.sortString = function(fname, isnumeric) 
	Dataset.prototype.stringifyRec = function(recno) 
	Dataset.prototype.text = function(fname) 
	Dataset.prototype.unbindControls = function() 
	Dataset.prototype.updateControl = function(fname) 
	Dataset.prototype.updateControls = function() 
	Dataset.prototype.warning = function(msg, error, result) 

	Column.prototype.asDate = function() 
	Column.prototype.asDateTime = function() 
	Column.prototype.asFloat = function() 
	Column.prototype.asTime = function() 
	Column.prototype.change = function() 
	Column.prototype.formatDateTime = function(format) 
	Column.prototype.formatDateTime2 = function(format) 
	Column.prototype.get = function() 
	Column.prototype.getMinutes = function() 
	Column.prototype.isNull = function() 
	Column.prototype.isReadonly = function() 
	Column.prototype.raw = function() 
	Column.prototype.set = function(value, noEvents) 
	Column.prototype.setDate = function(value, noEvents) 
	Column.prototype.setReadonly = function(readonly) 
	Column.prototype.setRequired = function(required) 
	Column.prototype.setTimeParts = function(hr, min, sec, noEvents) 
	Column.prototype.setprops = function(props) 
	Column.prototype.text = function() 

	Columns.prototype.add = function(fname) 
	Columns.prototype.clear = function() 
	Columns.prototype.contains = function(fname) 
	Columns.prototype.each = function(callback) 
	Columns.prototype.get = function(fname) 
	Columns.prototype.setprops = function(fname, props) 
*******************************************************************************************************/

//==================================================================================================
// Dataset
//==================================================================================================
// function Dataset(rawData, tableName, dsName) {
Class.Inherits(Dataset, BaseDataset);
function Dataset(rawData, tableName, dsName) {
    Dataset.prototype.parent.call(this, rawData);
	
	var self = this;
	
	this.name = dsName;
	this.tableName = tableName;
	
	this.Methods = new MethodHandler(this);
	
	// this.Events = {};
	// this.Events.OnEdit = new EventHandler(this);
	// this.Events.OnEditState = new EventHandler(this);
	this.Events.OnInitEditDialog = new EventHandler(this);
	this.Events.OnEditDialog = new EventHandler(this);
	// this.Events.OnNewRecord = new EventHandler(this);
	// this.Events.OnDelete = new EventHandler(this);
	// this.Events.OnCancel = new EventHandler(this);
	// this.Events.OnPost = new EventHandler(this);
	// this.Events.OnValidate = new EventHandler(this);
	// this.Events.OnAfterPost = new EventHandler(this);
	// this.Events.OnServerPost = new EventHandler(this);
	// this.Events.OnFetchData = new EventHandler(this);
	// this.Events.OnReset = new EventHandler(this);
	// this.Events.OnChanged = new EventHandler(this);
	// this.Events.OnMoveRecord = new EventHandler(this);
	this.Events.OnError = new EventHandler(this);
	this.Events.OnWarning = new EventHandler(this);

	this.OnDelete = function() {};
	this.OnPost = function(dataset, callback) {
		callback("", 0);
	};
	this.Columns = new Columns(this);   
	for(var key in this.data[0]) {
		this.Columns.add(key);
	};
    
	this.fieldUpdate = function() {
		var binding = $(this).data("binding");
		if(!$(this).is(":focus") && ($(this).is("input") || $(this).is("textarea"))) {
			var column = self.Columns.get(binding.fname);
			if(column.type == "time") {
				var time = binding.dataset.columnByName(binding.fname).asTime();
				if($(this).attr("time") == "hr") {
					$(this).val(time.getHours().strZero(2));
				} else if($(this).attr("time") == "min") {
					$(this).val(time.getMinutes().strZero(2));
				}
			} else {
				$(this).val(binding.dataset.text(binding.fname));
			};
		};
	};
    
	this.fieldChanged = function() {
		var binding = $(this).data("binding");
		var column = self.Columns.get(binding.fname);
		var value = $(this).val();		
		if(column.type == "date") {		
			if(column.format == "datetime") {
				value = value.parseDate(__dateformat +" "+ __timeformat)
			} else {
				value = value.parseDate(__dateformat)
			}
		} else if(column.type == "time") {
			if(binding.time == "hr") {
				column.setTimeParts(value);
			} else if(binding.time == "min") {
				column.setTimeParts(undefined, value);
			};			
			
			return;
		};
		
		self.set(binding.fname, value);
	};
	
	this.setEditing(false);
};

// Dataset.prototype.addMasterDetail = function() {
	
// };

Dataset.prototype.each = function(callback) {
	$(this.data).each(function(i, row) {
		callback(row, i);
	});
};

Dataset.prototype.clear = function() {
	this.data = null;
	this.delta = [];
	this.deltaKeys = [];
	this.recNo = 0;
	this.controls = [];    
	this.Columns.clear();
};

Dataset.prototype.columnByName = function(fname) {
	return this.Columns.get(fname);
};

Dataset.prototype.sort = function(fname, order) {
	var isnumeric = false;
	var __sort = function(a, b) {
		var aName, bName;
		if(isnumeric) {
			aName = a[fname];
			bName = b[fname];
		} else {
			aName = a[fname].toLowerCase();
			bName = b[fname].toLowerCase();
		};
		
		if(order == "asc") {
			return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0))
		} else {
			return ((aName > bName) ? -1 : ((aName < bName) ? 1 : 0));
		}
	};

	this.data.sort(__sort);
};

Dataset.prototype.sortString = function(fname, isnumeric) {
	var __sort = function sorit(a, b) {
		var aName, bName;
		if(isnumeric) {
			aName = a[fname];
			bName = b[fname];
		} else {
			aName = a[fname].toLowerCase();
			bName = b[fname].toLowerCase();
		};
		return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
	};

	this.data.sort(__sort);
};

Dataset.prototype.lookup = function(value, fname) {
		var self = this;
		var retValue = "";
		$(this.data).each(function(i, v) {
				if(v[self.primaryKey] == value) {
						retValue = v[fname];
				};
		});
		
		return retValue;
};

Dataset.prototype.locate = function(fname, value) {
	var self = this;
	var found = false;
	$(this.data).each(function(i, v) {
		if(v[fname] == value) {
			found = true;
			self.recNo = i;
			if(self.enableEvents) {
				self.Events.OnMoveRecord.trigger();
			}
		};
	});
	
	return found;
};

Dataset.prototype.keyIsNumeric = function() {
	return this.Columns.get(this.primaryKey).numeric
};

Dataset.prototype.parseKeyValue = function(value) {
	if(this.keyIsNumeric()) {
		return parseInt(value)
	} else {
		return value
	}
};

Dataset.prototype.gotoKey = function(value) {
	var self = this;
	var fname = this.primaryKey;
	var found = false;
	$(this.data).each(function(i, v) {
		if(v[fname] == value) {
			found = true;
			self.recNo = i;
			if(self.enableEvents) {
				self.Events.OnMoveRecord.trigger();
			};
		};
	});
	
	return found;
};

Dataset.prototype.dateValue = function(value) {
	if(Object.prototype.toString.call(value) === "[object Date]") {
		var date = new Date(value);	
		try {
            var d = date.getDate(),
                m = date.getMonth()+1,
                y = date.getFullYear();
                
            return ("{0}-{1}-{2}T{3}").format(parseInt(y),parseInt(m).strZero(2),parseInt(d).strZero(2), "00:00:00");
	    } catch(error){
	        return null;
	    };               			
	};
};

Dataset.prototype.fetch = function(params) {
	this.Events.OnFetchData.trigger(params);
};

Dataset.prototype.setEditing = function(editing) {
	this.Events.OnEditState.trigger(this.editing = editing);
	// console.log(this.editing)
};

Dataset.prototype.resetData = function(rawData, resetMode, noUnbind) {
	this.resetMode = resetMode;
	this.data = rawData;
	this.delta = [];
	this.deltaKeys = [];
	this.recNo = 0;
	this.setEditing(false);
	if(!noUnbind) {
		this.unbindControls();
		this.Events.OnReset.trigger(resetMode);
	} else {
		this.updateControls();
	};
	
	this.Events.OnChanged.trigger();
};

Dataset.prototype.append = function() {
	var rec = {};
	this.Columns.each(function(i, column) {
		rec[column.fname] = null;
	});

	this.data.push(rec);
	this.recNo = this.data.length - 1;
	this.Events.OnNewRecord.trigger();
};

Dataset.prototype.edit = function() {
	if(this.editing) {
		return;
	};
	
	this.setEditing(true);
	this.Events.OnEdit.trigger();
};

Dataset.prototype.cancel = function() {
	var i = this.deltaKeys.indexOf(this.recNo);
	
	if(i > -1) {
		var delta = this.delta[i];
		
		for (var prop in this.data[this.recNo]) {
			this.data[this.recNo][prop] = delta[prop];
		};
		
		this.delta.splice(i, 1);
		this.deltaKeys.splice(i, 1);
		this.updateControls();
	};

	this.setEditing(false);
	this.Events.OnCancel.trigger();
	// this.OnCancel(this);
};

Dataset.prototype.syncRecord = function(newRecord) {
	var self = this;
	for(var name in newRecord[0]) {
		// console.log({n:name, a:self.data[self.recNo][name], b:newRecord[0][name]})
		self.data[self.recNo][name] = newRecord[0][name];
			// Params.push(Name +"="+ params[Name]);
	};
};

Dataset.prototype.applyUpdate = function(msg, error, noEvent) {
	// console.log({where:"applyUpdate", msg:msg, error:error})
	if(error >= 0) {
		var i = this.deltaKeys.indexOf(this.recNo);
		
		if(i > -1) {	
			this.delta.splice(i, 1);
			this.deltaKeys.splice(i, 1);
		};

		this.setEditing(false);
		if(noEvent == undefined) {
			this.Events.OnAfterPost.trigger();
		};
	} else {
		this.error(msg, error);
	};		
};

Dataset.prototype.serverPost = function(callback) {
	this.Events.OnServerPost.trigger(callback);
	// var self = this;
	// this.Events.OnServerPost.trigger(function(msg, error) {
		// self.applyUpdate(msg, error);
	// });
};

Dataset.prototype.stringifyRec = function(recno) {
	return "["+ JSON.stringify(this.data[recno == undefined ? this.recNo : recno]) +"]";
};

Dataset.prototype.post = function(callback) {
	var msg = [];
	var mandatoryFields = [];
	this.Columns.each(function(i, column) {
		if(column.required && (column.text() === "" || (column.numeric && column.raw() == 0) || (column.type == "date" && column.asDate() == null))) {
			mandatoryFields.push(column.label);
		};
	});
	
	if(mandatoryFields.length > 0) {
		msg.push("<div class='required-fields-error'>");
		msg.push(("<div section='title'>{0}</div>").format("The following fields are required:"));
		$(mandatoryFields).each(function(i, name) {
			msg.push(("<div section='item'>{0}. {1}</div>").format(i+1, name));
		});
		msg.push("</div>");
	} else {	
		var validateError = [];
		this.Events.OnValidate.trigger(validateError);
		if(validateError.length > 0) {
			msg.push("<div class='required-fields-error'>");
			msg.push(("<div section='title'>{0}</div>").format("Data validation errors:"));
			$(validateError).each(function(i, name) {
				msg.push(("<div section='item'>{0}. {1}</div>").format(i+1, name));
			});
			msg.push("</div>");
		};
	};
	
	if(msg.length > 0) {
		if(callback) {
			// It is up the caller to display the error message
			// Send back error number greater than 0 to indicate client-side validation
			callback(this, msg.join(""), -1); 
		} else {
			this.error(msg.join(""), -1);
		}
	} else {
		var self = this;
		// this.Events.OnPost.trigger(function(msg, error) {	
			// console.log("OnPost trigger at Dataset")
		// });
		// this.Events.OnPost.trigger(function(msg, error) {	
		this.Events.OnPost.trigger2(function(dataset, msg, error) {	
			// console.log({dataset:dataset, msg:msg, error:error})
			// console.log("this.Events.OnPost.trigger2")
			self.applyUpdate(msg, defaultValue(error, 0));
			if(callback !== undefined) {
				// console.log({self:self, msg:msg, error:error})
				// console.log("here 1...")
				callback(self, msg, defaultValue(error, 0));
				// console.log("here 2")
			};
		});
	};
};


Dataset.prototype.changed = function(fname, noUpdateControls) {
	if(!this.editing) {
		this.edit();
	};

	this.Columns.get(fname).change(this.recNo);	
	this.Events.OnChanged.trigger(fname);
	// console.log(fname)
	// console.log(noUpdateControls)
	if(!noUpdateControls) {
		// console.log("updated " + fname)
		this.updateControl(fname);		
	};
};

// 22-OCT-2014 ihms.0.0.1.3: added result from server
Dataset.prototype.error = function(msg, error, result) {
	this.Events.OnError.trigger({id:error, msg:msg, result:result});
};

Dataset.prototype.warning = function(msg, error, result) {
	this.Events.OnWarning.trigger({id:error, msg:msg, result:result});
};

Dataset.prototype.updateControls = function() {
	var self = this;
	$(this.controls).each(function(i, v) {
		var binding = v.data("binding");
		v.trigger("update", [self, self.Columns.get(binding.fname)]);
//		alerts(i, v)
	});
};

Dataset.prototype.getBinding = function(fname) {
	var self = this;
	var binding = undefined;
	$(this.controls).each(function(i, v) {
		binding = v.data("binding");
		if(fname == binding.fname) {
			return binding;
		};		
	});
	
	return binding;
};

Dataset.prototype.getControl = function(fname) {
	var self = this;
	var control = undefined;
	$(this.controls).each(function(i, v) {
		var binding = v.data("binding");
		if(fname == binding.fname) {
			control = v;
		};
	});
	
	return control;
};

Dataset.prototype.updateControl = function(fname) {
	this.updateControls();

//	THis is not working yet...
	// var self = this;
	// $(this.controls).each(function(i, v) {
		// var binding = v.data("binding");
		// if(v.fname == fname) {
			// v.trigger("update", [self, self.Columns.get(v.fname)]);
		// };
	// });
};

Dataset.prototype.unbindControls = function() {
		this.controls = [];
};

Dataset.prototype.bindControl = function(control, binding, custom) {
//	control must be a jQuery object, so we can store custom data
	var self = this;
	binding.dataset = this;
	control.data("dataset", this);
	control.data("binding", binding);
	control.bind("update", this.fieldUpdate);
	if(!custom) {
		control.bind("change", this.fieldChanged);
		control.bind("input", function() { // input event does not work in IE8 & below
			self.edit();
		});
	};
	
	binding.control = control;
	// binding.data("control", control);
	

//	control.bind("gettext", this.getFieldText);
//	control.bind("input", function() {
//		var binding = $(this).data("binding");
//		self.set(binding.fname, $(this).val());
//	});
//	control.bind("change", function() {
////		alerts("change")	
//	});
	
	var column = this.Columns.get(binding.fname);
	if(column && column.type == "date" && !column.isReadonly()) {
//		control.datepicker();
	};

	if(column.isReadonly()) {
		control.attr("readonly", "readonly");		
	};

	if(column.maxLength) {
		control.attr("maxLength", column.maxLength);		
	};

	if(column.upperCase) {
		control.css("text-transform", "uppercase");		
	};
		
	this.controls.push(control);
	
	return control;
};

Dataset.prototype.count = function() {
	return this.data.length;
};

Dataset.prototype.empty = function() {
	return this.data.length == 0;
};

Dataset.prototype.bof = function() {
	return this.recNo == 0;
};

Dataset.prototype.eof = function() {
	return this.recNo > this.data.length - 1;
};

Dataset.prototype.first = function(noEvent) {
	this.recNo = 0;
	if(!noEvent && this.enableEvents) {
		this.updateControls();
		this.Events.OnMoveRecord.trigger();
	}
};

Dataset.prototype.next = function(noEvent) {
	if(!this.eof())	{
		this.recNo++;
		if(!noEvent && this.enableEvents) {
			this.updateControls();
			this.Events.OnMoveRecord.trigger();
		}
	};
};

Dataset.prototype.previous = function(noEvent) {
	if(!this.bof())	{
		this.recNo--;
		if(!noEvent && this.enableEvents) {
			this.updateControls();
			this.Events.OnMoveRecord.trigger();
		}
	};
};

Dataset.prototype.raw = function(fname, recno) {
    if(recno == undefined) {
    	recno = this.recNo;
    };
    
    return this.data[recno][fname];
};

Dataset.prototype.getKey = function(recno) {
	// return this.get(this.key, recno);
	return this.get(this.primaryKey, recno);
};

Dataset.prototype.getColumnKey = function() {
	// return this.get(this.key, recno);
	return this.Columns.get(this.primaryKey);
};

Dataset.prototype.getDefault = function(fname, ifNullValue, recno) {
	if(this.isNull(fname)) {
		return ifNullValue
	} else {
		return this.get(fname, recno);
	}
};

Dataset.prototype.get = function(fname, recno) {
	if(recno == undefined) {
		recno = this.recNo;
	};
    
  var v = this.data[recno][fname];
	// var column = this.getColumn(fname);
	var column = this.Columns.get(fname);
	if(column) {		
		if(column.getText) {
			v = column.getText(this, fname, v);
		} else if(column.type == "time") {
			var dateParts = v.split("T");
			if(dateParts.length == 2) {
				try {
					v = dateParts[1];
				} catch(error){
					v = null;
				};               
			};
		} else if(column.type == "date") {
			if(this.format == "datetime") {
				v = this.dataset.formatDateTime(this.fname);
			} else {
				var dateParts = v.split("T");
				if(dateParts.length == 2) {
					var date;
					try {
						date = dateParts[0].parseDate("yyyy-MM-dd");
						v = date.format(column.format);
					} catch(error){
						v = null;
					};               
				};
			};
		}
	}
    
    if(v == null) {
        return ""
    } else {
        return v;
	}
};
	
Dataset.prototype.isNull = function(fname) {
	return this.Columns.get(fname).isNull();
};

Dataset.prototype.asDate = function(fname, recno) {
	return this.Columns.get(fname, recno).asDate();
};

Dataset.prototype.asFloat = function(fname, recno) {
	return parseFloat(this.get(fname, recno));
};

Dataset.prototype.text = function(fname) {
	return this.Columns.get(fname).text();
};

Dataset.prototype.set = function(fname, value, recno, noEvents) {
	// console.log({fname:fname, value:value})
    if(recno == undefined) {
    	recno = this.recNo;
    } else {
			this.recNo = recno;
		};

	var column = this.Columns.get(fname);
	if(column.type == "date" && Object.prototype.toString.call(value) === "[object Date]") {
		var date = new Date(value);	
		try {
			var d = date.getDate(),
					m = date.getMonth()+1,
					y = date.getFullYear(),
					hr = date.getHours(),
					min = date.getMinutes(),
					sec = date.getSeconds(),
					time = "00:00:00";

			if(column.format == "datetime") {
				value = ("{0}-{1}-{2}T{3}:{4}:{5}").format(parseInt(y),parseInt(m).strZero(2),parseInt(d).strZero(2),parseInt(hr).strZero(2),parseInt(min).strZero(2),parseInt(sec).strZero(2));
			} else {
				value = ("{0}-{1}-{2}T{3}").format(parseInt(y),parseInt(m).strZero(2),parseInt(d).strZero(2), time);
			};
			// var dateParts;
			// if(column.text() != null) {
				// dateParts = this.data[recno][fname].split("T");
			// };
			
			// if(dateParts) {
				// if(dateParts.length == 2) {
					// time = dateParts[1];
				// };
			// };
              
			// value = ("{0}-{1}-{2}T{3}").format(parseInt(y),parseInt(m).strZero(2),parseInt(d).strZero(2), time);
			// value = ("{0}-{1}-{2}T{3}:{4}:{5}").format(parseInt(y),parseInt(m).strZero(2),parseInt(d).strZero(2), hr.strZero(2), min.strZero(2), sec.strZero(2));
		} catch(error) {
			value = "";
		};
	} else if(column.type == "time" && Object.prototype.toString.call(value) === "[object Date]") {
		var date = new Date(value);	
		try {
			var d = date.getDate(),
					m = date.getMonth()+1,
					y = date.getFullYear(),
					hr = date.getHours(),
					min = date.getMinutes(),
					sec = date.getSeconds(),
					date = "";

			var dateParts;
			if(column.text() != null) {
				dateParts = this.data[recno][fname].split("T");
			};
			
			if(dateParts) {
				if(dateParts.length == 2) {
					date = dateParts[0];
				};
			};
              
			value = ("{0}T{1}:{2}:{3}").format(date, hr.strZero(2), min.strZero(2), sec.strZero(2));
			// alerts("here", value);

			// value = ("{0}-{1}-{2}T{3}:{4}:{5}").format(parseInt(y),parseInt(m).strZero(2),parseInt(d).strZero(2), hr.strZero(2), min.strZero(2), sec.strZero(2));
		} catch(error) {
			value = "";
		};
	} else {
		if(column.upperCase) {
			value = value.toUpperCase();
		};		
	};
	
	var i = this.deltaKeys.indexOf(recno);
	
	if(i == -1) {
		this.deltaKeys.push(recno);		

		var delta = {};
		for (var prop in this.data[recno]) {
			delta[prop] = this.data[recno][prop];
		};
		
		this.delta.push(delta);
	};


	this.data[recno][fname] = value;
	this.changed(fname, noEvents);
	
	return this;
};

Dataset.prototype.setDateTime = function(fname, value, recno, noEvents) {
	if(recno == undefined) {
		recno = this.recNo;
	} else {
		this.recNo = recno;
	};

	var column = this.Columns.get(fname);
	if((column.type == "date" || column.type == "time") && Object.prototype.toString.call(value) === "[object Date]") {
		var date = new Date(value);	
		try {
			var d = date.getDate(),
					m = date.getMonth()+1,
					y = date.getFullYear(),
					hr = date.getHours(),
					min = date.getMinutes(),
					sec = date.getSeconds();

			value = ("{0}-{1}-{2}T{3}:{4}:{5}").format(parseInt(y),parseInt(m).strZero(2),parseInt(d).strZero(2), hr.strZero(2), min.strZero(2), sec.strZero(2));
		} catch(error) {
			value = "";
		};
		
		var i = this.deltaKeys.indexOf(recno);
		
		if(i == -1) {
			this.deltaKeys.push(recno);		

			var delta = {};
			for (var prop in this.data[recno]) {
				delta[prop] = this.data[recno][prop];
			};
			
			this.delta.push(delta);
		};


		this.data[recno][fname] = value;
		this.changed(fname, noEvents);
	};
};

Dataset.prototype.setReadonly = function(fname, readonly) {
	// alerts("here");
	this.Columns.get(fname).setReadonly(readonly);
	// var self = this;
	$(this.controls).each(function(i, v) {
		// alerts(v);
		var binding = v.data("binding");
		// alerts(binding.fname, fname);
		if(binding.fname == fname) {
			// alerts(fname);
			var l = v.data("label");
			if(readonly) {
				v.attr("readonly","readonly");
				if(l) {
					l.attr("readonly","readonly");
				}
			} else {
				v.removeAttr("readonly");
				if(l) {
					l.removeAttr("readonly");
				}
			};
		}
		// v.trigger("update", [self, self.Columns.get(binding.fname)]);
	});
	return this;
};

Dataset.prototype.setRequired = function(fname, required) {
	this.Columns.get(fname).setRequired(required);
	$(this.controls).each(function(i, v) {
		var binding = v.data("binding");
		if(binding.fname == fname) {
			var l = v.data("label");
			if(l) {
				if(required) {
					l.attr("required","required")
				} else {
					l.removeAttr("required")
				}
			}
		}
	});
	return this;
};

Dataset.prototype.formatDateTime = function(fname, format) {
	var v = this.raw(fname);
	if(!format) {
		format = __dateformat;
	};
	
	var dateTime = v.convertDate(format);
	
	if(v !== null && v !== undefined) {
		var dateParts = v.split("T");
		if(dateParts.length == 2) {
			var timeParts = dateParts[1].split(":");
			var hr = parseInt(timeParts[0]);
			var mn = parseInt(timeParts[1]);
			var sc = parseInt(timeParts[2]);
			var ap = "AM";
			
			if(hr > 12) {
				hr -= 12;
				ap = "PM";
			};
			
			dateTime = ("{0} {1}:{2}:{3} {4}").format(dateTime, hr.strZero(2), mn.strZero(2), sc.strZero(2), ap);
		};
	};
	
	return dateTime;
};

Dataset.prototype.formatDateTimeEx = function(fname, format) {
	var v = this.raw(fname);
	if(!format) {
		format = __dateformat;
	};
	
	var dateTime = v.convertDate(format);
	
	if(v !== null && v !== undefined) {
		var dateParts = v.split("T");
		if(dateParts.length == 2) {
			var timeParts = dateParts[1].split(":");
			var hr = parseInt(timeParts[0]);
			var mn = parseInt(timeParts[1]);
			var sc = parseInt(timeParts[2]);
			var ap = "AM";
			
			if(hr > 12) {
				hr -= 12;
				ap = "PM";
			};
			
			dateTime = ("<span x-sec='date'>{0}</span> <span x-sec='time'>{1}:{2}:{3}</span> <span x-sec='ap'>{4}</span>").format(dateTime, hr.strZero(2), mn.strZero(2), sc.strZero(2), ap);			
		};
	};
	
	return dateTime;
};

Dataset.prototype.formatDateTime2 = function(fname, format) {
	var v = this.raw(fname);
	if(!format) {
		return v.convertDate2(__dateformat)
	} else {
		return v.convertDate2(format);
	}
};

//==================================================================================================
// Column
//==================================================================================================
function Column(dataset, fname) {
	this.dataset = dataset;
	this.fname = fname;
	this.label = fname;
	this.type = "";
	this.format = "";
	this.maxLength = 0;
	this.upperCase = false;
	this.password = false;
	this.required = false;
	this.numeric = false;
	this.readonly = false;
};

Column.prototype.setprops = function(props) {
	this.type = defaultValue(props.type, this.type);
	this.label = defaultValue(props.label, defaultValue(this.label, this.fname));
	// this.label = props.label == undefined ? this.fname : props.label;
	this.maxLength = defaultValue(props.maxLength, defaultValue(this.maxLength, 0));
	// this.maxLength = props.maxLength == undefined ? 0 : props.maxLength;
	this.upperCase = defaultValue(props.upperCase, defaultValue(this.upperCase, false));
	// this.upperCase = props.upperCase == undefined ? false : props.upperCase;
	this.password = defaultValue(props.password, defaultValue(this.password, false));
	// this.password = props.password == undefined ? false : props.password;
	this.required = defaultValue(props.required, defaultValue(this.required, false));
	// this.required = props.required == undefined ? false : props.required;
	this.numeric = defaultValue(props.numeric, defaultValue(this.numeric, false));
	// this.numeric = props.numeric == undefined ? false : props.numeric;
	this.readonly = defaultValue(props.readonly, defaultValue(this.readonly, false));
	// this.readonly = props.readonly == undefined ? false : props.readonly;
	this.key = defaultValue(props.key, defaultValue(this.key, false));
	// this.key = props.key == undefined ? false : props.key;
	this.format = defaultValue(props.format, this.format);
	this.lookupDataset = props.lookupDataset;
	// console.log(this.lookupDataset)
	// if(this.lookupDataset)
		// desktop.cacheDataset.add(this.lookupDataset.tableName, this.lookupDataset.data, function(data) {
			// return {
				// page: 1,
				// row_count: 0,
				// page_count: 0,
				// table_count: 1,
				// crud: {"add":false,"edit":false,"delete":false},
				// data_0: data
			// };
		// });
		// desktop.cacheDataset.add(self.cacheDatasetName, data);
	
	if(this.key) {
		this.dataset.primaryKey = this.fname;
	};
	
	if(props.type == "date" && !props.format) {
		// this.format = "mm/dd/yy";
		// this.format = "dd/mm/yy";
		this.format = __dateformat;
	};
	
	if(props.type == "money" && props.format) {
		this.format = props.format;
	};
	
	this.onChange = defaultValue(props.onChange, this.onChange);
	this.getText = defaultValue(props.getText, this.getText);
};
	
Column.prototype.isReadonly = function() {
	return this.readonly || this.dataset.readonly; 
};

Column.prototype.get = function() {
	return this.dataset.get(this.fname);
};

Column.prototype.raw = function() {
	return this.dataset.raw(this.fname);
};
	
Column.prototype.text = function() {
	var v = this.dataset.raw(this.fname);
	
	if(this.getText) {
		v = this.getText(this, v);
	} else if(this.type == "money") {		
		if(v == null) {
			v = ""
		} else if(v == ".") {
			v = (0).formatMoney(this.format);
		} else {
			v = parseFloat(v).formatMoney(this.format);
		}
	} else if(this.type == "date") {		
		if(v != null && v != undefined) {
			if(this.format == "datetime") {
				v = this.dataset.formatDateTime(this.fname);
			} else {
				var dateParts = v.split("T");
				if(dateParts.length == 2) {
					var date;
					try {
						date = dateParts[0].parseDate("yyyy-MM-dd");
						v = date.format(this.format);
					} catch(error) {
						v = null;
					};
					
				};
			};
        };
	} else if(this.type == "time") {		
		if(v != null && v != undefined) {
			var dateParts = v.split("T");
            if(dateParts.length == 2) {
							try {
								v = dateParts[1]
							} catch(error) {
								v = null;
							};
            };
        };
	} else if(v == null) {
		v = "";
	};
	
	return v;
};
	
Column.prototype.getMinutes = function() {
	var v = this.dataset.raw(this.fname);
	var min = 0;
	
	if(this.type == "date" || this.type == "time") {
		if(v != null && v != undefined) {
			var dateParts = v.split("T");
			if(dateParts.length == 2) {
				try {
					var timeParts = dateParts[1].split(":");
					min = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
				} catch(error) {
					
				};
			};
		};
	};
	
	return min;
};
	
Column.prototype.asFloat = function() {
	return parseFloat(this.dataset.raw(this.fname));
};
	
Column.prototype.isNull = function() {
	return this.dataset.raw(this.fname) == null;
};
	
Column.prototype.asDate = function() {
	var v = this.dataset.raw(this.fname);
	var date = null;
	
	if(this.type == "date") {
		if(v != null && v != undefined) {
			var dateParts = v.split("T");
            if(dateParts.length == 2) {
				try {
            		date = dateParts[0].parseDate("yyyy-MM-dd");
			    } catch(error) {
			    	
			    };
            };
        };
	};
	
	return date;
};
	
Column.prototype.asTime = function() {
	var v = this.dataset.raw(this.fname);
	var date = null;
	
	if(this.type == "date" || this.type == "time") {
		if(v != null && v != undefined) {
			var dateParts = v.split("T");
			if(dateParts.length == 2) {
				try {
					date = dateParts[0].parseDate("yyyy-MM-dd");
					var timeParts = dateParts[1].split(":");
					date.setHours(parseInt(timeParts[0]));
					date.setMinutes(parseInt(timeParts[1]));
					date.setSeconds(parseInt(timeParts[2]));
				} catch(error) {
					
				};
			};
		};
	};
	
	return date;
};

Column.prototype.asDateTime = function() {
	var value = "";
	
	if(this.type == "date" || this.type == "time") {
		value = this.text();
		if(value !== "") {
			var dateparts = this.raw().split("T");
			var time = "";
			if(dateparts.length == 2) {
				time = dateparts[1].substring(0, 5);
			};
			
			value = value +" "+ (time ? "@"+ time: "");			
		};
	};
	
	return value;
};

Column.prototype.formatDateTime = function(format) {
	return this.dataset.formatDateTime(this.fname, format);
};

Column.prototype.formatDateTimeEx = function(format) {
	return this.dataset.formatDateTimeEx(this.fname, format);
};

Column.prototype.formatDateTime2 = function(format) {
	return this.dataset.formatDateTime2(this.fname, format);
};

Column.prototype.change = function() {
	if(this.onChange) {
		this.onChange(this)
	};
};

Column.prototype.set = function(value, noEvents) {
	// console.log({f:"set", value:value})
	this.dataset.set(this.fname, value, undefined, noEvents);
	// console.log({f:"set", value:value})
};

Column.prototype.setDate = function(value, noEvents) {
	// console.log({f:"setDate", value:value})
	var d = value.getDate();
	var m = value.getMonth();
	var y = value.getFullYear();
	
	var date = this.asTime();
	date.setDate(d);
	date.setMonth(m);
	date.setYear(y);
	
	this.set(date, noEvents);
	// this.dataset.set(this.fname, value, undefined, noEvents);
};

// Column.prototype.setTime = function(value, noEvents) {
// };

Column.prototype.setTimeParts = function(hr, min, sec, noEvents) {
	var date = this.asTime();
	if(hr !== undefined) {
		date.setHours(hr);
	}
	
	if(min !== undefined) {
		date.setMinutes(min);
	}
	
	if(sec !== undefined) {
		date.setSeconds(sec);
	}
	
	this.set(date);
	// this.dataset.set(this.fname, value, undefined, noEvents);
};

Column.prototype.setReadonly = function(readonly) {
	this.readonly = readonly;
};

Column.prototype.setRequired = function(required) {
	this.required = required;
};

// Column.prototype.setHours = function(value, noEvents) {
	// this.setTimeParts(hr);
// };

//==================================================================================================
// Columns
//==================================================================================================
// Columns.prototype.add = function(fname)
// Columns.prototype.get = function(fname)
// Columns.prototype.clear = function()
// Columns.prototype.each = function(callback)
// Columns.prototype.setprops = function(fname, props)
//==================================================================================================
function Columns(dataset) {
	this.dataset = dataset;
	this.names = [];
	this.columns = [];
};
	
Columns.prototype.add = function(fname) {
	var column = new Column(this.dataset, fname);
	this.names.push(fname);
	this.columns.push(column);
	return column;
};

Columns.prototype.get = function(fname) {
	var i = this.names.indexOf(fname);
	return i < 0 ? undefined: this.columns[i];
};
	
Columns.prototype.clear = function() {
	this.names = [];
	this.columns = [];
};
	
Columns.prototype.each = function(callback) {
	$(this.columns).each(function(i, c) {
		callback(i, c);
	});
};

Columns.prototype.setprops = function(fname, props) {
	var column = this.get(fname);
	
	if(!column) {
		column = this.add(fname);
	};
	
	if(props == undefined) {
		props = {};
	};
	
	column.setprops(props);
	if(column.key) {
		this.dataset.primaryKey = column.fname;
	};
	
	return this;
};

Columns.prototype.contains = function(fname) {
	var i = this.names.indexOf(fname);
	return i >= 0 ;
};
//==================================================================================================
// File name: jbase-page.js
//==================================================================================================
//  Class.Inherits(JBasePage, JControl);
//==================================================================================================
// *************************************************************************************************
// Last modified on
// 27-SEP-2014 ihms.0.0.0.5
// *************************************************************************************************

//**************************************************************************************************
// JBasePage
//**************************************************************************************************
// var __PageID = "@PageID";
// __Browser = "@Browser";
// __Version = "@Version";

//**************************************************************************************************
// JBasePage
//**************************************************************************************************
Class.Inherits(JBasePage, JControl);
function JBasePage(Params) {
	JBasePage.prototype.parent.call(this, Params);
	this.ActiveHint;
	this.MasksCounter = 0;
};

JBasePage.prototype.classID = "JBasePage";

JBasePage.prototype.ZIndex= function() {
	return ++this.zIndex;
};

JBasePage.prototype.Initialize = function(Params) {
    JBasePage.prototype.parent.prototype.Initialize.call(this, Params);

    this.Header = $("#header-container");
    // this.Header.css("box-sizing", "border-box");
    // this.Header.css("user-select", "none");

    this.DesktopContainer = $("#desktop-container");
    // this.DesktopContainer.css("box-sizing", "border-box");
    // this.DesktopContainer.css("user-select", "none");

    this.Footer = $("#footer-container");
    // this.Footer.css("box-sizing", "border-box");
    // this.Footer.css("user-select", "none");

    this.zIndex = 100000;
	
	// alerts(this.Header)

    $.ajaxSetup({
        global: false,
        cache: false
		//headers: { 'Authorization': "Basic XXXXX" }
    });

    function __closeDialog() {
//    	Only close if this is the top-most
//			alerts("got it");
		var greatest = 0;
		var greatestDiv;

		$('div[control-type=dlg]').each(function(){
		    if($(this).css('z-index') > greatest){
		        greatest = $(this).css('z-index');
		        greatestDiv = $(this);
		    }
		});
		
		if(greatestDiv) {
//			alerts("it works!")
			greatestDiv.trigger("dlgclose");			
		};
    };
    
	$(window).bind('keydown', function(event) {
		if(event.keyCode === 27) {
			__closeDialog();
		}
	});
    
//    $("body").on("keydown", function(e) {
    	
//    	self.Close(e);
//    });
};

JBasePage.prototype.AjaxData = function(action, params, options) {
};

JBasePage.prototype.AjaxError = function(action, result) {
};

JBasePage.prototype.AjaxFail = function(action, result) {
};

JBasePage.prototype.Ajax = function(type, action, events, options) {
    var self = this;
		var params = {};
		
		if(action !== "") {
			params.dataAction = action;
		};
       
    events = events == undefined ? {} : events;
    options = options == undefined ? {} : options;

		// if(events.init == undefined) { // events.init is part of Version 2 call
			// this.AjaxData(action, params, options);    
		// } else {
			// events.init(params, options);
		// };

		this.AjaxData(action, params, options);    
		
		if(events.init != undefined) { // events.init is part of Version 2 call
			events.init(params, options);
		};
    
    if(defaultValue(options.showHint, true)) {
    	this.ShowStatus(options.hint);	
    };
    
    $.ajax({
			url: options.url,
    	type: type,
    	cache: false,
    	data: params,
			beforeSend: function(XHR, settings) {
				if(events.preinit != undefined) { // events.init is part of Version 2 call
					events.preinit(XHR, settings);
				};			
			}
    })
    .done(function(result) {
			// alerts("done");
      self.HideStatus();
			if(events.init == undefined) { // events.init is part of Version 2 call
        if(result.Status == 0) {           
        	if(events.success) {
            	events.success(result);
            };
        } else {
        	if(events.error) {
            	events.error(result);
            } else {
            	self.AjaxError(action, result)
            }
        };
			} else {
				// Version 2 expects events.result
				if(result.Status && result.Result == undefined) {
					if(events.fail == undefined) {
						self.AjaxFail(action, result)
					} else {
						events.fail(result.Message, result.Status);
					};
				} else {
					events.result(result);
				}
			};
    }).fail(function(result, x) {
			// alerts("fail");
		self.AjaxFail(action, result);
		self.HideStatus();
    });                     
    
};

JBasePage.prototype.SetHint = function(Element, Hint, CustomDraw) {
    var self = this;
    Element.data("hint", Hint);
    Element.data("customDraw", CustomDraw);
    Element.on({
        mouseenter: function() {
            self.ShowHint($(this));
        },
        mouseleave: function() {
            self.HideHint($(this));
        }
    });
};

JBasePage.prototype.SetHints = function(p) {
	var self = this;
	$('*').find(p.buttons)
		.each(function(i, o) {   
			if(p.hint) {
				$(o).parent().data("hint", p.hint);
				self.SetHint($(o).parent());		    	
			};
		});     
};

JBasePage.prototype.ShowHint = function(Element, Params) {
    this.ActiveHint = Element;
    var Hint = Element.data("hint");
    if(!Hint) { 
		Hint = "Hint not available";
	}
	
    if(!Params) {
		Params = Element.data("hint-params");
	}

    var self = this;
    var busy = setTimeout(function() {
        Element.data("busy", 0);
        var Container = Element.data("hint-data");
        if(!Container) {
            var P = Element.offset();
			var customDraw = Element.data("customDraw");

            Container = CreateElement("div", $("body")).addClass("hint");
			Element.data("hint-data", Container);

			// Container.css("opacity", 0);
			Container.css("position", "absolute");
			Container.css("white-space", "nowrap");
			Container.css("width", "auto");
			Container.css("height", "auto");
			Container.css("font-family", "Arial");
			Container.css("font-size", "10pt");
			Container.css("font-weight", "bold");
			Container.css("color", self.DefaultHintSettings.foreColor);
			Container.css("z-index", ++self.zIndex+1000000);

			var Header = CreateElement("div", Container);
			Header.css("width", "100%");
			Header.css("height", "auto");

			var Pointer = CreateElement("div", Header);
			Pointer.css("margin", "auto");
			Pointer.css("width", "0");
			Pointer.css("height", "0");
			Pointer.css("border-left", "10px solid transparent");
			Pointer.css("border-right", "10px solid transparent");
			Pointer.css("border-bottom", "10px solid " + self.DefaultHintSettings.backgroundColor);
				
			var Text = CreateElement("div", Container);
			Text.css("width", "auto");
			Text.css("height", "auto");
			Text.css("padding", 4);
			Text.css("padding-left", 10);
			Text.css("padding-right", 10);
			Text.css("background-color", self.DefaultHintSettings.backgroundColor);
			Text.css("box-shadow", "1px 1px 2px rgba(0,0,0,0.5)");
			Text.css("border-radius", "2px");
			Text.append(Hint);

            var W = Element.outerWidth();
            var H = Element.height();
            var X = 0;
            var Y = 0;

            if(Params && Params.Position == "right") {

                X = P.left + W - 10;
                Y = P.top;

				Text.css("padding", 10);
				Text.css("margin-left", "20px");

				var h = 10;
				H = Text.outerHeight();
				Header.css("float", "left");
				Header.css("width", "10px");
				Header.css("height", "100%");
				Header.css("margin-top", (H-h*2)/2 + "px");

				Pointer.css("border-top", h + "px solid transparent");
				Pointer.css("border-bottom", h + "px solid transparent");
				Pointer.css("border-right", h + "px solid " + self.DefaultHintSettings.backgroundColor);

				if(customDraw) {
					var xy = customDraw(Element, X, Y, Pointer, Header, Text);					
					X = xy.X;
					Y = xy.Y;
				};
				
            } else if(Params && Params.Position == "top") {
                X = P.left + (W - Container.width()) / 2 + 1;
                Y = P.top + H + 2;

				// if(!customDraw) {
					if(X < 0) {
						Pointer.css("margin-left", Pointer.offset().left + X - 4);
						X = 4;
					};

					if(X + Container.width() > $("body").width()) {
						var offset = ((X + Container.width()) - $("body").width() + 4);
						Pointer.css("margin-left", Pointer.offset().left + offset);
						X -= offset;
					};

					if(Y + Container.height() > $("body").height()) {
						Y = (Y - Container.height() - Element.outerHeight() - 4);
						Container.append(Header);
						Pointer.css("border-top", "10px solid " + self.DefaultHintSettings.backgroundColor);
						Pointer.css("border-bottom", "");
					};
				// } else {
					// if(X + Container.width() > $("body").width()) {
						// var offset = ((X + Container.width()) - $("body").width() + 4);
						// X -= offset;
					// };

					// if(Y + Container.height() > $("body").height()) {
						// Y = (Y - Container.height() - Element.outerHeight() - 4);
						// Container.append(Header);
					// };
				// }
            } else {
                X = P.left + (W - Container.width()) / 2 + 1;
                Y = P.top + H + 2;

				// if(!customDraw) {
					if(X < 0) {
						Pointer.css("margin-left", Pointer.offset().left + X - 4);
						X = 4;
					};

					if(X + Container.width() > $("body").width()) {
						var offset = ((X + Container.width()) - $("body").width() + 4);
						Pointer.css("margin-left", Pointer.offset().left + offset);
						X -= offset;
					};

					if(Y + Container.height() > $("body").height()) {
						Y = (Y - Container.height() - Element.outerHeight() - 4);
						Container.append(Header);
						Pointer.css("border-top", "10px solid " + self.DefaultHintSettings.backgroundColor);
						Pointer.css("border-bottom", "");
					};
				// };
            }

            Container.css("top", Y);
            Container.css("left", X);
            // Container.stop(100).animate({"opacity": 1});
        };

    }, 250);

    Element.data("busy", busy)
};

JBasePage.prototype.HideHint = function(Element) {
    if(!Element) {
        Element = this.ActiveHint;  
    };

    if(!Element) {
        return;
    };
    
    var busy = Element.data("busy");
    if(busy) {
        clearTimeout(busy);
        return;
    };

    var Container = Element.data("hint-data");
    if(Container) {
        Container.remove();
    //  Container.fadeOut(50,function(){ $(this).remove() });
        Element.removeData("hint-data");    
    }
};

JBasePage.prototype.Lock = function() {
    var Mask = CreateElement("div", $("body"));
    Mask.css("position", "absolute");
    Mask.css("top", 0);
    Mask.css("left", 0);
    Mask.css("width", "100%");
    Mask.css("height", "100%");
    Mask.css("opacity", 0.25);
    Mask.css("background-color", "black");
    Mask.css("z-index", ++this.zIndex);
    Mask.attr("id", "mask" + ++this.MasksCounter);
    return this.zIndex;
};

JBasePage.prototype.UnLock = function() {
	$("#mask" + this.MasksCounter--).remove();
};// *************************************************************************************************
// Last modified on
// 02-MAR-2015
// *************************************************************************************************
//==================================================================================================
// File name: desktop-base-2.js
//==================================================================================================
//  Class.Inherits(Desktop, JBasePage);
//==================================================================================================
var desktop;

//**************************************************************************************************
// DesktopBase()
//**************************************************************************************************
Class.Inherits(DesktopBase, JBasePage);
function DesktopBase(Params) {
    DesktopBase.prototype.parent.call(this, Params);
};

DesktopBase.prototype.classID = "DesktopBase";

DesktopBase.prototype.DefaultPainter = function() {
	return new DesktopPainter(this);
};

DesktopBase.prototype.GetHome = function() {
	return this.Home;
};

DesktopBase.prototype.PostInitialize = function(data) {
};

DesktopBase.prototype.Initialize = function(Params) {
	DesktopBase.prototype.parent.prototype.Initialize.call(this, Params);
		
	this.mobile = defaultValue(Params.mobile, false);
	// this.desktopWidth = $(window).width();
	// this.desktopHeight = $(window).height();
	this.desktopWidth = screen.width;
	this.desktopHeight = screen.height;
	// if(this.mobile) {
		// var scriptUrl = "/loadscript/app/scripts/main-mobile?pid=mobile";
		
		// desktop.getScript(scriptUrl, function(script, textStatus) {	
			
		// }, {
			// cache: true
		// });
		
		// var cssUrl = "/loadcss/app/css/main-mobile.css?pid=mobile";
		
		// CreateElement("link", $("head"))
			// .attr("href", cssUrl)
			// .attr("rel", "stylesheet")
			// .attr("type", "text/css");
	// };
	
	this.userRole = "Administrator";
	this.userRole = "Administrator";
	
	this.dataCallback = Params.cb;
	this.ver = Params.ver;
	
	this.cacheDataset = new JList();
	this.svg = new SvgCollection();
	
	this.Events = {};
	this.Events.OnInitSession = new EventHandler(this);
	this.Events.OnInitSession.add(function(desktop, data) {
		desktop.pid = data.pid;
		document.title = data.page_title;
		desktop.InitializeSession(data);
	});

	this.Events.OnInitDesktop = new EventHandler(this);
	this.Events.OnInitDesktop.add(function(desktop, data) {
		desktop.Painter.paintHeader($("#desktop-header-container"), data);
		desktop.Painter.paintSubContainer($("#navigator-menu"), data);
		desktop.Painter.paintNavigator($("#navigator-menu"), data.menu_items);
		desktop.Painter.setTitle(data.window_title);
	});

	this.Events.OnInitNavigator = new EventHandler(this);
	this.Events.OnInitNavigator.add(function(desktop, menu) {
	});
	
	this.Events.OnSelectMenu = new EventHandler(this);
	this.Events.OnSelectMenu.add(function(desktop, id) {
		// console.log(id)
		desktop.Painter.selectMenu(id);
		// console.log(desktop.selectedMenu.data("menu"))
		desktop.Events.OnChangeMenu.trigger(desktop.selectedMenu.data("menu"));
	});
		
	this.Events.OnResizeMenu = new EventHandler(this);
	
	this.Events.OnChangeMenu = new EventHandler(this);
	this.Events.OnChangeMenu.add(function(desktop, menu) {
		// console.log(menu)
		desktop.Painter.loadSubPage(menu);
	});
	
	this.Events.OnPaintLogo = new EventHandler(this);
	this.Events.OnPaintHeader = new EventHandler(this);
	this.Events.OnHeaderToolbar = new EventHandler(this);
	this.Events.OnSideMenuPageControl = new EventHandler(this);
	this.Events.OnDeveloperMenuPageControl = new EventHandler(this);
	this.Events.OnCustomPaintMenuHint = new EventHandler(this);
	this.Events.AfterPaint = new EventHandler(this);

	this.Events.OnPaintCustomHeader = new EventHandler(this);
	
	var self = this;

	this.zIndex = 10000;
	if(!this.mobile) {
		this.firstItem = "";
		$(window).bind("hashchange", function() {
			if(location.hash.slice(1) == "") {
				self.Events.OnSelectMenu.trigger(self.firstItem)
			} else {
				self.Events.OnSelectMenu.trigger(location.hash.slice(1));
			}
		});
	};
	
	this.OnAfterUpload = new EventHandler(this);

    $.ajaxSetup({
        global: true,
		cache: true,
		headers: { "X-Authorization": defaultValue($("#__UID").attr("value"), "NA") }
    });
	
	// $.ajax({
	this.ajax({
		url: this.InitCallbackUrl(),
		type: "POST",
		global: false,
		cache: false,
		dataType: "json",
		data: this.InitCallbackParams()
	}).done(function(data) {	
		if(data.status == 0) {
			self.systemData = data;
			self.customData = data.custom_data;
			if(data.Locked) {
				self.InitializeSession(data);
				self.Paint();
				self.AfterPaint();
				self.Login("lock", function() {
					self.InitDesktop(self.MenuItems = data.MenuItems);
					self.UpdateSvgs();
				});
			} else {
				self.Events.OnInitSession.trigger(data);
				self.Paint();
				self.AfterPaint();
				self.PostInitialize(data);
				self.Events.OnInitDesktop.trigger(data);
				
				if(location.hash == "") {
					// get the first sub-item in the menus
					// location.hash = data.menu_items[0].subItems[0].id
					self.Events.OnSelectMenu.trigger(self.firstItem = data.menu_items[0].subItems[0].id);
				} else {
					self.Events.OnSelectMenu.trigger(location.hash.slice(1));
				}
			};
		} else {
			if(data.status == -1) {
			}
		};
	}).fail(function() {

	});
	
	Params.DelayPainting = true;
};

DesktopBase.prototype.ajax = function(settings) {
	this.StayAlive();
	return $.ajax(settings);
};

DesktopBase.prototype.getScript = function(url, callback) {
	this.StayAlive();
	return $.ajax({
		type: "GET",
		url: url,
		success: callback,
		dataType: "script",
		cache: true
	});
};

DesktopBase.prototype.LoadCacheData = function(data, name, key) {
	var dataset = new Dataset(data, name);
	dataset.primaryKey = key;

	this.cacheDataset.add(name, dataset.data, function(data) {
		return {
			page: 1,
			row_count: 0,
			page_count: 0,
			table_count: 1,
			crud: {"add":false,"edit":false,"delete":false},
			data_0: data
		};
	});
	
	return dataset;
};

DesktopBase.prototype.InitializeSession = function(data) {	
};

DesktopBase.prototype.InitCallbackUrl = function() {
	if(this.dataCallback) {
		return this.dataCallback
	} else {
		return $("#__callback").attr("value")
	}
};

DesktopBase.prototype.InitCallbackParams = function() {
	var params = {
		action: "navigator"
	};

	if(this.VID !== undefined) {
		params.vid = this.VID;
	} else {
		params.PageID = this.PageID;
	};
	
	var searchString = window.location.search.substring(1);
	if(searchString !== "") {
		var reqparams = searchString.split("&");
		for (var i = 0; i < reqparams.length; i++) {
			var val = reqparams[i].split("=");
			params[unescape(val[0])] = unescape(val[1]);
		};
	};
	
	return params;
};

DesktopBase.prototype.GetTopMostDialogIndex = function() {
	var index = 0;

	$('div[control-type="dlg"]:not([hint])').each(function(){
		var z = parseInt($(this).css('z-index'));
		if(z > index){
			index = z;
		}
	});
	
	return index;
};

DesktopBase.prototype.AfterPaint = function() {
	DesktopBase.prototype.parent.prototype.AfterPaint.call(this);	
	
	// calculate the width of the scroll bar in the user OS
	this.scrollbarWidth = 0;
	
	var t1 = CreateElement("div", $("body"))
		.css("visibility", "hidden")
		.css("width", 100)
		.css("height", 100)
		.css("overflow", "scroll")
		.css("-ms-overflow-style", "scrollbar");
		
	var t2 = CreateElement("div", t1)
		.css("width", "100%")
		.css("height", "100%")
		.css("background", "wheat");
		
	var w1 = t1.outerWidth();
	var w2 = t2.outerWidth();
	
	this.scrollbarWidth = w1-w2;
	t1.remove();
    
	this.Events.AfterPaint.trigger();	
	
	var self = this;
	// new JSplitter({
		// target: $("#navigator-container"),
		// splitter: $("#inner-data-container div[x-sec='splitter']"),
		// onresize: function() {
			// self.Events.OnResizeMenu.trigger()
		// }
	// });
	new jResize({
		owner: this, 
		sizer: $("#inner-data-container div[x-sec='splitter']"),
		target: $("#navigator-container"),
		parent: $("#inner-data-container"),
		orientation: "vert",
		initDrag: function(drag) {
			$("body").addClass("resizing-" + drag.orientation);		
			$("#desktop-container").css("pointer-events", "none");			
			drag.baseSize = drag.target.outerWidth()
		},
		dragging: function(drag, x, y) {
			drag.target.css("flex-basis", drag.baseSize + x);
			self.Events.OnResizeMenu.trigger()
		},
		dragEnd: function(drag) {
			$("body").removeClass("resizing-" + drag.orientation);
			$("#desktop-container").css("pointer-events", "");
		}
	});
	
	
	// this.StayAlive();
	// var val = localStorage.getItem(location.hostname+"-stayAlive2");
	// if(!val) {
		// console.log("not initialized");
		// this.hasStayAlive = true;
		// localStorage.setItem(location.hostname+"-stayAlive2", 12345);
	// } else
		// console.log("alread initialized")
};

DesktopBase.prototype.StayAlive = function(callback) {
	// if(!this.hasStayAlive) return;
	// var val = parseInt(localStorage.getItem(location.hostname+"-stayAlive"));
	// this.stayAlive = parseInt(localStorage.getItem(location.hostname+"-stayAlive"));
	
	if(this.stayAlive) {
		clearInterval(this.stayAlive);
	}
	
	this.stayAlive = setInterval(function() {
		desktop.ajax({
			url: "/api/session/alive",
			type: "GET",
			success: function(response) {
				// sessionContainer.html(response);
			}
		});
	}, 1000*60*10); // 10 minutes	
	// }, 5000); // 5 seconds
	// }, 5000*2); // 10 seconds
	
	// localStorage.setItem(location.hostname+"-stayAlive", this.stayAlive);
	
	if(callback) {
		callback();
	}
};

DesktopBase.prototype.HideHints = function() {
	$(document).find(".hint").remove();
};

DesktopBase.prototype.SetHint = function(e, hint, snap) {
	 // Hint(): refer to dialogs.js
	var self = this;
	e.data("hintData", hint);
	e.data("hintSnap", snap);
	e.on("hint", function() {
		
	});
	
	var hideHint = function(e) {
		var target = e.data("hintTarget");
		var hint = target ? target: e;
		
		setTimeout(function() {
			Hint(hint, false);
		}, 100);
	};
	
	var showHint = function(e) {
		if(e.data("hintTarget")) {
			Hint(e.data("hintTarget"))
		} else {
			Hint(e)
		}
	};
	
	if(desktop.mobile) {
		var hintPressTimeout;
		e.on("touchstart", function() {
			var target = $(this);
			hintPressTimeout = setTimeout(function() {				
				showHint(target);
			}, 500);
		}).on("touchend", function() {
			var target = $(this);
			clearTimeout(hintPressTimeout);
			setTimeout(function() {				
				hideHint(target);
			}, 1000);
		});
	} else {
		e.on("mouseleave", function() {
			// displayHint($(this));
			var target = $(this).data("hintTarget");
			var hint = target ? target: $(this);
			
			setTimeout(function() {
				Hint(hint, false);
			}, 100);
		})
		.on("mouseenter", function() {
			showHint($(this));
			// if($(this).data("hintTarget"))
				// Hint($(this).data("hintTarget"))
			// else
				// Hint($(this))
		});
	};
};

DesktopBase.prototype.showBusy = function(container2) {
	var container = container2 ? container2: $("#desktop-container");
	// var container = container ? container: $("#desktop-container");
	
	this.busyContainer = CreateElement("div", container, "", "busy2")
		.css("z-index", this.zIndex++);
		
	container.data("busy", this.busyContainer);
	this.svg.draw(this.busyContainer, "refresh");
};

DesktopBase.prototype.hideBusy = function(container) {
	if(container) {
		container.data("busy").remove()
	} else if(this.busyContainer) {
		this.busyContainer.remove();
	}
};


DesktopBase.prototype.windowResizeWatch = function(e) {
	if(!this.windowResizeWatching) {
		this.windowResizeWatching = [];
		var self = this;
		$(window).on("resize", function(e) {
			$(self.windowResizeWatching).each(function(i, e) {
				$(e).trigger("resize-check");
			})
		})	
	};
	
	this.windowResizeWatching.push(e)
};

// *************************************************************************************************
// Last modified on
// 02-MAR-2015
// *************************************************************************************************
//==================================================================================================
// File name: desktop-2.js
//==================================================================================================
//  Class.Inherits(Desktop, DesktopBase);
//	Class.Inherits(JSideMenu, JControl);
//	Class.Inherits(JSideMenuItem, JButton);
//==================================================================================================

//**************************************************************************************************
// Desktop()
//**************************************************************************************************
Class.Inherits(Desktop, DesktopBase);
function Desktop(Params) {
    Desktop.prototype.parent.call(this, Params);
};

Desktop.prototype.classID = "Desktop";
Desktop.prototype.navigatorTheme = "default";

Desktop.prototype.DefaultPainter = function() {
	return new DesktopPainter(this);
};

Desktop.prototype.Ajax = function(caller, url, params, callback) {
	// $.ajax({
	this.ajax({
		type: "post",
		url: url,
		global: false,
		cache: true,
		dataType: "json",
		data: params
	}).done(function(data) {
		if(data.status == -101 || data.status == -102) {
			// desktop.Login(data.status == -101 ? "timeout":"logout", function() {
				// window.location.reload();
			// });
		} else if(callback) {
			data.caller = caller;
			callback(data);
		}
	}).fail(function() {
		// alerts("fail");
	});
};

Desktop.prototype.GetSvg = function(e, svg, size, settings) {
	return this.svg.draw(e, svg, size);
};

Desktop.prototype.RegisterSvg = function(name, size, html, base) {
	this.svg.add(name, size, html);
};

Desktop.prototype.CloneSvg = function(newName, name) {
	this.svg.clone(newName, name);
};

Desktop.prototype.Initialize = function(Params) {
	Desktop.prototype.parent.prototype.Initialize.call(this, Params);
	
	this.Events.OnSideMenuPageControl.add(function(desktop, pg) {
		pg.addTab({caption:"",
			hideCaption: true,
			icon: {
				name: "user"
			},
			OnCreate: function(tab) {
				
			}
		});
	});
	
	this.Events.OnDeveloperMenuPageControl.add(function(desktop, pg) {
		// pg.addTab({caption:"source codes",
			// icon: {
				// name: "settings",
				// color: "slateblue"
			// },
			// OnCreate: function(tab) {
				// tab.container.addClass("session-info");

				// CreateElementEx("div", tab.container, function(container) {
					// container.attr("x-sec", "content");

					// desktop.ajax({
						// url: "/engine/source-codes.aspx",
						// type: "GET",
						// data: {
							// main:"",
							// sub: ""
						// },
						// success: function(response) {
							// container.html(response);
						// }
					// });
				// });
			// }
		// });
		pg.addTab({caption:"app",
			// hideCaption: true,
			icon: {
				name: "application"
			},
			OnCreate: function(tab) {
				tab.container.addClass("session-info");

				CreateElementEx("div", tab.container, function(container) {
					container.attr("x-sec", "content");

					desktop.ajax({
						url: "/engine/tools.aspx",
						type: "GET",
						data: {
							width: desktop.desktopWidth,
							height: desktop.desktopHeight,
							dpr: window.devicePixelRatio
						},
						success: function(response) {
							container.html(response);
						}
					});
				});
				
			}
		});
		pg.addTab({caption:"icons",
			icon: {
				name: "icons",
				color: "#51ABDA"
			},
			OnCreate: function(tab) {
				tab.container.addClass("system-icons");
				CreateElementEx("div", tab.container, function(container) {
					container.attr("x-sec", "icons");
					SystemIcons({container: container});
				});
			}
		});
	});
};

Desktop.prototype.InitializeSession = function(data) {
	Desktop.prototype.parent.prototype.InitializeSession.call(this, data);
	
	this.RegisterSvg("circle", 76, '<path d="M 38,0.791664C 58.5496,0.791664 75.2083,17.4504 75.2083,38C 75.2083,58.5496 58.5496,75.2083 38,75.2083C 17.4504,75.2083 0.791662,58.5496 0.791662,38C 0.791662,17.4504 17.4504,0.791664 38,0.791664 Z M 38,5.54166C 20.0738,5.54166 5.54167,20.0738 5.54167,38C 5.54167,55.9262 20.0738,70.4583 38,70.4583C 55.9262,70.4583 70.4583,55.9262 70.4583,38C 70.4583,20.0738 55.9262,5.54166 38,5.54166 Z "/>');
	// this.RegisterSvg("circle2", 76, '<circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />');
	// this.CloneSvg("c", "circle");
	
	this.RegisterSvg("account", 24, '<path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />');
	this.RegisterSvg("account-check", 24, '<path d="M9,5A3.5,3.5 0 0,1 12.5,8.5A3.5,3.5 0 0,1 9,12A3.5,3.5 0 0,1 5.5,8.5A3.5,3.5 0 0,1 9,5M9,13.75C12.87,13.75 16,15.32 16,17.25V19H2V17.25C2,15.32 5.13,13.75 9,13.75M17,12.66L14.25,9.66L15.41,8.5L17,10.09L20.59,6.5L21.75,7.91L17,12.66Z" />');
	this.RegisterSvg("account-key", 24, '<path d="M11,10V12H10V14H8V12H5.83C5.42,13.17 4.31,14 3,14A3,3 0 0,1 0,11A3,3 0 0,1 3,8C4.31,8 5.42,8.83 5.83,10H11M3,10A1,1 0 0,0 2,11A1,1 0 0,0 3,12A1,1 0 0,0 4,11A1,1 0 0,0 3,10M16,14C18.67,14 24,15.34 24,18V20H8V18C8,15.34 13.33,14 16,14M16,12A4,4 0 0,1 12,8A4,4 0 0,1 16,4A4,4 0 0,1 20,8A4,4 0 0,1 16,12Z" />');
	this.RegisterSvg("account-multiple", 24, '<path d="M16,13C15.71,13 15.38,13 15.03,13.05C16.19,13.89 17,15 17,16.5V19H23V16.5C23,14.17 18.33,13 16,13M8,13C5.67,13 1,14.17 1,16.5V19H15V16.5C15,14.17 10.33,13 8,13M8,11A3,3 0 0,0 11,8A3,3 0 0,0 8,5A3,3 0 0,0 5,8A3,3 0 0,0 8,11M16,11A3,3 0 0,0 19,8A3,3 0 0,0 16,5A3,3 0 0,0 13,8A3,3 0 0,0 16,11Z" />');
	this.RegisterSvg("alert-circle-outline", 24, '<path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />');
	this.RegisterSvg("arrow-left-drop-circle-outline", 24, '<path d="M22,12A10,10 0 0,0 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12M14,7L9,12L14,17V7Z" />');
	this.RegisterSvg("arrow-right-drop-circle-outline", 24, '<path d="M2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2A10,10 0 0,0 2,12M4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12M10,17L15,12L10,7V17Z" />');
	this.RegisterSvg("autorenew", 24, '<path d="M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z" />');
	this.RegisterSvg("calendar-blank", 24, '<path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1"/>');
	this.RegisterSvg("check-circle-outline", 24, '<path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z" />');
	this.RegisterSvg("checkbox-blank-outline", 24, '<path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z" />');
	this.RegisterSvg("chevron-double-down", 24, '<path d="M16.59,5.59L18,7L12,13L6,7L7.41,5.59L12,10.17L16.59,5.59M16.59,11.59L18,13L12,19L6,13L7.41,11.59L12,16.17L16.59,11.59Z" />');
	this.RegisterSvg("chevron-down", 24, '<path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />');
	this.RegisterSvg("chevron-right", 24, '<path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />');
	this.RegisterSvg("chevron-left", 24, '<path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />');
	this.RegisterSvg("chevron-up", 24, '<path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />');
	this.RegisterSvg("content-save", 24, '<path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />');
	this.RegisterSvg("database", 24, '<path d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z" />');
	this.RegisterSvg("delete", 24, '<path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />');
	this.RegisterSvg("delete-variant", 24, '<path d="M21.03,3L18,20.31C17.83,21.27 17,22 16,22H8C7,22 6.17,21.27 6,20.31L2.97,3H21.03M5.36,5L8,20H16L18.64,5H5.36M9,18V14H13V18H9M13,13.18L9.82,10L13,6.82L16.18,10L13,13.18Z" />');
	this.RegisterSvg("file-outline", 24, '<path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M11,4H6V20H11L18,20V11H11V4Z" />');
	this.RegisterSvg("folder-outline", 24, '<path d="M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z" />');
	this.RegisterSvg("folder-multiple-outline", 24, '<path d="M22,4A2,2 0 0,1 24,6V16A2,2 0 0,1 22,18H6A2,2 0 0,1 4,16V4A2,2 0 0,1 6,2H12L14,4H22M2,6V20H20V22H2A2,2 0 0,1 0,20V11H0V6H2M6,6V16H22V6H6Z" />');
	this.RegisterSvg("hand-pointing-right", 24, '<path d="M21,9A1,1 0 0,1 22,10A1,1 0 0,1 21,11H16.53L16.4,12.21L14.2,17.15C14,17.65 13.47,18 12.86,18H8.5C7.7,18 7,17.27 7,16.5V10C7,9.61 7.16,9.26 7.43,9L11.63,4.1L12.4,4.84C12.6,5.03 12.72,5.29 12.72,5.58L12.69,5.8L11,9H21M2,18V10H5V18H2Z" />');
	this.RegisterSvg("history", 24, '<path d="M11,7V12.11L15.71,14.9L16.5,13.62L12.5,11.25V7M12.5,2C8.97,2 5.91,3.92 4.27,6.77L2,4.5V11H8.5L5.75,8.25C6.96,5.73 9.5,4 12.5,4A7.5,7.5 0 0,1 20,11.5A7.5,7.5 0 0,1 12.5,19C9.23,19 6.47,16.91 5.44,14H3.34C4.44,18.03 8.11,21 12.5,21C17.74,21 22,16.75 22,11.5A9.5,9.5 0 0,0 12.5,2Z" />');
	this.RegisterSvg("home", 24, '<path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>');
	this.RegisterSvg("hospital", 24, '<path d="M18,14H14V18H10V14H6V10H10V6H14V10H18M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />');
	this.RegisterSvg("link", 24, '<path d="M16,6H13V7.9H16C18.26,7.9 20.1,9.73 20.1,12A4.1,4.1 0 0,1 16,16.1H13V18H16A6,6 0 0,0 22,12C22,8.68 19.31,6 16,6M3.9,12C3.9,9.73 5.74,7.9 8,7.9H11V6H8A6,6 0 0,0 2,12A6,6 0 0,0 8,18H11V16.1H8C5.74,16.1 3.9,14.26 3.9,12M8,13H16V11H8V13Z" />');
	this.RegisterSvg("logout", 24, '<path d="M17,17.25V14H10V10H17V6.75L22.25,12L17,17.25M13,2A2,2 0 0,1 15,4V8H13V4H4V20H13V16H15V20A2,2 0 0,1 13,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2H13Z" />');
	this.RegisterSvg("magnify", 24, '<path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />');
	this.RegisterSvg("menu", 24, '<path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />');
	this.RegisterSvg("multiplication", 24, '<path d="M11,3H13V10.27L19.29,6.64L20.29,8.37L14,12L20.3,15.64L19.3,17.37L13,13.72V21H11V13.73L4.69,17.36L3.69,15.63L10,12L3.72,8.36L4.72,6.63L11,10.26V3Z" />');
	this.RegisterSvg("new-box", 24, '<path d="M20,4C21.11,4 22,4.89 22,6V18C22,19.11 21.11,20 20,20H4C2.89,20 2,19.11 2,18V6C2,4.89 2.89,4 4,4H20M8.5,15V9H7.25V12.5L4.75,9H3.5V15H4.75V11.5L7.3,15H8.5M13.5,10.26V9H9.5V15H13.5V13.75H11V12.64H13.5V11.38H11V10.26H13.5M20.5,14V9H19.25V13.5H18.13V10H16.88V13.5H15.75V9H14.5V14A1,1 0 0,0 15.5,15H19.5A1,1 0 0,0 20.5,14Z" />');
	this.RegisterSvg("note-outline", 24, '<path d="M14,10H19.5L14,4.5V10M5,3H15L21,9V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3M5,5V19H19V12H12V5H5Z" />');
	this.RegisterSvg("open-in-new", 24, '<path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />');
	this.RegisterSvg("pencil", 24, '<path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />');
	this.RegisterSvg("pencil-box-outline", 24, '<path d="M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19C21,20.11 20.1,21 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M16.7,9.35L15.7,10.35L13.65,8.3L14.65,7.3C14.86,7.08 15.21,7.08 15.42,7.3L16.7,8.58C16.92,8.79 16.92,9.14 16.7,9.35M7,14.94L13.06,8.88L15.12,10.94L9.06,17H7V14.94Z" />');
	this.RegisterSvg("security", 24, '<path d="M12,12H19C18.47,16.11 15.72,19.78 12,20.92V12H5V6.3L12,3.19M12,1L3,5V11C3,16.55 6.84,21.73 12,23C17.16,21.73 21,16.55 21,11V5L12,1Z" />');
	this.RegisterSvg("settings", 24, '<path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />');
	this.RegisterSvg("star", 24, '<path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />');
	this.RegisterSvg("table-edit", 24, '<path d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.08 20.21,11.08 20.42,11.3L21.7,12.58C21.92,12.79 21.92,13.14 21.7,13.35M12,18.94L18.07,12.88L20.12,14.93L14.06,21H12V18.94M4,2H18A2,2 0 0,1 20,4V8.17L16.17,12H12V16.17L10.17,18H4A2,2 0 0,1 2,16V4A2,2 0 0,1 4,2M4,6V10H10V6H4M12,6V10H18V6H12M4,12V16H10V12H4Z" />');
	this.RegisterSvg("table-large", 24, '<path d="M4,3H20A2,2 0 0,1 22,5V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V5A2,2 0 0,1 4,3M4,7V10H8V7H4M10,7V10H14V7H10M20,10V7H16V10H20M4,12V15H8V12H4M4,20H8V17H4V20M10,12V15H14V12H10M10,20H14V17H10V20M20,20V17H16V20H20M20,12H16V15H20V12Z"/>');
	this.RegisterSvg("thumb-down-outline", 24, '<path d="M19,15V3H23V15H19M15,3A2,2 0 0,1 17,5V15C17,15.55 16.78,16.05 16.41,16.41L9.83,23L8.77,21.94C8.5,21.67 8.33,21.3 8.33,20.88L8.36,20.57L9.31,16H3C1.89,16 1,15.1 1,14V13.91L1,12C1,11.74 1.05,11.5 1.14,11.27L4.16,4.22C4.46,3.5 5.17,3 6,3H15M15,5H5.97L3,12V14H11.78L10.65,19.32L15,14.97V5Z" />');
	this.RegisterSvg("thumb-up-outline", 24, '<path d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V10.09L23,12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z" />');
	this.RegisterSvg("timetable", 24, '<path d="M14,12H15.5V14.82L17.94,16.23L17.19,17.53L14,15.69V12M4,2H18A2,2 0 0,1 20,4V10.1C21.24,11.36 22,13.09 22,15A7,7 0 0,1 15,22C13.09,22 11.36,21.24 10.1,20H4A2,2 0 0,1 2,18V4A2,2 0 0,1 4,2M4,15V18H8.67C8.24,17.09 8,16.07 8,15H4M4,8H10V5H4V8M18,8V5H12V8H18M4,13H8.29C8.63,11.85 9.26,10.82 10.1,10H4V13M15,10.15A4.85,4.85 0 0,0 10.15,15C10.15,17.68 12.32,19.85 15,19.85A4.85,4.85 0 0,0 19.85,15C19.85,12.32 17.68,10.15 15,10.15Z" />');
	this.RegisterSvg("undo", 24, '<path d="M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z" />');
	this.RegisterSvg("unfold-more", 24, '<path d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z" />');
	
	this.RegisterSvg("checkbox-marked", 24, '<path d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />');
	this.RegisterSvg("checkbox-multiple-marked-some", 24, '<path d="M20,16V10H22V16A2,2 0 0,1 20,18H8C6.89,18 6,17.1 6,16V4C6,2.89 6.89,2 8,2H16V4H8V16H20M10.91,7.08L14,10.17L20.59,3.58L22,5L14,13L9.5,8.5L10.91,7.08M16,20V22H4A2,2 0 0,1 2,20V7H4V20H16Z" />');
	this.RegisterSvg("checkbox-multiple-marked-all", 24, '<path d="M22,16A2,2 0 0,1 20,18H8C6.89,18 6,17.1 6,16V4C6,2.89 6.89,2 8,2H20A2,2 0 0,1 22,4V16M16,20V22H4A2,2 0 0,1 2,20V7H4V20H16M13,14L20,7L18.59,5.59L13,11.17L9.91,8.09L8.5,9.5L13,14Z" />');
	this.RegisterSvg("checkbox-multiple-blank", 24, '<path d="M20,16V4H8V16H20M22,16A2,2 0 0,1 20,18H8C6.89,18 6,17.1 6,16V4C6,2.89 6.89,2 8,2H20A2,2 0 0,1 22,4V16M16,20V22H4A2,2 0 0,1 2,20V7H4V20H16Z" />');

	this.RegisterSvg("radiobox-blank", 24, '<path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />');
	this.RegisterSvg("radiobox-marked", 24, '<path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z" />');
	this.RegisterSvg("table", 24, '<path d="M5,4H19A2,2 0 0,1 21,6V18A2,2 0 0,1 19,20H5A2,2 0 0,1 3,18V6A2,2 0 0,1 5,4M5,8V12H11V8H5M13,8V12H19V8H13M5,14V18H11V14H5M13,14V18H19V14H13Z" />');
	this.RegisterSvg("close-box-outline", 24, '<path d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M17,8.4L13.4,12L17,15.6L15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4Z" />');
	this.RegisterSvg("clock", 24, '<path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />');
	this.RegisterSvg("bookmark-outline", 24, '<path d="M17,18L12,15.82L7,18V5H17M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z" />');
	this.RegisterSvg("home-variant", 24, '<path d="M8,20H5V12H2L12,3L22,12H19V20H12V14H8V20M14,14V17H17V14H14Z" />');
	this.RegisterSvg("view-dashboard", 24, '<path d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z" />');
	this.RegisterSvg("presentation-play", 24, '<path d="M2,3H10A2,2 0 0,1 12,1A2,2 0 0,1 14,3H22V5H21V16H15.25L17,22H15L13.25,16H10.75L9,22H7L8.75,16H3V5H2V3M5,5V14H19V5H5M11.85,11.85C11.76,11.94 11.64,12 11.5,12A0.5,0.5 0 0,1 11,11.5V7.5A0.5,0.5 0 0,1 11.5,7C11.64,7 11.76,7.06 11.85,7.15L13.25,8.54C13.57,8.86 13.89,9.18 13.89,9.5C13.89,9.82 13.57,10.14 13.25,10.46L11.85,11.85Z" />');
	this.RegisterSvg("stop-circle-outline", 24, '<path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M9,9V15H15V9" />');

	this.RegisterSvg("upload", 24, '<path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" />');
	this.RegisterSvg("arrow-up", 24, '<path d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" />');
	this.RegisterSvg("arrow-down", 24, '<path d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z" />');
	this.RegisterSvg("pencil-circle", 24, '<path d="M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M15.1,7.07C15.24,7.07 15.38,7.12 15.5,7.23L16.77,8.5C17,8.72 17,9.07 16.77,9.28L15.77,10.28L13.72,8.23L14.72,7.23C14.82,7.12 14.96,7.07 15.1,7.07M13.13,8.81L15.19,10.87L9.13,16.93H7.07V14.87L13.13,8.81Z" />');
	this.RegisterSvg("delete-circle", 24, '<path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z" />');
	
	this.RegisterSvg("drag-vertical", 24, '<path d="M9,3H11V5H9V3M13,3H15V5H13V3M9,7H11V9H9V7M13,7H15V9H13V7M9,11H11V13H9V11M13,11H15V13H13V11M9,15H11V17H9V15M13,15H15V17H13V15M9,19H11V21H9V19M13,19H15V21H13V19Z" />');
	this.RegisterSvg("drag-horizontal", 24, '<path d="M3,15V13H5V15H3M3,11V9H5V11H3M7,15V13H9V15H7M7,11V9H9V11H7M11,15V13H13V15H11M11,11V9H13V11H11M15,15V13H17V15H15M15,11V9H17V11H15M19,15V13H21V15H19M19,11V9H21V11H19Z" />');
	this.RegisterSvg("information", 24, '<path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />');
	this.RegisterSvg("filter-outline", 24, '<path d="M3,2H21V2H21V4H20.92L15,9.92V22.91L9,16.91V9.91L3.09,4H3V2M11,16.08L13,18.08V9H13.09L18.09,4H5.92L10.92,9H11V16.08Z" />');
	// this.RegisterSvg("filter", 24, '<path d="M3,2H21V2H21V4H20.92L14,10.92V22.91L10,18.91V10.91L3.09,4H3V2Z" />');
	this.RegisterSvg("file-excel", 24, '<path d="M6,2H14L20,8V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M13,3.5V9H18.5L13,3.5M17,11H13V13H14L12,14.67L10,13H11V11H7V13H8L11,15.5L8,18H7V20H11V18H10L12,16.33L14,18H13V20H17V18H16L13,15.5L16,13H17V11Z" /><');
	this.RegisterSvg("file-export", 24, '<path d="M6,2C4.89,2 4,2.9 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M13,3.5L18.5,9H13M8.93,12.22H16V19.29L13.88,17.17L11.05,20L8.22,17.17L11.05,14.35" />');
	this.RegisterSvg("export", 24, '<path d="M23,12L19,8V11H10V13H19V16M1,18V6C1,4.89 1.9,4 3,4H15A2,2 0 0,1 17,6V9H15V6H3V18H15V15H17V18A2,2 0 0,1 15,20H3A2,2 0 0,1 1,18Z" />');
	this.RegisterSvg("block-helper", 24, '<path d="M12,0A12,12 0 0,1 24,12A12,12 0 0,1 12,24A12,12 0 0,1 0,12A12,12 0 0,1 12,0M12,2A10,10 0 0,0 2,12C2,14.4 2.85,16.6 4.26,18.33L18.33,4.26C16.6,2.85 14.4,2 12,2M12,22A10,10 0 0,0 22,12C22,9.6 21.15,7.4 19.74,5.67L5.67,19.74C7.4,21.15 9.6,22 12,22Z" />');
	this.RegisterSvg("transfer", 24, '<path d="M3,8H5V16H3V8M7,8H9V16H7V8M11,8H13V16H11V8M15,19.25V4.75L22.25,12L15,19.25Z" />');
	this.RegisterSvg("approval", 24, '<path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />');
	this.RegisterSvg("emoticon-happy", 24, '<path d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z" />');
	this.RegisterSvg("application", 24, '<path d="M19,4C20.11,4 21,4.9 21,6V18A2,2 0 0,1 19,20H5C3.89,20 3,19.1 3,18V6A2,2 0 0,1 5,4H19M19,18V8H5V18H19Z" />');
	this.RegisterSvg("phone", 24, '<path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />');
	this.RegisterSvg("printer", 24, '<path d="M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z" />');
	this.RegisterSvg("file-multiple", 24, '<path d="M15,7H20.5L15,1.5V7M8,0H16L22,6V18A2,2 0 0,1 20,20H8C6.89,20 6,19.1 6,18V2A2,2 0 0,1 8,0M4,4V22H20V24H4A2,2 0 0,1 2,22V4H4Z" />');
	this.RegisterSvg("cloud-download", 24, '<path d="M17,13L12,18L7,13H10V9H14V13M19.35,10.03C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.03C2.34,8.36 0,10.9 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.03Z" />');
	this.RegisterSvg("close", 24, '<path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />');
	this.RegisterSvg("refresh", 24, '<path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" />');
	this.RegisterSvg("arrow-left", 24, '<path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />');
	// this.RegisterSvg("", 24, '');
	
	
	// icons from https://icons8.com/icon/set/report/win10
	this.RegisterSvg("icons8-microsoft-excel", 32, '<path d="M 15.875 4 L 15.78125 4.03125 L 4.78125 6.46875 L 4 6.65625 L 4 25.34375 L 4.78125 25.53125 L 15.78125 27.96875 L 15.875 28 L 18 28 L 18 25 L 28 25 L 28 7 L 18 7 L 18 4 Z M 16 6.03125 L 16 25.96875 L 6 23.78125 L 6 8.21875 Z M 18 9 L 26 9 L 26 23 L 18 23 L 18 21 L 20 21 L 20 19 L 18 19 L 18 18 L 20 18 L 20 16 L 18 16 L 18 15 L 20 15 L 20 13 L 18 13 L 18 12 L 20 12 L 20 10 L 18 10 Z M 21 10 L 21 12 L 25 12 L 25 10 Z M 14.15625 11 L 11.875 11.28125 L 10.625 13.96875 C 10.492188 14.355469 10.394531 14.648438 10.34375 14.84375 L 10.3125 14.84375 C 10.234375 14.519531 10.160156 14.238281 10.0625 14 L 9.4375 11.6875 L 7.3125 11.9375 L 7.21875 12 L 9 16 L 7 20 L 9.15625 20.25 L 10.03125 17.78125 C 10.136719 17.46875 10.222656 17.214844 10.25 17.0625 L 10.28125 17.0625 C 10.339844 17.386719 10.378906 17.628906 10.4375 17.75 L 11.78125 20.6875 L 14.21875 21 L 11.5625 15.96875 Z M 21 13 L 21 15 L 25 15 L 25 13 Z M 21 16 L 21 18 L 25 18 L 25 16 Z M 21 19 L 21 21 L 25 21 L 25 19 Z "/>');
	// this.RegisterSvg("XXX", 24, '');
	
	this.RegisterSvg("a-O", 512, '<path d="M256,0C114.609,0,0,114.609,0,256s114.609,256,256,256s256-114.609,256-256S397.391,0,256,0z M256,472c-119.297,0-216-96.703-216-216S136.703,40,256,40s216,96.703,216,216S375.297,472,256,472z"/>');
	// this.RegisterSvg("", 512, '');

	this.RegisterSvg("appbar.filter", "18 18 39 39", '<path d="M 34.8333,61.75L 34.8333,42.75L 19,20.5833L 57,20.5833L 41.1667,42.75L 41.1667,58.5833L 34.8333,61.75 Z "/>');
	this.CloneSvg("filter", "appbar.filter");
	
	// this.RegisterSvg("", "18 18 39 39", '');	
	// this.RegisterSvg("appbar.resource", "18 18 39 39", '<path d="M 38,23.5C 38.8643,23.5 39.7109,23.5756 40.5337,23.7206L 42.6275,18.5381L 48.1901,20.787L 46.0964,25.9692C 47.6473,27.0149 48.9851,28.3527 50.0308,29.9036L 55.213,27.8099L 57.4619,33.3725L 52.2794,35.4664C 52.4244,36.2891 52.5,37.1357 52.5,38C 52.5,38.8643 52.4244,39.7109 52.2794,40.5337L 57.4619,42.6275L 55.213,48.1901L 50.0308,46.0964C 49.0795,47.5073 47.8865,48.7418 46.5112,49.7405L 48.7844,54.8462L 43.3041,57.2891L 41.0307,52.1828C 40.0533,52.3906 39.0394,52.5 38,52.5C 37.1357,52.5 36.2891,52.4244 35.4664,52.2794L 33.3725,57.462L 27.8099,55.213L 29.9036,50.0309C 28.3527,48.9851 27.0149,47.6473 25.9691,46.0964L 20.787,48.1901L 18.538,42.6275L 23.7206,40.5336C 23.5756,39.7109 23.5,38.8643 23.5,38C 23.5,37.1357 23.5756,36.2891 23.7206,35.4664L 18.538,33.3725L 20.787,27.8099L 25.9691,29.9036C 26.9205,28.4927 28.1135,27.2582 29.4889,26.2594L 27.2157,21.1537L 32.6959,18.7109L 34.9694,23.8172C 35.9468,23.6094 36.9606,23.5 38,23.5 Z M 38,28C 32.4771,28 28,32.4772 28,38C 28,43.5229 32.4771,48 38,48C 43.5228,48 48,43.5229 48,38C 48,32.4772 43.5228,28 38,28 Z "/>');	
	// this.CloneSvg("settings", "appbar.resource");
	
	this.CloneSvg("edit", "pencil-box-outline");
	// this.CloneSvg("refresh", "autorenew");
	this.CloneSvg("new", "multiplication");
	this.CloneSvg("test", "hand-pointing-right");
	this.CloneSvg("search", "magnify");
	this.CloneSvg("export-grid", "icons8-microsoft-excel");

	this.CloneSvg("download", "cloud-download");
	this.CloneSvg("under-construction", "alert-circle-outline");
	
	// grid icons
	this.CloneSvg("user", "account");
	this.CloneSvg("users", "account-multiple");
	this.CloneSvg("table", "table-large");
	this.CloneSvg("tree-expand", "chevron-down");
	this.CloneSvg("tree-collapse", "chevron-right"); 
	this.CloneSvg("arrow-left", "arrow-left-drop-circle-outline");
	this.CloneSvg("arrow-right", "arrow-right-drop-circle-outline");
	this.CloneSvg("drop-down", "chevron-double-down");
	// this.CloneSvg("drop-down", "table");
	this.CloneSvg("drop-down-table", "table");
	
	// this.CloneSvg("db-edit", "pencil");
	// this.CloneSvg("db-edit", "pencil-box-outline");
	this.CloneSvg("db-edit", "pencil-circle");
	// this.CloneSvg("db-delete", "delete");
	// this.CloneSvg("db-delete", "delete-variant");
	// this.CloneSvg("db-delete", "close-box-outline");
	this.CloneSvg("db-delete", "delete-circle");
	this.CloneSvg("db-open", "open-in-new");
	this.CloneSvg("db-select", "checkbox-marked");
	this.CloneSvg("db-menu", "menu");
	this.CloneSvg("db-unselect", "checkbox-blank-outline");
	this.CloneSvg("db-selectall", "checkbox-multiple-marked-all");
	this.CloneSvg("db-selectsome", "checkbox-multiple-marked-some");
	this.CloneSvg("db-selectnone", "checkbox-multiple-blank");
	this.CloneSvg("db-prevpage", "arrow-left-drop-circle-outline");
	this.CloneSvg("db-nextpage", "arrow-right-drop-circle-outline");
	this.CloneSvg("db-master-detail", "table");
	
	this.CloneSvg("db-sortup", "chevron-up");
	this.CloneSvg("db-sortdown", "chevron-down");
	this.CloneSvg("db-save", "content-save");
	this.CloneSvg("db-cancel", "undo");
	this.CloneSvg("db-sort", "unfold-more");
	this.CloneSvg("db-required", "alert-circle-outline");
	
	// editor
	this.CloneSvg("radio-off", "radiobox-blank");
	this.CloneSvg("radio-on", "radiobox-marked");
	this.CloneSvg("icons", "emoticon-happy");
};

/************************************************************************************************************************
	LoadModule
	* Loading of CSS and Scripts of sub pages
	* Called from DesktopPainter.prototype.loadSubPage
************************************************************************************************************************/
function LoadModule(menu) {
	this.menu = menu;
	// this.menu.requestParams = GetUrlRequestParamsObject(menu.url)
};

// desktop.loadingModule.load(MasterPolicyEdit);
LoadModule.prototype.load = function(callback) {
	// console.log(this.menu)
	this.menu.page = callback({
		id:this.menu.id, 
		host:desktop, 
		container:this.menu.subContainer, 
		url:this.menu.url,
		requestParams: this.menu.params
	});

	this.menu.loaded = true;
};
// *************************************************************************************************
// File name: desktop-painters.js
// Last modified on
// 02-MAR-2015
// *************************************************************************************************
// *************************************************************************************************
// DesktopPainter
// *************************************************************************************************
Class.Inherits(DesktopPainter, JBasePainter);
function DesktopPainter(Control) {
    DesktopPainter.prototype.parent.call(this, Control);
    this.desktop = Control;
};

DesktopPainter.prototype.classID = "DesktopPainter";

DesktopPainter.prototype.setTitle = function(title, subTitle, icon) {
	this.desktopTitle.html(title);
	if(subTitle) {
		this.desktopSubTitle.html(subTitle);
	}
};

DesktopPainter.prototype.setSubTitle = function(subTitle, icon) {
	this.desktopSubTitle.html(subTitle);
};

DesktopPainter.prototype.paintHeader = function(container, data) {
	
	CreateElementEx("div", container, function(userInfo) {
		CreateElementEx("div", userInfo, function(userPhoto) {
			CreateElementEx("img", userPhoto, function(photo) {
				photo.attr("src", "/images/user-48.jpg");
			});
		}, "user-photo");
		CreateElementEx("div", userInfo, function(userDetail) {
			CreateElementEx("span", userDetail, function(name) {
				CreateElementEx("div", name, function(name) {
					name.attr("x-sec", "name");
					name.html("Matthew Bleach");
				});
				CreateElementEx("div", name, function(name) {
					name.attr("x-sec", "role");
					name.html("Administrator");
					// name.html(location.hostname)
				});
			}, "user-name");
		}, "user-detail");
	}, "user-info");
	
	var self = this;
	var btnSize = 32;
	
	CreateElementEx("div", container, function(toolbarContainer) {
		CreateElementEx("div", toolbarContainer, function(toolbar) {
			toolbar.attr("control-type", "toolbar");
			
			CreateElementEx("ul", toolbar, function(buttons) {
				
				// Right side panel menu button
				CreateElementEx("li", buttons, function(menu) {
					menu
						.attr("control-type", "tool-btn")
						.css("float", "right")
						.click(function() {
							if(!desktop.links) {
								desktop.links = CreateElement("div", $("#inner-data-container")).attr("id", "tools-container");
								var div = CreateElement("div", desktop.links).attr("tool-sec", "menu");
											
								self.createNavigatorMenu({
									container: CreateElement("div", div),
									theme: "links",
									menus: desktop.systemData.link_items,
									init: function(container, item) {
										if(item.url) {
											container.attr("href", "/" + item.url)
										} else {
											container.attr("href", "/app/" + item.id);
										}
									}
								});
							} else {
								desktop.links.remove();
								desktop.links = null;
							}
						});
						
					desktop.GetSvg(menu, "menu", btnSize);
				});
					
				// Logout button
				CreateElementEx("li", buttons, function(logout) {
					logout.attr("control-type", "tool-btn").css("float", "right");
					desktop.GetSvg(logout, "logout", btnSize, {noTopMargin: true}); //.css("margin-top", "25%")
					desktop.SetHint(logout, function(dialog, container) {
						container.html("Logout");
					}, "bottom");
				}).click(function() {
						desktop.Ajax(self, "/api/session/logout", undefined, function(data) {
							if (data.Status == 0) {
								window.location.href = ""
							}
						})
						});

				// Home button
				if(window.location.pathname != "/" ) {
					CreateElementEx("li", buttons, function(home) {
						home.attr("control-type", "tool-btn").css("float", "right");
						desktop.GetSvg(home, "home", btnSize, {noTopMargin: true});
						desktop.SetHint(home, function(dialog, container) {
							container.html("Go to home page");
						}, "bottom");
					}).click(function() {
						window.location = "/"
					});
				};
				
				desktop.Events.OnHeaderToolbar.trigger(buttons);
			});
			
		}, "toolbar tb-theme-main")
	}, "toolbar-container")
	
	// var toolbarContainer = CreateElement("div", container).addClass("toolbar-container")
	// var toolbar = CreateElement("div", toolbarContainer).addClass("toolbar tb-theme-main").attr("control-type", "toolbar");
	// var buttons = CreateElement("ul", toolbar);

};

DesktopPainter.prototype.paintSubContainer = function(container, data) {
	var self = this, parentContainer = $("#sub-data-container");
	
	CreateElementEx("div", parentContainer, function(titleContainer) {
		CreateElementEx("div", titleContainer, function(dataHeader) {
			dataHeader.attr("id", "parent-sub-header");
			self.desktopIcon = CreateElement("label", dataHeader).attr("x-sec", "icon");
			self.desktopTitle = CreateElement("label", dataHeader).attr("x-sec", "title");
			CreateElement("label", dataHeader).attr("x-sec", "quo").html("»");
			self.desktopSubTitle = CreateElement("label", dataHeader).attr("x-sec", "sub-title");
		});
	});

	CreateElementEx("div", parentContainer, function(container) {
		container.attr("id", "page-custom-header");
		self.Control.Events.OnPaintCustomHeader.trigger(container)
	});
	
	CreateElement("div", parentContainer).attr("id", "parent-sub-container");
	
	// var dataHeader = CreateElement("div", parentContainer).attr("id", "parent-sub-header");
		// this.desktopIcon = CreateElement("label", dataHeader).attr("x-sec", "icon");
		// this.desktopTitle = CreateElement("label", dataHeader).attr("x-sec", "title")
		// CreateElement("label", dataHeader).attr("x-sec", "quo").html("»")
		// this.desktopSubTitle = CreateElement("label", dataHeader).attr("x-sec", "sub-title")
	
	// var dataContainer = CreateElement("div", parentContainer).attr("id", "parent-sub-container");
};

DesktopPainter.prototype.paintNavigator = function(container, menus) {
	var dataContainer = $("#parent-sub-container");
	// this.paintNavigatorMenu(container, "default", menus, function(item) {
		// item.subContainer = CreateElement("div", dataContainer)
			// .addClass("sub-container")
			// .attr("id", "sub-"+ item.id)
			// .css("visibility", "hidden")
	// })
	// console.log(menus);
	var self = this;
	this.createNavigatorMenu({
		container: container,
		theme: this.Control.navigatorTheme,
		menus: menus,
		click: function(e) {
			// location.hash = $(e.target).attr("href");
		},
		init: function(container, item) {
			container
				.attr("href", "#"+item.id);
				
			item.subContainer = CreateElement("div", dataContainer)
				.addClass("sub-container")
				.attr("id", "sub-"+ item.id);
				// .css("visibility", "hidden");
				
			self.showSubContainer(item.subContainer, false);
		}
	});
};

DesktopPainter.prototype.showSubContainer = function(container, visible) {
	if(visible) {
		container.css({
			"visibility": "visible",
			"opacity": 1,
			"pointer-events": "",
			"z-index": 1
		})
	} else {
		container.css({
			"visibility": "hidden",
			"opacity": 0,
			"pointer-events": "none",
			"z-index": 0
		});
	}
};

DesktopPainter.prototype.createNavigatorMenu = function(params) {
	params.container.addClass("navtree").attr("theme", params.theme);
	
	var clickMain = function(e) {
		var img = $(e.target).data("icon");
		var items = $(e.target).data("items");
		var expand = !img.data("expand");
		
		img.data("expand", expand);
		img.attr("x-exp", expand ? "1" : "0");
		if(expand) {
			img.html("");
			desktop.GetSvg(img, "tree-expand", 0);
			items.css("display", "block");
		} else {
			img.html("");
			desktop.GetSvg(img, "tree-collapse", 0);
			items.css("display", "none");
		};
	};
	
	// var clickItem = function(e) {
		// location.hash = $(e.target).attr("href");
	// };
	
	var addItem = function(container, type, label, icon) {
		var main;
		
		if(type == "main") {
			main = CreateElement("div", container)
				.attr("x-sec", type)
		} else {
			main = CreateElement("a", container)
				.attr("x-sec", type)
		}
		
		// var a = CreateElement("a", main);
		var img = CreateElement("span", main)
		// var img = CreateElement("span", a)
			.attr("x-sec", "icon")
			.attr("x-exp", "1")
			.data("expand", true);
			
		desktop.GetSvg(img, icon, type=="main" ? 0: 0);
			
		main.data("icon", img);
			
		CreateElement("span", main)
			.attr("x-sec", "label")
			.html(label);
			
		if(type == "main") {
			main.click(clickMain)
		} else {
			main.click(params.click);
		}
		
		return main;
	};
	
	$(params.menus).each(function(i, item) {
		var branch = CreateElement("div", params.container)
			.attr("x-sec", "branch");
			
		var main = addItem(branch, "main", item.title, "tree-expand");
		
		var items = CreateElement("div", branch)
			.attr("x-sec", "items");
			
			if(item.subItems) {
				$(item.subItems).each(function(i, item) {
					var div = addItem(items, "item", item.title, item.icon == "" ? "&#xf015;": item.icon)
								.attr("id", "menu-"+item.id)
								.attr("data-selected", "0")
								.attr("data-id", item.id)
								// .attr("href", "#"+item.id)
								.data("menu", item);
					
					params.init(div, item);
				});
			};
			
		main.data("items", items);
	});
};

DesktopPainter.prototype.selectMenu = function(id) {
	if(desktop.selectedMenu) {
		var sub = $("#sub-"+desktop.selectedMenu.data("menu").id);
		desktop.selectedMenu.attr("data-selected", "0");
		// sub.css("visibility", "hidden");
		this.showSubContainer(sub, false);
	};
	
	desktop.selectedMenu = $("#menu-" + id).attr("data-selected", "1");
	// $("#sub-" + id).css("visibility", "visible");
	this.showSubContainer($("#sub-" + id), true);
}; 

DesktopPainter.prototype.selectMenuAnimate = function(id) {
	if(desktop.selectedMenu) {
		desktop.selectedMenu.attr("data-selected", "0");
		var o = $("#sub-"+desktop.selectedMenu.data("menu").id);
		var n = $("#sub-"+id)
			.css("left", -o.width())
			.css("display", "block");
			
		o.animate({left: o.width()}, {
			complete: function() {
				o.css("display", "none");
			}
		});
			
		n.animate({left: 0}, {
			complete: function() {
				n.css("left", 0);
				n.css("display", "block");
			}
		});
	} else {
		$("#sub-"+id).css("display", "block");
	};
	desktop.selectedMenu = $("#menu-" + id).attr("data-selected", "1");
};

// Called from desktop-base-2.js, in DesktopBase.prototype.Initialize
DesktopPainter.prototype.loadSubPage = function(menu) {
	if(menu && !menu.loaded) {
		var url, src, pid, cssUrl, scriptUrl;

		url = menu.url.split("?"); // There really should be no ?params=xxxxx, in the url!
		pid = url[0].split("/")[1];
		src = url[0].split("/")[0];

		if(menu.css == "*") {
			cssUrl = ""
		} else if(menu.css == "") {
			cssUrl = ("/loadcss/{0}/css/{1}?pid={0}&sub-name={2}").format(src, pid, menu.id)
		} else {
			cssUrl = ("/loadcss/{0}/css/{1}?pid={0}&sub-name={2}").format(src, menu.css, menu.id)
		}
		
		if(menu.scripts == "*") {
			scriptUrl = ""
		} else {
			scriptUrl = ("/loadscript/{0}/scripts/{1}?pid={1}").format(src, pid);
		}
			
		if(cssUrl) {
			CreateElement("link", $("head"))
				.attr("href", cssUrl)
				.attr("rel", "stylesheet")
				.attr("type", "text/css");
		}
					
		desktop.subModule = new LoadModule(menu); // LoadModule refer to desktop-2.js

		if(menu.content) {
			var self = this;
			var loadContent = ("/{0}").format(menu.content);
			
			// we expect HTML data from this call
			menu.subContainer.load(loadContent, function(content) {
				self.loadScript(menu, scriptUrl)
			});
		} else {
			this.loadScript(menu, scriptUrl)
		}
	};
	
	if(menu) {
		// this.setSubTitle(menu.title);
		this.setSubTitle(menu.description);
	}
};

DesktopPainter.prototype.loadScript = function(menu, url) {
	if(menu.run) {		
		eval(("desktop.subModule.load({0})").format(menu.run));
	} else if(url) {
		$.getScript(url, function(script, textStatus) {	
			if(script && !menu.loaded) {
				menu.page = CreateSubPage({id:menu.id, host:desktop, container:menu.subContainer, url:menu.url, requestParams:menu.params});
				menu.loaded = true;
			};
		}, {
			cache: false
		});
	} else {
		menu.loaded = true;
	}
};// *************************************************************************************************
// File name: desktop-painters-5.js
// Last modified on
// 3:20 PM Monday, October 9, 2017
// *************************************************************************************************
// *************************************************************************************************
// DesktopPainter5
// *************************************************************************************************
Class.Inherits(DesktopPainter5, JBasePainter);
function DesktopPainter5(Control) {
    DesktopPainter5.prototype.parent.call(this, Control);
    this.desktop = Control;
};

DesktopPainter5.prototype.classID = "DesktopPainter5";

DesktopPainter5.prototype.Paint = function() {
	DesktopPainter5.prototype.parent.prototype.Paint.call(this);
	
	var self = this;
	
	if(desktop.mobile) {
		$("body").find(".loading").remove();
		$("body").find("style").remove();
		$("body").find("script").remove();
		
		CreateElementEx("div", $("body"), function(container) {
			self.headerContainer = CreateElementEx("div", container, function(header) {
			}, "mobile-header");
			
			CreateElementEx("div", container, function(content) {
				content.attr("id", "parent-sub-container");
			}, "mobile-content");
			
		}, "mobile-view");
	} else {
		new jSplitContainer($.extend({}, {
			paintParams: {
				theme: "white-green-dark",
				css: "main-desktop-split" + (desktop.mobile ? " mobile": "")
				// css: "main-desktop-split mobile"
			},
			container: $("body"),
			orientation: "vert",
			// size: 250,
			size: desktop.mobile ? 0: 250,
			usePercent: false,
			noBorder: true,
			init: function(splitter) {
				splitter.events.OnPaintPane1.add(function(splitter, container) {
					// if(!desktop.mobile) {
						CreateElementEx("div", container, function(userInfo) {
							CreateElementEx("div", userInfo, function(userPhoto) {
								CreateElementEx("img", userPhoto, function(photo) {
									photo.attr("src", "/images/user-48.jpg");
								});
							}, "user-photo");

							CreateElementEx("div", userInfo, function(userDetail) {
								CreateElementEx("span", userDetail, function(name) {
									CreateElementEx("div", name, function(name) {
										name.attr("x-sec", "name");
										name.html(desktop.userName);
									});
									CreateElementEx("div", name, function(name) {
										name.attr("x-sec", "role");
										name.html(desktop.userRole);
										// name.html(location.hostname)
									});
								}, "user-name");
							}, "user-detail");
							
						}, "user-info");
						
						self.navContainer = CreateElementEx("div", container, function(nav) {
							// new jScroller({
								// target: nav
							// })
						}, "nav-container");
					// };
				});
				
				splitter.events.OnPaintPane2.add(function(splitter, container) {
					self.rightPanel = container;
					self.headerContainer = CreateElementEx("div", container, function(header) {
						
					}, "header");
					
					CreateElementEx("div", container, function(content) {
						content.attr("id", "parent-sub-container");
					}, "content");
				});
			}
		}));	
	};
};

DesktopPainter5.prototype.setTitle = function(title, subTitle, icon) {
	if(!desktop.mobile) {
		this.desktopTitle.html(title);
		if(subTitle) {
			this.desktopSubTitle.html(subTitle);
		}
	};
};

DesktopPainter5.prototype.setSubTitle = function(subTitle, icon) {
	if(!desktop.mobile) {
		this.desktopSubTitle.html(subTitle);
	}
};

DesktopPainter5.prototype.paintHeader = function(container, data) {
	if(desktop.mobile) {
		return;
	}
	
	var self = this;
	
	CreateElementEx("div", this.headerContainer, function(header1) {
		CreateElementEx("div", header1, function(titleContainer) {
			
			// if(desktop.mobile)
				// self.mobileMenu = CreateElementEx("span", titleContainer, function(menuIcon) {
					// desktop.svg.draw(menuIcon, "menu", 24)
						// .click(function() {
							// console.log("OK")
						// });
				// });
			
			if(desktop.mobile) {
				// CreateElementEx("div", titleContainer, function(logo) {
					// logo.css({
						// "float": "left",
						// "height": "100%",
						// "display": "flex",
						// "padding-left": 4
					// });
					
					// CreateElement("img", logo)
						// .attr("src", "/images/company-logo.png")
						// .css({
							// "margin": "auto",
							// "width": 38,
							// "height": 38
						// })
				// })
			} else {
				self.desktopTitle = CreateElementEx("span", titleContainer, function(title) {
					title.html("Title")
				});
				
				self.desktopSubTitle = CreateElementEx("span", titleContainer, function(subTitle) {
					subTitle.html("Sub-title")
				});
			};
			
		}, "title-container");
		
		CreateElementEx("div", header1, function(toolbarContainer) {
			var toolbar = new JToolbar({
					container: toolbarContainer,
					css: "toolbar",
					theme: "svg",
					hintAlign: "bottom",
					buttonSize: 24
			});
			
			
			if(!desktop.mobile) {
				toolbar.NewItem({
					id: "menu",
					icon: "menu",
					iconColor: "slategray",
					align: "right",
					click: function() {
						if(!self.userMenu) {
							self.userMenu = new jSideMenu({
								container: self.rightPanel,
								headerContainer: self.headerContainer,
								initPageControl: desktop.Events.OnSideMenuPageControl
							})
						} else {
							self.userMenu.show();
							// self.showSideMenu();
						}
					}
				});
			}
			
			// if(!desktop.mobile) {
				toolbar.NewItem({
					id: "developer",
					// icon: "a-O+settings",
					icon: "settings",
					// icon: "test-01",
					// iconColor: "firebrick",
					iconColor: "slategray",
					hint: "Developer's Workspace",
					// align: "left",
					align: "right",
					click: function() {
						if(!self.developerMenu) {
							self.developerMenu = new jSideMenu({
								container: self.rightPanel,
								headerContainer: self.headerContainer,
								initPageControl: desktop.Events.OnDeveloperMenuPageControl
							})
						} else {
							self.developerMenu.show();
						}
					}
				});
			// };
			
			
			// if(desktop.mobile) {
				// toolbar.NewItem({
					// id: "fullsceen",
					// icon: "a-O",
					// iconColor: "black",
					// align: "right",
					// click: function(item) {
						// var body = document.documentElement;
							// body.webkitRequestFullscreen();
					// }
				// });
			// };
			
			toolbar.NewDropDownConfirmItem({
				id: "logout",
				icon: desktop.mobile ? "close" : "logout",
				iconColor: desktop.mobile ? "firebrick" : "slategray",
				color: "firebrick",
				noIndicator: true,
				align: "right",
				hint: "Logout",
				title: "Logout",
				subTitle: "Are you sure you want to log out?",
				s: true,
				confirm: function() {
					desktop.Ajax(self, "/api/session/logout", undefined, function(data) {
						if (data.Status == 0) {
							window.location.href = ""
						}
					})
				}
			});
			
			desktop.Events.OnHeaderToolbar.trigger(toolbar);
			
			// toolbar.NewItem({
				// id: "logout",
				// icon: "logout",
				// iconColor: "#8DCF6E",
				// hint: "Logout",
				// align: "right",
				// click: function(item) {
					// desktop.Ajax(self, "/api/session/logout", undefined, function(data) {
						// if (data.Status == 0) {
							// window.location.href = ""
						// }
					// })
				// }
			// });
			
			if(window.location.pathname !== "/" && !desktop.mobile) {
				toolbar.NewItem({
					id: "home",
					icon: "home",
					// iconColor: "#8DCF6E",
					iconColor: "slategray",
					align: "right",
					click: function(item) {
						// window.location = "/";
						window.location.reload(true);
					}
				});
			};
			
			if(desktop.mobile) {
				toolbar.NewItem({
					id: "refresh",
					icon: "refresh",
					iconColor: "forestgreen",
					align: "right",
					click: function(item) {
						window.location = "/app/mobile";
					}
				});
			};
			
		}, "toolbar-container");
	}, "page-header");
	
	CreateElementEx("div", this.headerContainer, function(header2) {
		header2.attr("id", "page-custom-header");
		self.Control.Events.OnPaintCustomHeader.trigger(header2);
	}, "");
};

DesktopPainter5.prototype.paintSubContainer = function(container, data) {
};

DesktopPainter5.prototype.paintNavigator = function(container, menus) {
	var self = this;
	var dataContainer = $("#parent-sub-container");

	if(desktop.mobile) {
		
		var item = menus[0].subItems[0];
		item.subContainer = CreateElement("div", dataContainer)
			.addClass("sub-container")
			.attr("id", "sub-"+ item.id);
			
		this.showSubContainer(item.subContainer, false);
		desktop.Painter.loadSubPage(item);
	} else {
		this.createNavigatorMenu({
			// container: container,
			container: this.navContainer,
			theme: this.Control.navigatorTheme,
			menus: menus,
			click: function(e) {
				// location.hash = $(e.target).attr("href");
			},
			init: function(container, item) {
				container
					.attr("href", "#"+item.id);
					
				item.subContainer = CreateElement("div", dataContainer)
					.addClass("sub-container")
					.attr("id", "sub-"+ item.id);
					// .css("visibility", "hidden");
					
				self.showSubContainer(item.subContainer, false);
			}
		});
};
};

DesktopPainter5.prototype.showSubContainer = function(container, visible) {
	if(visible) {
		container.css({
			"visibility": "visible",
			"opacity": 1,
			"pointer-events": "",
			"z-index": 1
		})
	} else {
		container.css({
			"visibility": "hidden",
			"opacity": 0,
			"pointer-events": "none",
			"z-index": 0
		});
	}
};

DesktopPainter5.prototype.createNavigatorMenu = function(params) {
	params.container.addClass("navtree").attr("theme", params.theme);
	
	// console.log("OK")
	var clickMain = function(e) {
		var img = $(e.target).data("icon");
		var items = $(e.target).data("items");
		var expand = !img.data("expand");
		
		img.data("expand", expand);
		img.attr("x-exp", expand ? "1" : "0");
		if(expand) {
			img.html("");
			desktop.GetSvg(img, "tree-expand", 0);
			items.css("display", "block");
		} else {
			img.html("");
			desktop.GetSvg(img, "tree-collapse", 0);
			items.css("display", "none");
		};
	};
	
	// var clickItem = function(e) {
		// location.hash = $(e.target).attr("href");
	// };
	
	var addItem = function(container, type, label, icon) {
		var main;
		
		if(type == "main") {
			main = CreateElement("div", container)
				.attr("x-sec", type)
		} else {
			main = CreateElement("a", container)
				.attr("x-sec", type)
		}
		
		// var a = CreateElement("a", main);
		var img = CreateElement("span", main)
		// var img = CreateElement("span", a)
			.attr("x-sec", "icon")
			.attr("x-exp", "1")
			.data("expand", true);
			
		desktop.GetSvg(img, icon, type=="main" ? 0: 0);
			
		main.data("icon", img);
			
		CreateElement("span", main)
			.attr("x-sec", "label")
			.html(label);
			
		if(type == "main") {
			main.click(clickMain)
		} else {
			main.click(params.click);
		}
		
		return main;
	};
	
	$(params.menus).each(function(i, item) {
		var branch = CreateElement("div", params.container)
			.attr("x-sec", "branch");
			
		var main = addItem(branch, "main", item.title, "tree-expand");
		
		var items = CreateElement("div", branch)
			.attr("x-sec", "items");
			
			if(item.subItems) {
				$(item.subItems).each(function(i, item) {
					var div = addItem(items, "item", item.title, item.icon == "" ? "&#xf015;": item.icon)
								.attr("id", "menu-"+item.id)
								.attr("data-selected", "0")
								.attr("data-id", item.id)
								// .attr("href", "#"+item.id)
								.data("menu", item);
					
					params.init(div, item);
				});
			};
			
		main.data("items", items);
	});
};

DesktopPainter5.prototype.selectMenu = function(id) {
	if(desktop.selectedMenu) {
		var sub = $("#sub-"+desktop.selectedMenu.data("menu").id);
		desktop.selectedMenu.attr("data-selected", "0");
		// sub.css("visibility", "hidden");
		this.showSubContainer(sub, false);
	};
	
	desktop.selectedMenu = $("#menu-" + id).attr("data-selected", "1");
	// $("#sub-" + id).css("visibility", "visible");
	this.showSubContainer($("#sub-" + id), true);
}; 

DesktopPainter5.prototype.selectMenuAnimate = function(id) {
	if(desktop.selectedMenu) {
		desktop.selectedMenu.attr("data-selected", "0");
		var o = $("#sub-"+desktop.selectedMenu.data("menu").id);
		var n = $("#sub-"+id)
			.css("left", -o.width())
			.css("display", "block");
			
		o.animate({left: o.width()}, {
			complete: function() {
				o.css("display", "none");
			}
		});
			
		n.animate({left: 0}, {
			complete: function() {
				n.css("left", 0);
				n.css("display", "block");
			}
		});
	} else {
		$("#sub-"+id).css("display", "block");
	};
	desktop.selectedMenu = $("#menu-" + id).attr("data-selected", "1");
};

// Called from desktop-base-2.js, in DesktopBase.prototype.Initialize
DesktopPainter5.prototype.loadSubPage = function(menu) {
	if(menu && !menu.loaded) {
		var url, src, pid, cssUrl, scriptUrl;

		url = menu.url.split("?"); // There really should be no ?params=xxxxx, in the url!
		pid = url[0].split("/")[1];
		src = url[0].split("/")[0];

		if(menu.css == "*") {
			cssUrl = ""
		} else if(menu.css == "") {
			// cssUrl = ("/loadcss/{0}/css/{1}?pid={0}&sub-name={2}").format(src, pid, menu.id)
			// cssUrl = ("/loadcss/{0}/css/{1}.css?pid={0}&sub-name={2}").format(src, pid, menu.id)
			cssUrl = ("/loadcss/{0}/css/{1}.css").format(src, pid, menu.id)
		} else {
			cssUrl = ("/loadcss/{0}/css/{1}?pid={0}&sub-name={2}").format(src, menu.css, menu.id)
		}
		
		if(menu.scripts == "*") {
			scriptUrl = ""
		} else {
			// scriptUrl = ("/loadscript/{0}/scripts/{1}?pid={1}").format(src, pid);
			scriptUrl = ("/loadscript/{0}/scripts/{1}.js").format(src, pid);
		}
			
		if(cssUrl) {
			CreateElement("link", $("head"))
				.attr("href", cssUrl)
				.attr("rel", "stylesheet")
				.attr("type", "text/css");
		}
					
		desktop.subModule = new LoadModule(menu); // LoadModule refer to desktop-2.js

		if(menu.content) {
			var self = this;
			var loadContent = ("/{0}").format(menu.content);
			
			// we expect HTML data from this call
			menu.subContainer.load(loadContent, function(content) {
				self.loadScript(menu, scriptUrl)
			});
		} else {
			this.loadScript(menu, scriptUrl)
		}
	};
	
	if(menu) {
		// this.setSubTitle(menu.title);
		this.setSubTitle(menu.description);
	}
};

DesktopPainter5.prototype.loadScript = function(menu, url) {
	if(menu.run) {		
		eval(("desktop.subModule.load({0})").format(menu.run));
	} else if(url) {
		// $.getScript(url, function(script, textStatus) {	
		desktop.getScript(url, function(script, textStatus) {	
			if(script && !menu.loaded) {
				menu.page = CreateSubPage({id:menu.id, host:desktop, container:menu.subContainer, url:menu.url, requestParams:menu.params});
				menu.loaded = true;
			};
		}, {
			cache: true
		});
	} else {
		menu.loaded = true;
	}
};

// *************************************************************************************************
// jSideMenu
// *************************************************************************************************
function jSideMenu(params) {
	
	this.parentContainer = params.container; // this.rightPanel
	this.snapHeaderContainer = params.headerContainer; // this.headerContainer
	this.initPageControl = params.initPageControl; // this.headerContainer
	this.iconSize = defaultValue(params.iconSize, 24);
	this.iconColor = defaultValue(params.iconColor, "#1AB394");
	this.theme = defaultValue(params.theme, "side-menu");
	this.created = false;
	this.visible = false;
	
	this.show();
};

jSideMenu.prototype.toggle = function() {
	var self = this;
	$("body").on("mousedown", function(e) {	
		var dialog = $(e.target).closest("div[control-type='dlg']");
		var targetIndex = defaultValue(dialog.css("z-index"), 0);
		if(targetIndex != desktop.GetTopMostDialogIndex()) { // BUT! if there is a dialog box on top of this then do not hide
			self.show();
		}
	});
};

jSideMenu.prototype.show = function() {
	var self = this;
	
	if(this.created) {
		this.sideMenuContainer.css("display", this.visible ? "none" : "block");
		this.visible = !this.visible;
		if(!this.visible) {
			$("body").off("mousedown")
		} else {
			this.sideMenuContainer.css("z-index", ++desktop.zIndex);
			this.toggle();
		};
		
		return;
	};
	
	this.sideMenuContainer = CreateElementEx("div", this.parentContainer, function(sideMenuContainer) {
	// this.sideMenuContainer = CreateElementEx("div", $("body"), function(sideMenuContainer) {
		var header = self.snapHeaderContainer.find(".page-header");
		
		sideMenuContainer.addClass("side-panel");
		sideMenuContainer.attr("control-type", "dlg");
		
		sideMenuContainer.css({
			"top": header.outerHeight(),
			"height": "Calc(100% - " +header.outerHeight()+"px)",
			"z-index": ++desktop.zIndex
		});
		
		self.created = true;
		self.visible = true;
		
		new jPageControl({
			paintParams: {
				theme: self.theme,
				leftBorder: true,
				// tabsAlign: "right",
				// fullBorder: true,
				icon: {
					size: self.iconSize,
					position: "left",
					color: self.iconColor
				}
			},
			indent: 0,
			container: sideMenuContainer,
			init: function(pg) {
				self.initPageControl.trigger(pg);
			}
		});
		
		self.toggle();
	});
};
//**************************************************************************************************
// SvgCollection()
//**************************************************************************************************
function SvgCollection() {
	this.list = new JList();
	this.map = new JList();
};

SvgCollection.prototype.add = function(name, size, html) {
	var svg = new Svg(name, size, html);
	svg.register();
	
	this.list.add(name, svg);
	this.map.add(name, name);
};

SvgCollection.prototype.clone = function(as, name) {
	if(!this.map.exists(as)) {
		this.map.add(as, name);
	};
};

SvgCollection.prototype.draw = function(c, name, size) {		
	var parts = name.split(",");
	if(parts.length > 1) {
		name = parts[0];
	}
		
	if(this.map.exists(name)) {
		var svg = this.list.get(this.map.get(name)).draw(c, size);
		if(parts.length > 1) {
			svg.attr("x-sec", parts[1]);
		}
		
		return svg;
	} else {
		return undefined;
	}
};

SvgCollection.prototype.draw2 = function(c, name, callback) {		
	if(this.map.exists(name)) {
		var svg = this.list.get(this.map.get(name)).draw(c);
		if(callback) {
			callback(svg)
		}
		
		return svg;
	} else {
		return undefined;
	}
};

SvgCollection.prototype.isClone = function(name) {	
	return !this.list.exists(name);
};

SvgCollection.prototype.getClone = function(name) {	
	return this.map.get(name);
};

SvgCollection.prototype.each = function(callback) {
	// var names = this.map.names;
	var names = JSON.parse(JSON.stringify(this.map.names));
	names.sort();
	
	for(var i = 0; i < names.length; i++) {
		callback(i, names[i]);
	};
	// this.map.getNames(callback);
};

//**************************************************************************************************
// Svg()
//**************************************************************************************************
function Svg(name, size, html) {
	this.name = name;
	this.size = size;
	this.html = html;
};

Svg.prototype.register = function() {
	var container = $("#svg-collection");
	
	var svg = [];
	svg.push(("<svg id='svg-{0}'").format(this.name));
	svg.push("x='0px'");
	svg.push("y='0px'");	
	svg.push("stroke-width='4'");
	
	if(isNaN(this.size)) {
		svg.push(("viewBox='{0}'").format(this.size))
	} else {
		svg.push(("viewBox='0 0 {0} {0}'").format(this.size))
	}
	
	svg.push(">");
	svg.push(this.html);
	svg.push("</svg>");
	
	container.append(svg.join(" "));
};

Svg.prototype.prepare = function(e, scale, init, done) {
	var svg = [];
	svg.push("<svg ");
	// svg.push("x='0px'");
	// svg.push("y='0px'");
	if(scale) {
		svg.push(("width='{0}px'").format(scale));
		svg.push(("height='{0}px'").format(scale));
	};
	svg.push(">");
	init(svg);
	svg.push("</svg>");
	var s = $(svg.join(" "));
	e.append(s);
	done(s);
	
	return $(s);
};

Svg.prototype.draw = function(c, size) {	
	var self = this;
	var svg = this.prepare(c, size, function(svg) {
		svg.push(("<use xlink:href='#svg-{0}'/>").format(self.name));
	}, function(svg) {
		
	});	
	
	return svg;
};
// *************************************************************************************************
// File name: toolbar.js
// Last modified on
// 03-MAR-2015
// *************************************************************************************************
//**************************************************************************************************
// JToolbar
//**************************************************************************************************
Class.Inherits(JToolbar, JControl);
function JToolbar(Params) {
    JToolbar.prototype.parent.call(this, Params);
};

JToolbar.prototype.classID = "JToolbar";

JToolbar.prototype.DefaultPainter = function() {
    return new ToolbarPainter(this);
};

JToolbar.prototype.Initialize = function(params) {
    JToolbar.prototype.parent.prototype.Initialize.call(this, params);
    this.id = params.id;
    this.container = params.container;
    this.css = params.css;
    this.theme = params.theme;
    this.buttonSize = params.buttonSize;
    this.hintAlign = defaultValue(params.hintAlign, "top");
	this.list = new JList();
	
	this.Events = {};
	this.Events.OnSelectItem = new EventHandler(this);
	this.Events.OnSelectItem.add(function(toolbar, item) {
		item.click(item);
	});
};

JToolbar.prototype.getItem = function(name) {
	return this.list.get(name);
}

JToolbar.prototype.SetVisible = function(name, visible) {
	this.list.get(name).show(visible);
}

JToolbar.prototype.NewItem = function(params) {

	params.toolbar = this;
	var item = new JToolbarButton(params);
	
	return this.list.add(item.id, item);
};

// JToolbar.prototype.NewTextBox = function(params) {
// };

JToolbar.prototype.NewDropdownItem = function(params) {
	params.dropdown = true;
	params.noIndicator = defaultValue(params.noIndicator, false);
	params.click = function(item) {
		new JPopupDialog({
			Target: item.Element(),				
			Modal: false,
			onClose: params.onClose,
			Painter: {
				painterClass: PopupOverlayPainter,
				color: defaultValue(params.color, "dimgray"),
				snap: "bottom",
				// align: defaultValue(params.dlgAlign, "left"),
				align: defaultValue(params.dlgAlign, params.align),
				noIndicator: params.noIndicator,
				OnRenderHeader: params.painter.header,
				OnRenderContent: params.painter.content,
				OnRenderFooter: params.painter.footer
			}
		});
	};
	
	return this.NewItem(params);
};

JToolbar.prototype.NewDropdownConfirm = function(params) {
	params.painter = {
		content: function(dialog, container) {
			container.attr("dlg-sub", "confirm")
			CreateElement("div", container).attr("dlg-sec", "title")
				// .css("color", defaultValue(params.color, ""))
				.css("color", defaultValue(params.color, ""))
				.css("font-weight", "bold")
				.css("font-size", "120%")
				.css("margin-bottom", "5px")
				.html(params.title)
				
			CreateElement("div", container).attr("dlg-sec", "description")
				.html(params.description)
		},
		footer: function(dialog, container) {
			CreateButton({
				container: container,
				caption: "Yes",
				enabled: true,
				style: "green",
				click: function(button) {
					dialog.Hide();
					params.confirm(button);
				}
			});
					
			CreateButton({
				container: container,
				caption: "Close",
				enabled: true,
				style: "text",
				click: function(button) {
					dialog.Hide();
				}
			});			
		}
	};
	
	return this.NewDropdownItem(params);
};

JToolbar.prototype.NewDropDownConfirmItem = function(params) {
	return this.NewDropdownItem({
		id: params.id,
		dataBind: params.dataBind,
		dataEvent: params.dataEvent,
		icon: params.icon,
		iconColor: defaultValue(params.iconColor, params.color),
		color: params.color,
		noIndicator: params.noIndicator,
		hint: params.title,
		align: params.align || "left",
		painter: {
			footer: function(dialog, container) {
				CreateButton({
					container: container,
					caption: "Yes",
					style: "green",
					click: function(button) {
						dialog.Hide();
						params.confirm();
					}
				});
					
				CreateButton({
					container: container,
					caption: "Close",
					enabled: true,
					style: "text",
					click: function(button) {
						dialog.Hide();
					}
				});			
			},
			content: function(dialog, container) {
				CreateElementEx("div", container, function(header) {
					CreateElement("h2", header).html(params.title).css("margin", 0);
					CreateElement("p", header).html(params.subTitle);
				});
				
				// CreateElementEx("div", container, function(view) {
					// view.parent()
						// .css("width", params.width || 500)
						
					// view
						// .css("height", params.height || 300)
						// .css("border", "1px solid " + params.color);
				// });
			}
		}
	});
};

JToolbar.prototype.NewDropDownViewItem = function(params) {
	return this.NewDropdownItem({
		id: params.id,
		icon: params.icon,
		iconColor: params.color,
		color: params.color,
		hint: params.title,
		align: params.align || "left",
		painter: {
			footer: function(dialog, container) {
				CreateButton({
					container: container,
					caption: "Close",
					style: "green",
					click: function(button) {
						dialog.Hide();
					}
				});
			},
			content: function(dialog, container) {
				CreateElementEx("div", container, function(header) {
					CreateElement("h2", header).html(params.title).css("margin", 0);
					CreateElement("p", header).html(params.subTitle);
				});
				
				CreateElementEx("div", container, function(view) {
					view.parent()
						.css("width", params.width || 500)
						
					view
						.css("height", params.height || 300)
						.css("border", "1px solid " + params.color);
						
					if(params.view) {
						params.view($.extend(params.viewParams, {container:view, select:function(code) {
							dialog.Hide();
							desktop.HideHints();
							params.select(code);
						}}));						
					};
				});
			}
		}
	});
};

//**************************************************************************************************
// JToolbarButton
//**************************************************************************************************
Class.Inherits(JToolbarButton, JControl);
function JToolbarButton(Params) {
    JToolbarButton.prototype.parent.call(this, Params);
};

JToolbarButton.prototype.classID = "JToolbarButton";

JToolbarButton.prototype.DefaultPainter = function() {
    return new ToolButtonPainter(this);
};

JToolbarButton.prototype.Initialize = function(params) {
    JToolbarButton.prototype.parent.prototype.Initialize.call(this, params);
    this.id = params.id;
    this.toolbar = params.toolbar;
    this.icon = params.icon;
    this.iconColor = params.iconColor;
    this.hint = params.hint;
    this.align = defaultValue(params.align, "left");
    this.dropdown = defaultValue(params.dropdown, false);
    this.noIndicator = defaultValue(params.noIndicator, false);
    this.container = params.toolbar.Painter.buttonContainer;
    this.click = params.click;
	
    this.dataBind = params.dataBind;
    this.dataEvent = params.dataEvent;
	if(this.dataBind && this.dataEvent) {
		var self = this;
		this.dataBind.Events.OnEditState.add(function(dataset, editing) {
			self.dataEvent(dataset, self);
		});
		// this.dataBind.Events.OnCancel.add(function(dataset) {
			// self.dataEvent(dataset, self);
		// };
		
		// self.dataEvent(this.dataBind, self);
	};
};

JToolbarButton.prototype.show = function(visible) {
	if(visible)
		this.Painter.container.css("display", "")
	else
		this.Painter.container.css("display", "none");
};
// *************************************************************************************************
// File name: toolbar-painter.js
// Last modified on
// 03-MAR-2015
// *************************************************************************************************
//**************************************************************************************************
// ToolbarPainter
//**************************************************************************************************
Class.Inherits(ToolbarPainter, JControlPainter);
function ToolbarPainter(Control) {
	ToolbarPainter.prototype.parent.call(this, Control);
};

ToolbarPainter.prototype.type = "toolbar";
ToolbarPainter.prototype.classID = "ToolbarPainter";

ToolbarPainter.prototype.Paint = function() {
	ToolbarPainter.prototype.parent.prototype.Paint.call(this); 

	var container = CreateElement("div", this.Control.container, "", "toolbar tb-theme-" + this.Control.theme);//.attr("theme", "default");
	this.buttonContainer = CreateElement("ul", container)
	
	this.SetContainer(container);
};

ToolbarPainter.prototype.NewItem = function(params) {
}

//**************************************************************************************************
// ToolButtonPainter
//**************************************************************************************************
Class.Inherits(ToolButtonPainter, JControlPainter);
function ToolButtonPainter(Control) {
	ToolButtonPainter.prototype.parent.call(this, Control);
};

ToolButtonPainter.prototype.type = "tool-btn";
ToolButtonPainter.prototype.classID = "ToolButtonPainter";

ToolButtonPainter.prototype.Paint = function() {
	ToolButtonPainter.prototype.parent.prototype.Paint.call(this); 

	// var animate = "ani-rotate";
	var animate = "ani-scale";
	// var waitAnimation = false;
	var waitAnimation = true;
	
	var button = this.Control;
	
	var container = CreateElement("li", button.container, "", "")
		.data("button", button)
		.css("float", button.align)
		.on("exec", function(e) {
			var button = $(this).data("button");
			button.toolbar.Events.OnSelectItem.trigger(button);
		})
		.click(function(e) {
			if(desktop.mobile && waitAnimation) {
				var x = $(this).attr(animate, "1");
				setTimeout(function() {
					x.attr(animate, "").trigger("exec");
					// if(waitAnimation) button.toolbar.Events.OnSelectItem.trigger(button);
					// if(waitAnimation) x
				} , 250);
			} else
				$(this).trigger("exec");
				// button.toolbar.Events.OnSelectItem.trigger(button);
		})
	
	if(button.icon.indexOf(".png") > -1) {
		var img = CreateElement("img", container, "", "")
			.attr("src", button.icon)
	} else {
		// var img = CreateElement("div", container, "", "").css("width", 24).css("height", 24);
		var icon, iconParts = button.icon.split("+");
		// if(iconParts.length == 1)
			icon  = iconParts[0];
		
		// var svg = desktop.GetSvg(container, icon, this.Control.toolbar.buttonSize+4, {noTopMargin:true})
		// var svg = desktop.GetSvg(container, icon, this.Control.toolbar.buttonSize+4)
		var svg = desktop.GetSvg(container, icon)
			.css("fill", this.Control.iconColor);
			
		var self = this;
		if(iconParts.length > 1)
			CreateElementEx("div", container, function(c) {
				desktop.GetSvg(c, iconParts[1], self.Control.toolbar.buttonSize, {noTopMargin:true})
					.css("fill", self.Control.iconColor);
			});
			// desktop.GetSvg(container, iconParts[1], this.Control.toolbar.buttonSize, {noTopMargin:true})
			// desktop.GetSvg(svg, iconParts[1], this.Control.toolbar.buttonSize, {noTopMargin:true})
				// .css("fill", this.Control.iconColor);
	};

	if(button.dropdown && !button.noIndicator) {
		container.attr("btn-dropdown", 1);
		var d = CreateElement("div", container, "", "")
			.attr("btn-sec", "dropdown");
			
		desktop.GetSvg(d, "tree-expand", 16, {noTopMargin:true})
		// desktop.GetSvg(d, "tree-collapse", 16, {noTopMargin:true})
			.css("fill", this.Control.iconColor)
	};
		
	
	this.SetContainer(container);
	
	if(button.hint) desktop.SetHint(container, button.hint, button.toolbar.hintAlign);
	// if(button.hint) desktop.SetHint(container, button.hint);
	// desktop.SetHint(container, function(dialog, container) {
		// alerts(container.data("control"));
		// container.html(container.data("control").hint);
	// });
};

ToolButtonPainter.prototype.NewItem = function(params) {
}
// *************************************************************************************************
// File name: buttons.js
// Last modified on
// 06-MAR-2015
// *************************************************************************************************
//**************************************************************************************************
// JButton
//**************************************************************************************************
Class.Inherits(JButton, JControl);
function JButton(Params) {
    JButton.prototype.parent.call(this, Params);
};
JButton.prototype.classID = "JButton";

JButton.prototype.DefaultPainter = function() {
    return new JButtonPainter(this);
};

JButton.prototype.Click = function() {
	if(this.enabled && this.click) this.click(this);
}

JButton.prototype.SetEnabled = function(enabled) {
	this.elementContainer.attr("btn-state", this.enabled = enabled ? "enabled": "disabled")
};

JButton.prototype.Initialize = function(params) {
    JButton.prototype.parent.prototype.Initialize.call(this, params);
    this.id = params.id;
    this.caption = params.caption;
    this.enabled = defaultValue(params.enabled, true);
    this.hint = params.hint;
    this.container = params.container;
    this.click = params.click; 
	
    // this.dataBind = params.dataBind;
    // this.dataEvent = params.dataEvent;
	// alerts(this.dataBind, this.dataEvent)
	// if(this.dataBind && this.dataEvent) {
		// var self = this;
		// this.dataBind.Events.OnEditState.add(function(dataset, editing) {
			// self.dataEvent(dataset, self);
		// };
	// };
};

//**************************************************************************************************
// Button functions
//**************************************************************************************************
function CreateButton(p) {
	return new JButton({
		container: p.container,
		caption: p.caption,
		hint: p.hint,
		enabled: p.enabled,
		dataBind: p.dataBind,
		dataEvent: p.dataEvent,
		click: p.click,
		Painter: {
			painterClass: JButtonPainter,
			style: p.style
		}
	});
};
// *************************************************************************************************
// File name: buttons-painters.js
// Last modified on
// 06-MAR-2015
// *************************************************************************************************
//**************************************************************************************************
// JButtonPainter
//**************************************************************************************************
Class.Inherits(JButtonPainter, JControlPainter);
function JButtonPainter(Control) {
    JButtonPainter.prototype.parent.call(this, Control);
};

JButtonPainter.prototype.type = "btn";
JButtonPainter.prototype.classID = "JButtonPainter";

JButtonPainter.prototype.Paint = function() {
    JButtonPainter.prototype.parent.prototype.Paint.call(this);
	
	var container;
	
	if(this.GetParam("style", "silver") == "text") {
		container = CreateElement("a", CreateElement("div", this.Control.container, "", "button-text"))
			.html(this.Control.caption)
	} else {
		container = CreateElement("div", this.Control.container, "", "button")
			.attr("btn-state", this.Control.enabled ? "enabled": "disabled")
			.attr("btn-color", this.GetParam("style", "silver"))
			.html(this.Control.caption)
	}
	
    container.click(function() {
		$(this).data("object").Click();
	});

	this.SetContainer(container);
	
	if(this.Control.hint) 
		desktop.SetHint(container, this.Control.hint);
};

// *************************************************************************************************
// File name: pg.js
// Last modified on
// 09-MAR-2015
// *************************************************************************************************
//**************************************************************************************************
// JPageControl
//**************************************************************************************************
Class.Inherits(JPageControl, JControl);
function JPageControl(Params) {
    JPageControl.prototype.parent.call(this, Params);
};

JPageControl.prototype.classID = "JPageControl";

JPageControl.prototype.DefaultPainter = function() {
    return new PageControlPainter(this);
};

// JPageControl.prototype.AfterPaint = function() {
	// JPageControl.prototype.parent.prototype.AfterPaint.call(this); 
	// alerts(this.Painter.header.outerHeight());
	// this.Painter.content.css("height", ("Calc(100% - {0}px)").format(this.Painter.header.outerHeight()));
// };

JPageControl.prototype.AfterPaint = function() {
    JPageControl.prototype.parent.prototype.AfterPaint.call(this);
	this.Select(0);
	this.Events.OnAfterPaint.trigger();
	// this.Painter.AfterPaint(); // It is important that the page control be create on AfterPaint event
};

JPageControl.prototype.Initialize = function(params) {
    JPageControl.prototype.parent.prototype.Initialize.call(this, params);
    this.id = params.id;
	this.owner = params.owner;
    this.container = params.container;
    this.css = params.css;
	this.list = new JList();
	this.tabCount = 0;
	this.initTab = params.initTab;
	this.Methods = new MethodHandler(this);
	this.Events = {};
	this.Events.OnInitPageControl = new EventHandler(this);
	this.Events.OnInitTabs = new EventHandler(this);
	this.Events.OnAfterPaint = new EventHandler(this);
	
	if(params.init) {
		// creator/owner of the page control must add an event to this.Events.OnInitPageControl in "init"
		params.init(this);
	};	

	this.Events.OnInitPageControl.trigger();
	this.Events.OnInitTabs.trigger();
	
	this.Paint();
	this.AfterPaint();  
	
	params.DelayPainting = true;
};

JPageControl.prototype.ShowTabs = function(visible) {
	this.Painter.header.css("display", visible ? "" : "none");
};

JPageControl.prototype.NewTab = function(caption, params) {
	params = defaultValue(params, {});
	params.pg = this;
	params.id = defaultValue(params.id, this.tabCount++);
	params.caption = caption;
	var tab = new JPageTab(params);
	this.list.add(params.id, tab);
	return tab;
};

JPageControl.prototype.Select = function(id) {
	var tab = this.list.get(id);
	this.Painter.Select(tab);
};	

JPageControl.prototype.EachTab = function(callback) {
	this.list.each(callback);
};

JPageControl.prototype.TabCount = function() {
	return this.list.count();
};

//**************************************************************************************************
// JPageTab
//**************************************************************************************************
function JPageTab(params) {
    if (params == undefined) {
        return;
    };

    // this.id = defaultValue(params.id, params.fname);
    this.Initialize(params);
};

JPageTab.prototype.classID = "JPageTab";

JPageTab.prototype.Initialize = function(params) {
    this.owner = this.pg = params.pg;
    this.id = params.id;
    this.caption = params.caption;
    this.OnSelect = params.OnSelect;
    this.OnCreate = params.OnCreate;
};

JPageTab.prototype.SetVisible = function(visible) {
	this.container.css("display", visible ? "" : "none");
};
// *************************************************************************************************
// File name: pg-painters.js
// Last modified on
// 29-MAR-2015
// *************************************************************************************************
//**************************************************************************************************
// PageControlPainter
//**************************************************************************************************
Class.Inherits(PageControlPainter, JControlPainter);
function PageControlPainter(Control) {
	PageControlPainter.prototype.parent.call(this, Control);
};

PageControlPainter.prototype.type = "pg";
PageControlPainter.prototype.classID = "PageControlPainter";

PageControlPainter.prototype.Paint = function() {
	PageControlPainter.prototype.parent.prototype.Paint.call(this); 
	
	// var container = CreateElement("div", this.Control.container, "", "pg").attr("control-theme", "default");
	var container = CreateElement("div", this.Control.container, "", "pg").addClass("pg-theme-" + this.GetParam("theme", "default"));
	
	this.PaintHeader(this.header = CreateElement("div", container).attr("pg-sec", "header"));
	this.PaintContent(this.content = CreateElement("div", container).attr("pg-sec", "content"));

	if(typeof this.GetParam("indent") == "number") {
		var indent = this.GetParam("indent");
		this.header.css("padding-left", indent);
		this.gutter.css("left", -indent).css("width", ("Calc(100% + {0}px)").format(indent));
	};

	if(typeof this.GetParam("margin") == "number") {
		var margin = this.GetParam("margin");
		this.header.css("padding-top", margin);
	};

	if(typeof this.GetParam("gutter") == "number") {
		var gutter = this.GetParam("gutter");
		this.gutter.css("height", gutter);
	};
	
	if(typeof this.GetParam("spacing") == "number") {
		var spacing = this.GetParam("spacing");
		this.Control.EachTab(function(i, tab) {	
			tab.container.css("margin-right", spacing);
		});
	};

	if(this.GetParam("autoHeight", false)) {
		container.css("height", "auto")
		this.content.css("height", "auto")
	} else
		this.content.css("height", ("Calc(100% - {0}px)").format(this.header.innerHeight()));
	
	this.SetContainer(container);
};

PageControlPainter.prototype.PaintHeader = function(container) {
	// this.PaintColumHeaders(container, float);
	// container
		// .click(function() {
			// alerts($(this).outerHeight());
		// });
	var tabsContainer = CreateElement("div", container).attr("pg-sec", "tabs");
	this.Control.EachTab(function(i, tab) {	
		tab.container = CreateElement("div", tabsContainer)
			.data("tab", tab)
			.attr("pg-sec", "tab")
			.html(tab.caption)
			.click(function() {
				var tab = $(this).data("tab");
				tab.pg.Select(tab.id);
			});
			
		// alerts(tab.caption);
	});
	
	this.gutter = CreateElement("div", container).attr("pg-sec", "gutter");
	// alerts(container.outerHeight());
}

PageControlPainter.prototype.PaintContent = function(container) {
	// this.PaintColumHeaders(container, float);
};

// PageControlPainter.prototype.ShowTabs = function(visible) {
// };

PageControlPainter.prototype.Select = function(tab) {
	if(this.Control.selected) {
		this.Control.selected.container.removeAttr("focused");
		if(this.Control.selected.content) {
			// console.log("PageControlPainter.prototype.Select - none")
			this.Control.selected.content.css("display", "none");
			// this.Control.selected.content.css("visibility", "hidden");
		};
	};
	
	// this.header.find("div[pg-sec='tab'][focused='1']").removeAttr("focused");
	// console.log(tab)
	tab.container.attr("focused", "1");
	if(!tab.content && tab.OnCreate) {
		tab.content = CreateElement("div", this.content).attr("pg-sec", "tab-content");
		if(tab.pg.initTab) tab.pg.initTab(tab);
		tab.OnCreate(tab);
	} else	{
		// console.log("PageControlPainter.prototype.Select - block")
		tab.content.css("display", "block");
		// tab.content.css("visibility", "visible");
	};
	
	if(tab.OnSelect) {
		tab.OnSelect(tab);
	};
	
	this.Control.selected = tab;
};
// ****************************************************************************************************
// Last modified on
// 19-OCT-2014 ihms.0.0.1.1
// ****************************************************************************************************
function ShowDatePicker(options) {
	ShowPopup({
	    Page: options.page,
	    Target: options.target,
	    Color: "#AAAAAA",
	  	Modal: false,
	    Painter: {
	        painterClass: PopupFixedSizePainter,
			width: "auto",
			height: "auto",
            css: "system",
	        OnRenderContent: function(dialog, container) {
				new JDatePicker({
					container: container,
					target: options.target,
					date: options.date,
					options:{
            			css: "default",
					},
					init:function(datepicker){
					},
					update:function(datepicker, date) {
						if(options.update) {
							options.update(date);
						};
						
						dialog.Hide();
					}
				});				
			}	        
		});	
};

//**************************************************************************************************
// JDatePicker
//**************************************************************************************************
Class.Inherits(JDatePicker, JControl);

function JDatePicker(Params) {
    JDatePicker.prototype.parent.call(this, Params);
};

JDatePicker.prototype.classID = "JDatePicker";

JDatePicker.prototype.Initialize = function(Params) {
    JDatePicker.prototype.parent.prototype.Initialize.call(this, Params);
    this.container = Params.container;
    this.options = Params.options;
    this.init = Params.init;
    this.update = Params.update;
    this.date;
    this.selected;
    if(Params.date) {
	    this.date = new Date(Params.date);
	    this.selected = new Date(Params.date);
    } else {
	    this.date = new Date();
	    this.selected = new Date();
    };
	
	if(this.init) {
		this.init(this);
	}
};

JDatePicker.prototype.DefaultPainter = function() {
    return new JDatePickerPainter(this);
};

JDatePicker.prototype.Clear = function() {
	if(this.update) {
		// this.update(this, undefined);
		this.update(this, null);
	};
}

JDatePicker.prototype.Refresh = function(newDate) {
	this.date = new Date(newDate);
	this.selected = new Date(newDate);
	this.Painter.PaintCalendar();
};

JDatePicker.prototype.Select = function(date, dontClose) {
	if(this.update) {
		this.update(this, date, dontClose);
	};
}// ****************************************************************************************************
// Last modified on
// 14-SEP-2014 ihms.0.0.0.1
// 19-OCT-2014 ihms.0.0.1.1
// ****************************************************************************************************
// ****************************************************************************************************
//**************************************************************************************************
// JDatePickerPainter
// The default painter used by JDatePicker
//**************************************************************************************************
Class.Inherits(JDatePickerPainter, JBasePainter);
function JDatePickerPainter(Control) {
    JDatePickerPainter.prototype.parent.call(this, Control);
};

JDatePickerPainter.prototype.classID = "JDatePickerPainter";

JDatePickerPainter.prototype.Paint = function() {
    JDatePickerPainter.prototype.parent.prototype.Paint.call(this);
	
	var __weeknames = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	];
	
    var self = this;
	var css = defaultValue(this.Control.options.css, "default");
    var container = CreateElement("div", this.Control.container, "", css + "-datepicker")
    	.attr("control-type", "datepicker")
    	
	this.header = CreateElement("div", container).attr("dp-section", "header");

	this.PaintHeader();
    	
    var table = CreateElement("table", container, "", css + "-datepicker-calendar")
        .attr("cellspacing", 0)
        .attr("cellpadding", 0)
        .attr("border", 0)
        .click(function(e) {
        	self.Control.Select($(e.target).data("date"));
			// self.preventDefault();
			// alerts("OK");
        });

    var h = $("<thead>");
    table.append(h)
    var r = $("<tr>");
	for(var i=0;i<7;i++) {
		r.append($("<th>").html(__weeknames[i].substring(0,3))
	};
    h.append(r);   

    this.calendar = $("<thead>");
    table.append(this.calendar);  
    this.PaintCalendar() ;
    	
	var footer = CreateElement("div", container)
    	.attr("dp-section", "footer");

	CreateElement("div", footer, "", "button")
		.attr("btn-state", "enabled")
		.attr("btn-color", "green")
		.html("Today")
		// .html(Date.today().getWeek())
		.click(function() {
			// self.Control.Select(new Date());
			self.Control.Select(Date.today());
		});

	if(defaultValue(this.Control.options.showClear, true))
		CreateElement("div", footer, "", "button")
			.attr("btn-state", "enabled")
			.attr("btn-color", "green")
			.html("Clear")
			.click(function() {
				self.Control.Clear();
			});
};

JDatePickerPainter.prototype.prevMonth = function() {    
	this.Control.selected.addMonths(-1);
	this.PaintCalendar();
};

JDatePickerPainter.prototype.nextMonth = function() {
//    var date = new Date(this.Control.selected);
//    var d = date.getDate();
//    alerts(d, date.daysInMonth(), date, this.Control.selected);
	this.Control.selected.addMonths(1);
	this.PaintCalendar();
};

JDatePickerPainter.prototype.PaintHeader = function() {
    	
    var table = CreateElement("table", this.header)
        .attr("cellspacing", 0)
        .attr("cellpadding", 0)
        .attr("border", 0)
        .append($("<thead>"));

    var self = this;
    $("<tr>").appendTo(table.find("thead")).each(function() {
    
	    desktop.GetSvg($("<td>").appendTo($(this)).attr("dp-btn", "prev").click(function() {    	
	    	self.prevMonth();
	    }), "arrow-left");
	    
	    self.Title = $("<td>").appendTo($(this)).attr("dp-title", "");
	    
	    desktop.GetSvg($("<td>").appendTo($(this)).attr("dp-btn", "next").click(function() {
	    	self.nextMonth();
	    }), "arrow-right");
	    
    });
    
};

JDatePickerPainter.prototype.PaintCalendar = function() {
	this.Title.html(this.Control.selected.format("d MMM yyyy"));
//	this.Title.html(("{0} {1}").format(__monthnames[this.Control.selected.getMonth()],this.Control.selected.getFullYear()));

	this.calendar.html("");
	
	var today = new Date();
	var date = new Date(this.Control.selected);
	date = new Date(date.setDate(1));
	
	var month = date.getMonth();
	var day = date.getDay();
	
	if(day > 0) {
		date = date.addDays(-day);
	};

    var dates = [];
	for(var i=0;i<42;i++) {
		dates.push(new Date(date));
		date = date.addDays(1);
	};
	
	var ctr = 0;
	for(var i=0;i<6;i++) {
    	var r = $("<tr>");
		for(var c=0;c<7;c++) {
			var cell = $("<td>");
			var d = dates[ctr++];
			
	    	r.append(cell.html(d.getDate());
	    	if(d.getMonth() != month) {
	    		cell.attr("dt", "xx");
	    	} else if(d.getDay() == 0 || d.getDay() == 6) {
	    		cell.attr("dt", "wk");
	    	} else {
	    		cell.attr("dt", "nm");
	    	};
	    	
	    	if(d.sameDay(today)) {
	    		cell.attr("today", "");
	    	};
	    	if(d.sameDay(this.Control.date)) {
	    		cell.attr("current", "");
	    	};
	    	
	    	cell.data("date", d);
		};    	
    	this.calendar.append(r);
	};
};// *************************************************************************************************
// File name: dbeditor.js
// Last modified on
// 06-MAR-2015
// *************************************************************************************************
//**************************************************************************************************
// JEditor
//**************************************************************************************************
Class.Inherits(JEditor, JControl); 
function JEditor(Params) {
    JEditor.prototype.parent.call(this, Params);
};

JEditor.prototype.classID = "JEditor";

JEditor.prototype.Initialize = function(Params) {
    JEditor.prototype.parent.prototype.Initialize.call(this, Params);
	// console.log(Params)
    // this.Editors = [];
    // this.EditorsByID = [];
    // this.CategoriesCount = 0;
	if(!this.PaintParams) this.PaintParams = {};
	this.PaintParams.showCategory = defaultValue(this.PaintParams.showCategory, true);
	this.PaintParams.labelWidth = Params.LabelWidth;
	this.Theme = defaultValue(Params.Theme, "default");
	// console.log(Params)
	this.YesNo = [
		{id:true, value:"Yes"},
		{id:false, value:"No"}
	];

    // this.id = "edit_" + Params.ID;
    // this.Page = Params.Page;
    this.container = Params.Container;
    // this.Shown = false;
    // this.Category;
    // this.Css = Params.Css;
	
	this.list = new JList();
	
    Params.DelayPainting = true;
};

JEditor.prototype.AfterPaint = function() {
    JEditor.prototype.parent.prototype.AfterPaint.call(this);
	if(this.Dataset) this.Dataset.Events.OnChanged.trigger();
};

JEditor.prototype.DefaultPainter = function() {
    return new EditorPainter(this);
};

// JEditor.prototype.addGroup = function(params) {
	// this.AddGroup(params.title, )
// };

JEditor.prototype.AddGroup = function(name, init, dataset) {
	var Dataset = dataset ? dataset: this.Dataset;
	var params = {
		caption: name
	};
	
	params.editor = this;
	params.Dataset = Dataset;
	var group = new JEditCategory(params);
	this.list.add(name, group);

	var self = this;
	var editInit = {
		Dataset: Dataset,
		CreateItem: function(itemClass, attr, options) {
			var edit = self.CreateItem(itemClass, attr, options);
			group.Add(edit);
			return edit;
		},
		AddEdit: function(attr, options) {
			// console.log(options);
			attr.Dataset = Dataset;
			var id = typeof attr == "string" ? attr : attr.ID;
			var column = Dataset.Columns.get(id);
			// console.log(column);
			var editClass = TextEdit;
			if(column.type == "date")
				editClass = DateEdit
			else if(column.type == "money")
				editClass = MoneyEdit
			else if(column.numeric)
				editClass = NumericEdit;
			
			var edit = self.CreateItem(editClass, attr, options);
			group.Add(edit);
			return edit;
		},
		// AddEditx: function(attr, options) {
		// },
		AddText: function(attr, options) {
			var edit = self.AddText(attr, options);
			group.Add(edit);
			return edit;
		},
		AddMemo: function(attr, options) {
			var edit = self.AddMemo(attr, options);
			group.Add(edit);
			return edit;
		},
		AddNumeric: function(attr, options) {
			var edit = self.AddNumeric(attr, options);
			group.Add(edit);
			return edit;
		},
		AddMoney: function(attr, options) {
			var edit = self.AddMoney(attr, options);
			group.Add(edit);
			return edit;
		},
		AddDate: function(attr, options) {
			var edit = self.AddDate(attr, options);
			group.Add(edit);
			return edit;
		},
		AddDateEx: function(attr, options) {
			var edit = self.AddDateEx(attr, options);
			group.Add(edit);
			return edit;
		},
		AddTimeStamp: function(attr, options) {
			options = $.extend({}, options, {noLabel:true});
			var edit = self.AddTimeStamp(attr, options);
			group.Add(edit);
			return edit;
		},
		AddRadioButton: function(attr, options) {
			var edit = self.AddRadioButton(attr, options);
			group.Add(edit);
			return edit;
		},
		AddYesNoRadio: function(attr, options) {
			var edit = self.AddYesNoRadio(attr, options);
			group.Add(edit);
			return edit;
		},
		AddListBox: function(attr, options) {
			var edit = self.AddListBox(attr, options);
			group.Add(edit);
			return edit;
		},
		AddLink: function(attr, options) {
			attr.Dataset = Dataset;
			var edit = self.AddLink(attr, options);
			group.Add(edit);
			return edit;
		},
		AddLookup: function(attr, options) {
			var edit = self.AddLookup(attr, options);
			group.Add(edit);
			return edit;
		},
		AddLookup2: function(attr, options) {
			var edit = self.AddLookup2(attr, options);
			group.Add(edit);
			return edit;
		},
		AddContainer: function(attr, options) {
			var edit = self.AddContainer(attr, options);
			group.Add(edit);
			return edit;
		}
	};
	init(editInit);
	
	return group;
};

JEditor.prototype.AddYesNoRadio = function(attr, options) {
	return this.CreateItem(RadioButtonEdit, attr, {
		key: "id",
		value: "value",
		data: [
			{id:1, value:"Yes"},
			{id:0, value:"No"}
		]
	});
};

JEditor.prototype.AddRadioButton = function(attr, options) {
	return this.CreateItem(RadioButtonEdit, attr, options);
};

JEditor.prototype.AddListBox = function(attr, options) {
	// return this.CreateItem(ListBoxEdit, attr, options);
	return this.CreateItem(ListBoxEdit, attr, options);
};

JEditor.prototype.AddLink = function(attr, options) {
	return this.CreateItem(LinkEdit, attr, options);
};

JEditor.prototype.AddContainer = function(attr, options) {
	return this.CreateItem(ContainerEdit, attr, options);
};

JEditor.prototype.AddText = function(attr, options) {
	return this.CreateItem(TextEdit, attr, options);
};

JEditor.prototype.AddMemo = function(attr, options) {
	return this.CreateItem(MemoEdit, attr, options);
};

JEditor.prototype.AddNumeric = function(attr, options) {
	return this.CreateItem(NumericEdit, attr, options);
};

JEditor.prototype.AddMoney = function(attr, options) {
	return this.CreateItem(MoneyEdit, attr, options);
};

JEditor.prototype.AddDate = function(attr, options) {
	return this.CreateItem(DateEdit, attr, options);
};

JEditor.prototype.AddDateEx = function(attr, options) {
	return this.CreateItem(DateEditEx, attr, options);
};

JEditor.prototype.AddTimeStamp = function(attr, options) {
	return this.CreateItem(TimeStamp, attr, options);
};

JEditor.prototype.AddLookup = function(attr, options) {
	return this.CreateItem(LookupEdit, attr, options);
};

JEditor.prototype.AddLookup2 = function(attr, options) {
	return this.CreateItem(LookupEdit2, attr, options);
};

// JEditor.prototype.AddEdit = function(attr, options) {
	// return this.CreateItem(JEditItem, attr, options);
// };

// JEditor.prototype.AddItem = function(attr, options) {
	// return this.CreateItem(JEditItem, attr, options);
// };

JEditor.prototype.GetEditor = function(fname) {
	return this.list.get(fname);
}

JEditor.prototype.SetReadonly = function(fname, readonly) {
	this.list.get(fname).SetReadOnly(readonly);
}

JEditor.prototype.SetVisible = function(fname, visible) {
	this.list.get(fname).SetVisible(visible);
}

JEditor.prototype.SetRequired = function(fname, required) {
	this.list.get(fname).SetRequired(required);
}

JEditor.prototype.CreateItem = function(itemClass, attr, options) {
	if(typeof attr == "string") attr = { ID: attr };
	var params = attr;
	// params.options = defaultValue(options, {});
	params.options = $.extend({}, options);
	params.editor = this;
	// console.log(options)
	var edit = new itemClass(params);
	this.list.add(params.ID, edit);
	return edit;
};

JEditor.prototype.EachItem = function(callback) {
	this.list.each(callback);
};

JEditor.prototype.FocusFirstEditor = function() {
	// console.log("FocusFirstEditor")
	var focus;
	
	this.EachItem(function(i, edit) {
		if(edit.dataColumn) {
			if(!edit.readonly && !focus) {
				focus = edit;
			}
		}
	})
	
	// console.log(focus)
	// if(focus) focus.trigger("focus");
	if(focus && focus.Painter.edit) focus.Painter.edit.trigger("focus");
};
/*
//**************************************************************************************************
// JEditItem
//**************************************************************************************************
Class.Inherits(JEditItem, JControl); 
function JEditItem(Params) {
    JEditItem.prototype.parent.call(this, Params);
};

JEditItem.prototype.classID = "JEditItem";

JEditItem.prototype.Initialize = function(params) {
    JEditItem.prototype.parent.prototype.Initialize.call(this, params);
    this.editor = params.editor;
	this.dataset = this.editor.Dataset;
	this.id = params.ID;
	this.caption = params.Caption;
	if(!this.PaintParams) this.PaintParams = defaultValue(params.options, {});
	
	this.dataColumn = this.dataset.Columns.get(this.id);
	if(this.dataColumn.type == "date")
		this.PaintParams.showButton = true
	else
		this.PaintParams.showButton = defaultValue(this.PaintParams.dropdown, false)
	
    params.DelayPainting = true;
};

JEditItem.prototype.DefaultPainter = function() {
    return new EditItemPainter(this);
};

JEditItem.prototype.Paint = function(container) {
	this.container = container;
	// alerts(container);
	JEditItem.prototype.parent.prototype.Paint.call(this);
}

JEditItem.prototype.SetVisible = function(visible) {
	this.elementContainer.css("display", visible ? "" : "none")
	// this.elementContainer.css("height", 20);
	// this.elementContainer.children("td").css("max-height", 4);
}

JEditItem.prototype.GetCaption = function() {
	if(this.dataset)
		return this.dataColumn.label
	else
		return this.id;
}

JEditItem.prototype.Required = function() {
	if(this.dataset)
		return this.dataColumn.required
	else
		return true;
}

//**************************************************************************************************
// JEditLookup
//**************************************************************************************************
Class.Inherits(JEditLookup, JEditItem); 
function JEditLookup(Params) {
    JEditLookup.prototype.parent.call(this, Params);
};

JEditLookup.prototype.classID = "JEditLookup";

JEditLookup.prototype.Initialize = function(params) {
    JEditLookup.prototype.parent.prototype.Initialize.call(this, params);
};

JEditLookup.prototype.DefaultPainter = function() {
    return new EditLookupPainter(this);
};

//**************************************************************************************************
// JEditContainer
//**************************************************************************************************
Class.Inherits(JEditContainer, JEditItem); 
function JEditContainer(Params) {
    JEditContainer.prototype.parent.call(this, Params);
};

JEditContainer.prototype.classID = "JEditContainer";

JEditContainer.prototype.Initialize = function(params) {
    JEditContainer.prototype.parent.prototype.Initialize.call(this, params);
};

JEditContainer.prototype.DefaultPainter = function() {
    return new EditContainerPainter(this);
    // return new EditLookupPainter(this);
};
*/

//**************************************************************************************************
// JEditCategory
//**************************************************************************************************
Class.Inherits(JEditCategory, JControl); 
function JEditCategory(Params) {
    JEditCategory.prototype.parent.call(this, Params);
};

JEditCategory.prototype.classID = "JEditCategory";

JEditCategory.prototype.Initialize = function(params) {
    JEditCategory.prototype.parent.prototype.Initialize.call(this, params);
	this.editor = params.editor;
	this.caption = params.caption;
	this.items = [];
    params.DelayPainting = true;
};

JEditCategory.prototype.DefaultPainter = function() {
    return new EditCategoryPainter(this);
};

JEditCategory.prototype.Paint = function(container) {
	this.container = container;
	JEditCategory.prototype.parent.prototype.Paint.call(this);
}

JEditCategory.prototype.SetVisible = function(visible) {
	$(this.items).each(function(i, edit) {
		edit.SetVisible(visible);
	});
}

JEditCategory.prototype.Add = function(edit) {
	this.items.push(edit);
}

JEditCategory.prototype.GetCaption = function() {
	return this.caption;
}
// *************************************************************************************************
// File name: dbeditor-painter.js
// Last modified on
// 06-MAR-2015
// *************************************************************************************************
//**************************************************************************************************
// EditorPainter
//**************************************************************************************************
Class.Inherits(EditorPainter, JControlPainter);
function EditorPainter(Control) {
    EditorPainter.prototype.parent.call(this, Control);
    this.Editor = Control;
};

EditorPainter.prototype.type = "editor";
EditorPainter.prototype.classID = "EditorPainter";

EditorPainter.prototype.Paint = function() {
    EditorPainter.prototype.parent.prototype.Paint.call(this);
	
	// var container = CreateElement("div", this.Control.container, "", "editor edit-theme-"+"default");
	var container = CreateElement("div", this.Control.container, "", "editor edit-theme-"+this.Control.Theme);
	this.editorTable = CreateElement("table", container)
		.attr("edit-sec", "table")
		.attr("border", 0)
		.attr("cellspacing", 0)
		.attr("cellpadding", 0)
		
	this.InitTableHeader(this.editorTable);
	
	this.editorData = CreateElement("tbody", this.editorTable);
		
	var self = this;
	this.Control.EachItem(function(i, item) {		
		item.Paint(self.editorData);
		item.AfterPaint();
	});
	
	this.SetContainer(container);
	
	if(!desktop.mobile) {
		var getSizerPosition = function() {
			var pos = 0;
			container.find("th").each(function() {
				var e = $(this);
				if(e.attr("edit-sec") !== "data" && e.attr("edit-sec") !== "required" && e.attr("edit-sec") !== "sizer") {
					pos += e.width()
				}
			});
			
			return pos - 1;
		};
		
		var sizer = CreateElement("div", container)
			.attr("edit-sec", "sizer")
			.css("left", getSizerPosition())
		
		var dragObject = new JSimpleDrag({
			Node: sizer,
			Init: function(s) {
				s.sizing = {};
				s.sizing.leftPos = 0;
				s.sizing.leftOffset = -1;
				s.sizing.labelWidth = 0;
				s.sizing.label = container.find("th[edit-sec='label']");
				s.sizing.sizer = sizer;
			},
			// AllowDrag: function(s) {
				// return true;
			// },
			// AllowSize: function(s) {
				// return false;
			// },
			InitDrag: function(s) {
				s.sizing.labelWidth = s.sizing.label.width();
				s.sizing.leftPos = getSizerPosition();
			},
			Dragging: function(s, x, y) {
				if(s.sizing.leftOffset < 0) s.sizing.leftOffset = x;
				
				// s.sizing.label.css("width", s.sizing.labelWidth+(x-s.sizing.leftOffset));
				// s.sizing.label.css("min-width", s.sizing.labelWidth+(x-s.sizing.leftOffset));
				// s.sizing.sizer.css("left", s.sizing.leftPos+(x-s.sizing.leftOffset));
				s.sizing.label.css("width", s.sizing.labelWidth+x);
				s.sizing.label.css("min-width", s.sizing.labelWidth+x);
				s.sizing.sizer.css("left", s.sizing.leftPos+x);
			},
			DragEnd: function(s) {
				s.sizing.leftOffset = -1;
			}
		});
	};	
};

EditorPainter.prototype.InitTableHeader = function(container) {
	var head = CreateElement("thead", container).attr("edit-sec", "header");
	var tr = CreateElement("tr", head);
	if(this.Control.PaintParams.showCategory) {
		CreateElement("th", tr).attr("cat-sec", "gutter");
	};
	var label = CreateElement("th", tr).attr("edit-sec", "label");//.css("width", 125);
	CreateElement("th", tr).attr("edit-sec", "button");
	CreateElement("th", tr).attr("edit-sec", "sizer");
	CreateElement("th", tr).attr("edit-sec", "data");
	
	// console.log(this.Control.Params)
	if(this.Control.PaintParams.labelWidth)
		label.css("width", this.Control.PaintParams.labelWidth);
};

EditorPainter.prototype.PaintEditors = function() {
};

//**************************************************************************************************
// EditCategoryPainter
//**************************************************************************************************
// Class.Inherits(EditCategoryPainter, BaseEditItemPainter);
Class.Inherits(EditCategoryPainter, JControlPainter);
function EditCategoryPainter(Control) {
    EditCategoryPainter.prototype.parent.call(this, Control);
};

// EditCategoryPainter.prototype.type = "edit";
EditCategoryPainter.prototype.classID = "EditCategoryPainter";

EditCategoryPainter.prototype.Paint = function() {
    EditCategoryPainter.prototype.parent.prototype.Paint.call(this);
	
	var category = this.Control;
	var container = CreateElement("tr", category.container)
		.attr("cat-state", "open")
		.attr("cat-sec", "category")

	this.button = CreateElement("td", container).attr("cat-sec", "button")
		.data("category", this.Control)
		.click(function() {
			var state = $(this).parent().attr("cat-state") == "open" ? "close" : "open";
			
			$(this).data("category").SetVisible(state == "open");
			$(this).parent().attr("cat-state", state);
			
			$(this).html("");
			if(state == "open") 
				desktop.GetSvg($(this), "tree-expand")
			else
				desktop.GetSvg($(this), "tree-collapse");
		});
	
	desktop.GetSvg(this.button, "tree-expand");
		
	this.label = CreateElement("td", container).attr("cat-sec", "label")
		.attr("colspan", 4)
		// .attr("colspan", 5)
		.html(category.GetCaption());
		
	// if(this.GetParam("showButton", false)) {
		// var self = this;
		// this.button = CreateElement("td", container).attr("edit-sec", "button")
			// .click(function() {
				// self.ButtonClick($(this));
			// });
		// CreateElement("img", this.button).attr("src", this.GetButtonImage());
	// } else
		// this.label.attr("colspan", 2);
	
	// this.data = CreateElement("td", container).attr("edit-sec", "data");
	// this.CreateEditControl(this.data);

	this.SetContainer(container);
};
/*
//**************************************************************************************************
// EditContainerPainter
//**************************************************************************************************
Class.Inherits(EditContainerPainter, BaseEditItemPainter);
function EditContainerPainter(Control) {
    EditContainerPainter.prototype.parent.call(this, Control);
};

EditContainerPainter.prototype.classID = "EditContainerPainter";
// EditContainerPainter.prototype.buttonImage = "/engine/images/drop-down.png";
EditContainerPainter.prototype.buttonImage = "drop-down";

EditContainerPainter.prototype.PaintRow = function(edit, container) {
	this.button = CreateElement("td", container).attr("edit-sec", "button").attr("button-type", "drop-down")
		.data("self", this)
		.click(function() {
			$(this).data("self").ShowContainerDialog();
		});
		
	// CreateElement("img", this.button).attr("src", this.buttonImage);
	desktop.GetSvg(this.button, this.buttonImage)

	if(edit.Required()) 
		desktop.GetSvg(CreateElement("td", container).attr("edit-sec", "required"), "star")
	else
		CreateElement("td", container).attr("edit-sec", "required");

	this.data = CreateElement("td", container).attr("edit-sec", "data");
	this.CreateEditControl(this.data);
};

EditContainerPainter.prototype.ShowContainerDialog = function() {
	// alerts("OK"); return;
	var self = this;
	this.edit.select();
	var dialog = new JPopupDialog({
		// Target: cell,
		Target: this.edit.parent(),
		Modal: false,
		Painter: {
			// painterClass: PopupBasePainter,
			painterClass: SimpleDialogPainter,
			color: this.GetParam("color", "dimgray"),
			snap: "bottom",
			// snap: "right",
			// snap: "top",
			align: "left",
			inset: false,
			// inset: true,
			width: this.GetParam("width", this.edit.parent().outerWidth()),
			OnRenderHeader: function(dialog, container) {
				container.remove();
			},
			OnRenderContent: function(dialog, container) {
				// container.parent().css("border", "1px solid silver");
				container.css("height", self.GetParam("height", 100));
				container.css("background", "white");
				self.GetParam("init")(dialog, container, self.Control);
			},
			OnRenderFooter: function(dialog, container) {
				container.remove();
			}
		}
	});
};
*/// *************************************************************************************************
// File name: dbeditor-controls.js
// Last modified on
// 06-MAR-2015
// *************************************************************************************************

//**************************************************************************************************
// JBaseEditControl
//**************************************************************************************************
Class.Inherits(JBaseEditControl, JControl); 
function JBaseEditControl(Params) {
    JBaseEditControl.prototype.parent.call(this, Params);
};

JBaseEditControl.prototype.classID = "JBaseEditControl";
JBaseEditControl.prototype.showButton = false;
JBaseEditControl.prototype.buttonIcon = "";
JBaseEditControl.prototype.customControl = false;
JBaseEditControl.prototype.acceptTab = true;
// JBaseEditControl.prototype.showButton = true;
// JBaseEditControl.prototype.buttonIcon = "star";

JBaseEditControl.prototype.DefaultPainter = function() {
    return new BaseEditControlPainter(this);
};

// JBaseEditControl.prototype.CreateEditControl = function(container) {
    // return CreateElement("input", container, "", "");
// };

JBaseEditControl.prototype.Readonly = function() {
	if(this.dataColumn)
		return this.dataColumn.readonly || this.dataColumn.dataset.readonly || this.readonly
	else
		return false;
};

JBaseEditControl.prototype.Initialize = function(params) {
    JBaseEditControl.prototype.parent.prototype.Initialize.call(this, params);
    this.editor = params.editor;
	this.id = params.ID;
	this.caption = params.Caption;
	// this.caption = "XXX";
	// this.noLabel = defaultValue(params.noLabel, false);
	this.noLabel = defaultValue(params.options.noLabel, false);
	this.noLabelPadding = defaultValue(params.noLabelPadding, false);
	this.noFocus = defaultValue(params.noFocus, false);
	// console.log(params)
	this.upperCase = defaultValue(params.options.upperCase, false);
	this.readonly = defaultValue(params.options.readonly, false);
	this.visible = defaultValue(params.options.visible, true);
	// console.log(this)
	this.showCategory = params.editor.PaintParams.showCategory;
	if(!this.PaintParams) this.PaintParams = defaultValue(params.options, {});
	
	this.dataset = params.Dataset ? params.Dataset: this.editor.Dataset;
	this.dataColumn = this.dataset.Columns.get(this.id);
	
    params.DelayPainting = true;
};

JBaseEditControl.prototype.ButtonClick = function(e) {
	// alerts("ButtonClick")
};

JBaseEditControl.prototype.Paint = function(container) {
	this.container = container;
	JBaseEditControl.prototype.parent.prototype.Paint.call(this);
}

JBaseEditControl.prototype.SetVisible = function(visible) {
	// console.log(this.container);
	// console.log(this.Painter.container);
	// this.elementContainer.css("display", visible ? "" : "none")
	this.Painter.SetVisible(this.visible = visible);
}

JBaseEditControl.prototype.SetRequired = function(required) {
	this.Painter.SetRequired(required);
}

JBaseEditControl.prototype.SetReadOnly = function(readonly) {
	this.Painter.SetReadOnly(this.readonly = readonly);
	// console.log(this.container);
	// console.log(this.Painter.container);
	// this.elementContainer.css("display", visible ? "" : "none")
}

JBaseEditControl.prototype.GetCaption = function() {
	if(this.dataset)
		// return this.dataColumn.label
		return defaultValue(this.caption, this.dataColumn ? this.dataColumn.label: "")
	else
		return this.id;
		// return this.caption;
}

JBaseEditControl.prototype.Required = function() {
	if(this.dataset && this.dataColumn)
		return this.dataColumn.required
	else
		return false;
}

//**************************************************************************************************
// TextEdit
//**************************************************************************************************
Class.Inherits(TextEdit, JBaseEditControl); 
function TextEdit(Params) {
    TextEdit.prototype.parent.call(this, Params);
};

TextEdit.prototype.classID = "TextEdit";

TextEdit.prototype.DefaultPainter = function() {
    return new TextEditPainter(this);
};

//**************************************************************************************************
// MemoEdit
//**************************************************************************************************
Class.Inherits(MemoEdit, JBaseEditControl); 
function MemoEdit(Params) {
    MemoEdit.prototype.parent.call(this, Params);
};

MemoEdit.prototype.classID = "MemoEdit";

MemoEdit.prototype.DefaultPainter = function() {
    return new MemoEditPainter(this);
};

MemoEdit.prototype.Initialize = function(params) {
    MemoEdit.prototype.parent.prototype.Initialize.call(this, params);
	this.height = defaultValue(params.options.height, 75);
};

//**************************************************************************************************
// NumericEdit
//**************************************************************************************************
Class.Inherits(NumericEdit, TextEdit); 
function NumericEdit(Params) {
    NumericEdit.prototype.parent.call(this, Params);
};

NumericEdit.prototype.classID = "NumericEdit";

NumericEdit.prototype.DefaultPainter = function() {
    return new NumericEditPainter(this);
};

//**************************************************************************************************
// MoneyEdit
//**************************************************************************************************
Class.Inherits(MoneyEdit, NumericEdit); 
function MoneyEdit(Params) {
    MoneyEdit.prototype.parent.call(this, Params);
};

MoneyEdit.prototype.classID = "MoneyEdit";

MoneyEdit.prototype.DefaultPainter = function() {
    return new MoneyEditPainter(this);
};

//**************************************************************************************************
// DateEdit
//**************************************************************************************************
Class.Inherits(DateEdit, TextEdit); 
function DateEdit(Params) {
    DateEdit.prototype.parent.call(this, Params);
};

DateEdit.prototype.classID = "DateEdit";
DateEdit.prototype.showButton = true;
DateEdit.prototype.buttonIcon = "calendar-blank";

DateEdit.prototype.DefaultPainter = function() {
    return new DateEditPainter(this);
};

DateEdit.prototype.ShowCalendar = function() {
	if(!this.calendar && !this.Readonly()) {
		// this.ButtonClick(this.Painter.button);
		var self = this;
		var edit = this.Painter.edit;
		
		this.calendar = new JPopupDialog({
			Target: edit.parent(),
			Modal: false,
			Painter: {
				painterClass: SimpleDialogPainter,
				color: "#27AE60",
				snap: "bottom",
				align: "left",
				inset: false,
				OnRenderHeader: function(dialog, container) {
					container.remove();
				},
				OnRenderContent: function(dialog, container) {
					dialog.calendar = new JDatePicker({
						container: container,
						target: edit,
						date: self.dataColumn.asDate(),
						options:{
							css: "default",
						},
						init:function(datepicker){
						},
						update:function(datepicker, date, dontClose) {
							self.dataColumn.set(date);
							if(!dontClose) {
								// self.calendar = null;
								dialog.Hide();
							} else {
								datepicker.Refresh(date);
							}
						}
					});				
				},
				OnRenderFooter: function(dialog, container) {
					container.remove();
				}
			},
			onClose:function() {
				self.calendar = null;
				// console.log("ok")
			}
		});
	};
};

DateEdit.prototype.HideCalendar = function() {
	if(this.calendar) this.calendar.Hide();
};

DateEdit.prototype.ButtonClick = function(e) {
	var self = this;
	var edit = this.Painter.edit;
	
	edit.select();
	return;
	this.calendar = new JPopupDialog({
		Target: edit.parent(),
		Modal: false,
		Painter: {
			painterClass: SimpleDialogPainter,
			color: "#27AE60",
			snap: "bottom",
			align: "left",
			inset: false,
			OnRenderHeader: function(dialog, container) {
				container.remove();
			},
			OnRenderContent: function(dialog, container) {
				dialog.calendar = new JDatePicker({
					container: container,
					target: edit,
					date: self.dataColumn.asDate(),
					options:{
            			css: "default",
					},
					init:function(datepicker){
					},
					update:function(datepicker, date, dontClose) {
						self.dataColumn.set(date);
						if(!dontClose) {
							self.calendar = null;
							dialog.Hide();
						} else {
							datepicker.Refresh(date);
						}
					}
				});				
			},
			OnRenderFooter: function(dialog, container) {
				container.remove();
			}
		}
	});
};

//**************************************************************************************************
// DateEditEx
//**************************************************************************************************
/*
Class.Inherits(DateEditEx, DateEdit); 
function DateEditEx(Params) {
    DateEditEx.prototype.parent.call(this, Params);
};

DateEditEx.prototype.classID = "DateEditEx";
DateEditEx.prototype.customControl = true;

DateEditEx.prototype.DefaultPainter = function() {
    return new DateEditExPainter(this);
};
*/
//**************************************************************************************************
// RadioButtonEdit
//**************************************************************************************************
Class.Inherits(RadioButtonEdit, JBaseEditControl); 
function RadioButtonEdit(Params) {
    RadioButtonEdit.prototype.parent.call(this, Params);
};

RadioButtonEdit.prototype.classID = "RadioButtonEdit";
RadioButtonEdit.prototype.customControl = true;

RadioButtonEdit.prototype.DefaultPainter = function() {
    return new RadioButtonEditPainter(this);
};

RadioButtonEdit.prototype.Initialize = function(params) {
    RadioButtonEdit.prototype.parent.prototype.Initialize.call(this, params);
	// alerts(params.key)
	// console.log(params.options)
	this.keyName = params.options.key;
	this.valueName = params.options.value;
	this.data = params.options.data;
};

//**************************************************************************************************
// LinkEdit
//**************************************************************************************************
Class.Inherits(LinkEdit, JBaseEditControl); 
function LinkEdit(Params) {
    LinkEdit.prototype.parent.call(this, Params);
};

LinkEdit.prototype.classID = "LinkEdit";
LinkEdit.prototype.customControl = true;

LinkEdit.prototype.DefaultPainter = function() {
    return new LinkEditPainter(this);
};

LinkEdit.prototype.Initialize = function(params) {
    LinkEdit.prototype.parent.prototype.Initialize.call(this, params);
	this.link = defaultValue(params.options.link, params.link);
};

//**************************************************************************************************
// TimeStamp
//**************************************************************************************************
Class.Inherits(TimeStamp, JBaseEditControl); 
function TimeStamp(Params) {
    TimeStamp.prototype.parent.call(this, Params);
};

TimeStamp.prototype.classID = "TimeStamp";
TimeStamp.prototype.customControl = true;

TimeStamp.prototype.DefaultPainter = function() {
    return new TimeStampPainter(this);
};

TimeStamp.prototype.Initialize = function(params) {
    TimeStamp.prototype.parent.prototype.Initialize.call(this, params);
	this.name = params.name;
	this.label = params.label;
	// this.datetime = params.datetime;
	// console.log(params)
	// this.link = defaultValue(params.options.link, params.link);
};

//**************************************************************************************************
// ContainerEdit
//**************************************************************************************************
Class.Inherits(ContainerEdit, TextEdit); 
function ContainerEdit(Params) {
    ContainerEdit.prototype.parent.call(this, Params);
};

ContainerEdit.prototype.classID = "ContainerEdit";
ContainerEdit.prototype.acceptTab = false;
// ContainerEdit.prototype.showButton = true;
// ContainerEdit.prototype.buttonIcon = "drop-down";
// ContainerEdit.prototype.defaultColor = "#2196F3";

ContainerEdit.prototype.DefaultPainter = function() {
    return new ContainerEditPainter(this);
};

ContainerEdit.prototype.Initialize = function(params) {
    ContainerEdit.prototype.parent.prototype.Initialize.call(this, params);

	// this.containerInit = params.options.init;
	// this.containerWidth = params.options.width;
	// this.containerHeight = defaultValue(params.options.height, 100);
	// this.containerColor = defaultValue(params.options.color, this.defaultColor);
	this.height = defaultValue(params.height, 75);
	this.initContent = params.initContent;
};

//**************************************************************************************************
// CustomDropDownEdit
//**************************************************************************************************
Class.Inherits(CustomDropDownEdit, TextEdit); 
function CustomDropDownEdit(Params) {
    CustomDropDownEdit.prototype.parent.call(this, Params);
};

CustomDropDownEdit.prototype.classID = "CustomDropDownEdit";
CustomDropDownEdit.prototype.showButton = true;
CustomDropDownEdit.prototype.buttonIcon = "drop-down";
CustomDropDownEdit.prototype.defaultColor = "#2196F3";

CustomDropDownEdit.prototype.DefaultPainter = function() {
    return new CustomDropDownEditPainter(this);
};

CustomDropDownEdit.prototype.Initialize = function(params) {
    CustomDropDownEdit.prototype.parent.prototype.Initialize.call(this, params);

	this.containerInit = params.options.init;
	this.containerWidth = params.options.width;
	this.containerHeight = defaultValue(params.options.height, 100);
	this.containerColor = defaultValue(params.options.color, this.defaultColor);
};

CustomDropDownEdit.prototype.ButtonClick = function(e) {
	var self = this;
	var edit = this.Painter.edit;

	// console.log(this.containerWidth)
	var width = undefined;
	if(this.containerWidth == 0)
		width = undefined
	else
		width = defaultValue(this.containerWidth, edit.parent().outerWidth());
	
	edit.select();
	this.dialog = new JPopupDialog({
		Target: edit.parent(),
		Modal: false,
		Painter: {
			painterClass: SimpleDialogPainter,
			color: this.containerColor,
			snap: "bottom",
			// snap: "right",
			// snap: "top",
			align: "left",
			inset: false,
			// inset: true,
			// width: self.containerWidth,
			width: width,
			OnRenderHeader: function(dialog, container) {
				container.remove();
			},
			OnRenderContent: function(dialog, container) {
				if(self.containerHeight)
					container.css("height", self.containerHeight);
				
				container.css("background", "white");
				
				self.containerInit({owner: dialog, container: container, lookup:true, lookupColumn:self.dataColumn});
			},
			OnRenderFooter: function(dialog, container) {
				container.remove();
			}
		}
	});
};

//**************************************************************************************************
// ListBoxEdit
//**************************************************************************************************
// Class.Inherits(ListBoxEdit, JBaseEditControl); 
Class.Inherits(ListBoxEdit, CustomDropDownEdit); 
function ListBoxEdit(Params) {
    ListBoxEdit.prototype.parent.call(this, Params);
};

ListBoxEdit.prototype.classID = "ListBoxEdit";
ListBoxEdit.prototype.customControl = true;
ListBoxEdit.prototype.showButton = true;
ListBoxEdit.prototype.buttonIcon = "menu";
ListBoxEdit.prototype.defaultColor = "#FF802B";

ListBoxEdit.prototype.DefaultPainter = function() {
    return new ListBoxEditPainter(this);
};

ListBoxEdit.prototype.Initialize = function(params) {
    ListBoxEdit.prototype.parent.prototype.Initialize.call(this, params);
	this.keyName = params.options.key;
	this.valueName = params.options.value;
	this.data = params.options.data;
	this.containerHeight = 0;
	this.containerWidth = 0;

	var self = this;
	this.containerInit = function(params) {
		// console.log(params)
		var dialog = params.owner;	
		var column = self.dataColumn;	
		params.container.attr("edit-sec", "list-box");
		for(var i = 0; i < self.data.length; i++) {
			var selected = column.get() == self.data[i][self.keyName];
			CreateElement("div", params.container)
				.attr("list-sec", "item")
				.data("list-key-id", self.data[i][self.keyName])
				.html(self.data[i][self.valueName])
				.click(function() {
					// console.log($(this).data("list-key-id"))
					column.set($(this).data("list-key-id"));
					dialog.Hide();
				})
		};
	};
};

//**************************************************************************************************
// LookupEdit
//**************************************************************************************************
// Class.Inherits(LookupEdit, TextEdit); 
Class.Inherits(LookupEdit, CustomDropDownEdit); 
function LookupEdit(Params) {
    LookupEdit.prototype.parent.call(this, Params);
};

LookupEdit.prototype.classID = "LookupEdit";
LookupEdit.prototype.showButton = true;
LookupEdit.prototype.buttonIcon = "drop-down-table";
LookupEdit.prototype.defaultColor = "#FF802B";

LookupEdit.prototype.DefaultPainter = function() {
    return new LookupEditPainter(this);
};

LookupEdit.prototype.Initialize = function(params) {
    LookupEdit.prototype.parent.prototype.Initialize.call(this, params);
	var self = this;
	var lookupInit = params.options.init;
	this.initDataRequest = params.options.initDataRequest;
	this.disableEdit = defaultValue(params.options.disableEdit, false);
	
	this.containerInit = function(params) {
		return new JDBGrid({
			params: params,
			Painter: {
				css: "countries"
			},
			init: function(grid) {
				grid.Events.OnInitGrid.add(function(grid) {
					// grid.optionsData.url = "countries";
					grid.optionsData.cache = true;
					grid.options.lookup = params.lookup;
					
					grid.options.showToolbar = true;
					grid.options.toolbarTheme = "svg";
					
					grid.options.horzScroll = false;
					// grid.options.showPager = true;
					grid.options.showPager = false;
					grid.options.showSummary = false;
					grid.options.cardView = false;
					grid.options.autoScroll = true;
					grid.options.allowSort = true;
					// grid.options.showSelection = true;
					grid.options.showBand = false;
					// grid.options.showBand = true;
					grid.options.simpleSearch = true;
				});

				lookupInit(self, grid);
			}
		});	
	};
};

//**************************************************************************************************
// LookupEdit2
//**************************************************************************************************
Class.Inherits(LookupEdit2, CustomDropDownEdit); 
function LookupEdit2(Params) {
    LookupEdit2.prototype.parent.call(this, Params);
};

LookupEdit2.prototype.classID = "LookupEdit2";
LookupEdit2.prototype.showButton = true;
LookupEdit2.prototype.buttonIcon = "drop-down-table";
LookupEdit2.prototype.defaultColor = "#FF802B";

LookupEdit2.prototype.DefaultPainter = function() {
    return new LookupEditPainter(this);
};

LookupEdit2.prototype.Initialize = function(params) {
    LookupEdit2.prototype.parent.prototype.Initialize.call(this, params);
	var self = this;
	var lookupInit = params.options.init;
	var initParams = params.options.initParams;
	this.initDataRequest = params.options.initDataRequest;
	this.disableEdit = defaultValue(params.options.disableEdit, false);
	
	this.containerInit = function(params) {
		return new jGrid($.extend(params, {
			paintParams: {
				css: "lookup",
				toolbar: {theme: "svg"}
			},
			init: function(grid, callback) {					
				grid.Events.OnInit.add(function(grid) {					
					grid.options.horzScroll = false;
					grid.options.allowSort = true;
					grid.options.editNewPage = false;
					grid.options.showSelection = false;
					grid.options.showToolbar = !desktop.mobile;
					
					grid.Events.OnInitData.add(function(grid, data) {
						self.dataColumn.lookupDataset = data;
					});
					
					grid.Events.OnInitDataRequest.add(function(grid, dataParams) {
						// console.log("1")
						if(initParams) initParams(dataParams);
					});
				
					grid.methods.add("getCommandIcon", function(grid, column, previous) {
						if(column.command === "select-lookup")
							return "transfer"
						else
							return previous							
					});
								
					grid.methods.add("getCommandHint", function(grid, column, previous) {
						if(column.command === "select-lookup")
							return "Select record"
						else
							return previous							
					});
					
					grid.Events.OnCommand.add(function(grid, column) {	
						if(column.command === "select-lookup")
							self.Select(grid.dataset.getKey());
					});
					
					
					grid.Events.OnInitColumns.add(function(grid) {
						grid.NewBand({fixed:"left"}, function(band) {
							band.NewCommand({command:"select-lookup"});
						});
						if(!desktop.mobile)
							grid.NewBand({fixed:"right"}, function(band) {
								band.NewCommand({command:"select-lookup"});
							});
					});	
					
					lookupInit(self, grid);
				});
			}
		}));
	};
};

LookupEdit2.prototype.Select = function(id) {
	desktop.HideHints();
	this.dialog.Hide();
	this.dataColumn.set(id);
};

//**************************************************************************************************
// BaseEditControlPainter
//**************************************************************************************************
Class.Inherits(BaseEditControlPainter, JControlPainter);
function BaseEditControlPainter(Control) {
    BaseEditControlPainter.prototype.parent.call(this, Control);
};

BaseEditControlPainter.prototype.type = "edit";
BaseEditControlPainter.prototype.classID = "BaseEditControlPainter";

BaseEditControlPainter.prototype.Readonly = function() {
	// return this.Control.dataColumn.readonly || this.Control.dataColumn.dataset.readonly;
	return this.Control.Readonly();
};

BaseEditControlPainter.prototype.Paint = function() {
    BaseEditControlPainter.prototype.parent.prototype.Paint.call(this);
	var edit = this.Control;
	var container = this.rowContainer = CreateElement("tr", edit.container).attr("edit-sec", "edit-row");
	
	if(edit.showCategory) {
		var gutter = CreateElement("td", container).attr("cat-sec", "gutter");
		container.data("gutter", gutter);
	};
	
	if(!this.Control.noLabel) 
		this.label = CreateElement("td", container).attr("edit-sec", "label")
			.html(edit.GetCaption());
	
	this.PaintRow(edit, container);

	this.SetContainer(container);
};

BaseEditControlPainter.prototype.PaintRow = function(edit, container) {
	// console.log(this.Control)
	if(this.Control.noLabel) {
		// console.log(this.label);
		// this.label.attr("colspan", 2);
	} else if(this.Control.showButton && !this.Readonly()) {
		var self = this;
		this.button = CreateElement("td", container).attr("edit-sec", "button").attr("button-type", this.Control.dataColumn.type)
			.click(function() {
				self.Control.ButtonClick($(this));
			});
			
		if(desktop.mobile) this.button.attr("colspan", 2);
		desktop.GetSvg(this.button, this.Control.buttonIcon)
	} else
		// this.label.attr("colspan", 2);
		this.label.attr("colspan", desktop.mobile ? 3: 2);
	
	if(!this.Control.noLabel && !desktop..mobile) 
		CreateElement("td", container).attr("edit-sec", "sizer");
	
	if(!this.Control.noLabel) {
		if(edit.Required()) {
			var gutter = container.data("gutter");
			desktop.GetSvg(gutter, "db-required");
			// desktop.GetSvg(CreateElement("td", container).attr("edit-sec", "required"), "star")
		// } else {
			// CreateElement("td", container).attr("edit-sec", "required");
		}
	};
	
	this.data = CreateElement("td", container).attr("edit-sec", "data");
	if(this.Control.noLabel) {
		this.data.attr("colspan", 4);
		// console.log(this.Control)
		if(!this.Control.noLabelPadding)
			this.data.css("padding-left", 10);
	};
	
	this.edit = this.CreateEditControl(this.data);
	
	this.SetReadOnly(this.Readonly());
	this.SetVisible(this.Control.visible);
	
	this.BindEditControl(this.edit);
};

BaseEditControlPainter.prototype.SetVisible = function(visible) {
	this.rowContainer.css("display", visible ? "" : "none")	
};

BaseEditControlPainter.prototype.SetRequired = function(required) {
	if(!this.Control.noLabel) {
		if(required) {
			if(!this.Control.dataColumn.required)
				desktop.GetSvg(this.container.data("gutter"), "db-required");
		} else {
			this.container.data("gutter").html("");
		};
		
		this.Control.dataColumn.required = required;
	}
};

BaseEditControlPainter.prototype.SetReadOnly = function(readonly) {
	if(readonly) {
		this.edit.attr("tabindex", "-1");
		this.edit.attr("readonly", "readonly");
	} else if(this.Control.acceptTab) {
		// if(!this.Control.editor.tabindex) this.Control.editor.tabindex = 0;
		// this.edit.attr("tabindex", ++this.Control.editor.tabindex);
		this.edit.removeAttr("readonly");
		if(!this.Control.noFocus)
			this.edit.attr("tabindex", 0);
	}
}

BaseEditControlPainter.prototype.BindEditControl = function(control) {
	this.Control.dataset.bindControl(control, {
		fname: this.Control.id
	}, this.Control.customControl);
	
	if(this.Control.customControl) {
		var self = this;
		control.on("update", function(dataset, column) {
			self.PaintControl($(this));
		})
	};
};

BaseEditControlPainter.prototype.CreateEditControl = function(container) {
	return CreateElement("input", container, "", "");
};

BaseEditControlPainter.prototype.NumericOnly = function(control) {
	control.keydown(function(event) {
		// console.log(event.keyCode)
		// Allow: backspace, delete, escape, and enter
		if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 27 || event.keyCode == 13 ||
			 // Allow: Ctrl+A
			(event.keyCode == 65 && event.ctrlKey === true) ||
			 // Allow: home, end, left, right
			(event.keyCode >= 35 && event.keyCode <= 39) ||
			 // Allow: tab
			(event.keyCode == 9)) {
				 // let it happen, don't do anything
				 return;
		}
		else {
			// Ensure that it is a number and stop the keypress
			if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
				if(!((event.keyCode == 190 || event.keyCode == 110))) {
					// console.log(event.keyCode)
					event.preventDefault();                                 
				}
			}
		}
	});					
};

//**************************************************************************************************
// TextEditPainter
//**************************************************************************************************
Class.Inherits(TextEditPainter, BaseEditControlPainter);
function TextEditPainter(Control) {
    TextEditPainter.prototype.parent.call(this, Control);
};

TextEditPainter.prototype.classID = "TextEditPainter";

TextEditPainter.prototype.BindEditControl = function(control) {
	TextEditPainter.prototype.parent.prototype.BindEditControl.call(this, control);
	if(this.Control.dataColumn.upperCase) {
		this.edit.css("text-transform", "uppercase");
	};
};

//**************************************************************************************************
// MemoEditPainter
//**************************************************************************************************
Class.Inherits(MemoEditPainter, BaseEditControlPainter);
function MemoEditPainter(Control) {
    MemoEditPainter.prototype.parent.call(this, Control);
};

MemoEditPainter.prototype.classID = "MemoEditPainter";

MemoEditPainter.prototype.CreateEditControl = function(container) {
	return CreateElement("textarea", container, "", "").css("padding", "2px 0 0 0").css("height", this.Control.height);
};

MemoEditPainter.prototype.BindEditControl = function(control) {
	MemoEditPainter.prototype.parent.prototype.BindEditControl.call(this, control);
	// if(this.Control.dataColumn.upperCase) {
		// this.edit.css("text-transform", "uppercase");
	// };
};

//**************************************************************************************************
// NumericEditPainter
//**************************************************************************************************
Class.Inherits(NumericEditPainter, BaseEditControlPainter);
function NumericEditPainter(Control) {
    NumericEditPainter.prototype.parent.call(this, Control);
};

NumericEditPainter.prototype.classID = "NumericEditPainter";

NumericEditPainter.prototype.BindEditControl = function(control) {
	NumericEditPainter.prototype.parent.prototype.BindEditControl.call(this, control);
	
	control.keydown(function(event) {
		// Allow: backspace, delete, escape, and enter
		if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 27 || event.keyCode == 13 ||
			 // Allow: dot or period
			(event.keyCode == 190) || (event.keyCode == 110) ||
			 // Allow: Ctrl+A
			(event.keyCode == 65 && event.ctrlKey === true) ||
			 // Allow: home, end, left, right
			(event.keyCode >= 35 && event.keyCode <= 39) ||
			 // Allow: tab
			(event.keyCode == 9)) {
				 // let it happen, don't do anything
				 return;
		}
		else {
			// Ensure that it is a number and stop the keypress
			if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
				// if(!(item.Money && (event.keyCode == 190 || event.keyCode == 110))) {
				if(!((event.keyCode == 190 || event.keyCode == 110))) {
					event.preventDefault();                                 
				}
			}
		}
	});					
};

//**************************************************************************************************
// MoneyEditPainter
//**************************************************************************************************
Class.Inherits(MoneyEditPainter, NumericEditPainter);
function MoneyEditPainter(Control) {
    MoneyEditPainter.prototype.parent.call(this, Control);
};

MoneyEditPainter.prototype.classID = "MoneyEditPainter";

MoneyEditPainter.prototype.BindEditControl = function(control) {
	MoneyEditPainter.prototype.parent.prototype.BindEditControl.call(this, control);
	
	control.data("edit", this.Control);
	
	control.focus(function() {
		var val = $(this).val();
		$(this).val(val.replaceAll(",",""));
		$(this).select();
	});
	
	control.on("blur", function(event) {
		if($(this).val()) {
			var s = $(this).val().replaceAll(",","");
			if(s.indexOf(".") == -1) s += ".0";			
			var val = parseFloat(s);
			if(Object.prototype.toString.call(val) === "[object Number]") {
				$(this).val(val.formatMoney($(this).data("edit").dataColumn.format))
			};
		} else { 
			$(this).val("");
		}
	});
	
	control.keydown(function(event) {
		var val = $(this).val();
		if(event.keyCode == 13) {
			if(val) {
				if(val == ".") val = "0";
				$(this).val(parseFloat(val).formatMoney($(this).data("edit").dataColumn.format).replaceAll(",",""))
				$(this).select();
			};
		};
	});
};

//**************************************************************************************************
// DateEditPainter
//**************************************************************************************************
Class.Inherits(DateEditPainter, BaseEditControlPainter);
function DateEditPainter(Control) {
    DateEditPainter.prototype.parent.call(this, Control);
};

DateEditPainter.prototype.classID = "DateEditPainter";

DateEditPainter.prototype.BindEditControl = function(control) {
	DateEditPainter.prototype.parent.prototype.BindEditControl.call(this, control);
	
	var dateInput = new JDateInput({input:control, editor:this.Control});
	control.data("dateInput", dateInput);
	control.data("edit", this.Control);
	// control.data("dataColumn", this.Control.dataColumn);

	// control.focus(function() {
		// $(this).data("edit").ShowCalendar();
		// $(this).select();
	// });
	
	// control.keydown(function(event) {
		// if(event.keyCode == 9) {
			// $(this).data("edit").HideCalendar();
		// };
	// });
};

//**************************************************************************************************
// RadioButtonEditPainter
//**************************************************************************************************
Class.Inherits(RadioButtonEditPainter, BaseEditControlPainter);
function RadioButtonEditPainter(Control) {
    RadioButtonEditPainter.prototype.parent.call(this, Control);
};

RadioButtonEditPainter.prototype.classID = "RadioButtonEditPainter";

RadioButtonEditPainter.prototype.CreateEditControl = function(container) {
	return CreateElement("div", container).attr("edit-sec", "radio")
};

RadioButtonEditPainter.prototype.PaintControl = function(container) {
	var edit = this.Control;	
	var column = this.Control.dataColumn;
	container.html("");
	if(this.Readonly()) {
		for(var i = 0; i < edit.data.length; i++) {
			var selected = column.get() == edit.data[i][edit.keyName];
			if(selected) {
				var c = CreateElement("div", container).attr("radio-sec", "item-readonly")
							.data("column", column)
							.data("value", edit.data[i][edit.keyName])
							.click(function() {
								var item = $(this);
								if(item.data("value") != column.get())
									column.set(item.data("value"));
							});
							
				desktop.GetSvg(c, "radio-on");
				
				CreateElement("span", c)
					.attr("radio-sec", "label")
					.attr("radio-selected", selected ? 1: 0)
					.html(edit.data[i][edit.valueName]);
			};
		};
	} else {
		for(var i = 0; i < edit.data.length; i++) {
			var c = CreateElement("div", container).attr("radio-sec", "item")
						.data("column", column)
						.data("value", edit.data[i][edit.keyName])
						.click(function() {
							var item = $(this);
							if(item.data("value") != column.get())
								column.set(item.data("value"));
						});
				
			var selected = column.get() == edit.data[i][edit.keyName];
			if(selected) {
				desktop.GetSvg(c, "radio-on")
			} else {
				desktop.GetSvg(c, "radio-off");
			};
	
			CreateElement("span", c)
				.attr("radio-sec", "label")
				.attr("radio-selected", selected ? 1: 0)
				.html(edit.data[i][edit.valueName]);
		};
	};
};

//**************************************************************************************************
// LinkEditPainter
//**************************************************************************************************
Class.Inherits(LinkEditPainter, BaseEditControlPainter);
function LinkEditPainter(Control) {
    LinkEditPainter.prototype.parent.call(this, Control);
};

LinkEditPainter.prototype.classID = "LinkEditPainter";

LinkEditPainter.prototype.CreateEditControl = function(container) {
	// return CreateElement("div", container).attr("edit-sec", "radio")
	return CreateElement("a", container).attr("edit-sec", "link")
};

LinkEditPainter.prototype.PaintControl = function(container) {
	var edit = this.Control;	
	var column = this.Control.dataColumn;
	container.html(column.get());
	container.attr("href", edit.link(column));
	container.attr("target", "_blank");
	// container.attr("target", edit.link(column));
};

//**************************************************************************************************
// TimeStampPainter
//**************************************************************************************************
Class.Inherits(TimeStampPainter, BaseEditControlPainter);
function TimeStampPainter(Control) {
    TimeStampPainter.prototype.parent.call(this, Control);
};

TimeStampPainter.prototype.classID = "TimeStampPainter";

TimeStampPainter.prototype.CreateEditControl = function(container) {
	// return CreateElement("div", container).attr("edit-sec", "radio")
	// return CreateElement("a", container).attr("edit-sec", "link")
	return CreateElement("label", container).attr("edit-sec", "timestamp")
};

TimeStampPainter.prototype.PaintControl = function(container) {
	var edit = this.Control;
	// var name = this.Control
	// console.log(this.Control.name)
	var column = this.Control.dataColumn;
	var name = this.Control.dataColumn.dataset.get(this.Control.name);
	// console.log(this.Control.name)
	// return ("Created by <span x-sec='user'>{1}</span> on <span x-sec='date'>{0}</span>").format(column.formatDateTime("MMMM d, yyyy"), column.dataset.get("create_user_name"));
	
	container.html(("{0} <span x-sec='user'>{1}</span> on <span x-sec='datetime'>{2}</span>").format(this.Control.label, name, column.formatDateTime("MMMM d, yyyy"));
	// container.attr("href", edit.link(column));
	// container.attr("target", "_blank");
};

//**************************************************************************************************
// ContainerEditPainter
//**************************************************************************************************
Class.Inherits(ContainerEditPainter, BaseEditControlPainter);
function ContainerEditPainter(Control) {
    ContainerEditPainter.prototype.parent.call(this, Control);
};

ContainerEditPainter.prototype.classID = "ContainerEditPainter";

ContainerEditPainter.prototype.CreateEditControl = function(container) {
	return CreateElement("div", container).css("height", this.Control.height)
};

ContainerEditPainter.prototype.BindEditControl = function(control) {
	this.Control.initContent($(control));
	// console.log("BindEditControl")
	// this.Control.dataset.bindControl(control, {
		// fname: this.Control.id
	// }, this.Control.customControl);
	
	// if(this.Control.customControl) {
		// var self = this;
		// control.on("update", function(dataset, column) {
			// self.PaintControl($(this));
		// })
	// };
};

//**************************************************************************************************
// CustomDropDownEditPainter
//**************************************************************************************************
Class.Inherits(CustomDropDownEditPainter, BaseEditControlPainter);
function CustomDropDownEditPainter(Control) {
    CustomDropDownEditPainter.prototype.parent.call(this, Control);
};

CustomDropDownEditPainter.prototype.classID = "CustomDropDownEditPainter";

//**************************************************************************************************
// LookupEditPainter
//**************************************************************************************************
Class.Inherits(LookupEditPainter, CustomDropDownEditPainter);
function LookupEditPainter(Control) {
    LookupEditPainter.prototype.parent.call(this, Control);
};

LookupEditPainter.prototype.classID = "LookupEditPainter";

LookupEditPainter.prototype.BindEditControl = function(control) {
	LookupEditPainter.prototype.parent.prototype.BindEditControl.call(this, control);
	if(this.Control.disableEdit) {
		control.attr("readonly", "readonly")
	};
};

//**************************************************************************************************
// ListBoxEditPainter
//**************************************************************************************************
Class.Inherits(ListBoxEditPainter, CustomDropDownEditPainter);
function ListBoxEditPainter(Control) {
    ListBoxEditPainter.prototype.parent.call(this, Control);
};

ListBoxEditPainter.prototype.classID = "ListBoxEditPainter";

ListBoxEditPainter.prototype.CreateEditControl = function(container) {
	return CreateElement("div", container).attr("edit-sec", "listbox")
};

ListBoxEditPainter.prototype.PaintControl = function(container) {
	var edit = this.Control;	
	var column = this.Control.dataColumn;	
	for(var i = 0; i < edit.data.length; i++) {
		var selected = column.get() == edit.data[i][edit.keyName];
		if(selected) {
			container.html(edit.data[i][edit.valueName]);
		};
	};
};
// ****************************************************************************************************
// File name: form-edit.js
// Last modified on
// 13-MAR-2015
// ****************************************************************************************************

//**************************************************************************************************
// JDateInput
// 01 02 03   04 15 06 07
// dd/MM/yyyy hh:mm:ss tt
//**************************************************************************************************
Class.Inherits(JDateInput, JObject);
function JDateInput(params) {
	JDateInput.prototype.parent.call(this, params);
};

JDateInput.prototype.classID = "JDateInput";

JDateInput.prototype.initialize = function(params) {
	JDateInput.prototype.parent.prototype.initialize.call(this, params);
	this.input = params.input;
	this.editor = params.editor;
	this.dataColumn = this.editor.dataColumn;
	this.items = new JList();
	this.hasTime = this.dataColumn.format == "datetime";
	this.editing = false;
	
	var sections = [];
	var tokens = ["yyyy","MM","dd","hh","mm","ss","tt"];
	for(var i = 0; i < tokens.length; i++) {
		var format = __dateformat;
		if(this.hasTime)
			format = __dateformat +" "+ __timeformat;
		
		var pos = format.indexOf(tokens[i]);
		if(pos > -1) {
			sections.push({
				sec:tokens[i], 
				start:pos,
				end:pos+tokens[i].length
			})
		};
	};
	
	sections.sort(function(a, b) {
		return a.start > b.start;
	});

	for(var i = 0; i < sections.length; i++) {
		var inputClass, section = sections[i];
		section.seq = i+1;
		
		if(section.sec == "dd") {
			inputClass = JDateSectionDay;
		} else if(section.sec == "MM") {
			inputClass = JDateSectionMonth;
		} else if(section.sec == "yyyy") {
			inputClass = JDateSectionYear;
		} else if(section.sec == "hh") {
			inputClass = JDateSectionHour;
		} else if(section.sec == "mm") {
			inputClass = JDateSectionMinute;
		} else if(section.sec == "ss") {
			inputClass = JDateSectionSecond;
		} else if(section.sec == "tt") {
			inputClass = JDateSectionApm;
		};

		var item = this.createInput(inputClass, section);
		this.items.add(item.name, item);
	};
	
	this.items.each(function(i, section, sections) {
		if(i == 0) {
			sections[i].next = sections[i+1];
			sections[i].prev = sections[sections.length-1];
		} else if(i == sections.length-1) {
			sections[i].next = sections[0];
			sections[i].prev = sections[i-1];
		} else {
			sections[i].next = sections[i+1];
			sections[i].prev = sections[i-1];
		}
	});
	
};
	
JDateInput.prototype.setDate = function(date) {		
	if(this.hasTime)
		this.input.val(date.format(__datetimeformat))
	else
		this.input.val(date.format(__dateformat));

	this.editor.calendar.calendar.Select(date, true);
	this.dataColumn.set(date);
};

JDateInput.prototype.update = function(values) {	
	var date = this.valid(values);
	if(!date) 
		date = this.dataColumn.asDate();
	// console.log(date)
	if(this.hasTime)
		this.input.val(date.format(__datetimeformat))
	else
		this.input.val(date.format(__dateformat));
	
	return date;
};

JDateInput.prototype.valid = function(values) {	
	if(!values) {
		values = this.editingValues();
	};
	
	values.year = parseInt(values.year);
	values.month = parseInt(values.month);
	values.day = parseInt(values.day);
	if(this.hasTime) {
		values.hour = parseInt(values.hour);
		values.minute = parseInt(values.minute);
		values.second = parseInt(values.second);
		return ("{0}-{1}-{2} {3}:{4}:{5} {6}").format(values.year.strZero(4), values.month.strZero(2), values.day.strZero(2), values.hour.strZero(2), values.minute.strZero(2), values.second.strZero(2), values.apm).parseDate("yyyy-MM-dd hh:mm:ss tt")
		// return ("{0}-{1}-{2} {3}:{4}:{5} {6}").format(values.year, values.month, values.day, values.hour, values.minute, values.second, values.apm).parseDate("yyyy-M-d h:m:s tt")
	} else {
		return ("{0}-{1}-{2}").format(values.year, values.month, values.day).parseDate("yyyy-M-d");
	};
};

JDateInput.prototype.afterInitialize = function(params) {
	JDateInput.prototype.parent.prototype.afterInitialize.call(this, params);

	this.input.focus(function() {
		$(this).data("edit").ShowCalendar();
		$(this).select();
	});
	
	this.input.keydown(function(event) {
		var dateInput = $(this).data("dateInput");
		if(event.keyCode == 9) {
			$(this).data("edit").HideCalendar();
			// var date = dateInput.update();
			// dateInput.dataColumn.set(date);
			dateInput.dataColumn.set(dateInput.update());
		};
	});

	this.input.on("input", function(event) {
		var dateInput = $(this).data("dateInput");
		var item = dateInput.currentItem();
		if(item) 
			// if(!item.validateInput())
				// console.log({v:dateInput.input.val(), max:item.max})
			// if(!dateInput.validateInput(item))
			// if(!dateInput.valid())
				// item.select()
			// else 
			if(dateInput.editingValues()[item.name].length == item.max) {
				dateInput.update();
				item.next.select();
				dateInput.updateCalendar();
			};
		// console.log(dateInput.editingValues())
		// if(dateInput.editing) {
		// };
	});
	
	this.input.keydown(function(event) {
		// console.log(event.keyCode);
		var dateInput = $(this).data("dateInput");
		var pos = dateInput.pos();
		
		if(event.keyCode == 37 || event.keyCode == 39) { // arrow-left and right
			dateInput.each(function(section) {
				if(section.start == pos.start && section.end == pos.end) {
					if(event.keyCode == 39)
						section.next.select()
					else
						section.prev.select();
					
					event.preventDefault();
					return;
				}
			});
		};
		
		if(event.keyCode == 38 || event.keyCode == 40) { // arrow-up & down
			$(this).data("edit").ShowCalendar();
			var item = dateInput.currentItem();
			var increment = event.keyCode == 38 ? 1: -1;
			if(item) {
				item.toggle(increment);
				// if(item.name == "apm") {
					// var values = dateInput.editingValues();
					// values.apm = values.apm == "AM" ? "PM": "AM";
					// dateInput.update(values);
				// } else {
				// };
				
				item.select();
				event.preventDefault();
				return;				
			};
		};
		
		if(event.keyCode == 13) {
			$(this).data("edit").ShowCalendar();
			// var input = $(this).data("dateInput");
			if(dateInput.editing) {
				var item = dateInput.currentItem();
				dateInput.update();
				// console.log(item)
				item.next.select();
				dateInput.updateCalendar();
				// if(pos.start == input.val().length) {
					// section.next.select();
				// } else {
					// var item = input.currentItem();
					// var editingValues = input.editingValues();
					// item.value = editingValues[item.name];
					// var complete = input.valid(editingValues);
					// if(complete) {
						// item.next.select();
					// } else {
						// item.select(true);
					// };
				// };
			} else if(pos.start == 0 && pos.end == dateInput.input.val().length) { // all text is selected
				dateInput.items.getByIndex(0).select();
			} else {
				var item;
				dateInput.each(function(section) {
					if(section.start == pos.start && section.end == pos.end) {
						item = section.next;
					} else if(pos.start >= section.start && pos.start <= section.end) {
						item = section;
					};
				});
				
				if(item) {
					item.select();
				};
			};
			
			dateInput.editing = false;
			event.preventDefault();
			return;
		};

		var keyIndex = 0;
		if(event.keyCode >= 48 && event.keyCode <= 57) {
			keyIndex = event.keyCode - 48 + 1;
		} else if(event.keyCode >= 96 && event.keyCode <= 105) {
			keyIndex = event.keyCode - 96 + 1;
		};
		
		if(keyIndex) {
			var num = [0,1,2,3,4,5,6,7,8,9];
			var key = num[keyIndex - 1];
			var item = dateInput.currentItem();
			// var input = $(this).data("input");
			// console.log(dateInput.validateKey(item))
			// if(item.validateKey()) {
			if(dateInput.validateKey(item, key)) {
				dateInput.editing = true;
			} else {
				event.preventDefault();
				return;
			}
			// return;
			// input.update();
			// event.preventDefault();
			// return;
		// } else {
			// event.preventDefault();
			// return;
		};
		
		// Allow: backspace, delete, escape, and enter
		if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 27 || event.keyCode == 13 ||
			 // Allow: dot or period
			(event.keyCode == 190) || (event.keyCode == 110) ||
			 // Allow: Ctrl+A
			(event.keyCode == 65 && event.ctrlKey === true) ||
			 // Allow: home, end, left, right
			(event.keyCode >= 35 && event.keyCode <= 39) ||
			 // Allow: tab
			(event.keyCode == 9) ||
			// (event.keyCode == 189) ||
			(event.keyCode == 191)
			) {
				 // let it happen, don't do anything
				 return;
		}
		else {
			// Ensure that it is a number and stop the keypress
			if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
				// if(!(item.Money && (event.keyCode == 190 || event.keyCode == 110))) {
				if(!((event.keyCode == 190 || event.keyCode == 110))) {
					event.preventDefault();
				}
			}
		}
		
	});
};

JDateInput.prototype.createInput = function(inputClass, settings) {
	return new inputClass({owner:this, settings:settings});
};

JDateInput.prototype.currentItem = function() {
	var pos = this.pos();
	var item;
	this.each(function(section) {
		if(section.start == pos.start && section.end == pos.end) {
			item = section;
		} else if(pos.start >= section.start && pos.start <= section.end) {
			item = section;
		};
	});
	
	return item;
};

JDateInput.prototype.pos = function() {
	return {
		start: this.input[0].selectionStart,
		end: this.input[0].selectionEnd
	};
};

JDateInput.prototype.each = function(callback) {
	this.items.each(function(i, section, sections) {
		callback(section);
	});
};

JDateInput.prototype.editingValues = function(value) {
	var editValues;
	
	if(this.hasTime) {
		// console.log(this.input.val())
		var parts;
		
		if(value)
			parts = value.split(" ")
		else
			parts = this.input.val().split(" ");
		
		if(parts.length > 0) {
			editValues = parts[0].split("/").concat(parts[1].split(":"));
			editValues.push(parts[2]);
		} else {
			parts = this.input.val().split(" ");
		}
	} else {
		if(value)
			editValues = value.split("/");
		else
			editValues = this.input.val().split("/");
	};
	
	var values = {};
	this.items.each(function(i, section, sections) {
		values[section.name] = editValues[section.seq-1];
	});
	// console.log(editValues)
	// console.log(values)

	return values;
};

JDateInput.prototype.validateInput = function(item) {
	var values = this.editingValues();
	return item.validateInput(values[item.name]);
};

JDateInput.prototype.validateKey = function(item, key) {
	var allow = true;
	var pos = this.pos()
	var values = this.editingValues();
	// console.log(values)
	var edit = this.input.val();
	// console.log({edit:edit, start:pos.start, end:pos.end})
	// console.log({edit:edit, key:key, left:edit.substring(0, pos.start), right:edit.substring(pos.end)});
	var newEdit = edit.substring(0, pos.start) + key + edit.substring(pos.end);
	// console.log({newEdit:newEdit});
	var newValues = this.editingValues(newEdit);
	// console.log(newEdit)
	// console.log(newValues)
	
	allow = item.validate1(newValues[item.name]);
	if(allow) {
		if(this.hasTime)
			allow = Date.parse(newEdit, __datetimeformat)
		else
			allow = Date.parse(newEdit, __dateformat)
	};
	// console.log(allow)
	
	if(!allow) {
		allow = item.validate2(newValues[item.name]);

	// console.log(allow)
	// console.log(allow)
		// console.log(newValues)
	};
	
	return allow;
	// return item.validateKey(values[item.name]);
};

JDateInput.prototype.updateCalendar = function() {
	// var values = this.editingValues();
	this.editor.calendar.calendar.Select(this.valid(), true);
	
};

//**************************************************************************************************
// JBaseDateSectionInput
//**************************************************************************************************
Class.Inherits(JBaseDateSectionInput, JObject);
function JBaseDateSectionInput(params) {
	JBaseDateSectionInput.prototype.parent.call(this, params);
};

JBaseDateSectionInput.prototype.classID = "JBaseDateSectionInput";

JBaseDateSectionInput.prototype.initialize = function(params) {
	JBaseDateSectionInput.prototype.parent.prototype.initialize.call(this, params);
	this.owner = params.owner;
	this.dataColumn = params.owner.dataColumn;
	this.start = params.settings.start;
	this.end = params.settings.end;
	this.seq = params.settings.seq;
	this.max = this.sec.length;
};

JBaseDateSectionInput.prototype.afterInitialize = function(params) {
	JBaseDateSectionInput.prototype.parent.prototype.afterInitialize.call(this, params);
	// console.log({a:"afterInitialize", o:this})
};

JBaseDateSectionInput.prototype.select = function() {
	this.owner.input[0].selectionStart = this.start;
	this.owner.input[0].selectionEnd = this.end;
	
	return this;
};

JBaseDateSectionInput.prototype.toggle = function(increment) {
};

// JBaseDateSectionInput.prototype.validateInput = function() {
	// return this.owner.valid();
// };

// JBaseDateSectionInput.prototype.validateInput = function() {
	// var values = this.owner.editingValues();
	// return this.validate(values[this.name]);
// };

// JBaseDateSectionInput.prototype.validateInput = function(value) {
	// return false
// };

JBaseDateSectionInput.prototype.validate1 = function(value) {
	return false
};

JBaseDateSectionInput.prototype.validate2 = function(value) {
	return false
};

//**************************************************************************************************
// JDateSectionMonth
//**************************************************************************************************
Class.Inherits(JDateSectionMonth, JBaseDateSectionInput);
function JDateSectionMonth(params) {
	JDateSectionMonth.prototype.parent.call(this, params);
};

JDateSectionMonth.prototype.classID = "JDateSectionMonth";
JDateSectionMonth.prototype.sec = "MM";
JDateSectionMonth.prototype.name = "month";

// JDateSectionMonth.prototype.initialize = function(params) {
	// JDateSectionMonth.prototype.parent.prototype.initialize.call(this, params);
	// if(this.dataColumn.isNull())
		// this.value = ""	
	// else
		// this.value = (this.dataColumn.asDate().getMonth()+1).strZero(2);
// };

JDateSectionMonth.prototype.toggle = function(increment) {
	var date = this.owner.valid();
	if(date) {
		this.owner.setDate(date.addMonths(increment));
		// this.owner.editor.calendar.calendar.Select(date, true);
	};
};

JDateSectionMonth.prototype.validate1 = function(value) {
	return (parseInt(value) <= 12 && parseInt(value) > 0)
};

JDateSectionMonth.prototype.validate2 = function(value) {
	// console.log(value)
	// return (value.length == 1 && value == "0")
	return value == "0"
};

// JDateSectionMonth.prototype.validateInput = function(value) {
	// var num = parseInt(value);
	// return (num <= 12 && num > 0) || (num == 0 && value.length == 1)
// };

// JDateSectionMonth.prototype.validateKey = function(value) {
	// var pos = this.owner.pos();
	// var allow = value.length < 2;
	// console.log({value:value, allow:allow})
	// if(!allow)
		// allow = pos.start == this.start && pos.end == this.end;
	// return allow;
// };

//**************************************************************************************************
// JDateSectionDay
//**************************************************************************************************
Class.Inherits(JDateSectionDay, JBaseDateSectionInput);
function JDateSectionDay(params) {
	JDateSectionDay.prototype.parent.call(this, params);
};

JDateSectionDay.prototype.classID = "JDateSectionDay";
JDateSectionDay.prototype.sec = "dd";
JDateSectionDay.prototype.name = "day";

// JDateSectionDay.prototype.initialize = function(params) {
	// JDateSectionDay.prototype.parent.prototype.initialize.call(this, params);
	// if(this.dataColumn.isNull())
		// this.value = ""	
	// else
		// this.value = this.dataColumn.asDate().getDate().strZero(2);
// };

JDateSectionDay.prototype.toggle = function(increment) {
	var date = this.owner.valid();
	if(date) {
		this.owner.setDate(date.addDays(increment));
		// this.owner.editor.calendar.calendar.Select(date, true);
	};
};

JDateSectionDay.prototype.validate1 = function(value) {
	// return (parseInt(value) <= 12 && parseInt(value) > 0)
	// return (parseInt(value) <= 31 && parseInt(value) > 0)
	return parseInt(value) > 0
};

JDateSectionDay.prototype.validate2 = function(value) {
	return (value.length == 1 && value == "0")
};

//**************************************************************************************************
// JDateSectionYear
//**************************************************************************************************
Class.Inherits(JDateSectionYear, JBaseDateSectionInput);
function JDateSectionYear(params) {
	JDateSectionYear.prototype.parent.call(this, params);
};

JDateSectionYear.prototype.classID = "JDateSectionYear";
JDateSectionYear.prototype.sec = "yyyy";
JDateSectionYear.prototype.name = "year";

JDateSectionYear.prototype.toggle = function(increment) {
	var date = this.owner.valid();
	if(date) {
		this.owner.setDate(date.addYears(increment));
	};
};

JDateSectionYear.prototype.validate1 = function(value) {
	return parseInt(value) > 0
};

JDateSectionYear.prototype.validate2 = function(value) {
	return (value.length <= 4);// && value == "0")
};

//**************************************************************************************************
// JDateSectionHour
//**************************************************************************************************
Class.Inherits(JDateSectionHour, JBaseDateSectionInput);
function JDateSectionHour(params) {
	JDateSectionHour.prototype.parent.call(this, params);
};

JDateSectionHour.prototype.classID = "JDateSectionHour";
JDateSectionHour.prototype.sec = "hh";
JDateSectionHour.prototype.name = "hour";

JDateSectionHour.prototype.validate1 = function(value) {
	return parseInt(value) > 0 && parseInt(value) <= 12;
};

JDateSectionHour.prototype.validate2 = function(value) {
	return (value.length == 1 && value == "0")
};

JDateSectionHour.prototype.toggle = function(increment) {
	var date = this.owner.valid();
	if(date) {
		this.owner.setDate(date.addHours(increment));
	};
};

//**************************************************************************************************
// JDateSectionMinute
//**************************************************************************************************
Class.Inherits(JDateSectionMinute, JBaseDateSectionInput);
function JDateSectionMinute(params) {
	JDateSectionMinute.prototype.parent.call(this, params);
};

JDateSectionMinute.prototype.classID = "JDateSectionMinute";
JDateSectionMinute.prototype.sec = "mm";
JDateSectionMinute.prototype.name = "minute";

JDateSectionMinute.prototype.validate1 = function(value) {
	return parseInt(value) <= 59;
};

// JDateSectionMinute.prototype.validate2 = function(value) {
	// return (value.length == 1 && value == "0")
// };

JDateSectionMinute.prototype.toggle = function(increment) {
	var date = this.owner.valid();
	if(date) {
		this.owner.setDate(date.addMinutes(increment));
	};
};

//**************************************************************************************************
// JDateSectionSecond
//**************************************************************************************************
Class.Inherits(JDateSectionSecond, JBaseDateSectionInput);
function JDateSectionSecond(params) {
	JDateSectionSecond.prototype.parent.call(this, params);
};

JDateSectionSecond.prototype.classID = "JDateSectionSecond";
JDateSectionSecond.prototype.sec = "ss";
JDateSectionSecond.prototype.name = "second";

JDateSectionSecond.prototype.validate1 = function(value) {
	return parseInt(value) <= 59;
};

// JDateSectionSecond.prototype.validate2 = function(value) {
	// return (value.length == 1 && value == "0")
// };

JDateSectionSecond.prototype.toggle = function(increment) {
	var date = this.owner.valid();
	if(date) {
		this.owner.setDate(date.addSeconds(increment));
	};
};

//**************************************************************************************************
// JDateSectionApm
//**************************************************************************************************
Class.Inherits(JDateSectionApm, JBaseDateSectionInput);
function JDateSectionApm(params) {
	JDateSectionApm.prototype.parent.call(this, params);
};

JDateSectionApm.prototype.classID = "JDateSectionApm";
JDateSectionApm.prototype.sec = "tt";
JDateSectionApm.prototype.name = "apm";

JDateSectionApm.prototype.initialize = function(params) {
	JDateSectionApm.prototype.parent.prototype.initialize.call(this, params);
	if(this.dataColumn.isNull())
		this.value = ""	
	else
		this.value = this.dataColumn.asDate().getHours() < 12 ? "AM" : "PM"; 
};

JDateSectionApm.prototype.toggle = function(increment) {
	var values = this.owner.editingValues();
	values.apm = values.apm == "AM" ? "PM": "AM";
	this.owner.update(values);
};

//==================================================================================================
// SimpleEditor
//==================================================================================================
function SimpleEditor(params) {
	var editor = new JEditor({
		ID: params.id,
		Container: params.container,
		Theme: params.theme,
		Css: "editor",
		LabelWidth: params.labelWidth
	});	      
	
	params.initData(editor, editor.Dataset = params.dataset);
	params.initEditor(editor);
	
	editor.Paint();
	editor.AfterPaint();
	editor.Dataset.updateControls();
};

SimpleEditor.prototype.classID = "SimpleEditor";

//==================================================================================================
// FormEditor
//==================================================================================================
Class.Inherits(FormEditor, JControl);
function FormEditor(params) {
	FormEditor.prototype.parent.call(this, params);
	// console.log("FormEditor")
};

FormEditor.prototype.classID = "FormEditor";

FormEditor.prototype.DefaultPainter = function() {
    return new FormEditPainter(this);
};

FormEditor.prototype.Refresh = function() {
	// this.GetData("edit", function(result) {
		// result.caller.editData.resetData(result.edit, "", true);
	// });
};

FormEditor.prototype.Initialize = function(params) {
	FormEditor.prototype.parent.prototype.Initialize.call(this, params);
	// alerts("here...")
	this.id = params.id;
	this.mode = parseInt(this.id) == 0 || this.id == "" ? "new" : "edit";
	// console.log(this);
	// this.url = params.url.split("?")[1];
	this.dataset = params.dataset;
	this.postBack = params.postBack;
	this.postBackParams = params.url.split("?")[1];
	// console.log(this.postBack)
	// console.log(this.postBackParams)
	this.dialog = params.dialog;
	this.container = params.container;
	this.labelWidth = defaultValue(params.labelWidth, 0);
	this.containerPadding = defaultValue(params.containerPadding, 0);
	this.pageControlTheme = defaultValue(params.pageControlTheme, "data-entry");
	this.editorTheme = defaultValue(params.editorTheme, "default");
	this.fillContainer = defaultValue(params.fillContainer, false);
	this.showToolbar = defaultValue(params.showToolbar, false);
	
	this.Events = {};
	this.Events.OnInitData = new EventHandler(this);
	this.Events.OnInitToolbar = new EventHandler(this);
	this.Events.OnInitEditor = new EventHandler(this);
	this.Events.OnPost = new EventHandler(this);
	this.Events.OnPostError = new EventHandler(this);
	this.Events.OnPostSuccess = new EventHandler(this);
	this.Events.OnPostSuccess2 = new EventHandler(this);
	
	this.Events.OnPost.add(function(editor) {
		editor.dataset.post(function(dataset, msg, error) {
			// console.log("this is being call twice! who is calling this twice?")
			if(error < 0) {
				var title = "Error";
				if(typeof msg == "string") {
					if(error == 1)
						title = "Incomplete information"
				} else {
					title = msg.title;
					msg = msg.message;
				};
				
				editor.Events.OnPostError.trigger({title:title, msg:msg});
			} else {
				editor.Events.OnPostSuccess.trigger(error ? msg.message: ""); /* pass error so we can evaluate it accordingly */
				// editor.Events.OnPostSuccess2.trigger({msg: error ? msg.message: ""}); /* pass error so we can evaluate it accordingly */
			};
		});	
	});

	if(!this.dialog)	
		this.Events.OnPostSuccess.add(function(editor, info) {
			if(info)
				InfoDialog({
					target: editor.toolbar.Element(),
					title: "Information",
					message: info,
					snap: "bottom",
					inset: false
				});
		});
	
	this.Events.OnPostError.add(function(dialog, error) {
		ErrorDialog({
			// target: dialog.showToolbar ? dialog.toolbar.Element(): dialog.container,
			target: dialog.showToolbar ? dialog.toolbar.getItem("save").Element(): dialog.container,
			title: error.title,
			message: error.msg,
			snap: "bottom",
			inset: !dialog.showToolbar
		});
	});
	
	params.init(this);
	
	var self = this;
	if(this.dataset) {
		self.Events.OnInitData.trigger(self.dataset);
	} else {
		// console.log(this)
		// this.GetData("edit", function(params) {
		this.GetData(self.mode, function(params) {
				// params.qry = self.dataParams.stringifyRec(0);
			},
			function(data) {
				// console.log(data)
				self.mode = data.mode;
				self.Events.OnInitData.trigger(self.dataset = new Dataset(data.edit, "Data"));
				self.Paint();
				self.AfterPaint();  
				if(self.dialog) {
					self.dialog.Painter.Reposition();
					self.dialog.SetEditor(self);
					// console.log(self.dialog)
					// self.dialog.OnEditorLoaded.trigger();
					// self.dialog.EditorLoaded();
					// self.container.trigger("loaded")
				};
				
				// console.log(self.dataset)
				self.dataset.Events.OnPost.add(function(dataset, postCallback) {	
					self.GetData("update", function(params) {
						params.mode = data.mode;
						params.data = dataset.stringifyRec(0);
					}, function(result) {
						var msg;
						if(result.status != 0) {
							msg = {};
							msg.title = "Update error";
							msg.message = result.message;
						} else {
							msg = "";
							self.Events.OnPostSuccess2.trigger(result.update);
						};
						
						postCallback(msg, result.status);
					});
				})
				
			}
		);
		
		params.DelayPainting = true;
	};
	
};
	
// FormEditor.prototype.Save = function() {
	
// };

FormEditor.prototype.GetData = function(mode, init, callback) {	
	var params = {};
	if(this.postBackParams) {
		var p = this.postBackParams.split("&");
		$(p).each(function(i, s) {
			var p = s.split("=");
			params[p[0]] = p[1];
		});
	};
	
	if(init) init(params);
	
	var parts = this.postBack.split("/");
	// console.log(("{0}/get/{1}/{2}").format(parts[0], defaultValue(mode, "edit"), parts[1]));
	// console.log(mode)
	if(parts.length == 2)
		desktop.Ajax(this, ("/{0}/get/{1}/{2}").format(parts[0], defaultValue(mode, "edit"), parts[1]), params, callback)
	else
		desktop.Ajax(this, ("/get/{0}/{1}").format(defaultValue(mode, "edit"), this.postBack), params, callback);
	// desktop.Ajax(this, "/engine/get/edit/sys-users", params, callback);
};

FormEditor.prototype.InitializeToolbar = function(toolbar) {
	var self = this;
	this.toolbar = toolbar;
	
	toolbar.NewItem({
		id: "refresh",
		// icon: grid.options.toolbarSize == 16 ? "/engine/images/refresh.png": "/engine/images/refresh-24.png",
		icon: "refresh",
		iconColor: "#8DCF6E",
		hint: "Refresh",
		dataBind: this.dataset,
		dataEvent: function(dataset, button) {
			button.show(!dataset.editing);
		},
		click: function(item) {
			// grid.Refresh();
		}
	});
	
	toolbar.NewItem({
		id: "cancel",
		// icon: grid.options.toolbarSize == 16 ? "/engine/images/refresh.png": "/engine/images/refresh-24.png",
		icon: "db-cancel",
		// iconColor: "#8DCF6E",
		iconColor: "firebrick",
		hint: "Cancel edit",
		dataBind: this.dataset,
		dataEvent: function(dataset, button) {
			button.show(dataset.editing);
		},
		click: function(item) {
			item.dataBind.cancel();
		}
	});
	
	toolbar.NewItem({
		id: "save",
		// icon: grid.options.toolbarSize == 16 ? "/engine/images/refresh.png": "/engine/images/refresh-24.png",
		icon: "db-save",
		iconColor: "#1CA8DD",
		hint: "Save",
		dataBind: this.dataset,
		dataEvent: function(dataset, button) {
			button.show(dataset.editing);
		},
		click: function(item) {
			self.Events.OnPost.trigger();
		}
	});
	
	this.Events.OnInitToolbar.trigger(toolbar);
};

FormEditor.prototype.InitializeEditor = function(editor) {
	this.Events.OnInitEditor.trigger(editor);
};

FormEditor.prototype.AfterPaint = function() {
	FormEditor.prototype.parent.prototype.AfterPaint.call(this); 
	if(this.Painter.pageControl.TabCount() == 1) {
		this.Painter.pageControl.ShowTabs(false);
	};
};

//**************************************************************************************************
// FormEditPainter
//**************************************************************************************************
Class.Inherits(FormEditPainter, JControlPainter);
function FormEditPainter(Control) {
	FormEditPainter.prototype.parent.call(this, Control);
	this.Control = Control;
};

FormEditPainter.prototype.classID = "FormEditPainter";
FormEditPainter.prototype.type = "form-edit";

FormEditPainter.prototype.InitializePageControl = function(pg) {
	var self = this;

	var editorInit = {
		PageControl: pg,
		NewGroupEdit: function(caption, initEditor, dataset) {
			pg.NewTab(caption, {
				OnCreate: function(tab) {
					var container = CreateElement("div", tab.content)
						.attr("x-sec", "edit-container")
						.css("overflow-y", "auto")
						.css("padding", self.Control.containerPadding);
						
					var subContainer = CreateElement("div", container)
						.attr("x-sec", "edit-sub-container");
						
					if(self.Control.fillContainer) 
						subContainer.attr("x-fill", "1")
					
					// console.log(self.Control.editorTheme)
					var editor = new JEditor({
						ID: "edit_" + tab.id,
						Container: subContainer,
						Theme: self.Control.editorTheme,
						Css: "editor",
						LabelWidth: self.Control.labelWidth
					});	          
					
					var group = this;
					
					editor.Dataset = defaultValue(dataset, tab.pg.owner.dataset);
					editor.Dataset.Events.OnChanged.add(function(dataset, columnName) {
						group.OnDatasetChanged.trigger(columnName);
					});
					editor.Dataset.Events.OnCancel.add(function(dataset) {
						group.OnDatasetChanged.trigger();
					});
					
					this.OnDatasetChanged = new EventHandler(this);
					editor.group = this;
					editor.group.dataset = editor.Dataset;
					
					initEditor(editor, tab);
					
					editor.Paint();
					editor.AfterPaint();
					
					if(editor.Dataset) editor.Dataset.updateControls();
					
					editor.FocusFirstEditor();
				}
			});
		},
		NewContainer: function(caption, initContainer) {
			pg.NewTab(caption, {
				OnCreate: function(tab) {
					var container = CreateElement("div", tab.content).attr("x-sec", "edit-container").css("padding", self.Control.containerPadding);
					var subContainer = CreateElement("div", container).attr("x-sec", "edit-sub-container")
					
					initContainer(subContainer, tab);
				}
			});
		},
		NewSubSelectionView: function(caption, height, selectionColumnName, initView) {
			pg.NewTab(caption, {
				OnCreate: function(tab) {
					tab.content.css("height", height);
					
					var container = CreateElement("div", tab.content)
						.attr("x-sec", "edit-container")
						.css("overflow-y", "auto")
						.css("padding", self.Control.containerPadding);
						
					var subContainer = CreateElement("div", container)
						.attr("x-sec", "edit-sub-container");
						
					if(self.Control.fillContainer) 
						subContainer.attr("x-fill", "1")
					
					var params = {
						editor: self,
						container: subContainer,
						selectionColumn: self.Control.dataset.Columns.get(selectionColumnName)
					};
					
					initView(params);
				}
			});
		}
	};
	
	this.Control.InitializeEditor(editorInit);
};

FormEditPainter.prototype.InitializeToolbar = function(toolbar) {
	this.Control.InitializeToolbar(toolbar);
};

FormEditPainter.prototype.Paint = function() {
	FormEditPainter.prototype.parent.prototype.Paint.call(this); 
	var container = CreateElement("div", this.Control.container)
		.addClass("form-edit")
		.attr("x-sec", "main-container");
		
	if(this.Control.showToolbar) {
		var toolbarContainer = CreateElement("div", container)
			.attr("x-sec", "toolbar-container");

		var toolbar = new JToolbar({
				// id: "tb",
				// container: container,
				container: toolbarContainer,
				css: "toolbar",
				// theme: this.Control.options.toolbarTheme,
				theme: "svg",
				// buttonSize: this.Control.options.toolbarSize
				buttonSize: 24
		});
				
		this.InitializeToolbar(toolbar);
	};
	
	var subContainer = CreateElement("div", container)
		.attr("x-sec", "sub-container");
		
	this.pageControl = new JPageControl({
		owner: this.Control,
		container: subContainer,
		Painter: {
			// indent: 0,
			// spacing: 1,
			// margin: 4,
			// gutter: 20,
			autoHeight: false,
			theme: this.Control.pageControlTheme
		},
		init: function(pg) {
			pg.owner.Painter.InitializePageControl(pg);
		}
	});

	if(this.Control.showToolbar) {
		toolbar.SetVisible("cancel", false);
		toolbar.SetVisible("save", false);
	};
	
	this.SetContainer(container);
};
//==================================================================================================
// JFormEditor
//==================================================================================================
Class.Inherits(JFormEditor, JControl);
function JFormEditor(params) {
	JFormEditor.prototype.parent.call(this, params);
	// console.log("JFormEditor")
};

JFormEditor.prototype.classID = "JFormEditor";

JFormEditor.prototype.DefaultPainter = function() {
    return new JFormEditPainter(this);
};

JFormEditor.prototype.Refresh = function() {
	// this.GetData("edit", function(result) {
		// result.caller.editData.resetData(result.edit, "", true);
	// });
};

JFormEditor.prototype.Initialize = function(params) {
	JFormEditor.prototype.parent.prototype.Initialize.call(this, params);
	// alerts("here...")
	this.id = params.id;
	this.mode = parseInt(this.id) == 0 || this.id == "" ? "new" : "edit";
	// console.log(this);
	// this.url = params.url.split("?")[1];
	this.dataset = params.dataset;
	this.mode = defaultValue(params.mode, "edit");
	this.postBack = params.postBack;
	this.postBackParams = params.url.split("?")[1];
	// console.log(this.postBack)
	// console.log(this.postBackParams)
	this.dialog = params.dialog;
	this.container = params.container;
	this.autoHeight = defaultValue(params.autoHeight, false);
	this.labelWidth = defaultValue(params.labelWidth, 0);
	this.containerPadding = defaultValue(params.containerPadding, 0);
	this.showRefresh = defaultValue(params.showRefresh, true);
	this.pageControlOptions = $.extend({
		theme: "default",
		iconSize: 24
	}, params.pageControlOptions);
	
	this.pageControlTheme = defaultValue(params.pageControlTheme, "data-entry");
	// this.pageControlTheme = defaultValue(params.pageControlTheme, "search");
	// this.pageControlTheme = defaultValue(params.pageControlTheme, "default");
	this.editorTheme = defaultValue(params.editorTheme, "default");
	this.fillContainer = defaultValue(params.fillContainer, false);
	this.showToolbar = defaultValue(params.showToolbar, false);
	
	this.Events = {};
	this.Events.OnInitData = new EventHandler(this);
	this.Events.OnInitToolbar = new EventHandler(this);
	this.Events.OnInitEditor = new EventHandler(this);
	this.Events.OnPost = new EventHandler(this);
	this.Events.OnPostError = new EventHandler(this);
	this.Events.OnPostSuccess = new EventHandler(this);
	this.Events.OnPostSuccess2 = new EventHandler(this);
	
	this.Events.OnPost.add(function(editor) {
		// console.log("OnPost")
		editor.dataset.post(function(dataset, msg, error) {
			// console.log({dataset:dataset, msg:msg, error:error})
			// console.log("here 1")
			if(error < 0) {
				var title = "Error";
				if(typeof msg == "string") {
					if(error == 1)
						title = "Incomplete information"
				} else {
					title = msg.title;
					msg = msg.message;
				};
				
				editor.Events.OnPostError.trigger({title:title, msg:msg});
			} else {
				// console.log("here...")
				editor.Events.OnPostSuccess.trigger(error ? msg.message: ""); /* pass error so we can evaluate it accordingly */
				// editor.Events.OnPostSuccess2.trigger({msg: error ? msg.message: ""}); /* pass error so we can evaluate it accordingly */
			};
		});	
	});

	if(!this.dialog)	
		this.Events.OnPostSuccess.add(function(editor, info) {
			if(info)
				InfoDialog({
					target: editor.toolbar.Element(),
					title: "Information",
					message: info,
					snap: "bottom",
					inset: false
				});
		});
	
	this.Events.OnPostError.add(function(dialog, error) {
		ErrorDialog({
			// target: dialog.showToolbar ? dialog.toolbar.Element(): dialog.container,
			target: dialog.showToolbar ? dialog.toolbar.getItem("save").Element(): dialog.container,
			title: error.title,
			message: error.msg,
			snap: "bottom",
			inset: !dialog.showToolbar
		});
	});
	
	params.init(this);
	
	var self = this;
	if(this.dataset) {
		// self.mode = "edit";
		self.Events.OnInitData.trigger(self.dataset);
		self.dataset.Events.OnPost.add(function(dataset, postCallback) {	
			// console.log("here 4")
			self.GetData("update", function(params) {
				// params.mode = data.mode;
				// params.mode = "edit";
				params.mode = self.mode;
				params.data = dataset.stringifyRec(0);
			}, function(result) {
				var msg;
				if(result.status != 0) {
					msg = {};
					msg.title = "Update error";
					msg.message = result.message;
				} else {
					msg = "";
					// self.Events.OnPostSuccess2.trigger(result.update);
					self.Events.OnPostSuccess2.trigger(result);
				};
				
				// console.log("here 3")
				postCallback(msg, result.status);
			});
		})
	} else {
		// console.log(this)
		// this.GetData("edit", function(params) {
		this.GetData(self.mode, function(params) {
				// params.qry = self.dataParams.stringifyRec(0);
			},
			function(data) {
				// console.log(data)
				self.mode = data.mode;
				self.Events.OnInitData.trigger(self.dataset = new Dataset(data.edit, "Data"));
				self.Paint();
				self.AfterPaint();  
				if(self.dialog) {
					self.dialog.Painter.Reposition();
					self.dialog.SetEditor(self);
					// console.log(self.dialog)
					// self.dialog.OnEditorLoaded.trigger();
					// self.dialog.EditorLoaded();
					// self.container.trigger("loaded")
				};
				
				// console.log(self.dataset)
				self.dataset.Events.OnPost.add(function(dataset, postCallback) {	
					// 
					self.GetData("update", function(params) {
						params.mode = data.mode;
						params.data = dataset.stringifyRec(0);
					}, function(result) {
						var msg;
						if(result.status != 0) {
							msg = {};
							msg.title = "Update error";
							msg.message = result.message;
						} else {
							msg = "";
							// self.Events.OnPostSuccess2.trigger(result.update);
							self.Events.OnPostSuccess2.trigger(result);
						};

						// postCallback(msg, result.status);
					});
				})
				
			}
		);
		
		params.DelayPainting = true;
	};
	
};
	
// JFormEditor.prototype.Save = function() {
	
// };

JFormEditor.prototype.GetData = function(mode, init, callback) {	
	var params = {};
	if(this.postBackParams) {
		var p = this.postBackParams.split("&");
		$(p).each(function(i, s) {
			var p = s.split("=");
			params[p[0]] = p[1];
		});
	};
	
	if(init) init(params);
	
	var parts = this.postBack.split("/");
	// console.log(("{0}/get/{1}/{2}").format(parts[0], defaultValue(mode, "edit"), parts[1]));
	// console.log(mode)
	if(parts.length == 2)
		desktop.Ajax(this, ("/{0}/get/{1}/{2}").format(parts[0], defaultValue(mode, "edit"), parts[1]), params, callback)
	else
		desktop.Ajax(this, ("/get/{0}/{1}").format(defaultValue(mode, "edit"), this.postBack), params, callback);
	// desktop.Ajax(this, "/engine/get/edit/sys-users", params, callback);
};

JFormEditor.prototype.InitializeToolbar = function(toolbar) {
	var self = this;
	this.toolbar = toolbar;
	
	if(this.showRefresh) {
		toolbar.NewItem({
			id: "refresh",
			// icon: grid.options.toolbarSize == 16 ? "/engine/images/refresh.png": "/engine/images/refresh-24.png",
			icon: "refresh",
			iconColor: "#8DCF6E",
			hint: "Refresh",
			dataBind: this.dataset,
			dataEvent: function(dataset, button) {
				button.show(!dataset.editing);
			},
			click: function(item) {
				// grid.Refresh();
			}
		});
	};
	
	toolbar.NewItem({
		id: "save",
		icon: "db-save",
		iconColor: "#1CA8DD",
		hint: "Save",
		dataBind: this.dataset,
		dataEvent: function(dataset, button) {
			button.show(dataset.editing);
		},
		click: function(item) {
			self.Events.OnPost.trigger();
		}
	});
	
	toolbar.NewItem({
		id: "cancel",
		icon: "db-cancel",
		// iconColor: "firebrick",
		iconColor: "forestgreen",
		hint: "Cancel edit",
		dataBind: this.dataset,
		dataEvent: function(dataset, button) {
			button.show(dataset.editing);
		},
		click: function(item) {
			item.dataBind.cancel();
		}
	});
	
	if(desktop.mobile) {
		toolbar.NewItem({
			id: "close",
			icon: "back",
			iconColor: "firebrick",
			align: "right",
			click: function(item) {
				self.container.remove();
			}
		});
	};
	
	this.Events.OnInitToolbar.trigger(toolbar);
};

JFormEditor.prototype.InitializeEditor = function(editor) {
	this.Events.OnInitEditor.trigger(editor);
};

JFormEditor.prototype.AfterPaint = function() {
	JFormEditor.prototype.parent.prototype.AfterPaint.call(this); 
	// console.log(this.Painter.pageControl.tabs)
	if(this.Painter.pageControl.tabs.length === 1) {
		this.Painter.pageControl.showTabs(false);
	};
};
//**************************************************************************************************
// JFormEditPainter
//**************************************************************************************************
Class.Inherits(JFormEditPainter, JControlPainter);
function JFormEditPainter(Control) {
	JFormEditPainter.prototype.parent.call(this, Control);
	this.Control = Control;
};

JFormEditPainter.prototype.classID = "JFormEditPainter";
JFormEditPainter.prototype.type = "form-edit";

JFormEditPainter.prototype.InitializePageControl = function(pg) {
	var self = this;

	var editorInit = {
		PageControl: pg,
		NewGroupEdit: function(params, initEditor, dataset) {
			params.OnCreate = function(tab) {
				// tab.container
					// .css("box-sizing", "border-box")
					// .css("padding", self.Control.containerPadding);
				// var container = CreateElement("div", tab.container)
					// .attr("x-sec", "edit-container")
					// .css("overflow-y", "auto")
					// .css("padding", self.Control.containerPadding);
					
				// var subContainer = CreateElement("div", container)
					// .attr("x-sec", "edit-sub-container");
					
				// if(self.Control.fillContainer) 
					// subContainer.attr("x-fill", "1")
				
				// initEditor(editor, tab); // test
				// return; // testsddddddddddddddddddddddddddd
				
				tab.container.css("overflow-y", "auto");
				
				var editor = new JEditor({
					ID: "edit_" + tab.id,
					// Container: subContainer,
					Container: tab.container,
					Theme: self.Control.editorTheme,
					Css: "editor",
					LabelWidth: self.Control.labelWidth
				});	          
				
				var group = this;
				
				editor.Dataset = defaultValue(dataset, tab.pg.owner.dataset);
				editor.Dataset.Events.OnChanged.add(function(dataset, columnName) {
					group.OnDatasetChanged.trigger(columnName);
				});
				editor.Dataset.Events.OnCancel.add(function(dataset) {
					group.OnDatasetChanged.trigger();
				});
				
				this.OnDatasetChanged = new EventHandler(this);
				editor.group = this;
				editor.group.dataset = editor.Dataset;

				initEditor(editor, tab);
				
				editor.Paint();
				editor.AfterPaint();
				
				editor.list.each(function(i, item) {
					if(item.classID === "JEditCategory") {
						if(item.Params.Dataset)
							item.Params.Dataset.updateControls();
					};
				})
				
				if(!params.noFucus)
					editor.FocusFirstEditor();
			};
			
			pg.addTab(params);
		},
		NewContainer: function(params, initContainer) {
			params =  $.extend(params, {
				OnCreate: function(tab) {
					initContainer(tab.container);
				}
			})
			
			pg.addTab(params);
			/*
			return;
			
			pg.addTab({caption:caption,
				OnCreate: function(tab) {
					// var container = CreateElement("div", tab.content).attr("x-sec", "edit-container").css("padding", self.Control.containerPadding);
					// var subContainer = CreateElement("div", container).attr("x-sec", "edit-sub-container")
					// initContainer(subContainer, tab);
					initContainer(tab);
				}
			}); */
		},
		NewSubSelectionView: function(caption, height, selectionColumnName, initView) {
			pg.addTab({caption:caption, 
				OnCreate: function(tab) {
					tab.container.css("height", height);
					CreateElementEx("div", tab.container, function(container) {
						container.attr("x-sec", "edit-container")
							.css("overflow-y", "auto")
							.css("padding", self.Control.containerPadding);
							
						CreateElementEx("div", container, function(subContainer) {
							subContainer.attr("x-sec", "edit-sub-container");
								
							if(self.Control.fillContainer) 
								subContainer.attr("x-fill", "1")
								
							var params = {
								editor: self,
								container: subContainer,
								selectionColumn: self.Control.dataset.Columns.get(selectionColumnName)
							};
							
							initView(params);
								
						});
					});
					
					// var container = CreateElement("div", tab.container)
						// .attr("x-sec", "edit-container")
						// .css("overflow-y", "auto")
						// .css("padding", self.Control.containerPadding);
						
					// var subContainer = CreateElement("div", container)
						// .attr("x-sec", "edit-sub-container");
						
					// if(self.Control.fillContainer) 
						// subContainer.attr("x-fill", "1")
					
					// var params = {
						// editor: self,
						// container: subContainer,
						// selectionColumn: self.Control.dataset.Columns.get(selectionColumnName)
					// };
					
					// initView(params);
				}
			});
		}
	};
	
	this.Control.InitializeEditor(editorInit);
};

JFormEditPainter.prototype.InitializeToolbar = function(toolbar) {
	this.Control.InitializeToolbar(toolbar);
};

JFormEditPainter.prototype.Paint = function() {
	JFormEditPainter.prototype.parent.prototype.Paint.call(this); 
	var container = CreateElement("div", this.Control.container)
		.addClass("form-edit")
		.attr("x-sec", "main-container");
		
	if(this.Control.showToolbar) {
		var toolbarContainer = CreateElement("div", container)
			.attr("x-sec", "toolbar-container");

		var toolbar = new JToolbar({
				// id: "tb",
				// container: container,
				container: toolbarContainer,
				css: "toolbar",
				// theme: this.Control.options.toolbarTheme,
				theme: "svg",
				// buttonSize: this.Control.options.toolbarSize
				buttonSize: 24
		});
				
		this.InitializeToolbar(toolbar);
	};
	
	var subContainer = CreateElement("div", container)
		.attr("x-sec", "sub-container");
		
	// console.log(this.Control.pageControlOptions)
	this.pageControl = new jPageControl({
		owner: this.Control,
		paintParams: {
			// theme: "search",
			// theme: this.Control.pageControlTheme,
			theme: this.Control.pageControlOptions.theme,
			icon: {
				size: this.Control.pageControlOptions.iconSize,
				position: "left",
				name: "search",
				color: "dodgerblue"
			},
			// fullBorder: true,
			autoHeight: this.Control.autoHeight
		},
		// indent: 4,
		container: subContainer,
		init: function(pg) {
			pg.owner.Painter.InitializePageControl(pg);
		}
	});
		
	// this.pageControl = new JPageControl({
		// owner: this.Control,
		// container: subContainer,
		// Painter: {
			// autoHeight: false,
			// theme: this.Control.pageControlTheme
		// },
		// init: function(pg) {
			// pg.owner.Painter.InitializePageControl(pg);
		// }
	// });

	if(this.Control.showToolbar) {
		if(this.showRefresh) toolbar.SetVisible("refresh", !this.Control.dataset.editing);
		toolbar.SetVisible("cancel", this.Control.dataset.editing);
		toolbar.SetVisible("save", this.Control.dataset.editing);
	};
	
	this.SetContainer(container);
};
// *************************************************************************************************
// File name: dialogs.js
// Last modified on
// 04-MAR-2015
// *************************************************************************************************
//**************************************************************************************************
// JPopupDialog
//**************************************************************************************************
Class.Inherits(JPopupDialog, JControl);
function JPopupDialog(Params) {
    JPopupDialog.prototype.parent.call(this, Params);
};

JPopupDialog.prototype.classID = "JPopupDialog";

JPopupDialog.prototype.Initialize = function(Params) {
    JPopupDialog.prototype.parent.prototype.Initialize.call(this, Params);
    this.target = Params.Target;
    this.container = $("body");
    this.modal = Params.Modal;
	this.close_on_espace = defaultValue(Params.CloseOnEsc, true);
	this.onClose = Params.onClose;
	// console.log(Params)
};

JPopupDialog.prototype.DefaultPainter = function() {
    return new PopupBasePainter(this);
    // return new PopupBalloonPainter(this);
};

JPopupDialog.prototype.Hide = function() {
    this.Painter.Hide();
	// alerts("here", this.onClose)
	if(this.onClose) this.onClose(this);
};

// JPopupDialog.prototype.SetTitle = function(title) {
    // this.Painter.SetTitle(title);
// };

// JPopupDialog.prototype.Element = function() {
    // return this.Painter.Container;
// };

// JPopupDialog.prototype.RePosition = function() {
	// this.Painter.RePosition();
// };

//**************************************************************************************************
// JHint
//**************************************************************************************************
Class.Inherits(JHint, JPopupDialog); 
function JHint(Params) {
    JHint.prototype.parent.call(this, Params);
};

JHint.prototype.DefaultPainter = function() {
    return new PopupHintPainter(this);
    // return new PopupBalloonPainter(this);
};

//**************************************************************************************************
// JEditDialog
//**************************************************************************************************
/*
Class.Inherits(JEditDialog, JPopupDialog); 
function JEditDialog(Params) {
    JEditDialog.prototype.parent.call(this, Params);
};

JEditDialog.prototype.classID = "JEditDialog";

JEditDialog.prototype.DefaultPainter = function() {
    // return new EditDialogPainter(this);
    return new EditDialogPainter2(this);
};

JEditDialog.prototype.Initialize = function(Params) {
    JEditDialog.prototype.parent.prototype.Initialize.call(this, Params);
};

JEditDialog.prototype.AfterPaint = function() {
    JEditDialog.prototype.parent.prototype.AfterPaint.call(this);
	this.Painter.AfterPaint(); // It is important that the page control be create on AfterPaint event
	this.Painter.Reposition();
	
	// alerts(this.pg.TabCount());
	if(this.pg.TabCount() == 1) {
		this.pg.ShowTabs(false);
	};
};

JEditDialog.prototype.InitializePageControl = function(pg) {
	if(this.PaintParams.OnInitTabs) {
		pg.Events.OnInitTabs.add(this.PaintParams.OnInitTabs);
	};
};

JEditDialog.prototype.DataChanged = function(dataset) {
	this.Painter.DataChanged(this.dataset = dataset);
};

JEditDialog.prototype.Reset = function() {
	this.dataset.cancel();
	this.Painter.DataChanged(this.dataset);
};

JEditDialog.prototype.Save = function() {
	// var self = this;
	// this.grid.UpdateRecord(function() {
		// self.Hide();
	// });	
	var self = this;
	
	// alerts(this.dataset);
	this.dataset.post(function(data, msg, error) {
		if(error == 0) {
			self.Hide()
		else {
			var title = "Error";
			var msgTarget = self.Painter.editContainer;
			if(typeof msg == "string") {
				if(error == 1) {
					title = "Incomplete information";
					msgTarget = self.Painter.editContainer.find("td[cat-sec='gutter']");
				};
			} else {
				title = msg.title;
				msg = msg.message;
			}
			
			ErrorDialog({
				// target: self.toolbar.getItem("save").elementContainer,
				// target: self.Painter.editContainer,
				target: msgTarget,
				title: title,
				message: msg,
				snap: "top",
				// align: "left",
				inset: false
			});
		};		
	});
};

JEditDialog.prototype.ShowTabs = function(visible) {
	this.pg.ShowTabs(visible);
};
*/
//**************************************************************************************************
// JEditDialog2
//**************************************************************************************************
Class.Inherits(JEditDialog2, JPopupDialog); 
function JEditDialog2(Params) {
    JEditDialog2.prototype.parent.call(this, Params);
};

JEditDialog2.prototype.classID = "JEditDialog2";

JEditDialog2.prototype.DefaultPainter = function() {
    return new EditDialogPainter2(this);
};

JEditDialog2.prototype.Initialize = function(Params) {
    JEditDialog2.prototype.parent.prototype.Initialize.call(this, Params);
	this.OnInit = Params.OnInit;
	this.ActivatingTarget = Params.ActivatingTarget;

	this.OnEditorLoaded = new EventHandler(this;
	// console.log(this.ActivatingTarget)

	// this.Events = {};
	// this.Events.OnPostError = new EventHandler(this);
	// this.Events.OnPostSuccess = new EventHandler(this);
	
	// this.dataset = Params.Dataset;
	// alerts(this.dataset);
};

JEditDialog2.prototype.AfterPaint = function() {
    JEditDialog2.prototype.parent.prototype.AfterPaint.call(this);
	// this.Painter.AfterPaint(); // It is important that the page control be create on AfterPaint event
	// this.Painter.RePosition();
	// alerts("OK")
};

JEditDialog2.prototype.SetEditor = function(editor) {
	var self = this;
	this.editor = editor;
	this.dataset = this.editor.dataset;
	this.dataset.Events.OnEditState.add(function(dataset, editing) {
		self.Painter.btnSave.SetEnabled(editing);
		self.Painter.btnReset.SetEnabled(editing);
	};
	
	this.editor.Events.OnPostSuccess.add(function(editor) {
		self.Hide();
	});
	
	// this.editor.Events.OnPostError.add(function(dialog, error) {
		// alerts(error)
	// });
	
	// this.editor.Events.OnPostSuccess.add(function(dialog) {
		// self.Control.Refresh();
	// });
	
	this.OnInit(self);
};

JEditDialog2.prototype.Save = function() {
	// var self = this;
	this.editor.Events.OnPost.trigger();
	// this.dataset.post(function(dataset, msg, error) {
		// if(error) {
			// var title = "Error";
			// if(typeof msg == "string") {
				// if(error == 1)
					// title = "Incomplete information"
			// } else {
				// title = msg.title;
				// msg = msg.message;
			// };
			
			// self.editor.Events.OnPostError.trigger({title:title, msg:msg});
		// } else {
			// self.Hide();
			// self.editor.Events.OnPostSuccess.trigger();
		// };
	// });	
};

JEditDialog2.prototype.Reset = function() {
	this.dataset.cancel();
	// this.Painter.btnSave.attr("btn-state", "disabled");
	// this.Painter.btnSave.SetEnabled(true);
	// this.Painter.btnReset.SetEnabled(false);
	// alerts("Reset")
};

//**************************************************************************************************
// Misc Functions
//**************************************************************************************************
function ConfirmDialog(c) {
	return new JPopupDialog({
		Target: c.target,
		Modal: c.modal,
		Painter: {
			painterClass: PopupBalloonPainter,
			color: "firebrick",
			// snap: "left",
			// snap: "right",
			// snap: "top",
			snap: "bottom",
			align: "",
			inset: false,
			OnRenderHeader: function(dialog, container) {
				container.html(c.title);
			},
			OnRenderContent: function(dialog, container) {
				container.html(c.message)
				// container.css("height", 100)
				// container.css("width", 600)
			},
			OnRenderFooter: function(dialog, container) {
				CreateButton({
					container: container,
					caption: "Yes",
					enabled: true,
					style: "green",
					click: function(button) {
						c.callback(dialog);
						dialog.Hide();
					}
				});
				CreateButton({
					container: container,
					caption: "Close",
					enabled: true,
					style: "text",
					click: function(button) {
						dialog.Hide();
					}
				});
			}
		}
	});
};

function ErrorDialog(c) {
	return new JPopupDialog({
		Target: c.target,
		Modal: c.modal,
		Painter: {
			painterClass: PopupBalloonPainter,
			color: "firebrick",
			snap: defaultValue(c.snap, "bottom"),,
			align: defaultValue(c.align, ""),
			// align: "",
			inset: defaultValue(c.inset, false),
			OnRenderHeader: function(dialog, container) {
				container.html(c.title);
			},
			OnRenderContent: function(dialog, container) {
				container.html(c.message)
			},
			OnRenderFooter: function(dialog, container) {
				CreateButton({
					container: container,
					caption: "OK",
					enabled: true,
					style: "green",
					click: function(button) {
						// c.callback(dialog);
						dialog.Hide();
					}
				});
			}
		}
	});
};

function InfoDialog(c) {
	return new JPopupDialog({
		Target: c.target,
		Modal: c.modal,
		Painter: {
			painterClass: PopupBalloonPainter,
			color: "#2C5E93",
			snap: defaultValue(c.snap, "bottom"),,
			align: defaultValue(c.align, ""),
			inset: defaultValue(c.inset, false),
			OnRenderHeader: function(dialog, container) {
				container.html(c.title);
			},
			OnRenderContent: function(dialog, container) {
				container.html(c.message)
			},
			OnRenderFooter: function(dialog, container) {
				CreateButton({
					container: container,
					caption: "OK",
					enabled: true,
					style: "green",
					click: function(button) {
						dialog.Hide();
					}
				});
			}
		}
	});
};

function Hint(item, show) {
	if(defaultValue(show, true)) {
		item.data("activated", true);
		
		setTimeout(function() {
			if(item.data("activated") {
				var lastHint = $(document).data("hint");
				if(lastHint) {
					lastHint.removeData("activated");
					if(lastHint.data("visible")) {
						lastHint.removeData("visible");
						lastHint.data("hint-dlg").Hide();
						lastHint.removeData("hint-dlg");
						$(document).removeData("hint");
					};
				};
				
				$(document).data("hint", item);
				
				var hint = item.data("hintData");
				var snap = item.data("hintSnap");
				
				item.data("visible", true);
				self.hint = new JHint({
					Target: item,
					Modal: false,
					Painter: {
						snap: defaultValue(snap, "bottom"),
						align: "",
						inset: false,
						OnRenderContent: function(dialog, container) {
							container.parent().parent().addClass("hint");
							if(typeof hint == "string")
								container.html(hint)
							else if(hint !== undefined)
								hint(dialog, container)
						}
					}
				});
				
				item.data("hint-dlg", self.hint);
			};
		}, 200);
	} else {
		item.removeData("activated");
		if(item.data("visible")) {
			item.removeData("visible");
			item.data("hint-dlg").Hide();
			item.removeData("hint-dlg");
		};
	}
};
// *************************************************************************************************
// File name: dialogs-painters.js
// Last modified on
// 04-MAR-2015
// *************************************************************************************************
Class.Inherits(PopupBasePainter, JControlPainter);
function PopupBasePainter(Control) {
    PopupBasePainter.prototype.parent.call(this, Control);
};

PopupBasePainter.prototype.type = "dlg";
PopupBasePainter.prototype.classID = "PopupBasePainter";
PopupBasePainter.prototype.canCustomizeHeader = true;

PopupBasePainter.prototype.Paint = function() {
    PopupBasePainter.prototype.parent.prototype.Paint.call(this);

	this.snap = this.GetParam("snap", "bottom");
	this.align = this.GetParam("align", "left");
	this.inset = this.GetParam("inset", false);
	this.showHeader = this.GetParam("showHeader", true);
	this.showFooter = this.GetParam("showFooter", true);
	
	this.Events = {};
	this.Events.OnRenderContainer = new EventHandler(this.Control);
	this.Events.OnRenderContainer.add(function(dialog, container) {
		dialog.Painter.OnRenderContainer(container);
		if(dialog.PaintParams.OnRenderContainer) {
			dialog.PaintParams.OnRenderContainer(dialog, container);
		};
	})
	
	if(this.showHeader) {
		this.Events.OnRenderHeader = new EventHandler(this.Control);
		this.Events.OnRenderHeader.add(function(dialog, container) {
			dialog.Painter.OnRenderHeader(container);
			if(dialog.PaintParams.OnRenderHeader && dialog.Painter.canCustomizeHeader) {
				dialog.PaintParams.OnRenderHeader(dialog, container);
			};
		})
	};
	
	this.Events.OnRenderContent = new EventHandler(this.Control);
	this.Events.OnRenderContent.add(function(dialog, container) {
		dialog.Painter.OnRenderContent(container);
		if(dialog.PaintParams.OnRenderContent) {
			dialog.PaintParams.OnRenderContent(dialog, container);
		};
	})
	
	if(this.showFooter) {
		this.Events.OnRenderFooter = new EventHandler(this.Control);
		this.Events.OnRenderFooter.add(function(dialog, container) {
			dialog.Painter.OnRenderFooter(container);
			if(dialog.PaintParams.OnRenderFooter) {
				dialog.PaintParams.OnRenderFooter(dialog, container);
			};
		})
	};
	
	this.GetTargetDimension();
	
	this.container = CreateElement("div", this.Control.container, "", "dialog")
		.attr("dlg-snap", this.snap)
		.attr("dlg-align", this.align)
		// .css("opacity", 0) // we will transition this to 1 in Show() 
		.css("z-index", ++desktop.zIndex)
		.css("width", this.GetParam("width", ""))
		.css("height", this.GetParam("height", ""))
	    .on("dlgclose", function() {
			var dialog = $(this).data("object");
			if(dialog.close_on_espace) {
				dialog.Hide();
			};
	    })
		
	this.InitializeDialog();	
	this.AfterInitializeDialog();	
	this.SetContainer(this.container);
	
	this.Show();
	
	var self = this;
    $("body").on("mousedown", function(e) {	
		var dialog = $(e.target).closest("div[control-type='dlg']");
		var targetIndex = defaultValue(dialog.css("z-index"), 0);
		if(targetIndex != desktop.GetTopMostDialogIndex()) // BUT! if there is a dialog box on top of this then do not hide
			if(!self.Control.modal && $(e.target).closest(self.container).index() < 0) {
				self.Control.Hide();
			}
    });
	
	$(window).resize(function() {
		self.Reposition();
	});
	
};

PopupBasePainter.prototype.OnRenderContainer = function(container) {
};

PopupBasePainter.prototype.OnRenderHeader = function(container) {
};

PopupBasePainter.prototype.OnRenderContent = function(container) {
};

PopupBasePainter.prototype.OnRenderFooter = function(container) {
};

PopupBasePainter.prototype.RenderSection = function(section, container) {
	if(section == "container")
		this.Events.OnRenderContainer.trigger(container)
	else if(section == "header")
		this.Events.OnRenderHeader.trigger(container)
	else if(section == "content")
		this.Events.OnRenderContent.trigger(container)
	else if(section == "footer")
		this.Events.OnRenderFooter.trigger(container);
};

PopupBasePainter.prototype.AdjustX = function(x0, x1) {
};

PopupBasePainter.prototype.SnapAdjusted = function(oldSnap) {
};

PopupBasePainter.prototype.CalculatePosition = function() {
	var x = this.left, y = this.top;
	var w = this.container.outerWidth();
	
	if(this.snap == "bottom") {
		if(this.inset)
			y = this.targetY
		else
			y = this.targetY + this.targetH;		
		
		if(y + this.container.outerHeight() > $("body").outerHeight()) {
			this.container.attr("dlg-snap", this.snap = "top");
			var p = this.CalculatePosition();
			x = p.left; y = p.top;
			this.SnapAdjusted("bottom");
		};
		
	} else if(this.snap == "top") {
		if(this.inset)
			y = this.targetY + this.targetH - this.container.outerHeight()
		else
			y = this.targetY - this.container.outerHeight();	
		
	} else if(this.snap == "right") {
		if(this.inset)
			x = this.targetX
		else
			x = this.targetX + this.targetW;
	} else if(this.snap == "left") {
		if(this.inset)
			x = this.targetX + this.targetW - this.container.outerWidth()
		else
			x = this.targetX - this.container.outerWidth();
	}
	
	if(this.snap == "bottom" || this.snap == "top") {
		if(this.align == "left")
			x = this.targetX
		else if(this.align == "right")
			x = this.targetX + this.targetW - this.container.outerWidth()
		else 
			x = this.targetX + (this.targetW - this.container.outerWidth()) / 2;
		
	
		if(x < 0) this.AdjustX(x, x=1);
		if(x + w > $("body").outerWidth()) this.AdjustX(x, x=$("body").outerWidth()-w-1);
		
	} else if(this.snap == "right" || this.snap == "left") {
		if(this.align == "top")
			y = this.targetY
		else if(this.align == "bottom")
			y = this.targetY + this.targetH- this.container.outerHeight()
		else 
			y = this.targetY + (this.targetH - this.container.outerHeight()) / 2;
	};
	
	return {top:y, left:x};
};

PopupBasePainter.prototype.GetTargetDimension = function() {
	// jQuery offset() not working in IE11
	// var p = this.Control.target.offset(); 
	// this.targetY = p.top;
	// this.targetX = p.left;
	// this.targetY = this.Control.target[0].offsetTop;
	// this.targetX = this.Control.target[0].offsetLeft;
	
	// If you want coords relative to the document use element.getBoundingClientRect().top. 
	// Add window.pageYOffset if you want to take the document scrolling into account.
	// Subtract element.clientTop if you don't consider the element border as the part of the element
	// console.log(this.Control.target.length)
	this.targetY = this.Control.target[0].getBoundingClientRect().top;
	this.targetX = this.Control.target[0].getBoundingClientRect().left;
	this.targetW = this.Control.target.outerWidth();	
	this.targetH = this.Control.target.outerHeight();
	
	this.top = this.targetY+this.targetH;
	this.left = this.targetX;
};

PopupBasePainter.prototype.Reposition = function() {
	this.GetTargetDimension();
	var pos = this.CalculatePosition();
	this.container
		.css("top", pos.top)
		.css("left", pos.left)
		// .css("opacity", 1)
		.removeClass("hide-dialog")
		.addClass("animate-dialog");
		
	// alerts("1")
}

PopupBasePainter.prototype.PreShow = function() {
};

PopupBasePainter.prototype.Show = function() {
	var pos = this.CalculatePosition();
	var e = this.container
		.css("display", "block")
		// .css("visibility", "visible")
		.css("top", pos.top)
		.css("left", pos.left)
		.removeClass("hide-dialog")
		.addClass("animate-dialog");
		// .css("transition", "opacity 0.5s ease-in")
		// .css("opacity", 1)
	
	// e.css("display", "block");
	
	// var p = this.container.offset();

	// if(this.snap == "bottom") {
		// if(p.top + this.container.outerHeight() > $("body").outerHeight()) {
			// var snap = "top";
			// this.snap = snap;
			// this.container.attr("dlg-snap", snap);
			// this.PositionAdjusted();
			// this.Reposition();
		// };
	// };	
	
	// if(this.snap == "top" || this.snap == "bottom") {
		// if(p.left + this.container.outerWidth() > $("body").outerWidth()) {
	// };
};

PopupBasePainter.prototype.Hide = function() {
	this.container.remove();
};

PopupBasePainter.prototype.InitializeDialog = function() {		
	this.RenderSection("container", this.container);
		
	var container = CreateElement("div", this.container)
		.attr("dlg-sec", "container")	
		
	if(this.showHeader) {
		var header = CreateElement("div", container)
			.attr("dlg-sec", "header")		
			
		this.RenderSection("header", header);
	};
	
	var content = CreateElement("div", container)
		.attr("dlg-sec", "content")
		
	this.RenderSection("content", content);
		
	if(this.showFooter) {
		// var footer = CreateElement("div", container)
		var footer = CreateElement("div", content)
			.attr("dlg-sec", "footer")
			
		this.RenderSection("footer", footer);
	};
};

PopupBasePainter.prototype.AfterInitializeDialog = function() {		
};

//**************************************************************************************************
// SimpleDialogPainter
//**************************************************************************************************
Class.Inherits(SimpleDialogPainter, PopupBasePainter);
function SimpleDialogPainter(Control) {
    SimpleDialogPainter.prototype.parent.call(this, Control);
};

SimpleDialogPainter.prototype.classID = "SimpleDialogPainter";

SimpleDialogPainter.prototype.OnRenderHeader = function(container) {
	SimpleDialogPainter.prototype.parent.prototype.OnRenderHeader.call(this, container);
	container.parent().css("border-color", this.GetParam("color", ""))
	container.css("background", this.GetParam("color", ""))
};

SimpleDialogPainter.prototype.AfterInitializeDialog = function() {		
	SimpleDialogPainter.prototype.parent.prototype.AfterInitializeDialog.call(this);
	
	this.container.attr("dlg-type", "simple")
};

//**************************************************************************************************
// BasePopupBalloonPainter
//**************************************************************************************************
Class.Inherits(BasePopupBalloonPainter, PopupBasePainter);
function BasePopupBalloonPainter(Control) {
    BasePopupBalloonPainter.prototype.parent.call(this, Control);
};

BasePopupBalloonPainter.prototype.OnRenderContainer = function(container) {
	BasePopupBalloonPainter.prototype.parent.prototype.OnRenderContainer.call(this, container);
	
	this.arrowContainer = CreateElement("div", container).attr("dlg-sec", "arrow-container")
	var innerContainer = CreateElement("div", this.arrowContainer).attr("dlg-sec", "arrow")
	this.arrow = CreateElement("div", innerContainer).attr("dlg-sec", "shape")				
					.css("border-"+this.snap+"-color", this.GetParam("color", ""))
};

BasePopupBalloonPainter.prototype.AfterInitializeDialog = function() {		
	BasePopupBalloonPainter.prototype.parent.prototype.AfterInitializeDialog.call(this);
	
	this.container.attr("dlg-type", "balloon")

	if(this.snap == "top") {
		this.arrowContainer.appendTo(this.container);
	};
		
	if(this.snap == "right") {
		// this.arrowContainer.prependTo(this.container);
		var margin = 0;
		if(this.align == "")
			margin = (this.container.outerHeight() - 20)/2+1
		else if(this.align == "bottom") 
			margin = (this.container.outerHeight() - 20)
		
		this.arrowContainer.css("margin-top", margin);
	};
		
	if(this.snap == "left") {
		var margin = 0;
		if(this.align == "")
			margin = (this.container.outerHeight() - 20)/2+1
		else if(this.align == "bottom") 
			margin = (this.container.outerHeight() - 20)
		
		this.arrowContainer.css("margin-top", margin);
		this.arrowContainer.appendTo(this.container);
	};
};

BasePopupBalloonPainter.prototype.SnapAdjusted = function(oldSnap) {
	BasePopupBalloonPainter.prototype.parent.prototype.SnapAdjusted.call(oldSnap);
	
	this.arrow.css("border-"+this.snap+"-color", this.GetParam("color", ""));
	if(oldSnap == "bottom" && this.snap == "top") {
		this.arrowContainer.appendTo(this.container);
	};
};

BasePopupBalloonPainter.prototype.AdjustX = function(x0, x1) {
	BasePopupBalloonPainter.prototype.parent.prototype.AdjustX.call(x0, x1);

	var dim = {
		x: this.arrow[0].getBoundingClientRect().left,
		y: this.arrow[0].getBoundingClientRect().top,
		w: this.arrow.outerWidth(),
		h: this.arrow.outerHeight()
	};
			
	this.arrow.css("margin", "initial");
	this.arrow.css("position", "relative");
	this.arrow.css("left", (this.container.outerWidth() - dim.w) / 2 + x0;
};

//**************************************************************************************************
// PopupBalloonPainter
//**************************************************************************************************
Class.Inherits(PopupBalloonPainter, BasePopupBalloonPainter);
function PopupBalloonPainter(Control) {
    PopupBalloonPainter.prototype.parent.call(this, Control);
};

PopupBalloonPainter.prototype.classID = "PopupBalloonPainter";

PopupBalloonPainter.prototype.OnRenderHeader = function(container) {
	PopupBalloonPainter.prototype.parent.prototype.OnRenderHeader.call(this, container);
	container.parent().css("border-color", this.GetParam("color", ""))
	container.css("background", this.GetParam("color", ""))
};

//**************************************************************************************************
// PopupHintPainter
//**************************************************************************************************
Class.Inherits(PopupHintPainter, BasePopupBalloonPainter);
function PopupHintPainter(Control) {
    PopupHintPainter.prototype.parent.call(this, Control);
	
};

PopupHintPainter.prototype.classID = "PopupHintPainter";

PopupHintPainter.prototype.Paint = function() {
	this.Control.PaintParams.showHeader = false;
	this.Control.PaintParams.showFooter = false;
    PopupHintPainter.prototype.parent.prototype.Paint.call(this);
};

PopupHintPainter.prototype.OnRenderContent = function(container) {
	PopupHintPainter.prototype.parent.prototype.OnRenderContent.call(this, container);
	container.parent().css("border-color", this.GetParam("color", ""))
	// container.parent().css("border-width", "0")
	// container.parent().css("border-color", "none")
	container.css("background", this.GetParam("color", ""))
};

PopupHintPainter.prototype.AfterInitializeDialog = function() {		
	PopupHintPainter.prototype.parent.prototype.AfterInitializeDialog.call(this);
	this.container.attr("hint", "1")
}	

//**************************************************************************************************
// PopupOverlayPainter
//**************************************************************************************************
Class.Inherits(PopupOverlayPainter, PopupBasePainter);
function PopupOverlayPainter(Control) {
    PopupOverlayPainter.prototype.parent.call(this, Control);
};

PopupOverlayPainter.prototype.classID = "PopupOverlayPainter";
PopupOverlayPainter.prototype.canCustomizeHeader = false;

PopupOverlayPainter.prototype.Paint = function() {
	this.Control.PaintParams.inset = true;
	// this.Control.PaintParams.showHeader = false;
	// this.Control.PaintParams.showFooter = false;
	// this.canCustomizeHeader = false;
    PopupOverlayPainter.prototype.parent.prototype.Paint.call(this);
};

PopupOverlayPainter.prototype.OnRenderContainer = function(container) {
	PopupOverlayPainter.prototype.parent.prototype.OnRenderContainer.call(this, container);

	this.colorColor = this.GetParam("color", "");
	if(this.Control.target && this.Control.target.data("object")) {
		this.btn = this.Control.target.data("object");
		// this.colorColor = this.btn.iconColor;
	};	
	
	// container.css("background", this.GetParam("color", ""))
	// this.arrowContainer = CreateElement("div", container).attr("dlg-sec", "arrow-container")
	// var innerContainer = CreateElement("div", this.arrowContainer).attr("dlg-sec", "arrow")
	// var arrow = CreateElement("div", innerContainer).attr("dlg-sec", "shape")		
		
	// arrow.css("border-"+this.snap+"-color", this.GetParam("color", ""))
};

PopupOverlayPainter.prototype.OnRenderContent = function(container) {
	PopupOverlayPainter.prototype.parent.prototype.OnRenderContent.call(this, container);
	
	// container.css("border-color", this.GetParam("color", ""));
	container
		.css("border-color", this.colorColor)
		.css("border-width", 2)
	// if(this.showFooter) {
		// container.css("border-bottom-style", "none");
	// };
	// this.arrowContainer = CreateElement("div", container).attr("dlg-sec", "arrow-container")
	// var innerContainer = CreateElement("div", this.arrowContainer).attr("dlg-sec", "arrow")
	// var arrow = CreateElement("div", innerContainer).attr("dlg-sec", "shape")		
		
	// arrow.css("border-"+this.snap+"-color", this.GetParam("color", ""))
};

PopupOverlayPainter.prototype.OnRenderHeader = function(container) {
	PopupOverlayPainter.prototype.parent.prototype.OnRenderHeader.call(this, container);
	
	// var color = this.GetParam("color", "");
	// var btn, icon;
	// if(this.Control.target && this.Control.target.data("object") && this.Control.target.data("object").icon) {
	// if(this.btn && this.btn.icon) {
		// btn = this.Control.target.data("object");
		// color = btn.iconColor;
	// };
	
	container
		// .css("border-color", this.GetParam("color", ""))
		.css("border-width", 2)
		.css("border-color", this.colorColor)
		.css("height", this.targetH+1)
		
	this.tabContainer = CreateElement("div", container)
		.attr("dlg-sec", "tab-container")
		.attr("dlg-sec", "tab-container")
		// .css("border-color", this.GetParam("color", ""))
		.css("border-color", this.colorColor)
		.css("width", this.targetW)
		
	if(this.btn && this.btn.icon) {
		// var btn = this.Control.target.data("object");
		// var icon = this.btn.icon;
		
		if(this.btn.icon.indexOf(".png") > -1)
			CreateElement("img", this.tabContainer)
				.attr("src", this.btn.icon)
		else {
			this.tabContainer.css("background", this.colorColor);
			var svg = $(this.btn.Painter.container.find("svg"));
			// console.log({w:svg.outerWidth(), h:svg.outerHeight()});
			// desktop.GetSvg(this.tabContainer, this.btn.icon, 28, {noTopMargin:true})
			desktop.GetSvg(this.tabContainer, this.btn.icon, svg.outerWidth(), {noTopMargin:true})
				.css("fill", "white")
		};
			
		if(this.Control.target.data("object").dropdown && !this.Control.PaintParams.noIndicator) {
			var d = CreateElement("div", this.tabContainer, "", "")		
				.attr("dlg-sec", "dropdown")
				
			// console.log(this.Control.PaintParams)
			
			desktop.GetSvg(d, "tree-collapse", 16, {noTopMargin:true})
			// desktop.GetSvg(d, "tree-expand", 16, {noTopMargin:true})
				.css("fill", "white")
		};
	};
};

PopupOverlayPainter.prototype.OnRenderFooter = function(container) {
	PopupOverlayPainter.prototype.parent.prototype.OnRenderFooter.call(this, container);
	container.css("border-color", this.GetParam("color", ""))
}

PopupOverlayPainter.prototype.AfterInitializeDialog = function() {		
	PopupOverlayPainter.prototype.parent.prototype.AfterInitializeDialog.call(this);
	
	this.container.attr("dlg-type", "overlay")

	if(this.snap == "bottom") {
		// if(this.align == "left")
	};
	// if(this.snap == "top") {
		// this.arrowContainer.appendTo(this.container);
	// };
		
	// if(this.snap == "right") {
		// var margin = 0;
		// if(this.align == "")
			// margin = (this.container.outerHeight() - 20)/2+1
		// else if(this.align == "bottom") 
			// margin = (this.container.outerHeight() - 20)
		
		// this.arrowContainer.css("margin-top", margin);
	// };
		
	// if(this.snap == "left") {
		// var margin = 0;
		// if(this.align == "")
			// margin = (this.container.outerHeight() - 20)/2+1
		// else if(this.align == "bottom") 
			// margin = (this.container.outerHeight() - 20)
		
		// this.arrowContainer.css("margin-top", margin);
		// this.arrowContainer.appendTo(this.container);
	// };
};

//**************************************************************************************************
// EditDialogPainter
//**************************************************************************************************
/*
Class.Inherits(EditDialogPainter, PopupBasePainter);
function EditDialogPainter(Control) {
    EditDialogPainter.prototype.parent.call(this, Control);
};

EditDialogPainter.prototype.CalculatePosition = function() {
	// display dialog box in the center of the target container
	return {
		top: this.targetY + (this.targetH - this.container.outerHeight()) / 2 + 1, 
		left: this.targetX + (this.targetW - this.container.outerWidth()) / 2 + 1
	};
};

EditDialogPainter.prototype.OnRenderContent = function(container) {
	EditDialogPainter.prototype.parent.prototype.OnRenderContent.call(this, container);	
	this.editContainer = CreateElement("div", container).attr("dlg-sec", "edit-container");
	if(this.GetParam("autoHeight", false)) {
		this.editContainer.css("height", "auto");
	};
};

EditDialogPainter.prototype.AfterPaint = function() {
	var dialog = this.Control;
	dialog.pg = new JPageControl({
		owner: dialog,
		container: this.editContainer,
		Painter: {
			// indent: 0,
			// spacing: 1,
			// margin: 4,
			// gutter: 20,
			autoHeight: this.GetParam("autoHeight", false),
			theme: "table"
		},
		init: function(pg) {
			pg.dialog = dialog;
			pg.Events.OnInitPageControl.add(function(pg) {
				pg.dialog.InitializePageControl(pg);
			});
		}
	});
};

EditDialogPainter.prototype.OnRenderFooter = function(container) {
};

EditDialogPainter.prototype.OnRenderFooter = function(container) {
	EditDialogPainter.prototype.parent.prototype.OnRenderFooter.call(this, container);
	
	var self = this;
	
	this.btnSave = CreateButton({
		container: container,
		caption: "Save",
		enabled: false,
		style: "green",
		click: function(button) {
			if(button.enabled)
				self.Control.Save();
			// self.Control.Hide();
		}
	});
	
	this.btnReset = CreateButton({
		container: container,
		caption: "Reset",
		enabled: false,
		style: "green",
		click: function(button) {
			if(button.enabled)
				self.Control.Reset();
			// self.Control.dateEdit.cancel();
		}
	});
	
	CreateButton({
		container: container,
		caption: "Close",
		enabled: true,
		style: "text",
		click: function(button) {
			self.Control.Hide();
		}
	});
};

EditDialogPainter.prototype.DataChanged = function(dataset) {
	this.btnSave.SetEnabled(dataset.editing);
	this.btnReset.SetEnabled(dataset.editing);
	// this.btnSave.SetEnabled(true);
};

EditDialogPainter.prototype.AfterInitializeDialog = function() {		
	EditDialogPainter.prototype.parent.prototype.AfterInitializeDialog.call(this);
	this.container.attr("dlg-type", "edit")
};
*/
//**************************************************************************************************
// EditDialogPainter2
//**************************************************************************************************
Class.Inherits(EditDialogPainter2, PopupBasePainter);
function EditDialogPainter2(Control) {
    EditDialogPainter2.prototype.parent.call(this, Control);
};

EditDialogPainter2.prototype.CalculatePosition = function() {
	// console.log(this)
	// console.log(this.Control.ActivatingTarget)
	// console.log(this.Control.ActivatingTarget.outerHeight())
	// console.log(this.Control.ActivatingTarget)
	// display dialog box in the center of the target container
	return {
		top: this.targetY + (this.targetH - this.container.outerHeight()) / 2 + 1, 
		left: this.targetX + (this.targetW - this.container.outerWidth()) / 2 + 1
	};
	
	var target = this.Control.ActivatingTarget;
	var p = target[0].getBoundingClientRect();
	return {
		// top: this.targetY + (this.targetH - this.container.outerHeight()) / 2 + 1, 
		top: p.top + target.outerHeight(), 
		// left: this.targetX + (this.targetW - this.container.outerWidth()) / 2 + 1
		// left: this.targetX+1
		left: p.left + target.outerWidth()
	};
};

EditDialogPainter2.prototype.OnRenderContent = function(container) {
	EditDialogPainter2.prototype.parent.prototype.OnRenderContent.call(this, container);	
	this.editContainer = CreateElement("div", container).attr("dlg-sec", "edit-container");
	if(this.GetParam("autoHeight", false)) {
		this.editContainer.css("height", "auto");
	};
};

EditDialogPainter2.prototype.AfterPaint = function() {
	var dialog = this.Control;
	// alerts("here")
};

// EditDialogPainter2.prototype.OnRenderFooter = function(container) {
// };

EditDialogPainter2.prototype.OnRenderFooter = function(container) {
	EditDialogPainter2.prototype.parent.prototype.OnRenderFooter.call(this, container);
	
	var self = this;
	this.btnSave = CreateButton({
		container: container,
		caption: "Save",
		enabled: false,
		style: "green",
		click: function(button) {
			if(button.enabled)
				self.Control.Save();
		}
	});
	
	this.btnReset = CreateButton({
		container: container,
		caption: "Reset",
		enabled: false,
		style: "green",
		click: function(button) {
			if(button.enabled)
				self.Control.Reset();
		}
	});
	
	CreateButton({
		container: container,
		caption: "Close",
		enabled: true,
		style: "text",
		click: function(button) {
			self.Control.Hide();
		}
	});
};

EditDialogPainter2.prototype.DataChanged = function(dataset) {
	// this.btnSave.SetEnabled(dataset.editing);
	// this.btnReset.SetEnabled(dataset.editing);
};

EditDialogPainter2.prototype.AfterInitializeDialog = function() {		
	EditDialogPainter2.prototype.parent.prototype.AfterInitializeDialog.call(this);
	this.container.attr("dlg-type", "edit");
	// this.container.css("opacity", "0");
	this.container.addClass("hide-dialog");
};
// ****************************************************************************************************
// Last modified on
// 04-JUL-2017
// ****************************************************************************************************
// ****************************************************************************************************
// JSplitter
// ****************************************************************************************************
Class.Inherits(JSplitter, JControl);

function JSplitter(Params) {
    JSplitter.prototype.parent.call(this, Params);
};

JSplitter.prototype.classID = "JSplitter";

JSplitter.prototype.Initialize = function(Params) {
    JSplitter.prototype.parent.prototype.Initialize.call(this, Params);

	this.Events = {};
	this.Events.OnPaintTarget = new EventHandler(this);
	this.Events.OnPaintTarget2 = new EventHandler(this);
	
	this.onresize = Params.onresize
	
	if(Params.init) Params.init(this);
};

JSplitter.prototype.AfterPaint = function() {
    JSplitter.prototype.parent.prototype.AfterPaint.call(this);	
	this.Events.OnPaintTarget.trigger(this.Painter.target);
	this.Events.OnPaintTarget2.trigger(this.Painter.target2);
};

JSplitter.prototype.DefaultPainter = function() {
    return new JSplitterPainter(this);
};
// ****************************************************************************************************
// Last modified on
// 06-JUL-2017
// ****************************************************************************************************
//**************************************************************************************************
// JSplitterPainter
// The default painter used by JDatePicker
//**************************************************************************************************
Class.Inherits(JSplitterPainter, JBasePainter);
function JSplitterPainter(Control) {
    JSplitterPainter.prototype.parent.call(this, Control);
};

JSplitterPainter.prototype.classID = "JSplitterPainter";

JSplitterPainter.prototype.Paint = function() {
    JSplitterPainter.prototype.parent.prototype.Paint.call(this);
	
	// console.log(this.Control.Params)
	if(this.Control.Params.container) {
		this.container = CreateElement("div", this.Control.Params.container)
			.attr("splitter-mode", "dynamic")
		
		this.target = CreateElement("div", this.container)
			.css("width", this.Control.Params.targetSize)
			
		this.splitter = CreateElement("div", this.container)
			// .css("width", "6px")
			// .css("min-width", "6px")
		
		this.target2 = CreateElement("div", this.container)
			.attr("splitter-sec", "target2")
			.css("width", "auto")
			
	} else {
		this.container = this.Control.Params.target.parent();
		this.target = this.Control.Params.target;
		this.splitter = this.Control.Params.splitter;
	};
	
	this.container.attr("control-type", "splitter");
	this.container.addClass("splitter");
	
	this.target.attr("splitter-sec", "target");
	this.splitter.attr("splitter-sec", "sizer");
	
	if(this.Control.Params.noBorder) 
		this.splitter.css("border", "0");
	
	var self = this;
	new JDrag(this.splitter, this.target, {
		Moving: true,
		Sizing: false,
		SizeOffset: 1,
		AllowDrag: function(s) {
			return true;
		},
		AllowSize: function(s) {
			return false;
		},
		InitDrag: function(s, ready) {
			// console.log("InitDrag");
			// if(ready) {
				// op = container.parent().parent().offset();
			// }
		},
		Dragging: function(s, x, y, w, h) {
			var w = s.Target.OffsetW + x;
			
			if(self.Control.Params.usePercent) {
				var ww = self.container.width();
				w = ("{0}%").format(w / ww * 100);
				// console.log({w: w, ww: ww});
			};
			
			self.target.css("width", w);
			self.target.css("min-width", w);
			
			if(self.Control.onresize)
				self.Control.onresize()
			// console.log({s:s, x:x, y:y})
			// container.parent().parent()
				// .css("top", op.top+y)
				// .css("left", op.left+x)
		},
		DragEnd: function(s) {
			// self.DisableFrame(false);
		}
	});
	
};
// ****************************************************************************************************
// Last modified on
// 26-NOV-2014 ihms.0.0.1.6
// ****************************************************************************************************
//**************************************************************************************************
// File name: dbpager.js
// used in card-view-v2.js
//**************************************************************************************************
// function BasePager(options) {
	// this.dataset = options.dataset;
	// this.container = options.container;
	// this.css = defaultValue(options.css, "pager");
// };

//**************************************************************************************************
// BasePager
//**************************************************************************************************
Class.Inherits(BasePager, JControl);
function BasePager(Params) {
	BasePager.prototype.parent.call(this, Params);
};

BasePager.prototype.classID = "BasePager";

BasePager.prototype.DefaultPainter = function() {
	// return new BasePagerPainter(this);
	return new FlatPagerPainter(this);
}

BasePager.prototype.Initialize = function(Params) {
	BasePager.prototype.parent.prototype.Initialize.call(this, Params);
	this.grid = Params.grid;
	this.dataset = Params.dataset;
	this.rowsPerPage = defaultValue(Params.rowsPerPage, [25,50,75,100]);
	this.container = Params.container;
	this.css = defaultValue(Params.css, "pager");
};

BasePager.prototype.GotoPage = function(page) {
	// this.dataset.set("page", page);
	// this.RefreshData();
	this.dataset.Methods.call("gotoPage", page);	
}

BasePager.prototype.CurrentPage = function() {
	return this.dataset.get("page")
}

BasePager.prototype.RefreshData = function() {
	this.dataset.Methods.call("query");
}

BasePager.prototype.GetPageArray = function(pageNo, pageCount) {
	var pages = [];
	var nextPage;
	
	pages.push(1);
	pages.push(2);
	pages.push(3);
	
	if(pageNo > 5 && pageCount > 10) {
		if(pageCount - pageNo < 5) {
			nextPage = pageCount - 5;		
		} else {
			nextPage = pageNo;		
		}
	} else {
		nextPage = 5;
	};

	if(nextPage != 5 && pageCount > 10) {
		pages.push("...");	
	};		
	
	pages.push(nextPage-1);
	pages.push(nextPage);
	pages.push(nextPage+1);
	pages.push(nextPage+2);
	nextPage = nextPage+3;

	if(pageCount > 7) {
		if(nextPage != pageCount-2 && pageCount > 10) {
			pages.push("...");
			nextPage = pageCount-2;
		};

		pages.push(nextPage);
		pages.push(nextPage+1);
		pages.push(nextPage+2);	
	};
	
	return pages;
}

//**************************************************************************************************
// Pager
//**************************************************************************************************
Class.Inherits(Pager, BasePager);
function Pager(Params) {
	Pager.prototype.parent.call(this, Params);
};

Pager.prototype.classID = "Pager";

Pager.prototype.Update = function() {
	this.Painter.Update();
};

//**************************************************************************************************
// FlatPagerPainter
// This is called from dbgrid-painters.js
//**************************************************************************************************
Class.Inherits(FlatPagerPainter, JBasePainter);
function FlatPagerPainter(Control) {
    FlatPagerPainter.prototype.parent.call(this, Control);
	
	this.CreatePageButton = function(container, page) {
		var btn = CreateElement("div", container)
			.attr("dsec","title")
			.attr("page", page)
			.attr("flat", "1")
			.attr("active", "0")
			.data("pagesize", page)
			.data("pager", this.Control)
			.html(page);
			
		if(page == this.Control.dataset.get("pagesize")) {
			btn.attr("active", "1");
		} else {
			btn.click(function() {
				var dataset = $(this).data("pager").dataset;
				dataset.edit();
				dataset.set("pagesize", $(this).data("pagesize"));
				dataset.post();
				if($(this).data("pager").page) {
					$(this).data("pager").page.Refresh();
				} else {
					dataset.Methods.call("gotoPage", dataset.get("page"));
				};
			});
		}
		
		return btn;
	};
};

FlatPagerPainter.prototype.classID = "FlatPagerPainter";

FlatPagerPainter.prototype.PaintPages = function(container) {
	var self = this;
	var Pager = this.Control;
	
	var pageNo = Pager.grid.page;
	// var rowCount = Pager.dataset.get("page");
	var pageCount = Pager.grid.page_count;
	
	if(this.pageInput2) this.pageInput2.val(pageNo);
	
	// container.html("");
	var pageArray = Pager.GetPageArray(pageNo, pageCount);
	$(pageArray).each(function(i,e) {
		if(i < pageCount) {
			if(isNaN(e)) {
				var page = CreateElement("div", container).attr("dsec","ellipse").html(e);
			} else {
				i = e;
				var page = CreateElement("div", container).attr("dsec","page").html(e);
				if(e == pageNo) {
					page.attr("pstate", "current");
				} else {
					page.attr("pstate", "num")
						.on({
							click: function()	 {
								Pager.dataset.Methods.call("gotoPage", parseInt($(this).html()));
								self.PaintPages(container);								
							}
						})					
				};			
			};
			
			// CreateElement("div", c1).attr("dsec","sep");
		};			
	});
};

FlatPagerPainter.prototype.Paint = function() {
    FlatPagerPainter.prototype.parent.prototype.Paint.call(this);
	var Pager = this.Control;
	
	Pager.container.html("");
	Pager.container.attr("flat", "1");
		
	var pageNo = Pager.grid.page;
	var rowCount = Pager.grid.row_count;
	var pageCount = Pager.grid.page_count;
	
	var c1 = CreateElement("div", Pager.container, "", Pager.css)
		.attr("flat", "1");
		
	this.btnPrev = CreateElement("div", c1)
		.attr("dsec","button")
		.attr("fsec","prev")
		.on({
			click: function()	 {
				if($(this).attr("bstate") == "enabled"
					Pager.GotoPage(Pager.CurrentPage()-1);
			}
		});
		
	desktop.GetSvg(this.btnPrev, "db-prevpage");
	
	this.btnNext = CreateElement("div", c1)
		.attr("dsec","button")
		.attr("fsec","next")
		.on({
			click: function()	 {
				if($(this).attr("bstate") == "enabled"
					Pager.GotoPage(Pager.CurrentPage()+1);
			}
		});
	
	desktop.GetSvg(this.btnNext, "db-nextpage");
		
	var self = this;
	var pageSelection;
	var c2 = CreateElement("div", Pager.container, "", Pager.css)
		.attr("flat", "1")
		.mouseenter(function() {
			// var p = $(this).offset();
			// var h = $(this).outerHeight();
			// var w = $(this).outerWidth();
			
			// var c = CreateElement("div", $("body"), "", "page-dialog")
				// .css("position", "absolute")
				// .css("z-index", desktop.zIndex++)
				
			// var c1 = CreateElement("div", c)
				// .attr("xsec", "content")
				
			// if(Pager.dataset.get("page_count") > 1) {
				// self.PaintPages(pageSelection = CreateElement("div", c1, "", "page-selection"));
			// };
			
			// var gotoPage = CreateElement("div", c1).attr("xsec", "goto")
				// var a = CreateElement("a", gotoPage).html("Go to page")
				// self.pageInput2 = CreateElement("input", gotoPage)
					// .val(Pager.dataset.get("page"))
					// .focus().select()
					// .keyup(function(e){
						// if(e.keyCode  == 27) {
							// $(this).blur();
						// }
					// })
					// .keypress(function(e){
						// if(e.which == 13) {						
							// if($(this).val()) {
								// Pager.GotoPage(parseInt($(this).val()));
								// self.PaintPages(pageSelection);
							// };
						// };
					// })
				
			// var c2 = CreateElement("div", c)
				// .css("height", h)
				
			// var offsetY = c.outerHeight();
			// var pos = {x:p.left, y:p.top+h-offsetY};
			
			// c.css("left", pos.x);
			// c.css("top", pos.y);
			// c.mouseleave(function() {
				// $(this).remove();
			// });
		})
		
	this.pageLabel = CreateElement("a", c2)
		.attr("dsec", "pageno")
		.click(function() {
			$(this).data("input").css("max-width", $(this).outerWidth());
			$(this).css("display", "none");
			$(this).data("input").css("display", "");
			$(this).data("input").select();
		})
	
	desktop.SetHint(this.pageLabel, function(dialog, container) {
		container.html("Enter page number...");
	}, "top");
	
	this.pageInput = CreateElement("input", c2)
		.css("display", "none")
		.keyup(function(e){
			if(e.keyCode  == 27) {
				$(this).blur();
			}
		})
		.keypress(function(e){
			if(e.which == 13) {						
				if($(this).val()) {
					Pager.GotoPage(parseInt($(this).val()));
				};
			};
		})
		.blur(function() {
			$(this).css("display", "none");
			$(this).data("label").css("display", "");
		});
		
	this.pageInput.data("label", this.pageLabel);
	this.pageLabel.data("input", this.pageInput);
	
	this.pageText = CreateElement("div", c2)
			.attr("dsec","title")
			.attr("flat", "1")
			.html("No records found");
			
	var p = CreateElement("div", Pager.container, "", Pager.css)
			.attr("flat", "1")
			.attr("xsec", "right");
			
	this.perPage = CreateElement("div", p)
			.css("float", "left")
			
	var self = this;
	$(Pager.rowsPerPage).each(function(i, v) {
		self.CreatePageButton(self.perPage, v);
	});
	// this.CreatePageButton(this.perPage, 25);
	// this.CreatePageButton(this.perPage, 50);
	// this.CreatePageButton(this.perPage, 75);
	// this.CreatePageButton(this.perPage, 100);
		
	CreateElement("div", p)
		.attr("dsec","title")
		.attr("flat", "1")
		.html("per page");
};	

FlatPagerPainter.prototype.Update = function() {
	var Pager = this.Control;
	// var PageNo = defaultValue(pageNo, Pager.dataset.get("page"));
	// var RowCount = defaultValue(rowCount, Pager.dataset.get("row_count"));
	// var PageCount = defaultValue(pageCount, Pager.dataset.get("page_count"));
	var PageNo = Pager.grid.page;
	var RowCount = Pager.grid.row_count;
	var PageCount = Pager.grid.page_count;
	// alerts(PageNo);
	if(PageNo > PageCount) {
		Pager.dataset.set("page", PageNo = PageCount);
		Pager.dataset.set("page", PageNo = 1);
	};
	
	this.pageLabel.html(PageNo);
	this.pageInput.val(PageNo);
	
	if(PageNo > 1 && PageNo <= PageCount) {
		this.btnPrev.attr("bstate", "enabled")
	} else {
		this.btnPrev.attr("bstate", "disabled")
	};

	if(PageNo < PageCount) {
		this.btnNext.attr("bstate", "enabled")
	} else {
		this.btnNext.attr("bstate", "disabled")
	};
	
	// this.pageText.html(("<a>Page {0} of {1} ({2} records)</a>").format(PageNo, PageCount, RowCount));
	this.pageText.html(("<a>of {0} ({1} records)</a>").format(PageCount, RowCount));
	
	var self = this;
	this.perPage.html("");
	$(Pager.rowsPerPage).each(function(i, v) {
		self.CreatePageButton(self.perPage, v);
	});
	// this.CreatePageButton(this.perPage, 25);
	// this.CreatePageButton(this.perPage, 50);
	// this.CreatePageButton(this.perPage, 75);
	// this.CreatePageButton(this.perPage, 100);
};
// *************************************************************************************************
// File name: dbgrid.js
// Last modified on
// 03-MAR-2015
// *************************************************************************************************
//**************************************************************************************************
// JGrid
//**************************************************************************************************
Class.Inherits(JGrid, JControl);
function JGrid(Params) {
    JGrid.prototype.parent.call(this, Params);
};

JGrid.prototype.classID = "JGrid";

JGrid.prototype.DefaultPainter = function() {
    return new GridPainter(this);
};

JGrid.prototype.Repaint = function(callback) {
	this.Painter.RepaintContent();
};

JGrid.prototype.SimpleSearchText = function() {
	return this.dataParams.get(this.options.simpleSearchField);
};

JGrid.prototype.Refresh = function(callback) {
	this.Events.BeforeRefresh.trigger();
	
	var SavedSimpleSearchText;
	if(this.optionsData.cache && this.options.simpleSearchField) {
		SavedSimpleSearchText = this.dataParams.get(this.options.simpleSearchField);
		this.dataParams.set(this.options.simpleSearchField, "");
	};
	
	var self = this;
	var key = 0;
	if(!this.dataset.empty()) 
		key = this.dataset.getKey();
	
	this.Busy();
	this.GetData("list", function(params) {
		for(var name in self.requestParams) {
			params[name] = self.requestParams[name];
		};
		
		params.qry = self.dataParams.stringifyRec(0);
		self.Events.OnInitRequestParams.trigger(params);
	},
	function(data) {
		self.Events.OnInitFetchedData.trigger(data);
		
		if(self.optionsData.cache)
			desktop.cacheDataset.add(self.cacheDatasetName, data);

		if(self.optionsData.cache && self.options.simpleSearchField) {
			self.dataParams.set(self.options.simpleSearchField, SavedSimpleSearchText);
		};

		if(self.options.showPager) {
			self.dataParams.set("page", self.page = self.page);
			self.row_count = data.row_count;
			self.page_count = data.page_count;
			self.crud = data.crud;
		};
		
		self.dataset.resetData(self.Methods.call("resetListData", data));
		for(var i = 0; i < data.table_count; i++) {
			self.Events.OnInitSubData.trigger({rawData:data["data_"+i], index:i});
		}
		self.Painter.RepaintContent();
		if(!self.dataset.empty())
			self.dataset.gotoKey(key);
		
		self.Events.AfterRefresh.trigger(data);
		
		if(callback) callback();
		
		// this.Busy();
	});
};

JGrid.prototype.LocalSort = function(name, order) {
	// alerts(name, order)
	this.dataset.sort(name, order);
	this.Painter.RepaintContent();
	// this.Busy();
};

JGrid.prototype.LocalFilter = function() {
	var data = [];

	this.optionsData.filtered = [];
	var self = this;
	// var filter = this.dataParams.get(this.options.simpleSearchField);
	var filter = this.SimpleSearchText();
	var searchExp = new RegExp(filter, 'i');
	this.dataset.each(function(dataRow, i)) {
		// var id = dataRow[self.dataset.primaryKey].toString();
		var id = dataRow[self.dataset.primaryKey];
		// self.Events.OnLocalSearch.trigger(searchExp);
		// if(searchExp.test(dataRow["name"]) || searchExp.test(dataRow["code"]))
		// console.log(dataRow);
		// var test = function
		var search = {
			expression:searchExp, 
			row:dataRow,
			test: function(name) {
				return this.expression.test(this.row[name])
			}
		};
		
		// if(self.Methods.call("localSearch", {expression:searchExp, row:dataRow})) {
		if(self.Methods.call("localSearch", search)) {
			self.optionsData.filtered.push(id);
		};
	});
	
	this.Painter.RepaintContent();
	// this.Busy();
};

JGrid.prototype.Initialize = function(params) {
    JGrid.prototype.parent.prototype.Initialize.call(this, params);
	// console.log(params);

	this.options = defaultValue(params.options, {});
	this.optionsData = defaultValue(params.optionsData, {});
	this.optionsData.filtered = [];
	
    this.id = params.id;
	
	if(params.params) {
		this.owner = params.params.owner;
		this.container = params.params.container;
		this.options.lookup = params.params.lookup;
		this.optionsData.cache = params.params.cache;
	} else {
		this.owner = params.owner;
		this.container = params.container;
		this.options.lookup = params.lookup;
		this.optionsData.cache = params.cache;
	};
	
	// console.log(this.optionsData)
	
	if(this.options.lookup) {
		if(params.params) {
			this.options.lookupDialog = params.params.owner;
			this.options.lookupColumn = params.params.lookupColumn;
		} else {
			this.options.lookupDialog = params.owner;
			this.options.lookupColumn = params.lookupColumn;
		};
	};
	
    this.css = params.css;
	this.list = new JList();
	this.bands = [];
	this.selections = []; // used if this.options.showSelection = true
	
	
	// this.optionsData.editCallback = this.EditRecord;
	this.optionsData.editCallback = function(grid, id, button) {
		// console.log(id);
		grid.EditRecord(id, button);
	};
	
	this.options.cardView = false;
	this.options.showCardToolbar = true;
	this.options.showFixedColumn = true;
	this.options.showBand = false;
	this.options.showHeader = true;
	this.options.showSelection = false;
	this.options.showFocused = true;
	this.options.allowSort = false;
	this.options.simpleSearch = false;
	this.options.showAdvanceSearch = false;
	this.options.simpleSearchField = "filter";
	this.options.showRefreshButton = true;
	this.options.autoScroll = false;
	this.options.toolbarSize = 24;
    this.options.toolbarTheme = params.toolbarTheme;
    this.options.editDialogWidth = 500;
    // this.options.showSummary = false;
	
	this.requestParams = params.requestParams;
	// console.log(this.requestParams)
	// this.requestParams = {};
	// if(params.requestParams) {
		// this.requestParams = RequestParamsToObject(params.requestParams);
	// };
	
	this.editForm = params.editForm;
	// console.log(this.editForm);
	this.Methods = new MethodHandler(this);
	this.Methods.add("canAdd", function(grid) {
		return grid.crud.add;
	});
	this.Methods.add("canEdit", function(grid) {
		return grid.crud.edit;
	});
	this.Methods.add("canDelete", function(grid) {
		return grid.crud["delete"];
	});
	this.Methods.add("initListData", function(grid, data) {
		return new Dataset(data.data_0, "Data");
	});
	this.Methods.add("resetListData", function(grid, data) {
		return data.data_0;
	});
	this.Methods.add("deleteConfirm", function(grid, id) {
		return {
			title: "Hello",
			message: "Got it..." + id
		}
	});
	this.Methods.add("getCacheDatasetName", function(grid) {
		// return grid.optionsData.url;
		return defaultValue(grid.optionsData.cacheName, grid.optionsData.url);
	});
	this.Methods.add("localSearch", function(grid, options) {
		// return grid.optionsData.url;
		// return options.expression.test(options.row["name"]) || options.expression.test(options.row["code"]);
		return true;
	});
	
	this.Methods.add("allowCommand", function(grid, column) {
		return true;
	});
	
	this.Methods.add("getCommandIcon", function(grid, column) {
		return "";
	});
	
	this.Methods.add("getCommandHint", function(grid, column) {
		return "";
	});
	
	this.Methods.add("editTitle", function(grid, mode) {
		if(mode == "edit")
			return "Edit"
		else if(mode == "new")
			return "Add Record"
	});
	
	// this.Methods.add("addRecordHint", function(grid) {
		// return "Add Record"
	// });
	
	this.Events = {};
	this.Events.OnInitDataRequest = new EventHandler(this);
	this.Events.OnInitRequestParams = new EventHandler(this);
	this.Events.OnInitFetchedData = new EventHandler(this);
	this.Events.OnInitData = new EventHandler(this);
	this.Events.OnInitSubData = new EventHandler(this);
	this.Events.OnInitEditData = new EventHandler(this);
	this.Events.OnInitEditor = new EventHandler(this);
	this.Events.OnInitSearch = new EventHandler(this);
	this.Events.OnInitGridMenu = new EventHandler(this);
	// this.Events.OnLocalSearch = new EventHandler(this);
	this.Events.OnInitGrid = new EventHandler(this);
	this.Events.OnInitRow = new EventHandler(this);
	this.Events.OnInitColumns = new EventHandler(this);
	this.Events.OnInitCard = new EventHandler(this);
	// this.Events.OnInitEdit = new EventHandler(this);
	this.Events.OnInitToolbar = new EventHandler(this);
	this.Events.AfterPaintContent = new EventHandler(this);
	this.Events.AfterRepainContent = new EventHandler(this);
	this.Events.AfterRepainContent.add(function(grid) {
		grid.Busy(false);
		grid.UpdateSelection();
		if(grid.options.showPager) {
			grid.pager.Update();
		};
	});

	this.Events.AfterRefresh = new EventHandler(this);
	this.Events.BeforeRefresh = new EventHandler(this);
	
	this.Events.OnInitSelect = new EventHandler(this);
	this.Events.OnSelect = new EventHandler(this);
	this.Events.OnSelection = new EventHandler(this);

	this.Events.OnInitRequestParams.add(function(grid, requestParams) {
		// console.log("OcatholicnInitRequestParams")
		if(grid.options.lookup)
			requestParams.lookup = 1;
	});
	
	// this.Events.OnInitEdit.add(function(grid, id) {
	// });
	
	this.Events.OnInitRow.add(function(grid, row) {
		row.dblclick(function() {
			// grid.Events.OnInitEdit.trigger($(this).attr("row-id"));
			grid.optionsData.editCallback(grid, $(this).attr("row-id"), $(this));
		});
	});
	
	this.Events.OnCommand = new EventHandler(this);
	this.Events.OnCommand.add(function(grid, params) {
		if(params.command == "select")
			grid.SelectRecord(params.id, params.element)
		else if(params.command == "edit") 
			grid.EditRecord(params.id, params.element)
		else if(params.command == "delete")
			grid.DeleteRecord(params.id, params.element)
		else if(params.command == "open")			
			grid.optionsData.editCallback(grid, params.id, params.element);
		else if(params.command == "menu")
			grid.ShowMenu(params.id, params.element)
	});
	
	this.Events.OnInitColumns.add(function(grid) {
		// console.log("OnInitColumns")
		if(grid.options.showSelection)
			grid.NewCommand({command:"select", float: grid.options.showFixedColumn ? "left" : "", internal:true});
			// grid.NewCommand({command:"select", float: "left"});
		
		if(grid.Methods.call("canEdit") && grid.crud.edit && !grid.options.cardView)
		// if(grid.Methods.call("canEdit") && grid.crud.edit)
			grid.NewCommand({command:"edit", float: grid.options.showFixedColumn ? "left" : "", internal:true});
			// grid.NewCommand({command:"edit", float: "left"});
		
		if(grid.Methods.call("canDelete") && grid.crud["delete"] && !grid.options.cardView)
		// if(grid.Methods.call("canDelete") && grid.crud["delete"])
			grid.NewCommand({command:"delete", float: grid.options.showFixedColumn  ? "left" : "", internal:true});
			// grid.NewCommand({command:"delete", float: "left"});
	});
	
	if(params.init) {
		// creator/owner of the grid must add an event to this.Events.OnInitGrid in "init"
		params.init(this);
	};
	
	this.Events.OnInitToolbar.add(function(grid, toolbar) {
		grid.toolbar = toolbar;
		if(grid.options.showRefreshButton) {
			toolbar.NewItem({
				id: "refresh",
				// icon: grid.options.toolbarSize == 16 ? "/engine/images/refresh.png": "/engine/images/refresh-24.png",
				icon: "refresh",
				iconColor: "#8DCF6E",
				hint: "Refresh",
				click: function(item) {
					grid.Refresh();
				}
			});
		};
		
		if(grid.Methods.call("canAdd") && grid.crud.add) {
			toolbar.NewItem({
				id: "newrecord",
				// icon: "/engine/images/notebook-new-24.png",
				icon: "new",
				iconColor: "#1CA8DD",
				// hint: "Add Record",
				hint: grid.Methods.call("editTitle", "new"),
				click: function(item) {
					grid.optionsData.editCallback(grid, 0);
					// grid.Methods.call("newRecord");
					// grid.NewRecord();
					// grid.Events.OnCommand.trigger({command: "add", callback: function(grid) {
						// grid.NewRecord();
					// });
				}
			});
		};
		
		grid.Painter.ShowSearchInput(toolbar);
	})

	this.Events.OnInitGrid.trigger();
	this.cacheDatasetName = this.Methods.call("getCacheDatasetName");
	
	// this.Events.OnInitSelect.trigger(this.selections);
	
	this.dataParams = new Dataset([], "Paramaters");
	this.dataParams.grid = this;
	this.dataParams.Methods.add("gotoPage", function(dataset, page) {
		dataset.set("page", dataset.grid.page = page);
		dataset.grid.Refresh();
	});
	
	this.dataParams.append();
	this.dataParams.addColumn = function(name, value, options) {
		this.Columns.setprops(name, options);
		this.data[0][name] = value;
		return this;
	};

	this.dataParams.Events.OnClearSearch = new EventHandler(this.dataParams);
	this.dataParams.Events.OnClearSearch.add(function(dataset, grid) {
		// exclude the following fields: page, pagesize, sort
		var exclude = ["page","pagesize","sort","order"];
		// var exclude = dataset.Methods.call("excludeClear").concat(["page","pagesize","sort","order"]);
		dataset.Columns.each(function(i, column) {
			if(exclude.indexOf(column.fname) == -1) {
				column.set(null);
			};
		});
		
		grid.Refresh();
	});
	
	if(!desktop.cache || !desktop.cacheDataset.exists(this.cacheDatasetName + "_params")) {
		// console.log("1")
		this.Events.OnInitDataRequest.trigger(this.dataParams);
		this.Events.OnInitSelect.trigger(this.selections);
		desktop.cacheDataset.add(this.cacheDatasetName + "_params", this.dataParams);
	} else {
		// console.log("2")
		this.dataParams = desktop.cacheDataset.get(this.cacheDatasetName + "_params");
	};
	
	var self = this;
	
	this.Busy();
	
		// console.log(this.optionsData.cache)
	if(this.optionsData.cache && desktop.cacheDataset.exists(this.cacheDatasetName)) {
		// console.log("here")
		setTimeout(function() {
			self.PrepareFetchData(desktop.cacheDataset.get(self.cacheDatasetName));
		}, 2);
		// params.DelayPainting = false;
	} else {
		this.GetData("list", function(params) {
				for(var name in self.requestParams) {
					params[name] = self.requestParams[name];
				};
				
				params.qry = self.dataParams.stringifyRec(0);
				self.Events.OnInitRequestParams.trigger(params);
			},
			function(data) {
				self.PrepareFetchData(data);
				if(self.optionsData.cache)
					desktop.cacheDataset.add(self.cacheDatasetName, data);
			}
		);
	};
	
	params.DelayPainting = true;
};

JGrid.prototype.PrepareFetchData = function(data) {	
	var self = this;
	self.page = defaultValue(data.page, 1);
	self.row_count = defaultValue(data.row_count, 0);
	self.page_count = defaultValue(data.page_count, 0);
	self.crud = data.crud;
	
	self.Events.OnInitFetchedData.trigger(data);
	self.Events.OnInitData.trigger(self.dataset = self.Methods.call("initListData", data));
	for(var i = 0; i < data.table_count; i++) {
		self.Events.OnInitSubData.trigger({rawData:data["data_"+i], index:i});
	}
	
	self.Events.OnInitEditData.trigger(self.dataEdit = new Dataset([], "Edit"));
	self.Events.OnInitColumns.trigger();
	
	self.dataEdit.Events.OnPost.add(function(data, postCallback) {
		self.GetData("update", function(params) {
			params.mode = data.mode;
			params.data = data.stringifyRec(0);
		}, function(result) {
			var msg;
			if(result.status != 0) {
				msg = {};
				msg.title = "Update error";
				msg.message = result.message;
			} else {
				msg = "";
				self.Refresh();
			};
			
			postCallback(msg, result.status);
		});
	})
	
	self.Paint();
	self.AfterPaint();  
	self.Events.AfterPaintContent.trigger();
	self.Events.AfterRepainContent.trigger();
};

JGrid.prototype.CreateDefaultBands = function() {	
	if(!this.systemBand) this.systemBand = this.CreateBand("")
	
	this.bandLevels = 0;
	$(this.bands).each(function(i, band) {
		if(band.level > band.grid.bandLevels) band.grid.bandLevels = band.level;
	});
	
	if(this.systemBand && this.bandLevels) this.systemBand.rowSpan = this.bandLevels;
	
	this.EachColumn(function(i, column) {
		var systemColumns = ["edit","delete","open","select","menu"];
		if(column.command && systemColumns.indexOf(column.command > -1) {
			if(!column.grid.systemBand) column.grid.systemBand = column.grid.NewBand("");
			column.grid.systemBand.columns.push(column);
			column.band = column.grid.systemBand;
		} else if(!column.band) {
			if(!column.grid.defaultBand) column.grid.defaultBand = column.grid.NewBand("");
			column.grid.defaultBand.columns.push(column);
			column.band = column.grid.defaultBand;
		};
	});
};

JGrid.prototype.CreateBand = function(caption, parent) {
	var params = {
		grid: this,
		caption: caption,
		parent: parent
	};

	// if(parent)
		// this.bandLevels = 1
	// else
		// this.bandLevels = defaultValue(parent.level, 0) + 1;
	
	var band = new JGridBand(params);
	this.bands.push(band);
	return band;
};

JGrid.prototype.NewBand = function(caption, parent) {
	if(!this.systemBand) {
		this.systemBand = this.CreateBand("");
	};
	
	return this.CreateBand(caption, parent);
};

JGrid.prototype.InitBands = function(caption, callback) {
	var band = this.NewBand(caption);
	callback(band);
};

JGrid.prototype.ColumnClass = JGridColumn;

JGrid.prototype.CreateColumn = function(params) {
	params.grid = this;
	var col = new this.ColumnClass(params);
	this.list.add(params.id, col);
	return col;
};

JGrid.prototype.ClearColumns = function() {
	this.list.clear();
}

JGrid.prototype.NewColumn = function(params) {
	return this.CreateColumn(params);
};

JGrid.prototype.NewCommand = function(params) {
	if(typeof params == "string") {
		params = {
			id: params,
			command: params
		};
	} else {
		params.id = params.command;
		params.command = params.command;
	};
	params.width = 30;
	params.fixedWidth = true;
	params.grid = this;
	
	var systemColumns = ["edit","delete","open","select","menu"];
	// params.internal = defaultValue(params.internal, false);
	params.internal = systemColumns.indexOf(params.command) > -1;
	
	// var col = new this.ColumnClass(params);
	// this.list.add(params.id, col);
	return this.CreateColumn(params);
};

JGrid.prototype.EachColumn = function(callback) {
	this.list.each(callback);
};

JGrid.prototype.Count = function() {
	return this.list.count();
};

//**************************************************************************************************
// JDBGrid
//**************************************************************************************************
Class.Inherits(JDBGrid, JGrid);
function JDBGrid(Params) {
    JDBGrid.prototype.parent.call(this, Params);
};

JDBGrid.prototype.classID = "JDBGrid";

JDBGrid.prototype.DefaultPainter = function() {
    return new DataGridPainter(this);
    // return new JDataGridPainter(this);
};

JDBGrid.prototype.ColumnClass = JDBGridColumn;

JDBGrid.prototype.Initialize = function(params) {
    JDBGrid.prototype.parent.prototype.Initialize.call(this, params);
	
};

// JDBGrid.prototype.FocusRecord = function(id) {
	// this.Painter.tableContent.find("tr[focused='1']").removeAttr("focused", 0);
	// this.Painter.tableContent.find(("tr[row-id='{0}']").format(id)).attr("focused", 1);
// };
JDBGrid.prototype.AfterPaint = function() {
	JDBGrid.prototype.parent.prototype.AfterPaint.call(this); 
	// console.log("AfterPaint")
	if(this.options.lookupColumn) {
		// this.dataset.gotoKey(this.options.lookupColumn.get());
		// this.Painter.GotoRow(this.options.lookupColumn.get());
		this.dataset.gotoKey(this.options.lookupColumn.raw());
		this.Painter.GotoRow(this.options.lookupColumn.raw());
	};
	
	// if(this.options.simpleSearch) {
		// var self = this;
		// alerts(this.searchInput);
		// alerts(this.dataParams.get("page"));
		// this.dataParams.bindControl(this.Painter.searchInput, {
			// fname: "filter"
		// });
		// this.Painter.searchInput.focus();
		// this.dataParams.updateControls();
		// this.dataParams.Events.OnChanged.add(function(dataset) {
			// self.Refresh();
		// });
		
	// };
	// alerts(this.dialog);
};
	
JDBGrid.prototype.GetData = function(mode, init, callback) {	
	var params = {};
	
	if(this.optionsData.requestParams) {
		var p = this.optionsData.requestParams.split("&");
		$(p).each(function(i, s) {
			var p = s.split("=");
			params[p[0]] = p[1];
		});
	};
	
	if(init) init(params);
	
	// desktop.Ajax(this, ("/get/{0}/{1}").format(mode, this.optionsData.url), params, callback);
	var src, path = "app";
	var values = this.optionsData.url.split("/");
	
	if(values.length > 1) {
		path = values[0];
		src = values[1];
	} else
		src = values[0];
	
	// console.log(values.length);
	// console.log(values);
	// console.log(path);
	// console.log(src);
	// console.log(("/{0}/get/{1}/{2}").format(path, mode, src));

	desktop.Ajax(this, ("/{0}/get/{1}/{2}").format(path, mode, src), params, callback);
	
	// desktop.Ajax(this, ("/{0}/get/{1}/{2}").format("app", mode, this.optionsData.url), params, callback);
};

JDBGrid.prototype.UpdateSelection = function() {
	if(!this.Painter.content) return;
	var selections = "some";
	var selectionCount;
	
	if(this.options.cardView)
		selectionCount = this.Painter.content.find("div[grid-sec='card'][row-selected]").length
	else
		selectionCount = this.Painter.content.find("tr[row-selected]").length;

	if(selectionCount) {
		if(selectionCount == this.dataset.count()) {
			selections = "all";
		} else {
			selections = "some";
		};
	} else
		selections = "";
	
	if(this.Painter.header) {
		var cell;
		if(this.Painter.fixedHeader) {
			cell = this.Painter.fixedHeader.find("th[command='select']").attr("has-selections", selections)
		} else
			cell = this.Painter.header.find("th[command='select']").attr("has-selections", selections);
		
		if(selections == "some")
			desktop.GetSvg(cell.html(""), "db-selectsome")
		else if(selections == "all")
			desktop.GetSvg(cell.html(""), "db-selectall")
		else
			desktop.GetSvg(cell.html(""), "db-selectnone")
	};
};

JDBGrid.prototype.ClickCommand = function() {	
	// console.log("ClickCommand")
	// var id = $(this).parent().parent().attr("row-id");
	var id = $(this).closest("tr").attr("row-id");
	var col = $(this).data("column");
	col.grid.Events.OnCommand.trigger({
		id: id,
		command: col.command,
		element: $(this)
	});
};

JDBGrid.prototype.InitSelections = function(selections) {
	if(selections) {
		this.selections = [];
		var list = selections.split(",");
		for(var i=0; i<list.length; i++) {
			this.selections.push(list[i]);
		};
	};
};

JDBGrid.prototype.SetSelections = function(selections) {	// selections is a comma-delimeted string 
	if(selections) {
		var list = selections.split(",");
		for(var i=0; i<list.length; i++) {
			this.selections.push(list[i]);
		};
		
		this.Events.OnSelect.trigger(this.selections);
	};
};

JDBGrid.prototype.ShowMenu = function(id, c) {	
	var self = this;
	var confirm = this.Methods.call("deleteConfirm", id); 
	this.dataset.gotoKey(id);
	new JPopupDialog({
		Target: c,
		Modal: false,
		Painter: {
			painterClass: PopupBalloonPainter,
			color: "orange",
			snap: "bottom",
			align: "",
			inset: false,
			OnRenderHeader: function(dialog, container) {
				desktop.GetSvg(container, "menu").css("height", 24).css("fill", "white")
				// container.append("Menu");
				// container.html(c.title);
			},
			OnRenderContent: function(dialog, container) {
				var collection = [];
				var menus = {
					add: function(title) {
						var main = {
							// item.subItems.push({id:"claim", icon:"db-open", title:"Claim", url:"/app/claim/0"});
							add: function(title, url, icon) {
								this.item.subItems.push({icon:icon, title:title, url:url});
							},
							addCommand: function(title, callback, icon) {
								this.item.subItems.push({icon:icon, title:title, callback:callback});
							}
						};
						
						collection.push(main.item = {title:title, subItems:[]});
						return main;
					}
				}
				
				self.Events.OnInitGridMenu.trigger(menus);
				
				desktop.Painter.createNavigatorMenu({
					container: container,
					theme: "grid-menu",
					menus: collection,
					click: function(e) {
						// $(e).data("callback")();
						// console.log($(e.target).data("callback"))
						// console.log($(e.target))
						// location.hash = $(e.target).attr("href");
						dialog.Hide();
					},
					init: function(container, item) {
						if(item.url) {
							container.attr("href", item.url);
							container.attr("target", "_blank");
						} else if(item.callback) {
							// container.data("callback", item.callback);
							// container.data("dialog", dialog);
							container.click(item.callback);
							// console.log(container)
						}
					}
				});
				
				// container.html(c.message)
			},
			OnRenderFooter: function(dialog, container) {
				// CreateButton({
					// container: container,
					// caption: "Close",
					// enabled: true,
					// style: "blue",
					// click: function(button) {
						// dialog.Hide();
					// }
				// });
				// CreateButton({
					// container: container,
					// caption: "Close",
					// enabled: true,
					// style: "text",
					// click: function(button) {
						// dialog.Hide();
					// }
				// });
			}
		}
	});
	// ConfirmDialog({
		// target: c,
		// title: confirm.title,
		// message: confirm.message,
		// callback: function(dialog) {
			// self.GetData("delete", 
				// function(params) {
					// params.mode = "delete";
					// params.data = ('[{"{0}":{1}}]').format(self.dataset.primaryKey, id);
				// },
				// function(result) {
					// self.Refresh();
				// }
			// );
		// }
	// });
};

JDBGrid.prototype.SelectRecord = function(id, e) {	
	// console.log("here");
	var index = this.selections.indexOf(id);
	var parent, parent2;
	
	if(this.options.cardView)
		parent = e.closest("div[grid-sec='card']")
	else {
		parent = e.closest("tr");
		if(this.Painter.fixedHeader) {
			var id = parent.attr("row-id");
			parent2 = this.Painter.content.find(("tr[row-id='{0}']").format(id));
		};
	};
	
	
	var icon;
	if(index == -1) {
		this.Events.OnSelection.trigger({id: id, remove: false});
		this.selections.push(id);
		parent.attr("row-selected", 1);
		if(parent2) parent2.attr("row-selected", 1);
		icon = "db-select";
	} else {
		this.Events.OnSelection.trigger({id: id, remove: true});
		this.selections.splice(index, 1);
		parent.removeAttr("row-selected");
		if(parent2) parent2.removeAttr("row-selected");
		icon = "db-unselect";
	};
	
	 var column = e.data("column");
	// var click = e.click;
	var s = desktop.GetSvg(e.closest("td").html(""), icon).data("column", column);
	s.on("click", this.ClickCommand);
	
	this.UpdateSelection();
	this.Events.OnSelect.trigger(this.selections);
};
	
// JDBGrid.prototype.NewRecord = function() {	
	// this.GetData("new", 
		// function(params) {
			// params.id = 0;
		// },
		// function(result) {
			// result.caller.dataEdit.resetData(result.edit);
			// result.caller.Painter.EditDialog(result.caller.dataEdit.mode = "new");
		// }
	// );
// };

JDBGrid.prototype.EditRecord = function(id, target, initCallback) {
	// console.log(this.dataEdit.mode)
	if(!this.Methods.call("canEdit")) {
		this.editForm(id, "edit");
	} else {
		var self = this;
		if(id == 0)
			this.dataEdit.mode = "new"
		else
			this.dataEdit.mode = "edit";
		
		// console.log(thsis.dataEdit.mode)
		this.Painter.ShowEditDialog({
			// mode: this.dataEdit.mode = "edit",
			mode: this.dataEdit.mode,
			target: target, // this is the target element, the user clicked to activate edit
			editForm: function(container, dialog) {
				self.editForm(id, container, dialog, initCallback); // this call embeds the FormEditor in the container, refer to form-edit.js
			}
		});
	};
};

// JDBGrid.prototype.EditRecord = function(id) {	
	// this.GetData("edit", 
		// function(params) {
			// params.id = id;
		// },
		// function(result) {		
			// result.caller.dataEdit.resetData(result.edit);
			// result.caller.Painter.EditDialog(result.caller.dataEdit.mode = "edit");
		// }
	// );
// };

JDBGrid.prototype.DeleteRecord = function(id, c) {	
	var self = this;
	var confirm = this.Methods.call("deleteConfirm", id); 
	this.dataset.gotoKey(id);
	ConfirmDialog({
		target: c,
		title: confirm.title,
		message: confirm.message,
		callback: function(dialog) {
			self.GetData("delete", 
				function(params) {
					params.mode = "delete";
					params.data = ('[{"{0}":{1}}]').format(self.dataset.primaryKey, id);
				},
				function(result) {
					if(result.status < 0)
						ErrorDialog({
							target: c,
							title: "Attempt to delete failed",
							message: result.message,
							snap: "bottom",
							inset: false
						})
					// else if(result.status > 0)
						// InfoDialog({
							// target: c,
							// title: "Deletion was successful",
							// message: result.message,
							// snap: "bottom",
							// inset: false
						// })
					else
						self.Refresh();
				}
			);
		}
	});
};

JDBGrid.prototype.UpdateRecord = function(callback) {	
	var self = this;
	// this.dataEdit.set("plan_description", this.dataEdit.get("plan_description")+".");
	this.GetData("update", function(params) {
		params.mode = self.dataEdit.mode;
		params.data = self.dataEdit.stringifyRec(0);
	},
	function(data) {
		self.Refresh(callback);
		// self.dataEdit.resetData(data.edit);
	});
};

JDBGrid.prototype.ReturnLookupData = function(row) {
	var value = row.attr("row-id");
	this.dataset.gotoKey(value);
	this.options.lookupColumn.lookupDataset = this.dataset;
	
	this.options.lookupColumn.set(value);
	this.options.lookupDialog.Hide();
	// console.log(this.options.lookupColumn)
};

JDBGrid.prototype.Initialize = function(params) {	
    JDBGrid.prototype.parent.prototype.Initialize.call(this, params);
	
	this.Events.OnInitData.add(function(grid) {
		grid.dataset.Events.OnMoveRecord.add(function(dataset) {
			// if(grid.options.showFocused) {
				grid.Painter.FocusRow(dataset.getKey());
			// };
		});
	});
};

JDBGrid.prototype.InitializeEditor = function(pg) {
	var self = this;
	// alerts(pg.classID);
	var editorInit = {
		PageControl: pg,
		// NewEdit: function(caption, callback) {
		NewGroupEdit: function(caption, callback) {
			pg.NewTab(caption, {
				OnCreate: function(tab) {
					var container = CreateElement("div", tab.content).addClass("editor-tab-container")
						
					var editor = new JEditor({
						ID: "edit_" + tab.id,
						Container: container,
						Css: "editor"
					});	          
					
					editor.Dataset = self.dataEdit;
					
					callback(editor, tab);
					
					editor.Paint();
					editor.AfterPaint();
					editor.Dataset.updateControls();
				}
			});
		},
		NewContainer: function(caption, callback) {
			pg.NewTab(caption, {
				OnCreate: function(tab) {
					callback(CreateElement("div", tab.content).css("width", "100%"), tab);
				}
			});
		}
	};
	
	this.Events.OnInitEditor.trigger(editorInit);
	
	// pg.ShowTabs(false);
};

JDBGrid.prototype.Busy = function(busy) {
	// var self = this;
	this.Painter.Busy(busy);
	// setTimeout(function() {
		// self.Painter.Busy();
	// }, 1000)
};

//**************************************************************************************************
// JGridBand
//**************************************************************************************************
function JGridBand(params) {
    if (params == undefined) {
        return;
    };

    this.Initialize(params);
};

JGridBand.prototype.classID = "JGridBand";

JGridBand.prototype.Initialize = function(params) {
	this.bands = [];
	this.columns = [];	
    this.grid = params.grid;
	this.parent = params.parent;
	this.rowSpan = 0;
	if(params.parent)
		this.level = params.parent.level + 1
	else
		this.level = 0;
	
	this.caption = params.caption;
};

JGridBand.prototype.getCaption = function() {
	return this.caption;
	// return this.caption+","+this.Count();
	// return this.caption+","+this.bands.length;
};

JGridBand.prototype.HasFixedColumns = function(float) {
	var yes = false;
	$(this.columns).each(function(i, column) {
		if(column.float == float) yes = true;
		// if(column.command) yes = true;
	});
	
	return yes;
};

JGridBand.prototype.Count = function() {
	if(this.bands.length) {
		var count = 0;
		$(this.bands).each(function(i, band) {
			count += band.Count();
		});
		
		return count;
	} else
		return this.columns.length;
};

JGridBand.prototype.ColCount = function() {
	if(this.bands.length) {
		var count = 0;
		$(this.bands).each(function(i, band) {
			count += band.Count();
		});
		
		return count;
	} else
		return this.columns.length;
};

JGridBand.prototype.RowCount = function() {
	return this.bands.length;
};

JGridBand.prototype.InitBands = function(caption, callback) {
	var band = this.NewBand(caption);
	callback(band);
};

JGridBand.prototype.NewBand = function(caption) {
	var band = this.grid.NewBand(caption, this);
	// band.band = this;
	this.bands.push(band);
	return band;
};

JGridBand.prototype.NewColumn = function(params) {
	var col = this.grid.NewColumn(params);
	col.band = this;
	this.columns.push(col);
	return col;
};

JGridBand.prototype.NewCommand = function(params) {
	var col = this.grid.NewCommand(params);
	col.band = this;
	this.columns.push(col);
	return col;
};

//**************************************************************************************************
// JGridColumn
//**************************************************************************************************
function JGridColumn(params) {
    if (params == undefined) {
        return;
    };

    this.fname = params.fname;
    this.id = defaultValue(params.id, params.fname);
    this.Initialize(params);
};

JGridColumn.prototype.classID = "JGridColumn";

JGridColumn.prototype.Initialize = function(params) {
    this.grid = params.grid;
    this.internal = params.internal;
    this.command = params.command;
	this.width = params.width;
	this.caption = defaultValue(params.caption, params.fname);
	this.drawHeader = params.drawHeader;
	this.drawContent = params.drawContent;
	this.drawSummary = params.drawSummary;
	this.fixedWidth = defaultValue(params.fixedWidth, false);
	this.showSummary = defaultValue(params.showSummary, false);
	// this.allowSort = defaultValue(params.allowSort, false);
	if(!this.command)
		this.allowSort = defaultValue(params.allowSort, this.grid.options.allowSort);
		// this.allowSort = true;
	
	this.float = defaultValue(params.float, "none");
};

JGridColumn.prototype.getCaption = function() {
	return this.caption;
};

JGridColumn.prototype.getValue = function() {
	return this.caption;
};

//**************************************************************************************************
// JDBGridColumn
//**************************************************************************************************
Class.Inherits(JDBGridColumn, JGridColumn);
function JDBGridColumn(Params) {
    JDBGridColumn.prototype.parent.call(this, Params);
};

JDBGridColumn.prototype.classID = "JDBGridColumn";

JDBGridColumn.prototype.Initialize = function(params) {
    JDBGridColumn.prototype.parent.prototype.Initialize.call(this, params);
    this.dataset = params.grid.dataset;
};

JGridColumn.prototype.getCaption = function() {
	if(this.dataset) {
		var c = this.dataset.Columns.get(this.id);
		if(c) 
			return c.label
		else
			return this.caption
	} else
		return this.caption;
};

JGridColumn.prototype.getValue = function() {
	if(this.dataset) {
		var c = this.dataset.Columns.get(this.id);
		if(c)
			return c.text()
		else
			return ""
	} else
		return ""
};

JGridColumn.prototype.numeric = function() {
	if(this.dataset) {
		var c = this.dataset.Columns.get(this.id);
		if(c)
			return c.numeric
		else
			return false
	} else
		return false
};

//**************************************************************************************************
// JDBTreeView
//**************************************************************************************************
Class.Inherits(JDBTreeView, JDBGrid);
function JDBTreeView(Params) {
    JDBTreeView.prototype.parent.call(this, Params);
};

JDBTreeView.prototype.classID = "JDBTreeView";

JDBTreeView.prototype.Initialize = function(params) {
    JDBTreeView.prototype.parent.prototype.Initialize.call(this, params);

	this.settings = params.treeViewSettings;
	this.Events.BeforeRefresh.add(function(grid) {	
		grid.SaveTreeViewState();
	});
	
	this.Events.AfterRefresh.add(function(grid) {	
		grid.UpdateTreeView();
	});
	
	this.Events.OnInitRow.add(function(grid, row) {	
		row.attr("key-id", grid.dataset.get(grid.settings.key))
		row.attr("parent-id", grid.dataset.get(grid.settings.parent))
		if(grid.settings.hasChildren(grid)) {
			row.attr("has-items", 1)
			row.attr("parent-state", "expand")
		} else {
			row.attr("has-items", 0)
		};
	});	
};

JDBTreeView.prototype.SaveTreeViewState = function() {
	var self = this;
	this.TreeViewStates = [];
	this.container.find("tbody tr").each(function(i, r) {
		var state = {};
		state.id = $(r).attr("row-id");
		state.visible = $(r).is(":visible");
		if($(r).attr("parent-state")) {
			state.state = $(r).attr("parent-state");
		};
		
		self.TreeViewStates.push(state);
	});
};

JDBTreeView.prototype.UpdateTreeView = function() {
	if(this.TreeViewStates) {
		var self = this;
		$(this.TreeViewStates).each(function(i, v) {
			self.container.find(("tr[row-id='{0}']").format(v.id)).each(function(i, r) {
				if(v.state) {
					$(r).attr("parent-state", v.state);
				};
				
				if(!v.visible) {
					$(r).css("display", "none");
				};
			});
		});
		
		self.container.find("span[x-sec='parent']").each(function(i, o) {
			var r = $(o).closest("tr");
			if(r.attr("parent-state") == "expand")
				$(o).attr("x-toggle", "minus")
			else
				$(o).attr("x-toggle", "expand");
		});
		
		this.TreeViewStates = [];
	} else if(this.TreeViewCollapse) {
		// parent-state="expand"
		// <tr row-id="A01" odd="1" key-id="1" parent-id="0" has-items="1" parent-state="expand" focused="1" style="cursor: default;">

		// what is the class name of the grid?
		// var name = "grid-"+this.Window.CallerID;
		this.container.find("tr[parent-state='expand']").each(function(i, o) {
			$(o).attr("parent-state", "minus");
		});
		this.container.find("tr[has-items='0']").each(function(i, o) {
			$(o).css("display", "none");
		});
		this.container.find("span[x-toggle='minus']").each(function(i, o) {
			$(o).attr("x-toggle", "expand");
		});
	};
};

JDBTreeView.prototype.ToggleNode = function(node, collapse) {
	var self = this;
	var parent = node.parent().find(("tr[key-id='{0}']").format(node.attr("parent-id"));
	
	if(!collapse && parent.attr("parent-state") == "expand") 
		node.css("display", "");
	else if(collapse)
		node.css("display", "none");
		
	if(node.attr("has-items") == "1") {
		node.parent().find(("tr[parent-id='{0}']").format(node.attr("key-id")))
			.each(function(i, o) {
				if(!collapse && parent.attr("parent-state") == "expand") 
					self.ToggleNode($(o), collapse)
				else if(collapse)
					self.ToggleNode($(o), collapse)
			}
	}
};

JDBTreeView.prototype.ExpandNodes = function(e, collapse) {
	var toggle, collapse, state;
	if(collapse) {
		visible = "none";
		toggle = "expand";
		state = "minus";
	} else {
		visible = "";
		toggle = "minus";
		state = "expand";
	};
	
	e.closest("tr").attr("parent-state", state);
	
	var self = this;
	e.closest("table").find(("tr[parent-id='{0}']").format(e.attr("x-id")))
		.each(function(i, o) {
			self.ToggleNode($(o), collapse)
		}
	
	e.attr("x-toggle", toggle);
};

JDBTreeView.prototype.NewTreeViewColumn = function(params) {
	var self = this;
	params.drawContent = function(cell, column) {
		// console.log(cell)
		cell.html("");
		cell.css("padding-left", (column.dataset.get("level")-1)*16);
		
		var level = 0;
		var type = "";
		var toggle = "";
		var c = [];
		
		c.push("<div x-sec='main'>");

		if(column.grid.settings.hasChildren(column.grid)) {
			type = "parent"
			toggle = "minus";
		} else {
			type = "detail"
		};
			
		$(c.push(("<span x-sec='{0}' x-toggle='{1}' x-id={2}></span>").format(type, toggle, column.dataset.get(column.grid.settings.key))));
		
		column.grid.settings.preInitColumn(column, c);
		
		// c.push(("<span x-sec='caption' x-type='{1}'>{0}</span>").format(column.dataset.get("benefit_name"), type));
		// c.push(("<span x-sec='caption' x-type='{1}'>{0}</span>").format(column.dataset.get("benefit_name"), type));
		c.push(("<span x-sec='caption' x-type='{1}'>{0}</span>").format(column.dataset.get(column.fname), type));
		
		column.grid.settings.postInitColumn(column, c);
		
		c.push("</div>");
		
		cell.html(c.join(""))
			.find("span[x-sec='parent']")
			.each(function(i, o) {   
				// console.log(o)
				$(o).click(function() {
					self.ExpandNodes($(this), $(this).attr("x-toggle") == "minus");
				});
			});   
			
		// console.log(c)
	};
	
	this.NewColumn(params);
};
// *************************************************************************************************
// File name: dbgrid-painters.js
// Last modified on
// 03-MAR-2015
// *************************************************************************************************
//**************************************************************************************************
// GridPainter
//**************************************************************************************************
Class.Inherits(GridPainter, JControlPainter);
function GridPainter(Control) {
	GridPainter.prototype.parent.call(this, Control);
};

GridPainter.prototype.type = "grid";
GridPainter.prototype.classID = "GridPainter";

GridPainter.prototype.Paint = function() {
	GridPainter.prototype.parent.prototype.Paint.call(this); 
	if(this.Control.options.cardView)
		this.PaintCard()
	else
		this.PaintTable();
};

GridPainter.prototype.PaintTable = function() {
	var grid = this.Control;
	
	var container = this.ContentContainer = CreateElement("div", this.Control.container, "", "grid" + " grid-" + this.GetParam("css", ""))
		.attr("opt-view", "table")
		.attr("opt-scroll", defaultValue(grid.options.horzScroll, false) ? "1": "0")

	this.subHeader = CreateElement("div", container).attr("grid-sec", "sub-header");
	if(defaultValue(this.Control.options.showToolbar, false)
		this.CreateToolbar(this.subHeader)
	else
		this.subHeader.css("height", 0);
		
	this.subContent = CreateElement("div", container).attr("grid-sec", "sub-content");
	
	this.PaintSubFooter(this.subFooter = CreateElement("div", container).attr("grid-sec", "sub-footer"));
	
	this.subContent.css("height", ("Calc(100% - {0}px)").format(this.subFooter.outerHeight()+this.subHeader.outerHeight()));

	this.updateScrolls = [];
	this.ComputeColumnWidth(this.subContent.outerWidth());
	
	if(this.Control.options.showBand) this.Control.CreateDefaultBands();
	if(this.Control.options.showHeader) this.PaintHeader(this.header = CreateElement("div", this.subContent).attr("grid-sec", "header"), "none");
	this.PaintContent(this.content = CreateElement("div", this.subContent).attr("grid-sec", "content"), "none");
	this.PaintFooter(this.footer = CreateElement("div", this.subContent).attr("grid-sec", "footer"), "none");
	
	if(this.Control.options.horzScroll)
		this.PaintFixedColumns(this.fixedLeft = CreateElement("div", this.subContent).attr("grid-sec", "fixed-left"));
	
	if(this.header)
		this.content.css("height", ("Calc(100% - {0}px)").format(this.header.outerHeight()+this.footer.outerHeight())
	else
		this.content.css("height", ("Calc(100% - {0}px)").format(this.footer.outerHeight());
	
	if(!this.Control.options.horzScroll && this.header) {
		this.header.css("padding-right", desktop.scrollbarWidth)
	};
	
	if(this.Control.options.horzScroll) {
		this.content.data("painter", this); // use in scrolling event callback
		this.content.scroll(function(e) {
			for(var i = 0; i < $(this).data("painter").updateScrolls.length; i++) {
				$(this).data("painter").updateScrolls[i].trigger("updatescroll", [$(this)]);
			};
		});
	};
	
	if(this.Control.options.autoScroll) {
		var width = this.ActualColumnsWidth() + $("#navigator-container").outerWidth();
		
		var self = this;
		var mqlHandler = function(mql, init) {
			if(mql.matches && !grid.options.horzScroll) {
				self.ShowHorzScroll(true);
			} else if(!mql.matches && grid.options.horzScroll) {
				self.ShowHorzScroll(false);
			}
		};
		
		var mql = window.matchMedia(("(min-width: 0px) and (max-width: {0}px)").format(width));
		mql.addListener(mqlHandler);
		
		mqlHandler(mql, true);
	};
	
	this.SetContainer(container);
};

GridPainter.prototype.PaintCard = function() {
	var grid = this.Control;
	
	var container = this.ContentContainer = CreateElement("div", this.Control.container, "", "grid" + " grid-" + this.GetParam("css", ""))
		.attr("opt-view", "card")
		.attr("opt-scroll", defaultValue(grid.options.horzScroll, "false") ? "1": "0")
		
	this.subHeader = CreateElement("div", container).attr("grid-sec", "sub-header");
	if(defaultValue(this.Control.options.showToolbar, false)
		this.CreateToolbar(this.subHeader)
	else
		this.subHeader.css("height", 0);
		
	this.subContent = CreateElement("div", container).attr("grid-sec", "sub-content");
	this.PaintSubFooter(this.subFooter = CreateElement("div", container).attr("grid-sec", "sub-footer"));
	
	this.subContent.css("height", ("Calc(100% - {0}px)").format(this.subFooter.outerHeight()+this.subHeader.outerHeight()));

	this.updateScrolls = [];
	this.ComputeColumnWidth(this.subContent.outerWidth());
	
	if(this.Control.options.showBand) this.Control.CreateDefaultBands();
	if(this.Control.options.showHeader) this.PaintHeader(this.header = CreateElement("div", this.subContent).attr("grid-sec", "header"), "none");
	this.PaintContent(this.content = CreateElement("div", this.subContent).attr("grid-sec", "content"), "none");
	this.PaintFooter(this.footer = CreateElement("div", this.subContent).attr("grid-sec", "footer"), "none");
	
	// if(this.Control.options.horzScroll)
		// this.PaintFixedColumns(this.fixedLeft = CreateElement("div", this.subContent).attr("grid-sec", "fixed-left"));

	if(this.header)
		this.content.css("height", ("Calc(100% - {0}px)").format(this.header.outerHeight()+this.footer.outerHeight())
	else
		this.content.css("height", ("Calc(100% - {0}px)").format(this.footer.outerHeight());
	
	if(!this.Control.options.horzScroll && this.header) {
		this.header.css("padding-right", desktop.scrollbarWidth)
	};
	
	// if(this.Control.options.horzScroll) {
		// this.content.data("painter", this); // use in scrolling event callback
		// this.content.scroll(function(e) {
			// for(var i = 0; i < $(this).data("painter").updateScrolls.length; i++) {
				// $(this).data("painter").updateScrolls[i].trigger("updatescroll", [$(this)]);
			// };
		// });
	// };
	
	// if(this.Control.options.autoScroll) {
		// var width = this.ActualColumnsWidth() + $("#navigator-container").outerWidth();
		
		// var self = this;
		// var mqlHandler = function(mql, init) {
			// if(mql.matches && !grid.options.horzScroll) {
				// self.ShowHorzScroll(true);
			// } else if(!mql.matches && grid.options.horzScroll) {
				// self.ShowHorzScroll(false);
			// }
		// };
		
		// var mql = window.matchMedia(("(min-width: 0px) and (max-width: {0}px)").format(width));
		// mql.addListener(mqlHandler);
		
		// mqlHandler(mql, true);
	// };
	
	// this.SetContainer(this.subContent);
	this.SetContainer(container);
};

GridPainter.prototype.TableView = function() {
	this.Control.options.cardView = false;
	this.Control.ClearColumns();
	this.Control.Events.OnInitColumns.trigger();
	this.ContentContainer.remove();
	this.PaintTable();
};

GridPainter.prototype.ChangeView = function(cardView) {
	this.Control.options.cardView = cardView;
	this.Control.ClearColumns();
	this.Control.Events.OnInitColumns.trigger();
	this.ContentContainer.attr("opt-view", cardView ? "card": "table");
	var grid = this.Control;

	this.subContent.html("");
	this.subFooter.html("");
	this.PaintSubFooter(this.subFooter.html(""));
	
	this.subContent.css("height", ("Calc(100% - {0}px)").format(this.subFooter.outerHeight()+this.subHeader.outerHeight()));
	this.updateScrolls = [];
	this.ComputeColumnWidth(this.subContent.outerWidth());
	
	if(this.Control.options.showBand) this.Control.CreateDefaultBands();
	this.PaintHeader(this.header = CreateElement("div", this.subContent).attr("grid-sec", "header"), "none");
	this.PaintContent(this.content = CreateElement("div", this.subContent).attr("grid-sec", "content"), "none");
	this.PaintFooter(this.footer = CreateElement("div", this.subContent).attr("grid-sec", "footer"), "none");
	
	if(this.Control.options.horzScroll)
		this.PaintFixedColumns(this.fixedLeft = CreateElement("div", this.subContent).attr("grid-sec", "fixed-left"));
	
	if(this.header)
		this.content.css("height", ("Calc(100% - {0}px)").format(this.header.outerHeight()+this.footer.outerHeight())
	else
		this.content.css("height", ("Calc(100% - {0}px)").format(this.footer.outerHeight());
	
	if(!this.Control.options.horzScroll && this.header) {
		this.header.css("padding-right", desktop.scrollbarWidth)
	};
	
	if(this.Control.options.horzScroll) {
		this.content.data("painter", this); // use in scrolling event callback
		this.content.scroll(function(e) {
			for(var i = 0; i < $(this).data("painter").updateScrolls.length; i++) {
				$(this).data("painter").updateScrolls[i].trigger("updatescroll", [$(this)]);
			};
		});
	};

	if(!cardView) {
		if(this.Control.options.autoScroll && !this.Control.options.autoScrollInit) {
			this.Control.options.autoScrollInit = true;
			var width = this.ActualColumnsWidth() + $("#navigator-container").outerWidth();
			
			var self = this;
			var mqlHandler = function(mql, init) {
				if(mql.matches && !grid.options.horzScroll) {
					self.ShowHorzScroll(true);
				} else if(!mql.matches && grid.options.horzScroll) {
					self.ShowHorzScroll(false);
				}
			};
			
			var mql = window.matchMedia(("(min-width: 0px) and (max-width: {0}px)").format(width));
			mql.addListener(mqlHandler);
			
			mqlHandler(mql, true);
		};
	};
};

GridPainter.prototype.ShowHorzScroll = function(visible) {
	this.Control.options.horzScroll = visible;
	var grid = this.Control;
	
	this.subContent.html("");
	this.subFooter.html("");
	this.PaintSubFooter(this.subFooter.html(""));
	
	this.subContent.css("height", ("Calc(100% - {0}px)").format(this.subFooter.outerHeight()+this.subHeader.outerHeight()));
	this.updateScrolls = [];
	this.ComputeColumnWidth(this.subContent.outerWidth());
	// alerts(this.ActualColumnsWidth(this.subContent.outerWidth()));
	
	// if(this.Control.options.showBand) this.Control.CreateDefaultBands();
	this.PaintHeader(this.header = CreateElement("div", this.subContent).attr("grid-sec", "header"), "none");
	this.PaintContent(this.content = CreateElement("div", this.subContent).attr("grid-sec", "content"), "none");
	this.PaintFooter(this.footer = CreateElement("div", this.subContent).attr("grid-sec", "footer"), "none");
	
	if(this.Control.options.horzScroll)
		this.PaintFixedColumns(this.fixedLeft = CreateElement("div", this.subContent).attr("grid-sec", "fixed-left"));
	
	if(this.header)
		this.content.css("height", ("Calc(100% - {0}px)").format(this.header.outerHeight()+this.footer.outerHeight())
	else
		this.content.css("height", ("Calc(100% - {0}px)").format(this.footer.outerHeight());
	
	if(!this.Control.options.horzScroll && this.header) {
		this.header.css("padding-right", desktop.scrollbarWidth)
	};
	
	if(this.Control.options.horzScroll) {
		this.content.data("painter", this); // use in scrolling event callback
		this.content.scroll(function(e) {
			for(var i = 0; i < $(this).data("painter").updateScrolls.length; i++) {
				$(this).data("painter").updateScrolls[i].trigger("updatescroll", [$(this)]);
			};
		});
	};
};

GridPainter.prototype.RepaintContent = function() {
	var grid = this.Control;
	this.PaintContent(this.content.html(""), "none");
	if(this.header)
		this.content.css("height", ("Calc(100% - {0}px)").format(this.header.outerHeight()+this.footer.outerHeight())
	else
		this.content.css("height", ("Calc(100% - {0}px)").format(this.footer.outerHeight());
	
	if(!this.Control.options.cardView) {
		if(this.Control.options.horzScroll) {
			this.PaintContent(this.fixedContent.html(""), "left");
			this.fixedFooter.css("top", desktop.scrollbarWidth);
			if(this.header)
				this.fixedContent.css("height", ("Calc(100% - {0}px)").format(this.header.outerHeight())
			else
				this.fixedContent.css("height", "100%")
		};
	};
	
	this.Control.Events.AfterRepainContent.trigger();
};

GridPainter.prototype.ComputeFixedColumns = function(float) {
	var w = 0;
	this.Control.EachColumn(function(i, column) {
		if(column.float == float) w += column.width;
	});
	
	return w;
}

GridPainter.prototype.ActualColumnsWidth = function() {
	var total = 0;
	this.Control.EachColumn(function(i, column) {
		total += column.width;
	});
	
	return total;
};

GridPainter.prototype.ComputeColumnWidth = function(width) {
	var total = 0;
	// width is the width of the grid, must be already determine prior to calling this method
	if(this.Control.options.horzScroll) {
		this.Control.EachColumn(function(i, column) {
			column.calcWidth = column.width + "px";
			total += column.width;
		});
	} else {
		var fixWidths = 0;
		this.Control.EachColumn(function(i, column) {
			if(column.fixedWidth) {
				column.calcWidth = column.width + "px";
				fixWidths++;
			};
		})
		
		// pass 1
		this.Control.EachColumn(function(i, column) {
			if(!column.fixedWidth) {
				column.calcWidth = column.width / width * 100;
				total += column.calcWidth;
			}
		})

		// pass 2
		var excess = (100 - total) / (this.Control.Count()-fixWidths);
		this.Control.EachColumn(function(i, column) {
			if(!column.fixedWidth) {
				column.calcWidth = column.calcWidth + excess + "%";
			}
		})
	};
	
	return total;
};

GridPainter.prototype.CreateToolbar = function(container) {
	var toolbarContainer = CreateElement("div", container)
		.attr("grid-sec", "toolbar-container")
		// .css("height", defaultValue(this.Control.options.toolbarSize, 34));
	
	if(this.Control.options.toolbarSize == 16)
		toolbarContainer.css("height", 25)
	else
		toolbarContainer.css("height", 34);		
		
	this.toolbar = new JToolbar({
			// id: "tb",
			// container: container,
			container: toolbarContainer,
			css: "toolbar",
			// theme: "default",
			theme: this.Control.options.toolbarTheme,
			buttonSize: this.Control.options.toolbarSize
			// Css: "toolbar",
			// Css: this.ToolbarCss,
			// Page: this,
			// Painter: {
				// buttonPainterClass: ToolbuttonPainter
			// }
	});
	
	// simpleSearch
	this.Control.Events.OnInitToolbar.trigger(this.toolbar);
};

GridPainter.prototype.CreateTable = function(container, location, float) {
	var table = CreateElement("table", container)
		.attr("grid-sec", location)
		.attr("border", 0)
		.attr("cellspacing", 0)
		.attr("cellspacing", 0)
	
	table.css("width", "100%");
	
	var innerHeader = CreateElement("thead", table).attr("grid-sec", "inner-header");
	var innerRow = CreateElement("tr", innerHeader)
	this.Control.EachColumn(function(i, column) {
		if((column.float == float || float == "none") {
			var th = CreateElement("th", innerRow)
				.css("width", column.calcWidth)
				
			if(column.fixedWidth) {
				th.css("min-width", column.calcWidth).css("max-width", column.calcWidth)
			};
		};
	});
	
	if(this.Control.options.horzScroll && location == "headers") {
		var th = CreateElement("th", innerRow).css("width", desktop.scrollbarWidth)
	};
	
	return table;
};

GridPainter.prototype.PaintTableBand = function(container, float, summary) {
	var grid = this.Control;
	
	if(float == "left") {
		var level;
		for(level = 0; level <= this.Control.bandLevels; level++) {
			var headerRow = CreateElement("tr", container);
			$(this.Control.bands).each(function(x, band) {
				if(band.HasFixedColumns(float) {
					if(band.level == level) {
						band.grid.lastLeftCell = band.cell = CreateElement("th", headerRow)
							.html(band.getCaption())
							
						band.cell.attr("colspan", band.ColCount());
						if(band.RowCount() == 0 && band.level < band.grid.bandLevels) {
							band.cell.attr("rowspan", band.grid.bandLevels+1-band.level);
						};
					};
				} else {
					if(band.level == level) {
						band.grid.lastLeftCell.attr("lband", "1");
						band.grid.leftExtraCell = CreateElement("th", headerRow)
							.html(".")
					};
				}
			});
		};
	};
	
	if(float == "none") {
		var level;
		for(level = 0; level <= this.Control.bandLevels; level++) {
			var headerRow = CreateElement("tr", container);
			$(this.Control.bands).each(function(x, band) {
				if(band.level == level) {
					band.cell = CreateElement("th", headerRow)
						.html(band.getCaption())
						
					band.cell.attr("colspan", band.ColCount());
					if(band.RowCount() == 0 && band.level < band.grid.bandLevels) {
						band.cell.attr("rowspan", band.grid.bandLevels+1-band.level);
					};
				};
			});
		};
	};
};

GridPainter.prototype.PaintHeaderCommandCell = function(column, cell) {
	var grid = column.grid;
	
	cell.html("");
	cell.attr("command", column.command);
	// CreateElement("a", cell);
	
	// we allow mouse click on select header
	if(column.command == "select") {
		// CreateElement("a", cell);
		desktop.GetSvg(cell, "db-un"+column.command)
		
		cell.click(function() {
			var selections = $(this).attr("has-selections");
			var key = grid.dataset.primaryKey;
			if(selections == "some") {
				grid.dataset.each(function(dataRow, i)) {
					var id = dataRow[key].toString();
					var index = grid.selections.indexOf(id);
					if(index == -1) {
						grid.selections.push(id);
					}
				});
			} else if(selections == "all") {
				grid.dataset.each(function(dataRow, i)) {
					var id = dataRow[key].toString();
					var index = grid.selections.indexOf(id);
					if(index > -1) {
						grid.selections.splice(index, 1);
					}
				});
			} else {
				grid.dataset.each(function(dataRow, i)) {
					var id = dataRow[key].toString();
					var index = grid.selections.indexOf(id);
					if(index == -1) {
						grid.selections.push(id);
					}
				});
			}
			
			grid.Events.OnSelect.trigger(grid.selections);
			grid.Painter.RepaintContent();
		})
	} else {
		// cell.html(column.command)
		// desktop.GetSvg(cell, "db-"+column.command)
		var header;
		if(column.internal) 
			header = desktop.GetSvg(cell, "db-"+column.command)
		else {
			var icon = column.grid.Methods.call("getCommandIcon", column);			
			if(icon) {
				header = desktop.GetSvg(cell, icon).data("column", column);
			};
		};
		
		if(header) {
			column.headerCell = header;
			var hint = column.grid.Methods.call("getCommandHint", column);
			if(hint) desktop.SetHint(header, hint, "top")
		};
	}
};

GridPainter.prototype.PaintHeaderCell = function(column, cell) {
	var grid = column.grid;
		
	if(column.command) {
		this.PaintHeaderCommandCell(column, cell);
	} else {
		var table = CreateElement("table", cell).attr("grid-sec", "column-header-table")
			.attr("cellspacing", 0)
			.attr("border", 0)
			
		var r = CreateElement("tr", table);
		var c = CreateElement("td", r)
			.html(column.getCaption())
		
		if(column.allowSort) {
			var s = CreateElement("td", r)
				.css("width", 13)
				.css("min-width", 13)
				.css("max-width", 13)
				.attr("grid-sec", "btn-sort")
				.attr("sort-order", "");
				
			var order = "";
			if(grid.dataParams.get("sort") == column.id) {
				order = grid.dataParams.get("order");
				s.attr("sort-order", order);
			};
				
			
			// desktop.GetSvg(s, "db-sortup").attr("sort", "asc").attr("sorted", order == "asc" ? 1: 0)
			// desktop.GetSvg(s, "unfold-more").attr("sorted", order == "asc" ? 1: 0)
			var icon = function(order) {
				if(order == "asc")
					return "db-sortup"
				else if(order == "desc")
					return "db-sortdown"
				else
					return "unfold-more";
			};
			
			// var icon = "unfold-more";
			// if(order == "asc")
				// icon = "db-sortup"
			// else if(order == "desc")
				// icon = "db-sortdown";
			
			var clickSort = function() {
				var sorted = $(this).attr("sorted");
				if(sorted == "" || sorted == "desc") 
					sort($(this), "asc")
				else 
					sort($(this), "desc");
			};
			
			desktop.GetSvg(s, icon(order)).attr("sorted", order).click(clickSort);

			var sort = function(e, order) {
				var b = e.parent();

				var row = b.closest("thead[grid-sec='header'] > tr");
				row.find("td[sort-order]").attr("sort-order", "");
				row.find("svg[sorted='asc']").each(function(e) {
					desktop.GetSvg($(this).html("").attr("sorted", ""), "unfold-more");
				});
				row.find("svg[sorted='desc']").each(function(e) {
					desktop.GetSvg($(this).html("").attr("sorted", ""), "unfold-more");
				});
				
				b.attr("sort-order", order);
				e.attr("sorted", order);
				
				var rowID = grid.dataset.getKey();
				grid.dataParams.set("sort", column.id);
				grid.dataParams.set("order", order);
				
				if(grid.optionsData.cache) {
					// console.log(("{0}, {1}").format(column.id, order))
					// console.log(column)
					var cacheDataset = desktop.cacheDataset.get(grid.optionsData.url);
					grid.LocalSort(column.id, order)
				} else {
					grid.Refresh(function() {
						grid.Painter.GotoRow(rowID);
					});
				}
				
				desktop.GetSvg(e.html(""), icon(order)).attr("sorted", order).click(clickSort);
			};
			
			// var order = "";
			// if(grid.dataParams.get("sort") == column.id) {
				// order = grid.dataParams.get("order");
				// s.attr("sort-order", order);
			// };
			
			// desktop.GetSvg(s, "db-sortup").attr("sort", "asc").attr("sorted", order == "asc" ? 1: 0)
				// .click(function() {
					// if($(this).attr("sorted") == "0") sort($(this), "asc");
				// });
				
			// desktop.GetSvg(s, "db-sortdown").attr("sort", "desc").attr("sorted", order == "desc" ? 1: 0)
				// .click(function() {
					// if($(this).attr("sorted") == "0") sort($(this), "desc");
				// });
		};
	};
	
	if(column.drawHeader) column.drawHeader(cell, column);
};

/*
GridPainter.prototype.PaintHeaderCell2 = function(column, cell) {
		var grid = column.grid;
		var table = CreateElement("table", cell).attr("grid-sec", "column-header-table")
			.attr("cellspacing", 0)
			.attr("border", 0)
			
		var r = CreateElement("tr", table);
		var c = CreateElement("td", r)
			.html(column.getCaption())
		
		// var cell1 = CreateElement("div", table)
			// .css("display", "table-cell")
			// .html(column.getCaption())
		
		if(column.allowSort) {
			var order = "";
			if(grid.dataParams.get("sort") == column.id) {
				order = grid.dataParams.get("order");
			}

			var s = CreateElement("td", r)
				.css("width", 13)
				.css("min-width", 13)
				.css("max-width", 13)
				
			var sortContainer = CreateElement("div", s).attr("grid-sec", "btn-sort")
				.click(function() {
					var b = $(this);
					var order = defaultValue($(this).attr("sort-order"), "");
					if(order == "" || order == "desc")
						order = "asc"
					else if(order == "asc")
						order = "desc";
					
					// var row = b.closest("tr");
					var row = b.closest("thead[grid-sec='header'] > tr");
					row.find("span[sort-order]").removeAttr("sort-order");
					row.find("div[sort-order]").removeAttr("sort-order");
					
					b.attr("sort-order", order);
					b.find("span").attr("sort-order", order);

					var rowID = grid.dataset.getKey();
					grid.dataParams.set("sort", column.id);
					grid.dataParams.set("order", order);
					grid.Refresh(function() {
						grid.Painter.GotoRow(rowID);
					});
				});

			// desktop.GetSvg(sortContainer, "db-sort", 16);
			var img = CreateElement("span", sortContainer);
			if(order !== "") {					
				img.attr("sort-order", order);
				sortContainer.attr("sort-order", order);
			};
		};
			
		if(column.command) {
			this.PaintHeaderCommandCell(column, cell);
		};
		
		if(column.drawHeader) column.drawHeader(cell, column);
};
*/

GridPainter.prototype.PaintTableSummaryContent = function(container, float) {
	var grid = this.Control;
	var header = CreateElement("thead", container).attr("grid-sec", "header");
	var headerRow = CreateElement("tr", header);

	this.Control.EachColumn(function(i, column) {
		if((column.float == float || float == "none") {
			var cell = CreateElement("th", headerRow)
				
			if(!column.command && column.showSummary) {
				if(column.showSummary) {
					cell.html(grid.options.summaryDataset.text(column.fname));
					var dataColumn = grid.options.summaryDataset.Columns.get(column.fname);
					if(dataColumn.numeric && dataColumn.type == "money") {
						cell.attr("format", "numeric")
					};
				};
			};
		};
	});
}

GridPainter.prototype.PaintTableHeaderContent = function(container, float) {
	var grid = this.Control;
	var header = CreateElement("thead", container).attr("grid-sec", "header");
	
	if(this.Control.options.showBand) {
		this.PaintTableBand(header, float);
	};

	var headerRow = CreateElement("tr", header);

	this.Control.EachColumn(function(i, column) {
		if((column.float == float || float == "none") {
			var cell = CreateElement("th", headerRow)
				// .html(column.getCaption())
			
			grid.Painter.PaintHeaderCell(column, cell);
		};
	});
}

GridPainter.prototype.PaintHeader = function(container, float) {
	this.PaintColumHeaders(container, float);
}

GridPainter.prototype.PaintColumHeaders = function(container, float) {
	var columHeader = CreateElement("div", container).attr("grid-sec", "headers-container");
	var tableHeader = this.CreateTable(columHeader, "headers", float);
	
	if(float == "none") {
		this.columHeader = columHeader;
		this.tableHeader = tableHeader;
		
		this.updateScrolls.push(columHeader);
		columHeader.on("updatescroll", function(e, source) {
			$(this).scrollLeft(source.scrollLeft());
		});
	}
	
	this.PaintTableHeaderContent(tableHeader, float);
}

GridPainter.prototype.AddCardCommand = function(cardContainer, toolBar, command) {
	var cell = CreateElement("li", toolBar).attr("card-sec", "btn");
	var column = {command: command, grid:this.Control};
	cell.attr("command", command).data("column", column);
	var a = CreateElement("a", cell);
	cell.on("click", function() {
		var id = $(this).closest("div[grid-sec='card']").attr("row-id");
		var col = $(this).data("column");
		col.grid.Events.OnCommand.trigger({
			id: id,
			command: col.command,
			element: $(this)
		});
	});
	
	if(column.command == "select") {
		var id = cardContainer.attr("row-id");
		var index = column.grid.selections.indexOf(id);
		if(index > -1) cardContainer.attr("row-selected", 1);
	};
};

GridPainter.prototype.PaintCardContent = function(container) {
	container.attr("grid-sec", "card");
	if(this.Control.options.simpleCardView) {
		var content = CreateElement("div", container).attr("card-sec", "content");
	} else {
		var inner = CreateElement("div", container).attr("card-sec", "inner");
		if(this.Control.options.showCardToolbar) {
			var toolbar = CreateElement("div", inner).attr("card-sec", "command-bar");
			var ul = CreateElement("ul", toolbar).attr("card-sec", "toolbar");
			
			if(this.Control.options.showSelection) this.AddCardCommand(container, ul, "select");
			if(this.Control.Methods.call("canEdit") && this.Control.crud.edit) this.AddCardCommand(container, ul, "edit");
			if(this.Control.Methods.call("canDelete") && this.Control.crud["delete"]) this.AddCardCommand(container, ul, "delete");
		};
		
		// this.Control.EachColumn(function(i, column) {
			// if(column.command) {
				// var cell = CreateElement("li", ul).attr("card-sec", "btn");
				// cell.attr("command", column.command).data("column", column);
				// var a = CreateElement("a", cell);
				// cell.on("click", function() {
					// var id = $(this).closest("div[grid-sec='card']").attr("row-id");
					// var col = $(this).data("column");
					// col.grid.Events.OnCommand.trigger({
						// id: id,
						// command: col.command,
						// element: $(this)
					// });
				// });
				
				// if(column.command == "select") {
					// var id = container.attr("row-id");
					// var index = column.grid.selections.indexOf(id);
					// if(index > -1) container.attr("row-selected", 1);
				// };
			// };
		// });
			
		
		var content = CreateElement("div", inner).attr("card-sec", "content");
		if(!this.Control.options.showCardToolbar) {
			content.css("width", "100%")
		};
	};
	
	this.Control.Events.OnInitCard.trigger(content);
};

GridPainter.prototype.PaintTableContent = function(container, float) {
	this.Control.Events.OnInitRow.trigger(container);
	this.Control.EachColumn(function(i, column) {
		if(column.float == float || float == "none") {
			var cell = CreateElement("td", container);
				
			if(column.command && column.grid.Methods.call("allowCommand", column)) {
				cell.attr("command", column.command);
				
				var a;
				if(column.command == "select") {
					var id = container.attr("row-id");
					var index = column.grid.selections.indexOf(id);
					if(index > -1)  {
						container.attr("row-selected", 1);
						a = desktop.GetSvg(cell, "db-"+column.command).data("column", column);
					} else {
						a = desktop.GetSvg(cell, "db-un"+column.command).data("column", column);
					};

					a.on("click", column.grid.ClickCommand);
				} else {
					// if(!column.drawContent) {
						// console.log(column)
					if(column.internal) {
						var a = desktop.GetSvg(cell, "db-"+column.command).data("column", column);
						a.on("click", column.grid.ClickCommand);
					} else {
						var icon = column.grid.Methods.call("getCommandIcon", column);
						if(icon) {
							var a = desktop.GetSvg(cell, icon).data("column", column);
							a.on("click", column.grid.ClickCommand);
						};
					};
				};
				
				if(a) {
					var hint = column.grid.Methods.call("getCommandHint", column);
					a.data("hintTarget", column.headerCell);
					if(hint) desktop.SetHint(a, hint, "top")
					// if(hint) desktop.SetHint(column.headerCell, hint, "top")
				};
				
			} else {
				cell.html(column.getValue());
				if(column.numeric()) cell.attr("format", "numeric");
			};
			
			if(column.drawContent) column.drawContent(cell, column);
		};
	});
};

GridPainter.prototype.PaintContent = function(container, float) {
	if(this.Control.options.cardView) {
		this.PaintCardContentData(container);
	} else {
		var tableContent = this.CreateTable(container, "content", float);

		if(float == "none")
			this.tableContent = tableContent;
		
		this.PaintContentData(tableContent, float);
	};	
};

GridPainter.prototype.PaintContentData = function(container, float) {
	for (var r = 0; r < 100; r++) { 		
		this.PaintTableContent(CreateElement("tr", container), float);
	}	
};

GridPainter.prototype.PaintCardContentData = function(container) {
	for (var r = 0; r < 100; r++) { 		
		this.PaintCardContent(CreateElement("div", container))
	}	
};

GridPainter.prototype.PaintFixedColumns = function(container) {
	this.PaintHeader(this.fixedHeader = CreateElement("div", container).attr("grid-sec", "fixed-header"), "left");
	this.PaintContent(this.fixedContent = CreateElement("div", container).attr("grid-sec", "fixed-content"), "left");
	this.PaintFooter(this.fixedFooter = CreateElement("div", container).attr("grid-sec", "fixed-footer"), "left");
		
	container.css("width", this.ComputeFixedColumns("left"));
	container.css("height", ("Calc(100% - {0}px)").format(this.footer.outerHeight()+desktop.scrollbarWidth);

	this.fixedFooter.css("top", desktop.scrollbarWidth);
	// this.fixedContent.css("height", ("Calc(100% - {0}px)").format(this.header.outerHeight());
	if(this.header)
		this.fixedContent.css("height", ("Calc(100% - {0}px)").format(this.header.outerHeight())
	else
		this.fixedContent.css("height", "100%");

	this.updateScrolls.push(this.fixedContent);
	this.fixedContent.on("updatescroll", function(e, source) {
		$(this).scrollTop(source.scrollTop());
	});
	
	if(this.fixedHeader && this.header) {
		var ct = this.header.find("thead[grid-sec='header']"); // content table
		var ft = this.fixedHeader.find("thead[grid-sec='header']"); // fixed table
		var cta = [], fta = [];
		
		// >tr, return only direct TR of THEAD
		if(ft) {
			ct.find(">tr").each(function(i, tr) {
				cta.push(tr);
			});
			ft.find(">tr").each(function(i, tr) {
				fta.push(tr);
			});
			
			var i = 0;
			for(i = 0; i < fta.length; i++) {
				var f = $(fta[i]);
				var c = $(cta[i]);
				
				if(f.outerHeight() < c.outerHeight()) {
					f.css("height", c.outerHeight())
				}
			}
		}
	}
	// alerts(cta, fta);
	// alerts(ct.find(">tr").length, ft.find(">tr").length);
	// alerts(this.header, this.fixedHeader);
	// alerts(ct, ft);
	
}

GridPainter.prototype.PaintSubFooter = function(container) {
	// container.css("height", 40);
	if(this.Control.options.showPager) {
		var pagerContainer = CreateElement("div", container).addClass("pager-container")
		this.Control.pager = new Pager({
			grid: this.Control,
			dataset: this.Control.dataParams,
			// rowsPerPage: this.Control.rowsPerPage,
			rowsPerPage: [25,50,75,100],
			// container: container.addClass("pager-container"),
			container: pagerContainer
			// Painter: {
				// painterClass: FlatPagerPainter
			// }
		});
		
		// this.pager.Update(1, 570, 27);
		this.Control.pager.Update();
		// this.pager.Update(this.Search.page, this.Search.row_count, this.Search.page_count);		
	};
}

GridPainter.prototype.PaintFooter = function(container, float) {
	if(this.Control.options.showSummary) {
		var columHeader = CreateElement("div", container).attr("grid-sec", "headers-container");
		var tableHeader = this.CreateTable(columHeader, "headers", float).attr("grid-loc", "footer");
		
		if(float == "none") {
			this.updateScrolls.push(columHeader);
			columHeader.on("updatescroll", function(e, source) {
				$(this).scrollLeft(source.scrollLeft());
			});
		}
		
		this.PaintTableSummaryContent(tableHeader, float);
		// this.PaintTableHeaderContent(tableHeader, float);
	};
}

GridPainter.prototype.ShowSearchInput = function(toolbar) {
	var grid = this.Control;
	if(grid.options.showAdvanceSearch) {
		// var btnImage = "/engine/images/magnifier-zoom-24.png";
		// if(grid.options.toolbarSize == 16)
			// btnImage = "/engine/images/magnifier-zoom.png";
		
		toolbar.NewDropdownItem({
			id: "search",
			// icon: btnImage,
			icon: "search",
			// iconColor: "#315B8F",
			iconColor: "#315B8F",
			// color: "#0754D0",
			color: "#315B8F",
			hint: "Advanced Search",
			align: "right",
			// dlgAlign: "right",
			onClose: function(dialog) {
				// alerts("onClose");
				grid.dataParams.unbindControls();
			},
			painter: {
				footer: function(dialog, container) {
					var btnSave = CreateButton({
						container: container,
						caption: "Start Search",
						// enabled: false,
						style: "green",
						click: function(button) {
							if(button.enabled)
								grid.Refresh();
						}
					});
					
					var btnClear = CreateButton({
						container: container,
						caption: "Clear",
						// enabled: false,
						style: "blue",
						click: function(button) {
							if(button.enabled)
								grid.dataParams.Events.OnClearSearch.trigger(grid);
								// grid.dataParams.clear();
							// self.Control.Hide();
						}
					});
					
					CreateButton({
						container: container,
						caption: "Close",
						enabled: true,
						style: "text",
						click: function(button) {
							dialog.Hide();
						}
					});
					
				},
				content: function(dialog, container) {
					container.css("width", grid.options.AdvanceSearchWidth);
					new FormEditor({
						id: "xxx",
						dataset: grid.dataParams,
						dialog: dialog,
						container: container,
						containerPadding: 0,
						fillContainer: true,
						pageControlTheme: "main",
						showToolbar: false,
						url: "",
						init: function(editor) {
							grid.Events.OnInitSearch.trigger(editor);
						}
					});
				}
			}
		});
	};
	
	if(grid.options.simpleSearch) {
		var c1 = CreateElement("div", toolbar.Painter.buttonContainer, "", "simple-search ss-theme-"+grid.options.toolbarTheme).attr("ss-size", grid.options.toolbarSize);
		var c2 = CreateElement("div", c1).attr("ss-sec", "search");
		this.searchInput = CreateElement("input", c2);
		var btn = CreateElement("div", c2).attr("ss-sec", "button");
		desktop.GetSvg(btn, "search", 20, {noTopMargin:true});
		// CreateElement("img", btn).attr("src", "/engine/images/magnifier-zoom.png");
		
		this.searchInput
		.focusin(function() {
			$(this).parent().attr("ss-focused", "1");
			// alerts($(this)[0])
		})
		.focusout(function(e) {
			$(this).parent().removeAttr("ss-focused")
		});

		this.searchInput.focus();
		this.searchInput.change(function() {
			grid.dataParams.set(grid.options.simpleSearchField, $(this).val());			
			if(grid.optionsData.cache) 
				grid.LocalFilter()
			else
				grid.Refresh();
		});
		
		
	};
};

//**************************************************************************************************
// DataGridPainter
//**************************************************************************************************
Class.Inherits(DataGridPainter, GridPainter);
function DataGridPainter(Control) {
	DataGridPainter.prototype.parent.call(this, Control);
};

DataGridPainter.prototype.classID = "DataGridPainter";

DataGridPainter.prototype.Paint = function() {
	this.Control.Events.OnInitRow.add(function(grid, row) {
		row.attr("row-id", grid.dataset.getKey());
		row.data("dataset", grid.dataset);
		row.on("click", function() {
			if(grid.options.lookup) 
				grid.ReturnLookupData($(this))
			else
				$(this).data("dataset").gotoKey($(this).attr("row-id"));
		});
	});

	DataGridPainter.prototype.parent.prototype.Paint.call(this); 
};

DataGridPainter.prototype.PaintCardContentData = function(container) {
	// for (var r = 0; r < 100; r++) { 		
		// this.PaintCardContent(CreateElement("div", container))
	// }	
	var dataset = this.Control.dataset;
	
	if(!dataset.empty()) {
		dataset.enableEvents = false;
		dataset.first();
		while (!dataset.eof()) {
			var key = dataset.get(dataset.primaryKey);
			var card = CreateElement("div", container);
			card.attr("row-id", key);
			this.PaintCardContent(card);
			dataset.next();
		};
		dataset.enableEvents = true;
		dataset.first();
	};
	
	if(this.Control.options.lookup) {
		container.css("cursor", "pointer");
	};
};

DataGridPainter.prototype.PaintContentData = function(container, float) {
	var self = this;
	var dataset = this.Control.dataset;
	// var filter = self.Control.dataParams.get(self.Control.options.simpleSearchField);
	var filter = self.Control.SimpleSearchText();
	// alerts(filter)
	var filtered = function(key) {
		if(!filter)
			return false
		else if(self.Control.optionsData.filtered.length == 0)
			return false
		else
			return self.Control.optionsData.filtered.indexOf(key) == -1;
	};
	
	if(!dataset.empty()) {
		dataset.enableEvents = false;
		dataset.first();
		var i = 0;
		while (!dataset.eof()) {
			var key = dataset.get(dataset.primaryKey);
			if(!filtered(key)) {
				var row = CreateElement("tr", container);
				row.attr("odd", (++i & 1) ? "1" : "0");
				// if(self.fixedContent) {
					row.hover(function(e) {
						var id = $(e.target).parent().attr("row-id");
						self.content.find(("tr[row-id='{0}']").format(id)).attr("hover", "1");
						if(self.fixedContent)
							self.fixedContent.find(("tr[row-id='{0}']").format(id)).attr("hover", "1");
						// self.fixedContent.find(("tr[row-id='{0}']").format(id)).css("background", "red");
						// $(e.target).parent().css("background", "red");
						// $(e.target).parent().attr("hover", "1");
					}, function(e) {
						var id = $(e.target).parent().attr("row-id");
						// self.fixedContent.find(("tr[row-id='{0}']").format(id)).css("background", "");
						self.content.find(("tr[row-id='{0}']").format(id)).removeAttr("hover");
						if(self.fixedContent)
							self.fixedContent.find(("tr[row-id='{0}']").format(id)).removeAttr("hover");
						// $(e.target).parent().css("background", "");
						// $(e.target).parent().removeAttr("hover");
					});
				// };
				
				this.PaintTableContent(row, float);
			};
			
			dataset.next();
		};
		dataset.first();
		self.FocusRow(dataset.getKey());
		dataset.enableEvents = true;
	};
	
	if(this.Control.options.lookup) {
		container.css("cursor", "pointer");
	};
}

DataGridPainter.prototype.GotoRow = function(id) {
	var row = this.tableContent.find(("tr[row-id='{0}'] td").format(id));
	// alerts(id, row)
	if(row.length > 0) {
		var topOffset = this.content[0].getBoundingClientRect().top;
		var top = row[0].getBoundingClientRect().top;	
		this.content.scrollTop(top-topOffset);
	};
	// this.content.scrollTop(25*153);
	// this.targetX = this.Control.target[0].getBoundingClientRect().left;
	// alerts(topOffset, top); // 4405
};

DataGridPainter.prototype.FocusRow = function(id) {
	if(this.Control.options.showFocused && !this.Control.options.cardView) {
		this.tableContent.find("tr[focused='1']").removeAttr("focused", 0);
		this.tableContent.find(("tr[row-id='{0}']").format(id)).attr("focused", 1);
		if(this.fixedContent) {
			// this.fixedContent.find("table[grid-sec='content'] tr[focused='1']").removeAttr("focused", 0);
			// this.fixedContent.find(("table[grid-sec='content'] tr[row-id='{0}']").format(id)).attr("focused", 1);
			this.fixedContent.find("tr[focused='1']").removeAttr("focused", 0);
			this.fixedContent.find(("tr[row-id='{0}']").format(id)).attr("focused", 1);
		};
	}
};

// DataGridPainter.prototype.ShowEditDialog = function(mode, getEditForm) {	
DataGridPainter.prototype.ShowEditDialog = function(params) {	
	var self = this;
	var title = defaultValue(this.Control.Methods.call("editTitle", params.mode));
	if(!title) {
		if(params.mode == "edit")
			title = "Edit"
		else if(params.mode == "new")
			title = "Add Record"
	};
// console.log(this.Control.options.editDialogWidth)
	this.Control.dataEdit.editDialog = this.Control.editDialog = new JEditDialog2({
		Target: this.container,
		ActivatingTarget: params.target,
		Modal: false,
		OnInit: function(dialog) {
			// alerts("OK") 
			dialog.editor.Events.OnPostSuccess.add(function(editor, info) {
				if(info)
					InfoDialog({
						// target: self.Control.toolbar.Element(),
						target: self.Control.toolbar.container,
						title: "Information",
						message: info,
						snap: "bottom",
						inset: false
					});
				self.Control.Refresh();
			});
		},
		Painter: {
			snap: "bottom",
			align: "",
			// width: 500,
			width: self.Control.options.editDialogWidth,
			inset: true,
			autoHeight: true,
			OnRenderContent: function(dialog, container) {
				var c = CreateElement("div", container)
					.css("width", "100%")
					// .css("background", "wheat");
					
				params.editForm(c, dialog);
			},
			OnRenderHeader: function(dialog, container) {
				container.html(title);
				new JDrag(container, container, {
					Moving: true,
					Sizing: false,
					SizeOffset: 1,
					AllowDrag: function(s) {
						return true;
					},
					AllowSize: function(s) {
						return false;
					},
					InitDrag: function(s, ready) {
						if(ready) {
							op = container.parent().parent().offset();
						}
					},
					Dragging: function(s, x, y, w, h) {
						container.parent().parent()
							.css("top", op.top+y)
							.css("left", op.left+x)
					},
					DragEnd: function(s) {
						// self.DisableFrame(false);
					}
				});
			}
		}
	});
};
/*
DataGridPainter.prototype.EditDialog2 = function(mode) {	
	var self = this;
	var title = defaultValue(this.Control.Methods.call("editTitle", mode));
	if(!title) {
		if(mode == "edit")
			title = "Edit"
		else if(mode == "new")
			title = "Add Record"
	};

	this.Control.dataEdit.editDialog = this.Control.editDialog = new JEditDialog({
		Target: this.container,
		Modal: false,
		Painter: {
			// painterClass: EditDialogPainter,
			snap: "bottom",
			align: "",
			width: 500,
			inset: true,
			autoHeight: true,
			OnInitTabs: function(editor) {
				self.Control.InitializeEditor(editor);
				
			},
			OnRenderContainer: function(dialog, container) {
				// alerts("OK");
			},
			OnRenderHeader: function(dialog, container) {
				container.html(title);
				var op;
				// new JDrag(this.ElementData("container"), this.Element(), {
				new JDrag(container, container, {
					Moving: true,
					Sizing: false,
					SizeOffset: 1,
					AllowDrag: function(s) {
						return true;
					},
					AllowSize: function(s) {
						// return !self.NoResize && !self.Maximized;
						return false;
					},
					InitDrag: function(s, ready) {
						if(ready) {
							op = container.parent().parent().offset();
							// alerts("ready");
							// self.DisableFrame(true)
						} else {
							// self.Activate();
						}
					},
					Dragging: function(s, x, y, w, h) {
						// var p = container.parent().offset();
						// container.html(("{0},{1},{2},{3}").format(x, y, p.left, p.top));
						container.parent().parent()
							.css("top", op.top+y)
							.css("left", op.left+x)
							
						// container.SetBounds(x, y, w, h);
					},
					DragEnd: function(s) {
						// self.DisableFrame(false);
					}
				});
			}
		}
	});
	
	this.Control.editDialog.grid = this.Control;
	this.Control.dataEdit.Events.OnChanged.add(function(dataset) {
		dataset.editDialog.DataChanged(dataset);
		// alerts("OK");
	});
};
*/
DataGridPainter.prototype.Busy = function(busy) {
	// console.log(busy)
	// if(this.busy ) {
	// if(this.busy && (busy == false || busy == undefined)) {
	if(this.busy || (busy == false && busy !== undefined)) {
		// console.log(busy)
		if(this.busy) this.busy.remove();
		this.busy = null;
	} else {		
		// this.busy = CreateElement("div", this.Control.container).addClass("busy")
		// desktop.GetSvg(this.busy, "refresh")
		
		this.busy = CreateElement("div", this.Control.container).addClass("busy")
		var innerContainer1 = CreateElement("div", this.busy).attr("x-sec", "inner-1"); //.addClass("busy-2")
		var innerContainer2 = CreateElement("div", innerContainer1).attr("x-sec", "inner-2"); //.addClass("busy-3")
			
		desktop.GetSvg(innerContainer2, "refresh")
	};
};function DefaultView(params, settings) {
	var requestParams = params.requestParams;
	// console.log(requestParams)
	return new JDBGrid({
		params: params,
		options: {
			horzScroll: true
		},
		toolbarTheme:"svg",
		Painter: {
			css: settings.css
		},
		editForm: function(id, container, dialog) {
			if(settings.initEdit) {
				var params = {
					id: id,
					container: container,
					containerPadding: 0,				
					showToolbar: false,
					pageControlTheme: "data-entry",
					fillContainer: true,
					dialog: dialog
				};
				
				settings.initEdit(params);
				
				if(settings.editProc) 
					settings.editProc(params)
			};
		},
		init: function(grid) {
			grid.Methods.add("deleteConfirm", function(grid, id) {
				return settings.deleteConfirm(grid, id);
			});
			
			grid.Events.OnInitGrid.add(function(grid) {
				grid.optionsData.url = settings.url;
				// if(params.requestParams)
					// grid.optionsData.url += "?"+ ObjectToRequestParams(params.requestParams);
				// grid.optionsData.url = name +"?"+ ObjectToRequestParams(params.requestParams);
				// grid.optionsData.masterDetail = params.masterDetail;
				grid.optionsData.masterDataset = params.masterDataset;
				// params.masterDataset.addMasterDetail(grid.optionsData.masterDataset)
				// console.log(params.masterDataset)
				grid.options.showToolbar = true;
				grid.options.horzScroll = false;
				grid.options.showPager = true;
				grid.options.showSummary = false;
				grid.options.cardView = false;
				grid.options.autoScroll = true;
				grid.options.allowSort = true;
				grid.options.showBand = false;
				grid.options.simpleSearch = true;
				grid.options.simpleSearchField = "filter";
				
				if(settings.initGrid)
					settings.initGrid(grid);
				
				grid.Events.OnInitRequestParams.add(function(grid, requestParams) {
					// console.log(requestParams)
					if(settings.initRequestParams)
						settings.initRequestParams(grid, requestParams);
				});
				
				grid.Events.OnInitDataRequest.add(function(grid, dataParams) {
					dataParams
						.addColumn("page", 1, {numeric:true})
						.addColumn("pagesize", 50, {numeric:true})
						.addColumn("sort", "")
						.addColumn("order", "")
						.addColumn("filter", "");
						
					if(settings.initSearch)
						settings.initSearch(grid, dataParams);
				});
				
				grid.Events.OnInitData.add(function(grid, data) {
					if(settings.initData)
						settings.initData(grid, data);
					
					if(grid.optionsData.masterDataset)
						if(settings.onMaterDatasetUpdate)
							grid.Events.OnInitRequestParams.add(function(grid, requestParams) {
								settings.onMaterDatasetUpdate(grid, requestParams);
							});
				});

				grid.Events.OnInitRow.add(function(grid, row) {	
					if(settings.initRow)
						settings.initRow(grid, row);
				});	
	
				grid.Methods.add("getCommandIcon", function(grid, column) {
					if(settings.getCommandIcon)
						return settings.getCommandIcon(grid, column)
					else
						return "";
				});
	
				grid.Methods.add("getCommandHint", function(grid, column) {
					if(settings.getCommandHint)
						return settings.getCommandHint(grid, column)
					else
						return "";
				});
				
				grid.Events.OnCommand.add(function(grid, params) {
					if(settings.onCommand)
						settings.onCommand(grid, params);
				});

				grid.Events.OnInitColumns.add(function(grid) {
					if(settings.initColumns)
						settings.initColumns(grid);
				});
			});
		}
	});	
};
// ****************************************************************************************************
// Last modified on
// 14-SEP-2014 ihms.0.0.0.1
// 10-OCT-2014 ihms.0.0.1.0
// 19-OCT-2014 ihms.0.0.1.1
// 09-NOV-2014 ihms.0.0.1.6
// 05-JAN-2014 ihms.0.0.1.8
// 06-FEB-2015 ihms.1.0.0.3 changed "Search" to "Start Search"
// ****************************************************************************************************
//**************************************************************************************************
// File name: dbsearch-dialog.js
//**************************************************************************************************
// SearchDialog = function(options) {
	// return new SearchDialogDefault(options);
// };

// SearchDialogFlat = function(options) {
// };

SearchDialog = function(options) {
	this.Page = options.page;
	// this.InitialTabIndex = options.tabIndex;
	this.Width = options.width;
	this.Toolbar = options.toolbar;
	this.dbSearch = options.dataset;
	this.Enabled = options.enabled;
	
	var self = this;
	var isFlat = this.Page.Version == 4;
	// alerts(this.Page.Version);
	
	this.Events = {};
	this.Events.OnInit = new EventHandler(this);
	this.Events.OnQuery = new EventHandler(this);
	this.Events.OnChangeTab = new EventHandler(this);

	this.Query = function() {
		self.Events.OnQuery.trigger(self);
	};

	// editor.data.Events.OnEditDialog.trigger(editor);
	this.Toolbar.NewItem({
		ID: "SEARCH",
		Title: "Search",
		Align: "right",
		Painter: {
			// color: "green",
			// caption: "Edit",
			dropdown: true,				
			modal: defaultValue(options.modal, true),
			// modal: false,
			// iconIndent: 4,
			iconIndent: isFlat ? 0 : 4,
			iconImage: this.Page.IconSearch,
			iconColor: "blue",
			dialogCss: "blue",
			// painterClass: defaultValue(item.params.Painter.painterClass, PopupOverlayPainter),
			// painterClass: ConfirmPulldownPainter,
			// painterClass: this.Page.DbmEnabled ? CustomPulldownPainter : PopupOverlayPainter,
			painterClass: isFlat ? CustomPulldownPainter : PopupOverlayPainter
		},
		OnClose: function() {
			self.dbSearch.unbindControls();
		},
		OnInitDropDown: function(dialog, container) {
			$(window).resize(function() {
				dialog.RePosition();
			});

			// alerts(self.Page.searchWidth);
			if(!isFlat)
				container.addClass("search-dialog");
				
			container
				.css("width", defaultValue(self.Width, 600)
				
			if(typeof desktop == "object") {
				container.css("z-index", ++desktop.zIndex);
			};
		},
		OnDropDown: function(dialog, container) {
			if(!isFlat) {
				container
					.css("border", "1px " + dialog.Color)
					.css("border-style", "none solid none solid")
					.css("background-color", "white")
					.css("height", "auto");
			};
			
			new JTabbedEdit({
					page: self.Page,
					data: self.dbSearch,
					container: container,
					fluid: true,
					tabHeight: 32+6,
					css: isFlat ? "edit-search-dbm" : "editor-search",
					pgcss: isFlat ? "pg-search-dbm" : "pg-search",
					events: {
						init: function(editor) {
							// create a function where we can set the width of the dialog
							editor.setWidth = function(w) {
								dialog.Painter.MainContainer.css("width", w);
							};
							
							editor.data.Events.OnEditDialog.trigger(editor);
						},
						afterInit: function(editor) {
							self.Events.OnInit.trigger(editor);

							if(editor.pg.TabCount() <= 1) {
							// if(editor.pg.TabCount()) { // <= 1 && !isFlat) {
								editor.pg.Painter.TabsContainer.css("position", "");
								container.css("height", "auto");
								container.find("div[pg-section='contents']").css("padding", 10);

								container.find("div[edit-style='simple']")
									.removeClass("editor-search-table-container")
									.addClass("editor-search-container-full-border")
									
								container.find("div[edit-style='nav']")
									.removeClass("editor-search-container-full-border")
									
								container.find("div[class='editor-search-group'][pos='last']")
									.css("border-style", "none")
							};
						},
						changeTab: function(editor, tab) {
							if(!isFlat) {
								tab.GetTab().find("div[edit-style='simple']")
									.removeClass("editor-search-table-container")
									.addClass("editor-search-container-full-border")
									
								tab.GetTab().find("div[edit-style='nav']")
									.removeClass("editor-search-container-full-border")
									
								tab.GetTab().find("div[class='editor-search-group'][pos='last']")
									.css("border-style", "none")
									
									tab.GetTab().find(".editor-search-table")
										.keypress(function(e){
											if(e.which == 13) {
												if($(event.target).is("input") {
													var binding = $(event.target).data("binding");
													if(binding !== undefined) {
														$(event.target).trigger("change");
														self.Query();
														e.preventDefault();
													};
												};
											};
										});	
							};
							
							container.css("height", 10*2+6 + editor.pg.TabHeight + $(tab.Painter.Tab.find("div")[0]).outerHeight());
							self.Events.OnChangeTab.trigger(tab.TabIndex);
						}
					}
			});
		},
		OnRenderFooter: function(dialog, container) {
			container
				.css("padding", "0px 10px 10px 10px")

			if(self.Enabled) {
				CreateElement("div", container, "", "button")
					.attr("btn-state", "enabled")
					.attr("btn-color", "green")
					.html("Start Search")
					.click(function() {
						if($(this).attr("btn-state") == "enabled") {														
							self.Query();
						};
					});
					
				CreateElement("div", container, "", "button")
					.attr("btn-state", "enabled")
					.attr("btn-color", "blue")
					.html("Clear")
					.click(function() {
						if($(this).attr("btn-state") == "enabled") {
							self.dbSearch.Events.OnClearQuery.trigger();
							self.Query();
						};
					});
			} else {
				CreateElement("div", container, "", "button")
					.attr("btn-state", "enabled")
					.attr("btn-color", "green")
					.html("Apply")
					.click(function() {
						if($(this).attr("btn-state") == "enabled") {														
							self.Query();
						};
					});
			}
			
			CreateElement("a", CreateElement("div", container, "", "button-text"))
				.html("Close")
				.click(function() {
					dialog.Hide();
				});
					
		}
	});
	
};
//**************************************************************************************************
// File name: dbsearch-dialog.js
//**************************************************************************************************
EditDropDown = function(options) {
	this.Page = options.page;
	// this.InitialTabIndex = options.tabIndex;
	this.Width = options.width;
	this.Toolbar = options.toolbar;
	this.dbSearch = options.dataset;
	
	this.dbSearch.Events.OnPost.add(function(dataset, callback) {
			// callback("", 0);
		// alert("OK...");
		dataset.dialog.Hide();
		self.Events.OnConfirm.trigger(self);
	};
	
	var self = this;

	this.Events = {};
	this.Events.OnInit = new EventHandler(this);
	this.Events.OnConfirm = new EventHandler(this);
	this.Events.OnChangeTab = new EventHandler(this);
	this.Events.OnDisplayMessage = new EventHandler(this);

	// this.Confirm = function() {
		// self.Events.OnConfirm.trigger(self);
	// };

	// editor.data.Events.OnEditDialog.trigger(editor);
	this.Toolbar.NewItem({
		ID: options.id,
		Title: options.title,
		Align: "left",
		Painter: {
			color: "green",
			caption: "Edit",
			dropdown: true,				
			iconImage: options.icon,
			iconIndent: 4
		},
		OnClose: function() {
			self.dbSearch.unbindControls();
		},
		OnInitDropDown: function(dialog, container) {
			$(window).resize(function() {
				dialog.RePosition();
			});

			// alerts(self.Page.searchWidth);
			container.addClass("search-dialog")
				.css("width", defaultValue(self.Width, 600)
				
			if(typeof desktop == "object") {
				container.css("z-index", ++desktop.zIndex);
			};
		},
		OnDropDown: function(dialog, container) {
			container
				.css("border", "1px " + dialog.Color)
				.css("border-style", "none solid none solid")
				.css("background-color", "white")
				.css("height", "auto");
				
			var headerTitle = CreateElement("div", container, "", "")
				.css("width", "100%")
				.css("height", "auto")
				.css("padding", "10px 10px 0 10px")
				.css("box-sizing", "border-box")
				.css("font-weight", "bold")
				.css("font-size", "11pt")
				.html(options.title);
				
			// if(options.OnDisplayTitle) {
			var SubTitle = CreateElement("div", container, "", "")
				.css("width", "100%")
				.css("height", "auto")
				// .css("padding", "10px 10px 0 10px")
				.css("box-sizing", "border-box")
					
			self.Events.OnDisplayMessage.trigger(SubTitle);
				
			new JTabbedEdit({
					page: self.Page,
					data: self.dbSearch,
					container: container,
					fluid: true,
					tabHeight: 32+6,
					css: "editor-search",
					pgcss: "pg-search",
					events: {
						init: function(editor) {
							editor.setWidth = function(w) {
								dialog.Painter.MainContainer.css("width", w);
							};
							
							editor.data.Events.OnInitEditDialog.trigger(editor);
							editor.data.Events.OnEditDialog.trigger(editor);
						},
						afterInit: function(editor) {
							self.dbSearch.edit();
							self.Events.OnInit.trigger(editor);

							if(editor.pg.TabCount() <= 1) {
								editor.pg.Painter.TabsContainer.css("position", "");
								container.css("height", "auto");
								container.find("div[pg-section='contents']").css("padding", 10);

								container.find(".editor-search-table-container")
									.removeClass("editor-search-table-container")
									.addClass("editor-search-container-full-border")
							};
						},
						changeTab: function(editor, tab) {
							tab.GetTab().find(".editor-search-table-container")
								.removeClass("editor-search-table-container")
								.addClass("editor-search-container-full-border")
								
								tab.GetTab().find(".editor-search-table")
									.keypress(function(e){
										if(e.which == 13) {
											if($(event.target).is("input") {
												var binding = $(event.target).data("binding");
												if(binding !== undefined) {
													$(event.target).trigger("change");
													self.Query();
													e.preventDefault();
												};
											};
										};
									});	

							container.css("height", 10*2+6 + editor.pg.TabHeight + $(tab.Painter.Tab.find("div")[0]).outerHeight());
							self.Events.OnChangeTab.trigger(tab.TabIndex);							
						}
					}
			});
			
		
			var footer = CreateElement("div", container, "", "")
				.css("width", "100%")
				.css("height", "auto")
				.css("padding", "0px 10px 10px 10px")
			
			self.dbSearch.warned = false;
			CreateElement("div", footer, "", "button")
				.attr("btn-state", "enabled")
				.attr("btn-color", "green")
				.html("Apply")
				.click(function() {
					if($(this).attr("btn-state") == "enabled") {	
						self.dbSearch.dialog = dialog;
						// self.dbSearch.post(w);
						self.dbSearch.post(function(dataset, msg) {
							if(!dataset.warned) {
								dataset.warned = true;
								CreateElement("div", container, "", "")
									.css("width", "100%")
									.css("height", "auto")
									// .css("margin", "4px")
									.css("padding", "4px")
									.css("color", "red")
									.css("background-color", "wheat")
									.css("box-sizing", "border-box")
									.html("*Field <b>name</b> is mandatory.")
							}
						});
					};
				});
				
			CreateElement("a", CreateElement("div", footer, "", "button-text"))
				.html("Close")
				.click(function() {
					dialog.Hide();
				});
		}
	});
	
};
//==================================================================================================
// File name: controls-5.js
//==================================================================================================
// function jControl(params)
//==================================================================================================
//**************************************************************************************************
// jControl
//**************************************************************************************************
Class.Inherits(jControl, jObject)
function jControl(params) {
    jControl.prototype.parent.call(this, params)
}

jControl.prototype.classID = "jControl"
jControl.prototype.controlType = "?"
jControl.prototype.painterClass = jBasePainter
jControl.prototype.paintImediately = true

jControl.prototype.initialize = function(params) {
	jControl.prototype.parent.prototype.initialize.call(this, params);
	
	this.owner = params.owner
	this.paintParams = $.extend({}, this.paintParams, params.paintParams);
	this.parentContainer = params.container
	
	// if (!this.paintParams)
		// this.paintParams = {}
	
	this.paintParams.control = this
	this.paintParams.parentContainer = params.container
	
    if (this.paintParams && this.paintParams.painterClass) {
        this.painter = new this.paintParams.painterClass(this.paintParams)
    } else if (this.painterClass) {
        this.painter = new this.painterClass(this.paintParams)
    }
}

jControl.prototype.afterInitialize = function() {
	jControl.prototype.parent.prototype.afterInitialize.call(this);
	
	if(this.paintImediately) {
		if (this.params.delayPainting)
			// do something before painting, ie fetch data from server so they are available before painting...
			// BUT, DO NOT this.paint until data has completed fetching from server
			this.params.delayPainting(this) 
		else 
			this.paint()
	}
}

jControl.prototype.paint = function() {
    if (this.painter) {
		this.beforePaint()
		
        if (arguments.length > 0) {
            // this.painter.beginPainting.apply(null, Array.prototype.slice.call(arguments, 0));
        } else {
            this.painter.beginPainting();
        }
				
		this.afterPaint()
    }
}

jControl.prototype.beforePaint = function() {
}

jControl.prototype.afterPaint = function() {
}
//**************************************************************************************************
// File name: base-painter-5.js
// jBasePainter
// Last modified on
// 06-JUL-2017
//**************************************************************************************************
Class.Inherits(jBasePainter, jObject)
function jBasePainter(params) {
    jBasePainter.prototype.parent.call(this, params)
}

jBasePainter.prototype.classID = "jBasePainter"

jBasePainter.prototype.initialize = function(params) {
	jBasePainter.prototype.parent.prototype.initialize.call(this, params)
	this.control = params.control
	this.parentContainer = params.parentContainer
}	

jBasePainter.prototype.beginPainting = function() {
	this.paint()
	this.afterPaint()
	
	if (this.params.afterPaint) {
		this.params.afterPaint(this, this.control)
	}
}

jBasePainter.prototype.paint = function(container) {
}

jBasePainter.prototype.afterPaint = function() {
}

jBasePainter.prototype.creaMainContainer = function(container, cssClass, theme) {

	if(!container)
		container = this.control.parentContainer
	
	var mainContainer = CreateElement("div", container, "", cssClass)
		.attr("control-type", this.control.controlType)
	
	if(this.control.paintParams.css)
		mainContainer.addClass(this.control.paintParams.css)
	
	mainContainer.attr("theme", defaultValue(theme, "default"))
	
	return mainContainer
}
// *************************************************************************************************
// File name: dbgrid-2.js
// Last modified on
// 14-JUL-2017
// *************************************************************************************************
//**************************************************************************************************
// jGrid
//**************************************************************************************************
Class.Inherits(jGrid, jControl)
function jGrid(params) {
    jGrid.prototype.parent.call(this, params)
}

jGrid.prototype.classID = "jGrid"
jGrid.prototype.controlType = "grid";

// jGrid.prototype.painterClass = jGridPainter
jGrid.prototype.painterClass = jGridPainter3

jGrid.prototype.initialize = function(params) {
    jGrid.prototype.parent.prototype.initialize.call(this, params)
	
	// console.log(params)
	this.Methods = this.methods // for backward compatibility
	this.Events = this.events // for backward compatibility
	this.NewColumn = this.newColumn // for backward compatibility
	this.NewCommand = this.newCommand // for backward compatibility
	this.NewBand = this.newBand // for backward compatibility
	this.Refresh = this.refresh // for backward compatibility
	
	this.editForm = params.editForm
	this.selectionColumn = params.selectionColumn // use only if this.options.showSelection is true
	
	this.options = $.extend({}, {
		viewType: "gridview", // gridview, cardview, treeview
		treeViewSettings: {
			keyColumnName: "", // name of the key column
			parentColumnName: "", // name of the parent column
			columnName: "" // name of the tree column
		},
		autoScroll: true, // if true, this will add a last column filler, otherwise, the last column will be set to width 100%
		editNewPage: false,
		showRefreshButton: true,
		showCustomHeader: false,
		showMasterDetail: false,
		showMenuButton: false,
		showPopupMenu: false,
		showSelection: false,
		showPreviewRow: false,
		showColumnHeader: true,
		showPager: true,
		showToolbar: true
	}, params.options)
	
	// this.options.editNewPage = defaultValue(this.options.editNewPage, false)
	// this.options.showPager = defaultValue(this.options.showPager, true)
	// this.options.showMasterDetail = defaultValue(this.options.showMasterDetail, false)
	// this.options.showRefreshButton = defaultValue(this.options.showRefreshButton, true)
	// this.options.showSelection = defaultValue(this.options.showSelection, false)
	// this.options.showMenuButton = defaultValue(this.options.showMenuButton, false)
	// this.options.showCustomHeader = defaultValue(this.options.showCustomHeader, false)
	// this.options.showPreviewRow = defaultValue(this.options.showCustomHeader, false)
	
	// this.options.autoScroll = defaultValue(this.options.autoScroll, true) // if true, this will add a last column filler, otherwise, the last column will be set to width 100%
	
	this.options.toolbar = $.extend({}, {
		size: 24,
		theme: "svg"
	}, params.paintParams.toolbar)
	
	// this.options.toolbar = $.extend({}, params.paintParams.toolbar)
	// this.options.toolbar.size = defaultValue(this.options.toolbar.size, 24)
	// this.options.toolbar.theme = defaultValue(this.options.toolbar.theme, "svg")
	
	// this.options.viewType = "gridview" // gridview, cardview, treeview
	// this.options.treeViewSettings = {
		// keyColumnName: "", // name of the key column
		// parentColumnName: "", // name of the parent column
		// columnName: "" // name of the tree column
	// }
	this.search = $.extend({}, {
		visible: false,
		mode: "",
		columnName: "",
		searchWidth: 500
	}, params.search)

	this.exportData = $.extend({}, {
		allow: false,
		name: "",
		souce: ""
	}, params.exportData)
	
	
	// this.search = $.extend({}, params.search)
	// this.search.visible = defaultValue(this.search.visible, false)
	// this.search.mode = defaultValue(this.search.mode, "") // simple, advanced
	// this.search.columnName = defaultValue(this.search.columnName, "") // required only if search.mode is "simple"
	// this.search.searchWidth = defaultValue(this.search.searchWidth, 500) // required only if search.mode is "asvanced"
	
	this.optionsData = $.extend(params.optionsData, {filtered: []})

	this.bands = new JList()
	// this.defaultBand = this.newBand({id:"default"})
	
	this.columns = new JList()
	this.selections = []
	this.hasLeftFixedColumns = false
	this.hasRightFixedColumns = false

	this.currentRowKey = undefined
	
	this.events.OnAfterPaint = new EventHandler(this)
	this.events.OnAfterPaint.add(function(grid) {
		if(grid.pager) grid.pager.update()
		grid.painter.updateHeaders()
		grid.painter.updateSelectionHeader()
		grid.painter.updateSelectionContents()
		if(grid.options.viewType === "gridview")
			grid.painter.focusRow(grid.currentRowKey)
	})
	
	this.events.OnInitToolbar = new EventHandler(this)
	this.events.OnInitToolbar.add(function(grid, toolbar) {
		grid.toolbar = toolbar;
		if(grid.options.showRefreshButton) {
			toolbar.NewItem({
				id: "refresh",
				icon: "refresh",
				iconColor: "#8DCF6E",
				hint: "Refresh",
				dataBind: grid.dataset,
				dataEvent: function(dataset, button) {
					button.show(!dataset.editing);
				},
				click: function(item) {
					grid.refresh();
				}
			});
		};
		
		if(grid.crud.add) {
			toolbar.NewItem({
				id: "new",
				icon: "new",
				iconColor: "#1CA8DD",
				hint: "Add Record",
				click: function(item) {
					grid.editRecord("new", item)
				}
			});
		};
		
		if(grid.exportData.allow) {
			grid.painter.showExport();
		}
		
		if(grid.search.visible && grid.search.mode === "advanced") {
			grid.painter.showAdvancedSearch();
		}
	})
	
	this.events.OnCommand = new EventHandler(this);
	this.events.OnCommand.add(function(grid, params) {
		if(params.command == "select")
			grid.selectRow(params.id, params.element)
		else if(params.command == "edit")
			grid.editRecord(params.id, params.element)
		else if(params.command == "delete")
			grid.deleteRecord(params.id, params.element)
		// else if(params.command == "open")			
			// grid.optionsData.editCallback(grid, params.id, params.element);
		else if(params.command == "menu")
			grid.showMenu(params.id, params.element)
		else if(params.command == "master-detail") {
			params.element.trigger("update")
			// grid.showMenu(params.id, params.element)
		}
	});
	
	this.events.OnPopupMenu = new EventHandler(this)
	
	this.events.OnMasterDetail = new EventHandler(this)
	
	this.events.OnInitCard = new EventHandler(this)
	this.events.OnDrawCustomHeader = new EventHandler(this)
	this.events.OnInitRow = new EventHandler(this)
	this.events.OnInitColumns = new EventHandler(this)
	this.events.OnInitColumns.add(function(grid) {
		if(grid.crud.edit || grid.crud["delete"] || grid.options.showSelection || grid.options.showMenuButton) 
			grid.NewBand({id:"db-control", caption: "", fixed:"left"}, function(band) {
				if(grid.options.showSelection) band.NewCommand({command:"select", internal: true})
				if(grid.options.showMenuButton) band.NewCommand({command:"menu", internal: true})
				if(grid.crud.edit && !grid.options.editNewPage) band.NewCommand({command:"edit", internal: true})
				if(grid.crud["delete"]) band.NewCommand({command:"delete", internal: true})
				if(grid.crud.edit && grid.options.editNewPage) band.NewCommand({command:"open", internal: true})
			})
		
		if(grid.options.showMasterDetail) 
			grid.NewBand({id:"master-detail", caption: "", fixed:"left"}, function(band) {
				band.NewCommand({command:"master-detail", internal: true})
			})
	})
	
	this.events.OnTreeViewButtons = new EventHandler(this)
	
	this.events.OnInitRequestParams = new EventHandler(this) // this is called in jGrid.fetchData()
	this.events.OnPrepareQuery = new EventHandler(this) // this is called in jGrid.fetchData()
	this.events.OnPrepareQuery.add(function(grid, data) {
		// console.log("OnPrepareQuery")
		if(grid.selectionColumn && !grid.preparedQuery) {
			grid.preparedQuery = true;
			var list = grid.selectionColumn.get().split(",")
			for(var i=0; i<list.length; i++) {
				if(list[i] !== "")
					if(grid.dataset.keyIsNumeric())
						grid.selections.push(parseInt(list[i]))
					else
						grid.selections.push(list[i]);
			};
		};
	});
	
	this.events.OnInitFetchedData = new EventHandler(this)
	this.events.OnInitFetchedData.add(function(grid, data) {
		grid.page = defaultValue(data.page, 1)
		grid.row_count = defaultValue(data.row_count, 0)
		grid.page_count = defaultValue(data.page_count, 0)
		grid.crud = data.crud
	})
	
	this.events.OnEdit = new EventHandler(this)
	this.events.OnInitData = new EventHandler(this)
	this.events.OnInitSubData = new EventHandler(this)
	this.events.OnInitSubDataEx = new EventHandler(this)
	this.events.OnInitEditData = new EventHandler(this)
	this.events.OnInitSearch = new EventHandler(this);
	
	this.cacheDatasetName = this.methods.call("getCacheDatasetName")
	
	this.events.OnInitDataRequest = new EventHandler(this)
	{ // data request query parameters
		this.dataParams = new Dataset([], "Paramaters")
		this.dataParams.grid = this
		this.dataParams.Methods.add("gotoPage", function(dataset, page) {
			dataset.set("page", dataset.grid.page = page)
			dataset.grid.Refresh()
		})
		
		this.dataParams.append()
		this.dataParams.addColumn = function(name, value, options) {
			this.Columns.setprops(name, options)
			this.data[0][name] = value
			return this
		}
		
		this.dataParams.Methods.add("excludeInClearSearch", function(dataset) {
			return ["page","pagesize","sort","order"];
		})
		
		this.dataParams.Events.OnClearSearch = new EventHandler(this.dataParams)
		this.dataParams.Events.OnResetSearch = new EventHandler(this.dataParams)
		this.dataParams.Events.OnClearSearch.add(function(dataset, grid) {
			var exclude = dataset.Methods.call("excludeInClearSearch");
			dataset.Columns.each(function(i, column) {
				if(exclude.indexOf(column.fname) == -1) {
					column.set(null)
				}
			});
			
			console.log(dataset.Events)
			dataset.Events.OnResetSearch.trigger();
			
			grid.Refresh();
		})
		
	} // data request query parameters
	
	{ // Methods
		this.methods.add("canAdd", function(grid) {
			return grid.crud.add
		})
		
		this.methods.add("canEdit", function(grid) {
			return grid.crud.edit
		})
		
		this.methods.add("canDelete", function(grid) {
			return grid.crud["delete"]
		})
		
		this.methods.add("editPageUrl", function(grid) {
			return ""
		})
		
		this.methods.add("initListData", function(grid, data) {
			return new Dataset(data.data_0, "Data")
		})
		
		this.methods.add("resetListData", function(grid, data) {
			return data.data_0
		})
		
		this.methods.add("deleteConfirm", function(grid, id) {
			return {
				title: "Delete?",
				message: "Just delete it!" + id
			}
		})
		
		this.methods.add("deleteKeys", function(grid, id) {
			var params = {};
			params[grid.dataset.primaryKey] = id;
			return [params];
			// if(grid.dataset.keyIsNumeric())
				// return ('[{"{0}":{1}}]').format(grid.dataset.primaryKey, id)
			// else
				// return ('[{"{0}":"{1}"}]').format(grid.dataset.primaryKey, id);
		})
		
		this.methods.add("getCacheDatasetName", function(grid) {
			return grid.optionsData.url
		})
		
		this.methods.add("localSearch", function(grid, options) {
			// return grid.optionsData.url
			// return options.expression.test(options.row["name"]) || options.expression.test(options.row["code"])
			return true
		})
		
		this.methods.add("allowCommand", function(grid, column, previous) {
			return true
		})
		
		this.methods.add("getCommandHeaderIcon", function(grid, column, previous) {
			if(column.command === "master-detail")
				return "db-master-detail"
			else if(column.command == "edit")
				return "db-edit"
			else if(column.command == "delete")
				return "db-delete"
			else
				return previous
		})
		
		this.methods.add("getCommandIcon", function(grid, column, previous) {
			if(column.command === "open")
				return "db-open"
			else if(column.command == "edit")
				return "db-edit"
			else if(column.command == "delete")
				return "db-delete"
			else
				return previous
		})
		
		this.methods.add("getCommandHint", function(grid, column, previous) {
			if(column.command == "master-detail")
				return "Show/Hide detail information"
			else if(column.command == "edit")
				return "Edit record"
			else if(column.command == "delete")
				return "Delete record"
			else if(column.command == "open")
				return "Open record in new a window or tab"
			else
				return previous
		})
		
		this.methods.add("getCommandUrl", function(grid, column, previous) {
			return ""
		})
		
		this.methods.add("getLinkUrl", function(grid, params, previous) {
			// params = {column, id}
			return ""
		})
		
		this.methods.add("editTitle", function(grid, mode, previous) {
			if(mode == "edit")
				return "Edit"
			else if(mode == "new")
				return "Add Record"
			else
				return ""
		})
	} // Methods
	
	this.params.delayPainting = function(grid) {
		grid.painter.prePaint();
		grid.fetchData("init", function(grid, data) {
			grid.prepareFetchData(data, function(grid) {
				grid.events.OnInitColumns.trigger()
				
				// always add a filler at the end - NO!
				// add a filles if options.autoScroll == true
				// if(grid.options.autoScroll)
				if(grid.options.horzScroll)
					grid.NewBand({id:"~filler", filler: true}, function(band) {
						band.NewColumn({allowSort: false, fixedWidth:false});
					})
				
				grid.bands.each(function(i, band) {
					if(band.fixed === "left") band.grid.hasLeftFixedColumns = true
					if(band.fixed === "right") band.grid.hasRightFixedColumns = true
				})

				grid.paint()
				grid.events.OnAfterPaint.trigger()
			})
			if(grid.optionsData.cache)
				desktop.cacheDataset.add(grid.cacheDatasetName, data)
			
		})
	}
}

jGrid.prototype.afterInitialize = function() {
	this.Events.OnInitData.trigger(this.dataset = new Dataset([], "Data"));
	this.events.OnInitDataRequest.trigger(this.dataParams)
	// this.Events.OnPrepareQuery.trigger(this.dataParams)
	
    jGrid.prototype.parent.prototype.afterInitialize.call(this)
}

jGrid.prototype.fetchData = function(mode, callback) {	
	var self = this;
	this.painter.showBusy(true)
	this.getData("list", function(params) {
			for(var name in self.requestParams) {
				params[name] = self.requestParams[name]
			}
			
			self.Events.OnPrepareQuery.trigger(self.dataParams)
			self.Events.OnInitRequestParams.trigger(params)
			params.qry = self.dataParams.stringifyRec(0)
		},
		function(data) {
			self.events.OnInitFetchedData.trigger(data)
			
			if(callback) callback(self, data)
			
			self.painter.showBusy(false)
		}
	)
}

// jGrid.prototype.getCurrentKey = function() {
	// return this.painter.getCurrentKey()
	// return this.bands.getByIndex(0)
// }

jGrid.prototype.refresh = function(keepData) {	
	var self = this
	
	if(!this.dataset.empty())
		this.currentRowKey = this.dataset.getKey()
	
	if(!keepData) {
		this.fetchData("refresh", function(grid, data) {
			self.dataset.resetData(self.methods.call("resetListData", data));
			for(var i = 0 i < data.table_count i++) {
				self.events.OnInitSubData.trigger({rawData:data["data_"+i], index:i})
			}
			
			self.painter.update()
			self.events.OnAfterPaint.trigger()
		})
	} else {
			// self.dataset.resetData(self.dataset.);
			// for(var i = 0 i < data.table_count i++) {
				// self.events.OnInitSubData.trigger({rawData:data["data_"+i], index:i})
			// }
			this.painter.showBusy(true)
			this.painter.update()
			this.events.OnAfterPaint.trigger()
			this.painter.showBusy(false)
			
			// this.painter.showBusyEx(function() {
				// self.painter.update()
				// self.events.OnAfterPaint.trigger()
				// self.painter.showBusy(false)
			// });
	}
}

// jGrid.prototype.repaint = function() {
	// this.bands.each(function(i, band) {
		// band.painter.update()
	// })
	// this.painter.update()
	// this.events.OnAfterPaint.trigger()
// }

jGrid.prototype.updateSelections = function() {	
	if(this.selectionColumn) {
		this.selectionColumn.set(this.selections.join(","));
	}
};

jGrid.prototype.prepareFetchData = function(data, callback) {	
	var self = this;

	// console.log("here")
	this.Events.OnInitData.trigger(this.dataset = self.Methods.call("initListData", data));
	this.Events.OnInitSubDataEx.trigger(data);
	
	for(var i = 0 i < data.table_count i++) {
		self.Events.OnInitSubData.trigger({rawData:data["data_"+i], index:i});
	};
	
	this.Events.OnInitEditData.trigger(this.dataEdit = new Dataset([], "Edit"));
	
	// this.dataEdit.Events.OnPost.add(function(dataSet, postCallback) {
		// self.GetData("update", function(params) {
			// params.mode = dataSet.mode;
			// params.data = dataSet.stringifyRec(0);
		// }, function(result) {
			// var msg;
			// if(result.status != 0) {
				// msg = {};
				// msg.title = "Update error";
				// msg.message = result.message;
			// } else {
				// msg = "";
				// self.Refresh();
			// };
			
			// postCallback(msg, result.status)
		// });
	// });
	
	callback(this);
};
	
jGrid.prototype.getData = function(mode, init, callback) {	
	var params = {}
	// console.log(mode)
	if(this.optionsData.requestParams) {
		var p = this.optionsData.requestParams.split("&")
		$(p).each(function(i, s) {
			var p = s.split("=")
			params[p[0]] = p[1]
		})
	}
	
	if(init) init(params)
	
	var src, path = "app"
	var values = this.optionsData.url.split("/")
	
	if(values.length > 1) {
		path = values[0]
		src = values[1]
	} else
		src = values[0]
	
	desktop.Ajax(this, ("/{0}/get/{1}/{2}").format(path, mode, src), params, callback)
}

jGrid.prototype.eachBand = function(callback) {
	var self = this;
	var gather = function(band) {
		callback(band)
		band.bands.each(function(i, band) {
			gather(band)
		})
	}
	
	this.bands.each(function(i, band) {
		gather(band)
	})
}

jGrid.prototype.eachColumn = function(callback) {
	this.columns.each(function(i, column) {
		callback(column)
	})
}

jGrid.prototype.createBand = function(params) {
	return new jGridBand(params)
}

jGrid.prototype.newBand = function(params, callback) {
	params.owner = this
	var band = this.createBand(params)
	if(callback) callback(band)
		
	return this.bands.add(params.id, band)
}

jGrid.prototype.createColumn = function(params) {
	if(params.command) {
		params.fname = ""
		params.width = 32		
		params.useAnchor = defaultValue(params.useAnchor, false)
		// params.internal = defaultValue(params.internal, false)
	}
	
	return this.columns.add(params.fname, new jGridColumn(params))
}

jGrid.prototype.newColumn = function(params) {
	params.owner = this
	if (!params.band) {
		if (!this.defaultBand)
			this.defaultBand = this.newBand({id:"default"})
		
		params.band = this.defaultBand
	}
	
	return params.band.newColumn(params)
}

jGrid.prototype.newCommand = function(params) {
	return this.newColumn(params)
}

jGrid.prototype.selectRow = function(id, e) {	
	if(this.dataset.keyIsNumeric()) id = parseInt(id)
	
	var index = this.selections.indexOf(id)
	if(index === -1)
		this.selections.push(id)
	else
		this.selections.splice(index, 1)
	
	this.updateSelections()
	
	e.trigger("update")
	this.painter.updateSelectionHeader()
}

jGrid.prototype.showMenu = function(id, e) {	
	if(this.options.showMenuButton || this.options.showPopupMenu)
		this.painter.showMenu(id, e)
}

jGrid.prototype.showSelectionOptions = function(e, init) {	
	this.painter.showSelectionOptions(e, init)
}

jGrid.prototype.deleteRecord = function(id, c) {	
	var self = this;
	var confirm = this.Methods.call("deleteConfirm", id); 
	
	this.dataset.gotoKey(id);
	ConfirmDialog({
		target: c,
		title: confirm.title,
		message: confirm.message,
		callback: function(dialog) {
			self.getData("delete", 
				function(params) {
					params.mode = "delete";
					params.data = JSON.stringify(self.methods.call("deleteKeys", id));
					// params.data = self.methods.call("deleteKeys", id);
					// if(self.dataset.keyIsNumeric())
						// params.data = ('[{"{0}":{1}}]').format(self.dataset.primaryKey, id)
					// else
						// params.data = ('[{"{0}":"{1}"}]').format(self.dataset.primaryKey, id);
				},
				function(result) {
					if(result.status < 0)
						ErrorDialog({
							target: c,
							title: "Attempt to delete failed",
							message: result.message,
							snap: "bottom",
							inset: false
						})
					// else if(result.deleted)
						// self.painter.deleteRow(id)
					else
						self.refresh();
				}
			);
		}
	});
}

jGrid.prototype.editRecord = function(id, target) {	
// jGrid.prototype.editRecord_OLD = function(id, target) {
	var self = this;
	
	if(this.options.editNewPage) {
		if(id == 0)
			window.open(this.methods.call("editPageUrl", "new"), "_blank")
		else
			window.open(this.methods.call("editPageUrl", id), "_blank")
		
		return
	}

	if(id == 0)
		this.dataEdit.mode = "new"
	else
		this.dataEdit.mode = "edit";
	
	this.painter.showEditDialog({
		mode: this.dataEdit.mode,
		target: target, // this is the target element, the user clicked to activate edit
		editForm: function(container, dialog) {
			self.editForm(id, container, dialog); // this call embeds the FormEditor in the container, refer to form-edit.js
		}
	});
}

jGrid.prototype.exportGrid = function(dialog) {	
	var getColumns = function(grid) {
		var columns = [];
		grid.eachColumn(function(c) {
			if(c.fname) {
				columns.push({
					type: grid.dataset.Columns.get(c.fname).type,
					name: c.fname,
					label: grid.dataset.Columns.get(c.fname).label,
					width: c.width
				})
			};
		});
		
		return JSON.stringify(columns)
	};
	
	var self = this;
	desktop.Ajax(self, "/engine/exportxls.aspx", {
		ext: "xls",
		exportName: this.exportData.name,
		source: this.exportData.source,
		searchData: this.dataParams.stringifyRec(0),
		columnsData: getColumns(this)
	}, 
	function(data) {
		dialog.Hide();
		if(self.tempframe) self.tempframe.remove();
		self.tempframe = CreateElement("iframe", $(document.body))
			.css("display", "none")
			.attr("src", ("/api/download/temp?file={0}.{1}&name={2}.{1}").format(data.src, data.ext, self.exportData.name));
	});
};

jGrid.prototype.localFilter = function() {
	var data = [];

	// console.log(this.SimpleSearchText())
	this.refresh();
	return;
	var self = this;
	var filter = this.SimpleSearchText();
	var searchExp = new RegExp(filter, 'i');
	this.optionsData.filtered = [];
	this.dataset.each(function(dataRow, i)) {
		var id = dataRow[self.dataset.primaryKey];
		var search = {
			expression:searchExp, 
			row:dataRow,
			test: function(name) {
				return this.expression.test(this.row[name])
			}
		};
		
		if(self.Methods.call("localSearch", search)) {
			self.optionsData.filtered.push(id);
		};
	});
	
	this.Painter.RepaintContent();
	// this.Busy();
};
// *************************************************************************************************
// File name: dbgrid-painters.js
// Last modified on
// 03-MAR-2015
// *************************************************************************************************
//**************************************************************************************************
// jGridPainter
//**************************************************************************************************
Class.Inherits(jGridPainter, jBasePainter);
function jGridPainter(params) {
	jGridPainter.prototype.parent.call(this, params);
};

jGridPainter.prototype.classID = "jGridPainter";

jGridPainter.prototype.initialize = function(params) {
    jGridPainter.prototype.parent.prototype.initialize.call(this, params);
	
	// this.params.size = defaultValue(params.size, "250px")
	// this.params.fixed = defaultValue(params.fixed, true)
	// this.params.noBorder = defaultValue(params.noBorder, false)
	// this.params.orientation = defaultValue(params.orientation, "vert")
};

jGridPainter.prototype.paint = function(container) {
    jGridPainter.prototype.parent.prototype.paint.call(this, container);
		
	var self = this;
	this.mainContainer = this.creaMainContainer(container, "grid2", this.control.paintParams.theme)
		.on("mouseleave", function() {
			self.control.bands.each(function(i, band) {
				band.painter.mouseLeave()
			})
		})
	
	// console.log(this.control.paintParams)
	if(this.hasLeftPanel()) {
		this.leftSection = new jGridSectionPainter({control:this.control, fixed:"left", header:this.headerSectionContainer, content:this.mainContainer, footer:undefined})
	}

	this.middleSection = new jGridSectionPainter({control:this.control, fixed:"middle", header:this.headerSectionContainer, content:this.mainContainer, footer:undefined})
	
	if(this.hasRightPanel()) {
		this.rightSection = new jGridSectionPainter({control:this.control, fixed:"right", header:this.headerSectionContainer, content:this.mainContainer, footer:undefined})
	}
	
	if(this.leftSection || this.rightSection ) {
		this.overlay = CreateElement("div", this.mainContainer)
			.attr("grid-sec", "overlay")
	}
	
	this.paintHeader(this.header = CreateElement("div", this.mainContainer, "", "")
		.attr("grid-sec", "main-header")
	)
	
	this.paintBody(this.subContainer = CreateElement("div", this.mainContainer, "", "")
		.attr("grid-sec", "sub-container")
	)
	
	this.paintFooter(this.footer = CreateElement("div", this.mainContainer, "", "")
		.attr("grid-sec", "main-footer")
	)

	this.paintGrid()

	this.recomputeDimensions()
	
	this.resizeMode = 0
	this.calculateResize()
	$(window).on("resize", function(e) {
		self.calculateResize()
	})
	
	desktop.Events.OnResizeMenu.add(function(desktop) {
		self.calculateResize()
	})
	
	this.subContainer.scroll(function(event) {
		var scrollTop = $(event.target).scrollTop()
		var scrollLeft = $(event.target).scrollLeft()

		self.middleSection.scroll(scrollLeft)

		if(self.leftSection)
			self.leftSection.scroll({top: -scrollTop})
		
		if(self.rightSection)
			self.rightSection.scroll({top: -scrollTop})
	})	
	
}

jGridPainter.prototype.recomputeDimensions = function() {
		var leftOffset = 0, rightOffset = 0, widthAdjustment = 0
		if(this.leftSection) {
			leftOffset = this.leftSection.width()
			widthAdjustment = this.leftSection.width()+desktop.scrollbarWidth
		} else {
			widthAdjustment = desktop.scrollbarWidth
		}
		
		if(this.rightSection) {
			rightOffset = this.rightSection.width()
			
			this.rightSection.header.css("right", desktop.scrollbarWidth)
			
			if(this.rightSection.footer)
				this.rightSection.footer.css("right", desktop.scrollbarWidth)
		}

		this.middleSection.content.css("left", leftOffset)
		this.middleSection.content.css("padding-right", rightOffset)
		
		if(this.middleSection.header) {
			this.middleSection.header.css("left", leftOffset)
			this.middleSection.header.css("padding-right", rightOffset)
			this.middleSection.header.css("width", ("Calc(100% - {0}px").format(widthAdjustment))
		}
		
		if(this.middleSection.footer) {
			this.middleSection.footer.css("left", leftOffset)
			this.middleSection.footer.css("padding-right", rightOffset)
			this.middleSection.footer.css("width", ("Calc(100% - {0}px").format(widthAdjustment)
		}
		
		if(this.overlay) {
			var height = this.header.outerHeight() + this.footer.outerHeight()
			if(this.control.options.horzScroll) height += desktop.scrollbarWidth
				
			this.overlay.css({
				"top": this.header.outerHeight(),
				"z-index": desktop.zIndex += 1,
				"width": ("Calc(100% - {0}px").format(desktop.scrollbarWidth),
				"height": ("Calc(100% - {0}px").format(height)
			})
		}
		
		if(this.footer)
			this.subContainer
				.css("height", ("Calc(100% - {0}px").format(this.header.outerHeight() + this.footer.outerHeight()))
		else
			this.subContainer
				.css("height", ("Calc(100% - {0}px").format(this.header.outerHeight()))
				
		// var self = this
		// this.resizeMode = 0
		// this.calculateResize()
		// $(window).on("resize", function(e) {
			// self.calculateResize()
		// })
}

jGridPainter.prototype.calculateResize = function() {
	if(this.subContainer.outerHeight() > this.tempContainer.outerHeight() && this.resizeMode != -1) {
		this.resizeMode = -1
		var height = this.header.outerHeight() + this.footer.outerHeight() + desktop.scrollbarWidth
		this.overlay.css("height", ("Calc(100% - {0}px)").format(height))
	} else if(this.subContainer.outerHeight() <= this.tempContainer.outerHeight() && this.resizeMode != 1) {
		this.resizeMode = 1
		var height = this.header.outerHeight() + this.footer.outerHeight()
		this.overlay.css("height", ("Calc(100% - {0}px)").format(height))
	}
}

jGridPainter.prototype.bandMaxLevels = function() {
	var maxLevels = 1
	this.control.bands.each(function(i, band) {
		var count = band.levelCount()
		maxLevels = count > maxLevels ? count : maxLevels
		// maxLevels = (let count = band.levelCount()) > maxLevels ? count : maxLevels
	})

	return maxLevels//+1
}

jGridPainter.prototype.paintGrid = function() {
	this.control.bands.each(function(i, band) {
		band.paint()
	})
}

jGridPainter.prototype.update = function() {
	// this will only re-paint the content
	this.control.bands.each(function(i, band) {
		band.painter.update()
	})
	
	// this.recomputeDimensions()
}

jGridPainter.prototype.paintHeader = function(container) {
	var toolbarContainer = CreateElement("div", container, "", "")
		.attr("grid-sec", "toolbar")
	
	this.toolbar = new JToolbar({
			// id: "tb",
			// container: container,
			container: toolbarContainer,
			css: "toolbar",
			// theme: "default",
			theme: this.control.options.toolbarTheme,
			buttonSize: this.control.options.toolbarSize
			// Css: "toolbar",
			// Css: this.ToolbarCss,
			// Page: this,
			// Painter: {
				// buttonPainterClass: ToolbuttonPainter
			// }
	});	
	
	this.control.events.OnInitToolbar.trigger(this.toolbar);
	
	this.headerSectionContainer = CreateElement("div", container, "", "")
		.attr("grid-sec", "section-container")
		
		if(this.hasLeftPanel())
			this.leftSection.paintHeader(this.headerSectionContainer)
			
		this.middleSection.paintHeader(this.headerSectionContainer)
				
		if(this.hasRightPanel())
			this.rightSection.paintHeader(this.headerSectionContainer)
}
	
jGridPainter.prototype.paintFooter = function(container) {
	if(this.control.options.showSummary) {
		this.footerSectionContainer = CreateElement("div", container, "", "")
			.attr("grid-sec", "section-container")
			
			if(this.hasLeftPanel())
				this.leftSection.paintFooter(this.footerSectionContainer)
				
			this.middleSection.paintFooter(this.footerSectionContainer)
					
			if(this.hasRightPanel())
				this.rightSection.paintFooter(this.footerSectionContainer)
	}
		
	// var pagerContainer = CreateElement("div", container, "", "pager-container")
	var pagerContainer = CreateElement("div", container, "", "")
	this.control.pager = new jPager({
		container: pagerContainer,
		grid: this.control,
		rowsPerPage: [25,50,75,100]
	});
}
	
jGridPainter.prototype.paintBody = function(container) {
	var self = this
	
	this.tempContainer = CreateElement("div", container).css({
		"width": "100%",
		"height": "100%",
		"display": "hidden"
	}).attr("grid-sec", "temp")
		
	if(this.hasLeftPanel()) {
		this.leftSection.paintContent(this.overlay)
		this.leftSection.content.on('mousewheel DOMMouseScroll', function(e){
			var top = self.middleSection.content.parent().scrollTop()
			self.middleSection.content.parent().scrollTop(top + e.originalEvent.deltaY)
		});
	}

	this.middleSection.paintContent(container)
				
	if(this.hasRightPanel()) {
		this.rightSection.paintContent(this.overlay)
		this.rightSection.content.on('mousewheel DOMMouseScroll', function(e){
			var top = self.middleSection.content.parent().scrollTop()
			self.middleSection.content.parent().scrollTop(top + e.originalEvent.deltaY)
		});
	}
}

jGridPainter.prototype.showBusy = function(visible) {
	if(visible) {
		// this.busyContainer = CreateElement("div", this.control.parentContainer, "", "busy")
		// var inner1  = CreateElement("div", this.busyContainer).attr("x-sec", "inner-1")
		// var inner2  = CreateElement("div", inner1).attr("x-sec", "inner-2")
			// .css("background", "rgba(0,0,0,0.25)")
			// .css("animation", "spin 1s linear infinite")
			
		// desktop.GetSvg(inner2, "refresh")
		
		this.busyContainer = CreateElement("div", this.control.parentContainer, "", "busy2")
		desktop.GetSvg(this.busyContainer, "refresh")
		
	} else if(this.busyContainer) {
		this.busyContainer.remove()
	}
}

jGridPainter.prototype.hasLeftPanel = function() {
	return this.control.hasLeftFixedColumns
}

jGridPainter.prototype.hasRightPanel = function() {
	return this.control.hasRightFixedColumns
}

jGridPainter.prototype.hoverRow = function(keyID) {
	var id = parseInt(keyID)
	this.control.bands.each(function(i, band) {
		band.painter.contentTable.painter.hoverRow(id)
	})
}

jGridPainter.prototype.focusRowByIndex = function(index) {
	this.control.bands.each(function(i, band) {
		band.painter.contentTable.painter.focusRowByIndex(index)
	})
}

jGridPainter.prototype.focusRow = function(keyID) {
	if(this.control.dataset.gotoKey(keyID))
		this.control.bands.each(function(i, band) {
			band.painter.contentTable.painter.focusRow(keyID)
		})
	else
		this.focusRowByIndex(0)
}

jGridPainter.prototype.updateHeaders = function() {
	this.control.bands.each(function(i, band) {
		band.painter.headerTable.painter.updateHeaders()
	})

}

jGridPainter.prototype.updateSelectionHeader = function() {
	this.control.bands.each(function(i, band) {
		band.painter.headerTable.painter.updateSelectionHeader()
	})

}

jGridPainter.prototype.updateSelectionContents = function() {
	this.control.bands.each(function(i, band) {
		band.painter.contentTable.painter.updateSelectionContents()
	})
}

jGridPainter.prototype.showMenu = function(id, e) {	
	var self = this;
	new JPopupDialog({
		Target: e,
		Modal: false,
		Painter: {
			painterClass: PopupBalloonPainter,
			color: "orange",
			snap: "bottom",
			align: "",
			inset: false,
			OnRenderHeader: function(dialog, container) {
				desktop.svg.draw(container, "menu").css("height", 24).css("fill", "white")
			},
			OnRenderContent: function(dialog, container) {
			},
			OnRenderFooter: function(dialog, container) {
			}
		}
	})
}

jGridPainter.prototype.showSelectionOptions = function(e, init) {	
	var self = this;
	new JPopupDialog({
		Target: e,
		Modal: false,
		Painter: {
			painterClass: PopupBalloonPainter,
			color: "orange",
			snap: "bottom",
			align: "",
			inset: false,
			OnRenderHeader: function(dialog, container) {
				desktop.svg.draw(container, "checkbox-multiple-blank").css("height", 24).css("fill", "white")
			},
			OnRenderContent: function(dialog, container) {
				container.css("position", "relative")
				
				var collection = [];
				var menus = {
					add: function(title) {
						var main = {
							add: function(title, url, icon) {
								this.item.subItems.push({icon:icon, title:title, url:url});
							},
							addCommand: function(title, icon, callback) {
								this.item.subItems.push({icon:icon, title:title, callback:callback});
							}
						};
						
						collection.push(main.item = {title:title, subItems:[]});
						return main;
					}
				}
				
				init(menus)
				
				desktop.Painter.createNavigatorMenu({
					container: container,
					theme: "grid-menu",
					menus: collection,
					click: function(e) {
						dialog.Hide()
					},
					init: function(container, item) {
						if(item.url) {
							container.attr("href", item.url)
							container.attr("target", "_blank")
						} else if(item.callback) {
							container.click(item.callback)
						}
					}
				});
				
			},
			OnRenderFooter: function(dialog, container) {
			}
		}
	})
}
// *************************************************************************************************
// File name: dbgrid-painters.js
// Last modified on
// 03-MAR-2015
// *************************************************************************************************
//**************************************************************************************************
// jGridPainter3
//**************************************************************************************************
Class.Inherits(jGridPainter3, jBasePainter);
function jGridPainter3(params) {
	jGridPainter3.prototype.parent.call(this, params);
};

jGridPainter3.prototype.classID = "jGridPainter3";

jGridPainter3.prototype.initialize = function(params) {
    jGridPainter3.prototype.parent.prototype.initialize.call(this, params);
};

jGridPainter3.prototype.prePaint = function() {
	if(desktop.mobile)
		this.control.paintParams.theme = "mobile"
	
	this.mainContainer = this.creaMainContainer(undefined, "grid3", this.control.paintParams.theme)
}

jGridPainter3.prototype.paint = function(container) {
	jGridPainter3.prototype.parent.prototype.paint.call(this, container);
		
	var self = this;
	// this.mainContainer = this.creaMainContainer(container, defaultValue(this.control.paintParams.css0, "grid3"), this.control.paintParams.theme)
	// this.mainContainer = this.creaMainContainer(container, "grid3", this.control.paintParams.theme)
	this.mainContainer
		.addClass(this.control.options.viewType)
		// .on("mouseleave", function() {
			// self.control.bands.each(function(i, band) {
				// band.painter.mouseLeave()
			// })
		// })
		
	this.sections = {
		header: {},
		body: {},
		footer: {},
	}
		
	this.paintHeader()
	this.paintBody()
	this.paintFooter()
	this.paintBands()
	
	if(!this.control.options.hideHeader)
		this.sections.header.container.trigger("update")
	
	if(this.sections.footer.container) this.sections.footer.container.trigger("update")
		
	if(this.control.options.viewType !== "cardview") {
		this.sections.body.content.trigger("update-content")
		this.overlay.trigger("resize-check")
		
		// this.sections.body.content.scroll(function(event) {
			// var scrollTop = $(event.target).scrollTop()
			// var scrollLeft = $(event.target).scrollLeft()
			
			// self.overlay.css({"left": scrollLeft})
			// self.sections.header.content.scrollLeft(scrollLeft)
			// if(self.sections.footer.content) self.sections.footer.content.scrollLeft(scrollLeft)
			// self.sections.body.left.scrollTop(scrollTop)
			// self.sections.body.right.scrollTop(scrollTop)
		// })
		
		this.sections.body.content.scroll(function(event) {
			var scrollLeft = $(event.target).scrollLeft()
			self.overlay.css({"left": scrollLeft})
			if(!self.control.options.hideHeader) self.sections.header.content.scrollLeft(scrollLeft)
			if(self.sections.footer.content) self.sections.footer.content.scrollLeft(scrollLeft)
		})
	
		// desktop.windowResizeWatch(this.overlay)
	
		// $(window).on("resize", function(e) {
			// self.overlay.trigger("resize-check")
		// })	
		
		// desktop.Events.OnResizeMenu.add(function(desktop) {
			// self.overlay.trigger("resize-check")
		// })	
	}
}
	
jGridPainter3.prototype.paintBands = function() {
	this.control.bands.each(function(i, band) {
		band.paint()
	})
}

jGridPainter3.prototype.repaint = function() {
	this.sections.header.left.html("")
	this.sections.header.content.html("")
	this.sections.header.right.html("")
	
	this.overlay.remove()
	this.sections.body.left.remove()
	this.sections.body.content.remove()
	this.sections.body.right.remove()
	
	this.paintBody()
	this.paintBands()
	
	this.sections.header.container.trigger("update")
	if(this.sections.footer.container) this.sections.footer.container.trigger("update")
	this.sections.body.content.trigger("update-content")
	this.overlay.trigger("update")
	
	this.sections.body.content.scroll(function(event) {
		var scrollTop = $(event.target).scrollTop()
		var scrollLeft = $(event.target).scrollLeft()
		
		self.sections.header.content.scrollLeft(scrollLeft)
		if(self.sections.footer.content) self.sections.footer.content.scrollLeft(scrollLeft)
		self.sections.body.left.scrollTop(scrollTop)
		self.sections.body.right.scrollTop(scrollTop)
	})
	
	// this.sections.body.left.html("")
	// this.sections.body.content.html("")
	// this.sections.body.right.html("")
}

jGridPainter3.prototype.update = function() {
	// this will only re-paint the content
	// console.log("here")
	this.control.bands.each(function(i, band) {
		band.painter.update()
	});
	
	if(this.control.options.showCustomHeader) {
		this.customHeader.html("");
		this.control.events.OnDrawCustomHeader.trigger(this.customHeader);
	}
}

// jGridPainter3.prototype.calculateResize = function() {
	// if(this.subContainer.outerHeight() > this.tempContainer.outerHeight() && this.resizeMode != -1) {
		// this.resizeMode = -1
		// var height = this.header.outerHeight() + this.footer.outerHeight() + desktop.scrollbarWidth
		// this.overlay.css("height", ("Calc(100% - {0}px)").format(height))
	// } else if(this.subContainer.outerHeight() <= this.tempContainer.outerHeight() && this.resizeMode != 1) {
		// this.resizeMode = 1
		// var height = this.header.outerHeight() + this.footer.outerHeight()
		// this.overlay.css("height", ("Calc(100% - {0}px)").format(height))
	// }
// }

jGridPainter3.prototype.bandMaxLevels = function() {
	var maxLevels = 1
	this.control.bands.each(function(i, band) {
		var count = band.levelCount()
		maxLevels = count > maxLevels ? count : maxLevels
	})

	return maxLevels//+1
}

jGridPainter3.prototype.paintBody = function() {
	var self = this;
	
	this.sections.body.content = CreateElementEx("div", this.mainContainer, function(c) {
		c.addClass("content")
		.attr("section", "content")
		
		if(self.control.options.viewType === "cardview") {
			c.bind("update-content", function() {
			})
		} else {
			c.bind("update-content", function() {
				var leftW = self.sections.body.left.outerWidth()
				var rightW = self.sections.body.right.outerWidth()
				if(leftW > 0 && !self.leftContentFiller) {
					$(this).prepend(self.leftContentFiller = CreateElement("div")
						.addClass("left-content-filler")
						.css("width", leftW)
					)
				}
				if(rightW > 0 && !self.rightContentFiller) {
					$(this).append(self.rightContentFiller = CreateElement("div")
						.addClass("right-content-filler")
						.css("width", rightW)
					)
				}
			})
			self.tempContainer = CreateElement("div", c).addClass("temp-container")	
		}
	})
	
	if(self.control.options.viewType !== "cardview") {
		// this.overlay = CreateElementEx("div", this.mainContainer, function(o) {
		this.overlay = CreateElementEx("div", this.sections.body.content, function(o) {
			o.addClass("overlay")
			.css("z-index", desktop.zIndex++)
			.data("changed", -1)
			.data("header", self.mainHeader)
			// .data("footer", self.mainFooter)
			.data("content", self.sections.body.content)
			.data("temp-container", self.tempContainer)
			// .bind("resize-check", function() {				
				// var header = $(this).data("header")
				// var content = $(this).data("content")
				// var tempContainer = $(this).data("temp-container")
				// var heightOffset = (content.outerHeight() - tempContainer.outerHeight())
				// var topOffset = heightOffset * header.data("header")
				// var changed = $(this).data("changed")

				// if(changed !== topOffset) {
					// var footer = $(this).data("footer")
					
					// $(this).data("changed", topOffset)
					// $(this).css({
						// "top": header.outerHeight(),
						// "left": 0,
						// "width": ("Calc(100% - {0}px)").format(desktop.scrollbarWidth),
						// "height": ("Calc(100% - {0}px)").format(header.outerHeight() + self.mainFooter.outerHeight() + heightOffset)
					// })
				// }
			// })
			
			self.sections.body.left = CreateElementEx("div", o, function(left) {
				left.addClass("fixed-left").attr("fixed-band", "left")
				// left.on('mousewheel DOMMouseScroll', function(e) {
					// var top = self.sections.body.content.scrollTop()
					// self.sections.body.content.scrollTop(top + e.originalEvent.deltaY)
				// });
			})
			
			
			CreateElement("div", o).addClass("filler").attr("fixed-band", "filler")
			
			self.sections.body.right = CreateElementEx("div", o, function(right) {
				right.addClass("fixed-right").attr("fixed-band", "right")
				// right.on('mousewheel DOMMouseScroll', function(e) {
					// var top = self.sections.body.content.scrollTop()
					// self.sections.body.content.scrollTop(top + e.originalEvent.deltaY)
				// });
			})
		})
	}
	// this.mainHeader.after(this.sections.body.content)
	// this.mainHeader.after(this.overlay)
}

jGridPainter3.prototype.paintToolbar = function(container) {
	var grid = this.control;
	var toolbarContainer = CreateElement("div", container, "", "").attr("grid-sec", "toolbar")

	if(this.control.options.showToolbar) {
		this.toolbar = new JToolbar({
				container: toolbarContainer,
				css: "toolbar",
				theme: grid.options.toolbar.theme,
				buttonSize: grid.options.toolbar.size
		});	
	
		if(this.control.search.visible) {
			if(grid.search.mode === "simple") {
				CreateElementEx("div", this.toolbar.Painter.buttonContainer, function(search) {
					search.addClass("simple-search")
					search.addClass("ss-theme-" + grid.options.toolbar.theme)
					search.attr("ss-size", grid.options.toolbar.size)
					
					CreateElementEx("div", search, function(inner) {
						inner.attr("ss-sec", "search")
						
						CreateElementEx("input", inner, function(input) {
							input.focusin(function() {
								$(this).parent().attr("ss-focused", "1");
							});
							
							input.focusout(function(e) {
								$(this).parent().removeAttr("ss-focused")
							});
							
							input.change(function() {
								grid.dataParams.set(grid.search.columnName, $(this).val());			
								if(grid.optionsData.cacheName) 
									grid.localFilter()
								else
									grid.refresh();
							});

							input.focus();
						})
							
						CreateElementEx("div", inner, function(btn) {
							btn.attr("ss-sec", "button")
							desktop.GetSvg(btn, "search", 20, {noTopMargin:true});
						})
					})
					
				})
			}
		}
		
		grid.events.OnInitToolbar.trigger(this.toolbar);
	};
}

jGridPainter3.prototype.paintHeader = function() {
	var self = this;
	var grid = this.control;
	
	this.mainHeader = CreateElementEx("div", this.mainContainer, function(h1) {
		h1.addClass("header");
		
		if(grid.options.showCustomHeader)
				self.customHeader = CreateElementEx("div", h1, function(customHeader) {
					customHeader.addClass("custom-header");
					grid.events.OnDrawCustomHeader.trigger(customHeader);
				})
				
		self.paintToolbar(h1);
		
		if(!grid.options.hideHeader) {
			self.sections.header.container = CreateElementEx("div", h1, function(h2) {
				h2.addClass("section");
				h2.bind("update", function() {
					if(grid.options.viewType !== "cardview")
						self.sections.header.right.css("margin-right", desktop.scrollbarWidth);
				});
				
				self.sections.header.left = CreateElement("div", h2)
					.addClass("left-section")
					.attr("section", "left");
					
				self.sections.header.content = CreateElement("div", h2)
					.addClass("content-section")
					.attr("section", "content");
					
				self.sections.header.right = CreateElement("div", h2)
					.addClass("right-section")
					.attr("section", "right");
			
			});
		}
	});
}
	
jGridPainter3.prototype.paintFooter = function() {
	var self = this;
	this.mainFooter = CreateElementEx("div", this.mainContainer, function(f1) {
		f1.addClass("footer")
		f1.attr("section", "footer")
		if(self.control.options.showSummary) {
			self.sections.footer.container = CreateElementEx("div", f1, function(f2) {
				self.sections.footer.left = CreateElement("div", f2)
					.addClass("left-section")
					.attr("section", "left")
					
				self.sections.footer.content = CreateElement("div", f2)
					.addClass("content-section")
					.attr("section", "content")
					
				self.sections.footer.right = CreateElement("div", f2)
					.addClass("right-section")
					.attr("section", "right")
					
			}).addClass("section")
			.attr("footer-sec", "table-summary")
			.bind("update", function() {
				if(self.control.options.viewType !== "cardview")
					self.sections.footer.right.css("margin-right", desktop.scrollbarWidth)
			})
		}
		
		if(self.control.options.showPager) {
			var pagerContainer = CreateElement("div", f1)//.addClass("pager")
			self.control.pager = new jPager({
				container: pagerContainer,
				grid: self.control,
				rowsPerPage: [25,50,75,100]
			});
		}
	})
}

jGridPainter3.prototype.showBusyEx = function(callback) {
	this.busyContainer = CreateElementEx("div", this.mainContainer, function(container) {
		// this.mainContainer.data("busy", container);
		console.log("show")
		container.attr("test", 1);
		container.css("z-index", desktop.zIndex++);
		// container.css("background", "rgba(0,0,0,0.2)");
		desktop.svg.draw(container, "refresh");
		
		callback();
	}, "busy2")
};

jGridPainter3.prototype.showBusy = function(visible) {
	if(visible) {		
		// this.busyContainer = CreateElementEx("div", this.mainContainer, function(container) {
			// console.log("show")
			// container.attr("test", 1);
			// container.css("z-index", desktop.zIndex++);
			// container.css("background", "rgba(0,0,0,0.2)");
			// desktop.svg.draw(container, "refresh");
		// }, "busy2")
		// console.log("show");
		this.busyContainer = CreateElement("div", this.mainContainer)
			.addClass("busy2")
			.css("z-index", desktop.zIndex++)
			// .css("background", "rgba(0,0,0,0.2)");
		
		desktop.svg.draw(this.busyContainer, "refresh");
			
	} else {
		// console.log("hide")
		this.busyContainer.remove()
		this.busyContainer = undefined;
	};
	// visible ? desktop.showBusy(this.mainContainer): desktop.hideBusy(this.mainContainer)
}

jGridPainter3.prototype.hasLeftPanel = function() {
	return this.control.hasLeftFixedColumns
}

jGridPainter3.prototype.hasRightPanel = function() {
	return this.control.hasRightFixedColumns
}

jGridPainter3.prototype.hoverRow = function(keyID) {
	if(this.control.dataset.keyIsNumeric())
		keyID = parseInt(keyID)

	this.control.bands.each(function(i, band) {
		band.painter.contentTable.painter.hoverRow(keyID)
	})
}

jGridPainter3.prototype.focusRowByIndex = function(index) {
	this.control.bands.each(function(i, band) {
		band.painter.contentTable.painter.focusRowByIndex(index)
	})
}

jGridPainter3.prototype.focusRow = function(keyID) {
	if(this.control.dataset.gotoKey(keyID))
		this.control.bands.each(function(i, band) {
			band.painter.contentTable.painter.focusRow(keyID)
		})
	else
		this.focusRowByIndex(0)
}

jGridPainter3.prototype.deleteRow = function(keyID) {
	if(this.control.dataset.gotoKey(keyID))
		this.control.bands.each(function(i, band) {
			band.painter.contentTable.painter.deleteRow(keyID)
		})
}

jGridPainter3.prototype.updateRow = function(keyID) {
	if(this.control.dataset.gotoKey(keyID))
		this.control.bands.each(function(i, band) {
			band.painter.contentTable.painter.updateRow(keyID)
		})
}

jGridPainter3.prototype.updateHeaders = function() {
	this.control.bands.each(function(i, band) {
		band.painter.headerTable.painter.updateHeaders()
	})

}

jGridPainter3.prototype.updateSelectionHeader = function() {
	this.control.bands.each(function(i, band) {
		band.painter.headerTable.painter.updateSelectionHeader()
	})

}

jGridPainter3.prototype.updateSelectionContents = function() {
	this.control.bands.each(function(i, band) {
		band.painter.contentTable.painter.updateSelectionContents()
	})
}

jGridPainter3.prototype.showMenu = function(id, e) {	
	// console.log("here")
	var self = this;
	new JPopupDialog({
		Target: e,
		Modal: false,
		Painter: {
			painterClass: PopupBalloonPainter,
			color: "orange",
			snap: "bottom",
			align: "",
			inset: false,
			OnRenderHeader: function(dialog, container) {
				desktop.svg.draw(container, "menu").css("height", 24).css("fill", "white")
			},
			OnRenderContent: function(dialog, container) {
				container.css("overflow", "hidden");
				container.css("padding", "0");
				// container.css("padding", "0 10px 0 0");
				var collection = [];
				var menus = {
					add: function(title) {
						var main = {
							// item.subItems.push({id:"claim", icon:"db-open", title:"Claim", url:"/app/claim/0"});
							add: function(title, url, icon) {
								this.item.subItems.push({icon:icon, title:title, url:url});
								return main;
							},
							addCommand: function(title, callback, icon) {
								this.item.subItems.push({icon:icon, title:title, callback:callback});
								return main;
							}
						};
						
						collection.push(main.item = {title:title, subItems:[]});
						return main;
					}
				}
				
				self.control.events.OnPopupMenu.trigger(menus);
				
				desktop.Painter.createNavigatorMenu({
					container: container,
					theme: "grid-menu",
					menus: collection,
					click: function(e) {
						// $(e).data("callback")();
						// console.log($(e.target).data("callback"))
						// console.log($(e.target))
						// location.hash = $(e.target).attr("href");
						dialog.Hide();
					},
					init: function(container, item) {
						if(item.url) {
							container.attr("href", item.url);
							container.attr("target", "_blank");
						} else if(item.callback) {
							// container.data("callback", item.callback);
							// container.data("dialog", dialog);
							container.click(item.callback);
							// console.log(container)
						}
					}
				});
			},
			OnRenderFooter: function(dialog, container) {
				container.remove();
			}
		}
	})
}

jGridPainter3.prototype.showSelectionOptions = function(e, init) {	
	var self = this;
	new JPopupDialog({
		Target: e,
		Modal: false,
		Painter: {
			painterClass: PopupBalloonPainter,
			color: "orange",
			snap: "bottom",
			align: "",
			inset: false,
			OnRenderHeader: function(dialog, container) {
				desktop.svg.draw(container, "checkbox-multiple-blank").css("height", 24).css("fill", "white")
			},
			OnRenderContent: function(dialog, container) {
				container.css("position", "relative")
				
				var collection = [];
				var menus = {
					add: function(title) {
						var main = {
							add: function(title, url, icon) {
								this.item.subItems.push({icon:icon, title:title, url:url});
							},
							addCommand: function(title, icon, callback) {
								this.item.subItems.push({icon:icon, title:title, callback:callback});
							}
						};
						
						collection.push(main.item = {title:title, subItems:[]});
						return main;
					}
				}
				
				init(menus)
				
				desktop.Painter.createNavigatorMenu({
					container: container,
					theme: "grid-menu",
					menus: collection,
					click: function(e) {
						dialog.Hide()
					},
					init: function(container, item) {
						if(item.url) {
							container.attr("href", item.url)
							container.attr("target", "_blank")
						} else if(item.callback) {
							container.click(item.callback)
						}
					}
				});
				
			},
			OnRenderFooter: function(dialog, container) {
			}
		}
	})
}

jGridPainter3.prototype.showMasterDetail = function(cell) {	
	var row = cell.parent()
	var keyID = row.attr("row-id")
	var firstBandInContent, firstBandInContentFound = false
	this.control.bands.each(function(i, band) {
		if(!firstBandInContentFound && band.fixed === "middle") {
			firstBandInContent = band
			firstBandInContentFound = true
		}
		
		band.painter.contentTable.painter.showMasterDetail(keyID)
	})

	// var firstColumn = this.control.bands.getByIndex(0).painter.contentTable.painter.getMasterDetailFirstColumn(keyID)
	var firstColumn = firstBandInContent.painter.contentTable.painter.getMasterDetailFirstColumn(keyID)
	var self = this
	CreateElementEx("div", firstColumn, function(c1) {
		c1.addClass("master-detail-main")
		CreateElementEx("div", c1, function(c2) {
			c2.data("key-id", keyID)
			c2.addClass("master-detail-container")
			var width = 0
			self.control.eachColumn(function(column) {
				if(column.band.fixed === "middle" && column.fixedWidth)
					width += column.width
			})
			
			c2.css("width", width)
			
			var params = {
				container: c2,
				setHeight: function(height) {
					self.control.bands.each(function(i, band) {
						band.painter.contentTable.painter.setMasterDetailHeight(keyID, height)
					})
				},
				setWidth: function(width) {
					c2.css("width", width)
				}
			}
			
			self.control.events.OnMasterDetail.trigger(params)
		})
	})
}

jGridPainter3.prototype.hideMasterDetail = function(cell) {	
	var row = cell.parent()
	var keyID = row.attr("row-id")
	
	this.control.bands.each(function(i, band) {
		band.painter.contentTable.painter.hideMasterDetail(keyID)
	})
}

jGridPainter3.prototype.setRowVisible = function(keyID, visible) {
	this.control.bands.each(function(i, band) {
		band.painter.contentTable.painter.setRowVisible(keyID, visible)
	})
}

jGridPainter3.prototype.showEditDialog = function(params) {	
	var self = this;
	var title = defaultValue(this.control.methods.call("editTitle", params.mode));
	if(!title) {
		if(params.mode == "edit")
			title = "Edit"
		else if(params.mode == "new")
			title = "Add Record"
	};
	
	if(desktop.mobile) {
		CreateElementEx("div", this.parentContainer, function(container) {
			container.css({
				"width": "100%",
				"height": "100%",
				"background": "white",
				"position": "absolute",
				"top": 0,
				"left": 0,
				"z-index": ++desktop.zIndex
			});
			
			params.editForm(container, self.control);
		});
	} else {
		this.control.dataEdit.editDialog = this.control.editDialog = new JEditDialog2({
			Target: this.parentContainer,
			// Target: $("body"),
			// Target: defaultValue($("#sub-data-container"), $("#parent-sub-container")),
			ActivatingTarget: params.target,
			Modal: false,
			OnInit: function(dialog) {
				// dialog.editor.Events.OnPostSuccess.add(function(editor, info) {
					// if(info)
						// InfoDialog({
							// target: self.control.toolbar.container,
							// title: "Information",
							// message: info,
							// snap: "bottom",
							// inset: false
						// });
					
					// desktop.hideBusy()
					// self.control.Refresh();
				// });
				dialog.editor.Events.OnPostSuccess2.add(function(editor, updateRecord) {
					// TODO
					// self.control.dataset.syncRecord(updateRecord)
					// self.updateRow(self.control.dataset.getKey());
					// self.repaint();
					
					self.control.Refresh();
				});
				
				dialog.editor.Events.OnPostSuccess.add(function(editor, info) {
					if(info)
						InfoDialog({
							target: self.control.toolbar.container,
							title: "Information",
							message: info,
							snap: "bottom",
							inset: false
						});
					
					desktop.hideBusy()
					// self.control.Refresh();
				});
				
				// console.log(dialog.busiIcon)
				dialog.busiIcon.remove();
			},
			Painter: {
				snap: "bottom",
				align: "",
				width: defaultValue(self.control.options.editDialogWidth, 500),
				inset: true,
				autoHeight: true,
				OnRenderContent: function(dialog, container) {
					var c = CreateElement("div", container)
						.css("width", "100%")

					params.editForm(c, dialog); // refer to jGrid.prototype.editRecord
				},
				OnRenderHeader: function(dialog, container) {
					// container.html(title);
					var label = CreateElementEx("label", container).html(title);
					CreateElementEx("div", container, function(icon) {
						icon.attr("header-sec", "icon");
						desktop.svg.draw(icon, "refresh");
						
						dialog.busiIcon = icon;
						// save the icon element, we will remove it later adter loaded
					})
					
					new JDrag(container, container, {
					// new JDrag(label, label, {
						Moving: true,
						Sizing: false,
						SizeOffset: 1,
						AllowDrag: function(s) {
							return true;
						},
						AllowSize: function(s) {
							return false;
						},
						InitDrag: function(s, ready) {
							if(ready) {
								op = container.parent().parent().offset();
							}
						},
						Dragging: function(s, x, y, w, h) {
							container.parent().parent()
								.css("top", op.top+y)
								.css("left", op.left+x)
						},
						DragEnd: function(s) {
						}
					});
				}
			}
		});
	};
};

jGridPainter3.prototype.showExport = function() {
	var grid = this.control;
	
	this.toolbar.NewDropdownItem({
		id: "search",
		icon: "export-grid",
		iconColor: "forestgreen",
		color: "forestgreen",
		hint: "Export To Excel",
		align: "right",
		// onClose: function(dialog) {
			// grid.dataParams.unbindControls();
		// },
		painter: {
			footer: function(dialog, container) {
				CreateButton({
					container: container,
					caption: "Yes",
					style: "green",
					click: function(button) {
						if(button.enabled) {
							grid.exportGrid(dialog);
						}
					}
				});
				
				CreateButton({
					container: container,
					caption: "Close",
					enabled: true,
					style: "text",
					click: function(button) {
						dialog.Hide();
					}
				});
				
			},
			content: function(dialog, container) {
				CreateElement("div", container).html("<h2>Export to Excel<h2>").find("h2").css("margin-top", 0);
				CreateElement("div", container).html("Please confirm to export data to <b>Excel</b>.");
				// container.css("width", grid.search.searchWidth);
				// container.css("width", 200);
			}
		}
	});
};

jGridPainter3.prototype.showAdvancedSearch = function() {
	var grid = this.control;
	
	this.toolbar.NewDropdownItem({
		id: "search",
		icon: "search",
		iconColor: "#315B8F",
		color: "#315B8F",
		hint: "Advanced Search",
		align: "right",
		onClose: function(dialog) {
			grid.dataParams.unbindControls();
		},
		painter: {
			footer: function(dialog, container) {
				CreateButton({
					container: container,
					caption: "Start Search",
					style: "green",
					click: function(button) {
						if(button.enabled)
							grid.Refresh();
					}
				});
				
				CreateButton({
					container: container,
					caption: "Clear",
					style: "blue",
					click: function(button) {
						if(button.enabled)
							grid.dataParams.Events.OnClearSearch.trigger(grid);
					}
				});
				
				CreateButton({
					container: container,
					caption: "Close",
					enabled: true,
					style: "text",
					click: function(button) {
						dialog.Hide();
					}
				});
				
			},
			content: function(dialog, container) {
				container.css("width", grid.search.searchWidth);
				new JFormEditor({
					id: "xxx",
					dataset: grid.dataParams,
					dialog: dialog,
					container: container,
					containerPadding: 0,
					fillContainer: true,
					pageControlOptions: {
						theme: "search",
						iconSize: 18
					},
					pageControlTheme: "search",
					// pageControlTheme: "ddata-entry",
					showToolbar: false,
					autoHeight: true,
					url: "",
					init: function(editor) {
						grid.Events.OnInitSearch.trigger(editor);
					}
				});
			}
		}
	});
}
// *************************************************************************************************
// File name: dbgrid-columns-2.js
// Last modified on
// 15-JUL-2017
// *************************************************************************************************
//**************************************************************************************************
// jGridSection
//**************************************************************************************************
//**************************************************************************************************
Class.Inherits(jGridSection, jControl)
function jGridSection(params) {
    jGridSection.prototype.parent.call(this, params)
}

jGridSection.prototype.classID = "jGridSection"
jGridSection.prototype.painterClass = jGridSectionPainter
// jGridSection.prototype.paintImediately = false

jGridSection.prototype.initialize = function(params) {
    jGridSection.prototype.parent.prototype.initialize.call(this, params)
    this.grid = params.owner
    this.header = params.header
    this.content = params.content
    this.footer = params.footer
    this.fixed = defaultValue(params.fixed, "none")		
}
// *************************************************************************************************
// File name: dbgrid-column-painters-2.js
// Last modified on
// 15-JUL-2017
// *************************************************************************************************
//**************************************************************************************************
// jGridSectionPainter
//**************************************************************************************************
Class.Inherits(jGridSectionPainter, jBasePainter);
function jGridSectionPainter(params) {
	jGridSectionPainter.prototype.parent.call(this, params);
};

jGridSectionPainter.prototype.type = "grid";
jGridSectionPainter.prototype.classID = "jGridSectionPainter";

jGridSectionPainter.prototype.initialize = function(params) {
    jGridSectionPainter.prototype.parent.prototype.initialize.call(this, params);
	
    this.headerContainer = params.header
    this.contentContainer = params.content
    this.footerContainer = params.footer
    // this.fixed = defaultValue(params.fixed, "middle")
    this.fixed = params.fixed
};

jGridSectionPainter.prototype.paint = function(container) {
    jGridSectionPainter.prototype.parent.prototype.paint.call(this, container);
	
	// this.header = CreateElement("div", this.headerContainer, "", "")
		// .attr("grid-sec", "left-header-container")
		
	// this.content = CreateElement("div", this.contentContainer, "", "")
		// .attr("grid-sec", "left-container")
}

jGridSectionPainter.prototype.paintHeader = function(container) {
	this.header = CreateElement("div", container, "", "")
		.attr("grid-sec", this.fixed+"-container")
		
	// testing, remove later
	// CreateElement("div", this.header, "", this.fixed+"-header-container-test")	
		
	return this.header
}

jGridSectionPainter.prototype.paintFooter = function(container) {
	this.footer = CreateElement("div", container, "", "")
		.attr("grid-sec", this.fixed+"-container")
		
	// testing, remove later
	// CreateElement("div", this.footer, "", this.fixed+"-footer-container-test")	
		
	return this.footer
}

jGridSectionPainter.prototype.paintContent = function(container) {
	this.content = CreateElement("div", container, "", "")
		.attr("grid-sec", this.fixed+"-container")

	// testing, remove later
	// CreateElement("div", this.content, "", this.fixed+"-container-test")
		
	return this.content
}

jGridSectionPainter.prototype.width = function() {
	return this.content.outerWidth()
	// return this.content.width()
}

jGridSectionPainter.prototype.scroll = function(value) {
	if(this.fixed === "middle") {
		// console.log(value)
		if(this.header)
			this.header.scrollLeft(value)
		
		if(this.footer)
			this.footer.scrollLeft(value)
	} else {
		this.content.css(value)
	}
}
// *************************************************************************************************
// File name: utils-table.js
// Last modified on
// 19-JUL-2017
// *************************************************************************************************
//**************************************************************************************************
{ // jTable
//**************************************************************************************************
	Class.Inherits(jTable, jControl)
	function jTable(params) {
		jTable.prototype.parent.call(this, params)
	}

	jTable.prototype.classID = "jTable"
	jTable.prototype.painterClass = undefined
	jTable.prototype.paintImediately = true

	jTable.prototype.initialize = function(params) {
		jTable.prototype.parent.prototype.initialize.call(this, params)
		
		this.band = params.band
		this.grid = params.band.grid
		this.dataset = params.band.grid.dataset
		// console.log("here")
	}

	jTable.prototype.attr = function(name, value) {
		this.painter.table.attr(name, value)
	}

	jTable.prototype.css = function(name, value) {
		this.painter.table.css(name, value)
	}

	jTable.prototype.paintData = function() {
		this.painter.paintData()
	}

	// marge all columns from children bands of this band
	jTable.prototype.gatherColumns = function() {
		var columns = new JList()
		
		var gather = function(band) {
			band.bands.each(function(i, band) {
				gather(band)
			})
			
			band.columns.each(function(i, column) {
				columns.add(column.fname, column)
			})
		}
		
		gather(this.band)

		return columns;
	}

	jTable.prototype.countBandColumns = function(band) {
		var columns = 0 //band.columns.count()
		
		// if(band) {
			var gather = function(band) {
				band.bands.each(function(i, band) {
					gather(band)
				})
				
				columns += band.columns.count()
			}
			
			if(band)
				gather(band)
			else
				gather(this.band)
		// }
		
		// this.log(columns)
		return columns;
	}
} // jTable

//**************************************************************************************************
// jCardViewPainter
//**************************************************************************************************
Class.Inherits(jCardViewPainter, jBasePainter)
function jCardViewPainter(params) {
	jCardViewPainter.prototype.parent.call(this, params)
}

jCardViewPainter.prototype.type = "grid"
jCardViewPainter.prototype.classID = "jCardViewPainter"

jCardViewPainter.prototype.drawRow = function(row) {
}

jCardViewPainter.prototype.mouseLeave = function() {
}

jCardViewPainter.prototype.doPaint = function(update) {
	var self = this;
	var grid = this.control.grid;
	var dataset = grid.dataset;
	
	dataset.each(function(row, rowNo) {
		CreateElementEx("div", self.parentContainer, function(card) {
			card.addClass("card");
			card.attr("grid-sec", "card");
			card.attr("row-id", dataset.getKey(rowNo));
			
			grid.events.OnInitCard.trigger(card);
		})
	});
}

jCardViewPainter.prototype.update = function() {
	// console.log("update")
	this.parentContainer.html("");
	this.doPaint(true)
}

jCardViewPainter.prototype.paint = function() {
    jCardViewPainter.prototype.parent.prototype.paint.call(this)
	this.doPaint(false)
}

jCardViewPainter.prototype.focusRowByIndex = function() {
}

jCardViewPainter.prototype.updateSelectionContents  = function() {
}

//**************************************************************************************************
// jTableBasePainter
//**************************************************************************************************
Class.Inherits(jTableBasePainter, jBasePainter)
function jTableBasePainter(params) {
	jTableBasePainter.prototype.parent.call(this, params)
}

jTableBasePainter.prototype.type = "grid"
jTableBasePainter.prototype.classID = "jTableBasePainter"

jTableBasePainter.prototype.getContent = function(column) {
	return ""
}

jTableBasePainter.prototype.drawCell = function(cell, column) {
	cell.addClass("cell")
	// if(column.command)
		// cell.addClass("command-cell")
	// else
		// cell.addClass("cell")
}

jTableBasePainter.prototype.createRow = function() {
	return CreateElement("tr", this.body)
		.addClass("row")
		.attr("grid-sec", "row")
}

jTableBasePainter.prototype.drawRow = function(row) {
}

jTableBasePainter.prototype.mouseLeave = function() {
}

jTableBasePainter.prototype.doPaint = function(update) {
	if(update)
		this.table.remove()
	else
		this.container = CreateElement("div", this.parentContainer)
			.addClass("band")
			.attr("grid-sec", "band")
			.attr("band", this.control.band.id)
			
	// if(!this.control.grid.options.autoScroll)
	if(!this.control.grid.options.horzScroll)
		this.container.css("flex", 1)
			
	if(this.control.band.filler) {
		this.container.addClass("band-filler")
		this.container.css("flex-grow", "1")
		this.container.css("flex-shrink", "1")
	}
	
	this.table = CreateElement("table", this.container)
		.addClass("data-table")
		.attr("table-sec", "main")
		.attr("grid-sec", this.control.params.section)
		.attr("border", 0)
		.attr("cellspacing", 0)
		.attr("cellspacing", 0)
		
	if(this.classID === "jTableHeaderPainter" ) {
		this.table.attr("band-sec", "header")
	} else if(this.classID === "jTableContentPainter" ) {
		this.table.attr("band-sec", "content")
	} else if(this.classID === "jTableFooterPainter" ) {
		this.table.attr("band-sec", "footer")
	}
		
	this.colGroup = CreateElement("colgroup", this.table)
	
	var self = this, columns = this.control.gatherColumns()
	this.tableWidth = 0	
	columns.each(function(i, column) {
		self.tableWidth += column.width
	})
	columns.each(function(i, column) {
		var col = CreateElement("col", self.colGroup)
			.css("white-space", "nowrap")
			.css("overflow", "hidden")
			
		if(column.fixedWidth)
			col.css({
				"width": column.width,
				"min-width": column.width,
				"max-width": column.width
			})
		else if(typeof column.width === "string")
			col.css("width", column.width)
		else {
			if(column.command)
				col.css({
					// "width": desktop.mobile ? "2em": 32
					// "width": desktop.mobile ? 40: 32
					"width": desktop.mobile ? "11vmin": 32
				})
			else
				col.css({
					"width": (column.width / self.tableWidth * 100) + "%"
				})
		}

		if(self.classID === "jTableHeaderPainter" )
			column.colGroupHeader = col
		else if(self.classID === "jTableContentPainter" )
			column.colGroupContent = col
		else if(self.classID === "jTableFooterPainter" )
			column.colGroupFooter = col		
		else
			column.colGroup = col
	})
	
		
	if(this.control.band.filler) {
		this.table.css("width", "100%")
	} else {
		if(this.control.params.mainSection === "middle" && !this.control.grid.options.horzScroll) {		
			this.container.css("width", "100%")
			this.table.css("width", "100%")
		} else	
			this.table.css("width", this.tableWidth)
	}
	
	this.body = CreateElement("tbody", this.table).attr("grid-sec", "data")
}

jTableBasePainter.prototype.update = function() {
	this.doPaint(true)
}

jTableBasePainter.prototype.paint = function() {
    jTableBasePainter.prototype.parent.prototype.paint.call(this)
	this.doPaint(false)
}

jTableBasePainter.prototype.getCommandHeaderIcon = function(column, noDefault) {
	var icon = this.control.grid.methods.call("getCommandHeaderIcon", column)
	
	if(!icon && !noDefault)
		return this.getCommandIcon(column)
	else
		return icon		
}

jTableBasePainter.prototype.getCommandIcon = function(column) {
	return this.control.grid.methods.call("getCommandIcon", column)
}

jTableBasePainter.prototype.getCommandHint = function(column) {
	// return this.control.grid.methods.call("getCommandHint", column) || "..."
	return this.control.grid.methods.call("getCommandHint", column) || ""
}

jTableBasePainter.prototype.setCommandHint = function(cell, column) {
	var hint = this.getCommandHint(column);
	if(hint) {
		// cell.data("hintTarget", column.colHeader);
		// desktop.SetHint(cell.data("hintTarget", column.colHeader), hint, "top")
		desktop.SetHint(cell.data("hintTarget", cell), hint, "top")
	}
}

//**************************************************************************************************
// jTableHeaderFooterPainter
//**************************************************************************************************
Class.Inherits(jTableHeaderFooterPainter, jTableBasePainter)
function jTableHeaderFooterPainter(params) {
	jTableHeaderFooterPainter.prototype.parent.call(this, params)
}

jTableHeaderFooterPainter.prototype.type = "grid"
jTableHeaderFooterPainter.prototype.classID = "jTableHeaderFooterPainter"

jTableHeaderFooterPainter.prototype.drawCell = function(cell, column) {
	jTableHeaderFooterPainter.prototype.parent.prototype.drawCell.call(this, cell, column)
		
	var self = this
	
	if(column.command) {
		// cell.attr("header-sec", "command")
		// cell.attr("command", column.command)
		// desktop.svg.draw(cell, this.control.grid.methods.call("getCommandIcon", column))
	} else {
		CreateElementEx("table", cell, function(table) {
			table.addClass("header-table")
				.attr("header-sec", "header")
				.attr("border", 0)
				.attr("cellspacing", 0)
				.attr("cellspacing", 0)
				
			CreateElementEx("tbody", table, function(body) {
				self.content = CreateElementEx("tr", body, function(row) {
					self.label = CreateElementEx("td", row, function(label) {
						label.addClass("header-label")
						label.attr("header-sec", "label")
						label.html(self.getContent(column))
					})
				})
			})
		})
	}
}

//**************************************************************************************************
// jTableHeaderPainter
//**************************************************************************************************
Class.Inherits(jTableHeaderPainter, jTableHeaderFooterPainter)
function jTableHeaderPainter(params) {
	jTableHeaderPainter.prototype.parent.call(this, params)
}

jTableHeaderPainter.prototype.type = "grid"
jTableHeaderPainter.prototype.classID = "jTableHeaderPainter"

jTableHeaderPainter.prototype.getContent = function(column) {
	var dbCol = column.grid.dataset.columnByName(column.fname)
	if(dbCol)
		return dbCol.label
	else
		return ""
}

jTableHeaderPainter.prototype.paint = function() {
    jTableHeaderPainter.prototype.parent.prototype.paint.call(this)

	var self = this
	
	if(this.control.grid.options.showBand) {
		var matrix = []
		var rowCount = this.control.grid.painter.bandMaxLevels()		
		var colCount = this.control.countBandColumns(this.band)
		
		for(var r = 0; r < rowCount; r++) {
			var row = CreateElement("tr", this.body)
				.addClass("row")
				.addClass("band-row")
				.attr("grid-sec", "band-row")
				
			matrix.push([])
			
			for(var c = 0; c < colCount; c++) {
				var col = CreateElement("td", row)
					.addClass("cell")
					.addClass("band-cell")
					.attr("grid-sec", "band-header")
					.attr("used", "0")
					
				matrix[r].push(col)
			}
		}
		
		var gather = function(band, pos) {
			band.pos = pos
			var columnCount = self.control.countBandColumns(band)
			var col = matrix[band.level-1][pos]
						.attr("colspan", columnCount)
						.attr("used", "1")
						.html(band.caption)
			
			var levels = self.control.grid.painter.bandMaxLevels()
			if(band.bands.count() == 0 && band.level < levels) 
				col.attr("rowspan", levels-band.level+1)
			else {
				var p = 0
				band.bands.each(function(i, band) {
					gather(band, p + band.band.pos)
					p += (self.control.countBandColumns(band))
				})
			}
				
		}
		
		gather(this.control.band, 0)
		
		this.table.find("td[used='0']").each(function(i, e) {
			$(e).remove()
		})
	}
	
	// this.row = CreateElement("tr", this.body).attr("grid-sec", "row")
	this.row = this.createRow()
	
	var columns = this.control.gatherColumns()
	columns.each(function(i, column) {
		var cell = CreateElement("td", self.row).attr("grid-sec", "data")
		self.drawCell(cell, column)
	})
}

jTableHeaderPainter.prototype.updateHeaders = function() {
	this.table.find("td[grid-sec='sort']").each(function(i, e) {
		$(e).trigger("update")
	})
}

jTableHeaderPainter.prototype.updateSelectionHeader = function() {
	this.table.find("td[command='select']").each(function(i, e) {
		$(e).trigger("update")
	})
}

jTableHeaderPainter.prototype.drawCell = function(cell, column) {
	jTableHeaderPainter.prototype.parent.prototype.drawCell.call(this, cell, column)
	var self = this;
	cell.addClass("header-cell")
		
	column.colHeader = cell
	cell.data("column", column)
	
	if(column.command) {
		// this.setCommandHint(cell, column)
		cell.addClass("command-cell")
		cell.attr("command", column.command)
		if(column.internal) {
			if(column.command == "select") {
				cell.on("update", function() {
					$(this).html("")
					if(column.grid.selections.length == 0) {
						$(this).attr("select-mode", "none")
						desktop.svg.draw($(this), "checkbox-multiple-blank")
					} else if(column.grid.selections.length == column.grid.row_count) {
						$(this).attr("select-mode", "all")
						desktop.svg.draw($(this), "checkbox-multiple-marked-all")
					} else {
						$(this).attr("select-mode", "some")
						desktop.svg.draw($(this), "checkbox-multiple-marked-some")
					}
				}).click(function() {
					$(this).data("column").grid.showSelectionOptions($(this), function(menu) {
						var selection = menu.add("Selection")
						selection.addCommand("Clear all selections", "checkbox-multiple-blank", function() {
							column.grid.selections = []
							column.grid.painter.updateSelectionHeader()
							column.grid.painter.updateSelectionContents()
							column.grid.updateSelections()
						})
						selection.addCommand("Clear all selections in this page", "checkbox-multiple-marked-some", function() {
							column.grid.dataset.each(function(row, i) {
								var index = column.grid.selections.indexOf(row[column.grid.dataset.primaryKey])
								if(index > -1)
									column.grid.selections.splice(index, 1)
							})
							column.grid.painter.updateSelectionHeader()
							column.grid.painter.updateSelectionContents()
							column.grid.updateSelections()
						})
						selection.addCommand("Select all in this page", "checkbox-multiple-marked-all", function() {
							column.grid.dataset.each(function(row, i) {
								column.grid.selections.push(row[column.grid.dataset.primaryKey])
							})
							column.grid.painter.updateSelectionHeader()
							column.grid.painter.updateSelectionContents()
							column.grid.updateSelections()
						})
					})
				})
			// } else if(column.command == "master-detail") {
				// command = desktop.svg.draw(cell, this.getCommandHeaderIcon(column))
			} else {
				// desktop.svg.draw(cell, "db-" + column.command)
				desktop.svg.draw(cell, this.getCommandHeaderIcon(column))
			}
		} else {
			// this.setCommandHint(cell, column)
			desktop.svg.draw(cell, this.getCommandHeaderIcon(column))
		}
		
		return
	} 
	
	if(column.allowSort) {
		CreateElementEx("td", this.content, function(btn) {
			btn.addClass("header-icon")
			btn.data("column", column)
			btn.attr("header-sec", "icon")
			btn.attr("grid-sec", "sort")
			desktop.svg.draw(btn, "db-sort")
		}).on("update", function() {
			var column = $(this).data("column")
			var order = self.control.grid.dataParams.get("order")
			
			$(this).find("svg").remove()
			if(self.control.grid.dataParams.get("sort") === column.fname) {
				$(this).attr("sorted", "1")
				$(this).attr("sort-order", order)
				if(order === "asc")
					desktop.svg.draw($(this), "chevron-up")
				else
					desktop.svg.draw($(this), "chevron-down")
			} else {
				$(this).attr("sorted", "0")
				$(this).attr("sort-order", "")
				desktop.svg.draw($(this), "db-sort")
			}
		}).click(function() {
			var column = $(this).data("column")
			var order = $(this).attr("sort-order")
			
			self.control.grid.dataParams.set("sort", column.fname)
			if(order === "asc")
				self.control.grid.dataParams.set("order", "desc")
			else 
				self.control.grid.dataParams.set("order", "asc")
			
			self.control.grid.refresh()
		})
	}
		
	if(column.allowFilter) {
		var sort = CreateElement("div", this.content)
			.attr("grid-sec", "filter")
	}
	
	{ // Resizing column
		var self = this;
		cell.on("mousemove", function() {
			// var target = $(event.target);
			var target = $(this);
			var xy = target.offset();
			var x = event.pageX - xy.left + 1;
			// var y = event.pageY - xy.top + 1;
			var w = target.outerWidth();
			// var h = target.outerHeight();
			
			if(x >= w-2 && x <= w) {
				target.css("cursor", "col-resize")
				target.data("sizing-ready", true)
			} else {
				target.css("cursor", "")
				target.data("sizing-ready", false)
			}
		})
		
		cell.on("mousedown", function() {
			var target = $(this);
			if(target.data("sizing-ready") {
				var xy = target.offset();
				var xy2 = self.parentContainer.offset();
				var x = event.pageX - xy.left + 1;
				var y = event.pageY - xy.top + 1;
				var w = target.outerWidth();
				var h = target.outerHeight();
				
				// console.log({xy:xy, xy2:xy2})
				
				var sizer = CreateElement("div", self.control.grid.painter.mainContainer)
					.css("position", "fixed")
					.css("top", xy2.top)
					.css("left", xy.left + w)
					.css("width", 3)
					.css("height", self.control.grid.painter.mainContainer.outerHeight()
									- self.control.grid.painter.mainHeader.outerHeight()
									- self.control.grid.painter.mainFooter.outerHeight()
									+ self.table.outerHeight()
									)
					// .css("height", 200)
					.css("background", "rgba(0,0,0,0.25)")
					.css("z-index", desktop.zIndex++)
					
				target.data("sizer", sizer)
				
				// self.control.grid.painter.leftSection.contentContainer.css("pointer-events", "none")
				$("#desktop-container").css("pointer-events", "none")
				$("body").css("cursor", "col-resize")
				
				$("body").on("mouseup", function() {
					var sizer = target.data("sizer")
					if(sizer) {
						var x = event.pageX
						var xy = target.offset()
						
						if(sizer && x - xy.left > 0) {
							var width = x - xy.left
							
							// console.log(target.data("column").colGroupHeader)
							// console.log(target.data("column").colGroupContent)
							// console.log(target.data("column").colGroupFooter)
							
							if(target.data("column").colGroupHeader)
								target.data("column").colGroupHeader
									.css("width", width)
									.css("max-width", width)
									.css("min-width", width)
								
							if(target.data("column").colGroupContent)
								target.data("column").colGroupContent
									.css("width", width)
									.css("max-width", width)
									.css("min-width", width)
								
							if(target.data("column").colGroupFooter)
								target.data("column").colGroupFooter
									.css("width", width)
									.css("max-width", width)
									.css("min-width", width)
								
							// console.log({width:target.data("column").colGroup.width(), newWidth:width})
							// target.data("column").colGroup.css("width", width)
						}
						
						target.data("sizer").remove()
						target.removeData("sizer")
						target.removeData("sizing-ready")
						
						$("body").off("mouseup") // important! turn off					
						$("body").off("mousemove") // important! turn off					
						$("body").css("cursor", "")
						$("#desktop-container").css("pointer-events", "")
						
						// console.log("done")
					}
				})
				
				$("body").on("mousemove", function() {
					var xy = target.offset();
					var x = event.pageX;
					var y = event.pageY;
					var sizer = target.data("sizer")
					if(sizer && x - xy.left > 0) {
						sizer.css("left", x)
						xy.width = x - xy.left
						
					}
					// console.log(xy)
				})
			}
		})
		
		// cell.on("mouseup", function() {
			// var target = $(this)
			// if(target.data("sizer")) {
				// target.data("sizer").remove()
				// target.removeData("sizer")
			// }
		// })
	} // Resizing column
}

//**************************************************************************************************
// jTableFooterPainter
//**************************************************************************************************
Class.Inherits(jTableFooterPainter, jTableHeaderFooterPainter)
function jTableFooterPainter(params) {
	jTableFooterPainter.prototype.parent.call(this, params)
}

jTableFooterPainter.prototype.type = "grid"
jTableFooterPainter.prototype.classID = "jTableFooterPainter"

jTableFooterPainter.prototype.getContent = function(column) {
	// return "..."
	return ""
}

jTableFooterPainter.prototype.drawCell = function(cell, column) {
	jTableFooterPainter.prototype.parent.prototype.drawCell.call(this, cell, column)	
	cell.addClass("footer-cell")
	if(column.showFooter) {
		cell.addClass("footer-enabled");
		if(this.control.grid.footerData) {
			cell.html(this.control.grid.footerData.text(column.fname));
			if(this.control.grid.footerData.Columns.get(column.fname).numeric)
				cell.addClass("cell-numeric")
		};
	}
}

jTableFooterPainter.prototype.paintContent = function(update) {
	var self = this
	// this.row = CreateElement("tr", this.body).attr("grid-sec", "row")
	if(update) this.row.remove();
	this.row = this.createRow()
	
	var columns = this.control.gatherColumns()
	// this.control.band.columns.each(function(i, column) {
	columns.each(function(i, column) {
		var cell = CreateElement("td", self.row).attr("grid-sec", "data")
		self.drawCell(cell, column)
	})
};

jTableFooterPainter.prototype.paint = function() {
    jTableFooterPainter.prototype.parent.prototype.paint.call(this);
	this.paintContent();
}

jTableFooterPainter.prototype.update = function() {
    jTableFooterPainter.prototype.parent.prototype.update.call(this);
	this.paintContent(true);
}

//**************************************************************************************************
// jTableContentPainter
//**************************************************************************************************
Class.Inherits(jTableContentPainter, jTableBasePainter)
function jTableContentPainter(params) {
	jTableContentPainter.prototype.parent.call(this, params)
}

jTableContentPainter.prototype.type = "grid"
jTableContentPainter.prototype.classID = "jTableContentPainter"

jTableContentPainter.prototype.initialize = function(params) {
	jTableContentPainter.prototype.parent.prototype.initialize.call(this, params)
	
	this.treeViewCells = new JList(true)
}

jTableContentPainter.prototype.getContent = function(column) {
	return this.control.band.grid.dataset.text(column.fname)
}

jTableContentPainter.prototype.updateSelectionContents = function() {
	// console.log("here")
	this.table.find("td[command='select']").each(function(i, e) {
		$(e).trigger("update")
	})
}

jTableContentPainter.prototype.drawRow = function(row) {
	jTableContentPainter.prototype.parent.prototype.drawRow.call(this, row)
	this.control.grid.events.OnInitRow.trigger(row)
}

jTableContentPainter.prototype.drawCell = function(cell, column) {
	jTableContentPainter.prototype.parent.prototype.drawCell.call(this, cell, column)
	cell.addClass("data-cell")

	var self = this
	if(column.command) {		
		var command
		
		if(column.grid.methods.call("allowCommand", column)) {
			cell.addClass("command-cell")
			cell.attr("command", column.command)
			if(column.internal) {
				if(column.command == "select") {
					cell.data("grid", column.grid)
					cell.data("row-id", cell.parent().attr("row-id"))
					cell.on("update", function() {
						$(this).html("")
						var grid = $(this).data("grid")
						if(grid.selections.indexOf(grid.dataset.parseKeyValue($(this).data("row-id"))) > -1) {
							desktop.svg.draw($(this), "checkbox-marked")
							$(this).attr("is-selected", "1")
						} else {
							desktop.svg.draw($(this), "checkbox-blank-outline")
							$(this).removeAttr("is-selected")
						}
					})
					
					command = desktop.svg.draw(cell, "checkbox-blank-outline")
				} else if(column.command == "master-detail") {
					command = desktop.svg.draw(cell, "tree-collapse")
					cell.data("expanded", false)
					cell.bind("update", function() {
						var cell = $(this)
						var expanded = !$(this).data("expanded")
						cell.html("")
						if(expanded) {
							desktop.svg.draw(cell, "tree-expand")
							self.control.grid.painter.showMasterDetail(cell)
						} else {
							desktop.svg.draw(cell, "tree-collapse")
							self.control.grid.painter.hideMasterDetail(cell)
						}
						
						$(this).data("expanded", expanded)
					})
				} else {
					if(column.command === "open" && column.grid.options.editNewPage) {
						CreateElementEx("a", cell, function(anchor) {
							anchor.attr("href", column.grid.methods.call("editPageUrl", cell.parent().attr("row-id")))
							command = desktop.svg.draw(anchor, self.getCommandIcon(column))
						})
					} else {
						command = desktop.svg.draw(cell, "db-" + column.command)
					}
				}
			
			} else {
				CreateElementEx("a", cell, function(anchor) {
					var href = column.grid.methods.call("getCommandUrl", column)
					if(href) anchor.attr("href", href)
					command = desktop.svg.draw(anchor, self.getCommandIcon(column))
				})
			}
		}
		
		if(command) {
			var animate = "ani-scale";
			var waitAnimation = true;
			
			this.setCommandHint(cell, column);
			cell.data("column", column);
			cell.bind("exec", function() {
				var params = {};
				params.element = $(this);
				params.column = $(this).data("column");
				params.command = params.column.command;
				params.row = $(this).parent();
				params.id = params.row.attr("row-id");
				
				column.grid.dataset.gotoKey(params.id);
				
				column.grid.events.OnCommand.trigger(params);
			});
			
			cell.click(function() {
				if(desktop.mobile && waitAnimation) {
					var x = $(this).attr(animate, "1");
					setTimeout(function() {
						x.attr(animate, "").trigger("exec");
					} , 250);
				} else
					$(this).trigger("exec");
				
				// var params = {};
				// params.element = $(this);
				// params.column = $(this).data("column");
				// params.command = params.column.command;
				// params.row = $(this).parent();
				// params.id = params.row.attr("row-id");
				
				// column.grid.dataset.gotoKey(params.id);
				
				// column.grid.events.OnCommand.trigger(params);
			})
		}
	} else {
		
		var dbCol = column.grid.dataset.columnByName(column.fname)
		
		if(dbCol) {
			if(self.control.grid.options.viewType === "treeview" && column.fname === self.control.grid.options.treeViewSettings.columnName) {
				{ // draw the tree view cell
					cell.addClass("tree-cell")
					cell.attr("tree-view", "1")					
					cell.bind("update", function(event, row) {
						// this event is called from row.add event
						var btn = $(this).data("btn")
						var parentLevel = $(this).parent().data("level")
						
						for(var i = 0; i < parentLevel-1; i++) {
							CreateElementEx("div", undefined, function(filler) {
								filler.attr("tree-sec", "filler")
								btn.before(filler)
							})
						}
					})
					
					CreateElementEx("div", cell, function(container) {
						cell.data("tree-container", container)
						
						container.attr("tree-sec", "container")
						
						// create the button
						CreateElementEx("div", container, function(btn) {
							cell.data("btn", btn)
							
							btn
								.data("parent-row", cell.parent())
								.attr("tree-sec", "btn")
								.click(function() {
									if($(this).data("parent-row").data("children").length)
										$(this).data("parent-row").trigger("collapse-expand")
								})
						})
						
						// add custom buttons here
						var eventParams = {
							container: container,
							addIcon: function(params) {
								CreateElementEx("div", this.container, function(btn) {
									btn
										.attr("tree-sec", "icon")
										.attr("icon-name", params.name)
									
									desktop.svg.draw(btn, params.icon)
								})
							},
							addCommand: function(params) {
								CreateElementEx("div", this.container, function(btn) {
									btn
										.attr("tree-sec", "command")
										.attr("command-name", params.name)
										.click(function() {
											// $(this).data("parent-row").trigger("collapse-expand")
										})
									
									desktop.svg.draw(btn, params.icon)
								})
							}
						}
						
						self.control.grid.events.OnTreeViewButtons.trigger(eventParams)
						
						// create the label/caption
						CreateElementEx("div", container, function(label) {
							cell.data("label", label)
							label.attr("tree-sec", "label")
							
							label.html(self.control.dataset.text(column.fname))
						})
					})
				} // end: draw the tree view cell
				
				{ // prepare the tree row
					var keyID = self.control.grid.options.treeViewSettings.keyColumnName // this is the column name, not the value
					var parentID = self.control.grid.options.treeViewSettings.parentColumnName // this is the column name, not the value
					var row = cell.parent()
					
					row
						.data("children", [])
						.data("tree-cell", cell)
						.data("id", keyID)
						.data("parentID", parentID)
						.data("level", 1)
						.data("expanded", true)
						.data("btnDrawn", false)
						.attr("tree-expanded", 1)
						.attr("tree-level", 1)
						.attr("tree-id", self.control.dataset.get(keyID))
						.attr("tree-parent-id", self.control.dataset.get(parentID))
						.bind("add", function(event, child) { // child is a row (TD)
							// push child row to parent array of children
							$(this).data("children").push(child)

							// set the level of this child row
							var level = $(this).data("level") + 1
							child.data("level", level)
							child.attr("tree-level", level)  // set the attribute level
							
							// update the indenting of the child cell
							child.data("tree-cell").trigger("update", [child])
							
							// if this is a parent, then draw the collapse/expand svg
							if(!$(this).data("btnDrawn")) {
								$(this).data("btnDrawn", true)
								
								var btn = $(this).data("tree-cell").data("btn")
								desktop.svg.draw(btn, "tree-expand")
							}
							
							// set the parent row of this child row
							child.data("parent-row", $(this))
						})
						.bind("collapse-expand", function() {
							var btn = $(this).data("tree-cell").data("btn")
							var expanded = !$(this).data("expanded")
							$(this).data("expanded", expanded)
							
							btn.html("")
							btn.data("parent-row").attr("tree-expanded", expanded ? 1: 0)
							desktop.svg.draw(btn, expanded ? "tree-expand": "tree-collapse")
							
							var expandCollapse = function(rows) {
								$(rows).each(function(i, row) {									
									var parentRow = row.data("parent-row")
									
									if(!expanded || (parentRow.data("expanded") && parentRow.attr("row-visible") === "1")
										self.control.grid.painter.setRowVisible(row.attr("row-id"), expanded)
									
									if(row.data("children").length)
										expandCollapse(row.data("children"))
								})
							}
							
							expandCollapse($(this).data("children"))
						})
						
					// if(!self.tree) self.tree = new JList(true)
					self.tree.add(self.control.dataset.get(keyID), row)
					var parentRow = self.tree.get(self.control.dataset.get(parentID))
					if(parentRow) {
						parentRow.trigger("add", [row])
					}
				
					
				} // end: prepare the tree row
			} else {				
				if(column.drawContent)
					column.drawContent(cell)
				else if(column.linkField) {
					cell.addClass("cell-link")
					CreateElementEx("a", cell, function(link) {
						link.attr("href", self.control.grid.methods.call("getLinkUrl", {column:column, id:self.control.dataset.get(column.linkField)}));
						link.html(self.control.dataset.text(column.fname));
					});
				} else
					cell.html(this.control.dataset.text(column.fname));
				
				if(this.control.dataset.Columns.get(column.fname).numeric)
					cell.addClass("cell-numeric")
			}
		}
	}
}

jTableContentPainter.prototype.hoverRow = function(keyID) {
	if(this.currentRow) {
		this.currentRow.removeAttr("hover")
		if(this.currentRow.data("previewRow"))
			this.currentRow.data("previewRow").removeAttr("hover")
	}
	
	this.currentRow = this.rows.get(keyID)
	this.currentRow.attr("hover", "1")
	if(this.currentRow.data("previewRow"))
		this.currentRow.data("previewRow").attr("hover", "1")
}

jTableContentPainter.prototype.focusRow = function(keyID) {
	if(this.focusedRow) {
		this.focusedRow.removeAttr("focused")
		if(this.focusedRow.data("previewRow"))
			this.focusedRow.data("previewRow").removeAttr("focused")
	}
	
	this.focusedRow = this.rows.get(keyID)
	
	if(this.focusedRow) {
		this.focusedRow.attr("focused", "1")
		if(this.focusedRow.data("previewRow"))
			this.focusedRow.data("previewRow").attr("focused", "1")
	}
}

jTableContentPainter.prototype.deleteRow = function(keyID) {
	this.focusedRow = this.rows.get(keyID)
	if(this.focusedRow)
		this.focusedRow.remove()
}

jTableContentPainter.prototype.updateRow = function(keyID) {
	// this.focusedRow = this.rows.get(keyID)
	// if(this.focusedRow)
		// this.focusedRow.remove()
}

jTableContentPainter.prototype.focusRowByIndex = function(index) {
	if(this.focusedRow)
		this.focusedRow.removeAttr("focused")
	
	this.focusedRow = this.rows.getByIndex(index)
	
	if(this.focusedRow)
		this.focusedRow.attr("focused", "1")
}

jTableContentPainter.prototype.mouseLeave = function() {
	if(this.currentRow) {
		this.currentRow.removeAttr("hover")
		this.currentRow = undefined
	}
}

jTableContentPainter.prototype.initialize = function(params) {
    jTableContentPainter.prototype.parent.prototype.initialize.call(this, params)

	// console.log(this.control.grid)
	// this.control.grid.dataset.Events.OnMoveRecord.add(function(dataset) {
		// console.log(dataset.getKey())
	// })
}

jTableContentPainter.prototype.paintContent = function(update) {
	var self = this
	var band = this.control.band
	var grid = this.control.band.grid
	var dataset = this.control.band.grid.dataset
		
	this.currentRow	= undefined
	this.tree = new JList(true)
	
	if(update) this.rows.clear()
	this.rows = new JList(dataset.keyIsNumeric())
	
	var columns = this.control.gatherColumns()
	
	dataset.each(function(row, rowNo) {
		dataset.recNo = rowNo
		var row = self.createRow()
			.addClass((rowNo & 1) ? "odd" : "")
			.attr("row-id", dataset.getKey(rowNo))
			.attr("row-visible", 1)
			.on("mouseenter", function(e) {
				self.control.grid.painter.hoverRow($(this).attr("row-id"))
			})
			.on("click", function(e) {
				self.control.grid.painter.focusRow($(this).attr("row-id"))
			})
			.on("dblclick", function(e) {
				self.control.grid.editRecord($(this).attr("row-id"), $(this))
			})
			.on("contextmenu", function(e) {
				self.control.grid.painter.focusRow($(this).attr("row-id"));
				if(self.control.grid.options.showPopupMenu && !$(e.target).is("a")) {
					self.control.grid.showMenu($(this).attr("row-id"), $(e.target));
					e.preventDefault();
				}
			})
			
		if(grid.options.showPreviewRow) {
			var previewRow = self.createRow()
				.addClass("preview-row")
				.addClass((rowNo & 1) ? "odd" : "")
				.attr("row-id", dataset.getKey(rowNo))
				.attr("row-visible", 1)
				.data("parentRow", row)
				.on("mouseenter", function(e) {
					self.control.grid.painter.hoverRow($(this).attr("row-id"))
				})
				.on("click", function(e) {
					self.control.grid.painter.focusRow($(this).attr("row-id"))
				})
				.on("dblclick", function(e) {
					self.control.grid.editRecord($(this).attr("row-id"), $(this))
				})
				
				CreateElementEx("td", previewRow, function(col) {
					col.attr("colspan", columns.count())
				})
				
			row.data("previewRow", previewRow)
		}
		
		self.drawRow(row)
		self.rows.add(dataset.getKey(rowNo), row)
		
		columns.each(function(i, column) {
			self.drawCell(CreateElement("td", row), column)
		})
	})
	
	dataset.recNo = 0
}

jTableContentPainter.prototype.update = function() {
	jTableContentPainter.prototype.parent.prototype.update.call(this)
	// console.log("update")
	this.paintContent(true)
}

jTableContentPainter.prototype.paint = function() {
    jTableContentPainter.prototype.parent.prototype.paint.call(this)
	this.paintContent()
}

jTableContentPainter.prototype.setRowVisible = function(keyID, visible) {
	var row = this.rows.get(keyID)
	if(row) row.attr("row-visible", visible ? 1: 0)
}

jTableContentPainter.prototype.getMasterDetailFirstColumn = function(keyID) {
	var currentRow = this.rows.get(keyID)
	return currentRow.data("master-detail-cell")
}

jTableContentPainter.prototype.hideMasterDetail = function(keyID) {
	this.rows.get(keyID).data("master-detail").remove()
}

jTableContentPainter.prototype.showMasterDetail = function(keyID) {
	var self = this
	var currentRow = this.rows.get(keyID)
	
	CreateElementEx("tr", undefined, function(row) {
		currentRow.after(row)
		currentRow.data("master-detail", row)

		row.attr({
			"row-id": keyID,
			"row-type": "master-detail"			
		}).addClass("master-detail-row")
		
		CreateElementEx("td", row, function(cell) {
			currentRow.data("master-detail-cell", cell)
			cell.attr({
				"key-id": keyID,
				"cell-type": "master-detail",
				"colspan": self.control.countBandColumns(self.control.band)
			}).css({
				// "border": 0
			})
		})			
	})
}

jTableContentPainter.prototype.setMasterDetailHeight = function(keyID, height) {
	this.rows.get(keyID).data("master-detail-cell").css("height", height)
}// *************************************************************************************************
// File name: dbgrid-pager-2.js
// Last modified on
// 25-JUL-2017
// *************************************************************************************************
//**************************************************************************************************
// jPager
//**************************************************************************************************
Class.Inherits(jPager, jControl)
function jPager(params) {
	jPager.prototype.parent.call(this, params)
}

jPager.prototype.classID = "jPager"
jPager.prototype.controlType = "pager"
jPager.prototype.painterClass = jPagerPainter
jPager.prototype.paintImediately = true

jPager.prototype.initialize = function(params) {
    jPager.prototype.parent.prototype.initialize.call(this, params)
	
	this.grid = params.grid
	this.dataset = params.grid.dataset
	this.rowsPerPage = defaultValue(params.rowsPerPage, [25,50,75,100])
	
	// this.dataset = params.grid.dataset
}

jPager.prototype.gotoPage = function(page) {
	this.grid.dataParams.set("page", page)
	this.grid.refresh()	
}

jPager.prototype.prevPage = function() {
	var page = this.grid.dataParams.get("page")
	
	if(page > 1) {
		this.gotoPage(page-1)
	} else {
		// this.painter.label1.trigger("off")
	}
}

jPager.prototype.nextPage = function() {
	var page = this.grid.dataParams.get("page")
	
	if(page < this.grid.page_count)
		this.gotoPage(page+1)
	else {
		
	}		
}

jPager.prototype.update = function() {
	this.painter.update()
}

//**************************************************************************************************
// jPagerPainter
//**************************************************************************************************
Class.Inherits(jPagerPainter, jBasePainter)
function jPagerPainter(params) {
	jPagerPainter.prototype.parent.call(this, params)
}

jPagerPainter.prototype.type = "grid"
jPagerPainter.prototype.classID = "jPagerPainter"

jPagerPainter.prototype.update = function() {
	this.label1.trigger("update")
	this.label2.trigger("update")
	this.btnPrev.trigger("update")
	this.btnNext.trigger("update")
	this.pages.trigger("update")
}

jPagerPainter.prototype.paint = function(container) {
    jPagerPainter.prototype.parent.prototype.paint.call(this, container)
	
	var self = this
	var grid = this.control.grid
	var mainContainer = this.creaMainContainer(container, "pager2", this.control.paintParams.theme)
	
	CreateElementEx("div", mainContainer, function(buttonContainer) {
		buttonContainer.attr("pager-sec", "button-container")
		
		CreateElementEx("div", buttonContainer, function(btn) {
			btn.attr("button-sec", "prev")
			
			self.btnPrev = desktop.GetSvg(btn, "db-prevpage")
				.on("update", function() {
					if(grid.page == 1)
						$(this).attr("active", "off")
					else
						$(this).attr("active", "on")
				})
				.click(function() {
					self.control.prevPage()
				})
		})
		
		CreateElementEx("div", buttonContainer, function(btn) {
			btn.attr("button-sec", "next")
			
			self.btnNext = desktop.GetSvg(btn, "db-nextpage")
				.on("update", function() {
					if(grid.page == grid.page_count)
						$(this).attr("active", "off")
					else
						$(this).attr("active", "on")
				})
				.click(function() {
					self.control.nextPage()
				})
		})
	})
	
	CreateElementEx("div", mainContainer, function(pageLabel) {
		pageLabel.attr("pager-sec", "page-label-container")
		
		self.label1 = CreateElementEx("label", pageLabel, function(label) {
			label.attr("pager-sec", "page-label-1")
				.on("update", function() {
					$(this).html(grid.page)
				})
		})
		
		self.label2 = CreateElementEx("label", pageLabel, function(label) {
			label.attr("pager-sec", "page-label-2")
				.on("update", function() {
					$(this).html(("of {0} ({1} records)").format(grid.page_count, grid.row_count))
				})
		})
	})

	self.pages = CreateElementEx("div", mainContainer, function(pagesContainer) {
		pagesContainer.attr("pager-sec", "pages-container")
		
		$(self.control.rowsPerPage).each(function(i, pages) {
			CreateElement("div", pagesContainer)
				.attr("page-sec", "page-count")
				.attr("active", "0")
				.attr("page", pages)
				.html(pages)
				.click(function() {
					var pageSize = parseInt($(this).attr("page"))
					
					if(pageSize !== grid.dataParams.get("pagesize")) {
						grid.dataParams.set("pagesize", pageSize)
						grid.refresh()
					}
				})
		})
		
		CreateElement("label", pagesContainer).html("per page")
	}).on("update", function() {
		$(this).find("div[active='1']")
			.attr("active", "0")
			
		$(this).find("div[page='"+grid.dataParams.get("pagesize")+"']")
			.attr("active", "1")
	})

}

jPagerPainter.prototype.getPageArray = function(pageNo, pageCount) {
	var pages = []
	var nextPage
	
	pages.push(1)
	pages.push(2)
	pages.push(3)
	
	if(pageNo > 5 && pageCount > 10) {
		if(pageCount - pageNo < 5) {
			nextPage = pageCount - 5		
		} else {
			nextPage = pageNo		
		}
	} else {
		nextPage = 5
	}

	if(nextPage != 5 && pageCount > 10) {
		pages.push("...")	
	}		
	
	pages.push(nextPage-1)
	pages.push(nextPage)
	pages.push(nextPage+1)
	pages.push(nextPage+2)
	nextPage = nextPage+3

	if(pageCount > 7) {
		if(nextPage != pageCount-2 && pageCount > 10) {
			pages.push("...")
			nextPage = pageCount-2
		}

		pages.push(nextPage)
		pages.push(nextPage+1)
		pages.push(nextPage+2)	
	}
	
	return pages
}

// *************************************************************************************************
// File name: dbgrid-columns-2.js
// Last modified on
// 15-JUL-2017
// *************************************************************************************************
//**************************************************************************************************
// jGridBand
//**************************************************************************************************
//**************************************************************************************************
Class.Inherits(jGridBand,jControl);
function jGridBand(params)
{
    jGridBand.prototype.parent.call(this,params)
}
jGridBand.prototype.classID = "jGridBand";
jGridBand.prototype.painterClass = jGridBandPainter3;
jGridBand.prototype.paintImediately = false;
jGridBand.prototype.initialize = function(params)
{
    jGridBand.prototype.parent.prototype.initialize.call(this,params);
    this.NewColumn = this.newColumn;
    this.NewCommand = this.newCommand;
    this.NewBand = this.newBand;
    this.bands = new JList;
    this.columns = new JList;
    this.filler = defaultValue(params.filler,false);
    this.grid = params.owner;
    this.band = params.band;
    if(params.band) {
        this.level = params.band.level + 1;
    } else {
        this.level = 1;
	}
    this.caption = defaultValue(params.caption,"");
    this.fixed = defaultValue(params.fixed,"middle")
};

jGridBand.prototype.newBand = function(params,callback)
{
    params.owner = this.grid;
    params.band = this;
    var band = this.grid.createBand(params);
    if(callback) {
        callback(band);
	}
    return this.bands.add(params.id,band)
};

jGridBand.prototype.newColumn = function(params)
{
    params.owner = this.grid;
    params.band = this;
    var column = this.grid.createColumn(params);
    this.columns.add(params.fname,column);
    return column
};

jGridBand.prototype.newCommand = function(params)
{
    return this.newColumn(params)
};

jGridBand.prototype.levelCount = function()
{
    var maxCount = 0;
    var gather = function(band,count)
        {
            maxCount = band.level > maxCount ? band.level : maxCount;
            band.bands.each(function(i,band)
            {
                gather(band,count)
            })
        };
    this.bands.each(function(i,band)
    {
        gather(band,maxCount)
    });
    return maxCount
}// *************************************************************************************************
// File name: dbgrid-column-painters-2.js
// Last modified on
// 15-JUL-2017
// *************************************************************************************************
//**************************************************************************************************
// jGridBandPainter
//**************************************************************************************************
Class.Inherits(jGridBandPainter, jBasePainter)
function jGridBandPainter(params) {
	jGridBandPainter.prototype.parent.call(this, params)
}

jGridBandPainter.prototype.type = "grid"
jGridBandPainter.prototype.classID = "jGridBandPainter"

jGridBandPainter.prototype.initialize = function(params) {
    jGridBandPainter.prototype.parent.prototype.initialize.call(this, params)
}

jGridBandPainter.prototype.paint = function() {
    jGridBandPainter.prototype.parent.prototype.paint.call(this)

	var section = this.control.fixed
	
	var headerContainer
	var contentContainer
	var footerContainer
	
	if(section === "middle") {
		headerContainer = this.control.grid.painter.middleSection.header
		contentContainer = this.control.grid.painter.middleSection.content
		footerContainer = this.control.grid.painter.middleSection.footer
	} else if(section === "left") {
		headerContainer = this.control.grid.painter.leftSection.header
		contentContainer = this.control.grid.painter.leftSection.content
		footerContainer = this.control.grid.painter.leftSection.footer
	} else if(section === "right") {
		headerContainer = this.control.grid.painter.rightSection.header
		contentContainer = this.control.grid.painter.rightSection.content
		footerContainer = this.control.grid.painter.rightSection.footer
	}
	
	this.headerTable = new jTable({container:headerContainer, band:this.control, mainSection:section, section: section+"-header", paintParams: {painterClass: jTableHeaderPainter}})
	this.contentTable = new jTable({container:contentContainer, band:this.control, mainSection:section, section: section+"-content", paintParams: {painterClass: jTableContentPainter}})
	this.footerTable = new jTable({container:footerContainer, band:this.control, mainSection:section, section: section+"-footer", paintParams: {painterClass: jTableFooterPainter}})
}

jGridBandPainter.prototype.update = function() {
	// this.log(this.contentTable)
	this.contentTable.painter.update()
}

jGridBandPainter.prototype.mouseLeave = function() {
	// this.headerTable.paintData()
	this.contentTable.painter.mouseLeave()
	// this.footerTable.paintData()
}

// jGridPainter.prototype.getCurrentKey = function() {
	// return this.contentTable
	// var id = parseInt(keyID)
	// this.control.bands.each(function(i, band) {
		// band.painter.contentTable.painter.focusRow(id)
	// })
// }

// *************************************************************************************************
// File name: dbgrid-column-painters-2.js
// Last modified on
// 15-JUL-2017
// *************************************************************************************************
//**************************************************************************************************
// jGridBandPainter3
//**************************************************************************************************
Class.Inherits(jGridBandPainter3, jBasePainter)
function jGridBandPainter3(params) {
	jGridBandPainter3.prototype.parent.call(this, params)
}

jGridBandPainter3.prototype.type = "grid"
jGridBandPainter3.prototype.classID = "jGridBandPainter3"

jGridBandPainter3.prototype.initialize = function(params) {
    jGridBandPainter3.prototype.parent.prototype.initialize.call(this, params)
}

jGridBandPainter3.prototype.paint = function() {
    jGridBandPainter3.prototype.parent.prototype.paint.call(this)

	var section = this.control.fixed
	
	var headerContainer
	var contentContainer
	var footerContainer
	
	// if(section === "middle") {
		// headerContainer = this.control.grid.painter.sections.header.content
		// contentContainer = this.control.grid.painter.sections.body.content
		// footerContainer = this.control.grid.painter.sections.footer.content
	// } else 
	if(section === "left") {
		headerContainer = this.control.grid.painter.sections.header.left
		contentContainer = this.control.grid.painter.sections.body.left
		footerContainer = this.control.grid.painter.sections.footer.left
	} else if(section === "right") {
		headerContainer = this.control.grid.painter.sections.header.right
		contentContainer = this.control.grid.painter.sections.body.right
		footerContainer = this.control.grid.painter.sections.footer.right
	} else {
		headerContainer = this.control.grid.painter.sections.header.content
		contentContainer = this.control.grid.painter.sections.body.content
		footerContainer = this.control.grid.painter.sections.footer.content
	};
	
	// console.log(contentContainer)
	
	this.headerTable = new jTable({container:headerContainer, band:this.control, mainSection:section, section: section+"-header", paintParams: {painterClass: jTableHeaderPainter}})
	if(this.control.grid.options.viewType == "cardview")
		this.contentTable = new jTable({container:contentContainer, band:this.control, mainSection:section, section: section+"-content", paintParams: {painterClass: jCardViewPainter}})
	else
		this.contentTable = new jTable({container:contentContainer, band:this.control, mainSection:section, section: section+"-content", paintParams: {painterClass: jTableContentPainter}})
	this.footerTable = new jTable({container:footerContainer, band:this.control, mainSection:section, section: section+"-footer", paintParams: {painterClass: jTableFooterPainter}})
	
	var self = this;
	if(contentContainer)
		contentContainer
			.on("mouseleave", function() {
				self.control.grid.bands.each(function(i, band) {
					band.painter.mouseLeave()
				})
				// console.log("leave")
				// self.headerTable.painter.mouseLeave()
				// self.contentTable.painter.mouseLeave()
				// self.footerTable.painter.mouseLeave()
				// self.control.bands.each(function(i, band) {
					// band.painter.mouseLeave()
				// })
			})
	
}

jGridBandPainter3.prototype.update = function() {
	this.contentTable.painter.update()
	this.footerTable.painter.update()
}

jGridBandPainter3.prototype.mouseLeave = function() {
	this.contentTable.painter.mouseLeave()
}

jGridBandPainter3.prototype.columnsWidth = function() {
	var width = 0
	
	this.control.columns.each(function(i, column) {
		if(column.fixedWidth)
			width += column.width
	})

	return width
}
// *************************************************************************************************
// File name: dbgrid-columns-2.js
// Last modified on
// 15-JUL-2017
// *************************************************************************************************
//**************************************************************************************************
// jGridColumnColumn
//**************************************************************************************************
//**************************************************************************************************
Class.Inherits(jGridColumn, jControl)
function jGridColumn(params) {
    jGridColumn.prototype.parent.call(this, params)
}

jGridColumn.prototype.classID = "jGridColumn"

jGridColumn.prototype.painterClass = undefined
jGridColumn.prototype.paintImediately = false
// jGridColumn.prototype.headerPainterClass = jGridHeaderPainter
// jGridColumn.prototype.dataPainterClass = jGridDataPainter
// jGridColumn.prototype.painterClass = jGridColumnPainter

jGridColumn.prototype.initialize = function(params) {
    jGridColumn.prototype.parent.prototype.initialize.call(this, params)
	
    this.grid = params.owner
    this.band = params.band
    this.internal = params.internal
    this.command = params.command
	this.width = params.width
	this.fname = params.fname
	this.caption = defaultValue(params.caption, params.fname)
	this.drawHeader = params.drawHeader
	this.drawContent = params.drawContent
	this.drawSummary = params.drawSummary
	this.showFooter = params.showFooter
	this.fixedWidth = defaultValue(params.fixedWidth, false)
	this.showSummary = defaultValue(params.showSummary, false)
	this.treeView = defaultValue(params.treeView, false)
	this.allowSort = defaultValue(params.allowSort, false)
	this.linkField = defaultValue(params.linkField, "")
	this.linkUrl = defaultValue(params.linkUrl, "")

	if(!this.command) {
		if (params.allowSort === undefined)
			this.allowSort = this.grid.options.allowSort
		else
			this.allowSort = params.allowSort
		
		if (params.allowFilter === undefined)
			this.allowFilter = this.grid.options.allowFilter
		else
			this.allowFilter = params.allowFilter
	}
	
	this.float = defaultValue(params.float, "none")
	
	// this.debug(this)
}
// *************************************************************************************************
// File name: dbgrid-column-painters-2.js
// Last modified on
// 15-JUL-2017
// *************************************************************************************************
//**************************************************************************************************
// jGridDataPainter
//**************************************************************************************************
Class.Inherits(jGridDataPainter, jBasePainter);
function jGridDataPainter(params) {
	jGridDataPainter.prototype.parent.call(this, params);
};

jGridDataPainter.prototype.type = "grid";
jGridDataPainter.prototype.classID = "jGridDataPainter";

jGridDataPainter.prototype.initialize = function(params) {
    jGridDataPainter.prototype.parent.prototype.initialize.call(this, params);
};

jGridDataPainter.prototype.paint = function() {
    jGridDataPainter.prototype.parent.prototype.paint.call(this);
	// this.debug("paint")
};
// *************************************************************************************************
// File name: pg-2.js
// Last modified on
// 31-JUL-2017
// *************************************************************************************************
//**************************************************************************************************
// jPageControl
//**************************************************************************************************
Class.Inherits(jPageControl, jControl);
function jPageControl(params) {
    jPageControl.prototype.parent.call(this, params);
	
};

jPageControl.prototype.classID = "jPageControl";
jPageControl.prototype.controlType = "pg";

jPageControl.prototype.painterClass = jPageControlPainter;

jPageControl.prototype.initialize = function(params) {
    jPageControl.prototype.parent.prototype.initialize.call(this, params);
	this.tabs = [];
	this.list = new JList();
	this.defaultShowTabs = defaultValue(params.defaultShowTabs, true);
	this.activeTab = undefined;
	this.paintParams.icon = $.extend({
								size: 24,
								position: "left"
							}, params.paintParams.icon);
							
	if(params.masterView) {
		var self = this;
		this.masterDetail = new jMasterDetailController({
								pg: this,
								view: params.masterView
							});
							
		params.masterView.events.OnAfterPaint.add(function(grid) {
			self.defaultTab.detail.update();
		});
	};
};

jPageControl.prototype.showTabs = function(visible) {
	this.painter.showTabs(visible);
};

jPageControl.prototype.addTab = function(params) {
	// console.log(params)
	var tab = new jPageTab($.extend({}, {
		creator: this,
		index: this.tabs.length+1,
		defaultVisible: params.defaultVisible,
		id: defaultValue(params.id, this.tabs.length+1)
	}, params);
	
	// console.log(tab.params)
	
	if(this.masterDetail) {
		this.masterDetail.add({
			tab: tab,
			createView: function(keyID) {
				return params.OnCreateMasterDetail(this, keyID);
			}
		});
	};
	
	if(params.id)
		this.list.add(params.id, tab);
	
	this.tabs.push(tab);
	
	return tab;
};

jPageControl.prototype.get = function(name) {
	return this.list.get(name);
};

jPageControl.prototype.afterPaint = function() {
	jPageControl.prototype.parent.prototype.afterPaint.call(this);
	// console.log(this.defaultTab)
	if(!this.defaultTab)
		this.defaultTab = this.tabs[0];
	
	this.defaultTab.show();
	this.showTabs(this.defaultShowTabs);
	
	for(var i = 0; i<this.tabs.length; i++) {
		if(!this.tabs[i].defaultVisible) {
			// console.log(this.tabs[i].painter.mainContainer)
			this.tabs[i].painter.mainContainer.css("display", "none");
			// this.tabs[i].hide();
			// console.log(this.tabs[i])
		};
	};
};

jPageControl.prototype.showScrollButtons = function(visible) {
	this.painter.showScrollButtons(visible);
};

//**************************************************************************************************
// jPageTab
//**************************************************************************************************
Class.Inherits(jPageTab, jControl);
function jPageTab(params) {
    jPageTab.prototype.parent.call(this, params);
};

jPageTab.prototype.classID = "jPageTab";
jPageTab.prototype.controlType = "pg-tab";
jPageTab.prototype.paintImediately = false;

jPageTab.prototype.painterClass = jPageTabPainter;

jPageTab.prototype.initialize = function(params) {
    jPageTab.prototype.parent.prototype.initialize.call(this, params);
	this.pg = params.creator;
	this.pg.defaultTab = params.defaultTab ? this : this.pg.defaultTab;
	this.params.icon = $.extend({}, this.pg.paintParams.icon, params.icon);
	this.active = false;
	this.index = params.index;
	this.defaultVisible = defaultValue(params.defaultVisible, true);
};

jPageTab.prototype.activate = function() {
	this.painter.activate();
};

jPageTab.prototype.activate = function() {
	this.painter.activate();
};

jPageTab.prototype.show = function() {
	this.painter.show();
};

jPageTab.prototype.hide = function() {
	this.painter.hide();
};
// *************************************************************************************************
// File name: dbgrid-painters-2.js
// Last modified on
// 31-JUL-2017
// *************************************************************************************************
//**************************************************************************************************
// jPageControlPainter
//**************************************************************************************************
Class.Inherits(jPageControlPainter, jBasePainter);
function jPageControlPainter(params) {
	jPageControlPainter.prototype.parent.call(this, params);
};

jPageControlPainter.prototype.classID = "jPageControlPainter";

jPageControlPainter.prototype.initialize = function(params) {
    jPageControlPainter.prototype.parent.prototype.initialize.call(this, params);
};

jPageControlPainter.prototype.paint = function(container) {
	jPageControlPainter.prototype.parent.prototype.paint.call(this, container);
		
	var self = this;
	var tabs = this.control.tabs;
	this.mainContainer = this.creaMainContainer(container, "pg2", this.params.theme);
	if(this.params.fullBorder)
		this.mainContainer.addClass("pg-full-border");
	
	this.header = CreateElementEx("div", this.mainContainer, function(header) {
		
		if(self.control.params.indent !== undefined)
			header.css("padding-left", self.control.params.indent)
		
		if(self.params.tabsAlign === "right")
			header.css("justify-content", "flex-end");

		$(tabs).each(function(i, tab) {
			tab.painter.paint(header);
		})
		
		// new jScroller({
				// target:header, 
				// scroll:"horz"
			// });
			
		// if(self.control.params.showScrollButtons) {
		// };
		
		header.on("mouseenterx", function(e) {
			// if the content is overflowing then show the scroll bar buttons
			if(this.scrollWidth > $(this).outerWidth())
				self.showScrollButtons();
			
			// console.log({scrollLeft: $(this).scrollLeft(), scrollWidth: this.scrollWidth, width:$(this).outerWidth()})
		});
		
		header.on("mouseleavex", function(e) {
			if(self.scrollBarButtons)
				self.scrollBarButtons.remove();	
		});
		
	}, "pg-header");
	
	this.gutter = CreateElementEx("div", this.mainContainer, function(gutter) {
		CreateElementEx("div", gutter, function(gutterBorder) {
			
		}, "pg-gutter-border");
	}, "pg-gutter");
	
	this.contentContainer = CreateElementEx("div", this.mainContainer, function(content) {
		if(self.params.autoHeight)
			content.addClass("auto-height")
		// $(tabs).each(function(i, tab) {
			
		// })
	}, "pg-content");
};

jPageControlPainter.prototype.showTabs = function(visible) {
	this.header.css("display", visible ? "": "none");
	this.gutter.css("display", visible ? "": "none");
};

jPageControlPainter.prototype.showScrollButtons = function(visible) {
	var self = this;
	var offset = this.header.offset();
	var width = this.header.outerWidth();
	var height = this.header.outerHeight();
	
	this.scrollBarButtons = CreateElementEx("div", this.header, function(scrollButtons) {
	// this.scrollBarButtons = CreateElementEx("div", $("body"), function(scrollButtons) {
		// scrollButtons.css({
			// top: offset.top,
			// left: offset.left + width - 100,
			// height: 32,
			// width: 100,
			// "z-index": ++desktop.zIndex
		// });
		
		CreateElementEx("div", scrollButtons, function(left) {
			desktop.svg.draw(left, "chevron-left", 24);
		}, "pg-scroll-left").click(function() {
			// console.log("left")
			self.header.velocity("scroll", {duration:50, axis:"x", container:self.header, offset: -100});
			// self.header.scrollLeft(self.header.scrollLeft()-100);
		});
		
		CreateElementEx("div", scrollButtons, function(right) {
			desktop.svg.draw(right, "chevron-right", 24)
		}, "pg-scroll-right").click(function() {
			// console.log("right")
			self.header.velocity("scroll", {duration:50, axis:"x", container:self.header, offset: 100});			
			// self.header.scrollLeft(self.header.scrollLeft()+100);
		});
	}, "pg-scroll-buttons");
};

//**************************************************************************************************
// jPageTabPainter
//**************************************************************************************************
Class.Inherits(jPageTabPainter, jBasePainter);
function jPageTabPainter(params) {
	jPageTabPainter.prototype.parent.call(this, params);
};

jPageTabPainter.prototype.classID = "jPageTabPainter";

jPageTabPainter.prototype.initialize = function(params) {
    jPageTabPainter.prototype.parent.prototype.initialize.call(this, params);
};

jPageTabPainter.prototype.paint = function(container) {
	jPageTabPainter.prototype.parent.prototype.paint.call(this, container);
	
	var self = this;
	var params = this.control.params;
	// var paintParams = this.control.paintParams;
	// console.log(paintParams)
	this.mainContainer = this.creaMainContainer(container, "pg-tab", this.control.theme)
		.click(function() {
			self.control.show();
		});
		
	CreateElementEx("div", this.mainContainer, function(content) {
		if(params.icon.name && params.icon.position === "left")
			CreateElementEx("div", content, function(icon) {
				icon.css("fill", params.icon.color || "")
				if(params.hideCaption)
					icon.addClass("no-caption");
				
				desktop.svg.draw(icon, params.icon.name, params.icon.size)
					
			}, "pg-content-icon");
			
		if(!params.hideCaption)
			CreateElementEx("div", content, function(caption) {
				caption.html(params.caption)
			}, "pg-content-caption");
			
	}, "pg-tab-content");
	
	// if(!this.control.defaultVisible) {
		// this.hide();
		// console.log("here...")
		// this.mainContainer
	// }
};

jPageTabPainter.prototype.setVisible = function(visible) {
	if(this.control.pg.painter.params.autoHeight) {
		if(visible) 
			this.tabContent.css("display", "block")
		else
			this.tabContent.css("display", "none");
	} else { 
		var css = visible ? 
			{
				opacity: 1,
				visibility: "visible",
				pointer: ""
			} :
			{
				opacity: 0,
				visibility: "hidden",
				pointer: "none"
			};
		
		// if(desktop.mobile) {
			// var x = this.tabContent.attr("shown", css.visible);
			// setTimeout(function() {
				// x.css(css);
			// }, 300);
		// } else {
			this.tabContent.css(css);
		// }
	};
};

jPageTabPainter.prototype.hide = function() {
	// this.tabContent.css("display", "none");
	// this.tabContent.css("visibility", "hidden");
	this.setVisible(false);
	this.mainContainer.removeClass("tab-active");
};

jPageTabPainter.prototype.show = function() {
	var self = this;
	if(this.control.pg.activeTab) {
		this.control.pg.activeTab.active = false;
		this.control.pg.activeTab.hide();
	};
	
	this.control.pg.activeTab = this.control;
	this.control.pg.activeTab.active = true;
	
	if(!this.tabContent) {
		this.tabContent = CreateElementEx("div", this.control.pg.painter.contentContainer, function(content) {
			if(self.control.pg.painter.params.autoHeight)
				content.addClass("auto-height");

			// self.control.container = content.css("display", "block");
			// self.control.container = content.css("visibility", "visible");
			self.control.container = content;
			// self.setVisible(true);
			if(self.control.params.OnCreate)
				self.control.params.OnCreate(self.control);
			
			// self.activate();
		}, "tab-content");
	} else 
		this.activate();
	
	// this.tabContent.css("display", "block");
	// this.tabContent.css("visibility", "visible");
	this.setVisible(true);
	this.mainContainer.addClass("tab-active");
};

jPageTabPainter.prototype.activate = function() {
	if(this.control.params.OnActivate)
		this.control.params.OnActivate(this.control);
};
function jMasterDetailController(params) {
	this.params = $.extend({}, {
	}, params);
	
	this.pg = this.params.pg;
	this.view = this.params.view;
	this.details = [];
};

jMasterDetailController.prototype.add = function(params) {
	var view = new jMasterDetail($.extend(params, {
						master: this
					}));
					
	this.details.push(view);
};

function jMasterDetail(params) {
	this.params = $.extend({}, {
		
	}, params);
	
	this.master = this.params.master;
	this.tab = this.params.tab;
	this.tab.detail = this;
};

jMasterDetail.prototype.update = function() {	
	if(!this.view && this.master.view.dataset) {
		this.view = this.params.createView(this.master.view.dataset.getKey());
		
		var self = this;
		this.master.view.dataset.Events.OnMoveRecord.add(function(dataset) {
			self.sync();
		});
	};
};

jMasterDetail.prototype.initDetail = function(grid) {
	var self = this;
	this.master.dataset.Events.OnMoveRecord.add(function(dataset) {
		self.sync();
	});
},

jMasterDetail.prototype.sync = function() {
	if(this.view && this.tab.active && this.currentKey !== this.master.view.dataset.getKey()) {
		this.tab.params.OnSetKey(this, this.currentKey = this.master.view.dataset.getKey());
		// this.view.refresh();
	};
};
// ****************************************************************************************************
// Last modified on
// 04-JUL-2017
// ****************************************************************************************************
// ****************************************************************************************************
// jSplitContainer
// ****************************************************************************************************
Class.Inherits(jSplitContainer, jControl);

function jSplitContainer(params) {
    jSplitContainer.prototype.parent.call(this, params);
};

jSplitContainer.prototype.classID = "jSplitContainer";
jSplitContainer.prototype.painterClass = jSplitterPainter;
jSplitContainer.prototype.controlType = "split-container";

jSplitContainer.prototype.initialize = function(params) {
    jSplitContainer.prototype.parent.prototype.initialize.call(this, params);

	this.params = $.extend({}, {
		size: 250,
		fixed: true,
		noBorder: true,
		orientation: "vert"
	}, params);

	this.events.OnPaintPane1 = new EventHandler(this);
	this.events.OnPaintPane2 = new EventHandler(this);
};
// ****************************************************************************************************
// Last modified on
// 06-JUL-2017
// ****************************************************************************************************
// ****************************************************************************************************
//**************************************************************************************************
// jSplitterPainter
//**************************************************************************************************
Class.Inherits(jSplitterPainter, jBasePainter);
function jSplitterPainter(params) {
    jSplitterPainter.prototype.parent.call(this, params);
};

jSplitterPainter.prototype.classID = "jSplitterPainter";

jSplitterPainter.prototype.initialize = function(params) {
    jSplitterPainter.prototype.parent.prototype.initialize.call(this, params);
	
};

jSplitterPainter.prototype.paint = function(container) {
    jSplitterPainter.prototype.parent.prototype.paint.call(this, container);

	this.mainContainer = this.creaMainContainer(container, "splitter2", this.control.paintParams.theme)
		.attr("orientation", this.control.params.orientation)

	// CreateElementEx("div", this.mainContainer, function(container) {
	// });
	
	var self = this;
	this.pane1 = CreateElementEx("div", this.mainContainer, function(pane1) {
		var size = self.control.params.size;
		if(self.control.params.usePercent) 
			size = self.control.params.size +"%";
		
		pane1.css("flex-basis", size);
		if(self.control.params.orientation === "vert") {
			pane1.css("width", size)
			// pane1.css("height", "100%")
		} else {
			pane1.css("height", size);
			// pane1.css("width", "100%")
		}
		
	}, "pane1");
	
	this.sizer = CreateElementEx("div", this.mainContainer, function(sizer) {
		CreateElementEx("div", sizer, function(sizerPanel) {
			
		}, "sizer-panel")
	}, "sizer");
	
	this.pane2 = CreateElementEx("div", this.mainContainer, function(pane2) {
		var size = self.control.params.size;
		if(self.control.params.usePercent && self.control.params.orientation === "horz") 
			pane2.css("height", (100 - 6 - size) + "%") // this is for compatibility with Chrome issue
		else
			pane2.css("width", (100 - 6 - size) + "%") // this is for compatibility with Chrome issue
		
		
	}, "pane2");
	
	new jResize({
		owner:this, 
		sizer:this.sizer, 
		target:this.pane1, 
		target2:this.pane2, 
		parent:this.mainContainer, 
		orientation: this.control.params.orientation,
		initDrag: function(drag) {
			$("body").addClass("resizing-" + drag.orientation);			
			$("#desktop-container").css("pointer-events", "none");
			$(".main-desktop-split").css("pointer-events", "none");
			if(drag.orientation === "vert") {
				drag.baseSize = drag.target.outerWidth()
				drag.parentSize = drag.parent.outerWidth()
			} else {
				drag.baseSize = drag.target.outerHeight();
				drag.parentSize = drag.parent.outerHeight();
			}
		},
		dragging: function(drag, x, y) {
			var size, size2;
			if(drag.orientation === "vert")
				size = drag.baseSize + x
			else
				size = drag.baseSize + y;
			
			if(drag.owner.control.params.usePercent) {
				if(drag.orientation === "horz")
					drag.target2.css("height", 100 - 6 - (size / drag.parentSize * 100) + "%"); // this is for compatibility with Chrome issue
				else
					drag.target2.css("width", 100 - 6 - (size / drag.parentSize * 100) + "%"); // this is for compatibility with Chrome issue
				size = size / drag.parentSize * 100 + "%";
			};
			
			drag.target.css("flex-basis", size);
			if(drag.orientation === "vert")
				drag.target.css("width", size)
			else
				drag.target.css("height", size);
			
			// if(drag.owner.control.params.usePercent)
				// drag.target2.css("height", size);
		},
		dragEnd: function(drag) {
			$("body").removeClass("resizing-" + drag.orientation);
			$("#desktop-container").css("pointer-events", "");
			$(".main-desktop-split").css("pointer-events", "");
		}
	});
	
	
	this.control.events.OnPaintPane1.trigger(this.pane1);
	this.control.events.OnPaintPane2.trigger(this.pane2);
};
function Tools(params){
	// console.log("here")
	var sessionContainer = $("#session-info");
	var stayAlive = setInterval(function() {
		getSessionInfo();
	}, 1000*60*10); // 10 minutes
	// }, 5000); // 5 seconds
	
	var getSessionInfo = function() {
		// $.ajax({
		desktop.ajax({
			url: "/engine/get-session-info.aspx",
			type: "GET",
			data: params.requestParams,
			success: function(response) {
				sessionContainer.html(response);
			}
		});
		// sessionContainer.load({
			// url: "/engine/get-session-info.aspx",
			// data: params.requestParams
		// });
	};
};

function SystemIcons(params){
	var container = params.container;
	desktop.svg.each(function(i, name) {
		var c = CreateElement("div", container).addClass("icon");
		if(desktop.svg.isClone(name)) {
			c.attr("clone", "1");
			desktop.SetHint(c, function(dialog, container) {
				container.html(name);
				container.append("<div class='clone'>"+desktop.svg.getClone(name)+"<div>");
			}, "top");
		} else {
			c.attr("clone", "0");
			desktop.SetHint(c, name, "top");
		};
		
		desktop.svg.draw(c, name, 32);
	});
};
//==================================================================================================
// File name: ihms.insky-inc.com.js
//==================================================================================================
// *************************************************************************************************
// Last modified on
// 02-MAR-2015
// *************************************************************************************************
//==================================================================================================
// Miscellansous functions
//==================================================================================================
function __open(url, get) {
	if(get)
		return url
	else
		window.open(url, "");
};

function __soa(id, get) {
	return __open(("/app/soa/{0}").format(id), get);
};

function __sales(id, get) {
	return __open(("/app/sales/{0}").format(id), get);
};

function __print(what, id, get) {
	return __open(("/app/print/{0}/{1}").format(what, id), get);
};

function __quotation(id, get) {
	return __open(("/app/print/{0}/{1}").format("quotation", id), get);
};

function __po(id, get) {
	return __open(("/app/print/{0}/{1}").format("po", id), get);
};

//==================================================================================================
// Claim MainPage
//==================================================================================================
Class.Inherits(MainPage, Desktop);
function MainPage(Params) {
	MainPage.prototype.parent.call(this, Params);
};

MainPage.prototype.classID = "MainPage";
MainPage.prototype.navigatorTheme = "dark";
// MainPage.prototype.themes = {
	// gridEditor: "default",
	// formEditor: "main",
	// formEditorPC: "main"
// };

MainPage.prototype.DefaultPainter = function() {
	return new DesktopPainter5(this);
}

MainPage.prototype.Initialize = function(Params) {
	MainPage.prototype.parent.prototype.Initialize.call(this, Params);
	this.userName = "Jessica Cuizon";
	this.userRole = "Administrator";
};

MainPage.prototype.InitializeSession = function(data) {
	MainPage.prototype.parent.prototype.InitializeSession.call(this, data);
	
	this.Events.OnHeaderToolbar.add(function(desktop, list) {
	});
	
	this.Events.OnSideMenuPageControl.add(function(desktop, pg) {
		// pg.addTab({caption:"Call Logs",
			// icon: {
				// name: "phone"						
			// },
			// OnCreate: function(tab) {
				
			// }
		// });
		// pg.addTab({caption:"Tasks",
			// icon: {
				// name: "timetable"						
			// },
			// OnCreate: function(tab) {
				
			// }
		// });
	});
	
	this.RegisterSvg("account-card-details", 24, '<path d="M2,3H22C23.05,3 24,3.95 24,5V19C24,20.05 23.05,21 22,21H2C0.95,21 0,20.05 0,19V5C0,3.95 0.95,3 2,3M14,6V7H22V6H14M14,8V9H21.5L22,9V8H14M14,10V11H21V10H14M8,13.91C6,13.91 2,15 2,17V18H14V17C14,15 10,13.91 8,13.91M8,6A3,3 0 0,0 5,9A3,3 0 0,0 8,12A3,3 0 0,0 11,9A3,3 0 0,0 8,6Z" />');
	this.RegisterSvg("account-location", 24, '<path d="M18,16H6V15.1C6,13.1 10,12 12,12C14,12 18,13.1 18,15.1M12,5.3C13.5,5.3 14.7,6.5 14.7,8C14.7,9.5 13.5,10.7 12,10.7C10.5,10.7 9.3,9.5 9.3,8C9.3,6.5 10.5,5.3 12,5.3M19,2H5C3.89,2 3,2.89 3,4V18A2,2 0 0,0 5,20H9L12,23L15,20H19A2,2 0 0,0 21,18V4C21,2.89 20.1,2 19,2Z" />');
	this.RegisterSvg("sale", 24, '<path d="M18.65,2.85L19.26,6.71L22.77,8.5L21,12L22.78,15.5L19.24,17.29L18.63,21.15L14.74,20.54L11.97,23.3L9.19,20.5L5.33,21.14L4.71,17.25L1.22,15.47L3,11.97L1.23,8.5L4.74,6.69L5.35,2.86L9.22,3.5L12,0.69L14.77,3.46L18.65,2.85M9.5,7A1.5,1.5 0 0,0 8,8.5A1.5,1.5 0 0,0 9.5,10A1.5,1.5 0 0,0 11,8.5A1.5,1.5 0 0,0 9.5,7M14.5,14A1.5,1.5 0 0,0 13,15.5A1.5,1.5 0 0,0 14.5,17A1.5,1.5 0 0,0 16,15.5A1.5,1.5 0 0,0 14.5,14M8.41,17L17,8.41L15.59,7L7,15.59L8.41,17Z" />');
	this.RegisterSvg("calculator", 24, '<path d="M7,2H17A2,2 0 0,1 19,4V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V4A2,2 0 0,1 7,2M7,4V8H17V4H7M7,10V12H9V10H7M11,10V12H13V10H11M15,10V12H17V10H15M7,14V16H9V14H7M11,14V16H13V14H11M15,14V16H17V14H15M7,18V20H9V18H7M11,18V20H13V18H11M15,18V20H17V18H15Z" />');
	this.RegisterSvg("view-list", 24, '<path d="M9,5V9H21V5M9,19H21V15H9M9,14H21V10H9M4,9H8V5H4M4,19H8V15H4M4,14H8V10H4V14Z" />');
	// this.RegisterSvg("", 24, '');
	
	this.CloneSvg("suppliers", "users");
	this.CloneSvg("po", "approval");
	this.CloneSvg("customers", "users");
	this.CloneSvg("sales", "sale");
	this.CloneSvg("items", "view-list");
	this.CloneSvg("computation", "calculator");
	this.CloneSvg("quotations", "file-outline");
	this.CloneSvg("soas", "file-outline");
	this.CloneSvg("pos", "file-outline");
	this.CloneSvg("addresses", "account-location");
	this.CloneSvg("contacts", "account-card-details");
	this.CloneSvg("back", "arrow-left");
	// this.CloneSvg("", "");
};
MainPage.prototype.AfterPaint = function() {
	MainPage.prototype.parent.prototype.AfterPaint.call(this);
	// console.log("OK")
};

MainPage.prototype.SetMobilePageControl = function(pg) {
	this.pageControl = pg;
};

MainPage.prototype.closeTabsToTheRight = function(index) {
	for(var i = index; i < this.pageControl.tabs.length; i++) {
		this.pageControl.tabs[i].painter.mainContainer.css("display", "none")
	};
};

MainPage.prototype.activateTab = function(tab, callback) {
	this.closeTabsToTheRight(tab.index);
	tab.painter.mainContainer.css("display", "block");
	if(callback) callback(tab);
	// tab.view.dataParams.set("customer_id", customersMasterView.dataset.getKey());
	// tab.view.refresh();
};

MainPage.prototype.selectTab = function(tabName) {
	var index = 0;
	if(tabName === "sales")
		index = 1
	else if(tabName === "sales-items")
		index = 2
	else if(tabName === "quotations")
		index = 3;
	
	if(index > 0) {
		desktop.pageControl.tabs[index].painter.mainContainer.css("display", "block")
		desktop.pageControl.tabs[index].show();
	};
};
// ****************************************************************************************************
// Last modified on
// 12-OCT-2017
// ****************************************************************************************************
//==================================================================================================
// File name: view-sale-items.js
//==================================================================================================
function SaleItemsList(params){
	return new jGrid($.extend(params, {
		paintParams: {
			css: "sale-items",
			toolbar: {theme: "svg"}
		},
		editForm: function(id, container, dialog) {
			SaleItemEdit({
				id: id,
				sale_id: params.getMasterID(),
				container: container,
				dialog: dialog
			})
		},
		init: function(grid, callback) {			
			grid.Events.OnInit.add(function(grid) {
				grid.optionsData.url = "app/sale-items";
				
				grid.options.horzScroll = true;
				grid.options.showBand = true;
				grid.options.showSummary = true;
				grid.options.allowSort = false;
				grid.options.showPager = false;
				grid.search.visible = false;
				grid.exportData.allow = false;
				
				grid.Events.OnInitDataRequest.add(function(grid, dataParams) {
					dataParams
						.addColumn("sale_id", params.getMasterID(), {numeric:true})
				});
				
				grid.Events.OnInitData.add(function(grid, data) {
					data.Columns
						.setprops("id", {label:"ID", numeric:true, key:true})
						.setprops("sequence_no", {label:"Item", numeric:true})
						.setprops("quantity", {label:"Qty", numeric:true, getText: function(column, value) {
							if(column.dataset.get("status_code_id") !== 10)
								return ""
							else
								return value;
						})
						.setprops("unit", {label:"Unit"})
						.setprops("packaging", {label:"Packaging"})
						.setprops("description", {label:"Description"})
						.setprops("unit_price", {label:"Unit Price", numeric:true, type:"money", format:"00", getText: function(column, value) {
							if(column.dataset.get("status_code_id") !== 10)
								return ""
							else
								return  parseFloat(value).formatMoney(column.format);
						})
						.setprops("amount", {label:"Amount", numeric:true, type:"money", format:"00", getText: function(column, value) {
							if(column.dataset.get("status_code_id") !== 10)
								return ""
							else
								return  parseFloat(value).formatMoney(column.format);
						})
						.setprops("unit_price_no_vat", {label:"Price w/o VAT", numeric:true, type:"money", format:"00", getText: function(column, value) {
							if(column.dataset.get("status_code_id") !== 10)
								return ""
							else
								return  parseFloat(value).formatMoney(column.format);
						})
						.setprops("actual_unit_price_no_vat", {label:"Cost w/o VAT", numeric:true, type:"money", format:"00", getText: function(column, value) {
							if(column.dataset.get("status_code_id") !== 10)
								return ""
							else
								return  parseFloat(value).formatMoney(column.format);
						})
						.setprops("actual_unit_price", {label:"Cost w/ VAT", numeric:true, type:"money", format:"00", getText: function(column, value) {
							if(column.dataset.get("status_code_id") !== 10)
								return ""
							else
								return  parseFloat(value).formatMoney(column.format);
						})
						.setprops("actual_amount", {label:"Total Cost", numeric:true, type:"money", format:"00", getText: function(column, value) {
							if(column.dataset.get("status_code_id") !== 10)
								return ""
							else
								return  parseFloat(value).formatMoney(column.format);
						})
						.setprops("profit_amount", {label:"Profit", numeric:true, type:"money", format:"00", getText: function(column, value) {
							if(column.dataset.get("status_code_id") !== 10)
								return ""
							else
								return  parseFloat(value).formatMoney(column.format);
						})
						.setprops("markup", {label:"%", numeric:true, getText: function(column, value) {
							if(column.dataset.get("status_code_id") !== 10)
								return ""
							else
								return  value+"%";
						})
						.setprops("ewt_amount", {label:"EWT", numeric:true, type:"money", format:"00", getText: function(column, value) {
							if(column.dataset.get("status_code_id") !== 10)
								return ""
							else
								return parseFloat(value).formatMoney(column.format);
						})
				});
				
				grid.Events.OnInitSubData.add(function(grid, params) {
					if(params.index === 1) {
						if(grid.footerData)
							grid.footerData.resetData(params.rawData)
						else
							grid.footerData = new Dataset(params.rawData, "Footer Data");
						
						grid.footerData.Columns
							.setprops("amount", {label:"Amount", numeric:true, type:"money", format:"00"})
							.setprops("unit_price_no_vat", {label:"Price w/o VAT", numeric:true, type:"money", format:"00"})
							.setprops("actual_unit_price_no_vat", {label:"Cost w/o VAT", numeric:true, type:"money", format:"00"})
							.setprops("actual_unit_price", {label:"Cost w/ VAT", numeric:true, type:"money", format:"00"})
							.setprops("actual_amount", {label:"Total Cost", numeric:true, type:"money", format:"00"})
							.setprops("profit_amount", {label:"Profit", numeric:true, type:"money", format:"00"})
							.setprops("ewt_amount", {label:"EWT", numeric:true, type:"money", format:"00"})
					}
				});

				grid.Events.OnInitRow.add(function(grid, row) {	
					// if(grid.dataset.get("header") && grid.dataset.get("footer")) row.attr("x-row", "has-header")
					// if(grid.dataset.get("header")) row.attr("x-row", "has-header")
					row.attr("x-status", grid.dataset.get("status_code_id"));
				});	
				
				grid.Methods.add("deleteConfirm", function(grid, id) {
					return {title: "Delete Item", message: ("Please confirm to delete item <b>#{0}</b>.").format(grid.dataset.get("description"))};
				});
				
				grid.Events.OnInitColumns.add(function(grid) {
					grid.NewBand({caption: "ITEMS"}, function(band) {
						band.NewColumn({fname: "sequence_no", width: 40, fixedWidth:true});
						// band.NewColumn({fname: "description", width: 300, fixedWidth:true});
						band.NewColumn({fname: "description", width: 400, fixedWidth:true, drawContent: function(cell) {
								// if(grid.dataset.get("header")) {
									// CreateElement("div", cell).attr("x-sec", "header").html(grid.dataset.get("header"));
									// CreateElement("div", cell).attr("x-sec", "item").html(grid.dataset.get("description"));
								// } else {
									// CreateElement("div", cell).attr("x-sec", "item").html(grid.dataset.get("description"));
								// };
								
								CreateElement("div", cell).attr("x-status", grid.dataset.get("status_code_id")).html(grid.dataset.get("description"));
								
								// else if(grid.dataset.get("status_code_id") == 0) {// header
									// cell.attr("colspan", 6);
									// cell.attr("x-row", "header");
									// cell.parent().attr("x-row", "header");
									// cell.html(grid.dataset.get("notes"));
								// } else if(grid.dataset.get("status_code_id") == 1) {// footer
									// cell.attr("colspan", 6);
									// cell.attr("x-row", "footer");
									// cell.parent().attr("x-row", "footer");
									// cell.html(grid.dataset.get("notes"));
								// }
								// CreateElement("div", cell).html(grid.dataset.get("notes"));
							// }
						});
						band.NewColumn({fname: "packaging", width: 100, fixedWidth:true});
						band.NewColumn({fname: "quantity", width: 40, fixedWidth:true});
						band.NewColumn({fname: "unit", width: 75, fixedWidth:true});
						band.NewColumn({fname: "unit_price", width: 125, fixedWidth:true});
						band.NewColumn({fname: "amount", width: 125, fixedWidth:true, showFooter: true});
					});	
					grid.NewBand({caption: "COMPUTATION"}, function(band) {
						band.NewColumn({fname: "ewt_amount", width: 125, fixedWidth:true, showFooter: true});
						band.NewColumn({fname: "unit_price_no_vat", width: 125, fixedWidth:true, showFooter: true});
						band.NewColumn({fname: "actual_unit_price_no_vat", width: 125, fixedWidth:true, showFooter: true});
						band.NewColumn({fname: "actual_unit_price", width: 125, fixedWidth:true, showFooter: true});
						band.NewColumn({fname: "actual_amount", width: 125, fixedWidth:true, showFooter: true});
						band.NewColumn({fname: "profit_amount", width: 125, fixedWidth:true, showFooter: true});
						band.NewColumn({fname: "markup", width: 50, fixedWidth:true});
					});
				});
			});
		}
	}));
};