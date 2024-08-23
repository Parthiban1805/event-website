import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './table.css';

const Table = ({ title, items, currentPage, itemsPerPage, paginate, fetchAllData, viewAll }) => {
  const [search, setSearch] = useState('');

  console.log("All Items: ", items);

  const filteredItems = items.filter((item) =>
    item.name ? item.name.toLowerCase().includes(search.toLowerCase()) : false
  );

  // Log filtered items
  console.log("Filtered Items: ", filteredItems);

  // Determine which items to display based on pagination
  const displayedItems = viewAll ? filteredItems : filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Log displayed items
  console.log("Displayed Items: ", displayedItems);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="table-section">
      <div className="table-title">
        <h2>{title}</h2>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className='view-all'>
        <button onClick={fetchAllData}>
          {viewAll ? 'View Paginated' : 'View All'}
        </button>
      </div>

      <div className="count-display">
        <p>Total Registrations: {filteredItems.length}</p>
      </div>

      <div className="table-container">
        <table className="table-content">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Reg No</th>
              <th>Course</th>
              <th>Hostel/Day Scholar</th>
              <th>Hostel ID</th>
              <th>Payment Screenshot</th>
              <th>Category did you register</th>
              <th>Additional Details</th>
            </tr>
          </thead>
          <tbody>
            {displayedItems.length > 0 ? (
              displayedItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name || "N/A"}</td>
                  <td>{item.gender || "N/A"}</td>
                  <td>{item.dob || "N/A"}</td>
                  <td>{item.email || "N/A"}</td>
                  <td>{item.phone || "N/A"}</td>
                  <td>{item.regNo || "N/A"}</td>
                  <td>{item.course || "N/A"}</td>
                  <td>{item.hORd || "N/A"}</td>
                  <td>{item.hostelID || "N/A"}</td>
                  <td>
                  <td>
                  {item.paymentScreenshot ? (
                    <img
                      src={`https://event-website-main.onrender.com/${item.paymentScreenshot}`}
                      alt="Payment Screenshot"
                      style={{ width: "100px", height: "auto" }}
                    />
                  ) : (
                    'N/A'
                  )}
</td>

                </td>


                  <td>{item.registerType || "N/A"}</td>
                  <td>Promotion Details: {item.promotionDetails || "N/A"}<br />
                    Person Promoting: {item.promotionDetailsPerson || "N/A"}</td>
                  <td>Individual Person: {item.individualPerson || "N/A"}</td>
                  <td>Help Desk Option: {item.helpDeskOption || "N/A"}</td>
                  </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!viewAll && (
        <div className="pagination">
          <button
            className="previous"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {pageNumbers.map(number => (
            <button key={number} onClick={() => paginate(number)}>
              {number}
            </button>
          ))}
          <button
            className="next"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

Table.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  fetchAllData: PropTypes.func.isRequired,
  viewAll: PropTypes.bool.isRequired,
};

export default Table;
