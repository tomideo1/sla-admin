<template>
  <d-container fluid class="main-content-container px-4 py-4 mt-4 ">
    <div class="d-flex flex-lg-row flex-column flex-md-row flex-grow-1">
      <div class="mr-4 col-md-3  col-12 col-lg-3">
        <h4 class="m-3 font-open-sans text-black">Messages</h4>
        <message-card
          v-for="dataObj in getCoachGroups"
          :key="dataObj.group._id"
          :dataObj="dataObj"
          @click="
            getGroup(dataObj.group._id);
            currentGroup = dataObj.group;
            groupChats();
            selectItem(dataObj.group._id);
          "
          :class="{ active: dataObj.group._id === activeItem }"
        />
      </div>
      <div
        class=" w-100     border-left shadow-sm "
        style="background: #FAFAFA;!important; min-height:100vh!important;overflow:auto"
      >
        <div class=" nav nav-bar bg-white sticky-top container-fluid p-3">
          <h5
            class="font-open-sans text-dark text-black"
            v-if="currentGroup !== undefined"
          >
            {{ currentGroup.title !== undefined ? currentGroup.title : "" }}
          </h5>
        </div>
        <div class=" d-flex flex-column justify-content-between ">
          <div ref="chatsection" class="section m-2 px-1 chat-content">
            <chat-bubble :key="x._id" v-for="x in chats" :chat="x" />
          </div>
          <div
            class="  bottom-0 z-index-1   py-2 shadow-sm"
            style="background: #FAFAFA;!important; width:100%; position:fixed"
          >
            <chat-box class="w-70" @send="processChat" v-model="chat" />
          </div>
        </div>
      </div>
    </div>
  </d-container>
</template>
<script>
import ably from "@/utils/socket";
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      chat: "",
      chats: [],
      currentGroup: {},
      activeGroup: "",
      activeItem: null
    };
  },
  components: {
    messageCard: () => import("@/components/messageCard"),
    ChatBubble: () => import("@/components/chatBubble"),
    ChatBox: () => import("@/components/chatBox"),
    Top: () => import("@/components/top")
  },
  methods: {
    ...mapActions("app/", [
      "getGroupMessages",
      "getCoachesGroups",
      "sendCoachChat"
    ]),
    getGroup(groupId) {
      return (this.currentGroup = this.getCoachGroups.filter(
        res => res.group._id === groupId
      ));
    },
    selectItem(i) {
      this.activeItem = i;
    },
    async groupChats() {
      let chats = await this.getGroupMessages({
        groupId: this.currentGroup._id
      });
      this.chats = chats;
    },
    processChat() {
      if (this.chat == "") {
        return;
      }
      let chatObject = {
        username: this.user.first_name,
        id: this.user._id,
        message: this.chat,
        groupId: this.currentGroup._id,
        createdAt: Date.now(),
        groupSlug: this.currentGroup.slug
      };

      this.sendCoachChat(chatObject);

      this.chats.push(chatObject);
      this.chat = "";
    }
  },
  async mounted() {
    await this.getCoachesGroups();
    console.log({ hhhh: this.$store.state.user });
    this.currentGroup = this.getCoachGroups[0].group;
    this.groupChats();
  },
  computed: {
    ...mapGetters("app/", ["getCoachGroups"]),
    ...mapState("auth/", ["user"])
  }
};
</script>
<style lang="scss" scoped>
.chat-content {
  height: 100vh;
}
.section {
  & > *:first-child {
    margin-top: 0.5rem;
  }

  & > *:last-child {
    margin-bottom: calc(77.5px + 1rem) !important;
  }
}

.send {
  .chatbox {
    // min-height: 48px;
    width: 100%;
    border-radius: 30px;
    background-color: #f4f4f4;

    .smile {
      bottom: 21px;
    }

    textarea {
      min-height: 48px;
      border-radius: 30px;
      resize: none;
      font-size: 14px;
      background-color: #f4f4f4;
      border: none;
      padding-top: 1rem;
      font-family: "Open sans";
      margin-left: 1.8rem;

      &:focus {
        outline: none;
      }
    }
  }
  button {
    background-color: #0087db;
    border-radius: 50%;
    height: 48px;
    width: 48px;
    &:focus {
      outline: none;
    }
  }
}

.bg-pattern {
  background-color: #e7f6ff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='192' height='192' viewBox='0 0 192 192'%3E%3Cpath fill='%230087db' fill-opacity='0.12' d='M192 15v2a11 11 0 0 0-11 11c0 1.94 1.16 4.75 2.53 6.11l2.36 2.36a6.93 6.93 0 0 1 1.22 7.56l-.43.84a8.08 8.08 0 0 1-6.66 4.13H145v35.02a6.1 6.1 0 0 0 3.03 4.87l.84.43c1.58.79 4 .4 5.24-.85l2.36-2.36a12.04 12.04 0 0 1 7.51-3.11 13 13 0 1 1 .02 26 12 12 0 0 1-7.53-3.11l-2.36-2.36a4.93 4.93 0 0 0-5.24-.85l-.84.43a6.1 6.1 0 0 0-3.03 4.87V143h35.02a8.08 8.08 0 0 1 6.66 4.13l.43.84a6.91 6.91 0 0 1-1.22 7.56l-2.36 2.36A10.06 10.06 0 0 0 181 164a11 11 0 0 0 11 11v2a13 13 0 0 1-13-13 12 12 0 0 1 3.11-7.53l2.36-2.36a4.93 4.93 0 0 0 .85-5.24l-.43-.84a6.1 6.1 0 0 0-4.87-3.03H145v35.02a8.08 8.08 0 0 1-4.13 6.66l-.84.43a6.91 6.91 0 0 1-7.56-1.22l-2.36-2.36A10.06 10.06 0 0 0 124 181a11 11 0 0 0-11 11h-2a13 13 0 0 1 13-13c2.47 0 5.79 1.37 7.53 3.11l2.36 2.36a4.94 4.94 0 0 0 5.24.85l.84-.43a6.1 6.1 0 0 0 3.03-4.87V145h-35.02a8.08 8.08 0 0 1-6.66-4.13l-.43-.84a6.91 6.91 0 0 1 1.22-7.56l2.36-2.36A10.06 10.06 0 0 0 107 124a11 11 0 0 0-22 0c0 1.94 1.16 4.75 2.53 6.11l2.36 2.36a6.93 6.93 0 0 1 1.22 7.56l-.43.84a8.08 8.08 0 0 1-6.66 4.13H49v35.02a6.1 6.1 0 0 0 3.03 4.87l.84.43c1.58.79 4 .4 5.24-.85l2.36-2.36a12.04 12.04 0 0 1 7.51-3.11A13 13 0 0 1 81 192h-2a11 11 0 0 0-11-11c-1.94 0-4.75 1.16-6.11 2.53l-2.36 2.36a6.93 6.93 0 0 1-7.56 1.22l-.84-.43a8.08 8.08 0 0 1-4.13-6.66V145H11.98a6.1 6.1 0 0 0-4.87 3.03l-.43.84c-.79 1.58-.4 4 .85 5.24l2.36 2.36a12.04 12.04 0 0 1 3.11 7.51A13 13 0 0 1 0 177v-2a11 11 0 0 0 11-11c0-1.94-1.16-4.75-2.53-6.11l-2.36-2.36a6.93 6.93 0 0 1-1.22-7.56l.43-.84a8.08 8.08 0 0 1 6.66-4.13H47v-35.02a6.1 6.1 0 0 0-3.03-4.87l-.84-.43c-1.59-.8-4-.4-5.24.85l-2.36 2.36A12 12 0 0 1 28 109a13 13 0 1 1 0-26c2.47 0 5.79 1.37 7.53 3.11l2.36 2.36a4.94 4.94 0 0 0 5.24.85l.84-.43A6.1 6.1 0 0 0 47 84.02V49H11.98a8.08 8.08 0 0 1-6.66-4.13l-.43-.84a6.91 6.91 0 0 1 1.22-7.56l2.36-2.36A10.06 10.06 0 0 0 11 28 11 11 0 0 0 0 17v-2a13 13 0 0 1 13 13c0 2.47-1.37 5.79-3.11 7.53l-2.36 2.36a4.94 4.94 0 0 0-.85 5.24l.43.84A6.1 6.1 0 0 0 11.98 47H47V11.98a8.08 8.08 0 0 1 4.13-6.66l.84-.43a6.91 6.91 0 0 1 7.56 1.22l2.36 2.36A10.06 10.06 0 0 0 68 11 11 11 0 0 0 79 0h2a13 13 0 0 1-13 13 12 12 0 0 1-7.53-3.11l-2.36-2.36a4.93 4.93 0 0 0-5.24-.85l-.84.43A6.1 6.1 0 0 0 49 11.98V47h35.02a8.08 8.08 0 0 1 6.66 4.13l.43.84a6.91 6.91 0 0 1-1.22 7.56l-2.36 2.36A10.06 10.06 0 0 0 85 68a11 11 0 0 0 22 0c0-1.94-1.16-4.75-2.53-6.11l-2.36-2.36a6.93 6.93 0 0 1-1.22-7.56l.43-.84a8.08 8.08 0 0 1 6.66-4.13H143V11.98a6.1 6.1 0 0 0-3.03-4.87l-.84-.43c-1.59-.8-4-.4-5.24.85l-2.36 2.36A12 12 0 0 1 124 13a13 13 0 0 1-13-13h2a11 11 0 0 0 11 11c1.94 0 4.75-1.16 6.11-2.53l2.36-2.36a6.93 6.93 0 0 1 7.56-1.22l.84.43a8.08 8.08 0 0 1 4.13 6.66V47h35.02a6.1 6.1 0 0 0 4.87-3.03l.43-.84c.8-1.59.4-4-.85-5.24l-2.36-2.36A12 12 0 0 1 179 28a13 13 0 0 1 13-13zM84.02 143a6.1 6.1 0 0 0 4.87-3.03l.43-.84c.8-1.59.4-4-.85-5.24l-2.36-2.36A12 12 0 0 1 83 124a13 13 0 1 1 26 0c0 2.47-1.37 5.79-3.11 7.53l-2.36 2.36a4.94 4.94 0 0 0-.85 5.24l.43.84a6.1 6.1 0 0 0 4.87 3.03H143v-35.02a8.08 8.08 0 0 1 4.13-6.66l.84-.43a6.91 6.91 0 0 1 7.56 1.22l2.36 2.36A10.06 10.06 0 0 0 164 107a11 11 0 0 0 0-22c-1.94 0-4.75 1.16-6.11 2.53l-2.36 2.36a6.93 6.93 0 0 1-7.56 1.22l-.84-.43a8.08 8.08 0 0 1-4.13-6.66V49h-35.02a6.1 6.1 0 0 0-4.87 3.03l-.43.84c-.79 1.58-.4 4 .85 5.24l2.36 2.36a12.04 12.04 0 0 1 3.11 7.51A13 13 0 1 1 83 68a12 12 0 0 1 3.11-7.53l2.36-2.36a4.93 4.93 0 0 0 .85-5.24l-.43-.84A6.1 6.1 0 0 0 84.02 49H49v35.02a8.08 8.08 0 0 1-4.13 6.66l-.84.43a6.91 6.91 0 0 1-7.56-1.22l-2.36-2.36A10.06 10.06 0 0 0 28 85a11 11 0 0 0 0 22c1.94 0 4.75-1.16 6.11-2.53l2.36-2.36a6.93 6.93 0 0 1 7.56-1.22l.84.43a8.08 8.08 0 0 1 4.13 6.66V143h35.02z'%3E%3C/path%3E%3C/svg%3E");
}

.position-fixed {
  position: fixed !important;
}
.z-index-1 {
  z-index: 1 !important;
}

.z-index-0 {
  z-index: 0 !important;
}
.bottom-0 {
  bottom: 0 !important;
}
.w-lg-50 {
  width: 50% !important;
}
.w-70 {
  width: 70% !important;
}
.active {
  border: 0.5px solid #0087db;
}
</style>
