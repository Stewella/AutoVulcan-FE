export default {
  nav: {
    home: 'Home',
    features: 'Features',
    dashboard: 'Dashboard'
  },
  footer: {
    tagline: 'VulnShield Labs - Automated Vulnerability Mining for a Safer Digital Future',
    tech: 'Auto-Vulcan with SIEGE Technology'
  },
  landing: {
    hero: {
      brand: 'VulnShield Labs',
      tagline: 'Automated Vulnerability Mining for a Safer Digital Future',
      description: 'Auto-Vulcan is our flagship platform for automated vulnerability mining. Using SIEGE (Simulated Exploit & Guided Emulation), we detect, validate, and help mitigate security vulnerabilities in Java applications, especially those using Open-Source Software components.',
      launchBtn: 'Launch Auto-Vulcan',
      learnMore: 'Learn More'
    },
    about: {
      title: 'About VulnShield Labs',
      p1: 'VulnShield Labs is a cybersecurity company focused on developing automation and AI-based security solutions. We help organizations detect, validate, and mitigate system vulnerabilities with an efficient and measurable approach.',
      p2: 'Supported by an experienced security research and engineering team, VulnShield Labs combines vulnerability mining methodology and threat intelligence to deliver comprehensive protection against modern cyber threats. More than 90% of modern software is built using Open-Source Software (OSS) components, and our platform specifically targets these dependencies to ensure your applications remain secure.'
    },
    features: {
      title: 'Auto-Vulcan Quick Features',
      subtitle: 'Comprehensive vulnerability analysis powered by SIEGE technology',
      viewAll: 'View All Features',
      exploitGen: {
        title: 'Automated Exploit Generation',
        desc: 'Uses genetic algorithms to automatically find exploitation scenarios without manual intervention'
      },
      reporting: {
        title: 'Evidence-Based Reporting',
        desc: 'Provides execution traces, code coverage metrics, and proof of successful exploitation'
      },
      localization: {
        title: 'Vulnerability Localization',
        desc: 'Pinpoints exact location (class, method, line) of vulnerabilities from CVE databases'
      },
      callGraph: {
        title: 'Call Graph & CFG Analysis',
        desc: 'Builds and visualizes global call graphs and control flow graphs to map reachable paths'
      }
    },
    team: {
      title: 'Development Team',
      subtitle: 'Meet the experts behind Auto-Vulcan',
      marcel: {
        role: 'Team Leader & Frontend',
        desc: 'Has experience in Big Data projects to support data-driven decision making.'
      },
      steffany: {
        role: 'Data Scientist & Core',
        desc: 'More than 5 years of experience in Statistics and Data Science.'
      },
      marde: {
        role: 'Backend Engineer',
        desc: 'More than 4 years developing frontend and backend, databases, servers, and the software development lifecycle.'
      }
    }
  },
  dashboard: {
    title: 'Auto-Vulcan Dashboard',
    subtitle: 'Automated Vulnerability Mining with SIEGE',
    codeInput: 'Code Input',
    artifactHistory: 'Artifact History',
    searchPlaceholder: 'Search artifacts...',
    allStatus: 'All Status',
    analysis: {
      running: 'Analysis Running',
      complete: 'Analysis Complete',
      failed: 'Analysis Failed',
      foundCves: 'Found {count} CVE(s) in {duration}'
    }
  },
  codeInput: {
    jsonInput: 'JSON Input',
    formInput: 'Form Input',
    uploadFile: 'Upload File',
    pasteJson: 'Paste JSON Configuration',
    repositoryName: 'Repository Name',
    commitHash: 'Commit Hash',
    targetCve: 'Target CVE',
    timeout: 'Timeout (seconds)',
    uploadZip: 'Upload File .zip',
    dragDrop: 'Drag & drop .zip here or click to browse',
    loadSample: 'Load Sample JSON',
    runAnalysis: 'Run Analysis',
    runningAnalysis: 'Running Analysis...'
  },
  artifactTable: {
    repository: 'Repository',
    commit: 'Commit',
    status: 'Status',
    cves: 'CVEs',
    duration: 'Duration',
    time: 'Time',
    actions: 'Actions',
    view: 'View',
    more: '+{count} more',
    empty: {
      title: 'No artifacts found',
      desc: 'Run an analysis to generate artifacts'
    }
  },
  artifactDetail: {
    title: 'Artifact Details',
    repository: 'Repository',
    commit: 'Commit',
    status: 'Status',
    duration: 'Duration',
    vulnLocalization: 'Vulnerability Localization',
    class: 'Class:',
    method: 'Method:',
    line: 'Line:',
    evidenceReport: 'Evidence Report',
    codeCoverage: 'Code Coverage',
    exploitStatus: 'Exploit Status:',
    successful: 'Successful',
    failed: 'Failed',
    executionTrace: 'Execution Trace',
    failureReason: 'Failure Reason:',
    cvesDetected: 'CVEs Detected',
    close: 'Close'
  },
  callGraph: {
    title: 'Call Graph Visualization',
    legend: {
      entry: 'Entry Point',
      intermediate: 'Intermediate Call',
      vulnerable: 'Vulnerable Code'
    },
    close: 'Close'
  },
  features: {
    hero: {
      title: 'Auto-Vulcan Features',
      subtitle: 'Comprehensive automated vulnerability mining powered by SIEGE technology'
    },
    vulnLocalization: {
      title: 'Vulnerability Localization',
      desc: 'Auto-Vulcan precisely identifies the exact location of vulnerabilities obtained from CVE databases. The system pinpoints the specific class, method, and line number where the vulnerable code resides, enabling developers to quickly locate and understand the security issue.',
      list: [
        'Extracts vulnerability details from CVE identifiers',
        'Maps vulnerabilities to specific code locations',
        'Supports analysis of third-party library vulnerabilities',
        'Provides context-aware vulnerability information'
      ]
    },
    callGraph: {
      title: 'Call Graph & Control Flow Graph',
      desc: 'Using Soot static code analyzer, Auto-Vulcan builds comprehensive Global Call Graphs and Control Flow Graphs that map all calling paths and branch logic in your application. This topological representation ensures that exploitation is executed on logically valid and reachable paths.',
      list: [
        'Constructs global call graphs for complete program analysis',
        'Maps control flow to identify all possible execution paths',
        'Verifies code reachability from client application',
        'Visualizes call relationships between components'
      ]
    },
    exploitGen: {
      title: 'Exploit Generation',
      desc: 'Powered by EvoSuite, a search-based testing engine using genetic algorithms, Auto-Vulcan automatically generates test cases that trigger vulnerable code paths. The system evolves candidates through selection, crossover, and mutation to find exploitation scenarios without manual intervention.',
      list: [
        'Genetic algorithm-based test case generation',
        'Multi-level fitness function evaluation',
        'Context similarity analysis for accurate targeting',
        'Approach level and proximity-based optimization'
      ],
      fitnessTitle: 'Fitness Function Components',
      fitness: {
        contextSimilarity: {
          title: 'Context Similarity',
          desc: 'Measures how many methods in the call context are captured by candidate execution'
        },
        approachLevel: {
          title: 'Approach Level',
          desc: 'Evaluates how close the candidate approaches branch conditions containing vulnerable code'
        },
        proximity: {
          title: 'Proximity to Target',
          desc: 'Calculates how close execution reaches the vulnerable line of code'
        }
      }
    },
    execution: {
      title: 'Execution & Validation',
      desc: 'Auto-Vulcan executes generated exploits in a controlled sandbox environment, verifying whether vulnerable code lines are actually executed. This execution tracking collects detailed traces and coverage data to confirm if vulnerabilities can be truly exploited.',
      list: [
        'Sandboxed execution environment for safety',
        'Real-time execution trace collection',
        'Code coverage measurement',
        'Verification of vulnerability reachability'
      ]
    },
    evidence: {
      title: 'Evidence Reporting',
      desc: 'Unlike traditional detection methods that often produce false positives, Auto-Vulcan provides evidence-based validation. The system generates comprehensive reports including execution traces, code coverage metrics, and proof of successful exploitation, enabling organizations to prioritize remediation based on verified risks.',
      list: [
        'Detailed execution trace documentation',
        'Code coverage percentage metrics',
        'Proof of exploitation success',
        'Downloadable artifact bundles for analysis'
      ]
    },
    siege: {
      title: 'How SIEGE Works',
      subtitle: 'SIEGE (Simulated Exploit & Guided Emulation) is the core methodology behind Auto-Vulcan',
      steps: {
        step1: {
          title: 'Input CVE & Client Application',
          desc: 'Provide the target CVE identifier and your client application code'
        },
        step2: {
          title: 'Static Analysis & Extraction',
          desc: 'Build Global Call Graph & CFG, extract target class/method/line'
        },
        step3: {
          title: 'Coverage Goals',
          desc: 'Create targets: call context, branches, vulnerable lines'
        },
        step4: {
          title: 'Genetic Algorithm Execution',
          desc: 'Evaluate fitness, apply selection/crossover/mutation'
        },
        step5: {
          title: 'Execution Report',
          desc: 'Generate evidence with execution trace and coverage data'
        }
      }
    },
    cta: {
      title: 'Ready to Secure Your Applications?',
      subtitle: 'Start analyzing your Java applications for vulnerabilities today',
      button: 'Launch Dashboard'
    }
  }
}
