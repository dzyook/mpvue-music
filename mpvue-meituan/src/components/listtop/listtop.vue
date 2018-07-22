<template>
    <div class="bigbox">
        <div class="bigbox-baimg">
            <div class="filter"></div>
            <img class="filimg" :src="data.picUrl" style="width:100%;height:100%">
        </div>
        <div class="bigbox-content">
            <div class="leftbox">
            <image :src="data.picUrl" class="leftimg"/>
            <div v-if="data.playCount !='undefined'"  class="number">
                <image class="smallimg" src="/static/images/index/erji.png"/>
                <div class="small-text">{{data.playCount}}万</div>
            </div> 
        </div>
        <div class="rightbox">
            <div class="texttop">{{data.playCount!='undefined'?data.text:data.name}}</div>
            <div class="textbot">
                <image class="botimg" style="width:55rpx;height:55rpx;border-radius:50%" :src="data.userimg"/>
                <span class="bottxt">{{data.username}}</span>
            </div>
        </div>
        <mid-t :midimg="midimg2" :sty="isstyle2"></mid-t>
        </div>
        
    </div>
</template>

<script>
import mid from '@/components/mid/mid.vue'
export default {
    data(){
        return {
            c:{background:'url('+this.data.picUrl+')'},
            isstyle2:true
        }
    },
    computed:{

    },
    components:{
        'mid-t':mid
    },
props:['data','midimg2']
}
</script>

<style lang="stylus" scoped>
.bigbox
 width 100%
 height 535rpx
 .bigbox-baimg
  width 200%
  height 100%
  opacity .6
  position absolute
  z-index -3
  left -50%
  top -50%
  .filter
   position absolute
   width 100%
   height 100%
   background black 
   opacity .6
  .filimg
   margin 0
   padding 0
   border 0
 .bigbox-content
  position relative
  display flex  
  .leftbox
   margin-top 90rpx
   margin-left 50rpx 
   width 260rpx
   height 260rpx
   border-radius 10rpx
   position relative
   .leftimg
    width 260rpx
    height 260rpx
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
  .rightbox
   margin-top 90rpx
   margin-left 50rpx
   width 350rpx
   height 260rpx 
   .texttop
    font-size 35rpx
    font-weight 600
    color #ffffff
    text-overflow: ellipsis
    display: -webkit-box
    -webkit-line-clamp: 2
    -webkit-box-orient: vertical
   .textbot
    margin-top 60rpx
    font-weight 300
    font-size 25rpx
    color #CCCACC
    display flex
    align-items center
    .bottxt
     margin-left 20rpx
     text-align left 
  .mid
   height 200rpx    
   
</style>
