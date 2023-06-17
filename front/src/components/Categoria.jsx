import { Box, Center, Image } from '@chakra-ui/react'

export default function Categoria({ categoria }) {
  return <Box>
    <Center>{categoria.nome}</Center>

    {categoria.produtos.map(p => (
      <div>
        <Image src={`http://localhost:8080${p.imagem}`} />
        {p.nome}
        <br />
      </div>
    ))}
  </Box>
}