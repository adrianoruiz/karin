import StarterKit from '@tiptap/starter-kit';
import { Editor } from '@tiptap/vue-3';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useManufacturerRepository } from '../repositories/manufacturerRepository';

import { Manufacturer, Toast } from '@/types';

export function useManufacturerController() {
  const manufacturerRepository = useManufacturerRepository();
  const router = useRouter();
  const route = useRoute();
  const isActive = ref(true);
  const isLoading = ref(false);
  const toast = ref<Toast>({
    message: '',
    type: 'success',
    show: false
  });

  const isEditing = computed(() => route.params.id !== undefined);

  const manufacturer = ref<Manufacturer>({
    id: null,
    name: '',
    youtubeLink: '',
    about: '',
    featuredImage: null,
    cover: '',
    order: "0",
    categories: [2],
  });

  const editor = new Editor({
    extensions: [StarterKit],
    content: manufacturer.value.about,
    onUpdate: ({ editor }) => {
      manufacturer.value.about = editor.getHTML();
    }
  });

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    toast.value = { message, type, show: true };
  };

  const validateForm = () => {
    if (!manufacturer.value.name.trim()) {
      showToast('O nome é obrigatório', 'error');
      return false;
    }

    if (!manufacturer.value.about.trim()) {
      showToast('A descrição sobre o fabricante é obrigatória', 'error');
      return false;
    }

    return true;
  };

  const handleFileUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      manufacturer.value.featuredImage = input.files[0];
    }
  };

  const handleCancel = () => {
    router.push('/manufacturers');
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      isLoading.value = true;

      if (manufacturer.value.featuredImage) {
        manufacturer.value.cover = await manufacturerRepository.uploadImage(manufacturer.value.featuredImage);
      }

      manufacturer.value.status = isActive.value ? 1 : 0;

      const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

      if (isEditing.value && id) {
        await manufacturerRepository.update(id, manufacturer.value);
      } else {
        await manufacturerRepository.create(manufacturer.value);
      }

      showToast('Fabricante salvo com sucesso!', 'success');
      
      setTimeout(() => {
        router.push('/manufacturers');
      }, 1500);

    } catch (error) {
      console.error('Error saving:', error);
      showToast('Erro ao salvar fabricante', 'error');
    } finally {
      isLoading.value = false;
    }
  };

  const loadManufacturer = async () => {
    if (!isEditing.value) return;
    
    const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    if (!id) return;

    try {
      const data = await manufacturerRepository.getById(id);
      manufacturer.value = data;
      editor.commands.setContent(data.about);
      isActive.value = data.status === 1;
    } catch (error) {
      console.error('Error loading manufacturer:', error);
      showToast('Erro ao carregar fabricante', 'error');
    }
  };

  onMounted(() => {
    loadManufacturer();
  });

  return {
    isActive,
    isLoading,
    isEditing,
    manufacturer,
    editor,
    toast,
    handleFileUpload,
    handleCancel,
    handleSave
  };
}