import React, { useState } from "react";

const SearchBar = (props) => {
  const [filterValue, setFilterValue] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (!props.Data) {
      return; 
    }

    const filterArray = props.Data.filter((e) => {
      return e.title && e.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilterValue(filterArray);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
    props.setSearchQuery(event.target.value); 
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    handleSearch(); 
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder={props.Placeholder}
          value={searchQuery}
          onChange={handleChange}
        />
      </form>
      {filterValue.length !== 0 ? null : <p> </p>}
      <div>
        {filterValue.length !== 0 &&
          filterValue.map((e) => {
            return <p>{e.title}</p>;
          })}
      </div>
    </div>
  );
};

export default SearchBar;
