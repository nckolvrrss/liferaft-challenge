import Head from "next/head";
import React, { useEffect, useState } from "react";
import { FormDataType } from "../interfaces";
import { ToastContainer, toast } from "react-toastify";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import "react-toastify/dist/ReactToastify.min.css";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

export default function Web() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body: FormDataType = {
      name,
      email,
      phoneNumber,
      address: {
        houseNumber,
        streetName,
        city,
        stateProvince: region,
        country,
      },
    };
    try {
      const result = await fetch(`${API_HOST}/message`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await result.json();

      if (response.success == true) {
        toast.success(response.message);
      }
      if (response.success == false) {
        toast.error(JSON.stringify(response.errors.errors), {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const inputChangeHandler = (
    setFunction: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFunction(event.target.value);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>LifeRaft Challenge - Nicholas Ross</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
      </Head>
      <main className="mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8">
        <div>
          <ToastContainer style={{ width: "500px" }} />
          <h1 className="mx-auto max-w-5xl text-center text-6xl font-extrabold leading-[1.1] tracking-tighter text-white sm:text-7xl lg:text-8xl xl:text-8xl">
            Web <br className="hidden lg:block" />
            <span className="inline-block bg-gradient-to-r from-brandred to-brandblue bg-clip-text text-transparent">
              LifeRaft Code Challenge
            </span>{" "}
          </h1>{" "}
          <form onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  onChange={(e) => inputChangeHandler(setName, e)}
                  name="name"
                  id="name"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder=""
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  onChange={(e) => inputChangeHandler(setEmail, e)}
                  name="email"
                  id="email"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phone_number"
                  onChange={(e) => inputChangeHandler(setPhoneNumber, e)}
                  type="text"
                  name="phone_number"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder=""
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="house_number"
                className="block text-sm font-medium text-gray-700"
              >
                House Number
              </label>
              <div className="mt-1">
                <input
                  id="house_number"
                  onChange={(e) => inputChangeHandler(setHouseNumber, e)}
                  type="text"
                  name="house_number"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder=""
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="steet_name"
                className="block text-sm font-medium text-gray-700"
              >
                Street Name
              </label>
              <div className="mt-1">
                <input
                  id="street_name"
                  onChange={(e) => inputChangeHandler(setStreetName, e)}
                  type="text"
                  name="street_name"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder=""
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <div className="mt-1">
                <CountryDropdown
                  value={country}
                  onChange={(val) => setCountry(val)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="region"
                className="block text-sm font-medium text-gray-700"
              >
                Region
              </label>
              <div className="mt-1">
                <RegionDropdown
                  country={country}
                  value={region}
                  onChange={(val) => setRegion(val)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  onChange={(e) => inputChangeHandler(setCity, e)}
                  name="city"
                  id="city"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder=""
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
