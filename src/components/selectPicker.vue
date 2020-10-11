<template>
  <span>
    <span  class="labelStyle">{{label}} </span>
    <select v-model="optSelected" class="selectStyle" @change="fontSelected()">
      <option value="" disabled selected class="optionStyle">Select</option>
      <option v-for="(opt, index) in this.options" :key="index" v-bind:value="opt" :selected="opt==optSelected" class="optionStyle">{{ opt }}</option>
    </select>
  </span>
</template>

<script>
export default {
name: "selectPicker",
  props:{
    currentValues: {
      type: Object,
      required: true
    },
    pType: {
      type: String,
      required: true
    },
    label:{
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  data(){
    return {
      optSelected:''
    }
  }
}
</script>

<style scoped>
.selectStyle {
  background: #DBAA6E;
  color:blue;
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 3px;
}
.optionStyle {
  background: #DBAA6E;
  color:blue;
  width:60px;
}
.labelStyle{
  font-family: Arial;
  font-size: medium;
  color: #0a3aff;
}

</style>
