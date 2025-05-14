import React, { useEffect } from "react";

const Table = (props) => {
  const userData = [
    {
      id: "1",
      noms: "Collins",
      prenoms: "Frank",
      department: "BTECH",
      email: "admin@gmail.com",
    },
    {
      id: "2",
      noms: "Frank",
      prenoms: "Collins",
      department: "BTECH",
      email: "Tacj@gmail.com",
    },
  ];
  useEffect(() => {
    //    fectch data from backend url. which was passed as a props to this component at props.url

    return () => {};
  }, []);

  return (
    <>
      <p className="bg-gray-100 text-center py-3 text-lg font-semibold border border-black" >
        {props.title} 
      </p>
      <table className="w-full text-center border-collapse border-2">
        <thead className="bg-yellow-500">
          <tr>
            {props.header.map((heading) => (
              <th className="border">{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userData.map((data) => {
            const Comp = ({ title }) => <td className="border">{title}</td>;
            return (
              <tr key={data.id} className="bg-white">
                <Comp title={data.noms} />
                <Comp title={data.prenoms} />
                <Comp title={data.department} />
                <Comp title={data.email} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
