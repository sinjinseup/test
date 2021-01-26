console.log('aaaa');


exports.toHHMMSS = function (date) {
    const timeGap = new Date(0, 0, 0, 0, 0, 0, date); 

    const diffDay  = Math.floor(date / (1000 * 60 * 60 * 24)); // 일수       
    const diffHour = timeGap.getHours();       // 시간 
    const diffMin  = timeGap.getMinutes();      // 분
    const diffSec  = timeGap.getSeconds();      // 초
    
    return `${diffDay}일${diffHour}시간${diffMin}분${diffSec}초`;
}

exports.numberFormat = (data) => {
    if(data==0) return 0;
    
    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (data + '');
    
    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
    
    return n;
}

exports.dateYmd = (data) => {
    data = data.split(' ');

    return data[0];
}