import { createStore } from "vuex";
import exampleModule from "@/store/modules/example";

export default createStore({
  modules: {
    example: exampleModule,
  },
});
