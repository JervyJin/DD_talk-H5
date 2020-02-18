function formateDate (date) {
    // console.log('date：', date)
    if (date != null || date != '' || date != undefined) {
        var arr = date.split("T");
        var d = arr[0];
        var darr = d.split('-');
        var t = arr[1];
        var tarr = t.split('.000');
        var marr = tarr[0].split(':');
        // date = parseInt(darr[0]) +'-'+ parseInt(darr[1]) +'-'+ parseInt(darr[2]) + " " + parseInt(marr[0]) + ":" + parseInt(marr[1]) + ":" + parseInt(marr[2]);
        date = parseInt(darr[0]) + '/' + parseInt(darr[1]) + '/' + parseInt(darr[2]) + " " + parseInt(marr[0]) + ":" + parseInt(marr[1]) + ":" + parseInt(marr[2]);
        return date;
    } else {
        return false;
    }
}
export {
    formateDate
}