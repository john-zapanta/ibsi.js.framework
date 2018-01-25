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
	}, params));
	
	// console.log(tab.params)
	
	if(this.masterDetail) {
		this.masterDetail.add({
			tab: tab,
			createView: function(keyID) {
				return params.OnCreateMasterDetail(this, keyID);
			}
		});
	};
	
	if(params.id) {
		this.list.add(params.id, tab);
	}
	
	this.tabs.push(tab);
	
	return tab;
};

jPageControl.prototype.get = function(name) {
	return this.list.get(name);
};

jPageControl.prototype.afterPaint = function() {
	jPageControl.prototype.parent.prototype.afterPaint.call(this);
	// console.log(this.defaultTab)
	if(!this.defaultTab) {
		this.defaultTab = this.tabs[0];
	}
	
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
