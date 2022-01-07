import AuthenticationService from './AuthenticationService';
import httpClientFactory from './httpClientFactory';
import configService from '../config/configService';
import DependentService from './DependentService';
import ClientService from './ClientService';

export const httpClient = httpClientFactory(configService);
export const authService = new AuthenticationService(httpClient);
export const dependentService = new DependentService(authService);
export const clientService = new ClientService(httpClient)