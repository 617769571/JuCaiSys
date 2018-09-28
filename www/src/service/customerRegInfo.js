// web service api 业务处理
// 此模块用于扩展updata功能
// APP常用方法接口
import _smp from '../common/simple.js';
// 状态码
import S from '../config/state.js';
module.exports = {
    // 获取客户注册信息
    getCustomerRegInfo(id) {
        return this.getTData({ url: '/selectRegistDTOByCusId',  data: { customerId: id } });
    },
    // 获取编码字符串
    getEncodeStr: function(certNo){
    	return this.getTData({ url: '/getToken', data: { certNo: certNo} });
    },
    // 获取token
    getToken: function(data){
    	console.log(data);
    	// return this.getTData({ url: 'https://credit.baiqishi.com/clweb/api/common/gettoken', data: data });
    	return A.RS({ url: 'https://credit.baiqishi.com/clweb/api/common/gettoken', data: data });
    }
}