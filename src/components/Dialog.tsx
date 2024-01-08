import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import BookTicketForm from "./BookTicketForm";
import DeleteTicketForm from "./DeleteTicketForm";
import CreateBillForm from "./CreateBillForm";
import ChangeFlightForm from "./ChangeFlightForm";
import CreateFlightForm from "./CreateFlightForm";
import GetTicketForm from "./GetTicketForm";

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  formIndex: number;
  flight: any;
}

const Forms = [
  { Form: <form /> },
  { Form: <DeleteTicketForm /> },
  { Form: <CreateBillForm /> },
  { Form: <CreateFlightForm /> },
  { Form: <ChangeFlightForm /> },
  { Form: <GetTicketForm /> },
];

export default function AlertDialog({
  open,
  onClose,
  formIndex,
  flight,
}: AlertDialogProps) {
  if (formIndex < 0) return;
  if (formIndex === 0) {
    return (
      <Dialog open={open} onClose={onClose}>
        <div className="p-5 bg-white text-center justify-center">
          <BookTicketForm flight={flight} />
        </div>
      </Dialog>
    );
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="p-5 bg-white text-center justify-center">
        {Forms[formIndex].Form}
      </div>
    </Dialog>
  );
}
