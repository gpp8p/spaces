<template>
    <span>
        <input type="checkbox" @click="this.clicked" :checked="checked" value="on" /> - {{this.configElement.prompt}}
    </span>
</template>

<script>
  /* eslint-disable no-debugger */

  //  import flexConfigComponent from "../components/flexConfigComponent.vue";
//    import dummyConfigComponent from "../components/dummyConfigComponent.vue";
  export default {
    name: "flexCheckbox",
//    components: {'flexConfigComponent':flexConfigComponent},
//      components: {dummyConfigComponent},
    props:{
      currentValues:{
        type: Object,
        required: false
      },
      pType:{
        type: String,
        required: true
      },

// eslint-disable-next-line no-debugger
    },
    data(){
        return {
          checked: this.getCurrentValue()
        }
    },
    mounted(){
      if(this.currentValues[this.pType]=='checked'){
        this.checked=true;
      }
    },
    watch:{
        currentValues: function(){
//          debugger;
          this.checked = this.getCurrentValue();
        }
    },

    methods:{
      clicked(event){
        if (event.target.checked){
          this.showExpansion=true;
          this.checked=true;
          this.$emit('configSelected', [this.configElement.element,'activated']);
        }else{
          this.showExpansion=false;
          this.checked=false;
          this.$emit('configSelected', [this.configElement.element,'deactivated']);
        }
      },
      isClicked(){
//        debugger;
        return this.checked;
      },
      getCurrentValue(){
//        debugger;
        if(this.currentValues[this.pType]=='checked'){
          return true;
        }else{
          return false;
        }
      }





    }
  };
</script>

<style scoped>

</style>
