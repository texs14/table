<template>
  <tbody class="position-relative">
    <VLoader
      v-if="!props.isLoaded"
      class="position-absolute top-50 start-50 translate-middle-x mt-5"
    />
    <tr v-for="row in props.rows" :key="row.id" v-else>
      <td>{{ row.id }}</td>
      <td>{{ row.brand }}</td>
      <td>{{ row.age }}</td>
    </tr>
  </tbody>
</template>

<script setup>
import VLoader from "@/components/VLoader.vue";

import { defineProps } from "vue";
const props = defineProps({
  rows: Array,
  isLoaded: Boolean,
});
</script>
