// ****************************************************************************************************
// Last modified on
// 07-MAR-2017
// ****************************************************************************************************
//==================================================================================================
// File name: view-test.js
//==================================================================================================
function TestView(viewParams) {
	var test = new JTest();
	
	// test.test = "Hello..."
	// console.log(test.test = "Here...");
	// test.events.OnInit.fire("test", "test2")
	// test.events.OnInit.fire("test3", "test4")
	// test.alert("hello")
	
	// test.events.OnInit.trigger("test 1", "this 2")
	// console.log(test.events.OnInit.trigger("test 1", "this 2"));
	// test.events.OnInit.trigger2("test 1", function(target) {
		// console.log("done")
	// });
};

function CollectionTest(viewParams) {
	// var fields = new TCollection(TField);
};

function DatasetBinding(viewParams) {
	var dataset = new TDataset({
		init: function(dataset) {
			dataset.url = "/app/get/list/claim-status-history"
		}
	});
	
	dataset.fetch();
	
	new jSplitContainer($.extend(viewParams, {
		paintParams: {
			theme: "white-green-dark"
		},
		container: viewParams.container,
		orientation: "horz",
		size: 50,
		usePercent: true,
		noBorder: true,
		init: function(splitter) {
			splitter.events.OnPaintPane1.add(function(splitter, container) {
			});
			
			splitter.events.OnPaintPane2.add(function(splitter, container) {
			});
		}
	});
};
