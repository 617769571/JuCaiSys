import { Page } from "vwx";
import tpl from "./list.html";
import './list.less';


module.exports = Page({
    name: "list",
    template: tpl,
    data: {
        menu: 0, // 主菜单
        subMenu: 0, // 子菜单
        menuFlag: '0_0', // 菜单拼接字符串
        searchInfo: [], //查询条件数组
        listInfo: [], // 列表项数组
        operationInfo: [], // 操作数组
        searchNumArr: [], // 该角色该列表的查询条件编号数组
        listNumArr: [], // 该角色该列表的列表项编号数组
        operationNumArr: [], // 该角色该列表的操作编号数组
        url: '', // 该角色该列表的接口路径
        searchDataArr: {}, // 查询数据对象
        list: [], // 该角色该列表数据
        pageNum: 0,
        pageCount: 0,
        pageSize: 30,
        itemCount: 0,
        selectedArr: [], // 选中的行元素
    },
    watch: {
        $route(val) {
            // 初始化
            this.initData(val.params.m, val.params.sm);
            // 获取列表数据
            this.getList();
        }
    },
    onLoad: function (opts) {
        // 初始化
        this.initData(this.$route.params.m, this.$route.params.sm);
    },
    onShow: function(){
        // 获取列表数据
        this.getList();
    },
    // 初始化数据
    initData: function(m, sm){
        const that = this;

        that.menu = m;
        that.subMenu = sm;
        that.menuFlag = that.menu + '_' + that.subMenu;

        // 获取标准信息
        that.searchInfo = A.data.search;
        that.listInfo = A.data.listItem;
        that.operationInfo = A.data.operation;
        // 获取页面信息
        let info = A.data.pageSearch[that.menuFlag];
        that.searchNumArr = info.search;
        that.listNumArr = info.listItem;
        that.operationNumArr = info.operation[wx.getStorageSync('user').role];
        that.url = info.url || '/listDTO';
        that.defaultParams = info.params || {};
    },
    // 获取列表数据
    getList: function(page){
        var pageNum = page || 1;
        this.list = [];
        if(pageNum >= 1 && ((this.pageCount != 0 && pageNum <= this.pageCount) || this.pageCount == 0)){
            var defaultParams = Object.assign({
                paging: pageNum,
                pageSize: this.pageSize
            }, this.defaultParams);
            var data = Object.assign(defaultParams, this.searchDataArr)
            A.updata.getList(this.url, data).then(res => {
                if(res.code == 0){
                    if(this.menuFlag == '5_0'){
                        this.list = res.data;
                    }else{
                        this.list = res.data.list;
                    }
                    this.pageCount = res.data.all_paging;
                    this.pageNum = res.data.paging;
                }
            }, err => {})
        }
    },
    // 按钮点击事件
    btnFunc: function(e){
        var optItem = e.currentTarget.dataset.optitem;
        this[this.operationInfo[optItem].func](e);
        return false;
    },
    // 抢单
    striveForOrder: function(){
        var that = this;
        if (this.selectedArr.length > 0) {
            A.updata.striveForOrder(this.selectedArr).then(res => {
                if(res.code == 0){
                    wx.alert(res.data, function(){
                        that.getList(that.pageNum);
                    });
                }
            }, err => {});
        }else {
            wx.alert('请至少选择一条数据');
        }
    },
    // 拉黑
    putInBlacklist: function(e){
        var that = this;
        var id = e.currentTarget.dataset.cusid;
        A.updata.putInBlacklist(id).then(res => {
            if(res.code == 0){
                wx.alert(res.data, function(){
                    that.getList(that.pageNum);
                });
            }
        }, err => {});
    },
    // 查看客户注册信息
    goCusInfo: function(e){
        var id = e.currentTarget.dataset.cusid;
        if(this.menuFlag == '2_4' || this.menuFlag == '2_6'){
            A.router.push({ path: '/customerInfo?id=' + id});
        }else{
            A.router.push({ path: '/customerRegInfo?id=' + id});
        }
    },
    // 打款
    makeMoney: function(e){
        var that = this;
        var id = e.currentTarget.dataset.borrowid;
        A.updata.makeMoney(id).then(res => {
            if(res.code == 0){
                wx.alert(res.data, function(){
                    that.getList(that.pageNum);
                });
            }
        }, err => {});
    },
    // 确认还款
    repayment: function(e){
        var that = this;
        var id = e.currentTarget.dataset.borrowid;
        // var time = A.dateFormat(new Date(), 'YYYY-MM-DD hh:mm:ss')
        A.updata.repayment(id).then(res => {
            if(res.code == 0){
                wx.alert(res.data, function(){
                    that.getList(that.pageNum);
                });
            }
        }, err => {});
    },
    // 续期
    renewal: function(e){
        var that = this;
        var id = e.currentTarget.dataset.borrowid;
        A.updata.renewal(id).then(res => {
            if(res.code == 0){
                wx.alert(res.data || '展期成功！', function(){
                    that.getList(that.pageNum);
                });
            }
        }, err => {});
    },
    // 修改
    edit: function(e){
        if(this.menuFlag == '1_2'){
            var id = e.currentTarget.dataset.cusid;
            A.router.push({ path: '/editCustomerInfo?id=' + id});
        }else if(this.menuFlag == '3_8'){
            var id = e.currentTarget.dataset.borrowid;
            A.router.push({ path: '/editLoanAmount?id=' + id});
        }
    },
    // 审核通过
    auditPass: function(e){
        var that = this;
        var borrowId = e.currentTarget.dataset.borrowid;
        var cusId = e.currentTarget.dataset.cusid;
        var data = {};
        if(this.menuFlag == '1_1'){
            data = {
                id: borrowId,
                kfName: wx.getStorageSync('user').name,
                type: 1,
                isKf: 1
            }
        }else if(this.menuFlag == '2_0'){
            data = {
                id: borrowId,
                fk1Name: wx.getStorageSync('user').name,
                type: 2,
                isFk1: 1
            }
        }else if(this.menuFlag == '2_1' ){
            data = {
                id: borrowId,
                fk2Name: wx.getStorageSync('user').name,
                type: 3,
                isFk2: 1
            }
        }
        A.updata.audit(data).then(res => {
            if(res.code == 0){
                wx.alert(res.data, function(){
                    that.getList(that.pageNum);
                });
            }
        }, err => {});
    },
    // 审核不通过
    auditReject: function(e){
        var that = this;
        var borrowId = e.currentTarget.dataset.borrowid;
        var cusId = e.currentTarget.dataset.cusid;
        var data = {};
        if(this.menuFlag == '1_1'){
            data = {
                id: borrowId,
                kfName: wx.getStorageSync('user').name,
                type: 1,
                isKf: 2
            }
        }else if(this.menuFlag == '2_0'){
            data = {
                id: borrowId,
                fk1Name: wx.getStorageSync('user').name,
                type: 2,
                isFk1: 2
            }
        }else if(this.menuFlag == '2_1' ){
            data = {
                id: borrowId,
                fk2Name: wx.getStorageSync('user').name,
                type: 3,
                isFk2: 2
            }
        }
        console.log(this.menuFlag);
        A.updata.audit(data).then(res => {
            if(res.code == 0){
                wx.alert(res.data, function(){
                    that.getList(that.pageNum);
                });
            }
        }, err => {});
    },
    // 等级修改
    editRank: function(e){
        var id = e.currentTarget.dataset.id;
        A.router.push({ path: '/editCustomerRank?id=' + id});
    },
    // 删除
    delete: function(e){
        var that = this;
        var id = e.currentTarget.dataset.id;
        A.updata.delete(id).then(res => {
            if(res.code == 0){
                wx.alert(res.data, function(){
                    that.getList(that.pageNum);
                });
            }
        }, err => {});
    },
    // 查看通讯录
    goAddrList: function(e){
        var id = e.currentTarget.dataset.cusid;
        A.router.push({ path: '/addressList?id=' + id});
    },
    // 移出黑名单
    removeFromBlacklist: function(e){
        var that = this;
        var id = e.currentTarget.dataset.cusid;
        A.updata.removeFromBlacklist(id).then(res => {
            if(res.code == 0){
                wx.alert(res.data, function(){
                    that.getList(that.pageNum);
                });
            }
        }, err => {});
    },
    // 添加账号
    addAccount: function(e){
        A.router.push({ path: '/editAccount' });
    }
});
