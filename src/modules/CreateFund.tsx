import { Stack, Heading, Box, Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { CodeBlock } from "../components/CodeBlock";
import { useMoralis } from "react-moralis";
import { useHistory } from "react-router";

export const CreateFund = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const { signup, login, user, authError, isAuthenticated, isAuthenticating } =
    useMoralis();

  let history = useHistory();

  const Create = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log("creating ");

    console.log(user, isAuthenticated);

    if (!user || !isAuthenticated) {
      console.log("Redirecting ...");
      history.push("/login");
    } else {
      console.log("user ", user);
      const userFunds = user.attributes.funds;

      console.log("User funds ", userFunds);

      const newFund = {
        name: name,
        amount: amount,
      };

      userFunds.push(newFund);
      console.log(userFunds);

      user.set("funds", userFunds);
      await user.save();

      console.log(user.attributes);

      history.push("/home");
    }
  };

  return (
    <div>
      <Stack spacing={6}>
        <Box bg="blackAlpha.200" px="5" align="stretch" flex={1}>
          <Heading py="5" textAlign="center">
            Create Fund
          </Heading>
          <form onSubmit={Create}>
            <Stack spacing={6}>
              <Input
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                placeholder="Name of fund"
                required
              />
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.currentTarget.value)}
                placeholder="Amount Requesting"
                required
              />
              <Button type="submit" colorScheme="green">
                Create
              </Button>
            </Stack>
          </form>
        </Box>

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
