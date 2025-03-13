<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar Component -->
    <sidebar-menu />

    <!-- Main content -->
    <div class="flex-1 overflow-auto">
      <!-- Header Component -->
      <page-header
        title="Agenda"
        subtitle="Visualize e gerencie suas consultas"
        :show-search="false"
      />
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row gap-6 mt-6">
          <!-- Coluna de Agendados -->
          <div class="flex-1">
            <div
              class="bg-amber-100 text-amber-800 px-4 py-3 rounded-t-lg font-medium"
            >
              Agendados ({{ scheduledAppointments.length }})
            </div>
            <div class="p-4 bg-amber-50 rounded-b-lg">
              <appointment-card
                v-for="appointment in scheduledAppointments"
                :key="appointment.id"
                :appointment="appointment"
                :is-completed="false"
                @expand="toggleExpandCard"
              />

              <div
                v-if="scheduledAppointments.length === 0"
                class="text-center py-8 text-gray-500"
              >
                Nenhuma consulta agendada
              </div>
            </div>
          </div>

          <!-- Coluna de Atendidos -->
          <div class="flex-1">
            <div
              class="bg-teal-100 text-teal-800 px-4 py-3 rounded-t-lg font-medium"
            >
              Atendidos ({{ completedAppointments.length }})
            </div>
            <div class="p-4 bg-teal-50 rounded-b-lg">
              <appointment-card
                v-for="appointment in completedAppointments"
                :key="appointment.id"
                :appointment="appointment"
                :is-completed="true"
                @expand="toggleExpandCard"
              />

              <div
                v-if="completedAppointments.length === 0"
                class="text-center py-8 text-gray-500"
              >
                Nenhuma consulta concluída hoje
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MapPin, User, Video } from "lucide-vue-next";
import { ref } from "vue";
import AppointmentCard from "~/components/agenda/appointment_card.vue";
import PageHeader from "~/components/page_header.vue";

// Estado para controle de cards expandidos
const expandedCard = ref(null);

// Dados de exemplo
const scheduledAppointments = ref([
  {
    id: "23472",
    patient: {
      name: "Maria Ferrari",
      avatar: "https://randomuser.me/api/portraits/women/40.jpg",
      age: 42,
      gender: "F",
      healthInsurance: "Amil Premium",
      record: "1548",
    },
    type: "online",
    status: "scheduled",
    dateTime: "2025-03-20T14:00:00",
    duration: 60,
    isFirstVisit: true,
    payment: {
      amount: 300.0,
      method: "credit_card",
      status: "paid",
    },
    reason: "Dor de cabeça persistente, tontura e náusea",
    tags: ["Neurologia", "Primeira consulta"],
  },
  // Outros agendamentos...
]);

const completedAppointments = ref([
  {
    id: "23470",
    patient: {
      name: "Ana Pereira",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      age: 52,
      gender: "F",
      healthInsurance: "SulAmérica",
      record: "127456",
    },
    type: "online",
    status: "completed",
    dateTime: "2025-03-20T09:00:00",
    duration: 45,
    isFirstVisit: false,
    payment: {
      amount: 250.0,
      method: "health_insurance",
      status: "completed",
    },
    reason: "Acompanhamento de tratamento para hipertensão",
    tags: ["Retorno", "Cardiologia"],
    doctorNotes:
      "Paciente apresentou melhora significativa após ajuste da medicação. Pressão arterial normalizada.",
  },
]);

// Funções auxiliares
const toggleExpandCard = (id) => {
  expandedCard.value = expandedCard.value === id ? null : id;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getTimeFromNow = (dateString) => {
  const appointmentTime = new Date(dateString).getTime();
  const now = new Date().getTime();
  const diff = appointmentTime - now;

  if (diff < 0) return "";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
  } else {
    return `${minutes}m`;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "scheduled":
      return "bg-blue-100 text-blue-800";
    case "in-progress":
      return "bg-green-100 text-green-800";
    case "completed":
      return "bg-gray-100 text-gray-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    case "urgent":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "scheduled":
      return "Agendado";
    case "in-progress":
      return "Em atendimento";
    case "completed":
      return "Concluído";
    case "cancelled":
      return "Cancelado";
    case "urgent":
      return "Urgente";
    default:
      return status;
  }
};

const getTypeIcon = (type) => {
  switch (type) {
    case "online":
      return Video;
    case "in-person":
      return MapPin;
    default:
      return User;
  }
};

const getPaymentMethodText = (method) => {
  switch (method) {
    case "credit_card":
      return "Cartão de Crédito";
    case "debit_card":
      return "Cartão de Débito";
    case "cash":
      return "Dinheiro";
    case "pix":
      return "PIX";
    case "health_insurance":
      return "Convênio";
    default:
      return method;
  }
};

const getPaymentStatusColor = (status) => {
  switch (status) {
    case "paid":
      return "text-green-600";
    case "pending":
      return "text-amber-600";
    case "completed":
      return "text-green-600";
    default:
      return "text-gray-600";
  }
};
</script>
