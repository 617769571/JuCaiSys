/*
 * scroll-view.js v0.3.0
 * (c) 2017 wangli
 * Released under the MIT License.
 */
//import IScroll from 'iscroll';
import IScroll from 'better-scroll';
import _tpl from './scroll_view.html';

module.exports = {
    name: "vwx-scroll",
    template: _tpl,
    data: function () {
        return {
            lowerY: 1,
            scroll_top: 0,
            scroll_left: 0,
            vScroll: null,
            waitBottom: false,
            waitTop: false,
            threshold: false
        }
    },
    props: {
        scrollClass: {
            type: String,
            default: "scroll-class"
        },
        scrollX: {
            type: Boolean,
            default: false
        },
        scrollY: {
            type: Boolean,
            default: true
        },
        scrollTop: {
            type: Number,
            default: 0
        },
        scrollLeft: {
            type: Number,
            default: 0
        },
        upperThreshold: {
            type: Number,
            default: 50
        },
        lowerThreshold: {
            type: Number,
            default: 0
        },
        isover: {
            type: Boolean,
            default: false
        },
        wait: {
            type: Boolean,
            default: false
        },
        data: {
            type: Array,
            default() {
                return []
            }
        },
        dataTp: {
            default: "down"
        },
        more: {
            type: Boolean,
            default: false
        },
        scrollId: {
            default: ".scrollView"
        }
    },
    watch: {
        wait: function (val, oldVal) {
            if (!val) {
                this.waitBottom = this.waitTop = false;
            }
        },
        data: function (val, oldVal) {
            this.updateItems();
        },
        scrollTop: function (val, oldVal) {
            this.vScroll.scrollTo(this.vScroll.x, val);
        },
        scrollLeft: function (val, oldVal) {
            this.vScroll.scrollTo(val, this.vScroll.y);
        },
        isover: function () {
            setTimeout(() => {
                this.waitBottom = this.waitTop = false;
            }, 2000);
        }
    },
    mounted: function () {

        this.scroll_top = this.scrollTop;
        this.scroll_left = this.scrollLeft;
        //创建滚动
        this.vScroll = new IScroll(this.scrollId, {
            startY: this.scrollTop,
            startX: this.scrollLeft,
            scrollX: this.scrollX,
            scrollY: this.scrollY,
            probeType: 3,
            mouseWheel: true,
            disableTouch: false,
            disableMouse: false,
            disablePointer: false,
            click: false,
            tap: true,
            pullDownRefresh: true,
            pullUpLoad: true,
            bounce: { bottom: true },
            preventDefault: false

        });
        //滚动监听
        this.vScroll.on('scrollStart', () => {
            this.$emit('bindscrollstart', this);
        });
        //滚动监听
        this.vScroll.on('scrollEnd', () => {
            this.threshold = false;
            this.$emit('bindscrollend', this);
            this.refresh();
        });
        //监听已滚动到底部，用于更新数据
        this.vScroll.on('pullingUp', () => {
            this.waitBottom = true;
            this.$emit('scrolltolower', this);
        });
        //监听滚动到顶部，用于刷新数据
        this.vScroll.on('pullingDown', () => {
            this.waitTop = true;
            this.$emit('scrolltoupper', this);
        });
        if (this.more) {
            //滚动监听
            this.vScroll.on('scroll', () => {
                this.$emit('bindscroll', this);
                //that.vbindscroll(this);
            });
        }
        if (window.document) {
            document.querySelector(this.scrollId).addEventListener("DOMNodeInserted", this.refresh, true);
            document.querySelector(this.scrollId).addEventListener("DOMNodeRemoved", this.refresh, true);
        }
    },
    methods: {
        updateItems: function () {
            if (this.data.length > 0) {
                if (this.dataTp == 'up') {
                    this.waitBottom = false;
                    this.vScroll.scrollBy(0, -this.lowerThreshold, 1000);
                } else {
                    this.waitTop = false;
                    this.vScroll.scrollBy(0, 0, 1000);
                }
                this.vScroll.finishPullDown();
                this.vScroll.finishPullUp();
            }
        },
        scrollBy: function (x, y) {
            x = x || 0, y = y || 0;
            this.vScroll.scrollBy(x, y, 1000);
        },
        refresh: function (evt) {
            this.vScroll.refresh();
        }
    }
};