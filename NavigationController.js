'use strict';

var NavigationController = function(userSettings){

	var components = {},
		settings = {},
			variables = {},
		self = this;

	var defaultSettings = {
		selectors: {
			items: '.nav-item'
		},
		classes: {
			active: 'active'
		}
	};

	var attachEvents = function(){

		self.addHashChangeListener();
	};

	var initSettings = function(){

		$.extend(settings, defaultSettings, userSettings);
	};

	var initComponents = function(){

		var selectors = settings.selectors;

		components.$items = $(selectors.items);

		components.$window = $(window);
	};

	var initVariables = function(){

		variables.controllerIndex = ++NavigationController.controllersCount;
	};

	this.addHashChangeListener = function(){

		var hashKey = self.getHashKey();

		components.$window.on('hashchange', function(){

			var hashParams = main.urlController.getParamsFromHash(hashKey);

			if(! hashParams[hashKey])
				return;

			components.$items.eq(hashParams[hashKey]).trigger('click');
		});
	};

	this.getItems = function(){

		return components.$items;
	};

	this.getHashKey = function(){

		return 'nav_' + variables.controllerIndex;
	};

	this.getCurrentItem = function(){

		return components.$currentItem;
	};

	this.onItemActivated = function(){
    };

	this.setActiveItem = function(index){

		var $items = components.$items,
			activeClass = settings.classes.active;

		$items.removeClass(activeClass);

		var $currentItem = components.$currentItem = $items.eq(index);

		$currentItem.addClass(activeClass);

		self.onItemActivated.call($currentItem, index, self);
    };

	var init = function(){

		initSettings();

		initVariables();

		initComponents();

		attachEvents();
	};

	return init();
};

NavigationController.controllersCount = 0;