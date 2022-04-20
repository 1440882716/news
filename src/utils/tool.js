// 防抖
export function debounce(func, delay) {
    var timer = null;
    return function () {
        var context = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(function () {
            func.apply(context, args);
            timer = null;
        }, delay);
    }
}

// 节流
export function Throttle(func, delay) {
    var timer = null;
    return function () {
        var context = this;
        var args = arguments;
        if (!timer) {
            timer = setTimeout(function () {
                func.apply(context, args);
                timer = null;
            }, delay);
        }
    }
}
