(function() {
	'use strict'
	angular
		.module('base')
		.controller('notificationController', notificationController);

	function notificationController() {
		var vm = this;

		/**
		 * Config
		 *
		 * orderBy {string} 	defines by witch value the
		 *						notifications should be ordered
		 * limitTo {int}		defiines how many items should be
		 *						max displayed
		 **/
		vm.config = {
			'orderBy': 'priority',
			'limitTo': 2
		};

		vm.items = [{
				'priority': '4',
				'title': 'Titel A',
				'message': 'Nachricht'
			},
			{
				'priority': '3',
				'title': 'Titel B',
				'message': 'Nachricht'
			},
			{
				'priority': '2',
				'title': 'Titel C',
				'message': 'Nachricht'
			},
			{
				'priority': '1',
				'title': 'Titel D',
				'message': 'Nachricht'
			}];

		vm.close = close;
		vm.isKnown = isKnown;

		/**
		 * Removes a notification from DOM
		 * 
		 * @var $event {object} std agularJS event object
		 * @var title {string} 	title of the notification
		 * @return 				void
		 **/
		function close($event, title) {
			localStorage
				.setItem(title, true);

			angular.element($event.currentTarget)
				.parent()
				.remove();
		}

		/**
		 * Evaluates if the user already closed the notification
		 *
		 * @var obj {obj} 		represents an notification object
		 * @return 				boolean
		 **/
		function isKnown(obj) {
			var clientNotification = localStorage
				.getItem(obj.title);

			if(clientNotification === null) {
				localStorage
					.setItem(obj.title, false);

				clientNotification = localStorage
					.getItem(obj.title);
			}

			return clientNotification === 'false';
		};
	}
})();