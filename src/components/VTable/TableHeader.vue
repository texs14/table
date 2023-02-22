<template>
  <thead>
    <tr>
      <th
        class="border cur"
        role="button"
        v-for="field in props.fields"
        @click="sort(field)"
        :key="field"
      >
        <span class="d-flex align-items-center gap-3 w-auto">
          {{ field }}
          <SortByIcon :sortBy="sortField === field && sortDirection" />
        </span>
      </th>
    </tr>
  </thead>
</template>

<script setup>
import SortByIcon from "@/components/SortByIcon.vue";

import { useRoute, useRouter } from "vue-router";
import { ref, watch, defineProps, onBeforeMount } from "vue";

const props = defineProps({
  fields: Array,
});

const router = useRouter();
const route = useRoute();

const sortDirection = ref("");
const sortField = ref("");

onBeforeMount(async () => {
  await router.isReady();

  route.query.direction && (sortDirection.value = route.query.direction);
  route.query.sortBy && (sortField.value = route.query.sortBy);
});

watch(route, () => {
  !route.query.direction && (sortDirection.value = "");
  !route.query.sortBy && (sortField.value = "");
});

function sort(field) {
  if (field === sortField.value) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortDirection.value = "asc";
  }

  router.push({
    query: {
      sortBy: sortField.value,
      direction: sortDirection.value,
    },
  });
}
</script>
