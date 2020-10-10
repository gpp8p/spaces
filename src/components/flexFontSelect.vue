<template>
      <span>
            <span :style="{fontFamily : focused_font}" class="labelStyle">Font to use: </span>
            <select v-model="focused_font" class="selectStyle" ref="fontSelect" @change="fontSelected()">
                <option value="" disabled selected class="optionStyle">Font</option>
                <option v-for="(font, index) in this.available_fonts" :key="index" v-bind:value="font" :selected="font==focused_font" v-bind:style="{fontFamily : font}" class="optionStyle" >{{ font }}</option>
            </select>

        </span>

</template>

<script>
  /* eslint-disable no-debugger */

  export default {
    name: "flexFontSelect",
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
        available_fonts:['Arial', 'Times New Roman', 'Helvetica','Times','Courier New','Verdana','Courier','Arial Narrow','Candara','Geneva','Calibri','Optima','Cambria','Garamond','Perpetua','Monaco','Didot','Brush Script MT','Lucida Bright','Copperplate'],
        focused_font:''
      }
    },
    watch:{
      currentValues: function(){
//          debugger;
        this.val = this.getCurrentValue();
      }
    },
// eslint-disable-next-line no-debugger
    methods:{
      fontSelected(){
//        debugger;
        this.$emit('configSelected', [this.configElement.element, this.$refs.fontSelect.value]);
      },
      getCurrentValue(){
//        debugger;
        if(typeof(this.currentValues[this.configElement.element])=='undefined'){
          return '';
        }else{
          return this.currentValues[this.configElement.element];
//          var currentValuesEntriesParts = this.currentValues[this.configElement.element].split(":");
//          return currentValuesEntriesParts[1].replace(';','');
        }
      }

    }
  };
</script>

<style scoped>
    .fpickSelectors {
        padding-left: 1vw;
    }
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
      color: #0a3aff;
      font-size: medium;
    }


</style>
