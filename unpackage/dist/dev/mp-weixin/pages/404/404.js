"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  onLoad() {
    let timer = setTimeout(() => {
      clearTimeout(timer);
      common_vendor.index.navigateTo({
        url: "/pages/index/index"
      });
    }, 2e3);
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/fruiticecake/openLocal/uniVue-2/pages/404/404.vue"]]);
wx.createPage(MiniProgramPage);
