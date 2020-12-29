<template>
  <span>
          <membership :members="this.orgUsers" :membershipType="membershipType" @memberSelected="memberSelected"></membership>
  </span>
</template>

<script>
import membership from "../components/membership.vue";
import axios from "axios";
export default {
name: "orgMembership",
  components: {membership},
  props:{
    orgId:{
      type: Number,
      required: true
    },
    cmd:{
      type: String,
      required: false
    }
  },
  mounted(){
    if(this.orgId>0){
      this.getOrgPerms(this.orgId);
//      debugger;
      this.getOrgMembers(this.orgId);
    }else{
      this.getAllUsers();
      this.$emit('componentSettingsMounted',[['Back','Done'],'Done']);
    }

  },
  data() {
    return {
      orgUsers: [],
      orgPermissions:{},
      membershipType:'org',
      isPaginated: true,
      isPaginationSimple: true,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'small',
      currentPage: 1,
      perPage: 5,
      nxtPage: 'Next Page',
      selected: '',
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '10',
          numeric: true
        },
        {
          field: 'name',
          label: 'Name'
        },
        {
          field: 'email',
          label: 'Email'

        }
      ]
    }
  },
  watch :{
    cmd: function(){
      switch(this.cmd){
        case 'Add Member':{
          console.log('orgMembership Add Member activated');
          this.$emit('setTitle','Click to Select Member to Add');
          this.$emit('componentSettingsMounted',[['Back','Done'],'Done']);
          this.getAllUsers();

          break
        }
      }
    }
  },
  methods:{
    memberSelected(msg){
      console.log(msg);
      this.$emit('memberSelected', msg);
    },
    getOrgMembers(orgId){
      axios.get('http://localhost:8000/api/shan/orgUsers?XDEBUG_SESSION_START=14668', {
        params: {
          orgId:orgId
        }
      })
          .then(response => {
// eslint-disable-next-line no-debugger
            // JSON responses are automatically parsed.
            debugger;
            console.log(response);
            this.orgUsers=response.data;
            this.orgView=this.ORG_MEMBERS;
  //          this.$emit('componentSettingsMounted',[['Back','Done', 'Add Member'],'Done']);
//            this.$emit('setTitle','Organization Members - Click to Select');

          })
          .catch(e => {
            this.errors.push(e);
            console.log('orgMembers failed');
          });
    },

    getAllUsers(){
      axios.get('http://localhost:8000/api/shan/allUsers?XDEBUG_SESSION_START=14668', {

      })
          .then(response => {
// eslint-disable-next-line no-debugger
            // JSON responses are automatically parsed.
            debugger;
            console.log(response);
            this.orgUsers=response.data;
            this.orgView=this.ORG_MEMBERS;

//            this.$emit('setTitle','Organization Members - Click to Select');

          })
          .catch(e => {
            this.errors.push(e);
            console.log('orgMembers failed');
          });
    },

    getOrgPerms(orgId){
      debugger;
      axios.get('http://localhost:8000/api/shan/userOrgPerms?XDEBUG_SESSION_START=14668', {
        params: {
          orgId:orgId
        }
      })
          .then(response => {
// eslint-disable-next-line no-debugger
            // JSON responses are automatically parsed.
            debugger;
            this.orgPermissions.view = response.data.view;
            this.orgPermissions.author = response.data.author;
            this.orgPermissions.admin = response.data.admin;
            if(this.orgPermissions.admin==true){
              this.$emit('componentSettingsMounted',[['Back','Done', 'Add Member'],'Done']);
              this.$emit('setTitle','Organization Members - Click to Select');
            }else{
              this.$emit('componentSettingsMounted',[['Back','Done'],'Done']);
              this.$emit('setTitle','Organization Members');
            }
            console.log(response);

          })
          .catch(e => {
            this.errors.push(e);
            console.log('orgUserPerms failed');
          });
    }
  }
}
</script>

<style scoped>
span {
  font-family: Arial;
  font-size: smaller;
  --oruga-table-color: green;
  --oruga-table-background-color: #ab97ff;
  --oruga-table-background: #ab97ff;
  --oruga-table-detail-background: #ab97ff;

}
</style>
