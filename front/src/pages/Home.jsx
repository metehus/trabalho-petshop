import { Container, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Categoria from '../components/Categoria'

export default function Home() {
  const [response, setResponse] = useState(null)

  async function load() {
    setResponse(await fetch('http://localhost:8080/produtos/').then(r => r.json()))
  }

  useEffect(() => {
    load()
  }, [])

  return <Container maxW="container.xl">
    <Text fontSize='lg'>Categorias</Text>

    {response?.categorias?.map(cat => (
      <Categoria key={cat._id} categoria={cat} />
    ))}

  </Container>
}