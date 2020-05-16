<template>
  <button
    @click="$emit('click', $event)"
    :class="[classes, icon ? iconClass : '']"
    :disabled="disable"
    :style="styles"
  >
    <!-- Button Text -->
    <span v-if="text" class="font-open-sans">
      {{ textProp }}
    </span>
  </button>
</template>
<script>
const sizes = ["xs", "sm", "md", "lg", "xss"];
const types = ["inverse", "filled", "outline", "outline-danger"];

export default {
  name: "BvButton",
  data() {
    return {
      widths: {
        xs: 26,
        xss: 25,
        sm: 34,
        md: 42,
        lg: 48
      }
    };
  },
  props: {
    // The type of the button
    type: {
      // `'inverse'` / `'filled'` / `'outline'`
      type: String,
      default: types[1],
      required: false
    },
    // The size of the button
    size: {
      // `'xs'` / `'sm'` / `'md'` / `'lg'`
      type: String,
      default: sizes[2],
      required: false
    },
    // To set button to be full width
    block: {
      type: Boolean,
      default: false,
      required: false
    },
    icon: {
      type: String,
      required: false
    },
    // The disabled state of the button
    disable: {
      // `'true'` / `'false'`
      type: Boolean,
      default: false,
      required: false
    },
    text: {
      type: String,
      default: ""
    }
  },
  computed: {
    styles() {
      if (!this.text && typeof this.icon != "undefined") {
        return `width: ${
          this.widths[this.size]
        }px; border-radius: 50%; padding: 0;`;
      }
      return false;
    },
    iconClass() {
      let btnBlock = this.block == true ? "btn-block-icon" : "";
      return `${btnBlock}`;
    },
    iconMargin() {
      if (!this.text && typeof this.icon != "undefined") {
        return "mr-0";
      }
      return "mr-4";
    },
    textProp() {
      return this.text.toUpperCase();
    },
    classes() {
      let classes = "";
      classes += sizes.includes(this.size) ? `btn-${this.size} ` : "";
      classes += types.includes(this.type) ? `btn-${this.type} ` : "";
      classes += this.block ? "btn-block" : "";
      return classes.trim();
    },
    iconPosition: function() {
      return this.text != "" && this.block ? { position: "absolute" } : {};
    }
  }
};
</script>

<style scoped lang="scss">
$bv-primary: #0087db;
$bv-danger: #fe4437;
$bv-white: #ffffff;
$bv-grey-200: #c4c4c4;
button,
.btn {
  font-family: "Open Sans";
  display: inline-flex !important;
  justify-content: center !important;
  align-items: center !important;
  border-radius: 5px !important;
  border: 1px solid #0087db !important;
  font-size: 0.9rem !important;
  font-weight: bold !important;
  cursor: pointer !important;
  outline: none !important;
  position: relative !important;
  &.btn-lg {
    height: 48px !important;
    font-size: 1.3rem !important;
    padding: 0 2rem !important;
  }
  &.btn-md {
    height: 42px !important;
    padding: 0 1.5rem !important;
  }
  &.btn-sm {
    height: 34px !important;
    padding: 0 1rem !important;
  }
  &.btn-xs {
    height: 26px;
    padding: 0 0.75rem;
  }
  &.btn-xss {
    height: 20px;
    padding: 0 0.45rem;
  }

  &.btn-inverse {
    color: $bv-primary !important;
    background-color: $bv-white;
    &:hover {
      background-color: $bv-grey-200;
    }
  }

  &.btn-outline {
    border: 1px solid $bv-primary;
    background-color: $bv-white;
    color: $bv-primary;
    &:hover {
      background-color: lighten($bv-primary, 50%);
    }
  }

  &.btn-outline-danger {
    border: 1px solid $bv-danger;
    background-color: $bv-white;
    color: $bv-danger;
    border: 1px solid $bv-danger !important;
    &:hover {
      background-color: lighten($bv-danger, 50%);
    }
  }

  &.btn-filled {
    color: $bv-white !important;
    background-color: $bv-primary !important;
    border: 1px solid $bv-primary !important;
    &:hover {
      background-color: darken($bv-primary, 5%) !important;
      border-color: darken($bv-primary, 5%) !important;
    }
  }

  &:disabled {
    cursor: auto;
    opacity: 0.5 !important;
  }
}

.btn-block {
  width: 100% !important;
  &.btn-lg {
    padding: 0 0 0 calc(2rem / 2) !important;
  }
  &.btn-md {
    padding: 0 0 0 0;
  }
  &.btn-sm,
  &.btn-xs {
    padding: 0 0 0 calc(1rem / 2) !important;
  }
  &-icon {
    display: flex;
    justify-content: flex-start !important;
    border-radius: 50px !important;
    & > :last-child {
      margin: auto;
    }
  }
}
</style>
