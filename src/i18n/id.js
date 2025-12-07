export default {
  common: {
    closeModal: 'Tutup modal',
    switchToIndonesian: 'Ganti ke Bahasa Indonesia',
    switchToEnglish: 'Ganti ke Bahasa Inggris',
    viewDetails: 'Lihat Detail',
    downloadArtifact: 'Unduh Artefak',
    viewCallGraph: 'Lihat Call Graph'
  },
  nav: {
    home: 'Beranda',
    aboutUs: 'Tentang Kami',
    features: 'Fitur',
    dashboard: 'Dasbor',
    login: 'Masuk',
    logout: 'Keluar'
  },
  auth: {
    loginTitle: 'Selamat Datang Kembali',
    loginSubtitle: 'Masuk untuk mengakses Auto-Vulcan',
    signupTitle: 'Buat Akun',
    signupSubtitle: 'Bergabung dengan VulnShield Labs hari ini',
    email: 'Email',
    emailPlaceholder: 'Masukkan email Anda',
    password: 'Kata Sandi',
    passwordPlaceholder: 'Masukkan kata sandi Anda',
    confirmPassword: 'Konfirmasi Kata Sandi',
    confirmPasswordPlaceholder: 'Konfirmasi kata sandi Anda',
    name: 'Nama Lengkap',
    namePlaceholder: 'Masukkan nama lengkap Anda',
    login: 'Masuk',
    loggingIn: 'Sedang Masuk...',
    signup: 'Buat Akun',
    signingUp: 'Membuat Akun...',
    noAccount: 'Belum punya akun?',
    signupLink: 'Daftar',
    hasAccount: 'Sudah punya akun?',
    loginLink: 'Masuk',
    invalidCredentials: 'Email atau kata sandi salah',
    emailExists: 'Email sudah terdaftar',
    passwordMismatch: 'Kata sandi tidak cocok',
    passwordTooShort: 'Kata sandi minimal 6 karakter'
  },
  footer: {
    tagline: 'VulnShield Labs - Automated Vulnerability Mining',
    tech: 'Auto-Vulcan dengan Metode SIEGE'
  },
  landing: {
    hero: {
      brand: 'Auto-Vulcan',
      tagline: 'Automated Vulnerability Mining',
      description: 'Auto-Vulcan adalah platform unggulan kami untuk pencarian kerentanan otomatis. Menggunakan SIEGE metode (Simulated Exploit & Guided Emulation), untuk mendeteksi, memvalidasi, dan membantu memitigasi kerentanan keamanan pada aplikasi Java, terutama yang menggunakan komponen Open-Source Software.',
      launchBtn: 'Masuk ke Auto-Vulcan',
      learnMore: 'Pelajari Lebih Lanjut'
    },
    about: {
      title: 'Tentang VulnShield Labs',
      p1: 'VulnShield Labs adalah perusahaan keamanan siber yang fokus mengembangkan solusi keamanan berbasis otomasi dan AI. Kami membantu organisasi mendeteksi, memvalidasi, dan memitigasi kerentanan sistem dengan pendekatan yang efisien dan terukur.'
    },
    features: {
      title: 'Fitur Cepat Auto-Vulcan',
      subtitle: 'Analisis kerentanan komprehensif yang didukung oleh metode SIEGE',
      viewAll: 'Lihat Semua Fitur',
    autoVulcanFeatures: 'Fitur Auto-Vulcan',
      exploitGen: {
        title: 'Generasi Eksploit Otomatis',
        desc: 'Menggunakan algoritma genetika untuk secara otomatis menemukan skenario eksploitasi tanpa intervensi manual'
      },
      reporting: {
        title: 'Pelaporan Berbasis Bukti',
        desc: 'Menyediakan jejak eksekusi, metrik cakupan kode, dan bukti eksploitasi yang berhasil'
      },
      localization: {
        title: 'Lokalisasi Kerentanan',
        desc: 'Menentukan lokasi tepat (kelas, metode, baris) kerentanan dari database CVE'
      },
      callGraph: {
        title: 'Analisis Call Graph & CFG',
        desc: 'Memvisualisasikan call graph global dan control flow graph untuk memetakan jalur yang dapat dijangkau'
      }
    },
    team: {
      title: 'Tim Pengembang',
      subtitle: 'Kenali para ahli di balik Auto-Vulcan',
      marcel: {
        role: 'Ketua Tim & Frontend',
        desc: 'Memiliki pengalaman dalam proyek Big Data untuk mendukung pengambilan keputusan berbasis data.'
      },
      steffany: {
        role: 'Data Scientist & Core',
        desc: 'Lebih dari 5 tahun pengalaman di bidang Statistika dan Data Science.'
      },
      marde: {
        role: 'Backend Engineer',
        desc: 'Lebih dari 4 tahun mengembangkan frontend dan backend, database, server, dan siklus pengembangan perangkat lunak.'
      }
    }
  },
  dashboard: {
    title: 'Dasbor Auto-Vulcan',
    subtitle: 'Pencarian Kerentanan Otomatis dengan Metode SIEGE',
    codeInput: 'Input Kode',
    artifactHistory: 'Riwayat Artefak',
    searchPlaceholder: 'Cari artefak...',
    allStatus: 'Semua Status',
    analysis: {
      running: 'Analisis Berjalan',
      complete: 'Analisis Selesai',
      failed: 'Analisis Gagal',
      foundCves: 'Ditemukan {count} CVE dalam {duration}'
    }
  },
  codeInput: {
    jsonInput: 'Input JSON',
    formInput: 'Input Form',
    uploadFile: 'Unggah File',
    pasteJson: 'Tempel Konfigurasi JSON',
    repositoryName: 'Nama Repositori',
    commitHash: 'Hash Commit',
    targetCve: 'Target CVE',
    targetMethod: 'Target Method',
    targetLine: 'Target Line',
    timeout: 'Batas Waktu (detik)',
    uploadZip: 'Unggah File .zip',
    dragDrop: 'Seret & lepas .zip di sini atau klik untuk menelusuri',
    loadSample: 'Muat Contoh JSON',
    runAnalysis: 'Jalankan Analisis',
    runningAnalysis: 'Menjalankan Analisis...'
  },
  artifactTable: {
    repository: 'Repositori',
    commit: 'Commit',
    status: 'Status',
    cves: 'CVE',
    duration: 'Durasi',
    time: 'Waktu',
    actions: 'Aksi',
    view: 'Lihat',
    more: '+{count} lagi',
    empty: {
      title: 'Tidak ada artefak ditemukan',
      desc: 'Jalankan analisis untuk menghasilkan artefak'
    }
  },
  artifactDetail: {
    title: 'Detail Artefak',
    repository: 'Repositori',
    commit: 'Commit',
    status: 'Status',
    duration: 'Durasi',
    vulnLocalization: 'Lokalisasi Kerentanan',
    class: 'Kelas:',
    method: 'Metode:',
    line: 'Baris:',
    evidenceReport: 'Laporan Bukti',
    codeCoverage: 'Cakupan Kode',
    exploitStatus: 'Status Eksploit:',
    successful: 'Berhasil',
    failed: 'Gagal',
    executionTrace: 'Jejak Eksekusi',
    failureReason: 'Alasan Kegagalan:',
    cvesDetected: 'CVE Terdeteksi',
    close: 'Tutup'
  },
  callGraph: {
    title: 'Visualisasi Call Graph',
    legend: {
      entry: 'Titik Masuk',
      intermediate: 'Panggilan Perantara',
      vulnerable: 'Kode Rentan'
    },
    close: 'Tutup'
  },
  features: {
    hero: {
      title: 'Fitur Auto-Vulcan',
      subtitle: 'Penambangan kerentanan otomatis yang komprehensif didukung oleh teknologi SIEGE'
    },
    vulnLocalization: {
      title: 'Lokalisasi Kerentanan',
      desc: 'Auto-Vulcan secara tepat mengidentifikasi lokasi tepat kerentanan yang diperoleh dari database CVE. Sistem ini menentukan kelas, metode, dan nomor baris spesifik tempat kode rentan berada, memungkinkan pengembang untuk dengan cepat menemukan dan memahami masalah keamanan.',
      list: [
        'Mengekstrak detail kerentanan dari identifikasi CVE',
        'Mapping kerentanan',
        'Mendukung analisis kerentanan library pihak ketiga',
        'Menyediakan informasi kerentanan'
      ]
    },
    callGraph: {
      title: 'Call Graph & Control Flow Graph',
      desc: 'Menggunakan Sootup, Auto-Vulcan membangun Global Call Graph dan Control Flow Graph yang komprehensif yang memetakan semua jalur pemanggilan. Representasi ini memastikan bahwa eksploitasi dijalankan pada jalur yang valid secara logis dan dapat dijangkau.',
      list: [
        'Membangun call graph global untuk analisis program lengkap',
        'Memetakan control flow untuk mengidentifikasi semua jalur eksekusi yang mungkin',
        'Memverifikasi keterjangkauan kode dari aplikasi klien',
        'Memvisualisasikan hubungan antar komponen'
      ]
    },
    exploitGen: {
      title: 'Generasi Eksploit',
      desc: 'Menggunakan EvoSuite, mesin pencarian yang menggunakan algoritma genetik, Auto-Vulcan secara otomatis menghasilkan test case yang memicu jalur kode rentan. Sistem ini mengevolusi kandidat melalui seleksi, crossover, dan mutasi untuk menemukan skenario eksploitasi tanpa intervensi manual.',
      list: [
        'Pembuatan test case berbasis algoritma genetik',
        'Evaluasi fitness function multi-level',
        'Analisis context similarity untuk target yang akurat',
        'Optimasi berbasis approach level dan proximity'
      ],
      fitnessTitle: 'Komponen Fitness Function',
      fitness: {
        contextSimilarity: {
          title: 'Context Similarity',
          desc: 'Mengukur berapa banyak metode dalam konteks panggilan yang dapat ditangkap'
        },
        approachLevel: {
          title: 'Approach Level',
          desc: 'Mengevaluasi seberapa dekat eksekusi mendekati kondisi cabang yang berisi kode rentan'
        },
        proximity: {
          title: 'Proximity ke Target',
          desc: 'Menghitung seberapa dekat eksekusi mencapai baris kode yang rentan'
        }
      }
    },
    execution: {
      title: 'Eksekusi & Validasi',
      desc: 'Auto-Vulcan menjalankan eksploit yang dihasilkan dalam lingkungan sandbox yang terkontrol, memverifikasi apakah baris kode rentan benar-benar dieksekusi. Pelacakan eksekusi ini mengumpulkan jejak detail dan data cakupan untuk mengkonfirmasi apakah kerentanan dapat benar-benar dieksploitasi.',
      list: [
        'Lingkungan eksekusi sandbox untuk keamanan',
        'Pengumpulan jejak eksekusi real-time',
        'Pengukuran cakupan kode',
        'Verifikasi keterjangkauan kerentanan'
      ]
    },
    evidence: {
      title: 'Pelaporan Bukti',
      desc: 'Tidak seperti metode deteksi tradisional yang sering menghasilkan false positive, Auto-Vulcan menyediakan validasi berbasis bukti. Sistem menghasilkan laporan komprehensif termasuk jejak eksekusi, metrik cakupan kode, dan bukti eksploitasi yang berhasil, memungkinkan organisasi untuk memprioritaskan perbaikan berdasarkan risiko yang terverifikasi.',
      list: [
        'Dokumentasi jejak eksekusi yang detail',
        'Metrik persentase cakupan kode',
        'Bukti keberhasilan eksploitasi',
        'Bundle artefak yang dapat diunduh untuk analisis'
      ]
    },
    siege: {
      title: 'Cara Kerja SIEGE',
      subtitle: 'SIEGE (Simulated Exploit & Guided Emulation) adalah metodologi inti di balik Auto-Vulcan',
      steps: {
        step1: {
          title: 'Input CVE & Aplikasi',
          desc: 'Memberikan identifikasi CVE target dan kode aplikasi'
        },
        step2: {
          title: 'Analisis Statis & Ekstraksi',
          desc: 'Membangun Global Call Graph & CFG, ekstrak target kelas/metode/baris'
        },
        step3: {
          title: 'Target Cakupan',
          desc: 'Buat target: konteks panggilan, cabang, baris rentan'
        },
        step4: {
          title: 'Eksekusi Algoritma Genetik',
          desc: 'Evaluasi fitness, terapkan seleksi/crossover /mutasi'
        },
        step5: {
          title: 'Laporan Eksekusi',
          desc: 'Menghasilkan bukti dengan jejak eksekusi dan data cakupan'
        }
      }
    },
    cta: {
      title: 'Siap Mengamankan Aplikasi Anda?',
      subtitle: 'Mulai analisis aplikasi Java Anda untuk kerentanan hari ini',
      button: 'Jalankan Dasbor'
    }
  }
}
