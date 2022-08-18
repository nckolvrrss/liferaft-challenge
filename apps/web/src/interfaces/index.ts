export interface FormDataType {
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
