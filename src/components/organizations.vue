<template>
  <span>
    <span v-if="this.orgView==this.ORG_LIST">
       <o-table :data="orgs"
                :columns="orgColumns"
                :selected.sync="selected"
                :paginated="isPaginated"
                :per-page="perPage"
                :current-page.sync="currentPage"
                :pagination-simple="isPaginationSimple"
                :pagination-position="paginationPosition"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page"
                @update:selected="orgSelected"
                focusable
       >
       </o-table>
    </span>
   <span v-if="this.orgView==this.ORG_MEMBERS">
     <o-table :data="orgUsers"
              :columns="orgUserColumns"
              :selected.sync="selectedUser"
              :paginated="isPaginated"
              :per-page="perPage"
              :current-page.sync="currentOrgUserPage"
              :pagination-simple="isPaginationSimple"
              :pagination-position="paginationPosition"
              aria-next-label="Next page"
              aria-previous-label="Previous page"
              aria-page-label="Page"
              aria-current-label="Current page"
              @update:selected="userSelected"
              focusable
     >
     </o-table>
   </span>

  </span>
</template>

<script>
import axios from "axios";

export default {
name: "organizations",
  data(){
    return {
      ORG_LIST:0,
      ORG_MEMBERS:1,
      orgView:0,
      orgs:[],
      orgUsers:[],
      isPaginated: true,
      isPaginationSimple: true,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'small',
      currentPage: 1,
      currentOrgUserPage: 1,
      perPage: 4,
      nxtPage: 'Next Page',
      selected: '',
      selectedUser:'',
      orgColumns: [
        {
          field: 'org_label',
          label: 'Name',
          width: '20',
        },
        {
          field: 'description',
          label: 'Description',
          width: '40'
        },
        {
          field: 'top_layout_id',
          label: 'Home Space',
          width: '10',
          numeric: true,
          visible: false
        }
      ],
      orgUserColumns:[
        {
          field: 'name',
          label: 'User Name',
          width: '30'
        },
        {
          field: 'email',
          label: 'Email',
          width: '40'
        },
        {
          field: 'id',
          visible: false
        }
      ]
    }
  },
  mounted(){
    this.orgView = this.ORG_LIST;
    this.getOrgs();
  },
  methods:{
    getOrgs(){
      axios.get('http://localhost:8000/api/shan/orgList?XDEBUG_SESSION_START=14668', {
      })
          .then(response => {
// eslint-disable-next-line no-debugger
            // JSON responses are automatically parsed.
//            debugger;
            console.log(response);
            this.orgs=response.data;
            this.$emit('componentSettingsMounted',[['Done', 'Add New Organization'],'Done']);
            this.$emit('setTitle','Click on Organization to See Members');

          })
          .catch(e => {
            this.errors.push(e);
            console.log('orgMembers failed');
          });
    },
    orgSelected(msg){
      console.log(msg);
      this.getOrgMembers(msg.id);
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
//            debugger;
            console.log(response);
            this.orgUsers=response.data;
            this.orgView=this.ORG_MEMBERS;
            this.$emit('componentSettingsMounted',[['Back','Done', 'Add User'],'Done']);
            this.$emit('setTitle','Click on Organization to See Members');

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
