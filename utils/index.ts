import { signTypedData } from "@wagmi/core";

export const EIP712_DOMAIN_NAME = "Obol";
export const EIP712_DOMAIN_VERSION = "1";

export const SigningTypes = {
    EIP712Domain: [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
    ],
    Anything: [
      { name: "hash", type: "string" },
    ],
  };

 const getMessage = (
    payload: Partial<any>,
    addressAccount: any,
  ): any => ({
    types: SigningTypes,
    primaryType: "Anything",
    domain: {
      name: EIP712_DOMAIN_NAME,
      version: EIP712_DOMAIN_VERSION,
    },
    message: payload,
    account: addressAccount,
  })



const signHash = async (
    addressAccount: any,
    hash: string,
    config: any
): Promise<any> => {
    try{
        const payload = {
            hash: hash
        };
        const data = getMessage(payload, addressAccount);

        const result = await signTypedData(config, data);

        return result;
    } catch(e){
        console.log(e,"eeeeee")
        throw e
    }

};


export const signCall = async (
    addressAccount: any,
    config: any
): Promise<boolean> => {
    try{
        const hash = "anything";

        const signature = await signHash(
            addressAccount,
            hash,
            config
        );
    
        return signature;
    }catch(e){
        console.log(e," eeeeeeeeee")
        throw e
    }

};