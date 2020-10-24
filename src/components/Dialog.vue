<template>
    <div class="dialogComponent" ref="drg"  draggable="true"  @dragstart="handleDragStart"   @dragend="handleDragEnd" >
        <div class="dialogComponentHeader">
            <span class="headingText">Sample Dialog Component</span>
        </div>
        <br/>

        <div class="dialogComponentBody">
          <green-component-settings
              v-if = "dialogType==this.DIALOG_CONFIGURE_GREEN_CARD"
              @componentSettingsMounted="componentSettingsMounted"
              @configSelected="configSelected"
              :selectedMenuOption="currentSelectedMenuOption"
              :currentValues=currentValues
              :dialogKey="dialogKey"
          ></green-component-settings>
          <new-card-create
              v-if = "dialogType==this.DIALOG_CREATE_CARD"
              ref="newCardDialog"
              :currentValues=currentValues
              :dialogKey="dialogKey"
              :selectedMenuOption="currentSelectedMenuOption"
              @componentSettingsMounted="componentSettingsMounted"
              @configSelected="configSelected"
          ></new-card-create>
          <new-layout
              v-if = "dialogType==this.DIALOG_NEW_LAYOUT"
              @componentSettingsMounted="componentSettingsMounted"
              @layoutSaved="layoutSaved"
          ></new-layout>
        </div>
        <div class="dialogComponentFooter">
            <menu-opt :mOpts="currentMenuOpts" @menuOptSelected="menuOptSelected"></menu-opt>
        </div>
    </div>

</template>

<script>
    import greenComponentSettings from "../components/greenComponentSettings.vue";
    import menuOpt from "../components/menuOpt.vue";
    import newCardCreate from "../components/newCardCreate.vue";
    import newLayout from "../components/newLayout.vue";
    export default {
        name: "Dialog",
        components :{greenComponentSettings, menuOpt, newCardCreate, newLayout},
        props:{
            dialogType:{
                type: Number,
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
        methods: {
            cancelClicked(){
                this.$emit('configSelected',['cancel']);
            },
            saveClicked(){
                //        debugger;
                this.$emit('configSelected', ['save']);
            },
            configSelected(msg){
                this.$emit('configSelected', msg);
            },
            handleDragStart(evt){
//                debugger;
                this.$emit('dragStart',[evt.screenX, evt.screenY])
            },
            layoutSaved(msg){
                console.log('layoutSaved', msg);
              this.$emit('configSelected', ['layoutSaved',msg]);
            },
            menuOptSelected(msg){
              console.log(msg);
              this.currentSelectedMenuOption = msg;
              switch(msg){
                case 'Cancel':{
                  this.$emit('configSelected',['cancel']);
                  break;
                }
                case 'Save':{
                  this.$emit('configSelected',['save']);
                  break;
                }

                case 'Create New Card':{
                  debugger;
                  var newCardTitle = this.$refs.newCardDialog.getCardTitle();
                  var newCardType = this.$refs.newCardDialog.getCardType()
                  this.$emit('configSelected', ['Create New Card', newCardTitle, newCardType]);
                  break;
                }
              }
            },

            handleDragEnd(evt){
                this.lastMouseX = evt.screenX;
                this.lastMouseY = evt.screenY;
                this.$emit('moved', [evt.screenY , evt.screenX]);
            },
            componentSettingsMounted(msg){
              console.log(msg);
              this.currentMenuOpts = msg[0];
              this.currentSelectedMenuOption = msg[1];
            }
        },


        data(){
            return {
                styleObject: {
                    top: '-600px',
                    left: '400px'
                },
                lastMouseX:0,
                lastMouseY:0,
                currentMenuOpts:[],
                currentSelectedMenuOption:'',

                DIALOG_CONFIGURE_GREEN_CARD:1,
                DIALOG_CONFIGURE_TEXT_CARD:2,
                DIALOG_CREATE_CARD:3,
                DIALOG_NEW_LAYOUT:4


            }
        }
    }
</script>

<style scoped>
    .dialogComponent {
        height:300px;
        width:500px;
        position: relative;
        background-color: #ab97ff;
        border: 2px solid blue;
        border-radius: 8px;
        box-shadow: 10px 10px 5px grey;
    }
    .dialogComponentHeader {
        height:10%;
        background-color: #fff722;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        text-align: center;
        color: blue;
        font-family: Geneva;
        font-size: 12px;
        font-style: normal;
        font-weight: bold;
    }
    .headingText{
        margin-top: 5px;
    }
    .dialogComponentBody {
        height: 72%;
        width: 100%;
        margin-left: 10px;
        margin-right: 10px;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 100%


    }
    .dialogComponentFooter {
        height: 10%;
        margin-left: 10px;
        margin-right: 10px;
    }
    .linkStyle{
        font-family: Arial;
        font-size: medium;
        color: #0a3aff;
        margin-left: 10%;
        margin-right: 40%;
    }
    .field{
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
    }
</style>
