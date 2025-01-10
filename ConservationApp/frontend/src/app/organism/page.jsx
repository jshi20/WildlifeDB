"use client";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import OrganismRow from "@/components/organism/OrganismRow";
import OrganismButton from "@/components/organism/OrganismButton";
import { Table } from "react-bootstrap";
import { fetchOrganisms } from "@/services/organismServices";
import OrganismForm from "@/components/organism/OrganismForm";
import OrganismTable from "@/components/organism/OrganismTable";
import { selectOrganisms, fetchSpecies } from "@/services/organismServices";
import OrganismInsertForm from "@/components/organism/OrganismInsertForm";

export default function Organism() {
  const [allOrganisms, setAllOrganisms] = useState([]);
  const [allSpecies, setAllSpecies] = useState([]);
  const [organisms, setOrganisms] = useState([]);
  const [filteredOrganisms, setFilteredOrganisms] = useState([]);

  async function getAllOrganisms() {
    try {
      const data = await selectOrganisms("");
      setAllOrganisms(data);
      const species = await fetchSpecies();
      setAllSpecies(species);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getAllOrganisms();
  }, []);

  async function getOrganisms() {
    try {
      const data = await fetchOrganisms();
      setOrganisms(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="container">
      <div className="col-span-1-"></div>
      {/* Left buffer */}
      <Navigation />
      <OrganismInsertForm getAllOrganisms={getAllOrganisms} />
      <h>All Registered Species</h>
      <OrganismTable organisms={allSpecies} />
      <h>All Organisms</h>
      <OrganismTable organisms={allOrganisms} />
      <div style={{ marginBottom: "20px" }}></div>
      <OrganismButton getOrganisms={getOrganisms} />
      <div style={{ marginBottom: "20px" }}></div>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Tag</th>
            <th>Sex</th>
            <th>Age</th>
            <th>Species</th>
          </tr>
        </thead>
        <tbody key="row">
          {organisms.map((organism) => (
            <OrganismRow key={organism.tag} organism={organism}></OrganismRow>
          ))}
        </tbody>
      </Table>
      <OrganismForm setFilteredOrganisms={setFilteredOrganisms} />
      <OrganismTable organisms={filteredOrganisms} />
      <div className="col-span-1"></div>
      {/* Right buffer */}
    </div>
  );
}
