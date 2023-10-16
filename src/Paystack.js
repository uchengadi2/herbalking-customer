import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import api from "./apis/local";
import {
  CREATE_ORDER,
  DELETE_CART,
  CREATE_TRANSACTION,
  FETCH_TRANSACTION,
} from "./actions/types";
import history from "./history";
import ThankYou from "./components/thankyou/ThankYou";

const useStyles = makeStyles((theme) => ({
  root: {
    //width: 600,
    marginLeft: 15,
  },
  formStyles: {
    width: 600,
  },

  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 200,
    marginLeft: 70,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  offDeliveryLocationButton: {
    borderRadius: 10,
    height: 40,
    width: 220,
    marginLeft: 60,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  checkout: {
    borderRadius: 10,
    height: 40,
    width: 190,
    marginLeft: 80,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
}));

function Paystack(props) {
  const dispatch = useDispatch();

  //console.log("this props is at paystack:", props);

  const [isSuccess, setIsSuccess] = useState(false);
  const classes = useStyles();

  const config = {
    reference: props.orderNumber,
    className: classes.checkout,
    email: props.email,
    amount: props.amount,
    publicKey: "pk_test_209acad1bf3004d1adcc1232404a6e6930076d58", //herbalking test
    //publicKey: "pk_live_2ff0e8d43f92ab5b3419a7fc41a0816f21f4c7dd", //herbalking live
  };

  // you can call this function anything
  const handlePaystackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.

    if (reference.status == "success") {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  };

  //console.log("the product list is at paystack:", props.productList);

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed paystck");
  };

  const componentProps = {
    ...config,
    text: props.text,
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  const commitDataToDatabase = () => {
    const transData = {
      orderNumber: props.data.orderNumber,
      customerName: props.data.customerName,
      customerPhoneNumber: props.data.customerPhoneNumber,
      customerEmailAddress: props.data.customerEmailAddress,
      recipientName: props.data.recipientName,
      recipientPhoneNumber: props.data.recipientPhoneNumber,
      recipientAddress: props.data.recipientAddress,
      nearestBusstop: props.data.nearestBusstop,
      postalCode: props.data.postalCode,
      recipientCountry: props.data.recipientCountry,
      recipientState: props.data.recipientState,
      recipientCity: props.data.recipientCity,
      deliveryMode: props.data.deliveryMode,
      vatRate: props.data.vatRate,
      vat: props.data.vat,
      currency: props.data.currency,
      totalWeight: props.data.totalWeight,
      payOnDeliveryMaxWeightInKg: props.data.payOnDeliveryMaxWeightInKg,
      implementVatCollection: props.data.implementVatCollection,
      recipientEmailAddress: props.data.recipientEmailAddress,
      totalDeliveryCost: props.data.totalDeliveryCost,
      totalProductCost: props.data.totalProductCost,
      paymentMethod: props.data.paymentMethod,
      paymentStatus: props.data.paymentStatus,
      orderedBy: props.data.orderedBy,
      salesTax: props.data.salesTax,
      origin: props.data.origin,
      implementSalesTaxCollection: props.data.implementSalesTaxCollection,
      allowOriginSalesTax: props.data.allowOriginSalesTax,
      revenue: props.data.revenue,

      recipientCountryName: props.data.recipientCountryName,
      recipientStateName: props.data.recipientStateName,
      recipientCityName: props.data.recipientCityName,
      deliveryStatus: props.data.deliveryStatus,
      deliveryMode: props.data.deliveryMode,
      daysToDelivery: props.data.daysToDelivery,
    };

    if (transData) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/transactions`, transData);

        const transId = response.data.data.data.id;

        if (response.data.status === "success") {
          dispatch({
            type: CREATE_TRANSACTION,
            payload: response.data.data.data,
          });

          props.productList.map((cart, index) => {
            const data = {
              orderNumber: props.data.orderNumber,
              transactionId: transId,
              product: cart.product,
              orderedPrice: cart.price,
              customerName: props.data.customerName,
              customerPhoneNumber: props.data.customerPhoneNumber,
              customerEmailAddress: props.data.customerEmailAddress,
              recipientName: props.data.recipientName,
              recipientPhoneNumber: props.data.recipientPhoneNumber,
              recipientAddress: props.data.recipientAddress,
              nearestBusstop: props.data.nearestBusstop,
              postalCode: props.data.postalCode,
              recipientCountry: props.data.recipientCountry,
              recipientState: props.data.recipientState,
              recipientCity: props.data.recipientCity,
              deliveryMode: props.data.deliveryMode,
              vatRate: props.data.vatRate,

              vat: props.data.implementVatCollection
                ? cart.isVatable
                  ? (props.data.vatRate / 100) * cart.price * cart.quantity
                  : 0
                : 0,
              currency: props.data.currency,
              totalWeight: props.data.totalWeight,
              payOnDeliveryMaxWeightInKg: props.data.payOnDeliveryMaxWeightInKg,
              implementVatCollection: props.data.implementVatCollection,
              recipientEmailAddress: props.data.recipientEmailAddress,
              totalDeliveryCost: props.data.totalDeliveryCost,
              totalProductCost: props.data.totalProductCost,
              paymentMethod: props.data.paymentMethod,
              paymentStatus: props.data.paymentStatus,

              cartId: cart.id,
              quantityAdddedToCart: cart.quantity,
              orderedQuantity: cart.quantity,
              dateAddedToCart: cart.dateAddedToCart,
              currency: props.data.currency,
              paymentMethod: props.data.paymentMethod,

              orderedBy: cart.cartHolder,
              salesTax: props.data.implementSalesTaxCollection
                ? props.data.allowOriginSalesTax
                  ? (cart.price *
                      cart.quantity *
                      props.data.prevailingSalesTax) /
                    100
                  : (cart.price *
                      cart.quantity *
                      props.data.destinationSalesTax) /
                    100
                : 0,
              origin: props.data.origin,
              implementSalesTaxCollection:
                props.data.implementSalesTaxCollection,
              allowOriginSalesTax: props.data.allowOriginSalesTax,
              isVatable: cart.isVatable,
              revenue: props.data.allowCentralCommission
                ? cart.revenueMarginShouldPrevail
                  ? cart.revenueMargin * cart.quantity
                  : (props.data.commissionRate / 100) *
                    cart.price *
                    cart.quantity
                : cart.revenueMarginShouldPrevail
                ? cart.revenueMargin * cart.quantity
                : null,

              recipientCountryName: props.data.recipientCountryName,
              recipientStateName: props.data.recipientStateName,
              recipientCityName: props.data.recipientCityName,
              deliveryStatus: props.data.deliveryStatus,
              deliveryMode: props.data.deliveryMode,
              daysToDelivery: props.data.daysToDelivery,
            };

            if (data) {
              const createForm = async () => {
                api.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${props.token}`;
                const response = await api.post(`/orders`, data);
                if (response.data.status === "success") {
                  dispatch({
                    type: CREATE_ORDER,
                    payload: response.data.data.data,
                  });
                  //setLoading(false);
                } else {
                  props.handleFailedSnackbar(
                    "Something went wrong, please try again!!!"
                  );
                }
              };
              createForm().catch((err) => {
                //props.handleFailedSnackbar();
                console.log("err:", err.message);
              });
            } else {
              //props.handleFailedSnackbar("Something went wrong, please try again!!!");
            }
          });
        } else {
          // props.handleFailedSnackbar(
          //   "Something went wrong, please try again!!!"
          // );
        }
      };
      createForm().catch((err) => {
        //props.handleFailedSnackbar();
        console.log("err:", err.message);
      });
    } //end of the transdate if statement

    const cartData = {
      status: "checkedout",
    };
    //remove order from cart
    props.productList.map((cart, index) => {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        await api.delete(`/carts/${cart.id}`);
        dispatch({
          type: DELETE_CART,
          //payload: response2.data.data.data,
        });
      };
      createForm().catch((err) => {
        props.handleFailedSnackbar();
        console.log("err:", err.message);
      });
    });
    props.handleSuccessfulCreateSnackbar(
      `Thank you for your patronage, we will process your request as soon as possible`
    );
    history.push("/thankyou");
  };

  return (
    <div>
      <PaystackButton {...componentProps} />
      {isSuccess}
      {isSuccess && commitDataToDatabase()}
    </div>
  );
}

export default Paystack;
