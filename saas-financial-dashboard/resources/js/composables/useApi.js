import { ref } from 'vue'

const API_BASE = '/api'

export function useApi() {
  const loading = ref(false)
  const error = ref(null)

  const request = async (endpoint, options = {}) => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  const get = (endpoint) => request(endpoint)

  const post = (endpoint, data) => request(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })

  const put = (endpoint, data) => request(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  })

  const del = (endpoint) => request(endpoint, {
    method: 'DELETE',
  })

  return {
    loading,
    error,
    get,
    post,
    put,
    del,
  }
}

// Composable específico para Dashboard
export function useDashboard() {
  const { get, post, loading, error } = useApi()

  const getDashboard = () => get('/dashboard')
  const getHealth = () => get('/dashboard/health')
  const getCash = () => get('/dashboard/cash')
  const getRevenue = () => get('/dashboard/revenue')
  const getCustomers = () => get('/dashboard/customers')
  const getCosts = () => get('/dashboard/costs')
  const createSnapshot = () => post('/dashboard/snapshot')

  return {
    loading,
    error,
    getDashboard,
    getHealth,
    getCash,
    getRevenue,
    getCustomers,
    getCosts,
    createSnapshot,
  }
}

// Composable para Customers
export function useCustomers() {
  const { get, post, put, del, loading, error } = useApi()

  const list = (params = {}) => get(`/customers?${new URLSearchParams(params)}`)
  const show = (id) => get(`/customers/${id}`)
  const create = (data) => post('/customers', data)
  const update = (id, data) => put(`/customers/${id}`, data)
  const remove = (id) => del(`/customers/${id}`)
  const convert = (id) => post(`/customers/${id}/convert`)
  const churn = (id, reason) => post(`/customers/${id}/churn`, { reason })

  return {
    loading,
    error,
    list,
    show,
    create,
    update,
    remove,
    convert,
    churn,
  }
}

// Composable para Subscriptions
export function useSubscriptions() {
  const { get, post, put, del, loading, error } = useApi()

  const list = () => get('/subscriptions')
  const show = (id) => get(`/subscriptions/${id}`)
  const create = (data) => post('/subscriptions', data)
  const update = (id, data) => put(`/subscriptions/${id}`, data)
  const remove = (id) => del(`/subscriptions/${id}`)
  const pause = (id) => post(`/subscriptions/${id}/pause`)
  const resume = (id) => post(`/subscriptions/${id}/resume`)
  const byPlan = () => get('/subscriptions-by-plan')

  return {
    loading,
    error,
    list,
    show,
    create,
    update,
    remove,
    pause,
    resume,
    byPlan,
  }
}

// Composable para Payments
export function usePayments() {
  const { get, post, put, del, loading, error } = useApi()

  const list = () => get('/payments')
  const show = (id) => get(`/payments/${id}`)
  const create = (data) => post('/payments', data)
  const update = (id, data) => put(`/payments/${id}`, data)
  const remove = (id) => del(`/payments/${id}`)
  const markPaid = (id, method) => post(`/payments/${id}/mark-paid`, { payment_method: method })
  const markFailed = (id) => post(`/payments/${id}/mark-failed`)
  const pending = () => get('/payments-pending')

  return {
    loading,
    error,
    list,
    show,
    create,
    update,
    remove,
    markPaid,
    markFailed,
    pending,
  }
}

// Composable para Expenses
export function useExpenses() {
  const { get, post, put, del, loading, error } = useApi()

  const list = () => get('/expenses')
  const show = (id) => get(`/expenses/${id}`)
  const create = (data) => post('/expenses', data)
  const update = (id, data) => put(`/expenses/${id}`, data)
  const remove = (id) => del(`/expenses/${id}`)
  const byCategory = (month, year) => get(`/expenses-by-category?month=${month}&year=${year}`)
  const breakdown = (month, year) => get(`/expenses-breakdown?month=${month}&year=${year}`)
  const recurring = () => get('/expenses-recurring')

  return {
    loading,
    error,
    list,
    show,
    create,
    update,
    remove,
    byCategory,
    breakdown,
    recurring,
  }
}
