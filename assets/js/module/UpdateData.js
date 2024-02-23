export default function updateData(Obj){
    const sle = document.querySelector('[data-update="gitUpdate"]');
    sle.className = 'text-white'
    const getDataInfo = new Date(Obj.commit.author.date)

    let month = getDataInfo.getMonth() < 10 ? '0'+getDataInfo.getMonth() : getDataInfo.getMonth()


    const formtBR = `${getDataInfo.getDate()}/${month}/${getDataInfo.getFullYear()}`
    sle.innerHTML = `Última atualização - ${formtBR}`

}