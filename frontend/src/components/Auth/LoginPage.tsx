import { useForm } from "react-hook-form";
import { User } from "../../models/user";
import { LoginCredentials } from "../../network/bidding_app_api";
import * as BiddingApi from "../../network/bidding_app_api"
import { Form, Modal, Button } from "react-bootstrap";
import TextInputField from "../forms/TextInputField";
import styleUtils from "../../styles/utils.module.css"



interface LoginPageProps {
    onDismiss: () => void,
    onLoginSuccessful: (user: User) => void
}

const LoginPage = ( { onDismiss, onLoginSuccessful}: LoginPageProps) => {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginCredentials>()

    async function onSubmit(credentials:LoginCredentials) {
        try {
            const user = await BiddingApi.login(credentials)
            onLoginSuccessful(user)
        } catch (error) {
            alert(error)
            console.error(error)
        }
    }

    return(
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Login
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
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
                        Login
                    </Button>
                </Form>
            </Modal.Body>

        </Modal>
    )
}

export default LoginPage