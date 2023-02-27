<template>

    <div class="card">
      <div class="card-body">

        <div class="row">
          <div class="col-3 img-field">
            <img class="img-fluid" :src="user.photo" alt="头像">
          </div>
          <div class="col-9">
              <div class="name">{{user.username}}</div>
              <div class="fans"> 粉丝数 : {{user.followerCount}}</div>
              <button @click="fansHandle" id="b1" v-if="!user.is_followed" type="button"  class="btn btn-success btn-lg">  +关注</button>
              <button @click="unfansHandle" id="b2" v-if="user.is_followed" type="button"  class="btn btn-outline-secondary btn-sm">  取消关注</button>
          </div>
        </div>

      </div>
    </div>

</template>

<script>
import $ from 'jquery';
import {useStore} from 'vuex';

export default {
   name:"UserInfo",

   props:{
    user:{
      type:Object,
      required:true,

    },
   },

   setup(props,context){

      const store = useStore();
      const fansHandle =()=>{
      $.ajax({
        url:"https://app165.acapp.acwing.com.cn/myspace/follow/",
        type:"POST",
        data:{
          target_id : props.user.id,
        },
        headers:{
        'Authorization':"Bearer " + store.state.user.access,
        },
        success(resp){
            if(resp.result==="success"){
            context.emit('fansHandle');
          }
        },
      });
    }

    const unfansHandle =()=>{
      $.ajax({
        url:"https://app165.acapp.acwing.com.cn/myspace/follow/",
        type:"POST",
        data:{
          target_id : props.user.id,
        },
        headers:{
        'Authorization':"Bearer " + store.state.user.access,
        },
        success(resp){
          if(resp.result==="success"){
             context.emit('unfansHandle');
          }
        },
      });
    }

    return {
      fansHandle,
      unfansHandle,
    }
   }
}
</script>

<style scoped>


img{
  border-radius: 50%;
}

.img-field{
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 5px;
}
.name{
  font-weight: bolder;

}
.fans{
    margin-top: 2px;
  font-size: 14px;
  color: gray;
}
#b1{
  margin-top: 8px;
  padding: 4px 18px;
  font-size: 12px;
}
#b2{
  margin-top: 8px;
  padding: 4px 10px;
  font-size: 12px;
}
.card{
  background-color: lavenderblush;
}
</style>