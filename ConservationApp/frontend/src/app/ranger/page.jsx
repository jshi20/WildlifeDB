"use client";
import React, { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { fetchGroups, fetchRangers } from "@/services/rangerServices";
import RangerCard from "@/components/ranger/RangerCard";
import RangerForm from "@/components/ranger/RangerForm";
import RangerButton from "@/components/ranger/RangerButton";
import RangerTable from "@/components/ranger/RangerTable";

export default function Ranger() {
  const [rangers, setRangers] = useState([]);
  const [groups, setGroups] = useState([]);

  async function getRangers() {
    try {
      const data = await fetchRangers();
      setRangers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function getGroups() {
    try {
      const data = await fetchGroups();
      setGroups(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getRangers();
  }, []);

  return (
    <div className="container">
      <div className="col-span-1-"></div>
      {/* Left buffer */}
      <Navigation />
      <RangerForm rangers={rangers} getRangers={getRangers} />
      <div className="row">
        {rangers.map((ranger, index) => (
          <RangerCard key={index} ranger={ranger} setRangers={setRangers} />
        ))}
      </div>
      <div style={{ marginBottom: "20px" }}></div>
      <RangerButton getGroups={getGroups}></RangerButton>
      <div style={{ marginBottom: "20px" }}></div>
      <RangerTable groups={groups}></RangerTable>
      <div className="col-span-1"></div>
      {/* Right buffer */}
    </div>
  );
}
