<template>
  <d-card class="card-small mb-3">
    <d-card-body>
      <d-form class="add-new-post">
        <d-input size="lg" class="mb-3" placeholder="Course Title" />
        <div ref="editor" class="add-new-post__editor mb-1"></div>
      </d-form>
    </d-card-body>
  </d-card>
</template>

<script>
import Quill from "quill";
import quillEmij from "quill-emoji/dist/quill-emoji";

export default {
  name: "editor",
  mounted() {
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
    new Quill(this.$refs.editor, {
      modules: {
        toolbar: toolbarOptions,
        "emoji-toolbar": true,
        "emoji-textarea": true,
        "emoji-shortname": true
      },
      placeholder: "SheLeads Africa...",
      theme: "snow"
    });
  }
};
</script>
