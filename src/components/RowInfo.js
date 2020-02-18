import React, {useState} from 'react';
import {Row, Col, Button} from 'antd';

export default function (props) {
    const {
        title,
        children,
        prom // promise, ex. API.get()
    } = props;
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
                        setLoading(true);
                        if (!prom) return;
                        prom().then(() => {
                            setLoading(false);
                        });
                    }}
                />
            </Col>
            <Col span={8}>{children}</Col>
        </Row>
    );
}
