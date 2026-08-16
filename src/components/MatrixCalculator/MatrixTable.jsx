import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Stack,
  Button,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  Chip,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Smartphone as SmartphoneIcon,
  TableChart as TableChartIcon,
} from '@mui/icons-material';
import { MONTH_OPTIONS, DEFAULT_INTEREST_RATES } from '../../constants/financeData';

export default function MatrixTable({
  bikeName,
  price,
  onPriceChange,
  adjustPrice,
  matrixDownOptionType,
  setMatrixDownOptionType,
  matrixRows,
  onOpenMatrixMobileImageModal,
  isXL,
}) {
  return (
    <Stack spacing={isXL ? 3 : 2}>
      {/* Controls Bar for Matrix */}
      <Card sx={{ borderColor: 'var(--color-border)', borderWidth: '2px' }}>
        <CardContent sx={{ p: isXL ? { xs: 2.5, sm: 3 } : { xs: 1.5, sm: 2 } }}>
          <Grid container spacing={isXL ? 3 : 2} alignItems="center">
            <Grid item xs={12} sm={6} md={5}>
              <Typography variant={isXL ? "h5" : "subtitle2"} fontWeight={800} sx={{ mb: 0.75, color: 'var(--color-dark)' }}>
                1. ราคารถสำหรับตารางผ่อน (บาท)
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => adjustPrice(-5000)}
                  sx={{
                    display: isXL ? { xs: 'none', sm: 'inline-flex' } : 'inline-flex',
                    minWidth: isXL ? 54 : 42,
                    height: isXL ? 64 : 46,
                    borderRadius: 2,
                    border: '2px solid var(--color-border)'
                  }}
                >
                  <RemoveIcon sx={{ fontSize: isXL ? 30 : 20 }} />
                </Button>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={price.toLocaleString("en-US")}
                  onChange={onPriceChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end"><Typography variant={isXL ? "h5" : "body2"} fontWeight={800} color="var(--color-dark)">บาท</Typography></InputAdornment>,
                    sx: { fontSize: isXL ? '2.2rem' : '1.3rem', fontWeight: 800, color: 'var(--color-dark)', height: isXL ? 64 : 46 }
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => adjustPrice(5000)}
                  sx={{
                    display: isXL ? { xs: 'none', sm: 'inline-flex' } : 'inline-flex',
                    minWidth: isXL ? 54 : 42,
                    height: isXL ? 64 : 46,
                    borderRadius: 2
                  }}
                >
                  <AddIcon sx={{ fontSize: isXL ? 30 : 20 }} />
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant={isXL ? "h5" : "subtitle2"} fontWeight={800} sx={{ mb: 0.75, color: 'var(--color-dark)' }}>
                2. แสดงแถวเงินดาวน์แบบ
              </Typography>
              <ToggleButtonGroup
                value={matrixDownOptionType}
                exclusive
                onChange={(e, val) => val && setMatrixDownOptionType(val)}
                fullWidth
                sx={{ height: isXL ? 64 : 46 }}
              >
                <ToggleButton value="baht" sx={{ fontSize: isXL ? '1.2rem' : '0.9rem', fontWeight: 800 }}>
                  บาท (0 - 30k)
                </ToggleButton>
                <ToggleButton value="percent" sx={{ fontSize: isXL ? '1.2rem' : '0.9rem', fontWeight: 800 }}>
                  เปอร์เซ็นต์ (0-30%)
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>

            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<SmartphoneIcon sx={{ fontSize: isXL ? 28 : 20 }} />}
                onClick={onOpenMatrixMobileImageModal}
                sx={{
                  height: isXL ? 64 : 46,
                  fontSize: isXL ? '1.25rem' : '0.95rem',
                  fontWeight: 800,
                  bgcolor: 'var(--color-dark)',
                  boxShadow: '0 8px 20px rgba(70, 75, 113, 0.3)',
                  '&:hover': { bgcolor: 'var(--color-dark-hover)' },
                }}
              >
                รูปตารางผ่อนสำหรับมือถือ
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Clean Price Matrix Table Container */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          bgcolor: '#ffffff',
          borderRadius: 4,
          border: '2.5px solid var(--color-primary)',
          boxShadow: '0 8px 30px rgba(17, 138, 178, 0.1)',
        }}
      >
        {/* Matrix Card Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2, pb: 1.5, borderBottom: '2px solid var(--color-accent-light)' }}>
          <Box>
            <Typography variant={isXL ? "h4" : "h5"} fontWeight={800} color="var(--color-dark)">
              ตารางผ่อน {bikeName}
            </Typography>
          </Box>
          <Chip
            icon={<TableChartIcon style={{ color: '#ffffff' }} />}
            label="ตารางผ่อน YAMAHA"
            sx={{ fontSize: '1.1rem', fontWeight: 800, py: 2, bgcolor: 'var(--color-dark)', color: '#ffffff' }}
          />
        </Stack>

        <TableContainer sx={{ borderRadius: 3, border: '2px solid var(--color-dark)', overflowX: 'auto' }}>
          <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow sx={{ bgcolor: 'var(--color-dark)' }}>
                <TableCell sx={{ color: '#ffffff', fontWeight: 800, fontSize: isXL ? '1.25rem' : '1.1rem', py: 2, whiteSpace: 'nowrap' }}>
                  เงินดาวน์
                </TableCell>
                {MONTH_OPTIONS.map((m) => (
                  <TableCell
                    key={m}
                    align="center"
                    sx={{
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: isXL ? '1.2rem' : '1.05rem',
                      py: 2,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {m} งวด
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {matrixRows.map((row, idx) => (
                <TableRow key={row.downAmount} sx={{ bgcolor: idx % 2 === 0 ? '#ffffff' : 'var(--color-accent-light)' }}>
                  <TableCell sx={{ fontWeight: 800, fontSize: isXL ? '1.3rem' : '1.1rem', bgcolor: 'var(--color-accent-light)', borderRight: '2px solid var(--color-border)', whiteSpace: 'nowrap', color: 'var(--color-dark)' }}>
                    ฿{row.downAmount.toLocaleString()}
                    <Typography variant="caption" display="block" color="var(--color-primary)" fontWeight={800}>
                      ({row.downPct}%)
                    </Typography>
                  </TableCell>

                  {MONTH_OPTIONS.map((m) => {
                    const cellData = row.monthsData[m];
                    return (
                      <TableCell
                        key={m}
                        align="center"
                        sx={{
                          fontWeight: 800,
                          fontSize: isXL ? '1.3rem' : '1.15rem',
                          color: 'var(--color-dark)',
                          border: '1px solid var(--color-border)',
                          whiteSpace: 'nowrap',
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
      </Paper>
    </Stack>
  );
}
