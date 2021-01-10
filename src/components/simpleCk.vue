<template>
  <div class="dialogComponent" ref="drg"  draggable="false"  @dragstart="handleDragStart" @dragend="handleDragEnd" >
    <div class="dialogComponentHeader">
            <span v-if="this.headerStatus==false">
                <a href="#" class="linkStyle" v-on:click="cancelClicked" >Cancel</a>
                <a v-if="this.viewStatus==this.VIEW_CKEDITOR" href="#" class="linkStyle" v-on:click="linkClicked" >Link to Another Page</a>
                <a href="#" class="linkStyle" v-on:click="saveClicked" >Save</a>
            </span>
      <span v-if="this.headerStatus==true">
                You have made changes - do you want to save them ? <a href="#" class="linkStyle" v-on:click="saveClicked" >Yes</a>  <a href="#" class="linkStyle" v-on:click="cancelClicked2" >No</a>
            </span>
    </div>
    <br/>
    SimpleCk Component
  </div>
</template>

<script>
export default {
name: "simpleCk",
  mounted(){
    this.viewStatus=this.VIEW_CKEDITOR;
  },
  data(){
    return {
//      editorData:this.cardData,
      editorInUse:{},
      VIEW_CKEDITOR:0,
      VIEW_LAYOUT_LIST:1,
      viewStatus:this.VIEW_CKEDITOR,
      forwardToUrl:''
    }
  }
}
</script>

<style scoped>
.ck-editor__editable {
  min-height: 350px;
  max-height:350px;
  min-width:950px;
}
.image {
  display: table;
  clear: both;
  text-align: center;
}
.image-style-side {
  float: right;

}
.image-style-side > img {
  max-width: 100%;
  height: auto;
}
.image-style-align-right {
  float: right;
}
.image-style-align-left {
  float: left;
}


</style>

  <style scoped>
  .dialogComponent {
    height:500px;
    width:1000px;
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

.dialogComponentBody {
  height: 72%;
  margin-left: 10px;
  margin-right: 10px;
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: 15% 15% 15% 15%


}
.linkStyle {
  margin-left: 10px;
  margin-right: 10px;
  color: blue;
  font-family: Geneva;
  font-size: 12px;
  font-style: normal;
  font-weight: bold;

}


</style>
