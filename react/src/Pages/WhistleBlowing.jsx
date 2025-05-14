import React from "react";
import DiplayPDF from "@/components/Custom/DiplayPDF";
import pdf from "../assets/EXE Whistle Blowing final.pdf";

const WhistleBlowing = () => {
  return <DiplayPDF pdf={pdf}  />;
};

export default WhistleBlowing;
