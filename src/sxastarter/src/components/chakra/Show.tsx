import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Show } from '@chakra-ui/react';
import { buildStylesObj } from 'src/utils/formatStyles';

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: ComponentProps): JSX.Element => {
  const containerStyles = props.params && props.params.Styles ? props.params.Styles : '';
  const phKey = `show-${props.params.DynamicPlaceholderId}`;
  const stylesObj = buildStylesObj(containerStyles);

  return (
    <Show className={`show component`} w="100%" width="full" {...stylesObj}>
      <Placeholder name={phKey} rendering={props.rendering} />
    </Show>
  );
};
