import React from 'react'
import { Helmet } from 'react-helmet';
import './run_for_equality.css'
import img1 from '../../assets/RUN FOR EQUALITY/img1.jpg';
import img2 from '../../assets/RUN FOR EQUALITY/img2.jpg';
import img3 from '../../assets/RUN FOR EQUALITY/img3.jpg';
import img4 from '../../assets/RUN FOR EQUALITY/img4.jpg';
import img5 from '../../assets/RUN FOR EQUALITY/img5.jpg';
import img6 from '../../assets/RUN FOR EQUALITY/img6.jpg';

const Run = () => {
  return (
    <>
    <Helmet>
    <title>Run for Equality - Gender Equality Marathon</title>
    <meta name="description" content="Join the Run for Equality marathon to promote gender equality. Participate in this empowering event and make a difference towards equal opportunities for all genders." />
    <meta name="keywords" content="run for equality, gender equality marathon, marathon, equal opportunities, inclusive society" />
    <meta property="og:title" content="Run for Equality - Gender Equality Marathon" />
    <meta property="og:description" content="Join the Run for Equality marathon to promote gender equality. Participate in this empowering event and make a difference towards equal opportunities for all genders." />
    <meta property="og:url" content="https://www.unitprabhaat.com/run-for-equality" /> 
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Run for Equality - Gender Equality Marathon" />
    <meta name="twitter:description" content="Join the Run for Equality marathon to promote gender equality. Participate in this empowering event and make a difference towards equal opportunities for all genders." />
    <meta name="twitter:url" content="https://www.unitprabhaat.com/run-for-equality" /> 
    <script type="application/ld+json">
        {`
        {
            "@context": "https://schema.org",
            "@type": "SportsEvent",
            "name": "Run for Equality - Gender Equality Marathon",
            "startDate": "2024-09-15T07:00",
            "location": {
                "@type": "Place",
                "name": "Central Park",
             
            },
            "description": "Join the Run for Equality marathon to promote gender equality. Participate in this empowering event and make a difference towards equal opportunities for all genders.",
            "organizer": {
                "@type": "Organization",
                "name": "Unit Prabhaat - National Service Scheme (NSS)",
                "url": "https://www.unitprabhaat.com"
            }
        }
        `}
    </script>
</Helmet>

    <div className='run-for-equality-container'>
     
        <div className="run-for-equality-content">
            <h1 id='Run-for-equality'> About Run-for-Equality:</h1>
            <p>"Run for Equality" is a marathon dedicated to promoting gender equality and raising awareness about the importance of equal opportunities for all genders. Our first event in 2023 was a tremendous success, attracting over 600+ participants, including enthusiastic staff members who joined the cause. This event aims to bring together individuals from all walks of life to support the movement towards a more inclusive and equitable society. By participating in "Run for Equality," we not only emphasize the need for gender equality but also demonstrate our commitment to creating a world where everyone has the same opportunities and rights, regardless of gender. Join us in this movement and make a difference by supporting gender equality through action and solidarity.</p>
          </div>
          <div className="run-for-equality-gallery-container">
            <h1 >~ Gallery</h1>
            <div className="run-for-equality-gallery">
            <img src={img1} alt="Participants at the Run for Equality event" />
            <img src={img2} alt="Group photo of runners promoting gender equality" />
            <img src={img3} alt="Marathon event banner for gender equality" />
            <img src={img4} alt="Runners crossing the finish line" />
            <img src={img5} alt="Volunteers supporting the event" />
            <img src={img6} alt="Participants celebrating their achievements" />

            </div>
        </div>
      </div>
      </>
  )
}

export default Run