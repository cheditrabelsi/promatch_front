// src/services/auth.service.ts
import { API } from '@/core/http.service';
import { IModels } from '@/interfaces';

export default class AuthService {
  // Login user
   public async login(payload: IModels.ILoginPayload): Promise<IModels.ILoginResponse> {
    const response = await API.post('/login/', payload);
    return response.data; // ✅ On retourne seulement les données utiles
  }


  // Register user
  public async register(payload: IModels.IRegisterPayload): Promise<any> {
    const response = await API.post('/register/', payload);
    return response.data;
  }

  // Get current user
  public async getCurrentUser() {
    return API.get('/me/');
  }

  // Logout user
  public async logout() {
    return API.post('/logout/');
  }
}
