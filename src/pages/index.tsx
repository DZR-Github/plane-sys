export default function Home() {
  return (
    <main>
      <div>plane_sys</div>
      <button
        onClick={() => {
          fetch(`/api/bill?ticket_id=TI5`)
            .then((res) => res.json())
            .then((data) => console.log(data));
        }}
      >
        打印账单
      </button>
      <button
        onClick={() => {
          fetch(
            `/api/flight?flight_id=F12&plane_id=P1&start_location=City A&end_location=City B&start_time=2024-01-03 09:00:00&seat_left=150&duration=120`,
            {
              method: "POST",
            }
          )
            .then((res) => res.json())
            .then((data) => console.log(data));
        }}
      >
        输入航班
      </button>
      <button
        onClick={() => {
          fetch("/api/flight?start_location=City A&end_location=City B")
            .then((res) => res.json())
            .then((data) => console.log(data));
        }}
      >
        查询航班
      </button>
      <button
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
      </button>
      <button
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
      </button>
      <button
        onClick={() => {
          fetch("/api/ticket?ticket_id=TI12", { method: "DELETE" })
            .then((res) => res.json())
            .then((data) => console.log(data));
        }}
      >
        退票
      </button>
    </main>
  );
}
