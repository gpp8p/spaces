<template>
  <span class="textSetWrapper">
    <span class="fontSet">
      <flex-font-select :pType="this.fontFamilyReference" :currentValues="currentValues" @configSelected="configSelected"></flex-font-select>
    </span>
    <span class="sizeSet">
      <size-picker :pType="fontSizeReference" :currentValues="currentValues" @configSelected="configSelected"></size-picker>
    </span>
    <span class="weightSet">
      <weight-picker :pType="weightReference" :currentValues="currentValues" @configSelected="configSelected"></weight-picker>
    </span>
    <span class="styleSet">
      <style-picker :pType="styleReference" :currentValues="currentValues" @configSelected="configSelected"></style-picker>
    </span>
    <span class="alignSet">
      <align-picker :pType="alignReference" :currentValues="currentValues" @configSelected="configSelected"></align-picker>
    </span>
    <span class="colorSet">
      <font-color-picker :pType="colorReference" :currentValues="currentValues" @configSelected="configSelected"></font-color-picker>
    </span>

  </span>
</template>

<script>
import flexFontSelect from "../components/flexFontSelect.vue";
import sizePicker from "../components/sizePicker.vue";
import weightPicker from "../components/weightPicker.vue";
import stylePicker from "../components/stylePicker.vue";
import alignPicker from "../components/alignPicker.vue";
import fontColorPicker from "@/components/fontColorPicker";
export default {
  name: "TextSet",
  components: {flexFontSelect, sizePicker, weightPicker, stylePicker, alignPicker, fontColorPicker},
  props:{
    currentValues: {
      type: Object,
      required: true
    },
  },
  data(){
    return {
      fontFamilyReference:'fontFamily',
      fontSizeReference: 'fontSize',
      weightReference: 'fontWeight',
      styleReference: 'fontStyle',
      alignReference: 'textAlign',
      colorReference: 'color'
    }
  },
  methods:{
    configSelected(msg){
      console.log(msg);
    }
  }

}
</script>

<style scoped>
  .textSetWrapper {
    height: 100%;
    width: 100%;
    margin-left: 5%;
    display: grid;
    grid-template-rows: 15% 15% 15% 15% 15% 15%;
    grid-template-columns: 100%;
  }

</style>
