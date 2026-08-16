import React from 'react';
import {
  Paper,
  Stack,
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Tabs,
  Tab,
} from '@mui/material';
import {
  TwoWheeler as TwoWheelerIcon,
  Calculate as CalculateIcon,
  TableChart as TableChartIcon,
  FormatSize as FormatSizeIcon,
  ZoomIn as ZoomInIcon,
} from '@mui/icons-material';

export default function HeaderBanner({ appMode, setAppMode, fontSizeMode, setFontSizeMode, isXL }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, md: 2 },
        mb: 2,
        borderRadius: 3,
        background: 'linear-gradient(135deg, var(--color-dark) 0%, var(--color-dark-hover) 100%)',
        color: '#ffffff',
        boxShadow: '0 4px 20px rgba(70, 75, 113, 0.25)',
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        spacing={1.5}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              p: isXL ? 1.5 : 1,
              borderRadius: 2.5,
              bgcolor: 'rgba(124, 213, 199, 0.2)',
              border: '1.5px solid var(--color-accent)',
              display: 'flex',
            }}
          >
            <TwoWheelerIcon sx={{ fontSize: isXL ? 42 : 24, color: 'var(--color-accent)' }} />
          </Box>
          <Box>
            <Typography variant={isXL ? "h4" : "subtitle1"} sx={{ fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
              ตารางผ่อนรถจักรยานยนต์ YAMAHA
            </Typography>
            <Typography variant={isXL ? "body1" : "caption"} sx={{ color: 'var(--color-accent-light)', fontWeight: 500 }}>
              {appMode === 'single' ? 'คำนวณรายบุคคล (Single)' : 'ตารางผ่อนรวมหลายตัวเลือก (Installment Matrix)'}
            </Typography>
          </Box>
        </Stack>

        {/* Size Selector Control */}
        <Paper
          elevation={0}
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.15)',
            p: 0.25,
            borderRadius: 2.5,
            border: '1px solid rgba(255, 255, 255, 0.25)',
          }}
        >
          <ToggleButtonGroup
            value={fontSizeMode}
            exclusive
            onChange={(e, val) => val && setFontSizeMode(val)}
            size="small"
            sx={{
              '& .MuiToggleButton-root': {
                color: '#ffffff',
                px: isXL ? 2 : 1.2,
                py: isXL ? 0.75 : 0.4,
                fontWeight: 700,
                fontSize: isXL ? '1.05rem' : '0.8rem',
                border: 'none',
                borderRadius: 2,
                '&.Mui-selected': {
                  bgcolor: 'var(--color-primary)',
                  color: '#ffffff',
                  '&:hover': { bgcolor: 'var(--color-primary-hover)' },
                },
              },
            }}
          >
            <ToggleButton value="normal">
              <FormatSizeIcon sx={{ mr: 0.5, fontSize: 16 }} /> ปกติ 💻
            </ToggleButton>
            <ToggleButton value="extra-large">
              <ZoomInIcon sx={{ mr: 0.5, fontSize: 20 }} /> ใหญ่พิเศษ (มือถือ) 📱👓
            </ToggleButton>
          </ToggleButtonGroup>
        </Paper>
      </Stack>

      {/* Two Modes Control - Row Based on Real Mobile */}
      <Box sx={{ mt: 1.5, pt: 1.5, borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
        <ToggleButtonGroup
          value={appMode}
          exclusive
          onChange={(e, val) => val && setAppMode(val)}
          fullWidth
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
            '& .MuiToggleButton-root': {
              flex: 1,
              color: '#ffffff',
              py: isXL ? 1.2 : 0.8,
              px: { xs: 1, sm: 2 },
              fontWeight: 800,
              fontSize: isXL ? { xs: '0.85rem', sm: '1.05rem' } : { xs: '0.75rem', sm: '0.9rem' },
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '8px !important',
              whiteSpace: 'nowrap',
              '&.Mui-selected': {
                bgcolor: 'var(--color-primary)',
                color: '#ffffff',
                border: '1px solid var(--color-accent)',
                boxShadow: '0 4px 12px rgba(17, 138, 178, 0.4)',
                '&:hover': { bgcolor: 'var(--color-primary-hover)' },
              },
            },
          }}
        >
          <ToggleButton value="single">
            <CalculateIcon sx={{ mr: 0.75, fontSize: isXL ? 20 : 16 }} />
            คำนวณรายบุคคล
          </ToggleButton>
          <ToggleButton value="matrix">
            <TableChartIcon sx={{ mr: 0.75, fontSize: isXL ? 20 : 16 }} />
            ตารางผ่อนรวม
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Paper>
  );
}
