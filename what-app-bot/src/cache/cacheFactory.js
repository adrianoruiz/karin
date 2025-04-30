const NodeCache = require('node-cache');
const config = require('../../config'); // Assuming config path

// Centralized cache instances
module.exports = {
  greeting  : new NodeCache({ stdTTL: config.greetingCacheTTL }), // TTL from config
  convo     : new NodeCache({ stdTTL: 14400 }), // 4 hours TTL for conversation history
  duplicate : new NodeCache({ stdTTL: 60 , checkperiod: 120 }), // Check for duplicates within 60s
  manual    : new NodeCache({ stdTTL: config.manualResponseTTL || 86400 }), // 24 hours default TTL for manual mode
  botMsg    : new NodeCache({ stdTTL: 300 }) // 5 minutes TTL for bot message tracking
}; 