<template>
  <div class="mb-4 rounded-lg overflow-hidden border bg-white shadow-sm" :class="{
    'border-amber-300': appointment.status === 'urgent',
    'border-gray-200': appointment.status !== 'urgent'
  }">
    <!-- Cabeçalho do Card -->
    <div class="p-4 border-b border-gray-100">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-3">
          <div class="relative">
            <img 
              :src="appointment.patient.avatar" 
              :alt="appointment.patient.name"
              class="w-12 h-12 rounded-full" 
            />
            <div v-if="appointment.status === 'urgent'" class="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 class="font-medium text-gray-900">{{ appointment.patient.name }}</h3>
            <div class="flex items-center text-sm text-gray-500">
              <span>{{ appointment.patient.age }} anos</span>
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <div class="px-2 py-1 rounded text-xs font-medium" :class="getStatusColor(appointment.status)">
            {{ getStatusText(appointment.status) }}
          </div>
          <div class="text-gray-400 text-sm">#{{ appointment.id }}</div>
          <div v-if="!isCompleted" class="text-amber-500 font-medium">
            {{ getTimeFromNow(appointment.dateTime) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Corpo do Card -->
    <div class="p-4 bg-gray-50">
      <div class="flex justify-between items-start">
        <div class="space-y-2">
          <div class="flex items-center text-sm">
            <Calendar size="16" class="mr-2 text-gray-400" />
            <span>{{ formatDate(appointment.dateTime) }}</span>
          </div>
          <div class="flex items-center text-sm">
            <Clock size="16" class="mr-2 text-gray-400" />
            <span>{{ formatTime(appointment.dateTime) }} ({{ appointment.duration }} min)</span>
          </div>
          <div class="flex items-center text-sm">
            <component :is="getTypeIcon(appointment.type)" size="16" class="text-gray-400" />
            <span class="ml-2">
              {{ appointment.type === 'online' ? 'Consulta online' : 'Consulta presencial' }}
              <span v-if="appointment.isFirstVisit"> • Primeira consulta</span>
            </span>
          </div>
        </div>
        
        <div class="text-right">
          <div class="text-sm text-gray-500">Total:</div>
          <div class="font-medium text-lg">R$ {{ appointment.payment.amount.toFixed(2) }}</div>
          <div class="text-xs" :class="getPaymentStatusColor(appointment.payment.status)">
            {{ getPaymentMethodText(appointment.payment.method) }}
          </div>
        </div>
      </div>

      <!-- Detalhes da consulta (expandível) -->
      <div v-if="isExpanded" class="mt-4 pt-4 border-t border-gray-200">
        <div class="mb-3">
          <div class="text-xs font-medium text-gray-500 mb-1">MOTIVO DA CONSULTA</div>
          <p class="text-sm text-gray-700">{{ appointment.reason }}</p>
        </div>
        
        <div v-if="appointment.patient.healthInsurance" class="mb-3">
          <div class="text-xs font-medium text-gray-500 mb-1">CONVÊNIO</div>
          <p class="text-sm text-gray-700">{{ appointment.patient.healthInsurance }}</p>
        </div>
        
        <div v-if="isCompleted && appointment.doctorNotes" class="mb-3">
          <div class="text-xs font-medium text-gray-500 mb-1">OBSERVAÇÕES MÉDICAS</div>
          <p class="text-sm text-gray-700">{{ appointment.doctorNotes }}</p>
        </div>
        
        <div class="flex flex-wrap gap-2 mt-2">
          <span
            v-for="tag in appointment.tags"
            :key="tag"
            class="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <!-- Rodapé do Card -->
    <div class="p-3 bg-white border-t border-gray-100 flex justify-between items-center">
      <button
        @click="$emit('expand', appointment.id)"
        class="text-sm text-blue-600 flex items-center"
      >
        <component :is="isExpanded ? ChevronUp : ChevronDown" size="16" class="mr-1" />
        {{ isExpanded ? 'Menos detalhes' : 'Mais detalhes' }}
      </button>

      <div class="flex space-x-2">
        <template v-if="!isCompleted">
          <button
            v-if="appointment.type === 'online'"
            class="px-4 py-2 bg-green-600 text-white rounded-md flex items-center text-sm font-medium"
          >
            <Video size="16" class="mr-2" />
            Atender online
          </button>
          <button
            v-else
            class="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center text-sm font-medium"
          >
            <User size="16" class="mr-2" />
            Atender presencial
          </button>
          
          <button class="p-2 text-red-500 rounded hover:bg-red-50">
            <X size="18" />
          </button>
        </template>

        <button
          v-if="isCompleted"
          class="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center text-sm font-medium"
        >
          <FileText size="16" class="mr-2" />
          Ver prontuário
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Calendar, Clock, Video, MapPin, User, FileText, ChevronDown, ChevronUp, X } from 'lucide-vue-next';

const props = defineProps({
  appointment: {
    type: Object,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  isExpanded: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['expand']);

// Funções auxiliares
const getStatusColor = (status) => {
  switch (status) {
    case 'scheduled': return 'bg-blue-100 text-blue-800';
    case 'in-progress': return 'bg-green-100 text-green-800';
    case 'completed': return 'bg-gray-100 text-gray-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    case 'urgent': return 'bg-amber-100 text-amber-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'scheduled': return 'Agendado';
    case 'in-progress': return 'Em atendimento';
    case 'completed': return 'Concluído';
    case 'cancelled': return 'Cancelado';
    case 'urgent': return 'Urgente';
    default: return status;
  }
};

const getTypeIcon = (type) => {
  switch (type) {
    case 'online': return Video;
    case 'in-person': return MapPin;
    default: return User;
  }
};

const getPaymentMethodText = (method) => {
  switch (method) {
    case 'credit_card': return 'Cartão de Crédito';
    case 'debit_card': return 'Cartão de Débito';
    case 'cash': return 'Dinheiro';
    case 'pix': return 'PIX';
    case 'health_insurance': return 'Convênio';
    default: return method;
  }
};

const getPaymentStatusColor = (status) => {
  switch (status) {
    case 'paid': return 'text-green-600';
    case 'pending': return 'text-amber-600';
    case 'completed': return 'text-green-600';
    default: return 'text-gray-600';
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

const getTimeFromNow = (dateString) => {
  const appointmentTime = new Date(dateString).getTime();
  const now = new Date().getTime();
  const diff = appointmentTime - now;
  
  if (diff < 0) return "";
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
  } else {
    return `${minutes}m`;
  }
};
</script>
