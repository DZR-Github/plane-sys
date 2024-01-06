import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

const DeleteTicketForm = () => {
  const [value, setValue] = useState("");
  return (
    <div className="py-10 px-[50px]">
      <p className="text-[1.5rem] font-bold mb-[50px]">退票</p>
      <div className="h-full flex justify-center items-center">
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
            fetch(`/api/ticket?ticket_id=${value}`, { method: "DELETE" })
              .then((res) => res.json())
              .then((data) => {
                toast.success("退票成功！");
                console.log(data);
              })
              .catch((error) => {
                toast.error("退票失败！");
              });
          }}
          sx={{
            marginLeft: "20px",
          }}
          variant="contained"
          className="blue"
        >
          退票
        </Button>
      </div>
    </div>
  );
};

export default DeleteTicketForm;

{
  /* <button
        onClick={() => {
          fetch("/api/ticket?ticket_id=TI12", { method: "DELETE" })
            .then((res) => res.json())
            .then((data) => console.log(data));
        }}
      >
        退票
      </button> */
}
