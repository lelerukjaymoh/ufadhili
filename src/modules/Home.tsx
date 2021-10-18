import React from "react";
import { Heading, Stack } from "@chakra-ui/layout";
import { Box, Button, Container } from "@chakra-ui/react";
import { useMoralis, useWeb3Transfer } from "react-moralis";
import { CodeBlock } from "../components/CodeBlock";
import Moralis from "moralis";
import { Link } from "react-router-dom";

export const Home = () => {
  const {
    authenticate,
    user,
    authError,
    isAuthenticated,
    isAuthenticating,
    logout,
  } = useMoralis();

  const Fund = () => {
    console.log(user);
    console.log(user?.attributes.funds);
    // return user?.attributes.funds;
  };

  const transferNativeQuery = useWeb3Transfer({
    amount: Moralis.Units.ETH(0.0001),
    receiver: "0x5E4e3BEd27A075Bffefd1ACA294f1492911D5EF8",
    type: "native",
  });

  return (
    <div>
      <Stack spacing={6}>
        <Container py="10" maxW="container.md">
          <Heading as="h6">
            Select an idea to fund or create one{" "}
            <Button as={Link} to="/create-fund">
              Create
            </Button>
          </Heading>
        </Container>
        <Container py="10" maxW="container.md">
          <Box bg="blackAlpha.200">
            <Button onClick={() => transferNativeQuery.fetch()}>
              Transfer
            </Button>
          </Box>
          {/* <CodeBlock>
            {JSON.stringify(
              {
                data: transferNativeQuery.data,
                error: transferNativeQuery.error,
                fetch: transferNativeQuery.fetch,
                isFetching: transferNativeQuery.isFetching,
                isLoading: transferNativeQuery.isLoading,
              },
              null,
              2
            )}
          </CodeBlock> */}
        </Container>

        {/* <CodeBlock>
          {JSON.stringify(
            {
              user,
              isAuthenticated,
              isAuthenticating,
              authError,
            },
            null,
            2
          )}
        </CodeBlock> */}
      </Stack>
    </div>
  );
};
