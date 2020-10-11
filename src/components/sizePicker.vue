<template>
  <span>
      <span class="labelStyle">Font Size: </span>
       <o-select  placeholder="Select Size" size="small" v-model="this.sizeValue" rounded>
          <option value="10pt">10pt</option>
          <option value="12pt">12pt</option>
          <option value="18pt">18pt</option>
          <option value="24pt">24pt</option>
          <option value="36pt">36pt</option>
          <option value="48pt">48pt</option>
        </o-select>
  </span>
</template>

<script>
export default {
  name: "sizePicker",
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
      sizeValue:'12pt'
    }
  },
  watch:{
    sizeValue: function(){
      this.$emit('configSelected', this.sizeValue);
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
