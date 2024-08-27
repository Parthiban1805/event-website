const express = require('express');
const multer = require('multer');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const xlsx = require('xlsx');

const app = express();
const port = 3001;

const dbName = 'registrationDB';
const collectionName = 'registrations';
const uri = `mongodb+srv://parthis1805:Parthiban1805@registeration.j2v4mdr.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=registeration`;
const uploadDir = path.join(__dirname, 'uploads');
const excelFilePath = path.join(__dirname, 'registration.xlsx');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect().catch(error => {
  console.error('Error connecting to MongoDB:', error);
});

const database = client.db(dbName);
const collection = database.collection(collectionName);

// Function to save data to Excel
const saveToExcel = (data) => {
  let workbook;
  let worksheet;

  if (fs.existsSync(excelFilePath)) {
    workbook = xlsx.readFile(excelFilePath);
    worksheet = workbook.Sheets['Registrations'];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);
    jsonData.push(data);
    worksheet = xlsx.utils.json_to_sheet(jsonData);
  } else {
    workbook = xlsx.utils.book_new();
    worksheet = xlsx.utils.json_to_sheet([data]);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Registrations');
  }

  workbook.Sheets['Registrations'] = worksheet;
  xlsx.writeFile(workbook, excelFilePath);
};

app.post('/register', upload.single('paymentScreenshot'), async (req, res) => {
  const registrationData = {
    name: req.body.name,
    gender: req.body.gender,
    dob: req.body.dob,
    email: req.body.email,
    phone: req.body.phone,
    regNo: req.body.regNo,
    course: req.body.course,
    program: req.body.program,
    blood: req.body.bloodGroup,
    hORd: req.body.hORd,
    hostelID: req.body.hostelID,
    paymentScreenshot: `/uploads/${req.file.filename}`,  
  };

  try {
    // Store data in MongoDB
    const result = await collection.insertOne(registrationData);
    console.log('Registration data stored in MongoDB:', result.insertedId);

    // Store data in Excel
    saveToExcel(registrationData);

    res.status(200).send('Registration successful!');
  } catch (error) {
    console.error('Error storing data:', error);
    res.status(500).send('Error storing data');
  }
});

app.get('/table', async (req, res) => {
  try {
    const results = await collection.find({}).toArray();
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).send('Error fetching data');
  }
});

app.post('/admin-login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await collection.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      res.status(200).json({ message: "Signin successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});