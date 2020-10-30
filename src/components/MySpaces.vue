<template>
<h2>My Spaces</h2>
</template>

<script>
import axios from "axios";
export default {
name: "MySpaces",
  mounted(){
    console.log('mounted runs in layoutLinks');
    console.log('orgId - according vuex:', this.$store.getters.getOrgId );
    debugger;
    axios.get('http://localhost:8000/api/shan/getMySpaces?XDEBUG_SESSION_START=15122"', {
      params:{
        orgId:this.$store.getters.getOrgId,
        userId: this.$store.getters.getLoggedInUserId,
      }
    }).then(response=> {
      console.log('getMySpaces',response);
      this.data=response.data;
    }).catch(e=>{
      console.log(e);
    });
  },
  data(){
    return {
      data:[],
      isPaginated: true,
      isPaginationSimple: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'small',
      currentPage: 1,
      perPage: 5,
      nxtPage: 'Next Page',
      selected:''
    }
  }
}
</script>

<style scoped>

</style>
