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
// 下载投递地址的模板
export function downloadExcel() {
    // var blob = new Blob([res], {
    //     type: "application/vnd.ms-excel",
    // }); //type这里表示xlsx类型
    var downloadElement = document.createElement("a");
    var href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.href = href;
    downloadElement.download = "Table.xlsx"; //下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放掉blob对象
}
