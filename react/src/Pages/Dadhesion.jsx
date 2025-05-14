import Line from "@/components/Custom/Line";
import Signature from "@/components/Custom/Signature";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Dadhesion = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-10">
      {/* page 1 */}
      <div className="bg-gray-50 rounded-md p-8 w-[70%] mx-auto">
        {/* header */}
        <div className="p-3 relative">
          <p className="text-2xl text-center">
            FICHE D'ADHESION AU CODE ETHIQUE ET DE DEONTOLOGIE
          </p>
          <p className="absolute bottom-0 mb-3 font-bold"></p>
        </div>
        {/* gold page */}
        <div className="border-2 flex flex-col gap-y-4 bg-white border-yellow-500 rounded-tl-md rounded-br-md p-6 my-4">
          <div className="flex">
            <p>Je Soussigne(e), </p>
            <p className="flex-1 border-b border-black"></p>
          </div>

          <p>
          reconnais avoir reçu, lu et compris le sens et la portée du Code d'Ethique et de Déontologie de la CB (Commercial Bank) et m'engage à en respecter les exigences. Je comprends que ma signature comporte l'engagement de respecter les politiques et directives en vigueur à la Banque.
          </p>

          <p>
          Je déclare Ici tout interêt ou activité extérieure dans le but de me conformer aux règles en matière de conflit d'intérêts et en matière de réserve dans les activités extérieures. J'inclus aussi les sociétés, les organisations et les organismes sans but lucratif pour lesquels j'agis à titre de dirigeant, d'administrateur ou à toute autre fonction ainsi que les sociétés publiques pour lesquelles mon ou ma conjointe ou toute autre personne liée (père, mère, frères, sœurs, enfants) occupe un emploi de directeur, de dirigeant ou de membre du conseil d'administration:
          </p>

          <Line />
          <Line />
          <Line />
          <Line />

          <p>
          Titres compris dans mon portefeuille d'investissements personnels (par exemple, actions cotées ou non, instruments financiers dérivés sur actions, obligations de sociétés), Il n'est pas requis de fournir les renseignements sur les unités de fonds communs de placement détenues. Fournir les renseignements ou les états de compte:
          </p>

          <div className="mx-10">
            <table className="w-full border-2 rounded-tr-lg rounded-bl-lg border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-2 py-3">Description</th>
                  <th className="border-2">Firme de courtage</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="p-5 border"></td>
                  <td className="p-5 border"></td>
                </tr>

                <tr>
                  <td className="p-5 border"></td>
                  <td className="p-5 border"></td>
                </tr>

                <tr>
                  <td className="p-5 border"></td>
                  <td className="p-5 border"></td>
                </tr>

                <tr>
                  <td className="p-5 border"></td>
                  <td className="p-5 border"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* page 2 */}

      <div className="bg-gray-50 rounded-md p-8 w-[70%] mx-auto mt-4">
        <div className="border-2 flex flex-col gap-y-4 bg-white border-yellow-500 rounded-tl-md rounded-br-md p-6 my-4">
          <p>
          S'il y a lieu, je joins la liste des titres des personnes pour lesquelles j'agis à titre de mandataire, de fondé de pouvoir, de représentant ou de conseiller.
          </p>

          <div className="flex">
            <p>Noms des personnes: </p>
            <p className="flex-1 border-b border-black"></p>
          </div>

          <Line />
          <Line />
          <Line />
          <Line />
          <Line />
          <Line />
          <Line />
          <Line />
          <Line />
          <Line />
          <Line />

          <p>
          Je certifie que les renseignements fournis à la présente déclaration sont complets, exactes et sincères.
          </p>

          <Signature />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 mx-auto max-w-[1000px]">
        <Button
          className=" bg-yellow-500 hover:bg-yellow-600"
          onClick={() => navigate(-1)}
        >
          Retour
        </Button>

        <AlertDialog>
          <AlertDialogTrigger>
            <Button className=" bg-yellow-500 hover:bg-yellow-600">
              Vailder
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center my-5">
                Vous etes sur de vouloir valider ?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <div className="justify-between flex items-center">
              <AlertDialogAction className="p-0">
                <Button className="mx-auto flex px-8 bg-yellow-500 hover:bg-yellow-600">
                  Oui
                </Button>
              </AlertDialogAction>

              <AlertDialogAction className="p-0">
                <Button className="mx-auto flex px-8 bg-yellow-500 hover:bg-yellow-600">
                  Non
                </Button>
              </AlertDialogAction>

              <AlertDialogCancel className="p-0 px-2 absolute right-2 bg-transparent border-none shadow-none top-0">
                <XCircleIcon size={3} />
              </AlertDialogCancel>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Dadhesion;
