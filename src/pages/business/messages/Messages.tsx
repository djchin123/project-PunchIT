import '../../../styles/business/Messages.css';
import { useState } from 'react';

const mockUsers = [
  "Brian Cheung",
  "Daniel Chin",
  "Poorav",
  "Vedant",
  "Mike Jackson"
];

const Messages = () => {
  const [message, setMessage] = useState('');
  const [sendToAll, setSendToAll] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [addOneStamp, setAddOneStamp] = useState(false);
  const [addTwoStamps, setAddTwoStamps] = useState(false);

  //the search
  const filteredUsers = mockUsers.filter(user =>
    user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //adds a user
  const addUser = (user: string) => {
    if (!selectedUsers.includes(user)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  //removes user
  const removeUser = (user: string) => {
    setSelectedUsers(selectedUsers.filter(u => u !== user));
  };

  //sends
  const handleSend = () => {
    console.log({
      message,
      sendToAll,
      selectedUsers,
      addOneStamp,
      addTwoStamps
    });
    alert('Message sent!');
  };

  return (
    <div className="messages-container">
      <h2>Messages & Remote Stamping</h2>

      <input
        type="text"
        placeholder="Enter Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <select
        value={sendToAll ? "all" : "specific"}
        onChange={(e) => setSendToAll(e.target.value === "all")}
      >
        <option value="all">Send to All Users</option>
        <option value="specific">Send to Specific Users</option>
      </select>

      {!sendToAll && (
        <div className="specific-users">
          <input
            type="text"
            placeholder="Search & Select Customers Here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="user-list">
            {filteredUsers.map(user => (
              <div key={user} onClick={() => addUser(user)} className="user-item">
                {user}
              </div>
            ))}
          </div>

          <div className="selected-users">
            {selectedUsers.map(user => (
              <div key={user} className="selected-user">
                {user}
                <button onClick={() => removeUser(user)}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="stamp-toggles">
        <label>
          <input
            type="checkbox"
            checked={addOneStamp}
            onChange={(e) => setAddOneStamp(e.target.checked)}
          />
          Add 1 stamp to all cards
        </label>
        <label>
          <input
            type="checkbox"
            checked={addTwoStamps}
            onChange={(e) => setAddTwoStamps(e.target.checked)}
          />
          Add 2 stamps to all cards
        </label>
      </div>

      <p>Remotely stamp your customers' loyalty card.</p>

      <button className="send-button" onClick={handleSend}>
        Send
      </button>
    </div>
  );
};

export default Messages;
