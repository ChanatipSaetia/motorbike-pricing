import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  TextField,
  Autocomplete,
  InputAdornment,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  Chip,
  Button,
  IconButton,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Person as PersonIcon,
  Close as CloseIcon,
  Palette as PaletteIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  TwoWheeler as TwoWheelerIcon,
  Smartphone as SmartphoneIcon,
  Refresh as RefreshIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import { CODE_MAPPING, TYPE_CODE_OPTIONS, FINANCE_CODE_OPTIONS } from '../../constants/financeData';
import { parsedData, getAmphureOptions, getTambonOptions } from '../../utils/locationHelper';
import { generatePngDataUrl } from '../../utils/exportHelpers';

export default function CustomerDetailsDialog({
  open,
  onClose,
  bikeName,
  setBikeName,
  typeCode,
  setTypeCode,
  financeCode,
  setFinanceCode,
  color,
  setColor,
  province,
  setProvince,
  amphure,
  setAmphure,
  tambon,
  setTambon,
  name,
  setName,
  number,
  setNumber,
  quoteExportMode,
  setQuoteExportMode,
  price,
  down,
  calculations,
  month,
  interest,
  bgImageUrl,
  exportCardRef,
  exportQuotePosterRef,
  onDownloadCustomerQuote,
  onDownloadFinanceQuote,
  onOpenMobileImageModalFromDialog,
  isExporting,
  isXL,
}) {
  const amphureOptions = getAmphureOptions(province);
  const tambonOptions = getTambonOptions(province, amphure);

  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);

  const updatePreview = useCallback(async () => {
    const targetRef = exportQuotePosterRef || exportCardRef;
    if (!targetRef || !targetRef.current) return;
    setIsGeneratingPreview(true);
    setTimeout(async () => {
      const url = await generatePngDataUrl(targetRef);
      if (url) {
        setPreviewImageUrl(url);
      }
      setIsGeneratingPreview(false);
    }, 120);
  }, [exportQuotePosterRef, exportCardRef]);

  useEffect(() => {
    if (open) {
      updatePreview();
    }
  }, [
    open,
    quoteExportMode,
    bikeName,
    price,
    down,
    month,
    interest,
    typeCode,
    financeCode,
    color,
    province,
    amphure,
    tambon,
    name,
    number,
    bgImageUrl,
    updatePreview,
  ]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 4, overflow: 'hidden' }
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          bgcolor: '#0f172a',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.25}>
          <PersonIcon sx={{ color: '#f87171', fontSize: 26 }} />
          <Typography variant={isXL ? "h6" : "subtitle1"} fontWeight={700}>
            กรอกข้อมูลใบเสนอราคา YAMAHA
          </Typography>
        </Stack>
        <IconButton onClick={onClose} size="small" sx={{ color: '#ffffff', bgcolor: 'rgba(255,255,255,0.1)' }}>
          <CloseIcon sx={{ fontSize: 22 }} />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: { xs: 2.5, sm: 3.5 } }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant={isXL ? "h6" : "body1"} fontWeight={700} sx={{ mb: 0.5 }}>ชื่อรุ่นรถ YAMAHA</Typography>
            <TextField
              fullWidth
              value={bikeName}
              onChange={(e) => setBikeName(e.target.value)}
              placeholder="เช่น Yamaha Grand Filano Hybrid"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant={isXL ? "h6" : "body1"} fontWeight={700} sx={{ mb: 0.5 }}>รหัสรุ่น (Type Code)</Typography>
            <Autocomplete
              freeSolo
              disablePortal
              inputValue={typeCode}
              onInputChange={(event, newInputValue) => {
                setTypeCode(newInputValue);
                if (CODE_MAPPING[newInputValue] !== undefined) {
                  setFinanceCode(CODE_MAPPING[newInputValue]);
                }
              }}
              options={TYPE_CODE_OPTIONS}
              renderInput={(params) => <TextField {...params} placeholder="เช่น B8B800" fullWidth />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant={isXL ? "h6" : "body1"} fontWeight={700} sx={{ mb: 0.5 }}>รหัส Finance</Typography>
            <Autocomplete
              freeSolo
              disablePortal
              inputValue={financeCode}
              onInputChange={(event, newInputValue) => setFinanceCode(newInputValue)}
              options={FINANCE_CODE_OPTIONS}
              renderInput={(params) => <TextField {...params} placeholder="เช่น 701716N" fullWidth />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant={isXL ? "h6" : "body1"} fontWeight={700} sx={{ mb: 0.5 }}>สีรถ</Typography>
            <TextField
              fullWidth
              value={color}
              onChange={(e) => setColor(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><PaletteIcon color="action" /></InputAdornment>
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant={isXL ? "h6" : "body1"} fontWeight={700} sx={{ mb: 0.5 }}>จังหวัด</Typography>
            <Autocomplete
              freeSolo
              disablePortal
              inputValue={province}
              onInputChange={(event, newInputValue) => {
                setProvince(newInputValue);
                setAmphure('');
                setTambon('');
              }}
              options={Object.keys(parsedData)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant={isXL ? "h6" : "body1"} fontWeight={700} sx={{ mb: 0.5 }}>อำเภอ</Typography>
            <Autocomplete
              freeSolo
              disablePortal
              disabled={!province}
              inputValue={amphure}
              onInputChange={(event, newInputValue) => {
                setAmphure(newInputValue);
                setTambon('');
              }}
              options={amphureOptions}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant={isXL ? "h6" : "body1"} fontWeight={700} sx={{ mb: 0.5 }}>ตำบล</Typography>
            <Autocomplete
              freeSolo
              disablePortal
              disabled={!amphure}
              inputValue={tambon}
              onInputChange={(event, newInputValue) => setTambon(newInputValue)}
              options={tambonOptions}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant={isXL ? "h6" : "body1"} fontWeight={700} sx={{ mb: 0.5 }}>ชื่อเล่นลูกค้า</Typography>
            <TextField
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><PersonIcon color="action" /></InputAdornment>
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant={isXL ? "h6" : "body1"} fontWeight={700} sx={{ mb: 0.5 }}>เบอร์โทรศัพท์</Typography>
            <TextField
              fullWidth
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><PhoneIcon color="action" /></InputAdornment>
              }}
            />
          </Grid>
        </Grid>

        {/* DUAL EXPORT MODE SELECTOR TOGGLE (For Customer vs For Finance) */}
        <Box sx={{ mt: 4, pt: 3, borderTop: '2px solid var(--color-border)' }}>
          <Typography variant={isXL ? "h6" : "subtitle1"} fontWeight={800} sx={{ mb: 1.5, color: 'var(--color-dark)' }}>
            เลือกรูปแบบใบเสนอราคาที่จะบันทึกเป็นรูปภาพ (Export Mode):
          </Typography>

          <ToggleButtonGroup
            value={quoteExportMode}
            exclusive
            onChange={(e, val) => val && setQuoteExportMode(val)}
            fullWidth
            sx={{
              mb: 2.5,
              '& .MuiToggleButton-root': {
                py: 1.5,
                fontWeight: 800,
                fontSize: isXL ? '1.15rem' : '1rem',
                borderWidth: '2px',
                borderColor: 'var(--color-border)',
                '&.Mui-selected': {
                  bgcolor: 'var(--color-dark)',
                  color: '#ffffff',
                  '&:hover': { bgcolor: 'var(--color-dark-hover)' },
                },
              },
            }}
          >
            <ToggleButton value="customer">
              <PersonIcon sx={{ mr: 1 }} /> 1. ใบเสนอราคาสำหรับลูกค้า (Customer Mode)
            </ToggleButton>
            <ToggleButton value="finance">
              <BusinessIcon sx={{ mr: 1 }} /> 2. ใบเสนอราคาสำหรับไฟแนนซ์/ร้านค้า (Finance Mode)
            </ToggleButton>
          </ToggleButtonGroup>

          {/* REAL MOBILE SAVE PNG IMAGE PREVIEW CONTAINER */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              bgcolor: 'var(--color-accent-light)',
              borderRadius: 4,
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <SmartphoneIcon color="primary" sx={{ fontSize: 28 }} />
                <Typography variant={isXL ? "h6" : "subtitle1"} fontWeight={800} color="var(--color-dark)">
                  รูปภาพสำหรับบันทึกลงมือถือ
                </Typography>
              </Stack>

              <Button
                variant="outlined"
                color="primary"
                size="small"
                startIcon={isGeneratingPreview ? <CircularProgress size={16} color="inherit" /> : <RefreshIcon />}
                onClick={updatePreview}
                disabled={isGeneratingPreview}
                sx={{ fontWeight: 700, borderRadius: 2 }}
              >
                {isGeneratingPreview ? 'กำลังอัปเดตรูปภาพ...' : 'อัปเดตรูปภาพตัวอย่าง'}
              </Button>
            </Stack>

            <Alert severity="info" variant="filled" icon={<ImageIcon />} sx={{ mb: 2, borderRadius: 3, bgcolor: 'var(--color-dark)' }}>
              <Typography variant="body2" fontWeight={700}>
                📱 <strong>วิธีบันทึกลงมือถือ:</strong> แตะค้างที่รูปภาพด้านล่างนี้ แล้วเลือก <strong>"บันทึกรูปภาพ (Save Image)"</strong> หรือ <strong>"บันทึกไปยังแอปรูปภาพ"</strong>
              </Typography>
            </Alert>

            <Box
              sx={{
                position: 'relative',
                minHeight: '260px',
                bgcolor: '#ffffff',
                borderRadius: '3px',
                p: { xs: 1.5, sm: 2.5 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)',
              }}
            >
              {isGeneratingPreview && (
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(255, 255, 255, 0.85)',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1.5,
                  }}
                >
                  <CircularProgress color="error" size={40} />
                  <Typography variant="body2" fontWeight={700} color="text.secondary">
                    กำลังสร้างรูปภาพสำหรับบันทึกลงมือถือ...
                  </Typography>
                </Box>
              )}

              {previewImageUrl ? (
                <Box
                  component="img"
                  src={previewImageUrl}
                  alt="รูปภาพสำหรับบันทึกลงมือถือ"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '650px',
                    objectFit: 'contain',
                    display: 'block',
                    cursor: 'pointer',
                    borderRadius: '3px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                  }}
                />
              ) : (
                <Stack alignItems="center" spacing={1} sx={{ py: 6, color: 'text.secondary' }}>
                  <CircularProgress color="error" size={32} />
                  <Typography variant="body2" fontWeight={600}>
                    กำลังโหลดรูปภาพสำหรับบันทึกลงมือถือ...
                  </Typography>
                </Stack>
              )}
            </Box>
          </Paper>

          {/* Hidden reference for fallback calculation */}
          <Box ref={exportCardRef} sx={{ display: 'none' }} />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
