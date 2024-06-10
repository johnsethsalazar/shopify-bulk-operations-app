import { LoaderFunction, json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { Banner, Card, Layout, Page, ProgressBar } from "@shopify/polaris";
import { useEffect, useState } from "react";
import { authenticate } from "~/shopify.server";

type bulkOperation = {
  id: String;
  url: String;
  status: String;
  completedAt: String;
  startedAt: String;
  format: String;
};

export const loader: LoaderFunction = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
    `#graphql
    query {
  currentBulkOperation {
    id
    status
    errorCode
    createdAt
    completedAt
    objectCount
    fileSize
    url
    partialDataUrl
  }
}
    `,
  );

  if (response.ok) {
    console.log("------status export result --------");
    const data = await response.json();
    console.log(data, "Responseeeeeeee");

    return json(await data.data.currentBulkOperation);
  }

  return null;
};

const ExportResult = () => {
  const data: bulkOperation = useLoaderData<typeof loader>();

  const [pollingData, setPollingData] = useState(data);
  const [shouldPoll, setShouldPoll] = useState(true);

  useEffect(() => setPollingData(data), [data]);

  const fetcher = useFetcher();

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible" && shouldPoll) {
        fetcher.load("/app/exportresult");
      }
    }, 10 * 1000);

    return () => clearInterval(interval);
  }, [shouldPoll, fetcher.load]);

  useEffect(() => {
    if (fetcher.data) {
      setPollingData(fetcher.data as bulkOperation);
      const { status } = fetcher.data as bulkOperation;

      if (status === "COMPLETED") {
        setShouldPoll(false);
        console.log("------polling stopped------");
      }
    }
  }, [fetcher.data]);

  const downloadData = () => {
    console.log("download");
  };

  console.log(data, "data");
  return (
    <Page>
      <ui-title-bar title="New Export">
        <button variant="breadcrumb">Bulky</button>
        <button onClick={() => {}}>Back</button>
        <button variant="primary">Download Exported File</button>
      </ui-title-bar>
      {pollingData.status === "RUNNING" && (
        <Layout>
          <Layout.Section>
            <Banner title="Export in progress">
              <ProgressBar progress={75} />
            </Banner>
            <br />
            <Card>
              <p>In progress</p>
              <p>ID: {pollingData.id}</p>
              <p>STATUS: {pollingData.status}</p>
            </Card>
          </Layout.Section>
        </Layout>
      )}
      {pollingData.status === "COMPLETED" && (
        <Layout>
          <Layout.Section>
            <Banner
              title="Export Finished"
              tone="success"
              action={{ content: "Download", onAction: downloadData }}
            >
              <br />
              <Card>
                <p>ID: {pollingData.id}</p>
                <p>STATUS: {pollingData.status}</p>
                <p>URL: {pollingData.url}</p>
              </Card>
            </Banner>
          </Layout.Section>
        </Layout>
      )}
    </Page>
  );
};

export default ExportResult;
