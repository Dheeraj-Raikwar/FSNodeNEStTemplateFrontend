import { NextUIAppProvider } from "@/components/core/NextUIProvider";
import AppLayout from "@/components/layouts/app";
import "@/styles/globals.css";
import { AppContextProvider } from "@/utils/state/app";
import type { AppProps } from "next/app";
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication, Configuration } from '@azure/msal-browser';
import { env } from "process";
import { useEffect } from "react";
import { ProjectProvider } from "@/utils/state/project";
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {

  const CLIENT_ID = process.env.CLIENT_ID
  const TENANT_ID = process.env.TENANT_ID
  const REDIRECT_URI = process.env.REDIRECT_URI

  // MSAL configuration
  const msalConfig = {
    auth: {
      clientId: CLIENT_ID,
      authority: `https://login.microsoftonline.com/${TENANT_ID}`,
      redirectUri: REDIRECT_URI
    },
  };

  const msalInstance = new PublicClientApplication(msalConfig as Configuration);
  return (
    <>
      <Head>
        <title>Website- App</title>
        <link rel="shortcut icon" href="./images/fox-svgrepo-com1.svg" />
      </Head>
      <main>
        <MsalProvider instance={msalInstance}>
          <AppContextProvider>
            <NextUIAppProvider>
              <AppLayout>
                <ProjectProvider>
                  <Component {...pageProps} />
                </ProjectProvider>
              </AppLayout>
            </NextUIAppProvider>
          </AppContextProvider>
        </MsalProvider>
      </main>
    </>
  )
}