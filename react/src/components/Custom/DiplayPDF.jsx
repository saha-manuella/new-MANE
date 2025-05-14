import PDFComponent from "@/components/Custom/PDFComponent";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { pdfjs } from "react-pdf";
import { useNavigate } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const DiplayPDF = ({ pdf, button }) => {
  const navigate = useNavigate();
  const [scale, setscale] = useState(1);
  console.log(scale);
  return (
    <div className=" flex-1 overflow-x-scroll">
      <div className="h-[94.5vh] bg-gray-200 p-20 overflow-scroll">
        <div className="flex justify-center mb-3 gap-2">
          <Button
            className="bg-gray-400"
            onClick={() => setscale((prev) => prev + 1)}
          >
            +
          </Button>
          <Button
            className="bg-gray-400"
            onClick={() => setscale((prev) => (prev > 1 ? prev - 1 : null))}
          >
            -
          </Button>
        </div>
        <PDFComponent scale={scale} pdf={pdf} />

        {button && (
          <Button
            className="mx-auto flex mt-4 bg-yellow-500 hover:bg-yellow-600"
            onClick={() => navigate("/home/quizz")}
          >
            Acceder au Quizz
          </Button>
        )}
      </div>
    </div>
  );
};

export default DiplayPDF;
