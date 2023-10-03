"use client";
import React from "react";
import { useQuery, gql } from "@apollo/client";
import {
  FaAngleDown,
  FaAngleUp,
  FaInstagram,
  FaTiktok,
  FaGlobe,
} from "react-icons/fa";
import Search from "../components/search";
import Verif from "../components/verif";
import Image from "next/image";
import logo from "../../public/logo.png";
import { Load } from "@/components/skeleton";

const GET_CATEGORIES = gql`
  query GetCategories {
    Categories {
      id
      title
      Links {
        id
        name
        url
      }
    }
  }
`;
type CategoryType = {
  id: number;
  title: string;
  Links: {
    id: number;
    name: string;
    url: string;
  }[];
};

export default function Aitools() {
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const [expandedCategories, setExpandedCategories] = React.useState<number[]>(
    []
  );
  const [searchTerm, setSearchTerm] = React.useState("");

  const toggleCategory = (categoryId: number) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories((prev) => prev.filter((id) => id !== categoryId)); // collapse the category if it's already expanded
    } else {
      setExpandedCategories((prev) => [...prev, categoryId]); // otherwise, expand it
    }
  };

  const filteredCategories =
    data?.Categories?.filter((category: any) =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  if (loading) return <Load />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex justify-center backdrop-filter backdrop-blur-sm min-h-screen p-8 transition duration-500 ease-in">
      <div className="space-y-4 mx-auto px-4 sm:w-full md:w-4/5 lg:w-[846px]">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={logo}
            alt="Logo BFTX"
            // className="w-64 h-64"
            width={118}
            height={118}
          />
          <p className="text-xl mt-6">Artificial Intelligence Links</p>
          <div className="flex items-center">
            <p className="text-small p-2 text-center text-[#535667]">
              by bftx creative
            </p>
            <span className="">
              <Verif />
            </span>
          </div>
          <div className="flex space-x-4 my-11">
            <span>
              <FaGlobe size={26} />
            </span>
            <span>
              <FaInstagram size={28} />
            </span>
            <span>
              <FaTiktok size={26} />
            </span>
          </div>
        </div>
        <div className="mb-5 bg-gray-800 bg-opacity-40 rounded-[18px] relative">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-2xl p-2 w-full h-[50px] rounded-[18px] focus:ring-0 focus:outline-none placeholder-[#535667] text-center bg-[rgba(38,42,52,0.40)] pl-5 pr-[40px]"
          />
          <span className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <Search />
          </span>
        </div>
        {filteredCategories?.map((category: CategoryType) => (
          <div
            key={category.id}
            className={`p-2 my-2 rounded-[18px] transition-colors duration-600 cursor-pointer ${
              expandedCategories.includes(category.id)
                ? "custom-opacity backdrop-filter backdrop-blur-sm"
                : "bg-[#262A34]"
            }`}
          >
            <div
              className={`flex h-[60px] transition-colors rounded-[18px] duration-600 justify-between items-center p-2 ${
                expandedCategories.includes(category.id)
                  ? "bg-blue-600"
                  : "bg-[#262A34]"
              }`}
              onClick={() => toggleCategory(category.id)}
            >
              <h2 className="font-[700] text-center flex-grow text-2xl">
                {category.title}
              </h2>
              <span>
                {expandedCategories.includes(category.id) ? (
                  <FaAngleUp size={32} />
                ) : (
                  <FaAngleDown size={32} />
                )}
              </span>
            </div>

            {expandedCategories.includes(category.id) && (
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4 mt-4">
                {category.Links.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center justify-center text-center text-base rounded-[18px] bg-white bg-opacity-10 p-5 hover:bg-opacity-30 transition h-[80px] font-[400]"
                    onClick={() => window.open(link.url, "_blank")}
                  >
                    {link.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="overlap z-[-100]">
        <img
          className="star1"
          alt="star1"
          src="https://cdn.animaapp.com/projects/651ac368b8a887555f52c216/releases/651ac3a60e441fe4c98b0a49/img/star-1.svg"
        />
        <img
          className="star2"
          alt="Star"
          src="https://cdn.animaapp.com/projects/651ac368b8a887555f52c216/releases/651ac3a60e441fe4c98b0a49/img/star-2.png"
        />
      </div>
    </div>
    // <div className="flex justify-center mt-10">
    //   <div className="w-7/12">
    //     {data?.Categories?.map((category: CategoryType) => (
    //       <Dropdown
    //         key={category.id}
    //         title={category.title}
    //         Links={category.Links}
    //       />
    //     ))}
    //   </div>
    // </div>
  );
}
