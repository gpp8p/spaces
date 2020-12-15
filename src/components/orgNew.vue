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
            <input v-model="orgName"  size="60" class="inputStyle" placeholder="OrganizatrionName" @blur="focusChangedOrgName" />
         </span>
     </span>

     <span class="labelPlusInput">
         <span>
            Home Space Dim.:
         </span>
         <span>
           <input v-model="hpRows" size="5" class="inputStyle"  @blur="focusChangedRows" /> - Rows <input v-model="hpCols" size="5" class="inputStyle"  @blur="focusChangedCols" /> - Columns
         </span>
     </span>
     <span class="labelPlusInput">
          <span>
            Background:
          </span>
       <span class="backgroundPick">
          <background-picker :currentValues="currentValues" :dialogKey="dialogKey" :pType="backgroundColorType" :noTransparent=true @configSelected="configSelected"></background-picker>
      </span>
     </span>


     <span class="adminSelect" v-if="adminIdentified==false">
      <span>Administrator:</span>

      <span class="adminTypes">
        <span @click="newUserTypeSelected" class="nt">Enter new User</span>
        <span @click="existingUserTypeSelected" class="nt">Select an Existing User</span>
      </span>
     </span>
     <span class="adminSelect" v-if="adminIdentified==true">
       <span>Administrator</span>
       <span>{{this.orgAdminName}} - {{this.orgAdminEmail}}</span>
     </span>
    </span>
    <span v-if="this.viewStatus==this.NEWORG_NEWUSER">
      <register-user @registrationSaved="registrationSaved" @setTitle="setTitle" @componentSettingsMounted="componentSettingsMounted"></register-user>
    </span>
    <span v-if="this.viewStatus==this.NEWORG_EXISTING_USER">
      <org-membership :orgId="allUserId" @memberSelected="memberSelected" @componentSettingsMounted="componentSettingsMounted" @setTitle="setTitle" ></org-membership>
    </span>

  </span>
</template>

<script>
import Vue from 'vue';
import registerUser from "../components/registerUser.vue";
import orgMembership from "../components/orgMembership.vue";
import backgroundPicker from "@/components/backgroundPicker";
export default {
  name: "orgNew",
  components: {registerUser, orgMembership, backgroundPicker},
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
      allUserId:0,

      orgAdminName:'',
      orgAdminEmail:'',
      orgAmdinId:'',
      adminIdentified:false
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
      this.$emit('componentSettingsMounted',[['Return to New Organization','Done'],'Done']);
      this.$emit('setTitle','Select User to be Organization Administrator');
      this.viewStatus=this.NEWORG_EXISTING_USER;
      console.log('existingUserSelected', msg);
    },
    memberSelected(msg){
      console.log('mewmberSelected in orgNew', msg);
      this.orgAdminName=msg[1].name;
      this.orgAdminEmail=msg[1].email;
      this.orgAmdinId=msg[1].id;
      this.viewStatus=this.NEWORG_ORGINFO;
      this.adminIdentified=true;
    },
    componentSettingsMounted(msg){
      this.$emit('componentSettingsMounted', msg);
    },
    setTitle(msg){
      this.$emit('setTitle', msg);
    },
    registrationSaved(msg){
      console.log(msg);
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
.adminTypes {
  display: grid;
  grid-template-columns: 50% 50%;
}
.adminSelect {
  display:grid;
  margin-top: 3px;
  grid-template-columns: 30% 70%;
  font-family: Arial;
  font-size: medium;
  color: #0a3aff;
}

.nt {
  color:blue;
}

.nt:hover {
  color:red;
}
</style>
