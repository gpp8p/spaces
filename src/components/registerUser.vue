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
            <input type="password" v-model="userEmail"  size="60"/>
         </span>
     </span>
     <span class="labelPlusInput">
         <span>
            Email Repeat:
         </span>
         <span>
            <input type="password" v-model="userEmailRepeat"  size="60"/>
         </span>
     </span>
  </span>
</template>

<script>
export default {
name: "registerUser"
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
