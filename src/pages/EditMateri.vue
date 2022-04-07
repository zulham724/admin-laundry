<template>
  <q-page style="background-color: #fafafa">
    <div class="row">
      <div class="col-3 bg-white q-pa-sm">
        <div class="row q-mt-md">
          <!-- Button close -->
          <div class="self-center">
            <q-btn
              round
              color="primary"
              @click="$router.back()"
              icon="close"
              flat
              dense
              size="md"
              class="q-mr-sm"
            ></q-btn>
          </div>
          <div
            class="text-weight-medium self-center"
            style="color: black; font-size: medium"
          >
            Edit materi
          </div>
        </div>
        <!-- Image -->
        <div class="row q-mt-md">
          <!-- Jika ada gambar -->
          <div
            v-if="moduleById.thumbnail"
            class="row full-width"
            style="border-radius: 10px; height: 170px"
          >
            <div
              class="full-height shadow-1 col-11"
              style="border-radius: 10px"
            >
              <q-img
                no-spinner
                style="border-radius: 10px; width: 100%; height: 100%"
                :src="`${STORAGE_URL}/${moduleById.thumbnail.src}`"
              ></q-img>
            </div>
            <div class="col-1">
              <q-btn
                @click="addImage = true"
                round
                flat
                dense
                icon="close"
                size="md "
                style="
                  z-index: 999;
                  margin-left: -35px;
                  background-color: rgba(0, 0, 0, 0.4);
                "
                color="white"
              ></q-btn>
            </div>
          </div>
          <!-- Jika tidak ada gambar -->
          <div
            v-else
            class="row full-width"
            style="border-radius: 10px; height: 170px"
          >
            <div
              class="full-height col-11 shadow-1"
              style="border-radius: 10px"
            >
              <div
                class="full-height full-width self-center text-center justify-center"
                no-spinner
                style="
                  border-radius: 10px;
                  display: block;
                  background-color: white;
                "
              >
                <q-img
                  class="q-mt-xl"
                  src="~/assets/icon/note.svg"
                  width="70px"
                  style="border-radius: 10px 10px 0px 0px"
                >
                </q-img>
              </div>
            </div>
            <div class="col-1">
              <q-btn
                @click="addImage = true"
                round
                flat
                dense
                icon="close"
                size="md "
                style="
                  z-index: 999;
                  margin-left: -35px;
                  background-color: rgba(0, 0, 0, 0.4);
                "
                color="white"
              ></q-btn>
            </div>
          </div>
        </div>
        <!-- container -->
        <div class="q-mt-md q-gutter-y-sm">
          <!-- Judul -->
          <q-input
            lazy-rules
            :rules="[(val) => !!val]"
            outlined
            v-model="module.tittle"
            label="Judul"
            style="border-radius: 5px"
            input-class="text-weight-medium"
            input-style="font-size: small; color: #2A2B30"
          />
          <!-- Description -->
          <q-input
            lazy-rules
            :rules="[(val) => !!val]"
            outlined
            v-model="module.description"
            label="Description"
            style="border-radius: 5px"
            input-class="text-weight-medium"
            input-style="font-size: small; color: #2A2B30"
          />

          <!-- Dilihat -->
          <q-select
            lazy-rules
            :rules="[(val) => !!val]"
            outlined
            v-model="selectedVisibility"
            option-label="label"
            option-value="value"
            :options="visibilities"
            label="Dilihat"
            style="border-radius: 5px; font-size: small; color: #2a2b30"
            class="text-weight-medium"
          />
          <div class="q-mt-lg">
            <q-btn
              @click="onSubmit()"
              flat
              dense
              no-caps
              style="background-color: #5e5eef; border-radius: 5px"
              class="full-width"
            >
              <div
                class="text-weight-medium q-py-xs"
                style="color: #fafafa; font-size: medium"
              >
                Simpan
              </div>
            </q-btn>
          </div>
        </div>
      </div>
      <div class="col-9 q-pa-md window-height">
        <div class="row justify-end">
          <q-btn-dropdown
            no-caps
            style="background-color: #5e5eef; border-radius: 5px"
            label="Tambah Submateri"
            text-color="white"
          >
            <q-list>
              <q-item
                clickable
                v-close-popup
                @click="$router.push(`/add-new-sub-materi-pic/${this.id}`)"
              >
                <q-item-section>
                  <q-item-label>Photos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                @click="$router.push(`/add-new-sub-materi-vid/${this.id}`)"
              >
                <q-item-section>
                  <q-item-label>Videos</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
        <div class="row q-mt-md">
          <!-- Sub Materi -->
          <div
            class="full-width bg-white q-mt-md"
            style="border-radius: 10px; height: 180px"
          >
            <div class="row q-gutter-x-sm self-center q-pa-md">
              <div class="self-center">
                <q-img
                  src="~/assets/icon/theory.svg"
                  width="20px"
                  height="19px"
                ></q-img>
              </div>

              <div
                class="row text-weight-medium self-center"
                style="color: #2a2b30; font-size: larger"
              >
                Sub Materi
              </div>
            </div>

            <div
              style="
                background-color: #eef0fc;
                border-radius: 0px 0px 10px 10px;
              "
              class="row q-pa-md q-py-xl"
            >
              <!-- Card -->
              <div
                class="q-mx-sm q-my-md"
                v-for="(moduleContent, i) in moduleById.contents"
                :key="moduleContent.id"
                style="
                  background-color: white;
                  border-radius: 10px;
                  width: 280px;
                "
              >
                <div style="border-radius: 10px 10px 0px 0px">
                  <div v-if="moduleContent.thumbnail">
                    <q-img
                      :src="`${STORAGE_URL}/${moduleContent.thumbnail.src}`"
                      height="180px"
                      style="border-radius: 10px 10px 0px 0px"
                    >
                    </q-img>
                  </div>

                  <div
                    v-else
                    class="full-width justify-center text-center"
                    style="height: 180px"
                  >
                    <q-img
                      class="q-mt-xl"
                      src="~/assets/icon/note.svg"
                      width="70px"
                      style="border-radius: 10px 10px 0px 0px"
                    >
                    </q-img>
                  </div>
                </div>
                <div class="q-pa-md">
                  <div
                    class="row text-weight-medium"
                    style="color: #2a2b30; font-size: larger"
                  >
                    Part {{ i + 1 }} - {{ moduleContent.tittle }}
                  </div>

                  <div class="row q-mt-md">
                    <!-- Time -->
                    <div class="col row q-gutter-x-sm self-center">
                      <div class="self-center">
                        <q-img
                          src="~/assets/icon/clock.svg"
                          width="20px"
                          height="20px"
                        ></q-img>
                      </div>
                      <div
                        class="text-weight-medium self-center"
                        style="color: #2a2b30; font-size: larger"
                      >
                        {{ moduleContent.duration }} menit
                      </div>
                    </div>

                    <!-- Like -->
                    <div class="col justify-end row q-gutter-x-sm self-center">
                      <div class="self-center">
                        <q-img
                          src="~/assets/icon/like.svg"
                          width="22px"
                          height="19px"
                        ></q-img>
                      </div>
                      <div
                        class="text-weight-medium self-center"
                        style="color: #2a2b30; font-size: larger"
                      >
                        11
                      </div>
                    </div>
                  </div>
                  <!-- Delete -->
                  <div class="row q-mt-sm">
                    <q-btn
                      @click="deleteModuleContent(moduleContent.id)"
                      flat
                      dense
                      no-caps
                      style="background-color: #5e5eef; border-radius: 5px"
                      class="full-width"
                    >
                      <div
                        class="text-weight-medium q-py-xs"
                        style="color: #fafafa; font-size: medium"
                      >
                        Hapus
                      </div>
                    </q-btn>
                  </div>
                  <!-- Edit -->
                  <div class="row q-mt-sm">
                    <!-- Button type materi -->
                    <q-btn
                      v-if="moduleContent.type == 'Materi'"
                      @click="
                        $router.push(`/edit-sub-materi-pic/${moduleContent.id}`)
                      "
                      flat
                      dense
                      no-caps
                      style="background-color: #5e5eef; border-radius: 5px"
                      class="full-width"
                    >
                      <div
                        class="text-weight-medium q-py-xs"
                        style="color: #fafafa; font-size: medium"
                      >
                        Edit
                      </div>
                    </q-btn>
                    <!-- Button type video -->
                    <q-btn
                      v-if="moduleContent.type == 'Video'"
                      @click="
                        $router.push(`/edit-sub-materi-vid/${moduleContent.id}`)
                      "
                      flat
                      dense
                      no-caps
                      style="background-color: #5e5eef; border-radius: 5px"
                      class="full-width"
                    >
                      <div
                        class="text-weight-medium q-py-xs"
                        style="color: #fafafa; font-size: medium"
                      >
                        Edit
                      </div>
                    </q-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dialog memasukkan image -->
    <q-dialog v-model="addImage" persistent>
      <q-card
        class="q-pa-sm"
        style="width: 1000px; height: 500px; border-radius: 10px"
      >
        <div class="q-pa-sm">
          <div class="row">
            <div class="col-2 self-center">
              <q-avatar
                color="light-blue-6"
                text-color="white"
                icon="far fa-image"
              />
            </div>
            <div class="col-9 self-center column text-weight-medium">
              <div class="row" style="font-size: medium; color: black">
                Sisipkan gambar
              </div>
              <div class="row" style="font-size: small; color: grey">
                Anda dapat mengunggah gambar disini
              </div>
            </div>
            <div class="col-1 self-center">
              <q-btn
                @click="goToFileImage()"
                style="color: grey"
                icon="add_box"
                round
                dense
                flat
              ></q-btn>
            </div>
          </div>
          <!-- Preview Image -->
          <div
            class="row q-mt-md q-mx-sm"
            style="background-color: #f9f9f9; border-radius: 5px; height: 350px"
          >
            <div class="col-1" style="display: block"></div>
            <div class="col-10" style="display: block">
              <div class="self-center text-center q-ma-md">
                <q-img
                  class="q-mt-xl"
                  v-if="image"
                  :src="img64"
                  style="width: 400px; height: 200px; border-radius: 5px"
                ></q-img>
              </div>
            </div>
            <div class="col-1" style="display: block"></div>
          </div>
          <!-- Button -->
          <div class="q-pa-sm row justify-end q-gutter-x-sm q-mt-xs">
            <q-btn
              flat
              no-caps
              style="background-color: #f2f2f2"
              label="Batal"
              color="black"
              @click="cancelPickImage()"
            />
            <q-btn
              @click="dialogPromptDeleteThumbnail = true"
              no-caps
              class="bg-light-blue-6"
              flat
              label="Simpan"
              color="white"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- Dialog delete module content prompt -->
    <q-dialog v-model="dialogDeletePrompt">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-weight-bold text-left" style="font-size: 18px">
            Hapus
          </div>
          <div class="text-weight-light text-left" style="font-size: 14px">
            yakin ingin hapus sekarang?
          </div>
        </q-card-section>

        <q-card-actions>
          <div class="row col-12">
            <div class="col-9 text-right q-pr-sm">
              <q-btn
                class="shadow-1"
                no-caps
                flat
                label="Batal"
                style="color: #888888"
                v-close-popup
              />
            </div>
            <div class="col-3 text-left q-pr-sm">
              <q-btn
                @click="deleteModuleContent()"
                class="shadow-1"
                no-caps
                flat
                label="Oke"
                style="background-color: #18c1ee; color: white"
              />
            </div>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog delete moduleContent -->
    <q-dialog v-model="dialogDeleteModuleContent" persistent>
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
          Berhasil menghapus module content
        </div>
      </q-card>
    </q-dialog>

    <!-- Dialog success add Image module -->
    <q-dialog v-model="dialogSuccessAddImageModule" persistent>
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
          Berhasil mengganti gambar pada module ini
        </div>
      </q-card>
    </q-dialog>

    <!-- Dialog prompt delete image -->
    <q-dialog v-model="dialogPromptDeleteThumbnail">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-weight-bold text-left" style="font-size: 18px">
            Ubah Gambar
          </div>
          <div class="text-weight-light text-left" style="font-size: 14px">
            yakin ingin mengubah gambar sekarang?
          </div>
        </q-card-section>

        <q-card-actions>
          <div class="row col-12">
            <div class="col-9 text-right q-pr-sm">
              <q-btn
                class="shadow-1"
                no-caps
                flat
                label="Batal"
                style="color: #888888"
                v-close-popup
              />
            </div>
            <div class="col-3 text-left q-pr-sm">
              <q-btn
                :loading="addImageLoading"
                :disable="addImageLoading"
                @click="saveImage()"
                class="shadow-1"
                no-caps
                flat
                label="Oke"
                style="background-color: #18c1ee; color: white"
              />
            </div>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-file
      ref="addImagesThumb"
      v-model="image"
      @update:model-value="previewImagesThumb"
      v-show="false"
      accept="image/*"
    ></q-file>
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
      moduleById: {},
      module: {
        id: null,
        tittle: null,
        description: null,
        thumbnail: null,
        is_public: null,
      },
      visibilities: [
        {
          label: "Public",
          value: 1,
        },
        {
          label: "Private",
          value: 0,
        },
      ],
      selectedVisibility: null,
      dialogDeleteModuleContent: false,
      dialogSuccessAddImageModule: false,
      dialogPromptDeleteThumbnail: false,
      addImageLoading: false,
      addImage: false,
      image: null,
      img64: null,
      imgId: null,
    };
  },
  mounted() {
    this.getModuleById().then((res) => {
      this.init();
    });
  },
  methods: {
    init() {
      this.module.tittle = this.moduleById.tittle;
      this.module.description = this.moduleById.description;
      this.module.id = this.moduleById.id;
      if (this.moduleById.thumbnail) {
        this.module.thumbnail = this.moduleById.thumbnail.src;
      }
      this.module.selectedVisibility = this.moduleById.is_public;
      if (this.moduleById.is_public == 1) {
        this.selectedVisibility = this.visibilities[0];
      } else {
        this.selectedVisibility = this.visibilities[1];
      }
      // Image
      // if (this.module.thumbnail) {
      //   this.image = this.module.thumbnail;
      //   let promise = fileToBase64(this.module.thumbnail);
      //   promise.then((res) => {
      //     this.img64 = res.src;
      //   });
      // }
      if (this.moduleById.thumbnail) {
        this.imgId = this.moduleById.thumbnail.id;
      }
    },
    deleteModuleContent(id) {
      console.log("cek id", id);
      this.$store
        .dispatch("ModuleContent/deleteModuleContent", id)
        .then((res) => {
          console.log("cek hasil delete", res);
        })
        .catch((err) => {
          console.log("cek error", err);
        })
        .finally(() => {
          this.dialogDeleteModuleContent = true;
          setTimeout(this.refreshPage, 2000);
        });
    },
    onSubmit() {
      // is_public
      this.module.is_public = this.selectedVisibility.value;

      // let formData = jsonToFormData(this.module);
      // console.log("cek payload", formData);

      return new Promise((resolve, reject) => {
        const payload = {
          ...this.module,
        };
        this.$store
          .dispatch("Module/updateModule", payload)
          .then((res) => {
            // console.log("cek data", res);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {});
      });
    },
    getModuleById() {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("Module/getModuleById", this.id)
          .then((res) => {
            this.moduleById = res.data;
            // console.log("cek res", res.data);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {});
      });
    },
    saveImage() {
      // Kondisi jika sudah ada hasil crop gambar
      if (this.image) {
        // Kondisi jika sudah ada thumbnail
        if (this.moduleById.thumbnail) {
          // delete thumbnail yang sudah ada
          this.deleteImageModule();

          // upload image
          let image = this.image;
          let formData = new FormData();
          formData.append("thumbnail", image);
          const payload = {
            id: this.id,
            formData: formData,
          };
          this.addImageLoading = true;
          this.$store
            .dispatch("Module/uploadModuleImage", payload)
            .then((res) => {
              // console.log("cek hasil", res.data);
            })
            .catch((err) => {
              console.log("error", err);
            })
            .finally(() => {
              this.clearThumbnail();
              this.addImageLoading = false;
              this.dialogSuccessAddImageModule = true;
              setTimeout(this.refreshPage, 2000);
            });
        } else {
          // upload image
          let image = this.image;
          let formData = new FormData();
          formData.append("thumbnail", image);
          const payload = {
            id: this.id,
            formData: formData,
          };
          this.addImageLoading = true;
          this.$store
            .dispatch("Module/uploadModuleImage", payload)
            .then((res) => {
              // console.log("cek hasil", res.data);
            })
            .catch((err) => {
              console.log("error", err);
            })
            .finally(() => {
              this.clearThumbnail();
              this.addImageLoading = false;
              this.dialogSuccessAddImageModule = true;
              setTimeout(this.refreshPage, 2000);
            });
        }
        // Kondisi jika belum melakukan crop gambar
      } else {
        this.$q.notify("Pilih gambar terlebih dahulu!");
      }
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
            this.img64 = data.dataUrl;
            let file = base64ToFile(data.dataUrl, "thumbnail");
            this.image = file;
          });
      });
    },
    clearThumbnail() {
      this.image = null;
      this.img64 = null;
    },
    goToFileImage() {
      // Kondisi jika sudah ada hasil crop gambar
      if (this.image) {
        this.clearThumbnail();
        this.$refs.addImagesThumb.pickFiles();
      } else {
        // Kondisi jika belum di crop gambar nya
        this.$refs.addImagesThumb.pickFiles();
      }
    },
    refreshPage() {
      this.$router.go();
    },
    cancelPickImage() {
      this.clearThumbnail();
      this.addImage = false;
    },
    deleteImageModule() {
      this.$store.dispatch("Module/deleteModuleImage", this.imgId);
    },
  },
};
</script>

<style></style>
