import React, { useState, useEffect } from "react";
import {
    Input,
    Icon,
    Row,
    Col,
    Button,
    Typography,
    Empty,
    message
} from "antd";
import isEmpty from "lodash/isEmpty";
import { KS_SERVER, KS_APIKEY } from "../common/const";
import ButtonPrompt from "../components/ButtonPrompt";
import RowInfo from "../components/RowInfo";
import PaymentForm from '../components/PaymentForm';
import API from "../common/api";

const { Title } = Typography;

export default function Main(props) {
    const [serverAddr, setServerAddr] = useState(
        localStorage.getItem(KS_SERVER) || ""
    );
    const [apiKey, setApiKey] = useState(localStorage.getItem(KS_APIKEY) || "");
    const [balances, setBalances] = useState({});
    const [status, setStatus] = useState({});
    const [addresses, setAddresses] = useState([]);

    const checkStatus = () =>
        API.get("/wallet/status").then(({ data }) => {
            setStatus(data);
            return data;
        });

    // on mount
    useEffect(() => {
        if (!isEmpty(serverAddr) && !isEmpty(apiKey)) checkStatus();
    }, [serverAddr, apiKey]);

    return (
        <>
            <Row gutter={8} style={{ marginBottom: "8px" }}>
                <Col span={8}>
                    <Input
                        placeholder="Wallet node"
                        addonAfter={<Icon type="cloud-server" />}
                        value={serverAddr}
                        onChange={({ target: { value } }) => {
                            setServerAddr(value);
                            if (value) localStorage.setItem(KS_SERVER, value);
                            else delete localStorage[KS_SERVER];
                        }}
                    />
                </Col>
                {/* {Authenication} */}
                <Col span={4}>
                    <ButtonPrompt
                        buttonTitle="Auth"
                        modalTitle="Enter api_key"
                        value={apiKey}
                        onOk={api_key => {
                            setApiKey(api_key);
                        }}
                    />
                </Col>
            </Row>
            {!isEmpty(serverAddr) && !isEmpty(apiKey) ? (
                <>
                    <Title level={3}>
                        Wallet
                        {status.isUnlocked === false && (
                            <ButtonPrompt
                                buttonTitle="Unlock"
                                buttonType="link"
                                onOk={async pass => {
                                    try {
                                        await API.post("/wallet/unlock", {
                                            pass
                                        });
                                        await checkStatus();
                                    } catch ({ response }) {
                                        message.error(
                                            `Unlock error: ${response.data.detail}`
                                        );
                                    }
                                }}
                            />
                        )}
                        {status.isUnlocked === true && (
                            <Button
                                type="link"
                                onClick={async () => {
                                    try {
                                        await API.get("/wallet/lock");
                                        await checkStatus();
                                    } catch ({ response }) {
                                        message.error(
                                            `Lock error: ${response.data.detail}`
                                        );
                                    }
                                }}
                            >
                                Lock
                            </Button>
                        )}
                    </Title>
                    <RowInfo title="Status" prom={checkStatus}>
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
                    {status && status.isUnlocked && (
                        <>
                            <RowInfo
                                title="Addresses"
                                prom={() =>
                                    API.get("/wallet/addresses")
                                        .then(({ data }) => {
                                            setAddresses(data);
                                        })
                                        .catch(({ response }) => {
                                            message.error(response.data.detail);
                                        })
                                }
                            >
                                {!isEmpty(addresses)
                                    ? addresses.map(a => (
                                          <div key={a.toString()}>{a}</div>
                                      ))
                                    : "no data"}
                            </RowInfo>
                            <RowInfo
                                title="Balances"
                                prom={() =>
                                    API.get("/wallet/balances")
                                        .then(({ data }) => {
                                            setBalances(data);
                                        })
                                        .catch(({ response }) => {
                                            message.error(response.data.detail);
                                        })
                                }
                            >
                                {!isEmpty(balances) ? (
                                    <>
                                        <Col span={8}>
                                            <strong>height</strong>:{" "}
                                            {balances.height}{" "}
                                        </Col>
                                        <Col span={8}>
                                            <strong>balance</strong>:{" "}
                                            {balances.balance}
                                        </Col>
                                    </>
                                ) : (
                                    "no data"
                                )}
                            </RowInfo>
                            <Title level={3}>Payment</Title>
                            <Row>
                                <Col span={8}>
                                    <PaymentForm />
                                </Col>
                            </Row>
                        </>
                    )}
                </>
            ) : (
                <Empty description="Enter server data" />
            )}
        </>
    );
}
