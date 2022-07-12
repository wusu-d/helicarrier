import { useContext, useEffect, useState } from "react";
import { View, SectionList } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import styled from "styled-components/native";
import TransactionItem from "./TransactionItem";
import { SearchContext } from "../context/SearchContext";
import Search from "./Search";
import FilterDropdown from "./Filter";

const Heading = styled.Text`
  font-size: 22px;
  font-family: Lato_700Bold;
  text-align: center;
  padding-bottom: 10px;
  color: black;
`;

const DateHeader = styled.Text`
  font-size: 16px;
  font-family: Roboto_500Medium;
  color: black;
  margin-left: 16px;
  margin-top: 16px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const Transactions = () => {
  const { loading, transactionsData } = useContext(SearchContext);

  if (loading)
    return (
      <LoadingContainer>
        <Loading size={30} animating={true} color="black" />
      </LoadingContainer>
    );
  return (
    <View style={{ flex: 1, paddingBottom: 16 }}>
      <Search />
      <FilterDropdown />
      <Heading>Transactions</Heading>

      <SectionList
        sections={transactionsData[0]}
        renderItem={({ item }) => {
          return <TransactionItem transaction={item} />;
        }}
        renderSectionHeader={({ section }) => (
          <DateHeader>{section.title}</DateHeader>
        )}
        contentContainerStyle={{ padding: 8 }}
        keyExtractor={(item, index) => item + index}
      />
    </View>
  );
};

export default Transactions;
