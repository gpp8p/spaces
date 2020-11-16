<template>
  <span>
    <span v-if="selectedMenuOption=='Create New Card'" >
      <span class="labelPlusInput">
        <span>Card Name:</span>
        <input v-model="cardName" size="30"/>
      </span>
      <span>
        <select-picker :pType="cardPtypeReference" :dialogKey="this.dKey" :label="cardTypeLabel" :options="cardTypeOptions" :currentValues="currentValues" @configSelected="configSelected"></select-picker>
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
        cardType:'',
        cardTypeLabel: 'Card Type:',
        cardPtypeReference: 'cardType',
        cardTypeOptions: ['Headline', 'RichText'],
        dKey:0
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
    watch:{
      selectedMenuOption: function(){
        console.log('newCardCreate selectedMenuOption watcher triggered');
      }
    },
    methods:{
      configSelected(msg){
        console.log(msg);
          this.cardType=msg[1];
//        this.$emit('configSelected', msg);
      },
      getCardTitle(){
        return this.cardName;
      },
      getCardType(){
        return this.cardType;
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
