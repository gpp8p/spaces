<template>
    <div v-bind:style="gridParamDefinition"  class="gridSection">
        <generic-card
                v-for="(instance, index) in cardInstances"
                :key="index"
                :cardType="instance.card_component"
                :card-style="instance.card_parameters.style"
                :card-id="instance.id"
                :card-key="index"
                :card-position="instance.card_position"
                :gridCss="gridParamDefinition"
                :cardProperties="instance.card_parameters.properties"
                :displayStatus="displayStatus"
                @storeValue="processClick"
                @cardClick="cardClick"
                @textEditor="textEditor"
                @configurationHasBeenSaved="configurationHasBeenSaved"
                @cardDataLoaded="cardDataLoaded"
                @linkHelperRequested="linkHelperRequested"
                ref="key"
        ></generic-card>
      <Dialog v-if="this.dialogType>0"
              :dialog-type="dialogType"
              :key="dialogKey"
              :currentValues=this.currentValues
              :dialogKey = "this.dialogKey"
              :cmd = "this.cmd"
              @dragStart="dragStart"
              @moved="dialogMoved"
              @configSelected = "configSelected"
              @clearCmd="clearCmd"
              v-bind:style='this.styleObject'
      ></Dialog>
    </div>
</template>

<script>
    import axios from "axios";
    import store from "../store";
//    import testCard from "../components/testCard.vue"
    import genericCard from '../components/genericCard.vue';
    import Dialog from "../components/Dialog.vue";
    export default {
        name: "displayLayout",
        components:{genericCard, Dialog},
        props:{
          cmd:{
            type: String,
            required: false
          }
        },
        watch:{
          cmd: function(){
            debugger;
            console.log('displayLayout - cmd property changed:', this.cmd);
            switch(this.cmd){
              case 'register':{
                this.dialogType = this.DIALOG_REGISTER;
                break;
              }
              case 'createNewLayout':{
                console.log('displayLayout createNewLayout triggered');
                this.dialogType = this.DIALOG_NEW_LAYOUT;
                break;
              }
              case 'access':{
                this.dialogType = this.DIALOG_PERMS;
                this.$emit('viewStatusChangeFunction', ['clearCmd'])
                break;
              }
              case 'organizations':{
                this.dialogType = this.DIALOG_ORGANIZATIONS;
                this.$emit('viewStatusChangeFunction', ['clearCmd'])
                break;
              }
            }

          }
        },
        mounted(){
//          debugger;
            console.log('displayLayout mounted',this.$route.params.layoutId);
            this.$emit('viewStatusChangeFunction',['displayLayout', this.displayLayoutViewStatusChange])
//          debugger;
            var thisLayoutIdStack;
            var thisStringLayoutIdStack = sessionStorage.getItem('layoutIdStack');
            if(thisStringLayoutIdStack==null){
                thisLayoutIdStack = [];
            }else{
                thisLayoutIdStack = JSON.parse(thisStringLayoutIdStack);
            }
            console.log(thisLayoutIdStack[thisLayoutIdStack.length-1],' - ', this.$route.params.layoutId);
            if(thisLayoutIdStack[thisLayoutIdStack.length-1]!=this.$route.params.layoutId ){
                console.log('pushing:',this.$route.params.layoutId);
                thisLayoutIdStack.push(parseInt(this.$route.params.layoutId));
                sessionStorage.setItem('layoutIdStack', JSON.stringify(thisLayoutIdStack));
            }

            this.reloadLayoutForDisplay(this.$route.params.layoutId, this.$store.getters.getLoggedInUserId, this.$store.getters.getOrgId);
        },
      created() {
        this.$eventHub.$on('editStatusChanged', this.editStatusChanged);
      },
      beforeDestroy(){
        this.$eventHub.$off('editStatusChanged');
      },
        data(){
          return {
              layoutId:this.$route.params.layoutId,
              cardInstances: [],
              gridParamDefinition: "",
              LayoutPermissions:{},
              displayStatus: true,

              dialogType:0,
              DIALOG_CONFIGURE_GREEN_CARD:1,
              DIALOG_CONFIGURE_TEXT_CARD:2,
              DIALOG_CREATE_CARD:3,
              DIALOG_NEW_LAYOUT:4,
              DIALOG_PERMS:5,
              DIALOG_REGISTER:6,
              DIALOG_ORGANIZATIONS:7,

              currentValues:{},
              dialogKey:0,
              dragStartX:0,
              dragStartY:0,
              styleObject: {
                top: '200px',
                left: '400px',
              },

          }
        },
        methods: {
            clearCmd(){
              this.$emit('viewStatusChangeFunction', ['clearCmd'])
            },
            layoutGridParameters(height, width, backgroundColor, backgroundImageUrl, backgroundType) {
                var heightSize = (95 / height).toFixed(2);
                var widthSize = (98 / width).toFixed(2);
                var gridHeightCss = "grid-template-rows: ";
                var gridWidthCss = "grid-template-columns: ";
                var x = 0;
                for (x = 0; x < height; x++) {
                    gridHeightCss = gridHeightCss + heightSize + "% ";
                }
                for (x = 0; x < width; x++) {
                    gridWidthCss = gridWidthCss + widthSize + "% ";
                }
                var gridCss;
                if(backgroundType=='C'){
                  gridCss =
                      "display: grid; grid-gap: 3px; background-color: "+backgroundColor+"; height: 90vh; color: #ffcd90; " +
                      gridHeightCss +
                      ";" +
                      gridWidthCss +
                      ";";
                }else{
                    var backgroundUrl = "http://localhost:8000/storage/"+backgroundImageUrl;
                    gridCss =
                      "display: grid; grid-gap: 3px; background-image: url("+backgroundUrl+"); background-size: cover; background-repeat: no-repeat; background-position: center; height: 90vh; color: #ffcd90; " +
                      gridHeightCss +
                      ";" +
                      gridWidthCss +
                      ";";
                }
                return gridCss;

            },
            cardDataLoaded(msg){
                this.$emit('cardDataLoaded',msg);
            },
            editStatusChanged(msg){
              console.log('displayLayout - editStatusChanged:',msg);
 //             this.dialogType = this.DIALOG_NEW_LAYOUT;
            },
          displayLayoutViewStatusChange(args){
            console.log('displayLayout recieved a view Status change');
            switch(args[0]){
              case 'newLayout':{
                this.dialogType = this.DIALOG_NEW_LAYOUT;
                break;
              }
              case 'access':{
//                this.dialogType = this.DIALOG_PERMS;
                break;
              }
              case 'organizations':{
//                this.dialogType = this.DIALOG_ORGANIZATIONS;
                break;
              }
            }
          },
          dragStart(msg){
//                debugger;
            this.dragStartX=msg[1];
            this.dragStartY=msg[0];
            console.log('dragStart-',this.dragStartX,this.dragStartY );
          },
          dialogMoved(msg){
            console.log('dragEnd',msg);
            var leftDelta = msg[1]-this.dragStartY;
            var topDelta= msg[0]-this.dragStartX;
            console.log('deltas:',topDelta, leftDelta);
            var newTop = parseInt(this.styleObject.top)+topDelta;
            var newLeft = parseInt(this.styleObject.left)+leftDelta;
            console.log('new values', newTop, newLeft);

            this.styleObject.top = newTop+'px';
            this.styleObject.left = newLeft+'px';

            console.log(topDelta, leftDelta);

            //            this.styleObject.left = msg[1].toString()+'px';
            console.log(msg);
            this.dialogKey=this.dialogKey+1;

          },

          configSelected(msg) {
            switch (msg[0]) {
              case 'cancel': {
                debugger;
                this.dialogType = 0;
                this.$emit('configSelected',['cancel']);
                break;
              }
              case 'layoutSaved':{
                this.dialogType = 0;
                this.$emit('configSelected',msg);
                break;
              }
              default: {
                this.$emit('configSelected',msg);
              }
            }
          },



            reloadLayoutForDisplay: function(layoutId, userId, orgId) {
                this.cardInstances = [];
                this.displayGrid=true;
                this.layoutId = layoutId;
//      this.cancelLayoutEdit();
//      console.log("reloading" + msg);
                debugger;
                axios.get('http://localhost:8000/getLayout?XDEBUG_SESSION_START=15122"', {
                    params:{
                        orgId:orgId,
                        userId:userId,
                        layoutId:this.layoutId
                    }
                }).then(response => {
                    // JSON responses are automatically parsed.
//                    debugger;
                    console.log('getLayout-',response);
                    this.cardInstances = response.data.cards;
                    this.gridParamDefinition = this.layoutGridParameters(
                        response.data.layout.height,
                        response.data.layout.width,
                        response.data.layout.backgroundColor,
                        response.data.layout.backGroundImageUrl,
                        response.data.layout.backgroundType,
                    );
                    this.LayoutPermissions = response.data.perms;
                    if(this.canView(this.LayoutPermissions)){
                        console.log('permissions Ok');
                    }else{
                        this.$router.push({
                            name: 'errorPage',
                            params: { errorMessage: 'You do not have permission to access that page' }
                        });
                    }
                    store.commit('setPerms', response.data.perms);
                    this.$emit('layoutChanged',[this.layoutId]);
                    store.commit('setCurrentLayoutId', this.layoutId);
//                    this.$eventHub.$emit('layoutChanged');
                }).catch(e => {
                    console.log(e);
                    this.errors.push(e);
                });
            },

            canView(perms){

                if(perms.admin) return true;
                if(perms.author) return true;
                if(perms.view) return true;


//                console.log(perms);
                return false;
            },



            computeGridCss(row, col, height, width){
//        debugger;
                var startRow = row;
                var startColumn = col;
                var endRow=0;
                var endCol=0;
                if(height==1){
                    endRow = row;
                }else{
                    endRow = row+height;
                }
                endCol=startColumn+width;
                var thisCss = "grid-area:"+startRow+"/"+startColumn+"/"+endRow+"/"+endCol;
                return thisCss;

            },
        }
    }
</script>

<style scoped>



</style>
