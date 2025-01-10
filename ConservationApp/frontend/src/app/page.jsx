"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import AnimalForm from "@/components/animal/AnimalForm";
import Navigation from "@/components/Navigation";
import { useState } from "react";
import AnimalTable from "@/components/animal/AnimalTable";

export default function Home() {
  const [animals, setAnimals] = useState([]);

  return (
    <div className="container">
      <div className="col-span-1-"></div> {/* Left buffer */}
      <Navigation />
      <AnimalForm setAnimals={setAnimals} />
      <AnimalTable animals={animals} />
      <div className="col-span-1"></div> {/* Right buffer */}
    </div>
  );
}
