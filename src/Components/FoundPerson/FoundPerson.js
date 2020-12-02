/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import './FoundPersonStyle.css'
import { TiDeleteOutline } from "react-icons/ti";

export default function FoundPerson({ person, onDelete }) {
  return (
    <div className="found-person">
      <p>{person.name}</p>
      <div className="found-person-container">
      <a  href="#" onClick={() => onDelete(person)}>
      <TiDeleteOutline className="found-person-delete" />
      </a> 
      </div>
    </div>
  );
}

