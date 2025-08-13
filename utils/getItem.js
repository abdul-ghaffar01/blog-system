import Box from "@/components/ui/blog/Box";
import Code from "@/components/ui/blog/Code";
import Heading from "@/components/ui/blog/Heading";
import ImageBlock from "@/components/ui/blog/ImageBlock";
import LinkBlock from "@/components/ui/blog/LinkBlock";
import List from "@/components/ui/blog/List";
import Paragraph from "@/components/ui/blog/Paragraph";
import Quote from "@/components/ui/blog/Quote";
import Table from "@/components/ui/blog/Table";

export default function getItem(item, index) {
    switch (item.type) {
        case "heading":
            return <Heading item={item} />;
        case "paragraph":
            return <Paragraph item={item} />;
        case "image":
            return <ImageBlock item={item} />;
        case "code":
            return <Code item={item} />;
        case "quote":
            return <Quote item={item} />;
        case "list":
            return <List item={item} />;
        case "link":
            return <LinkBlock item={item} />;
        case "box":
            return <Box item={item} />;
        case "table":
            return <Table item={item} />
        default:
            return null;
    }
}
