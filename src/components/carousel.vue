<template>
  <div
    class="scrolling-wrapper"
    :is="tag"
    v-bind="$attrs"
    v-on="$listeners"
    :ref="refs"
  >
    <div
      class="nav-circle"
      slot="prev"
      style="position: absolute; left: 0%; top: 40%;  "
    >
      <span class="prev">
        <icon
          name="arrow-right"
          size="lg"
          style="transform: rotate(180deg);"
          @click="swipeLeft(refs)"
        />
      </span>
    </div>
    <slot />
    <div
      class="nav-circle "
      slot="next"
      style="position: absolute; right: 0%; top: 40%;"
    >
      <span class="next">
        <icon name="arrow-right" size="lg" @click="swipeRight(refs)" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "carousel",
  props: {
    /**
     * Element tag type.
     */
    tag: {
      type: String,
      default: "div"
    },
    refs: {
      type: String
    }
  },
  components: {
    Icon: () => import("@/components/SlaIcon")
  },
  methods: {
    scrollTo(element, scrollPixels, duration) {
      const scrollPos = element.scrollLeft;
      // Condition to check if scrolling is required
      if (
        !(
          (scrollPos === 0 || scrollPixels > 0) &&
          (element.clientWidth + scrollPos === element.scrollWidth ||
            scrollPixels < 0)
        )
      ) {
        // Get the start timestamp
        const startTime =
          "now" in window.performance
            ? performance.now()
            : new Date().getTime();

        let scroll = timestamp => {
          //Calculate the timeelapsed
          const timeElapsed = timestamp - startTime;
          //Calculate progress
          const progress = Math.min(timeElapsed / duration, 1);
          //Set the scrolleft
          element.scrollLeft = scrollPos + scrollPixels * progress;
          //Check if elapsed time is less then duration then call the requestAnimation, otherwise exit
          if (timeElapsed < duration) {
            //Request for animation
            window.requestAnimationFrame(scroll);
          } else {
            return;
          }
        };
        //Call requestAnimationFrame on scroll function first time
        window.requestAnimationFrame(scroll);
      }
    },

    swipeLeft(ref) {
      const content = this.$refs[ref];
      this.scrollTo(content, -300, 800);
    },
    swipeRight(ref) {
      const content = this.$refs[ref];
      this.scrollTo(content, 300, 800);
    }
  }
};
</script>

<style scoped lang="scss">
.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;

  .scroll {
    display: inline-block;
  }
}
.scrolling-wrapper-flexbox {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;

  .scroll {
    flex: 0 0 auto;
  }
}
.scrolling-wrapper {
  -webkit-overflow-scrolling: touch;
}
.scrolling-wrapper {
  &::-webkit-scrollbar {
    display: none;
  }

  .nav-circle {
    background: #ffffff;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    z-index: 100 !important;
  }
}
</style>
