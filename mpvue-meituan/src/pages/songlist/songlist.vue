<template>
      <scroll-view scroll-y="true" enable-back-to-top="true" class="top">
        <list-top :data="data" :midimg2="midimg2"></list-top>
        <div class="middle">
          <div class="middle-top">
            <img class="play" src="/static/images/index/play.png" style="width:45rpx;height:45rpx"/>
            <span class="txt1">播放全部</span>
            <span class="txt2">(共{{data.songlist.length}}首)</span>
            <div class="middle-top-right">
              <span><span class="add">+</span> 收藏</span>
            </div>
          </div>
          <a :href="'/pages/my/main?id='+data.id+'&songid='+list.id+'&name='+data.name" v-for="list of data.songlist" :key="list.id" class="middle-mid">
            <div class="middle-num">{{list.num}}</div>
            <div class="middle-right">
              <div class="middle-name">
                <span class="middle-listname">{{list.name}}</span>
                <span class="middle-singname">{{list.singername}}</span>
              </div>
              <img class="middle-more" src="/static/images/index/more.png">
            </div>
          </a>
        </div>
      </scroll-view>
</template>

<script>
import fly from '@/utils/flyio';
import listtop from '@/components/listtop/listtop'
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
  data() {
    return {
    };
  },
  computed: {
     ...mapGetters([
        'footimg',
        'data',
        'midimg2'
      ]),
  },
  components:{
    'list-top':listtop
  },
  methods: {
    ...mapMutations({
      saveSonglist:'SAVE_SONGLIST'
    })
  },
  mounted() {
    let options = this.$root.$mp.query;
    wx.showLoading({
            title: '加载中'
        })
    this.saveSonglist(options)
    if (this.data.playCount != 'undefined') {
          for (var i = 0; i < this.footimg.length; i++) {
            if (this.data.id == this.footimg[i].id) {
              this.saveSonglist(this.footimg[i]);
              break
            }
          }
        wx.hideLoading()
    }else if(this.data.singer != 'undefined'){
        fly
        .get("music#!method=get")
        .then(res => {
          let re = res.data.data.footimg2;
          for (var i = 0; i < re.length; i++) {
            if (this.data.id == re[i].id) {
              Object.assign(this.data, re[i]);
              break
            }
          }
        })
        .catch(e => {
          console.log(e);
        });  
    }
  },
  onShow() {
    wx.setNavigationBarTitle({
      // 设置当前标题
      title: decodeURIComponent("歌单")
    });
  }
};

</script>

<style lang="stylus">
::-webkit-scrollbar 
  width: 0
  height: 0
  color: transparent
*
  margin 0
  border 0
.top
  width 100%
  height 1480rpx
  z-index 0
  position relative
  overflow hidden
  box-sizing border-box
  .middle
    position absolute
    width 100%
    top 500rpx
    z-index 2
    background-color #fff 
    border-top-left-radius 25rpx
    border-top-right-radius 25rpx
    .middle-top
      display flex
      width 100%
      height 80rpx
      align-items center
      border-bottom 1px solid #E2E3E4
      .play
        margin-left 3%
        margin-right 3%
      .txt1
        font-weight 500
        font-size 35rpx
      .txt2
        color #979798
        font-weight 300
        font-size 30rpx
      .middle-top-right
        width 30%
        height 80rpx
        margin-left: auto
        background #E3453A
        color #ffffff
        text-align center
        align-items center
        display flex
        border-top-right-radius 25rpx
        justify-content space-around;
        font-size 35rpx
        font-weight 300
        .add
          font-size 40rpx
    .middle-mid
      display flex
      width 100%
      height 100rpx
      align-items center
      font-size 30rpx
      font-weight 300
      .middle-num  
        width 6%
        height 100rpx
        display flex
        align-items center
        margin-left 3%
        margin-right 3%
        justify-content: center
        color #979798
      .middle-right
        width 88%
        height 100rpx
        border-bottom 1px solid #E2E3E4
        display flex
        align-items center 
        .middle-name
          margin-top 10rpx
          height 80rpx
          width 400rpx
          display flex
          font-size 35rpx
          flex-direction column
          .middle-listname
            padding-top 0 rpx
          .middle-singname
            font-size 28rpx
            color #979798
        .middle-more
          margin-left: auto
          margin-right 30rpx
          width 50rpx
          height 50rpx
</style>
