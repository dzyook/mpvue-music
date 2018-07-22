import Vue from 'vue'
import App from './App'
import store from './store/index'

Vue.prototype.$store=store;
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

Vue.prototype.getList = function() {
  wx.showLoading({
      title:'加载中',
  })
  this.$http.get('music#!method=get').then((res)=>{
      this.menu=res.data.data.menu
      this.footimg=res.data.data.footimg
      this.footimg1=res.data.data.footimg1
      this.footimg2=res.data.data.footimg2
      this.footimg3=res.data.data.footimg3
      wx.hideLoading();
  }).catch((e)=>{
    console.log(e)
  })
}

export default {
  // 这个字段走 app.json
  
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [ '^pages/index/main','pages/songlist/main','pages/my/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#E3453A',
      navigationBarTitleText: '网易云音乐',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      "borderStyle": "dark",
      "position": "bottom",
      "color":"#DBD3D3",
      "selectedColor":"#fff",
      "backgroundColor":"#E3453A",
      "list": [
        {
          "pagePath": "pages/index/main",
          "text":"乐库",
          "iconPath": "/static/images/le1.png",
          "selectedIconPath": "/static/images/le.png"
        },
        {
          "pagePath": "pages/index/main",
          "text":"我的",
          "iconPath": "/static/images/music1.png",
          "selectedIconPath": "/static/images/music.png"
        },
        {
          "pagePath": "pages/index/main",
          "text":"乐频",
          "iconPath": "/static/images/video1.png",
          "selectedIconPath": "/static/images/video.png"
        },
      ]
    },
  }
}
