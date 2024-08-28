const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { google } = require('googleapis');
const { MongoClient } = require('mongodb');

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

client.connect().catch(error => {
    console.error('Error connecting to MongoDB:', error);
});
const database = client.db(dbName);
const collection = database.collection(collectionName);

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
const saveToExcel = (data) => {
    const filepath = path.join(__dirname, 'registration.xlsx');
    let workbook;
    let worksheet;

    if (fs.existsSync(filepath)) {
        workbook = xlsx.readFile(filepath);
        worksheet = workbook.Sheets['Registrations'] || workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = xlsx.utils.sheet_to_json(worksheet) || [];
        jsonData.push(data);
        worksheet = xlsx.utils.json_to_sheet(jsonData);
    } else {
        workbook = xlsx.utils.book_new();
        worksheet = xlsx.utils.json_to_sheet([data]);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Registrations');
    }

    workbook.Sheets['Registrations'] = worksheet;
    xlsx.writeFile(workbook, filepath);
};

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
        paymentScreenshot: req.file ? req.file.path : null
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

app.listen(3001, () => {
    console.log('Server started on port 3001');
});