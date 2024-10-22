import React from "react";
import "./Component.css";
import Timer from "./Timer/Timer2";
import Add from "./Add/Add";
import Temperature from "./Temperature/Temperature";
import Count from "./Counter/Count";

function Component() {
  return (
    <div className="component-container">
      <div className="countNtimerNadd">
        <div className="flex-auto w-64">
          <div className="count1">
            <Count />
          </div>
          <div className="timer1">
            <Timer value={120000} name={"Timer"} />
          </div>
        </div>
        <div id="add1" className="">
          <Add aValue={10} bValue={30} />
        </div>
      </div>
      <div className="temp-container">
        
          <Temperature />
        
      </div>
    </div>
  );
}

export default Component;
