import jsPDF from "jspdf";

export function generateCoursePDF(courseTitle: string, modules: any[]) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  doc.setFont("Times", "Normal");
  doc.setFontSize(18);

  doc.text(courseTitle, 40, 50);

  doc.setFontSize(12);

  let y = 90;

  modules.forEach((mod: any, i: number) => {
    doc.setFont("Times", "Bold");
    doc.text(`Module ${i + 1}: ${mod.title}`, 40, y);

    y += 24;

    doc.setFont("Times", "Normal");
    doc.text(`Thesis: ${mod.thesis}`, 40, y, { maxWidth: 520 });
    y += 60;

    doc.text(`Antithesis: ${mod.antithesis}`, 40, y, { maxWidth: 520 });
    y += 60;

    doc.text(`Synthesis: ${mod.synthesis}`, 40, y, { maxWidth: 520 });
    y += 60;

    doc.text(`Quiz:`, 40, y);
    y += 20;

    mod.quiz.forEach((q: string) => {
      doc.text(`• ${q}`, 60, y);
      y += 20;
    });

    y += 30;

    if (y > 750) {
      doc.addPage();
      y = 50;
    }
  });

  doc.text("Katoki Institute for Ubuntu Leadership (KIUL)", 40, 820);

  return doc;
}
