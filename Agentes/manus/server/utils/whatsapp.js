import { Client } from 'whatsapp-web.js'

let client = null

export async function getWhatsAppClient() {
  if (!client) {
    client = new Client()
    
    client.on('qr', (qr) => {
      console.log('QR Code gerado:', qr)
    })
    
    client.on('ready', () => {
      console.log('Cliente WhatsApp pronto!')
    })
    
    await client.initialize()
  }
  
  return client
}

export async function sendMessage(to, message) {
  try {
    const client = await getWhatsAppClient()
    await client.sendMessage(to, message)
    return { success: true, message: 'Mensagem enviada com sucesso' }
  } catch (error) {
    console.error('Erro ao enviar mensagem via WhatsApp:', error)
    return { 
      success: false, 
      message: 'Erro ao enviar mensagem',
      error: error.message
    }
  }
} 