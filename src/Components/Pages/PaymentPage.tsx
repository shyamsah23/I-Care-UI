import { Button, Card, Text, Loader, Center } from "@mantine/core";
import { clearCart } from "../../Slices/CartSlice";
import { createMultipleSaleItem, createSales } from "../../Services/PharmacyService";
import { useEffect, useState } from "react";
import { errorNotification, successNotification } from "../../Utility/NotificationUtility";
import { useDispatch, useSelector } from "react-redux";
import { Razorpay_key } from "../../utils/SecurityKeys";
import { useLocation, useNavigate } from "react-router-dom";
import { setPrescription } from "../../Slices/PrescriptionSlice";
import axiosInstance from "../../Interceptor/AxiosInterceptor";

export const PaymentPage = () => {
  const cart = useSelector((state: any) => state.cart.items);
  const token = useSelector((state: any) => state.jwtSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const state = location.state;

  const appointmentData = location.state?.appointmentData || null;
  
  const reduxPrescriptionId = useSelector(
    (state: any) => state.prescription.selectedPrescriptionId,
  );
  const prescriptionId = location.state?.prescriptionId ?? reduxPrescriptionId;
  const formattedDate = new Date().toISOString().replace(/[:.]/g, "-");

  const paymentType = location.state?.paymentType || "PHARMACY";
  const appointmentCharge = location.state?.appointmentCharge || 500;

  const total =
    paymentType === "PHARMACY"
      ? cart.reduce(
          (sum: number, item: any) => sum + item.unitPrice * item.quantity,
          0,
        )
      : appointmentCharge;

  const handlePayment = async () => {
    if (paymentType === "PHARMACY" && cart.length === 0) {
      errorNotification("Cart is empty");
      return;
    }

    const options = {
      key: Razorpay_key,
      amount: total * 100,
      currency: "INR",
      name: "I-Care",
      description:
        paymentType === "PHARMACY"
          ? "Medicine Purchase"
          : "Appointment Booking",

      handler: async function (response: any) {
        try {
          setLoading(true);

          const verifyPayload = {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            paymentType,

            // pharmacy
            prescriptionId,
            cartItems: cart,
            totalAmount: total,

            // appointment
            appointmentData: appointmentData,
          };
          
          if (paymentType === "APPOINTMENT" && !appointmentData) {
            errorNotification("Appointment data missing");
            return;
          }

          console.log("VERIFY PAYLOAD:", verifyPayload); 

          await axiosInstance.post(
            "/appointment/payment/verify-and-process",
            verifyPayload,
            { headers: { Authorization: `Bearer ${token}` } },
          );

          if (paymentType === "PHARMACY") {
            dispatch(clearCart());
            navigate("/patient/pharmacy");
          } else {
            navigate("/patient/appointments");
          }

          successNotification("Payment Successful!");
        } catch (error: any) {
          console.error("BACKEND ERROR:", error?.response?.data);

          errorNotification(
            error?.response?.data?.errorMessage ||
              "Payment verification failed",
          );
        } finally {
          setLoading(false);
        }
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <Card shadow="md" p="lg">
      <Text fw={700} size="lg">
        Payment Summary
      </Text>
      <Text mt="md">Items: {cart.length}</Text>
      <Text>Total Amount: ₹ {total}</Text>

      {loading ? (
        <Center mt="lg">
          <Loader />
        </Center>
      ) : (
        <Button fullWidth mt="lg" onClick={handlePayment}>
          Pay Now
        </Button>
      )}
    </Card>
  );
};
