import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { addOrganism } from "@/services/organismServices";

export default function OrganismInsertForm({ getAllOrganisms }) {
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [speciesName, setSpeciesName] = useState("");

  async function handleClick() {
    try {
      const parsedAge = parseInt(age, 10);

      await addOrganism(sex, parsedAge, speciesName);
      alert("Organism added successfully!");
      setSex("");
      setAge("");
      setSpeciesName("");
      getAllOrganisms();
    } catch (error) {
      alert("Error adding organism. Please try again.");
    }
  }

  return (
    <Form className="mb-4">
      <Form.Group className="mb-4">
        <Form.Label>Sex</Form.Label>
        <Form.Control
          placeholder="M, F, or N"
          value={sex}
          onChange={(e) => setSex(e.target.value)}
        />
        <Form.Label>Age</Form.Label>
        <Form.Control
          placeholder="1, 2, 3 etc."
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <Form.Label>Species Name</Form.Label>
        <Form.Control
          placeholder="Registered Species (i.e. Panthera leo)"
          value={speciesName}
          onChange={(e) => setSpeciesName(e.target.value)}
        />
      </Form.Group>
      <Button onClick={handleClick} variant="primary">
        Insert Organism
      </Button>
    </Form>
  );
}
