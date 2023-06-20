import { Box, Card, CardBody, Center, Image, Text, Heading, Flex, Button } from "@chakra-ui/react";

export default function Categoria({ categoria }) {
  return (
    <Card mb={4} variant='outline'>
      <CardBody>
        <Center>
          <Heading size='md'>{categoria.nome}</Heading>
        </Center>

        <Flex direction='row' gap={2}>
          {categoria.produtos.map((p) => (
            <Card  maxWidth={300}>
              <CardBody>
                <Image
                  objectFit='cover' width="100%" height={120}
                  fallbackSrc="https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
                  src={`http://localhost:8080${p.imagem}`}
                />
                {p.nome}
                <br />
                <Text>R$ {p.preco}</Text>
                <Button colorScheme='purple'>Detalhes</Button>
              </CardBody>
            </Card>
          ))}
        </Flex>
      </CardBody>
    </Card>
  );
}
