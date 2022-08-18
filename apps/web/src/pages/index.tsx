import Head from "next/head";
import React, { useEffect, useState } from "react";
import { FormDataType } from "../interfaces";

import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

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
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [response, setResponse] = useState<{ message: string } | null>(null);

  const responseBody: FormDataType = {
    name: "",
    email: "",
    phoneNumber: "",
    address: {
      houseNumber: "",
      streetName: "",
      city: "",
      region: "",
      country: "",
    },
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    responseBody.name = name;
    responseBody.email = email;
    responseBody.phoneNumber = phoneNumber;
    responseBody.address.houseNumber = houseNumber;
    responseBody.address.streetName = streetName;
    responseBody.address.city = city;
    responseBody.address.region = region;
    responseBody.address.country = country;

    try {
      const result = await fetch(`${API_HOST}/message`, {
        method: "POST",
        body: JSON.stringify(responseBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await result.json();
      if (response.message) {
        setResponse(response);
      }
      if (response.errors) {
        setError(JSON.stringify(response.errors.errors));
        setSuccess(JSON.stringify(response.success));
      }
    } catch (err) {
      console.error(err);
      setError("Unable to fetch response");
    }
  };

  const inputChangeHandler = (
    setFunction: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFunction(event.target.value);
  };

  const selectChangeHandler = (
    setFunction: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFunction(event.target.value);
  };
  //TODO: figure out how to set state / onChange for country and region given not input fields
  //   selectCountry (val) {
  //   setState({ country: val });
  // }

  // selectRegion (val) {
  //   setState({ region: val });
  // }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>LifeRaft Challenge - Nicholas Ross</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
      </Head>
      <main className="mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8">
        <div>
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
              {/* <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    onChange={(e) => inputChangeHandler(setCountry, e)}
                    name="country"
                    id="country"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder=""
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  state
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    onChange={(e) => inputChangeHandler(setState, e)}
                    name="state"
                    id="state"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder=""
                  />
                </div>
              </div> */}
              <div>
                <CountryDropdown
                  value={country}
                  onChange={(e) => selectChangeHandler(setCountry, e)}
                />
                <RegionDropdown
                  country={country}
                  value={region}
                  onChange={(val) => selectRegion(val)}
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  city
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
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </form>
          {error && (
            <div>
              <h3>Error</h3>
              <p>{error}</p>
            </div>
          )}
          {response && (
            <div>
              <p>{response.message}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
