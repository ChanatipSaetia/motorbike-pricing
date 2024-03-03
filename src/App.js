import React from 'react'
import logo from './logo.svg';
import './App.css';
import { Container, TextField, Grid, Divider, styled, Button, Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toPng } from 'html-to-image';
import Autocomplete from '@mui/material/Autocomplete';
import data from './location.json'

const parsed_data = {}
for (let d of data) {
  let pv = d["name_th"]
  let pvd = {}
  for (let a of d["amphure"]) {
    let am = a["name_th"]
    let amp = []
    for (let t of a["tambon"]) {
      let tb = t["name_th"]
      amp.push(tb)
    }
    pvd[am] = amp
  }
  parsed_data[pv] = pvd
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  height: 600,
  overflowY: 'scroll'
};

const CssTextField = styled(TextField)({
  width: '100%',
  paddingTop: '20px',
  paddingBottom: '20px',
  '& label': {
    fontSize: "40px",
    color: 'red'
  },
  '& input': {
    fontSize: "40px"
  },
  '& legend span': {
    fontSize: "35px"
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
});

const BiggerAutocomplete = styled(Autocomplete)({
  width: '100% !important',
  '& .MuiFormControl-root': {
    width: '100%',
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  '& label': {
    fontSize: "40px",
    color: 'red'
  },
  '& input': {
    fontSize: "40px"
  },
  '& legend span': {
    fontSize: "35px"
  },

});

function App() {
  const [price, setPrice] = React.useState(80000)
  const elementRef = React.useRef(null);
  const handlePrice = (event) => {
    if (event.target.value !== "") {
      setPrice(parseInt(event.target.value.replace(/,/g, '')))
    } else {
      setPrice(0)
    }
  }

  const [down, setDown] = React.useState(10000)
  const handleDown = (event) => {
    if (event.target.value !== "") {
      setDown(parseInt(event.target.value.replace(/,/g, '')))
    } else {
      setDown(0)
    }
    
  }

  const [month, setMonth] = React.useState(12)
  const handleMonth = (event) => {
    if (event.target.value !== "") {
      const mm = parseInt(event.target.value)
      setMonth(mm)
      if (mm == 18) {
        setInterest("1.06")
      } else if (mm == 24) {
        setInterest("1.07")
      } else if (mm == 30) {
        setInterest("1.08")
      } else if (mm == 36) {
        setInterest("1.09")
      } else if (mm == 42) {
        setInterest("1.10")
      } else if (mm == 48) {
        setInterest("1.12")
      }
    } else {
      setMonth(0)
    }
  }

  const [interest, setInterest] = React.useState("1.07")
  const handleInterest = (event) => {
    if (event.target.value !== "") {
      setInterest(event.target.value)
    } else {
      setInterest("")
    }
  }

  let interestEachMonth = ((price - down) * parseFloat(interest)) / 100
  let overallInterest = (interestEachMonth * month)
  let overall = price + (interestEachMonth * month)
  let eachMonth = (overall - down) / month

  const handleSave = () => {
    setSaving('initial')
  }

  React.useEffect(() => {
    if (saving == 'initial') {
      toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
        setSaving('none')
      })
      .catch((err) => {
        console.log(err);
      });
    }
  })

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [typeCode, setTypeCode] = React.useState('');
  const [financeCode, setFinanceCode] = React.useState('');
  const [color, setColor] = React.useState('');
  const [name, setName] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [saving, setSaving] = React.useState('none')

  const codeMapping = {
    "B8B800": "701716N",
    "B8B900": "701717N",
    "BJK100": "701718",
    "BJK200": "701719",
    "B21900": "701914",
    "BB9A00": "70212N",
    "BKF100": "703201",
    "BKF300": "703202",
    "B1T400": "702108N",
    "BB8200": "702109N",
    "BBR500": "702319N",
    "BBR600": "702320N",
    "BBRA00": "702321N",
    "BKA200": "707408",
    "B6FH00": "702616",
    "B6FJ00": "702617",
    "B6FK00": "702618",
    "B6FL00": "702619",
    "BAW400": "701816",
    "BAW500": "701817"
  }
  const typeCodeOption = Object.keys(codeMapping)
  const financeCodeOption = Object.values(codeMapping)

  const [province, setProvince] = React.useState('ตราด');
  const [amphure, setAmphure] = React.useState('');
  const [tambon, setTambon] = React.useState('');
  return (
  <Container maxWidth="sm" sx={{paddingTop: '20px', paddingBottom: '100px'}}>
    <Grid container spacing={2}>
      <Grid item xs={12}><CssTextField id="outlined-basic" label="ราคา" variant="outlined" value={price.toLocaleString("en-US")} onChange={handlePrice}/></Grid>
      <Grid item xs={12}><CssTextField id="outlined-basic" label="ดาวน์" variant="outlined" value={down.toLocaleString("en-US")} onChange={handleDown}/></Grid>
      <Grid item xs={12}><CssTextField id="outlined-basic" label="ยอดจัด" variant="outlined" value={(price - down).toLocaleString("en-US")} /> </Grid>
      <Grid item xs={12}><CssTextField id="outlined-basic" label="ผ่อน (เดือน)" variant="outlined" value={month} onChange={handleMonth} /></Grid>
      <Grid item xs={12}><CssTextField id="outlined-basic" label="ดอกเบี้ย (%)" variant="outlined" value={interest} onChange={handleInterest} /> </Grid>
      <Divider sx={{width: "100%", borderWidth: "1px", marginTop: "10px" }}/>
      <Grid item xs={12}><CssTextField id="outlined-basic" label="รวม" variant="outlined" value={overall.toLocaleString("en-US")} /> </Grid>
      <Grid item xs={12}><CssTextField id="outlined-basic" label="ยอดที่เหลือ" variant="outlined" value={(overall - down).toLocaleString("en-US")} /> </Grid>
      <Grid item xs={12}><CssTextField id="outlined-basic" label="ดอกรวม" variant="outlined" value={overallInterest.toLocaleString("en-US")} /> </Grid>
      <Grid item xs={12}><CssTextField id="outlined-basic" label="ต่อเดือน" variant="outlined" value={eachMonth.toLocaleString("en-US")} /> </Grid>
      <Button variant="contained" sx={{width: '100%'}} onClick={handleOpen}>Save</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container sx={{flexDirection: "row-reverse"}} onClick={handleClose}>
            <IconButton color="primary" aria-label="close">
              <CloseIcon />
            </IconButton>
          </Grid>
          <BiggerAutocomplete
            freeSolo
            disablePortal
            inputValue={typeCode}
            onInputChange={(event, newInputValue) => {
              setTypeCode(newInputValue);
              if (codeMapping[newInputValue] !== undefined) {
                setFinanceCode(codeMapping[newInputValue]);
              }
            }}
            options={typeCodeOption}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="รหัสรุ่น" />}
          />
          <BiggerAutocomplete
            freeSolo
            disablePortal
            inputValue={financeCode}
            onInputChange={(event, newInputValue) => {
              setFinanceCode(newInputValue);
            }}
            options={financeCodeOption}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="รหัส Finance" />}
          />
          <BiggerAutocomplete
            freeSolo
            disablePortal
            inputValue={province}
            onInputChange={(event, newInputValue) => {
              setProvince(newInputValue);
	      setAmphure("");
	      setTambon("");
            }}
            options={Object.keys(parsed_data)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="จังหวัด" />}
          />
          <BiggerAutocomplete
            freeSolo
            disablePortal
            disabled={province === ""}
            inputValue={amphure}
            onInputChange={(event, newInputValue) => {
              setAmphure(newInputValue);
	      setTambon("");
            }}
            options={parsed_data[province] !== undefined ? Object.keys(parsed_data[province]) : []}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="อำเภอ" />}
          />
          <BiggerAutocomplete
            freeSolo
            disablePortal
            disabled={amphure === ""}
            inputValue={tambon}
            onInputChange={(event, newInputValue) => {
              setTambon(newInputValue);
            }}
            options={parsed_data[province] !== undefined && parsed_data[province][amphure] !== undefined ? parsed_data[province][amphure] : []}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="ตำบล" />}
          />
          <CssTextField id="outlined-basic" label="สี" variant="outlined" value={color}  onChange={(event) => {
            setColor(event.target.value)
          }} />
          <CssTextField id="outlined-basic" label="ชื่อเล่น" variant="outlined" value={name}  onChange={(event) => {
            setName(event.target.value)
          }} /> 
          <CssTextField id="outlined-basic" label="เบอร์" variant="outlined" value={number}  onChange={(event) => {
            setNumber(event.target.value)
          }} />  
          <Button variant="contained" sx={{width: '100%'}} onClick={handleSave}>Save</Button>
        </Box>
      </Modal>
    </Grid>

    <div style={{display: saving}}>
      <Grid container spacing={2} ref={elementRef} sx={{backgroundColor: 'white', padding: '20px'}}>
        <Grid item xs={12}><strong>ราคา</strong>: {price.toLocaleString("en-US")}</Grid>
        <Grid item xs={12}><strong>ดาวน์</strong>: {down.toLocaleString("en-US")}</Grid>
        <Grid item xs={12}><strong>ยอดจัด</strong>: {(price - down).toLocaleString("en-US")}</Grid>
        <Grid item xs={12}><strong>ผ่อน (เดือน)</strong>: {month}</Grid>
        <Grid item xs={12}><strong>ดอกเบี้ย (%)</strong>: {interest.toLocaleString("en-US")}</Grid>
        <Divider sx={{width: "100%", borderWidth: "1px", marginTop: "10px" }}/>
        <Grid item xs={12}><strong>รวม</strong>: {overall.toLocaleString("en-US")}</Grid>
        <Grid item xs={12}><strong>ยอดที่เหลือ</strong>: {(overall - down).toLocaleString("en-US")}</Grid>
        <Grid item xs={12}><strong>ดอกรวม</strong>: {overallInterest.toLocaleString("en-US")}</Grid>
        <Grid item xs={12}>ต<strong>่อเดือน</strong>: {eachMonth.toLocaleString("en-US")}</Grid>
        <Divider sx={{width: "100%", borderWidth: "1px", marginTop: "10px" }}/>
        <Grid item xs={12}><strong>รหัสรุ่น</strong>: {typeCode}</Grid>
        <Grid item xs={12}><strong>รหัส Finance</strong>: {financeCode}</Grid>
        <Grid item xs={12}><strong>สี</strong>: {color}</Grid>
        <Grid item xs={12}><strong>ชื่อเล่น</strong>: {name}</Grid>
        <Grid item xs={12}><strong>เบอร์</strong>: {number}</Grid>
        <Divider sx={{width: "100%", borderWidth: "1px", marginTop: "10px" }}/>
        <Grid item xs={12}><strong>จังหวัด</strong>: {province}</Grid>
        <Grid item xs={12}><strong>อำเภอ</strong>: {amphure}</Grid>
        <Grid item xs={12}><strong>ตำบล</strong>: {tambon}</Grid>
      </Grid>
    </div>
  </Container>
  );
}

export default App;

