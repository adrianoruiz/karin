<template>
  <AlertDialogRoot :open="open">
    <AlertDialogPortal>
      <AlertDialogOverlay
        class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30"
      />
      <AlertDialogContent
        class="z-[100] text-[15px] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
      >
        <AlertDialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
          {{ title }}
        </AlertDialogTitle>
        <AlertDialogDescription
          class="text-mauve11 mt-4 mb-5 text-[15px] leading-normal"
        >
          {{ description }}
        </AlertDialogDescription>
        <div class="flex justify-end gap-[25px]">
          <AlertDialogCancel
            class="text-red-500 bg-red-100 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]"
            @click="$emit('close')"
          >
            {{ cancelText }}
          </AlertDialogCancel>
          <AlertDialogAction
            class="focus:shadow-red7 text-primary bg-blue-100 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]"
            @click="$emit('confirmAction')"
          >
            {{ confirmText }}
            <!-- teste -->
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>
<script lang="ts" setup>
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger
} from 'radix-vue'

defineProps(['confirmText', 'cancelText', 'title', 'description', 'open'])
const emit = defineEmits(['close', 'confirmAction'])
</script>
