import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { User } from "../models/user";
import * as BiddingApi from "../network/bidding_app_api";
import { SignupCredentials } from "../network/bidding_app_api";
import TextInputField from "./forms/TextInputField";

interface DepositModalProps {
  userToEdit: User | null;
  onDismiss: () => void;
  onUserSaved: (user: User) => void;
}

const DepositModal = ({
  userToEdit,
  onDismiss,
  onUserSaved,
}: DepositModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupCredentials>({
    defaultValues: {
      wallet: userToEdit?.wallet || 0,
    },
  });

  async function onSubmit(input: SignupCredentials) {
    try {
      let userResponse: User;
      let userId: string = userToEdit?._id ?? "";

      if (userToEdit !== undefined) {
        userResponse = await BiddingApi.updateUser(userId, input);
        onUserSaved(userResponse);
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Add Wallet</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="editWalletForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="wallet"
            label="Amoun to add to your Wallet"
            type="number"
            placeholder="Amount"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.wallet}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="editWalletForm" disabled={isSubmitting}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DepositModal;
