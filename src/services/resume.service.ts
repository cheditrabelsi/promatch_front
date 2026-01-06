import { API } from "@/core/http.service";
import StorageService from "@/core/storage.service";

class ResumeService {
  public async uploadResume(file: File) {
    const token = StorageService.getItem("access_token");

    const formData = new FormData();
    formData.append("resume", file);

    return API.put("users/upload-resume/", formData, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  }
}

export default ResumeService;
