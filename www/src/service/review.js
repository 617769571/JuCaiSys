// 接口是否需要更新状态
import category from './category';
const apis = {};
module.exports = {
    setApi(_val, _st) {
        apis[_val] = typeof (_st) != "undefined" ? _st : true;
    },
    api(_val) {
        return typeof (apis[_val]) == "undefined" ? true : apis[_val];
    },
    init(_keys) {
        if (typeof (_keys) == "string") {
            if (category.selector(_keys)) apis[_keys] = false;
        } else {
            for (let k in _keys) {
                if (category.selector(k)) apis[k] = false;
            }
        }
    }
};
