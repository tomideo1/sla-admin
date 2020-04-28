<template>
  <d-card class="card-small mb-3">
    <d-card-body>
      <d-form class="add-new-post">
        <div ref="editor" class="add-new-post__editor mb-1"></div>
      </d-form>
    </d-card-body>
  </d-card>
</template>

<script>
import Quill from "quill";
import quillEmij from "quill-emoji/dist/quill-emoji";
import "quill-emoji/dist/quill-emoji.css";
export default {
  name: "editor",
  props: {
    value: {
      type: String,
      default: ""
    },
    normal_value: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      editor: "New Sla Content"
    };
  },
  mounted() {
    // Init the Quill RTE
    const toolbarOptions = {
      container: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["emoji"]
      ],
      handlers: { emoji: function() {} }
    };

    // Init the Quill RTE
    this.editor = new Quill(this.$refs.editor, {
      modules: {
        toolbar: toolbarOptions,
        "emoji-toolbar": true,
        "emoji-textarea": true,
        "emoji-shortname": true
      },
      placeholder: "SheLeads Africa...",
      theme: "snow"
    });

    this.editor.root.innerHTML = this.value;
    this.editor.root.innerHTML = this.normal_value;

    this.editor.on("text-change", () => this.update());
  },
  methods: {
    update() {
      this.$emit(
        "input",
        this.editor.getText() ? this.editor.root.innerHTML : ""
      );
    }
  }
};
</script>
