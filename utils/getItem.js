import Bold from "@/components/ui/blog/Bold";
import Box from "@/components/ui/blog/Box";
import Code from "@/components/ui/blog/Code";
import Heading from "@/components/ui/blog/Heading";
import ImageBlock from "@/components/ui/blog/ImageBlock";
import Italic from "@/components/ui/blog/Italic";
import LinkBlock from "@/components/ui/blog/LinkBlock";
import List from "@/components/ui/blog/List";
import Paragraph from "@/components/ui/blog/Paragraph";
import Quote from "@/components/ui/blog/Quote";
import Table from "@/components/ui/blog/Table";
import Underline from "@/components/ui/blog/Underline";

export default function getItem(item, index) {
    
    switch (item.type) {
        case "heading":
            return <Heading key={item.id} item={item} />;
        case "paragraph":
            return <Paragraph key={item.id} item={item} />;
        case "bold":
            return <Bold key={item.id} item={item} />;
        case "italic":
            return <Italic key={item.id} item={item} />;
        case "underline":
            return <Underline key={item.id} item={item} />;
        case "image":
            return <ImageBlock key={item.id} item={item} />;
        case "code":
            return <Code key={item.id} item={item} />;
        case "quote":
            return <Quote key={item.id} item={item} />;
        case "list":
            return <List key={item.id} item={item} />;
        case "link":
            return <LinkBlock key={item.id} item={item} />;
        case "box":
            return <Box key={item.id} item={item} />;
        case "table":
            return <Table key={item.id} item={item} />
        default:
            return null;
    }
}
