import updateData from "./UpdateData.js"
export default async function  initGitInfo(){
    const dataAcess = {
        url:"https://api.github.com/repos/",
        owner:'WillTbn',
        repo:'portifolio_Pessoal',
        token:"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"
    }
    const configHeader = {
        headers:{
            Authorization:`Bearer ${dataAcess.token}`,
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        }
    }

    // const imageBlob = fetch('https://jorgenunes.vercel.app/assets/img/Jorge_Nunes-dev.jpeg').then(response => response.blob());
    try{
        const getData = await fetch(`${dataAcess.url}${dataAcess.owner}/${dataAcess.repo}/commits`, configHeader)
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