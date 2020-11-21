<template>
    <span :class="deleteActive ? 'pllineDelete' :'plline' ">
        <span v-if="deleteActive">
          Rmv. ?
        </span>
        <span>User or Group</span>
        <span>View</span>
        <span>Author</span>
        <span>Administer</span>
    </span>
</template>

<script>
    export default {
      name: "permListHeader",
      props:{
        deleteActive:{
          type: Boolean,
          required: true
        }
      }
    }
</script>

<style scoped>
    .plline {
        margin-top: 2%;
        width: 100%;
        display: grid;
        grid-template-columns: 50% 13% 13% 13% 13%;
        font-size: medium;
        font-family: Arial;
        background-color: darkgreen;
        color: white;
    }
    .pllineDelete {
      margin-top: 2%;
      width: 100%;
      display: grid;
      grid-template-columns: 10% 40% 13% 13% 13% 13%;
      font-size: medium;
      font-family: Arial;
      background-color: darkgreen;
      color: white;
    }
</style>
