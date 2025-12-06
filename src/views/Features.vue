<template>
  <div class="features-page">
    <section class="hero-section">
      <div class="container">
        <h1 class="page-title">{{ t.features.hero.title }}</h1>
        <p class="page-subtitle">
          {{ t.features.hero.subtitle }}
        </p>
      </div>
    </section>

    <section class="features-section">
      <div class="container">
        <div class="feature-detail">
          <div class="feature-icon-large">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 12h8"></path>
              <path d="M12 8v8"></path>
            </svg>
          </div>
          <div class="feature-content">
            <h2>{{ t.features.vulnLocalization.title }}</h2>
            <p>{{ t.features.vulnLocalization.desc }}</p>
            <ul class="feature-list">
              <li v-for="(item, index) in t.features.vulnLocalization.list" :key="index">{{ item }}</li>
            </ul>
          </div>
        </div>

        <div class="feature-detail reverse">
          <div class="feature-icon-large">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </div>
          <div class="feature-content">
            <h2>{{ t.features.callGraph.title }}</h2>
            <p>{{ t.features.callGraph.desc }}</p>
            <ul class="feature-list">
              <li v-for="(item, index) in t.features.callGraph.list" :key="index">{{ item }}</li>
            </ul>
          </div>
        </div>

        <div class="feature-detail">
          <div class="feature-icon-large">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <div class="feature-content">
            <h2>{{ t.features.exploitGen.title }}</h2>
            <p>{{ t.features.exploitGen.desc }}</p>
            <ul class="feature-list">
              <li v-for="(item, index) in t.features.exploitGen.list" :key="index">{{ item }}</li>
            </ul>
            <div class="info-box">
              <h4>{{ t.features.exploitGen.fitnessTitle }}</h4>
              <div class="fitness-grid">
                <div class="fitness-item">
                  <strong>{{ t.features.exploitGen.fitness.contextSimilarity.title }}</strong>
                  <span>{{ t.features.exploitGen.fitness.contextSimilarity.desc }}</span>
                </div>
                <div class="fitness-item">
                  <strong>{{ t.features.exploitGen.fitness.approachLevel.title }}</strong>
                  <span>{{ t.features.exploitGen.fitness.approachLevel.desc }}</span>
                </div>
                <div class="fitness-item">
                  <strong>{{ t.features.exploitGen.fitness.proximity.title }}</strong>
                  <span>{{ t.features.exploitGen.fitness.proximity.desc }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="feature-detail reverse">
          <div class="feature-icon-large">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
          <div class="feature-content">
            <h2>{{ t.features.execution.title }}</h2>
            <p>{{ t.features.execution.desc }}</p>
            <ul class="feature-list">
              <li v-for="(item, index) in t.features.execution.list" :key="index">{{ item }}</li>
            </ul>
          </div>
        </div>

        <div class="feature-detail">
          <div class="feature-icon-large">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <div class="feature-content">
            <h2>{{ t.features.evidence.title }}</h2>
            <p>{{ t.features.evidence.desc }}</p>
            <ul class="feature-list">
              <li v-for="(item, index) in t.features.evidence.list" :key="index">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="siege-section">
      <div class="container">
        <h2 class="section-title">{{ t.features.siege.title }}</h2>
        <p class="section-subtitle">
          {{ t.features.siege.subtitle }}
        </p>
        
        <div class="siege-flow">
          <div class="flow-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>{{ t.features.siege.steps.step1.title }}</h3>
              <p>{{ t.features.siege.steps.step1.desc }}</p>
            </div>
          </div>
          <div class="flow-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
          <div class="flow-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>{{ t.features.siege.steps.step2.title }}</h3>
              <p>{{ t.features.siege.steps.step2.desc }}</p>
            </div>
          </div>
          <div class="flow-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
          <div class="flow-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>{{ t.features.siege.steps.step3.title }}</h3>
              <p>{{ t.features.siege.steps.step3.desc }}</p>
            </div>
          </div>
          <div class="flow-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
          <div class="flow-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>{{ t.features.siege.steps.step4.title }}</h3>
              <p>{{ t.features.siege.steps.step4.desc }}</p>
            </div>
          </div>
          <div class="flow-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
          <div class="flow-step highlight">
            <div class="step-number">5</div>
            <div class="step-content">
              <h3>{{ t.features.siege.steps.step5.title }}</h3>
              <p>{{ t.features.siege.steps.step5.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <h2>{{ t.features.cta.title }}</h2>
        <p>{{ t.features.cta.subtitle }}</p>
        <router-link to="/dashboard" class="btn btn-primary btn-large">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          {{ t.features.cta.button }}
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
</script>

<style scoped>
.features-page {
  overflow-x: hidden;
}

.hero-section {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding: 5rem 2rem;
  text-align: center;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.features-section {
  padding: 4rem 2rem;
  background: var(--bg-dark);
}

.feature-detail {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 3rem;
  align-items: flex-start;
  margin-bottom: 5rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.feature-detail.reverse {
  grid-template-columns: 1fr 120px;
}

.feature-detail.reverse .feature-icon-large {
  order: 2;
}

.feature-icon-large {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(20, 184, 166, 0.2));
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
}

.feature-content h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.feature-content > p {
  font-size: 1.0625rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  position: relative;
  padding-left: 1.75rem;
  margin-bottom: 0.75rem;
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

.feature-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5rem;
  width: 8px;
  height: 8px;
  background: var(--primary);
  border-radius: 50%;
}

.info-box {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.info-box h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.fitness-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.fitness-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.fitness-item strong {
  color: var(--primary);
  font-size: 0.875rem;
}

.fitness-item span {
  color: var(--text-muted);
  font-size: 0.8125rem;
}

.siege-section {
  padding: 5rem 2rem;
  background: var(--bg-card);
}

.siege-section .section-title {
  text-align: center;
  margin-bottom: 0.5rem;
}

.siege-section .section-subtitle {
  text-align: center;
  margin: 0 auto 3rem;
}

.siege-flow {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.flow-step {
  background: var(--bg-dark);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.5rem;
  width: 180px;
  min-height: 180px;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.flow-step:hover {
  border-color: var(--primary);
  transform: translateY(-5px);
}

.flow-step.highlight {
  border-color: var(--primary);
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(20, 184, 166, 0.1));
}

.step-number {
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  background: var(--gradient-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  margin: 0 auto 1rem;
}

.step-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.step-content h3 {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.step-content p {
  font-size: 0.8125rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.flow-arrow {
  display: flex;
  align-items: center;
  color: var(--primary);
  padding-top: 2rem;
}

.cta-section {
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  text-align: center;
}

.cta-section h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.cta-section p {
  color: var(--text-secondary);
  font-size: 1.125rem;
  margin-bottom: 2rem;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.0625rem;
}

@media (max-width: 1024px) {
  .siege-flow {
    flex-direction: column;
    align-items: center;
  }
  
  .flow-arrow {
    transform: rotate(90deg);
    padding: 0;
  }
  
  .flow-step {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 768px) {
  .feature-detail,
  .feature-detail.reverse {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .feature-detail.reverse .feature-icon-large {
    order: 0;
  }
  
  .feature-icon-large {
    width: 80px;
    height: 80px;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .hero-section {
    padding: 3rem 1rem;
  }
  
  .features-section,
  .siege-section,
  .cta-section {
    padding: 3rem 1rem;
  }
}
</style>
