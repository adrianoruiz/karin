# API Integration

This document describes the changes made to integrate with the real API endpoints.

## API Endpoints

- GET /api/availabilities - For checking available appointment times
- POST /api/appointments - For booking appointments
- GET /api/plans - For retrieving plan information

## Implementation

The following files were modified to use the real API:

- agentes/agendamento.js - Updated getAvailableAppointments and bookAppointment
- agentes/planos.js - Updated getAvailablePlans
- agentes/pagamentos.js - Updated payment method IDs to match API format
- .env - Added API_URL configuration

## Environment Variables

The API URL is configured in the .env file with the API_URL variable.

