import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.css'
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    xType?: string
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        xType,
        className,
        disabled,
        ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {

    const finalClassName = s.button + ' '
        + (disabled ? s.disabled
                : xType === 'red' ? s.red
            : xType === 'secondary' ? s.secondary
                        : s.default
        )       + (className ? ' ' + className : '') // задачка на смешивание классов

    return (
        <button
            disabled={disabled}
            className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
}


import { useState } from "react"
import { createRoot } from "react-dom/client"
export const colors = ["red", "yellow", "green", "blue", "violet", "chartreuse"]
const styles = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "black",
}
const Colorize = () => {
    const [color, setColor] = useState<string>("black")
    const getColor = (colors: string[]) => {
        const nextColor = colors[Math.floor(Math.random() * colors.length)]
        return nextColor
    }
    return (
        <main>
            <div style={{ ...styles, backgroundColor: color }} />
            <div>
                <button onClick={() => setColor(getColor(colors))}>Get random color</button>
            </div>
        </main>
    )
}
createRoot(document.getElementById("root")!).render(<Colorize />)


export default SuperButton
