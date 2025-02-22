import './App.css';
import contacts from './contacts.json'
import { useState } from 'react';
import { Button, Space } from 'antd';


function App() {
  const firstFive = contacts.slice(0, 5)
  const remainingContacts = contacts.slice(5)
  // give each contact a unique number so we can pick a random contact and merge it with the prev contacts
  const addRandomContact = () => {
    const randomContactIndex = Math.floor(Math.random() * remainingContacts.length)
    const randomContact = remainingContacts[randomContactIndex]
    setDisplayedContacts((displayedContacts) => displayedContacts.concat(randomContact))
    
  }
  const [displayedContacts, setDisplayedContacts] = useState(firstFive)

  const sortAlphabetically = () => {
    //sort alpabetically
    const sortedContacts = [...displayedContacts].sort((a, b) => a.name.localeCompare(b.name))
    //update the sate
    setDisplayedContacts(sortedContacts);
  }

  const sortPopularity = () => {
    const sortedContacts = [...displayedContacts].sort((a, b) => b.popularity - a.popularity)
    setDisplayedContacts(sortedContacts)
  }

  const deleteContact = (id) => {
    const updatedContacts = [...displayedContacts].filter((contact) => contact.id !== id)
    setDisplayedContacts(updatedContacts)
  }

  return (
    <div className="App">
      <div className="centered-container">
        <h1>IronContacts</h1>
        <Space wrap>
          <Button type="primary" onClick={addRandomContact}>Add Random Contact</Button>
          <Button type="primary" onClick={sortPopularity}>Sort by popularity</Button>
          <Button type="primary" onClick={sortAlphabetically}>Sort by name</Button>
        </Space>
        {displayedContacts.length === 0 ? (
          <p>All contacts were deleted.</p>
        ) : (
          <table className='table'>
            <thead>
              <tr>
                <th>Picture</th>
                <th>Name</th>
                <th>Popularity</th>
                <th>Won Oscar</th>
                <th>Won Emmy</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedContacts.map((contact) => (
                <tr key={contact.id}>
                  <td>
                    <img src={contact.pictureUrl} alt={contact.name} style={{ width: '50px', height: '60px' }} />
                  </td>
                  <td>{contact.name}</td>
                  <td>{contact.popularity}</td>
                  <td>{contact.wonOscar ? <p>🏆</p> : <p></p>}</td>
                  <td>{contact.wonEmmy ? <p>🏆</p> : <p></p>}</td>
                  <td><Button type="primary" danger onClick={() => deleteContact(contact.id)}>Delete</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;