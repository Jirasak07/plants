import React from 'react'
import { PDFViewer } from '@react-pdf/renderer';
import MyPDF from './PDF';

function Test() {
  return (
    <PDFViewer>
    <MyPDF/>
  </PDFViewer>
  )
}

export default Test

