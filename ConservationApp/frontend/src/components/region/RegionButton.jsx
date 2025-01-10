import Button from "react-bootstrap/Button";

function RegionButton({ getRegions }) {
  async function handleClick() {
    try {
      getRegions();
      alert("Total budgets of each continent calculated successfully!");
    } catch (error) {
      console.error("Error deleting ranger:", error);
    }
  }
  return (
    <Button onClick={handleClick} variant="primary">
      Find total budgets of each continent
    </Button>
  );
}

export default RegionButton;
