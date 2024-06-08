import { ActionFunction } from "@remix-run/node";
import {
  Button,
  Card,
  Layout,
  Page,
  Popover,
  Text,
} from "@shopify/polaris";
import { useCallback, useState } from "react";

type Props = {};

export const action: ActionFunction = async ({ request }) => {
  return null;
};

const ExportForm = (props: Props) => {
  const [activate, setActivate] = useState(false);
  const toggleActive = useCallback(
    () => setActivate((activate) => !activate),
    [],
  );
  const activator = (
    <Button onClick={toggleActive} disclosure>
      Select sheets
    </Button>
  );
  return (
    <Page>
      <ui-title-bar title="New Export">
        <button variant="breadcrumb">Home</button>
        <button onClick={() => {}}>Back</button>
        <button variant="primary" onClick={() => {}}>
          Export
        </button>
      </ui-title-bar>
      <Layout>
        <Layout.Section>
          <Card>
            <Text as="p" fontWeight="bold">
              Format: CSV
            </Text>
          </Card>
          <br />
          <Card>
            <div style={{ position: "relative" }}>
              <Popover
                activator={activator}
                onClose={toggleActive}
                fullWidth
                autofocusTarget="first-node"
                active={activate}
              />
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default ExportForm;
