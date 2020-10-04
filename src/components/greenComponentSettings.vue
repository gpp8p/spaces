<template>
  <span class="settings">
    <card-appearence-set></card-appearence-set>
  </span>
</template>

<script>
import CardAppearenceSet from "@/components/CardAppearenceSet";
  export default {
    name: "greenComponentSettings",
    components: {CardAppearenceSet},
    data() {
      return {
        checkbox: false,
        checkboxCustom: 'Yes',
        isClicked: false,
        menuOptions: ['Appearence', 'Text', 'Save', 'Cancel' ]
      }
    },
    mounted(){
      this.$emit("componentSettingsMounted",[this.menuOptions])
    },
    props:{

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
