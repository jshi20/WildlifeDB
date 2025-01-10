function RegionRow({ region }) {
  const CAD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
  });
  const currency = CAD.format(region.sum);
  return (
    <tr key={region.continent}>
      <td>{region.continent}</td>
      <td>{currency}</td>
    </tr>
  );
}

export default RegionRow;
