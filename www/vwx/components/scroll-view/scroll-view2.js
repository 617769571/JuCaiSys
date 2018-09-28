/*
 * scroll-view.js v0.3.0
 * (c) 2017 wangli
 * Released under the MIT License.
 */
//import IScroll from 'iscroll';
import _tpl from './scroll_view2.html';
import "./scroll2.css";
module.exports = {
    name: "vwx-scroll-none",
    template: _tpl,
    data: function () {
        return {
            isupdata: false,
            scroll_top: 0,
            iTop: 0,
            waitBottom: false,
            waitTop: false,
            clientYA: 0,
            clientYB: 0,
            moveTop: 0,
            moveTime: 0,
            upp: 'renew',
        }
    },
    props: {
        iswait: {
            type: Boolean,
            default: false
        },
        watchData: {
            type: Array,
            default: null
        },
        lowerThreshold: {
            type: Number,
            default: 80
        },
        isover: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        wait: function (val, oldVal) {

        },
        isover: function (val, oldVal) {
            this.waitBottom = !val;
        },
        watchData: function (newVal, oldVal) {
            // 根据数据更新的多少来判断是刷新数据，还是新增数据
            if (newVal.length > oldVal.length && oldVal.length != 0) {
                this.upp = 'add';
            } else {
                this.upp = 'renew';
                this.moveTime = 800;
                this.moveTop = 0;
            }
            this.waitTop = false;
            this.waitBottom = false;
            this.updateItems();
        }
    },
    mounted: function () {
        this.$el.addEventListener("scroll", this.scroll);
        this.$el.addEventListener("touchstart", this.touchstart)
    },
    methods: {
        touchstart: function (evt) {
            this.iTop = this.$el.scrollTop;
            this.clientYA = evt.touches[0].clientY;
            if (this.$el.scrollTop < 50) {
                //距离顶部小于50
                this.$el.addEventListener("touchmove", this.touchmove);
                this.$el.addEventListener("touchend", this.touchend);
            }
        },
        touchmove: function (evt) {
            this.moveTime = 0;
            this.clientYB = evt.touches[0].clientY;
            if ((this.clientYB - this.clientYA) >= 0) {
                this.moveTop = this.clientYB - this.clientYA;
            }
            if (this.moveTop > 0 && this.$el.scrollTop < 5) {
                if (this.moveTop > 50) {
                    this.waitTop = true;
                    // this.$emit('pulldown', this);
                }
            }
        },
        touchend: function (evt) {
            this.$el.removeEventListener("touchmove", this.touchmove);
            this.$el.removeEventListener("touchend", this.touchend);
            if (this.iTop < 5) {
                if (this.waitTop) {
                    this.moveTime = 800;
                    this.moveTop = 30;
                    this.$emit('pulldown', this);
                }
            } else {
                this.moveTime = 800;
                this.moveTop = 0;
            }
            // if (this.moveTop > 0 && this.$el.scrollTop < 50 && this.iswait) {
            //     // waitTop
            //     if (this.moveTop > 50) {
            //         this.moveTime = 800;
            //         this.moveTop = 30;
            //         this.waitTop = true;
            //         this.$emit('pulldown', this);
            //     } else {
            //         this.moveTime = 800;
            //         this.moveTop = 0;
            //     }
            // } if (this.moveTop > 0) {
            //     this.moveTime = 800;
            //     this.moveTop = 0;
            // }
        },
        scroll: function (evt) {
            let scrollTop = evt.target.scrollTop;//内容滚动位置
            let scrollHeight = evt.target.scrollHeight;//内容实际高度
            let offsetHeight = evt.target.offsetHeight;//可见的高度
            let awayDown = scrollHeight - (scrollTop + offsetHeight);
            if (scrollHeight > offsetHeight && (scrollTop + offsetHeight) >= scrollHeight) {
                // 滚动到底部
                this.scroll_top = scrollTop;
                this.$emit('scrolltolower', this);
            } else if (scrollTop <= 0) {
                // 滚动到顶部
                this.$emit('scrolltoupper', this);
            } else if (awayDown < 100 && this.watchData && this.isupdata == false && this.isover == false) {
                this.isupdata = true;
                this.waitBottom = true;
                this.$emit('pullup', this);
            }
        },
        updateItems: function () {
            let targetTop = this.scroll_top + this.lowerThreshold;
            if (this.upp == "add") {
                let goTop = this.scroll_top;
                let id = String(Math.random * 1000);
                A.setInterval(id, (rs) => {
                    let mvTop = parseInt((targetTop - goTop) * 0.2);
                    if (mvTop > 0) {
                        goTop += mvTop;
                        this.$el.scrollTo(0, goTop);
                    } else {
                        A.clearInterval(id);
                    }
                }, 30)
            }
            this.isupdata = false;
            this.waitTop = false;
            this.waitBottom = false;
            // this.$el.scrollTo(0, -this.lowerThreshold);
        },
        scrollBy: function (x, y) {
            this.$el.scrollTo(x, this.scroll_top+y);
        },
        isWait: function (val) {
            if (val == 'add') {
                this.waitBottom = true;
            } else {
                this.waitTop = true;
            }
        },
        refresh: function (evt) {
            this.waitTop = false;
            this.waitBottom = false;
        }
    }
};