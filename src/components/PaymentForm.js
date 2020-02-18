import React from 'react';
import {
    Input,
    Icon,
    Button,
    Form,
} from "antd";

function PaymentForm(props) {
    const { form } = props;
    const { getFieldDecorator } = form;

    const checkAmount = (rule, value, callback) => {
        if (value && value < 100000)
            callback("Minimal ERG value not met. Value must more then 100 000");
        else callback();
    };

    const handleSubmit = e => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
            }
        });
    };

    // const walletError = isFieldTouched("wallet") && getFieldError("wallet");
    // const amountError = isFieldTouched("amount") && getFieldError("amount");
    return (
        <Form onSubmit={handleSubmit}>
            <p style={{color: 'red'}}>Now work (in development)</p>
            <Form.Item>
                {getFieldDecorator("wallet", {
                    rules: [
                        {
                            required: true,
                            message: "Please input wallet address!"
                        }
                    ]
                })(
                    <Input
                        prefix={<Icon type="wallet" />}
                        placeholder="Wallet address"
                    />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator("amount", {
                    rules: [
                        { required: true, message: "Please input amount" },
                        { validator: checkAmount }
                        // TODO add digit only validator
                    ]
                })(
                    <Input
                        prefix={<Icon type="pay-circle" />}
                        placeholder="Amount"
                    />
                )}
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit">Send</Button>
            </Form.Item>
        </Form>
    );
}

export default Form.create({ name: "payment_form" })(PaymentForm);
