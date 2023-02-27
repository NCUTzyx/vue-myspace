import { createStore } from 'vuex'
import ModuleUser from './user';

export default createStore({
  //存储数据
  state: {
  },
  //获取要求计算的数据
  getters: {

  },
  //对数据修改 =>不支持异步
  mutations: {

  },
  //对state的更新方式
  actions: {

  },
  //分割state
  modules: {
    user:ModuleUser,
  }
});
