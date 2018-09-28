import { Page } from "vwx";
import tpl from "./index.html";
import './index.less';

var timer = null;
module.exports = Page({
    name: "index",
    template: tpl,
    data: {
        role: 0, // 用户角色

        // 非列表页面对应菜单编号
        pageObj: {
            '-2': { 0: '/home' },
            '-1' : { 0: '/list' },
            0: { 0: '/workstation' },
            3: { 7: '/financialStat' },
            4: { 0: '/editPassword'},
            6: { 0: '/rate'}
        },
        menus: [],
        subMenus: [],
        menu: '-2', // 当前选中菜单对应页面对象pageObj编号
        subMenu: 0, // 当前选中子菜单对应页面对象pageObj子编号
        selectedMenu: -1, // 当前选中菜单编号
        selectedSubMenu: -1, // 当前选中菜单编号
        showSubMenu: false, // 是否展开菜单显示子菜单
        datetime: '', // 时间
        week: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
        day: '', // 星期几
        username: 'caiwu001', // 用户名
    },
    onShow: function () {
        const that = this;
        
        // 是否已登录
        if(!wx.getStorageSync('user')){
            A.router.replace({ path: '/login' });
            return;
        }else{
            that.role = wx.getStorageSync('user.role');
            that.username = wx.getStorageSync('user.name');
        }

        // 时间
        that.day = that.week[(new Date()).getDay()];
        timer = setInterval(function(){
            var date = new Date();
            date = A.dateFormat(date, 'YYYY-MM-DD hh:mm:ss');
            that.datetime = date;
        }, 1000);

        // 菜单
        that.setMenu();
        // 当前菜单
        that.selectedMenu = this.$route.query.m;
        that.selectedSubMenu = this.$route.query.sm;
    },
    onUnload: function(){
        clearInterval(timer);
    },
    // 设置该权限下的菜单
    setMenu: function(){
        const that = this;
        var menus = {}, subMenus = {};
        var pagesObj = A.data.authority[that.role]
        for(var i in pagesObj){
            var menuObj = A.data.menu[i];
            menus[i] = menuObj.title;
            subMenus[i] = {};
            for(var j in pagesObj[i]){
                subMenus[i][pagesObj[i][j]] = menuObj.value[pagesObj[i][j]];
            }
        }
        that.menus = menus;
        that.subMenus = subMenus;
    },
    // 选择菜单
    selectMenu: function(e){
        var idx = e.target.dataset.index
        this.selectedMenu = idx;
        this.menu = this.pageObj[idx] ? idx : '-1';
        this.showSubMenu = !this.showSubMenu;
    },
    // 选择子菜单
    selectSubMenu: function(e){
        var idx = e.target.dataset.index
        this.selectedSubMenu = idx;
        var url = 'home';
        if(this.menu >= 0){
            var pageLabel = this.pageObj[this.menu][idx]
            if(pageLabel){
                this.subMenu = idx;
                url = pageLabel;
            }else{
                this.menu = '-1';
                this.subMenu = 0;
                url = this.pageObj[this.menu][this.subMenu] + '/' + this.selectedMenu + '/' + this.selectedSubMenu;
            }
        }else if(this.menu == '-1'){
            this.subMenu = 0;
            url = this.pageObj[this.menu][this.subMenu] + '/' + this.selectedMenu + '/' + this.selectedSubMenu;
        }else{
            this.subMenu = 0;
            url = this.pageObj[this.menu][this.subMenu]
        }
        A.router.replace({ path: url });
    },
    // 跳转页面
    goPage: function(menu, subMenu){
        this.selectedMenu = -1;
        this.selectedSubMenu = -1;
        this.menu = menu;
        this.subMenu = subMenu;
        A.router.replace({ path: this.pageObj[this.menu][this.subMenu] });
    },
    // 退出登录
    logout: function(){
        localStorage.clear();
        A.router.replace({ path: 'login' });
    }
});
