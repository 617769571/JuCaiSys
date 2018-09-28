// web service api 业务处理
// 此模块用于扩展updata功能
// APP常用方法接口
import _smp from '../common/simple.js';
// 状态码
import S from '../config/state.js';
module.exports = {
    // 获取列表数据
    getList(url, data) {
        return this.getTData({ url: url, data: data });
    },
    // 抢单
    striveForOrder: function(ids){
    	return this.getTData({ url: '', data: { ids: ids } });
    },
    // 拉黑
    putInBlacklist: function(id){
        return this.getTData({ url: '/update/Customer', data: { isBlack: 0, id: id } });
    },
    // 打款
    makeMoney: function(id){
        return this.getTData({ url: '/buttonLoan', data: { id: id } });
    },
    // 确认还款
    repayment: function(id){
    	return this.getTData({ url: '/buttonReturn', data: { id: id} });
    },
    // 续期
    renewal: function(id){
        return this.getTData({ url: '/buttonExtension', data: { borrowInfoId: id } });
    },
    // 审核
    audit: function(data){
    	return this.getTData({ url: '/buttonReview', data: data });
    },
    // 删除
    delete: function(id){
    	return this.getTData({ url: '', data: { id: id } });
    },
    // 移出黑名单
    removeFromBlacklist: function(id){
    	return this.getTData({ url: '/update/Customer', data: { isDel: 0, id: id } });
    }
}