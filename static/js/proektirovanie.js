m_site = {
	standart: 10,
	square: ko.observable(0),
	calc: {
		columns: ko.observableArray([]),
		items: ko.observableArray([]),
		result: ko.observable()
	},

	loadCalc: function() {

		$.getJSON( "/static/calc_data/proektirovanie.json", function(data) {
			_.forEach(data, function(n, key) {
				n.standartprise = ko.observable(0);
				n.extraprise = ko.observable(0);
				n.result = ko.observable(0);
				n.selected = ko.observable(false);
				m_site.calc.items.push(n);
			});
		});
	}
}

$(document).ready(function() {
	
	m_site.loadCalc();
	
	m_site.resultCalc = ko.computed(function() {
		var summ=0, items;

		items = _.filter(m_site.calc.items(), function(n) {
			return n.selected() === true
		});

		_items = _.filter(m_site.calc.items(), function(n) {
			return n.selected() === false
		});

		_.forEach(items, function(n) {
			var c = Math.round((m_site.square() - m_site.standart)) > 0 ? (m_site.square() - m_site.standart) : 0;
			n.standartprise(Math.round(m_site.standart*n.standart));
			n.extraprise(Math.round(n.extra*c));

			console.log('-->', n.standartprise() + n.extraprise())
			summ += Math.round((n.standartprise() + n.extraprise()));
		});

		m_site.calc.result(summ);
	}); 

	ko.applyBindings(m_site);
});