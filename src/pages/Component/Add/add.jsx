import { useEffect, useState } from "react";
import Variable from "../Variable/Variable";
import "./add.css";

function Add({ aValue, bValue }) {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  useEffect(() => {
    setA(aValue || 0);
    setB(bValue || 0);
  }, [aValue, bValue]);

  return (
    <div className="add-container">
      <h3 className="text-3xl m-2 p-4 badge">ADD</h3>
      <h2 className="d-flex justify-content-around">
        <span className="badge-lg badge box-content h-5 w-13 border-1 border-black text-2xl">
          A = {a}
        </span>
        <span className="badge-lg badge box-content h-5 w-13 border-1 border-black text-2xl">
          A+B= {a + b}
        </span>
        <span className="badge-lg badge box-content h-5 w-13 border-1 border-black text-2xl">
          B = {b}
        </span>
      </h2>
      <div className="d-flex justify-content-around">
        <span className="m-2 text-2xl">
          <Variable type={"int"} name={"A"} value={a} setValue={setA} />
        </span>
        <span className="m-2 text-2xl">
          <Variable type={"int"} name={"B"} value={b} setValue={setB} />
        </span>
      </div>
    </div>
  );
}

export default Add;
