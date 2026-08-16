import React, { useState, useRef } from 'react';
import { Container, Grid, Snackbar, Alert } from '@mui/material';

import { YAMAHA_MODELS } from './constants/yamahaModels';
import { DEFAULT_INTEREST_RATES, MONTH_OPTIONS } from './constants/financeData';
import { useCalculations } from './hooks/useCalculations';
import { useMatrixCalculations } from './hooks/useMatrixCalculations';
import { usePosterExport } from './hooks/usePosterExport';

import HeaderBanner from './components/HeaderBanner';
import ModelSelector from './components/ModelSelector';
import SingleCalculatorForm from './components/SingleCalculator/SingleCalculatorForm';
import SingleCalculatorResult from './components/SingleCalculator/SingleCalculatorResult';
import MatrixTable from './components/MatrixCalculator/MatrixTable';
import CustomerDetailsDialog from './components/Dialogs/CustomerDetailsDialog';
import MobileImagePreviewModal from './components/Dialogs/MobileImagePreviewModal';
import ExportTablePoster from './components/ExportTablePoster';
import ExportQuotePoster from './components/ExportQuotePoster';

function App() {
  // Main Mode: 'single' (คำนวณเดี่ยว) vs 'matrix' (ตารางผ่อนรวม)
  const [appMode, setAppMode] = useState('single');

  // Yamaha Model Selection & Image Overlay States
  const [bikeName, setBikeName] = useState(YAMAHA_MODELS[0].name);
  const [price, setPrice] = useState(54900);
  const [bgImageUrl, setBgImageUrl] = useState(YAMAHA_MODELS[0].imageUrl);

  // Single Calculator States
  const [down, setDown] = useState(10000);
  const [month, setMonth] = useState(12);
  const [interest, setInterest] = useState("1.07");

  // Matrix Table Down Payment Option
  const [matrixDownOptionType, setMatrixDownOptionType] = useState('baht'); // 'baht' or 'percent'

  // Accessibility Font Size Mode ('normal' vs 'extra-large')
  const [fontSizeMode, setFontSizeMode] = useState('extra-large');

  // Customer / Details Modal States
  const [dialogOpen, setDialogOpen] = useState(false);
  const [quoteExportMode, setQuoteExportMode] = useState('customer'); // 'customer' or 'finance'
  const [typeCode, setTypeCode] = useState('');
  const [financeCode, setFinanceCode] = useState('');
  const [province, setProvince] = useState('ตราด');
  const [amphure, setAmphure] = useState('');
  const [tambon, setTambon] = useState('');
  const [color, setColor] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // Export Canvas Refs
  const exportCardRef = useRef(null);
  const exportQuotePosterRef = useRef(null);
  const exportMatrixPosterRef = useRef(null);

  const isXL = fontSizeMode === 'extra-large';

  // Calculations Hooks
  const calculations = useCalculations(price, down, month, interest);
  const matrixRows = useMatrixCalculations(price, matrixDownOptionType);

  // Poster Export Hook
  const {
    snackbar,
    closeSnackbar,
    isExporting,
    imageModalOpen,
    setImageModalOpen,
    previewImageUrl,
    handleDownloadImage,
    handleOpenMobileImageModal,
    handleCopyText,
  } = usePosterExport();

  // Handlers
  const handleSelectYamahaBike = (bike) => {
    setBikeName(bike.name);
    setBgImageUrl(bike.imageUrl);
  };

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
    const m = parseInt(newMonth, 10);
    if (DEFAULT_INTEREST_RATES[m]) {
      setInterest(DEFAULT_INTEREST_RATES[m].toString());
    }
  };

  const handlePriceChange = (e) => {
    const rawVal = e.target.value.replace(/,/g, '');
    if (rawVal === "") setPrice(0);
    else if (!isNaN(rawVal)) setPrice(parseInt(rawVal, 10));
  };

  const adjustPrice = (delta) => {
    setPrice((prev) => Math.max(0, prev + delta));
  };

  const handleDownChange = (e) => {
    const rawVal = e.target.value.replace(/,/g, '');
    if (rawVal === "") setDown(0);
    else if (!isNaN(rawVal)) setDown(parseInt(rawVal, 10));
  };

  const adjustDown = (delta) => {
    setDown((prev) => Math.max(0, prev + delta));
  };

  const applyDownPercentage = (pct) => {
    setDown(Math.round((price * pct) / 100));
  };

  const handleTriggerCopyText = () => {
    handleCopyText({
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
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      {/* Top Header Banner with Mode Switch & Size Toggle */}
      <HeaderBanner
        appMode={appMode}
        setAppMode={setAppMode}
        fontSizeMode={fontSizeMode}
        setFontSizeMode={setFontSizeMode}
        isXL={isXL}
      />

      {/* Official YAMAHA Models Selector */}
      <ModelSelector
        bikeName={bikeName}
        setBikeName={setBikeName}
        setBgImageUrl={setBgImageUrl}
        isXL={isXL}
      />

      {/* MODE 1: คำนวณรายบุคคล (SINGLE CALCULATOR) */}
      {appMode === 'single' && (
        <Grid container spacing={isXL ? 3 : 2}>
          <Grid item xs={12} md={isXL ? 12 : 7}>
            <SingleCalculatorForm
              bikeName={bikeName}
              price={price}
              onPriceChange={handlePriceChange}
              adjustPrice={adjustPrice}
              down={down}
              onDownChange={handleDownChange}
              adjustDown={adjustDown}
              applyDownPercentage={applyDownPercentage}
              financing={calculations.financing}
              month={month}
              onMonthChange={handleMonthChange}
              interest={interest}
              setInterest={setInterest}
              isXL={isXL}
            />
          </Grid>

          <Grid item xs={12} md={isXL ? 12 : 5}>
            <SingleCalculatorResult
              bikeName={bikeName}
              price={price}
              down={down}
              calculations={calculations}
              month={month}
              interest={interest}
              onOpenDialog={() => setDialogOpen(true)}
              onCopyText={handleTriggerCopyText}
              onOpenMobileImageModal={() => handleOpenMobileImageModal(exportQuotePosterRef)}
              isXL={isXL}
            />
          </Grid>
        </Grid>
      )}

      {/* MODE 2: ตารางผ่อนรวม (INSTALLMENT MATRIX TABLE) */}
      {appMode === 'matrix' && (
        <MatrixTable
          bikeName={bikeName}
          price={price}
          onPriceChange={handlePriceChange}
          adjustPrice={adjustPrice}
          matrixDownOptionType={matrixDownOptionType}
          setMatrixDownOptionType={setMatrixDownOptionType}
          matrixRows={matrixRows}
          onOpenMatrixMobileImageModal={() => handleOpenMobileImageModal(exportMatrixPosterRef)}
          isXL={isXL}
        />
      )}

      {/* DEDICATED OFF-SCREEN EXPORT CANVASES */}
      <ExportQuotePoster
        ref={exportQuotePosterRef}
        quoteExportMode={quoteExportMode}
        bikeName={bikeName}
        price={price}
        down={down}
        financing={calculations.financing}
        month={month}
        interest={interest}
        eachMonth={calculations.eachMonth}
        typeCode={typeCode}
        financeCode={financeCode}
        color={color}
        name={name}
        number={number}
        province={province}
        amphure={amphure}
        tambon={tambon}
        bgImageUrl={bgImageUrl}
      />

      <ExportTablePoster
        ref={exportMatrixPosterRef}
        bikeName={bikeName}
        price={price}
        matrixRows={matrixRows}
        monthOptions={MONTH_OPTIONS}
        defaultInterestRates={DEFAULT_INTEREST_RATES}
        bgImageUrl={bgImageUrl}
      />

      {/* Customer Details & Dual Export Mode Preview Modal */}
      <CustomerDetailsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        bikeName={bikeName}
        setBikeName={setBikeName}
        typeCode={typeCode}
        setTypeCode={setTypeCode}
        financeCode={financeCode}
        setFinanceCode={setFinanceCode}
        color={color}
        setColor={setColor}
        province={province}
        setProvince={setProvince}
        amphure={amphure}
        setAmphure={setAmphure}
        tambon={tambon}
        setTambon={setTambon}
        name={name}
        setName={setName}
        number={number}
        setNumber={setNumber}
        quoteExportMode={quoteExportMode}
        setQuoteExportMode={setQuoteExportMode}
        price={price}
        down={down}
        calculations={calculations}
        month={month}
        interest={interest}
        bgImageUrl={bgImageUrl}
        exportCardRef={exportCardRef}
        exportQuotePosterRef={exportQuotePosterRef}
        onDownloadCustomerQuote={() => {
          setQuoteExportMode('customer');
          setTimeout(() => handleDownloadImage(exportQuotePosterRef, `ใบเสนอราคาลูกค้า-${bikeName}.png`), 50);
        }}
        onDownloadFinanceQuote={() => {
          setQuoteExportMode('finance');
          setTimeout(() => handleDownloadImage(exportQuotePosterRef, `ใบเสนอราคาไฟแนนซ์-${bikeName}-${name || 'ลูกค้า'}.png`), 50);
        }}
        onOpenMobileImageModalFromDialog={() => {
          setDialogOpen(false);
          handleOpenMobileImageModal(exportQuotePosterRef);
        }}
        isExporting={isExporting}
        isXL={isXL}
      />

      {/* MOBILE LONG-PRESS IMAGE SAVE MODAL */}
      <MobileImagePreviewModal
        open={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        previewImageUrl={previewImageUrl}
      />

      {/* Snackbar Feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%', borderRadius: 3, fontSize: '1.15rem', py: 1 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
