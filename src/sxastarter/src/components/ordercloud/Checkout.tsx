import { Address, BuyerCreditCard, Me, Promotion } from 'ordercloud-javascript-sdk';
import {
  Box,
  Button,
  Divider,
  HStack,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import {
  addPayment,
  applyPromo,
  patchOrder,
  removeAllPayments,
  saveBillingAddress,
  saveShippingAddress,
  submitOrder,
} from '../../redux/ocCurrentOrder';
import { useEffect, useState } from 'react';

import AddressCard from './cards/AddressCard';
import React from 'react';
import { formatCreditCardDate } from '../../utils/formatDate';
import formatPrice from '../../utils/formatPrice';
import useOcCurrentOrder from '../../hooks/useOcCurrentOrder';
import { useOcDispatch } from '../../redux/ocStore';
import { useRouter } from 'next/router';

type ShippingSpeed = 'overnight' | '2day' | 'ground';

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: ComponentProps): JSX.Element => {
  const containerStyles = props.params && props.params.Styles ? props.params.Styles : '';
  const styles = `${props.params.GridParameters} ${containerStyles}`.trimEnd();
  //let backgroundStyle: {[key: string]: string} = {}

  const toast = useToast();
  const router = useRouter();
  const dispatch = useOcDispatch();
  const { order, payments } = useOcCurrentOrder();
  const [addresses, setAddresses] = useState([] as Address[]);
  const [selectedAddress, setSelectedAddress] = useState({} as Address);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [creditCards, setCreditCards] = useState([] as BuyerCreditCard[]);
  const [promotion, setPromotion] = useState(null as Promotion);
  const [promotioncode, setPromotionCode] = useState(null);
  const [shippingSpeed, setShippingSpeed] = useState('' as ShippingSpeed);
  const [selectedCreditCard, setSelectedCreditCard] = useState({} as BuyerCreditCard);
  const [isCreditCardModalOpen, setIsCreditCardModalOpen] = useState(false);
  const [submittedOrderId, setSubmittedOrderId] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submittedOrderPromoValid, setSubmittedOrderPromoValid] = useState(false);

  useEffect(() => {
    const handleOrderSubmit = async () => {
      try {
        setSubmittedOrderId(null);
        setSubmitLoading(true);
        const orderSubmitResponse = await dispatch(submitOrder(order)).unwrap();
        toast({
          title: 'Thank you!',
          description: 'Your order has been submitted',
          status: 'success',
          duration: 8000,
          isClosable: true,
          position: 'top',
        });
        setSubmitLoading(false);
        router.push(`/my-profile/my-orders/order-details?orderid=${orderSubmitResponse.order.ID}`);
      } catch (e) {
        setSubmittedOrderId(null);
        setSubmitLoading(false);
        toast({
          title: 'An unknown error occurred',
          description: 'Oops, an unknown error occurred. Please contact support for assistance',
          status: 'error',
          duration: 800,
          isClosable: true,
          position: 'top',
        });
      }
    };

    if (submittedOrderId) {
      handleOrderSubmit();
    }
  }, [dispatch, order, router, submittedOrderId, toast]);

  async function onPromotionSubmit() {
    try {
      setSubmitLoading(true);
      dispatch(applyPromo(promotioncode));
      const promotionList = await Me.ListPromotions({ filters: { Code: promotioncode } });
      toast({
        title: 'Promotion applied!',
        description: 'Your order has been updated and the promotion has been applied',
        status: 'success',
        duration: 8000,
        isClosable: true,
        position: 'top',
      });
      setSubmitLoading(false);
      //console.log(promotionList);
      if (promotionList.Items.length) {
        setSubmittedOrderPromoValid(true);
        setPromotion(promotionList.Items[0]);
      }
    } catch (e) {
      setSubmitLoading(false);
      toast({
        title: 'An unknown error occurred',
        description: 'Oops, an unknown error occurred. Please contact support for assistance',
        status: 'error',
        duration: 800,
        isClosable: true,
        position: 'top',
      });
    }
  }

  useEffect(() => {
    const initialize = async () => {
      if (!order?.ID) {
        return;
      }
      // address stuff
      const addressList = await Me.ListAddresses({ sortBy: ['DateCreated'] });
      setAddresses(addressList.Items);
      const address =
        addressList.Items.find((a) => a.ID === order.ShippingAddressID) ?? addressList.Items[0];
      setSelectedAddress(address);

      // credit card stuff
      const creditcardList = await Me.ListCreditCards({ sortBy: ['DateCreated'] });
      setCreditCards(creditcardList.Items);
      const creditCard = !payments?.length
        ? creditcardList.Items[0]
        : creditcardList.Items.find((c) => c.ID === payments[0].CreditCardID);
      if (creditCard) setSelectedCreditCard(creditCard);
    };
    initialize();
  }, [order?.ID, order?.ShippingAddressID, payments]);

  useEffect(() => {
    const saveAddressToOrder = async () => {
      setIsAddressModalOpen(false);
      await dispatch(saveShippingAddress(selectedAddress));
      await dispatch(saveBillingAddress(selectedAddress));
    };
    if (selectedAddress?.ID && order?.ID) {
      saveAddressToOrder();
    }
  }, [dispatch, order?.ID, selectedAddress, selectedAddress?.ID]);

  useEffect(() => {
    const saveCreditCardToOrder = async () => {
      setIsCreditCardModalOpen(false);
      if (!payments?.length) {
        dispatch(
          addPayment({
            Type: 'CreditCard',
            CreditCardID: selectedCreditCard.ID,
            // bit of a hack here for demo, ideally this would get set to true in middleware and we wouldn't grant buyer users OrderAdmin role
            Accepted: true,
          })
        );
      } else if (
        payments[0].Amount !== order?.Total ||
        payments[0].CreditCardID !== selectedCreditCard.ID
      ) {
        await dispatch(removeAllPayments());
        await dispatch(
          addPayment({
            Type: 'CreditCard',
            CreditCardID: selectedCreditCard.ID,
            // bit of a hack here for demo, ideally this would get set to true in middleware and we wouldn't grant buyer users OrderAdmin role
            Accepted: true,
          })
        );
      }
    };
    if (selectedCreditCard?.ID && order?.ID) {
      saveCreditCardToOrder();
    }
  }, [dispatch, order?.ID, order?.Total, payments, selectedCreditCard.ID]);

  useEffect(() => {
    const saveShippingSpeedToOrder = async () => {
      // This is a bit of a hack put in for demo purposes
      // ideally would use shippingestimates integration event
      // and not grant user OverrideShipping role
      dispatch(
        patchOrder({
          ShippingCost: shippingSpeed === 'ground' ? 7.99 : shippingSpeed === '2day' ? 9.99 : 12.99,
        })
      );
    };

    if (shippingSpeed) {
      saveShippingSpeedToOrder();
    }
  }, [dispatch, shippingSpeed]);

  const handlePromoCode = (promo: string) => {
    setPromotionCode(promo);
  };

  if (!order) {
    return <div></div>;
  }

  return (
    <>
      <VStack
        w="100%"
        width="full"
        justifyContent="space-between"
        className={`component container ${styles}`}
        //style={backgroundStyle}
      >
        <HStack w="100%" width="full">
          <VStack w="100%" width="full">
            <HStack w="100%" width="full" alignItems="flex-start">
              <Text fontWeight="bold">1</Text>
              <HStack w="40%">
                <Text fontWeight="bold">Shipping address</Text>
              </HStack>
              <VStack w="80%" justifyContent="flex-start" textAlign="left">
                <Text w="100%" width="full" textAlign="left" fontSize="16">
                  {selectedAddress.FirstName} {selectedAddress.LastName}
                </Text>
                <Text w="100%" width="full" textAlign="left" fontSize="16">
                  {selectedAddress.Street1}
                </Text>
                <Text w="100%" width="full" textAlign="left" fontSize="16">
                  {selectedAddress.City}, {selectedAddress.State} {selectedAddress.Zip}
                </Text>
                <Text
                  w="100%"
                  width="full"
                  textAlign="left"
                  textColor="brand.500"
                  fontSize="16"
                  cursor="pointer"
                  textDecor="underline"
                  onClick={() => setIsDeliveryModalOpen(true)}
                >
                  Add delivery instructions
                </Text>
              </VStack>
              <Link onClick={() => setIsAddressModalOpen(true)}>
                <Text textDecoration="underline" textColor="brand.500" fontSize="16">
                  Change
                </Text>
              </Link>
            </HStack>
            <Divider borderColor="gray.300"></Divider>
            <HStack w="100%" width="full" alignItems="flex-start">
              <Text fontWeight="bold">2</Text>
              <Text w="40%" fontWeight="bold">
                Payment method
              </Text>
              <VStack w="80%" justifyContent="flex-start" textAlign="left">
                <HStack w="100%" width="full" textAlign="left" fontSize="16">
                  <Box
                    border="1px"
                    borderColor="gray.400"
                    borderRadius="lg"
                    bgColor="gray.200"
                    p="2px"
                  >
                    {selectedCreditCard.CardType}
                  </Box>{' '}
                  <Text>ending in {selectedCreditCard.PartialAccountNumber}</Text>
                </HStack>
                <Text w="100%" width="full" textAlign="left" fontSize="16">
                  Billing address: {selectedAddress.FirstName} {selectedAddress.LastName},{' '}
                  {selectedAddress.Street1}...
                </Text>
                {!submittedOrderPromoValid ? (
                  <>
                    <Text w="100%" width="full" textAlign="left" fontSize="12" fontWeight="bold">
                      Add a gift card or promotion code or voucher
                    </Text>
                    <Box w="100%" width="full" textAlign="left">
                      <Input
                        id="PromoCode"
                        w="100%"
                        width="full"
                        maxW="200"
                        size="sm"
                        mr="10px"
                        mt="5px"
                        placeholder="Enter code"
                        onChange={(e) => handlePromoCode(e.target.value)}
                      ></Input>
                      <Button
                        variant="primaryButton"
                        mt="0px"
                        border="1px"
                        size="sm"
                        borderRadius="lg"
                        onClick={() => onPromotionSubmit()}
                      >
                        Apply
                      </Button>
                    </Box>
                  </>
                ) : (
                  <Text w="100%" width="full" textAlign="left" fontSize="16" fontWeight="bold">
                    Promotion has been applied.
                    <HStack>
                      <Text>Promotion ID:</Text>
                      <Text>{promotion?.ID}</Text>
                      <Text>Promotion Code:</Text>
                      <Text>{promotion?.Code}</Text>
                    </HStack>
                  </Text>
                )}
              </VStack>
              <Link>
                <Text
                  textDecoration="underline"
                  textColor="brand.500"
                  fontSize="16"
                  onClick={() => setIsCreditCardModalOpen(true)}
                >
                  Change
                </Text>
              </Link>
            </HStack>
            <Divider borderColor="gray.300"></Divider>
            <HStack w="100%" width="full" alignItems="flex-start">
              <Text fontWeight="bold">3</Text>
              <Text w="40%" fontWeight="bold">
                Review items and shipping
              </Text>
              <VStack w="80%" justifyContent="flex-start" textAlign="left">
                <Text w="100%" width="full" textAlign="left" fontSize="16">
                  Delivery Options
                </Text>
                <Text w="100%" width="full" textAlign="left" fontSize="16">
                  Shipping estimates are based on delivery speed after items have been shipped by
                  the carrier. Items requiring customization could take longer to ship.
                </Text>
                <Box w="100%" width="full" textAlign="left">
                  <Select
                    value={shippingSpeed}
                    placeholder="How fast should this ship?"
                    defaultValue="ground"
                    fontSize="16px"
                    height="40px"
                    onChange={(e) => setShippingSpeed(e.currentTarget.value as ShippingSpeed)}
                  >
                    <option value="overnight">Standard overnight ($12.99) - est 1 day</option>
                    <option value="2day">2 Day ($9.99) - est 4 days</option>
                    <option value="ground">Ground ($7.99) - est 2 days</option>
                  </Select>
                </Box>
              </VStack>
            </HStack>
            <HStack
              w="100%"
              width="full"
              border="1px"
              borderColor="gray.300"
              borderRadius="lg"
              p="5"
              ml="15px"
            >
              <Button
                bgColor="brand.500"
                color="white"
                borderRadius="lg"
                size="lg"
                fontSize="16"
                fontWeight="normal"
                onClick={() => setSubmittedOrderId(order?.ID)}
                disabled={submitLoading}
              >
                {submitLoading ? <Spinner color="brand.500" /> : 'Place your order'}
              </Button>
              <VStack justifyContent="flex-start" textAlign="left" w="100%" width="full" pl="10">
                <Text fontSize="24" w="100%" width="full">
                  Order total: {formatPrice(order.Total)}{' '}
                  <Text fontSize="14px">(Tax: {formatPrice(order.TaxCost)})</Text>
                </Text>
                <Text w="100%" width="full" fontSize="16">
                  By placing your order, you agree to our <b>privacy notice</b> and terms and{' '}
                  <b>conditions of use</b>.{' '}
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </HStack>
        <HStack>Order Summary</HStack>
      </VStack>
      <Modal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="18px">Change Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {addresses.map((address) => (
              <Box
                key={address.ID}
                onClick={() => setSelectedAddress(address)}
                padding={5}
                marginBottom={5}
                border="1px solid lightgray"
                _hover={{ bg: 'brand.100' }}
              >
                <AddressCard address={address} />
              </Box>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isCreditCardModalOpen} onClose={() => setIsCreditCardModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="18px">Change Credit Card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {creditCards.map((creditCard) => (
              <Box
                key={creditCard.ID}
                onClick={() => setSelectedCreditCard(creditCard)}
                padding={5}
                marginBottom={5}
                border="1px solid lightgray"
                _hover={{ bg: 'brand.100' }}
              >
                <VStack fontSize="16">
                  <Text fontSize="16">{creditCard.CardholderName}</Text>
                  <VStack>
                    <Box
                      border="1px"
                      borderColor="gray.400"
                      borderRadius="lg"
                      bgColor="gray.200"
                      p="2px"
                    >
                      {creditCard.CardType}
                    </Box>{' '}
                    <Text>ending in {creditCard.PartialAccountNumber}</Text>
                  </VStack>
                  <Text>Expires {formatCreditCardDate(creditCard?.ExpirationDate)}</Text>
                </VStack>
              </Box>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isDeliveryModalOpen} onClose={() => setIsDeliveryModalOpen(false)}>
        <ModalOverlay />
        <ModalContent width="100%" w="full" maxW="600px">
          <ModalHeader fontSize="18px">Add Delivery Instructions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Textarea placeholder="Delivery instructions" height="175px" />
              <HStack
                w="100%"
                width="full"
                justifyItems="space-between"
                justifyContent="space-between"
                mb={6}
              >
                <Button
                  type="button"
                  aria-describedby="ae-checkout-tip"
                  border="1px"
                  borderColor="gray.300"
                  variant="primaryButton"
                  height="50px"
                  onClick={() => setIsDeliveryModalOpen(false)}
                >
                  <Text fontSize="18px">Add</Text>
                </Button>
                <Button
                  type="button"
                  aria-describedby="ae-checkout-tip"
                  border="1px"
                  borderColor="gray.300"
                  variant="secondaryButton"
                  height="50px"
                  onClick={() => setIsDeliveryModalOpen(false)}
                >
                  <Text fontSize="18px">Cancel</Text>
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
