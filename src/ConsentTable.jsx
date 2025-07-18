import React, { useState, useEffect, useRef } from 'react';
import './ConsentTable.css';

// date parsing for DD/MM/YYYY format
function parseDate(dateStr) {
  const [datePart, timePart] = dateStr.split(', ');
  const [day, month, year] = datePart.split('/');
  return new Date(`${year}-${month}-${day}T${timePart}`);
}

function ConsentTable({ consents }) {
  const [filters, setFilters] = useState({
    connectionType: '',
    hostUser: '',
    hostLocker: '',
    guestLocker: '',
  });

  const [sortBy, setSortBy] = useState(null);
  const [openSort, setOpenSort] = useState(null);
  const [sortedConsents, setSortedConsents] = useState([...consents]);

  const createdSortRef = useRef(null);
  const validitySortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        createdSortRef.current &&
        !createdSortRef.current.contains(e.target) &&
        validitySortRef.current &&
        !validitySortRef.current.contains(e.target)
      ) {
        setOpenSort(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let filtered = consents.filter((consent) =>
      Object.entries(filters).every(([key, val]) =>
        consent[key].toLowerCase().includes(val)
      )
    );

    // Sorting logic with parseDate
    if (sortBy === 'created-newest') {
      filtered.sort((a, b) => parseDate(b.createdOn) - parseDate(a.createdOn));
    } else if (sortBy === 'created-oldest') {
      filtered.sort((a, b) => parseDate(a.createdOn) - parseDate(b.createdOn));
    } else if (sortBy === 'validity-soon') {
      filtered.sort((a, b) => parseDate(a.validityOn) - parseDate(b.validityOn));
    } else if (sortBy === 'validity-late') {
      filtered.sort((a, b) => parseDate(b.validityOn) - parseDate(a.validityOn));
    }

    setSortedConsents(filtered);
  }, [filters, sortBy, consents]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value.toLowerCase(),
    }));
  };

  const handleSortChange = (type) => {
    setSortBy(type);
    setOpenSort(null);
  };

  return (
    <div className="table-section">
      <div className="table-header">
        <h2>Consent Dashboard</h2>
        <button className="locker-btn">LOCKERS</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>
              Connection Type
              <input
                type="text"
                placeholder="Filter"
                onChange={(e) => handleFilterChange("connectionType", e.target.value)}
              />
            </th>
            <th>
              Host User
              <input
                type="text"
                placeholder="Filter"
                onChange={(e) => handleFilterChange("hostUser", e.target.value)}
              />
            </th>
            <th>
              Host Locker
              <input
                type="text"
                placeholder="Filter"
                onChange={(e) => handleFilterChange("hostLocker", e.target.value)}
              />
            </th>
            <th>
              Guest Locker
              <input
                type="text"
                placeholder="Filter"
                onChange={(e) => handleFilterChange("guestLocker", e.target.value)}
              />
            </th>
            <th className="sortable-th">
              Created On
              <div className="sort-dropdown" ref={createdSortRef}>
                <span
                  title="Sort Created On"
                  onClick={() => setOpenSort(openSort === 'created' ? null : 'created')}
                >
                  ⬍
                </span>
                {openSort === 'created' && (
                  <div className="dropdown-content">
                    <button onClick={() => handleSortChange('created-newest')}>Newest First</button>
                    <button onClick={() => handleSortChange('created-oldest')}>Oldest First</button>
                  </div>
                )}
              </div>
            </th>
            <th className="sortable-th">
              Validity On
              <div className="sort-dropdown" ref={validitySortRef}>
                <span
                  title="Sort Validity"
                  onClick={() => setOpenSort(openSort === 'validity' ? null : 'validity')}
                >
                  ⬍
                </span>
                {openSort === 'validity' && (
                  <div className="dropdown-content">
                    <button onClick={() => handleSortChange('validity-soon')}>Soonest Expire</button>
                    <button onClick={() => handleSortChange('validity-late')}>Latest Expire</button>
                  </div>
                )}
              </div>
            </th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {sortedConsents.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>No matching consents found.</td>
            </tr>
          ) : (
            sortedConsents.map((consent, index) => (
              <tr key={consent.id}>
                <td>{index + 1}</td>
                <td>
                  {consent.connectionType}
                  <br />
                  <a href="#">Read more</a>
                </td>
                <td>{consent.hostUser}</td>
                <td>{consent.hostLocker}</td>
                <td>{consent.guestLocker}</td>
                <td>{consent.createdOn}</td>
                <td>{consent.validityOn}</td>
                <td>
                  <div className="action-buttons">
                    <button title="Info">ℹ️</button>
                    <button title="Cancel">❌</button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ConsentTable;

