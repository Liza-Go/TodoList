import { useRef, useState } from "react";

export function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceTimeRef = useRef(null);

  const handleSearch = (value) => {
    setSearchTerm(value);
    clearTimeout(debounceTimeRef.current);
    debounceTimeRef.current = setTimeout(() => {
      onSearch(value);
    }, 300);
  };

  return (
    <input
      type="text"
      className="todo-input"
      placeholder="Search Task"
      value={searchTerm}
      onChange={(evnt) => handleSearch(evnt.target.value)}
    />
  );
}
