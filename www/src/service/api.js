// web service api 业务处理
// 此模块用于扩展updata功能
import login from './login'
import editPassword from './editPassword'
import financialStat from './financialStat'
import workstation from './workstation'
import list from './list'

import addressList from './addressList'
import customerRegInfo from './customerRegInfo'
import customerInfo from './customerInfo'
import loanAmount from './loanAmount'
import rate from './rate'
import account from './account'
import renewal from './renewal'
import editRemark from './editRemark'
import nameList from './nameList'

module.exports = {
   ...login, ...editPassword, ...financialStat, ...workstation, ...list,
   ...addressList, ...customerRegInfo, ...customerInfo, ...loanAmount, ...rate, ...account, ...renewal, ...editRemark, ...nameList
}
