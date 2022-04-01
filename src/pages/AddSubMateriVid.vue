<template>
  <q-page>
    <div class="row">
      <!-- BUTTON BATAL -->
      <div class="col-2 text-center self-cemter q-pt-lg">
        <q-btn
          outline
          flat
          text-color="black"
          label="Batal"
          @click="$router.push('/add-materi')"
          style="background-color: #fff; width: 80%"
        />
      </div>
      <div class="col-8 text-center">
        <div class="q-py-lg">
          <div class="text-h4 text-weight-medium">Buat Submateri</div>
          <div style="color: #6e6d8f text-weight-medium">
            Submateri di sesuaikan dengan tema materi
          </div>
        </div>

        <div>
          <q-form ref="form">
            <q-card flat style="background-color: #eef0fc">
              <!-- JIKA BELUM ADA THUMBNAIL -->
              <div v-if="!thumb64" class="row q-py-md" @click="goToFileThumb()">
                <div class="col-3 self-center">
                  <q-img src="~/assets/yt.svg" width="25%" />
                </div>
                <div class="col-9">
                  <div class="text-h6 text-weight-medium">Tambah Thumbnail</div>
                  <div style="color: #6e6d8f text-weight-medium">
                    1600 x 1200 atau direkomendasikan menggunakan resolusi yang
                    lebih besar.Max 10MB
                  </div>
                </div>
              </div>
              <!-- JIKA SUDAH ADA THUMBNAIL -->
              <div v-else class="row q-py-md">
                <div class="col-6">
                  <div class="row">
                    <div class="col-10 text-center">
                      <q-img :src="thumb64" width="60%" />
                    </div>
                    <div class="col-2 self-start">
                      <q-btn
                        style="z-index: 999; margin-left: -35px"
                        dense
                        flat
                        class="bg-white"
                        round
                        size="md"
                        icon="close"
                        @click="thumb64 = null"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-6" @click="clearThumbnail()">
                  <div><q-img src="~/assets/yt.svg" width="25%" /></div>
                  <div class="text-weight-medium q-py-sm">ganti thumbnail</div>
                </div>
              </div>
            </q-card>
            <q-card
              flat
              class="q-py-xl q-mt-md"
              style="background-color: #eef0fc"
            >
              <!-- JIKA BELUM ADA VIDEO -->
              <div @click="goToFilePic()" v-if="!content.video">
                <br />
                <br />
                <br />
                <br />
                <div>
                  <q-img src="~/assets/yt.svg" width="10%" />
                </div>
                <div class="text-h6 text-weight-medium">Tambah Video</div>
                <div style="color: #6e6d8f text-weight-medium">
                  1600 x 1200 atau direkomendasikan menggunakan resolusi yang
                  lebih besar.Max 10MB
                </div>
                <br />
                <br />
                <br />
                <br />
              </div>
              <!-- JIKA SUDAH ADA VIDEO -->
              <div class="row" v-if="content.video">
                <div class="col-6">
                  <div class="row">
                    <div class="col-10 text-center">
                      <vue-plyr
                        ref="plyr"
                        id="plyr"
                        :options="{ ratio: '16:9' }"
                      >
                        <video
                          id="video"
                          ref="video"
                          preload="metadata"
                          :src="`${vid64}#t=0.1}`"
                        ></video>
                      </vue-plyr>
                    </div>
                    <div class="col-2 self-start">
                      <q-btn
                        style="z-index: 999; margin-left: -35px"
                        dense
                        flat
                        class="bg-white"
                        round
                        size="md"
                        icon="close"
                        @click="clearVideo()"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-6" @click="clearVideo()">
                  <div><q-img src="~/assets/yt.svg" width="25%" /></div>
                  <div class="text-weight-medium q-py-sm">ganti gambar</div>
                </div>
              </div>
            </q-card>
            <q-input
              class="q-mt-md"
              outlined
              v-model="content.tittle"
              style="background-color: #eef0fc"
              label="Tambahkan Judul"
              :rules="[(val) => !!val.length || 'Judul tidak boleh kosong']"
            />
            <q-input
              type="textarea"
              class="q-mt-md"
              outlined
              style="background-color: #eef0fc"
              label="Isi Submateri"
              v-model="content.description"
              :rules="[(val) => !!val.length || 'Isi tidak boleh kosong']"
            />
            <q-input
              class="q-mt-md q-mb-md"
              outlined
              type="number"
              style="background-color: #eef0fc"
              label="Durasi Baca"
              v-model.number="content.duration"
            >
              <template v-slot:append>
                <div style="font-size: small">menit</div>
              </template>
            </q-input>
          </q-form>
        </div>
      </div>
      <!-- BUTTON SIMPAN -->
      <div class="col-2 text-center self-cemter q-pt-lg">
        <q-btn
          flat
          text-color="white"
          label="Simpan"
          @click="saveContent()"
          style="background-color: #5e5eef; width: 80%"
        />
      </div>
    </div>
    <q-file
      ref="addImagesThumb"
      v-model="content.thumbnail"
      @update:model-value="previewImagesThumb"
      v-show="false"
      accept="image/*"
    ></q-file>
    <q-file
      ref="addImagesVid"
      v-model="content.video"
      @update:model-value="previewImagesVid"
      v-show="false"
      accept="video/*"
    ></q-file>
  </q-page>
</template>

<script>
import { fileToBase64 } from "src/helper";
import { base64ToFile, video64ToImage64 } from "src/helper";
import CropImageComponent from "src/components/CropImageComponent";
import VideoSnapshot from "video-snapshot";

export default {
  data() {
    return {
      y: true,
      //hanya untuk test
      thumb64: null,
      vid64: null,
      content: {
        tittle: "",
        description: "",
        duration: null,
        thumbnail: null,
        video: null,
      },
    };
  },
  methods: {
    clearVideo() {
      this.content.video = null;
      this.vid64 = null;
    },
    clearThumbnail() {
      this.content.thumbnail = null;
      this.thumb64 = null;
    },
    goToFileThumb() {
      this.$refs.addImagesThumb.pickFiles();
    },
    goToFilePic() {
      this.$refs.addImagesVid.pickFiles();
    },
    async previewImagesThumb(file) {
      let promise = fileToBase64(file);
      promise.then((res) => {
        this.$q
          .dialog({
            component: CropImageComponent,
            componentProps: {
              dataUrl: res.src,
              aspectRatio: 16 / 9,
            },
          })
          .onOk((data) => {
            this.thumb64 = data.dataUrl;
            let file = base64ToFile(data.dataUrl);
            this.content.thumbnail = file;
          });
      });
    },
    async getImageFromVideo() {
      const snapshoter = new VideoSnapshot(this.content.video);
      const previewSrc = await snapshoter.takeSnapshot();
      this.thumb64 = previewSrc;
      this.content.thumbnail = base64ToFile(previewSrc);
    },
    async previewImagesVid(file) {
      console.log("sebelum base 64", file);
      this.content.video = file;
      let promise = fileToBase64(file);
      promise.then((res) => {
        console.log("setelah base 64", res);
        this.vid64 = res.src;
        this.getImageFromVideo();
      });
    },
    saveContent() {
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          console.log(this.content);
          this.content.key = new Date().getTime();
          this.$store.commit("Module/ADD_CONTENT", this.content);
          this.$q.notify({
            color: "positive",
            textColor: "white",
            message: "Content berhasil disimpan",
          });
          this.$router.push("/add-materi");
        }
      });
    },
  },
};
</script>

<style></style>
