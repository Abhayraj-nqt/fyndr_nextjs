"use client";

import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Tabs } from "@/components/ui/tabs";

type Category = {
  id: number;
  name: string;
};

type FaqItem = {
  question: string;
  answer: string;
};
type Props = {
  userType: "business" | "individual";
};

const Faq = ({ userType }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [faqQA, setFaqQA] = useState<Record<number, FaqItem[]>>({});
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  //   const [activeIndex, setActiveIndex] = useState<number | null>(null);
  //   const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      // Simulated category fetch
      const fakeCategories = [
        { id: 1, name: "About Fyndr" },
        { id: 2, name: "Registration" },
        { id: 3, name: "Campaigns" },
        { id: 4, name: "Using Fyndr" },
      ];
      setCategories(fakeCategories);
      setSelectedCategoryId(fakeCategories[0].id);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchFaqQA = async () => {
      if (selectedCategoryId == null) return;

      // Simulated QA fetch
      const data: FaqItem[] = [
        {
          question: "How do I register?",
          answer: "You can register by clicking on the sign-up button.",
        },
        {
          question: "Is Fyndr free to use?",
          answer: "Yes, it is absolutely free for individuals.",
        },
      ];
      setFaqQA((prev) => ({ ...prev, [selectedCategoryId]: data }));
      setActiveIndex(null);
    };

    fetchFaqQA();
  }, [selectedCategoryId]);
  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle accordion panel
  };

  //   const filteredFaqs =
  //     selectedCategoryId && faqQA[selectedCategoryId]
  //       ? faqQA[selectedCategoryId].filter((item) =>
  //           item.question.toLowerCase().includes(search.toLowerCase())
  //         )
  //       : [];

  return (
    <div className="w-4/5 rounded-[10px] border border-[#e6e6e6] bg-white px-10 pb-24 shadow-md">
      <div className="flex flex-col items-center justify-center py-6 text-[24px] font-semibold text-black">
        <h3>Frequently Asked Questions By {userType} (FAQs)</h3>
        <span className="mt-4 text-[16px] font-normal">
          Have question? We’re here to help you.
        </span>
        <div className="relative mt-4 w-3/6">
          {/* Icon on the left */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Image
              src={"/images/aboutus/home-search-icon.svg"}
              alt="search"
              className="size-4"
              loading="lazy"
              width={10}
              height={10}
            />
          </div>

          {/* Input field */}
          <Input
            placeholder="Type your question here..."
            className="h-[42px] w-full rounded-[10px] border border-[#D3D6E1] bg-[#F4F8FD] pl-10"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Tabs
           
            className="flex w-full  border-b border-[#e6e6e6] "
          >
            <TabsList>
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id.toString()}
                  defaultValue={selectedCategoryId?.toString()}
                  className="relative mx-10 mt-8 border-b-2 border-transparent pb-2 text-[1vw]
          font-normal text-[#7a8086]
          data-[state=active]:border-primary-500 
          data-[state=active]:text-primary-500"
                >
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="mt-10 flex w-full flex-col items-center justify-center">
            {selectedCategoryId &&
              faqQA[selectedCategoryId]?.map((item, index) => (
                <div key={index} className="mb-4 w-full max-sm:mb-4">
                  <div
                    className={`size-full border border-[#e6e6e6] text-left text-[17px] leading-[30px] text-[#333333] shadow-md`}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      padding: "12px",
                      borderRadius:
                        activeIndex === index ? "10px 10px 0px 0px" : "10px",
                      background:
                        activeIndex === index ? "#EAF2FC" : "transparent",
                    }}
                    onClick={() => toggleAccordion(index)}
                  >
                    <h2 className="text-left text-[17px] font-normal leading-[30px] text-[#333] max-sm:text-[12px] max-sm:font-medium max-sm:leading-[14.06px]">
                      {item?.question}
                    </h2>
                    <Image
                      src="/images/aboutus/Accordian.png"
                      alt="accordion"
                      width={24}
                      height={24}
                      style={{
                        transform:
                          activeIndex === index
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.5s",
                      }}
                    />
                  </div>
                  {activeIndex === index && (
                    <div
                      className="border border-t-0 border-[#e6e6e6] bg-white p-3 text-left text-[15px] font-light leading-[30px] text-[#333] shadow-md max-sm:text-[12px] max-sm:font-medium max-sm:leading-[17px]"
                      style={{
                        borderRadius: "0px 0px 10px 10px",
                        background: "#EAF2FC",
                      }}
                    >
                 
                      <p className="text-[14px] text-[#333]">{item?.answer}</p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
