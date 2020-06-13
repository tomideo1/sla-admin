<template>
  <div>
    <beat-loader
      class="loader m-3"
      :color="'#0087db'"
      :loading="!isLoaded"
      :size="30"
      :sizeUnit="'px'"
    ></beat-loader>
    <d-container fluid class="main-content-container" v-if="isLoaded">
      <top heading="Assign Participants" />
      <d-row>
        <div class="col-md-2 col-lg-2 col-12">
          <d-row class="m-3 text-center">
            <div
              class="mb-3 col-md-12 col-lg-12 col-12  align-items-center justify-content-center d-flex flex-column   "
            >
              <sla-avatar
                v-if="user.admin.image === null"
                size="xl"
                class="mb-3"
                :user="{ name: user.admin.first_name }"
              />
              <sla-avatar
                v-else
                size="xl"
                :user="{ image: user.admin.image }"
                class="mb-3"
              />
              <h6 class="font-weight-bold text-black   font-open-sans ">
                {{ user.admin.first_name + " " + user.admin.last_name }}
              </h6>

              <p class="text-grey font-open-sans">
                <span><icon size="sm" name="location"/></span>
                {{ user.admin.location }}
              </p>
              <sla-button
                type="filled"
                size="md"
                text="ASSIGN PARTICIPANTS"
                class="btn  w-100 text-center "
              />
            </div>
          </d-row>
        </div>
      </d-row>
    </d-container>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store/index";
const token = store.state.auth.token;
export default {
  name: "single",
  data() {
    return {
      isLoaded: false,
      user: null
    };
  },
  components: {
    top: () => import("@/components/top"),
    avatar: () => import("@/components/avatar.vue"),
    SlaButton: () => import("@/components/SlaButton.vue"),
    SlaAvatar: () => import("@/components/avatar.vue"),
    Icon: () => import("@/components/SlaIcon.vue"),
    Course: () => import("@/components/courseCard.vue")
  },
  methods: {},
  async mounted() {
    const userId = this.$route.params.id;
    const self = this;
    let res = axios
      .get(`${process.env.VUE_APP_API}/admin/admins/` + userId, {
        headers: {
          Authorization: `Bearer ${token} `
        }
      })
      .then(res => {
        self.user = res.data.data;
        self.isLoaded = true;
      })
      .catch();
  }
};
</script>

<style scoped lang="scss">
$bv-primary: #0087db;
.rank {
  height: 26px;
  width: 45px;
  border: 1px solid $bv-primary;
  border-radius: 5px;
  font-size: 12px;
  padding: 20px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}

.flip {
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 0;
  border: 1px solid $bv-primary;

  border-top-left-radius: 0;
  margin-left: -1px;
}

.greet {
  font-size: 24px;
}
.alert {
  margin-right: 22px;
  border-radius: 5px;
  font-size: 12px;
}

.x-flow {
  &::-webkit-scrollbar {
    display: none;
  }
  & > :not(:last-child) {
    margin-right: 12px !important;
  }
  & > *:last-child {
    padding-right: 12px !important;
  }
}
.overflow-y-auto {
  overflow-y: auto !important;
}

.overflow-x-auto {
  overflow-x: auto;
}

.overflow-hidden {
  overflow: hidden !important;
}
</style>
