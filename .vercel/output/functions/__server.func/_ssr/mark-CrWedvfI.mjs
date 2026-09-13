import { i as __toESM } from "../_runtime.mjs";
import { L as require_jsx_runtime, R as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mark-CrWedvfI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var variants = {
	primary: "bg-accent text-accent-fg hover:bg-accent-strong font-medium shadow-[0_0_24px_color-mix(in_oklab,var(--color-accent)_28%,transparent)]",
	ghost: "bg-transparent text-muted hover:text-fg hover:bg-white/5",
	outline: "border border-border bg-transparent text-fg hover:bg-white/5 hover:border-white/20",
	pad: "border border-border bg-surface-2 text-fg hover:bg-white/8 hover:border-white/20 font-medium"
};
var Button = (0, import_react.forwardRef)(function Button({ className, variant = "primary", type = "button", ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		ref,
		type,
		className: cn("inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm", "transition-[transform,background-color,color,border-color,box-shadow] duration-150 ease-out", "active:not-disabled:scale-[0.96] disabled:opacity-40 disabled:pointer-events-none", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60", variants[variant], className),
		...props
	});
});
function DeltaMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: "nd",
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: "#7dd3fc"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: "#eef0f4"
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M12 3.2 21.2 20.2H2.8L12 3.2Z",
				fill: "none",
				stroke: "url(#nd)",
				strokeWidth: "1.4",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M12 8.4 17.2 17.6H6.8L12 8.4Z",
				fill: "none",
				stroke: "#7dd3fc",
				strokeWidth: "1",
				opacity: "0.7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "14.6",
				r: "1.15",
				fill: "#7dd3fc"
			})
		]
	});
}
//#endregion
export { DeltaMark as n, cn as r, Button as t };
