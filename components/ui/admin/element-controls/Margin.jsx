import { applyClass, spacingOptions } from '@/utils/admin/tailwindUnits'
import React from 'react'

const Margin = () => {
    return (
        <div className="gap-2 mb-3">
            <p className="text-sm text-muted mb-1 w-16">Margin</p>
            <div>
                {["t", "r", "b", "l"].map((side) => (
                    <div key={`m-${side}`} className="flex items-center">
                        <label className="text-xs text-muted block capitalize w-16">
                            {side === "t" ? "Top" : side === "r" ? "Right" : side === "b" ? "Bottom" : "Left"}
                        </label>
                        <select
                            className="w-full bg-background rounded px-1.5 py-1 text-sm text-foreground border border-border"
                            onChange={(e) =>
                                applyClass(e.target.value ? `m${side}-${e.target.value}` : "", `m${side}-`)
                            }
                        >
                            <option value="">-</option>
                            {spacingOptions.map((val) => (
                                <option key={val} value={val}>
                                    {val}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Margin