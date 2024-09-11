<template>
  <v-combobox
    v-model="internalModel"
    @keyup="updateSuggestions($event.target.value)"
    class="base-input"
    :error-messages
    :label
    :items
    menu-icon="$expand"
    v-maska:myValue.unmasked="mask"
  ></v-combobox>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, defineEmits, Ref } from 'vue';
import { SuggestionType } from '@/types/suggestion.types';
import { getSuggestions } from '@/api/suggestions'
import { debounce } from 'vue-debounce';
import { vMaska } from "maska/vue"

interface Props {
  label: string,
  modelValue?: string,
  errorMessages?: string,
  suggestionType?: SuggestionType,
  mask?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue']);
const internalModel = ref(props.modelValue);
const items: Ref<string[]> = ref([]);

watch(internalModel, (newValue) => {
  emit('update:modelValue', newValue);
});

const updateSuggestions = async (value: string) => {
  if (props.suggestionType) {
    let payload = {
      token: import.meta.env.VITE_API_KEY,
      query: value,
      type: props.suggestionType
    }

    debounce(async() => {
      items.value = await getSuggestions(payload)
    }, 1000)()
  }
}
</script>
