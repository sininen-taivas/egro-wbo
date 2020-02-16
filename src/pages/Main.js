import React, { useState } from "react";
import { Input, Icon, Row, Col, Button, Modal } from "antd";
import isEmpty from "lodash/isEmpty";

const KS_SERVER = "main--serveraddr";
const G_GUTTER = [8, 8];

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

function Balances(props) {
    const { data, setData } = props;
    const [loading, setLoading] = useState(false);
    const balances_exmpl = {
        height: 104419,
        balance: 100000,
        assets: {}
    };
    return (
        <Row gutter={G_GUTTER}>
            <Col span={2}>Balances</Col>
            <Col span={1}>
                <Button
                    type="link"
                    icon="reload"
                    loading={loading}
                    onClick={() => {
                        // TODO loading data
                        setLoading(true);
                        setTimeout(() => {
                            setData(balances_exmpl);
                            setLoading(false);
                        }, 2000);
                    }}
                />
            </Col>
            <Col span={8}>
                {!isEmpty(data) ? (
                    <>
                        <strong>height</strong>: {data.height}
                        <br />
                        <strong>balance</strong>: {data.balance}
                    </>
                ) : (
                    "no data"
                )}
            </Col>
        </Row>
    );
}

export default function Main(props) {
    const [serverAddr, setServerAddr] = useState(
        localStorage.getItem(KS_SERVER) || ""
    );
    const [apiKey, setApiKey] = useState("");
    const [balances, setBalances] = useState({});
    return (
        <>
            <Row gutter={G_GUTTER}>
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
            <Row gutter={G_GUTTER}>
                <Col>
                    <h3>Wallet</h3>
                </Col>
            </Row>
            <Balances {...{ data: balances, setData: setBalances }} />
        </>
    );
}
