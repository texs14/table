<template>
  <div class="sort-icon" :class="getClass(props.sortBy)">
    <span class="line"></span>
    <span class="line"></span>
    <span class="line"></span>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({ sortBy: [String, Boolean] });
const getClass = (sortBy) => {
  return sortBy === false
    ? ""
    : sortBy === "asc"
    ? "sort-icon_by-asc"
    : "sort-icon_by-desc";
};
</script>

<style scoped lang="scss">
.sort-icon {
  display: flex;
  flex-flow: column;
  justify-content: space-between;

  min-width: 18px;
  height: 12px;

  cursor: pointer;

  .line {
    width: 12px;
    height: 1.5px;

    background: #000;

    transition: all 0.25s ease-in-out;
  }

  &_by-asc {
    .line {
      @for $i from 1 through 3 {
        &:nth-child(#{$i}) {
          width: calc(5px * #{$i});
        }
      }
    }
  }

  &_by-desc {
    .line {
      @for $i from 1 through 3 {
        &:nth-child(#{$i}) {
          width: calc(15px - #{$i} * 5px + 5px);
        }
      }
    }
  }
}
</style>
