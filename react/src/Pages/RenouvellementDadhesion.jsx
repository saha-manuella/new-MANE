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

const RenouvellementDadhesion = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-1 p-10">
      {/* page 1 */}
      <div className="bg-gray-50 rounded-md p-8 w-[70%] mx-auto">
        {/* header */}
        <div className="p-3 relative">
          <p className="text-2xl text-center">
            FICHE DE DECLARATION  ANNUELLE SUR L'ADHESION AU CODE ETHIQUE ET DEONTOLOGIE
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
          Reconnais avoir reçu, lu et compris le sens et la portée du Code d'Ethique et de Déontologie de la Commercial Bank (CB). Je certifie y avoir adhéré au cours de la dernière année civile écoulée et je m'engage à en respecter les exigences dans le futur.Plus spécifiquement, je déclare avoir respecté les politiques et les directives en vigueur à la Banque.
          </p>

          <p>
          Je déclare ici tout intérêt ou activité extérieure dans le but de me conformer aux règles en matière de conflit d'intérêts et en matière de réserve dans les activités extérieures, J'inclus aussi les sociétés, les organisations et les organismes sans but lucratif pour lesquels j'agis à titre de dirigeant, d'administrateur ou à toute autre fonction ainsi que les sociétés publiques pour lesquelles mon ou ma conjointe ou toute autre personne liée (père, mère, frère, sœur, enfants) occupe un emploi de directeur, de dirigeant ou de membre du conseil d'administration:
          </p>

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
          <Line />
          <p>
          En aucun cas, je n'ai accepté de cadeaux, activités de divertissement, dons, services ou avantages autres que ceux de nature symbolique, de peu de valeur et non répétitifs.
Je reconnais avoir pris connaissance de mon obligation de déclarer tout dépassement de cette norme à l'aide du formulaire prescrit,

          </p>
          <p>
          Je déclare également que je n'ai eu connaissance ou été témoin d'aucun acte pouvant s'apparenter à un acte de fraude ou de corruption et si tel est le cas, je reconnais avoir pris connaissance de mon obligation de signaler de tels actes soupçonnés.
          </p>
        </div>
      </div>
      {/* page 2 */}

      <div className="bg-gray-50 rounded-md p-8 w-[70%] mx-auto mt-4">
        <div className="border-2 flex flex-col gap-y-4 bg-white border-yellow-500 rounded-tl-md rounded-br-md p-6 my-4">
          <p>Commentaires</p>

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
            Je certifie que les renseignements fornis  à la présente déclaration sont complets, exactes et sincères.
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

export default RenouvellementDadhesion;
