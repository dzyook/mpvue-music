<template>
<div>
  <!-- <swiper-t :menu="menu"></swiper-t> -->
  <scroll-t :top="top" :active="active" @click="click"></scroll-t>
  <middle-t @click="clickmid" :menu="menu" :midimg="midimg" :footimg="footimg" :footimg2="footimg2" :footimg3="footimg3" :footname1="'推荐歌单'" :footname2="'最新音乐'" :footname3="'主播电台'"></middle-t>
</div>
</template>

<script>
import middle from "@/components/middle/middle.vue";
import scroll from "@/components/scroll/scroll.vue";
import fly from '@/utils/flyio';
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
  data() {
    return {
      menu: [],
      midimg: [],
      footimg2: [],
      footimg3: [],
      top: [
        {
          id: "left",
          name: "推荐"
        },
        {
          id: "content",
          name: "朋友"
        },
        {
          id: "right",
          name: "电台"
        }
      ],
      active: 1
    };
  },
  computed: {
    ...mapGetters([
        'footimg',
      ]),
  },

  components: {
    "middle-t": middle,
    "scroll-t": scroll
  },

  methods: {
    ...mapMutations({
      saveDetailState: 'SAVE_DETAIL_STATE',
      saveMidimg2: 'SAVE_MIDIMG2',
      saveMidimg3: 'SAVE_MIDIMG3'
    }),
    click(i){
      this.active = i+1
    },
    getList () {
       fly
      .get('music#!method=get')
      .then(res => {
          this.menu = res.data.data.menu;
          this.midimg = res.data.data.midimg;
          this.saveMidimg2(res.data.data.midimg2);
          this.saveDetailState(res.data.data.footimg);
          this.saveMidimg3(res.data.data.midimg3);
          this.footimg2 = res.data.data.footimg2;
          this.footimg3 = res.data.data.footimg3;
      })
      .catch(e => {
        console.log(e);
      })
    },
  },

  created() {
    // 调用应用实例的方法获取全局数据
   this.getList()
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
</style>
