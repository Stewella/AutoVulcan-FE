<template>
  <div class="about-page">
    <section class="about">
      <div class="container">
        <h2 class="section-title">{{ t.landing.about.title }}</h2>
        <div class="about-content">
          <p>{{ t.landing.about.p1 }}</p>
          <p>{{ t.landing.about.p2 }}</p>
        </div>
        <div class="about-cta">
          <router-link to="/features" class="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            {{ t.landing.features.viewAll }}
          </router-link>
        </div>
      </div>
    </section>

    <section class="team">
      <div class="container">
        <h2 class="section-title">{{ t.landing.team.title }}</h2>
        <p class="section-subtitle">
          {{ t.landing.team.subtitle }}
        </p>
        <div class="team-grid">
          <TeamCard
            name="Marcel Suandi Tambing"
            :role="t.landing.team.marcel.role"
            :description="t.landing.team.marcel.desc"
            image="/images/marcel.jpg"
          />
          <TeamCard
            name="Steffany Harwella"
            :role="t.landing.team.steffany.role"
            :description="t.landing.team.steffany.desc"
            image="/images/steffany.jpg"
          />
          <TeamCard
            name="Marde Fasma'ul Aza"
            :role="t.landing.team.marde.role"
            :description="t.landing.team.marde.desc"
            image="/images/marde.jpg"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import TeamCard from '../components/TeamCard.vue'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
</script>

<style scoped>
.about-page {
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  background: linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  text-align: center;
  color: var(--text-secondary);
  font-size: 1.125rem;
  margin-top: 1rem;
}

.about {
  padding: 6rem 2rem;
  background: var(--bg-dark);
}

.about-content {
  max-width: 900px;
  margin: 2rem auto 0;
}

.about-content p {
  color: var(--text-secondary);
  font-size: 1.125rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.about-cta {
  text-align: center;
  margin-top: 2.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.4);
}

.team {
  padding: 6rem 2rem;
  background: var(--bg-card);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

@media (max-width: 768px) {
  .about, .team {
    padding: 4rem 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>
