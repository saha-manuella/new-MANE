import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import user from "../assets/Images/user.png";
import { Link, useNavigate } from "react-router-dom";

const Auth = () => {
  const [isInscription, setisInscription] = useState(false);
  const [selectValue, setSelectValue] = useState("Resources Humaines");
  const [email, setemail] = useState("");
  const [error, seterror] = useState("");
  const [otherManager, setOtherManager] = useState("");
  const [managerError, setManagerError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const navigate = useNavigate();

  const isValidGCBEmail = (email) => email.endsWith("@groupecommercialbank.com");

  const forbiddenManagerValues = [
    "resources humaines",
    "RESOURCES HUMAINES",
    "Resources Humaines",
    "RH",
    "rh",
  ];

  const HandleSubmit = () => {
    if (isInscription) {
      if (
        selectValue === "Autre" &&
        forbiddenManagerValues.includes(otherManager.trim())
      ) {
        setManagerError("Cette information n'est pas correcte");
        return;
      }
      if (
        selectValue === "Autre" &&
        isValidGCBEmail(email)
      ) {
        seterror("l'adresse email n'est pas valide!");
        return;
      }
      if (
        selectValue === "Resources Humaines" &&
        !isValidGCBEmail(email)
      ) {
        seterror("Adresse email invalide !");
        return;
      }
      seterror("");
      setManagerError("");
      navigate("/home");
    } else {
      navigate("/verification");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-4 py-20 bg-gray-50 flex-1 max-w-[600px] shadow-lg rounded-lg ">
        <img src={user} alt="icon" className="mx-auto" />
        <p className="text-center pt-4">
          {isInscription ? "INSCRIPTION" : "CONNEXION"}
        </p>

        <div className="mx-auto max-w-[400px] ">
          <div className="grid grid-cols-2 gap-x-4 text-xs mt-4 mb-2">
            <p>Code Client</p>
            <p>Cle</p>
          </div>

          <div className="grid grid-cols-2 gap-x-4">
            <Input required className="flex-1" />
            <Input required className="w-50" />
          </div>

          {isInscription && (
            <>
              <p className="text-xs mt-4 mb-2">Nom du Gestionnaire</p>
              <select
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                className="w-full bg-gray-50 shadow-sm py-2 rounded-md border text-gray-300 text-sm"
              >
                <option value="Resources Humaines">Resources Humaines</option>
                <option value="Autre">Autres</option>
              </select>

              {selectValue === "Autre" && (
                <>
                  <p className="text-xs mt-4 mb-2">Autres</p>
                  <Input
                    required
                    value={otherManager}
                    onChange={(e) => {
                      setOtherManager(e.target.value);
                      if (forbiddenManagerValues.includes(e.target.value.trim())) {
                        setManagerError("Cette information n'est pas correcte");
                      } else {
                        setManagerError("");
                      }
                    }}
                    placeholder="Veuillez preciser le nom du gestionnaire"
                    className="placeholder:text-gray-300"
                  />
                  <p className="text-red-600 text-sm py-1">{managerError}</p>
                </>
              )}

              <p className="text-xs mt-4 mb-2">Email</p>
              <Input
                required
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                  setEmailTouched(true);
                  if (
                    (selectValue === "Autre" && isValidGCBEmail(e.target.value)) ||
                    (selectValue === "Resources Humaines" && !isValidGCBEmail(e.target.value))
                  ) {
                    seterror(
                      selectValue === "Autre"
                        ? "l'adresse email n'est pas valide!"
                        : "Adresse email invalide !"
                    );
                  } else {
                    seterror("");
                  }
                }}
                className="placeholder:text-gray-300"
                placeholder={
                  selectValue === "Resources Humaines"
                    ? "@groupecommercialbank.com"
                    : ""
                }
              />
              <p className="text-red-600 text-sm py-1">{emailTouched && error}</p>

              <p className="text-xs mt-4 mb-2">Noms</p>
              <Input type="text" required />

              <p className="text-xs mt-2 mb-2">Prénoms</p>
              <Input type="text" required />

              <p className="text-xs mt-4 mb-2">Numéro de téléphone</p>
              <Input type="tel" required />
            </>
          )}

          <Button
            className="mx-auto flex mt-4 bg-yellow-500 hover:bg-yellow-600"
            onClick={HandleSubmit}
          >
            {isInscription ? "Inscription" : "Connexion"}
          </Button>

          <p className="text-sm mt-5 text-center text-gray-400">
            {isInscription
              ? "Vous avez déjà un compte? connectez-vous"
              : "Vous n'avez pas encore de compte? inscrivez-vous"}
            <span
              className="underline ml-2 cursor-pointer"
              onClick={() => setisInscription((prev) => !prev)}
            >
              ici
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
