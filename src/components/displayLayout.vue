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
    </div>
</template>

<script>
    import axios from "axios";
    import store from "../store";
//    import testCard from "../components/testCard.vue"
    import genericCard from '../components/genericCard.vue';
    export default {
        name: "displayLayout",
        components:{genericCard},
        mounted(){
//          debugger;
          console.log('displayLayout mounted',this.$route.params.layoutId);
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
        data(){
          return {
              layoutId:this.$route.params.layoutId,
              cardInstances: [],
              gridParamDefinition: "",
              LayoutPermissions:{},
              displayStatus: true
          }
        },
        methods: {
            layoutGridParameters(height, width, backgroundColor) {
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
                var gridCss =
                    "display: grid; grid-gap: 3px; background-color: "+backgroundColor+"; height: 90vh; color: #ffcd90; " +
                    gridHeightCss +
                    ";" +
                    gridWidthCss +
                    ";";
                return gridCss;
            },
            cardDataLoaded(msg){
                this.$emit('cardDataLoaded',msg);
            },




            reloadLayoutForDisplay: function(layoutId, userId, orgId) {
                this.cardInstances = [];
                this.displayGrid=true;
                this.layoutId = layoutId;
//      this.cancelLayoutEdit();
//      console.log("reloading" + msg);
//                debugger;
                axios.get('http://localhost:8000/getLayout?XDEBUG_SESSION_START=15122"', {
                    params:{
                        orgId:orgId,
                        userId:userId,
                        layoutId:this.layoutId
                    }
                }).then(response => {
                    // JSON responses are automatically parsed.
 //                   debugger;
                    this.cardInstances = response.data.cards;
                    this.gridParamDefinition = this.layoutGridParameters(
                        response.data.layout.height,
                        response.data.layout.width,
                        response.data.layout.backgroundColor
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
                    this.$eventHub.$emit('layoutChanged');
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
