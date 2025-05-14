import { Button } from "@/components/ui/button";
import React from "react";
import FaqImg from "../assets/Images/question-mark.png"
const FaqComponent = () => {
  return (
    <div className="p-10 rounded-lg bg-white relative">
      <div className="absolute -top-5 left-5 w-[50px]">
        <img src={FaqImg} alt="" className="w-full h-full" />
      </div>
      <h2 className="font-bold mb-3">
        Comment un utilisateur s'enregistre-t-il?
      </h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda
        repudiandae aliquam dolores sed saepe nemo amet ipsa possimus in, ut
        maxime tenetur ullam ipsam ducimus, nulla laboriosam! Minus, tempore
        aspernatur?
      </p>
    </div>
  );
};
const Faq = () => {
  return (
    <div className="flex-1 p-4 bg-gray-100 flex flex-col gap-y-4">
      <div className="py-14 bg-gray-200 rounded-xl flex flex-col items-center justify-center gap-y-3">
        <p className="font-bold">FAQ's</p>
        <h1 className="font-bold text-2xl">Posez-nous toutes vos question.</h1>
        <p className="font-semibold">
          Vous avez des question? Nous sommes la pour vous aider.
        </p>
      </div>
      {/* grid div to display faq */}
      <div className="p-2 grid grid-cols-3 gap-x-4 gap-y-8 ">
        <FaqComponent />
        <FaqComponent />
        <FaqComponent />
        <FaqComponent />
        <FaqComponent />
        <FaqComponent />
        {/* <FaqComponent />
        <FaqComponent />
        <FaqComponent />
        <FaqComponent />
        <FaqComponent /> */}
      </div>
      <div className="py-10 px-5 bg-gray-200 rounded-xl mt-4">
        <h3 className="font-bold">Vous avez encore des question?</h3>
        <div className="flex justify-between items-center">
          <p>
            Vous ne trouvez pas la reponse a votre question? N'hesitez pas a
            nous contacter.
          </p>
          {/* button */}
          <Button className=" bg-yellow-500 hover:bg-yellow-600">
            Contactez-nous
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Faq;
