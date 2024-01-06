import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { Dispatch, SetStateAction } from "react";

interface ticketType {
  flight_id: string;
  model: string;
  start_location: string;
  end_location: string;
  start_time: string;
  seat_left: number;
  duration: number;
}

interface TicketTableProps {
  tickets: ticketType[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  setFormIndex: Dispatch<SetStateAction<number>>;
  setFlight: Dispatch<SetStateAction<any>>;
}

export default function TicketTable({
  tickets,
  setOpen,
  setFormIndex,
  setFlight,
}: TicketTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>航班号</TableCell>
            <TableCell>机型</TableCell>
            <TableCell>起点</TableCell>
            <TableCell>终点</TableCell>
            <TableCell>起飞时间</TableCell>
            <TableCell>剩余票数</TableCell>
            <TableCell>飞行时长(min)</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((row: ticketType) => (
            <TableRow
              key={row.flight_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.flight_id}
              </TableCell>
              <TableCell>{row.model}</TableCell>
              <TableCell>{row.start_location}</TableCell>
              <TableCell>{row.end_location}</TableCell>
              <TableCell>
                {dayjs(row.start_time).format("YYYY-MM-DD HH:mm:ss")}
              </TableCell>
              <TableCell>{row.seat_left}</TableCell>
              <TableCell>{row.duration}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    setFormIndex(0);
                    setOpen(true);
                    setFlight(row);
                  }}
                  variant="contained"
                  className="blue"
                >
                  订票
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
