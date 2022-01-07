import { GuidStringKeyValuePair } from "./../dtos/clientsDTO/clients.dto";
import { AxiosInstance, AxiosResponse } from "axios";
import { APIResponse } from "../dtos/authDTO/authentication-result.dto";

class ClientService {
  constructor(private readonly httpClient: AxiosInstance) {}

  public async clientsToJoin(): Promise<
    AxiosResponse<APIResponse<GuidStringKeyValuePair>>
  > {
    return this.httpClient.get<APIResponse<GuidStringKeyValuePair>>(
      "clients/clients-to-join"
    );
  }
}

export default ClientService;
