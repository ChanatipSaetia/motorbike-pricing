import React, { forwardRef } from 'react';
import {
  Box,
  Paper,
  Stack,
  Typography,
  Chip,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
} from '@mui/material';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';

/**
 * Dedicated High-Resolution Yamaha Export Poster Component (1200px)
 * General Installment Table Poster for Customers (No personal name/number included).
 */
const ExportTablePoster = forwardRef(({
  bikeName,
  price,
  matrixRows,
  monthOptions,
  defaultInterestRates,
  bgImageUrl,
}, ref) => {
  return (
    <Box sx={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
      <Paper
        ref={ref}
        elevation={0}
        sx={{
          width: 1200,
          p: 4,
          bgcolor: '#ffffff',
          borderRadius: '3px',
          border: '4px solid var(--color-dark)',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Sarabun, sans-serif',
        }}
      >
        {/* Background Yamaha Motorcycle Overlay Image with crossOrigin */}
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
              width: '55%',
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
          {/* Header Banner - Full Width 100% */}
          <Box
            sx={{
              width: '100%',
              pb: 2,
              mb: 3,
              borderBottom: '4px solid var(--color-dark)',
            }}
          >
            <Typography variant="h3" fontWeight={900} sx={{ color: 'var(--color-dark)', width: '100%' }}>
              ตารางผ่อน {bikeName || 'Yamaha Motorbike'}
            </Typography>
            <Typography variant="h5" color="text.secondary" fontWeight={700} sx={{ mt: 0.5 }}>
              วันที่สร้าง: {new Date().toLocaleDateString('th-TH')}
            </Typography>
          </Box>

          {/* Full-Width Uncropped Yamaha Table Matrix */}
          <TableContainer sx={{ borderRadius: '3px', border: '3px solid var(--color-dark)', mb: 3, bgcolor: '#ffffff' }}>
            <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
              <TableHead>
                <TableRow sx={{ bgcolor: 'var(--color-dark)' }}>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 900, fontSize: '1.35rem', py: 2.5, width: '16%' }}>
                    เงินดาวน์
                  </TableCell>
                  {monthOptions.map((m) => (
                    <TableCell
                      key={m}
                      align="center"
                      sx={{ color: '#ffffff', fontWeight: 900, fontSize: '1.25rem', py: 2.5 }}
                    >
                      {m} งวด
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {matrixRows.map((row, idx) => (
                  <TableRow key={row.downAmount} sx={{ bgcolor: idx % 2 === 0 ? '#ffffff' : 'var(--color-accent-light)' }}>
                    <TableCell sx={{ fontWeight: 900, fontSize: '1.3rem', bgcolor: 'var(--color-accent-light)', borderRight: '2px solid var(--color-border)', color: 'var(--color-dark)' }}>
                      ฿{row.downAmount.toLocaleString()}
                      <Typography variant="caption" display="block" color="var(--color-primary)" fontWeight={900} sx={{ fontSize: '0.95rem' }}>
                        ({row.downPct}%)
                      </Typography>
                    </TableCell>

                    {monthOptions.map((m) => {
                      const cellData = row.monthsData[m];
                      return (
                        <TableCell
                          key={m}
                          align="center"
                          sx={{
                            fontWeight: 900,
                            fontSize: '1.35rem',
                            color: 'var(--color-dark)',
                            border: '1px solid var(--color-border)',
                          }}
                        >
                          ฿{cellData.eachMonth.toLocaleString()}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Footer Contact Details - Official Dealership Info */}
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              bgcolor: 'var(--color-accent-light)',
              color: 'var(--color-dark)',
              borderRadius: '3px',
              border: '3px solid var(--color-border)',
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <Typography variant="h6" fontWeight={900} sx={{ color: 'var(--color-dark)' }}>
                  🏢 สอบถามข้อมูลเพิ่มเติม: เตียหมงไถ่ ตราด
                </Typography>
                <Typography variant="body1" fontWeight={800} sx={{ color: 'var(--color-dark)', mt: 0.5 }}>
                  📞 โทร: <span style={{ color: 'var(--color-dark)', fontWeight: 900, fontSize: '1.2rem' }}>039-512712</span> | 📲 Facebook Page: <span style={{ color: 'var(--color-primary)', fontWeight: 900 }}>ยามาฮ่าเตียหมงไถ่ ตราด</span>
                </Typography>
                <Typography variant="body2" fontWeight={700} sx={{ color: 'var(--color-text-secondary)', mt: 0.5 }}>
                  📍 93-99 ถ.ราษฎร์อนุสรณ์ ต.บางพระ อ.เมืองตราด จ.ตราด (สี่แยกไฟแดงศาลเจ้าพ่อหลักเมืองตราด)
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: 'right' }}>
                <Typography variant="caption" display="block" sx={{ color: 'var(--color-text-secondary)', fontWeight: 700 }}>
                  * ตารางค่างวดเป็นการประมาณการเบื้องต้น
                </Typography>
                <Typography variant="h6" fontWeight={900} sx={{ color: 'var(--color-dark)' }}>
                  เตียหมงไถ่ ตราด
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Paper>
    </Box>
  );
});

ExportTablePoster.displayName = 'ExportTablePoster';

export default ExportTablePoster;
