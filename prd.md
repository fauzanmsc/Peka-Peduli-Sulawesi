# PRODUCT REQUIREMENT DOCUMENT (PRD) — GRADE PRO
## Portal & Platform Donasi Mandiri "Peka Peduli Sulawesi"

---

## DAFTAR ISI
1. [Ringkasan Eksekutif & Sasaran Bisnis](#1-ringkasan-eksekutif--sasaran-bisnis)
2. [Arsitektur Sistem & Arsitektur Cloud (Vercel + GitHub)](#2-arsitektur-sistem--arsitektur-cloud-vercel--github)
3. [Skema Data Komprehensif (PostgreSQL Database Schema)](#3-skema-data-komprehensif-postgresql-database-schema)
4. [Spesifikasi Desain Visual & UI/UX (Bento Grid & Desain Token)](#4-spesifikasi-desain-visual--uiux-bento-grid--desain-token)
5. [Spesifikasi Halaman Publik & Fungsionalitas Front-End](#5-spesifikasi-halaman-publik--fungsionalitas-front-end)
6. [Spesifikasi Fungsionalitas Dashboard Admin (CMS Super-CRUD)](#6-spesifikasi-fungsionalitas-dashboard-admin-cms-super-crud)
7. [Spesifikasi Portal Relawan (Login Sebagai Relawan)](#7-spesifikasi-portal-relawan-login-sebagai-relawan)
8. [Integrasi Pihak Ketiga & Payment Gateway Engine](#8-integrasi-pihak-ketiga--payment-gateway-engine)
9. [Fitur Tambahan Lanjutan (Advanced Features) untuk Ekspansi](#9-fitur-tambahan-lanjutan-advanced-features-untuk-ekspansi)
10. [Metrik Non-Fungsional, Kinerja, & Keamanan (PRO Checklist)](#10-metrik-non-fungsional-kinerja--keamanan-pro-checklist)
11. [Rencana Pengujian (User Acceptance Testing / UAT Matrix)](#11-rencana-pengujian-user-acceptance-testing--uat-matrix)

---

## 1. Ringkasan Eksekutif & Sasaran Bisnis

### 1.1 Latar Belakang & Pernyataan Masalah
Yayasan Peduli Kemanusiaan **"Peka Peduli Sulawesi"** membutuhkan ekosistem digital untuk menunjang keterbukaan informasi publik, koordinasi tim relawan di seluruh wilayah Sulawesi, serta mesin penggalangan dana mandiri yang aman dan cepat. Selama ini, operasional yayasan masih bergantung pada platform pihak ketiga dengan biaya komisi yang relatif tinggi dan kontrol tata letak portal yang terbatas. 

Situs web ini dirancang khusus untuk memotong ketergantungan tersebut menggunakan platform donasi self-hosted berkinerja tinggi, mengintegrasikan alur publikas berita aksi kemanusiaan (CMS), database profil relawan, serta tracker transparansi arus masuk-keluar donasi setiap bulan.

### 1.2 Target Pengguna (Audience Persona)
*   **Donatur (Publik):** Individu paruh baya hingga profesional muda yang menginginkan transparansi, kemudahan metode bayar digital (QRIS, VA Bank, E-Wallet), serta akses cepat terhadap laporan penggunaan dana.
*   **Admin Yayasan (Internal):** Tim manajemen kampanye dan humas yang memerlukan editor berita (CMS), manajemen status donasi, serta pengarsipan data pendaftaran relawan.
*   **Relawan (Lapangan):** Personel yang terjun langsung ke lokasi bencana atau posko pelayanan kemanusiaan di Sulawesi untuk mengunggah laporan visual di lapangan.

---

## 2. Arsitektur Sistem & Arsitektur Cloud (Vercel + GitHub)

Sistem dirancang dengan arsitektur **Jamstack/Serverless** menggunakan **Next.js** untuk optimalisasi performa rendering, SEO ramah mesin pencari, dan konsumsi sumber daya seminimal mungkin (ringan).

```
                            ┌────────────────────────┐
                            │      GitHub Repo       │
                            └───────────┬────────────┘
                                        │
                               (Automatic Webhook)
                                        │
                                        ▼
                            ┌────────────────────────┐
                            │   Vercel Deployment    │
                            └─────┬────────────┬─────┘
                                  │            │
             (Serverless Handlers)│            │(Static Pages / SSR)
                                  ▼            ▼
             ┌──────────────────────┐        ┌──────────────────────┐
             │  Supabase/PostgreSQL │        │ Payment Gateway API  │
             │   Database & Auth    │        │  (Midtrans / Xendit) │
             └──────────────────────┘        └──────────────────────┘
```

### 2.1 Alur Git & Alur Kerja Deployment Vercel (CI/CD)
*   **Repositori GitHub:** Menggunakan 2 branch utama:
    *   `main`: Lingkungan produksi (*Production Environment*) yang dipetakan ke domain kustom yayasan (contoh: `pekapeduli.org`).
    *   `development`: Lingkungan pengembangan (*Preview Environment*) untuk pengujian fitur baru sebelum digabungkan (*merged*).
*   **Alur Deployment Terotomatisasi:**
    1. Pengembang melakukan commit perubahan kode dan push ke cabang `development`.
    2. Vercel secara otomatis memicu proses *Build* dan menyediakan tautan URL pratinjau unik untuk tim internal melakukan pengujian.
    3. Setelah lolos QA, dibuatlah *Pull Request* (PR) dari `development` ke `main`.
    4. Penggabungan PR ke cabang `main` akan memicu deploy otomatis di server produksi Vercel dengan *Zero Downtime Deployment*.
*   **Variabel Lingkungan (Environment Variables) Terpusat:** Pengaturan kredensial sensitif untuk database, API payment gateway, dan kunci enkripsi didefinisikan secara aman di dashboard web *Vercel Settings*.

---

## 3. Skema Data Komprehensif (PostgreSQL Database Schema)

Relasi entity database dirancang bertipe relasional (PostgreSQL) menggunakan Supabase Client untuk akses SQL berkinerja tinggi dan terenkripsi menggunakan RLS (Row Level Security).

```sql
-- Ekstensi UUID untuk pengidentifikasi unik global
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABEL PENGGUNA GLOBAL (AUTH & AKUN)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('SUPER_ADMIN', 'ADMIN_KAMPANYE', 'RELAWAN')) NOT NULL,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABEL PROFIL PENGURUS & TIM INTI
CREATE TABLE team_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    position VARCHAR(100) NOT NULL,
    photo_url TEXT NOT NULL,
    order_index INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABEL PROFIL RELAWAN AKTIF & PELAPOR
CREATE TABLE volunteer_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    domicile VARCHAR(100) NOT NULL,
    skills TEXT NOT NULL,
    bio TEXT,
    photo_url TEXT,
    approval_status VARCHAR(50) CHECK (approval_status IN ('PENDING', 'APPROVED', 'REJECTED')) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. TABEL KAMPANYE DONASI
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    target_amount NUMERIC(15, 2) NOT NULL,
    current_amount NUMERIC(15, 2) DEFAULT 0.00,
    end_date DATE NOT NULL,
    summary VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    cover_image_url TEXT NOT NULL,
    is_urgent BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) CHECK (status IN ('DRAFT', 'PUBLISHED', 'COMPLETED', 'ARCHIVED')) DEFAULT 'DRAFT',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. TABEL TRANSAKSI DONASI MASUK
CREATE TABLE donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES campaigns(id) ON DELETE RESTRICT,
    donor_name VARCHAR(150) DEFAULT 'Hamba Allah',
    donor_email VARCHAR(255) NOT NULL,
    donor_phone VARCHAR(20),
    amount NUMERIC(15, 2) NOT NULL,
    is_anonymous BOOLEAN DEFAULT FALSE,
    prayer_notes TEXT,
    payment_gateway_ref VARCHAR(255) UNIQUE,
    payment_type VARCHAR(100),
    payment_status VARCHAR(50) CHECK (payment_status IN ('PENDING', 'SUCCESS', 'FAILED', 'EXPIRED')) DEFAULT 'PENDING',
    settled_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. TABEL LAPORAN KEUANGAN BULANAN (YAYASAN)
CREATE TABLE monthly_financial_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    month_period DATE NOT NULL UNIQUE, -- Contoh input: '2023-11-01' untuk laporan November 2023
    total_income NUMERIC(15, 2) NOT NULL,
    total_expense NUMERIC(15, 2) NOT NULL,
    allocated_for_operations NUMERIC(15, 2) NOT NULL,
    allocated_for_campaigns NUMERIC(15, 2) NOT NULL,
    report_pdf_url TEXT NOT NULL,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. TABEL CMS ARTIKEL BERITA & BLOG
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    thumbnail_url TEXT NOT NULL,
    published_at TIMESTAMP,
    author_id UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. TABEL UPDATE DISALURKAN (LIVESTREAM UPDATE DARI RELAWAN / ADMIN)
CREATE TABLE campaign_updates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    reporter_id UUID REFERENCES users(id),
    title VARCHAR(200) NOT NULL,
    report_text TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. Spesifikasi Desain Visual & UI/UX (Bento Grid & Desain Token)

Situs web harus dirancang dengan pendekatan modern bertaraf agensi global dengan struktur hierarki visual hibrida, mengoptimalkan tata letak modular bertipe Bento Grid.

### 4.1 Token Desain (Theme Standard)
*   **Warna Latar Depan & Belakang:**
    *   Warna Pokok (Primary background): Putih Bersih (`#FFFFFF`) / Soft Gray (`#F9FAFB`).
    *   Aksen Kuat Kemanusiaan (Accents): Merah Solid (`#E53E3E`) dan Merah Gelap (`#9B2C2C`).
    *   Warna Netral (Text/Structural Elements): Hitam Pekat Maskulin (`#111827`) dan Slate (`#4B5563`).
*   **Sistem Grid:** Layout utama mengimplementasikan dynamic grid berukuran 12 kolom (Desktop) yang bertransformasi menjadi 1 kolom (Mobile).
*   **Kehalusan UI:** Kelembapan transisi micro-interactions minimal 200ms `cubic-bezier(0.4, 0, 0.2, 1)`. Sudut melengkung ekstrim berukuran `rounded-2xl` (16px) hingga `rounded-3xl` (24px) untuk blok Bento.

---

## 5. Spesifikasi Halaman Publik & Fungsionalitas Front-End

### 5.1 Preloader Halaman (Interactive Page Loader)
*   **Interaksi Sistem:** Menolak tampilan mentah yang kasar. Menggantung halaman dari frame rendering mentah selama aset kritis dimuat.
*   **Elemen Visual:** Grafis vektor (SVG) logo Peka Peduli dengan sirkulasi cahaya merah bersinar progresif (*glowing pulse*), diiringi dengan garis persentase tipis di bagian paling atas viewport layar.
*   **Kriteria Kualitas:** Harus otomatis nonaktif dalam waktu kurang dari 800ms jika jaringan stabil, untuk menghindari hambatan navigasi.

### 5.2 Beranda (Homepage Bento Grid)
*   **Blok Utama 1 (Slider Banner Kampanye Terdesak):**
    *   *Komponen:* Slider otomatis (*swipeable* & ramah sentuhan) yang menampilkan spanduk horizontal dari 3 kampanye teratas bertanda `is_urgent = TRUE`.
    *   *Item Slider:* Judul kampanye, tombol cepat "Donasi Sekarang", bar status capaian target donasi saat ini, dan tombol kontrol navigasi kiri-kanan.
*   **Bento Grid Interaktif (Di bawah Banner):**
    *   *Grid Card A (Lebar 3/12 di Desktop):* Widget "Statistik Real-time" yang menampilkan total donasi dalam rupiah dan jumlah program penyaluran yang telah selesai dengan animasi penghitungan angka dinamis.
    *   *Grid Card B (Lebar 6/12 di Desktop):* Sorotan berita utama terkini dari aksi kemanusiaan di pedalaman Palu, Sigi, atau Donggala secara bergantian otomatis.
    *   *Grid Card C (Lebar 3/12 di Desktop):* Widget CTA instan: Tombol cepat bertuliskan "Daftar Relawan Sulawesi" dengan animasi melayang (*hover bounce*).
    *   *Grid Card D (Lebar 4/12 di Desktop):* Tampilan tiga donatur terakhir secara anonim maupun non-anonim dengan efek geser otomatis vertical yang menunjukkan transparansi arus kas masuk.
    *   *Grid Card E (Lebar 8/12 di Desktop):* Peta infografis penyaluran bantuan di Pulau Sulawesi berbasis titik pinpoint SVG interaktif yang menampilkan nama daerah saat disentuh/diarahkan cursor.

### 5.3 Halaman Tentang Kami
*   **Komponen:** 
    *   Visi-Misi yayasan yang disajikan dalam diagram infografis minimalis (dua warna dominan: Putih & Hitam dengan aksen batas Merah).
    *   Dokumentasi SK Kemenkumham Resmi dan berkas legalitas yayasan lainnya yang tertata rapi dalam format akordeon interaktif (*Collapsible Accordion*).
    *   Susunan Pengurus: Menampilkan portofolio foto tim pelaksana inti yayasan dengan filter interaktif berdasarkan fungsionalitas bidang tugas (Medis, SAR, Logistik, Pendidikan).

### 5.4 Halaman Profil Relawan (Sisi Publik)
*   **Daftar Kartu Relawan:** Kartu-kartu yang menyorot relawan berprestasi mingguan yang aktif dalam misi kemanusiaan, lengkap dengan lencana wilayah tugas (contoh: "Posko Sigi", "Posko Masamba").
*   **Formulir Pendaftaran Relawan Baru:** 
    *   Formulir interaktif dengan fitur validasi sisi klien (*Client-side validation*):
        *   Nama Lengkap (Wajib, String panjang <150 karakter)
        *   No. WhatsApp Aktif (Wajib, Pola regular expression Indonesia `^(\+62|62|0)8[1-9][0-9]{6,11}$`)
        *   Domisili Kota/Kabupaten di Sulawesi (Pilihan Dropdown)
        *   Pilihan Minat Fokus Keahlian (Checkbox: SAR/Bencana, Medis, Trauma Healing, Distribusi Logistik, Pengajar)
        *   Unggah Foto Diri & Upload KTP (Validasi format file: JPG, PNG, PDF; batas ukuran maksimal 2MB per file, terkompresi sebelum dikirim ke bucket cloud storage).

### 5.5 Halaman Berita (CMS Blog)
*   **Layout:** Layout dua kolom dengan filter di sisi kiri (Kategori artikel, Pencarian teks bebas) dan daftar artikel di sisi kanan berformat grid modern.
*   **Fitur Pencarian & Filter:** Menggunakan sistem *instant-search* berbasis manipulasi array di client-side untuk memfilter kartu yang sesuai secara instan tanpa proses pemuatan ulang halaman (*reload*).

### 5.6 Halaman Donasi (Donation Hub)

#### A. Anak Halaman 1: Formulir Kirim Donasi (Donation Step-by-Step Form)
Halaman ini berupa satu halaman aplikasi dinamis (*Single Page Dynamic Workflow*) yang terbagi dalam 3 langkah mudah:

```
[ Langkah 1: Nominal ] ─────► [ Langkah 2: Identitas ] ─────► [ Langkah 3: Bayar / QRIS ]
```

*   **Langkah 1 (Input Nominal & Kampanye):** Donatur memilih target misi penugasan dana yang ingin dibantu (Dropdown dinamis mengambil data dari tabel `campaigns`) dan nominal donasi (Tersedia tombol pintas instan Rp50.000, Rp100.000, Rp250.000, Rp500.000, dan kolom kosong untuk mengetik nilai kustom).
*   **Langkah 2 (Input Identitas):** Mengisi Data Donatur (Nama Lengkap, Alamat Email Aktif, Nomor HP). Dilengkapi dengan kotak centang (*checkbox*) bertuliskan: "Sembunyikan nama saya di publik (Hamba Allah)". Donatur dapat menyertakan kalimat doa/dukungan moral pada kolom teks yang disediakan.
*   **Langkah 3 (Interkoneksi Sistem Pembayaran):** Menampilkan detail tagihan dan memunculkan pop-up / tautan resmi dari Payment Gateway untuk eksekusi transaksi yang aman.

#### B. Anak Halaman 2: Laporan Donasi Bulanan
*   **Komponen:** 
    *   Grafik interaktif melingkar (*Doughnut Chart*) dan grafik garis (*Line Chart*) real-time yang menjabarkan persentase alokasi dana yayasan dikelola. Komponen dibangun menggunakan pustaka charting berbasis komponen murni yang ringan seperti Tailwind-ready Chart.js atau lightweight Recharts.
    *   Tabel audit penelusuran dana kas bulanan yang berisikan link unduhan PDF dokumen legal laporan keuangan lengkap yang terbit setiap bulannya.

### 5.7 Halaman Kontak
*   **Komponen:** 
    *   Formulir pengiriman pesan langsung (*Contact Form Web*) ke tim admin yayasan.
    *   Peta digital minimalis yang responsif menggunakan sistem iframe tertanam Google Maps / Leaflet.js yang menunjukkan lokasi tepat kantor pusat operasional utama Peka Peduli Sulawesi.
    *   Tombol pintas WhatsApp terpusat yang mengirim pesan otomatis berisi format pengaduan bencana kemanusiaan.

### 5.8 Halaman Login Portal Relawan & Login Admin Dashboard
*   **Spesifikasi:** 
    *   Halaman login minimalis dengan tema kombinasi warna hitam dominan dengan aksen garis merah tajam di sekeliling kotak login (*Glowing Border*).
    *   Input fields: *Email Address* & *Password*. Serta dilengkapi dengan fitur pengaman *Rate-limiting login* (maksimal 5 kali kegagalan login berturut-turut sebelum akun diblokir sementara selama 15 menit) untuk menangkal serangan brute force eksternal.

---

## 6. Spesifikasi Fungsionalitas Dashboard Admin (CMS Super-CRUD)

Halaman pengelolaan tertutup untuk administrator dengan hak akses otentikasi tinggi. Harus dinamis, cepat, dan dilengkapi fitur penyaringan yang andal.

```
                  ┌────────────────────────────────────────┐
                  │          Dashboard Admin CMS           │
                  └───────────────────┬────────────────────┘
                                      │
               ┌──────────────────────┼───────────────────────┐
               ▼                      ▼                       ▼
     [ Kelola Pengurus ]     [ Kelola Kampanye ]     [ Kelola Donasi ]
     - CRUD Data Tim         - Set Nominal & Status  - Konfirmasi Transaksi
     - Toggle Aktif/Mati     - Upload Cover Image    - Ekspor PDF/CSV
```

### 6.1 Panel Ringkasan Navigasi Dashboard Admin
*   **Metrik Ringkasan Utama:** Total akumulasi penggalangan dana masuk keseluruhan, jumlah donatur unik bulan ini, jumlah pendaftar relawan gres yang butuh verifikasi approval instan, dan performa kampanye aktif.
*   **Opsi Filter Global:** Panel penyaring cepat data visual berdasarkan rentang tanggal kalender kustom atau per-program misi bantuan tertentu.

### 6.2 Manajemen Pengurus (CRUD & Toggle State)
*   **Create:** Modul input pengurus baru lengkap dengan kolom isian informasi kerja dan fitur potong foto otomatis (*crop upload tools*) agar dimensi foto seragam di halaman publik.
*   **Read:** Daftar daftar tim internal dikemas dalam bentuk tabel interaktif, dapat ditarik (*drag-and-drop ordered*) untuk merekayasa susunan kepemimpinan prioritas di lembar "Tentang Kami".
*   **Update:** Edit cepat langsung di baris tabel (*In-line editing*) untuk mengganti posisi pengurus tanpa perlu berpindah dari lembar list utama.
*   **Delete:** Tombol hapus aman dengan verifikasi ketik ulang nama subjek sebagai konfirmasi proteksi kehilangan data secara tidak sengaja.

### 6.3 Kelola Kampanye / Campaign Builder
*   **Formulir Pembuat Kampanye Terpadu:**
    *   Editor teks handal murni berbasis Rich Text, didukung oleh pustaka Tiptap Editor atau Lexical yang sangat lincah untuk menulis riwayat detail dan latar belakang urgensi kebutuhan dana misi.
    *   Fitur penentuan target dana kuantitatif dengan proteksi input string karakter non-numerik.
    *   Pengaturan batas aktif kampanye kalender (*Calendar Date Picker Deadline*).
    *   Pintasan status prioritas: Tombol geser (*Toggle switch*) penentu status `is_urgent` kampanye untuk diarahkan otomatis menjadi visual slider utama di beranda.

### 6.4 Kelola Data Transaksi Donasi Masuk
*   **Log Transaksi:** Data transaksi bersifat *Read-Only* untuk mencegah manipulasi angka donasi masuk secara manual oleh admin, kecuali untuk pengisian donasi manual berbasis verifikasi transfer bank konvensional (*Manual bank confirmation entry*).
*   **Sistem Filter Canggih:** Menyaring transaksi donasi berdasarkan:
    *   Metode Pembayaran (QRIS, VA BNI, VA Mandiri, dll).
    *   Status Transaksi (`PENDING`, `SUCCESS`, `EXPIRED`).
    *   Nama Kampanye Terbatas.
*   **Fitur Ekspor Satu Tombol:**
    *   Pilihan Ekspor `CSV`/`Excel` untuk tim akuntansi mingguan.
    *   Pilihan Cetak Lembar Dokumen `PDF` Rangkuman Kampanye untuk kelengkapan arsip presentasi donatur korporat.

---

## 7. Spesifikasi Portal Relawan (Login Sebagai Relawan)

Sebuah halaman portal aplikasi dinamis (*Dashboard Internal Client*) khusus untuk memfasilitasi kebutuhan relawan resmi yayasan di lapangan.

*   **Pembaruan Status Misi Lapangan:**
    *   *Create Update:* Relawan dapat langsung mengunggah dokumentasi foto dari kamera ponsel pintar mereka yang mengabarkan status penyaluran bantuan langsung dari tempat kejadian bencana di Sulawesi.
    *   *Sistem Geoposisi:* Deteksi titik kordinat garis lintang dan bujur otomatis saat relawan menggunakan GPS ponselnya saat mengirim laporan, memberikan jaminan keaslian data lapangan untuk ditampilkan di web front-end.
*   **Status Verifikasi Akun:** Menampilkan visual lencana digital relawan aktif "Peka Peduli" beserta masa tenggang penampungan bantuan yang dikelolanya.

---

## 8. Integrasi Pihak Ketiga & Payment Gateway Engine

Untuk menunjang kecepatan penerimaan, efisiensi waktu, dan kenyamanan donatur, platform mengintegrasikan sistem Payment Gateway (Midtrans/Xendit) dengan sistem pengelolaan webhook terautomasi.

```
[ Donatur ] ─────► Isi Formulir ─────► Token Request ─────► Snap PopUp / QRIS
                                                                  │
                                                          (Status: SUCCESS)
                                                                  │
                                                                  ▼
[ Yayasan ] ◄─── Update Dashboard ◄─── Webhook Trigger ◄── Midtrans Server
```

### 8.1 Alur Transaksi Pemrosesan Donasi (Integrasi Snap API Midtrans)
1. User mengisi nominal donasi dan identitas pada modul website.
2. Web front-end Next.js berkomunikasi dengan *Serverless API Route* `/api/donations/create`.
3. Serverless endpoint menembakkan data muatan (payload) transaksi ke endpoint Midtrans untuk mendapatkan URL pembayaran dan kunci privasi Snap Token.
4. Di sisi klien, Next.js menangkap Snap Token lalu menginisialisasi dialog popup pembayaran murni Midtrans SNAP SDK di halaman donatur tanpa pengalihan domain browser (*Dynamic payment dynamic flow Overlay*).
5. Donatur menyelesaikan proses pembayaran secara langsung (misal memindai kode unik QRIS via bank digital atau aplikasi dompet elektronik mereka).

### 8.2 Contoh Payload API Transaksi (Kirim Donasi)
Berikut adalah visualisasi muatan data JSON yang akan dialirkan dari fungsionalitas front-end Next.js menuju *endpoint gateway payment*:

```json
{
  "transaction_details": {
    "order_id": "PEKA-DONATION-1123-994821",
    "gross_amount": 250000
  },
  "item_details": [
    {
      "id": "CAMP-8849-PALU",
      "price": 250000,
      "quantity": 1,
      "name": "Donasi Tanggap Darurat Banjir Palu"
    }
  ],
  "customer_details": {
    "first_name": "Sarah",
    "last_name": "Andriana",
    "email": "sarah.andriana@email.com",
    "phone": "+6281234567890"
  },
  "custom_field1": "Semoga semua korban diberikan kekuatan, lekas pulih Sulawesi!"
}
```

### 8.3 Protokol Validasi Keamanan Transaksi (Webhook Endpoint)
Situs web menyediakan *endpoint API Route serverless* mandiri pada jalur `/api/payment-webhook` yang hanya menerima masukan transaksi bersertifikasi otentikasi tinggi dari server utama penyedia pembayaran.

*   Keamanan tambahan dijalankan dengan menyusun logika validasi kecocokan verifikasi kunci SHA-512 Signature Key yang mencocokkan `order_id`, `status_code`, dan `gross_amount` sebelum mengizinkan status donasi di database beralih status dari `PENDING` menuju `SUCCESS`.

---

## 9. Fitur Tambahan Lanjutan (Advanced Features) untuk Ekspansi

Agar sistem web milik Yayasan Peka Peduli Sulawesi melesat jauh di atas situs web yayasan konvensional lainnya, 3 inovasi penting ini ditanamkan dalam blueprint pengerjaan:

### 9.1 Mesin Otomatisasi E-Sertifikat Kemanusiaan Donatur
*   **Alur Kerja Teknis:** Setiap transaksi donatur yang sukses diverifikasi di atas nominal nominal tertentu (misal: Rp 500.000), sistem secara otomatis memicu generator sertifikat nirkabel berbasis framework Canvas / HTML-to-PDF di sisi belakang serverless.
*   **Distribusi:** Sertifikat unik dalam bentuk PDF resolusi tinggi berisikan nama donatur, tanggal transaksi, ID Transaksi, amanah nama kampanye, dan tanda tangan digital Ketua Umum Yayasan Peka Peduli dikirimkan instan ke alamat email donatur sebagai wujud apresiasi paling tinggi.

### 9.2 Integrasi Gateway Notifikasi WhatsApp (Fonnte / Waerone API)
*   **Kegunaan:** Menghemat biaya tim administrasi yang harus mengirim laporan terima kasih satu per satu secara manual.
*   **Cara Bekerja:** Pada detik status transaksi donasi berubah menjadi `SUCCESS`, sistem API melepaskan pemicu notifikasi webhook ke server Fonnte/Waerone, mengirimkan draf isi pesan personalisasi instan secara real-time ke nomor HP donatur (Contoh isi pesan: *"Halo Kak [Nama Donatur], donasi Rp[Nominal] untuk program [Nama Kampanye] telah kami terima dengan hangat. Teriring doa terbaik bagi Kakak sekeluarga. Tim Peka Peduli Sulawesi."*).

### 9.3 Widget Pembaruan Langsung Aliran Donasi (Live Dynamic Ticker)
*   Sebuah komponen visual teks berputar halus (*smooth scrolling horizontal ticker*) diletakkan di footer situs web yang menampilkan daftar transaksi terkonfirmasi secara real-time demi memicu sensasi keaktifan platform dan interaktivitas bagi calon donatur lainnya yang sedang bertamu ke situs web.

---

## 10. Metrik Non-Fungsional, Kinerja, & Keamanan (PRO Checklist)

### 10.1 Sasaran Kinerja & Metrik Inti Web (Core Web Vitals)
*   **Largest Contentful Paint (LCP):** Di bawah 1.5 detik (aset spanduk beranda menggunakan format modern WebP/AVIF dengan optimasi kompresi otomatis platform Vercel Image Dynamic Optimization).
*   **Cumulative Layout Shift (CLS):** Bernilai mutlak di bawah **0.1**. Layout berpola Bento Grid harus dirancang kaku dengan ruang tinggi statis yang dialokasikan sebelum pemuatan data gambar terjadi secara dinamis.
*   **First Input Delay (FID):** Lebih rendah dari 100 milidetik, didukung oleh minimnya muatan skrip JS pihak ketiga eksternal yang merusak alur eksekusi baris utama CPU klien (*Main Thread blocking*).

### 10.2 Keamanan & Penanganan Ancaman Siber
*   **Proteksi Sandbox API:** Semua formulir masukan wajib diproteksi dari ancaman penyuntikan logika SQL (*SQL Injection Protection*) dengan memanfaatkan fungsi penulisan parameterized query PostgreSQL bawaan ORM/Supabase.
*   **Kebijakan Keamanan Konten (Content Security Policy - CSP):** Penyusunan aturan pembatasan akses eksekusi script asing dari domain luar. Hanya mengizinkan koneksi skrip verifikasi resmi dari domain Google Fonts, Supabase DB API, dan SDK Midtrans terbitan resmi.

---

## 11. Rencana Pengujian (User Acceptance Testing / UAT Matrix)

Guna memastikan rilis produk bebas kutu (*bug-free*) sebelum diluncurkan sepenuhnya ke domain utama, tim QA internal wajib melakukan pengawalan fungsi berdasarkan skenario uji khusus ini:

| ID Skenario | Area Modul | Langkah Pengujian | Hasil Yang Diharapkan | Status |
| :--- | :--- | :--- | :--- | :--- |
| **UAT-001** | Preloader Sistem | Melakukan pembersihan data cache browser dan memuat halaman beranda berulang kali. | Preloader SVG berdetak aktif menyembunyikan retakan tata letak mentah lalu memudar halus sesudah konten siap. | [ ] |
| **UAT-002** | Form Kirim Donasi | Mengisi data nominal di bawah batas minimum (diizinkan mengalirkan minimal Rp 10.000), sengaja mengosongkan format email, lalu menekan tombol beli. | Tombol kirim tidak aktif. Pesan eror validasi visual merah menyala di samping kolom email yang salah format. | [ ] |
| **UAT-003** | Pembayaran Cepat QRIS | Memilih nominal donasi tertentu, memilih tipe QRIS, memotong alur pemindaian, lalu membatalkan pembayaran secara acak. | Sistem merekam status awal berupa `PENDING`, mencatatkan masa kedaluwarsa 15 menit, lalu sukses mengubah status kampanye menjadi `EXPIRED` sesudah tenggat waktu habis tanpa crash basis data. | [ ] |
| **UAT-004** | Keamanan Data Relawan | Menguji pengunggahan dokumen KTP berukuran raksasa di atas 10MB dengan format bukan gambar/PDF (contoh: `.exe` / `.zip`). | Pengunggah berkas mendeteksi kesalahan ukuran file dan menolak proses pengiriman ke server demi menjaga keamanan cloud bucket. | [ ] |
| **UAT-005** | CRUD Campaign CMS | Membuat draf kampanye donasi baru sebagai admin utama, lalu menekan tombol aktif (*Toggle Active*) sebagai tipe darurat bencana. | Kampanye langsung terbit di halaman beranda dalam slider teratas secara instan tanpa perlu merefresh server Next.js manual. | [ ] |



Berikut adalah fitur-fitur tambahan kelas PRO yang dikelompokkan berdasarkan pilar fungsionalitasnya:

1. Fitur Kredibilitas & Transparansi Publik (Trust Booster)
Tingkat kepercayaan donatur adalah kunci utama dari konversi donasi online.

Penyematan Laporan Kantor Akuntan Publik (KAP):
Fungsi: Menyediakan satu halaman khusus untuk menerbitkan opini laporan keuangan yang telah diaudit oleh KAP independen (dengan status perolehan opini "WTP" - Wajar Tanpa Pengecualian) yang dapat diunduh bebas oleh publik dalam bentuk PDF terverifikasi.
Kalkulator Zakat & Fidyah Mandiri:
Fungsi: Widget interaktif berbasis pop-up atau halaman khusus yang memudahkan donatur menghitung kewajiban zakat maal, zakat pendapatan, atau utang fidyah mereka secara otomatis, lalu mengarahkannya langsung ke tombol donasi dengan nominal yang pas hasil kalkulasi tersebut.
Sertifikat Potong Pajak (Kwitansi Fiskal):
Fungsi: Di Indonesia, sumbangan ke yayasan tertentu yang telah resmi terdaftar di Dirjen Pajak dapat digunakan sebagai pengurang penghasilan kena pajak. Tambahkan opsi cetak Kwitansi Resmi Format Pajak (e-Kwitansi) yang langsung ditandatangani secara digital oleh pihak yayasan.
2. Fitur Keberlanjutan Dana (Recurring Donation/Subscription)
Mencari donatur baru itu sulit. Menjaga donatur lama untuk terus berdonasi jauh lebih murah dan efisien.

Fitur Donasi Rutin (Autodebet / Recurring Donation):
Fungsi: Donatur dapat memilih opsi "Donasi Rutin Setiap Bulan" (misal: Rp50.000/bulan) untuk program jangka panjang seperti "Orang Tua Asuh Anak Pedalaman Sulawesi".
Teknis: Menggunakan fitur Subscription API dari Midtrans atau Xendit yang otomatis mendebet saldo dompet digital (GoPay/ShopeePay) atau kartu debit donatur setiap bulan pada tanggal yang sama.
3. Optimasi Akses Lapangan & Kondisi Darurat (Field Optimization)
Sulawesi memiliki banyak area pelosok yang sering mengalami kendala sinyal internet (apalagi saat terjadi bencana alam).

Offline First & Dukungan PWA (Progressive Web App):
Fungsi: Mengubah website menjadi aplikasi mobile-friendly yang bisa di-install langsung ke homescreen ponsel relawan (Add to Home Screen).
Fungsi Lapangan: Relawan dapat menulis laporan aksi lapangan dan mengunggah foto saat berada di area bencana tanpa sinyal internet. Data laporan tersebut akan masuk ke antrean lokal browser (IndexedDB) dan otomatis terunggah ke database begitu ponsel relawan mendeteksi sinyal internet kembali (menggunakan Service Worker Sync).
Peta Hotspot Tanggap Darurat (Emergency Map Marker):
Fungsi: Peta Sulawesi interaktif (Leaflet/Mapbox) yang memperlihatkan titik-titik posko bantuan Peka Peduli, area terdampak bencana terbaru, dan jenis bantuan apa saja yang paling mendesak di setiap lokasi tertentu.
4. Mesin Pemasaran & SEO Viral (Viral & Marketing Engine)
Memastikan program kampanye yayasan mudah dibagikan dan memiliki jangkauan organik yang luas.

Generator Gambar Pratinjau Dinamis (@vercel/og):
Fungsi: Saat link donasi dibagikan ke WhatsApp atau Facebook, preview link tidak melulu memunculkan logo yayasan biasa. Sistem Next.js secara otomatis menghasilkan gambar grafik kustom secara instan (on-the-fly) yang menampilkan: foto kampanye, judul kampanye, progress persentase donasi hari ini, dan tombol "Ayo Bantu!".
Fitur "Patungan" (Peer-to-Peer Fundraising / Teman Peduli):
Fungsi: Mengizinkan publik/pengguna umum untuk membuat sub-kampanye donasi atas nama mereka untuk dialirkan ke program utama yayasan. Contoh: "Sarah menggalang dana kado ulang tahunnya sebesar 5 juta rupiah untuk program Renovasi Sekolah Palu".
5. Fitur Manajemen Donatur (Donor Portal)
Meskipun donatur bebas mendonasikan uangnya sebagai "Hamba Allah", memberikan ruang personalisasi meningkatkan kedekatan emosional mereka dengan yayasan.

Portal Akun Donatur Pribadi (Donor Space):
Fungsi: Donatur dapat melakukan login mandiri (via Google Sign-In) untuk:
Melihat riwayat donasi kumulatif mereka (Misal: "Kamu sudah berdonasi total Rp2.300.000 selama 1 tahun ini").
Mengunduh e-sertifikat dari setiap campaign yang pernah mereka bantu.
Menentukan preferensi kabar kabar terbaru (Apakah ingin mendapatkan laporan penyaluran bulanan via WhatsApp atau e-mail saja).
6. Contoh Penyusunan Integrasi Lanjutan pada Arsitektur PRD
Jika fitur di atas disetujui, berikut adalah perluasan arsitektur sistem pada bagian Next.js dan Vercel untuk diintegrasikan ke dalam dokumen teknis dev-ops Anda:

                            ┌────────────────────────────────────┐
                            │    Vercel Edge Functions           │
                            │    (Generates Dynamic OG Images)   │
                            └────────────────┬───────────────────┘
                                             │ (Social Meta Tags)
                                             ▼
┌──────────────────┐        ┌────────────────────────────────────┐        ┌──────────────────┐
│  Fonnte/Waerone  │◄───────┤        POST /api/webhooks          │───────►│  Vercel Blob /   │
│   (WA Engine)    │        │       (Payment / Campaign Info)    │        │  Supabase Bucket │
└──────────────────┘        └────────────────────────────────────┘        └────────┬─────────┘
                                                                                   │
                                                                                   ▼
                                                                          [ Auto PDF Receipts ]
Dengan mengimplementasikannya, yayasan "Peka Peduli Sulawesi" tidak hanya akan menjadi yayasan dengan website profil yang statis, melainkan sebuah Fintech Sosial modern yang kokoh (proven), aman, transparan, dan mampu bergerak lincah di lapangan.