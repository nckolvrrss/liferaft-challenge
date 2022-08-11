import { useEffect, useState } from "react";
import { Button } from "ui";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

export default function Web() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [response, setResponse] = useState<{ message: string } | null>(null);
  const [error, setError] = useState<string | undefined>();

  interface FormDataType {
    firstName: string;
    lastName: string;
    age: string;
  }
  const responseBody: FormDataType = {
    firstName: "",
    lastName: "",
    age: "0",
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    responseBody.firstName = firstName;
    responseBody.lastName = lastName;
    responseBody.age = age;
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
      setResponse(response);
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
          <label htmlFor="first_name">First Name</label>
        </div>
        <div>
          <input
            id="first_name"
            onChange={(e) => inputChangeHandler(setFirstName, e)}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
        </div>
        <div>
          <input
            id="last_name"
            onChange={(e) => inputChangeHandler(setLastName, e)}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="age">Age</label>
        </div>
        <div>
          <input
            id="age"
            onChange={(e) => inputChangeHandler(setAge, e)}
            type="number"
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
