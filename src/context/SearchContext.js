import { useState, createContext, useEffect } from "react";

import { gql, useQuery } from "@apollo/client";

export const SearchContext = createContext();

export const TRANSACTIONS_QUERY = gql`
  query Transactions {
    transactions {
      id
      status
      date
      name
      type
    }
  }
`;

const SearchContextProvider = ({ children }) => {
  const transactionsData = useState([]);
  const { loading, error } = useQuery(TRANSACTIONS_QUERY, {
    onCompleted: (data) =>
      setTransactionsData(
        Object.values(
          data.transactions.reduce((acc, item) => {
            if (!acc[item.date])
              acc[item.date] = {
                title: item.date,
                data: [],
              };
            acc[item.date].data.push(item);
            return acc;
          }, {})
        )
      ),
  });
  const query = useState(""),
    [, setTransactionsData] = transactionsData;

  // useEffect(() => {
  //   setTransactionsData(
  //     Object.values(
  //       transactions.reduce((acc, item) => {
  //         if (!acc[item.date])
  //           acc[item.date] = {
  //             title: item.date,
  //             data: [],
  //           };
  //         acc[item.date].data.push(item);
  //         return acc;
  //       }, {})
  //     )
  //   );
  // }, []);

  return (
    <SearchContext.Provider value={{ query, transactionsData, loading }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
