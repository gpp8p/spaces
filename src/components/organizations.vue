<template>
  <span>
   <o-table :data="orgs"
            :columns="columns"
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
            @update:selected="spaceSelected"
            focusable> </o-table>
  </span>
</template>

<script>
import axios from "axios";

export default {
name: "organizations",
  data(){
    return {
      orgs:[],
      isPaginated: true,
      isPaginationSimple: true,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'small',
      currentPage: 1,
      perPage: 4,
      nxtPage: 'Next Page',
      selected: '',
      columns: [
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
          numeric: true
        }
      ]
    }
  },
  mounted(){
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
            this.$emit('componentSettingsMounted',[['Back','Done', 'Add New Organization'],'Done']);
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
