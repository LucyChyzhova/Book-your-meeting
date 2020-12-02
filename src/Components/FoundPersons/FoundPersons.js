import React from "react";
import FoundPerson from "../FoundPerson/FoundPerson";

export default function FoundPersons({ persons, onDelete }) {
  const renderFoundPersons = () => {
    const foundPersons = persons.map((person) => {
      return (
        <FoundPerson
          key={person.id}
          person={person}
          onDelete={handleOnDelete}
        />
      );
    });

    return foundPersons;
  };

  const handleOnDelete = (selectedPerson) => {
    onDelete(selectedPerson);
  };

  return <>{renderFoundPersons()}</>;
}
