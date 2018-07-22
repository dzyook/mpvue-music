import Vue from 'vue'
var Fly = require('flyio/dist/npm/wx.js')
var fly = new Fly();

fly.interceptors.request.use((config,promise)=>{
    config.headers["X-Tag"]="flyio";
    return config;
})

fly.config.baseURL="https://www.easy-mock.com/mock/5b372361808a747e8d04a1e3/"
Vue.prototype.$http=fly
export default fly