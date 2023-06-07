const express = require('express');
const bodyParser = require('body-parser');
const ExcelJS = require('exceljs');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));


const dataFilePath = path.join(__dirname, 'public', 'data.xlsx');
console.log(`Data file path is: ${dataFilePath}`); 



// saving data:


app.post('/submit-form', async (req, res) => {
  const { customerName, dateTime, itemID, comments, emailPhone, technician } = req.body;

  const workbook = new ExcelJS.Workbook();
  try {
    await workbook.xlsx.readFile(dataFilePath);
    console.log('File read successfully');
  } catch (err) {
    console.log('No file found. A new file will be created.');
  }

  const worksheet = workbook.getWorksheet(1) || workbook.addWorksheet("Form Data");


  if (worksheet.getRow(1).values.length < 2) {
    worksheet.columns = [
      { header: 'Requester', key: 'customerName', width: 20 },
      { header: 'Item ID', key: 'itemID', width: 20 },
      { header: 'Date and Time', key: 'dateTime', width: 30 },
      { header: 'Comments', key: 'comments', width: 50 },
      { header: 'Email/Phone', key: 'emailPhone', width: 30 },
      { header: 'Technician', key: 'technician', width: 30 },
    ];
  }

  
  worksheet.addRow(Object.values(req.body)).commit();


  workbook.xlsx.writeFile(dataFilePath).then(() => {
      console.log('Data saved to data.xlsx');
      res.redirect('/');
  }).catch((err) => {
      console.error(err);
      res.send('Error saving form data!');
  });
});



// extracting data:


app.get('/get-data', async (req, res) => {
  const workbook = new ExcelJS.Workbook();
  try {
    console.log("Reading file...");  
    await workbook.xlsx.readFile(dataFilePath);
    console.log("File read successfully"); 

    const worksheet = workbook.getWorksheet(1);
    const data = worksheet.getRows(2, worksheet.rowCount).map(row => {
      return {
        customerName: row.getCell(1).value,
        itemID: row.getCell(2).value,
        dateTime: row.getCell(3).value,
        comments: row.getCell(4).value,
        emailPhone: row.getCell(5).value,
        technician: row.getCell(6).value
      };
    });
    res.json(data);
  } catch (err) {
    console.error("Error Details: ", err);
    res.send('Error reading form data!');
  }
});


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

