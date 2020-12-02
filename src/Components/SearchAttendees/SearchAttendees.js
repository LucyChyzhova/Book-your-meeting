import React, { useState, useEffect } from "react";
import FoundPersons from "../FoundPersons/FoundPersons";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axios from "axios";
import './SearchAttendeesStyle.css';

export default function SearchAttendees({ onFoundPersonsChange }) {
  const [searchingPersons, setSearchingPersons] = useState([]);
  const [foundPersons, setFoundPersons] = useState([]);

  useEffect(() => {
    if (onFoundPersonsChange) {
      onFoundPersonsChange(foundPersons);
    }
  }, [foundPersons, onFoundPersonsChange]);

  const handleOnSearch = (name, cached) => {
    if (name.length >= 2) {
      getPersons(name);
    }
  };

  const handleOnSelect = (selectedPerson) => {
    let person = makeObjectCopy(selectedPerson);
    const personName = person.name;
    if (personName === "") return;

    setFoundPersons((chosenPersons) => {
      const updatedChosenPersons = addPerson(chosenPersons, person);
      const uniqueChosenPersons = getUniqueObjects("id", updatedChosenPersons);

      return uniqueChosenPersons;
    });

    selectedPerson.name = "";
  };

  const addPerson = (chosenPersons, person) => {
    return [...chosenPersons, person];
  };

  const getUniqueObjects = (key, items) => {
    const itemsGropedByKey = items.map((person) => [person[key], person]);
    const uniqueItems = [...new Map(itemsGropedByKey).values()];
    return uniqueItems;
  };

  const makeObjectCopy = (selectedPerson) => {
    return { ...selectedPerson };
  };

  const handleOnDelete = (selectedPerson) => {
    const updatedFoundPersons = foundPersons.filter(
      (p) => p.id !== selectedPerson.id
    );
    setFoundPersons(updatedFoundPersons);
  };

  return (
    <div className="search-container">
      <ReactSearchAutocomplete
        placeholder={'Employee\'s name'}
        useCaching={false}
        showIcon={false}        
        maxResults={50}
        inputDebounce={parseInt(0)}
        items={searchingPersons}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        autoFocus
      />
      <FoundPersons persons={foundPersons} onDelete={handleOnDelete} />
    </div>
  );

  function getPersons(name) {
    const baseUrl = "https://stark-castle-84894.herokuapp.com/employees";
    const url = `${baseUrl}?q=${encodeURIComponent(name)}`;

    axios
      .get(url)
      .then((response) => {
        setSearchingPersons(response.data.matches);
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  }
}
