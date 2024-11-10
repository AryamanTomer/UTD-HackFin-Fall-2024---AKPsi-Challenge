import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import styled from 'styled-components';

const PayDuesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 50px auto;
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const Description = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 40px;
  padding: 0 10px;
`;

const PayPalContainer = styled.div`
  width: 100%;
`;

const PayDues: React.FC = () => {
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const amount = "50.00"; // example amount for dues


  console.log(process.env.PAYPAL_CLIENT_ID);
  useEffect(() => {
    const loadPaypal = async () => {
      try {
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=process.env.PAYPAL_CLIENT_ID&components=buttons`;
        script.onload = () => setPaypalLoaded(true);
        document.body.appendChild(script);
      } catch (error) {
        console.error("Error loading PayPal SDK:", error);
      }
    };

    loadPaypal();
  }, []);

  return (
    <PayDuesWrapper>
      <Title>Pay Your Dues</Title>
      <Description>Click the button below to securely pay your dues via PayPal.</Description>

      {paypalLoaded ? (
        <PayPalScriptProvider options={{ clientId:`${process.env.PAYPAL_CLIENT_ID}` }}>
          <PayPalContainer>
            <PayPalButtons
              style={{ layout: 'vertical' }}
              createOrder={(_, actions) => { // Omitted `data` parameter
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: amount,
                      },
                    },
                  ],
                });
              }}
              onApprove={async (_, actions) => { // Omitted `data` parameter
                if (actions && actions.order) {
                  try {
                    const details = await actions.order.capture();
                    alert(`Transaction completed by ${details.payer?.name?.given_name ?? 'Unknown'}`);
                  } catch (error) {
                    console.error("Error capturing order: ", error);
                    alert("An error occurred while capturing your payment.");
                  }
                } else {
                  console.error("Actions or actions.order is undefined.");
                  alert("An unexpected error occurred. Please try again.");
                }
              }}
              onError={(err) => {
                console.error("PayPal Checkout Error: ", err);
                alert("An error occurred while processing your payment.");
              }}
            />
          </PayPalContainer>
        </PayPalScriptProvider>
      ) : (
        <p>Loading PayPal...</p>
      )}
    </PayDuesWrapper>
  );
};

export default PayDues;
