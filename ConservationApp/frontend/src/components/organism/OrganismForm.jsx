import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { selectOrganisms } from "@/services/organismServices";

export default function OrganismForm({ setFilteredOrganisms }) {
  const [where, setWhere] = useState("");

  async function handleClick() {
    try {
      if (where === "") {
        alert("Please enter a where clause.");
        return;
      }
      const data = await selectOrganisms(where);
      setFilteredOrganisms(data);
      alert("Organisms selected successfully!");
    } catch (error) {
      alert(
        "Error selecting organisms: " +
          error +
          " please check that the where clause is correct."
      );
      return;
    }
  }

  return (
    <Form className="mb-4">
      <Form.Group className="mb-4">
        <Form.Label>Organism Filter</Form.Label>
        <Form.Control
          placeholder="sex='F' AND tag=6 OR sex='M' etc."
          value={where}
          onChange={(e) => setWhere(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" onClick={() => handleClick()}>
        Select Organisms
      </Button>
    </Form>
  );
}
