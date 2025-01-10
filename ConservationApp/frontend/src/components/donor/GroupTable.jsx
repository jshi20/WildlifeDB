import React from "react";
import { Table } from "react-bootstrap";

export default function GroupTable({ groups }) {
  const CAD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
  });
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>Affiliation</th>
          <th>Total amount donated</th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group) => (
          <tr key={group.affiliation}>
            <td>{group.affiliation}</td>
            <td>{CAD.format(group.sum)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
