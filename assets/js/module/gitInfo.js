import updateData from "./UpdateData.js"
import enviroment from "./enviroment.js"
export default async function  initGitInfo(){
   
    
    const configHeader = {
        headers:{
            Authorization:`Bearer ${enviroment.GIT_TOKEN}`,
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        }
    }

    // const imageBlob = fetch('https://jorgenunes.vercel.app/assets/img/Jorge_Nunes-dev.jpeg').then(response => response.blob());
    try{
        const getData = await fetch(`${enviroment.GIT_URL}${enviroment.GIT_OWNER}/${enviroment.GIT_REPO}/commits`, configHeader)
        // .then((response) => {
        //     console.log(response)
        //     return data
        // })
        // .catch((e) => console.log(e))
        if(getData.ok){
            const data = await getData.json()
            // console.log(data[0])
            updateData(data[0])
            return data
        }else{
            console.error('Error ao buscar commits:', getData.statusText)
            return null
        }  
      
    
    }catch(error){
        console.log("Error initGitInfo:", error)
        return null;
    }
}