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
          <div
            class="row full-width"
            style="border-radius: 10px; height: 170px"
          >
            <div class="full-height col-11">
              <q-img
                class="full-height full-width"
                no-spinner
                style="border-radius: 10px"
                src="~/assets/thumbnail.svg"
              ></q-img>
            </div>
            <div class="col-1">
              <q-btn
                round
                flat
                dense
                icon="close"
                size="md"
                style="z-index: 999; margin-left: -35px"
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
            v-model="text"
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
            v-model="text"
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
            v-model="model"
            :options="status"
            label="Dilihat"
            style="border-radius: 5px; font-size: small; color: #2a2b30"
            class="text-weight-medium"
          />
          <div class="q-mt-lg">
            <q-btn
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
          <q-btn
            flat
            dense
            no-caps
            style="background-color: #5e5eef; border-radius: 5px; width: 200px"
          >
            <div
              class="text-weight-medium q-py-xs"
              style="color: #fafafa; font-size: medium"
            >
              Tambah Submateri
            </div>
          </q-btn>
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
                v-for="item in 4"
                :key="item"
                style="
                  background-color: white;
                  border-radius: 10px;
                  width: 280px;
                "
              >
                <div style="border-radius: 10px 10px 0px 0px">
                  <div v-if="true">
                    <q-img
                      src="~/assets/thumbnail.svg"
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
                    Part 1 - Anda Harus butuh modal yang kuat
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
                        20 menit
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
                    <q-btn
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
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      model: "",
      status: ["Public", "Private"],
    };
  },
};
</script>

<style></style>
