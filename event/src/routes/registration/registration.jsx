import axios from "axios";
import QRCode from "qrcode.react";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./registration.css";
import swal from "sweetalert"; 
import { useNavigate } from "react-router-dom";

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
  const [promotionDetails, setPromotionDetails] = useState("");
  const [promotionDetailsPerson, setPromotionDetailsPerson] = useState("");
  const [IndividualPerson, setIndividualPerson] = useState("");
  const [helpDesk, setHelpDesk] = useState("");



  useEffect(() => {
    if (hORd === "Hosteller") {
      if (gender === "male") {
        setHostelNo("BH-");
      } else if (gender === "female") {
        setHostelNo("GH-");
      }
    } else {
      setHostelNo(""); 
    }
  }, [gender, hORd]);

  const validateForm = () => {
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
    if (!hORd) newErrors.hORd = "Hosteller/Dayscholar status is required";
    if (hORd === "Hosteller" && !hostelNo) newErrors.hostelNo = "Hostel number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
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
    formData.append("hostelID", hostelNo);
    formData.append("helpDesk", helpDesk);
    
    formData.append("registerType", Register);
  
    if (Register === "promotion") {
      formData.append("promotionDetails", promotionDetails);
      formData.append("promotionDetailsPerson", promotionDetailsPerson);
    } else if (Register === "individual") {
      formData.append("individualPerson", IndividualPerson);
    } else if (Register === "help_desk") {
      formData.append("helpDeskOption", helpDesk);  // Append help desk option
    }
  

    if (paymentScreenshot) {
      formData.append("paymentScreenshot", paymentScreenshot);
    }

  
    console.log("FormData contents:", formData);
    setLoading(true);
    axios
      .post("https://event-website-main.onrender.com/register", formData)
      .then(() => {
        swal({
          title: "Registration Successful!",
          text: "For any queries, please contact:",
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
              `
            }
          },
          icon: "success"
        }).then(() => {
          navigate("/run-for-equality"); 
        });
  
        setPaymentConfirmed(false);
        setShowPaymentOptions(false);
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
        setUpiLink("");
        setPaymentScreenshot(null);
        setPromotionDetails("");
        setPromotionDetailsPerson("");
        setIndividualPerson("");
        setHelpDesk("");
        setErrors({});
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || "Registration failed, please try again.";
        swal("Registration failed", errorMessage, "error");
            })
      .finally(() => {
        setLoading(false);
      });
  };
  

  const handleFileChange = (e) => {
    setPaymentScreenshot(e.target.files[0]);
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
    const googlePayUpiID = "vikirthan06-1@oksbi";
    const amount = 100;

    const upiIntentUrl = `upi://pay?pa=${googlePayUpiID}&pn=Your Company Name&am=${amount}&cu=INR`;

    setUpiLink(upiIntentUrl);
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <h3 className="field-title">Gender</h3>
          <select
            className="field-input"
            value={gender}
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
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className="field">
          <h3 className="field-title">Phone Number</h3>
          <PhoneInput
            country={"in"}
            value={phone}
            onChange={(phone) => setPhone(phone)}
            inputStyle={{ width: "90%" }}
          />
        </div>
        <div className="field">
          <h3 className="field-title">Email</h3>
          <input
            type="email"
            className="field-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <h3 className="field-title">Registration Number</h3>
          <input
            type="text"
            className="field-input"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
          />
        </div>
        <div className="field">
          <h3 className="field-title">Course</h3>
          <select
            className="field-input"
            value={course}
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
          </select>
        </div>
        <div className="field">
          <h3 className="field-title">Specify program</h3>
          <input
            type="text"
            className="field-input"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
          />
        </div>
        <div className="field">
          <h3 className="field-title">Blood Group</h3>
          <select
            className="field-input"
            value={bloodGroup}
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
          </select>
        </div>
        <div className="field">
          <h3 className="field-title">Under which category did you register?</h3>
          <select
            className="field-input"
            value={Register}
            onChange={(e) => setRegister(e.target.value)}
          >
            <option value="">Select</option>
            <option value="promotion">Hostel promotion</option>
            <option value="individual">Individual</option>
            <option value="social_media">Social Media</option>
            <option value="help_desk">Help desk</option>

          </select>
        </div>
        {Register === "promotion" && (
          <>
            <div className="field">
              <h3 className="field-title">Hostel Number</h3>
              <input
                type="text"
                className="field-input"
                value={promotionDetails}
                onChange={(e) => setPromotionDetails(e.target.value)}
              />
            </div>
            <div className="field">
              <h3 className="field-title">Person Promoting</h3>
              <input
                type="text"
                className="field-input"
                value={promotionDetailsPerson}
                onChange={(e) => setPromotionDetailsPerson(e.target.value)}
              />
            </div>
          </>
        )}
        {Register === "individual" && (
          <div className="field">
            <h3 className="field-title">Individual Person</h3>
            <input
              type="text"
              className="field-input"
              value={IndividualPerson}
              onChange={(e) => setIndividualPerson(e.target.value)}
            />
          </div>
        )}
       {Register === "help_desk" && (
        <div className="field">
          <h3 className="field-title">Help Desk Options</h3>
          <select
            className="field-input"
            value={helpDesk}
            onChange={(e) => setHelpDesk(e.target.value)}
          >
            <option value="">Select</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
            <option value="5">Option 5</option>
          </select>
        </div>
      )}



        <div className="field">
          <h3 className="field-title">Hosteller / Day scholar</h3>
          <select
            className="field-input"
            value={hORd}
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
              value={hostelNo} 
              onChange={(e) => setHostelNo(e.target.value)} 
            />
          </div>
        )}
        <div className="field">
          <h3 className="field-title">Confirm payment</h3>
          <button
            className="confirm-button"
            type="button"
            onClick={handlePaymentClick}
          >
            Make Payment
          </button>
        </div>
        {showPaymentOptions && (
          <div>
            <div className="field">
              <h3 className="field-title">UPI ID:vikirthan06-1@oksbi</h3>
              <a href={upiLink} target="_blank" rel="noopener noreferrer">
                <p type="button">
                  Pay ₹100
                </p>
              </a>
            </div>
            <div className="field">
              <h3 className="field-title">Upload payment screenshot</h3>
              <input type="file" onChange={handleFileChange} />
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
