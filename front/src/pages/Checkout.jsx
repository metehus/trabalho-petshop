import { Container, Text, Flex, Card, Box, Image } from '@chakra-ui/react'
import { lerCarrinho, salvarCarrinho } from "../services/cart";

export default function Checkout() {

  const carrinho = lerCarrinho()

  return <Container maxW="container.xl">
    <Text fontSize='lg'>Carrinho</Text>

    <Card mt={4} p={4}>
            {
              carrinho.map(c => (
                <Card variant='outline' p={4} my={1} >
                  <Flex gap={2}>
                  <Image
                    borderRadius={4}
                    objectFit="cover"
                    width={82}
                    height={82}
                    fallbackSrc="https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
                    src={`http://localhost:8080${c.produto.imagem}`}
                  />
                    <Box flex={1}>
                    <Text fontWeight='bold'>{c.produto.nome}</Text>
                    <Text fontWeight='bold'>Preço unitário: R${c.produto.preco}</Text>
                    <Text fontWeight='bold'>Quantidade: R${c.quantidade}</Text>
                    </Box>
                    <Text fontSize="lg" fontWeight='bold'>R$ {c.quantidade * c.produto.preco}</Text>
                    </Flex>
                </Card>
              ))
            }
        </Card>
  </Container>
}