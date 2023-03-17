import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContainerInputs, SignUpLayout, Container } from "./styled";
import axios from "axios";
import logo from "../../assets/logos/bigLogoSticker.png"

export default function SignUpPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    if (confirmPassword === formData.password) {

      axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, { ...formData})
           .then(() => {
                setLoading(false)
                navigate("/sign-in")
           })
            .catch(err => {
                alert(`Ocorreu um erro: ${err.response.data}`)
                setLoading(false)
           })

    } else {
      alert("As senhas informadas não se coincidem!")
      setLoading(false)
    }

  }

  return (
    <SignUpLayout>
      <Container>

        <img src={logo} />

        <ContainerInputs>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nome"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
            />

            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />

            <input
              type="password"
              placeholder="Senha"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />

            <input
              type="password"
              placeholder="Confirme sua senha"
              name="ConfirmPassword"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              disabled={loading}
            />

            <button>
              <ion-icon name="person-add-outline"></ion-icon>
              <p>Cadastrar</p>
            </button>
          </form>

          <Link to="/sign-in">
            <button>
              <ion-icon name="log-in-outline"></ion-icon>
              <p>Já tenho uma conta!</p>
            </button>
          </Link>
        </ContainerInputs>
      </Container>
    </SignUpLayout>
  )
}
