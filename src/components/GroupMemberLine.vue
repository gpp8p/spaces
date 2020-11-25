<template>
  <span :class="deleteActive ? 'llineDelete' :'lline' ">
    <span v-if="deleteActive">
      <input type="radio" name="deleteMember" @click="deleteClicked"/>
    </span>

    <span  v-on:click="this.memberSelected" >{{name}}</span>
    <span>{{email}}</span>
  </span>

</template>

<script>
    export default {
        name: "GroupMemberLine",
        props:{
            name:{
                type: String,
                required: true
            },
            email:{
                type: String,
                required: true
            },
            id:{
                type: Number,
                required: true
            },
            deleteActive:{
              type: Boolean,
              required: true
            }
        },
        methods:{
            memberSelected(){
                this.$emit('memberSelected', [this.id]);
            },
          deleteClicked(){
            this.$emit('deleteMemberClicked', this.groupId);
          },

        }
    }
</script>

<style scoped>
    .lline {
        display: grid;
        grid-template-columns: 30% 70%;
        font-size: medium;
        font-family: Arial;
        align-items: left;
        color: black
    }
    .llineDelete{
      display: grid;
      grid-template-columns: 10% 30% 70%;
      font-size: medium;
      font-family: Arial;
      align-items: left;
      color: black
    }
    .lline:hover {
        background-color: burlywood;
    }
    .gitem {
        text-align: left;

    }
</style>
