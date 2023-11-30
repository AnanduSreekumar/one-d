import {
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Link as ChakraLink,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import Loginsvg from "../../assets/login.svg";
import { useState } from "react";
import { motion } from "framer-motion";
import { login } from "../../utils/apiService";
import { Link as ReactRouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import userpool from "../../utils/userpool";
import { authenticate } from "../../utils/authenticate";

export default function Login() {
  const toast = useToast();
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      authenticate(email, pass)
        .then(
          (data) => {
            console.log(data);
            toast({
              title: "Successfully logged in",
              position: "top",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            localStorage.setItem("email", email);
            return navigate("/create");
          },
          (err) => {
            console.log(err);
            toast({
              title: "Error",
              position: "top",
              description: "Please type in valid credentials",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }
        )
        .catch((err) => console.log(err));

      if (email === "jeswanthv01@gmail.com") {
        localStorage.setItem("email", email);
        return navigate("/admin");
      }
      // return navigate("/create");
    } catch (error) {
      console.error("Login failed", error);
      toast({
        title: "Error",
        position: "top",
        description: "Invalid Credentials",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Stack minH={"80vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"}>Sign in to your account</Heading>

            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Text>
                  New user?{" "}
                  <ChakraLink
                    color={"teal.400"}
                    as={ReactRouterLink}
                    to="/register"
                  >
                    register
                  </ChakraLink>
                </Text>
              </Stack>
              <Button
                onClick={handleLogin}
                colorScheme={"teal"}
                variant={"solid"}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1} mt={5}>
          <Image boxSize="80vh" alt={"Login Image"} src={Loginsvg} />
        </Flex>
      </Stack>
    </motion.div>
  );
}
