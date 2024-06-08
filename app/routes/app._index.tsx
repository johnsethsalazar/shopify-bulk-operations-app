import { Link } from "@remix-run/react";
import { Box, Button, Card, Layout, Page, Text } from "@shopify/polaris";
import React from "react";
import { CustomCalledOut } from "~/components/CustomCalledOut";
import { Placeholder } from "~/components/Placeholder";
import { DropZoneExample } from "~/components/customDropZone";

type Props = {};

const Index = (props: Props) => {
  return (
    <Page>
      <ui-title-bar title="Bulky operation"></ui-title-bar>
      <Layout>
        <Layout.Section>
          <Card>
            <Text as="h4" variant="headingMd">
              Heading
            </Text>
            <br/>
            <Text as="h6">
              You will be able to select the particular data 
            </Text>
            <Link to="/app/exportform">
              <Button variant="primary">New Export</Button>
            </Link>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <Text as="h4" variant="headingMd">
              Import
            </Text>
            <DropZoneExample />
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <Box background="bg-fill-info" borderRadius="100">
              <Placeholder label="You have 0 scheduled jobs" />
            </Box>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <CustomCalledOut title={""} illustration={""} primaryAction={""} primaryActionUrl={""} children={undefined} />
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Index;
