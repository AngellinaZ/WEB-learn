var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
	container.innerHTML = count++
}
container.onmousemove = throttle3(getUserAction, 3000);

//双剑合璧--鼠标移入能立刻执行，停止触发的时候还能再执行一次！
function throttle3(func, wait) {
    var timeout, context, args, result;
    var previous = 0;

    var later = function() {
        previous = +new Date();  
        timeout = null;
        func.apply(context, args)
    };

    var throttled = function() {
        var now = +new Date();
        //下次触发 func 剩余的时间
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
         // 如果没有剩余的时间了或者你改了系统时间
        if (remaining <= 0 || remaining > wait) {  
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;  //赋值导致下方取 remaining 的时候重新计算
            func.apply(context, args);
        } else if (!timeout) { 
            timeout = setTimeout(later, remaining);
        }
    };
    return throttled;
}

//使用定时器
function throttle2(func, wait) {
	var timeout, context, args;

	return function () {
		context = this;
		args = arguments;
		if (!timeout) {
			setTimeout(function () {
				tiemout = null;
				func.apply(context, args)
			}, wait)
		}
	}
}


//使用时间戳:当鼠标移入的时候，事件立即执行
function throttle1(func, wait) {
	var context, args;
	var previous = 0;

	return function() {
		var now = +new Date();
		context = this;
		args = arguments;
		if (now - previous > wait) {
			func.apply(context, args);
			previous = now;
		}
	}
}

/*setTimeout的返回值
	返回数值id，整型，可用于 取消 setTimeout 设置的函数clearTimeout(id)。也就是这个setTimeout的唯一标示符。
*/