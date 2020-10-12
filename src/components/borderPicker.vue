<template>
    <span class="borderPickerWrapper">

        <o-checkbox @input="borderSelectedChanged" v-model="checked">{{borderLabel}}</o-checkbox>

      <span v-if="checked" class="selectThick">
        <select-picker :pType="borderValueRef" :label="borderSizeLabel" :options="borderSizeOptions" :currentValues="currentValues" @configSelected="configSelected"></select-picker>
      </span>
      <span v-if="checked" class="pickers">
          <color-picker
                  :currentValues="currentValues"
                  :pType="borderColorRef"
                  @selectedValue="selectedValue"
          >
          </color-picker>
      </span>
    </span>
</template>

<script>
    import colorPicker from "../components/colorPicker.vue";
    import selectPicker from "@/components/selectPicker";
    export default {
        name: "borderPicker",
        components:{colorPicker, selectPicker},
        props:{
          pType:{
              type: String,
              required: true
          },
          currentValues: {
                type: Object,
                required: true
           },
        },
        mounted(){
            if(this.currentValues.border=='checked'){
                this.checkbox=true;
            }
            if(typeof(this.currentValues.borderSize)!='undefined'){
                this.borderValue=this.currentValues.borderSize;
            }
        },
        data(){
            return{
                borderLabel: "Border ?",
                borderCheckboxRef:"border",
                borderSizeLabel: "",
                borderValueRef:"borderSize",
                borderColorRef:"borderColor",
                borderSizeOptions: ['thin','medium','thick'],
                checked:false,
                items: ['thin','medium','thick'],
                borderValue:'',
                borderSelected:false
            }
        },
        methods:{
            borderSelectedChanged(){
              if(this.checked){
                this.$emit('configSelected', ['border', 'activated']);
              }else{
                this.$emit('configSelected', ['border', '']);
              }
            },
            configSelected(msg){
                console.log('Border value selected:', msg);
//                this.$emit('selectedValue', ['border', true]);
                this.$emit('configSelected', ['borderSize', msg[1]]);
            },

            selectedValue(msg){
                this.$emit('configSelected', ['borderColor', msg[1]]);
            }
        },
        watch:{
            checkbox: function(){
//                debugger;
                if(!this.checkbox){
                    console.log('checkbox changed', this.checkbox);
                    this.$emit('selectedValue', ['border', false]);
                    this.$emit('selectedValue', ['borderSize', '']);

                }
            },
          currentValues: function(){
            if(this.currentValues['borderInclude']=='checked'){
              this.checked = true;
              this.borderValue = this.currentValues['borderSize']

            }
          }
        }
    }
</script>

<style scoped>
    .borderPickerWrapper{
        display:grid;
        grid-template-rows: 100%;
        grid-template-columns: 20% 40% 35%;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: left;
        color: #2c3e50;
    }
    .selectThick {
      margin-top: 5px;
    }
    .pickers{
        margin-top: 8px;
    }

</style>
