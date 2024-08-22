import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './table.css';

const Table = ({ title, items, currentPage, itemsPerPage, paginate, fetchAllData, viewAll }) => {
  const [search, setSearch] = useState('');

  const filteredItems = items.filter((item) =>
    search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search)
  );

  const displayedItems = viewAll ? filteredItems : filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
      <th>Category did you register</th>
      <th>Additional Details</th> {/* New column for additional details */}
    </tr>
  </thead>
  <tbody>
    {displayedItems.length > 0 ? (
      displayedItems.map((item, index) => (
        <tr key={index}>
          <td>{item.name}</td>
          <td>{item.gender}</td>
          <td>{item.dob}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
          <td>{item.regNo}</td>
          <td>{item.course}</td>
          <td>{item.hORd}</td>
          <td>{item.hostelID}</td>
          <td>{item.registerType}</td>
          <td>
            {item.registerType === "promotion" && (
              <>
                Promotion Details: {item.promotionDetails}<br />
                Person Promoting: {item.promotionDetailsPerson}
              </>
            )}
            {item.registerType === "individual" && (
              <>Individual Person: {item.individualPerson}</>
            )}
            {item.registerType === "help_desk" && (
              <>Help Desk Option: {item.helpDeskOption}</>
            )}
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="11">No data available</td>
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
