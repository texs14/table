<template>
  <div class="container">
    <h1>Cars Table</h1>
    <form action="#" @submit.prevent="submit">
      <div class="form-group">
        <label for="id-search">Search by Id:</label>
        <input
          type="text"
          class="form-control"
          id="id-search"
          v-model="formData.id"
        />
      </div>
      <div class="form-group">
        <label for="brand-search">Search by Brand:</label>
        <input
          type="text"
          class="form-control"
          id="brand-search"
          v-model="formData.brand"
        />
      </div>
      <div class="form-group">
        <label>Search by Age Range:</label>
        <div class="d-flex align-items-center">
          <input
            type="number"
            class="form-control"
            id="min-age"
            v-model="formData.ageSince"
            @change="searchHandler"
            placeholder="From"
          />
          <span class="mx-2">-</span>
          <input
            type="number"
            class="form-control"
            id="max-age"
            v-model="formData.ageUntil"
            placeholder="To"
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Search</button>
    </form>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th v-for="row in headerRows" @click="sort(row)" :key="row">
            {{ row }}
            <SortByIcon :sortBy="sortField === row && sortDirection" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="car in filteredCars" :key="car.id">
          <td>{{ car.id }}</td>
          <td>{{ car.brand }}</td>
          <td>{{ car.age }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, reactive, onUpdated, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";

import SortByIcon from "@/components/SortByIcon.vue";

const router = useRouter();
const route = useRoute();

const cars = [
  { id: 1, brand: "BMW", age: 2010 },
  { id: 2, brand: "Audi", age: 2012 },
  { id: 3, brand: "BMW", age: 2016 },
  { id: 4, brand: "Audi", age: 2018 },
];

const headerRows = ["id", "brand", "age"];

// const idSearch = ref("");
const sortField = ref("");
const sortDirection = ref("");
const formData = reactive({
  id: "",
  ageSince: "",
  ageUntil: "",
  brand: "",
});
let filteredCars = reactive(sortData(cars));
let searchRequest = reactive({});

function sort(field) {
  if (field === sortField.value) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortDirection.value = "asc";
  }

  filteredCars = sortData(cars);
}
function sortData(data) {
  if (sortField.value) {
    const field = sortField.value;
    const direction = sortDirection.value === "asc" ? 1 : -1;
    data = data.sort((a, b) => {
      if (a[field] < b[field]) {
        return -1 * direction;
      } else if (a[field] > b[field]) {
        return direction;
      } else {
        return 0;
      }
    });
  }
  return data;
}
function submit() {
  alert(JSON.stringify(formData));
}

onBeforeMount(async () => {
  await router.isReady();
  for (const key in route.query) {
    key !== "" && (formData[key] = route.query[key]);
  }
});

onUpdated(() => {
  searchRequest = {};
  for (const key in formData) {
    searchRequest =
      formData[key] !== ""
        ? { ...searchRequest, [key]: formData[key] }
        : { ...searchRequest };
  }
  const query =
    sortField.value !== ""
      ? { ...searchRequest, [sortField.value]: sortDirection.value }
      : { ...searchRequest };
  console.log("asd", { [sortField.value]: sortDirection.value });
  router.push({ query });
});
</script>
