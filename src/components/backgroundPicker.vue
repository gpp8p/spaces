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
                <color-picker :currentValues="currentValues" :pType="pType" @selectedValue="selectedValue"></color-picker>
            </span>
            <span v-if="this.backgroundTypeSelection==this.IMAGE_SELECTED" class="imageSelectorStyle">
                <file-upload :fileRole="this.fileRole" @selectedValue="selectedValue"></file-upload>
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
              required: true
          },
          pType: {
              type: String,
              required: true
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
        mounted(){
//            console.log(this.currentValues);
            if(this.currentValues.backgroundType=='color'){
                this.row='color_selected';
                this.backgroundTypeSelection = this.COLOR_SELECTED;
            }else if(this.currentValues.backgroundType=='image'){
                this.backgroundTypeSelection = this.IMAGE_SELECTED;
                this.row='image_selected';
            }else{
                this.row='';
            }
        },
        methods:{
            colorSelected(){
                console.log('color has been selected');
                this.backgroundTypeSelection = this.COLOR_SELECTED;
                this.$emit('selectedValue', ['backgroundType',this.backgroundTypeSelection] );
            },
            imageSelected(){
                console.log('image has been selected');
                this.backgroundTypeSelection = this.IMAGE_SELECTED;
                this.$emit('selectedValue', ['backgroundType',this.backgroundTypeSelection] );
            },
            selectedValue(msg){
                this.$emit('selectedValue', msg);
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
        grid-template-columns: 15% 15% 60%;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    .pickers{

    }

</style>
