<template>
  <div>
    <div class="details-card d-flex flex-column m-2">
      <div class="image position-relative">
        <img class="object-cover" :src="image" alt="" />
      </div>
      <div class="">
        <span class="text-bold mtruncate truncate-2">
          <p class="font-open-sans course-title m-2">{{ title }}</p></span
        >
      </div>
      <div
        class=" d-flex justify-content-between text-grey"
        :class="[this.completed ? 'mb-1' : '']"
      >
        <span v-if="completed" class="text-bold">Completed</span>
        <icon class="z-index-0 m-2" name="video-icon" />
      </div>
      <sla-progress
        v-if="hasProgress && !completed"
        :percentage="percentage"
        class="mt-1 px-2 mb-2"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: {},
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    hasProgress: {
      type: Boolean,
      default: false
    },
    completed: {
      type: Boolean,
      default: false
    },
    percentage: {
      type: String,
      default: "33.33"
    }
  },
  components: {
    Icon: () => import("@/components/SlaIcon.vue"),
    SlaProgress: () => import("@/components/progress/progress.vue")
  }
};
</script>
<style lang="scss">
.details-card {
  border-radius: 10px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.16);
  width: 222px;
  // height: 196px;

  .image {
    img {
      height: 105px !important;
      width: 100% !important;
      border-top-left-radius: 10px !important;
      border-top-right-radius: 10px !important;
    }
  }
}

a {
  text-decoration: none;
  color: black;

  &:hover {
    color: color(bv-primary);
  }
}
.course-title {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.002em;

  color: #333333;
}

.z-index-1 {
  z-index: 1;
}

.z-index-0 {
  z-index: 0;
}

.z-index-inf {
  z-index: 9399392932993923;
}
/*** Width ************** */
</style>
