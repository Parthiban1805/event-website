import React, { useEffect, useState } from "react";
import Table from "./table";
import "./adminpage.css";

const AdminPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [reservationDetails, setReservationDetails] = useState([]);
  const [allData, setAllData] = useState([]);
  const [viewAll, setViewAll] = useState(false);

  // Function to handle item deletion
  const deleteItem = (id) => {
    setReservationDetails(reservationDetails.filter(item => item.id !== id));
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://event-website-main.onrender.com/table`);
      const data = await response.json();
      if (response.ok) {
        if (Array.isArray(data)) {
          setReservationDetails(data);
          setAllData(data);
        } else {
          console.error("Unexpected data format:", JSON.stringify(data, null, 2));
        }
      } else {
        console.error("API Error:", data.error);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchAllData = () => {
    setViewAll(!viewAll);
  };

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
            deleteItem={deleteItem} // Pass deleteItem function to Table component
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
