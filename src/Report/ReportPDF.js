import React from 'react';
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  content: {
    flexGrow: 1,
  },
  rightText: {
    fontSize: 16,
    textAlign: 'right',
  },
  leftText: {
    fontSize: 16,
    textAlign: 'left',
  },
  dottedLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderBottomStyle: 'dotted',
  },
});

const ReportPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={[styles.content, styles.rightText]}>
        รหัสประจำตัวผู้สมัคร :
      </Text>
      <Text style={[styles.content, styles.leftText, styles.dottedLine]}>
        {' '.repeat(100)} {/* จำนวนช่องว่างเท่ากับจำนวนจุด */}
      </Text>
    </Page>
  </Document>
);

export default ReportPDF;