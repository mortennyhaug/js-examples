const app = angular.module('jsdtApp', []);

app.controller('mainController', function ($scope, $http) {
	console.log('visiting mainController');

	$scope.get = (id) => {
		if (!id) {
			console.log('ID is required');
			return;
		}
		
		console.log(`Fetching message with id "${id}"`);
		$http.get(`/api/messages/${id}`)
			.then(response => $scope.fetchedMessage = response.data.text)
			.catch(error => {
				if (error.status === 404) {
					$scope.fetchedMessage = 'No message was found';
				}
				console.log('error:', error);
			});
	};
	
	$scope.getAll = () => {
		console.log('Fetching all messages');

		$http.get('/api/messages')
			.then(response => $scope.messages = response.data)
			.catch(error => {
				console.log('error:', error);
			});
	};
	
	$scope.add = (text) => {
		if (!text) {
			console.log('Text is required');
			return;
		}
		
		console.log(`Adding new message with text "${text}"`);
		
		$http.post('/api/messages', {text: text})
			.then(response => response.data)
			.then(message => $http.get('/api/messages'))
			.then(response => $scope.messages = response.data)
			.catch(error => console.log('error:', error));
	};
	
	$scope.update = (id, text) => {
		if (!id || !text) {
			console.log('ID and text is required');
			return;
		}
		
		console.log(`Updating message id "${id}" with text "${text}"`);

		$http.put(`/api/messages/${id}`, {id, text})
			.then(response => response.data)
			.then(message => $http.get('/api/messages'))
			.then(response => $scope.messages = response.data)
			.catch(error => console.log('error:', error));
	};
	
	$scope.remove = (id) => {
		if (!id) {
			console.log('ID is required');
			return;
		}
		
		console.log(`Deleting message with id "${id}"`);
		
		$http.delete(`/api/messages/${id}`)
			.then(response => response.data)
			.then(message => $http.get('/api/messages'))
			.then(response => $scope.messages = response.data)
			.catch(error => console.log('error:', error));
	};
	
	$scope.messages = [];
});
