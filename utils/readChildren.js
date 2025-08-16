import getItem from "./getItem"

export default function readChildren(children, returnTag) {
    const Tag = returnTag ? returnTag : "span"
    return children.map((child, index) => {
        if (typeof child === "string") {
            return <Tag key={index}>{child}</Tag>
            // return child;
        } else {
            return <Tag key={child.id}>{getItem(child)}</Tag>
        }
    })
}
