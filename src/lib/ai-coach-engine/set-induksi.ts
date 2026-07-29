import type { AiCoachModuleGenerator } from "./types";

export const generateSetInduksi: AiCoachModuleGenerator = ({ courseCode, courseName }) => {
  return {
    moduleId: "set-induksi",
    summary: `Set induksi 5 minit untuk menarik perhatian pelajar pada permulaan sesi ${courseName} (${courseCode}).`,
    sections: [
      {
        heading: "Soalan Pencetus",
        items: [
          `Jika anda diberi RM1,000 hari ini, bagaimana anda akan menguruskannya mengikut prinsip ${courseName}?`,
          "Adakah anda pernah membuat belanjawan peribadi? Apakah cabaran yang anda hadapi?",
        ],
      },
      {
        heading: "Aktiviti Pembuka",
        items: [
          "Tayangkan carta pai perbelanjaan bulanan keluarga Malaysia secara purata.",
          "Minta pelajar meramal peratusan perbelanjaan mengikut kategori sebelum carta sebenar didedahkan.",
          "Bincangkan secara ringkas perbezaan antara jangkaan dan data sebenar.",
        ],
      },
      {
        heading: "Kaitan dengan Objektif Pembelajaran",
        items: [
          `Sambungkan aktiviti kepada hasil pembelajaran ${courseCode}: memahami asas pengurusan kewangan peribadi.`,
          "Nyatakan hasil yang dijangka pada akhir sesi supaya pelajar faham matlamat pembelajaran.",
        ],
      },
    ],
  };
};
