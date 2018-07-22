<template>
    <div class="box-song" :style="{height:height+'px'}">
        <div class="onepage">
            <div class="background">
                <div class="filter"></div>
                <img :src="song.picUrl" style="width:100%;height:100%;font-size:100%">
            </div>
            <div class="header">{{song.singername}}</div>
            <circle-t :midimg3="midimg3" :img="song.picUrl" :playing="playing" :midshow="midshow" @click="changeshow"></circle-t>
            <div class="middleR" v-show="!midshow" @click="changeshow">
        <scroll-view class="lyric-wrapper" :scroll-into-view="'line'+toLineNum" scroll-y scroll-with-animation>
            <view v-if="currentLyric">
              <view  :id="'line'+i" class="text" :class="[currentLineNum == i ? 'current': '' ]" v-for="(item,i) of currentLyric.lines" :key="i">
                {{item.txt}}
              </view>
            </view>
            <view v-if="!currentLyric">
              <view class="text current">暂无歌词</view>
            </view>
          </scroll-view>
    </div>
        <div class="bigfoot">
            <div class="bigtiao">
                <p class="notime">{{notime}}</p>
                <div class="tiao" ref="tiaobar" @click="clClick">
                    <div class="tiaotop" :style="width"></div>
                    <div class="cl" :style="midwidth" @touchstart="clstart" @touchmove="clmove" @touchend="clend">
                        <div class="cl-mid" ></div>
                    </div>
                </div>
                <p class="alltime">{{alltime}}</p>
                </div>
                <div class="foot">
                <div class="one">
                    <img class="left" :src="wayimg" @click="playway">
                </div>
                <div class="two">
                    <img class="left2" @click="prev" src="/static/images/index/left.png">
                </div>
                <div class="three">
                    <img class="midd" :src="middimg" @click="playsong">
                </div>
                <div class="four">
                    <img class="right2" @click="next" src="/static/images/index/right.png">
                </div>
                <div class="five">
                    <img class="right" src="/static/images/index/list.png">
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import fly from '@/utils/flyio';
import circle from '@/components/circle/circle';
import Lyric from 'lyric-parser'
import {mapGetters, mapMutations, mapActions} from 'vuex'
export default {
    data(){
        return {
            audioCtx:null,
            currentLyric: null,
            currentLineNum: 0,
            toLineNum: -1,
            isfirst: false,
            allmiao: 1,
            state: 1,
            midshow: true,
            lyricArr: [],
            height: 0,
            nowmiao: 0,
            offsetWidth: 0,
            touch: {
                time: 0,
                initiated: true,
                startX: 0,
                setWidth: 0
            }
        }
    },
    computed:{
        ...mapGetters([
            'playing',
            'midimg3',
            'footimg',
            'song',
            'data'
        ]),
        width () {
            return 'width:'+(this.nowmiao/this.allmiao)*550+'rpx'
        },
        midwidth () {
            return 'transform:translate3d('+(this.nowmiao/this.allmiao)*529+'rpx,0px,0px);'
        },
        notime () {
            return this.formact(this.nowmiao)
        },
        alltime () {
            return this.formact(this.allmiao)
        },       
        wayimg () {
            if(this.state == 1) return '/static/images/index/one.png'
            if(this.state == 2) return '/static/images/index/liebiao.png'
            if(this.state == 0) return '/static/images/index/suiji.png'
        },
        middimg () {
            if(this.playing) return '/static/images/index/down.png'
            else if(!this.playing) return '/static/images/index/play2.png'
        },
    },
    components:{
        'circle-t':circle
    },
    methods:{
        ...mapMutations({
            setPlayingState: 'SET_PLAYING_STATE',
            saveSong:'SAVE_SONG',
        }),
        prev () {
             let list = this.data.songlist
            let num = this.song.num
            wx.showLoading({
                title: '加载中'
            })
            for(let i =0; i<list.length; i++){
                 if(num === list[i].num) {
                     if(i-1 < 0) this.saveSong(list[list.length-1])
                     else this.saveSong(list[i-1])
                    }
                    const afterlyric = this.normalizeLyric(this.song.lyric)
                    this.currentLyric = new Lyric(afterlyric)
                    this.midshow = true
                    this.audioCtx.pause()
                        wx.setNavigationBarTitle({
                    // 设置当前标题
                    title: decodeURIComponent(this.song.name)
                    });
                    this.audioCtx.src = this.song.mp3url
                    const a = setInterval(()=>{   
                    this.allmiao = this.audioCtx.duration
                    },50)
                    if(this.allmiao){
                        clearInterval('a')
                        setTimeout(() => {
                         wx.hideLoading()
                    },2500)
                    }
                    
                }
            
        },
        next () {
            let list = this.data.songlist
            let num = this.song.num
            wx.showLoading({
                title: '加载中'
            })
            for(let i =0; i<list.length; i++){
                 if(num === list[i].num) {
                     if(i+1 == list.length) this.saveSong(list[0])
                     else this.saveSong(list[i+1])
                     this.midshow = true
                }
                    this.audioCtx.pause()
                    const afterlyric = this.normalizeLyric(this.song.lyric)
                    this.currentLyric = new Lyric(afterlyric)
                    this.audioCtx.src = this.song.mp3url
                    wx.setNavigationBarTitle({
                    title: decodeURIComponent(this.song.name)
                    });     
                     const a = setInterval(()=>{   
                        this.allmiao = this.audioCtx.duration
                        },50)
                        if(this.allmiao){
                         clearInterval('a')
                        setTimeout(() => {
                         wx.hideLoading()
                        },2500)
                        } 
                     }   
        },
        formact (current) {
            let interval = current | 0
            let minute = interval / 60 | 0
            let num = interval % 60
            let len = num.toString().length
            while (len < 2) {
                num = '0' + num
                len++
            }
            return minute + ':' + num
        },
        handleLyric (currentTime) {
            let lines = [{time: 0, txt: ''}], lyric = this.currentLyric, lineNum
            lines = lines.concat(lyric.lines)
            for (let i = 0; i < lines.length; i++) {
                if (i < lines.length - 1) {
                    let time1 = lines[i].time, time2 = lines[i + 1].time
                if (currentTime > time1 && currentTime < time2) {
                    lineNum = i - 1
                    break;
                    }
                } else {
                lineNum = lines.length - 2
                }
            }
            this.currentLineNum = lineNum,
            this.currentText = lines[lineNum + 1] && lines[lineNum + 1].txt
            let toLineNum = lineNum - 5
            if (lineNum > 5 && toLineNum != this.toLineNum) {
                this.toLineNum = toLineNum
            }
        },
        changeshow () {
            if(this.midshow) this.midshow = false
            else this.midshow = true 
        },
        playway () {
            this.state = (this.state+1)%3
        },
        playsong () {
            if(this.playing) {
                this.audioCtx.pause();
                this.setPlayingState(!this.playing)}
            else if(!this.playing) {
                this.audioCtx.play();
                this.setPlayingState(!this.playing);
            }
        },
        clClick (e) {
            const rect = wx.getSystemInfoSync().windowWidth
            this.offsetWidth = e.pageX - (rect-275)/2
            this.nowmiao = this.allmiao*(this.offsetWidth/275)
            const miao = Math.floor(this.nowmiao)
            this.audioCtx.seek(miao)
        },
        clstart (e) {
            this.touch.initiated = true
            const rect = wx.getSystemInfoSync().windowWidth
            this.touch.setWidth = (rect-275)/2
            this.touch.startX = e.touches[0].pageX 
            this.touch.time = this.nowmiao
        },
        clmove (e) {
            if(!this.touch.initiated) return;
            const movex = e.touches[0].pageX - this.touch.startX
            if(e.touches[0].pageX>=(this.touch.setWidth+275)) {this.nowmiao =this.allmiao }
            else if(e.touches[0].pageX<=this.touch.setWidth) {this.nowmiao = 0;}
            else {this.nowmiao = this.touch.time+this.allmiao*movex/275}
        },
        clend (e) {
            this.touch.initiated = false
            const miao = Math.floor(this.nowmiao)
            this.audioCtx.seek(miao)
        },
        normalizeLyric: function (lyric) {
            return lyric.replace(/&#58;/g, ':').replace(/&#10;/g, '\n').replace(/&#46;/g, '.').replace(/&#32;/g, ' ').replace(/&#45;/g, '-').replace(/&#40;/g, '(').replace(/&#41;/g, ')')
        },
        getSong (songid,id) {
            let re = this.footimg
          for (var i = 0; i < re.length; i++) {
            if (id == re[i].id) {
                for(var j=0;j<re[i].songlist.length;j++) {
                    if(songid == re[i].songlist[j].id){
                        this.saveSong(re[i].songlist[j]);
                        break}}
                break
            }
          }
        }
    },

    mounted(){
        wx.showLoading({
            title: '加载中'
        })
        this.midshow = true
        let options = this.$root.$mp.query;
        const songid = options.songid;
        const id = options.id;
        if(this.audioCtx != null) { //第一次不用销毁
            if(this.song.id != songid){
                this.audioCtx.destroy()}
        }
        if(this.song.id != songid || this.song.id == '') //同一首歌不用新建
        {   this.audioCtx = wx.createInnerAudioContext()
            }
        if(options.name == 'undefined' && this.song.id != songid){ // 同一首歌不用重新更新数据
        this.getSong(songid,id)
        const afterlyric = this.normalizeLyric(this.song.lyric)
        this.currentLyric = new Lyric(afterlyric)
        wx.setNavigationBarTitle({
        // 设置当前标题
        title: decodeURIComponent(this.song.name)
        });
          this.audioCtx.src = this.song.mp3url
          this.audioCtx.onCanplay(()=>{
              console.log('ok了')
              this.setPlayingState(true)
              this.audioCtx.play()
          })
             
            
            const a = setInterval(()=>{   
            this.allmiao = this.audioCtx.duration
            },50)
            if(this.allmiao){
            clearInterval('a')
            }
            this.audioCtx.onTimeUpdate(()=>{
                wx.hideLoading()
            this.nowmiao = this.audioCtx.currentTime
            if (this.currentLyric) {
            this.handleLyric(this.nowmiao * 1000)
            this.audioCtx.onWaiting(()=>{
            wx.showLoading({
                    title: '加载中'
                })
            })
        }
        })
        }
        wx.hideLoading()
       this.height = wx.getSystemInfoSync().windowHeight
       
    },
}
</script>
<style lang="stylus">
.box-song
    width 100%
    padding 0
    border 0

.onepage
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    z-index 10
    background #f2f3f4
        
.background
    position absolute
    left -50%
    top -50%
    width 300%
    height 300%
    z-index -1
    opacity 0.6
    filter blur(30px)
    -webkit-filter blur(30px)

.filter
    position absolute
    width 100%
    height 100%
    background black 
    opacity .6

.header
    position relative
    width 100%
    height 50rpx
    font-size 30rpx
    color #f1f1f1
    text-align center
    line-height 50rpx

.bigfoot
    position fixed
    width 100%
    height 230rpx
    bottom 50rpx

.bigtiao
    width 100%
    height 50rpx
    display flex
    align-items center
    justify-content center
    font-size 23rpx
    font-weight 300
    color #fff
.notime
    margin-right 15rpx
.alltime
    margin-left 15rpx
.tiao
    border-radius 25rpx
    width 275px
    height 8rpx
    background #ADAAA8
    position relative
    font-size 0
    .tiaotop
        height 8rpx
        background #d44439
        border-radius 25rpx
    .cl
        position absolute
        top -9rpx
        bottom 0
        left 0
        right 0
        height 35rpx
        width 35rpx
        .cl-mid
           top 17rpx
           left 10rpx
           box-sizing border-box
           width 30rpx
           height 30rpx
           border-radius 50%
           background #d44439
           border 5px solid #f1f1f1 
           z-index 10

.foot
    margin-top 30rpx
    width 100%
    height 150rpx
    display flex
    justify-content space-around
    align-items center

.two,.four,.left2,.right2
        width 80rpx
        height 80rpx

.one,.left
        width 60rpx
        height 60rpx

.five,.right
        width 50rpx
        height 50rpx

.three,.midd
        width 90rpx
        height 90rpx


    .middleR
        width 100%
        height 70%
        overflow hidden
        .lyric-wrapper
            width 80%
            margin 0 auto
            overflow hidden
            text-align center
            height 100%
            .text
                line-height 32px
                color rgba(255,255,255,.5)
                font-size 14px
            .current 
                color #ffcd32

</style>
