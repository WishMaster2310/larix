m_site = {
	calc: {
		items: ko.observableArray([]),
		result: ko.observable()
	},

	loadData: function() {

		$.getJSON( "/static/calc_data/video_control.json", function(data) {

			_.forEach(data, function(value, key) {
				console.log(value)
				value._result = ko.observable(0);
				m_site.calc.items.push(value);
			});
		});
	}
}

$(document).ready(function() {

	// init model
	m_site.loadData();
	
	m_site.result = ko.computed(function() {
		var a = 0;
		_.forEach(m_site.calc.items(), function(n, key) {
			a += Math.round(n._result() * n.coast )
			console.log(a)
		});	
		m_site.calc.result(a)
	}); 

	ko.applyBindings(m_site);
});