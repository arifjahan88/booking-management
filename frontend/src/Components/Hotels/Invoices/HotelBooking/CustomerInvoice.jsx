import React from "react";
import { Page, Text, View, Document, PDFViewer } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { invoiceStyle } from "./InvoiceStyle";
import { format as currencyformat } from "currency-formatter";

const CustomerInvoice = () => {
  const {
    page,
    header,
    companyInfo,
    companyName,
    companyAddress,
    clientInfo,
    clientName,
    clientAddress,
    invoiceDetails,
    invoiceNumber,
    invoiceDate,
    itemsHeader,
    description,
    qty,
    rate,
    amount,
    itemsRow,
    totalsSection,
    totals,
    totalRow,
    thankYou,
    invoiceTerms,
    details_type,
    addons_type,
    below_part,
    signature,
  } = invoiceStyle;
  const location = useLocation();
  const itemData = location.state.item;

  const addonsTotal = itemData?.addons?.map((item) =>
    item?.addonsData?.reduce((acc, curr) => acc + curr?.total, 0)
  );

  const currency = (amount) => {
    return currencyformat(`${amount}`, { symbol: "", code: "BDT" });
  };

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4" style={page}>
          <View style={header}>
            <View style={companyInfo}>
              <Text style={companyName}>{itemData?.hotelInfo?.hotelName}</Text>
              <Text style={companyAddress}>{itemData?.hotelInfo?.hotelAddress}</Text>
              <Text style={companyAddress}>{itemData?.hotelInfo?.hotelEmail}</Text>
              <Text style={companyAddress}>{itemData?.hotelInfo?.hotelWebsite}</Text>
            </View>
            <View style={clientInfo}>
              <Text style={clientName}>{itemData?.guestName}</Text>
              <Text style={clientAddress}>{itemData.address}</Text>
              <Text style={clientAddress}>{itemData?.guestNumber}</Text>
              <Text style={clientAddress}>{itemData?.guestEmail}</Text>
            </View>
          </View>
          <View style={invoiceDetails}>
            <Text style={invoiceNumber}>Invoice No: {itemData._id?.slice(0, 5)}</Text>
            <Text style={invoiceDate}>Issue Date: {format(new Date(), "yyyy-MM-dd")}</Text>
          </View>
          <Text style={details_type}>Room Item</Text>
          <View>
            <View style={itemsHeader}>
              <Text style={description}>ROOM NAME</Text>
              <Text style={qty}>ROOM NUMBER</Text>
              <Text style={rate}>TOTAL AMOUNT</Text>
              <Text style={amount}>DUE AMOUNT</Text>
            </View>
            <View style={itemsRow}>
              <Text style={description}>- {itemData?.roomName?.join(", ")}</Text>
              <Text style={qty}>{itemData?.roomNumber?.join(", ")}</Text>
              <Text style={rate}>{itemData?.totalAmount - Number(addonsTotal)} Taka</Text>
              <Text style={amount}>
                {itemData?.totalAmount - itemData?.paidAmount - Number(addonsTotal)} Taka
              </Text>
            </View>
          </View>
          {itemData?.addons?.map((item, index) => (
            <View key={index}>
              <Text style={addons_type}>Addons Item - {item?.date}</Text>
              <View style={itemsHeader}>
                <Text style={description}>ITEM</Text>
                <Text style={qty}>QUANTITY</Text>
                <Text style={rate}>RATE</Text>
                <Text style={amount}>TOTAL AMOUNT</Text>
              </View>
              {item?.addonsData.map((addon) => (
                <View style={itemsRow} key={addon?.itemName}>
                  <Text style={description}>- {addon?.itemName}</Text>
                  <Text style={qty}>{addon?.item}</Text>
                  <Text style={rate}>{addon?.itemPrice} Taka</Text>
                  <Text style={amount}>{addon?.total} Taka</Text>
                </View>
              ))}
            </View>
          ))}
          <View style={totalsSection}>
            <View style={totals}>
              <View style={totalRow}>
                <Text>Sub Total</Text>
                <Text>{currency(itemData?.totalAmount)} /-</Text>
              </View>
              <View style={totalRow}>
                <Text>Paid Amount</Text>
                <Text>{currency(itemData?.paidAmount)} /-</Text>
              </View>
              <View style={totalRow}>
                <Text>Due Amount</Text>
                <Text>{currency(itemData?.totalAmount - itemData?.paidAmount)} /-</Text>
              </View>
              {/* <View style={totalRow}>
                <Text>Discount</Text>
                <Text>-${invoiceData.discount}</Text>
              </View>
              <View style={totalRow}>
                <Text style={totalLabel}>TOTAL</Text>
                <Text style={totalAmount}>${invoiceData.totalAmount}</Text>
              </View> */}
            </View>
          </View>
          <View style={signature}>
            <View>
              <Text>_____________</Text>
              <Text>Customer Signature</Text>
            </View>
            <View>
              <Text>_____________</Text>
              <Text>Manager Signature</Text>
            </View>
          </View>
          <View style={below_part}>
            <Text style={thankYou}>THANK YOU FOR CHOOSING US.</Text>
            <Text style={invoiceTerms}>
              Invoice Terms: E.g Payment Instructions (Account Number, Bank and Bank Account Holder)
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default CustomerInvoice;
