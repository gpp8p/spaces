<template>
  <span>
      <span class="labelStyle">Font Weight: </span>
       <o-select placeholder="Select Weight" size="small" v-model="this.weightValue" rounded>
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="bolder">Bolder</option>
          <option value="lighter">Lighter</option>
        </o-select>
  </span>
</template>

<script>
export default {
  name: "weightPicker",
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
      weightValue:'normal'
    }
  },
  watch:{
    weightValue: function(){
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
