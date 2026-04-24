import { h, render } from 'vue';
import ToastNotification from '../components/ToastNotification.vue';

type ToastType = 'info' | 'success' | 'warning' | 'error';

interface ToastOptions {
  title?: string;
  description: string;
  type?: ToastType;
  duration?: number;
}

// Container para os toasts
let toastContainer: HTMLDivElement | null = null;

// Inicializa o container de toasts
function ensureContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

/**
 * Exibe um toast na tela
 * @param options Opções do toast
 */
export function showToast(options: ToastOptions) {
  const container = ensureContainer();
  
  // Cria um elemento para o toast
  const toastElement = document.createElement('div');
  container.appendChild(toastElement);
  
  // Renderiza o componente de toast
  const vNode = h(ToastNotification, {
    ...options,
    onClose: () => {
      // Remove o elemento quando o toast for fechado
      container.removeChild(toastElement);
    }
  });
  
  render(vNode, toastElement);
  
  // Remove automaticamente após a duração
  setTimeout(() => {
    if (container.contains(toastElement)) {
      container.removeChild(toastElement);
    }
  }, options.duration || 5000);
}

// Funções de conveniência para diferentes tipos de toast
export const toast = {
  info: (description: string, title?: string, duration?: number) => 
    showToast({ description, title, type: 'info', duration }),
  
  success: (description: string, title?: string, duration?: number) => 
    showToast({ description, title, type: 'success', duration }),
  
  warning: (description: string, title?: string, duration?: number) => 
    showToast({ description, title, type: 'warning', duration }),
  
  error: (description: string, title?: string, duration?: number) => 
    showToast({ description, title, type: 'error', duration })
};
