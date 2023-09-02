import { useState, useEffect } from "react"
import CreateNewItemModal from "./CreateNewItemModal"
import DepositModal from "./DepositModal"
import {Item as ItemModel} from "../models/item"
import { User } from '../models/user';
import * as BiddingApi from "../network/bidding_app_api"

const LoggedInLanding = () => {

    const [user, setUser] = useState<User | null>(null)
    const [items, setItems] = useState<ItemModel[]>([])
    const [showAddItemModal, setShowAddItemModal] = useState(true)
    const [notesLoading, setNotesLoading] = useState(true);
    const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

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

    return (
       <>
       {
         showAddItemModal && 
            // <CreateNewItemModal
            //     onDismiss={() => setShowAddItemModal(false)}
            //     onItemSaved = {(newItem) => {
            //         setItems([...items, newItem])
            //         setShowAddItemModal(false)
            //     }}
            // />
            <DepositModal
                userToEdit={user}
                onDismiss={() => setShowAddItemModal(false)}
                // onUserSaved = {() => {
                   
                    
                // }}
            />
       }
       </>
        
        
       
    )
}

export default LoggedInLanding