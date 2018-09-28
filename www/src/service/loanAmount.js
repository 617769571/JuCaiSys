// web service api 业务处理
// 此模块用于扩展updata功能
// APP常用方法接口
import _smp from '../common/simple.js';
// 状态码
import S from '../config/state.js';
module.exports = {
    // 获取贷款金额
    getLoanAmountInfo(id) {
        return this.getTData({ url: '/getRemark',  data: { borrowInfoId: id } });
    },
    // 提交修改金额
    editLoanAmount(id, amount) {
        return this.getTData({ url: '/updateBorrowInfoById',  data: { id: id, borrowAmount: amount } });
    }
}