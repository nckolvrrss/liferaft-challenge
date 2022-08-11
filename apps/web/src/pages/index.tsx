import { useEffect, useState } from "react";
import { Button } from "ui";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

export default function Web() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [response, setResponse] = useState<{ message: string } | null>(null);
  const [error, setError] = useState<string | undefined>();

  interface FormDataType {
    name: string;
    email: string;
    phoneNumber: string;
  }
  const responseBody: FormDataType = {
    name: "",
    email: "",
    phoneNumber: "",
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    responseBody.name = name;
    responseBody.email = email;
    responseBody.phoneNumber = phoneNumber;
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
        setError(response.errors);
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
