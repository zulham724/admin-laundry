<template>
  <q-page style="background-color: #fafafa" class="q-pa-md">
    <!-- Button edit -->
    <div class="row justify-end">
      <q-btn
        @click="$router.push(`/edit-materi`)"
        flat
        dense
        no-caps
        style="background-color: #5e5eef; width: 200px"
      >
        <div class="text-weight-medium q-pa-sm" style="color: #fafafa">
          Edit
        </div>
      </q-btn>
    </div>

    <div class="row">
      <div class="col-3 q-pa-sm q-gutter-y-md">
        <!-- Image -->
        <div class="row full-width" style="border-radius: 10px; height: 170px">
          <q-img
            class="full-height full-width"
            no-spinner
            style="border-radius: 10px"
            src="~/assets/thumbnail.svg"
          ></q-img>
        </div>

        <!-- Image -->
        <!-- <div
          class="full-width bg-grey"
          style="border-radius: 10px; height: 170px"
        >
          <q-img
            style="border-radius: 10px"
            src="~/assets/thumbnail.svg"
          ></q-img>
        </div> -->

        <!-- Description -->
        <div
          class="full-width bg-white"
          style="border-radius: 10px; height: 170px"
        >
          <div class="row q-gutter-x-sm self-center q-pa-md">
            <div class="self-center">
              <q-img
                src="~/assets/icon/bar.svg"
                width="22px"
                height="18px"
              ></q-img>
            </div>

            <div
              class="row text-weight-medium self-center"
              style="color: #2a2b30; font-size: larger"
            >
              Deskripsi
            </div>
          </div>

          <div
            style="background-color: #eef0fc; border-radius: 0px 0px 10px 10px"
            class="q-pa-md q-py-xl"
          >
            <div
              class="row text-weight-medium"
              style="color: #616263; font-size: larger"
            >
              Ini adalah deskripsi dari materi ini, dimana materi ini selalu
              mempermudah penggunanya untuk bisa menggunakan akal sehat dan
              batin
            </div>
          </div>
        </div>
      </div>
      <div class="col-9 q-pa-sm">
        <div
          class="row text-weight-medium"
          style="color: #2a2b30; font-size: x-large"
        >
          Teknik membangun bisnis yang sukses untuk pemula
        </div>
        <div class="row q-mt-xs">
          <!-- Status -->
          <div class="col-2 row self-center q-gutter-x-sm">
            <div>
              <q-img
                src="~/assets/icon/eye.svg"
                width="22px"
                height="16px"
              ></q-img>
            </div>

            <div
              class="row text-weight-medium self-center"
              style="color: grey; font-size: medium"
            >
              Publik
            </div>
          </div>

          <!-- Date -->
          <div class="col-3 row self-center q-gutter-x-sm">
            <div>
              <q-img
                src="~/assets/icon/date.svg"
                width="22px"
                height="22px"
              ></q-img>
            </div>

            <div
              class="row text-weight-medium self-center"
              style="color: grey; font-size: medium"
            >
              21 Maret 2022
            </div>
          </div>

          <!-- show -->
          <div class="col-3 row self-center q-gutter-x-sm">
            <div>
              <q-img
                src="~/assets/icon/show.svg"
                width="20px"
                height="20px"
              ></q-img>
            </div>

            <div
              class="row text-weight-medium self-center"
              style="color: grey; font-size: medium"
            >
              0 Kunjungan
            </div>
          </div>

          <!-- time -->
          <div class="col-3 row self-center q-gutter-x-sm">
            <div>
              <q-img
                src="~/assets/icon/clock.svg"
                width="20px"
                height="20px"
              ></q-img>
            </div>

            <div
              class="row text-weight-medium self-center"
              style="color: grey; font-size: medium"
            >
              1 jam 45 menit
            </div>
          </div>
        </div>

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
            style="background-color: #eef0fc; border-radius: 0px 0px 10px 10px"
            class="q-pa-md q-py-xl"
          >
            <q-virtual-scroll :items="demo" virtual-scroll-horizontal>
              <template v-slot="{ item, index }">
                <div :key="index" :class="item.class">
                  <!-- Card -->
                  <div
                    @click="itemClicked = true"
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

                      <div class="row q-mt-xl">
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
                        <div
                          class="col justify-end row q-gutter-x-sm self-center"
                        >
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
                    </div>
                  </div>
                </div>
              </template>
            </q-virtual-scroll>
          </div>
        </div>
      </div>
    </div>

    <!-- Dialog -->
    <q-dialog v-model="itemClicked" full-height full-width persistent>
      <q-card class="column full-height q-pa-md">
        <div class="row justify-end">
          <q-btn
            v-close-popup
            round
            flat
            dense
            icon="close"
            size="md"
            color="black"
          ></q-btn>
        </div>
        <div class="column">
          <div
            class="row justify-center text-center text-weight-medium"
            style="font-size: x-large; color: #2a2b30"
          >
            Teknik membangun bisnis yang sukses untuk pemula
          </div>
          <div class="row justify-center text-center q-gutter-x-sm">
            <!-- Like -->
            <div class="row q-gutter-x-sm self-center">
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
                100 likes
              </div>
            </div>

            <!-- time -->
            <div class="row self-center q-gutter-x-sm">
              <div>
                <q-img
                  src="~/assets/icon/clock.svg"
                  width="20px"
                  height="20px"
                ></q-img>
              </div>

              <div
                class="row text-weight-medium self-center"
                style="color: grey; font-size: medium"
              >
                1 jam 45 menit
              </div>
            </div>

            <!-- show -->
            <div class="row self-center q-gutter-x-sm">
              <div>
                <q-img
                  src="~/assets/icon/show.svg"
                  width="20px"
                  height="20px"
                ></q-img>
              </div>

              <div
                class="row text-weight-medium self-center"
                style="color: grey; font-size: medium"
              >
                0 Kunjungan
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
const maxSize = 5;
const demo = [];
for (let i = 0; i < maxSize; i++) {
  demo.push({
    id: i,
    class: "q-pa-md",
    title: "Title " + i,
    description: "Description " + i,
    image: "~/assets/thumbnail.svg",
    time: "20 menit",
    like: "11",
  });
}
export default {
  data() {
    return {
      demo,
      itemClicked: false,
    };
  },
};
</script>

<style></style>
