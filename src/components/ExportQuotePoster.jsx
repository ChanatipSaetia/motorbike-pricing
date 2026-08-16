import React, { forwardRef } from 'react';
import {
  Box,
  Paper,
  Stack,
  Typography,
  Chip,
  Grid,
} from '@mui/material';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';

/**
 * Dedicated High-Resolution Off-Screen Quote Poster Component (800px)
 * Handles both Customer Mode and Finance Mode PNG Exports smoothly without dialog clipping.
 */
const ExportQuotePoster = forwardRef(({
  quoteExportMode,
  bikeName,
  price,
  down,
  financing,
  month,
  interest,
  eachMonth,
  typeCode,
  financeCode,
  color,
  name,
  number,
  province,
  amphure,
  tambon,
  bgImageUrl,
}, ref) => {
  return (
    <Box sx={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
      <Paper
        ref={ref}
        elevation={0}
        sx={{
          width: 800,
          p: 4,
          bgcolor: '#ffffff',
          borderRadius: '3px',
          border: '4px solid var(--color-dark)',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Sarabun, sans-serif',
        }}
      >
        {/* Background Overlay Image */}
        {bgImageUrl && (
          <Box
            component="img"
            src={bgImageUrl}
            crossOrigin="anonymous"
            onError={(e) => { e.target.style.display = 'none'; }}
            alt="Yamaha Background Overlay"
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '60%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.14,
              pointerEvents: 'none',
              zIndex: 0,
              filter: 'grayscale(20%) contrast(110%)',
            }}
          />
        )}

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {/* Header Banner - Full Width 100% Span */}
          <Box
            sx={{
              width: '100%',
              pb: 2,
              mb: 3,
              borderBottom: '4px solid var(--color-dark)',
            }}
          >
            <Typography variant="h4" fontWeight={900} sx={{ color: 'var(--color-dark)', width: '100%' }}>
              {quoteExportMode === 'customer' ? `ใบเสนอราคา: ${bikeName}` : `ใบเสนอราคาสำหรับไฟแนนซ์: ${bikeName}`}
            </Typography>
            <Typography variant="body1" color="text.secondary" fontWeight={700} sx={{ mt: 0.5 }}>
              วันที่สร้าง: {new Date().toLocaleDateString('th-TH')}
            </Typography>
          </Box>

          {/* Details Body Grid */}
          <Grid container spacing={3} sx={{ my: 1 }}>
            {quoteExportMode === 'finance' ? (
              <>
                <Grid item xs={6}>
                  <Typography variant="body1" color="text.secondary" fontWeight={700}>ราคารถ:</Typography>
                  <Typography variant="h4" fontWeight={800} sx={{ color: 'var(--color-dark)' }}>฿{price.toLocaleString("en-US")}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" color="text.secondary" fontWeight={700}>เงินดาวน์:</Typography>
                  <Typography variant="h4" fontWeight={900} sx={{ color: 'var(--color-primary)' }}>฿{down.toLocaleString("en-US")}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" color="text.secondary" fontWeight={700}>ยอดจัด:</Typography>
                  <Typography variant="h4" fontWeight={800} sx={{ color: 'var(--color-dark)' }}>฿{financing.toLocaleString("en-US")}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" color="text.secondary" fontWeight={700}>จำนวนผ่อน:</Typography>
                  <Typography variant="h4" fontWeight={800} sx={{ color: 'var(--color-dark)' }}>{month} เดือน (ดอกเบี้ย {interest}%)</Typography>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={6}>
                  <Typography variant="body1" color="text.secondary" fontWeight={700}>เงินดาวน์:</Typography>
                  <Typography variant="h4" fontWeight={900} sx={{ color: 'var(--color-primary)' }}>฿{down.toLocaleString("en-US")}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" color="text.secondary" fontWeight={700}>จำนวนผ่อน:</Typography>
                  <Typography variant="h4" fontWeight={800} sx={{ color: 'var(--color-dark)' }}>{month} เดือน</Typography>
                </Grid>
              </>
            )}

            {/* Monthly Payment Hero Box */}
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  bgcolor: 'var(--color-dark)',
                  color: '#ffffff',
                  borderRadius: 3.5,
                  textAlign: 'center',
                  boxShadow: '0 8px 20px rgba(31, 111, 95, 0.3)',
                }}
              >
                <Typography variant="h6" fontWeight={700} sx={{ color: 'var(--color-accent)' }}>
                  ผ่อนชำระต่อเดือน:
                </Typography>
                <Typography variant="h2" fontWeight={900} sx={{ letterSpacing: -1, my: 0.5 }}>
                  ฿{eachMonth.toLocaleString("en-US")}
                </Typography>
              </Paper>
            </Grid>

            {/* Finance Specific Fields */}
            {quoteExportMode === 'finance' && (
              <>
                <Grid item xs={6}>
                  <Typography variant="body1" color="text.secondary" fontWeight={700}>รหัสรุ่น (Type Code):</Typography>
                  <Typography variant="h5" fontWeight={800} color="var(--color-dark)">{typeCode || '-'}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" color="text.secondary" fontWeight={700}>รหัส Finance:</Typography>
                  <Typography variant="h5" fontWeight={800} color="var(--color-dark)">{financeCode || '-'}</Typography>
                </Grid>
              </>
            )}

            <Grid item xs={quoteExportMode === 'finance' ? 4 : 12}>
              <Typography variant="body1" color="text.secondary" fontWeight={700}>สีรถ:</Typography>
              <Typography variant="h5" fontWeight={800} color="var(--color-dark)">{color || '-'}</Typography>
            </Grid>

            {/* Customer Details in Finance Mode */}
            {quoteExportMode === 'finance' && (
              <>
                <Grid item xs={4}>
                  <Typography variant="body1" color="text.secondary" fontWeight={700}>ชื่อลูกค้า:</Typography>
                  <Typography variant="h5" fontWeight={800} color="var(--color-dark)">{name || '-'}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" color="text.secondary" fontWeight={700}>เบอร์โทร:</Typography>
                  <Typography variant="h5" fontWeight={800} color="var(--color-dark)">{number || '-'}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" color="text.secondary" fontWeight={700}>ที่อยู่ / พื้นที่:</Typography>
                  <Typography variant="h6" fontWeight={800} color="var(--color-dark)">
                    {[province, amphure, tambon].filter(Boolean).join(' > ') || '-'}
                  </Typography>
                </Grid>
              </>
            )}

            {/* Official Dealership Footer - High Contrast Light Box */}
            <Grid item xs={12} sx={{ mt: 2, pt: 2, borderTop: '3px dashed var(--color-border)' }}>
              <Paper elevation={0} sx={{ p: 2.5, bgcolor: 'var(--color-accent-light)', color: 'var(--color-dark)', borderRadius: 3, border: '2px solid var(--color-border)' }}>
                <Typography variant="h6" fontWeight={900} sx={{ color: 'var(--color-dark)' }}>
                  🏢 สอบถามข้อมูลเพิ่มเติม: เตียหมงไถ่ ตราด
                </Typography>
                <Typography variant="body1" fontWeight={800} sx={{ color: 'var(--color-dark)', mt: 0.5 }}>
                  📞 โทร: <span style={{ color: 'var(--color-dark)', fontWeight: 900, fontSize: '1.2rem' }}>039-512712</span> | 📲 FB Page: <span style={{ color: 'var(--color-primary)', fontWeight: 900 }}>ยามาฮ่าเตียหมงไถ่ ตราด</span>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
});

ExportQuotePoster.displayName = 'ExportQuotePoster';

export default ExportQuotePoster;
