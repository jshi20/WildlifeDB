import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { fetchAnimals } from "@/services/animalServices";

function AnimalForm({ setAnimals }) {
  const [disease, setDisease] = useState("");
  const diseases = [
    "Rabies",
    "Tuberculosis",
    "Brucellosis",
    "Lyme Disease",
    "Anthrax",
    "Chronic Wasting Disease",
    "Root Rot",
    "Anthracnose",
    "Crown Gall",
    "Rust Disease",
  ];

  const handleSubmit = async () => {
    try {
      if (!diseases.includes(disease)) {
        alert("Please enter a valid disease.");
        return;
      }
      const data = await fetchAnimals(disease);
      setAnimals(data);
      alert("Disease incidents fetched successfully!");
    } catch (error) {
      console.error("Error joining relations:", error);
    }
  };

  return (
    <Form className="mb-4">
      <Form.Group className="mb-4">
        <Form.Label>Disease</Form.Label>
        <Form.Control
          placeholder="Rabies, Tuberculosis, etc."
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit}>
        Find disease incidents
      </Button>
    </Form>
  );
}

export default AnimalForm;
