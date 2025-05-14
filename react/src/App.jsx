import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Pages/Auth";
import FirstLayout from "./Layouts/FirstLayout";
import Home from "./Pages/Home";
import Ethique from "./Pages/Ethique";
import Quizz from "./Pages/Quizz";
import Utilisateurs from "./Pages/Utilisateurs";
import Administrateurs from "./Pages/Administrateurs";
// import NotesDeServices from "./Pages/NotesDeServices";
import Notifications from "./Pages/Notifications";
import Declaration from "./Pages/Declaration";
import Faq from "./Pages/Faq";
import QuizzLayout from "./Layouts/QuizzLayout";
import QuizzFin from "./Pages/QuizzFin";
import Demand from "./Pages/Demand";
import WhistleBlowing from "./Pages/WhistleBlowing";
import Dashboard from "./Pages/Dashboard";
import DashboardFirstDisplay from "./Pages/DashboardFirstDisplay";
import ListOfadherents from "./Pages/ListOfadherents";
import ListOfNonadherents from "./Pages/ListOfNonadherents";
import Dadhesion from "./Pages/Dadhesion";
import RenouvellementDadhesion from "./Pages/RenouvellementDadhesion";
import Verification from "./Pages/Verification";
import SelectFileDash from "./Pages/SelectFileDash";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<FirstLayout />}>
          <Route index element={<Home />} />
          <Route path="/home/ethique" element={<Ethique />} />
          <Route path="/home/whistle" element={<WhistleBlowing />} />
          <Route path="/home/quizz" element={<QuizzLayout />}>
            <Route index element={<Quizz />} />
            <Route path="/home/quizz/finish" element={<QuizzFin />} />
          </Route>
          <Route path="/home/utilisateurs" element={<Utilisateurs />} />
          <Route path="/home/administrateurs" element={<Administrateurs />} />
          {/* <Route path="/home/notes de services" element={<NotesDeServices />} /> */}
          <Route path="/home/notifications" element={<Notifications />} />
          <Route path="/home/declaration" element={<Declaration />} />
          <Route path="/home/faq" element={<Faq />} />
          <Route path="/home/dadhesion" element={<Dadhesion />} />
          <Route
            path="/home/renouvellementdadhesion"
            element={<RenouvellementDadhesion />}
          />
          <Route path="/home/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardFirstDisplay />} />
            <Route
              path="/home/dashboard/adherents"
              element={<ListOfadherents />}
            />
            <Route
              path="/home/dashboard/nonadherents"
              element={<ListOfNonadherents />}
            />
          </Route>
          <Route path="/home/dashboard/files" element={<SelectFileDash />} />

          <Route path="/home/demand/:value" element={<Demand />} />
        </Route>

        <Route path="/verification" element={<Verification />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
