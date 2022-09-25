# Address Search - Cep

Return an existing **address** using a given cep code. 

## Usecase

1. The data is retrieved through **GET** request on route **(GET) [url]/address/cep/:cep**.
   - Example: (GET) `http://localhost:3003/address/cep/22220000`

1. Return **Bad Request** if the cep code does not follow the rules bellow
   - Is a number string
   - Has Length(8)

[<<BACK](../README.md)
