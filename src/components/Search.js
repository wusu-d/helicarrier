import { useContext, useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";
import { SearchContext } from "../context/SearchContext";
import { useQuery } from "@apollo/client";
import { TRANSACTIONS_QUERY } from "../context/SearchContext";

const SearchContainer = styled.View`
  padding: 16px;
`;

const Search = () => {
  const { query, transactionsData } = useContext(SearchContext);
  const [queryValue, setQueryValue] = query;
  const [transValue, setTransValue] = transactionsData;
  const { data } = useQuery(TRANSACTIONS_QUERY);

  const handleChangeText = (text) => {
    const keys = ["name", "status", "type", "date"];

    let filteredTransactions = data.transactions.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(queryValue))
    );

    setTransValue(
      Object.values(
        filteredTransactions.reduce((acc, item) => {
          if (!acc[item.date])
            acc[item.date] = {
              title: item.date,
              data: [],
            };
          acc[item.date].data.push(item);
          return acc;
        }, {})
      )
    );

    setQueryValue(text);
  };

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search transactions"
        value={queryValue}
        onSubmitEditing={() => {}}
        onChangeText={handleChangeText}
      />
    </SearchContainer>
  );
};

export default Search;
