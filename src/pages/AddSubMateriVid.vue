<template>
  <q-page>
    <div class="row">
      <!-- BUTTON BATAL -->
      <div class="col-2 text-center self-cemter q-pt-lg">
        <q-btn
          outline
          flat
          text-color="black"
          label="Batal"
          style="background-color: #fff; width: 80%"
          @click="$router.push('/add-materi')"
        />
      </div>
      <div class="col-8 text-center">
        <div class="q-py-lg">
          <div class="text-h4 text-weight-medium">Buat Submateri</div>
          <div style="color: #6e6d8f text-weight-medium">
            Submateri di sesuaikan dengan tema materi
          </div>
        </div>

        <div>
          <q-form>
            <q-card flat class="q-py-xl" style="background-color: #eef0fc">
              <br />
              <br />
              <br />
              <br />
              <div>ini gambar</div>
              <div class="text-h6 text-weight-medium">Drag and drop gambar</div>
              <div style="color: #6e6d8f text-weight-medium">
                1600 x 1200 atau direkomendasikan menggunakan resolusi yang
                lebih besar.Max 10MB
              </div>
              <br />
              <br />
              <br />
              <br />
            </q-card>
            <q-input
              class="q-mt-md"
              outlined
              style="background-color: #eef0fc"
              label="Tambahkan Judul"
            />
            <q-input
              type="textarea"
              class="q-mt-md"
              outlined
              style="background-color: #eef0fc"
              label="Isi Submateri"
            />
            <q-input
              class="q-mt-md q-mb-md"
              outlined
              style="background-color: #eef0fc"
              label="Point Submateri"
            />
          </q-form>
        </div>
      </div>
      <!-- BUTTON SIMPAN -->
      <div class="col-2 text-center self-cemter q-pt-lg">
        <q-btn
          flat
          text-color="white"
          label="Simpan"
          style="background-color: #5e5eef; width: 80%"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {};
</script>

<style></style>
