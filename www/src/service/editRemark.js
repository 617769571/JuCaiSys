// web service api 业务处理
// 此模块用于扩展updata功能
// APP常用方法接口
import _smp from '../common/simple.js';
// 状态码
import S from '../config/state.js';
module.exports = {
    // 获取备注信息
    getRemarkInfo(id) {
        return this.getTData({ url: '/getRemark', data: { customerId: id } });
    },
    // 提交备注
    editRemark(data) {
        return this.getTData({ url: '/updateKfRemark', data: data });
    }
}