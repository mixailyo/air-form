<template>
  <v-select
    v-model="internalModel"
    class="base-select"
    menu-icon="$expand"
    :error-messages="props.errorMessages"
    :items
    :label
    :multiple
  ></v-select>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, defineEmits } from 'vue';

const props = defineProps({
  label: String,
  items: Array,
  multiple: Boolean,
  modelValue: [String, Array],
  errorMessages: String,
});

const internalModel = ref(props.modelValue);

const emit = defineEmits(['update:modelValue']);

watch(internalModel, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>
