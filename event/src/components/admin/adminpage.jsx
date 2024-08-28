import React, { useEffect, useState } from "react";
import Table from "./table";
import "./adminpage.css";

const AdminPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [reservationDetails, setReservationDetails] = useState([]);
  const [allData, setAllData] = useState([]);
  const [viewAll, setViewAll] = useState(false);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://event-website-main.onrender.com/table`);
      
      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setReservationDetails(data);
            setAllData(data);
          } else {
            console.error("Unexpected data format:", JSON.stringify(data, null, 2));
          }
        } else {
          const rawText = await response.text();
          console.error("Unexpected response format:", rawText);
        }
      } else {
        console.error(`HTTP error! Status: ${response.status}, StatusText: ${response.statusText}`);
        const rawText = await response.text(); // Capture the error page
        console.error("Error page content:", rawText); // Log the HTML error page
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <p>Admin Dashboard</p>
      </div>
      <div className="admin-page-content">
        <div className="admin-page-buttons">
          {/* Download Button */}
          <a
            href="https://event-website-main.onrender.com/download-excel"
            className="btn btn-download"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Excel
          </a>

          {/* View Button (if you want to open it in a new tab) */}
          <a
            href="https://event-website-main.onrender.com/download-excel"
            className="btn btn-view"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Excel
          </a>
        </div>
        <div className="admin-page-reservation-details">
          <Table
            title="Registration details"
            items={reservationDetails}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            paginate={paginate}
            fetchAllData={fetchAllData}
            viewAll={viewAll}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
