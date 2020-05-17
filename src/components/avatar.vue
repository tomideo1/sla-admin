<template>
  <div>
    <div
      :class="`avatar avatar-${size}`"
      :style="{ background: avatarBackground }"
    >
      <img v-if="user.image" :src="user.image" alt="avatar" />
      <div v-else class="text-center ">
        <span>{{ user.name | userLetter }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// The `BvAvatar` component is used to display user profile pictures.
// This component allows the user to dynamically size it, add responsive images and a username as fallback for when no image is provided.
// A tile variation is available for displaying an avatar without an image provided using the username.
export default {
  name: "avatar",
  props: {
    // user name or image
    user: {
      type: Object,
      required: true,
      validator: value => !!value.image || !!value.name
    },
    // the size of the avatar
    size: {
      // `'xs'` / `'sm'` / `'md'` / `'lg'` / `'xl'`
      type: String,
      default: "sm",
      validator: value => {
        return ["xs", "sm", "md", "lg", "xl"].indexOf(value) !== -1;
      }
    }
  },
  computed: {
    avatarBackground: () => {
      const backgroundColors = [
        "#F27979",
        "#79DBF2",
        "#F2A879",
        "#F279DB",
        "#79B5F2"
      ];
      const num = Math.floor(Math.random() * backgroundColors.length);
      return backgroundColors[num];
    }
  },
  filters: {
    userLetter(value) {
      if (!value) return "";
      return value[0];
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  margin: 0;
  color: color(bv-white);
  border-radius: 50%;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;
  &::before {
    content: "";
  }
  img {
    border-radius: 50%;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  &.avatar-xs {
    height: 1rem !important;
    width: 1rem !important;
    font-size: calc(0.8rem - 4px);
  }
  &.avatar-sm {
    height: 1.5rem !important;
    width: 1.5rem !important;
    font-size: 0.8rem;
  }
  &.avatar-md {
    height: 2rem !important;
    width: 2rem !important;
    font-size: 1rem;
  }
  &.avatar-lg {
    height: 3rem !important;
    width: 3rem !important;
    font-size: 2rem;
  }
  &.avatar-xl {
    height: 6.5rem !important;
    width: 6.5rem !important;
    font-size: 2.5rem;
  }
}
</style>
