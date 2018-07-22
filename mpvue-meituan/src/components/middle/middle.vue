<template>
          <scroll-view scroll-y="true" enable-back-to-top="true" class="mid-top">
            <swiper-t :menu="menu"></swiper-t>
            <mid-t :midimg="midimg"></mid-t>
            <foot-t :footimg="footimg" :footname="footname1"></foot-t>
            <foot-t :footimg="footimg2" :footname="footname2"></foot-t>
            <foot-t :footimg="footimg3" :footname="footname3"></foot-t>
          </scroll-view>
</template>

<script>
import swiper from '@/components/swiper/swiper.vue'
import mid from '@/components/mid/mid.vue'
import foot from '@/components/foot/foot.vue'
export default {
    data(){
        return {
            
        }
    },
    components:{
        'swiper-t':swiper,
        'mid-t':mid,
        'foot-t':foot
    },
    props:['menu','midimg','footimg','footimg2','footimg3','footname1','footname2','footname3']
}
</script>

<style lang="stylus">
.mid-top
  padding-top 80rpx 
  width 100%
  height 2740rpx
  z-index 0
  background #E3453A
  position relative
  overflow hidden
</style>
