export function showinventory(data, showInventory) {
  const data2 = data.filter((item)=>{
    if(showInventory===true){
      return item.inStock.includes(true)
    }return item
  })
  return data2
}

export function fastdelivery(data, fastDelivery) {
  console.log(fastDelivery,"yeh hai frmo ")
  const data2 = data.filter((item)=>{
    if(fastDelivery===true){
      return item.fastDelivery.includes(true)
    }return item
  })
  console.log(data2,"yeh hai frmo ")
  return data2
}

