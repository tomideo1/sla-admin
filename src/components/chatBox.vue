<template>
  <div class="send d-flex justify-content-between align-items-center px-2">
    <div class="d-flex comment flex-row align-items-center chatbox m-3 mr-2  ">
      <span
        @click.exact="pickEmoji($event)"
        ref="emojiPicker"
        class=" text-grey-500 "
      >
        <icon class="" size="lg" name="smile" />
      </span>

      <textarea
        :value="value"
        ref="chatArea"
        @change="emitValue($event)"
        @input="
          emitValue($event);
          resize();
        "
        @keydown.enter.exact="emitEnter"
        placeholder="Type your comment"
        class="text-bold  width-100 text-grey-500  m-2"
        type="text"
      >
      </textarea>
      <div class="comment">
        <button
          @click="$emit('send', $event)"
          class="d-flex justify-content-center send position-sticky"
        >
          <icon size="sm" class="mt-2 ml-1 " name="send" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import EmojiButton from "@joeattardi/emoji-button";
export default {
  props: {
    value: {
      required: false
    }
  },
  data() {
    return {
      picker: ""
    };
  },
  watch: {
    value: function(newVal, oldVal) {
      if (newVal == "") {
        this.$refs.chatArea.style.height = `55px`;
      }
    }
  },
  components: {
    Icon: () => import("@/components/SlaIcon")
  },
  methods: {
    emitEnter(e) {
      e.preventDefault();
      this.$emit("keyup");
    },
    pickEmoji(e) {
      this.picker.togglePicker(this.$refs.emojiPicker);
    },
    emitValue(e) {
      this.$emit("input", e.target.value);
    },
    resize() {
      if (this.$refs.chatArea.value == "") {
        this.$refs.chatArea.style.height = `55px`;
      }
      let h = parseInt(this.$refs.chatArea.scrollHeight, 10);
      if (h < 150) {
        this.$refs.chatArea.style.height = `auto`;
        this.$refs.chatArea.style.height = `${this.$refs.chatArea.scrollHeight}px`;
        return;
      } else if (h > 150) {
        this.$refs.chatArea.style.height = `150px`;
      }
    }
  },
  mounted() {
    this.picker.on("emoji", emoji => {
      let chatArea = this.$refs.chatArea;
      let cursorPosition = chatArea.selectionEnd;
      let currentChat = chatArea.value;
      let start = currentChat.substring(0, chatArea.selectionStart);
      let end = currentChat.substring(chatArea.selectionStart);
      chatArea.value = `${start}${emoji}${end}`;
      chatArea.focus();
      this.$nextTick(() => {
        chatArea.selectionEnd = cursorPosition + emoji.length;
      });
      this.$emit("input", chatArea.value);
    });
  },
  created() {
    this.picker = new EmojiButton({
      autoHide: false,
      position: "top-start",
      showVariants: false,
      rootElement: this.$refs.emojiPicker
    });
  }
};
</script>
<style lang="scss" scoped>
.send {
  .chatbox {
    width: 80%;
    border-radius: 30px;
    background-color: #f4f4f4;

    textarea {
      max-height: 28px;
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
    background-color: color(bv-primary);
    border-radius: 50%;
    height: 48px;
    width: 48px;
    &:focus {
      outline: none;
    }
  }
}
.comment {
  button {
    background-color: #0087db;
    border-radius: 50%;
    border: none;
    height: 43px;
    width: 43px;
    &:focus {
      outline: none;
    }
  }
}
.width- {
  &25 {
    width: 25% !important;
  }
  &50 {
    width: 50% !important;
  }
  &100 {
    width: 100% !important;
  }
  &auto {
    width: auto !important;
  }
  &fit-content {
    width: fit-content !important;
  }
  &fill-screen {
    width: 100vh !important;
  }
}
</style>
