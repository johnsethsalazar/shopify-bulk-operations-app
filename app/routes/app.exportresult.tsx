import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page } from "@shopify/polaris";
import { productsQuery } from "~/graphql/productsQuery";
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
  const response = await admin.graphql(`
    #graphQl
      mutation {
          bulkOperationRunQuery(
      query: """
       ${productsQuery}
   """
      ) {
      bulkOperation {
        id
        status
        query
        rootObjectCount
        type
        partialDataUrl
        objectCount
        fileSize
        createdAt
        url
      }
      userErrors {
        field
        message
      }
    }
  } 
  `);
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

  console.log(data, "data");
  return <Page>ExportResult</Page>;
};

export default ExportResult;
