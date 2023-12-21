import React, { useEffect, useState } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { VStack, HStack, Container, Heading, ButtonGroup, Button } from '@chakra-ui/react';
import UserTabs from './users/UserTabs';
import { useRouter } from 'next/router';
import OcAddressFormNotMapped from './checkout/OcAddressFormNotMapped';
import { BuyerAddress, Me } from 'ordercloud-javascript-sdk';
import NextLink from 'next/link';
const BACKGROUND_REG_EXP = new RegExp(
  /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi
);

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: ComponentProps): JSX.Element => {
  const [userAddress, setUserAddress] = useState([] as BuyerAddress);
  const { query } = useRouter();
  const { sitecoreContext } = useSitecoreContext();
  const containerStyles = props.params && props.params.Styles ? props.params.Styles : '';
  const styles = `${props.params.GridParameters} ${containerStyles}`.trimEnd();
  const phKey = `my-addresses-${props.params.DynamicPlaceholderId}`;
  let backgroundImage = props.params.BackgroundImage as string;
  let backgroundStyle: { [key: string]: string } = {};

  if (backgroundImage) {
    const prefix = `${sitecoreContext.pageState !== 'normal' ? '/sitecore/shell' : ''}/-/media/`;
    backgroundImage = `${backgroundImage?.match(BACKGROUND_REG_EXP)?.pop()?.replace(/-/gi, '')}`;
    backgroundStyle = {
      backgroundImage: `url('${prefix}${backgroundImage}')`,
    };
  }

  useEffect(() => {
    const initialize = async () => {
      initData();
    };
    initialize();
  }, []);

  async function initData() {
    const userAddress: BuyerAddress = await Me.GetAddress(query.addressid as string);
    setUserAddress(userAddress);
  }

  const handleSaveAddress = (address: Partial<BuyerAddress>) => {
    console.log('Save Address' + address);
  };
  return (
    <VStack
      className={`component container ${styles}`}
      as="section"
      w="100%"
      width="full"
      pt="40px"
      pb="40px"
      mt="30px"
    >
      <HStack
        as="section"
        w="100%"
        width="full"
        className="component-content"
        style={backgroundStyle}
      >
        <Container maxW="container.xl" w="100%" width="full">
          <HStack alignItems="flex-start">
            <UserTabs></UserTabs>
            <VStack textAlign="left" w="100%" width="full" alignItems="start">
              <Heading as="h1" w="100%" width="full">
                My Address
              </Heading>
              <OcAddressFormNotMapped
                id="billing"
                address={userAddress}
                onSubmit={handleSaveAddress}
              ></OcAddressFormNotMapped>
              <ButtonGroup mt="10">
                <Button variant="solid" bg="brand.500" color="white">
                  Save Address
                </Button>
                <NextLink href="/my-profile/my-addresses" passHref>
                  <Button variant="outline">Cancel</Button>
                </NextLink>
              </ButtonGroup>
            </VStack>
          </HStack>
          <Placeholder name={phKey} rendering={props.rendering} />
        </Container>
      </HStack>
    </VStack>
  );
};
