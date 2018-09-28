// web service api 业务处理
// 此模块用于扩展updata功能
// APP常用方法接口
import _smp from '../common/simple.js';
// 状态码
import S from '../config/state.js';
module.exports = {
    // 获取客户基本信息
    getCustomerInfo(id) {
        return this.getTData({ url: '/selectRegistDTOByCusId',  data: { customerId: id } });
    },
    // 提交客户风控信息
    editCusRiskManageInfo: function(data){
    	return this.getTData({ url: '',  data: data });
    },
    // 提交客户基本信息
    editCustomerInfo: function(data){
    	return this.getTData({ url: '/update/Customer',  data: data });
    }
}