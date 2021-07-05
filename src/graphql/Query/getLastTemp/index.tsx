import gql from "graphql-tag";
export default gql`
  query {
    dados(sortBy:CRIACAO_DESC,query:{tipo:TEMP}, limit:15) {
        dado
        tipo
    }
 } 
`;
