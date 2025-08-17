import { applyClass, spacingOptions } from '@/utils/admin/tailwindUnits'
import React from 'react'

const Padding = () => {
    return (
        <div className="mb-3">
            <p className="text-sm text-muted mb-1 w-16">Padding</p>
            <div>
                {["t", "r", "b", "l"].map((side) => (
                    <div key={`p-${side}`} className="flex items-center">
                        <label className="text-xs text-muted block capitalize w-16">
                            {side === "t" ? "Top" : side === "r" ? "Right" : side === "b" ? "Bottom" : "Left"}
                        </label>
                        <select
                            className="w-full bg-background rounded px-1.5 py-1 text-sm text-foreground border border-border"
                            onChange={(e) =>
                                applyClass(e.target.value ? `p${side}-${e.target.value}` : "", `p${side}-`)
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

export default Padding