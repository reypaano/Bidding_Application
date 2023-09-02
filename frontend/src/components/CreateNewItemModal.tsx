import { useForm } from "react-hook-form"
import { Item } from "../models/item"
import { ItemInput } from "../network/bidding_app_api"
import * as BiddingApi from "../network/bidding_app_api"
import { Button, Form, Modal } from "react-bootstrap"
import TextInputField from "./forms/TextInputField"

interface CreateNewItemModalProps {
    itemToEdit?: Item
    onDismiss: () => void,
    onItemSaved: (item: Item) => void
}

const CreateNewItemModal = ({itemToEdit, onDismiss, onItemSaved}: CreateNewItemModalProps) => {

    const {register, handleSubmit, formState:{errors, isSubmitting}} = useForm<ItemInput> ({
        defaultValues: {
            itemName: itemToEdit?.itemName || "",
            currentPrice: itemToEdit?.currentPrcie || 0,
            duration: itemToEdit?.duration || "",
            status: itemToEdit?.status || "ongoing"
        }
    })
    async function onSubmit(input:ItemInput) {
        try { 
            let itemResponse: Item

            if(itemToEdit)
                itemResponse = await BiddingApi.createItem( input)
            else 
                itemResponse = await BiddingApi.createItem(input)

                onItemSaved(itemResponse)
        } catch (error) {
            alert(error)
            console.error(error)
        }
    }
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {itemToEdit? "Edit Item" : "Add Item"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditItemForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name ="itemName"
                        label ="Item Name"
                        type = "text"
                        placeholder = 'Item Name'
                        register = {register} 
                        registerOptions = {{required: "Required"}}
                        error = {errors.itemName}
                    />
                    <TextInputField
                        name ="currentPrice"
                        label ="Current Price"
                        type = "number"
                        placeholder = 'Current Price'
                        register = {register} 
                        registerOptions = {{required: "Required"}}
                        error = {errors.currentPrice}
                    />
                    <TextInputField
                        name ="duration"
                        label ="Duration"
                        type = "text"
                        placeholder = 'Duration'
                        register = {register} 
                        registerOptions = {{required: "Required"}}
                        error = {errors.duration}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="submit"
                    form="addEditItemForm"
                    disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateNewItemModal