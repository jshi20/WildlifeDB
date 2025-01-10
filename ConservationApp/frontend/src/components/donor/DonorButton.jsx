import Button from "react-bootstrap/Button";

function DonorButton({ groupDonors: getGroups }) {
  async function handleClick() {
    try {
      getGroups();
      alert(
        "Affiliations that have donated over $300,000 calculated successfully!"
      );
    } catch (error) {
      console.error("Error getting donors:", error);
    }
  }
  return (
    <Button onClick={handleClick} variant="primary">
      Find affiliations that have donated over $300,000
    </Button>
  );
}

export default DonorButton;
