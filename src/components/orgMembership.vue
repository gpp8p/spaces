<template>
  <span>
          <membership :members="this.orgUsers" :membershipType="membershipType" @memberSelected="memberSelected"></membership>
  </span>
</template>

<script>
import membership from "../components/membership.vue";
import axios from "axios";
//import store from "@/store";
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
      if(this.$store.getters.getIsAdmin==1){
        this.$emit('componentSettingsMounted',[['Back','Done', 'Add Member'],'Done']);
        this.$emit('setTitle','Organization Members - Click to Select');
      }else{
        this.$emit('componentSettingsMounted',[['Back','Done'],'Done']);
        this.$emit('setTitle','Organization Members');
      }
//      debugger;
      this.orgMemberViewStatus=this.ORG_MEMBERS;
      this.getOrgMembers(this.orgId);
    }else{
      this.getAllUsers();
      this.orgMemberViewStatus=this.ALL_MEMBERS;
      this.$emit('componentSettingsMounted',[['Back','Done'],'Done']);
    }


  },
  data() {
    return {
      orgUsers: [],
      ORG_MEMBERS:0,
      ALL_MEMBERS:1,
      AVAILABLE_MEMBERS:2,
      orgMemberViewStatus:0,
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
          this.getAvailableOrgMembers(this.orgId);
          this.orgMemberViewStatus = this.AVAILABLE_MEMBERS;

          break
        }
      }
    }
  },
  methods:{
    memberSelected(msg){
      switch(this.orgMemberViewStatus){
        case this.ORG_MEMBERS:{
          console.log('member selected ORG_MEMBERS');
          break;
        }
        case this.ALL_MEMBERS:{
          console.log('member selected ALL_MEMBERS');
          break;
        }
        case this.AVAILABLE_MEMBERS:{
          console.log('member selected AVAILABLE_MEMBERS');
          console.log('selected member:',msg[1].id);
          axios.post('http://localhost:8000/api/shan/addUserToOrg?XDEBUG_SESSION_START=15022', {
            userId:msg[1].id,
            orgId: this.orgId
          }).then(response=>
          {
            console.log(response)
            if(response.data=='ok'){
              if(this.$store.getters.getIsAdmin==1){
                this.$emit('componentSettingsMounted',[['Back','Done', 'Add Member'],'Done']);
                this.$emit('setTitle','Organization Members - Click to Select');
              }else{
                this.$emit('componentSettingsMounted',[['Back','Done'],'Done']);
                this.$emit('setTitle','Organization Members');
              }
              this.orgMemberViewStatus=this.ORG_MEMBERS;
              this.getOrgMembers(this.orgId);
            }
          }).catch(function(error) {
//                    debugger;
            console.log(error);
          });

          break;
        }
      }
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

    getAvailableOrgMembers(orgId){
      axios.get('http://localhost:8000/api/shan/availableUsers?XDEBUG_SESSION_START=14668', {
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
            this.orgView=this.AVAILABLE_MEMBERS;
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
