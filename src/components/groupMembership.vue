<template>
  <span>
   <o-table :data="groupMembers"
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
export default {
name: "groupMembership",
  props:{
    groupMembers :{
      type: Array,
      required: true
    }
  },
  data(){
    return {
      isPaginated: true,
      isPaginationSimple: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'small',
      currentPage: 1,
      perPage: 4,
      nxtPage: 'Next Page',
      selected:'',
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
  }
}
</script>

<style scoped>

span {
  --oruga-table-color: green;
  --oruga-table-background-color: #ab97ff;

}


</style>
