<template>
  <div
    class="q-mx-sm q-my-md"
    style="background-color: white; border-radius: 10px"
  >
    <div style="border-radius: 10px 10px 0px 0px">
      <div v-if="thumbnail64">
        <q-img
          :src="thumbnail64.src"
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
        {{ content.tittle }}
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
            v-if="content.duration"
            class="text-weight-medium self-center"
            style="color: #2a2b30; font-size: larger"
          >
            {{ content.duration }} menit
          </div>
        </div>
      </div>
      <!-- Delete -->
      <div class="row q-mt-sm">
        <q-btn
          @click="
            () =>
              $store.commit('Module/REMOVED_CONTENT', {
                key: content.key,
              })
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
            Hapus
          </div>
        </q-btn>
      </div>
      <!-- Edit -->
      <!-- <div class="row q-mt-sm">
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
      </div> -->
    </div>
  </div>
</template>

<script>
import { fileToBase64 } from "src/helper";
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      content: this.item,
      thumbnail64: null,
    };
  },
  mounted() {
    this.init();
    console.log('cek item', this.item)
  },
  methods: {
    async init() {
      if (this.content.thumbnail) {
        this.thumbnail64 = await fileToBase64(this.content.thumbnail);
        console.log('thumbnail64', this.thumbnail64)
      }
    },
    deleteContent() {
      this.$commit("Module/REMOVED_CONTENT", { key: this.content.key });
      this.$emit("delete", { key: this.content.key });
    },
  },
};
</script>

<style></style>
