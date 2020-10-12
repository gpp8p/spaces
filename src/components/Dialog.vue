<template>
    <div class="dialogComponent" ref="drg"  draggable="true"  @dragstart="handleDragStart"   @dragend="handleDragEnd" >
        <div class="dialogComponentHeader">
            <span class="headingText">Sample Dialog Component</span>
        </div>
        <br/>

        <div class="dialogComponentBody">
          <green-component-settings
              @componentSettingsMounted="componentSettingsMounted"
              @configSelected="configSelected"
              :selectedMenuOption="currentSelectedMenuOption"
              :currentValues=currentValues
              :dialogKey="dialogKey"
          ></green-component-settings>
        </div>
        <div class="dialogComponentFooter">
            <menu-opt :mOpts="currentMenuOpts" @menuOptSelected="menuOptSelected"></menu-opt>
        </div>
    </div>

</template>

<script>
    import greenComponentSettings from "../components/greenComponentSettings.vue";
    import menuOpt from "../components/menuOpt.vue";
    export default {
        name: "Dialog",
        components :{greenComponentSettings, menuOpt},
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
                this.$emit('saveNewCard', [this.name, this.type]);
            },
            configSelected(msg){
                this.$emit('configSelected', msg);
            },
            handleDragStart(evt){
//                debugger;
                this.$emit('dragStart',[evt.screenX, evt.screenY])
            },
            menuOptSelected(msg){
              console.log(msg);
              this.currentSelectedMenuOption = msg;
              switch(msg){
                case 'Cancel':{
                  this.$emit('configSelected',['cancel']);
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
                currentSelectedMenuOption:''

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
