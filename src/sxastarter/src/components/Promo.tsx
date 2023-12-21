import { Box, Button, HStack, Heading, Link, VStack } from '@chakra-ui/react';
import {
  Field,
  ImageField,
  Image as JssImage,
  LinkField,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';

import React from 'react';

interface Fields {
  PromoIcon: ImageField;
  PromoText: Field<string>;
  PromoLink: LinkField;
  PromoText2: Field<string>;
  PromoText3: Field<string>;
  PromoIcon2: ImageField;
}

type PromoProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const PromoDefaultComponent = (props: PromoProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Promo</span>
    </div>
  </div>
);

export const Default = (props: PromoProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`}>
        <HStack bg="gray.200" mt={20} mb={20} p={10}>
          <Box className="field-promoicon" w="60%">
            <JssImage field={props.fields.PromoIcon} />
          </Box>
          <Box
            className="component-content"
            bg="white"
            border="1px"
            borderColor="gray.300"
            alignSelf="stretch"
            justifyContent="stretch"
            width="full"
            p={20}
            w="35%"
          >
            <div className="promo-text">
              <div>
                <div className="field-promotext">
                  <h2>
                    <RichText className="promo-text" mb={10} field={props.fields.PromoText} />
                  </h2>
                </div>
              </div>
              <div className="field-promotext">
                <RichText className="promo-text" mb={10} field={props.fields.PromoText2} />
              </div>
            </div>
            {props?.fields?.PromoLink?.value?.href && (
              <Link
                href={props?.fields?.PromoLink?.value?.href}
                title={props?.fields?.PromoLink?.value?.title}
              >
                <Button
                  mt="20px"
                  variant={props?.fields?.PromoLink?.value?.class || 'primaryButton'}
                >
                  {props?.fields?.PromoLink?.value?.text}
                </Button>
              </Link>
            )}
          </Box>
        </HStack>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};

export const Banner = (props: PromoProps): JSX.Element => {
  if (props.fields) {
    return (
      <VStack
        className={`component promo ${props.params.styles}`}
        backgroundColor="brand.500"
        textAlign="center"
        mb="40px"
      >
        <div className="banner-content">
          <div className="promo-text">
            <div>
              <HStack className="field-promotext">
                <Heading as="h2" color="white!important">
                  <RichText mb={5} field={props.fields.PromoText} />
                </Heading>
              </HStack>
            </div>
          </div>
        </div>
      </VStack>
    );
  }

  return <PromoDefaultComponent {...props} />;
};

export const SmallPromo = (props: PromoProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`}>
        <HStack mt={20} mb={20} p={10}>
          <Box className="field-promoicon" w="60%">
            <JssImage field={props.fields.PromoIcon} />
          </Box>
          <Box
            className="component-content"
            alignSelf="stretch"
            justifyContent="stretch"
            width="full"
            p={20}
            w="40%"
          >
            <div className="promo-text">
              <HStack
                className="field-promotext"
                color="#a9283b"
                textTransform="uppercase"
                fontWeight="bold"
              >
                <h2>
                  <RichText className="promo-text" mb={10} field={props.fields.PromoText} />
                </h2>
              </HStack>
              <HStack textTransform="uppercase" fontWeight="bold" fontSize="40px">
                <RichText className="promo-text" mb={10} field={props.fields.PromoText2} />
              </HStack>
            </div>
            {props?.fields?.PromoLink?.value?.href && (
              <Link
                href={props?.fields?.PromoLink?.value?.href}
                title={props?.fields?.PromoLink?.value?.title}
              >
                <Button
                  mt="20px"
                  variant={props?.fields?.PromoLink?.value?.class || 'primaryButton'}
                >
                  {props?.fields?.PromoLink?.value?.text}
                </Button>
              </Link>
            )}
          </Box>
        </HStack>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};
export const SmallPromoFlipped = (props: PromoProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`}>
        <HStack mt={20} mb={20} p={10}>
          <Box
            className="component-content"
            alignSelf="stretch"
            justifyContent="stretch"
            width="full"
            p={20}
            w="40%"
          >
            <div className="promo-text">
              <HStack color="#a9283b" textTransform="uppercase" fontWeight="bold">
                <h2>
                  <RichText className="promo-text" mb={10} field={props.fields.PromoText} />
                </h2>
              </HStack>
              <HStack textTransform="uppercase" fontWeight="bold" fontSize="40px">
                <RichText className="promo-text" mb={10} field={props.fields.PromoText2} />
              </HStack>
            </div>
            {props?.fields?.PromoLink?.value?.href && (
              <Link
                href={props?.fields?.PromoLink?.value?.href}
                title={props?.fields?.PromoLink?.value?.title}
              >
                <Button
                  mt="20px"
                  variant={props?.fields?.PromoLink?.value?.class || 'primaryButton'}
                >
                  {props?.fields?.PromoLink?.value?.text}
                </Button>
              </Link>
            )}
          </Box>
          <Box className="field-promoicon" w="60%">
            <JssImage field={props.fields.PromoIcon} />
          </Box>
        </HStack>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};

export const BillboardPromo = (props: PromoProps): JSX.Element => {
  if (props.fields) {
    return (
      <div
        className={`component promo ${props.params.styles}`}
        style={{
          backgroundImage: `url(${props.fields.PromoIcon2.value.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <VStack width="full" w="100%" position="relative">
          <HStack mt={20} mb={20} width="full" w="100%" textAlign="left" pl={40} pr={40}>
            <VStack width="full" w="100%" textAlign="left" pl={12}>
              <Heading
                as="h2"
                width="full"
                w="100%"
                mb="0px!important"
                fontSize="24px"
                color="brand.500!important"
              >
                <RichText
                  width="full"
                  w="100%"
                  mb="0px!important"
                  field={props.fields.PromoText}
                  color="brand.500!important"
                />
              </Heading>
              <Heading as="h1" width="full" w="100%" fontSize="45px" mb="0px" mt="0px">
                <RichText width="full" w="100%" mb="0px" field={props.fields.PromoText2} />
              </Heading>
              <HStack width="full" w="100%" mb={5} fontSize="16px" as="i" display="inline-block">
                <RichText field={props.fields.PromoText3} />
              </HStack>
              <HStack
                width="full"
                w="100%"
                textAlign="left"
                alignContent="left"
                display="inline-block"
              >
                {props?.fields?.PromoLink?.value?.href && (
                  <Link
                    href={props?.fields?.PromoLink?.value?.href}
                    title={props?.fields?.PromoLink?.value?.title}
                  >
                    <Button
                      mt="20px"
                      variant={props?.fields?.PromoLink?.value?.class || 'primaryButton'}
                    >
                      {props?.fields?.PromoLink?.value?.text}
                    </Button>
                  </Link>
                )}
              </HStack>
            </VStack>
            <Box
              className="field-promoicon"
              objectFit="cover"
              width="full"
              w="100%"
              borderRadius="20px"
            >
              <JssImage field={props.fields.PromoIcon} />
            </Box>
          </HStack>
        </VStack>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};
export const BillboardPromoFlipped = (props: PromoProps): JSX.Element => {
  if (props.fields) {
    return (
      <div
        className={`component promo ${props.params.styles}`}
        style={{
          backgroundImage: `url(${props.fields.PromoIcon2.value.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <VStack width="full" w="100%" position="relative">
          <HStack mt={20} mb={20} width="full" w="100%" textAlign="right" pl={40} pr={40}>
            <Box
              className="field-promoicon"
              objectFit="cover"
              width="full"
              w="100%"
              borderRadius="20px"
            >
              <JssImage field={props.fields.PromoIcon} />
            </Box>
            <VStack width="full" w="100%" textAlign="right">
              <Heading
                as="h2"
                width="full"
                w="100%"
                m="0px!important"
                fontSize="24px"
                color="brand.500!important"
              >
                <RichText
                  width="full"
                  w="100%"
                  m="0px"
                  field={props.fields.PromoText}
                  color="brand.500!important"
                />
              </Heading>
              <Heading as="h1" width="full" w="100%" fontSize="45px" mb="0px" mt="0px">
                <RichText width="full" w="100%" mb="0px" field={props.fields.PromoText2} />
              </Heading>
              <HStack width="full" w="100%" mb={5} fontSize="16px" as="i" display="inline-block">
                <RichText field={props.fields.PromoText3} />
              </HStack>
              <HStack
                width="full"
                w="100%"
                textAlign="right"
                alignContent="right"
                display="inline-block"
              >
                {props?.fields?.PromoLink?.value?.href && (
                  <Link
                    href={props?.fields?.PromoLink?.value?.href}
                    title={props?.fields?.PromoLink?.value?.title}
                  >
                    <Button
                      mt="20px"
                      borderRadius="50px"
                      p="30px"
                      pr="40px"
                      pl="40px"
                      bg="brand.500"
                      fontSize="18px"
                      variant={props?.fields?.PromoLink?.value?.class || 'primaryButton'}
                    >
                      {props?.fields?.PromoLink?.value?.text}
                    </Button>
                  </Link>
                )}
              </HStack>
            </VStack>
          </HStack>
        </VStack>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};
