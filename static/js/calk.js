m_site = {
	calc1: {
		columns: ko.observableArray([]),
		items: ko.observableArray([]),
		result: ko.observable()
	},

	calc2: {
		columns: ko.observableArray([]),
		items: ko.observableArray([]),
		result: ko.observable()
	},

	calc3: {
		columns: ko.observableArray([]),
		items: ko.observableArray([]),
		result: ko.observable()
	},

	calc4: {
		columns: ko.observableArray([]),
		items: ko.observableArray([]),
		result: ko.observable()
	},

	loadCalc1: function() {

		$.getJSON( "/static/calc_data/calc1.json", function(data) {
			// foreach culck creat new obj in view-model

			_.forEach(data, function(n, key) {
				
				if (key === 'items') {
					_.forEach(n, function(_value, _key) {
						_value._result = ko.observable(0);
						m_site.calc1.items.push(_value);
					});
					
				} else if(key === 'columns') {

					_.forEach(n, function(_value, _key) {
						m_site.calc1.columns.push(_value);
					});
				}
			});
		});
	},
	loadCalc2: function() {

		$.getJSON( "/static/calc_data/calc2.json", function(data) {
			// foreach culck creat new obj in view-model
			_.forEach(data, function(n, key) {
				
				if (key === 'items') {
					_.forEach(n, function(_value, _key) {
						_value._result = ko.observable(0);
						m_site.calc2.items.push(_value);
					});
					
				} else if(key === 'columns') {

					_.forEach(n, function(_value, _key) {
						m_site.calc2.columns.push(_value);
					});
				}
			});
		});
	},
	loadCalc3: function() {

		$.getJSON( "/static/calc_data/calc3.json", function(data) {
			// foreach culck creat new obj in view-model
			_.forEach(data, function(n, key) {
				
				if (key === 'items') {
					
					
					_.forEach(n, function(_value, _key) {
						_value._result = ko.observable(0);
						m_site.calc3.items.push(_value);
					});
					
				} else if(key === 'columns') {

					_.forEach(n, function(_value, _key) {
						m_site.calc3.columns.push(_value);
					});
				}
			});
		});
	},
	loadCalc4: function() {

		$.getJSON( "/static/calc_data/calc4.json", function(data) {
			// foreach culck creat new obj in view-model
			_.forEach(data, function(n, key) {
				
				if (key === 'items') {
					
					
					_.forEach(n, function(_value, _key) {
						_value._result = ko.observable(0);
						m_site.calc4.items.push(_value);
					});
					
				} else if(key === 'columns') {

					_.forEach(n, function(_value, _key) {
						m_site.calc4.columns.push(_value);
					});
				}
			});
		});
	}
}

$(document).ready(function() {

	// init model
	m_site.loadCalc1();
	m_site.loadCalc2();
	m_site.loadCalc3();
	m_site.loadCalc4();
	
	m_site.resultCalc1 = ko.computed(function() {
		var a = 0;
		_.forEach(m_site.calc1.items(), function(n, key) {
			a += Math.round(n._result() * n.coast )
			console.log(a)
		});	
		m_site.calc1.result(a)
	}); 

	m_site.resultCalc2 = ko.computed(function() {
		var a = 0;
		_.forEach(m_site.calc2.items(), function(n, key) {
			a += Math.round(n._result() * n.coast )
			console.log(a)
		});	
		m_site.calc2.result(a)
	}); 

	m_site.resultCalc3 = ko.computed(function() {
		var a = 0;
		_.forEach(m_site.calc3.items(), function(n, key) {
			a += Math.round(n._result() * n.coast )
			console.log(a)
		});	
		m_site.calc3.result(a)
	}); 

	m_site.resultCalc4 = ko.computed(function() {
		var a = 0;
		_.forEach(m_site.calc4.items(), function(n, key) {
			a += Math.round(n._result() * n.coast )
			console.log(a)
		});	
		m_site.calc4.result(a)
	}); 

	
	ko.applyBindings(m_site);
});