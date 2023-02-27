<template>
  <ContentBase>
      <div class="card" v-for="user in users" :key="user.id" @click="openInfo(user.id)">
        <div class="card-body">
            <div class="row">
              <div class="col-1">
                  <img class="img-fluid" :src="user.photo" alt="头像">
              </div>
              <div class="col-11">
                  <div class="username">{{ user.username}}</div>
                  <div class="fansnumber">{{user.followerCount}}</div>
              </div>
            </div>
        </div>
      </div>
  </ContentBase>
</template>

<script>

import ContentBase from "../components/ContentBase.vue"
import $ from  "jquery";
import { ref } from "vue";
import router from '@/router/index';
import {useStore } from 'vuex';
 

export default {
  name: 'FriendsList',
  components: {
    ContentBase,
  },
  setup() {
    const store = useStore();
    let users = ref([]);

    $.ajax({
      url:'https://app165.acapp.acwing.com.cn/myspace/userlist/',
      type:"get",
      success(resp){
        users.value = resp;
      }
    });

    const openInfo =(userId)=>{
      if(store.state.user.is_login){
        router.push({
          name:"UserDynamics",
          params:{
            userId:userId,
          }
        })
      }
      else{
        router.push({
          name:"LoginView",
        })
      }
    }


    return {
      users,
      openInfo,
    };
  }

}
</script>

<style scoped>

.img-fluid{
  border-radius: 50%;
}

.username{
  font-weight: bolder;
  font-size: 24px;
  height: 50%;
}
.fansnumber{
  font-size: 16px;
  color: grey;
  height: 50%;
}

.card{
  margin-bottom: 20px;
  cursor: pointer;
}
.card:hover{
  box-shadow: 3px 3px 20px lightgray;
  transition: 500ms;
}
</style>
