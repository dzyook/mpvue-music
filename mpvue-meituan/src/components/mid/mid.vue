<template>
    <div class="mid" :class="{sty:sty}">
        <div class="mid-line" :class="{sty:sty}">
            <div class="line" :class="{sty:sty}" v-for="(item,index) of midimg" :key="index">
                <div class="one" :class="{sty:sty}">
                    <image class="img" :src="item.url" alt="#"/>
                </div>
                <span v-if="item.text">{{item.text}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
        }
    },
    props:['midimg','sty']
}
</script>

<style lang="stylus" >
.mid
  width 100%
  height 300rpx
  background-color  #fff
  position absolute
  top 250rpx
  z-index 0
  border-bottom  0.5rpx solid #EEE8E8
  box-sizing border-box
  border-bottom  1px solid #E2E3E4
  overflow hidden
  .mid-line
   width 100%
   height 200rpx
   padding-top 80rpx
   font-size 25rpx
   font-family '微软雅黑','宋体',Arial, Helvetica, sans-serif;
   display flex
   text-align center
   align-items center
   justify-content center
   .line
    margin-left 40rpx
    margin-right 40rpx 
    .one
     width 100rpx
     height 100rpx
     background #E3453A
     border-radius 50%
     margin-bottom 15rpx
     display flex
     align-items center
     justify-content center
     .img
      width 50rpx
      height 50rpx   
.mid.sty
  background-color:transparent
  height 180rpx
  top 350rpx
  border-bottom 0
  .mid-line.sty
   padding-top 0
   height 150rpx
   color #CCCACC
   .line.sty
    margin-left 60rpx
    margin-right 60rpx
    .one.sty
     width 60rpx
     height 60rpx 
     background-color:transparent
</style>
