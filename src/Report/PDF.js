import React, { useEffect } from "react";
import {  Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
// Font.register({
//   family: 'Noto Sans Thai',
//   src: 'https://fonts.gstatic.com/s/notosansthai/v5/TfV5Mu3SuvH0Ep1cW50U.ttf'
// });
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    fontFamily: 'Noto Sans Thai'
  }
});

function PDF() {
  return (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>สวัสดี, นี่คือเอกสาร PDF ที่ใช้แบบอักษร Noto Sans Thai!</Text>
      </View>
    </Page>
  </Document>
  );
}

export default PDF;
