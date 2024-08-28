const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { google } = require('googleapis');
const { MongoClient,ObjectId } = require('mongodb');
const port=5000;
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB setup
const dbName = 'registrationDB';
const collectionName = 'registrations';
const uri = "mongodb+srv://parthis1805:Parthiban1805@registeration.j2v4mdr.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=registeration";
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
  
const database = client.db(dbName);
const collection = database.collection(collectionName);

  
  
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
  

// Google Sheets API setup
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive.file'];
const CREDENTIALS = JSON.parse(fs.readFileSync('./vast-torus-433812-c5-ded7ea143272.json'));
const spreadsheetId = '1EiRGfsLb0V6ed9S4sXOJa0HFdFVADRUqXmucoy832GQ';

const authClient = new google.auth.GoogleAuth({
    credentials: CREDENTIALS,
    scopes: SCOPES,
});

const sheets = google.sheets('v4');
const drive = google.drive('v3');

// Function to upload file to Google Drive
const uploadFileToDrive = async (filePath, fileName) => {
    const auth = await authClient.getClient();

    const folderId = '1F1cJOw4rACbWVLI24tN1-yJ0dnz-kHM5';  // Replace with the folder ID where you want to upload
    const fileMetadata = {
        name: fileName,
        parents: [folderId]
    };
    const media = {
        mimeType: 'image/jpeg',  // Adjust according to your file type
        body: fs.createReadStream(filePath)
    };

    const response = await drive.files.create({
        auth,
        resource: fileMetadata,
        media: media,
        fields: 'id, webViewLink',
    });

    return response.data;
};

// Function to save data to Excel
// Function to append data to Google Sheets
const appendDataToGoogleSheet = async (data) => {
    const auth = await authClient.getClient();
    const request = {
        spreadsheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            values: [data],
        },
        auth,
    };
    await sheets.spreadsheets.values.append(request);
};

// Registration endpoint
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
        bloodGroup: req.body.bloodGroup,
        hORd: req.body.hORd,
        hostelNo: req.body.hostelNo,
        paymentScreenshot: req.file ? req.file.path : null,
        registerType: req.body.registerType,
        promotionDetails: req.body.registerType === "promotion" ? req.body.promotionDetails : undefined,
        promotionDetailsPerson: req.body.registerType === "promotion" ? req.body.promotionDetailsPerson : undefined,
        individualPerson: req.body.registerType === "individual" ? req.body.individualPerson : undefined,
        helpDeskOption: req.body.registerType === "help_desk" ? req.body.helpDeskOption : undefined,
    };

    try {
        // Upload file to Google Drive
        let driveData = null;
        if (req.file) {
            driveData = await uploadFileToDrive(req.file.path, req.file.originalname);
            registrationData.paymentScreenshot = driveData.webViewLink;  // Store the file's web view link
        }

        // Store data in MongoDB
        const result = await collection.insertOne(registrationData);
        console.log('Registration data stored in MongoDB:', result.insertedId);

        // Save to Excel
        saveToExcel(registrationData);
        console.log('Data saved to Excel.');

        // Prepare data for Google Sheets
        const sheetData = Object.values(registrationData);

        // Append data to Google Sheets
        await appendDataToGoogleSheet(sheetData);
        console.log('Data appended to Google Sheets.');

        res.status(200).json({ message: "Registration successful" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Failed to save registration" });
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
  app.delete('/delete/:id', async (req, res) => {
    const registrationId = req.params.id;

    try {
        const result = await collection.deleteOne({ _id: new ObjectId(registrationId) });
        if (result.deletedCount === 1) {
            console.log(`Successfully deleted registration with ID: ${registrationId}`);
            res.status(200).json({ message: "Registration deleted successfully" });

            // Optionally, if you want to remove it from Excel as well
            removeFromExcel(registrationId);
        } else {
            res.status(404).json({ message: "Registration not found" });
        }
    } catch (error) {
        console.error('Error deleting registration:', error);
        res.status(500).json({ message: 'Error deleting registration' });
    }
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