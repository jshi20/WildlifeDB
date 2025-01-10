"use client";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import RegionRow from "@/components/region/RegionRow";
import RegionButton from "@/components/region/RegionButton";
import { fetchRegions } from "@/services/regionServices";
import { Table } from "react-bootstrap";

export default function Region() {
  const [regions, setRegions] = useState([]);
  async function getRegions() {
    try {
      const data = await fetchRegions();
      setRegions(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="container">
      <div className="col-span-1-"></div>
      {/* Left buffer */}
      <Navigation />
      <div style={{ marginBottom: "20px" }}></div>
      <RegionButton getRegions={getRegions} />
      <div style={{ marginBottom: "20px" }}></div>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Continent</th>
            <th>Budget</th>
          </tr>
        </thead>
        <tbody key="row">
          {regions.map((region) => (
            <RegionRow key={region.continent} region={region}></RegionRow>
          ))}
        </tbody>
      </Table>
      <div className="col-span-1"></div>
      {/* Right buffer */}
    </div>
  );
}
