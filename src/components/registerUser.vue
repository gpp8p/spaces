<template>
  <span class="newUserWrapper">
     <span class="labelPlusInput">
         <span>
            Name:
         </span>
         <span>
            <input v-model="userName"  size="40"/>
         </span>
     </span>
    <span class="labelPlusInput">
         <span>
            Email:
         </span>
         <span>
            <input type="text" v-model="userEmail"  size="60"/>
         </span>
     </span>
     <span class="labelPlusInput">
         <span>
            Password:
         </span>
         <span>
            <input type="password" v-model="userPassword"  size="40"/>
         </span>
     </span>
     <span class="labelPlusInput">
         <span>
            Password:
         </span>
         <span>
            <input type="password" v-model="userPasswordRepeat"  size="40"/>
         </span>
     </span>
  </span>
</template>

<script>
import axios from "axios";

export default {
name: "registerUser",
  props:{
    cmd:{
      type: String,
      required: false
    }
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
</style>
