import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { validateCPF } from '../utils/validation';
import { AppointmentService, AppointmentPayload } from '../services/appointment_service';

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
  cpf: string;
  birthDate: string;
  notes: string;
  agreeToTerms: boolean;
  appointmentType: 'online' | 'presencial';
}

export interface AppointmentResult {
  success: boolean;
  message: string;
  data?: any;
}

export const useAppointmentStore = defineStore('appointment', () => {
  // Estados do calendário
  const currentDate = ref(new Date());
  const selectedDate = ref<Date | null>(null);
  const selectedTime = ref("");
  const step = ref(1);
  const isLoading = ref(false);
  const appointmentResult = ref<AppointmentResult | null>(null);
  const showTermsOfUseModal = ref(false);
  const showPrivacyPolicyModal = ref(false);

  // Dados do formulário em um único objeto reativo
  const formData = ref<AppointmentForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cpf: "",
    birthDate: "",
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
      cpf: "",
      birthDate: "",
      notes: "",
      agreeToTerms: false,
      appointmentType: 'online'
    };
    appointmentResult.value = null;
  }

  // Preparar payload para a API
  function prepareAppointmentPayload(): AppointmentPayload {
    if (!selectedDate.value || !selectedTime.value) {
      throw new Error("Data e hora não selecionadas");
    }

    // Formatar a data e hora para o formato aceito pela API
    const appointmentDateTime = AppointmentService.formatDateTimeForAPI(
      selectedDate.value,
      selectedTime.value
    );

    // Preparar o payload com base nos dados do formulário
    return {
      doctor_id: 2, // ID fixo conforme solicitado
      appointment_datetime: appointmentDateTime,
      name: `${formData.value.firstName} ${formData.value.lastName}`,
      email: formData.value.email,
      cpf: formData.value.cpf,
      phone: formData.value.phone,
      birthday: formData.value.birthDate,
      observations: formData.value.notes ? formData.value.notes : 'Agendamento via site',
      status: 'agendada'
    };
  }

  // Agendar consulta
  async function scheduleAppointment() {
    try {
      isLoading.value = true;
      
      // Preparar os dados para envio
      const payload = prepareAppointmentPayload();
      
      // Chamar o serviço para criar o agendamento
      const result = await AppointmentService.createAppointment(payload);
      
      if (result.isSuccess) {
        // Atualizar o resultado
        appointmentResult.value = {
          success: true,
          message: "Consulta agendada com sucesso!",
          data: result.data
        };
        
        // Avançar para o passo de confirmação
        step.value = 3;
      } else {
        appointmentResult.value = {
          success: false,
          message: result.error
        };
      }
    } catch (error: any) {
      console.error("Erro ao agendar consulta:", error);
      
      // Tratar erros inesperados
      appointmentResult.value = {
        success: false,
        message: error.message || "Ocorreu um erro ao agendar sua consulta. Por favor, tente novamente."
      };
    } finally {
      isLoading.value = false;
    }
  }

  // Computed property para validação do formulário
  const isFormValid = computed(() => {
    // Verifica se todos os campos obrigatórios estão preenchidos
    const fieldsValid = 
      formData.value.firstName &&
      formData.value.lastName &&
      formData.value.email &&
      formData.value.phone &&
      formData.value.cpf &&
      formData.value.birthDate &&
      formData.value.agreeToTerms;
    
    // Se os campos básicos não estão preenchidos, retorna false
    if (!fieldsValid) return false;
    
    // Validação do CPF
    const cpfValid = validateCPF(formData.value.cpf);
    
    // Validação da data de nascimento (deve ser uma data no passado)
    const birthDate = new Date(formData.value.birthDate);
    const today = new Date();
    const birthDateValid = birthDate < today;
    
    return cpfValid && birthDateValid && formData.value.agreeToTerms;
  });

  return {
    currentDate,
    selectedDate,
    selectedTime,
    step,
    formData,
    isLoading,
    appointmentResult,
    showTermsOfUseModal,
    showPrivacyPolicyModal,
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
    goToStep1,
    goToStep2,
    resetForm,
    scheduleAppointment,
    isFormValid
  };
});
