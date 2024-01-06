import { Button, TextField } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";

interface Bill {
  bill: {
    bill_id: string;
    payment: number;
    flight_id: string;
    ticket_id: string;
    ticket_time: string;
    cabin_rating: string;
  };
}

const CreateBillForm = () => {
  const [bill, setBill] = useState<Bill>();
  const [value, setValue] = useState("");
  return (
    <div className="pt-4 h-full px-8">
      <p className="mb-8 text-[1.5rem] font-bold">打印账单</p>
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

      {bill ? (
        <div className="text-start bg-slate-200 p-2 mt-4">
          <p className="text-center text-[1.3rem] font-bold">账单</p>
          <p>账单号：{bill?.bill.bill_id}</p>
          <p>航班号：{bill?.bill.flight_id}</p>
          <p>机票编号：{bill?.bill.ticket_id}</p>
          <p>座位等级：{bill?.bill.cabin_rating}</p>
          <p>价格：{bill?.bill.payment}</p>
          <p>
            起飞时间：
            {dayjs(bill?.bill.ticket_time).format("YYYY-MM-DD HH:mm:ss")}
          </p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CreateBillForm;
