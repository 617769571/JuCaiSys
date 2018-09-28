/*
 * swiper.js v0.1.4
 * (c) 2017 wangli
 * Released under the MIT License.
 */
import Swiper from 'swiper';
import _tpl from './swiper.html';
import 'swiper/dist/css/swiper.css';
var vSwiper = null;
module.exports = {
    name: 'vwx-swiper',
    template: _tpl,
    props: {
        indicatorDots: {
            type: Boolean,
            default: function () {
                return false
            }
        },
        autoplay: {
            type: Boolean,
            default: function () {
                return true
            }
        },
        current: {
            type: Number,
            default: function () {
                return 0
            }
        },
        interval: {
            type: Number,
            default: function () {
                return 3000
            }
        },
        duration: {
            type: Number,
            default: function () {
                return 500
            }
        },
        circular: {
            type: Boolean,
            default: function () {
                return true
            }
        },
        swiperId: {
            default: "swiper"
        }
    },
    computed: {
        pagination: function () {
            return (this.indicatorDots) ? ".swiper-pagination" : "";
        },
        intval: function () {
            return (this.autoplay) ? this.interval : 0;
        },
        swid: function () {
            if (this.swiperId.indexOf('.') == 0) {
                return this.swiperId;
            } else {
                return "#" + this.swiperId;
            }
        }
    },
    mounted: function () {
        //创建滚动
        vSwiper = new Swiper(this.swid, {
            observer:true,
            observeParents:true,
            autoplay: this.intval,
            pagination: this.pagination,
            speed: this.duration,
            initialSlide: this.current,
            loop: this.circular,
        });
        setTimeout(() => {
            this.refresh()
        }, 1000);
    },
    methods: {
        refresh: function () {
            if (vSwiper) {
                vSwiper.update();
            }
        }
    }
};
