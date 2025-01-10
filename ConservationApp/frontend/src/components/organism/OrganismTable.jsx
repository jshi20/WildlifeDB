import React from "react";
import { Table } from "react-bootstrap";

export default function OrganismTable({ organisms }) {
  const headers = organisms.length > 0 ? Object.keys(organisms[0]) : [];

  return (
    <Table bordered hover>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>
              {header.charAt(0).toUpperCase() + header.slice(1)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {organisms.map((organism, index) => (
          <tr key={index}>
            {headers.map((header) => (
              <td key={header}>{organism[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
