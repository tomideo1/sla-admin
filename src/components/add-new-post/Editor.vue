<template>
  <d-form class="add-new-post">
    <div ref="editor" class="add-new-post__editor mb-1"></div>
  </d-form>
</template>

<script>
import Quill from "quill";
import axios from "axios";
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
      editor: "New Sla Content",
      image: null
    };
  },
  mounted() {
    // Init the Quill RTE
    const toolbarOptions = {
      container: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        ["image", "code-block"],

        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["emoji"],
        ["link"]
      ],
      theme: "snow",
      handlers: {
        emoji: function() {},
        link: function(value) {
          if (value) {
            let href = prompt("Enter the URL");
            this.quill.format("link", href);
          } else {
            this.quill.format("link", false);
          }
        },
        image: async function() {
          let fileInput = this.container.querySelector(
            "input.ql-image[type=file]"
          );

          if (fileInput == null) {
            fileInput = document.createElement("input");
            fileInput.setAttribute("type", "file");
            fileInput.setAttribute(
              "accept",
              "image/png, image/gif, image/jpeg, image/bmp, image/x-icon"
            );
            fileInput.classList.add("ql-image");
            fileInput.addEventListener("change", () => {
              const files = fileInput.files;
              const range = this.quill.getSelection(true);

              if (!files || !files.length) {
                console.log("No files selected");
                return;
              }

              const formData = new FormData();
              formData.append("file", files[0]);
              this.quill.enable(false);
              const reader = new FileReader();
              reader.readAsDataURL(files[0]);
              const self = this;
              reader.onload = async () => {
                let encoded = reader.result
                  .toString()
                  .replace(/^data:(.*,)?/, "");
                if (encoded.length % 4 > 0) {
                  encoded += "=".repeat(4 - (encoded.length % 4));
                }
                self.image = "data:image/jpg/gif/png;base64," + encoded;
                axios
                  .post(`${process.env.VUE_APP_API}/files/upload`, {
                    file_to_upload: self.image
                  })
                  .then(res => {
                    this.quill.enable(true);
                    this.quill.editor.insertEmbed(
                      range.index,
                      "image",
                      res.data.link
                    );
                    this.quill.setSelection(
                      range.index + 1,
                      Quill.sources.SILENT
                    );
                    fileInput.value = "";
                  })
                  .catch(ex => {
                    console.log("quill image upload failed");
                    console.log(error);
                    this.quill.enable(true);
                  });
              };
              reader.readAsDataURL(files[0]);
            });
            this.container.appendChild(fileInput);
          }
          fileInput.click();
        }
      }
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

    this.editor.on("text-change", () => this.update());
  },
  methods: {
    update() {
      this.$emit(
        "input",
        this.editor.getText() ? this.editor.root.innerHTML : ""
      );
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
          if (encoded.length % 4 > 0) {
            encoded += "=".repeat(4 - (encoded.length % 4));
          }
          resolve(encoded);
        };
        reader.onerror = error => reject(error);
      });
    }
  }
};
</script>
