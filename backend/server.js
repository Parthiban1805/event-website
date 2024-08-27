const express = require('express');
const multer = require('multer');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const xlsx = require('xlsx'); // Add this line to include xlsx
const app = express();
const port = 5000;
const dbName = 'registrationDB';
const collectionName = 'registrations';
const uri = `mongodb+srv://parthis1805:Parthiban1805@registeration.j2v4mdr.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=registeration`;
const uploadDir = 'uploads';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}
connectToMongoDB();

function saveToExcel(data) {
  console.log('Register endpoint hit.');

  const excelFile = path.join(__dirname, 'registrations.xlsx');
  console.log(`Saving to Excel file at: ${excelFile}`);

  let workbook;
  if (fs.existsSync(excelFile)) {
    workbook = xlsx.readFile(excelFile);
    console.log('Existing file found, updating it.');
  } else {
    workbook = xlsx.utils.book_new();
    console.log('No existing file found, creating a new one.');
  }

  const sheetName = 'Registrations';
  let worksheet = workbook.Sheets[sheetName];

  if (!worksheet) {
    worksheet = xlsx.utils.json_to_sheet([]);
    xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
  }

  const dataJson = xlsx.utils.sheet_to_json(worksheet);
  dataJson.push(data);

  const updatedWorksheet = xlsx.utils.json_to_sheet(dataJson);
  workbook.Sheets[sheetName] = updatedWorksheet;

  xlsx.writeFile(workbook, excelFile);
  console.log('Excel file saved successfully.');
}


app.post('/register', upload.single('paymentScreenshot'), async (req, res) => {
  fs.access(uploadDir, fs.constants.W_OK, (err) => {
    if (err) {
      console.error('Directory is not writable:', err);
    } else {
      console.log('Directory is writable');
    }
  });

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  console.log('Register endpoint hit.');

  try {
    const registrationData = {
      name: req.body.name,
      gender: req.body.gender,
      dob: req.body.dob,
      email: req.body.email,
      phone: req.body.phone,
      regNo: req.body.regNo,
      course: req.body.course,
      program: req.body.program,
      bloodGroup: req.body.bloodGroup,
      hORd: req.body.hORd,
      hostelID: req.body.hostelID,
      paymentScreenshot: `/uploads/${req.file.filename}`,
      registerType: req.body.registerType,
      promotionDetails: req.body.registerType === "promotion" ? req.body.promotionDetails : undefined,
      promotionDetailsPerson: req.body.registerType === "promotion" ? req.body.promotionDetailsPerson : undefined,
      individualPerson: req.body.registerType === "individual" ? req.body.individualPerson : undefined,
      helpDeskOption: req.body.registerType === "help_desk" ? req.body.helpDeskOption : undefined,
    };

    console.log('Uploaded file:', req.file);

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Store data in MongoDB
    const result = await collection.insertOne(registrationData);
    console.log('Registration data stored in MongoDB:', result.insertedId);

    // Store data in Excel
    saveToExcel(registrationData);

    res.status(200).send('Registration successful!');
  } catch (error) {
    console.error('Error storing data in MongoDB:', error.message);
    res.status(500).send(`Error storing data: ${error.message}`);
  }
});

app.get('/table', async (req, res) => {
  try {
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const results = await collection.find({}).toArray();
    console.log('Data fetched successfully:', results);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).send('Error fetching data');
  }
});

app.post('/admin-login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const database = client.db("adminDB");
    const collection = database.collection("signup");
    const admin = await collection.findOne({ email });
    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (isMatch) {
        res.status(200).json({ message: "Signin successful" });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});
app.get('/download-excel', (req, res) => {
  const filePath = path.join(__dirname, 'registrations.xlsx');
  res.download(filePath, 'registrations.xlsx', (err) => {
    if (err) {
      console.error('Error downloading the file:', err);
      res.status(500).send('Error downloading the file.');
    }
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

process.on('SIGINT', async () => {
  await client.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});
