import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import file CSS để chứa các kiểu tùy chỉnh

function App() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortName, setSortName] = useState('id');
  const [sortValue, setSortValue] = useState('asc');

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://www.ranusdemowebapi.somee.com/api/customers?search=${search}&sortBy=${sortName}&sortOrder=${sortValue}`);
      setCustomers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sortName, sortValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchData();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Search:
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        </label>
        <label>
          Sort By:
          <select value={sortName} onChange={(e) => setSortName(e.target.value)}>
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="contact">Contact</option>
            <option value="address">Address</option>
            <option value="city">City</option>
            <option value="country">Country</option>
            <option value="phone">Phone</option>
          </select>
        </label>
        <label>
          Sort Order:
          <select value={sortValue} onChange={(e) => setSortValue(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="des">Descending</option>
          </select>
        </label>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Address</th>
              <th>City</th>
              <th>Country</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.customerId}>
                <td>{customer.customerId}</td>
                <td>{customer.companyName}</td>
                <td>{customer.contactName}</td>
                <td>{customer.address}</td>
                <td>{customer.city}</td>
                <td>{customer.country}</td>
                <td>{customer.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
