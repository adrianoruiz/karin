import {
  Wind, CloudRain, Waves, Zap, Moon, HeartPulse,
  Apple, Eye, Repeat, Puzzle, UsersRound, ShieldAlert
} from 'lucide-vue-next'
import type { Component } from 'vue'

// Mapa nome→componente para ícones vindos do markdown (frontmatter `icon`).
export const specialtyIcons: Record<string, Component> = {
  Wind, CloudRain, Waves, Zap, Moon, HeartPulse,
  Apple, Eye, Repeat, Puzzle, UsersRound, ShieldAlert
}
