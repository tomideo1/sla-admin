<template>
  <div
    class="d-flex mb-1"
    :class="position == 'right' ? 'justify-content-end mb-2 mt-2' : ''"
  >
    <div
      :class="position == 'right' ? 'right' : 'chat'"
      :style="{ float: `${position}` }"
    >
      <span class="flex-inline flex-column message  p-2">
        <span v-if="position !== 'right'" class="name text-bold ">{{
          chat.username
        }}</span>
        <div style="display: inline;">
          <span style="word-break: break-all;">{{ chat.message }}</span>
        </div>
      </span>
      <div class="text-grey-500 text-align-right">
        <small style="font-size: 9px">{{ chat.createdAt | chatTime }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "chatBubble",
  props: {
    chat: {
      type: Object,
      required: true
    },
    message: {
      type: String
    }
  },
  computed: {
    ...mapState("auth/", ["user"]),
    position() {
      let res;
      if (this.chat.id == this.user._id || this.chat.admin == this.user._id) {
        res = "right";
      } else {
        res = "left";
      }
      return res;
    }
  }
};
</script>

<style lang="scss" scoped>
.chat {
  max-width: 75vw;
  display: inline-block;
  position: relative;

  .message {
    background: #ecf0f3;
    border-radius: 5px;
    width: 400px;
  }

  &:before {
    content: "";
    width: 0px;
    height: 0px;
    display: block;
    border-left: 5px solid transparent;
    border-right: 5px solid #ecf0f3;
    border-top: 5px solid #ecf0f3;
    border-bottom: 5px solid transparent;
    position: absolute;
    top: 0px;
    left: -3px;
  }
}

.right {
  max-width: 75vw;
  display: inline-block;
  position: relative;

  .message {
    background-color: #0087db;
    color: #ffffff;
    border-radius: 5px;
    width: 400px;
  }
}
.flex-inline {
  display: inline-flex;
}
.flex-column {
  flex-direction: column !important;
}
</style>
