import { Container, Text, Input, Button, Link, Grid, GridItem } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../services/api';

export default function Login() {
  const navigate = useNavigate();

  const [autenticaData, setAutenticaData] = useState({
    email: '',
    senhaHash: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAutenticaData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogin = () => {
    api.post('/auth', autenticaData)
      .then((response) => {
        console.log(response.data)
        alert("Token gerado para o usuário " + response.data.nome)
        localStorage.setItem("token", response.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.error(err.response.data) // Objeto de erro vindo do axios
        alert("Ocorreu um erro! " + err.response.data.error)
      })
      .finally(() => {
        setAutenticaData({
          email: '',
          senhaHash: ''
        })
      });
  };

  return (
    <Container maxW="container.xl">
      <Grid height="50vh" templateRows="1fr auto" placeItems="center" gap={4}>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Login
        </Text>

        <GridItem>
          <Grid templateColumns="1fr" gap={2}>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={autenticaData.email}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid templateColumns="1fr" gap={2}>
            <Input
              type="password"
              name="senhaHash"
              placeholder="Senha"
              value={autenticaData.senhaHash}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid templateColumns="1fr" gap={2}>
            <Button colorScheme="blue" onClick={handleLogin} w="100%">
              Logar
            </Button>
          </Grid>
        </GridItem>

        <Link href="/register">Ainda não se cadastrou?</Link>
      </Grid>
    </Container>
  );
}