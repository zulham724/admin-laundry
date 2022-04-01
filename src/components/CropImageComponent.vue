<template>
  <q-dialog
    v-model="dialogDisable"
    ref="dialog"
    @hide="onDialogHide"
    persistent
  >
    <q-card class="full-width">
      <q-card-section>
        <div class="row text-center">
          <div class="col-2">
            <q-btn round flat v-close-popup>
              <q-avatar square>
                <img src="~/assets/bck.png" style="width: 35%; height: 30%" />
              </q-avatar>
            </q-btn>
          </div>
          <div class="col-8 self-center text-left" text-h5>
            <div class="text-h6 text-weight-bold">Potong</div>
          </div>

          <div class="col-2">
            <q-btn round flat @click.prevent="cropImage">
              <q-avatar>
                <img src="~/assets/ctg.png" style="width: 38%; height: 30%" />
              </q-avatar>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <div class="full-width bg-blue" style="height: 100%">
        <vue-cropper
          class="full-height"
          ref="cropper"
          :aspect-ratio="aspectRatio"
          :src="dataUrl"
        />
        <!-- <img style="width: 100%; height: 100%" :src="sendedImg" /> -->
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
// import vue-cropperjs
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

export default {
  components: { VueCropper },
  props: {
    dataUrl: {
      type: String,
      default: "",
    },
    aspectRatio: {
      type: Number,
      default: null,
    },
  },
  emits: [
    // REQUIRED; need to specify some events that your
    "ok",
    "hide",
  ],

  data() {
    return {
      croppedImg: null,
      dialog: false,
      btnDisable: false,
      dialogDisable: true,
      encodedImage: null,
    };
  },

  mounted() {
    console.log("ini data ur", this.dataUrl);
  },

  methods: {
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      let croppedImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      // console.log("cropped img", croppedImg);
      // this.$emit("crop-photo", croppedImg);
      this.onOKClick(croppedImg);
      //   this.$store.commit("Profile/set_image", { data: this.cropImg });
    },
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.dialog.show();
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit("hide");
    },

    onOKClick(dataUrl) {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit("ok", { dataUrl: dataUrl });
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide();
    },

    onCancelClick() {
      // we just need to hide the dialog
      this.hide();
    },
  },
};
</script>

<style></style>
