var Suits = ["Hearts", "Clubs", "Diamonds", "Spades"]
var SuitChars = ['♥', '♣', '♦', '♠']
var Cards = ["","Ace", "Two", "Three", "Four", "Five", "Six",
	"Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"]
var Values = [-1,1,2,3,4,5,6,7,8,9,10,10,10,10]

var cardParent = $( '#cribbage_game' );

var Card = function(cardString, suitString) {
	var suit = Suits.indexOf(suitString);
	var card = Cards.indexOf(cardString);

	function suit() {
		return Suits[suit];
	}

	function card() {
		return Cards[card];
	}

	function hash() {
		return 13 * suit + card;
	}

	function createDOMCard(parent) {
		cardNumber = card.toString();
		if (card == 1 || card > 10)
			cardNumber = Cards[card][0];
		topCardNumberDiv = $('<div>', {class: "top_card_number", text: cardNumber});
		bottomCardNumberDiv = $('<div>', {class: "bottom_card_number", text: cardNumber});
		cardSuitDiv = $('<div>', {class: "card_suit", text: SuitChars[suit]});

		cardDiv = $('<div>', {class: "card"})

		cardDiv.append(topCardNumberDiv);
		cardDiv.append(bottomCardNumberDiv);
		cardDiv.append(cardSuitDiv);
		parent.append(cardDiv);

		return cardDiv;
	}

	function addCardToView(width, height, startX, startY) {
		var newCard = createDOMCard(cardParent);
		// newCard.width = width;
		// newCard.height = height;
		newCard.css({
			"position":"absolute",
			"width":width.toString(),
			"height":height.toString(),
			"left":startX.toString(),
			"bottom":startY.toString(),
			"font-size":"40"});
		// newCard.left = startX;
		// newCard.bottom = startY;

		return newCard;
	}

	return {
		suit: suit,
		card: card,
		hash: hash,
		addCardToView: addCardToView
	};
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

for (var i = 1; i <= 13; i++) {
	card = new Card(Cards[i], "Hearts").addCardToView(150, 250, 75*(i-1), 10*i);
	card.css({"transform": "rotate(" + (i * 5).toString() + "deg)"});
}
