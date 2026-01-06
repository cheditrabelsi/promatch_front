import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { IModels, IStores } from "@/interfaces";
import AuthService from "@/services/auth.service";

const initialState = {
  termsConditionsModalOpen: false,
  setTermsConditionsModalOpen: () => {},

  isLogging: false,
  loginError: "",
  login: () => {},
  clearLoginError: () => {},

  registerSuccessMessage: "",
  registerErrorMessage: "",
  register: () => {},
  clearRegisterMessages: () => {},
};

const useAuthStore = create<IStores.IAuthStore>((set) => ({
  ...initialState,

  // This functions will be used to open and close the terms and conditions modal
  setTermsConditionsModalOpen: (value) => {
    set({ termsConditionsModalOpen: value });
  },

  // This function is used to call the login endpoint
   login: async (payload: IModels.ILoginPayload, _options?: any) => {
    set({ isLogging: true });
    try {
      const authService = new AuthService();
      const response = await authService.login(payload);
      set({ isLogging: false });
      return response; // ✅ response est maintenant du type ILoginResponse
    } catch (error: any) {
      console.error(error);
      set({ isLogging: false });
      set({ loginError: error.response?.data?.message });
      throw error;
    }
  },


register: async (payload: IModels.IRegisterPayload, _options?: any) => {
  set({ registerSuccessMessage: "" });
  set({ registerErrorMessage: "" });
  try {
    const authService = new AuthService();
    const response = await authService.register(payload);
    console.log('Reponse inscription;',response)
    //set({ registerSuccessMessage: response.data.message });
  } catch (error: any) {
    console.error(error);
    if (error.response) {
      set({ registerErrorMessage: error.response.data.message });
    }
    throw error;
  }
},


  // This function is used to clear the login error message
  clearLoginError: () => {
    set({ loginError: "" });
  },

  // This function is used to clear the register success and error messages
  clearRegisterMessages: () => {
    set({ registerSuccessMessage: "" });
    set({ registerErrorMessage: "" });
  },
}));

export default useAuthStore;

if (import.meta.env.VITE_USER_NODE_ENV === "development") {
  mountStoreDevtool("AuthStore", useAuthStore);
}