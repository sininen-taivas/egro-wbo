import React, { useState } from "react";
import { Button, Modal, Input } from "antd";

/**
 * Button with prompt window
 * @param {Object} props
 */
export default function(props) {
    const [show, setShow] = useState(false);
    const {
        value,
        buttonTitle = "Set value",
        buttonType = "default",
        buttonTypeOk = "dashed",
        modalTitle = "Enter new value",
        onOk = () => {},
        onCancel = () => {}
    } = props;
    let value_ = value || "";

    return (
        <>
            <Button
                type={value ? buttonTypeOk : buttonType}
                onClick={() => setShow(true)}
            >
                {buttonTitle}
            </Button>
            <Modal
                title={modalTitle}
                visible={show}
                onOk={() => {
                    onOk(value_);
                    setShow(false);
                }}
                onCancel={() => {
                    onCancel();
                    setShow(false);
                }}
            >
                <Input
                    placeholder="Enter value"
                    defaultValue={value}
                    onChange={({ target: { value } }) => (value_ = value)}
                    allowClear
                />
            </Modal>
        </>
    );
}
