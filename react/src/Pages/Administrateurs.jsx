import DiplayPDF from "@/components/Custom/DiplayPDF";
import React from "react";
import pdf from "../assets/Charte des administrateurs de Commercial Bank - Cameroun_avec_couverture.pdf";
const Administrateurs = () => {
  return <DiplayPDF pdf={pdf} />;
};

export default Administrateurs;
