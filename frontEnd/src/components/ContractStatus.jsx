import React from "react";
import CustomInput from "./layout/CustomInput";

const ContractStatus = ({
  createdAt,
  status,
  purpose,
  numBenefactors,
  sanctionedAmount,
  spentAmount,
  name,
}) => {
  const isRunning = status.toLowerCase() === "running";

  return (
    <div
      style={{
        width: "73.0625rem",
        height: "14.6875rem",
        backgroundColor: "#0C0E1A",
        borderRadius: "1rem",
        margin: "2rem auto",
        padding: "3rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <p style={{ color: "#FFF" }}>Created At: {createdAt}</p>
        </div>
        <div>
          <p style={{ color: "#FFF" }}>
            Status: {status}
            {isRunning ? (
              <span style={{ color: "green", marginLeft: "0.5rem" }}>●</span>
            ) : (
              <span style={{ color: "red", marginLeft: "0.5rem" }}>●</span>
            )}
          </p>
        </div>
      </div>

      <div
        id={purpose}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <CustomInput
          label="To"
          name="purpose"
          value={purpose}
          editable={false}
        />
        <CustomInput
          label="Name"
          name="numBenefactors"
          value={name}
          editable={false}
        />
        <CustomInput
          label="Sanctioned Amount"
          name="sanctionedAmount"
          value={sanctionedAmount}
          editable={false}
        />
        <CustomInput
          label="Spent Amount"
          name="spentamount"
          value={spentAmount}
          editable={false}
        />
      </div>
    </div>
  );
};

export default ContractStatus;
