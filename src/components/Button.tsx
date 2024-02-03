
interface ButtonProps {
    children: string
    display_text?: string
}

function Button({children, display_text}:ButtonProps) {
    return <button className="btn btn-secondary">{children}</button>
}

export default Button