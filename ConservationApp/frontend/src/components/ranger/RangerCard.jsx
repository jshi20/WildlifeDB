import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { deleteRanger } from "@/services/rangerServices";

function RangerCard({ ranger, setRangers }) {
  async function handleClick() {
    try {
      await deleteRanger(ranger.badge_number);
      setRangers((prevRangers) =>
        prevRangers.filter((r) => r.badge_number !== ranger.badge_number)
      );
      alert(`Deleted ranger with badge number ${ranger.badge_number}`);
    } catch (error) {
      console.error("Error deleting ranger:", error);
    }
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{ranger.name}</Card.Title>
        <Card.Subtitle className="mb-1">
          ID: {ranger.badge_number}
        </Card.Subtitle>
        <Card.Subtitle className="mb-1">Age: {ranger.age}</Card.Subtitle>
        <Card.Subtitle className="mb-1">
          Level: {ranger.certification_level}
        </Card.Subtitle>
        <Button onClick={() => handleClick()} variant="danger">
          Remove Ranger
        </Button>
      </Card.Body>
    </Card>
  );
}

export default RangerCard;
