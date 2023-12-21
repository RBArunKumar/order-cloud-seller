import {
  HStack,
  VStack,
  Text,
  Button,
  Box,
  Heading,
  Image,
  Flex,
  GridItem,
  Grid,
} from '@chakra-ui/react';

export const Default = (): JSX.Element => {
  return (
    <VStack w="100%" width="full" textAlign="center" alignItems="center" p={4}>
      <VStack w="100%" width="full" textAlign="left" alignItems="center" maxW="700px">
        <Box
          width="full"
          textAlign="left"
          border="1px"
          borderColor="gray.300"
          borderRadius="25px"
          p="15px"
          background="white"
          shadow="xl"
        >
          <HStack mb="15px">
            <Image
              border="2px"
              borderColor="black"
              borderRadius="60px"
              shadow="xl"
              mr="20px"
              src="https://edge.sitecorecloud.io/sitecoresaa198b-ordercloudba502-development-db0b/media/Project/Order-Cloud-Buyer-Consumer/Pets-Galore/PuppyConsierge.png?h=100"
            ></Image>
            <Heading>Puppy Concierge</Heading>
          </HStack>
          <Button mb="20px">Start chatting</Button>

          <Flex
            textAlign="left"
            pl="30px"
            pr="30px"
            pt="10px"
            pb="10px"
            background="white"
            border="1px"
            borderColor="gray.300"
            borderRadius="20px"
            fontSize="18px"
            mb="20px"
            width="auto"
          >
            <Text mb="0px">
              Can we help you get food for <b>Cooper?</b>
            </Text>
          </Flex>
          <Box width="100%">
            <Flex
              textAlign="right"
              alignContent="flex-end"
              pl="30px"
              pr="30px"
              pt="10px"
              pb="10px"
              background="aliceblue"
              borderRadius="20px"
              fontSize="18px"
              float="right"
              mb="20px"
              width="auto"
            >
              <Text mb="0px">I am hoping to find training tools for him?</Text>
            </Flex>
          </Box>
          <VStack
            textAlign="left"
            pl="30px"
            pr="30px"
            pt="10px"
            pb="10px"
            background="white"
            border="1px"
            borderColor="gray.300"
            borderRadius="20px"
            fontSize="18px"
            mb="20px"
            width="100%"
          >
            <Text width="100%" mb="10px" display="block">
              We have fitness toys or trainers?
            </Text>
            <HStack width="100%" alignContent="space-around">
              <VStack width="100%">
                <Image src="https://edge.sitecorecloud.io/sitecoresaa198b-ordercloudba502-development-db0b/media/Project/Order-Cloud-Buyer-Consumer/Pets-Galore/5296840.png?h=100"></Image>
                <Text mb="0px">Exercise balls</Text>
                <Text>$9</Text>
                <Button>Add to cart</Button>
              </VStack>
              <VStack width="100%">
                <Image src="https://edge.sitecorecloud.io/sitecoresaa198b-ordercloudba502-development-db0b/media/Project/Order-Cloud-Buyer-Consumer/Pets-Galore/trainingrewards.png?h=100"></Image>
                <Text mb="0px">Training treats</Text>
                <Text>$16</Text>
                <Button>Add to cart</Button>
              </VStack>
            </HStack>
          </VStack>
          <Box width="100%" alignContent="space-around">
            <Flex
              textAlign="right"
              alignContent="flex-end"
              pl="30px"
              pr="30px"
              pt="10px"
              pb="10px"
              background="aliceblue"
              borderRadius="20px"
              fontSize="18px"
              float="right"
              mb="20px"
              width="auto"
            >
              <Text mb="0px">Can you show me tech gadgets?</Text>
            </Flex>
          </Box>
          <VStack
            textAlign="left"
            pl="30px"
            pr="30px"
            pt="10px"
            pb="10px"
            background="white"
            border="1px"
            borderColor="gray.300"
            borderRadius="20px"
            fontSize="18px"
            mb="20px"
            width="100%"
          >
            <Text width="100%" mb="10px">
              These are the trending tech gadgets for dog owners with similar age and breed dogs!
            </Text>
            <HStack width="100%">
              <VStack width="100%">
                <Image src="https://edge.sitecorecloud.io/sitecoresaa198b-ordercloudba502-development-db0b/media/Project/Order-Cloud-Buyer-Consumer/Pets-Galore/whistlecollar.png?h=100"></Image>
                <Text>Whistle Collars</Text>
                <Text>$199</Text>
                <Button>Add to cart</Button>
              </VStack>
              <VStack width="100%">
                <Image src="https://edge.sitecorecloud.io/sitecoresaa198b-ordercloudba502-development-db0b/media/Project/Order-Cloud-Buyer-Consumer/Pets-Galore/BallChaser.png?h=100"></Image>
                <Text>Racing Rabbit</Text>
                <Text>$299</Text>
                <Button>Add to cart</Button>
              </VStack>
            </HStack>
          </VStack>
          <VStack
            textAlign="left"
            pl="30px"
            pr="30px"
            pt="10px"
            pb="10px"
            background="white"
            border="1px"
            borderColor="gray.300"
            borderRadius="20px"
            fontSize="18px"
            mb="20px"
            width="100%"
          >
            <Text width="100%" mb="10px">
              Shopping Cart
            </Text>
            <Grid width="100%" column={4} columnGap={10}>
              <GridItem width="100%">
                <HStack background="gray.200" pl="20px" pr="20px" pt="10px" pb="10px" mb="15px">
                  <Text fontSize="14px" textTransform="uppercase" mb="0px">
                    Product Information
                  </Text>
                </HStack>
              </GridItem>
              <GridItem width="100%" borderBottom="1px" borderColor="gray.200">
                <HStack width="100%">
                  <Image
                    src="https://edge.sitecorecloud.io/sitecoresaa198b-ordercloudba502-development-db0b/media/Project/Order-Cloud-Buyer-Consumer/Pets-Galore/whistlecollar.png?h=100"
                    width="100%"
                  ></Image>
                  <VStack width="100%">
                    <Text mb="0px">Whistle Collars</Text>
                    <Text fontSize="14px">Item #: sc-track-001</Text>
                  </VStack>
                  <Text width="100%" textAlign="center">
                    $199
                  </Text>
                  <Button variant="link" textDecoration="underline" width="100%">
                    Remove
                  </Button>
                </HStack>
              </GridItem>
            </Grid>
            <Button>Check out</Button>
          </VStack>
          <VStack
            textAlign="left"
            pl="30px"
            pr="30px"
            pt="10px"
            pb="10px"
            background="white"
            border="1px"
            borderColor="gray.300"
            borderRadius="20px"
            fontSize="18px"
            mb="20px"
            width="auto"
          >
            <Text width="100%" mb="10px">
              Would you like to add a subscription to have <b>Coopers</b> activity sent to your
              phone? &nbsp;&nbsp;<a href="#">Learn more</a>
            </Text>
            <HStack width="100%">
              <Button>Yes</Button>
              <Button variant="secondaryButton">No</Button>
            </HStack>
          </VStack>
          <VStack
            textAlign="left"
            pl="30px"
            pr="30px"
            pt="10px"
            pb="10px"
            background="white"
            border="1px"
            borderColor="gray.300"
            borderRadius="20px"
            fontSize="18px"
            mb="20px"
            width="100%"
          >
            <Text width="100%" mb="10px">
              Checkout
            </Text>
            <HStack width="100%">
              <VStack></VStack>
            </HStack>
            <Button>Complete order</Button>
          </VStack>
          <VStack
            textAlign="left"
            pl="30px"
            pr="30px"
            pt="10px"
            pb="10px"
            background="white"
            border="1px"
            borderColor="gray.300"
            borderRadius="20px"
            fontSize="18px"
            mb="20px"
            width="100%"
          >
            <Text width="100%" mb="10px">
              Invoice Details:
            </Text>
            <HStack width="100%">
              <VStack></VStack>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </VStack>
  );
};
