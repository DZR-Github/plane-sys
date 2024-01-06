import { Button, Dialog, TextField } from "@mui/material";
import { useState } from "react";
import AlertDialog from "../components/Dialog";
import TicketTable from "../components/TicketTable";
import { toast } from "react-toastify";

interface ticketType {
  flight_id: string;
  model: string;
  start_location: string;
  end_location: string;
  start_time: string;
  seat_left: number;
  duration: number;
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [formIndex, setFormIndex] = useState(-1);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [tickets, setTickets] = useState<ticketType[]>([]);
  const [flight, setFlight] = useState();

  const handleBookTicket = () => {
    setFormIndex(0);
    setOpen(true);
  };

  const handleDeleteTicket = () => {
    setFormIndex(1);
    setOpen(true);
  };

  const handleCopyBill = () => {
    setFormIndex(2);
    setOpen(true);
  };

  const handleCreateFlight = () => {
    setFormIndex(3);
    setOpen(true);
  };

  const handleChangeFlight = () => {
    setFormIndex(4);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <main>
      <div className="text-center">
        <p className="text-center text-[2rem] font-extrabold font-serif pt-4">
          机票预订系统
        </p>
        <div className="text-center my-8 justify-center bg-slate-200 py-5 inline-block px-[180px] rounded">
          <form>
            <TextField
              value={startLocation}
              onChange={(e) => {
                setStartLocation(e.currentTarget.value);
              }}
              sx={{ marginRight: "20px", height: "20px" }}
              label="起点"
            />
            <TextField
              value={endLocation}
              onChange={(e) => {
                setEndLocation(e.currentTarget.value);
              }}
              label="终点"
            />
            <Button
              sx={{ marginTop: "10px", marginLeft: "20px" }}
              variant="contained"
              className="blue"
              onClick={() => {
                fetch(
                  `/api/flight?start_location=${startLocation}&end_location=${endLocation}`
                )
                  .then((res) => res.json())
                  .then((data) => setTickets(data.flight));
              }}
            >
              查询
            </Button>
          </form>
        </div>
        <div className="w-[70%] mx-auto">
          <TicketTable
            tickets={tickets}
            setOpen={setOpen}
            setFormIndex={setFormIndex}
            setFlight={setFlight}
          />
        </div>
        <div className="flex p-5">
          <div className="w-[50%] justify-center text-center">
            <p className="text-center text-[1.5rem] font-extrabold w-full">
              乘客专区
            </p>
            <div
              onClick={handleDeleteTicket}
              className="bg-slate-300 w-[200px] h-[200px] inline-block m-4 leading-[200px] rounded text-[2rem] cursor-pointer"
            >
              退票
            </div>
            <div
              onClick={handleCopyBill}
              className="bg-slate-300 inline-block w-[200px] h-[200px] m-4 leading-[200px] rounded text-[2rem] cursor-pointer"
            >
              打印账单
            </div>
          </div>
          <div className="w-[50%] text-center">
            <p className="text-center text-[1.5rem] font-extrabold">
              工作人员专区
            </p>
            <div>
              <div
                onClick={handleCreateFlight}
                className="text-center bg-slate-300 inline-block w-[200px] h-[200px] m-4 leading-[200px] rounded text-[2rem] cursor-pointer"
              >
                输入航班
              </div>
              <div
                onClick={handleChangeFlight}
                className="text-center bg-slate-300 inline-block w-[200px] h-[200px] m-4 leading-[200px] rounded text-[2rem] cursor-pointer"
              >
                修改航班
              </div>
            </div>
          </div>
        </div>
        <AlertDialog
          open={open}
          onClose={handleDialogClose}
          formIndex={formIndex}
          flight={flight}
        />
      </div>
      {/* 
      <button
        onClick={() => {
          fetch("/api/flight?start_location=City A&end_location=City B")
            .then((res) => res.json())
            .then((data) => console.log(data));
        }}
      >
        查询航班
      </button>
       */}
    </main>
  );
}
