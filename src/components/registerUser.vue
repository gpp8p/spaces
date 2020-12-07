<template>
  <span class="newUserWrapper">
     <span class="labelPlusInput">
         <span>
            Name:
         </span>
         <span>
            <input v-model="userName" ref="name" size="40" class="inputStyle" placeholder="Name" />
         </span>
     </span>
    <span class="labelPlusInput">
         <span>
            Email:
         </span>
         <span>
            <input type="text" v-model="userEmail"  size="60" class="inputStyle" placeholder="email"/>
         </span>
     </span>
     <span class="labelPlusInput">
         <span>
            Password:
         </span>
         <span>
            <input type="password" v-model="userPassword"  size="40" class="inputStyle" />
         </span>
     </span>
     <span class="labelPlusInput">
         <span>
            Password:
         </span>
         <span>
            <input type="password" v-model="userPasswordRepeat"  size="40" class="inputStyle" />
         </span>
     </span>
  </span>
</template>

<script>
import axios from "axios";
import Vue from 'vue';

export default {
name: "registerUser",
  props:{
    cmd:{
      type: String,
      required: false
    }
  },
  mounted(){
    let self = this
    Vue.nextTick()
        .then(function () {
          console.log(self.$refs.name.focus())
        })
  },
  data(){
    return {
      userName:'',
      userEmail:'',
      userPassword:''
    }
  },
  watch :{
    cmd: function(){
      debugger;
      console.log('registerUser cmd', this.cmd);
      if(this.cmd=='saveRegistration'){
        axios.post('http://localhost:8000/api/shan/setupNewUser?XDEBUG_SESSION_START=17516', {
          params:{
            name:this.userName,
            email:this.userEmail,
            password:this.userPassword,
            org: this.$store.getters.getOrgId
          }
        }).then(response=>
        {
//            debugger;
          if(response.data.result=='ok'){
            console.log('registration has been saved');
            this.$emit('registrationSaved');
          }

        }).catch(function(error) {
          console.log(error);
        });
      }
    }
  }
}
</script>

<style scoped>
.newUserWrapper {
  display:grid;
  grid-template-rows: 15% 15% 15% 15% 15%;

}
.labelPlusInput {
  display:grid;
  margin-top: 3px;
  grid-template-columns: 30% 70%;
  font-family: Arial;
  font-size: medium;
  color: #0a3aff;
}

.inputStyle {
  padding:4px;
  border-radius:4px;
}

</style>
