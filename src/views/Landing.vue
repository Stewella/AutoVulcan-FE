<template>
  <div class="landing">
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="hero-brand">{{ t.landing.hero.brand }}</span>
            <span class="hero-tagline">{{ t.landing.hero.tagline }}</span>
          </h1>
          <p class="hero-description">
            {{ t.landing.hero.description }}
          </p>
          <div class="hero-actions">
            <router-link to="/dashboard" class="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              {{ t.landing.hero.launchBtn }}
            </router-link>
            <router-link to="/features" class="btn btn-secondary">
              {{ t.landing.hero.learnMore }}
            </router-link>
          </div>
        </div>
        <div class="hero-visual">
          <div class="shield-graphic">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" class="shield-svg">
              <defs>
                <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#0ea5e9"/>
                  <stop offset="100%" style="stop-color:#14b8a6"/>
                </linearGradient>
              </defs>
              <path fill="url(#shieldGrad)" d="M50 5 L95 20 L95 50 C95 80 75 100 50 110 C25 100 5 80 5 50 L5 20 Z" opacity="0.9"/>
              <path fill="white" opacity="0.3" d="M50 15 L85 27 L85 50 C85 75 68 92 50 100 L50 15 Z"/>
              <text x="50" y="65" text-anchor="middle" fill="white" font-size="28" font-weight="bold">AV</text>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <section class="about">
      <div class="container">
        <h2 class="section-title">{{ t.landing.about.title }}</h2>
        <div class="about-content">
          <p>{{ t.landing.about.p1 }}</p>
          <p>{{ t.landing.about.p2 }}</p>
        </div>
      </div>
    </section>

    <section class="features-preview">
      <div class="container">
        <h2 class="section-title">{{ t.landing.features.title }}</h2>
        <p class="section-subtitle">
          {{ t.landing.features.subtitle }}
        </p>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3>{{ t.landing.features.exploitGen.title }}</h3>
            <p>{{ t.landing.features.exploitGen.desc }}</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
            </div>
            <h3>{{ t.landing.features.reporting.title }}</h3>
            <p>{{ t.landing.features.reporting.desc }}</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            <h3>{{ t.landing.features.localization.title }}</h3>
            <p>{{ t.landing.features.localization.desc }}</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            </div>
            <h3>{{ t.landing.features.callGraph.title }}</h3>
            <p>{{ t.landing.features.callGraph.desc }}</p>
          </div>
        </div>
        <div class="features-cta">
          <router-link to="/features" class="btn btn-primary">
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
          />
          <TeamCard
            name="Steffany Harwella"
            :role="t.landing.team.steffany.role"
            :description="t.landing.team.steffany.desc"
          />
          <TeamCard
            name="Marde Fasma'ul Aza"
            :role="t.landing.team.marde.role"
            :description="t.landing.team.marde.desc"
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
.landing {
  overflow-x: hidden;
}

.hero {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 50%, rgba(14, 165, 233, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%);
}

.hero .container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-brand {
  display: block;
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.hero-tagline {
  display: block;
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-top: 0.5rem;
}

.hero-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin: 2rem 0;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.shield-graphic {
  width: 300px;
  height: 360px;
  animation: float 6s ease-in-out infinite;
}

.shield-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 20px 40px rgba(14, 165, 233, 0.3));
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
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

.features-preview {
  padding: 6rem 2rem;
  background: var(--bg-card);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  background: var(--bg-dark);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.feature-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(20, 184, 166, 0.2));
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}

.feature-card p {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.6;
}

.features-cta {
  text-align: center;
  margin-top: 3rem;
}

.team {
  padding: 6rem 2rem;
  background: var(--bg-dark);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

@media (max-width: 1024px) {
  .hero .container {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-brand {
    font-size: 2.5rem;
  }
  
  .hero-tagline {
    font-size: 1.25rem;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .hero-visual {
    order: -1;
  }
  
  .shield-graphic {
    width: 200px;
    height: 240px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 4rem 1rem;
  }
  
  .hero-brand {
    font-size: 2rem;
  }
  
  .about, .features-preview, .team {
    padding: 4rem 1rem;
  }
}
</style>
