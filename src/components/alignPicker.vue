<template>
  <span>
      <span class="labelStyle">Font Alignment: </span>
       <o-select placeholder="Select Align" size="small" v-model="this.weightValue" rounded>
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </o-select>
  </span>
</template>

<script>
export default {
  name: "alignPicker",
  props:{
    currentValues: {
      type: Object,
      required: true
    },
    pType: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      alignValue:'left'
    }
  },
  watch:{
    alignValue: function(){
      this.$emit('configSelected', this.weightValue);
    }
  }

}
</script>

<style scoped>
  .labelStyle{
    font-family: Arial;
    font-size: medium;
    color: #0a3aff;
  }


</style>
