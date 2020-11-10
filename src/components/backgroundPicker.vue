<template>
    <span class="backgroundPickerWrapper">
      <span>
          <o-radio v-model="val" name="imageType" @input="colorSelected" native-value="color">
            Color
          </o-radio>
        </span>
      <span>
          <o-radio v-model="val" name="imageType" @input="imageSelected" native-value="image">
            Image
          </o-radio>
        </span>
        <span v-if="this.backgroundTypeSelection > 0" class="pickers">
            <span v-if="this.backgroundTypeSelection==this.COLOR_SELECTED">
                <color-picker :currentValues="currentValues" :pType="pType" @selectedValue="configSelected"></color-picker>
            </span>
            <span v-if="this.backgroundTypeSelection==this.IMAGE_SELECTED" class="imageSelectorStyle">
                <file-upload :fileRole="this.fileRole" @selectedValue="fileSelected"></file-upload>
            </span>
        </span>
    </span>
</template>

<script>
    import colorPicker from "../components/colorPicker.vue";
    import fileUpload from "../components/fileUpload.vue";
    export default {
        name: "backgroundPicker",
        components:{colorPicker, fileUpload},
        props:{
          currentValues: {
              type: Object,
              required: false
          },
          pType: {
              type: String,
              required: false
          },
          dialogKey:{
            type: Number,
            required:false
          }
        },
        data(){
          return {
              backgroundTypeSelection:0,
              NOTHING_SELECTED:0,
              COLOR_SELECTED:1,
              IMAGE_SELECTED:2,
              val: '',
              fileRole:"backgroundImage",
              row:''
          }
        },
        watch:{
          currentValues: function(){
            this.refreshCurrentValues();
          },
          dialogKey: function(){
            this.refreshCurrentValues();
          }
        },
        mounted(){
//            console.log(this.currentValues);
          this.refreshCurrentValues();
        },
        methods:{
            refreshCurrentValues(){
              debugger;
              console.log('currentValues updated in backgroundPicker');
              var typeColor = (this.currentValues['backgroundTypeColor']=='checked' ? true: false);
              console.log('typeColor-',typeColor);
              var typeImage = (this.currentValues['backgroundType']=='checked' ? true: false);
              console.log('typeImage', typeImage);
              var backgroundImage = this.currentValues['backgroundImage'];
              var backgroundImageDefined = typeof(backgroundImage)=='string' ? true: false;
              console.log('backgroundImageDefined', backgroundImageDefined);
              if(backgroundImageDefined && typeImage){
                this.backgroundTypeSelection = this.IMAGE_SELECTED;
                this.val='image';
              }else{
                this.backgroundTypeSelection = this.COLOR_SELECTED;
                this.val='color';
              }
            },
            colorSelected(){
                console.log('color has been selected');
                this.backgroundTypeSelection = this.COLOR_SELECTED;
                this.$emit('configSelected', ['backgroundTypeColor',this.backgroundTypeSelection] );
            },
            imageSelected(){
                console.log('image has been selected');
                this.backgroundTypeSelection = this.IMAGE_SELECTED;
                this.$emit('configSelected', ['backgroundType',this.backgroundTypeSelection] );
            },
            configSelected(msg){
                console.log('bgpick - color:', msg);
                this.$emit('configSelected', ['backgroundColor',msg[1]]);
            },
            fileSelected(msg){
              console.log('bgpick - file:', msg);
              this.$emit('configSelected', ['backgroundImage',msg[1]]);
            },
            getCurrentValue(){
                //debugger;
                if(typeof(this.currentValues[this.pType])=='undefined'){
                    return '';
                }else{
                    return this.currentValues[this.pType];
                }
            }
        }
    }
</script>

<style scoped>
    .backgroundPickerWrapper{
        display:grid;
        grid-template-rows: 100%;
        grid-template-columns: 20% 20% 60%;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    .pickers{
        margin-left: 10px;
    }

</style>
