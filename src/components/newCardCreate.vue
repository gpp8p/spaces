<template>
  <span>
    <span v-if="selectedMenuOption=='Create New Card'" >
      <span class="labelPlusInput">
        <span>Card Name:</span>
        <input v-model="cardName" size="30"/>
      </span>
      <span>
        <select-picker :pType="cardPtypeReference" :label="cardTypeLabel" :options="cardTypeOptions" :currentValues="currentValues" @configSelected="configSelected"></select-picker>
      </span>

    </span>
  </span>
</template>

<script>
  import SelectPicker from "@/components/selectPicker";
  export default {
    name: "newCardCreate",
    components: {SelectPicker},
    data() {
      return {
        checkbox: false,
        checkboxCustom: 'Yes',
        isClicked: false,
        menuOptions: ['Create New Card', 'Cancel' ],
        openMenuOption:'Create New Card',
        cardName:'',
        cardTypeLabel: 'Card Type:',
        cardPtypeReference: 'cardType',
        cardTypeOptions: ['Headline', 'RichText']
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
      dialogKey:{
        type: Number,
        required:true
      }
    },
    methods:{
      configSelected(msg){
        this.$emit('configSelected', msg);
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
  .inp{
    display: grid;
    grid-template-rows: 50% 50%;
    grid-template-columns: 100%;
  }
  .labelPlusInput {
    display:grid;
    margin-top: 3px;
    grid-template-columns: 20% 70%;
    font-family: Arial;
    font-size: medium;
    color: #0a3aff;
  }

</style>
