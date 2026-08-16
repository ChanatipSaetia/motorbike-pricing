import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const manifestPath = path.join(publicDir, 'okf-manifest.json');
const manifestData = {
  name: 'Motorbike Pricing & Installment Calculator',
  dealer: 'เตียหมงไถ่ ตราด',
  updatedAt: new Date().toISOString(),
  timestamp: Date.now(),
};

fs.writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2), 'utf8');
console.log('Successfully updated OKF manifest at:', manifestPath);
