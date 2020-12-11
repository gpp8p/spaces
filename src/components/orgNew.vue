<template>
  <span class="newOrgWrapper">
    <span v-if="this.viewStatus==this.NEWORG_ORGINFO">
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
      <span>Administrator:</span>
      <span class="radioItem">
        <o-radio v-model="val" name="adminUserType" @input="newUserTypeSelected">
            New User
        </o-radio>
         <o-radio v-model="val" name="adminUserType" @input="existingUserTypeSelected">
            Existing User
        </o-radio>
      </span>
     </span>
    </span>
    <span v-if="this.viewStatus==this.NEWORG_NEWUSER">
      <register-user @registrationSaved="registrationSaved" @setTitle="setTitle" @componentSettingsMounted="componentSettingsMounted"></register-user>
    </span>

  </span>
</template>

<script>
import Vue from 'vue';
import registerUser from "../components/registerUser.vue";
export default {
  name: "orgNew",
  components: {registerUser},
  props:{
    selectedMenuOption: {
      type: String,
      required: true
    },
    cmd:{
      type: String,
      required: false
    }
  },
  mounted(){
    this.viewStatus=this.NEWORG_ORGINFO;
    let self = this
    Vue.nextTick()
        .then(function () {
          console.log(self.$refs.orgName.focus())
        })
  },
  data(){
    return {
      orgName:'',
      viewStatus:0,
      NEWORG_ORGINFO:0,
      NEWORG_NEWUSER:1,
      NEWORG_EXISTING_USER:2,
    }
  },
  watch:{
    selectedMenuOption: function() {
        switch (this.selectedMenuOption) {
          case 'Return to New Organization':{
            this.$emit('setTitle','New Organization');
            this.$emit('componentSettingsMounted',[['Back','Done'],'Done']);
            this.viewStatus=this.NEWORG_ORGINFO;
            break;
          }
        }
      }
    },
  methods:{
    newUserTypeSelected(msg){
      console.log('new user selected',msg);
      this.$emit('componentSettingsMounted',[['Return to New Organization','Done'],'Done']);
      this.$emit('setTitle','New Organization Administrator');
      this.viewStatus=this.NEWORG_NEWUSER;
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
  grid-template-columns: 30% 70%;
  font-family: Arial;
  font-size: medium;
  color: #0a3aff;
}
</style>
