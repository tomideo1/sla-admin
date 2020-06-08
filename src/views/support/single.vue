<template>
  <d-container fluid class="main-content-container px-4" v-if="isLoaded">
    <top :heading="Ticket.indicator_num" />
    <Toasts
      :show-progress="false"
      :rtl="false"
      :max-messages="5"
      :time-out="4000"
      :closeable="false"
    ></Toasts>
    <d-row>
      <div class="col-md-7 col-lg-7 col-12">
        <d-form-row class="p-4 mt-4">
          <!-- First Name -->
          <div class="form-group col-md-8 col-lg-8 col-12">
            <label class="text-grey"> Name</label>
            <d-form-input
              type="text"
              :value="Ticket.user.first_name + ' ' + Ticket.user.last_name"
            />
          </div>
          <div class="form-group col-md-8 col-lg-8 col-12">
            <label class="text-grey"> Feedback</label>
            <d-form-textarea
              rows="5"
              v-model="Ticket.feedback"
              :placeholder="Ticket.feedback"
              :readonly="true"
            >
              {{ Ticket.feedback }}
            </d-form-textarea>
          </div>
          <div class="form-group col-md-8 col-lg-8 col-12">
            <label class="text-grey"> Response</label>
            <d-textarea
              rows="5"
              :placeholder="Ticket.response"
              v-model="Ticket.response"
            >
            </d-textarea>
          </div>
        </d-form-row>
        <div class="form-group col-md-6 col-lg-6 col-6">
          <label class="text-grey "> Has the issue been resolved?</label>
          <d-select v-model="Ticket.isResolved">
            <option :selected="Ticket.isResolved" :value="true">
              Yes - Close ticket
            </option>
            <option :value="false">
              No - Leave Ticket Open
            </option>
          </d-select>
        </div>
        <div>
          <sla-button
            type="filled"
            class="btn col-md-6 m-2"
            size="md"
            :disabled="button.isLoading"
            :text="button.text"
            @click="handleSubmit"
          />
        </div>
      </div>
    </d-row>
  </d-container>
</template>

<script>
import Top from "../../components/top";
import store from "@/store/index";
import axios from "axios";

const token = store.state.auth.token;
export default {
  name: "single",
  components: {
    Top,
    slaButton: () => import("@/components/SlaButton")
  },
  data() {
    return {
      isLoaded: false,
      Ticket: null,
      error: {
        status: null,
        message: null
      },
      button: {
        isLoading: false,
        text: "Save"
      }
    };
  },
  methods: {
    async handleSubmit() {
      const self = this;
      self.button.isLoading = true;
      self.button.text = "Loading.....";
      let res = await axios
        .put(
          `${process.env.VUE_APP_API}/help/admin/update/` + this.Ticket._id,
          self.Ticket,
          {
            headers: {
              Authorization: `Bearer ${token} `
            }
          }
        )
        .then(res => {
          self.button.isLoading = false;
          self.button.text = "SAVE";
          self.$toast.success(
            (self.error.message = res.data
              ? res.data.message
              : "An error occured")
          );
          setTimeout(function() {
            self.$router.push({ path: "/support/all" });
          }, 2000);

          this.formData = {};
        })
        .catch(ex => {
          self.button.isLoading = false;
          self.button.text = "SAVE";
          self.$toast.error(
            (self.error.message = ex.response.data
              ? ex.response.data.message
              : "An error occured")
          );
        });
    }
  },
  mounted() {
    this.Ticket = this.$route.params.singleTicket;
    this.isLoaded = true;
  }
};
</script>

<style scoped></style>
