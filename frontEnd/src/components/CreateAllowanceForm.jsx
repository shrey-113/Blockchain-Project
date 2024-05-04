import { IconButton } from "@mui/material";
import { useState } from "react";
import removeIcon from "../assets/remove.png";
import Web3 from "web3";
import CustomInput from "./layout/CustomInput";
import { Button } from "@mui/material";
import { RegisterAllowance } from "../ethereum";

function CreateAllowanceForm({ handleClose }) {
  const [formValues, setFormValues] = useState({
    purpose: "",
    startTime: "",
    endTime: "",
    recipients: [{ address: "", amount: 0, name: "" }],
  });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "address" || name === "amount" || name === "name") {
      const updatedRecipients = [...formValues.recipients];
      updatedRecipients[index][name] = value;
      setFormValues({ ...formValues, recipients: updatedRecipients });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const addRecipient = () => {
    setFormValues({
      ...formValues,
      recipients: [...formValues.recipients, { address: "", amount: 0 }],
    });
  };

  const removeRecipient = (index) => {
    const updatedRecipients = [...formValues.recipients];
    updatedRecipients.splice(index, 1);
    setFormValues({ ...formValues, recipients: updatedRecipients });
  };

  const handleSubmit = async () => {
    try {
      for (const recipient of formValues.recipients) {
        await RegisterAllowance({
          walletAddress: recipient.address,
          amount: recipient.amount,
          startDate: formValues.startTime,
          endDate: formValues.endTime,
          rName: recipient.name,
        });
      }

      console.log("All recipients submitted successfully.");

      handleClose();
      setFormValues({
        purpose: "",
        startTime: "",
        endTime: "",
        recipients: [{ address: "", amount: 0, name: "" }],
      });
    } catch (error) {
      console.error("Error submitting for recipients:", error);
    }
  };

  return (
    <>
      <div style={{ display: "flex", height: "500px" }}>
        <div
          style={{
            width: "30%",

            marginRight: "5%",
            maxHeight: "500px",
          }}
        >
          <ol className=" text-white">
            <li>
              <b>Low Allowance Level: </b>Controlled and modest fund allocation
              for essential spending needs, providing a foundational budgeting
              framework.
            </li>
            <br />
            <li>
              <b>Medium Allowance Level: </b>Balanced and versatile fund
              allocation catering to varied spending requirements, striking a
              middle ground between restraint and flexibility.
            </li>
            <br />
            <li>
              <b>High Allowance Level: </b>Generous fund allocation for users
              with higher spending needs, accommodating a broad spectrum of
              expenses and fostering financial autonomy.
            </li>
          </ol>
        </div>
        <div style={{ width: "60%", overflowY: "auto" }}>
          <form>
            <CustomInput
              label="Purpose"
              name="purpose"
              value={formValues.purpose}
              onChange={handleInputChange}
            />

            <CustomInput
              label="Start Time"
              name="startTime"
              value={formValues.startTime}
              onChange={handleInputChange}
              type="datetime"
            />
            <CustomInput
              label="End Time"
              name="endTime"
              value={formValues.endTime}
              onChange={handleInputChange}
              type="datetime"
            />

            <div style={{ marginTop: "1rem" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={addRecipient}
              >
                Add Recipient
              </Button>
            </div>

            {formValues.recipients.map((recipient, index) => (
              <div key={index} style={{ display: "flex", marginTop: "1rem" }}>
                <CustomInput
                  label="Recipient Address"
                  name="address"
                  value={recipient.address}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <CustomInput
                  className="mr-4"
                  label="Recipient Name"
                  name="name"
                  value={recipient.name}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <CustomInput
                  label="Amount (In ETH)"
                  name="amount"
                  value={recipient.amount}
                  onChange={(e) => handleInputChange(e, index)}
                  type="number"
                />
                <IconButton onClick={() => removeRecipient(index)}>
                  <img
                    src={removeIcon}
                    alt="remove"
                    className=" w-16 m-auto "
                  />
                </IconButton>
              </div>
            ))}
          </form>
        </div>
      </div>

      <div className=" flex justify-end">
        <Button
          onClick={handleClose}
          variant="contained"
          style={{
            borderRadius: "2.5rem",
            background: "#0C0E1A",
            color: "#FFF",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          autoFocus
          variant="contained"
          style={{
            borderRadius: "2.5rem",
            background: "#002642",
            color: "#FFF",
          }}
        >
          Submit
        </Button>
      </div>
    </>
  );
}

export default CreateAllowanceForm;
