var Vector = function(startX, startY) {
	var x = startX,
		y = startY;

	function X() {
		return x;
	}

	function Y() {
		return y;
	}

	function add(v) {
		return Vector(x + v.X(), y + v.Y());
	}

	function scale(s) {
		return Vector(x * s, y * s);
	}
}

if (window) {} else {
	exports.Vector = Vector;
}