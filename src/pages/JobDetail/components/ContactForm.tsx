import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from "@mui/material/TextField";
import { FiUser } from 'react-icons/fi';

export default function ContactForm() {
  return (
    <div className="max-w-md mx-auto bg-[#EBF5F4] p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send Us Message</h2>

      <form className="space-y-4">
        {/* Full Name */}
       <TextField
  placeholder="Full Name"
  variant="outlined"
  fullWidth
  sx={{ backgroundColor: "white", borderRadius: "0.5rem" }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <FiUser className="text-gray-500" />
      </InputAdornment>
    ),
  }}
/>


        {/* Email Address */}
        <div className="flex items-center bg-white rounded-md px-3 py-2 shadow-sm">
          <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Phone Number */}
        <div className="flex items-center bg-white rounded-md px-3 py-2 shadow-sm">
          <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Message */}
        <div className="flex items-start bg-white rounded-md px-3 py-2 shadow-sm">
          <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-gray-400 mr-3 mt-1" />
          <textarea
            rows={4}
            placeholder="Your Message"
            className="w-full outline-none text-gray-700 placeholder-gray-400 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#309689] text-white py-2 rounded-md font-semibold hover:bg-green-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
