import VuePlyr from "vue-plyr";
import "vue-plyr/dist/vue-plyr.css";
export default ({ app, router, store, Vue }) => {
  app.use(VuePlyr, {
    plyr: {},
  });
};
