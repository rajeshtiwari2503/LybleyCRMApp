import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const WalletDashboard = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <Text style={styles.title}>Wallet Dashboard</Text>
      </View> */}

      {/* Cards Section */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
        <MaterialIcons name="account-balance-wallet" size={30} color="#4CAF50" />
          <Text style={styles.cardValue}>0</Text>
          <Text style={styles.cardLabel}>Total Balance</Text>
        </View>
        <View style={styles.card}>
        <MaterialIcons name="account-balance-wallet" size={30} color="#2196F3" />
          <Text style={styles.cardValue}>0</Text>
          <Text style={styles.cardLabel}>Available Balance</Text>
        </View>
      </View>

      {/* Actions */}
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add Money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#28a745" }]}>
          <Text style={styles.buttonText}>Withdraw</Text>
        </TouchableOpacity>
      </View> */}

      {/* Metrics Section */}
      {/* <View style={styles.metricsContainer}>
        <Text style={styles.metricsTitle}>Transaction Metrics</Text>
        <View style={styles.metricsRow}>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>$2,500</Text>
            <Text style={styles.metricLabel}>Last Deposit</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>$500</Text>
            <Text style={styles.metricLabel}>Last Withdrawal</Text>
          </View>
        </View>
      </View> */}

      {/* Transaction History */}
      {/* <View style={styles.metricsContainer}>
        <Text style={styles.metricsTitle}>Recent Transactions</Text>
        <View style={styles.walletRow}>
          <Text style={styles.walletLabel}>Deposit</Text>
          <Text style={styles.walletValue}>$2,500</Text>
        </View>
        <View style={styles.walletRow}>
          <Text style={styles.walletLabel}>Withdrawal</Text>
          <Text style={styles.walletValue}>$500</Text>
        </View>
        <View style={styles.walletRow}>
          <Text style={styles.walletLabel}>Payment</Text>
          <Text style={styles.walletValue}>$200</Text>
        </View>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 15,
    backgroundColor: "black",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cardLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  metricsContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  metricsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  metricBox: {
    alignItems: "center",
  },
  metricValue: {
    fontSize: 22,
    fontWeight: "bold",
  },
  metricLabel: {
    fontSize: 14,
    color: "#555",
  },
  walletRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  walletLabel: {
    fontSize: 16,
    color: "#333",
  },
  walletValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WalletDashboard;
