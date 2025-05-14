import DiplayPDF from "@/components/Custom/DiplayPDF";
import React from "react";
import pdf from "../assets/Charte des utilisateurs de Commercial Bank - Cameroun_avec_couverture.pdf";
const Utilisateurs = () => {
  return <DiplayPDF pdf={pdf} />;
};

export default Utilisateurs;
