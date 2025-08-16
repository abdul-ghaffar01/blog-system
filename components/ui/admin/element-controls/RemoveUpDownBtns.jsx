import React from 'react'
import Button from '../../Button'
import { ArrowDown, ArrowUp } from 'lucide-react'
import updatePanels from '@/utils/admin/updatePanels';

const RemoveUpDownBtns = ({ el }) => {

    const removeThisItem = () => {
        if (!el) return;
        el.elem.remove();
        updatePanels()
    };

    const moveUp = () => {
        if (!el || !el.elem.previousElementSibling) return;
        const parent = el.elem.parentNode;
        parent.insertBefore(el.elem, el.elem.previousElementSibling);
        updatePanels()
    };

    const moveDown = () => {
        if (!el || !el.elem.nextElementSibling) return;
        const parent = el.elem.parentNode;
        parent.insertBefore(el.elem.nextElementSibling, el.elem);
        updatePanels()
    };
    return (<div className="flex gap-2 w-full">
        <Button variant="danger" onClick={removeThisItem} className="flex-1 text-sm">
            Remove
        </Button>
        <Button variant="secondary" onClick={moveUp} className="flex-none text-sm">
            <ArrowUp size={16} className="text-foreground" />
        </Button>
        <Button variant="secondary" onClick={moveDown} className="flex-none text-sm">
            <ArrowDown size={16} className="text-foreground" />
        </Button>
    </div>
    )
}

export default RemoveUpDownBtns