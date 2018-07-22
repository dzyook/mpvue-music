<template>
  <div class="container">
    <swiper interval="2000" autoplay="true" indicator-active-color="#E3453A" indicator-color="#CABEBE" circular="true" class="swiper-top" indicator-dots="true" >
      <block  v-for="(item,i) in menu" :key="i">
      <swiper-item>
        <div class="one">
        <image  :src="item.picUrl" alt="#"/>
        </div>
      </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
export default {
  data(){
    return{
      
    }
  },
  props:['menu']
}
</script>
<style lang="stylus" scoped>
.container
  position absolute
  padding-top 25rpx 
  width 100%
  height 300rpx
  z-index 2
  .swiper-top
    width 100%
    height 300rpx
    .one 
      width 96%
      padding 0 2% 0 2% 
      height 300rpx
    .one image
      width 100%
      height 300rpx 
      border-radius 10rpx
      -webkit-border-radious 10rpx
</style>
