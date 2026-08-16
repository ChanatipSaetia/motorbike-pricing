import data from '../location.json';

// Parse location JSON once outside component
export const parsedData = {};
if (Array.isArray(data)) {
  for (const d of data) {
    const pv = d.name_th;
    const pvd = {};
    if (d.amphure) {
      for (const a of d.amphure) {
        const am = a.name_th;
        const amp = [];
        if (a.tambon) {
          for (const t of a.tambon) {
            amp.push(t.name_th);
          }
        }
        pvd[am] = amp;
      }
    }
    parsedData[pv] = pvd;
  }
}

export const getAmphureOptions = (province) => {
  return parsedData[province] ? Object.keys(parsedData[province]) : [];
};

export const getTambonOptions = (province, amphure) => {
  return (parsedData[province] && parsedData[province][amphure])
    ? parsedData[province][amphure]
    : [];
};
