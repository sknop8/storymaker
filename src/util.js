import React, { Component } from 'react'

export function AddExtraProps(Component, extraProps) {
    return <Component.type {...Component.props} {...extraProps} />;
}

// export default { AddExtraProps }