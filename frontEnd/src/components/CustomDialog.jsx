import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CreateAllowanceForm from "./CreateAllowanceForm";

const CustomDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="custom-dialog-title"
      aria-describedby="custom-dialog-description"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle
        id="custom-dialog-title"
        style={{
          color: "#FFF",
          fontFamily: "Inter",
          fontSize: "2.125rem",
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "normal",
          backgroundColor: "#0C0E1A",
          paddingTop: "7  0px",
        }}
      ></DialogTitle>
      <DialogContent
        style={{ backgroundColor: "#0C0E1A", padding: "2rem", height: "600px" }}
      >
        <CreateAllowanceForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
