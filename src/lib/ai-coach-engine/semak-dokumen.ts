import type { AiCoachModuleGenerator } from "./types";

export const generateSemakanDokumen: AiCoachModuleGenerator = ({ courseCode, courseName }) => {
  return {
    moduleId: "semak-dokumen",
    summary: `Semakan pantas kesediaan dokumen pengajaran untuk ${courseName} (${courseCode}).`,
    sections: [
      {
        heading: "Kelengkapan Dokumen",
        items: [
          "Lengkap: Objektif pembelajaran dinyatakan dengan jelas.",
          "Lengkap: Hasil pembelajaran selari dengan DPSK.",
          "Perlu tindakan: Rubrik penilaian belum dilampirkan — cadang tambah sebelum sesi PdP.",
        ],
      },
      {
        heading: "Kualiti Kandungan",
        items: [
          "Struktur kandungan mengikut urutan logik daripada asas kepada aplikasi.",
          "Cadangan: tambah lebih banyak contoh berangka untuk mengukuhkan konsep.",
        ],
      },
      {
        heading: "Cadangan Penambahbaikan",
        items: [
          "Sertakan glosari istilah kewangan pada muka surat pertama.",
          "Tambah rujukan sumber terkini untuk kekal relevan dengan industri.",
        ],
      },
    ],
  };
};
