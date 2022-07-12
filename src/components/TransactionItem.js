import { Text, View } from "react-native";
import styled from "styled-components/native";

const TransactionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
`;

const Name = styled.Text`
  font-size: 20px;
  font-family: Lato_700Bold;
  color: #0066ff;
`;

const Type = styled.Text`
  font-family: Roboto_400Regular;
  font-size: 16px;
  color: #757575;
`;

const Section = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

const StatusContainer = styled.View`
  background-color: ${({ status }) => {
    if (status === "active") {
      return "#138000";
    } else if (status === "pending") {
      return "orange";
    } else {
      return "#D0421B";
    }
  }};
  border-radius: 6px;
  padding: 4px;
  justify-content: center;
  align-items: center;
`;

const Status = styled.Text`
  font-size: 12px;
  text-align: center;
  font-family: Roboto_500Medium;
  text-transform: uppercase;
  color: #fff;
`;

const TransactionItem = ({ transaction }) => {
  const { status, name, date, type } = transaction;
  return (
    <>
      <TransactionContainer>
        <View>
          <Name>{name}</Name>
          <Type>{type}</Type>
        </View>

        <Section>
          <StatusContainer status={status}>
            <Status>{status}</Status>
          </StatusContainer>
        </Section>
      </TransactionContainer>
      <View
        style={{
          borderBottomColor: "grey",
          borderBottomWidth: 1,
          opacity: 0.3,
        }}
      ></View>
    </>
  );
};

export default TransactionItem;
