import confetti from "canvas-confetti";
import React from "react";
import { Link } from "react-router-dom";

const QuizzFin = () => {
  confetti({
    particleCount: 120,
    angle: 60,
    spread: 100,
  });
  // and launch a few from the right edge
  confetti({
    particleCount: 120,
    angle: 120,
    spread: 100,
  });

  confetti({
    particleCount: 200,
    angle: 90,
    spread: 100,
  });
  return (
    <div className="flex-1 flex flex-col items-center justify-center flex-grow gap-y-3">
      <h2 className="text-5xl">Félicitations vous avez terminé votre quizz</h2>
      <p className="text-2xl">
        Votre Score est de 100% téléchargez votre attestation
        <Link to={"/home/declaration"}>
          <span className="underline ml-3">ici</span>
        </Link>
      </p>
      <Link to={"/home/demand/new"} className="underline text-2xl">
        Accéder à la fiche d’adhésion au code éthique
      </Link>
      <Link to={"/home/demand/renouvellement"} className="underline text-2xl">
        Accéder à la fiche de renouvellement d’adhésion au code éthique
      </Link>
    </div>
  );
};

export default QuizzFin;
