# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
Responda sempre em pt-br pq o progamador é brasileiro
## Development Commands

**Start Development Server:**
```bash
npm run dev
```

**Start Production:**
```bash
npm start
```

**Build TypeScript:**
```bash
npm run build
```

**Test (No tests configured):**
```bash
npm test  # Returns "Error: no test specified"
```

## Core Architecture

### Multi-Clinic WhatsApp Bot System
This is a Node.js application that manages multiple WhatsApp bot instances, one per clinic/business. The system uses dynamic tool loading based on business segment types (`clinica-medica`, `salao-beleza`, `clinica-odonto`).

### Key Architecture Components

**1. Dynamic Tool System (`src/services/ai/`)**
- `toolDefinitions.js`: Defines all available GPT function schemas
- `toolRegistry.js`: Maps tools to business segments (clinic types)
- `gptRouter.js`: Routes function calls to implementations
- Tools are loaded dynamically based on clinic's `segment_type` from external API

**2. Clinic Data Management (`src/store/clinicStore.js`)**
- Loads clinic data from external API at startup (`[API_URL]/whatsapp/list-whats-users`)
- Caches clinic information including `id` and `segment_types` in memory
- Used by GPT service to determine which tools are available per clinic

**3. WhatsApp Client Management (`src/services/qr/qrcode.js`)**
- Creates separate WhatsApp Web sessions for each clinic
- Handles QR code generation and client initialization
- Stores session data in `.wwebjs_auth/session-CLIENT_ID` folders

**4. GPT Integration (`src/services/gpt.js`)**
- Integrates with OpenAI Chat Completions API (default: `gpt-4.1`)
- Dynamically loads tools based on clinic's segment type
- Supports Redis-based conversation history (optional)
- Handles function calling and response generation

**5. Session Management (`src/services/sessionStore.js`)**
- Optional Redis integration for conversation persistence
- Maintains conversation history and context across restarts
- Uses `ioredis` for Redis connections

### Tool Implementation Pattern

**Adding a New GPT Tool:**
1. Define schema in `src/services/ai/toolDefinitions.js`
2. Register tool for specific segments in `src/services/ai/toolRegistry.js`
3. Implement function in `src/services/tools/[toolname].js`
4. Add function call handler in `src/ai/gptRouter.js`

**Example Tool Structure:**
```javascript
// In toolDefinitions.js
const myToolFunction = {
    name: "myTool",
    description: "Description of what this tool does",
    parameters: {
        type: "object",
        properties: { /* tool parameters */ },
        required: []
    }
};

// In toolRegistry.js - add to appropriate segments
'clinica-medica': [
    // ... other tools
    myToolFunction
]

// In tools/myTool.js
async function myTool(param1, param2) {
    // Implementation
    return result;
}
```

### Business Segment Configuration

**Supported Segments:**
- `clinica-medica`: Medical clinics (full appointment system)
- `salao-beleza`: Beauty salons (contact sharing, basic payment info)
- `clinica-odonto`: Dental clinics (appointment system + dental-specific tools)
- `default`: Fallback tools for unrecognized segments

**Segment-Specific Tools:**
- Medical/Dental: Appointment booking, availability checking, patient management
- Beauty Salon: Contact sharing for specialists (manicure, eyebrows, waxing)
- All: Payment methods, user name lookup

### TypeScript Integration

**Hybrid JavaScript/TypeScript Setup:**
- Main application uses CommonJS modules (`require`/`module.exports`)
- Utility modules in TypeScript compiled to `dist/` directory
- TypeScript files: `src/utils/dateUtils.ts`, `src/utils/logger.ts`
- Uses Zod for runtime type validation

**Building TypeScript:**
```bash
npm run build  # Compiles TS files to dist/
```

### Critical File Paths

**Configuration:**
- `config.js`: Main app configuration, API URL, feature flags
- `.env`: Environment variables (API keys, Redis URL)

**Entry Points:**
- `index.js`: Application bootstrap, loads clinics from API, initializes WhatsApp clients
- `src/boot/waListeners.js`: Sets up WhatsApp event listeners per client

**Core Services:**
- `src/services/gpt.js`: OpenAI integration and conversation handling
- `src/services/tools/availability.js`: Appointment availability checking
- `src/utils/formatAvailableAppointments.js`: Formats appointment data for user display

### Environment Requirements

**Required Environment Variables:**
```env
OPENAI_API_KEY=your_openai_key
API_URL=https://your-api.com/api/
PORT=3001
NODE_ENV=development|production
REDIS_URL=redis://localhost:6379  # Optional
```

**External API Dependencies:**
- Backend API for clinic data at `[API_URL]/whatsapp/list-whats-users`
- Appointment system API for availability and booking
- Expected clinic data format: `{ data: [{ id, segment_types: [] }] }`

### Development Notes

**Code Style (from .cursorrules):**
- Comments and function names in English
- User-facing strings and logs in Portuguese (pt-BR)
- Use `const` by default, `let` only when reassigning
- Async/await preferred over Promise chains
- ESLint Airbnb style with semicolons

**WhatsApp-Specific:**
- Format phone numbers with `formatPhoneNumber()`
- Check `msg.hasMedia` before processing media
- Mark bot messages with `markMessageAsSentByBot` before sending

**Redis Session Management:**
- Optional but recommended for production
- Maintains conversation context across restarts
- Supports horizontal scaling with multiple bot instances

### Common Patterns

**Message Processing Flow:**
1. WhatsApp message received → `waListeners.js`
2. Message passed to `gptRouter.js` → `processMessage()`
3. GPT service called with dynamic tools → `gpt.js`
4. Function calls routed to implementations → `tools/`
5. Responses formatted and sent back → WhatsApp client

**Error Handling:**
- Central logging via `src/utils/logger.js`
- Graceful degradation when external APIs fail
- Redis connection optional (fallbacks to memory)
- Individual client failures don't affect other clinics