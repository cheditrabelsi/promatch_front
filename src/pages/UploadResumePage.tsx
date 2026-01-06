import {
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Alert from "@/components/core-ui/Alert";
import PortalLayout from "@/components/layouts/portal/PortalLayout";
import ResumeService from "@/services/resume.service";

type UploadStatus = "idle" | "uploading" | "success" | "error";

const UploadResumePage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [message, setMessage] = useState<string>("");

  const isUploading = status === "uploading";

  const helperText = useMemo(() => {
    if (selectedFile) {
      return `${selectedFile.name} (${Math.round(selectedFile.size / 1024)} KB)`;
    }
    return "PDF, DOC, or DOCX up to 5MB";
  }, [selectedFile]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setStatus("idle");
    setMessage("");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      setStatus("error");
      setMessage("Please choose a CV file (PDF, DOC, or DOCX) to upload.");
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setStatus("error");
      setMessage("File size must be 5MB or less.");
      return;
    }

    try {
      setStatus("uploading");
      setMessage("");
      const resumeService = new ResumeService();

      const { data } = await resumeService.uploadResume(selectedFile);

      setStatus("success");
      setMessage(
        data?.message ||
          "CV uploaded and parsed successfully. Your skills have been refreshed."
      );
    } catch (error: any) {
      setStatus("error");
      const apiMessage =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        "Upload failed. Please try again.";
      setMessage(apiMessage);
    }
  };

  return (
    <PortalLayout title="Upload CV">
      <div className="w-full">
        <div
          className="relative overflow-hidden rounded-3xl bg-gray-900 text-white shadow-xl"
          style={{
            backgroundImage: "url('assets/images/home/bgHome.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative px-6 py-12 sm:px-10 lg:px-14">
            <div className="max-w-3xl space-y-4">
              <p className="inline-flex items-center rounded-full bg-[#309689]/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6ee7c4]">
                Upload Resume
              </p>
              <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
                Refresh your skills with a <span className="text-[#6ee7c4]">single upload</span>
              </h1>
              <p className="text-base text-gray-200 sm:text-lg">
                Drop in your PDF, DOC, or DOCX. We store the file, extract the text, and update your candidate profile so matching stays sharp.
              </p>
              {message && (
                <div className="max-w-2xl">
                  <Alert
                    type={status === "success" ? "success" : "error"}
                    message={message}
                  />
                </div>
              )}
            </div>

            <form
              className="mt-8 grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-start"
              onSubmit={handleSubmit}
            >
              <label
                htmlFor="resume"
                className="group relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/30 bg-white/5 px-6 py-10 text-center backdrop-blur-sm transition hover:border-[#6ee7c4] hover:bg-white/10"
              >
                <div className="flex items-center justify-center rounded-full bg-[#309689]/20 p-4 text-[#6ee7c4] transition group-hover:bg-[#309689]/30">
                  <svg
                    className="h-10 w-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.243 5.757a3 3 0 10-4.243-4.243L4.1 7.414a1 1 0 00-.263.47l-.804 3.217a1 1 0 001.228 1.228l3.217-.804a1 1 0 00.47-.263l5.899-5.899zM13 7l-1-1-5.586 5.586a2 2 0 01-.94.528l-3.217.804a2 2 0 01-2.457-2.457l.804-3.217a2 2 0 01.528-.94L6.172 1H5a3 3 0 00-3 3v11a2 2 0 002 2h11a3 3 0 003-3v-1.172l-5-5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="mt-4 text-lg font-semibold">
                  {selectedFile ? "Change file" : "Click to upload or drag and drop"}
                </span>
                <span className="mt-2 text-sm text-gray-200">{helperText}</span>
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  className="sr-only"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
              </label>

              <div className="flex h-full flex-col justify-between gap-4 rounded-2xl bg-black/60 p-6 shadow-inner ring-1 ring-white/5">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-white">Upload steps</p>
                  <ul className="space-y-2 text-sm text-gray-200">
                    <li>1. Select a PDF, DOC, or DOCX (max 5MB).</li>
                    <li>2. We save the file securely.</li>
                    <li>3. Text is extracted and skills are refreshed.</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-xl bg-[#309689] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#309689]/30 transition hover:bg-[#268174] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6ee7c4] disabled:cursor-not-allowed disabled:bg-[#309689]/50"
                    disabled={isUploading}
                  >
                    {isUploading ? "Uploading..." : "Upload CV"}
                  </button>
                  <p className="text-xs text-gray-300">
                    Matching runs on your extracted resume text, so keeping this updated helps surface the right roles.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default UploadResumePage;
