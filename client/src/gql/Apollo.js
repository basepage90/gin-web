import ApolloClient from "apollo-boost";
import { BaseURL, ServerPort } from 'constants/AddressConstant'

const client = new ApolloClient({
    uri: BaseURL + ServerPort + "/gql",
    credentials: 'include', // cors 상황에서도 cookie(특히 httponly cookie)를 사용하기 위한 옵션이다.
    // cache: new InMemoryCache({
    //     typePolicies: {
    //       Query: {
    //         fields: {
    //           articlesList: relayStylePagination(),
    //         },
    //       },
    //     },
    //   }),
});

export default client;