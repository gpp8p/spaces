<template>
  <span>
      <span class="labelStyle">Font Style: </span>
       <o-select placeholder="Select Style" size="small" v-model="this.weightValue" rounded>
          <option value="normal">Normal</option>
          <option value="italic">Italic</option>
          <option value="oblique">Oblique</option>
        </o-select>
  </span>
</template>

<script>
export default {
  name: "stylePicker",
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
      styleValue:'normal'
    }
  },
  watch:{
    styleValue: function(){
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
