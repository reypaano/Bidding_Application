import { User } from "../../models/user"
import {useForm} from "react-hook-form"
import { SignupCredentials } from "../../network/bidding_app_api"
import * as BiddingApi from "../../network/bidding_app_api"
import { Modal, Form, Button } from "react-bootstrap"
import TextInputField from "../forms/TextInputField"
import styleUtils from "../../styles/utils.module.css"

interface SignUpPageProps {
    onDismiss: () => void,
    onSignUpSuccessful: (usr:User)=> void
}

const SignUpPage = ({onDismiss, onSignUpSuccessful}: SignUpPageProps) => {

    const {register, handleSubmit, formState: { errors, isSubmitting}} = useForm<SignupCredentials>()
    async function onSubmit(credentials:SignupCredentials) {
        try {
            const newUser = await BiddingApi.signUp(credentials)
            onSignUpSuccessful(newUser)

        } catch (error) {
            alert(error)
            console.error(error)
        }
    }
    return (
       <Modal show onHide = {onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    SignUp
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit = {handleSubmit(onSubmit)}>
                    <TextInputField
                        name="username"
                        label = "Username"
                        type = "text"
                        placeholder = "Username"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.username}

                     />
                     <TextInputField
                        name="email"
                        label = "Email"
                        type = "email"
                        placeholder = "Email"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.email}

                     />
                     <TextInputField
                        name="password"
                        label = "Password"
                        type = "password"
                        placeholder = "Password"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.password}

                     />
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={styleUtils.width100}
                    >
                        Sign Up
                    </Button>
                </Form>
            </Modal.Body>
       </Modal>
    )
}

export default SignUpPage