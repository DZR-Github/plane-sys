import { Button, TextField } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";

const BookTicketForm = ({ flight }) => {
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [id_value, setId_value] = useState("");
  const [phone, setPhone] = useState<number>();
  const [cabin_rating, setCabin_rating] = useState("");

  return (
    <div>
      <div className="my-8 mx-[50px]">
        <p className="text-[1.5rem] font-bold mb-[20px]">填写个人信息</p>
        <TextField
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
          sx={{ display: "block", margin: "10px" }}
          label="姓名"
        />
        <TextField
          value={sex}
          onChange={(e) => {
            setSex(e.currentTarget.value);
          }}
          sx={{ display: "block", margin: "10px" }}
          label="性别"
        />
        <TextField
          value={id_value}
          onChange={(e) => {
            setId_value(e.currentTarget.value);
          }}
          sx={{ display: "block", margin: "10px" }}
          label="身份证号"
        />
        <TextField
          value={phone}
          onChange={(e) => {
            setPhone(Number(e.currentTarget.value));
          }}
          sx={{ display: "block", margin: "10px" }}
          label="手机号"
        />
        <TextField
          value={cabin_rating}
          onChange={(e) => setCabin_rating(e.currentTarget.value)}
          label="座位等级"
          sx={{ display: "block", margin: "10px" }}
        />
        <Button
          onClick={() => {
            const randomNum =
              Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
            fetch(
              `/api/traveler?traveler_id=T${id_value}&name=${name}&sex=${sex}&id_value=${id_value}&phone=${phone}`,
              { method: "POST" }
            ).then(() => {
              fetch(
                `/api/ticket?ticket_id=TI${randomNum}&flight_id=${
                  flight.flight_id
                }&traveler_id=T${id_value}&seating_list=10&cabin_rating=${cabin_rating}&time=${dayjs(
                  flight.time
                ).format("YYYY-MM-DD HH:mm:ss")}&status=1`,
                {
                  method: "POST",
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  toast.success("订票成功！");
                })
                .catch((error) => {
                  toast.error("订票失败!");
                });
            });
          }}
          sx={{ margin: "10px", paddingLeft: "30px", paddingRight: "30px" }}
          variant="contained"
          className="blue"
        >
          确认订票
        </Button>
      </div>
    </div>
  );
};

export default BookTicketForm;

{
  /* <button
onClick={() => {
  fetch(
    "/api/ticket?ticket_id=TI12&flight_id=F1&traveler_id=T1&seating_list=5&cabin_rating=Economy&time=2024-01-05 11:00:00&status=1",
    {
      method: "POST",
    }
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
}}
>
订票
</button> */
}

{
  /* <button
        onClick={() => {
          fetch(
            "/api/traveler?traveler_id=T11&name=Mike&sex=Male&id_value=ID11&phone=2134791234",
            { method: "POST" }
          )
            .then((res) => res.json())
            .then((data) => console.log(data));
        }}
      >
        输入乘客个人信息
      </button> */
}
