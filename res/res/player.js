var Player = function(playerName) {
	var name = playerName;

	var hand = [];

	function setName(newName) {
		name = newName;
	}

	function getName() {
		return name;
	}

	function setHand(newHand) {
		hand = newHand;
	}

	function getHand() {
		return hand;
	}

	return {
		getName: getName,
		setName: setName,
		setHand: setHand,
		getHand: getHand
	};
}

exports.Player = Player