import React from 'react';
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Chip,
  Paper,
  Button,
} from '@mui/material';
import {
  ReceiptLong as ReceiptLongIcon,
  Save as SaveIcon,
  ContentCopy as ContentCopyIcon,
  Smartphone as SmartphoneIcon,
} from '@mui/icons-material';

export default function SingleCalculatorResult({
  bikeName,
  price,
  down,
  calculations,
  month,
  interest,
  onOpenDialog,
  onCopyText,
  onOpenMobileImageModal,
  isXL,
}) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#ffffff',
        borderColor: 'var(--color-primary)',
        borderWidth: '3px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CardContent sx={{ p: isXL ? { xs: 2.5, sm: 3.5 } : { xs: 1.5, sm: 2 } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: isXL ? 2 : 1.25 }}>
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <ReceiptLongIcon color="primary" sx={{ fontSize: isXL ? 38 : 24 }} />
            <Typography variant={isXL ? "h5" : "subtitle1"} sx={{ fontWeight: 800, color: 'var(--color-dark)' }}>
              ตารางค่างวดสรุป
            </Typography>
          </Stack>
          <Chip label={bikeName} color="primary" variant="filled" sx={{ fontWeight: 800, fontSize: isXL ? '1rem' : '0.8rem', bgcolor: 'var(--color-dark)', color: '#ffffff' }} />
        </Stack>

        {/* Monthly Payment Hero Banner */}
        <Paper
          elevation={0}
          sx={{
            p: isXL ? { xs: 2.5, sm: 3 } : 1.5,
            mb: isXL ? 3 : 1.5,
            borderRadius: isXL ? 4 : 2.5,
            background: 'linear-gradient(135deg, var(--color-dark) 0%, var(--color-primary) 100%)',
            color: '#ffffff',
            textAlign: 'center',
            boxShadow: '0 8px 20px rgba(17, 138, 178, 0.3)',
          }}
        >
          <Typography variant={isXL ? "h5" : "caption"} sx={{ fontWeight: 700, color: 'var(--color-accent)', mb: 0.25 }}>
            ผ่อนชำระเดือนละ
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: isXL ? { xs: '3.2rem', sm: '4rem' } : { xs: '2rem', sm: '2.4rem' },
              color: '#ffffff',
              letterSpacing: -1,
              my: 0.25,
            }}
          >
            ฿{calculations.eachMonth.toLocaleString("en-US")}
          </Typography>
          <Typography variant={isXL ? "h6" : "caption"} sx={{ color: 'var(--color-accent-light)', fontWeight: 700 }}>
            ({month} งวด / ดอกเบี้ย {interest}% ต่อเดือน)
          </Typography>
        </Paper>

        {/* Detailed Breakdown */}
        <Stack spacing={isXL ? 2 : 1} sx={{ mb: isXL ? 3 : 1.5 }}>
          <Paper elevation={0} sx={{ p: isXL ? 2 : 1, bgcolor: 'var(--color-accent-light)', borderRadius: 2, border: '1px solid var(--color-border)' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant={isXL ? "h6" : "body2"} color="var(--color-dark)" fontWeight={600}>ราคารถรวม:</Typography>
              <Typography variant={isXL ? "h5" : "subtitle1"} fontWeight={700} color="var(--color-dark)">฿{price.toLocaleString("en-US")}</Typography>
            </Stack>
          </Paper>

          <Paper elevation={0} sx={{ p: isXL ? 2 : 1, bgcolor: '#ffffff', borderRadius: 2, border: '1px solid var(--color-border)' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant={isXL ? "h6" : "body2"} color="var(--color-primary)" fontWeight={700}>หักเงินดาวน์:</Typography>
              <Typography variant={isXL ? "h5" : "subtitle1"} fontWeight={800} color="var(--color-primary)">-฿{down.toLocaleString("en-US")}</Typography>
            </Stack>
          </Paper>

          <Paper elevation={0} sx={{ p: isXL ? 2 : 1, bgcolor: 'var(--color-accent-light)', borderRadius: 2, border: '1px solid var(--color-border)' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant={isXL ? "h6" : "body2"} color="var(--color-dark)" fontWeight={700}>ยอดจัดไฟแนนซ์:</Typography>
              <Typography variant={isXL ? "h5" : "subtitle1"} fontWeight={800} color="var(--color-dark)">฿{calculations.financing.toLocaleString("en-US")}</Typography>
            </Stack>
          </Paper>

          <Paper elevation={0} sx={{ p: isXL ? 2 : 1, bgcolor: '#ffffff', borderRadius: 2, border: '1px solid var(--color-border)' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant={isXL ? "h6" : "body2"} sx={{ color: 'var(--color-text-secondary)', fontWeight: 700 }}>ดอกเบี้ยรวมทั้งหมด:</Typography>
              <Typography variant={isXL ? "h5" : "subtitle1"} fontWeight={800} sx={{ color: 'var(--color-dark)' }}>
                ฿{calculations.overallInterest.toLocaleString("en-US")}
              </Typography>
            </Stack>
          </Paper>
        </Stack>

        {/* Action Buttons */}
        <Stack spacing={1.5}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<SaveIcon sx={{ fontSize: isXL ? 30 : 20 }} />}
            onClick={onOpenDialog}
            sx={{
              py: isXL ? 2 : 1.2,
              fontSize: isXL ? '1.35rem' : '0.95rem',
              fontWeight: 800,
              bgcolor: 'var(--color-dark)',
              boxShadow: '0 8px 20px rgba(70, 75, 113, 0.3)',
              '&:hover': { bgcolor: 'var(--color-dark-hover)' },
            }}
          >
            ใส่ชื่อลูกค้า / พิมพ์ใบเสนอราคา
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
