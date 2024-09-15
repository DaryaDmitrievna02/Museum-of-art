import { Layout } from "../../components/Layout";
import { NotFoundMessage } from "../../components/notFoundMessage";

export const ErrorPage = () => {
  return (
    <Layout>
      <NotFoundMessage></NotFoundMessage>
    </Layout>
  );
};
