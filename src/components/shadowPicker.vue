<template>
<span class="shadowPickerWrapper">
  <o-checkbox @input="cbClicked" v-model="shadow">{{shadowLabel}}</o-checkbox>
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
                this.$emit('selectedValue', [this.pType, this.shadow]);
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
