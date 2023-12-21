import { Box, HStack, List, ListItem } from '@chakra-ui/react';
import { Link as JssLink, LinkField, Text, TextField } from '@sitecore-jss/sitecore-jss-nextjs';

import React from 'react';

type ResultsFieldLink = {
  field: {
    link: LinkField;
  };
};

interface Fields {
  data: {
    datasource: {
      children: {
        results: ResultsFieldLink[];
      };
      field: {
        title: TextField;
      };
    };
  };
}

type LinkListProps = {
  params: { [key: string]: string };
  fields: Fields;
};

type LinkListItemProps = {
  key: string;
  index: number;
  total: number;
  field: LinkField;
};

const LinkListItem = (props: LinkListItemProps) => {
  let className = `item${props.index}`;
  className += (props.index + 1) % 2 === 0 ? ' even' : ' odd';
  if (props.index === 0) {
    className += ' first';
  }
  if (props.index + 1 === props.total) {
    className += ' last';
  }
  return (
    <ListItem className={className}>
      <div className="field-link">
        <JssLink field={props.field} />
      </div>
    </ListItem>
  );
};

const LinkListItemHorizontal = (props: LinkListItemProps) => {
  let className = `item${props.index}`;
  className += (props.index + 1) % 2 === 0 ? ' even' : ' odd';
  if (props.index === 0) {
    className += ' first';
  }
  if (props.index + 1 === props.total) {
    className += ' last';
  }
  return (
    <Box className={className}>
      <Box className="field-link" ml={5}>
        <JssLink field={props.field} />
      </Box>
    </Box>
  );
};

export const Default = (props: LinkListProps): JSX.Element => {
  const datasource = props.fields?.data?.datasource;
  const styles = `component link-list ${props.params.styles}`.trimEnd();

  if (datasource) {
    const list = datasource.children.results
      .filter((element: ResultsFieldLink) => element?.field?.link)
      .map((element: ResultsFieldLink, key: number) => (
        <LinkListItemHorizontal
          index={key}
          key={`${key}${element.field.link}`}
          total={datasource.children.results.length}
          field={element.field.link}
        />
      ));

    return (
      <div className={styles}>
        <div className="component-content">
          <Text tag="h3" field={datasource?.field?.title} />
          <HStack spacing={3}>{list}</HStack>
        </div>
      </div>
    );
  }

  return (
    <div className={styles}>
      <div className="component-content">
        <h3>Link List</h3>
      </div>
    </div>
  );
};

export const Vertical = (props: LinkListProps): JSX.Element => {
  const datasource = props.fields?.data?.datasource;
  const styles = `component link-list ${props.params.styles}`.trimEnd();

  if (datasource) {
    const list = datasource.children.results
      .filter((element: ResultsFieldLink) => element?.field?.link)
      .map((element: ResultsFieldLink, key: number) => (
        <LinkListItem
          index={key}
          key={`${key}${element.field.link}`}
          total={datasource.children.results.length}
          field={element.field.link}
        />
      ));

    return (
      <div className={styles}>
        <div className="component-content">
          <Text tag="h3" field={datasource?.field?.title} />
          <List spacing={3}>{list}</List>
        </div>
      </div>
    );
  }

  return (
    <div className={styles}>
      <div className="component-content">
        <h3>Link List</h3>
      </div>
    </div>
  );
};
