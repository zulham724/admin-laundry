<template>
  <q-page>
    <div class="row">
      <!-- BUTTON BATAL -->
      <div class="col-2 text-center self-cemter q-pt-lg">
        <q-btn
          no-caps
          :disable="loadingEditModuleContent"
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
          <div class="text-h4 text-weight-medium">Edit Submateri</div>
          <div style="color: #6e6d8f text-weight-medium">
            Submateri di sesuaikan dengan tema materi
          </div>
        </div>
        <div>
          <q-form ref="form">
            <!-- Thumbnail -->
            <q-card flat style="background-color: #eef0fc">
              <div class="row q-py-md">
                <div class="col-6" style="display: block">
                  <!-- Jika sudah ada gambar di database -->
                  <!-- <div v-if="moduleContentById.thumbnail" class="row col-12">
                    <div class="col-11 self-center" style="display: block">
                      <q-img
                        :src="`${STORAGE_URL}/${moduleContentById.thumbnail.src}`"
                        width="100%"
                        style="border-radius: 5px"
                      />
                    </div>
                    <div class="col-1" style="display: block">
                      <q-btn
                        @click="deleteThumbnail()"
                        style="
                          z-index: 999;
                          color: white;
                          background-color: rgba(0, 0, 0, 0.4);
                        "
                        dense
                        flat
                        round
                        size="md"
                        icon="close"
                      />
                    </div>
                  </div> -->
                  <!-- Jika sudah ada gambar hasil crop -->
                  <div v-if="thumb64" class="row q-py-md">
                    <div class="col-12 self-center" style="display: block">
                      <q-img
                        :src="thumb64"
                        width="100%"
                        style="border-radius: 5px"
                      />
                    </div>
                    <!-- <div class="col-1" style="display: block">
                      <q-btn
                        @click="clearThumbnail()"
                        style="
                          z-index: 999;
                          color: white;
                          background-color: rgba(0, 0, 0, 0.4);
                        "
                        dense
                        flat
                        round
                        size="md"
                        icon="close"
                      />
                    </div> -->
                  </div>
                </div>
                <!-- Ganti thumbnail -->
                <div class="col-6 self-center justify-center row">
                  <q-btn
                    @click="goToFileThumb()"
                    no-caps
                    outline
                    style="background-color: transparent; width 100px"
                    class="column q-px-md q-py-sm"
                  >
                    <q-img src="~/assets/gng.svg" width="25%" />
                    <div class="text-weight-medium">tambah thumbnail</div>
                  </q-btn>
                </div>
              </div>
            </q-card>

            <!-- Image Content -->
            <q-card
              flat
              class="q-py-xl q-mt-md"
              style="background-color: #eef0fc"
            >
              <div class="row">
                <div class="col-6" style="display: block">
                  <!-- Jika sudah ada gambar di database -->
                  <!-- <div
                    v-if="moduleContentById.image_content"
                    class="row col-12"
                  >
                    <div class="col-11 self-center" style="display: block">
                      <q-img
                        :src="`${STORAGE_URL}/${moduleContentById.image_content.src}`"
                        width="100%"
                        style="border-radius: 5px"
                      />
                    </div>
                    <div class="col-1" style="display: block">
                      <q-btn
                        @click="deleteImageContent()"
                        style="
                          z-index: 999;
                          color: white;
                          background-color: rgba(0, 0, 0, 0.4);
                        "
                        dense
                        flat
                        round
                        size="md"
                        icon="close"
                      />
                    </div>
                  </div> -->
                  <!-- Jika sudah ada gambar hasil crop -->
                  <div v-if="img64" class="row q-py-md">
                    <div class="col-12 self-center" style="display: block">
                      <q-img
                        :src="img64"
                        width="100%"
                        style="border-radius: 5px"
                      />
                    </div>
                    <!-- <div class="col-1" style="display: block">
                      <q-btn
                        @click="clearImage()"
                        style="
                          z-index: 999;
                          color: white;
                          background-color: rgba(0, 0, 0, 0.4);
                        "
                        dense
                        flat
                        round
                        size="md"
                        icon="close"
                      />
                    </div> -->
                  </div>
                </div>
                <!-- Ganti gambar -->
                <div class="col-6 self-center justify-center row">
                  <q-btn
                    @click="goToFilePic()"
                    no-caps
                    outline
                    style="background-color: transparent; width 100px"
                    class="column q-px-md q-py-sm"
                  >
                    <q-img src="~/assets/gng.svg" width="25%" />
                    <div class="text-weight-medium">tambah gambar</div>
                  </q-btn>
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
              :rules="[(val) => !!val.length || 'Isi tidak boleh kosong']"
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
          :loading="loadingEditModuleContent"
          :disable="loadingEditModuleContent"
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

    <!-- Dialog success edit module content -->
    <q-dialog v-model="dialogSuccessEditModuleContent" persistent>
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
          Berhasil mengedit isi module
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
      STORAGE_URL: STORAGE_URL,
      dialogSuccessEditModuleContent: false,
      loadingEditModuleContent: false,
      thumb64: null,
      picture: null,
      img64: null,
      thumbnail: null,
      content: {
        tittle: null,
        module_id: null,
        description: null,
        duration: null,
        thumbnail: null,
        image_content: null,
        type: null,
      },
      moduleContentById: {},
      thumbId: null,
      imgContentId: null,
    };
  },
  mounted() {
    this.getModuleContentById().then((res) => {
      this.init();
    });
  },
  methods: {
    init() {
      this.content.tittle = this.moduleContentById.tittle;
      this.content.module_id = this.moduleContentById.module_id;
      this.content.description = this.moduleContentById.description;
      this.content.duration = this.moduleContentById.duration;
      this.content.type = this.moduleContentById.type;

      // Thumbnail
      if (this.moduleContentById.thumbnail) {
        // this.thumbId = this.moduleContentById.thumbnail.id;
        this.thumb64 =
          this.STORAGE_URL + "/" + this.moduleContentById.thumbnail.src;
      }
      // Image Content
      if (this.moduleContentById.image_content) {
        // this.imgContentId = this.moduleContentById.image_content.id;
        this.img64 =
          this.STORAGE_URL + "/" + this.moduleContentById.image_content.src;
      }
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
            this.content.thumbnail = file;
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
            this.content.image_content = file;
          });
      });
    },
    saveContent() {
      let content = this.content;
      // console.log("cek content", content);
      let formData = jsonToFormData(content);

      return new Promise((resolve, reject) => {
        const payload = {
          id: this.moduleContentById.id,
          formData: formData,
        };
        this.loadingEditModuleContent = true;
        this.$store
          .dispatch("ModuleContent/editNewModuleContent", payload)
          .then((res) => {
            // console.log("cek hasil res", res);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            this.loadingEditModuleContent = false;
            this.dialogSuccessEditModuleContent = true;
            setTimeout(this.refreshPage, 2000);
          });
      });
    },
    getModuleContentById() {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("ModuleContent/getModuleContentById", this.id)
          .then((res) => {
            this.moduleContentById = res.data;
            // console.log("cek res by id", res);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    refreshPage() {
      this.$router.back();
    },
  },
};
</script>

<style></style>
