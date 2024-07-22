export default function updateData(Obj){
    const sle = document.querySelector('[data-update="gitUpdate"]');
    // const description = document.querySelector('[data-update="gitUpdateDescription"]');
    sle.className = 'text-white'
    // description.className ='text-muted'
    const getDataInfo = new Date(Obj.commit.author.date)

    let month = getDataInfo.getMonth() < 10 ? '0'+getDataInfo.getMonth() : getDataInfo.getMonth()


    const formtBR = `${getDataInfo.getDate()}/${month}/${getDataInfo.getFullYear()}`
    sle.innerHTML = `Última atualização - ${formtBR} - <span class="text-muted"> informação github via API</span>`
    // description.innerHTML = 'Dado puxado via API do GitHub'


}