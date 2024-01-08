import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";

interface ticketType {
  name: string;
  ticket_time: string;
  cabin_rating: string;
  flight_id: string;
  id_value: string;
  seating_list: number;
  ticket_id: string;
}

const GetTicketForm = () => {
  const [id_value, setId_value] = useState("");
  const [name, setName] = useState("");
  const [ticketArr, setTicketArr] = useState<ticketType[]>([]);

  return (
    <div className="py-[50px]">
      <p className="mb-5 text-[1.5rem] font-bold">机票查询</p>

      <div className="justify-center items-center flex px-5 py-5">
        <TextField
          label="id_value"
          value={id_value}
          onChange={(e) => setId_value(e.currentTarget.value)}
        />
        <TextField
          label="姓名"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          sx={{ marginLeft: "10px" }}
        />
      </div>
      <Button
        onClick={() => {
          fetch(`/api/ticket?id_value=${id_value}&name=${name}`, {
            method: "GET",
          })
            .then((res) => res.json())
            .then((data) => {
              setTicketArr(data.ticket);
            })
            .catch((error) => {
              toast.error("查询失败！");
            });
        }}
        variant="contained"
        className="blue"
        sx={{ display: "block", margin: "auto" }}
      >
        查询
      </Button>
      {ticketArr.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>姓名</TableCell>
                <TableCell>航班号</TableCell>
                <TableCell>ticket_id</TableCell>
                <TableCell>身份证号</TableCell>
                <TableCell>座位等级</TableCell>
                <TableCell>起飞时间</TableCell>
                <TableCell>座位号</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ticketArr.map((row: ticketType) => (
                <TableRow
                  key={row.flight_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.flight_id}</TableCell>
                  <TableCell>{row.ticket_id}</TableCell>

                  <TableCell>{row.id_value}</TableCell>
                  <TableCell>{row.cabin_rating}</TableCell>
                  <TableCell>
                    {dayjs(row.ticket_time).format("YYYY-MM-DD HH:mm:ss")}
                  </TableCell>
                  <TableCell>{row.seating_list}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default GetTicketForm;
