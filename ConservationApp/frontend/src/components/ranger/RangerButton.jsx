import Button from "react-bootstrap/Button";

export default function RangerButton({ getGroups }) {
  async function handleClick() {
    try {
      getGroups();
      alert(
        "Average age of above-average certification levels calculated successfully!"
      );
    } catch (error) {
      console.error("Error getting certification levels:", error);
    }
  }
  return (
    <Button onClick={handleClick} variant="primary">
      Find average age of above-average certification levels
    </Button>
  );
}
