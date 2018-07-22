<template>
    <div>
        <div style="overflow:hidden;" class="scroll-top">
                <div class="top" >
                <div v-for="(item,i) in top" :key="i" @click="click(i)" :class="[item.id,active==i+1?'active':'']">{{item.name}}</div>
                </div>
        </div>
    </div>
</template>
<script>
export default {
        data(){
               return{} 
        },
        props:['top','active'],
        methods:{
            click(i){
                this.$emit('click',i);
            }
        }
}
</script>
<style lang="stylus" scoped>
.scroll-top 
  width: 100%
  height: 80rpx
  position: fixed
  z-index 10
  left 0
  top 0
  background-color: #E3453A
  box-shadow: 0 2px 4px rgba(0,0,0, .12), 0 0 6px 0 rgba(0,0,0, .04)
  .top
    width: 100%
    height: 80rpx
    display: flex
    align-items: center
    .left,.content,.right
      position: relative
      line-height: 80rpx
      text-align: center
      height:80rpx
      width:33.3333%
      color: #DBD3D3
      font-family: '微软雅黑','宋体',Arial, Helvetica, sans-serif
      font-size: 30rpx
    .left.active,.content.active,.right.active 
      color: #ffffff
      font-size:35rpx
    .left.active::after,.content.active::after,.right.active::after
      content: "" 
      display: block 
      position: absolute  
      bottom: 0  
      left: 37.5%  
      right: 0
      width: 25%  
      height:2rpx  
      background: #ffffff
      text-align: center
      align-items: center  
</style>
