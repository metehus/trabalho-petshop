import { Container, Text, Input, Button, Link, Grid, GridItem } from '@chakra-ui/react';

export default function Login() {
  const handleLogin = () => {
    // Implement login logic here
    // Check if the user exists in the MongoDB database
    // If the user exists, proceed with login
    // If the user doesn't exist, redirect to the registration screen
  };

  return (
    <Container maxW="container.xl">
      <Grid
        height="50vh"
        templateRows="1fr auto"
        placeItems="center"
        gap={4}
      >
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Login
        </Text>

        <GridItem>
          <Grid templateColumns="1fr" gap={2}>
            <Input type="email" placeholder="Email" />
          </Grid>

          <Grid templateColumns="1fr" gap={2}>
            <Input type="password" placeholder="Senha" />
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
