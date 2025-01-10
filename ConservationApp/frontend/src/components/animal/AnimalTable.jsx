import { Table } from "react-bootstrap";
import React from "react";

function AnimalTable({ animals }) {
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>Tag</th>
          <th>Disease name</th>
          <th>Date contracted</th>
        </tr>
      </thead>
      <tbody>
        {animals.map((animal) => (
          <tr key={animal.organism_tag}>
            <td>{animal.organism_tag}</td>
            <td>{animal.disease_name}</td>
            <td>
              {new Date(animal.incident_date)
                .toISOString()
                .slice(0, 10)
                .replace("T", " ")}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default AnimalTable;
