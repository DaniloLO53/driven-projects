import styled from "styled-components";
import Logo from "../images/logos/bigLogo.png";
import InputLogin from "../components/InputLogin";
import { Link } from "react-router-dom";
import { IoPersonAddOutline } from "react-icons/io5";

export default function Login() {

  return (
    <Container>
      <Page>
        <img alt="logo" src={Logo} />
        <InputLogin />
        <Cadastro>
          <IoPersonAddOutline />
          <Link to="/sign-up" style={{ textDecoration: "none", color: "#49ad0d" }}>
            <p>Faça seu cadastro!</p>
          </Link>
        </Cadastro>
      </Page>
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffe8b6;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 25%;
  height: 57%;
  background-color: #ffffff;
  border-radius: 30px;
  padding: 10px;

  @media (max-width: 800px) {
    width: 100%;
    height: 100%;
    border-radius: 0px;
  }

  img {
    margin-bottom: 15px;
    width: 75%;

    @media (max-width: 800px) {
      width: 85%;
    }
  }
`;

const Cadastro = styled.button`
  margin-top: 10px;
  width: 67%;
  height: 55px;
  border-radius: 8px;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
  
  display: flex;
  justify-content: center;
  align-items: center;
  color: #49ad0d;
  font-size: 20px;

  p{
    margin-left: 10px;
  }
  
  :hover{
    background-color: #ECF6E6;
  }

  @media (max-width: 800px) {
    height: 45px;
  }
`;
