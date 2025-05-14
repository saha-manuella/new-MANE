import React from "react";
import Background from "../assets/Images/accueil.png";
import weasel from "../assets/Images/weasel.png";
const Home = () => {
  return (
    <div className="flex items-center justify-center flex-1 relative">
      <img src={Background} alt="background image" />
      <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-end flex-col gap-y-5">
        {/* <img src={weasel} /> */}
        <h2 className="text-center text-4xl font-light mb-20">
          Bienvenue Christelle Manuella sur votre plateforme M.A.N.E <br />
          Un espace dedié à la conformité et la transparence dans la <br />
          gestion réglementaire.
        </h2>
      </div>
    </div>
  );
};

export default Home;
