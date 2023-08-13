import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
function Test() {
  const generatePDF = () => {
    const input = document.getElementById("content-to-pdf"); // แทนด้วย ID ของเนื้อหาที่คุณต้องการสร้าง PDF
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("generated-pdf.pdf");
    });
  };
  return (
    <div>
      {/* เนื้อหาที่คุณต้องการสร้าง PDF */}
      <div id="content-to-pdf">
        <h1>สวัสดี</h1>
        <p>This is the content you want in your PDF.</p>
      </div>

      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
}

export default Test;
