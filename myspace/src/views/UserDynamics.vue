<template>
  <ContentBase>
      <div class="row">
        <div class="col-3">
          <UserInfo :user ="user" @fansHandle = "fansHandle" @unfansHandle = "unfansHandle"/>
          <UserSend v-if="is_me" @post_one="post_one"/>
        </div>

        <div class="col-9">
          <UserHistory :user= "user" :posts="posts" @delete_one = "delete_one"/>
        </div>
      </div>
  </ContentBase>
</template>

<script>
import ContentBase from "../components/ContentBase.vue";
import UserInfo from "../components/UserDynamicsComponents/UserInfo.vue";
import UserHistory from "../components/UserDynamicsComponents/UserHistory.vue";
import UserSend from "../components/UserDynamicsComponents/UserSend.vue"
import { reactive } from '@vue/reactivity';
import {useRoute} from "vue-router";
import $ from 'jquery';
import {useStore} from 'vuex';
import {computed} from  'vue';

 


export default {
  name: 'UserDynamics',
  components: {
    ContentBase,
    UserInfo,
    UserHistory,
    UserSend,
  },
  setup() {

    const store = useStore();
    const route = useRoute();
    const userId =parseInt(route.params.userId);
    const user = reactive({});
    const posts = reactive({});

    $.ajax({
      url:"https://app165.acapp.acwing.com.cn/myspace/getinfo/",
      type:"GET",
      data:{
        user_id:userId,
      },
      headers:{
        'Authorization':"Bearer " + store.state.user.access,
      },
      success(resp){
        user.id = resp.id,
        user.username = resp.username;
        user.photo = resp.photo;
        user.followerCount =resp.followerCount;
        user.is_followed = resp.is_followed;

      }
    });

    $.ajax({

      url:"https://app165.acapp.acwing.com.cn/myspace/post/",
      type:"GET",
      data:{
        user_id:userId,
      },
      headers:{
        'Authorization':"Bearer " + store.state.user.access,
      },
      success(resp){
        posts.count = resp.length;
        posts.posts = resp;
      } 

    });

    const fansHandle =()=>{

      if(user.is_followed) return;
      user.is_followed = true;
      user.followerCount++;

    };

    const unfansHandle =()=>{

      if(!user.is_followed) return;
      user.is_followed = false;
      user.followerCount--;

    };

    const post_one=(content)=>{
      posts.count++;
      posts.posts.unshift({
        id:posts.count,
        userId:1,
        content:content, 
      });

    };

    const delete_one =(post_id)=>{
       posts.posts = posts.posts.filter(post=>post.id!=post_id);
       posts.count =posts.posts.length;

    }

    const is_me =computed(()=>userId===store.state.user.id);


    return {
      user,
      fansHandle,
      unfansHandle,
      posts,
      post_one,
      delete_one,
      is_me,
    }

  }
}
</script>

<style scoped>


</style>
