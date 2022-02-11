import { useToggle } from "react-use";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Container from "../../../components/Container";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import TextArea from "../../../components/TextArea";

export default function BatchSender() {
    const [isReviewing, toggleReviewing] = useToggle(false);
    return (
        <Container maxWidth="5xl">
            <Card title="ERC20 Batch Sender">
                <Input.Address
                    value=""
                    onUserInput={() => {
                        return;
                    }}
                ></Input.Address>
                <TextArea heading="Enter comma-seperated address list:" />
                <h2>Enter Amount to send per address:</h2>
                <Input.Numeric
                    value={1}
                    onUserInput={() => {
                        return;
                    }}
                ></Input.Numeric>
                <Button color="blue" onClick={toggleReviewing}>
                    Review Transaction
                </Button>
            </Card>

            <Modal
                isOpen={isReviewing}
                onDismiss={() => toggleReviewing(false)}
            ></Modal>
        </Container>
    );
}
