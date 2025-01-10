import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { updateRanger } from "@/services/rangerServices";

function RangerForm({ rangers, getRangers }) {
  const [id, setId] = useState("");
  const [age, setAge] = useState("");
  const [certificationLevel, setCertificationLevel] = useState("");

  async function handleClick() {
    if (rangers.some((ranger) => ranger.badge_number === parseInt(id, 10))) {
      try {
        if (
          Number.isNaN(parseInt(age, 10)) ||
          Number.isNaN(parseInt(certificationLevel, 10))
        ) {
          alert("Please enter a valid age and certification level.");
          return;
        }
        await updateRanger(
          parseInt(id, 10),
          parseInt(age, 10),
          parseInt(certificationLevel, 10)
        );
        getRangers();
        setAge("");
        setCertificationLevel("");
        setId("");
        alert(`Updated ranger with badge number ${id}`);
      } catch (error) {
        console.error("Error updating ranger:", error);
      }
    } else {
      alert("Ranger does not exist");
    }
  }

  return (
    <Form className="mb-4">
      <Form.Group className="mb-4">
        <Form.Label>Ranger Id</Form.Label>
        <Form.Control
          placeholder="1, 2, 3 etc."
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <Form.Label>Ranger Age</Form.Label>
        <Form.Control
          placeholder="1, 2, 3 etc."
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <Form.Label>Ranger Level</Form.Label>
        <Form.Control
          placeholder="1, 2, 3 etc."
          value={certificationLevel}
          onChange={(e) => setCertificationLevel(e.target.value)}
        />
      </Form.Group>
      <Button onClick={handleClick} variant="primary">
        Update Ranger
      </Button>
    </Form>
  );
}

export default RangerForm;
