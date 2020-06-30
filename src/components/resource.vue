<template>
  <div class=" card message" :class="accordionClasses" v-on="$listeners">
    <div
      class="message-header card-header "
      :style="` border-left: 10px solid` + color"
    >
      {{ header }}
      <span>
        <icon
          @click="toggleAccordion"
          name="arrow-up"
          :style="arrpwPos === true ? '' : 'transform: rotate(180deg);'"
          size="sm"
          class="float-right"
        />
      </span>
    </div>
    <div class="message-body">
      <div class="message-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "resource",
  props: ["header", "color"],
  data() {
    return {
      isOpen: false,
      arrpwPos: false
    };
  },
  methods: {
    toggleAccordion: function() {
      this.isOpen = !this.isOpen;
      this.arrpwPos = !this.arrpwPos;
    }
  },
  computed: {
    accordionClasses: function() {
      return {
        "is-closed": !this.isOpen,
        "is-primary": this.isOpen,
        "is-dark": !this.isOpen
      };
    }
  },
  components: {
    Icon: () => import("@/components/SlaIcon")
  }
};
</script>

<style scoped lang="css">
.message {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.message-header {
  cursor: pointer;
  border-top: 1px solid #e7e6e6;
  border-bottom: 1px solid #e7e6e6;
  border-right: 1px solid #e7e6e6;
  border-radius: 5px 0px 0 5px;
}

.message-body {
  padding: 0;
  max-height: 10em;
  overflow: auto;
  transition: 0.3s ease all;
}

.is-closed .message-body {
  max-height: 0;
}

.message-content {
  padding: 20px;
}
</style>
