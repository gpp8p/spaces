<template>

        <span class="layoutScreen">
          <section class="navbar">
              <header-bar :message="message" @tabSelected="tabSelected" @login="login" @logError="logError"></header-bar>
          </section>
          <section class="content">
              <router-view @layoutChanged="testEmit"></router-view>
          </section>

        </span>


</template>

<script>
  import headerBar from "./components/headerBar.vue";
  import store from './store';



  //    import CContainer from "../components/containerExample.vue";
  //    import menuComponent from "../components/menu.vue";
  //    import configComponent from "../components/configComponent";
  //    import Dtable from "../components/dtable.vue"
  //    import gridLayout from "./gridLayout";
  export default {
    name: 'App',
    store,
    created(){
      var pathArray=this.$route.path.substring(1).split('/');
//    debugger;
      if(pathArray[0].length>0){
        store.commit('setDefaultOrg', pathArray[0]);
      }else{
        store.commit('setDefaultOrg', 'Shannon');
      }

    },
    components: {headerBar},
    data(){
      return {
        openDialog: false,
        message: ''
      }
    },
    methods: {
      tabSelected(msg){
//                debugger;
        switch(msg){
          case 'Edit':{
            debugger;
            this.$router.push({
              name: 'edit',
              params: { layoutId: this.$store.getters.getCurrentLayoutId }
            })


            this.openDialog=false;
            this.$router.push('edit');
            break;
          }
          case 'New Card':{
            this.$eventHub.$emit('editStatusChanged', ['newCard',0]);
            break;
          }
          case 'Cancel Edit':{
            this.$eventHub.$emit('editStatusChanged', ['cancelEdit',0]);
            this.$router.push({
              name: 'displayLayout',
              params: { layoutId: this.$store.getters.getCurrentLayoutId }
            })
            break;
          }
          case 'Table':{
            this.openDialog=false;
            this.$router.push('table');
            break;
          }
          case 'Bar':{
            this.openDialog=false;
            this.$router.push('bar');
            break;
          }
          case 'Dialog':{
            this.openDialog = true;
            break;
          }
        }
      },
      login(msg){
        console.log(msg[0]);
        this.$router.push({
          name: 'displayLayout',
          params: { layoutId: msg[0] }
        });
//                debugger;
      },
      logError(msg){
        console.log(msg);
        this.$router.push({
          name: 'errorPage',
          params: { errorMessage: msg }
        });

      },
      testEmit(msg){
        console.log('router view caught:', msg);
      }
    }
  }
</script>

<style scoped>
  section {

    padding: 0 0%;
    display: table;
    margin: 0;
    height: 98vh;

  }
  .layoutScreen {
    position: relative;
  }
  .content {
    margin-left: 2%;
    margin-top: 2px;
    background-color: #dbddd0;
    height:87vh;
    width:97vw;
    border-radius: 4px;
    border-width: 2px;
    border-style: solid;
    border-color: #0a3aff;
    padding-top: 16px;
    padding-left: 5px;
  }
  .navbar {
    margin-left: 2%;
    background-color: #ffcd90;
    height:8vh;
    width:97vw;
    border-radius: 4px;
    border-width: 2px;
    border-style: solid;
    border-color: #0a3aff;
    text-align: left;
    padding-top: 8px;
    padding-left: 5px;
  }
  #infoi {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  #infoi {
    z-index: 10;
  }
</style>
