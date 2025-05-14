import React from "react";

const Signature = () => {
  return (
    <div className="flex gap-x-6 mb-10">
      <div className="flex-1 flex flex-col gap-y-10">
        <div className="flex">
          <p>Signature: </p>
          <p className="flex-1 border-b border-black"></p>
        </div>
        {/*  */}
        <div className="flex">
          <p>Fonction: </p>
          <p className="flex-1 border-b border-black"></p>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-y-10">
        <div className="flex">
          <p>Fonction: </p>
          <p className="flex-1 border-b border-black"></p>
        </div>
        {/* */}
        <div className="flex">
          <p>Direction: </p>
          <p className="flex-1 border-b border-black"></p>
        </div>
        {/*  */}
        <div className="flex">
          <p>Entreprise ou Organe partenaire</p>
          <p className="flex-1 border-b border-black"></p>
        </div>
      </div>
    </div>
  );
};

export default Signature;
