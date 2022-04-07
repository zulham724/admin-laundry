<template>
  <q-page class="q-pa-md" style="background-color: #fafafa">
    <div class="row justify-between q-pa-sm">
      <div class="text-h5 text-weight-bold">Data materi Laundry</div>
      <q-btn
        @click="$router.push('add-materi')"
        color="primary"
        label="Tambah materi"
        flat
      ></q-btn>
    </div>
    <div style="height: 20px"></div>
    <div class="row">
      <div class="col-sm-4 q-pa-sm" v-for="module in modules" :key="module.id">
        <item-component :item="module" @delete="deletedModule"></item-component>
      </div>
    </div>
  </q-page>
</template>

<script>
import ItemComponent from "src/components/module/ItemComponent.vue";
export default {
  components: {
    ItemComponent,
  },
  data() {
    return {
      modules: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getModules();
    },
    onItemClick() {
      // console.log("Clicked on an Item");
    },
    getModules() {
      this.$store.dispatch("Module/getModules").then((res) => {
        // console.log("cek data", res);
        this.modules = res.data;
      });
    },
    deletedModule(id) {
      let index = this.modules.findIndex((module) => module.id == id);
      if (index > -1) {
        this.modules.splice(index, 1);
      }
    },
  },
};
</script>

<style></style>
