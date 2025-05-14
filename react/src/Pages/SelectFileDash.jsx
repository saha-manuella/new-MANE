import { Search, CheckCircle } from "lucide-react";
import React, { useState } from "react";

const SelectFileDash = () => {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);

    const fileReaders = uploadedFiles.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ name: file.name });
        reader.onerror = reject;
        reader.readAsText(file);
      });
    });

    Promise.all(fileReaders).then((results) => {
      setFiles([...files, ...results]);
    });
  };

  const toggleSelectFile = (fileName) => {
    setSelectedFiles((prevSelected) =>
      prevSelected.includes(fileName)
        ? prevSelected.filter((f) => f !== fileName)
        : [...prevSelected, fileName]
    );
  };

  const handleAjouter = () => {
    // Ne fait rien pour l'instant
  };

  return (
    <div className="p-5 w-full flex flex-col gap-y-3">
      <div className="p-5 bg-white sticky top-14 flex justify-between">
        {/* Search bar */}
        <div className="flex gap-x-1 pl-2 rounded-md items-center bg-gray-50 w-fit shadow-sm">
          <Search size={18} />
          <input type="text" className="bg-transparent p-2 outline-none" />
        </div>

        <div className="flex w-[600px] gap-x-3">
          <select className="w-full bg-gray-50 shadow-sm py-2 rounded-md border text-gray-500 text-sm outline-none">
            <option value="">Droit d'accès</option>
            <option value="externe">Utilisateurs externes</option>
            <option value="interne">Utilisateurs internes</option>
            <option value="tous">Tout le monde</option>
          </select>

          <select className="w-full bg-gray-50 shadow-sm py-2 rounded-md border text-gray-500 text-sm outline-none">
            <option value="">Fréquence de rénouvellement</option>
            <option value="trimestrielle">Trimestriel</option>
            <option value="semestrielle">Semestriel</option>
            <option value="annuelle">Annuelle</option>
            <option value="aucun">Aucun</option>
          </select>
        </div>
      </div>

      <div className="p-5 grow overflow-scroll flex flex-col gap-y-3">
        {files.length === 0 ? (
          <p className="text-gray-400 text-center mt-20">Aucun document importé</p>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {files.map((file, index) => (
              <div
                key={index}
                onClick={() => toggleSelectFile(file.name)}
                className={`p-5 bg-white flex flex-col rounded-lg cursor-pointer border relative shadow-sm ${
                  selectedFiles.includes(file.name) ? "border-yellow-500" : ""
                }`}
              >
                {selectedFiles.includes(file.name) && (
                  <CheckCircle className="text-yellow-500 absolute top-2 right-2" size={20} />
                )}
                <p className="text-sm font-semibold break-words mb-2">{file.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-5 bg-white sticky left-0 right-0 bottom-0 flex justify-between items-center">
        <label
          htmlFor="file"
          className=" bg-yellow-500 hover:bg-yellow-600 text-white rounded-md flex items-center justify-center px-4 text-sm shadow-sm w-fit p-2"
        >
          Importer un document
        </label>
        <input
          type="file"
          name="file"
          id="file"
          className="hidden"
          onChange={handleFileUpload}
          multiple
        />

        <button
          onClick={handleAjouter}
          className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-md px-4 text-sm shadow-sm p-2"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default SelectFileDash;
