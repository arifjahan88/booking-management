import { StyleSheet } from "@react-pdf/renderer";

// Create styles
export const invoiceStyle = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  companyInfo: {
    flexDirection: "column",
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  companyAddress: {
    fontSize: 10,
    color: "#666666",
  },
  clientInfo: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  clientName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  clientAddress: {
    fontSize: 10,
    color: "#666666",
  },
  invoiceDetails: {
    marginBottom: 20,
  },
  invoiceNumber: {
    fontSize: 10,
    color: "#333333",
    textTransform: "uppercase",
  },
  invoiceDate: {
    fontSize: 10,
    color: "#333333",
  },
  itemsHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    borderBottomStyle: "solid",
    alignItems: "center",
    height: 24,
    fontSize: 10,
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "#333333",
  },
  itemsRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    borderBottomStyle: "solid",
    alignItems: "center",
    height: 24,
    fontSize: 10,
  },
  description: {
    width: "30%",
    textAlign: "left",
    paddingLeft: 8,
  },
  qty: {
    width: "30%",
    textAlign: "center",
  },
  rate: {
    width: "20%",
    textAlign: "center",
  },
  amount: {
    width: "20%",
    textAlign: "center",
  },
  totalsSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  totals: {
    width: "40%",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 12,
    marginBottom: 4,
  },
  totalLabel: {
    fontSize: 10,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333333",
  },
  thankYou: {
    fontSize: 10,
    marginTop: 20,
    textAlign: "center",
  },
  invoiceTerms: {
    fontSize: 8,
    marginTop: 5,
    color: "#666666",
    textAlign: "center",
  },
  details_type: {
    fontSize: 15,
    color: "#333333",
    marginTop: 10,
  },
  addons_type: {
    fontSize: 15,
    color: "#333333",
    marginTop: 10,
  },
  //   below_part: {
  //     position: "absolute",
  //     bottom: 0,
  //   },
  signature: {
    fontSize: 9,
    paddingVertical: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
