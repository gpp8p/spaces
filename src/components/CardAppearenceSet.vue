<template>
    <span class="cardAppearenceWrapper">
        <span class="backgroundPick">
            <background-picker :currentValues="currentValues" :pType="backgroundColorType" @configSelected="configSelected"></background-picker>
        </span>
      <span class="borderPick">
            <border-picker :currentValues="currentValues" :pType="borderColorType" @configSelected="configSelected"></border-picker>
      </span>
      <span>
            <shadow-picker :currentValues="currentValues" :pType="shadowType" @configSelected="configSelected"></shadow-picker>
      </span>
      <span>
            <round-corner-picker :currentValues="currentValues" :pType="roundType" @configSelected="configSelected"></round-corner-picker>
      </span>

    </span>
</template>

<script>
    import backgroundPicker from "../components/backgroundPicker.vue";
    import borderPicker from "../components/borderPicker.vue";
    import shadowPicker from "../components/shadowPicker.vue"
    import roundCornerPicker from "../components/roundCornerPicker.vue"
    export default {
        name: "CardAppearenceSet",
        components: {backgroundPicker, borderPicker, shadowPicker, roundCornerPicker},
        props :{
            currentValues:{
                type: Object,
                required: false
            }
        },
        data(){
          return {
              backgroundColorType: "backgroundColor",
              borderColorType: "borderColor",
              shadowType: "shadow",
              roundType: "roundIncluded"
          }
        },
        methods:{
            configSelected(msg){
//                debugger;
                this.$emit('configSelected', msg);
            }
        }
    }
</script>

<style scoped>
.cardAppearenceWrapper {
    height: 100%;
    width: 100%;
    margin-left: 5%;
    display: grid;
    grid-template-rows: 25% 25% 25% 25%;
    grid-template-columns: 100%;
}
.borderPick{

}
.backgroundPick {

}
.shadowPick {

}
.roundCornerPick{

}

</style>
