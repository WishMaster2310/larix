

m_site = {
	// пакеты могут быть: базовые || одиночные || дополнительные
	// если появится еще какая хрень то просто делай 
	// по аналогии
	chanels: {
		basic: ko.observableArray([]),
		solo: ko.observableArray([]),
		extra: ko.observableArray([])
	},
	chanelTypes:  {
		fun: 'Развлекательные',
		educational: 'Познавательные',
		movie: 'Кино и сериалы',
		enlightenment: 'Просветительские',
		sport: 'Спортивные',
		music: 'Музыкальные',
		info: 'Информационные'
	},
	chanelPrice: ko.observable(),
	grouped: ko.observableArray([]),
	selectedChanels: ko.observable(),
	chanelsLen: ko.observable(),
	selectedChanel: ko.observable(),
	selectedChanelTitle: ko.observable(),
	activeChanelGroup: ko.observable(),
	selectedPackages: ko.observable(),
	chanalViewerActiveGroup: ko.observable(0),
	chanelsIsOpen: ko.observable(false),

	user: {
		name: ko.observable(),
		email: ko.observable(),
		text: ko.observable(),
		city: ko.observable()
	},

	loadChanels: function() {
		
		$.getJSON( "/static/calc_data/connect.json", function(data) {
			
			// для каждой группы пушим результат в модельку
			// предварительно его (результат) объявив в самой модели (chanel)
			// если его там нет (ко)

			_.forEach(data['basic'], function(n) {
				n.isSelect = ko.observable(true);
				m_site.chanels.basic.push(n);
			});

			_.forEach(data['solo'], function(n) {
				n.isSelect = ko.observable();
				m_site.chanels.solo.push(n);
			});

			_.forEach(data['extra'], function(n) {
				n.isSelect = ko.observable();
				m_site.chanels.extra.push(n);
			});

			_.forEach(data['grouped'], function(n) {
				n.isSelect = ko.observable();
				m_site.grouped.push(n);
			});
		});
	},
	chanalViewer: function(ind) {
		m_site.chanalViewerActiveGroup(ind)
	},
	singlChanel: function(d) {
		// группируем каналы в попапе
		result = _.groupBy(d.items, 'groupID');
		m_site.chanalViewerActiveGroup(0)
		// заносим результат в модельку
		m_site.selectedChanelTitle(d.name);
		m_site.selectedChanel(_.toArray(result));

		$('#selectedChanel').arcticmodal();
	},

	showChanels: function() {
		$('#selectedChanelsList').arcticmodal({
			beforeOpen: function() {m_site.chanelsIsOpen(true);},
			afterClose: function() {m_site.chanelsIsOpen(false);}
		})
	},

	resetChanels: function() {
		_.forEach(m_site.chanels["solo"](), function(value, key) {
			value.isSelect(false)
		});

		_.forEach(m_site.chanels["extra"](), function(value, key) {
			value.isSelect(false)
		})
	},
	packageGroupSetter: function(d) {
		if(d.isSelect()) {
			m_site.activeChanelGroup(false);
			m_site.resetChanels()
			
		} else {
			m_site.resetChanels();
			m_site.activeChanelGroup(d);

			_.forEach(d.contain, function(value, key) {
				var a = value.packType;

				if(value.items === 'all') {
					_.forEach(m_site.chanels[a](), function(v, k) {
						v.isSelect(true)
					})
				} else {
					_.forEach(value.items, function(v, k) {
						var b = _.find(m_site.chanels[a](), {'packageID': v});
						b.isSelect(true)
					})
				}

			});
		}
		
	}
}

$(document).ready(function() {

	// init model
	m_site.loadChanels();

	m_site.chanelCulc = ko.computed(function() {
		var coast = 0, chanLen, items = [], r, groups = [];
		
		_.forEach(m_site.chanels, function(n) {
			
			_.forEach(n(), function(chanelPackage) {
				
				// собираем выбранные каналы
				if(chanelPackage.isSelect()) {

					// приращаем общую стоимость пакетов
					coast += Math.round(chanelPackage.coast);
					groups.push(chanelPackage.packageID)

					// создаем список со всеми выбранными каналами
					_.forEach(chanelPackage.items, function(item) {
						items.push(item);
					});
				}
			})
		});

		// записываем результат расчетов стоимости в модельку
		m_site.chanelPrice(coast);

		// причесываем массив с каналами.
		// оставляем только уникальные каналы (chanelID)
		// и разбиваем массив на объекты по (groupID)

		r = _.groupBy(_.uniq(items, 'chanelID'), 'groupID');

		// записываем длинну массива каналов
		// без учета повторов

		m_site.chanelsLen(_.uniq(items, 'chanelID').length);

		// запихиваем выбраные каналы в модельку
		m_site.selectedChanels(_.toArray(r));
		m_site.selectedPackages(groups)
	});

	m_site.chanelGroups = ko.computed(function() {

		var r = _.forEach(m_site.grouped(), function(n) {

			if (m_site.activeChanelGroup() && n.packageID === m_site.activeChanelGroup().packageID) {
				n.isSelect(true)
			}  else {
				n.isSelect(false)
			}
		 	
		});
	});

	m_site.chanelCountLabel = ko.computed(function() {
	    var variants = ['каналов', 'канал', 'канала'];
	    var s = m_site.chanelsLen();
	    var index = s % 100;
	    if (index >=11 && index <= 14) {
	        index = 0;
	    } else {
	        index = (index %= 10) < 5 ? (index > 2 ? 2 : index): 0;
	    }
		return(variants[index]);
	});

	ko.applyBindings(m_site);

	$('#connectForm').validate()
});