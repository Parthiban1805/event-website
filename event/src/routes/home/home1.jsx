import React from 'react';
import { useEffect } from 'react';
import feedingbellies from '../../assets/FEEDING BELLIES/img7.png';
import joyofgiving from '../../assets/JOY OF GIVING/img4.png';
import nari from '../../assets/NARI/img1.png';
import physio from '../../assets/PHYSIO/img1.png';
import placeholder from '../../assets/placeholder.png';
import rfe from '../../assets/runforequality.png';
import swachhbharat from '../../assets/SWACHH BHARAT/img3.png';
import bg from '../../assets/Untitled (1).png';
import Card from '../../components/card/card';
import Run_for_equality_2023 from '../../assets/Run_for_equality-2023.jpg'
import plantation from '../../assets/plantation.png'
import rivals from '../../assets/rivals.png'
import smash from '../../assets/smashit.png'
import voter from '../../assets/voter.png'
import nari1 from '../../assets/nari.png'
import cancer from '../../assets/cancer.png'
import samarpan from '../../assets/smarpan.jpeg';
import { Helmet } from 'react-helmet';

import './home1.css';

const Home = () => {
    useEffect(() => {
        setTimeout(() => {
          document.getElementById('register-now').scrollIntoView({ behavior: 'smooth' });
        }, 3000);
      }, []);

    return (
        <div className="home-page1-container">
          <Helmet>
                <title>National Service Scheme (NSS) - Lovely Professional University</title>
                <meta name="description" content="Join LPUNSS for events like Run for Equality Foster community service and social responsibility with us." />
                <meta name="keywords" content="LPUNSS, Run for Equality, Plantation Drive, Physiotherapy, Cancer Awareness,unit prabhaat,registration of run for equality" />
            </Helmet>

        <section className="home-page1-hero-section">
          <img src={bg} alt="Hero Background of National Service Scheme at Lovely Professional University" className="home-page1-hero-image" />
        </section>
  
        <section id="register-now" className="register-now">
          <p className="register-content">
            <span style={{ color: "gray", fontSize: "35px" }}>"</span>
            Registration for the Run for Equality 2.0 - 2024 is open now!
            <a href="/registration" style={{ color: "#ff4500", textDecoration: "none" }}> Click here to register</a>
            <span style={{ color: "gray", fontSize: "35px" }}>"</span>
          </p>
        </section>
  
        <section className="home-page1-sub-header">
          <h1 className="motto1">
            <span style={{ color: "#ff4500" }}>Our Motto </span>
            <span style={{ color: "gray", fontSize: "30px" }}>"</span>
            Not me, Not you, But we
            <span style={{ color: "gray", fontSize: "30px" }}>"</span>
          </h1>
        </section>
  
        <section className="home-page1-about-section">
          <div className="home-page1-about-contents">
            <h1 className="about-section-header1">About us</h1>
            <p className="about-section-para1">
            Welcome to the National Service Scheme (NSS) at <a href="https://www.lpu.in/" style={{ color: "#ff4500", textDecoration: "none" }}>Lovely Professional University</a> (LPUNSS)!
            </p>
          </div>
          <div className="home-page1-mission-contents">
            <h1 className="mission1">Our Mission</h1>
            <p className="mission-para1">
              The National Service Scheme (NSS) at Lovely Professional University, known as LPUNSS, is dedicated to fostering social responsibility and community service among students. Established with the motto "Not Me, Not You, But We" LPUNSS aims to inculcate the spirit of selfless service, leadership, and community engagement in our student volunteers.
            </p>
          </div>
        </section>
  
        <section className="events-section1">
          <p className="events-title1">~Upcoming Events</p>
          <div className="events-card-container1">
            <Card
              title="Run for equality 2.0"
              img={rfe}
              alt="Run for Equality"
              navlink={{ pathname: '/registration' }}
            />
          </div>
        </section>
  
        <section className="events-section1">
          <p className="events-title1">~Social Events</p>
          <div className="events-card-container1">
            <Card title="Plantation Drive" img={plantation} navlink={{ pathname: '/' }} />
            <Card title="Physiotherapy" img={physio} navlink={{ pathname: '/' }} />
            <Card title="Feeding Bellies" img={feedingbellies} navlink={{ pathname: '/' }} />
            <Card title="Nari: Her Right Her Prides" img={nari1} navlink={{ pathname: '/' }} />
            <Card title="Joy of giving" img={joyofgiving} navlink={{ pathname: '/' }} />
            <Card title="Cancer Awareness" img={cancer} navlink={{ pathname: '/' }} />
            <Card title="Voter Awareness" img={voter} navlink={{ pathname: '/' }} />
            <Card title="Samarpan" img={samarpan} navlink={{ pathname: '/' }} />
            <Card title="Swachh Bharat" img={swachhbharat} navlink={{ pathname: '/' }} />
          </div>
        </section>
  
        <section className="events-section1">
          <p className="events-title1">~Fundraising Events</p>
          <div className="events-card-container1">
            <Card title="Rivals on the pitch" img={rivals} navlink={{ pathname: '/' }} />
            <Card title="Smash it" img={smash} navlink={{ pathname: '/' }} />
            <Card title="Run for equality 2023" img={Run_for_equality_2023} navlink={{ pathname: '/' }} />
          </div>
        </section>
      </div>
    );
  };

export default Home;
