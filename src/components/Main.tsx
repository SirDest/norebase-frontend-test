import React, { useEffect, useState } from "react";

const Main = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://api.coinlore.net/api/tickers/");
        const coinlore = await response.json();
        setItems(coinlore.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const indexOfFirstItem = currentPage * itemsPerPage;
  const indexOfLastItem = indexOfFirstItem + itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  console.log("currentItems", currentItems);

  //   const handleNext = () => {
  //     if ((currentPage + 1) * itemsPerPage < items.length) {
  //       setCurrentPage(currentPage + 1);
  //     }
  //   };

  //   const handlePrevious = () => {
  //     if (currentPage > 0) {
  //       setCurrentPage(currentPage - 1);
  //     }
  //   };

  return (
    <div className="bg-green-500 w-full h-screen flex justify-center p-12">
      <div className="bg-white w-[500px] h-[500px] border border-gray-300 flex">
        {isLoading ? (
          <p className="text-center m-auto">Loading...</p>
        ) : (
          <div>
            <table className="h-full w-full">
              <thead className="bg-white w-full border-b">
                <tr className="flex w-full justify-between px-4 py-3 text-left text-gray-700 font-semibold">
                  <th className="w-1/4">Coin</th>
                  <th className="w-1/4">Code</th>
                  <th className="w-1/4">Price</th>
                  <th className="w-1/4">Total Supply</th>
                </tr>
              </thead>
              <tbody className="h-full w-full">
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
            <div className="flex justify-between "></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
