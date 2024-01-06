import { Button, TextField } from "@mui/material";
import { useState } from "react";

interface Bill {
  bill: {
    bill_id: string;
    payment: number;
    status: number;
    ticket_id: string;
    time: string;
    traveler_id: string;
  };
}

const CreateBillForm = () => {
  const [bill, setBill] = useState<Bill>();
  const [value, setValue] = useState("");
  return (
    <div className="pt-2 h-full">
      <div className="justify-center h-[80%] items-center flex">
        <TextField
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
          label="ticket_id"
          placeholder="请输入ticket_id"
        />
        <Button
          onClick={() => {
            fetch(`/api/bill?ticket_id=` + value)
              .then((res) => res.json())
              .then((data) => {
                setBill(data);
              });
          }}
          sx={{ marginLeft: "20px" }}
          variant="contained"
          className="blue"
        >
          打印
        </Button>
      </div>
      <p>
        {bill
          ? "价格：" + bill?.bill.payment + " " + "时间：" + bill?.bill.time
          : ""}
      </p>
    </div>
  );
};

export default CreateBillForm;

<button onClick={() => {}}>打印账单</button>;
