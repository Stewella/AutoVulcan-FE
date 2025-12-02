<template>
  <div class="features-page">
    <section class="hero-section">
      <div class="container">
        <h1 class="page-title">Auto-Vulcan Features</h1>
        <p class="page-subtitle">
          Comprehensive automated vulnerability mining powered by SIEGE technology
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
            <h2>Vulnerability Localization</h2>
            <p>
              Auto-Vulcan precisely identifies the exact location of vulnerabilities obtained from CVE databases. 
              The system pinpoints the specific class, method, and line number where the vulnerable code resides, 
              enabling developers to quickly locate and understand the security issue.
            </p>
            <ul class="feature-list">
              <li>Extracts vulnerability details from CVE identifiers</li>
              <li>Maps vulnerabilities to specific code locations</li>
              <li>Supports analysis of third-party library vulnerabilities</li>
              <li>Provides context-aware vulnerability information</li>
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
            <h2>Call Graph & Control Flow Graph</h2>
            <p>
              Using Soot static code analyzer, Auto-Vulcan builds comprehensive Global Call Graphs and 
              Control Flow Graphs that map all calling paths and branch logic in your application. 
              This topological representation ensures that exploitation is executed on logically valid 
              and reachable paths.
            </p>
            <ul class="feature-list">
              <li>Constructs global call graphs for complete program analysis</li>
              <li>Maps control flow to identify all possible execution paths</li>
              <li>Verifies code reachability from client application</li>
              <li>Visualizes call relationships between components</li>
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
            <h2>Exploit Generation</h2>
            <p>
              Powered by EvoSuite, a search-based testing engine using genetic algorithms, Auto-Vulcan 
              automatically generates test cases that trigger vulnerable code paths. The system evolves 
              candidates through selection, crossover, and mutation to find exploitation scenarios without 
              manual intervention.
            </p>
            <ul class="feature-list">
              <li>Genetic algorithm-based test case generation</li>
              <li>Multi-level fitness function evaluation</li>
              <li>Context similarity analysis for accurate targeting</li>
              <li>Approach level and proximity-based optimization</li>
            </ul>
            <div class="info-box">
              <h4>Fitness Function Components</h4>
              <div class="fitness-grid">
                <div class="fitness-item">
                  <strong>Context Similarity</strong>
                  <span>Measures how many methods in the call context are captured by candidate execution</span>
                </div>
                <div class="fitness-item">
                  <strong>Approach Level</strong>
                  <span>Evaluates how close the candidate approaches branch conditions containing vulnerable code</span>
                </div>
                <div class="fitness-item">
                  <strong>Proximity to Target</strong>
                  <span>Calculates how close execution reaches the vulnerable line of code</span>
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
            <h2>Execution & Validation</h2>
            <p>
              Auto-Vulcan executes generated exploits in a controlled sandbox environment, verifying 
              whether vulnerable code lines are actually executed. This execution tracking collects 
              detailed traces and coverage data to confirm if vulnerabilities can be truly exploited.
            </p>
            <ul class="feature-list">
              <li>Sandboxed execution environment for safety</li>
              <li>Real-time execution trace collection</li>
              <li>Code coverage measurement</li>
              <li>Verification of vulnerability reachability</li>
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
            <h2>Evidence Reporting</h2>
            <p>
              Unlike traditional detection methods that often produce false positives, Auto-Vulcan provides 
              evidence-based validation. The system generates comprehensive reports including execution traces, 
              code coverage metrics, and proof of successful exploitation, enabling organizations to prioritize 
              remediation based on verified risks.
            </p>
            <ul class="feature-list">
              <li>Detailed execution trace documentation</li>
              <li>Code coverage percentage metrics</li>
              <li>Proof of exploitation success</li>
              <li>Downloadable artifact bundles for analysis</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="siege-section">
      <div class="container">
        <h2 class="section-title">How SIEGE Works</h2>
        <p class="section-subtitle">
          SIEGE (Simulated Exploit & Guided Emulation) is the core methodology behind Auto-Vulcan
        </p>
        
        <div class="siege-flow">
          <div class="flow-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>Input CVE & Client Application</h3>
              <p>Provide the target CVE identifier and your client application code</p>
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
              <h3>Static Analysis & Extraction</h3>
              <p>Build Global Call Graph & CFG, extract target class/method/line</p>
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
              <h3>Coverage Goals</h3>
              <p>Create targets: call context, branches, vulnerable lines</p>
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
              <h3>Genetic Algorithm Execution</h3>
              <p>Evaluate fitness, apply selection/crossover/mutation</p>
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
              <h3>Execution Report</h3>
              <p>Generate evidence with execution trace and coverage data</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <h2>Ready to Secure Your Applications?</h2>
        <p>Start analyzing your Java applications for vulnerabilities today</p>
        <router-link to="/dashboard" class="btn btn-primary btn-large">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          Launch Dashboard
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
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
  text-align: center;
  transition: all 0.3s ease;
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
  background: var(--gradient-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  margin: 0 auto 1rem;
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
