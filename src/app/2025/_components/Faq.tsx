import { FaAngleDown } from "react-icons/fa6";
import { useState } from "react";
import { motion } from "framer-motion";
import faqs from "@/app/2025/_data/faqs";
import Social from "./Social";

const FaqRow = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="border-b border-gray-300 py-2">
      <button
        className="flex w-full items-center justify-between p-2 text-left text-lg font-medium text-white"
        onClick={onClick}
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaAngleDown />
        </motion.span>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="p-2">{answer}</p>
      </motion.div>
    </div>
  );
};

const FaqList = ({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {faqs.map((faq, index) => (
        <FaqRow
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
};

const Faq = () => {
  return (
    <div className="container" id="faq">
      <div className="flex flex-col justify-center gap-8 lg:flex-row">
        <div className="w-full shrink-0 lg:w-[25%]">
          <h2>FAQ.</h2>
          <p>
            Everything you need to know about participating in the 2025
            SUMOBOTS.
          </p>
          <p className="text-lg">
            <b>OR</b>
          </p>
          <p>Think we missed something?</p>
          <p>Reach out at...</p>
          <div className="mt-4 flex flex-col gap-2">
            <Social
              socialName="discord"
              size={24}
              variant="pill"
              className="w-fit lg:w-full"
            />
            <Social
              socialName="email"
              size={24}
              variant="pill"
              className="w-fit lg:w-full"
            />
          </div>
        </div>
        <div className="mt-5 lg:mt-10">
          <FaqList faqs={faqs} />
        </div>
      </div>
    </div>
  );
};

export default Faq;
