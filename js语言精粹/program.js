document.write('Hellon world!');

Function.prototype.method = function (name, func) {
	this.prototype[name] = func;
	return this;
}

function myFunction() {
	try {
		var x = document.getElementById("demo").value;
		if (x == '') throw 'empty';
		if (isNaN(x)) throw '不是数字';
		if (x > 10) throw 'too high';
		if (x < 5) throw 'too low';
	} catch(err) {
		var y = document.getElementById("mess");
		y.innerHTML = "Error" + err
	}
}