<template>
  <span>Perm List</span>
</template>

<script>
export default {
name: "PermList",
  props:{
    selectedMenuOption: {
      type: String,
      required: true
    },
    dialogKey:{
      type: Number,
      required:true
    }
  },
  watch:{
    selectedMenuOption: function(){
      this.openMenuOption = this.selectedMenuOption;
    }
  },
  Data(){
    return {
      currentMenu: [],
      currentMenuActiveOption:'',
      openMenuOption:'',


    }
  },
  mounted(){
    debugger;
    this.currentMenu = ['Add Group', 'Done'];
    this.currentMenuActiveOption = 'Done';
    this.$emit("componentSettingsMounted",[this.currentMenu,this.currentMenuActiveOption])
  }

}
</script>

<style scoped>

</style>
