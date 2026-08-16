import { useState } from 'react';
import { generatePngDataUrl } from '../utils/exportHelpers';
import { buildQuotationText } from '../utils/formatters';

export function usePosterExport() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isExporting, setIsExporting] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');

  const closeSnackbar = () => setSnackbar(prev => ({ ...prev, open: false }));

  const handleDownloadImage = async (ref, customFileName, defaultPrefix = 'ใบเสนอราคา', bikeName = 'Yamaha', customerName = 'ลูกค้า') => {
    setIsExporting(true);
    const dataUrl = await generatePngDataUrl(ref);
    setIsExporting(false);

    if (dataUrl) {
      const link = document.createElement('a');
      link.download = customFileName || `${defaultPrefix}-${bikeName}-${customerName}.png`;
      link.href = dataUrl;
      link.click();
      setSnackbar({ open: true, message: 'ดาวน์โหลดรูปภาพเรียบร้อยแล้ว!', severity: 'success' });
    } else {
      setSnackbar({ open: true, message: 'เกิดข้อผิดพลาดในการสร้างรูปภาพ', severity: 'error' });
    }
  };

  const handleOpenMobileImageModal = async (ref) => {
    setIsExporting(true);
    const dataUrl = await generatePngDataUrl(ref);
    setIsExporting(false);

    if (dataUrl) {
      setPreviewImageUrl(dataUrl);
      setImageModalOpen(true);
    } else {
      setSnackbar({ open: true, message: 'เกิดข้อผิดพลาดในการสร้างรูปภาพ', severity: 'error' });
    }
  };

  const handleCopyText = (quoteData) => {
    const text = buildQuotationText(quoteData);
    navigator.clipboard.writeText(text);
    setSnackbar({ open: true, message: 'คัดลอกรายละเอียดลง Clipboard แล้ว!', severity: 'success' });
  };

  return {
    snackbar,
    closeSnackbar,
    isExporting,
    imageModalOpen,
    setImageModalOpen,
    previewImageUrl,
    handleDownloadImage,
    handleOpenMobileImageModal,
    handleCopyText,
  };
}
