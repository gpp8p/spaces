<template>
  <span class="newOrgWrapper">
    <form>
     <span class="labelPlusInput">
         <span>
            Organization Name:
         </span>
         <span>
            <input v-model="orgName" ref="orgName" size="40" class="inputStyle" placeholder="OrganizatrionName" @blur="focusChangedOrgName" />
         </span>
     </span>
     <span class="labelPlusInput">
         <span>
            Description:
         </span>
         <span>
            <input v-model="orgName" ref="name" size="60" class="inputStyle" placeholder="OrganizatrionName" @blur="focusChangedOrgName" />
         </span>
     </span>
     <span class="adminSelect">
      <span class="radioItem">
        <o-radio v-model="val" name="adminUserType" @input="newUserTypeSelected">
            New User
        </o-radio>
         <o-radio v-model="val" name="adminUserType" @input="existingUserTypeSelected">
            Existing User
        </o-radio>
      </span>
     </span>
    </form>

  </span>
</template>

<script>
import Vue from 'vue';
export default {
  name: "orgNew",
  mounted(){
    let self = this
    Vue.nextTick()
        .then(function () {
          console.log(self.$refs.orgName.focus())
        })
  },
  data(){
    return {
      orgName:''
    }
  },
  methods:{
    newUserTypeSelected(msg){
      console.log('new user selected',msg);
    },
    existingUserTypeSelected(msg){
      console.log('existingUserSelected', msg);
    }
  }
}
</script>

<style scoped>
.labelPlusInput {
  display:grid;
  margin-top: 3px;
  grid-template-columns: 30% 70%;
  font-family: Arial;
  font-size: medium;
  color: #0a3aff;
}
.adminSelect {
  display:grid;
  margin-top: 3px;
  grid-template-rows: 50% 50%;
  font-family: Arial;
  font-size: medium;
  color: #0a3aff;
}
</style>
