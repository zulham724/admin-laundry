<template>
  <q-page>
    <div class="row">
      <div class="col-3 window-height">
        <q-card class="text-center full-height">
          <div class="row">
            <div class="col-2 q-py-md">
              <q-btn icon="close" @click="onCloseDialog()" flat dense />
            </div>
            <div class="col-10 text-left q-py-md text-h6 text-weight-bold">
              Buat Materi
            </div>
          </div>

          <q-card
            class="q-mx-sm q-my-sm"
            style="background-color: #eef0fc; border-radius: 10px"
          >
            <!-- JIKA BELUM ADA IMAGE -->
            <q-img
              v-if="!thumbnail"
              @click="goToFile()"
              src="~/assets/ads.svg"
            />
            <br />
            <!-- JIKA SUDAH ADA IMAGE -->
            <div v-if="!!thumbnail" class="row">
              <div class="col-10">
                <q-img class="text-right" :src="img64"> </q-img>
              </div>
              <div class="col-2">
                <q-btn
                  style="z-index: 999; margin-left: -35px"
                  dense
                  flat
                  class="bg-white"
                  round
                  size="md"
                  icon="close"
                  @click="clearImg64()"
                />
              </div>
            </div>
          </q-card>

          <q-form ref="form" class="q-gutter-y-sm q-mt-sm">
            <div style="border-radius: 5px" class="q-mx-sm">
              <q-input
                :rules="[(val) => !!val || 'Harus diisi']"
                outlined
                label="Judul"
                input-class="text-weight-medium"
                v-model="form.tittle"
                @update:model-value="(val) => saveChange('tittle', val)"
              />
              <q-input
                :rules="[(val) => !!val || 'Harus diisi']"
                v-model="form.description"
                outlined
                style=""
                type="textarea"
                label="Tambahkan Deskripsi Materi"
                @update:model-value="(val) => saveChange('description', val)"
              />
              <!-- Dilihat -->
              <q-select
                :options="visibilities"
                v-model="selectedVisibility"
                option-label="label"
                option-value="value"
                outlined
                label="Dilihat"
                style="border-radius: 5px; font-size: small; color: #2a2b30"
                class="text-weight-medium"
                @update:model-value="(val) => saveChange('is_public', val)"
              />
            </div>
            <q-btn
              class="q-mx-sm q-my-sm"
              text-color="white"
              label="Simpan"
              :loading="loading"
              :disable="loading"
              @click="onSubmit()"
              style="background-color: #5e5eef; width: 95%"
            />
          </q-form>
        </q-card>
      </div>
      <div class="col-9 window-height">
        <div class="q-mx-xl q-py-md text-right">
          <q-btn-dropdown
            style="background-color: #5e5eef"
            label="Tambah Submateri"
            text-color="white"
          >
            <q-list>
              <q-item
                clickable
                v-close-popup
                @click="$router.push('add-sub-materi-pic')"
              >
                <q-item-section>
                  <q-item-label>Photos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                @click="$router.push('add-sub-materi-vid')"
              >
                <q-item-section>
                  <q-item-label>Videos</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
        <div class="q-mx-xl text-center">
          <q-card style="background-color: #eef0fc">
            <div class="bg-white q-py-md q-px-md text-left text-weight-bold">
              Sub Materi
            </div>
            <!-- KONDISI SUDAH ADA SUB MATERI -->
            <div class="q-py-xl" v-if="form.contents.length">
              <div
                v-for="(content, i) in form.contents"
                :key="content.key"
                class="col-4"
              >
                <item-component
                  :item="content"
                  @delete="deleteContet(payload)"
                ></item-component>
              </div>
            </div>
            <!-- JIKA BELUM ADA SUB MATERI-->
            <div v-else class="q-py-xl">
              <q-img src="~/assets/lmr.svg" width="100px" />
              <div class="q-py-xl text-h6 text-weight-medium">
                Belum ada sub materi
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </div>
    <q-file
      ref="addImages"
      v-model="thumbnail"
      @update:model-value="previewImages"
      v-show="false"
    ></q-file>
  </q-page>
</template>

<script>
import { base64ToFile, fileToBase64 } from "src/helper";
import { jsonToFormData } from "src/helper";
import { useQuasar } from "quasar";
import { ref } from "vue";
import CropImageComponent from "src/components/CropImageComponent";
import ItemComponent from "src/components/module/content/ItemComponent";

export default {
  components: { ItemComponent },
  data() {
    return {
      y: true,
      // hanya untuk  test
      showFile: false,
      model: ref(null),
      img64: null,
      form: {
        tittle: "",
        description: "",
        is_public: false,
        contents: [],
        thumbnail: null,
      },
      thumbnail: null,
      visibilities: [
        {
          label: "Public",
          value: true,
        },
        {
          label: "Private",
          value: false,
        },
      ],
      selectedVisibility: null,
      loading: false,
    };
  },
  watch: {
    selectedVisibility: {
      handler(val) {
        this.form.is_public = val.value;
      },
      deep: true,
    },
    thumbnail(val) {
      this.$store.commit("Module/UPDATE_FORM_MODULE", {
        key: "thumbnail",
        value: val,
      });
      this.form.thumbnail = val;
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.form = this.$store.getters["Module/formModule"];
      this.selectedVisibility =
        this.form.is_public != null
          ? this.visibilities.find((item) => item.value === this.form.is_public)
          : null;
      if (this.form.thumbnail) {
        this.thumbnail = this.form.thumbnail;
        let promise = fileToBase64(this.form.thumbnail);
        promise.then((res) => {
          this.img64 = res.src;
        });
      }
    },
    saveChange(key, value) {
      this.$store.commit("Module/UPDATE_FORM_MODULE", {
        key: key,
        value: value,
      });
    },
    clearImg64() {
      this.thumbnail = null;
      this.img64 = null;
    },
    onCloseDialog() {
      this.$q
        .dialog({
          title: "Konfirmasi",
          message: "Apakah anda yakin ingin membatalkan?",
          cancelBtn: true,
          okBtn: true,
        })
        .onOk(() => {
          this.$router.push("/");
        });
    },
    async previewImages(file) {
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
            let file = base64ToFile(data.dataUrl);
            this.thumbnail = file;
          });
      });
    },
    goToFile() {
      this.$refs.addImages.pickFiles();
    },
    onItemClick() {
      // console.log('Clicked on an Item')
    },
    onFileSelected(files) {
      this.thumbnail = files[0];
    },
    onSubmit() {
      console.log(this.form, this.$store.getters["Module/formModule"]);
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          this.loading = true;
          let formData = jsonToFormData(this.form);
          this.$store
            .dispatch("Module/storeModule", formData)
            .then((res) => {
              this.$q.notify({
                color: "positive",
                textColor: "white",
                message: "Berhasil menyimpan",
              });
              this.$router.push("/materi-admin");
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    deleteContent(payload) {
      let index = this.form.contents.findIndex(
        (item) => item.key === payload.key
      );
      if (index > -1) {
        this.form.contents.splice(index, 1);
      }
    },
  },
};
</script>

<style></style>
