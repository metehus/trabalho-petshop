import { Box, Container, Flex, Link, Text, useColorMode } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export default function Header() {
  

  // useColorMode().setColorMode('dark')
  return (
    <Box as="header" bg="black" color="white">
      <Container maxW="container.xl" py={4} as="nav">
        <Flex alignItems="center" gap={4}>
          <Text fontWeight="bold">
            Petshop
          </Text>
          <HeaderLink to="/">Início</HeaderLink>
          <Box flex={1} />
          <HeaderLink to="/login">Login</HeaderLink>
          <HeaderLink to="/register">Cadastro</HeaderLink>
          <HeaderLink to="/checkout">Carrinho</HeaderLink>
        </Flex>
          
      </Container>
    </Box>
  )
}

export function HeaderLink({ children, to }) {
  return <Link color="whiteAlpha.700" _hover={{ color: 'white' }} as={RouterLink} to={to}>{children}</Link> 
}