import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './table.css';

const Table = ({ title, items, currentPage, itemsPerPage, paginate, fetchAllData, viewAll, deleteItem }) => {
  const [search, setSearch] = useState('');

  const filteredItems = items.filter((item) =>
    item.name ? item.name.toLowerCase().includes(search.toLowerCase()) : false
  );

  const displayedItems = viewAll
    ? filteredItems
    : filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
 
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(id);
    }
  };

  

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

      <div className="view-all">
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
              <th>Serial No</th>
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
              <th>Referred by</th>
              <th>Actions</th> {/* Added Actions column for the Delete button */}
            </tr>
          </thead>
          <tbody>
          {displayedItems.length > 0 ? (
            displayedItems.map((item, index) => {
              const fileName = item.paymentScreenshot ? item.paymentScreenshot.split('/').pop() : null;

      return (
        <tr key={index}>
          <td>{item.name || 'N/A'}</td>
          <td>{item.gender || 'N/A'}</td>
          <td>{item.dob || 'N/A'}</td>
          <td>{item.email || 'N/A'}</td>
          <td>{item.phone || 'N/A'}</td>
          <td>{item.regNo || 'N/A'}</td>
          <td>{item.course || 'N/A'}</td>
          <td>{item.hORd || 'N/A'}</td>
          <td>{item.hostelID || 'N/A'}</td>
          <td>
            {fileName ? (
              <Link to={`https://event-website-main.onrender.com/uploads/${fileName}`}>View</Link>
            ) : (
              'N/A'
            )}
          </td>
          <td>
          <button onClick={() => handleDelete(item._id)}>Delete</button>
          </td>
        </tr>
      );
    })
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
          {pageNumbers.map((number) => (
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
  deleteItem: PropTypes.func.isRequired, // Added PropType validation for deleteItem
};

export default Table;
