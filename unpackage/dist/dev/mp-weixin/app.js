"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/auth/auth.js";
  "./pages/404/404.js";
  "./pages/search/search.js";
  "./pages/list/list.js";
  "./pages/bookshelf/bookshelf.js";
  "./pages/mine/mine.js";
  "./pages/bookdetails/bookdetails.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  onPageNotFound() {
    common_vendor.index.navigateTo({
      url: "/pages/404/404"
    });
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/fruiticecake/openLocal/uniVue-2/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
