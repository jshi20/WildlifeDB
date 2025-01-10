import React from "react";
import { Form, Button } from "react-bootstrap";
import { fetchDonors } from "@/services/donorServices";

export default function DonorForm({ setDonors }) {
  const [attributes, setAttributes] = React.useState([]);

  const validAttributes = ["id", "name", "email", "address", "affiliation"];

  async function handleClick() {
    const invalidAttributes = attributes.filter(
      (attr) => !validAttributes.includes(attr.toLowerCase())
    );
    if (invalidAttributes.length > 0 && attributes != "") {
      alert(
        `Invalid attribute(s): ${invalidAttributes.join(
          ", "
        )}. Please enter one or more of the following: id, name, email, address, affiliation, or leave it blank`
      );
      return;
    }

    try {
      const data = await fetchDonors(attributes);
      setDonors(data);
      alert("Donors projected successfully!");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <Form className="mb-4">
      <Form.Group className="mb-4">
        <Form.Label>Donor Projection</Form.Label>
        <Form.Control
          placeholder="id, name, email, address, affiliation"
          value={attributes.join(", ")}
          onChange={(e) =>
            setAttributes(e.target.value.split(",").map((attr) => attr.trim()))
          }
        />
      </Form.Group>
      <Button onClick={handleClick} variant="primary">
        Project Donors
      </Button>
    </Form>
  );
}
