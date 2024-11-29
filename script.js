require('dotenv').config()
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { connectDB } = require('./models/index');


const { checkLoginAndRole } = require('./middleware/checkLoginAndRole');


const { indexViewRouter } = require('./routers/users/indexViewRouter')

const { loginViewRouter } = require('./routers/users/loginRouter');

const { logoutRouter } = require('./routers/users/logoutRouter')

const { doctorsViewRouter } = require('./routers/users/doctorsViewRouter');
const { doctorsInfoViewRouter } = require('./routers/users/doctorsInfoViewRouter');

const { bookConsultationViewRouter } = require('./routers/users/bookConsultationViewRouter');
const { userConsultationViewRouter } = require('./routers/users/userConsultationViewRouter');

const { reportsViewRouter } = require('./routers/users/reportsViewRouter');

const { getReportRouter } = require('./routers/users/getReportRouter');

const { aboutViewRouter } = require('./routers/users/aboutViewRouter');


const { userAdminRouter } = require('./routers/admin/userAdminRouter');
const { updateUserAdminRouter } = require('./routers/admin/update/updateUserAdminRouter');

const { departmentAdminRouter } = require('./routers/admin/departmentAdminRouter');

const { doctorAdminRouter } = require('./routers/admin/doctorAdminRouter');
const { updateDoctorAdminRouter } = require('./routers/admin/update/updateDoctorAdminRouter');

const { walkinPatientAdminRouter } = require('./routers/admin/walkinPatientAdminRouter');
const { updateWalkinPatientAdminRouter } = require('./routers/admin/update/updateWalkinPatientAdminRouter');

const { onlinePatientAdminRouter } = require('./routers/admin/onlinePatientAdminRouter');
const { updateOnlinePatientAdminRouter } = require('./routers/admin/update/updateOnlinePatientAdminRouter');

const { addConsultationAdminRouter } = require('./routers/admin/add/addConsultationAdminRouter');
const { updateConsultationRouter } = require('./routers/admin/update/updateConsultationRouter');


const { signupRouter } = require('./routers/api/loginAPIs/signupRouter');
const { emailVerificationRouter } = require('./routers/api/loginAPIs/emailVerficationRouter');
const { loginRouter } = require('./routers/api/loginAPIs/loginRouter');
const { forgetPasswordRouter } = require('./routers/api/loginAPIs/forgetPasswordRouter');
const { accountRecoveryRouter } = require('./routers/api/loginAPIs/accountRecoveryRouter');
const { changePasswordRouter } = require('./routers/api/loginAPIs/changePasswordRouter');

const { bookConsultationRouter } = require('./routers/api/user/bookConsultationRouter');


const { adminUpdateUsersRouter } = require('./routers/api/admin/update/adminUpdateUsersRouter');
const { adminAddUsersRouter } = require('./routers/api/admin/add/adminAddUsersRouter');
const { adminDeleteUsersRouter } = require('./routers/api/admin/delete/adminDeleteUsersRouter');
const { adminSearchUsersRouter } = require('./routers/api/admin/search/adminSearchUsersRouter');

const { adminUpdateDepartmentsRouter } = require('./routers/api/admin/update/adminUpdateDepartmentsRouter');
const { adminAddDepartmentsRouter } = require('./routers/api/admin/add/adminAddDepartmentsRouter');
const { adminDeleteDepartmentsRouter } = require('./routers/api/admin/delete/adminDeleteDepartmentsRouter');

const { adminUpdateDoctorsRouter } = require('./routers/api/admin/update/adminUpdateDoctorsRouter');
const { adminSearchDoctorsRouter } = require('./routers/api/admin/search/adminSearchDoctorsRouter');

const { adminUpdateWalkinPatientsRouter } = require('./routers/api/admin/update/adminUpdateWalkinPatientsRouter');
const { adminAddWalkinPatientsRouter } = require('./routers/api/admin/add/adminAddWalkinPatientsRouter');
const { adminDeleteWalkinPatientsRouter } = require('./routers/api/admin/delete/adminDeleteWalkinPatientsRouter');
const { adminSearchWalkinPatientsRouter } = require('./routers/api/admin/search/adminSearchWalkinPatientsRouter');

const { adminUpdateOnlinePatientsRouter } = require('./routers/api/admin/update/adminUpdateOnlinePatientsRouter');
const { adminSearchOnlinePatientsRouter } = require('./routers/api/admin/search/adminSearchOnlinePatientsRouter');

const { adminSearchTimeslotsRouter } = require('./routers/api/admin/search/adminSearchTimeslotsRouter');

const { adminAddWalkinConsultationRouter } = require('./routers/api/admin/add/adminAddWalkinConsultationRouter');
const { adminUpdateConsultationRouter } = require('./routers/api/admin/update/adminUpdateConsultationRouter');



const app = express();
const port = process.env.PORT;

connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use('/admin', checkLoginAndRole(['admin', 'staff'], '/', '/'));

app.use('/', indexViewRouter);
app.use('/index', indexViewRouter);
app.use('/home', indexViewRouter);

app.use('/login', loginViewRouter);

app.use('/logout', logoutRouter);

app.use('/doctors', doctorsViewRouter);
app.use('/doctors-info', doctorsInfoViewRouter);

app.use('/book-consultation', bookConsultationViewRouter);
app.use('/my-consultations', userConsultationViewRouter);

app.use('/lab-reports', reportsViewRouter)
app.use('/labReport', getReportRouter);

app.use('/about', aboutViewRouter)



app.use('/admin/users', userAdminRouter);
app.use('/admin/updateUsers', updateUserAdminRouter);


app.get('/admin/departments', (req, res) => {
    res.redirect('/admin/departments/page/1');
});
app.use('/admin/departments/page', departmentAdminRouter);


app.use('/admin/doctors', doctorAdminRouter);
app.use('/admin/updateDoctors', updateDoctorAdminRouter);

app.use('/admin/walkin-patients', walkinPatientAdminRouter);
app.use('/admin/updateWalkinPatients', updateWalkinPatientAdminRouter);

app.use('/admin/online-patients', onlinePatientAdminRouter);
app.use('/admin/updateOnlinePatients', updateOnlinePatientAdminRouter);

app.use('/admin/addConsultation', addConsultationAdminRouter);
app.use('/admin/updateConsultation', updateConsultationRouter);


app.use('/api/signup', signupRouter);
app.use('/api/verificationcode', emailVerificationRouter);
app.use('/api/login', loginRouter);
app.use('/api/forgetpassword', forgetPasswordRouter);
app.use('/api/accountrecoverycode', accountRecoveryRouter);
app.use('/api/changepassword', changePasswordRouter);

app.use('/api/book-consultation', bookConsultationRouter);

app.use('/api/updateUsers', adminUpdateUsersRouter);
app.use('/api/addUsers', adminAddUsersRouter);
app.use('/api/deleteUsers', adminDeleteUsersRouter);
app.use('/api/searchUsers', adminSearchUsersRouter);

app.use('/api/updateDepartments', adminUpdateDepartmentsRouter);
app.use('/api/addDepartments', adminAddDepartmentsRouter);
app.use('/api/deleteDepartments', adminDeleteDepartmentsRouter);

app.use('/api/updateDoctors', adminUpdateDoctorsRouter);
app.use('/api/searchDoctors', adminSearchDoctorsRouter);

app.use('/api/updateWalkinPatients', adminUpdateWalkinPatientsRouter);
app.use('/api/addWalkinPatients', adminAddWalkinPatientsRouter);
app.use('/api/deleteWalkinPatients', adminDeleteWalkinPatientsRouter);
app.use('/api/searchWalkin-patients', adminSearchWalkinPatientsRouter);

app.use('/api/updateOnlinePatients', adminUpdateOnlinePatientsRouter);
app.use('/api/searchOnline-patients', adminSearchOnlinePatientsRouter);

app.use('/api/searchTimeslot', adminSearchTimeslotsRouter);

app.use('/api/addWalkinConsultation', adminAddWalkinConsultationRouter);
app.use('/api/updateConsultation', adminUpdateConsultationRouter);

// testing

app.get('/getcache', async (req, res)=>{
    const { getValue } = require('./services/memcachedClient');
    const key = req.query.key;
    console.log(key);
    try {
        const value = await getValue(key);
        res.send(value);
    } catch (error) {
        console.error('Error retrieving value:', error);
        res.status(500).send('Error retrieving value');
    }
})

app.get('/getsession', async (req, res)=>{
    const key = req.query.key;
    const value = req.session[key];
    res.send(value);
});

app.get('/getusers', async (req, res)=>{
    const { User } = require('../SoftwareProject/models/userModel');
    const data = await User.find();
    res.send(data);
});

app.get('/getdoctors', async (req, res)=>{
    const { Doctor } = require('../SoftwareProject/models/doctorModel');
    // await Doctor.updateMany(

    //     { imagePath: { $exists: false } },  // Find documents without imagePath
    //     { $set: { imagePath: null } }       // Set imagePath to null
    //   );
    // await Doctor.updateMany(
    //     {},  // Empty filter object means apply to all documents
    //     { 
    //       $unset: { 
    //         privateOPD: 1  // Remove the `privateOPD` field
    //       }
    //     }
    //   );
    // const index = await Doctor.collection.getIndexes();
    // console.log(index);
    // await Doctor.collection.dropIndexes();
    const data = await Doctor.find();
    res.send(data);
});

app.get('/getpatients', async (req, res)=>{
    const { WalkinPatient } = require('../SoftwareProject/models/walkinPatientModel');
    // const index = await Doctor.collection.getIndexes();
    // console.log(index);
    // await Doctor.collection.dropIndexes();
    const data = await WalkinPatient.find();
    res.send(data);
});

app.get('/getwalkin', async (req, res)=>{
    const { WalkinPatient } = require('../SoftwareProject/models/walkinPatientModel');
    // await WalkinPatient.collection.dropIndex('labReportId_1')
    // const index = await WalkinPatient.collection.getIndexes();
    // console.log(index);
    // await Doctor.collection.dropIndexes();
    // db.walkinpatients.getIndexes();
    // await WalkinPatient.updateMany(
    //     {},  // Empty filter object means apply to all documents
    //     { 
    //       $unset: { 
    //         consultationId: 1  // Remove the `privateOPD` field
    //       }
    //     }
    // );
    const data = await WalkinPatient.find();
    res.send(data);
});
app.get('/getreports', async (req, res)=>{
    const { Report } = require('../SoftwareProject/models/reportModel');
    // const index = await Doctor.collection.getIndexes();
    // console.log(index);
    // await Doctor.collection.dropIndexes();
    // await Report.deleteMany({})
    // const patientId = '6730f00e52cd1ee78e5db2c5'
    // const patient = await Report.findByIdAndDelete(patientId);
    const data = await Report.find();
    // const crypto = require('crypto');

    // // Generate a random 256-bit key (32 bytes)
    // const key = crypto.randomBytes(32);  // 256 bits = 32 bytes
    // console.log('Generated Key:', key.toString('hex'));  // Key as hex string
    res.send(data);
});
app.get('/getonline', async (req, res)=>{
    const { OnlinePatient } = require('../SoftwareProject/models/onlinePatientModel');
    // const index = await OnlinePatient.collection.getIndexes();
    // console.log(index);
    // await OnlinePatient.collection.dropIndexes();
    // await OnlinePatient.deleteMany({})
    // const patientId = '6730db131acd4b476be33de8'
    // const patient = await OnlinePatient.findByIdAndDelete(patientId);
    // const userIds = ['67291956c4383a4c64125b6e', 
    //     '672981e970863ff770f348f7', '672981ee70863ff770f348fa']
    // for (const userId of userIds) {
    //     const newPatient = new OnlinePatient({
    //         userId: userId,  // Assign each userId to a new document
    //     });

    //     try {
    //         await newPatient.save();
    //         console.log(`Document for userId ${userId} saved successfully.`);
    //     } catch (error) {
    //         console.error('Error saving document:', error);
    //     }
    // }
    // const result = new OnlinePatient({
    //     userId,
    //   });
    // await OnlinePatient.deleteMany({})

    const data = await OnlinePatient.find();
    // const crypto = require('crypto');

    // // Generate a random 256-bit key (32 bytes)
    // const key = crypto.randomBytes(32);  // 256 bits = 32 bytes
    // console.log('Generated Key:', key.toString('hex'));  // Key as hex string
    res.send(data);
});

app.get('/gettimeslots', async (req, res)=>{
    const { Timeslot } = require('../SoftwareProject/models/doctorTimeslotModel');
    
    const data = await Timeslot.find();
    res.send(data);
});

app.get('/getconsultation', async (req, res)=>{
    const { Consultation } = require('../SoftwareProject/models/consultationModel');
    // await Consultation.deleteMany({})
    
    const data = await Consultation.find();
    res.send(data);
});
// app.get('/makedoctors', async (req, res)=>{
//     const { User } = require('../SoftwareProject/models/userModel')
//     const bcrypt = require('bcrypt');
//     let names = [" Arnie Forest", "Ally Langley", "Zandra Ibbott", "Milburn Burroughs", "Garry Piper",
//                 "Nina Murgatroyd", "Johnathan Wilson", "Carleton Fiddler", "Charmaine Garnier", "Alpha Daniel",
//                 "Liliana Nicholls", "Tiffani Derby", "Margie Day", "Kizzy Willey", "Derick Harmon",
//                 "Moira Nicolson", " Lilly Belcher ",  "Adelaide Prescott", " Vera Simms ", " Walter Trask ",
//                 " Amie Coke ", " Myron Quincey ", " Mortimer Giles ", " Kiera Dean ", " Kelvin Ecclestone ",
//                 " Kyla Chancellor ", " Murphy Wyman ", " Athena Daniels ", " Lottie Ashton ", " Sidney Wyman "
//     ];
//     names = names.map(name => name.trim());
//     let mail = [];
//     names.forEach(name => {
//         let mailPart = name.split(' ')[0];
//         mail.push(`${mailPart}@gmail.com`);
//     });
//     const password = 'password12';
//     const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ENCRYPTION_NUMBER));
//     const role = 'doctor';
//     for (let i = 0; i < names.length; i++) {
//         const user = new User({
//             name: names[i],  // Full name
//             email: mail[i],   // Corresponding email
//             password: hashedPassword,  // Hashed password
//             role: role        // Role ('doctor')
//         });
    
//         try {
//             await user.save();  // Save user to database
//             console.log(`User ${names[i]} saved successfully!`);
//         } catch (error) {
//             console.error(`Error saving user ${names[i]}: ${error.message}`);
//         }
//     }


    // res.send(mail);
    // // name: {
    // // },
    // // email: {
    // // },
    // // password: {
    // // },
    // // role:{
    // //     enum: ['user', 'doctor', 'staff', 'admin'], 
    // // },
// });



// app.use('/change', async (req, res) => {
//     const { Consultation } = require('./models/consultationModel');
//     const consultation = await Consultation.findById('6738181cde0847bdc9343e1f');
//     consultation.status = 'completed';
//     console.log(consultation);
//     await consultation.save();
//     res.send('done');
// });

app.use('*', (req, res) => {
    return res.redirect('/home');  // Redirect all other routes to home page '/'
});

app.listen(port);



//4)login page and backend(17)
//index and backend(17)
//9)error notification (17)