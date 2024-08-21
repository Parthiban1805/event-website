import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { BsLinkedin } from "react-icons/bs";
import img1 from '../../assets/ABOUT US/img1.png';
import img2 from '../../assets/ABOUT US/img2.png';
import img3 from '../../assets/ABOUT US/img3.png';
import img4 from '../../assets/ABOUT US/img4.png';
import img5 from '../../assets/FEEDING BELLIES/img4.png';
import img6 from '../../assets/JOY OF GIVING/img4.png';
import placeholder from '../../assets/placeholder.png';
import "./about.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const teamMembers = [
    { name: "Lakshan Raghav J R", role: "Leader", link: "https://www.linkedin.com/in/lakshan-raghav-jr/" },
    { name: "Harshavardhan", role: "Executive", link: "https://www.linkedin.com/in/harshavardhanchava/" },
    { name: "Vishva V A", role: "Executive", link: "https://www.linkedin.com/in/vishva-v-a-0734a928a/" },
    { name: "Sibi Raj", role: "HR & Data management head", link: "https://www.linkedin.com/in/sibirajg/" },
    { name: "Vikirthan T", role: "Public Relations", link: "https://www.linkedin.com/in/vikirthan/" },
    { name: "Holy Dharshni S", role: "Content Writing Team", link: "https://www.linkedin.com/in/holydharshni" },
    { name: "Venkata Manikantareddy kurapati", role: "Media team", link: "https://www.linkedin.com/in/venkata-manikanta-reddy-kurapati-49ab69297?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" },
    { name: "CharvithaVijay R", role: "Event Management", link: "https://www.linkedin.com/in/charvithavijay-remalli-3b9808266/" },
    { name: "Sevitha Devineni", role: "Fine Arts Team", link: "https://www.linkedin.com/in/sevitha-devineni-855450289/" },
    { name: "Sai Niranjan A", role: "Group pratham", link: "https://www.linkedin.com/in/sai-niranjan-496a2a289/" },
    { name: "Nithesh Kambhampati", role: "Group Thalir", link: "https://www.linkedin.com/in/nithesh03" },
    { name: "Naina kakati", role: "Group Ektha", link: "https://in.linkedin.com/in/naina-kakati-7782b6260" },
    { name: "Mariraja S", role: "Group jeevan", link: "https://www.linkedin.com/in/mariraja/" },
  ];

  return (
    <div className='about-container'>
      <div className="about-content">
        <motion.h1
          id='Unit_Prabhat'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          About Unit Prabhat:
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Unit Prabhat is one of the units among 25 units under the aegis of youth affairs and division of student welfare wing is a one of the active and well-known unit. Unit Prabhat mainly focuses on the growth of society and for that we are working on into many projects like Nari, Plantation drive, Gyandeep, Feeding bellies, Joy of giving and some more. We also do events like Run for Equality, Rivals on the pitch, Smash it! and more. Each event promotes a social cause, so we are working for the betterment of the community.
        </motion.p>
        <motion.h1
          id='motto'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          “NOT ME, NOT YOU, BUT WE”
        </motion.h1>
      </div>

      <div className="team-members-container">
        <motion.h1
          className="team-members-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Our Pillars
        </motion.h1>
        <div className="team-member-image-container">
          {teamMembers.slice(0, 8).map((member, index) => (
            <motion.div
              className="tm-image-container"
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              data-aos="fade-up"
            >
              <img src={placeholder} alt={member.name} className="team-member-image" />
              <h3>
                {member.name}{" "}
                <a href={member.link}>
                  <BsLinkedin />
                </a>
              </h3>
              <p>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* <motion.h1
        id="team-members-title1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        Team Leads
      </motion.h1>
      <div className="vertical-line"></div>
      <div className="team-member-image-container">
        {teamMembers.slice(4, 9).map((member, index) => (
          <motion.div
            className="tm-image-container"
            key={index + 4}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.3 + 2.5 }}
            data-aos="fade-up"
          >
            <img src={placeholder} alt={member.name} className="team-member-image" />
            <h3>
              {member.name}{" "}
              <a href={member.link}>
                <BsLinkedin />
              </a>
            </h3>
            <p>{member.role}</p>
          </motion.div>
        ))}
      </div>

      <motion.h1
        id="team-members-title2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
      >
        Group Leads
      </motion.h1>
      <div className="vertical-line"></div>
      <div className="team-member-image-container">
        {teamMembers.slice(9).map((member, index) => (
          <motion.div
            className="tm-image-container"
            key={index + 9}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.3 + 3.5 }}
            data-aos="fade-up"
          >
            <img src={placeholder} alt={member.name} className="team-member-image" />
            <h3>
              {member.name}{" "}
              <a href={member.link}>
                <BsLinkedin />
              </a>
            </h3>
            <p>{member.role}</p>
          </motion.div>
        ))}
      </div> */}

      <div className="about-gallery-container">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4 }}
        >
          ~ Gallery
        </motion.h1>
        <div className="about-gallery">
          {[img1, img2, img3, img4, img5, img6].map((img, index) => (
            <motion.img
              src={img}
              alt={`Gallery ${index + 1}`}
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 + 4.5 }}
              data-aos="fade-up"
              className="about-gallery-img"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
