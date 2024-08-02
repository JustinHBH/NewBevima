import React, { useState } from "react";
import './SearchBarAdmin.css'


const SearchBarAdmin = (props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    props.handleSearch(query); 
  };

  return (
    <div className="searchadmin-bar">
      <form>
        <input
          className="searchadmin-input"
          type="text"
          placeholder={props.placeholder}
          value={searchQuery}
          onChange={handleChange} 
        />
      </form>
    </div>
  );
};

export default SearchBarAdmin;
