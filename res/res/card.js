var Suits = ["Hearts", "Clubs", "Diamonds", "Spades"]
var Cards = ["Ace", "Two", "Three", "Four", "Five", "Six",
	"Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"]
var Values = [1,2,3,4,5,6,7,8,9,10,10,10,10]

var Card = function(suitString, cardString) {
	var suit = Suits.indexOf(suitString);
	var card = Carts.indexOf(cardString);

	function suit() {
		return Suits[suit];
	}

	function card() {
		return Cards[card];
	}

	function hash() {
		return 13 * suit + card;
	}
}

function cardValue(cardString) {
	return Values[Cards.indexOf(cardString)];
}

// For node only
if (window) {} else {
	exports.Suits = Suits
	exports.Cards = Cards
	exports.Card = Card
	exports.cardValue = cardValue
}