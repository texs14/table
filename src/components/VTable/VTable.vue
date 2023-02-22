<template>
  <table class="table table-striped table-hover">
    <TableHeader :fields="props.headerFields" />
    <TableBody :isLoaded="props.isLoaded" :rows="props.bodyRows" />
  </table>
</template>

<script setup>
import TableHeader from "./TableHeader.vue";
import TableBody from "./TableBody.vue";

import { defineProps } from "vue";

const props = defineProps({
  headerFields: Array,
  bodyRows: Array,
  isLoaded: Boolean,
});
</script>
