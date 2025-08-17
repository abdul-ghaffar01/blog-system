import { applyClass, radiusOptions } from '@/utils/admin/tailwindUnits'
import React from 'react'

const BorderRadius = () => {
    return (
        <div className="mb-3">
            <p className="text-sm text-muted mb-1">Border Radius</p>
            <div>
                {[
                    { side: "tl", label: "Top-left" },
                    { side: "tr", label: "Top-right" },
                    { side: "br", label: "Bottom-right" },
                    { side: "bl", label: "Bottom-left" },
                ].map(({ side, label }) => (
                    <div key={side} className="flex items-center">
                        <p className="text-xs text-muted mb-0.5 w-20">{label}</p>
                        <select
                            className="w-full bg-background rounded px-1.5 py-1 text-sm text-foreground border border-border"
                            onChange={(e) =>
                                applyClass(
                                    e.target.value ? `rounded-${side}-${e.target.value}` : "",
                                    `rounded-${side}-`
                                )
                            }
                        >
                            <option value="">-</option>
                            {radiusOptions.map((val) => (
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

export default BorderRadius