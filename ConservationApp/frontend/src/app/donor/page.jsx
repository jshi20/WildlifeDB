"use client";
import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import { fetchDonors, fetchGroups } from "@/services/donorServices";
import DonorTable from "@/components/donor/DonorTable";
import DonorForm from "@/components/donor/DonorForm";
import DonorButton from "@/components/donor/DonorButton";
import GroupTable from "@/components/donor/GroupTable";

export default function Donor() {
  const [donors, setDonors] = React.useState([]);
  const [groups, setGroups] = React.useState([]);

  async function getDonors() {
    try {
      const data = await fetchDonors("");
      setDonors(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function groupDonors() {
    try {
      const data = await fetchGroups();
      setGroups(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getDonors();
  }, []);

  return (
    <div className="container">
      <div className="col-span-1-"></div> {/* Left buffer */}
      <Navigation />
      <DonorForm setDonors={setDonors} />
      <DonorTable donors={donors} />
      <DonorButton groupDonors={groupDonors} />
      <div style={{ marginBottom: "20px" }}></div>
      <GroupTable groups={groups} />
      <div className="col-span-1"></div> {/* Right buffer */}
    </div>
  );
}
