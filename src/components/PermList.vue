<template>
    <span class="permListContainer">
     <span v-if="this.view==this.PERMS" >
        <perm-list-header></perm-list-header>
        <perm-list-line v-for="(perm, index) in currentPerms "
                        :key="index"
                        :groupId="perm.id"
                        :layoutId="layoutId"
                        :groupDescription="perm.description"
                        :viewValue="perm.view"
                        :authorValue="perm.author"
                        :adminValue="perm.admin"
                        :opt1Value="perm.opt1"
                        :opt2Value="perm.opt2"
                        :opt3Value="perm.opt3"
                        :selectedId="selectedGroupId"
                        @groupClicked="groupClicked"></perm-list-line>

        </span>
        <span v-if="this.view==this.GROUP_INFO">
            <group-member-header></group-member-header>
            <group-member-line v-for="(member, index) in  groupMembers"
                               :key="index"
                               :name="member.name"
                               :email="member.email"
                               :id="member.id"
                               @memberSelected="memberSelected"

            ></group-member-line>
        </span>
        <span v-if="this.view==this.GROUP_LIST">
          <group-list-header></group-list-header>
          <group-list-line v-for="(group, index) in  groups"
                           :key="index"
                           :groupId="group.id"
                           :groupDescription="group.description"
                           @groupClicked="groupSelected"
          ></group-list-line>
        </span>
      </span>
</template>

<script>
import axios from "axios";
//import store from "../store";
import PermListLine from "./permListLine.vue";
import PermListHeader from "./permListHeader.vue";
import GroupMemberLine from "./GroupMemberLine.vue";
import GroupMemberHeader from "./GroupMemberHeader";
import groupListHeader from "./groupListHeader.vue";
import groupListLine from "./groupListLine.vue";
import GroupListHeader from "@/components/groupListHeader";
import GroupListLine from "@/components/groupListLine";

export default {
name: "PermList",
  components: {GroupListLine, GroupListHeader, PermListLine, PermListHeader, GroupMemberLine, GroupMemberHeader, groupListHeader, groupListLine},
  props:{
    selectedMenuOption: {
      type: String,
      required: true
    },
    dialogKey:{
      type: Number,
      required:true
    }
  },
  watch:{
    selectedMenuOption: function(){
      console.log('permList selectedMenuOption watcher triggered');
      this.openMenuOption = this.selectedMenuOption;
      switch(this.selectedMenuOption){
        case 'Back':{
          this.currentMenu = this.topMenu;
          this.currentMenuActiveOption = 'Done';
          this.layoutId = this.$store.getters.getCurrentLayoutId;
          this.reloadLayoutPerms();
          this.view=this.PERMS;
          this.$emit('setTitle', 'Who Can Access This Space');
          this.$emit("componentSettingsMounted",[this.currentMenu,this.currentMenuActiveOption]);
          break;
        }
        case "Add Group":{
          debugger;
          this.getOrgGroups(this.orgId, this.layoutId);
          break;
        }
      }
    }
  },
  data(){
    return {
      currentMenu: [],
      currentMenuActiveOption:'',
      openMenuOption:'',

      PERMS:0,
      GROUP_INFO:1,
      NEW_GROUP:2,
      FIND_MEMBER:3,
      ADD_NEW_MEMBER:4,
      ADD_USER_TO_GROUP:5,
      ORGANIZATION_GROUPS:6,
      GROUP_LIST:7,

      NEW_USER:1,
      SELECT_USER:0,

      currentPerms: [],
      groupMembers: [],
      groups:[],
      OrganizationGroups: [],
      adminUserSelect:0,
      allUserRefresh:0,
      selectedGroupId:0,
      view:0,
      layoutId:'',
      isGroupAdmin:false,
      orgId: this.$store.getters.getOrgId,

      topMenu: ['Add Group', 'Done'],
      adminGroupMenu: ['Add','Delete','Back','Done'],
      groupMenu:['Back', 'Done']


    }
  },
  mounted(){
    debugger;
    this.currentMenu = this.topMenu;
    this.currentMenuActiveOption = 'Done';
    this.layoutId = this.$store.getters.getCurrentLayoutId;
    this.reloadLayoutPerms();
    this.$emit('setTitle', 'Who Can Access This Space');
    this.$emit("componentSettingsMounted",[this.currentMenu,this.currentMenuActiveOption]);
  },

  methods:{
    reloadLayoutPerms(){
      axios.get('http://localhost:8000/api/shan/layoutPerms?XDEBUG_SESSION_START=14668', {
        params:{
          orgId:this.$store.getters.getOrgId,
          userId:this.$store.getters.getLoggedInUserId,
          layoutId:this.layoutId
        }
      })
          .then(response => {
// eslint-disable-next-line no-debugger
            // JSON responses are automatically parsed.
                               debugger;
            this.currentPerms = response.data;
            console.log(this.currentPerms);
          })
          .catch(e => {
            this.errors.push(e);
            console.log('viewableLayouts failed');
          });
    },

    getOrgGroups(orgId, layoutId){
      debugger;
      axios.get('http://localhost:8000/api/shan/orgGroups?XDEBUG_SESSION_START=14668', {
        params:{
          orgId: orgId,
          layoutId:layoutId
        }
      })
          .then(response => {
// eslint-disable-next-line no-debugger
            // JSON responses are automatically parsed.
//            debugger;
            console.log(response);
            this.groups=response.data;
            this.view=this.GROUP_LIST;



          })
          .catch(e => {
            this.errors.push(e);
            console.log('groupMembers failed');
          });
    },

    getGroupMembers(groupId){
//              debugger;
      axios.get('http://localhost:8000/api/shan/groupMembers?XDEBUG_SESSION_START=14668', {
        params:{
          groupId: groupId
        }
      })
          .then(response => {
// eslint-disable-next-line no-debugger
            // JSON responses are automatically parsed.
//                      debugger;
            console.log('getGroupMembers', response.data);
            this.groupMembers=response.data.members;
            this.isGroupAdmin = response.data.groupAdmin;
            this.$emit('setTitle', 'Group Membership:'+response.data.groupDescription);
            this.view=this.GROUP_INFO;
            if(this.isGroupAdmin){
              this.currentMenu = this.adminGroupMenu;
              this.currentMenuActiveOption = 'Done';
              this.$emit("componentSettingsMounted",[this.adminGroupMenu,'Done']);
            }else{
              this.currentMenu = this.groupMenu;
              this.currentMenuActiveOption = 'Done';
              this.$emit("componentSettingsMounted",[this.groupMenu,'Done']);
            }


          })
          .catch(e => {
            this.errors.push(e);
            console.log('groupMembers failed');
          });
    },
    groupClicked(msg){
      console.log('groupClicked',msg);
      this.getGroupMembers(msg[0][0]);
    }

  }

}
</script>

<style scoped>

</style>
