<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
        >
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">Log in</div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md" ref="form">
              <q-input
                filled
                v-model="username"
                label="Username"
                lazy-rules
                type="email"
                :rules="[(val) => !!val || 'Harus diisi']"
              />

              <q-input
                type="password"
                filled
                v-model="password"
                label="Password"
                lazy-rules
                :rules="[(val) => !!val || 'Harus diisi']"
              />

              <div>
                <q-btn
                  :loading="loading"
                  :disabled="loading"
                  label="Login"
                  @click="doLogin()"
                  type="button"
                  color="primary"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      username: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    doLogin() {
      const form = this.$refs.form;
      this.loading = true;
      form.validate().then((valid) => {
        if (valid) {
          this.$store
            .dispatch("Auth/login", {
              username: this.username,
              password: this.password,
            })
            .then(() => {
              this.$router.push("/");
            })
            .catch(() => {
              this.$q.notify({
                color: "negative",
                text: "Username atau password salah",
              });
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          console.log("invalid");
        }
      });
    },
  },
});
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
