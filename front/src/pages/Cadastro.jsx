import { useState } from 'react';
import {
  InputLeftElement,
  Input,
  InputGroup,
  Center,
  Text,
  Grid,
  GridItem,
  Button,
  Container,
} from '@chakra-ui/react';

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    endereco: '',
    cpf: '',
    fotoPerfil: null,
    nomeCartao: '',
    numeroCartao: '',
    cvc: '',
    email: '',
    senha: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFotoPerfilChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      fotoPerfil: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Container maxW="container.xl">
      <Text fontSize="lg">Checkout</Text>
      <form onSubmit={handleSubmit}>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          {/* Dados Pessoais */}
          <GridItem colSpan={1}>
            <Text fontSize="xl" fontWeight="bold" mt={4}>
              Dados Pessoais
            </Text>
            <InputGroup>
              <InputLeftElement>
                <span role="img" aria-label="Nome">
                  📛
                </span>
              </InputLeftElement>
              <Input
                name="nome"
                type="text"
                placeholder="Nome"
                onChange={handleInputChange}
                value={formData.nome}
                required
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement>
                <span role="img" aria-label="Telefone">
                  📞
                </span>
              </InputLeftElement>
              <Input
                name="telefone"
                type="tel"
                placeholder="Telefone"
                onChange={handleInputChange}
                value={formData.telefone}
                required
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement>
                <span role="img" aria-label="Endereço">
                  🏠
                </span>
              </InputLeftElement>
              <Input
                name="endereco"
                type="text"
                placeholder="Endereço"
                onChange={handleInputChange}
                value={formData.endereco}
                required
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement>
                <span role="img" aria-label="CPF">
                  🆔
                </span>
              </InputLeftElement>
              <Input
                name="cpf"
                type="text"
                placeholder="CPF"
                onChange={handleInputChange}
                value={formData.cpf}
                required
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement>
                <span role="img" aria-label="Foto de Perfil">
                  📷
                </span>
              </InputLeftElement>
              <Input
                name="fotoPerfil"
                type="file"
                accept="image/*"
                onChange={handleFotoPerfilChange}
                required
              />
            </InputGroup>

            {/* Exibir a imagem selecionada */}
            {formData.fotoPerfil && (
              <Center mt={2}>
                <img
                  src={formData.fotoPerfil}
                  alt="Foto de Perfil"
                  style={{ maxWidth: '100%', maxHeight: '200px' }}
                />
              </Center>
            )}
          </GridItem>

          {/* Dados do Cartão */}
          <GridItem colSpan={1}>
          <Text fontSize="xl" fontWeight="bold" mt={4}>
              Dados do Cartão
            </Text>
            <InputGroup>
              <InputLeftElement>
                <span role="img" aria-label="Nome do Cartão">
                  💳
                </span>
              </InputLeftElement>
              <Input
                name="nomeCartao"
                type="text"
                placeholder="Nome do Cartão"
                onChange={handleInputChange}
                value={formData.nomeCartao}
                required
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement>
                <span role="img" aria-label="Número do Cartão">
                  💳
                </span>
              </InputLeftElement>
              <Input
                name="numeroCartao"
                type="text"
                placeholder="Número do Cartão"
                onChange={handleInputChange}
                value={formData.numeroCartao}
                maxLength={20}
                required
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement>
                <span role="img" aria-label="CVC">
                  🔒
                </span>
              </InputLeftElement>
              <Input
                name="cvc"
                type="password"
                placeholder="CVC"
                onChange={handleInputChange}
                value={formData.cvc}
                minLength={3}
                maxLength={3}
                required
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement>
                <span role="img" aria-label="Email">
                  📧
                </span>
              </InputLeftElement>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleInputChange}
                value={formData.email}
                required
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement>
                <span role="img" aria-label="Senha">
                  🔒
                </span>
              </InputLeftElement>
              <Input
                name="senha"
                type="password"
                placeholder="Senha"
                onChange={handleInputChange}
                value={formData.senha}
                required
              />
            </InputGroup>
          </GridItem>

          <Button type="submit" gridColumn="span 2">
            Cadastrar
          </Button>
        </Grid>
      </form>
    </Container>
  );
}
