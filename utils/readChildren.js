import getItem from "./getItem"

export default function readChildren(children) {
    return children.map((child, index) => {
        if (typeof child === "string") {
            return <span key={index}>{child}</span>
        } else {
            return <span key={child.id || index}>{getItem(child)}</span>
        }
    })
}
