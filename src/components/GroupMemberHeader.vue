<template>
        <span :class="deleteActive ? 'pllineDelete' :'plline' ">
        <span>User</span>
            <span>Email</span>
    </span>
</template>

<script>
    export default {
        name: "GroupMemberHeader",
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
        display: grid;
        grid-template-columns: 30% 70%;
        width:100%;
        font-size: medium;
        font-family: Arial;
        font-size: medium;
        font-family: Arial;
        background-color: darkgreen;
        color: white;

    }
    .plineDelete {
      display: grid;
      grid-template-columns: 10% 30% 70%;
      width:100%;
      font-size: medium;
      font-family: Arial;
      font-size: medium;
      font-family: Arial;
      background-color: darkgreen;
      color: white;
    }

</style>
