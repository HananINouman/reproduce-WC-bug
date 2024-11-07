import { acceptTermsandConditions } from "@/api";
import { signTypedData } from "@wagmi/core";

export const EIP712_DOMAIN_NAME = "Obol";
export const EIP712_DOMAIN_VERSION = "1";

export const TermsAndConditionsSigningTypes = {
    EIP712Domain: [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
    ],
    TermsAndConditions: [
      { name: "terms_and_conditions_hash", type: "string" },
      { name: "version", type: "uint256" },
    ],
  };

 const getTermsAndConditionsMessage = (
    payload: Partial<any>,
    addressAccount: any,
  ): any => ({
    types: TermsAndConditionsSigningTypes,
    primaryType: "TermsAndConditions",
    domain: {
      name: EIP712_DOMAIN_NAME,
      version: EIP712_DOMAIN_VERSION,
    },
    message: payload,
    account: addressAccount,
  })



const signLatestTermsAndConditions = async (
    addressAccount: any,
    termsAndConditionsHash: string,
    config: any
): Promise<any> => {
    try{
        const payload = {
            terms_and_conditions_hash: termsAndConditionsHash,
            version: 1,
        };
        const data = getTermsAndConditionsMessage(payload, addressAccount);

        const result = await signTypedData(config, data);

        return result;
    } catch(e){
        console.log(e,"eeeeee")
        throw e
    }

};


export const postTermsAndConditionsAcceptance = async (
    addressAccount: any,
    config: any
): Promise<boolean> => {
    try{
        const termsAndConditionsHash = "anything";

        const termsAndConditionsSignature = await signLatestTermsAndConditions(
            addressAccount,
            termsAndConditionsHash,
            config
        );
        const termsAndConditionsPayload = {
            address: addressAccount,
            version: 1,
            terms_and_conditions_hash: termsAndConditionsHash,
        };
        await acceptTermsandConditions({
            token: termsAndConditionsSignature,
            data: termsAndConditionsPayload,
        });
    
        return true;
    }catch(e){
        console.log(e,"acceptTermsandConditions eeeeeeeeee")
        throw e
    }

};