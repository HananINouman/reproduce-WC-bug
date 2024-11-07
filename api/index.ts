
import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.obol.tech/v1",
    headers: {
      "Content-type": "application/json",
    },
  });

export const acceptTermsandConditions = async (payload: {
    token:string;
    data:any ;
  }) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${payload.token}`,
      },
    };
    return instance.post<any>(
      "/termsAndConditions",
      payload.data,
      config,
    );
  };