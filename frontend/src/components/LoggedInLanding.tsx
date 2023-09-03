import { useState, useEffect } from "react"
import { User } from '../models/user'
import { Item } from "../models/item"
import * as BiddingApi from "../network/bidding_app_api"
import styles from "../styles/utils.module.css"
import ItemList from "./ItemList"

const LoggedInLanding = () => {

    const [user, setUser] = useState<User | null>(null)
    const [showAddItemModal, setShowAddItemModal] = useState(true)
    const [itemList, setItemList] = useState<Item[]>()
    const [itemToBid, setItemToBid] = useState(null as null | Item)

    useEffect(() => {
        async function fetchLoggedInUser() {
            try {
              const user = await BiddingApi.getLoggedInUser()
              setUser(user)
            } catch (error) {
                console.error(error)
            }
          }
          fetchLoggedInUser()
    }, []);

    useEffect(() => {
      async function fetchItems() {
          try {
            const items = await BiddingApi.fetchItems()
            setItemList(items)
            console.log(items)
          } catch (error) {
              console.error(error)
          }
        }
        fetchItems()
  }, []);

  useEffect(() => {
    async function updateItem() {
      console.log(itemToBid)
        try {
          const items = await BiddingApi.updateItem(itemToBid._id)
          console.log(items)
        } catch (error) {
            console.error(error)
        }
      }
      updateItem()
}, [itemToBid]);

  const bidItemData = (data: Item)=>{
    setItemToBid(data)
  }


    return (
       <>
        <section className=".section-content">
          <input type="button" value="Ongoing"/>
          <input type="button" value="Completed"/>
          <ItemList list={itemList} onBid={bidItemData}/>
        </section>
       </>
        
        
       
    )
}

export default LoggedInLanding