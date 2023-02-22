<template>
  <section>
    <h1>Cars Table</h1>
    <SearchForm class="mb-5" />
    <VTable
      :headerFields="headerRows"
      :bodyRows="state.cars"
      :isLoaded="state.isLoaded"
    />
  </section>
</template>

<script setup>
import SearchForm from "@/components/SearchForm.vue";
import VTable from "@/components/VTable/VTable.vue";

import { ref, reactive, watch, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";

import { CARS_URL } from "@/lib/constants";
import { getQueryParams } from "@/utils";
import axios from "@/lib/axios";

const route = useRoute();
const router = useRouter();

const timer = ref(null);

let state = reactive({
  cars: [{}],
  isLoaded: false,
});

const headerRows = ["id", "brand", "age"];

onBeforeMount(() => {
  getCars();
});

watch(route, async () => {
  if (timer.value) {
    clearTimeout(timer.value);
  }

  timer.value = setTimeout(() => {
    getCars();
    timer.value = null;
  }, 700);
});
async function getCars() {
  const params = await getQueryParams(router, route);
  state.isLoaded = false;
  axios(CARS_URL + "?" + params)
    .then((data) => {
      // Сюда мы не попадаем
      state.cars = [...data];
    })
    .catch(() => {
      // Попадаем сюда и хардкодим данные
      const data = [
        { id: 1, brand: "BMW", age: 2010 },
        { id: 2, brand: "Audi", age: 2012 },
        { id: 3, brand: "BMW", age: 2016 },
        { id: 4, brand: "Audi", age: 2018 },
      ];
      state.cars = [...data];
    })
    .finally(() => {
      state.isLoaded = true;
    });
}
</script>
