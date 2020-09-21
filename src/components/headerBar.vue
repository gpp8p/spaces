<template>
    <div class="hdrBarDiv">
        <span class="contextArea"><context-area :layout="nextLayout"></context-area></span>
        <span class="tabArea">
            <menu-component :items='menuItems' :selected-item="this.selectedMenuItem" @menuSelection="tabSelected"></menu-component>
            <span class="messageArea">{{this.message}}</span>
        </span>
        <span class="loginArea"><login-component @login="login" @newLayout="newLayout" @logError="logError"></login-component></span>

    </div>

</template>

<script>
    import menuComponent from "../components/menuComponent.vue";
    import loginComponent  from "./loginComponent";
    import contextArea from "../components/contextArea.vue";
    export default {
        name: "headerBar",
        props:{
        },
        data(){
          return {
            menuItems: [],
            selectedMenuItem:-1,
            message:'',
//            menuItemsView: ['Info', 'Comments','Test'],
//            menuItemsAuthor: ['Edit','Delete', 'Publish', 'Comments','Test'],
//            menuItemsAdmin: ['Edit','Delete', 'Publish', 'Create', 'Child Pages', 'Comments','Test'],
            nextLayout:0,
            topPerm:0,
            VIEW_PERM:1,
            AUTHOR_PERM:2,
            ADMIN_PERM:3,
            layoutPerms:{},
            viewContext:0,
            VIEW_VIEWING:0,
            VIEW_EDITING:1,
            VIEW_NEWCARD:2,

              WAITINGFORCLICK:0,
              TOPLEFTCLICKED:1,
              BOTTOMRIGHTCLICKED:2,
              SELECTAREAOK:3,
              WAITINGFORNAME:4,
              WAITINGFORTYPE:5,
              WAITINGFORSUBMIT:6,
              WAITINGTOSAVE:8,
              CANCELLAYOUTUPDATE:7,
              CARDBEINGCONFIGED:8,
          }
        },
        created() {
            this.$eventHub.$on('layoutChanged', this.layoutChanged);
            this.$eventHub.$on('editStatusChanged', this.editStatusChanged);
        },
        beforeDestroy(){
            this.$eventHub.$off('layoutChanged');
            this.$eventHub.$off('editStatusChanged');
        },
        components: {menuComponent, loginComponent, contextArea},
        methods:{
            tabSelected(msg){
                this.$emit('tabSelected', msg[0]);
            },
            login(msg){
//                debugger;
                this.layoutChanged();
                this.$emit('login', [msg[0]]);
            },
            newLayout(msg){
              console.log('newLayout',msg);
              this.nextLayout=parseInt(msg[0]);
            },
            logError(msg){
                this.$emit('logError', msg);
            },
            editStatusChanged(msg){
//                debugger;
                console.log(msg);
                switch(msg[0]){
                    case 'openEdit':{
                        this.viewContext=this.VIEW_EDITING;
                        break;
                    }
                    case 'cancelEdit':{
                            this.message = '';
                            this.viewContext=this.VIEW_VIEWING;
                        break;
                    }
                    case 'newCard':
                        switch(msg[1]){
                            case this.WAITINGFORCLICK:
//                                debugger;
                                this.message = "Please identify top right corner of card by clicking on an empty tile";
                                break;
                            case this.TOPLEFTCLICKED:
                                this.message = ""
                        }
                        break;
                }
                this.menuItems=this.getMenuItems();
            },
            getMenuItems(){
//                debugger;
                if(this.viewContext==this.VIEW_VIEWING){
                    if(this.topPerm==this.VIEW_PERM){
                        return ['Info', 'Comments','Test'];
                    }else if(this.topPerm==this.AUTHOR_PERM){
                        return ['Edit','Delete', 'Publish', 'Comments','Test'];
                    }else if((this.topPerm==this.ADMIN_PERM)){
                        return ['Edit','Delete', 'Publish', 'Create', 'Child Pages', 'Comments','Test'];
                    }
                }else if(this.viewContext==this.VIEW_EDITING){
                    return ['New Card', 'Save', 'Cancel Edit'];
                }

            },
            layoutChanged(){
                console.log('layoutChanged');
                this.layoutPerms = this.$store.getters.getPerms;
                if(this.layoutPerms.view) this.topPerm=this.VIEW_PERM;
                if(this.layoutPerms.author) this.topPerm=this.AUTHOR_PERM;
                if(this.layoutPerms.admin) this.topPerm=this.ADMIN_PERM;
                this.menuItems=this.getMenuItems();
/*
                switch(this.topPerm){
                    case this.VIEW_PERM:
                        this.menuItems = this.menuItemsView;
                        break;
                    case this.AUTHOR_PERM:
                        this.menuItems = this.menuItemsAuthor;
                        break;
                    case this.ADMIN_PERM:
                        this.menuItems = this.menuItemsAdmin;
                        break;
                }
*/
            }
        }
    }
</script>

<style scoped>
    .hdrBarDiv {
        display: grid;
        grid-template-columns: 18% 59.5% 18%;
        grid-template-rows: 7vh;
        grid-column-gap: 2%;
        height: 100%;
    }
    .contextArea{
        background-color: #ffcd90;
        color:white;
        height: 100%;
    }
    .tabArea {
        display:grid;
        grid-template-rows: 50% 50%;
        background-color: #ffcd90;
        color:white;
        height: 100%;
    }
    .messageArea{
        display: flex;
        justify-content: center;
        color:blue;
    }
    .loginArea {
        background-color: #ffcd90;
        color:blue;
        height: 100%;
    }

</style>
