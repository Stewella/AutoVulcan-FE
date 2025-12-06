<template>
  <div class="team-card">
    <div class="avatar" :class="{ 'has-image': image }">
      <img v-if="image" :src="image" :alt="name" class="avatar-image" />
      <span v-else class="avatar-initials">{{ initials }}</span>
    </div>
    <h3 class="name">{{ name }}</h3>
    <p class="role">{{ role }}</p>
    <p class="description">{{ description }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  }
})

const initials = computed(() => {
  return props.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
})
</script>

<style scoped>
.team-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.avatar {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.avatar-initials {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.avatar.has-image {
  background: transparent;
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.role {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1rem;
}

.description {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.6;
}
</style>
