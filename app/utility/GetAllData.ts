
import { MakingReq } from "./MakingReq";

export async function GetAllData(endpoint : string , object : any) {
    const response = await MakingReq(endpoint , object)
    return response
}