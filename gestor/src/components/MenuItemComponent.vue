<!-- MenuItemComponent.vue -->
<template>
  <div>
    <!-- Item com link -->
    <RouterLink
      v-if="item.path"
      :to="item.path"
      class="flex items-center px-4 py-2 rounded-lg transition-colors text-white hover:bg-white/10"
      :class="{ 'bg-active': isActive }"
    >
      <font-awesome-icon
        v-if="item.icon && iconConfig"
        :icon="iconConfig"
        :class="isCollapsed ? 'text-xl' : 'w-5'"
      />
      <template v-if="!isCollapsed">
        <span class="ml-3 text-sm font-medium flex-1">{{ item.name }}</span>
        <span
          v-if="getBadgeValue(item.badge)"
          class="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full"
        >
          {{ getBadgeValue(item.badge) }}
        </span>
      </template>
    </RouterLink>

    <!-- Item sem link (grupo) -->
    <button
      v-else
      @click="handleClick"
      class="w-full flex items-center px-4 py-2 rounded-lg transition-colors text-white hover:bg-white/10"
      :class="{ 'bg-active': isExpanded }"
    >
      <font-awesome-icon
        v-if="item.icon && iconConfig"
        :icon="iconConfig"
        :class="isCollapsed ? 'text-xl' : 'w-5'"
      />
      <template v-if="!isCollapsed">
        <span class="ml-3 text-sm font-medium flex-1">{{ item.name }}</span>
        <font-awesome-icon
          v-if="hasChildren"
          :icon="isExpanded ? 'chevron-down' : 'chevron-right'"
          class="w-4"
        />
      </template>
    </button>

    <!-- Subitens -->
    <ul
      v-if="hasChildren && isExpanded && !isCollapsed"
      class="ml-4 mt-1 space-y-1"
    >
      <li v-for="child in item.children" :key="child.name">
        <MenuItemComponent
          :item="child"
          :isCollapsed="isCollapsed"
          :route="route"
          :expandedMenus="expandedMenus"
          @toggleMenu="$emit('toggleMenu', $event)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { IconName, IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

interface MenuItem {
  name: string
  icon?: string
  path?: string
  children?: MenuItem[]
  badge?: number | (() => number | undefined)
  show?: boolean
}

const props = defineProps<{
  item: MenuItem
  isCollapsed: boolean
  route: any
  expandedMenus: string[]
}>()

const emit = defineEmits<{
  (e: 'toggleMenu', name: string): void
}>()

const isExpanded = computed(() => props.expandedMenus.includes(props.item.name))
const hasChildren = computed(
  () => props.item.children && props.item.children.length > 0
)
const isActive = computed(
  () => props.item.path && props.route.path === props.item.path
)

const iconConfig = computed<IconProp | null>(() => {
  const brandIcons = ['whatsapp'] as const

  if (props.item.icon) {
    // Aqui fazemos uma asserção de tipo para garantir que a string seja tratada como IconName
    const iconName = props.item.icon as IconName
    if (brandIcons.includes(props.item.icon as any)) {
      return ['fab', iconName] as IconProp
    }
    return ['fas', iconName] as IconProp
  }
  return null
})

const getBadgeValue = (badge: number | (() => number | undefined) | undefined) => {
  if (!badge) return null
  const value = typeof badge === 'function' ? badge() : badge
  return value && value > 0 ? value : null
}

function handleClick() {
  if (hasChildren.value) {
    emit('toggleMenu', props.item.name)
  }
}
</script>
