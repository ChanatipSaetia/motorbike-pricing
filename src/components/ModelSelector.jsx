import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Autocomplete,
  TextField,
  InputAdornment,
} from '@mui/material';
import { DirectionsBike as DirectionsBikeIcon } from '@mui/icons-material';
import { YAMAHA_MODELS } from '../constants/yamahaModels';

export default function ModelSelector({
  bikeName,
  setBikeName,
  setBgImageUrl,
  isXL,
}) {
  const modelNames = YAMAHA_MODELS.map((b) => b.name);

  const handleSelectModel = (name) => {
    const val = name || '';
    setBikeName(val);
    const found = YAMAHA_MODELS.find((b) => b.name === val);
    if (found && setBgImageUrl) {
      setBgImageUrl(found.imageUrl);
    }
  };

  return (
    <Card sx={{ mb: isXL ? 3 : 2, borderColor: 'var(--color-border)', borderWidth: '2px' }}>
      <CardContent sx={{ p: isXL ? { xs: 2.5, sm: 3 } : { xs: 1.5, sm: 2 } }}>
        <Typography variant={isXL ? "h5" : "subtitle1"} fontWeight={800} sx={{ mb: isXL ? 1.5 : 0.75, color: 'var(--color-dark)' }}>
          🔹 เลือกรุ่นรถ YAMAHA
        </Typography>

        <Autocomplete
          freeSolo
          disablePortal
          options={modelNames}
          value={bikeName}
          onChange={(event, newValue) => {
            handleSelectModel(newValue);
          }}
          inputValue={bikeName}
          onInputChange={(event, newInputValue) => {
            handleSelectModel(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="เลือกรุ่นรถ YAMAHA หรือพิมพ์แก้ไขชื่อรุ่น"
              placeholder="เลือกจากรายการ หรือพิมพ์แก้ไขชื่อรุ่นได้"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <DirectionsBikeIcon color="primary" sx={{ fontSize: isXL ? 28 : 20 }} />
                    </InputAdornment>
                    {params.InputProps.startAdornment}
                  </>
                ),
                sx: { fontSize: isXL ? '1.4rem' : '0.95rem', fontWeight: 700, height: isXL ? 62 : 46 }
              }}
            />
          )}
        />
      </CardContent>
    </Card>
  );
}
