<template>
  <q-page>
    <div class="row">
      <!-- BUTTON BATAL -->
      <div class="col-2 text-center self-cemter q-pt-lg">
        <q-btn
          no-caps
          :disable="loadingAddModuleContent"
          outline
          flat
          text-color="black"
          label="Batal"
          @click="$router.back()"
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
            <q-card
              flat
              style="border: 1px solid grey; background-color: transparent"
            >
              <!-- JIKA BELUM ADA THUMBNAIL -->
              <div v-if="!thumb64" class="row q-py-md" @click="goToFileThumb()">
                <div class="col-3 self-center">
                  <q-img src="~/assets/gng.svg" width="25%" />
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
                  <div><q-img src="~/assets/gng.svg" width="25%" /></div>
                  <div class="text-weight-medium q-py-sm">ganti thumbnail</div>
                </div>
              </div>
            </q-card>
            <q-card
              flat
              class="q-py-xl q-mt-md"
              style="border: 1px solid grey; background-color: transparent"
            >
              <!-- JIKA BELUM ADA GAMBAR -->
              <div @click="goToFilePic()" v-if="!picture">
                <br />
                <br />
                <br />
                <br />
                <div>
                  <q-img src="~/assets/gng.svg" width="10%" />
                </div>
                <div class="text-h6 text-weight-medium">Tambah Gambar</div>
                <div style="color: #6e6d8f text-weight-medium">
                  1600 x 1200 atau direkomendasikan menggunakan resolusi yang
                  lebih besar.Max 10MB
                </div>
                <br />
                <br />
                <br />
                <br />
              </div>
              <!-- JIKA SUDAH ADA GAMBAR -->
              <div class="row" v-if="!!picture">
                <div class="col-6">
                  <div class="row">
                    <div class="col-10 text-center">
                      <q-img :src="img64" width="60%" />
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
                        @click="clearImage()"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-6" @click="clearImage()">
                  <div><q-img src="~/assets/gng.svg" width="25%" /></div>
                  <div class="text-weight-medium q-py-sm">ganti gambar</div>
                </div>
              </div>
            </q-card>
            <q-input
              class="q-mt-md"
              outlined
              style="background-color: transparent"
              label="Tambahkan Judul"
              v-model="content.tittle"
              :rules="[(v) => !!v || 'Judul tidak boleh kosong']"
            />
            <q-editor
              class="q-mt-md"
              outlined
              style="background-color: transparent"
              label="Isi Submateri"
              v-model="content.description"
              min-height="5rem"
              :rules="[(val) => !!val.length || 'Deskripsi tidak boleh kosong']"
            />
            <q-input
              class="q-mt-md q-mb-md"
              outlined
              type="number"
              style="background-color: transparent"
              label="Durasi Baca"
              v-model.number="content.duration"
              :rules="[(v) => !!v || 'Durasi tidak boleh kosong']"
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
          no-caps
          :loading="loadingAddModuleContent"
          :disable="loadingAddModuleContent"
          flat
          text-color="white"
          label="Simpan"
          @click="saveContent()"
          style="background-color: #5e5eef; width: 80%"
        />
      </div>
    </div>
    <!-- Thumbnail -->
    <q-file
      ref="addImagesThumb"
      v-model="thumbnail"
      @update:model-value="previewImagesThumb"
      v-show="false"
      accept="image/*"
    ></q-file>

    <!-- image -->
    <q-file
      ref="addImagesPic"
      v-model="picture"
      @update:model-value="previewImagesPic"
      v-show="false"
      accept="image/*"
    ></q-file>

    <!-- Dialog success add module content -->
    <q-dialog v-model="dialogSuccessAddModuleContent" persistent>
      <q-card
        class="q-pa-md justify-center bg-white full-width"
        style="border-radius: 10px"
      >
        <div class="row text-center justify-center">
          <q-img
            no-spinner
            src="~/assets/success-animation.gif"
            width="200px"
          ></q-img>
        </div>
        <div
          class="q-mt-sm row justify-center text-center text-weight-bold"
          style="color: #51585a; font-size: 20px"
        >
          Berhasil menambah isi module
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { fileToBase64 } from "src/helper";
import { base64ToFile } from "src/helper";
import { jsonToFormData } from "src/helper";
import CropImageComponent from "src/components/CropImageComponent";
export default {
  props: ["id"],
  data() {
    return {
      dialogSuccessAddModuleContent: false,
      loadingAddModuleContent: false,
      thumb64: null,
      picture: null,
      img64: null,
      thumbnail: null,
      content: {
        tittle: "",
        module_id: null,
        description: "",
        duration: null,
        thumbnail: null,
        image_content: null,
        type: "Materi",
      },
    };
  },
  methods: {
    clearImage() {
      this.picture = null;
      this.img = null;
    },
    clearThumbnail() {
      this.thumbnail = null;
      this.thumb64 = null;
    },
    goToFileThumb() {
      this.$refs.addImagesThumb.pickFiles();
    },
    goToFilePic() {
      this.$refs.addImagesPic.pickFiles();
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
            let file = base64ToFile(data.dataUrl, "thumbnail");
            this.thumbnail = file;
          });
      });
    },
    async previewImagesPic(file) {
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
            this.img64 = data.dataUrl;
            let file = base64ToFile(data.dataUrl, "image_content");
            this.picture = file;
          });
      });
    },
    saveContent() {
      // Thumbnail
      this.content.thumbnail = this.thumbnail;
      // Image Content
      this.content.image_content = this.picture;
      // module_id
      this.content.module_id = this.id;

      let formData = jsonToFormData(this.content);

      this.$refs.form.validate().then((valid) => {
        if (valid && this.content.description.length && this.content.image_content) {
          return new Promise((resolve, reject) => {
            this.loadingAddModuleContent = true;
            this.$store
              .dispatch("ModuleContent/addNewModuleContent", formData)
              .then((res) => {
                // console.log("cek hasil res", res);
                resolve(res);
              })
              .catch((err) => {
                reject(err);
              })
              .finally(() => {
                this.loadingAddModuleContent = false;
                this.dialogSuccessAddModuleContent = true;
                setTimeout(this.refreshPage, 2000);
              });
          });
        } else {
          this.$q.notify({
            color: "negative",
            textColor: "white",
            message: "Isi semua data dengan benar",
          });
        }
      });
    },
    refreshPage() {
      this.$router.back();
    },
  },
};
</script>

<style></style>
