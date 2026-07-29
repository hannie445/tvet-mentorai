import type { AiCoachModuleGenerator } from "./types";

export const generateAktivitiPdp: AiCoachModuleGenerator = ({ courseCode, courseName }) => {
  return {
    moduleId: "aktiviti-pdp",
    summary: `Tiga aktiviti pengajaran & pembelajaran aktif yang sesuai untuk sesi ${courseName} (${courseCode}).`,
    sections: [
      {
        heading: "Aktiviti 1 — Simulasi Belanjawan",
        items: [
          "Bahagikan pelajar kepada kumpulan 4-5 orang.",
          "Setiap kumpulan diberi 'gaji bulanan' rekaan dan senarai perbelanjaan wajib.",
          "Kumpulan membentangkan belanjawan mereka dalam masa 3 minit.",
        ],
      },
      {
        heading: "Aktiviti 2 — Perbincangan Kajian Kes",
        items: [
          "Edarkan kajian kes ringkas tentang seseorang yang menghadapi hutang kad kredit.",
          "Pelajar berbincang secara berpasangan mengenai punca dan cadangan penyelesaian.",
        ],
      },
      {
        heading: "Aktiviti 3 — Kuiz Interaktif",
        items: [
          "Gunakan kuiz cepat 5 soalan untuk menilai kefahaman konsep asas.",
          "Bincangkan jawapan salah yang paling popular secara kelas untuk pengukuhan.",
        ],
      },
    ],
  };
};
