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
    features: 'Fitur',
    dashboard: 'Dasbor'
  },
  footer: {
    tagline: 'VulnShield Labs - Penambangan Kerentanan Otomatis untuk Masa Depan Digital yang Lebih Aman',
    tech: 'Auto-Vulcan dengan Teknologi SIEGE'
  },
  landing: {
    hero: {
      brand: 'VulnShield Labs',
      tagline: 'Penambangan Kerentanan Otomatis untuk Masa Depan Digital yang Lebih Aman',
      description: 'Auto-Vulcan adalah platform unggulan kami untuk penambangan kerentanan otomatis. Menggunakan SIEGE (Simulated Exploit & Guided Emulation), kami mendeteksi, memvalidasi, dan membantu memitigasi kerentanan keamanan pada aplikasi Java, terutama yang menggunakan komponen Open-Source Software.',
      launchBtn: 'Luncurkan Auto-Vulcan',
      learnMore: 'Pelajari Lebih Lanjut'
    },
    about: {
      title: 'Tentang VulnShield Labs',
      p1: 'VulnShield Labs adalah perusahaan keamanan siber yang fokus mengembangkan solusi keamanan berbasis otomasi dan AI. Kami membantu organisasi mendeteksi, memvalidasi, dan memitigasi kerentanan sistem dengan pendekatan yang efisien dan terukur.',
      p2: 'Didukung oleh tim riset keamanan dan engineering yang berpengalaman, VulnShield Labs menggabungkan metodologi vulnerability mining dan threat intelligence untuk memberikan perlindungan komprehensif terhadap ancaman siber modern. Lebih dari 90% software modern dibangun menggunakan komponen Open-Source Software (OSS), dan platform kami secara khusus menargetkan dependensi ini untuk memastikan aplikasi Anda tetap aman.'
    },
    features: {
      title: 'Fitur Cepat Auto-Vulcan',
      subtitle: 'Analisis kerentanan komprehensif yang didukung oleh teknologi SIEGE',
      viewAll: 'Lihat Semua Fitur',
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
        desc: 'Membangun dan memvisualisasikan call graph global dan control flow graph untuk memetakan jalur yang dapat dijangkau'
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
    subtitle: 'Penambangan Kerentanan Otomatis dengan SIEGE',
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
        'Memetakan kerentanan ke lokasi kode spesifik',
        'Mendukung analisis kerentanan library pihak ketiga',
        'Menyediakan informasi kerentanan yang sadar konteks'
      ]
    },
    callGraph: {
      title: 'Call Graph & Control Flow Graph',
      desc: 'Menggunakan penganalisis kode statis Soot, Auto-Vulcan membangun Global Call Graph dan Control Flow Graph yang komprehensif yang memetakan semua jalur pemanggilan dan logika cabang dalam aplikasi Anda. Representasi topologis ini memastikan bahwa eksploitasi dijalankan pada jalur yang valid secara logis dan dapat dijangkau.',
      list: [
        'Membangun call graph global untuk analisis program lengkap',
        'Memetakan control flow untuk mengidentifikasi semua jalur eksekusi yang mungkin',
        'Memverifikasi keterjangkauan kode dari aplikasi klien',
        'Memvisualisasikan hubungan pemanggilan antar komponen'
      ]
    },
    exploitGen: {
      title: 'Generasi Eksploit',
      desc: 'Didukung oleh EvoSuite, mesin pengujian berbasis pencarian yang menggunakan algoritma genetika, Auto-Vulcan secara otomatis menghasilkan test case yang memicu jalur kode rentan. Sistem ini mengevolusi kandidat melalui seleksi, crossover, dan mutasi untuk menemukan skenario eksploitasi tanpa intervensi manual.',
      list: [
        'Generasi test case berbasis algoritma genetika',
        'Evaluasi fungsi fitness multi-level',
        'Analisis kesamaan konteks untuk penargetan akurat',
        'Optimasi berbasis approach level dan proximity'
      ],
      fitnessTitle: 'Komponen Fungsi Fitness',
      fitness: {
        contextSimilarity: {
          title: 'Kesamaan Konteks',
          desc: 'Mengukur berapa banyak metode dalam konteks panggilan yang ditangkap oleh eksekusi kandidat'
        },
        approachLevel: {
          title: 'Approach Level',
          desc: 'Mengevaluasi seberapa dekat kandidat mendekati kondisi cabang yang berisi kode rentan'
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
      desc: 'Tidak seperti metode deteksi tradisional yang sering menghasilkan false positive, Auto-Vulcan menyediakan validasi berbasis bukti. Sistem menghasilkan laporan komprehensif termasuk jejak eksekusi, metrik cakupan kode, dan bukti eksploitasi yang berhasil, memungkinkan organisasi untuk memprioritaskan remediasi berdasarkan risiko yang terverifikasi.',
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
          title: 'Input CVE & Aplikasi Klien',
          desc: 'Berikan identifikasi CVE target dan kode aplikasi klien Anda'
        },
        step2: {
          title: 'Analisis Statis & Ekstraksi',
          desc: 'Bangun Global Call Graph & CFG, ekstrak target kelas/metode/baris'
        },
        step3: {
          title: 'Target Cakupan',
          desc: 'Buat target: konteks panggilan, cabang, baris rentan'
        },
        step4: {
          title: 'Eksekusi Algoritma Genetika',
          desc: 'Evaluasi fitness, terapkan seleksi/crossover/mutasi'
        },
        step5: {
          title: 'Laporan Eksekusi',
          desc: 'Hasilkan bukti dengan jejak eksekusi dan data cakupan'
        }
      }
    },
    cta: {
      title: 'Siap Mengamankan Aplikasi Anda?',
      subtitle: 'Mulai analisis aplikasi Java Anda untuk kerentanan hari ini',
      button: 'Luncurkan Dasbor'
    }
  }
}
