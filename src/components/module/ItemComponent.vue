<template>
  <q-card class="my-card" flat bordered v-if="module">
    <q-img
      v-if="module.thumbnail"
      :src="`${STORAGE_URL}/${module.thumbnail.src}`"
      height="200px"
    />
    <q-img
      height="200px"
      v-else
      src="https://source.unsplash.com/random/?laundry"
    />

    <q-card-section>
      <div class="text-overline text-orange-9" v-if="module.contents.length">
        {{ module.contents.length }} Materi
      </div>
      <div class="text-overline text-orange-9" v-else>Tidak ada materi</div>
      <div class="text-h5 q-mt-sm q-mb-xs">{{ module.tittle }}</div>
      <div class="text-caption text-grey">
        {{ module.description }}
      </div>
    </q-card-section>

    <q-card-actions>
      <q-btn flat color="dark" label="Edit" />
      <q-btn
        flat
        color="primary"
        label="Hapus"
        :loading="loading"
        :disable="loading"
        @click="doDelete()"
      />

      <q-space />

      <q-btn
        color="grey"
        round
        flat
        dense
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
      />
    </q-card-actions>

    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />
        <q-card-section class="text-subitle2">
          <div
            class="row justify-between align-center"
            v-for="content in module.contents"
            :key="content.id"
          >
            <div class="text-subtitle1 text-weight-bold">
              - {{ content.tittle }}
            </div>
            <q-btn flat size="sm" icon="search"></q-btn>
          </div>
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      STORAGE_URL: STORAGE_URL,
      loading: false,
      module: this.item,
      expanded: false,
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    };
  },
  methods: {
    doDelete() {
      this.loading = true;
      this.$store
        .dispatch("Module/deleteModule", this.module.id)
        .then(() => {
          this.$emit("delete", this.module.id);
        })
        .finally(() => {
          this.loading = false;
          this.$q.notify({
            color: "positive",
            message: "Berhasil menghapus materi",
          });
        });
    },
  },
};
</script>

<style></style>
