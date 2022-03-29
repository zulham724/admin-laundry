<template>
  <q-page style="background-color: #fafafa">
    <!-- TAB MATERI -->
    <div class="row bg-transparent">
      <div class="col-2 q-py-md self-center text-center">Nama</div>
      <div class="col-2 q-py-md self-center text-center">Waktu</div>
      <div class="col-2 q-py-md self-center text-center">Jumlah like</div>
      <div class="col-2 q-py-md self-center text-center">Jumlah balasan</div>
      <div class="col-2 q-py-md self-center text-center">Tempat komentar</div>
      <div class="col-2 q-py-md self-center text-center"></div>
    </div>

    <q-separator dark color="black" class="q-my-sm" />

    <!-- TAB ISI MATERI (KOSONG) -->
    <div class="text-center self-center q-pa-xl" v-if="this.y == 1">
      <div class="text-h5 text-weight-medium q-py-md">
        Belum ada komentar untuk saat ini
      </div>
      <q-btn
        flat
        text-color="white"
        label="Buat Materi"
        style="background-color: #5e5eef"
      />
    </div>

    <!-- TAB ISI MATERI (BERISI) -->
    <div>
      <div v-for="q in 19" :key="q" class="row text-center bg-white q-my-sm">
        <div class="col-2 q-py-md self-center">
          <q-item>
            <q-item-section side>
              <q-avatar round size="48px">
                <img src="https://cdn.quasar.dev/img/avatar.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>Examplename</q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <div class="col-2 q-py-md self-center">1 Minggu lalu</div>
        <div class="col-2 q-py-md self-center">100</div>
        <div class="col-2 q-py-md self-center">0</div>
        <div class="col-2 q-py-md self-center">Ini gambar</div>
        <div class="col-2 q-py-md self-center">Gambar sampah</div>
      </div>

      <div class="row">
        <div class="col-6 bg-transparent"></div>
        <div class="col-6 bg-transparent">
          <div class="row">
            <div class="col-4 self-center q-py-xs">
              <q-btn-dropdown flat class="bg-transparent">
                <q-list>
                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Photos</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Videos</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Articles</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
            <div class="col-4 self-center q-py-xs"></div>
            <div class="col-1 self-center q-py-xs"></div>
            <div class="col-1 self-center q-py-xs"></div>
            <div class="col-1 self-center q-py-xs"></div>
            <div class="col-1 self-center q-py-xs" style="color: #fafafa">
              k
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FOOTER MENUJU HALAMAN SELANJUTNYA -->
    <div class="fixed-bottom">
      <div class="row">
        <div class="col-6 bg-white"></div>
        <div class="col-6 bg-white">
          <div class="row">
            <div class="col-4 self-center q-py-xs">
              <q-btn-dropdown
                flat
                class="bg-transparent"
                label="Baris perhalaman"
              >
                <q-list>
                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Photos</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Videos</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Articles</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
            <div class="col-4 self-center q-py-xs">1-1 dari 1</div>
            <div class="col-1 self-center q-py-xs">ki</div>
            <div class="col-1 self-center q-py-xs">k</div>
            <div class="col-1 self-center q-py-xs">k</div>
            <div class="col-1 self-center q-py-xs">ka</div>
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
      y: 0,
    };
  },
  methods: {
    onItemClick() {
      console.log("Clicked on an Item");
    },
  },
};
</script>

<style></style>
