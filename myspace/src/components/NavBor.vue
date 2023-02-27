<template>

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" :to ="{name:'HomeView'}">我的空间</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" :to ="{name:'HomeView'}">主页</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to ="{name:'FriendsList'}">好友列表</router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link class="nav-link" :to ="{name:'UserDynamics',params:{userId:2} }">用户动态</router-link>
          </li> -->
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0" v-if="!$store.state.user.is_login">
          <li class="nav-item">
            <router-link class="nav-link active" :to ="{name:'LoginView'}">登录</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to ="{name:'EnrollView'}">注册</router-link>
          </li>
        </ul>

        <ul class="navbar-nav mb-2 mb-lg-0" v-else>
          <li class="nav-item">
            <router-link class="nav-link active" :to ="{name:'UserDynamics',params:{userId:$store.state.user.id} }">{{$store.state.user.username}}</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" style="cursor: pointer;" @click="logout">退出</a>
          </li>
        </ul>

      </div>
    </div>
  </nav>

</template>

<script>

import {useStore} from 'vuex';

export default {
    name: "NavBor",
    setup(){
      const store =useStore();
      const logout =()=>{
        store.commit('logout');
      };
      
    return {
      logout,
    }      
    }

}
</script>



<style scoped>

</style>