<template>
  <span class="newLayoutWrapper">
     <span class="labelPlusInput">
         <span>
            Layout Name:
         </span>
         <span>
            <input v-model="layoutName"  size="35"/>
         </span>
     </span>
     <span class="labelPlusInput">
        <span>
          Layout Description:
        </span>
       <span>
          <input v-model="layoutDescription" size="45"/>
       </span>
     </span>

     <span class="labelPlusInput">
        <span>
          Rows:
        </span>
       <span>
         <input v-model="layoutRows" size="8"/>
       </span>
     </span>
     <span class="labelPlusInput">
        <span>
          Layout Columns:
        </span>
       <span>
         <input v-model="layoutColumns" size="8"/>
       </span>
     </span>
     <span class="labelPlusInput">
          <span>
            Background Color:
          </span>
          <span  class="colorSpan">
            <input  id="input-color" type="color" class="input-color" @change="newColor" :value="val"/>
          </span>
     </span>
  </span>

</template>

<script>
export default {
  name: "newLayout",
  mounted(){
    this.$emit("componentSettingsMounted",[this.menuOptions,this.openMenuOption])
  },
  data(){
    return {
      layoutName:'',
      layoutDescription:'',
      layoutRows:'',
      layoutColumns:'',
      val:'#dbddb0',

      menuOptions: ['Create New Layout', 'Cancel' ],
      openMenuOption: 'Create New Layout'
    }
  }
}
</script>

<style scoped>
.newLayoutWrapper {
  display:grid;
  grid-template-rows: 15% 15% 15% 15% 15%;

}
.labelPlusInput {
  display:grid;
  margin-top: 3px;
  grid-template-columns: 30% 70%;
  font-family: Arial;
  font-size: medium;
  color: #0a3aff;
}
.colorSpan{
  width: 50px;


  font-family: Helvetica;
  font-size: smaller;
}
.colorSpanLabel {
  width: 150Px;
  margin-top: 10px;
  margin-left: 10px;
}
</style>
