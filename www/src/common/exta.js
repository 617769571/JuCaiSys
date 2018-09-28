// 扩展配置
import define from '../config/define'
import updata from '../service/updata'
import jwx from 'weixin-js-sdk'
import simple from './simple'
import reg from './reg'
import data from './data'

function flagBtn(arr, num) {
    let nowNum = 0;
    arr.map(item => {
        item ? nowNum++ : ''
    })
    return nowNum >= num ? true : false
}
const addEge = a => {
    return a < 10 ? a = "0" + a : a = a
}
// 输出数组倒计时封装
const dayTimeArr = bb => {
    var bb = bb
    var day = parseInt(bb / 86400);
    var time = parseInt((bb - (day * 86400)) / 3600);
    var min = parseInt((bb - (time * 3600 + day * 86400)) / 60)
    var sinTime = time * 3600 + min * 60 + day * 86400
    var sinTimeb;
    var sin1 = parseInt((bb - sinTime))
    var timeArr = [addEge(day), addEge(time), addEge(min), addEge(sin1)];
    if (bb <= 0) {
        timeArr = ["00", "00", "00", "00"];
    }
    return timeArr
}
module.exports = { ...define, ...simple, reg, updata, flagBtn, jwx, dayTimeArr, data };