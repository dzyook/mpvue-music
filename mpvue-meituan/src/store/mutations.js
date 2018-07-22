import * as types from './mutation-types'
const mutations = {
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [types.SAVE_DETAIL_STATE] (state, fdimg) {
    state.footimg = fdimg
  },
  [types.SAVE_SONGLIST] (state, list) {
    Object.assign(state.data, list);
  },
  [types.SAVE_MIDIMG2] (state, mid) {
    state.midimg2 = mid
  },
  [types.SAVE_MIDIMG3] (state, mid) {
    state.midimg3 = mid
  },
  [types.SAVE_SONG] (state, song) {
    Object.assign(state.song, song);
  }
}

export default mutations