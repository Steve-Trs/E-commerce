import React, { useState, useEffect } from "react";
import "../styles/searchbar.css";
import { useNavigate, NavLink } from "react-router-dom";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length > 2) {
        try {
          const response = await fetch(
            `http://localhost:3000/search/suggestions?q=${searchQuery}`
          );
          const data = await response.json();
          setSuggestions(data);
        } catch (error) {
          console.error(error);
        }
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [searchQuery]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/search?q=${searchQuery}`
      );
      const data = await response.json();
      setSearchResults(data);
      navigate("/search-results", { state: { searchResults: data } });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion.title);
  };

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />

        <button onClick={handleSearch}>Search</button>

        {suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((suggestion) => (
              <p
                key={suggestion.id}
                onClick={() => handleSuggestionSelect(suggestion)}
              >
                <NavLink
                  to={`/product/${suggestion.id}`}
                  className="suggestion"
                >
                  {suggestion.title}
                </NavLink>
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
