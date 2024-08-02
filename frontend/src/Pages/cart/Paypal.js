// Paypal.js
import React, { useEffect, useRef } from "react";
import { loadScript } from "@paypal/paypal-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";

export default function Paypal({ totalAmount }) {
  const paypalRef = useRef();

  useEffect(() => {
    if (totalAmount === 0) return;

    loadScript({ "client-id": "AaHrOlhTSEviyMZh0G9T9LJ4abeYJCcDPP6rp2HFJN1o4JpoHcufYtyeFOsOaoVDHaO06t2k0TBe6Uv9" })
      .then(() => {
        
            })
      .catch((err) => {
        console.error("Failed to load PayPal JS SDK", err);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Không thể tải JavaScript SDK của PayPal. Vui lòng thử lại sau!',
        });
      });
  }, [totalAmount]);

  const createOrder = (data, actions, err) => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: (totalAmount / 23000).toFixed(2) 
        }
      }],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const order = await actions.order.capture();
      console.log(order);
      Swal.fire({
        icon: 'success',
        title: 'Thanh toán thành công!',
        text: 'Cảm ơn bạn đã mua hàng!',
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Thanh toán thất bại',
        text: 'Đã xảy ra lỗi khi thực hiện thanh toán. Vui lòng thử lại sau!',
      });
    }
  };

  const onError = (err) => {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Thanh toán thất bại',
      text: 'Đã xảy ra lỗi khi thực hiện thanh toán. Vui lòng thử lại sau!',
    });
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "AaHrOlhTSEviyMZh0G9T9LJ4abeYJCcDPP6rp2HFJN1o4JpoHcufYtyeFOsOaoVDHaO06t2k0TBe6Uv9" }}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
        style={{ layout: "horizontal" }}
        ref={paypalRef}
      />
    </PayPalScriptProvider>
  );
}
