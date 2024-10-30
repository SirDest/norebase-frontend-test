import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const Main = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [errorLoading, setErrorLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(items.length / itemsPerPage);

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

  return (
    <div className="w-full h-screen flex justify-center p-0 md:p-12">
      <div className="bg-white w-full md:w-[650px] h-fit min-h-[400px] border border-gray-300 flex">
        {errorLoading ? (
          <p className="text-center m-auto text-[13px]">
            Loading failed! Check Iternet connection and try again.
          </p>
        ) : isLoading ? (
          <p className="text-center m-auto text-[13px]">
            Loading... Please Wait!
          </p>
        ) : (
          <div className="w-full h-full flex flex-col">
            <table className="h-full w-full">
              <thead className="bg-white w-full border-b">
                <tr className="flex w-full justify-between px-4 py-3 text-left text-gray-700 font-semibold">
                  <th className="w-1/4">💰Coin</th>
                  <th className="w-1/4">📄Code</th>
                  <th className="w-1/4">🤑Price</th>
                  <th className="w-1/4">📉Total Supply</th>
                </tr>
              </thead>
              <tbody className="h-full w-full text-[13px]">
                {currentItems.map(
                  ({ id, name, symbol, price_usd, tsupply }) => {
                    return (
                      <tr
                        key={id}
                        className="flex w-full justify-between px-4 py-2 border-b border-b-gray-300 hover:bg-gray-300 bg-gray-100 even:bg-white transition-all duration-300"
                      >
                        <td className="w-1/4 text-gray-800">{name}</td>
                        <td className="w-1/4 text-gray-800">{symbol}</td>
                        <td className="w-1/4 text-gray-800">{price_usd}</td>
                        <td className="w-1/4 text-gray-800">{tsupply}</td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
            <div className="w-full flex justify-between p-2">
              <div className="flex-1">
                {currentPage >= 1 && (
                  <button
                    onClick={handlePrevious}
                    className="border-none outline-none flex gap-2 items-center"
                  >
                    <AiOutlineArrowLeft className="text-[12px]" /> Prev
                  </button>
                )}
              </div>
              <div className="flex-1 flex justify-end">
                {currentPage < totalPages - 1 && (
                  <button
                    onClick={handleNext}
                    className="border-none outline-none flex gap-2 items-center"
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
