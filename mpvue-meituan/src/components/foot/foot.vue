<template>
    <div class="foot-top">
        <div class="top">
            <span>{{footname}}</span> ＞
        </div>
        <div url="/pages/order/main" class="middle">
            <a :href="'/pages/songlist/main?id='+item.id+'&playCount='+item.playCount+'&singer='+item.singer+'&vip='+item.vip" class="mid-six" v-for="item of footimg" :key="item.id">
                <div class="six">
                   <image class="six-img" :src="item.picUrl" alt="#"/>
                   <div v-if="item.vip" class="vip">付费精品</div>
                   <div v-if="item.playCount" class="number">
                    <image class="smallimg" src="/static/images/index/erji.png"/>
                    <div class="small-text">{{item.playCount}}万</div>
                   </div> 
                </div>
                <span class="six-text" v-if="item.text">{{item.text}}</span>
                <span class="six-name" v-if="item.name">{{item.name}}</span>
                <span class="six-text small" v-if="item.singer">{{item.singer}}</span>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props:['footimg','footname']
}
</script>

<style lang="stylus" scoped>
.foot-top
 width 100%
 height 795rpx
 position relative
 background #ffffff
 top 550rpx
 .top
  padding-left 16rpx
  padding-top 20rpx  
  height 60rpx
  line-height 60rpx
  font-size 33rpx
  font-weight bold
  padding-bottom 15rpx
 .middle
  width 100%
  height 725rpx
  display flex
  flex-wrap wrap
  overflow hidden
  justify-content center
  background #ffffff
  .mid-six
   padding-top 20rpx
   display flex
   align-items flex-start
   padding-left 7rpx
   padding-right 7rpx
   width 230rpx
   height 325rpx
   flex-direction: column
   .six
    width 230rpx
    height 230rpx
    border-radius 10rpx
    position relative
    .six-img
     width 230rpx
     height 230rpx
     border-radius 10rpx
    .number 
     width 120rpx
     height 30rpx
     font-size 25rpx
     text-align right
     color #ffffff 
     top 5rpx
     bottom 0
     right 10rpx
     position absolute
     display flex
     justify-content flex-end
     .smallimg
      width 30rpx
      height 30rpx
     .smallimg-text 
      width 90rpx
      height 30rpx 
      line-height 30rpx
      align-items center
    .vip
     width 100rpx
     height 30rpx
     position absolute
     top 0
     bottom 0
     left 0
     right 0
     border-top-left-radius 10rpx
     border-bottom-right-radius 10rpx
     opacity 0.8
     font-size 20rpx
     background-color #E3453A
     text-align center
     line-height 30rpx
     color #ffffff 
   .six-text
    margin-top 10rpx
    font-size 25rpx
    overflow: hidden
    text-overflow: ellipsis
    display: -webkit-box
    -webkit-line-clamp: 2
    -webkit-box-orient: vertical
   .six-name
    margin-top 10rpx
    font-size 25rpx
    overflow: hidden
    text-overflow: ellipsis
    display: -webkit-box
    -webkit-line-clamp: 1
    -webkit-box-orient: vertical
   .six-text.small
    color #8D8D8E
    font-size 22rpx
</style>
