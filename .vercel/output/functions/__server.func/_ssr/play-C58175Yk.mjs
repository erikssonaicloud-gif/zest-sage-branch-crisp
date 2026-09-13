import { i as __toESM } from "../_runtime.mjs";
import { L as require_jsx_runtime, R as require_react, _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as DeltaMark, r as cn, t as Button } from "./mark-CrWedvfI.mjs";
import { n as ArrowLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/play-C58175Yk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Pad({ label, onClick, wide, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "pad",
		onClick,
		className: cn("h-11 min-w-11 px-2 text-xs tracking-wide", wide && "col-span-2", accent && "border-accent/50 bg-accent/10 text-accent hover:bg-accent/20"),
		children: label
	});
}
function ControlPads({ api }) {
	const { move, rotate, softDrop, hardDrop, hold, phaseStep, confirm, snap } = api;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-4 gap-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pad, {
					label: "◀",
					onClick: () => move(-1, 0, 0, 0)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pad, {
					label: "▼",
					onClick: softDrop
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pad, {
					label: "▶",
					onClick: () => move(1, 0, 0, 0)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pad, {
					label: "⤓",
					onClick: hardDrop
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pad, {
					label: "⟳",
					onClick: () => rotate("xy")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pad, {
					label: "Hold",
					onClick: hold
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pad, {
					label: "Y−",
					onClick: () => move(0, -1, 0, 0)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pad, {
					label: "Y+",
					onClick: () => move(0, 1, 0, 0)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pad, {
					label: "w−",
					onClick: () => move(0, 0, 0, -1)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pad, {
					label: "w+",
					onClick: () => move(0, 0, 0, 1)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pad, {
					label: "⟲w",
					onClick: () => rotate("xw")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pad, {
					label: "F",
					onClick: () => rotate("xz")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pad, {
					label: "⇆w−",
					onClick: () => phaseStep(-1)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pad, {
					label: "⇆w+",
					onClick: () => phaseStep(1)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pad, {
					label: "✓ Confirm Phase",
					onClick: confirm,
					wide: true,
					accent: snap.inPhase
				})
			]
		})
	});
}
function MiniPiece({ cells, color, label }) {
	let maxX = 0, maxZ = 0;
	const set = /* @__PURE__ */ new Set();
	for (const [x, , z] of cells) {
		if (x > maxX) maxX = x;
		if (z > maxZ) maxZ = z;
		set.add(`${x},${z}`);
	}
	const cols = Math.max(1, maxX + 1);
	const rows = Math.max(1, maxZ + 1);
	const tiles = [];
	for (let z = rows - 1; z >= 0; z--) for (let x = 0; x < cols; x++) {
		const on = set.has(`${x},${z}`);
		tiles.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-[1px]",
			style: {
				background: on ? color : "transparent",
				boxShadow: on ? `0 0 6px ${color}88` : void 0
			}
		}, `${x},${z}`));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-px",
			style: {
				gridTemplateColumns: `repeat(${cols}, 8px)`,
				gridTemplateRows: `repeat(${rows}, 8px)`
			},
			children: tiles
		}), label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[9px] tracking-[0.16em] uppercase text-subtle",
			children: label
		}) : null]
	});
}
function Stat({ label, value, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-surface-2/80 px-3 py-2.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] tracking-[0.22em] uppercase text-subtle",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-0.5 font-display text-2xl tabular-nums leading-none text-fg",
				children: value
			}),
			sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-[11px] text-muted",
				children: sub
			}) : null
		]
	});
}
function GameHud({ api }) {
	const { snap, high } = api;
	const hdPct = Math.round(snap.hd * 100);
	const hdColor = snap.hdState === "breathing" ? "text-ok" : snap.hdState === "pressure" ? "text-danger" : "text-accent";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2 sm:grid-cols-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Score",
					value: snap.score.toLocaleString(),
					sub: `best ${high.toLocaleString()}`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Level",
					value: String(snap.level),
					sub: `${snap.slabs} slabs`
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-surface-2/80 px-3 py-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] tracking-[0.22em] uppercase text-subtle",
							children: "Hyperdensity"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("text-[11px] capitalize", hdColor),
							children: snap.hdState
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 h-2 overflow-hidden rounded-full bg-white/5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("h-full rounded-full transition-[width] duration-300", snap.hdState === "breathing" ? "bg-ok" : snap.hdState === "pressure" ? "bg-danger" : "bg-accent"),
							style: { width: `${Math.min(100, Math.max(4, hdPct))}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1.5 text-[11px] tabular-nums text-muted",
						children: [
							hdPct,
							"% · slab ",
							snap.slabs
						]
					})
				]
			}),
			snap.inPhase ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-[12px] text-accent",
				children: [
					"Phase Slide window · ",
					Math.max(0, Math.round(snap.phaseRemaining)),
					"ms · step ",
					snap.phaseSteps,
					"/8"
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-surface-2/80 px-3 py-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 text-[10px] tracking-[0.22em] uppercase text-subtle",
					children: "Next"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-end justify-around gap-2",
					children: snap.next.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniPiece, {
						cells: p.cells,
						color: p.color,
						label: p.name
					}, p.id + p.name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-surface-2/80 px-3 py-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 text-[10px] tracking-[0.22em] uppercase text-subtle",
					children: "Hold (C)"
				}), snap.hold ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniPiece, {
					cells: snap.hold.cells,
					color: snap.hold.color,
					label: snap.hold.name
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-3 text-center text-[11px] text-subtle",
					children: "empty"
				})]
			})
		]
	});
}
var WELL = {
	X: 5,
	Y: 5,
	Z: 12,
	W: 4
};
function xzOf(cells, w) {
	const s = /* @__PURE__ */ new Set();
	for (const [x, , z, ww] of cells) if (ww === w) s.add(`${x},${z}`);
	return s;
}
function yzOf(cells, w) {
	const s = /* @__PURE__ */ new Set();
	for (const [, y, z, ww] of cells) if (ww === w) s.add(`${y},${z}`);
	return s;
}
function Grid({ title, width, height, fill, piece, ghost, color, swipe }) {
	const cells = [];
	for (let z = height - 1; z >= 0; z--) for (let x = 0; x < width; x++) {
		const k = `${x},${z}`;
		const isPiece = piece.has(k);
		const isFill = fill.has(k);
		const isGhost = ghost.has(k);
		cells.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-[2px] transition-colors duration-150",
			style: {
				background: isPiece ? color : isFill ? "rgba(255,255,255,0.16)" : isGhost ? "rgba(125,211,252,0.12)" : "rgba(255,255,255,0.025)",
				boxShadow: isPiece ? `0 0 6px ${color}99, inset 0 0 0 1px ${color}` : isFill ? "inset 0 0 0 1px rgba(255,255,255,0.18)" : "inset 0 0 0 1px rgba(255,255,255,0.04)"
			}
		}, k));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-1.5 text-[10px] tracking-[0.22em] uppercase text-subtle",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		...swipe,
		className: "grid gap-[2px] rounded-lg border border-border bg-white/[0.015] p-1.5",
		style: {
			gridTemplateColumns: `repeat(${width}, 1fr)`,
			gridTemplateRows: `repeat(${height}, 1fr)`,
			aspectRatio: `${width} / ${height}`,
			touchAction: swipe ? "none" : "auto"
		},
		children: cells
	})] });
}
function PhaseStrip({ w, active, fill, piece, color }) {
	const cells = [];
	for (let z = WELL.Z - 1; z >= 0; z--) for (let x = 0; x < WELL.X; x++) {
		const k = `${x},${z}`;
		const on = piece.has(k) || fill.has(k);
		cells.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-[1px]",
			style: { background: piece.has(k) ? color : on ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.03)" }
		}, k));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-md border p-1", active ? "border-accent/60 bg-accent/5" : "border-border bg-white/[0.015]"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-0.5 text-center text-[9px] text-subtle",
			children: ["w", w]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-px",
			style: {
				gridTemplateColumns: `repeat(${WELL.X}, 1fr)`,
				gridTemplateRows: `repeat(${WELL.Z}, 1fr)`,
				aspectRatio: `${WELL.X} / ${WELL.Z}`
			},
			children: cells
		})]
	});
}
function DualWells({ api }) {
	const { snap, move, rotate, softDrop, hardDrop } = api;
	const { well, piece, activeW, inPhase } = snap;
	const origin = (0, import_react.useRef)({
		x: 0,
		y: 0,
		t: 0,
		active: false
	});
	const swipe = inPhase ? void 0 : {
		onTouchStart: (e) => {
			const t = e.touches[0];
			if (!t) return;
			origin.current = {
				x: t.clientX,
				y: t.clientY,
				t: Date.now(),
				active: true
			};
		},
		onTouchEnd: (e) => {
			if (!origin.current.active) return;
			const t = e.changedTouches[0];
			if (!t) return;
			const dx = t.clientX - origin.current.x;
			const dy = t.clientY - origin.current.y;
			const dt = Date.now() - origin.current.t;
			const ax = Math.abs(dx);
			const ay = Math.abs(dy);
			if (ax < 18 && ay < 18) rotate("xy");
			else if (ax > ay) move(dx > 0 ? 1 : -1, 0, 0, 0);
			else if (dy > 70 && dt < 220) hardDrop();
			else if (dy > 0) softDrop();
			origin.current.active = false;
		}
	};
	const fillXZ = /* @__PURE__ */ new Set();
	const fillYZ = /* @__PURE__ */ new Set();
	for (const cell of well) {
		const [x, y, z, w] = cell.key.split(",").map(Number);
		if (w === activeW) {
			fillXZ.add(`${x},${z}`);
			fillYZ.add(`${y},${z}`);
		}
	}
	const pieceXZ = piece ? xzOf(piece.cells, activeW) : /* @__PURE__ */ new Set();
	const pieceYZ = piece ? yzOf(piece.cells, activeW) : /* @__PURE__ */ new Set();
	const ghostXZ = /* @__PURE__ */ new Set();
	if (piece) {
		let drop = 0;
		const ok = (dz) => piece.cells.every(([x, y, z, w]) => {
			const nz = z + dz;
			if (nz < 0) return false;
			return !well.some((c) => {
				const [wx, wy, wz, ww] = c.key.split(",").map(Number);
				return ww === w && wx === x && wy === y && wz === nz;
			});
		});
		while (ok(drop - 1)) drop--;
		for (const [x, , z, w] of piece.cells) if (w === activeW) ghostXZ.add(`${x},${z + drop}`);
	}
	const color = piece?.color ?? "#7dd3fc";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3 sm:gap-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, {
				title: "Width × Height (X · Z)",
				width: WELL.X,
				height: WELL.Z,
				fill: fillXZ,
				piece: pieceXZ,
				ghost: ghostXZ,
				color,
				swipe
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, {
				title: "Depth × Height (Y · Z)",
				width: WELL.Y,
				height: WELL.Z,
				fill: fillYZ,
				piece: pieceYZ,
				ghost: /* @__PURE__ */ new Set(),
				color
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-1.5 text-[10px] tracking-[0.22em] uppercase text-subtle",
			children: "Phase axis · W"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-4 gap-1.5",
			children: Array.from({ length: WELL.W }, (_, w) => {
				const fill = /* @__PURE__ */ new Set();
				for (const cell of well) {
					const [x, , z, ww] = cell.key.split(",").map(Number);
					if (ww === w) fill.add(`${x},${z}`);
				}
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhaseStrip, {
					w,
					active: w === activeW,
					fill,
					piece: piece ? xzOf(piece.cells, w) : /* @__PURE__ */ new Set(),
					color
				}, w);
			})
		})] })]
	});
}
var PIECE_COLORS = {
	MONOLITH: "#7dd3fc",
	REACTOR: "#a78bfa",
	CRADLE: "#f472b6",
	PLATE: "#fbbf24",
	BAR: "#34d399",
	BLADE: "#fb7185",
	FIN: "#60a5fa",
	STEP: "#c084fc"
};
/** 2D tetromino templates used as the three mating parents. */
var SHAPES = {
	I_v: [
		[0, 0],
		[0, 1],
		[0, 2],
		[0, 3]
	],
	I_h: [
		[0, 0],
		[1, 0],
		[2, 0],
		[3, 0]
	],
	O: [
		[0, 0],
		[1, 0],
		[0, 1],
		[1, 1]
	],
	T_d: [
		[1, 0],
		[0, 1],
		[1, 1],
		[2, 1]
	],
	S: [
		[1, 0],
		[2, 0],
		[0, 1],
		[1, 1]
	]
};
function groupByHeight(shape) {
	const g = {};
	for (const [a, z] of shape) (g[z] ??= []).push(a);
	return g;
}
/**
* Ternary mating product: 𝟙_M(x,y,z,w) = 𝟙_A(x,z) · 𝟙_B(y,z) · 𝟙_C(w,z)
* For each shared height z, take the cartesian product of the three parents.
*/
function mate(A, B, C) {
	const aZ = groupByHeight(A);
	const bZ = groupByHeight(B);
	const cZ = groupByHeight(C);
	const heights = /* @__PURE__ */ new Set();
	for (const k of Object.keys(aZ)) heights.add(Number(k));
	for (const k of Object.keys(bZ)) heights.add(Number(k));
	for (const k of Object.keys(cZ)) heights.add(Number(k));
	const cells = [];
	for (const z of heights) {
		const xs = aZ[z] ?? [];
		const ys = bZ[z] ?? [];
		const ws = cZ[z] ?? [];
		if (!xs.length || !ys.length || !ws.length) continue;
		for (const x of xs) for (const y of ys) for (const w of ws) cells.push([
			x,
			y,
			z,
			w
		]);
	}
	return cells;
}
var PIECES = [
	{
		id: "MONOLITH",
		name: "MONOLITH-Δ",
		A: SHAPES.I_v,
		B: SHAPES.I_v,
		C: SHAPES.I_v
	},
	{
		id: "REACTOR",
		name: "REACTOR-Δ",
		A: SHAPES.O,
		B: SHAPES.O,
		C: SHAPES.O
	},
	{
		id: "CRADLE",
		name: "HYPERCRADLE",
		A: SHAPES.T_d,
		B: SHAPES.T_d,
		C: SHAPES.T_d
	},
	{
		id: "PLATE",
		name: "PLATE-Δ",
		A: SHAPES.I_h,
		B: SHAPES.I_h,
		C: SHAPES.I_h
	},
	{
		id: "BAR",
		name: "BAR-Δ",
		A: SHAPES.I_v,
		B: SHAPES.O,
		C: SHAPES.I_v
	},
	{
		id: "BLADE",
		name: "BLADE-Δ",
		A: SHAPES.T_d,
		B: SHAPES.I_h,
		C: SHAPES.O
	},
	{
		id: "FIN",
		name: "FIN-Δ",
		A: SHAPES.O,
		B: SHAPES.T_d,
		C: SHAPES.I_h
	},
	{
		id: "STEP",
		name: "STEP-Δ",
		A: SHAPES.S,
		B: SHAPES.O,
		C: SHAPES.I_v
	}
].map((s) => ({
	id: s.id,
	name: s.name,
	cells: mate(s.A, s.B, s.C)
}));
var PIECE_BY_ID = Object.fromEntries(PIECES.map((p) => [p.id, p]));
function shuffleBag() {
	const bag = [...PIECES];
	for (let i = bag.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[bag[i], bag[j]] = [bag[j], bag[i]];
	}
	return bag;
}
var KEY = (x, y, z, w) => `${x},${y},${z},${w}`;
var PARSE = (k) => k.split(",").map(Number);
var NEIGHBORS = [
	[
		1,
		0,
		0,
		0
	],
	[
		-1,
		0,
		0,
		0
	],
	[
		0,
		1,
		0,
		0
	],
	[
		0,
		-1,
		0,
		0
	],
	[
		0,
		0,
		1,
		0
	],
	[
		0,
		0,
		-1,
		0
	],
	[
		0,
		0,
		0,
		1
	],
	[
		0,
		0,
		0,
		-1
	]
];
var KICKS = [
	[
		0,
		0,
		0,
		0
	],
	[
		-1,
		0,
		0,
		0
	],
	[
		1,
		0,
		0,
		0
	],
	[
		0,
		-1,
		0,
		0
	],
	[
		0,
		1,
		0,
		0
	],
	[
		0,
		0,
		1,
		0
	],
	[
		0,
		0,
		0,
		-1
	],
	[
		0,
		0,
		0,
		1
	],
	[
		-1,
		-1,
		0,
		0
	],
	[
		1,
		1,
		0,
		0
	],
	[
		-1,
		1,
		0,
		0
	],
	[
		1,
		-1,
		0,
		0
	],
	[
		0,
		0,
		1,
		1
	],
	[
		0,
		0,
		1,
		-1
	],
	[
		0,
		0,
		0,
		2
	],
	[
		0,
		0,
		2,
		0
	]
];
var ROTATE = {
	xy: ([x, y, z, w]) => [
		-y,
		x,
		z,
		w
	],
	xz: ([x, y, z, w]) => [
		-z,
		y,
		x,
		w
	],
	xw: ([x, y, z, w]) => [
		-w,
		y,
		z,
		x
	],
	yz: ([x, y, z, w]) => [
		x,
		-z,
		y,
		w
	],
	yw: ([x, y, z, w]) => [
		x,
		-w,
		z,
		y
	],
	zw: ([x, y, z, w]) => [
		x,
		y,
		-w,
		z
	]
};
var AXIS_I = {
	x: 0,
	y: 1,
	z: 2,
	w: 3
};
function bounds(cells) {
	let minx = Infinity, miny = Infinity, minz = Infinity, minw = Infinity;
	let maxx = -Infinity, maxy = -Infinity, maxz = -Infinity, maxw = -Infinity;
	for (const [x, y, z, w] of cells) {
		if (x < minx) minx = x;
		if (x > maxx) maxx = x;
		if (y < miny) miny = y;
		if (y > maxy) maxy = y;
		if (z < minz) minz = z;
		if (z > maxz) maxz = z;
		if (w < minw) minw = w;
		if (w > maxw) maxw = w;
	}
	return {
		minx,
		miny,
		minz,
		minw,
		maxx,
		maxy,
		maxz,
		maxw
	};
}
function centroid(cells, axis) {
	const b = bounds(cells);
	const mins = [
		b.minx,
		b.miny,
		b.minz,
		b.minw
	];
	const maxs = [
		b.maxx,
		b.maxy,
		b.maxz,
		b.maxw
	];
	return (mins[axis] + maxs[axis]) / 2;
}
function normalize(cells) {
	const b = bounds(cells);
	return cells.map(([x, y, z, w]) => [
		x - b.minx,
		y - b.miny,
		z - b.minz,
		w - b.minw
	]);
}
function translate(cells, dx, dy, dz, dw) {
	return cells.map(([x, y, z, w]) => [
		x + dx,
		y + dy,
		z + dz,
		w + dw
	]);
}
function rotate(cells, plane) {
	const fn = ROTATE[plane];
	const cx = centroid(cells, 0);
	const cy = centroid(cells, 1);
	const cz = centroid(cells, 2);
	const cw = centroid(cells, 3);
	return cells.map(([x, y, z, w]) => {
		const [nx, ny, nz, nw] = fn([
			x - cx,
			y - cy,
			z - cz,
			w - cw
		]);
		return [
			Math.round(nx + cx),
			Math.round(ny + cy),
			Math.round(nz + cz),
			Math.round(nw + cw)
		];
	});
}
function inBounds(cells) {
	for (const [x, y, z, w] of cells) if (x < 0 || x >= WELL.X || y < 0 || y >= WELL.Y || z < 0 || z >= WELL.Z + 2 || w < 0 || w >= WELL.W) return false;
	return true;
}
function sliceSignature(points) {
	const min = [
		Infinity,
		Infinity,
		Infinity
	];
	for (const p of points) for (let i = 0; i < 3; i++) min[i] = Math.min(min[i], p[i]);
	return points.map((p) => `${p[0] - min[0]},${p[1] - min[1]},${p[2] - min[2]}`).sort().join(";");
}
function isExtruded(cells, axis) {
	const ai = AXIS_I[axis];
	const slices = {};
	for (const c of cells) {
		const v = c[ai];
		const rest = c.filter((_, i) => i !== ai);
		(slices[v] ??= []).push(rest);
	}
	const keys = Object.keys(slices);
	if (keys.length < 2) return false;
	const sig = sliceSignature(slices[Number(keys[0])]);
	return keys.every((k) => sliceSignature(slices[Number(k)]) === sig);
}
function channelOf(cells) {
	const b = bounds(cells);
	const ext = {
		x: b.maxx - b.minx + 1,
		y: b.maxy - b.miny + 1,
		w: b.maxw - b.minw + 1,
		z: b.maxz - b.minz + 1
	};
	const rank = {
		x: 0,
		y: 1,
		w: 2,
		z: 3
	};
	const extruded = [
		"x",
		"y",
		"w",
		"z"
	].filter((a) => ext[a] >= 2 && isExtruded(cells, a));
	const score = (a) => [ext[a], -rank[a]];
	return (extruded.length ? extruded : [
		"x",
		"y",
		"w",
		"z"
	]).slice().sort((a, b) => {
		const [ea, ra] = score(a);
		const [eb, rb] = score(b);
		return eb - ea || rb - ra;
	})[0];
}
function floodPockets(candidates) {
	const seen = /* @__PURE__ */ new Set();
	const groups = [];
	for (const start of candidates) {
		if (seen.has(start)) continue;
		const stack = [start];
		const group = [];
		seen.add(start);
		while (stack.length) {
			const cur = stack.pop();
			group.push(cur);
			const [x, y, z, w] = PARSE(cur);
			for (const [dx, dy, dz, dw] of NEIGHBORS) {
				const nk = KEY(x + dx, y + dy, z + dz, w + dw);
				if (candidates.has(nk) && !seen.has(nk)) {
					seen.add(nk);
					stack.push(nk);
				}
			}
		}
		if (group.length >= 4) groups.push(group.map(PARSE));
	}
	return groups;
}
function findPockets(cells) {
	const occupied = new Set(cells.map((c) => KEY(...c)));
	const b = bounds(cells);
	const lo = [
		Math.max(0, b.minx - 1),
		Math.max(0, b.miny - 1),
		Math.max(0, b.minz - 1),
		Math.max(0, b.minw - 1)
	];
	const hi = [
		Math.min(WELL.X - 1, b.maxx + 1),
		Math.min(WELL.Y - 1, b.maxy + 1),
		Math.min(WELL.Z - 1, b.maxz + 1),
		Math.min(WELL.W - 1, b.maxw + 1)
	];
	const pocket = /* @__PURE__ */ new Set();
	for (let x = lo[0]; x <= hi[0]; x++) for (let y = lo[1]; y <= hi[1]; y++) for (let z = lo[2]; z <= hi[2]; z++) for (let w = lo[3]; w <= hi[3]; w++) {
		if (occupied.has(KEY(x, y, z, w))) continue;
		let shielded = 0;
		for (const [dx, dy, dz, dw] of NEIGHBORS) {
			let cx = x + dx, cy = y + dy, cz = z + dz, cw = w + dw;
			while (cx >= lo[0] && cx <= hi[0] && cy >= lo[1] && cy <= hi[1] && cz >= lo[2] && cz <= hi[2] && cw >= lo[3] && cw <= hi[3]) {
				if (occupied.has(KEY(cx, cy, cz, cw))) {
					shielded++;
					break;
				}
				cx += dx;
				cy += dy;
				cz += dz;
				cw += dw;
			}
		}
		if (shielded >= 6) pocket.add(KEY(x, y, z, w));
	}
	return floodPockets(pocket);
}
function majorityHost(cells, pocketIndex) {
	const counts = {};
	for (const c of cells) {
		const h = pocketIndex.get(KEY(...c));
		if (h != null) counts[h] = (counts[h] ?? 0) + 1;
	}
	for (const [host, n] of Object.entries(counts)) if (n / cells.length >= .75) return Number(host);
	return null;
}
function hyperdensity(filled, maxZ) {
	if (filled === 0) return 1;
	return filled / ((maxZ + 1) * WELL.X * WELL.Y * WELL.W);
}
function fallRate(level) {
	return 2 * 1.28 ** (level - 1);
}
function lockDelay(level) {
	return Math.max(200, 500 - 15 * (level - 1));
}
function phaseWindow(level) {
	return Math.max(120, 400 - 10 * level);
}
var SLAB_PTS = [
	0,
	100,
	300,
	500,
	800,
	1200
];
function createEngine() {
	const well = /* @__PURE__ */ new Map();
	const hosts = /* @__PURE__ */ new Map();
	const pocketIndex = /* @__PURE__ */ new Map();
	let hostSeq = 0;
	const state = {
		piece: null,
		next: shuffleBag(),
		hold: null,
		canHold: true,
		score: 0,
		level: 1,
		slabs: 0,
		status: "playing",
		activeW: 1,
		lockTimer: 0,
		lockResets: 0,
		grounded: false,
		phaseRemaining: 0,
		phaseSteps: 0,
		inPhase: false,
		fallAcc: 0,
		hdRolling: [],
		lastEvent: null
	};
	function collide(cells) {
		for (const [x, y, z, w] of cells) if (x < 0 || x >= WELL.X || y < 0 || y >= WELL.Y || z < 0 || z >= WELL.Z + 2 || w < 0 || w >= WELL.W || well.has(KEY(x, y, z, w))) return true;
		return false;
	}
	function groundedNow() {
		if (!state.piece) return false;
		return collide(translate(state.piece.cells, 0, 0, -1, 0));
	}
	function placeAtTop(def) {
		const cells = normalize(def.cells);
		const b = bounds(cells);
		const placed = translate(cells, Math.floor((WELL.X - (b.maxx - b.minx + 1)) / 2), Math.floor((WELL.Y - (b.maxy - b.miny + 1)) / 2), WELL.Z - (b.maxz - b.minz + 1), state.activeW);
		if (!inBounds(placed) || collide(placed)) return null;
		return placed;
	}
	function spawn() {
		const def = state.next[0];
		if (!def) return;
		state.next = state.next.slice(1);
		if (state.next.length < 3) state.next = state.next.concat(shuffleBag());
		const placed = placeAtTop(def);
		if (!placed) {
			state.status = "over";
			state.lastEvent = { type: "over" };
			return;
		}
		state.piece = {
			id: def.id,
			name: def.name,
			color: PIECE_COLORS[def.id],
			cells: placed,
			channel: channelOf(placed)
		};
		state.canHold = true;
		state.lockTimer = 0;
		state.lockResets = 0;
		state.grounded = false;
		state.inPhase = false;
		state.phaseRemaining = 0;
		state.phaseSteps = 0;
		state.fallAcc = 0;
	}
	function tryMove(dx, dy, dz, dw) {
		if (!state.piece || state.status !== "playing" || state.inPhase) return false;
		const next = translate(state.piece.cells, dx, dy, dz, dw);
		if (collide(next) || !inBounds(next)) return false;
		state.piece.cells = next;
		if (dw !== 0) state.activeW = Math.max(0, Math.min(WELL.W - 1, state.activeW + dw));
		if (groundedNow()) {
			state.grounded = true;
			if (state.lockResets < 8) {
				state.lockTimer = 0;
				state.lockResets++;
			}
		} else {
			state.grounded = false;
			state.lockTimer = 0;
		}
		return true;
	}
	function tryRotate(plane) {
		if (!state.piece || state.status !== "playing" || state.inPhase) return false;
		const rotated = rotate(state.piece.cells, plane);
		for (const [kx, ky, kz, kw] of KICKS) {
			const kicked = translate(rotated, kx, ky, kz, kw);
			if (!collide(kicked) && inBounds(kicked)) {
				state.piece.cells = kicked;
				state.piece.channel = channelOf(kicked);
				if (groundedNow()) {
					state.grounded = true;
					if (state.lockResets < 8) {
						state.lockTimer = 0;
						state.lockResets++;
					}
				} else {
					state.grounded = false;
					state.lockTimer = 0;
				}
				return true;
			}
		}
		return false;
	}
	function softDrop() {
		if (!state.piece || state.inPhase) return;
		if (tryMove(0, 0, -1, 0)) state.score += 1;
	}
	function beginPhase() {
		const piece = state.piece;
		if (!piece) return;
		for (const c of piece.cells) if (c[2] >= WELL.Z) {
			state.status = "over";
			state.lastEvent = { type: "over" };
			return;
		}
		state.inPhase = true;
		state.phaseRemaining = phaseWindow(state.level);
		state.phaseSteps = 0;
	}
	function hardDrop() {
		if (!state.piece || state.inPhase) return;
		let n = 0;
		while (tryMove(0, 0, -1, 0)) n++;
		state.score += 2 * n;
		beginPhase();
	}
	function holdPiece() {
		if (!state.piece || !state.canHold || state.inPhase) return;
		const current = state.piece.id;
		if (state.hold) {
			const swapped = state.hold;
			state.hold = current;
			spawnHeld(swapped);
		} else {
			state.hold = current;
			spawn();
		}
		state.canHold = false;
	}
	function spawnHeld(id) {
		const def = PIECE_BY_ID[id];
		const placed = placeAtTop(def);
		if (!placed) {
			state.status = "over";
			return;
		}
		state.piece = {
			id: def.id,
			name: def.name,
			color: PIECE_COLORS[def.id],
			cells: placed,
			channel: channelOf(placed)
		};
		state.lockTimer = 0;
		state.lockResets = 0;
		state.grounded = false;
		state.inPhase = false;
	}
	function refreshNearbyPockets(cells, skipHost) {
		const b = bounds(cells);
		for (const [hid, host] of hosts) {
			if (hid === skipHost) continue;
			const hb = bounds(host.cells);
			if (!(b.minx - 1 <= hb.maxx + 1 && b.maxx + 1 >= hb.minx - 1 && b.miny - 1 <= hb.maxy + 1 && b.maxy + 1 >= hb.miny - 1 && b.minz - 1 <= hb.maxz + 1 && b.maxz + 1 >= hb.minz - 1 && b.minw - 1 <= hb.maxw + 1 && b.maxw + 1 >= hb.minw - 1)) continue;
			for (const pocket of host.pockets) for (const c of pocket) pocketIndex.delete(KEY(...c));
			const next = findPockets(host.cells);
			host.pockets = next;
			for (const pocket of next) for (const c of pocket) pocketIndex.set(KEY(...c), hid);
		}
	}
	function phaseStep(dir) {
		if (!state.inPhase || !state.piece || state.phaseSteps >= 8 || state.phaseRemaining <= 0) return false;
		const ch = state.piece.channel;
		const delta = [
			0,
			0,
			0,
			0
		];
		delta[AXIS_I[ch]] = dir;
		const next = translate(state.piece.cells, ...delta);
		if (collide(next) || !inBounds(next)) return false;
		state.piece.cells = next;
		if (ch === "w") state.activeW = Math.max(0, Math.min(WELL.W - 1, state.activeW + dir));
		state.phaseSteps++;
		state.phaseRemaining -= 40;
		return true;
	}
	function settle() {
		state.inPhase = false;
		const piece = state.piece;
		if (!piece) return;
		for (const c of piece.cells) if (c[2] >= WELL.Z) {
			state.status = "over";
			state.lastEvent = { type: "over" };
			return;
		}
		const hid = ++hostSeq;
		for (const c of piece.cells) well.set(KEY(...c), {
			color: piece.color,
			host: hid
		});
		const pockets = findPockets(piece.cells);
		hosts.set(hid, {
			cells: piece.cells.slice(),
			pockets
		});
		for (const pocket of pockets) for (const c of pocket) pocketIndex.set(KEY(...c), hid);
		refreshNearbyPockets(piece.cells, hid);
		const nest = majorityHost(piece.cells, pocketIndex);
		if (nest != null) {
			state.score += 4 * piece.cells.length * state.level;
			state.lastEvent = {
				type: "nest",
				host: nest
			};
			if (state.phaseSteps >= 2 && piece.channel === "w") state.score += 200 * state.level;
		}
		clearSlabs();
		sampleHd();
		state.piece = null;
		if (state.status === "playing") spawn();
	}
	function confirmPhase() {
		if (!state.inPhase) return;
		for (;;) {
			const dropped = translate(state.piece.cells, 0, 0, -1, 0);
			if (!collide(dropped) && inBounds(dropped)) state.piece.cells = dropped;
			else break;
		}
		settle();
	}
	function clearSlabs() {
		let cleared = 0;
		for (let z = 0; z < WELL.Z; z++) {
			let full = true;
			outer: for (let x = 0; x < WELL.X; x++) for (let y = 0; y < WELL.Y; y++) for (let w = 0; w < WELL.W; w++) if (!well.has(KEY(x, y, z, w))) {
				full = false;
				break outer;
			}
			if (!full) continue;
			cleared++;
			for (let x = 0; x < WELL.X; x++) for (let y = 0; y < WELL.Y; y++) for (let w = 0; w < WELL.W; w++) well.delete(KEY(x, y, z, w));
			const moving = [];
			for (const k of well.keys()) {
				const [x, y, zz, w] = PARSE(k);
				if (zz > z) moving.push([
					k,
					x,
					y,
					zz,
					w
				]);
			}
			moving.sort((a, b) => b[3] - a[3]);
			for (const [k, x, y, zz, w] of moving) {
				const cell = well.get(k);
				well.delete(k);
				well.set(KEY(x, y, zz - 1, w), cell);
			}
		}
		if (cleared > 0) {
			const pts = (SLAB_PTS[Math.min(cleared, 5)] ?? 1200) * state.level;
			state.score += pts;
			state.slabs += cleared;
			state.lastEvent = {
				type: "clear",
				count: cleared,
				pts
			};
			if (state.slabs >= state.level * 10) state.level++;
			if (well.size === 0) state.score += 5e3 * state.level;
		}
	}
	function sampleHd() {
		let maxZ = -1;
		for (const k of well.keys()) {
			const z = Number(k.split(",")[2]);
			if (z > maxZ) maxZ = z;
		}
		const hd = hyperdensity(well.size, maxZ);
		state.hdRolling.push(hd);
		if (state.hdRolling.length > 10) state.hdRolling.shift();
	}
	function meanHd() {
		if (!state.hdRolling.length) return 1;
		return state.hdRolling.reduce((a, b) => a + b, 0) / state.hdRolling.length;
	}
	function tick(dtMs) {
		if (state.status !== "playing") return;
		const dt = Math.min(dtMs, 100);
		if (state.inPhase) {
			state.phaseRemaining -= dt;
			if (state.phaseRemaining <= 0) confirmPhase();
			return;
		}
		if (!state.piece) {
			spawn();
			return;
		}
		const hd = meanHd();
		const hdMul = hd > .75 ? .9 : hd < .45 ? 1.15 : 1;
		const cellsPerSec = fallRate(state.level) * hdMul;
		state.fallAcc += cellsPerSec * dt / 1e3;
		while (state.fallAcc >= 1) {
			state.fallAcc--;
			if (!tryMove(0, 0, -1, 0)) {
				state.grounded = true;
				break;
			}
		}
		if (state.grounded) {
			state.lockTimer += dt;
			if (state.lockTimer >= lockDelay(state.level)) beginPhase();
		}
	}
	function snapshot() {
		const hd = meanHd();
		const hdState = hd > .75 ? "breathing" : hd < .45 ? "pressure" : "neutral";
		return {
			well: [...well.entries()].map(([key, v]) => ({
				key,
				color: v.color
			})),
			piece: state.piece ? {
				...state.piece,
				cells: state.piece.cells
			} : null,
			next: state.next.slice(0, 3).map((p) => ({
				id: p.id,
				name: p.name,
				color: PIECE_COLORS[p.id],
				cells: normalize(p.cells)
			})),
			hold: state.hold ? {
				id: state.hold,
				name: PIECE_BY_ID[state.hold].name,
				color: PIECE_COLORS[state.hold],
				cells: normalize(PIECE_BY_ID[state.hold].cells)
			} : null,
			score: state.score,
			level: state.level,
			slabs: state.slabs,
			status: state.status,
			activeW: state.activeW,
			inPhase: state.inPhase,
			phaseRemaining: state.phaseRemaining,
			phaseSteps: state.phaseSteps,
			hd,
			hdState,
			lastEvent: state.lastEvent
		};
	}
	spawn();
	return {
		tick,
		tryMove,
		tryRotate,
		softDrop,
		hardDrop,
		phaseStep,
		confirmPhase,
		holdPiece,
		snapshot
	};
}
var HS_KEY = "nestris-delta-highscore";
function readHigh() {
	try {
		return Number(localStorage.getItem(HS_KEY) ?? 0) || 0;
	} catch {
		return 0;
	}
}
function writeHigh(n) {
	try {
		localStorage.setItem(HS_KEY, String(n));
	} catch {}
}
function useGame() {
	const engine = (0, import_react.useRef)(null);
	engine.current ??= createEngine();
	const [snap, setSnap] = (0, import_react.useState)(() => engine.current.snapshot());
	const [high, setHigh] = (0, import_react.useState)(0);
	const raf = (0, import_react.useRef)(0);
	const last = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		setHigh(readHigh());
		last.current = performance.now();
		const loop = (t) => {
			const dt = Math.min(100, t - last.current);
			last.current = t;
			engine.current.tick(dt);
			const next = engine.current.snapshot();
			setSnap(next);
			if (next.status === "over" && next.score > readHigh()) {
				writeHigh(next.score);
				setHigh(next.score);
			}
			raf.current = requestAnimationFrame(loop);
		};
		raf.current = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf.current);
	}, []);
	return {
		snap,
		high,
		restart: (0, import_react.useCallback)(() => {
			engine.current = createEngine();
			setSnap(engine.current.snapshot());
		}, []),
		move: (0, import_react.useCallback)((dx, dy, dz, dw) => engine.current.tryMove(dx, dy, dz, dw), []),
		rotate: (0, import_react.useCallback)((p) => engine.current.tryRotate(p), []),
		softDrop: (0, import_react.useCallback)(() => engine.current.softDrop(), []),
		hardDrop: (0, import_react.useCallback)(() => engine.current.hardDrop(), []),
		phaseStep: (0, import_react.useCallback)((dir) => engine.current.phaseStep(dir), []),
		confirm: (0, import_react.useCallback)(() => engine.current.confirmPhase(), []),
		hold: (0, import_react.useCallback)(() => engine.current.holdPiece(), [])
	};
}
function Play() {
	const api = useGame();
	const { snap, restart, move, rotate, softDrop, hardDrop, hold, phaseStep, confirm } = api;
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.metaKey || e.ctrlKey || e.altKey) return;
			if (snap.status !== "playing") {
				if (e.key === "Enter") restart();
				return;
			}
			const code = e.code;
			if ((/* @__PURE__ */ new Set([
				"ArrowLeft",
				"ArrowRight",
				"ArrowDown",
				"ArrowUp",
				"Space",
				"KeyA",
				"KeyD",
				"KeyQ",
				"KeyE",
				"KeyR",
				"KeyF",
				"KeyC",
				"KeyZ",
				"KeyX",
				"Enter"
			])).has(code)) e.preventDefault();
			switch (code) {
				case "ArrowLeft":
					move(-1, 0, 0, 0);
					break;
				case "ArrowRight":
					move(1, 0, 0, 0);
					break;
				case "ArrowDown":
					softDrop();
					break;
				case "ArrowUp":
					rotate("xy");
					break;
				case "Space":
					hardDrop();
					break;
				case "KeyA":
					move(0, -1, 0, 0);
					break;
				case "KeyD":
					move(0, 1, 0, 0);
					break;
				case "KeyQ":
					move(0, 0, 0, -1);
					break;
				case "KeyE":
					move(0, 0, 0, 1);
					break;
				case "KeyR":
					rotate("xw");
					break;
				case "KeyF":
					rotate("xz");
					break;
				case "KeyC":
					hold();
					break;
				case "Enter":
					confirm();
					break;
				case "KeyZ":
					phaseStep(-1);
					break;
				case "KeyX": phaseStep(1);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		snap.status,
		restart,
		move,
		rotate,
		softDrop,
		hardDrop,
		hold,
		phaseStep,
		confirm
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-20 border-b border-border bg-bg/80 backdrop-blur-xl",
				style: { paddingTop: "env(safe-area-inset-top)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-14 max-w-6xl items-center justify-between px-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative grid size-6 place-items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute size-6 rounded bg-accent/40 blur-[5px] opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeltaMark, { className: "relative size-3.5" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-display text-xs tracking-[0.2em]",
								children: [
									"NESTRIS ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-accent",
										children: "Δ"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-subtle",
										children: " · prototype"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden text-[11px] text-subtle sm:block",
							children: "v0.1 · 4D engine"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto grid max-w-6xl gap-6 px-4 py-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DualWells, { api }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlPads, { api }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "hidden text-[12px] leading-relaxed text-muted sm:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-fg",
								children: "Controls:"
							}), " ←/→ move x · ↓ soft drop · Space hard drop · ↑ rotate (xy) · R rotate phase (xw) · F rotate (xz) · A/D depth (y) · Q/E phase (w) · Z/X Phase Slide · Enter confirm · C hold."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] leading-relaxed text-subtle sm:hidden",
							children: "Swipe the board ←/→ to move, ↓ to soft drop, flick down to hard drop, tap to rotate. Pads below handle depth, phase, and Phase Slide."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[12px] leading-relaxed text-muted",
							children: [
								"Clear a full ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-fg",
									children: "x·y·w hyper-slab"
								}),
								" at one height. Nest small pieces into hyperpockets (≥6/8 shielded) across phase to raise",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-accent",
									children: "hyperdensity"
								}),
								" — stack only in one brane and the shadow-stacking penalty kills you faster."
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameHud, { api })]
			}),
			snap.status === "over" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-30 grid place-items-center bg-bg/70 px-6 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm rounded-xl border border-border bg-surface p-6 text-center shadow-[0_24px_80px_rgba(0,0,0,0.45)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-lg text-danger",
							children: "Hyper-well collapse"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 text-sm text-muted",
							children: ["Final score ", snap.score.toLocaleString()]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: restart,
							className: "mt-5 w-full",
							children: "Re-enter the transdimension"
						})
					]
				})
			}) : null
		]
	});
}
//#endregion
export { Play as component };
