<template>
  <span :class="`icon icon-${size}`" v-on="$listeners">
    <home v-if="name === 'home'"></home>
    <activity v-if="name === 'activity'"></activity>
    <courses v-if="name === 'courses'"></courses>
    <announce v-if="name === 'announce'"></announce>
    <group v-if="name === 'group'"></group>
    <leaderboard v-if="name === 'leaderboard'"></leaderboard>
    <scorecard v-if="name === 'scorecard'"></scorecard>
    <survey v-if="name === 'survey'"></survey>
    <asset v-if="name === 'asset'"></asset>
    <faq v-if="name === 'faq'"></faq>
    <logout v-if="name === 'logout'"></logout>
    <search v-if="name === 'search'"></search>
    <bell v-if="name === 'bell'"></bell>
    <message v-if="name === 'message'"></message>
    <setting v-if="name === 'setting'"></setting>
    <pencil v-if="name === 'pencil'"></pencil>
    <bin v-if="name === 'bin'"></bin>
    <left v-if="name === 'left'"></left>
    <add v-if="name === 'add'"></add>
    <plus v-if="name === 'plus'"></plus>
    <camera v-if="name === 'camera'"></camera>
    <headset v-if="name === 'headset'"></headset>
    <thumb v-if="name === 'thumb'"></thumb>
    <gif v-if="name === 'gif'"></gif>
    <vid v-if="name === 'vid'"></vid>
    <eclipse v-if="name === 'eclipse'"></eclipse>
    <arrow-right v-if="name === 'arrow-right'"></arrow-right>
    <arrow-left v-if="name === 'arrow-left'"></arrow-left>
    <arrow-up v-if="name === 'arrow-up'"></arrow-up>
    <arrow-back v-if="name === 'arrow-back'"></arrow-back>
    <cancel v-if="name === 'cancel'"></cancel>
    <poll v-if="name === 'poll'"></poll>
    <medal v-if="name === 'medal'"></medal>
    <share v-if="name === 'share'"></share>
    <copy v-if="name === 'copy'"></copy>
    <resource v-if="name === 'resource'"></resource>
    <location v-if="name === 'location'"></location>
    <video v-if="name === 'video'"></video>
    <empty v-if="name === 'empty'"></empty>
    <fb-like v-if="name === 'fb-like'"></fb-like>
    <comment v-if="name === 'comment'"></comment>
    <smile v-if="name === 'smile'"></smile>
  </span>
</template>
<script>
import Resource from "./resource";
export default {
  props: {
    name: {
      type: String
    },
    size: {
      type: String
    },
    text: {
      type: String
    }
  },
  components: {
    Resource,
    Home: () => import("@/components/__private__/media/home.vue"),
    activity: () => import("@/components/__private__/media/analytics.vue"),
    announce: () => import("@/components/__private__/media/announce.vue"),
    courses: () => import("@/components/__private__/media/courses.vue"),
    leaderboard: () => import("@/components/__private__/media/leaderboard.vue"),
    scorecard: () => import("@/components/__private__/media/score-card.vue"),
    survey: () => import("@/components/__private__/media/survey.vue"),
    group: () => import("@/components/__private__/media/group.vue"),
    asset: () => import("@/components/__private__/media/asset.vue"),
    faq: () => import("@/components/__private__/media/faq.vue"),
    logout: () => import("@/components/__private__/media/logout.vue"),
    search: () => import("@/components/__private__/media/search.vue"),
    bell: () => import("@/components/__private__/media/notification.vue"),
    message: () => import("@/components/__private__/media/message.vue"),
    setting: () => import("@/components/__private__/media/settings.vue"),
    pencil: () => import("@/components/__private__/media/pencil.vue"),
    bin: () => import("@/components/__private__/media/bin.vue"),
    left: () => import("@/components/__private__/media/left.vue"),
    plus: () => import("@/components/__private__/media/plus.vue"),
    Add: () => import("@/components/__private__/media/add.vue"),
    Camera: () => import("@/components/__private__/media/camera.vue"),
    Headset: () => import("@/components/__private__/media/audio.vue"),
    thumb: () => import("@/components/__private__/media/thumb.vue"),
    video: () => import("@/components/__private__/media/video.vue"),
    Gif: () => import("@/components/__private__/media/gif.vue"),
    Bin: () => import("@/components/__private__/media/bin.vue"),
    eclipse: () => import("@/components/__private__/media/eclipse.vue"),
    arrowRight: () => import("@/components/__private__/media/arrow-right.vue"),
    cancel: () => import("@/components/__private__/media/cancel.vue"),
    arrowLeft: () => import("@/components/__private__/media/arrow-left.vue"),
    poll: () => import("@/components/__private__/media/poll.vue"),
    medal: () => import("@/components/__private__/media/medal.vue"),
    share: () => import("@/components/__private__/media/share.vue"),
    copy: () => import("@/components/__private__/media/copy.vue"),
    resource: () => import("@/components/__private__/media/resource.vue"),
    arrowUp: () => import("@/components/__private__/media/arrow-up.vue"),
    arrowBack: () => import("@/components/__private__/media/arrow-back.vue"),
    Location: () => import("@/components/__private__/media/location.vue"),
    Empty: () => import("@/components/__private__/media/empty.vue"),
    FbLike: () => import("@/components/__private__/media/fb-like.vue"),
    comment: () => import("@/components/__private__/media/comment.vue"),
    smile: () => import("@/components/__private__/media/smile.vue")
  }
};
</script>
<style lang="scss">
.icon {
  display: inline-flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  vertical-align: middle;
  font-size: calc(100% + 2px);
  width: 1.5rem;
  height: 1.5rem;
  z-index: 1;
  * {
    display: block;
    max-height: 100%;
    max-width: 100%;
  }
  &-retain {
    width: 100%;
    height: 100%;
  }
  &-lg {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 2rem;
  }
  &-md {
    width: 2rem;
    height: 2rem;
    font-size: 1.5rem;
  }
  &-sm {
    width: 1.5rem;
    height: 1.5rem;
  }
  &-xs {
    width: 1rem;
    height: 1rem;
  }
  &:hover {
    cursor: pointer;
  }
}
</style>
