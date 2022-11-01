"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_search_bar2 + _easycom_uni_icons2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_icons + bookdetails)();
}
const bookdetails = () => "../bookdetails/bookdetails2.js";
const _sfc_main = {
  __name: "bookshelf",
  setup(__props) {
    const localBooks = [
      {
        name: "\u767E\u5E74\u5B64\u72EC",
        bookId: "7550",
        img: "http://www.dubuxiaoshuo.com/uploads/cover/7550s.jpg",
        path: "./\u767E\u5E74\u5B64\u72EC/\u7B2C\u516B\u7AE0.txt",
        pageNow: 112,
        pageNum: 223,
        pageNew: "\u5E03\u6069\u8FEA\u4E9A\u5BB6\u65CF\u4EBA\u7269\u8868"
      },
      {
        name: "\u767E\u5E74\u5B64\u72EC",
        img: "http://www.dubuxiaoshuo.com/uploads/cover/7550s.jpg",
        bookId: "7550",
        path: "",
        pageNow: 112,
        pageNum: 223,
        pageNew: "\u7B2C\u4E8C\u7AE0"
      },
      {
        name: "\u767E\u5E74\u5B64\u72EC",
        img: "http://www.dubuxiaoshuo.com/uploads/cover/7550s.jpg",
        bookId: "7550",
        path: "",
        pageNow: 112,
        pageNum: 223,
        pageNew: "\u5E03\u6069\u8FEA\u4E9A\u5BB6\u65CF\u4EBA\u7269\u8868"
      },
      {
        name: "\u767E\u5E74\u5B64\u72EC",
        img: "http://www.dubuxiaoshuo.com/uploads/cover/7550s.jpg",
        bookId: "7550",
        path: "",
        pageNow: 112,
        pageNum: 223,
        pageNew: "\u7B2C\u4E8C\u5341\u7AE0"
      }
    ];
    let bookContents = common_vendor.reactive({ value: "1" });
    function clickText() {
      this.bookContents.value = bookContents.value;
    }
    function openBook(path) {
      wx.chooseMessageFile({
        type: "file",
        success(res) {
          const tempFilePaths = res.tempFiles[0].path;
          const fs = wx.getFileSystemManager();
          console.log(tempFilePaths);
          fs.readFile({
            filePath: `${tempFilePaths}`,
            encoding: "utf-8",
            success(res2) {
              const data = res2.data;
              bookContents = data;
              common_vendor.index.navigateTo({
                url: "../bookdetails/bookdetails?item=" + encodeURIComponent(JSON.stringify(data))
              });
              console.log(bookContents);
            },
            fail(err) {
              console.log(err);
            }
          });
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          radius: 20,
          clearButton: "auto",
          cancelButton: "none"
        }),
        b: common_vendor.f(localBooks, (localBook, k0, i0) => {
          return {
            a: common_vendor.t(localBook.name),
            b: common_vendor.t(localBook.pageNow),
            c: common_vendor.t(localBook.pageNow),
            d: common_vendor.t(localBook.pageNum),
            e: common_vendor.t(localBook.pageNew),
            f: "23e198fa-1-" + i0,
            g: localBook.bookId,
            h: common_vendor.o(openBook, localBook.bookId)
          };
        }),
        c: common_vendor.p({
          type: "more-filled",
          color: "#8f939c"
        }),
        d: common_vendor.t(common_vendor.unref(bookContents).value),
        e: common_vendor.o(clickText),
        f: common_vendor.t(common_vendor.unref(bookContents).value),
        g: common_vendor.p({
          contents: common_vendor.unref(bookContents)
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/fruiticecake/openLocal/uniVue-2/pages/bookshelf/bookshelf.vue"]]);
wx.createPage(MiniProgramPage);
