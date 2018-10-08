// web service api 业务处理
// 此模块用于扩展updata功能
// APP常用方法接口
import _smp from '../common/simple.js';
// 状态码
import S from '../config/state.js';
module.exports = {
    // 获取贷款额度
    getLimitInfo(id) {
        return this.getTData({ url: '/get/CustomerAmount',  data: { customerId: id } });
    },
    // 提交贷款额度信息
    editLimit: function(data){
    	return this.getTData({ url: '/update/Customer',  data: data });
    }
}