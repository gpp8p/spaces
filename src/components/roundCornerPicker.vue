<template>
  <span class="roundPickerWrapper">
    <o-checkbox @input="roundClicked" v-model="round">{{roundLabel}}</o-checkbox>
  </span>
</template>

<script>
    export default {
        name: "roundCornerPicker",
        props:{
            pType:{
                type: String,
                required: true
            },
            currentValues: {
                type: Object,
                required: true
            },
        },
        data(){
            return {
                roundLabel: "Round Corners ?",
                round: false
            }
        },
        mounted(){
            if(this.currentValues.rounded=='checked'){
                this.round=true;
            }
        },
        methods:{
            roundClicked(){
                this.$emit('selectedValue', [this.pType, this.round]);
            }
        },
      watch:{

//                debugger;
        currentValues: function(){
          if(this.currentValues['roundIncluded']=='checked'){
            this.round = true;
          }
        }
      }
    }
</script>

<style scoped>
    .roundPickerWrapper{
        display:grid;
        grid-template-rows: 100%;
        grid-template-columns: 70%;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
