import { Button, TextField } from "@mui/material";

const CreateTravelerForm = () => {
  return (
    <div className="my-8 mx-[50px]">
      <p>填写个人信息</p>
      <TextField sx={{ display: "block", margin: "10px" }} label="姓名" />
      <TextField sx={{ display: "block", margin: "10px" }} label="性别" />
      <TextField sx={{ display: "block", margin: "10px" }} label="身份证号" />
      <TextField sx={{ display: "block", margin: "10px" }} label="手机号" />
      <Button
        sx={{ margin: "10px", paddingLeft: "30px", paddingRight: "30px" }}
        variant="contained"
        className="blue"
      >
        确认
      </Button>
    </div>
  );
};

export default CreateTravelerForm;

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
