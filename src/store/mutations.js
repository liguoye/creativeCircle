 const update = (state, payload) => {
     let goods=state.goods
     let name=payload.name;
     let value =payload.value
     goods[name]=value
  }
  
 const init = (state, payload) => {
     let goods=state.goods
     goods=value
  }
  

  const setgoods=(state, payload)=>{
    state.goodsInfo=payload
  }
  const settask=(state, payload)=>{
    state.taskTotle=payload
  }
  const setdate=(state, payload)=>{
    state.date=payload
  }

  export default{
    update,
    setgoods,
    settask,
    setdate,
    init
  }