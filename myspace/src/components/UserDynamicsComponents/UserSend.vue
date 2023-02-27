<template>
    <div class="card up-datil">
      <div class="card-body">
          <div class="mb-3">
            <label for="publication" class="form-label">你想说什么 :</label>
            <textarea  v-model="content" class="form-control" id="publication" rows="3"></textarea>
            <div class="d-grid gap-6 col-12 mx-auto">
              <button @click="post_one" type="button" class="btn btn-outline-primary">发表</button>
            
            </div>
          </div>
      </div>
    </div> 
</template>

<script>
import {ref} from "vue";
import $ from 'jquery';
import {useStore} from 'vuex';

export default {
    name:"UserSend",

    setup(props,context){
      const store = useStore();
    let content = ref('');

      const post_one=()=>{

        $.ajax({

          url:"https://app165.acapp.acwing.com.cn/myspace/post/",
          type:"POST",
          data:{
            content:content.value,
          },
          headers:{
             'Authorization':"Bearer " + store.state.user.access,
          },
          success(resp){
            if(resp.result==='success'){
              context.emit("post_one",content.value);
              content.value ="";
            }
          }
        });
      }

      return {
        content,
        post_one,
      }
    }
}
</script>

<style scoped>

.up-datil{
  margin-top: 20px;
}

.d-grid{
  margin-top: 20px;
}
.card{
  background-color: lightyellow;
}
</style>
