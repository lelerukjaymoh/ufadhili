import { Stack, Heading, Box, Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { CodeBlock } from "../components/CodeBlock";
import { useMoralis } from "react-moralis";
import { useHistory } from "react-router";

export const Login = () => {
  const [signupMail, setMail] = useState("");
  const [signupPassword, setPassword] = useState("");
  const [signupPhone, setPhone] = useState("");
  const [loginMail, setLoginMail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const { signup, login, user, authError, isAuthenticated, isAuthenticating } =
    useMoralis();

  let history = useHistory();

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();

    signup(signupMail, signupPassword, signupMail, { signupPhone });
  };

  const HandleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    login(loginMail, loginPassword);

    if (isAuthenticated) {
      console.log("signu user", user);

      console.log(user?.attributes);

      if (!user?.attributes.funds) {
        user?.set("funds", []);
        await user?.save();
      }

      console.log("Redirecting ...");
      history.push("/home");
    } else {
      console.log("Could not redirect");
    }
  };

  return (
    <div>
      <Stack spacing={6}>
        <Stack mt="10" spacing={6} direction="row" align="stretch">
          <Box bg="blackAlpha.200" px="5" align="stretch" flex={1}>
            <Heading py="5" textAlign="center">
              Sign up
            </Heading>
            <form onSubmit={handleSignup}>
              <Stack spacing={6}>
                <Input
                  value={signupMail}
                  onChange={(e) => setMail(e.currentTarget.value)}
                  placeholder="email"
                  required
                />
                <Input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  placeholder="password"
                  required
                />
                <Input
                  type="phone"
                  value={signupPhone}
                  onChange={(e) => setPhone(e.currentTarget.value)}
                  placeholder="phone"
                  required
                />
                <Button type="submit" colorScheme="green">
                  Sign up
                </Button>
              </Stack>
            </form>
          </Box>
          <Box bg="blackAlpha.200" px="5" flex={1}>
            <Heading py="5" textAlign="center">
              Log In
            </Heading>
            <form onSubmit={HandleLogin}>
              <Stack spacing={6}>
                <Input
                  value={loginMail}
                  onChange={(e) => setLoginMail(e.currentTarget.value)}
                  placeholder="email"
                  required
                />
                <Input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.currentTarget.value)}
                  placeholder="password"
                  required
                />
                <Button type="submit" colorScheme="green">
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>

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
