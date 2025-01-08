import React, { useState, useEffect } from 'react';
import '../style/list.css';
const List = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (page = 1, query = '') => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.razzakfashion.com/?paginate=${perPage}&search=${query}&page=${page}`
      );
      const result = await response.json();
      console.log(`📌 ~ fetchData ~ result:`, result);

      setData(result.data);
      setCurrentPage(result.current_page);
      setTotalPages(result.last_page);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchData(1, search);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      fetchData(page, search);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='list-container'>
      <form onSubmit={handleSearchSubmit} className='search-section'>
        <input
          type='text'
          value={search}
          onChange={handleSearch}
          placeholder='Search...'
          className='search-input'
        />
        <button type='submit' className='search-button'>
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className='table-container '>
          <thead>
            <tr className='table-container-tr'>
              <th className='table-container-th'>ID</th>
              <th className='table-container-th'>Name</th>
              <th className='table-container-th'>Email</th>
              <th className='table-container-th'>Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className='table-container-th'>{item.id}</td>
                <td className='table-container-th'>{item.name}</td>
                <td className='table-container-th'>{item.email}</td>
                <td className='table-container-th'>{item.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          style={{
            padding: '8px 16px',
            backgroundColor: currentPage > 1 ? '#007bff' : '#ddd',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: currentPage > 1 ? 'pointer' : 'not-allowed',
          }}
          disabled={currentPage <= 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          style={{
            padding: '8px 16px',
            backgroundColor: currentPage < totalPages ? '#007bff' : '#ddd',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: currentPage < totalPages ? 'pointer' : 'not-allowed',
          }}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default List;
