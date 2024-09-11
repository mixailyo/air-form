<template>
  <div class="base-range">
    <div class="base-range__label">{{ label }}</div>
    <v-row v-if="rangeType === 'numbers'">
      <v-col>
        <v-number-input
          v-model="min"
          :max="max"
          :error-messages
          :reverse="true"
          suffix="от"
        ></v-number-input>
      </v-col>
      <v-col>
        <v-number-input
          v-model="max"
          :min="min"
          :reverse="true"
          suffix="до"
        ></v-number-input>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <v-date-input
          v-model="min"
          :max="max"
          :error-messages
          :reverse="true"
          suffix="с"
          prepend-icon=""
          placeholder=""
        ></v-date-input>
      </v-col>
      <v-col>
        <v-date-input
          v-model="max"
          :min="min"
          :reverse="true"
          suffix="по"
          prepend-icon=""
          placeholder=""
        ></v-date-input>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, defineEmits } from 'vue';

interface Props {
  label: string,
  modelValue: Array<number | undefined>,
  rangeType: 'numbers' | 'dates'
  errorMessages?: string,
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [undefined, undefined]
})

const emit = defineEmits(['update:modelValue']);

const min = ref(props.modelValue[0])
const max = ref(props.modelValue[1])

watch([min, max], () => {
  emit('update:modelValue', [min.value, max.value]);
});
</script>

<style lang="scss" scoped>
.base-range {
  width: 100%;

  &__label {
    color: var(--main-color);
    font-size: 14px;
    font-weight: 300;
    line-height: 110%;
    margin-bottom: 20px;
  }

  &:deep(.v-number-input__control) {
    display: none;
  }

  &:deep(.v-text-field__suffix) {
    opacity: 1;
    padding-inline: var(--v-field-padding-end) var(--v-field-padding-end);
  }

  &:deep(.v-field__input) {
    padding-inline: 16px 16px;
  }
}
</style>


