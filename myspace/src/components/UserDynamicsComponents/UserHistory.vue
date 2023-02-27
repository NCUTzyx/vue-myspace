<template>
  <div class="card">
    <div class="card-body">
      <div v-for = "post in posts.posts" :key="post.id">
        <div class="card single-post">
          <div class="card-body">
          {{post.content}}
          <button v-if="is_me" @click="delete_one(post.id)" type="button" class="btn btn-outline-danger">删除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {computed} from 'vue';
import {useStore} from 'vuex';
import $ from 'jquery';



export default {
    name:"UserHistory",


    props:{
      posts:{
        type:Object,
        required:true,
      },

      user:{
        type:Object,
        required:true,
      }
    },
    setup(props,context){
      const store = useStore();
      let is_me = computed(()=>store.state.user.id === props.user.id);

      const delete_one = post_id =>{
        $.ajax({
          url:"https://app165.acapp.acwing.com.cn/myspace/post/",
          type:"DELETE",
          data:{
            post_id,
          },
          headers:{
             'Authorization':"Bearer " + store.state.user.access,
          },
          success(resp){
            if(resp.result==='success'){
              context.emit('delete_one',post_id);
            }
          }
        });
      }

      return{
         is_me,
         delete_one,
      }
    }

}
</script>

<style scoped>

.single-post{
  margin-bottom: 10px;
  background-color:linen;
}

button{
  float: right;
}


</style>