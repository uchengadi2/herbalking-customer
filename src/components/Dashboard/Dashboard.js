import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";
import PolicyIcon from "@mui/icons-material/Policy";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import CollectionsIcon from "@mui/icons-material/Collections";
import BarChartIcon from "@mui/icons-material/BarChart";
import DiscountIcon from "@mui/icons-material/Discount";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import InterestsIcon from "@mui/icons-material/Interests";
import ReorderIcon from "@mui/icons-material/Reorder";
import PaymentsIcon from "@mui/icons-material/Payments";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LuggageIcon from "@mui/icons-material/Luggage";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ReportIcon from "@mui/icons-material/Report";
import Groups2Icon from "@mui/icons-material/Groups2";
import ReviewsIcon from "@mui/icons-material/Reviews";
import FlagIcon from "@mui/icons-material/Flag";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PlaceIcon from "@mui/icons-material/Place";
import RedeemIcon from "@mui/icons-material/Redeem";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SellIcon from "@mui/icons-material/Sell";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CommuteIcon from "@mui/icons-material/Commute";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddTaskIcon from "@mui/icons-material/AddTask";
import MainDashboard from "./MainDashboard";
import history from "../../history";
import Products from "./products/Products";
import Categories from "./products/Categories";
import Collections from "./products/Collections";
import Discount from "./products/Discount";
import Inventories from "./products/Inventories";
import PurchaseOrders from "./products/PurchaseOrders";
import Transfers from "./products/Transfers";
import Orders from "./ecommerce/Orders";
import Payments from "./ecommerce/Payment";
import Delivery from "./ecommerce/Delivery";
import Packaging from "./ecommerce/Packaging";
import Returns from "./ecommerce/Returns";
import Subscription from "./ecommerce/Subscription";
import Bidding from "./ecommerce/Bidding";
import Quotations from "./ecommerce/Quotations";
import DirectOrders from "./direct/Orders";
import DirectPayments from "./direct/Payment";
import DirectReturns from "./direct/Returns";
import DirectInvoicing from "./direct/Invoicing";
import Analytics from "./analytics/Analytics";
import Reports from "./reports/Reports";
import Remediation from "./products/Remediation";
import Customers from "./customers/Customers";
import Reviews from "./customers/Reviews";
import Countries from "./utilities/Countries";
import States from "./utilities/States";
import Cities from "./utilities/Cities";
import Currencies from "./utilities/Currencies";
import Locations from "./utilities/Locations";
import Suppliers from "./utilities/Suppliers";
import Carriers from "./utilities/Carriers";
import Policy from "./settings/Policy";
import CurrencyExchange from "./settings/CurrencyExchange";
import Notifications from "./settings/Notifications";
import ShippingRates from "./settings/ShippingRates";
import PoSOrders from "./pos/Orders";
import PoSDelivery from "./pos/Delivery";
import PoSInvoicing from "./pos/Invoicing";
import PoSPackaging from "./pos/Packaging";
import PoSPayments from "./pos/Payment";
import PoSReturns from "./pos/Returns";
import PoSSubscription from "./pos/Subscription";
import Delistments from "./products/Delistments";
import Accessories from "./utilities/Accessories";
import Affiliates from "./utilities/Affiliates";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  menu: {
    backgroundColor: "#AEC3AE",
  },
  selected: {
    backgroundColor: "turquoise !important",
    color: "white !important",
    fontWeight: "bold !important",
  },
}));

function Dashboard(props) {
  const classes = useStyles();
  const [slug, setSlug] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    setSlug(params.slug);
    setLoading(false);
  }, [params]);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }} style={{ marginTop: 80 }}>
      <Grid container spacing={2}>
        <Grid item xs={2.5} className={classes.menu}>
          <Paper sx={{ width: 320, maxWidth: "100%" }}>
            <MenuList className={classes.menu}>
              <Typography style={{ marginLeft: 10, fontWeight: "Bold" }}>
                Dashboard & Performance
              </Typography>
              <MenuItem
                className={slug === "maindashboard" ? classes.selected : null}
                selected={slug === "maindashboard" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/maindashboard`);
                }}
              >
                <ListItemIcon>
                  <BarChartIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Dashboard</ListItemText>
              </MenuItem>
              <Divider />
              <Typography style={{ marginLeft: 10, fontWeight: "Bold" }}>
                Products & Inventory
              </Typography>
              <MenuItem
                className={slug === "products" ? classes.selected : null}
                selected={slug === "products" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/products`);
                }}
              >
                <ListItemIcon>
                  <InterestsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Products</ListItemText>
              </MenuItem>
              <MenuItem
                className={slug === "categories" ? classes.selected : null}
                selected={slug === "categories" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/categories`);
                }}
              >
                <ListItemIcon>
                  <CategoryIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Categories</ListItemText>
              </MenuItem>
              {/* <MenuItem
                className={slug === "collections" ? classes.selected : null}
                selected={slug === "collections" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/collections`);
                }}
              >
                <ListItemIcon>
                  <CollectionsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Collections</ListItemText>
              </MenuItem> */}
              <MenuItem
                className={slug === "inventories" ? classes.selected : null}
                selected={slug === "inventories" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/inventories`);
                }}
              >
                <ListItemIcon>
                  <Inventory2Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Inventories</ListItemText>
              </MenuItem>
              <MenuItem
                className={slug === "transfers" ? classes.selected : null}
                selected={slug === "transfers" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/transfers`);
                }}
              >
                <ListItemIcon>
                  <TransferWithinAStationIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Transfers</ListItemText>
              </MenuItem>
              {/* <MenuItem
                className={slug === "purchaseorders" ? classes.selected : null}
                selected={slug === "purchaseorders" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/purchaseorders`);
                }}
              >
                <ListItemIcon>
                  <ReorderIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Purchase Orders</ListItemText>
              </MenuItem>
              <MenuItem
                className={slug === "discount" ? classes.selected : null}
                selected={slug === "discount" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/discount`);
                }}
              >
                <ListItemIcon>
                  <DiscountIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Discounts</ListItemText>
              </MenuItem> */}
              <MenuItem
                className={slug === "remediation" ? classes.selected : null}
                selected={slug === "remediation" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/remediation`);
                }}
              >
                <ListItemIcon>
                  <RedeemIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remediations</ListItemText>
              </MenuItem>
              <MenuItem
                className={slug === "delistments" ? classes.selected : null}
                selected={slug === "delistments" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/delistments`);
                }}
              >
                <ListItemIcon>
                  <DeleteForeverIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delistments</ListItemText>
              </MenuItem>
              <Divider />
              <Typography style={{ marginLeft: 10, fontWeight: "Bold" }}>
                Ecommerce Transactions
              </Typography>
              <MenuItem
                className={
                  slug === "ecommerce-orders" ? classes.selected : null
                }
                selected={slug === "ecommerce-orders" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/ecommerce-orders`);
                }}
              >
                <ListItemIcon>
                  <ShoppingBasketIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Orders</ListItemText>
              </MenuItem>
              <MenuItem
                className={
                  slug === "ecommerce-payment" ? classes.selected : null
                }
                selected={slug === "ecommerce-payment" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/ecommerce-payment`);
                }}
              >
                <ListItemIcon>
                  <PaymentsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Payment & Reconciliation</ListItemText>
              </MenuItem>
              {/* <MenuItem
                className={
                  slug === "ecommerce-packaging" ? classes.selected : null
                }
                selected={slug === "ecommerce-packaging" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/ecommerce-packaging`);
                }}
              >
                <ListItemIcon>
                  <LuggageIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Packaging</ListItemText>
              </MenuItem> */}
              <MenuItem
                className={
                  slug === "ecommerce-delivery" ? classes.selected : null
                }
                selected={slug === "ecommerce-delivery" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/ecommerce-delivery`);
                }}
              >
                <ListItemIcon>
                  <LocalShippingIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delivery & Shippment</ListItemText>
              </MenuItem>
              <MenuItem
                className={
                  slug === "ecommerce-returns" ? classes.selected : null
                }
                selected={slug === "ecommerce-returns" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/ecommerce-returns`);
                }}
              >
                <ListItemIcon>
                  <AssignmentReturnIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Returns</ListItemText>
              </MenuItem>
              {/* <MenuItem
                className={
                  slug === "ecommerce-subscriptions" ? classes.selected : null
                }
                selected={slug === "ecommerce-subscriptions" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/ecommerce-subscriptions`);
                }}
              >
                <ListItemIcon>
                  <SubscriptionsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Subscriptions</ListItemText>
              </MenuItem> */}
              {/* <MenuItem
                className={
                  slug === "ecommerce-biddings" ? classes.selected : null
                }
                selected={slug === "ecommerce-biddings" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/ecommerce-biddings`);
                }}
              >
                <ListItemIcon>
                  <MonetizationOnIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Biddings</ListItemText>
              </MenuItem> */}
              {/* <MenuItem
                className={
                  slug === "ecommerce-quotations" ? classes.selected : null
                }
                selected={slug === "ecommerce-quotations" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/ecommerce-quotations`);
                }}
              >
                <ListItemIcon>
                  <RequestQuoteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Quotations</ListItemText>
              </MenuItem> */}
              <Divider />
              <Typography style={{ marginLeft: 10, fontWeight: "Bold" }}>
                Point of Sale (PoS) Transactions
              </Typography>
              <MenuItem
                className={slug === "pos-orders" ? classes.selected : null}
                selected={slug === "pos-orders" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/pos-orders`);
                }}
              >
                <ListItemIcon>
                  <ShoppingBasketIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Orders</ListItemText>
              </MenuItem>
              <MenuItem
                className={slug === "pos-payments" ? classes.selected : null}
                selected={slug === "pos-payments" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/pos-payments`);
                }}
              >
                <ListItemIcon>
                  <PaymentsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Payment & Reconciliation</ListItemText>
              </MenuItem>
              {/* <MenuItem
                className={slug === "pos-packaging" ? classes.selected : null}
                selected={slug === "pos-packaging" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/pos-packaging`);
                }}
              >
                <ListItemIcon>
                  <PaymentsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Packaging</ListItemText>
              </MenuItem> */}
              <MenuItem
                className={slug === "pos-delivery" ? classes.selected : null}
                selected={slug === "pos-delivery" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/pos-delivery`);
                }}
              >
                <ListItemIcon>
                  <PaymentsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delivery & Shippment</ListItemText>
              </MenuItem>
              <MenuItem
                className={slug === "pos-returns" ? classes.selected : null}
                selected={slug === "pos-returns" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/pos-returns`);
                }}
              >
                <ListItemIcon>
                  <AssignmentReturnIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Returns</ListItemText>
              </MenuItem>
              {/* <MenuItem
                className={
                  slug === "pos-subscriptions" ? classes.selected : null
                }
                selected={slug === "pos-subscriptions" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/pos-subscriptions`);
                }}
              >
                <ListItemIcon>
                  <SubscriptionsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Subscriptions</ListItemText>
              </MenuItem> */}
              {/* <MenuItem
                className={slug === "pos-invoicing" ? classes.selected : null}
                selected={slug === "pos-invoicing" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/pos-invoicing`);
                }}
              >
                <ListItemIcon>
                  <ReceiptIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Invoicing</ListItemText>
              </MenuItem> */}
              <Divider />

              <Typography style={{ marginLeft: 10, fontWeight: "Bold" }}>
                Affiliates Transactions
              </Typography>
              <MenuItem
                className={slug === "direct-orders" ? classes.selected : null}
                selected={slug === "direct-orders" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/direct-orders`);
                }}
              >
                <ListItemIcon>
                  <ShoppingBasketIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Orders</ListItemText>
              </MenuItem>
              <MenuItem
                className={slug === "direct-payments" ? classes.selected : null}
                selected={slug === "direct-payments" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/direct-payments`);
                }}
              >
                <ListItemIcon>
                  <PaymentsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Payment & Reconciliation</ListItemText>
              </MenuItem>
              <MenuItem
                className={slug === "direct-returns" ? classes.selected : null}
                selected={slug === "direct-returns" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/direct-returns`);
                }}
              >
                <ListItemIcon>
                  <AssignmentReturnIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Returns</ListItemText>
              </MenuItem>
              {/* <MenuItem
                className={
                  slug === "direct-invoicing" ? classes.selected : null
                }
                selected={slug === "direct-invoicing" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/direct-invoicing`);
                }}
              >
                <ListItemIcon>
                  <ReceiptIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Invoicing</ListItemText>
              </MenuItem> */}
              <Divider />
              <Typography style={{ marginLeft: 10, fontWeight: "Bold" }}>
                Analytics & Reports
              </Typography>
              <MenuItem
                className={slug === "analytics" ? classes.selected : null}
                selected={slug === "analytics" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/analytics`);
                }}
              >
                <ListItemIcon>
                  <AnalyticsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Analytics</ListItemText>
              </MenuItem>
              <MenuItem
                className={slug === "reports" ? classes.selected : null}
                selected={slug === "reports" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/reports`);
                }}
              >
                <ListItemIcon>
                  <ReportIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Reports</ListItemText>
              </MenuItem>
              <Divider />
              <Typography style={{ marginLeft: 10, fontWeight: "Bold" }}>
                Customers & Reviews
              </Typography>
              <MenuItem
                className={slug === "customers" ? classes.selected : null}
                selected={slug === "customers" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/customers`);
                }}
              >
                <ListItemIcon>
                  <Groups2Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Customers</ListItemText>
              </MenuItem>
              <MenuItem
                className={slug === "reviews" ? classes.selected : null}
                selected={slug === "reviews" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/reviews`);
                }}
              >
                <ListItemIcon>
                  <ReviewsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Reviews</ListItemText>
              </MenuItem>
              <Divider />
              <Typography style={{ marginLeft: 10, fontWeight: "Bold" }}>
                Utilities
              </Typography>
              <MenuItem
                className={
                  slug === "utilities-countries" ? classes.selected : null
                }
                selected={slug === "utilities-countries" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/utilities-countries`);
                }}
              >
                <ListItemIcon>
                  <FlagIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Countries</ListItemText>
              </MenuItem>
              <MenuItem
                className={
                  slug === "utilities-states" ? classes.selected : null
                }
                selected={slug === "utilities-states" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/utilities-states`);
                }}
              >
                <ListItemIcon>
                  <PlaceIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>States</ListItemText>
              </MenuItem>
              <MenuItem
                className={
                  slug === "utilities-cities" ? classes.selected : null
                }
                selected={slug === "utilities-cities" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/utilities-cities`);
                }}
              >
                <ListItemIcon>
                  <LocationCityIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cities</ListItemText>
              </MenuItem>
              <MenuItem
                className={
                  slug === "utilities-locations" ? classes.selected : null
                }
                selected={slug === "utilities-locations" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/utilities-locations`);
                }}
              >
                <ListItemIcon>
                  <StorefrontIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Locations</ListItemText>
              </MenuItem>
              <MenuItem
                className={
                  slug === "utilities-currencies" ? classes.selected : null
                }
                selected={slug === "utilities-currencies" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/utilities-currencies`);
                }}
              >
                <ListItemIcon>
                  <AttachMoneyIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Currencies</ListItemText>
              </MenuItem>
              <MenuItem
                className={
                  slug === "utilities-suppliers" ? classes.selected : null
                }
                selected={slug === "utilities-suppliers" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/utilities-suppliers`);
                }}
              >
                <ListItemIcon>
                  <SellIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Suppliers</ListItemText>
              </MenuItem>
              <MenuItem
                className={
                  slug === "utilities-carriers" ? classes.selected : null
                }
                selected={slug === "utilities-carriers" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/utilities-carriers`);
                }}
              >
                <ListItemIcon>
                  <CommuteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Carriers</ListItemText>
              </MenuItem>
              <MenuItem
                className={
                  slug === "utilities-affiliates" ? classes.selected : null
                }
                selected={slug === "utilities-affiliates" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/utilities-affiliates`);
                }}
              >
                <ListItemIcon>
                  <AddTaskIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Affiliates</ListItemText>
              </MenuItem>

              <Divider />
              <Typography style={{ marginLeft: 10, fontWeight: "Bold" }}>
                Settings
              </Typography>

              <MenuItem
                className={slug === "settings-policy" ? classes.selected : null}
                selected={slug === "settings-policy" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/settings-policy`);
                }}
              >
                <ListItemIcon>
                  <PolicyIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Policy</ListItemText>
              </MenuItem>
              <MenuItem
                className={
                  slug === "settings-shipping-rates" ? classes.selected : null
                }
                selected={slug === "settings-shipping-rates" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/settings-shipping-rates`);
                }}
              >
                <ListItemIcon>
                  <CorporateFareIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Shipping Rates</ListItemText>
              </MenuItem>
              <MenuItem
                className={
                  slug === "settings-notifications" ? classes.selected : null
                }
                selected={slug === "settings-notifications" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/settings-notifications`);
                }}
              >
                <ListItemIcon>
                  <NotificationsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Notifications</ListItemText>
              </MenuItem>
              {/* <MenuItem
                className={
                  slug === "settings-currency-exchanges"
                    ? classes.selected
                    : null
                }
                selected={slug === "settings-currency-exchanges" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/settings-currency-exchanges`);
                }}
              >
                <ListItemIcon>
                  <CurrencyExchangeIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Currency Exchange</ListItemText>
              </MenuItem> */}
            </MenuList>
          </Paper>
        </Grid>
        {slug === "maindashboard" && (
          <Grid item xs={9.5}>
            <MainDashboard />
          </Grid>
        )}
        {slug === "products" && (
          <Grid item xs={9.5}>
            <Products />
          </Grid>
        )}
        {slug === "categories" && (
          <Grid item xs={9.5}>
            <Categories />
          </Grid>
        )}
        {slug === "collections" && (
          <Grid item xs={9.5}>
            <Collections />
          </Grid>
        )}
        {slug === "discount" && (
          <Grid item xs={9.5}>
            <Discount />
          </Grid>
        )}
        {slug === "inventories" && (
          <Grid item xs={9.5}>
            <Inventories />
          </Grid>
        )}
        {slug === "purchaseorders" && (
          <Grid item xs={9.5}>
            <PurchaseOrders />
          </Grid>
        )}
        {slug === "transfers" && (
          <Grid item xs={9.5}>
            <Transfers />
          </Grid>
        )}
        {slug === "remediation" && (
          <Grid item xs={9.5}>
            <Remediation />
          </Grid>
        )}
        {slug === "delistments" && (
          <Grid item xs={9.5}>
            <Delistments />
          </Grid>
        )}
        {slug === "ecommerce-orders" && (
          <Grid item xs={9.5}>
            <Orders />
          </Grid>
        )}
        {slug === "ecommerce-payment" && (
          <Grid item xs={9.5}>
            <Payments />
          </Grid>
        )}
        {slug === "ecommerce-packaging" && (
          <Grid item xs={9.5}>
            <Packaging />
          </Grid>
        )}
        {slug === "ecommerce-delivery" && (
          <Grid item xs={9.5}>
            <Delivery />
          </Grid>
        )}
        {slug === "ecommerce-returns" && (
          <Grid item xs={9.5}>
            <Returns />
          </Grid>
        )}
        {slug === "ecommerce-subscriptions" && (
          <Grid item xs={9.5}>
            <Subscription />
          </Grid>
        )}
        {slug === "ecommerce-biddings" && (
          <Grid item xs={9.5}>
            <Bidding />
          </Grid>
        )}
        {slug === "ecommerce-quotations" && (
          <Grid item xs={9.5}>
            <Quotations />
          </Grid>
        )}
        {slug === "direct-orders" && (
          <Grid item xs={9.5}>
            <DirectOrders />
          </Grid>
        )}
        {slug === "direct-payments" && (
          <Grid item xs={9.5}>
            <DirectPayments />
          </Grid>
        )}
        {slug === "direct-returns" && (
          <Grid item xs={9.5}>
            <DirectReturns />
          </Grid>
        )}
        {slug === "direct-invoicing" && (
          <Grid item xs={9.5}>
            <DirectInvoicing />
          </Grid>
        )}
        {slug === "analytics" && (
          <Grid item xs={9.5}>
            <Analytics />
          </Grid>
        )}
        {slug === "reports" && (
          <Grid item xs={9.5}>
            <Reports />
          </Grid>
        )}
        {slug === "customers" && (
          <Grid item xs={9.5}>
            <Customers />
          </Grid>
        )}
        {slug === "reviews" && (
          <Grid item xs={9.5}>
            <Reviews />
          </Grid>
        )}
        {slug === "utilities-countries" && (
          <Grid item xs={9.5}>
            <Countries />
          </Grid>
        )}
        {slug === "utilities-states" && (
          <Grid item xs={9.5}>
            <States />
          </Grid>
        )}
        {slug === "utilities-cities" && (
          <Grid item xs={9.5}>
            <Cities />
          </Grid>
        )}
        {slug === "utilities-locations" && (
          <Grid item xs={9.5}>
            <Locations />
          </Grid>
        )}
        {slug === "utilities-currencies" && (
          <Grid item xs={9.5}>
            <Currencies />
          </Grid>
        )}
        {slug === "utilities-suppliers" && (
          <Grid item xs={9.5}>
            <Suppliers />
          </Grid>
        )}
        {slug === "utilities-carriers" && (
          <Grid item xs={9.5}>
            <Carriers />
          </Grid>
        )}
        {slug === "utilities-affiliates" && (
          <Grid item xs={9.5}>
            <Affiliates />
          </Grid>
        )}
        {slug === "settings-policy" && (
          <Grid item xs={9.5}>
            <Policy />
          </Grid>
        )}
        {slug === "settings-shipping-rates" && (
          <Grid item xs={9.5}>
            <ShippingRates />
          </Grid>
        )}
        {slug === "settings-notifications" && (
          <Grid item xs={9.5}>
            <Notifications />
          </Grid>
        )}
        {slug === "settings-currency-exchanges" && (
          <Grid item xs={9.5}>
            <CurrencyExchange />
          </Grid>
        )}

        {slug === "pos-orders" && (
          <Grid item xs={9.5}>
            <PoSOrders />
          </Grid>
        )}
        {slug === "pos-payments" && (
          <Grid item xs={9.5}>
            <PoSPayments />
          </Grid>
        )}
        {slug === "pos-returns" && (
          <Grid item xs={9.5}>
            <PoSReturns />
          </Grid>
        )}
        {slug === "pos-invoicing" && (
          <Grid item xs={9.5}>
            <PoSInvoicing />
          </Grid>
        )}
        {slug === "pos-packaging" && (
          <Grid item xs={9.5}>
            <PoSPackaging />
          </Grid>
        )}
        {slug === "pos-subscriptions" && (
          <Grid item xs={9.5}>
            <PoSSubscription />
          </Grid>
        )}
        {slug === "pos-delivery" && (
          <Grid item xs={9.5}>
            <PoSDelivery />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default Dashboard;
