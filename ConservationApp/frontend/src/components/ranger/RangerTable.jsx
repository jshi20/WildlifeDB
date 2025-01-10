import React from "react";
import { Table } from "react-bootstrap";

export default function RangerTable({ groups }) {
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>Certification level</th>
          <th>Average age</th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group) => (
          <tr key={group.certification_level}>
            <td>{group.certification_level}</td>
            <td>{Number(group.avg_age).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
