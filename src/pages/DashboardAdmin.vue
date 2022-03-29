<template>
  <q-page
    style="background-color: #fafafa"
    class="q-pa-md q-pb-xl q-gutter-y-md"
  >
    <!-- Materi yang sering di kunjungi -->
    <div class="bg-white q-pa-xl">
      <div class="text-weight-medium" style="color: #2a2b30; font-size: large">
        Materi yang sering dikunjungi
      </div>
      <!-- Grafik -->
      <div style="height: 300px">
        <div class="self-center text-center">ini grafik</div>
      </div>
    </div>

    <!-- Sub Bab Materi yang banyak di sukai -->
    <div class="bg-white q-pa-xl">
      <div class="text-weight-medium" style="color: #2a2b30; font-size: large">
        Sub bab materi yang banyak disukai
      </div>
      <!-- Grafik -->
      <div style="height: 300px">
        <div class="self-center text-center">ini grafik</div>
      </div>
    </div>

    <!-- Materi baru -->
    <div class="bg-white q-pa-sm q-px-lg">
      <div class="row justify-end q-mt-sm">
        <q-btn
          flat
          dense
          no-caps
          style="border-radius: 5px"
          @click="$router.push('materi-admin')"
        >
          <div class="text-weight-medium" style="color: #5e5eef; font-size: sm">
            Lihat semua
          </div>
        </q-btn>
      </div>
      <div class="row q-mt-xs">
        <div
          class="text-weight-medium"
          style="color: #2a2b30; font-size: x-large"
        >
          Materi baru
        </div>
      </div>
      <div class="row">
        <!-- List -->
        <q-list>
          <q-item
            v-for="theory in 3"
            :key="theory"
            class="q-my-sm"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white" size="50px">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label
                class="text-weight-medium"
                style="font-size: larger; color: #2a2b30"
                >Latihan dasar laundry untuk pemula</q-item-label
              >
              <q-item-label caption lines="1">0 Kunjungan</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <!-- Pengguna baru -->
    <div class="bg-white q-pa-sm q-px-lg">
      <div class="row justify-end q-mt-sm">
        <q-btn
          flat
          dense
          no-caps
          style="border-radius: 5px"
          @click="$router.push('/user')"
        >
          <div class="text-weight-medium" style="color: #5e5eef; font-size: sm">
            Lihat semua
          </div>
        </q-btn>
      </div>
      <div class="row q-mt-xs">
        <div
          class="text-weight-medium"
          style="color: #2a2b30; font-size: x-large"
        >
          Pengguna baru
        </div>
      </div>
      <div class="row">
        <!-- List -->
        <q-list>
          <q-item
            v-for="user in 3"
            :key="user"
            class="q-my-sm"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white" size="50px">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label
                class="text-weight-medium"
                style="font-size: larger; color: #2a2b30"
                >Pujianti widorokusuma</q-item-label
              >
              <q-item-label caption lines="1">0 Point</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <!-- Keaktifan   pengguna -->
    <div class="bg-white q-pa-sm q-px-lg">
      <div class="row q-mt-xs">
        <div
          class="text-weight-medium"
          style="color: #2a2b30; font-size: x-large"
        >
          Keaktifan pengguna
        </div>
      </div>
      <div class="row q-mt-sm">
        <div class="justify-start">
          <q-circular-progress
            show-value
            class="q-ma-md"
            :value="value"
            size="200px"
            :thickness="0.2"
            color="indigo-13"
            center-color="grey-3"
            track-color="orange-2"
          >
            <div
              class="text-weight-medium q-gutter-y-xs"
              style="color: #313131; font-size: small"
            >
              <div class="row text-center justify-center">Jumlah pengguna</div>
              <div
                class="row text-center justify-center"
                style="color: #313131; font-size: medium"
              >
                100.000
              </div>
            </div>
          </q-circular-progress>
        </div>
        <div class="col row justify-end">
          <div class="column q-gutter-y-lg">
            <!-- Pengguna aktif -->
            <div>
              <div class="row q-gutter-x-sm justify-end">
                <div class="column">
                  <div
                    class="text-weight-medium self-center"
                    style="color: #2a2b30; font-size: x-large"
                  >
                    70.000 pengguna aktif
                  </div>
                  <div class="row justify-end">
                    <div
                      class="text-weight-medium self-center"
                      style="color: #2a2b30; font-size: 40px"
                    >
                      70%
                    </div>
                  </div>
                </div>

                <div>
                  <q-avatar
                    size="30px"
                    style="display: block"
                    color="indigo-13"
                  ></q-avatar>
                </div>
              </div>
            </div>

            <!-- Pengguna tidak aktif -->
            <div>
              <div class="row q-gutter-x-sm justify-end">
                <div class="column">
                  <div
                    class="text-weight-medium self-center"
                    style="color: #2a2b30; font-size: x-large"
                  >
                    30.000 pengguna tidak aktif
                  </div>
                  <div class="row justify-end">
                    <div
                      class="text-weight-medium self-center"
                      style="color: #2a2b30; font-size: 40px"
                    >
                      30%
                    </div>
                  </div>
                </div>

                <div>
                  <q-avatar
                    color="orange-2"
                    size="30px"
                    style="display: block"
                  ></q-avatar>
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
      value: 80,
    };
  },
};
</script>

<style></style>
