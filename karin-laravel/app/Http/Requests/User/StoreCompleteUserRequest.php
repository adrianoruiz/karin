<?php

namespace App\Http\Requests\User;

use App\Rules\BrazilianCep;
use App\Rules\BrazilianCpf;
use App\Rules\BrazilianPhone;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Request de validacao para criacao completa de usuario.
 *
 * SECURITY: Implementa validacao robusta seguindo as mesmas
 * regras do frontend (Zod validation) com validacoes brasileiras
 * para CPF, telefone e CEP.
 */
class StoreCompleteUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Dados basicos do usuario
            'name' => [
                'required',
                'string',
                'min:2',
                'max:255',
                'regex:/^[\p{L}\s\'-]+$/u',
            ],
            'email' => [
                'required',
                'string',
                'email:rfc,dns',
                'max:255',
                'unique:users,email',
            ],
            'password' => [
                'required',
                'string',
                'min:4',
                'max:128',
            ],
            'phone' => [
                'nullable',
                'string',
                'max:20',
                new BrazilianPhone,
            ],
            'is_whatsapp_user' => [
                'nullable',
                'boolean',
            ],
            'status' => [
                'nullable',
                'boolean',
            ],
            'roles' => [
                'nullable',
                'array',
            ],
            'roles.*' => [
                'string',
                'max:50',
            ],

            // Validacao de dados do usuario
            'user_data' => [
                'nullable',
                'array',
            ],
            'user_data.birthday' => [
                'nullable',
                'date',
                'before:today',
            ],
            'user_data.rg' => [
                'nullable',
                'string',
                'max:20',
            ],
            'user_data.cpf' => [
                'nullable',
                'string',
                'max:14',
                new BrazilianCpf,
            ],
            'user_data.gender' => [
                'nullable',
                'string',
                'in:male,female,other',
            ],
            'user_data.marital_status' => [
                'nullable',
                'string',
                'max:50',
            ],
            'user_data.emergency_contact' => [
                'nullable',
                'string',
                'max:255',
            ],
            'user_data.emergency_contact_phone' => [
                'nullable',
                'string',
                'max:20',
                new BrazilianPhone,
            ],
            'user_data.alternative_phone' => [
                'nullable',
                'string',
                'max:20',
                new BrazilianPhone,
            ],
            'user_data.fantasy' => [
                'nullable',
                'string',
                'max:255',
            ],
            'user_data.cnpj' => [
                'nullable',
                'string',
                'max:18',
                'regex:/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/', // CNPJ formatado ou apenas digitos
            ],
            'user_data.corporate_name' => [
                'nullable',
                'string',
                'max:255',
            ],
            'user_data.segment_types' => [
                'nullable',
                'string',
                'in:clinica-medica,salao-beleza,clinica-odonto',
            ],
            'user_data.patient_type' => [
                'nullable',
                'string',
                'in:private,insurance',
            ],
            'user_data.health_insurance' => [
                'nullable',
                'string',
                'max:255',
            ],
            'user_data.insurance_number' => [
                'nullable',
                'string',
                'max:50',
            ],
            'user_data.insurance_expiration' => [
                'nullable',
                'date',
                'after:today',
            ],
            'user_data.notes' => [
                'nullable',
                'string',
                'max:2000',
            ],
            'user_data.site' => [
                'nullable',
                'url',
                'max:255',
            ],
            'user_data.crm' => [
                'nullable',
                'string',
                'max:50',
            ],
            'user_data.rqe' => [
                'nullable',
                'string',
                'max:50',
            ],

            // Validacao de endereco
            'address' => [
                'nullable',
                'array',
            ],
            'address.street' => [
                'required_with:address',
                'string',
                'max:255',
            ],
            'address.number' => [
                'required_with:address',
                'string',
                'max:20',
            ],
            'address.complement' => [
                'nullable',
                'string',
                'max:255',
            ],
            'address.neighborhood' => [
                'required_with:address',
                'string',
                'max:255',
            ],
            'address.zip' => [
                'required_with:address',
                'string',
                'max:10',
                new BrazilianCep,
            ],
            'address.city_id' => [
                'required_with:address',
                'exists:cities,id',
            ],
            'address.default' => [
                'nullable',
                'boolean',
            ],

            // Validacao de especialidades
            'specialty_ids' => [
                'nullable',
                'array',
            ],
            'specialty_ids.*' => [
                'exists:specialties,id',
            ],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'O nome do usuario e obrigatorio.',
            'name.min' => 'O nome deve ter no minimo 2 caracteres.',
            'name.max' => 'O nome nao pode exceder 255 caracteres.',
            'name.regex' => 'O nome deve conter apenas letras, espacos, apostrofos e hifens.',
            'email.required' => 'O e-mail do usuario e obrigatorio.',
            'email.email' => 'Formato de e-mail invalido.',
            'email.unique' => 'Este e-mail ja esta sendo utilizado.',
            'password.required' => 'A senha e obrigatoria.',
            'password.min' => 'A senha deve ter no minimo 4 caracteres.',
            'password.max' => 'A senha nao pode exceder 128 caracteres.',
            'phone.max' => 'O telefone nao pode exceder 20 caracteres.',

            // Mensagens para user_data
            'user_data.birthday.before' => 'A data de nascimento deve ser anterior a hoje.',
            'user_data.cpf.max' => 'O CPF nao pode exceder 14 caracteres.',
            'user_data.gender.in' => 'O genero deve ser: male, female ou other.',
            'user_data.segment_types.in' => 'O tipo de segmento deve ser: clinica-medica, salao-beleza ou clinica-odonto.',
            'user_data.patient_type.in' => 'O tipo de paciente deve ser: private ou insurance.',
            'user_data.insurance_expiration.after' => 'A data de expiracao do convenio deve ser futura.',
            'user_data.site.url' => 'O site deve ser uma URL valida.',
            'user_data.cnpj.regex' => 'Formato de CNPJ invalido.',

            // Mensagens para endereco
            'address.street.required_with' => 'O campo rua e obrigatorio quando um endereco e fornecido.',
            'address.number.required_with' => 'O campo numero e obrigatorio quando um endereco e fornecido.',
            'address.neighborhood.required_with' => 'O campo bairro e obrigatorio quando um endereco e fornecido.',
            'address.zip.required_with' => 'O campo CEP e obrigatorio quando um endereco e fornecido.',
            'address.city_id.required_with' => 'O campo cidade e obrigatorio quando um endereco e fornecido.',
            'address.city_id.exists' => 'A cidade selecionada nao existe.',
            'specialty_ids.*.exists' => 'Uma ou mais especialidades selecionadas nao existem.',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $data = [];

        // Sanitiza email
        if ($this->has('email')) {
            $data['email'] = strtolower(trim($this->email));
        }

        // Sanitiza nome
        if ($this->has('name')) {
            $data['name'] = trim($this->name);
        }

        // Sanitiza telefone principal
        if ($this->has('phone') && $this->phone) {
            $data['phone'] = preg_replace('/[^\d]/', '', $this->phone);
        }

        // Sanitiza dados de user_data
        if ($this->has('user_data') && is_array($this->user_data)) {
            $userData = $this->user_data;

            // Sanitiza CPF
            if (! empty($userData['cpf'])) {
                $userData['cpf'] = preg_replace('/[^\d]/', '', $userData['cpf']);
            }

            // Sanitiza telefones de emergencia
            if (! empty($userData['emergency_contact_phone'])) {
                $userData['emergency_contact_phone'] = preg_replace('/[^\d]/', '', $userData['emergency_contact_phone']);
            }

            if (! empty($userData['alternative_phone'])) {
                $userData['alternative_phone'] = preg_replace('/[^\d]/', '', $userData['alternative_phone']);
            }

            // Sanitiza CNPJ
            if (! empty($userData['cnpj'])) {
                $userData['cnpj'] = preg_replace('/[^\d]/', '', $userData['cnpj']);
            }

            $data['user_data'] = $userData;
        }

        // Sanitiza CEP do endereco
        if ($this->has('address') && is_array($this->address)) {
            $address = $this->address;
            if (! empty($address['zip'])) {
                $address['zip'] = preg_replace('/[^\d]/', '', $address['zip']);
            }
            $data['address'] = $address;
        }

        if (! empty($data)) {
            $this->merge($data);
        }
    }
}
