import React, { Component } from 'react'

export function AddExtraProps(Component, extraProps) {
    return <Component.type {...Component.props} {...extraProps} />;
}

export const ImagePaths = {
    mountain: 'mountain.jpg',
    desert: 'desert.jpg',
    forest: 'forest.jpg',
    'All-Seeing Tree': 'allseeingtree.jpg',
    'Grandmother K.': 'grandmotherk.jpg',
    'Blind Moon': 'blindmoon.jpg',
    'Fern of the Forest': 'fernoftheforest.jpg',
    'Lily of the Valley': 'lilyofthevalley.jpg',
    // 'Seventh Moon': 'pray.jpg',
    'Faradays Cloud': 'faradayscloud.jpg',
    'Pale-skinned Man': 'paleskinnedman.jpg',
    // 'Gabriel': 'pray.jpg',
    // 'Astrid': 'pray.jpg',
    human: 'walk.jpg',
    bird: 'bird.jpg'
    // horse: 'pray.jpg'
}