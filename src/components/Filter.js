import { useState, useContext } from "react";
import { View } from "react-native";
import { List } from "react-native-paper";
import { useQuery } from "@apollo/client";
import { TRANSACTIONS_QUERY } from "../context/SearchContext";
import { SearchContext } from "../context/SearchContext";

const FilterDropdown = () => {
  const [statusExpanded, setStatusExpanded] = useState(false);
  const [typeExpanded, setTypeExpanded] = useState(false);
  const { transactionsData } = useContext(SearchContext);
  const [transValue, setTransValue] = transactionsData;
  const { data } = useQuery(TRANSACTIONS_QUERY);

  const filterBy = (value) => {
    const keys = ["status", "type"];

    let filteredTransactions = data.transactions.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(value))
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

    setStatusExpanded(!statusExpanded);
  };

  return (
    <View style={{ padding: 16 }}>
      <List.Accordion
        title="Status"
        left={(props) => <List.Icon {...props} icon="filter" />}
        expanded={statusExpanded}
        onPress={() => setStatusExpanded(!statusExpanded)}
      >
        <List.Item
          title="Active"
          onPress={() => {
            filterBy("active");
          }}
        />
        <List.Item
          title="Pending"
          onPress={() => {
            filterBy("pending");
          }}
        />
        <List.Item
          title="Declined"
          onPress={() => {
            filterBy("declined");
          }}
        />
        <List.Item
          title="Withdrawal"
          onPress={() => {
            filterBy("withdrawal");
          }}
        />
        <List.Item
          title="Deposit"
          onPress={() => {
            filterBy("deposit");
          }}
        />
      </List.Accordion>
    </View>
  );
};

export default FilterDropdown;
