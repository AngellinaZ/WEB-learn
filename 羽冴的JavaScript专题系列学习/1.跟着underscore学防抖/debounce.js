var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
	container.innerHTML = count++
}

var setUseAction = debounce(getUserAction, 1000, true);

container.onmousemove = setUseAction;

document.getElementById("button").addEventListener('click', function(){
	setUseAction.cancel()
})

function debounce(func, wait, immediate) {
	var timeout, result;

	var debounced = function () {
		var context = this;
		var args = arguments;
		// console.log(timeout)

		if (timeout) clearTimeout(timeout)   //清除定时器
		
		if (immediate) {  
			// 如果已经执行过，不再执行
			var callNow = !timeout;
			timeout = setTimeout(function () {
				timeout = null;
			}, wait)

			if (callNow) {
				result = func.apply(context, args)
			}
		} else {
			timeout = setTimeout(function(){
				func.apply(context, args)
			}, wait)
		}
		return result;
	}

	//取消防抖
	debounced.cancel = function () {
		clearTimeout(timeout);
		timeout = null
	}

	return debounced
}

/*setTimeout的返回值
	返回数值id，整型，可用于 取消 setTimeout 设置的函数clearTimeout(id)。也就是这个setTimeout的唯一标示符。
*/