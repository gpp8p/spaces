<template>
  <span class="settings">
    <span v-if="selectedMenuOption=='Appearence'">
      <card-appearence-set :currentValues="currentValues"></card-appearence-set>
    </span>
    <span v-if="selectedMenuOption=='Text'">
      <text-set :currentValues="currentValues"></text-set>
    </span>
  </span>
</template>

<script>
import CardAppearenceSet from "@/components/CardAppearenceSet";
import TextSet from "@/components/TextSet";
  export default {
    name: "greenComponentSettings",
    components: {CardAppearenceSet, TextSet},
    data() {
      return {
        checkbox: false,
        checkboxCustom: 'Yes',
        isClicked: false,
        menuOptions: ['Appearence', 'Text', 'Save', 'Cancel' ],
        openMenuOption:'Appearence'
      }
    },
    mounted(){
      this.$emit("componentSettingsMounted",[this.menuOptions,this.openMenuOption])
    },
    props:{
      selectedMenuOption: {
        type: String,
        required: true
      },
      currentValues:{
        type: Object,
        required:true
      },
    },
    methods:{
      cbClicked(msg){
        console.log('basic checkbox clicked', msg);
      }
    }


  }
</script>

<style scoped>

  .settings{
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 100%;

  }

</style>
