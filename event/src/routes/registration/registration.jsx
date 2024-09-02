import axios from "axios";
import QRCode from "qrcode.react";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "./registration.css";

const RegistrationPage = () => {
  const navigate = useNavigate(); // Create a navigate function

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [regNo, setRegNo] = useState("");
  const [course, setCourse] = useState("");
  const [program, setProgram] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [hORd, setHorD] = useState("");
  const [hostelNo, setHostelNo] = useState("");
  const [upiLink, setUpiLink] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [Register, setRegister] = useState("");
  const[UpiLink1,setUpiLink1]=useState("");
  const[others,setOthers]=useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Perform validation
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!gender) newErrors.gender = "Gender is required";
    if (!dob) newErrors.dob = "Date of Birth is required";
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Valid email is required";
    if (!phone) newErrors.phone = "Phone number is required";
    if (!regNo) newErrors.regNo = "Registration number is required";
    if (!course) newErrors.course = "Course is required";
    if (!program) newErrors.program = "Program is required";
    if (!bloodGroup) newErrors.bloodGroup = "Blood group is required";
    if (bloodGroup === "others" && !others) newErrors.others = "Blood group is required";
    if (!hORd) newErrors.hORd = "Hosteller/Dayscholar status is required";
    if (hORd === "Hosteller") {
      if (!hostelNo) {
          newErrors.hostelNo = "Please enter your hostel number after 'BH-'";
      } 
  }

  if (!Register) newErrors.Register = "Referred by? is required";
    if (!paymentScreenshot) newErrors.paymentScreenshot = "Payment screenshot is required";
    if (Object.keys(newErrors).length > 0) {
      const errorMessages = Object.values(newErrors).join("\n");
      swal({
        title: "Form Validation Error",
        text: errorMessages,
        icon: "error",
        button: "Ok",
      });
      return; // Stop the function if there are validation errors
    }
  
    // Prepare FormData
    const formData = new FormData();
    formData.append("name", name);
    formData.append("gender", gender);
    formData.append("dob", dob);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("regNo", regNo);
    formData.append("course", course);
    formData.append("program", program);
    formData.append("bloodGroup", bloodGroup);
    formData.append("hORd", hORd);
    formData.append("hostelNo", hostelNo);
    formData.append("registerType", Register);
    formData.append("paymentScreenshot",paymentScreenshot);
  
    
    setLoading(true);
  
    try {
      const response = await axios.post("https://event-website-main.onrender.com/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const message = response.data.message || "Operation successful";
  
      swal({
        title: "Registration Successful!",
        text: message,
        content: {
          element: "div",
          attributes: {
            innerHTML: `
              <p>For any queries, please contact:</p>
              <ul>
                <li>Lakshan Raghav J R: <a href="tel:+918610590584">+91 86105 90584</a></li>
                <li>Harshavardhan: <a href="tel:+919963652827">+91 99636 52827</a></li>
                <li>Vikirthan: <a href="tel:+918190022020">+91 81900 22020</a></li>
              </ul>
            `,
          },
        },
        icon: "success",
      }).then(() => {
        navigate("/run-for-equality");
      });
    
      // Reset the form after successful submission
      setName("");
      setGender("");
      setDob("");
      setEmail("");
      setPhone("");
      setRegNo("");
      setCourse("");
      setProgram("");
      setBloodGroup("");
      setHorD("");
      setHostelNo("");
      setPaymentScreenshot(null);
    } catch (error) {
      console.error("Error submitting form: ", error);
      swal("Registration failed", "Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    const validTypes = ["image/png", "image/jpeg"];
    if (file && !validTypes.includes(file.type)) {
      swal("Invalid file type", "Please upload a file in PNG or JPEG format.", "error");
      return;
    }
  
    if (file && file.size > 2* 1024 * 1024) { // 2MB limit
      swal("File too large", "Please upload a file smaller than 2MB.", "error");
      return;
    }
  
    setPaymentScreenshot(file);
  };
  

  const handlePaymentConfirmation = () => {
    if (!paymentScreenshot) {
      swal("Error", "Please upload a screenshot of the payment.", "error");
      return;
    }

    setPaymentConfirmed(true);
    swal("Payment confirmed", "Your payment has been confirmed successfully!", "success");
  };

  const handlePaymentClick = () => {
    const googlePayUpiID = "kobikags-2@oksbi";
    const googlePayUpiID1 = "vikirthan06-2@okhdfcbank";

    const amount = 100;

    const upiIntentUrl = `upi://pay?pa=${googlePayUpiID}&pn=Your Company Name&am=${amount}&cu=INR`;
    const upiIntentUrl1 = `upi://pay?pa=${googlePayUpiID1}&pn=Your Company Name&am=${amount}&cu=INR`;

    setUpiLink(upiIntentUrl);
    setUpiLink1(upiIntentUrl1);
    setShowPaymentOptions(true);
  };

  return (
    <div className="registration-page-container">
      <div className="registration-page-header">
        <h1 style={{ color: "black" }}>Register here</h1>
      </div>
      <form className="registration-form" onSubmit={handleSubmit}>
        {Object.keys(errors).map((errorKey) => (
          <div key={errorKey} className="error-message">
            {errors[errorKey]}
          </div>
        ))}
        <div className="field">
          <h3 className="field-title">Name</h3>
          <input
            type="text"
            className="field-input"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <h3 className="field-title">Gender</h3>
          <select
            className="field-input"
            value={gender}
            required
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="field">
          <h3 className="field-title">Date of Birth</h3>
          <input
            type="date"
            className="field-input"
            required
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className="field">
          <h3 className="field-title">Phone Number</h3>
          <PhoneInput
            country={"in"}
            value={phone}
            required
            onChange={(phone) => setPhone(phone)}
            inputStyle={{ width: "90%" }}
          />
        </div>
        <div className="field">
          <h3 className="field-title">Email</h3>
          <input
            type="email"
            className="field-input"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <h3 className="field-title">Registration Number</h3>
          <input
            type="text"
            className="field-input"
            required
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
          />
        </div>
        <div className="field">
          <h3 className="field-title">Course</h3>
          <select
            className="field-input"
            value={course}
            required
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value="">Select</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="B.Com">B.Com</option>
            <option value="B.Sc">B.Sc</option>
            <option value="M.Sc">M.Sc</option>
            <option value="BBA">BBA</option>
            <option value="MBA">MBA</option>
            <option value="BA">BA</option>
            <option value="BA.Arch"> BA.Arch</option>


          </select>
        </div>
        <div className="field">
          <h3 className="field-title">Specify program</h3>
          <input
            type="text"
            className="field-input"
            required
            value={program}
            onChange={(e) => setProgram(e.target.value)}
          />
        </div>
        <div className="field">
          <h3 className="field-title">Blood Group</h3>
          <select
            className="field-input"
            value={bloodGroup}
            required
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="others">Others</option>
          
          </select>
        </div>
        {bloodGroup === "others" && (
          <div className="field">
            <h3 className="field-title">Blood-Group</h3>
            <input
              type="text"
              required
              className="field-input"
              value={others}
              onChange={(e) => setOthers(e.target.value)}
            />
          </div>
        )}
        <div className="field">
          <h3 className="field-title">Referred by?</h3>
          <input
            type="text"
            minLength={3}
            className="field-input"
            value={Register}
            required
            onChange={(e) => setRegister(e.target.value)}
         />
        
        </div>

        <div className="field">
          <h3 className="field-title">Hosteller / Day scholar</h3>
          <select
            className="field-input"
            value={hORd}
            required
            onChange={(e) => setHorD(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Hosteller">Hosteller</option>
            <option value="Dayscholar">Dayscholar</option>
          </select>
        </div>
        {hORd === "Hosteller" && (
          <div className="field">
            <h3 className="field-title">Hostel Number</h3>
            <input
              type="text"
              className="field-input"
              required={hORd === "Hosteller"}
              value={hostelNo} 
              minLength={2}
              onChange={(e) => setHostelNo(e.target.value)} 
            />
          </div>
        )}
        <div className="field">
          <h3 className="field-title">Confirm payment</h3>
          <button
            className="confirm-button"
            type="button"
            required
            onClick={handlePaymentClick}
          >
            Make Payment
          </button>
        </div>
        {showPaymentOptions && (
          <div>
        <div className="field">
          <h3 className="field-title">UPI ID: kobikags-2@oksbi</h3>
          <a href={upiLink} target="_blank" rel="noopener noreferrer" className="upi-link">
            <button type="button" className="upi-button">
              Pay ₹100
            </button>
          </a>
        </div>
        <div className="field">
          <h3 className="field-title">UPI ID: vikirthan06-2@okhdfcbank</h3>
          <a href={UpiLink1} target="_blank" rel="noopener noreferrer" className="upi-link1">
            <p className="upi-or">or</p>
            <button type="button" className="upi-button1">
              Pay ₹100
            </button>
          </a>
        </div>
            <div className="field">
              <h3 className="field-title">Upload payment screenshot</h3>
              <input type="file" 
              required
              name="paymentScreenshot" onChange={handleFileChange} />
            </div>
            <div className="field">
              <button
                className="confirm-button"
                type="button"
                onClick={handlePaymentConfirmation}
              >
                Confirm Payment
              </button>
            </div>
            <div className="field">
              <h3 className="field-title">Scan to Pay</h3>
              <QRCode value={upiLink} />
            </div>
          </div>
        )}
        <div className="field">
          <button className="submit-button" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;