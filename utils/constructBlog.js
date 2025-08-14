import React from "react";
import getItem from "./getItem";

export default function constructBlog(items) {
    console.log(items)
    return items.map((item, index) => (
        <React.Fragment key={index}>
            {getItem(item)}
        </React.Fragment>
    ));
}
