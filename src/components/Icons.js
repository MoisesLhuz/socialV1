import React from 'react';
import { FaFire } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { FaGear } from "react-icons/fa6"
import { FaHeart } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

export const Icons = {
    FaFire,
    FaComments,
    FaGear,
    FaHeart,
    FaEye,

}

const Icon = ({ type, name, color, size = 24, style }) => {
    const fontSize = 24;
    const Tag = type;
    return (
        <>
            {type && name && (
                <Tag name={name} size={size || fontSize} color={color} style={style} />
            )}
        </>
    )
}

export default Icons