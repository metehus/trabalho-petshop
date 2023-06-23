import { Container, Text, Flex, Card, Box, Image, Button, useToast } from '@chakra-ui/react'
import { lerCarrinho, salvarCarrinho } from "../services/cart";
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import api from "../services/api";

export default function Checkout() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const toast = useToast()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      api.get(`/auth`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((r) => {
        setUserData(r.data);
      }).catch(() => {
        localStorage.removeItem("token")
        navigate('/login')
      }) 
    } else {
      navigate('/login')
    }
  }, [])

  async function checkout() {
    try {
      const token = localStorage.getItem("token")
      const carrinho = lerCarrinho()

      const pedido = await api.post('/pedidos', {
        produtos: carrinho.map(c => ({
          id: c.produto.id,
          quantidade: c.quantidade
        }))
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      toast({
        title: `Pedido ${pedido.data._id} feito com sucesso!`
      })
    } catch (error) {
      toast({
        title: 'Ocorreu um erro ao finalizar pedido',
        status: 'error'
      })
    }
  }


  const carrinho = lerCarrinho()

  const total = carrinho.length ? carrinho.reduce((sum, c) => sum + (c.quantidade * c.produto.preco), 0) : 0

  return <Container maxW="container.xl">
    <Text fontSize='3xl'>Carrinho</Text>

    <Card mt={4} p={4}>
      {carrinho.length ? <Box>

        {carrinho.map(c => (
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
        ))}

      <Text fontSize="2xl" fontWeight="bold" textAlign="right" mt={4}>Total: R$ {total.toFixed(2)}</Text>

      <Card variant="outline" mt={2} p={4}>
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Text>
                <b>Endereço de entrega:</b> {userData?.endereco ?? '-'}
              </Text>
              <Text mt={2}>
                <b>Cartão:</b> {userData?.cartaoDeCredito?.nome ?? '-'}
              </Text>
            </Box>
            <Button onClick={checkout} colorScheme="yellow" size="lg">Finalizar compra</Button>
          </Flex>
      </Card>

      </Box> : <h2>Carrinho vazio</h2>
      }
    </Card>
  </Container>
}