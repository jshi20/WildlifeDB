import React from "react";
import { Table } from "react-bootstrap";

export default function DonorTable({ donors }) {
  const headers = donors.length > 0 ? Object.keys(donors[0]) : [];

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
        {donors.map((donor, index) => (
          <tr key={index}>
            {headers.map((header) => (
              <td key={header}>{donor[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
