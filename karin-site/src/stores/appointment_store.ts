import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Day {
  date: Date;
  day: number;
  available: boolean;
  isCurrentMonth: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface AppointmentForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
  agreeToTerms: boolean;
  appointmentType: 'online' | 'presencial';
}

export const useAppointmentStore = defineStore('appointment', () => {
  // Estados do calendário
  const currentDate = ref(new Date());
  const selectedDate = ref<Date | null>(null);
  const selectedTime = ref("");
  const step = ref(1);

  // Dados do formulário em um único objeto reativo
  const formData = ref<AppointmentForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
    agreeToTerms: false,
    appointmentType: 'online'
  });

  // Formatador de data para exibição do mês e ano
  const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  });

  // Propriedades computadas para o calendário
  const currentMonthName = computed(() => {
    return dateFormatter.format(currentDate.value);
  });

  const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

  // Gerar dias para a visualização do mês atual
  const calendarDays = computed((): Day[] => {
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth();

    // Obter o primeiro e último dia do mês
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Calcular dias do mês anterior para exibir
    const daysFromPrevMonth = firstDayOfMonth.getDay();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: Day[] = [];

    // Adicionar dias do mês anterior
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrevMonth - i);
      days.push({
        date,
        day: date.getDate(),
        available: false,
        isCurrentMonth: false,
      });
    }

    // Adicionar dias do mês atual
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        day: i,
        available: isDateAvailable(date),
        isCurrentMonth: true,
      });
    }

    // Adicionar dias do próximo mês se necessário (preencher a grade)
    const remainingDays = 42 - days.length; // 6 linhas de 7 dias
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        day: i,
        available: false,
        isCurrentMonth: false,
      });
    }

    return days;
  });

  // Função para verificar disponibilidade da data
  function isDateAvailable(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Exemplo: disponível se não for no passado e não for fim de semana
    return date >= today && ![0, 6].includes(date.getDay());
  }

  // Horários disponíveis com base na data selecionada
  const availableTimeSlots = computed((): TimeSlot[] => {
    if (!selectedDate.value) return [];

    // Aqui você normalmente buscaria horários disponíveis de um backend
    // Exemplo: horários diferentes para dias diferentes da semana
    const dayOfWeek = selectedDate.value.getDay();

    // Base de horários
    const allSlots = {
      morning: ["09:00", "10:00", "11:00"],
      afternoon: ["14:00", "15:00", "16:00"],
    };

    let slots: string[] = [];

    // Customizar horários por dia da semana
    switch (dayOfWeek) {
      case 1: // Segunda-feira - apenas manhã
        slots = allSlots.morning;
        break;
      case 5: // Sexta-feira - apenas tarde
        slots = allSlots.afternoon;
        break;
      default: // Outros dias - todos os horários
        slots = [...allSlots.morning, ...allSlots.afternoon];
    }

    return slots.map((time) => ({
      time,
      available: true,
    }));
  });

  // Formatar a data selecionada para exibição
  const formattedSelectedDate = computed(() => {
    if (!selectedDate.value) return "";

    return selectedDate.value.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  });

  // Formatar o horário para exibição no formato "07:00 - 07:30"
  const formattedTimeRange = computed(() => {
    if (!selectedTime.value) return "";
    
    // Parsear o horário inicial
    const [hours, minutes] = selectedTime.value.split(':').map(Number);
    
    // Criar objetos de data para o horário inicial e final (30 minutos depois)
    const startTime = new Date();
    startTime.setHours(hours, minutes, 0, 0);
    
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + 30);
    
    // Formatar os horários
    const startFormatted = startTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false });
    const endFormatted = endTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false });
    
    return `${startFormatted} - ${endFormatted}`;
  });

  // Navegação do calendário
  function prevMonth() {
    const newDate = new Date(currentDate.value);
    newDate.setMonth(newDate.getMonth() - 1);
    currentDate.value = newDate;
  }

  function nextMonth() {
    const newDate = new Date(currentDate.value);
    newDate.setMonth(newDate.getMonth() + 1);
    currentDate.value = newDate;
  }

  // Manipuladores de ação
  function selectDay(day: Day) {
    if (day.available && day.isCurrentMonth) {
      selectedDate.value = new Date(day.date);
      selectedTime.value = ""; // Resetar o horário quando a data muda
    }
  }

  function selectTime(timeSlot: TimeSlot) {
    if (timeSlot.available) {
      selectedTime.value = timeSlot.time;
    }
  }

  function goToStep2() {
    if (selectedDate.value && selectedTime.value) {
      step.value = 2;
    }
  }

  function goToStep1() {
    step.value = 1;
  }

  // Resetar o formulário
  function resetForm() {
    selectedDate.value = null;
    selectedTime.value = "";
    step.value = 1;
    formData.value = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      notes: "",
      agreeToTerms: false,
      appointmentType: 'online'
    };
  }

  function scheduleAppointment() {
    // Aqui você enviaria os dados do agendamento para seu backend
    alert(
      `Consulta ${formData.value.appointmentType} agendada para ${formattedSelectedDate.value} às ${selectedTime.value}\nPaciente: ${formData.value.firstName} ${formData.value.lastName}`
    );
    resetForm();
  }

  return {
    currentDate,
    selectedDate,
    selectedTime,
    step,
    formData,
    currentMonthName,
    weekDays,
    calendarDays,
    availableTimeSlots,
    formattedSelectedDate,
    formattedTimeRange,
    prevMonth,
    nextMonth,
    selectDay,
    selectTime,
    goToStep2,
    goToStep1,
    resetForm,
    scheduleAppointment
  }
})
