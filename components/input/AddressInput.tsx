"use client";

import { Input } from "@/components/ui/input";
import { Map } from "@/lib/api/map";
import React, { useEffect, useState } from "react";

interface AddressInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onSelected: (selectedPrediction: Prediction | null) => void;
}

interface Prediction {
  description: string;
  place_id: string;
}

export default function AddressInput(props: AddressInputProps) {
  const [value, setValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Prediction[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Prediction | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setSelected(null);
  };

  const handleSelect = (suggestion: Prediction) => {
    setSuggestions([]);
    setIsOpen(false);
    setSelected(suggestion);
    props.onSelected(suggestion);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (value && value.length > 3) {
        Map.getAutoComplete({ input: value }).then((response) => {
          if (response.isSuccess && response.data) {
            setSuggestions(response.data);
          }
          setIsOpen(true);
        });
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [value]);

  return (
    <div className="relative w-full">
      <Input
        placeholder="Enter your location"
        value={selected ? selected.description : value}
        onChange={handleChange}
      />
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute top-12 z-10 max-h-96 w-full overflow-y-auto rounded-xl bg-background shadow-lg backdrop-blur-xl">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion)}
              className="line-clamp-1 w-full cursor-pointer truncate px-4 py-2 hover:bg-secondary"
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
