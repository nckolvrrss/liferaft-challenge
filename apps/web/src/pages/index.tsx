import { useEffect, useState } from "react";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

export default function Web() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [country, setCountry] = useState("");
  const [response, setResponse] = useState<{ message: string } | null>(null);
  const [error, setError] = useState<string | undefined>();

  interface FormDataType {
    name: string;
    email: string;
    phoneNumber: string;
    address: {
      houseNumber: string;
      streetName: string;
      city: string;
      stateProvince: string;
      country: string;
    };
  }
  const responseBody: FormDataType = {
    name: "",
    email: "",
    phoneNumber: "",
    address: {
      houseNumber: "",
      streetName: "",
      city: "",
      stateProvince: "",
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
    responseBody.address.stateProvince = stateProvince;
    responseBody.address.country = country;
    console.log(JSON.stringify(responseBody));

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

  return (
    <div>
      <h1>LifeRaft Challenge</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <input
            id="name"
            onChange={(e) => inputChangeHandler(setName, e)}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
        </div>
        <div>
          <input
            id="email"
            onChange={(e) => inputChangeHandler(setEmail, e)}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="phone_number">Phone Number</label>
        </div>
        <div>
          <input
            id="phone_number"
            onChange={(e) => inputChangeHandler(setPhoneNumber, e)}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="house_number">House Number</label>
        </div>
        <div>
          <input
            id="house_number"
            onChange={(e) => inputChangeHandler(setHouseNumber, e)}
            type="int"
          />
        </div>
        <div>
          <label htmlFor="street_name">Street Name</label>
        </div>
        <div>
          <input
            id="street_name"
            onChange={(e) => inputChangeHandler(setStreetName, e)}
            type="string"
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
        </div>
        <div>
          <input
            id="city"
            onChange={(e) => inputChangeHandler(setCity, e)}
            type="string"
          />
        </div>
        <div>
          <label htmlFor="state_province">State / Province</label>
        </div>
        <div>
          <input
            id="state_province"
            onChange={(e) => inputChangeHandler(setStateProvince, e)}
            type="string"
          />
        </div>
        <div>
          <label htmlFor="city">Country</label>
        </div>
        <div>
          <input
            id="country"
            onChange={(e) => inputChangeHandler(setCountry, e)}
            type="string"
          />
        </div>
        <input type="submit" />
      </form>
      {error && (
        <div>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}
      {response && (
        <div>
          <h3>Greeting</h3>
          <p>{response.message}</p>
        </div>
      )}
    </div>
  );
}
