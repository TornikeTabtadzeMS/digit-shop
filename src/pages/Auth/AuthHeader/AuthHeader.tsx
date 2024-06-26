import { Link } from "react-router-dom";
import logo from "../../../assets/images/newlogo.png";

export default function AuthHeader() {
  return (
    <header className="bg-primary px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={"/"}>
          <img width={"100px"} height={"80px"} src={logo} alt="" />
        </Link>
      </div>
    </header>
  );
}
