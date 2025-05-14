import Table from "@/components/Custom/Table";
import React from "react";

const DashboardFirstDisplay = () => {
  const adherentData = {
    title: "Liste des adhérents",
    header: ["Noms", "Prenoms", "Department", "Email"],
    url: "fetch",
  };

  const nonadherentData = {
    title: "Liste des non adhérents",
    header: ["Noms", "Prenoms", "Department", "Email"],
    url: "fetch",
  };
  return (
    <div className="flex gap-x-3 p-4">
      <div className="flex-1">
        <Table {...adherentData} />
      </div>
      <div className="flex-1">
        <Table {...nonadherentData} />
      </div>
    </div>
  );
};

export default DashboardFirstDisplay;
