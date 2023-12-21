import { ChangeEvent, FormEvent, FunctionComponent, useCallback, useEffect, useState } from 'react';
import { FormControl, FormLabel, HStack, Input, VStack } from '@chakra-ui/react';

import { BuyerAddress } from 'ordercloud-javascript-sdk';
import { EMPTY_ADDRESS } from '../../../redux/ocAddressBook';
import React from 'react';

interface OcAddressFormNotMappedProps {
  id: string;
  onSubmit: (address: BuyerAddress) => void;
  address?: BuyerAddress;
}

const OcAddressFormNotMapped: FunctionComponent<OcAddressFormNotMappedProps> = ({
  id,
  onSubmit,
  address,
}) => {
  const [formValues, setFormValues] = useState(address || EMPTY_ADDRESS);

  useEffect(() => {
    setFormValues(address || EMPTY_ADDRESS);
  }, [address]);

  const handleFormSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      onSubmit(formValues);
    },
    [onSubmit, formValues]
  );

  // const handleDeleteAddress = useCallback(() => {
  //   if (onDelete) {
  //     onDelete(address.ID as string)
  //   }
  // }, [onDelete, address])

  const handleInputChange = (field: keyof BuyerAddress) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((s) => ({ ...s, [field]: e.target.value }));
  };

  // const handleDiscardChanges = useCallback(() => {
  //   setFormValues(address || EMPTY_ADDRESS)
  // }, [address])

  //  const hasChanges = useMemo(() => {
  //    return !isEqual(address, formValues)
  //  }, [address, formValues])

  return (
    <FormControl>
      <form onSubmit={handleFormSubmit}>
        <FormLabel w="100%" width="full" pl="10px" pt="10px" fontSize="16px">
          Address Name
        </FormLabel>
        <Input
          w="100%"
          width="full"
          type="text"
          id={`${id}_address_addressname`}
          name="address_addressname"
          placeholder="Enter address name"
          value={formValues.AddressName}
          onChange={handleInputChange('AddressName')}
          required
        />
        <VStack w="100%" width="full">
          <HStack w="100%" width="full">
            <VStack w="100%" width="full">
              <FormLabel w="100%" width="full" pl="10px" pt="10px" fontSize="16px">
                First Name:
              </FormLabel>
              <Input
                w="100%"
                width="full"
                type="text"
                id={`${id}_address_firstName`}
                name="address_firstName"
                placeholder="Enter first name"
                value={formValues.FirstName}
                onChange={handleInputChange('FirstName')}
                required
              />
            </VStack>
            <VStack w="100%" width="full">
              <FormLabel w="100%" width="full" pl="10px" pt="10px" fontSize="16px">
                Last Name:
              </FormLabel>
              <Input
                w="100%"
                width="full"
                type="text"
                id={`${id}_address_lastName`}
                name="address_lastName"
                placeholder="Enter last name"
                value={formValues.LastName}
                onChange={handleInputChange('LastName')}
                required
              />
            </VStack>
          </HStack>
          <FormLabel w="100%" width="full" pl="10px" pt="10px" fontSize="16px">
            Address
          </FormLabel>
          <Input
            w="100%"
            width="full"
            type="text"
            id={`${id}_address_street1`}
            name="address_street1"
            placeholder="Enter address"
            value={formValues.Street1}
            onChange={handleInputChange('Street1')}
            required
          />
          <FormLabel w="100%" width="full" pl="10px" pt="10px" fontSize="16px">
            Address Two
          </FormLabel>
          <Input
            w="100%"
            width="full"
            type="text"
            id={`${id}_address_street2`}
            name="address_street2"
            placeholder="Enter address two"
            value={formValues.Street2}
            onChange={handleInputChange('Street2')}
          />
          <FormLabel w="100%" width="full" pl="10px" pt="10px" fontSize="16px">
            City:
          </FormLabel>
          <Input
            w="100%"
            width="full"
            type="text"
            id={`${id}_address_city`}
            name="address_city"
            placeholder="Enter city"
            value={formValues.City}
            onChange={handleInputChange('City')}
            required
          />
          <HStack w="100%" width="full">
            <VStack w="100%" width="full">
              <FormLabel w="100%" width="full" pl="10px" pt="10px" fontSize="16px">
                State:
              </FormLabel>
              <Input
                w="100%"
                width="full"
                type="text"
                id={`${id}_address_state`}
                name="address_state"
                placeholder="Enter state"
                value={formValues.State}
                onChange={handleInputChange('State')}
                required
              />
            </VStack>
            <VStack w="100%" width="full">
              <FormLabel w="100%" width="full" pl="10px" pt="10px" fontSize="16px">
                Postalcode:
              </FormLabel>
              <Input
                w="100%"
                width="full"
                type="text"
                id={`${id}_address_zip`}
                name="address_zip"
                placeholder="Enter postalcode"
                value={formValues.Zip}
                onChange={handleInputChange('Zip')}
                required
              />
            </VStack>
            <VStack w="100%" width="full">
              <FormLabel w="100%" width="full" pl="10px" pt="10px" fontSize="16px">
                Country:
              </FormLabel>
              <Input
                w="100%"
                width="full"
                type="text"
                id={`${id}_address_country`}
                name="address_country"
                placeholder="Enter country"
                value={formValues.Country}
                onChange={handleInputChange('Country')}
                required
              />
            </VStack>
          </HStack>
          <FormLabel w="100%" width="full" pl="10px" pt="10px" fontSize="16px">
            Phone Number:
          </FormLabel>
          <Input
            w="100%"
            width="full"
            type="text"
            id={`${id}_address_phone`}
            name="address_phone"
            placeholder="Enter phone number"
            value={formValues.Phone}
            onChange={handleInputChange('Phone')}
          />
        </VStack>
      </form>
    </FormControl>
  );
};

export default OcAddressFormNotMapped;
