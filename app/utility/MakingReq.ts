

export async function MakingReq(endpoint: string, object : any){
    const url = "http://localhost:3000"
    try {
        const response = await fetch(url + endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(object),
          });
        return await response.json()
    } catch (error) {
        return error
    } 
}

