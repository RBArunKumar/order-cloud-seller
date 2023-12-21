/* eslint-disable no-lone-blocks */

import { VStack, Text } from '@chakra-ui/react';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

// Component: Site Settings
// Version:   Name

interface Fields {
  OrderCloudAPIID: Field<string>;
  OrderCloudAPIUrl: Field<string>;
  OrderCloudScope: Field<string>;
  XMCWebsiteTheme: Field<string>;
}

type SiteSettingsProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: SiteSettingsProps): JSX.Element => {
  return (
    <VStack>
      <Text>{props.fields.OrderCloudAPIID.value}</Text>
      <Text>{props.fields.OrderCloudAPIUrl.value}</Text>
      <Text>{props.fields.OrderCloudScope.value}</Text>
      <Text>{props.fields.XMCWebsiteTheme.value}</Text>
    </VStack>
  );
};
