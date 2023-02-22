<template>
  <form class="d-grid gap-3">
    <div class="form-group">
      <label for="id-search">Search by Id:</label>
      <input
        type="text"
        class="form-control"
        id="id-search"
        v-model="state.formData.id"
      />
    </div>
    <div class="form-group">
      <label for="brand-search">Search by Brand:</label>
      <input
        type="text"
        class="form-control"
        id="brand-search"
        v-model="state.formData.brand"
      />
    </div>
    <div class="form-group">
      <label>Search by Age Range:</label>
      <div class="d-flex align-items-center">
        <input
          type="number"
          min="1900"
          :max="maxYear"
          class="form-control"
          id="min-age"
          v-model="state.formData.ageSince"
          placeholder="From"
        />
        <span class="mx-2">-</span>
        <input
          type="number"
          min="1900"
          :max="maxYear"
          class="form-control"
          id="max-age"
          v-model="state.formData.ageUntil"
          placeholder="To"
        />
      </div>
    </div>
    <button type="reset" @click="reset" class="btn btn-primary">Reset</button>
  </form>
</template>

<script setup>
import { onBeforeMount, onUpdated, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const state = reactive({
  searchRequest: {},
  formData: {
    id: "",
    ageSince: "",
    ageUntil: "",
    brand: "",
  },
});
const sortField = ref("");
const sortDirection = ref("");
const maxYear = ref(new Date().getFullYear());

onBeforeMount(async () => {
  await router.isReady();
  for (const key in route.query) {
    key !== "" && (state.formData[key] = route.query[key]);
  }
});

onUpdated(() => {
  state.searchRequest = {};
  for (const key in state.formData) {
    state.searchRequest =
      state.formData[key] !== ""
        ? { ...state.searchRequest, [key]: state.formData[key] }
        : { ...state.searchRequest };
  }
  const query =
    sortField.value !== ""
      ? {
          ...state.searchRequest,
          sortBy: sortField.value,
          [`${sortField.value}Direction`]: sortDirection.value,
        }
      : { ...state.searchRequest };

  router.push({ query });
});

function reset() {
  state.formData = {
    id: "",
    ageSince: "",
    ageUntil: "",
    brand: "",
  };
}
</script>

<style lang="scss" scoped>
input[type="number"] {
  -moz-appearance: textfield;
  -webkit-appearance: textfield;
  appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  display: none;
}
</style>
