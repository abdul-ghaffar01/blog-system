import { applyClass, colorOptions } from '@/utils/admin/tailwindUnits';
import React from 'react'

const Background = () => {
    return (
        <div>
            {/* Background color */}
            <p className="text-sm text-muted mb-1">Background Color</p>
            <div className="flex items-center gap-2 mb-3">
                <select
                    onChange={(e) => applyClass(`bg-${e.target.value}`, `bg-${e.target.value}`)}
                    className="flex-1 bg-background rounded px-2 py-1 text-foreground text-sm focus:outline-none"
                >
                    <option value="">Select background</option>
                    {colorOptions.map(({ name, var: variable }) => {
                        return (
                            <option key={`bg-${name}`} value={variable}>
                                {name}
                            </option>
                        );
                    })}
                </select>

            </div>
        </div>
    )
}

export default Background