import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { FiArrowUpRight } from "react-icons/fi";
import rfe from '../../assets/rfe.png';
import CardCarousel from '../../components/cardcarousel/cardcarousel';
import ScrollingCards from '../../components/scrollingcards/scrollingcards';
import { Helmet } from 'react-helmet';

import './sponsors.css';

const Sponsors = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with desired options
  }, []);

  return (
    <div className='sponsor-container'>
      <Helmet>
        <title>Sponsors & Benefits - University Event</title>
        <meta name="description" content="Explore sponsorship benefits including brand exposure, corporate sustainability, and community engagement at one of the biggest university events." />
        <meta name="keywords" content="sponsorship, brand exposure, university event, community engagement, corporate sustainability, university marathon" />
      </Helmet>

      <motion.h1 
        className="sponsor-benefits"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        data-aos="fade-left"
      >
        Benefits for our sponsors
      </motion.h1>
      <CardCarousel />
      <p className="more-benefit-details">
        Contact us for more details{' '}
        <a href="/contact" style={{ textDecoration: 'none' }}>
          <FiArrowUpRight style={{ color: '#ff4500' }} />
        </a>
      </p>
      <div className="sponsor-benefits-container">
        <div className="sponsor-benefit-left-side">
          <motion.div 
            className="sponsor-benefit-title"
            data-aos="fade-right"
          >
            <h2><span style={{fontSize:"45px",fontStyle:"italic",color:"white"}}>01. </span>Brand Exposure</h2>
            <hr />
            <p className="sponsor-benefit-description">
              Logo on promotional materials, event banners, Tshirts, and website
            </p>
          </motion.div>
          <motion.div 
            className="sponsor-benefit-title"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <h2><span style={{fontSize:"45px",fontStyle:"italic",color:"white"}}>02. </span>Corporate Sustainability</h2>
            <hr />
            <p className="sponsor-benefit-description">
              Position your brand as a supporter of gender equality and community wellness
            </p>
          </motion.div>
        </div>
        <motion.img 
          src={rfe} 
          alt="Brand Exposure Sponsorship for University Event"
          className="sponsor-benefit-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          data-aos="fade-up"
        />
        <div className="sponsor-benefit-right-side">
          <motion.div 
            className="sponsor-benefit-title"
            data-aos="fade-left"
          >
            <h2><span style={{fontSize:"45px",fontStyle:"italic",color:"white"}}>03. </span>Community Engagement</h2>
            <hr />
            <p className="sponsor-benefit-description">
              Direct engagement with the local community and participants.
            </p>
          </motion.div>
          <motion.div 
            className="sponsor-benefit-title"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <h2><span style={{fontSize:"45px",fontStyle:"italic",color:"white"}}>04. </span>Brand Reach</h2>
            <hr />
            <p className="sponsor-benefit-description">
              One of the biggest university is Lovely Professional University with diverse culture
            </p>
          </motion.div>
        </div>
      </div>
      <ScrollingCards />
    </div>
  );
}

export default Sponsors;
