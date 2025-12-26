# API de Localizações

Este documento descreve as APIs disponíveis para gerenciar províncias e cidades no sistema.

## Base URL

Todas as URLs abaixo devem ser prefixadas com `/api/locations`.

## Províncias

### Listar todas as províncias

Retorna uma lista de todas as províncias.

**Endpoint**: `GET /provinces`

**Resposta de exemplo**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "São Paulo",
      "initials": "SP",
      "country_id": 1
    },
    {
      "id": 2,
      "name": "Rio de Janeiro",
      "initials": "RJ",
      "country_id": 1
    }
  ]
}
```

### Obter província específica com suas cidades

Retorna os detalhes de uma província específica junto com suas cidades.

**Endpoint**: `GET /provinces/{id}`

**Parâmetros de URL**:
- `id` (obrigatório): ID da província

**Resposta de exemplo**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "São Paulo",
    "initials": "SP",
    "country_id": 1,
    "cities": [
      {
        "id": 1,
        "name": "São Paulo",
        "province_id": 1,
        "ibge_code": "3550308"
      },
      {
        "id": 2,
        "name": "Campinas",
        "province_id": 1,
        "ibge_code": "3509502"
      }
    ]
  }
}
```

**Resposta de erro (província não encontrada)**:
```json
{
  "success": false,
  "message": "Província não encontrada"
}
```

### Listar todas as províncias com suas cidades

Retorna uma lista de todas as províncias com suas cidades.

**Endpoint**: `GET /provinces/with-cities`

**Resposta de exemplo**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "São Paulo",
      "initials": "SP",
      "country_id": 1,
      "cities": [
        {
          "id": 1,
          "name": "São Paulo",
          "province_id": 1,
          "ibge_code": "3550308"
        },
        {
          "id": 2,
          "name": "Campinas",
          "province_id": 1,
          "ibge_code": "3509502"
        }
      ]
    },
    {
      "id": 2,
      "name": "Rio de Janeiro",
      "initials": "RJ",
      "country_id": 1,
      "cities": [
        {
          "id": 3,
          "name": "Rio de Janeiro",
          "province_id": 2,
          "ibge_code": "3304557"
        },
        {
          "id": 4,
          "name": "Niterói",
          "province_id": 2,
          "ibge_code": "3303302"
        }
      ]
    }
  ]
}
```

## Cidades

### Listar todas as cidades

Retorna uma lista de todas as cidades.

**Endpoint**: `GET /cities`

**Resposta de exemplo**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "São Paulo",
      "province_id": 1,
      "ibge_code": "3550308"
    },
    {
      "id": 2,
      "name": "Campinas",
      "province_id": 1,
      "ibge_code": "3509502"
    }
  ]
}
```

### Obter cidade específica

Retorna os detalhes de uma cidade específica junto com sua província.

**Endpoint**: `GET /cities/{id}`

**Parâmetros de URL**:
- `id` (obrigatório): ID da cidade

**Resposta de exemplo**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "São Paulo",
    "province_id": 1,
    "ibge_code": "3550308",
    "province": {
      "id": 1,
      "name": "São Paulo",
      "initials": "SP",
      "country_id": 1
    }
  }
}
```

**Resposta de erro (cidade não encontrada)**:
```json
{
  "success": false,
  "message": "Cidade não encontrada"
}
```

### Listar cidades por província

Retorna uma lista de todas as cidades de uma província específica.

**Endpoint**: `GET /provinces/{provinceId}/cities`

**Parâmetros de URL**:
- `provinceId` (obrigatório): ID da província

**Resposta de exemplo**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "São Paulo",
      "province_id": 1,
      "ibge_code": "3550308"
    },
    {
      "id": 2,
      "name": "Campinas",
      "province_id": 1,
      "ibge_code": "3509502"
    }
  ]
}
``` 