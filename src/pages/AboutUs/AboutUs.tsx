import React, { useState } from "react";
import Navbar from "../NavBar/Navbar";
import {
  UserPlusIcon,
  ArrowUpTrayIcon,
  MagnifyingGlassIcon,
  BriefcaseIcon,
  PlayIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const AboutUs: React.FC = () => {


  const faqs = [
    {
      question: "Can I upload a CV?",
      answer: "Yes! You can upload your resume directly using our upload feature…",
    },
    {
      question: "How long will the recruitment process take?",
      answer: "The recruitment process usually takes 2-4 weeks depending on the role.",
    },
    {
      question: "Do you recruit for Graduates, Apprentices and Students?",
      answer: "Yes, we have programs tailored for Graduates, Apprentices, and Students.",
    },
    {
      question: "What does the recruitment and selection process involve?",
      answer: "The process involves application review, interviews, and assessment tests.",
    },
    {
      question: "Can I receive notifications for future jobs?",
      answer: "Absolutely! You can subscribe to our job alerts to stay updated.",
    },
  ];

 const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div>
      {/* HEADER */}
      <div className="bg-black text-white">
        <div className="px-6 lg:px-24 pt-6">
          <Navbar />
        </div>

        <div className="flex justify-center items-center py-20">
          <h1 className="text-5xl font-bold">About Us</h1>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="mt-16 px-6 lg:px-24 text-center">
        <h2 className="text-3xl font-bold">How it works</h2>
        <p className="text-gray-600 mt-2">
          At excepteur sint cupidatat non proident sunt in culpa.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {[
            {
              icon: <UserPlusIcon className="h-10 w-10 text-[#309689]" />,
              title: "Create Account",
              desc: "Nunc gravida lacus at neque hendrerit facilisis.",
            },
            {
              icon: <ArrowUpTrayIcon className="h-10 w-10 text-[#309689]" />,
              title: "Upload Resume",
              desc: "Mauris efficitur nisi sit amet sapien gravida.",
            },
            {
              icon: <MagnifyingGlassIcon className="h-10 w-10 text-[#309689]" />,
              title: "Find Jobs",
              desc: "Curabitur justo tellus, pulvinar et arcu sit amet.",
            },
            {
              icon: <BriefcaseIcon className="h-10 w-10 text-[#309689]" />,
              title: "Apply Job",
              desc: "Suspendisse potenti sit amet eros at sem.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="font-semibold text-lg">{step.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-24 mt-20 mb-20">
      <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
      <p className="text-gray-600 text-center mt-2 mb-10">
        At excepteur sint cupidatat non proident sunt in culpa amet laborum.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`border rounded-xl p-4 transition-all duration-300 ${
              activeIndex === i ? "bg-[#EBF5F4] border-[#309689]" : "border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleFAQ(i)}>
              <div className="flex items-center gap-4">
                <span className={`${activeIndex === i ? "text-[#309689]" : "text-gray-400"} font-bold text-xl`}>
                  {i + 1 < 10 ? `0${i + 1}` : i + 1}
                </span>
                <p className={`${activeIndex === i ? "font-semibold" : "font-medium"} text-gray-700`}>
                  {faq.question}
                </p>
              </div>
              <button className="text-gray-500 text-xl">
                {activeIndex === i ? "-" : "+"}
              </button>
            </div>
            {activeIndex === i && (
              <p className="text-gray-700 mt-2 ml-12">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
    </div>
  );
};

export default AboutUs;
