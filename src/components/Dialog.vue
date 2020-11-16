<template>
    <div class="dialogComponent" ref="drg"  draggable="true"  @dragstart="handleDragStart"   @dragend="handleDragEnd" >
      <div class="dialogComponentHeader" v-if="dialogContext==this.DIALOG_TITLE">
        <span class="headingText">{{this.titleMsg}}</span>
      </div>
      <div class="dialogComponentHeader" v-if="dialogContext==this.DIALOG_RUSURE">
            <span class="sure">
              <are-you-sure :msg="sureMsg" @rusureClick="rusure"></are-you-sure>
            </span>
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
              ref="newl"
              v-if = "dialogType==this.DIALOG_NEW_LAYOUT"
              @componentSettingsMounted="componentSettingsMounted"
              @layoutData="layoutData"
          ></new-layout>
          <PermList v-if="dialogType==this.DIALOG_PERMS"
                    @componentSettingsMounted="componentSettingsMounted"
                    @setTitle="setTitle"
                    :selectedMenuOption="currentSelectedMenuOption"
          ></PermList>
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
//    import newLayout from "../components/newLayout.vue";
    import newLayout from "../components/createLayout.vue";
    import AreYouSure from "../components/AreYouSure.vue";
    import PermList from "../components/PermList.vue"
    export default {
        name: "Dialog",
        components :{greenComponentSettings, menuOpt, newCardCreate, newLayout, AreYouSure, PermList},
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
        mounted(){
          this.getTitle();
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
                this.dialogDataChanged = true;
                this.$emit('configSelected', msg);
            },
            handleDragStart(evt){
//                debugger;
                this.$emit('dragStart',[evt.screenX, evt.screenY])
            },
            layoutData(msg){
 //             debugger;
              console.log('layoutData',msg);
              this.$emit('configSelected',['layoutSaved', msg[0]]);
            },
            menuOptSelected(msg){
              console.log(msg);
              switch(msg){
                case 'Cancel':{
                  if(this.dialogDataChanged){
                    this.freezeEvent('configSelected',['cancel']);
                    this.sureMsg = 'Unsaved changes - are you sure you want to cancel ?';
                    this.dialogContext=this.DIALOG_RUSURE
                  }else{
                    this.currentSelectedMenuOption = msg;
                    this.$emit('configSelected',['cancel']);
                  }
                  break;
                }
                case 'Done':{
                  this.currentSelectedMenuOption = msg;
                  this.$emit('configSelected',['cancel']);
                  break;
                }
                case 'Save':{
                  this.currentSelectedMenuOption = msg;
                  this.$emit('configSelected',['save']);
                  break;
                }
                case 'Save Layout':{
                  this.currentSelectedMenuOption = msg;
                  this.$refs.newl.getEnteredData();
                  break;
                }

                case 'Create New Card':{
//                  debugger;
                  this.currentSelectedMenuOption = msg;
                  var newCardTitle = this.$refs.newCardDialog.getCardTitle();
                  var newCardType = this.$refs.newCardDialog.getCardType()
                  this.$emit('configSelected', ['Create New Card', newCardTitle, newCardType]);
                  break;
                }
                default:{
                  this.currentSelectedMenuOption = msg;
                  break;
                }
              }
            },
            rusure(msg){
              debugger;
              if(msg){
                this.sureMsg = '';
                this.dialogContext=this.DIALOG_TITLE;
                this.releaseFrozenEvent();
              }else{
                this.sureMsg = '';
                this.dialogContext=this.DIALOG_TITLE;
                this.freezeEvent('',[]);
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
            },
            freezeEvent(eventType, eventArgs){
                this.frozenEvent.eventType = eventType;
                this.frozenEvent.eventArgs = eventArgs;
            },
            releaseFrozenEvent(){
              this.$emit(this.frozenEvent.eventType, this.frozenEvent.eventArgs);
            },
            getTitle(){
              switch(this.dialogType){
                case this.DIALOG_NEW_LAYOUT:{
                  this.titleMsg = "New Layout";
                  break;
                }
                case this.DIALOG_CREATE_CARD:{
                  this.titleMsg = "New Card";
                  break;
                }
                case this.DIALOG_CONFIGURE_GREEN_CARD:{
                  this.titleMsg = "Headline Card";
                  break;
                }
                case this.DIALOG_PERMS:{
//                  this.titleMsg = "Who Can Access This Space";
                  break;
                }
              }
            },
            setTitle(msg){
              this.titleMsg = msg;
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
                DIALOG_NEW_LAYOUT:4,
                DIALOG_PERMS:5,
                titleMsg:'Headline Card',

                sureMsg:'',

                DIALOG_TITLE:0,
                DIALOG_RUSURE:1,
                dialogContext:0,

                frozenEvent:{
                  eventType:'',
                  eventArgs:[]
                },
                dialogDataChanged: false





            }
        }
    }
</script>

<style scoped>
    .dialogComponent {
        height:300px;
        width:650px;
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
        padding-top: 5px;
    }
    .headingText{
        margin-top: 5px;
    }
    .dialogComponentBody {
        height: 72%;
        width: 90%;
        margin-left: 10px;
        margin-right: 10px;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 100%


    }
    .dialogComponentFooter {
        height: 10%;
        margin-left: 10px;
        margin-right: 5px;
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
    .sure {
      margin-top: 5px;
    }
</style>
