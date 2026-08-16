/**
 * Formats motorcycle loan details into a formatted text string for clipboard copy.
 */
export const buildQuotationText = ({
  bikeName,
  price,
  down,
  calculations,
  month,
  interest,
  name,
  number,
  province,
  amphure,
  tambon,
  typeCode,
  financeCode,
}) => {
  return `🏍️ **ใบเสนอราคาตารางผ่อน: ${bikeName || 'Yamaha'}**
----------------------------
💰 ราคารถ: ${price.toLocaleString("en-US")} บาท
💵 เงินดาวน์: ${down.toLocaleString("en-US")} บาท
📊 ยอดจัด: ${calculations.financing.toLocaleString("en-US")} บาท
⏱️ ผ่อนชำระ: ${month} เดือน (ดอกเบี้ย ${interest}%)
🔥 ค่างวดต่อเดือน: **${calculations.eachMonth.toLocaleString("en-US")}** บาท/เดือน
----------------------------
👤 ชื่อลูกค้า: ${name || '-'}
📞 เบอร์โทร: ${number || '-'}
📍 ที่อยู่: ${province} ${amphure} ${tambon}
🏍️ รหัสรุ่น: ${typeCode || '-'} (Finance: ${financeCode || '-'})
----------------------------
🏢 สอบถามเพิ่มเติม: เตียหมงไถ่ ตราด
📞 Tel: 039-512712 | 📲 FB: ยามาฮ่าเตียหมงไถ่ ตราด`;
};
