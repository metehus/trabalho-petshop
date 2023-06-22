import { Container, Select, Flex, Input, SimpleGrid, Text, Center } from "@chakra-ui/react";
import { useState, useEffect, useMemo } from "react";
import Categoria from "../components/Categoria";
import api from "../services/api";

export default function Home() {
  const [response, setResponse] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [orderBy, setOrderBy] = useState("titulo");

  async function load() {
    setResponse(
      await api.get('/produtos').then((r) => r.data)
    );
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    if (!searchText) {
      return response?.categorias;
    } else {
      return response?.categorias.map(c =>({
        ...c,
        produtos: c.produtos.filter((produto) =>
          produto.nome.toLowerCase().includes(searchText.toLowerCase())
        )
      }))
    }
  }, [response, searchText]);

  const categorias = useMemo(
    () =>
      filtered?.map(c =>({
        ...c,
        produtos: c.produtos.sort((a, b) => {
          if (orderBy === "nome") {
            // se for titulo compara por texto
            return a.titulo.localeCompare(b.titulo);
          } else if (orderBy === 'price-asc') {
            return a.preco - b.preco;
          } else {
            return b.preco - a.preco;
          }
      })
    })),
    [filtered, orderBy]
  );

  return (
    <Container maxW="container.xl">
      <Text fontSize="lg">Categorias</Text>

      <Center>
        <Flex p={2} mb={8} w="100%" direction="column" align="center" maxW={80} gap={3}>
            <Input
                size="lg"
                placeholder='Buscar produto'
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
            />
            <Flex align="center" w="100%">
                <Text
                    sx={{ width: 140 }}
                    as="span"
                >
                    Ordenar por
                </Text>
                <Select
                    size="sm"
                    value={orderBy}
                    onChange={e => setOrderBy(e.target.value)}
                >
                    <option value="nome">Nome</option>
                    <option value="price-desc">Preço (maior para o menor)</option>
                    <option value="price-asc">Preço (menor para o maior)</option>
                </Select>
            </Flex>
        </Flex>
    </Center>

      {categorias?.map((cat) => (
        <Categoria key={cat._id} categoria={cat} />
      ))}
    </Container>
  );
}
