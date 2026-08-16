import React from 'react';
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  Divider,
  Chip,
  Paper,
  Grid,
} from '@mui/material';
import {
  Calculate as CalculateIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import { MONTH_OPTIONS } from '../../constants/financeData';

export default function SingleCalculatorForm({
  bikeName,
  price,
  onPriceChange,
  adjustPrice,
  down,
  onDownChange,
  adjustDown,
  applyDownPercentage,
  financing,
  month,
  onMonthChange,
  interest,
  setInterest,
  isXL,
}) {
  return (
    <Card sx={{ height: '100%', borderColor: 'var(--color-border)', borderWidth: '2px' }}>
      <CardContent sx={{ p: isXL ? { xs: 2.5, sm: 3.5 } : { xs: 1.5, sm: 2 } }}>
        <Stack direction="row" alignItems="center" spacing={1.25} sx={{ mb: isXL ? 3 : 1.5 }}>
          <CalculateIcon color="primary" sx={{ fontSize: isXL ? 38 : 22 }} />
          <Typography variant={isXL ? "h5" : "subtitle1"} sx={{ fontWeight: 800, color: 'var(--color-dark)' }}>
            ข้อมูลจัดไฟแนนซ์: {bikeName}
          </Typography>
        </Stack>

        <Stack spacing={isXL ? 3 : 1.5}>
          {/* Vehicle Price */}
          <Box>
            <Typography variant={isXL ? "h5" : "subtitle2"} sx={{ fontWeight: 800, mb: 0.75, color: 'var(--color-dark)' }}>
              1. ราคารถ (บาท)
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => adjustPrice(-5000)}
                sx={{
                  display: isXL ? { xs: 'none', sm: 'inline-flex' } : 'inline-flex',
                  minWidth: isXL ? 58 : 42,
                  height: isXL ? 66 : 46,
                  borderRadius: 2.5,
                  border: '2px solid var(--color-border)'
                }}
              >
                <RemoveIcon sx={{ fontSize: isXL ? 32 : 20 }} />
              </Button>
              <TextField
                fullWidth
                variant="outlined"
                value={price.toLocaleString("en-US")}
                onChange={onPriceChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end"><Typography variant={isXL ? "h5" : "body2"} fontWeight={800} color="var(--color-dark)">บาท</Typography></InputAdornment>,
                  sx: {
                    fontSize: isXL ? '2.4rem' : '1.35rem',
                    fontWeight: 800,
                    color: 'var(--color-dark)',
                    height: isXL ? 66 : 46,
                    bgcolor: '#ffffff',
                  }
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => adjustPrice(5000)}
                sx={{
                  display: isXL ? { xs: 'none', sm: 'inline-flex' } : 'inline-flex',
                  minWidth: isXL ? 58 : 42,
                  height: isXL ? 66 : 46,
                  borderRadius: 2.5
                }}
              >
                <AddIcon sx={{ fontSize: isXL ? 32 : 20 }} />
              </Button>
            </Stack>
          </Box>

          <Divider sx={{ borderBottomWidth: 1.5 }} />

          {/* Down Payment */}
          <Box>
            <Typography variant={isXL ? "h5" : "subtitle2"} sx={{ fontWeight: 800, mb: 0.75, color: 'var(--color-dark)' }}>
              2. เงินดาวน์ (บาท)
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => adjustDown(-1000)}
                sx={{
                  display: isXL ? { xs: 'none', sm: 'inline-flex' } : 'inline-flex',
                  minWidth: isXL ? 58 : 42,
                  height: isXL ? 66 : 46,
                  borderRadius: 2.5,
                  border: '2px solid var(--color-border)'
                }}
              >
                <RemoveIcon sx={{ fontSize: isXL ? 32 : 20 }} />
              </Button>
              <TextField
                fullWidth
                variant="outlined"
                value={down.toLocaleString("en-US")}
                onChange={onDownChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end"><Typography variant={isXL ? "h5" : "body2"} fontWeight={800} color="var(--color-primary)">บาท</Typography></InputAdornment>,
                  sx: {
                    fontSize: isXL ? '2.2rem' : '1.3rem',
                    fontWeight: 800,
                    color: 'var(--color-primary)',
                    height: isXL ? 66 : 46,
                    bgcolor: '#ffffff',
                  }
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => adjustDown(1000)}
                sx={{
                  display: isXL ? { xs: 'none', sm: 'inline-flex' } : 'inline-flex',
                  minWidth: isXL ? 58 : 42,
                  height: isXL ? 66 : 46,
                  borderRadius: 2.5
                }}
              >
                <AddIcon sx={{ fontSize: isXL ? 32 : 20 }} />
              </Button>
            </Stack>

            <Stack direction="row" spacing={0.75} sx={{ mt: 1, flexWrap: 'wrap', gap: 0.75 }}>
              {[0, 5, 10, 15, 20, 25, 30].map((pct) => (
                <Chip
                  key={pct}
                  label={`ดาวน์ ${pct}%`}
                  onClick={() => applyDownPercentage(pct)}
                  variant="outlined"
                  color="secondary"
                  clickable
                  sx={{
                    fontSize: isXL ? '1.25rem' : '0.85rem',
                    fontWeight: 800,
                    px: isXL ? 1.5 : 0.8,
                    py: isXL ? 2.5 : 1.5,
                    borderRadius: '8px',
                    borderWidth: '2px',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-dark)',
                    bgcolor: '#ffffff',
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Financing Amount Display */}
          <Paper
            elevation={0}
            sx={{
              p: isXL ? 2 : 1.25,
              bgcolor: 'var(--color-accent-light)',
              borderRadius: 2.5,
              border: '1.5px solid var(--color-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant={isXL ? "h5" : "body2"} sx={{ fontWeight: 800, color: '#334155' }}>
              ยอดจัดไฟแนนซ์:
            </Typography>
            <Typography variant={isXL ? "h3" : "h6"} sx={{ fontWeight: 900, color: '#0f172a' }}>
              ฿{financing.toLocaleString("en-US")}
            </Typography>
          </Paper>

          <Divider sx={{ borderBottomWidth: 1.5 }} />

          {/* Month & Interest */}
          <Grid container spacing={isXL ? 2 : 1.5}>
            <Grid item xs={12} sm={6}>
              <Typography variant={isXL ? "h5" : "subtitle2"} sx={{ fontWeight: 800, mb: 0.75, color: '#1e293b' }}>
                3. จำนวนเดือนผ่อน
              </Typography>
              <TextField
                fullWidth
                select
                value={month}
                onChange={(e) => onMonthChange(e.target.value)}
                SelectProps={{ native: true }}
                InputProps={{
                  sx: {
                    fontSize: isXL ? '1.6rem' : '1.05rem',
                    fontWeight: 800,
                    height: isXL ? 62 : 46,
                  }
                }}
              >
                {MONTH_OPTIONS.map((m) => (
                  <option key={m} value={m} style={{ fontSize: isXL ? '1.3rem' : '1rem', padding: '8px' }}>
                    {m} เดือน
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant={isXL ? "h5" : "subtitle2"} sx={{ fontWeight: 800, mb: 0.75, color: '#1e293b' }}>
                4. ดอกเบี้ย (% ต่อเดือน)
              </Typography>
              <TextField
                fullWidth
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                InputProps={{
                  endAdornment: <InputAdornment position="end"><Typography variant={isXL ? "h5" : "body2"} fontWeight={800}>%</Typography></InputAdornment>,
                  sx: {
                    fontSize: isXL ? '1.6rem' : '1.05rem',
                    fontWeight: 800,
                    height: isXL ? 62 : 46,
                  }
                }}
              />
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}
