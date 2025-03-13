<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar Component -->
    <sidebar-menu />

    <!-- Main content -->
    <div class="flex-1 overflow-auto">
      <!-- Header Component -->
      <page-header
        title="Prescrição"
        subtitle="Crie prescrições médicas para seus pacientes"
        search-placeholder="Buscar prescrição por paciente..."
        :notification-count="0"
        action-button-text="Nova Prescrição"
        :action-button-icon="FilePlus"
        @search="handleSearch"
        @action-click="startNewPrescription"
      />

      <!-- Main content -->
      <main class="p-6">
        <!-- Seleção de paciente ou visualização de prescrição -->
        <div
          v-if="!selectedPatient && !isCreatingNew"
          class="bg-white rounded-lg shadow p-6"
        >
          <div class="max-w-3xl mx-auto">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-medium text-gray-800 mb-2">
                Selecione um paciente
              </h2>
              <p class="text-gray-600">
                Selecione um paciente para criar uma nova prescrição médica
              </p>
            </div>

            <!-- Busca de pacientes -->
            <div class="mb-6">
              <div class="relative">
                <input
                  type="text"
                  v-model="patientSearchQuery"
                  placeholder="Buscar paciente por nome..."
                  class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search
                  size="20"
                  class="absolute left-3 top-3.5 text-gray-400"
                />
              </div>
            </div>

            <!-- Lista de pacientes -->
            <div class="space-y-3 mb-6">
              <div
                v-for="patient in filteredPatients"
                :key="patient.id"
                @click="selectPatient(patient)"
                class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-colors"
              >
                <div class="flex-shrink-0 mr-4">
                  <img
                    :src="patient.avatar || 'https://via.placeholder.com/100'"
                    :alt="patient.name"
                    class="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">{{ patient.name }}</h3>
                  <div class="text-sm text-gray-500">
                    {{ patient.age }} anos •
                    {{ patient.gender === "F" ? "Feminino" : "Masculino" }}
                    <span v-if="patient.healthInsurance">
                      • {{ patient.healthInsurance }}
                    </span>
                  </div>
                </div>
                <div class="ml-auto flex items-center">
                  <span
                    v-if="patient.prescriptionCount > 0"
                    class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                  >
                    {{ patient.prescriptionCount }} prescrições
                  </span>
                  <ChevronRight size="18" class="text-gray-400 ml-2" />
                </div>
              </div>
            </div>

            <!-- Mensagem quando não há resultados -->
            <div
              v-if="filteredPatients.length === 0"
              class="text-center py-10 border border-gray-200 rounded-lg"
            >
              <UserX size="48" class="mx-auto text-gray-300 mb-4" />
              <h3 class="text-lg font-medium text-gray-700 mb-1">
                Nenhum paciente encontrado
              </h3>
              <p class="text-gray-500">Tente buscar com outro termo</p>
            </div>
          </div>
        </div>

        <!-- Formulário de prescrição -->
        <div
          v-if="selectedPatient || isCreatingNew"
          class="bg-white rounded-lg shadow"
        >
          <!-- Cabeçalho do formulário -->
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <button
                  @click="cancelForm"
                  class="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft size="20" class="text-gray-600" />
                </button>
                <div>
                  <h2 class="text-xl font-medium text-gray-800">
                    {{ isCreatingNew ? "Nova Prescrição" : "Prescrição" }}
                  </h2>
                  <p v-if="selectedPatient" class="text-gray-600">
                    Paciente: {{ selectedPatient.name }}
                  </p>
                </div>
              </div>
              <div class="flex space-x-3">
                <button
                  @click="cancelForm"
                  class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  @click="savePrescription"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Salvar Prescrição
                </button>
              </div>
            </div>
          </div>

          <!-- Corpo do formulário -->
          <div class="p-6">
            <div class="max-w-4xl mx-auto">
              <!-- Informações do paciente -->
              <div
                v-if="selectedPatient"
                class="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img
                      :src="
                        selectedPatient.avatar ||
                        'https://via.placeholder.com/100'
                      "
                      :alt="selectedPatient.name"
                      class="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 class="text-lg font-medium text-gray-900">
                        {{ selectedPatient.name }}
                      </h3>
                      <div class="text-sm text-gray-600 mt-1">
                        {{ selectedPatient.age }} anos •
                        {{
                          selectedPatient.gender === "F"
                            ? "Feminino"
                            : "Masculino"
                        }}
                        •
                        {{ selectedPatient.phone }}
                      </div>
                      <div class="text-sm text-gray-600">
                        {{ selectedPatient.healthInsurance || "Particular" }}
                      </div>
                    </div>
                  </div>
                  <button
                    @click="openTriagePanel(selectedPatient.id)"
                    class="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg flex items-center hover:bg-blue-200 transition-colors"
                  >
                    <Stethoscope size="18" class="mr-2" />
                    Ver Triagem
                  </button>
                </div>
              </div>

              <!-- Seleção de paciente (apenas para nova prescrição) -->
              <div v-if="isCreatingNew && !selectedPatient" class="mb-8">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Selecione o Paciente</label
                >
                <div class="relative">
                  <select
                    v-model="selectedPatientId"
                    @change="handlePatientSelection"
                    class="w-full pl-3 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="" disabled selected>
                      Selecione um paciente
                    </option>
                    <option
                      v-for="patient in patients"
                      :key="patient.id"
                      :value="patient.id"
                    >
                      {{ patient.name }}
                    </option>
                  </select>
                  <ChevronDown
                    size="20"
                    class="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              <!-- Formulário de prescrição -->
              <div class="space-y-8">
                <!-- Data e tipo de atendimento -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Data da Prescrição</label
                    >
                    <div class="relative">
                      <input
                        type="date"
                        v-model="prescriptionData.date"
                        class="w-full pl-3 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <Calendar
                        size="20"
                        class="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Validade (dias)</label
                    >
                    <input
                      type="number"
                      v-model="prescriptionData.validity"
                      min="1"
                      class="w-full pl-3 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <!-- Checkbox para Controle Especial -->
                <div class="mt-4">
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="controleEspecial"
                      v-model="prescriptionData.controleEspecial"
                      class="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      for="controleEspecial"
                      class="ml-2 block text-sm font-medium text-gray-700"
                      >Controle especial</label
                    >
                  </div>
                </div>

                <!-- Tipo de Documento (quando não for controle especial) -->
                <div class="mt-4" v-if="!prescriptionData.controleEspecial">
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Tipo de Documento</label
                  >
                  <select
                    v-model="prescriptionData.tipoDocumento"
                    class="w-full pl-3 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="PRESCRIÇÃO MÉDICA">PRESCRIÇÃO MÉDICA</option>
                    <option value="ATESTADO MÉDICO">ATESTADO MÉDICO</option>
                    <option value="LAUDO MÉDICO">LAUDO MÉDICO</option>
                    <option value="RELATÓRIO MÉDICO">RELATÓRIO MÉDICO</option>
                    <option value="DECLARAÇÃO MÉDICA">DECLARAÇÃO MÉDICA</option>
                    <option value="ENCAMINHAMENTO MÉDICO">
                      ENCAMINHAMENTO MÉDICO
                    </option>
                  </select>
                </div>

                <!-- Medicamentos -->
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <label class="block text-sm font-medium text-gray-700"
                      >Medicamentos</label
                    >
                    <div class="flex items-center space-x-4">
                      <div class="flex items-center space-x-2">
                        <span class="text-sm text-gray-600">Modo:</span>
                        <div class="relative inline-block w-36">
                          <select
                            v-model="prescriptionMode"
                            class="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                          >
                            <option value="simple">Simples</option>
                            <option value="advanced">Avançado</option>
                          </select>
                          <ChevronDown
                            size="16"
                            class="absolute right-3 top-2 text-gray-400 pointer-events-none"
                          />
                        </div>
                      </div>
                      <button
                        v-if="prescriptionMode === 'advanced'"
                        @click="addMedication"
                        class="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <Plus size="16" class="mr-1" />
                        Adicionar Medicamento
                      </button>
                    </div>
                  </div>

                  <!-- Modo Simples -->
                  <div v-if="prescriptionMode === 'simple'" class="mb-4">
                    <textarea
                      v-model="prescriptionData.simplePrescription"
                      rows="10"
                      class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Digite a prescrição completa aqui... 
Ex:
1. Fluoxetina 20mg - Tomar 1 comprimido ao dia pela manhã
2. Clonazepam 2mg - Tomar 1 comprimido à noite antes de dormir"
                    ></textarea>
                  </div>

                  <!-- Modo Avançado -->
                  <div v-else>
                    <div
                      v-for="(
                        medication, index
                      ) in prescriptionData.medications"
                      :key="index"
                      class="p-4 border border-gray-200 rounded-lg mb-4"
                    >
                      <div class="flex justify-between items-start mb-4">
                        <h4 class="font-medium text-gray-900">
                          Medicamento {{ index + 1 }}
                        </h4>
                        <button
                          @click="removeMedication(index)"
                          class="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size="18" />
                        </button>
                      </div>

                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                            >Nome do Medicamento</label
                          >
                          <input
                            type="text"
                            v-model="medication.name"
                            class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Ex: Fluoxetina"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                            >Dosagem</label
                          >
                          <input
                            type="text"
                            v-model="medication.dosage"
                            class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Ex: 20mg"
                          />
                        </div>
                      </div>

                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                            >Forma Farmacêutica</label
                          >
                          <select
                            v-model="medication.form"
                            class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="comprimido">Comprimido</option>
                            <option value="capsula">Cápsula</option>
                            <option value="solucao">Solução Oral</option>
                            <option value="gotas">Gotas</option>
                            <option value="xarope">Xarope</option>
                            <option value="pomada">Pomada</option>
                            <option value="injetavel">Injetável</option>
                          </select>
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-gray-700 mb-2"
                            >Quantidade</label
                          >
                          <input
                            type="text"
                            v-model="medication.quantity"
                            class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Ex: 30 comprimidos"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          class="block text-sm font-medium text-gray-700 mb-2"
                          >Posologia</label
                        >
                        <textarea
                          v-model="medication.instructions"
                          rows="3"
                          class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Ex: Tomar 1 comprimido ao dia, pela manhã"
                        ></textarea>
                      </div>
                    </div>

                    <!-- Mensagem quando não há medicamentos -->
                    <div
                      v-if="prescriptionData.medications.length === 0"
                      class="text-center py-8 border border-gray-200 rounded-lg"
                    >
                      <Pill size="48" class="mx-auto text-gray-300 mb-4" />
                      <h3 class="text-lg font-medium text-gray-700 mb-1">
                        Nenhum medicamento adicionado
                      </h3>
                      <p class="text-gray-500 mb-4">
                        Adicione medicamentos à prescrição
                      </p>
                      <button
                        @click="addMedication"
                        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus size="18" class="inline-block mr-1" />
                        Adicionar Medicamento
                      </button>
                    </div>
                  </div>

                  <!-- Observações -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Observações</label
                    >
                    <textarea
                      v-model="prescriptionData.notes"
                      rows="3"
                      class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Observações adicionais para o paciente"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Rodapé do formulário -->
          <div class="p-6 border-t border-gray-200 flex justify-end space-x-3">
            <button
              @click="cancelForm"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              @click="printPrescription"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <Printer size="18" class="mr-2" />
              Imprimir
            </button>
            <button
              @click="savePrescription"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Salvar Prescrição
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>

  <!-- Painel lateral de triagem -->
  <Teleport to="body" v-if="triagePanelStore.isOpen">
    <div class="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
      <triage-data-panel />
    </div>
  </Teleport>

  <!-- Modal de impressão -->
  <Teleport to="body" v-if="showPrintModal">
    <div
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
    >
      <div
        class="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-auto"
      >
        <!-- Cabeçalho do modal -->
        <div
          class="p-4 border-b border-gray-200 flex justify-between items-center"
        >
          <h3 class="text-lg font-medium">Visualização da Impressão</h3>
          <div class="flex items-center space-x-2">
            <button
              @click="printDocument"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Printer size="18" class="mr-2" />
              Imprimir
            </button>
            <button
              @click="showPrintModal = false"
              class="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size="20" class="text-gray-600" />
            </button>
          </div>
        </div>

        <!-- Opções de impressão -->
        <div class="p-4 border-b border-gray-200">
          <div class="flex flex-wrap gap-4">
            <div class="flex items-center">
              <input
                type="checkbox"
                id="carimbar"
                v-model="printOptions.carimbar"
                class="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label
                for="carimbar"
                class="ml-2 text-sm font-medium text-gray-700"
              >
                Carimbar
              </label>
            </div>
            <div class="flex items-center">
              <input
                type="checkbox"
                id="papelTimbrado"
                v-model="printOptions.papelTimbrado"
                class="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label
                for="papelTimbrado"
                class="ml-2 text-sm font-medium text-gray-700"
              >
                Papel Timbrado
              </label>
            </div>
            <div class="flex items-center">
              <input
                type="checkbox"
                id="imprimirData"
                v-model="printOptions.imprimirData"
                class="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label
                for="imprimirData"
                class="ml-2 text-sm font-medium text-gray-700"
              >
                Imprimir data
              </label>
            </div>
            <div class="flex items-center">
              <input
                type="checkbox"
                id="impTermica"
                v-model="printOptions.impTermica"
                class="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label
                for="impTermica"
                class="ml-2 text-sm font-medium text-gray-700"
              >
                Imp. Térmica
              </label>
            </div>
          </div>
        </div>

        <!-- Conteúdo da impressão -->
        <div class="p-4">
          <div id="print-content" class="bg-white p-6 mx-auto max-w-[21cm]">
            <!-- Receituário de Controle Especial - 1ª via -->
            <div
              v-if="prescriptionData.controleEspecial"
              class="border border-gray-800 p-4 mb-8 print-section"
            >
              <div class="text-center font-bold text-xl mb-4">
                Receituário de controle especial - 1ª via
              </div>

              <!-- Identificação do emitente e informações da via -->
              <div class="flex border border-gray-800 mb-4">
                <div class="p-3 flex-1">
                  <div class="font-bold">IDENTIFICAÇÃO DO EMITENTE</div>
                  <div>Dra. Karin Alana Da Rosa</div>
                  <div>CRM:26419-SC</div>
                  <div>Endereço: Rua Paes Leme, 11</div>
                  <div>Cidade: Brusque UF: SC</div>
                  <div>Telefone: (47) 3380-9899</div>
                </div>
                <div class="p-3 flex-1 border-l border-gray-800">
                  <div>1a. via para retenção da farmácia ou drogaria</div>
                  <div>2a. via para orientação ao paciente</div>
                </div>
              </div>

              <!-- Dados da unidade -->
              <div class="mb-4">
                <div class="font-bold">DADOS DA UNIDADE</div>
                <div>AmorSaúde Brusque</div>
                <div>Rua Paes Leme, 11 - (Brusque)</div>
                <div>(47) 3380-9899</div>
              </div>

              <!-- Dados do paciente -->
              <div class="mb-6">
                <div class="font-bold">DADOS DO PACIENTE.</div>
                <div>
                  Nome:
                  {{
                    selectedPatient
                      ? selectedPatient.name
                      : "Paciente não selecionado"
                  }}
                </div>
                <div>CPF: {{ selectedPatient ? "000.000.000-00" : "" }}</div>
                <div>
                  Endereço: {{ selectedPatient ? "Endereço do paciente" : "" }}
                </div>
                <div>Número: {{ selectedPatient ? "00" : "" }}</div>
                <div>Cidade: {{ selectedPatient ? "Brusque" : "" }}</div>
                <div>Estado: SC</div>
                <div>CEP: 88350-220</div>
              </div>

              <!-- Prescrição -->
              <div class="mb-10" v-if="prescriptionMode === 'simple'">
                <div v-html="formatPrescriptionText()"></div>
              </div>
              <div class="mb-10" v-else>
                <div
                  v-for="(med, index) in prescriptionData.medications"
                  :key="index"
                >
                  {{ index + 1 }}. {{ med.name }} {{ med.dosage }} -
                  {{ med.instructions }}
                </div>
              </div>

              <!-- Data e assinatura -->
              <div class="flex justify-between mt-16">
                <div>Brusque, {{ getCurrentDate() }}</div>
                <div class="text-center">
                  <div class="border-t border-gray-800 pt-1 w-48">
                    Karin Alana Da Rosa
                    <br />
                    CRM 26419 SC
                  </div>
                </div>
              </div>

              <!-- Identificação do comprador e fornecedor -->
              <div class="flex border border-gray-800 mt-6">
                <div class="p-3 flex-1">
                  <div class="font-bold">IDENTIFICAÇÃO DO COMPRADOR</div>
                  <div>Nome:_______________________________</div>
                  <div>RG:________________ Emissor:_________</div>
                  <div>Endereço:____________________________</div>
                  <div>Cidade:__________________ UF:_______</div>
                  <div>Telefone:_____________________________</div>
                </div>
                <div class="p-3 flex-1 border-l border-gray-800">
                  <div class="font-bold">IDENTIFICAÇÃO DO FORNECEDOR</div>
                  <div class="h-16"></div>
                  <div class="text-center">Assinatura farmacêutico</div>
                  <div class="mt-2">Data: ___/___/_____</div>
                </div>
              </div>
            </div>

            <!-- Receituário de Controle Especial - 2ª via -->
            <div
              v-if="prescriptionData.controleEspecial"
              class="border border-gray-800 p-4 print-section page-break-before"
            >
              <div class="text-center font-bold text-xl mb-4">
                Receituário de controle especial - 2ª via
              </div>

              <!-- Identificação do emitente e informações da via -->
              <div class="flex border border-gray-800 mb-4">
                <div class="p-3 flex-1">
                  <div class="font-bold">IDENTIFICAÇÃO DO EMITENTE</div>
                  <div>Dra. Karin Alana Da Rosa</div>
                  <div>CRM:26419-SC</div>
                  <div>Endereço: Rua Paes Leme, 11</div>
                  <div>Cidade: Brusque UF: SC</div>
                  <div>Telefone: (47) 3380-9899</div>
                </div>
                <div class="p-3 flex-1 border-l border-gray-800">
                  <div>1a. via para retenção da farmácia ou drogaria</div>
                  <div>2a. via para orientação ao paciente</div>
                </div>
              </div>

              <!-- Dados da unidade -->
              <div class="mb-4">
                <div class="font-bold">DADOS DA UNIDADE</div>
                <div>AmorSaúde Brusque</div>
                <div>Rua Paes Leme, 11 - (Brusque)</div>
                <div>(47) 3380-9899</div>
              </div>

              <!-- Dados do paciente -->
              <div class="mb-6">
                <div class="font-bold">DADOS DO PACIENTE.</div>
                <div>
                  Nome:
                  {{
                    selectedPatient
                      ? selectedPatient.name
                      : "Paciente não selecionado"
                  }}
                </div>
                <div>CPF: {{ selectedPatient ? "000.000.000-00" : "" }}</div>
                <div>
                  Endereço: {{ selectedPatient ? "Endereço do paciente" : "" }}
                </div>
                <div>Número: {{ selectedPatient ? "00" : "" }}</div>
                <div>Cidade: {{ selectedPatient ? "Brusque" : "" }}</div>
                <div>Estado: SC</div>
                <div>CEP: 88350-220</div>
              </div>

              <!-- Prescrição -->
              <div class="mb-10" v-if="prescriptionMode === 'simple'">
                <div v-html="formatPrescriptionText()"></div>
              </div>
              <div class="mb-10" v-else>
                <div
                  v-for="(med, index) in prescriptionData.medications"
                  :key="index"
                >
                  {{ index + 1 }}. {{ med.name }} {{ med.dosage }} -
                  {{ med.instructions }}
                </div>
              </div>

              <!-- Data e assinatura -->
              <div class="flex justify-between mt-16">
                <div>Brusque, {{ getCurrentDate() }}</div>
                <div class="text-center">
                  <div class="border-t border-gray-800 pt-1 w-48">
                    Karin Alana Da Rosa
                    <br />
                    CRM 26419 SC
                  </div>
                </div>
              </div>

              <!-- Identificação do comprador e fornecedor -->
              <div class="flex border border-gray-800 mt-6">
                <div class="p-3 flex-1">
                  <div class="font-bold">IDENTIFICAÇÃO DO COMPRADOR</div>
                  <div>Nome:_______________________________</div>
                  <div>RG:________________ Emissor:_________</div>
                  <div>Endereço:____________________________</div>
                  <div>Cidade:__________________ UF:_______</div>
                  <div>Telefone:_____________________________</div>
                </div>
                <div class="p-3 flex-1 border-l border-gray-800">
                  <div class="font-bold">IDENTIFICAÇÃO DO FORNECEDOR</div>
                  <div class="h-16"></div>
                  <div class="text-center">Assinatura farmacêutico</div>
                  <div class="mt-2">Data: ___/___/_____</div>
                </div>
              </div>
            </div>

            <!-- Receituário Normal -->
            <div v-if="!prescriptionData.controleEspecial" class="p-4">
              <div class="text-center font-bold text-xl mb-6">
                {{ prescriptionData.tipoDocumento }}
              </div>

              <!-- Cabeçalho -->
              <div class="mb-6">
                <div class="font-bold">Dra. Karin Alana Da Rosa</div>
                <div>CRM: 26419-SC - Psiquiatra</div>
                <div>Endereço: Rua Paes Leme, 11 - Brusque/SC</div>
                <div>Telefone: (47) 3380-9899</div>
              </div>

              <!-- Dados do paciente -->
              <div class="mb-6 border-t border-b border-gray-300 py-2">
                <div class="font-bold mb-2">DADOS DO PACIENTE</div>
                <div>
                  <span class="font-bold">Nome:</span>
                  {{
                    selectedPatient
                      ? selectedPatient.name
                      : "Paciente não selecionado"
                  }}
                </div>
                <div v-if="selectedPatient">
                  <span class="font-bold">CPF:</span>
                  {{ selectedPatient.cpf || "000.000.000-00" }}
                </div>
                <div v-if="selectedPatient">
                  <span class="font-bold">Endereço:</span>
                  {{ selectedPatient.address || "Rua Paes Leme" }}
                </div>
                <div v-if="selectedPatient">
                  <span class="font-bold">Número:</span>
                  {{ selectedPatient.number || "11" }}
                </div>
                <div v-if="selectedPatient">
                  <span class="font-bold">Cidade:</span>
                  {{ selectedPatient.city || "Brusque" }}
                </div>
                <div v-if="selectedPatient">
                  <span class="font-bold">Estado:</span>
                  {{ selectedPatient.state || "SC" }}
                </div>
                <div v-if="selectedPatient">
                  <span class="font-bold">CEP:</span>
                  {{ selectedPatient.zipCode || "88350-220" }}
                </div>
                <div v-if="selectedPatient">
                  <span class="font-bold">Idade:</span>
                  {{ selectedPatient.age }} anos -
                  <span class="font-bold">Sexo:</span>
                  {{
                    selectedPatient.gender === "F" ? "Feminino" : "Masculino"
                  }}
                </div>
              </div>

              <!-- Prescrição -->
              <div class="mb-10" v-if="prescriptionMode === 'simple'">
                <div v-html="formatPrescriptionText()"></div>
              </div>
              <div class="mb-10" v-else>
                <div
                  v-for="(med, index) in prescriptionData.medications"
                  :key="index"
                  class="mb-3"
                >
                  <div class="font-bold">
                    {{ index + 1 }}. {{ med.name }} {{ med.dosage }}
                  </div>
                  <div class="ml-4">{{ med.instructions }}</div>
                  <div class="ml-4">Quantidade: {{ med.quantity }}</div>
                </div>
              </div>

              <!-- Observações -->
              <div v-if="prescriptionData.notes" class="mb-10">
                <div class="font-bold">Observações:</div>
                <div>{{ prescriptionData.notes }}</div>
              </div>

              <!-- Assinatura -->
              <div class="text-center mt-16">
                <div class="border-t border-gray-800 pt-1 inline-block">
                  Dra. Karin Alana Da Rosa
                  <br />
                  CRM 26419-SC
                </div>
              </div>

              <!-- Data -->
              <div class="text-right mt-6">Brusque, {{ getCurrentDate() }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  ChevronRight,
  FilePlus,
  Pill,
  Plus,
  Printer,
  Search,
  Stethoscope,
  Trash2,
  UserX,
  X,
} from "lucide-vue-next";
import { computed, ref } from "vue";
import { useTriagePanelStore } from "~/stores/triage_panel_store";

// Stores
const triagePanelStore = useTriagePanelStore();

// Estado do componente
const isCreatingNew = ref(false);
const selectedPatient = ref(null);
const selectedPatientId = ref("");
const patientSearchQuery = ref("");

// Dados de prescrição
const prescriptionData = ref({
  date: new Date().toISOString().split("T")[0], // Data atual formatada como YYYY-MM-DD
  validity: 30, // Validade padrão de 30 dias
  medications: [],
  simplePrescription: "",
  controleEspecial: false,
  tipoDocumento: "PRESCRIÇÃO MÉDICA",
  notes: "",
});

// Modo de prescrição (simples ou avançado)
const prescriptionMode = ref("simple");

// Estado do modal de impressão
const showPrintModal = ref(false);
const printOptions = ref({
  carimbar: true,
  papelTimbrado: false,
  imprimirData: true,
  impTermica: false,
});

// Dados fictícios de pacientes
const patients = ref([
  {
    id: 1,
    name: "Maria Silva",
    age: 35,
    gender: "F",
    cpf: "123.456.789-00",
    address: "Rua das Flores",
    number: "123",
    city: "Brusque",
    state: "SC",
    zipCode: "88350-100",
    phone: "(47) 99999-9999",
    email: "maria@email.com",
  },
  {
    id: 2,
    name: "João Santos",
    age: 42,
    gender: "M",
    cpf: "987.654.321-00",
    address: "Avenida Central",
    number: "456",
    city: "Brusque",
    state: "SC",
    zipCode: "88350-200",
    phone: "(47) 88888-8888",
    email: "joao@email.com",
  },
  {
    id: 3,
    name: "Ana Oliveira",
    age: 28,
    gender: "F",
    cpf: "456.789.123-00",
    address: "Rua dos Pinheiros",
    number: "789",
    city: "Brusque",
    state: "SC",
    zipCode: "88350-300",
    phone: "(47) 77777-7777",
    email: "ana@email.com",
  },
  {
    id: 4,
    name: "Pedro Costa",
    age: 55,
    gender: "M",
    cpf: "789.123.456-00",
    address: "Alameda das Palmeiras",
    number: "1010",
    city: "Brusque",
    state: "SC",
    zipCode: "88350-400",
    phone: "(47) 66666-6666",
    email: "pedro@email.com",
  },
  {
    id: 5,
    name: "Carla Souza",
    age: 31,
    gender: "F",
    cpf: "321.654.987-00",
    address: "Rua dos Ipês",
    number: "222",
    city: "Brusque",
    state: "SC",
    zipCode: "88350-500",
    phone: "(47) 55555-5555",
    email: "carla@email.com",
  },
]);

// Filtragem de pacientes com base na busca
const filteredPatients = computed(() => {
  if (!patientSearchQuery.value) return patients.value;
  const query = patientSearchQuery.value.toLowerCase();
  return patients.value.filter((patient) => {
    return (
      patient.name.toLowerCase().includes(query) ||
      (patient.healthInsurance &&
        patient.healthInsurance.toLowerCase().includes(query))
    );
  });
});

// Função para abrir o painel de triagem
const openTriagePanel = (patientId) => {
  triagePanelStore.openPanel(patientId);
};

// Funções
const handleSearch = (query) => {
  patientSearchQuery.value = query;
};

const startNewPrescription = () => {
  isCreatingNew.value = true;
  selectedPatient.value = null;
  selectedPatientId.value = "";
  resetPrescriptionData();
};

const selectPatient = (patient) => {
  selectedPatient.value = patient;
  resetPrescriptionData();
};

const handlePatientSelection = () => {
  if (selectedPatientId.value) {
    const patient = patients.value.find(
      (p) => p.id === parseInt(selectedPatientId.value)
    );
    if (patient) {
      selectedPatient.value = patient;
    }
  }
};

const cancelForm = () => {
  isCreatingNew.value = false;
  selectedPatient.value = null;
  selectedPatientId.value = "";
  resetPrescriptionData();
};

const savePrescription = () => {
  // Validação básica
  if (
    prescriptionMode.value === "simple" &&
    !prescriptionData.value.simplePrescription
  ) {
    alert("Por favor, preencha a prescrição.");
    return;
  }

  if (
    prescriptionMode.value === "advanced" &&
    prescriptionData.value.medications.length === 0
  ) {
    alert("Por favor, adicione pelo menos um medicamento.");
    return;
  }

  // Aqui seria implementada a lógica para salvar a prescrição
  // Por enquanto, apenas simulamos o salvamento
  alert("Prescrição salva com sucesso!");
  isCreatingNew.value = false;
  selectedPatient.value = null;
  resetPrescriptionData();
};

const resetPrescriptionData = () => {
  prescriptionData.value = {
    date: new Date().toISOString().split("T")[0],
    validity: 30,
    medications: [],
    simplePrescription: "",
    controleEspecial: false,
    tipoDocumento: "PRESCRIÇÃO MÉDICA",
    notes: "",
  };
};

const addMedication = () => {
  prescriptionData.value.medications.push({
    name: "",
    dosage: "",
    form: "comprimido",
    quantity: "",
    instructions: "",
  });
};

const removeMedication = (index) => {
  prescriptionData.value.medications.splice(index, 1);
};

// Função para formatar o texto da prescrição simples com quebras de linha HTML
const formatPrescriptionText = () => {
  if (!prescriptionData.value.simplePrescription) return "";
  return prescriptionData.value.simplePrescription
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("<br>");
};

// Função para obter a data atual formatada
const getCurrentDate = () => {
  const now = new Date();
  return `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${now.getFullYear()} ${now
    .getHours()
    .toString()
    .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
};

// Função para abrir o modal de impressão
const printPrescription = () => {
  // Validação básica
  if (
    prescriptionMode.value === "simple" &&
    !prescriptionData.value.simplePrescription
  ) {
    alert("Por favor, preencha a prescrição.");
    return;
  }

  if (
    prescriptionMode.value === "advanced" &&
    prescriptionData.value.medications.length === 0
  ) {
    alert("Por favor, adicione pelo menos um medicamento.");
    return;
  }

  showPrintModal.value = true;
};

// Função para imprimir o documento
const printDocument = () => {
  const printContent = document.getElementById("print-content");
  const originalContents = document.body.innerHTML;

  document.body.innerHTML = printContent.innerHTML;
  window.print();
  document.body.innerHTML = originalContents;

  // Recarregar a página após a impressão para restaurar o estado
  setTimeout(() => {
    window.location.reload();
  }, 100);
};
</script>

<style scoped>
@media print {
  .print-section {
    page-break-inside: avoid;
  }
  .page-break-before {
    page-break-before: always;
  }
}
</style>
