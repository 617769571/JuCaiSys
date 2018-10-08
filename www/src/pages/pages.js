// 路由入口
// 登录
import login from './login/login';
// 内容
import index from './index/index';
const home = () => import('./index/home/home.js');
const list = () => import('./index/list/list.js');
const workstation = () => import('./index/workstation/workstation.js');
const financialStat = () => import('./index/financialStat/financialStat.js');
const editPassword = () => import('./index/editPassword/editPassword.js');
const rate = () => import('./index/rate/rate.js');
// 操作
const addressList = () => import('./operation/addressList/addressList.js');
const customerInfo = () => import('./operation/customerInfo/customerInfo.js');
const customerRegInfo = () => import('./operation/customerRegInfo/customerRegInfo.js');
const editLimit = () => import('./operation/editLimit/editLimit.js');
const editRemark = () => import('./operation/editRemark/editRemark.js');
const nameList = () => import('./operation/nameList/nameList.js');
const editCustomerInfo = () => import('./operation/editCustomerInfo/editCustomerInfo.js');
const editCustomerRank = () => import('./operation/editCustomerRank/editCustomerRank.js');
const editLoanAmount = () => import('./operation/editLoanAmount/editLoanAmount.js');
const renewal = () => import('./operation/renewal/renewal.js');
const editAccount = () => import('./operation/editAccount/editAccount.js');
const editRate = () => import('./operation/editRate/editRate.js');
// const editLimit = () => import('./operation/editLimit/editLimit.js');
// 下载app
import download from './download/download';
// 404
import notFound from './other/notFound';

export default [
        { path: '/login', component: login, name: "login", title: "登录" },

        {
                path: '/', redirect: '/home', component: index, name: "index", title: "首页", meta: { keepAlive: true },
                children: [
                        { path: 'home', name: "home", component: home, title: "首页", meta: { keepAlive: true } },
                        { path: 'list/:m/:sm', name: "list", component: list, title: "列表" },
                        { path: 'workstation', name: "workstation", component: workstation, title: "工作站" },
                        { path: 'financialStat', name: "financialStat", component: financialStat, title: "财务统计" },
                        { path: 'editPassword', name: "editPassword", component: editPassword, title: "修改密码" },
                        { path: 'rate', name: "rate", component: rate, title: "查看费率" },
                        
                        { path: 'addressList', component: addressList, name: "addressList", title: "通讯录列表" },
                        { path: 'customerInfo', component: customerInfo, name: "customerInfo", title: "客户基本信息" },
                        { path: 'customerRegInfo', component: customerRegInfo, name: "customerRegInfo", title: "客户注册信息" },
                        { path: 'editLimit', component: editLimit, name: "editLimit", title: "修改贷款额度" },
                        { path: 'editRemark', component: editRemark, name: "editRemark", title: "修改备注" },
                        { path: 'nameList', component: nameList, name: "nameList", title: "名单查询" },
                        { path: 'editCustomerInfo', component: editCustomerInfo, name: "editCustomerInfo", title: "编辑客户信息" },
                        { path: 'editCustomerRank', component: editCustomerRank, name: "editCustomerRank", title: "修改客户登记" },
                        { path: 'editLoanAmount', component: editLoanAmount, name: "editLoanAmount", title: "修改贷款金额" },
                        { path: 'renewal', component: renewal, name: "renewal", title: "续期" },
                        { path: 'editAccount', component: editAccount, name: "editAccount", title: "添加账号" },
                        { path: 'editRate', component: editRate, name: "editRate", title: "修改费率" }
                ]
        },

        { path: '/download', component: download, name: "download", title: "每周口袋" },
        { path: '*', component: notFound, name: "404", title: "404" }
]