<template>
    <span class="borderPickerWrapper">

        <o-checkbox @input="borderSelected" v-model="checked">{{borderLabel}}</o-checkbox>

      <span v-if="checked" class="selectThick">
        <o-select placeholder="Select Thickness" size="small" rounded>
          <option value="thin">Thin</option>
          <option value="medium">Medium</option>
          <option value="thick">Thick</option>
        </o-select>
      </span>
      <span v-if="checked" class="pickers">
          <color-picker
                  :currentValues="currentValues"
                  :pType="pType"
                  @selectedValue="selectedValue"
          >
          </color-picker>
      </span>
    </span>
</template>

<script>
    import colorPicker from "../components/colorPicker.vue";
    export default {
        name: "borderPicker",
        components:{colorPicker},
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
                borderValueRef:"borderSize",
                borderSizeOptions: ['thin','medium','thick'],
                checked:false,
                items: ['thin','medium','thick'],
                borderValue:'',
                borderSelected:false
            }
        },
        methods:{
            valueSelected(msg){
                console.log('Border value selected:', msg);
                this.$emit('selectedValue', ['border', true]);
                this.$emit('selectedValue', ['borderSize', msg]);
            },

            selectedValue(msg){
                this.$emit('selectedValue', ['borderColor', msg[1]]);
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
            }
        }
    }
</script>

<style scoped>
    .borderPickerWrapper{
        display:grid;
        grid-template-rows: 100%;
        grid-template-columns: 20% 35% 35%;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: left;
        color: #2c3e50;
    }
    .selectThick {
      margin-top: 5px;
      margin-right: 5;
    }
    .pickers{
        margin-top: 8px;
    }

</style>
