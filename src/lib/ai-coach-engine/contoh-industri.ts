import type { AiCoachModuleGenerator } from "./types";

export const generateContohIndustri: AiCoachModuleGenerator = ({ courseCode, courseName }) => {
  return {
    moduleId: "contoh-industri",
    summary: `Kaitan konsep ${courseName} (${courseCode}) dengan senario sebenar dalam industri kewangan Malaysia.`,
    sections: [
      {
        heading: "Kes Industri 1",
        items: [
          "Bank Negara Malaysia menetapkan kadar dasar semalaman (OPR) yang mempengaruhi kadar faedah pinjaman peribadi.",
        ],
      },
      {
        heading: "Kes Industri 2",
        items: [
          "Syarikat fintech tempatan menggunakan aplikasi mikro-simpanan untuk menggalakkan tabiat menabung dalam kalangan belia.",
        ],
      },
      {
        heading: "Cadangan Lawatan atau Jemputan",
        items: [
          "Jemput pegawai bank tempatan untuk sesi ceramah mengenai literasi kewangan.",
          "Rancang lawatan maya ke platform pelaburan mikro untuk pendedahan praktikal.",
        ],
      },
    ],
  };
};
