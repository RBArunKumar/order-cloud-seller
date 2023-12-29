/**
 * This Layout is needed for Starter Kit.
 */
import React from 'react';
import Head from 'next/head';
import { Placeholder, LayoutServiceData, Field, HTMLLink } from '@sitecore-jss/sitecore-jss-nextjs';

import { getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs/utils';
import Scripts from 'src/Scripts';

import { ApiRole } from 'ordercloud-javascript-sdk';
import { Chakra } from '../src/components/Chakra';
import { OcConfig } from 'src/redux/ocConfig';
import OcProvider from '../src/redux/ocProvider';
import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
// import {
//   ClientId,
//   OrderCloudAPIUrl,
//   OrderCloudScope,
//   XMCWebsiteTheme,
// } from 'src/components/xmcloud/SiteSettings';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this   .
const publicUrl = getPublicUrl();

interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
}

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
}

const Layout = ({ layoutData }: LayoutProps): JSX.Element => {
  // let ocClientId = ClientId;
  // let ocClientAPIUrl = OrderCloudAPIUrl;
  // let ocScope = OrderCloudScope;
  // let xmcWebSiteTheme = XMCWebsiteTheme;
  const ocClientId = '9EC38CE2-1E94-4CAE-8ADA-E1F271544D83'; //Generic Consumer Site
  const ocClientAPIUrl = 'https://sandboxapi.ordercloud.io';
  const ocScope = [
    'FullAccess',
    'Shopper',
    'MeAddressAdmin',
    'OrderAdmin',
    'OverrideShipping',
    'SpendingAccountAdmin',
  ];
  const xmcWebSiteTheme = 'generictheme';

  const ocConfig: OcConfig = {
    clientId:
      ocClientId /* This is the client ID of your seeded OrderCloud organization  ORDER CLOUD MARKETPLACE */,
    baseApiUrl: ocClientAPIUrl /* API Url, leave as is for Sandbox */,
    isPreviewing:
      Boolean(process.env.EXPERIENCE_EDITOR_MODE) ||
      true /* Whether or not this is being rendered in xm experience editor*/,
    scope: ocScope as ApiRole[] /* Default user role */,
    allowAnonymous: false /* Whether anonymous product browsing is allowed */,
  };

  const { route } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;
  const isPageEditing = layoutData.sitecore.context.pageEditing;
  const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode';
  const { query } = useRouter();
  //Query used to allow a developer to add a querystring to add padding to the chakra components while in pages

  return (
    <>
      <Scripts />
      <OcProvider config={ocConfig}>
        <Chakra currentTheme={xmcWebSiteTheme}>
          <Head>
            <title>{fields?.Title?.value?.toString() || 'Page'}</title>
            <link rel="icon" href={`${publicUrl}/favicon.ico`} />
            {query.addstyles ? <link rel="stylesheet" href={`${publicUrl}/editingcss.css`} /> : ''}
          </Head>

          {/* root placeholder for the app, which we add components to using route data */}
          <div className={mainClassPageEditing}>
            <header>
              <div id="header" className="">
                {route && <Placeholder name="headless-header" rendering={route} />}
              </div>
            </header>
            <main>
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
                minHeight="70vh"
                gap={4}
                mb={8}
                w="full"
              >
                <Box id="content" w="100%" width="full" maxW="1500px" pr="20" pl="20">
                  {route && <Placeholder name="headless-main" rendering={route} />}
                </Box>
              </Flex>
            </main>
            <footer>
              <div id="footer">
                {route && <Placeholder name="headless-footer" rendering={route} />}
              </div>
            </footer>
          </div>
        </Chakra>
      </OcProvider>
    </>
  );
};

export default Layout;
