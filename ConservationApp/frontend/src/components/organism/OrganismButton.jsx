import Button from "react-bootstrap/Button";

function OrganismButton({ getOrganisms: getOrganisms }) {
  async function handleClick() {
    try {
      getOrganisms();
      alert(
        "Organisms being researched by all researchers calculated successfully!"
      );
    } catch (error) {
      console.error("Error getting organisms:", error);
    }
  }
  return (
    <Button onClick={handleClick} variant="primary">
      Find organisms being researched by all researchers
    </Button>
  );
}

export default OrganismButton;
