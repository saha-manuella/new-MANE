import Table from "@/components/Custom/Table";
import React from "react";

const ListOfadherents = () => {
  const Employe = {
    title: "Employé",
    header: ["Noms", "Prenoms", "Department", "Email"],
    url: "fetch",
  };
  const Prestataires = {
    title: "Prestataires",
    header: ["Noms", "Prenoms", "Department", "Email"],
    url: "fetch",
  };
  const Clients = {
    title: "Clients",
    header: ["Noms", "Prenoms", "Department", "Email"],
    url: "fetch",
  };
  return (
    <div>
      <p className="bg-gray-100 text-center py-3 text-lg font-semibold border-x border-t border-black">
        Listes des adhérents
      </p>
      <div className="flex gap-x-3 bg-gray-100">
        <div className="flex-1">
          <Table {...Employe} />
        </div>
        <div className="flex-1">
          <Table {...Prestataires} />
        </div>
        <div className="flex-1">
          <Table {...Clients} />
        </div>
      </div>
    </div>
  );
};

export default ListOfadherents;
