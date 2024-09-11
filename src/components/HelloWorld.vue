<template>
  <div class="fill-height d-flex justify-center align-center">
    <v-btn @click="openDialog" rounded="xl" color="var(--main-color)" class="m-auto text-none text-white" elevation="0">Стать резидентом</v-btn>
    <v-dialog v-model="dialogIsOpened" max-width="800px">
      <v-card class="rounded-0">
        <v-card-title class="pa-10 text-h5 font-weight-medium">Заполните заявку, чтобы стать резидентом</v-card-title>
        <v-card-text class="pt-0 pb-10 px-10">
          <form @submit.prevent="submit" class="d-flex flex-column align-center">
            <base-input
              v-model="name.value.value"
              label="Наименование организации / ИП"
              suggestion-type="party"
              :error-messages="name.errorMessage.value"
            ></base-input>

            <base-input
              v-model="phone.value.value"
              label="Контактный телефон"
              mask="+7 (###) ###-##-##"
              :error-messages="phone.errorMessage.value"
            ></base-input>

            <base-select
              v-model="roomType.value.value"
              label="Тип помещения"
              :error-messages="roomType.errorMessage.value"
              :items="roomTypeItems"
              multiple
            ></base-select>

            <base-input
              v-model="address.value.value"
              label="Адрес"
              suggestion-type="address"
              :error-messages="address.errorMessage.value"
            ></base-input>

            <base-range
              v-model="area.value.value"
              label="Площадь помещения (м2)"
              range-type="numbers"
              :error-messages="area.errorMessage.value"
            ></base-range>

            <base-range
              v-model="dates.value.value"
              label="Дата начала аренды"
              range-type="dates"
              :error-messages="dates.errorMessage.value"
            ></base-range>

            <div class="d-flex ga-2 mt-5">
              <v-btn @click="closeDialog" rounded="xl" class="mx-auto text-none px-10" elevation="0">Отменить</v-btn>
              <v-btn type="submit" rounded="xl" color="var(--main-color)" class="mx-auto text-none text-white px-10" elevation="0">Отправить</v-btn>
            </div>
          </form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-alert
      v-model="alertIsVisible"
      class="position-fixed top-0 right-0 w-50"
      :text="alert.text"
      :title="alert.title"
      :type="alert.type"
    ></v-alert>
  </div>
</template>

<script setup lang="ts">
  import { Ref, ref, watch } from 'vue';
  import { useField, useForm } from 'vee-validate';
  import BaseInput from './ui/BaseInput.vue';

  const dialogIsOpened: Ref<boolean> = ref(false);

  const openDialog = () => {
    dialogIsOpened.value = true;
  };

  const closeDialog = () => {
    dialogIsOpened.value = false;
  };

  watch(dialogIsOpened, () => {
    if (!dialogIsOpened.value) handleReset()
  })

  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
      name(value: string | any[]) {
        if (value?.length >= 2) return true

        return 'Наименование должно содержать не менее 2 символов'
      },
      phone(value: string) {
        if (value?.length >= 18) return true

        return 'Номер телефона должен содержать не менее 11 цифр'
      },
      roomType(value: string | any[]) {
        if (value) return true

        return 'Выберите хотя бы один вариант'
      },
      address(value: string | any[]) {
        if (value?.length >= 2) return true

        return 'Адрес должно содержать не менее 2 символов'
      },
      area(value: Array<number | undefined>) {
        if (value && value.length) {
          const [min, max] = value
          if (min && max) return true
        }

        return 'Необходимо указать площадь помещения'
      },
      dates(value: Array<number | undefined>) {
        if (value && value.length) {
          const [min, max] = value
          if (min && max) return true
        }

        return 'Необходимо указать дату начала аренды'
      },
    },
  })

  const name = useField<string>('name')
  const phone = useField<string>('phone')
  const roomType = useField<string>('roomType')
  const address = useField<string>('address')
  const area = useField<number[] | undefined[]>('area')
  const dates = useField<number[] | undefined[]>('dates')

  const roomTypeItems = ref(['Производственная площадь', 'Item 2', 'Item 3', 'Item 4'])

  interface Alert {
    type: 'warning' | 'success',
    title: string,
    text: string
  }

  const alert: Ref<Alert> = ref({
    type: 'success',
    title: '',
    text: '',
  })

  const alertIsVisible: Ref<boolean> = ref(false);

  const submit = handleSubmit(values => {
    try {
      // Отправляем данные на сервер
      alert.value = {
        type: 'success',
        title: 'Отправляем данные на сервер',
        text: JSON.stringify(values, null, 2),
      }
    } catch {
      // Выводим уведомление об ошибки от сервера
      alert.value = {
        type: 'warning',
        title: 'Ошибка от сервера',
        text: 'Что-то пошло не так. Попробуйте еще раз'
      }
    }

    closeDialog()
    alertIsVisible.value = true
  })
</script>
