<template>
  <ComboboxRoot
    @click="$emit('focus')"
    v-model="props.modelValue"
    class="relative"
  >
    <ComboboxAnchor
      :class="[
        'w-full h-[45px] px-3 rounded-lg border focus:ring-1 appearance-none bg-white flex items-center'
      ]"
    >
      <ComboboxInput
        class="!bg-transparent outline-none text-grass11 h-full selection:bg-grass5 placeholder-mauve8 flex-grow text-[14px]"
        :placeholder="placeholder"
        :disabled="disable"
      />
      <ComboboxTrigger>
        <Icon icon="radix-icons:chevron-down" class="h-4 w-4 text-grass11" />
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxContent
      class="absolute z-10 w-full mt-2 min-w-[160px] bg-white overflow-hidden rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
    >
      <ComboboxViewport class="p-[5px]">
        <ComboboxEmpty
          class="text-mauve8 text-xs font-medium text-center py-2"
        />

        <ComboboxItem
          v-for="option in options"
          :key="option.id"
          class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[30px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-grass9 data-[highlighted]:text-grass1"
          :value="option.name"
          @click="$emit('selectItem', option)"
        >
          <ComboboxItemIndicator
            class="absolute left-0 w-[25px] inline-flex items-center justify-center"
          >
            <Icon icon="radix-icons:check" />
          </ComboboxItemIndicator>
          <span>
            {{ option.name }}
          </span>
        </ComboboxItem>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>
<script setup lang="ts">
import { ListType } from '@/types/listType'
import { Icon } from '@iconify/vue'
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport
} from 'radix-vue'

import { ref, watch } from 'vue'
const props = defineProps({
  options: {
    type: Array<ListType>,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  disable: {
    type: Boolean,
    default: false
  }
})

defineEmits(['selectItem', 'focus'])

const model = ref('')

watch(
  () => props.modelValue,
  value => {
    model.value = value
  }
)
</script>
