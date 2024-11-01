import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import TableHead from "./TableHead";
import { generateClassName } from "./utils/tailwind";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";

const Main = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [errorLoading, setErrorLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const titleStyle = ["font-bold", "md:hidden", "block", "text-[14px]"];
  const rowItemStyles = ["w-1/2", "text-gray-800", "gap-2"];
  const rowSectionStyles = [
    "flex",
    "flex-row",
    "md:w-1/2",
    "w-full",
    "justify-between",
  ];
  const buttonStyles = [
    "active:outline",
    "focus:outline",
    "focus:outline-yellow-200",
    "active:outline-black",
    "outline-1",
    "flex",
    "gap-2",
    "items-center",
  ];

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://api.coinlore.net/api/tickers/");
        const coinlore = await response.json();
        setItems(coinlore.data);
      } catch (error) {
        console.error("Error fetching items:", error);
        setErrorLoading(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const indexOfFirstItem = currentPage * itemsPerPage;
  const indexOfLastItem = indexOfFirstItem + itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = () => {
    if ((currentPage + 1) * itemsPerPage < items.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  //
  return (
    <div className="w-full h-screen flex justify-start md:justify-center p-0">
      <div className="bg-white w-[80%] md:w-[650px] h-fit min-h-[400px] border border-gray-400 flex">
        {errorLoading ? (
          <ErrorPage />
        ) : isLoading ? (
          <Loading />
        ) : (
          <div className="w-full h-full flex flex-col">
            <div className="h-full w-full">
              <TableHead />
              <div className="h-full w-full text-[13px]">
                {currentItems.map(
                  ({ id, name, symbol, price_usd, tsupply }) => {
                    return (
                      <div
                        key={id}
                        className="flex md:flex-row flex-col w-full justify-between px-4 py-2 border-b border-gray-300 hover:bg-gray-300 bg-gray-100 even:bg-white transition-all duration-300 gap-2 md:gap-0"
                      >
                        <div className={generateClassName(rowSectionStyles)}>
                          <div className={generateClassName(rowItemStyles)}>
                            <p className={generateClassName(titleStyle)}>
                              💰Coin
                            </p>
                            <p>{name}</p>
                          </div>
                          <div className={generateClassName(rowItemStyles)}>
                            <p className={generateClassName(titleStyle)}>
                              📄Code
                            </p>
                            <p>{symbol}</p>
                          </div>
                        </div>
                        <div className={generateClassName(rowSectionStyles)}>
                          <div className={generateClassName(rowItemStyles)}>
                            <p className={generateClassName(titleStyle)}>
                              🤑Price
                            </p>
                            <p>{price_usd}</p>
                          </div>
                          <div className={generateClassName(rowItemStyles)}>
                            <p className={generateClassName(titleStyle)}>
                              📉Total Supply
                            </p>
                            <p>{tsupply}</p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            <div className="w-full flex justify-between p-2">
              <div className="flex-1">
                {currentPage >= 1 && (
                  <button
                    onClick={handlePrevious}
                    className={generateClassName(buttonStyles)}
                  >
                    <AiOutlineArrowLeft className="text-[12px]" /> Prev
                  </button>
                )}
              </div>
              <div className="flex-1 flex justify-end">
                {currentPage < totalPages - 1 && (
                  <button
                    onClick={handleNext}
                    className={generateClassName(buttonStyles)}
                  >
                    Next <AiOutlineArrowRight className="text-[12px]" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
