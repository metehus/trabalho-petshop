import {
  Box,
  Card,
  Container,
  Text,
  SimpleGrid,
  Image,
  Badge,
  Flex,
  Button,
} from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { lerCarrinho, salvarCarrinho } from "../services/cart";

export default function Produto() {
  const id = useParams().id;
  const [data, setData] = useState(null);
  const [quantidade, setQuantidade] = useState(1)

  useEffect(() => {
    api.get(`/produtos/${id}`).then((r) => {
      setData(r.data);
    });
  }, []);

  let nota = "-";

  if (data?.comentarios.length) {
    nota =
      data.comentarios.reduce((sum, value) => (sum += value.nota), 0) /
      data.comentarios.length;
  }

  function adicionarAoCarrinho() {
    const carrinho = lerCarrinho()

    carrinho.push({
      quantidade,
      produto: {
        id: data._id,
        nome: data.nome,
        imagem: data.imagem,
        preco: data.preco
      }
    })

    salvarCarrinho(carrinho)
  }

  return (
    <Box>
      <Container maxW="container.xl">
        <Text fontSize="lg">Detalhes do produto</Text>

        <Card mt={4}>
          {data ? (
            <SimpleGrid columns={2} p={6} gap={4}>
              <Box>
                <Image
                  borderRadius={4}
                  objectFit="cover"
                  width="100%"
                  height="auto"
                  fallbackSrc="https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
                  src={`http://localhost:8080${data.imagem}`}
                />
              </Box>
              <Box>
                <Badge colorScheme="yellow">{data.categoria.nome}</Badge>
                <Text fontSize="2xl">{data.nome}</Text>
                <Text>{data.descricao}</Text>
                <Text mt={2}>Nota média: {nota}</Text>

                <Text fontSize="xl" mt={5} textAlign="right">
                  R$ {data.preco}
                </Text>

                <Flex mt={1} justifyContent="end" alignItems="center" gap={2}>
                  <Flex direction="column">
                    <Text fontSize="sm">Quantidade</Text>
                    <NumberInput size="sm" maxW={20} defaultValue={1} min={1} value={quantidade} onChange={setQuantidade}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Flex>
                  <Button onClick={adicionarAoCarrinho} colorScheme='yellow'>Adicionar ao carrinho</Button>
                </Flex>
              </Box>
            </SimpleGrid>
          ) : (
            `Carregando`
          )}
        </Card>

          {data && (
        <Card mt={4} p={4}>
            <Text fontSize='lg'>Comentários</Text>

            {
              data.comentarios.map(c => (
                <Card variant='outline' p={4} my={1} >
                    <Text fontWeight='bold'>Nota {c.nota}</Text>
                    <Text>{c.texto}</Text>
                </Card>
              ))
            }
        </Card>
          )}
      </Container>
    </Box>
  );
}
