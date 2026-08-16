import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Alert,
  Box,
  Button,
  Stack,
} from '@mui/material';
import {
  Smartphone as SmartphoneIcon,
  Close as CloseIcon,
  Image as ImageIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

export default function MobileImagePreviewModal({
  open,
  onClose,
  previewImageUrl,
}) {
  const handleDirectDownload = () => {
    if (previewImageUrl) {
      const link = document.createElement('a');
      link.download = `quote-${Date.now()}.png`;
      link.href = previewImageUrl;
      link.click();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 4, p: 1 } }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <SmartphoneIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h6" fontWeight={800} color="var(--color-dark)">
            รูปภาพสำหรับบันทึกลงมือถือ
          </Typography>
        </Stack>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ textAlign: 'center', p: 2 }}>
        <Alert severity="info" variant="filled" icon={<ImageIcon />} sx={{ mb: 2, borderRadius: 3, textAlign: 'left', bgcolor: 'var(--color-dark)' }}>
          <Typography variant="body1" fontWeight={700}>
            📱 วิธีบันทึกภาพลงในคลังภาพ (Photos / Gallery):
          </Typography>
          <Typography variant="body2" fontWeight={600} sx={{ mt: 0.5 }}>
            1. **แตะค้างที่รูปภาพ** ด้านล่างนี้<br />
            2. กดเลือก **"บันทึกรูปภาพ (Save Image)"** หรือ **"บันทึกไปยังแอปรูปภาพ"**
          </Typography>
        </Alert>

        {previewImageUrl && (
          <Box
            sx={{
              p: 2,
              bgcolor: '#ffffff',
              borderRadius: '3px',
              boxShadow: '0 10px 30px rgba(31, 111, 95, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)',
              display: 'inline-block',
              maxWidth: '100%',
            }}
          >
            <Box
              component="img"
              src={previewImageUrl}
              alt="ใบเสนอราคาค่างวดรถ"
              sx={{
                width: '100%',
                maxHeight: '65vh',
                objectFit: 'contain',
                borderRadius: '3px',
                display: 'block',
              }}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
        <Button onClick={onClose} color="inherit" size="large">
          ปิด
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
          onClick={handleDirectDownload}
          sx={{ fontSize: '1.1rem', fontWeight: 700, bgcolor: 'var(--color-dark)', '&:hover': { bgcolor: 'var(--color-dark-hover)' } }}
        >
          ดาวน์โหลดไฟล์ตรง (Direct Download)
        </Button>
      </DialogActions>
    </Dialog>
  );
}
