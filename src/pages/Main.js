import React, { useState } from "react";
import { Input, Icon, Row, Col, Button, Modal, Typography, Form } from "antd";
import isEmpty from "lodash/isEmpty";

const KS_SERVER = "main--serveraddr";
const { Title } = Typography;

// example data
const moc_balances = {
    height: 104419,
    balance: 100000,
    assets: {}
};

const moc_status = {
    isInitialized: true,
    isUnlocked: true
};

const moc_addresses = ["3WwbzW6u8hKWBcL1W7kNVMr25s2UHfSBnYtwSHvrRQt7DdPuoXrt"];

function Auth(props) {
    const [show, setShow] = React.useState(false);
    const { apiKey, setApiKey } = props;
    let api_key = apiKey || "";
    const onOk = () => {
        setApiKey(api_key);
        setShow(false);
    };
    return (
        <>
            <Button
                type={apiKey ? "dashed" : "danger"}
                onClick={() => setShow(true)}
            >
                Auth
            </Button>
            <Modal
                title="Enter Api Key"
                visible={show}
                onOk={onOk}
                onCancel={() => setShow(false)}
            >
                <Input
                    placeholder="Enter api_key"
                    defaultValue={apiKey}
                    onChange={({ target: { value } }) => (api_key = value)}
                    allowClear
                />
            </Modal>
        </>
    );
}

function RowInfo(props) {
    const { title, setData = () => {}, children, moc_data } = props;
    const [loading, setLoading] = useState(false);
    return (
        <Row>
            <Col span={2}>{title ? title : ""}</Col>
            <Col span={1}>
                <Button
                    type="link"
                    icon="reload"
                    loading={loading}
                    onClick={() => {
                        // TODO loading data
                        setLoading(true);
                        setTimeout(() => {
                            setData(moc_data);
                            setLoading(false);
                        }, 500);
                    }}
                />
            </Col>
            <Col span={8}>{children}</Col>
        </Row>
    );
}

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

const WrappedPaymentForm = Form.create({ name: "payment_form" })(PaymentForm);

export default function Main(props) {
    const [serverAddr, setServerAddr] = useState(
        localStorage.getItem(KS_SERVER) || ""
    );
    const [apiKey, setApiKey] = useState("");
    const [balances, setBalances] = useState({});
    const [status, setStatus] = useState({});
    const [addresses, setAddresses] = useState([]);

    return (
        <>
            <Row gutter={8}>
                <Col span={8}>
                    <Input
                        placeholder="Wallet node"
                        addonAfter={<Icon type="cloud-server" />}
                        value={serverAddr}
                        onChange={async ({ target: { value } }) => {
                            setServerAddr(value);
                            localStorage.setItem(KS_SERVER, value);
                        }}
                    />
                </Col>
                {/* {Authenication} */}
                <Col span={4}>
                    <Auth apiKey={apiKey} setApiKey={setApiKey} />
                </Col>
            </Row>
            <Title level={3}>Wallet</Title>
            <RowInfo
                title="Addresses"
                data={addresses}
                setData={setAddresses}
                moc_data={moc_addresses}
            >
                {!isEmpty(addresses)
                    ? addresses.map(a => <div key={a.toString()}>{a}</div>)
                    : "no data"}
            </RowInfo>
            <RowInfo
                title="Status"
                data={status}
                setData={setStatus}
                moc_data={moc_status}
            >
                {!isEmpty(status) ? (
                    <>
                        <Col span={8}>
                            <strong>is initialized</strong>:{" "}
                            {status.isInitialized.toString()}
                        </Col>
                        <Col span={8}>
                            <strong>is unlocked</strong>:{" "}
                            {status.isUnlocked.toString()}
                        </Col>
                    </>
                ) : (
                    "no data"
                )}
            </RowInfo>
            <RowInfo
                title="Balances"
                data={balances}
                setData={setBalances}
                moc_data={moc_balances}
            >
                {!isEmpty(balances) ? (
                    <>
                        <Col span={8}>
                            <strong>height</strong>: {balances.height}{" "}
                        </Col>
                        <Col span={8}>
                            <strong>balance</strong>: {balances.balance}
                        </Col>
                    </>
                ) : (
                    "no data"
                )}
            </RowInfo>
            <Title level={3}>Actions</Title>
            {/* // TODO show lock/unlock according status */}
            <Row>
                <Button>Lock/Unlock</Button>
            </Row>
            <Title level={3}>Payment</Title>
            <Row>
                <Col span={8}>
                    <WrappedPaymentForm />
                </Col>
            </Row>
        </>
    );
}
