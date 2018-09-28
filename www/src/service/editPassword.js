// web service api 业务处理
// 此模块用于扩展updata功能
// APP常用方法接口
import _smp from '../common/simple.js';
// 状态码
import S from '../config/state.js';
module.exports = {
    // 提交表单
    submitEditPwdForm(id, name, oldPassword, newPassword) {
        return this.getTData({ url: '/updateAdminById',  data: { id:id, username: name, orderPassword: oldPassword, password: newPassword } });
    }
}