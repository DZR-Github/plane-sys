import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

const ChangeFlightForm = () => {
  const [flight_id, setFlight_id] = useState("");
  const [plane_id, setPlane_id] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [start_time, setStart_time] = useState("");
  const [seat_left, setSeat_left] = useState<number>();
  const [duration, setDuration] = useState<number>();

  return (
    <div className="py-5 px-[100px]">
      <p className="text-[1.5rem] font-bold mb-5">更改航班信息</p>
      <div className="justify-center items-center">
        <TextField
          value={flight_id}
          onChange={(e) => {
            setFlight_id(e.currentTarget.value);
          }}
          sx={{ display: "block", marginTop: "10px" }}
          label="flight_id"
        />
        <TextField
          value={plane_id}
          onChange={(e) => {
            setPlane_id(e.currentTarget.value);
          }}
          sx={{ display: "block", marginTop: "10px" }}
          label="plane_id"
        />
        <TextField
          value={startLocation}
          onChange={(e) => {
            setStartLocation(e.currentTarget.value);
          }}
          sx={{ display: "block", marginTop: "10px" }}
          label="起点"
        />
        <TextField
          value={endLocation}
          onChange={(e) => {
            setEndLocation(e.currentTarget.value);
          }}
          sx={{ display: "block", marginTop: "10px" }}
          label="终点"
        />
        <TextField
          value={start_time}
          onChange={(e) => {
            setStart_time(e.currentTarget.value);
          }}
          sx={{ display: "block", marginTop: "10px" }}
          label="起飞时间"
        />
        <TextField
          value={seat_left}
          onChange={(e) => {
            setSeat_left(Number(e.currentTarget.value));
          }}
          sx={{ display: "block", marginTop: "10px" }}
          label="座位数"
        />
        <TextField
          value={duration}
          onChange={(e) => {
            setDuration(Number(e.currentTarget.value));
          }}
          sx={{ display: "block", marginTop: "10px" }}
          label="飞行时间"
        />
        <Button
          onClick={() => {
            fetch(
              `/api/flight?flight_id=${flight_id}&plane_id=${plane_id}&start_location=${startLocation}&end_location=${endLocation}&start_time=${start_time}&seat_left=${seat_left}&duration=${duration}`,
              {
                method: "PUT",
              }
            )
              .then((res) => res.json())
              .then((data) => {
                toast.success("航班更改成功！");
              })
              .catch((error) => {
                toast.error("航班更改失败！");
              });
          }}
          variant="contained"
          className="blue mt-5"
        >
          确认
        </Button>
      </div>
    </div>
  );
};

export default ChangeFlightForm;
