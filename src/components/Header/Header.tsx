import { HeaderContainer } from "./style";
import logoTimer from '../../assets/timer_1.png'
import { NavLink } from "react-router-dom";
import { ScrollIcon, TimerIcon } from "@phosphor-icons/react";

export function Header() {
    return (
        <HeaderContainer>
            <img src={logoTimer} width={40} alt="" />
            <nav>
                <NavLink to="/" title="Timer">
                    <TimerIcon size={24} />
                </NavLink>
                <NavLink to="/history" title="History">
                    <ScrollIcon size={24} />
                </NavLink>
            </nav>
        </HeaderContainer>

    )
}