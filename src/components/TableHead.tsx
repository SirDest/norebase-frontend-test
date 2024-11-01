import React from "react";
import { generateClassName } from "./utils/tailwind";
const sectionStyles = ["flex", "w-1/2", "justify-between"];
const TableHead = () => {
  return (
    <div className="bg-white md:flex hidden w-full justify-between px-4 py-3 text-left text-gray-700 font-semibold">
      <div className={generateClassName(sectionStyles)}>
        <p className="w-1/2">💰Coin</p>
        <p className="w-1/2">📄Code</p>
      </div>
      <div className={generateClassName(sectionStyles)}>
        <p className="w-1/2">🤑Price</p>
        <p className="w-1/2">📉Total Supply</p>
      </div>
    </div>
  );
};

export default TableHead;
