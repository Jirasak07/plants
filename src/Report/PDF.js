import React, { useRef } from 'react';
import { PDFDownloadLink, Page, Text, View, Document } from '@react-pdf/renderer';
import { jsPDF } from 'jspdf';
import { useReactToPrint } from 'react-to-print';

const MyPDF = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div ref={componentRef}>
        lf,vlf,vlf,vl,
        <h1>Hello PDF!</h1>
      </div>
      <button onClick={handlePrint}>Print PDF</button>
    </div>
  );
};

export default MyPDF;