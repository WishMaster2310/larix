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

	loadCalc: function() {

		$.getJSON( "/static/calc_data/square_calc.json", function(data) {
			// foreach culck creat new obj in view-model

			_.forEach(data[0], function(n, key) {
				
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

			_.forEach(data[1], function(n, key) {
				
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
	}
}

$(document).ready(function() {

	// init model
	m_site.loadCalc();
	
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

	
	ko.applyBindings(m_site);
});