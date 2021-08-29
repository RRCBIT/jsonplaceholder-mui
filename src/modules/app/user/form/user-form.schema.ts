import * as yup from "yup";

export const userSchema = yup.object({
  name: yup.string().required("Name cannot be emppty"),
  username: yup.string().required("Username cannot be emppty"),
  email: yup.string().email("Invalid email").required("Email cannot be empty"),
  phone: yup.string().required("Phone cannot be empty"),
  street: yup.string().required("Street cannot be empty"),
  suite: yup.string().required("Suite cannot be empty"),
  city: yup.string().required("City cannot be empty"),
  zipcode: yup.string().required("Zip Code cannot be empty"),
  lng: yup.string().required("Longitude cannot be empty"),
  lat: yup.string().required("Latitude cannot be empty"),
  website: yup.string().required("Website cannot be empty"),
  companyName: yup.string().required("Company name cannot be empty"),
  companyCatchphrase: yup
    .string()
    .required("Company catchphrase cannot be empty"),
  companyBs: yup.string().required("Company BS cannot be empty")
});
