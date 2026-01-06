import { API } from '@/core/http.service';
import { IModels } from '@/interfaces';

export default class AuthService {

  public async login(
    payload: IModels.ILoginPayload
  ): Promise<IModels.ILoginResponse> {

    const response = await API.post('users/login/', payload);
    return response.data;
  }

  public async register(payload: IModels.IRegisterPayload) {
    const response = await API.post('users/register/', payload);
    return response.data;
  }

  public async getCurrentUser() {
    return API.get('users/me/');
  }

  public async logout() {
    return API.post('users/logout/');
  }
}
