import {CalloutCard} from '@shopify/polaris';
import React from 'react';
interface CustomCalledOutProps {
  title: string;
  illustration: string;
  primaryAction: string;
  primaryActionUrl: string;
  children: React.ReactNode;
}

export function CustomCalledOut(prop: CustomCalledOutProps) {
  const {title, illustration, primaryAction, primaryActionUrl, children} = prop; // Destructuring CustomCalledOutProps
  return (
    <CalloutCard
      title={title}
      illustration={illustration}
      primaryAction={{
        content: primaryAction,
        url: primaryActionUrl,
      }}
    >
      <br />
      {children}
    </CalloutCard>
  );
}