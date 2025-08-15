'use client'

import { useState } from "react";

import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (value: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onSearch(newValue);
  };


  return (
    <input
      type="text"
      className={css.input}
      placeholder="Search notes"
      value={inputValue}
      onChange={handleChange}
    />
  );
}