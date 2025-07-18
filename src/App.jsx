import React, { useState } from 'react';
import Header from './Header';
import ConsentTable from './ConsentTable';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const consents = [
    {
      id: 1,
      connectionType: 'Activities document - rohith:IIIT Bangalore',
      hostUser: 'IIIT Bangalore',
      hostLocker: 'Admissions',
      guestLocker: 'Education',
      createdOn: '05/12/2024, 10:34:28',
      validityOn: '26/12/2024, 18:30:00',
    },
    {
      id: 2,
      connectionType: 'Data verification - rohith:Sachin',
      hostUser: 'Sachin',
      hostLocker: 'My Documents',
      guestLocker: 'Education',
      createdOn: '05/12/2024, 11:24:13',
      validityOn: '18/12/2024, 18:30:00',
    },
    {
      id: 3,
      connectionType: 'PAN Verification - rohith:Income Tax Dept',
      hostUser: 'Income Tax Department',
      hostLocker: 'KYC Locker',
      guestLocker: 'Finance',
      createdOn: '01/12/2024, 09:45:13',
      validityOn: '31/12/2024, 18:30:00',
    },
  ];

  // Filter consents by searchTerm
  const filteredConsents = consents.filter((consent) =>
    Object.values(consent)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <ConsentTable
        consents={filteredConsents}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
}

export default App;

