// web service api 业务处理
// 此模块用于扩展updata功能
// APP常用方法接口
import _smp from '../common/simple.js';
// 状态码
import S from '../config/state.js';
module.exports = {
    // 获取通讯录
    getAddressList(id) {
        return this.getTData({ url: '/listPhoneBook/ByCustomerId', data: { customerId: id } });
    }
}