import { applyClass, colorOptions } from '@/utils/admin/tailwindUnits';

const Color = () => {

    return (

        <div>
            {/* Text color */}
            <p className="text-muted text-sm mb-1">Text Color</p>
            <div className="flex items-center gap-2 mb-3">
                <select
                    onChange={(e) => applyClass(`text-${e.target.value}`, `text-${e.target.value}`)}
                    className="flex-1 bg-background rounded px-2 py-1 text-foreground text-sm focus:outline-none"
                >
                    <option value="">Select color</option>
                    {colorOptions.map(({ name, var: variable }) => {
                        return (
                            <option key={`text-${name}`} value={variable}>
                                {name}
                            </option>
                        );
                    })}
                </select>

            </div>

        </div>
    )
}

export default Color