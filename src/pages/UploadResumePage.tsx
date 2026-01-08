import {
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useSearchParams } from "react-router-dom";
import Alert from "@/components/core-ui/Alert";
import PortalLayout from "@/components/layouts/portal/PortalLayout";
import ResumeService from "@/services/resume.service";
import { jobService } from "@/services/job.service";

type UploadStatus = "idle" | "uploading" | "success" | "error";

const UploadResumePage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [message, setMessage] = useState<string>("");
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get("jobId");

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
      const parsedJobId = jobId ? parseInt(jobId, 10) : undefined;

      if (parsedJobId) {
        await jobService.applyToJob(parsedJobId);
        setStatus("success");
        setMessage(
          data?.message ||
            `CV uploaded successfully. Application submitted for job #${parsedJobId}.`
        );
        return;
      }

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
      const contextPrefix = jobId
        ? "Upload or application failed. "
        : "";
      setMessage(`${contextPrefix}${apiMessage}`);
    }
  };

  return (
    <PortalLayout title="Upload CV">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#309689]">
              Upload resume
            </p>
            <h1 className="text-2xl font-bold text-gray-900">Submit your CV</h1>
            <p className="text-sm text-gray-600">
              We store the file, extract the text, and refresh your candidate profile.
            </p>
            {jobId && (
              <div className="rounded-lg bg-[#309689]/10 p-3 text-sm text-gray-800">
                <p className="font-medium text-[#226d60]">Job reference: {jobId}</p>
                <p>Once uploaded, we immediately submit your application for this job.</p>
              </div>
            )}
            {message && (
              <Alert type={status === "success" ? "success" : "error"} message={message} />
            )}
          </div>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-800" htmlFor="resume">
                CV file
              </label>
              <label
                htmlFor="resume"
                className="flex cursor-pointer flex-col gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center hover:border-[#309689] hover:bg-white"
              >
                <span className="text-base font-semibold text-gray-800">
                  {selectedFile ? "Change file" : "Click to upload or drag and drop"}
                </span>
                <span className="text-xs text-gray-500">{helperText}</span>
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
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-800">Steps</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600">
                <li>Select a PDF, DOC, or DOCX (max 5MB).</li>
                <li>We save the file securely and extract the text.</li>
                <li>If a job is selected, we submit your application automatically.</li>
              </ul>
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-lg bg-[#309689] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#268174] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#309689] disabled:cursor-not-allowed disabled:bg-[#309689]/50"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload CV"}
            </button>
          </form>
        </div>
      </div>
    </PortalLayout>
  );
};

export default UploadResumePage;
