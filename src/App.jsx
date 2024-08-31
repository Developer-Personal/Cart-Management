import { useEffect, useState } from "react";
import dataJson from "./data";
import Rating from "./Rating";
import ShoppingCart from "./ShoppingCart";



function App() {

  const [selectedCategory, setSelectedCategory] = useState("0")
  const [showProduct, setShowProduct] = useState([])
  const [sortValue, setSortValue] = useState("0")
  const [cart, setCart] = useState([])

  useEffect(() => {
    const updatedProduct = dataJson.map((item => {
      return {...item, qty : 1}
    }))

    setShowProduct(updatedProduct)
  },[])

  const categories = [... new Set(dataJson.map(item => item.category))]

  const handleChange = (e) => {
    const updatedProduct = [...dataJson]
    setSelectedCategory(e.target.value)
    updatedProductsFunction(updatedProduct, e.target.value, sortValue)
  }

  const handleSort = (e) => {
    setSortValue(e.target.value)
    updatedProductsFunction(showProduct, selectedCategory, e.target.value)
  }

  const updatedProductsFunction = (prod, cat, sort) => {

    let filterUpdatedProduct = prod
    if (cat !== "0") {
      filterUpdatedProduct = prod.filter(item => item.category == cat)
    }


    if (sort == "asc") {
      filterUpdatedProduct = filterUpdatedProduct.sort((a, b) => a.price - b.price)
    }
    else if (sort == "desc") {
      filterUpdatedProduct = filterUpdatedProduct.sort((a, b) => b.price - a.price)
    }

    setShowProduct(filterUpdatedProduct)

  }

  const handleGoToCart = () => {

  }

  const handleAddCart = (product) => {
    const updatedCart = [...cart]
    updatedCart.push({id:product.id, quantity:product.qty})
    setCart(updatedCart)

  }
  const handleQtyChange = (id,operation) => {
    const updatedCart = [...cart]
    const updatedProduct = [...showProduct]
    const index = updatedProduct.findIndex(item => item.id == id)
    const idx = updatedCart.findIndex(item => item.id == id )
   console.log("idsx   -  ", idx);
   
    

    if (operation === "minus"){
      updatedProduct[index].qty -= 1
      if(idx != -1){
        updatedCart[idx].quantity -= 1
      }
      else{
        updatedCart.push({id:id, quantity:1})
      }
      
    }
    else if(operation === "plus"){
      updatedProduct[index].qty += 1
      if(idx != -1){
        updatedCart[idx].quantity += 1
      }
      else{
        updatedCart.push({id:id, quantity:2})
      }
      
    }

    setShowProduct(updatedProduct)
    setCart(updatedCart)
  }

  return (
    <div style={{ padding: "10px" }}>
      <ShoppingCart cart={cart}/>


      <h1 align="center">PRODUCTS</h1>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "0 20px" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", margin: "20px 0" }}>
          <label style={{ fontSize: "24px" }}>Filter:</label>
          <select name="" id="" value={selectedCategory} onChange={handleChange} style={{ padding: "5px 8px", border: "1px solid black" }}>
            <option value="0" disabled>--Select category--</option>
            {
              categories.map(cat => (
                <option value={cat}>{cat}</option>
              ))
            }

          </select>
        </div>
        <div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", margin: "20px 0" }}>
            <label style={{ fontSize: "24px" }}>Sort:</label>
            <select name="" id="" value={sortValue} onChange={handleSort} style={{ padding: "5px 8px", border: "1px solid black" }}>
              <option value="0" disabled>--Select category--</option>
              <option value="asc" >Price Low-High</option>
              <option value="desc" >Price High-Low</option>


            </select>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "space-evenly", marginTop: "40px", }}>
        {
          showProduct.map(item => (
            <div key={item.id} style={{ id: "box", width: "20%", minHeight: "430px", boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.5 )", borderRadius: "10px", position: "relative" }}>
              <div style={{ position: "absolute", top: "0", left: "0", background: "aqua", borderRadius: "25px", padding: "3px" }}>

                <Rating rating={item.rating.rate} />


              </div>


              <img src={item.image} alt="" style={{ width: "100%", height: "200px" }} />
              <div style={{ padding: "5px", textAlign: "center" }}>
                <h3>{item.title}</h3> <br />
                {
                  item.description.length > 50 ? <p title={item.description}>{item.description.slice(0, 50)}...</p> : <p>{item.description}</p>
                }
                <h2 style={{ margin: "5px 0 5px 0" }}>${item.price}</h2>
                <div style={{display:"flex",alignItems:"center", justifyContent:"center"}}>
                  <button disabled={item.qty == 1} style={{boxShadow:"0 4px 2px 0  rgba(0, 0, 0, 0.3)", padding:"5px 10px", borderRadius:"50%", border:"none"}} onClick={() => handleQtyChange(item.id,"minus")}>-</button>&nbsp;&nbsp;
                  <span >{item.qty}</span>&nbsp;&nbsp;
                  <button style={{boxShadow:"0 4px 2px 0  rgba(0, 0, 0, 0.3)", padding:"5px 10px", borderRadius:"50%", border:"none"}} onClick={() => handleQtyChange(item.id,"plus")}>+</button>
                </div>
                {cart.find(obj => obj.id == item.id) ? <button style={{ color: "white", background: "blue", width: "100%", padding: "8px", position: "absolute", bottom: "5px", left: "0" }}>Go To Cart</button> : <button style={{ color: "white", background: "black", width: "100%", padding: "8px", position: "absolute", bottom: "5px", left: "0" }} onClick={() => handleAddCart(item)}>Add Cart</button>}
              </div>



            </div>

          ))
        }
      </div>
    </div>
  )
}

export default App
