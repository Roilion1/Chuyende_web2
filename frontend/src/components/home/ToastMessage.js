import React, { useState } from 'react'
import Toast from 'react-bootstrap/Toast'
import { connect } from 'react-redux'

function ToastMessage(props) {

    return (
        <React.Fragment>
            <div
                style={{
                    position: 'fixed',
                    top: 10,
                    right: 10,
                    zIndex: 99,
                }}
            >
                <Toast onClose={() => props.hideToast()}
                    show={props.showToast != null ? props.showToast : false} delay={3000}
                    autohide
                >
                    <Toast.Body>{props.toastMessage}</Toast.Body>
                </Toast>
            </div>
        </React.Fragment>
    )
}


export default ToastMessage;
