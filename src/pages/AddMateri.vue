<template>
  <q-page>
    <div class="row">
      <div class="col-3 window-height">
        <q-card class="text-center full-height">
          <div class="row">
            <div class="col-2 q-py-md">
              <q-btn icon="close" @click="confirm" flat dense />
            </div>
            <div class="col-10 text-left q-py-md text-h6 text-weight-bold">
              Buat Materi
            </div>
          </div>

          <q-card
            @click="goToFile()"
            class="q-mx-sm q-my-sm"
            style="background-color: #eef0fc; border-radius: 10px"
          >
            <!-- JIKA BELUM ADA IMAGE -->
            <q-img v-if="!thumbnail" src="~/assets/ads.svg" />
            <br />
            <!-- JIKA SUDAH ADA IMAGE -->
            <q-img
              class="text-right"
              v-if="!!thumbnail"
              src="~/assets/thumbnail.svg"
            >
              <q-btn class="bg-white" round icon="close" />
            </q-img>
            <br />
          </q-card>
          <q-form ref="form" class="q-gutter-y-sm q-mt-sm">
            <div style="border-radius: 5px" class="q-mx-sm">
              <q-input
                :rules="[(val) => !!val || 'Harus diisi']"
                outlined
                label="Judul"
                input-class="text-weight-medium"
              />
              <q-input
                :rules="[(val) => !!val || 'Harus diisi']"
                v-model="formModule.description"
                outlined
                style=""
                label="Tambahkan Deskripsi Materi"
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
              />
            </div>
            <q-btn
              class="q-mx-sm q-my-sm"
              text-color="white"
              label="Simpan"
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
            <!-- JIKA BELUM ADA SUB MATERI-->
            <div class="q-py-xl" v-if="!this.formModule.contents">
              <q-img src="~/assets/lmr.svg" width="100px" />
              <div class="q-py-xl text-h6 text-weight-medium">
                Belum ada sub materi
              </div>
            </div>
            <div class="q-py-xl">
              <q-img src="~/assets/lmr.svg" width="100px" />
              <div class="q-py-xl text-h6 text-weight-medium">
                Ini kondisi sudah ada materi
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </div>
    <q-file ref="addImages" v-show="false" multiple></q-file>
  </q-page>
</template>

<script>
import { jsonToFormData } from "src/helper";
import { useQuasar } from "quasar";
import { ref } from "vue";

export default {
  setup() {
    const $q = useQuasar();

    function confirm() {
      $q.dialog({
        title: "Yakin",
        message: "ingin membatalkan untuk membuat materi?",
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          // console.log('>>>> OK')
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }

    return { confirm };
  },
  data() {
    return {
      y: true,
      // hanya untuk  test
      showFile: false,
      model: ref(null),
      formModule: {
        tittle: "",
        description: "",
        is_public: false,
        contents: [],
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
      selectedVisibility: {
        label: "Public",
        value: true,
      },
    };
  },
  mounted() {
    this.formModule = this.$store.getters["Module/formModule"];
  },
  methods: {
    goToFile() {
      console.log("file");
      this.$refs.addImages.pickFiles();
    },
    onItemClick() {
      // console.log('Clicked on an Item')
    },
    onFileSelected(files) {
      this.thumbnail = files[0];
    },
    onSubmit() {
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          this.formModule.thumbnail = this.thumbnail;
          this.formModule.is_public = this.selectedVisibility.value;
          let formData = jsonToFormData(this.formModule);
          this.$store
            .dispatch("Module/storeModule", formData)
            .then((res) => {});
        }
      });
    },
  },
};
</script>

<style></style>
