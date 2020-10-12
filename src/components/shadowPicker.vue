<template>
<span class="shadowPickerWrapper">
  <o-checkbox @input="shadowClicked" v-model="shadow">{{shadowLabel}}</o-checkbox>
</span>
</template>

<script>
    export default {
        name: "shadowPicker",
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
                shadowLabel: "Shadow ?",
                shadow: false
            }
        },
        mounted(){
            if(this.currentValues.shadow=='checked'){
                this.shadow=true;
            }
        },
        methods:{
            shadowClicked(){
              if(this.shadow){
                this.$emit('configSelected', [this.pType, 'activated']);
              }else{
                this.$emit('configSelected', [this.pType, '']);
              }
            }
        },
        watch:{

//                debugger;
        currentValues: function(){
          if(this.currentValues['shadow']=='checked'){
            this.shadow=true;
          }
        }
      }
    }
</script>

<style scoped>
    .shadowPickerWrapper{
        display:grid;
        grid-template-rows: 100%;
        grid-template-columns: 30%;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
