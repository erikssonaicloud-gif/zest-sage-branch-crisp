import { i as __toESM } from "../_runtime.mjs";
import { L as require_jsx_runtime, R as require_react, _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as DeltaMark, r as cn, t as Button } from "./mark-CrWedvfI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BeV9ilAo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TesseractHero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mx-auto grid h-[340px] w-full max-w-[420px] place-items-center sm:h-[420px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute size-64 rounded-full bg-accent/10 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative h-40 w-40 sm:h-48 sm:w-48",
			style: {
				perspective: "900px",
				transformStyle: "preserve-3d"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0",
				style: {
					transformStyle: "preserve-3d",
					animation: "cube-spin 28s linear infinite"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cube, {
					size: 160,
					color: "color-mix(in oklab, var(--color-accent) 70%, white)",
					fill: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0",
					style: {
						transform: "translateZ(-28px) scale(0.62)",
						transformStyle: "preserve-3d"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cube, {
						size: 160,
						color: "color-mix(in oklab, var(--color-fg) 45%, transparent)"
					})
				})]
			})
		})]
	});
}
function Cube({ size, color, fill }) {
	const half = size / 2;
	const face = {
		position: "absolute",
		width: size,
		height: size,
		left: 0,
		top: 0,
		border: `1px solid ${color}`,
		background: fill ? "color-mix(in oklab, var(--color-accent) 8%, transparent)" : "transparent",
		boxShadow: fill ? "inset 0 0 28px color-mix(in oklab, var(--color-accent) 16%, transparent)" : void 0
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			width: size,
			height: size,
			transformStyle: "preserve-3d"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
				...face,
				transform: `translateZ(${half}px)`
			} }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
				...face,
				transform: `rotateY(180deg) translateZ(${half}px)`
			} }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
				...face,
				transform: `rotateY(90deg) translateZ(${half}px)`
			} }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
				...face,
				transform: `rotateY(-90deg) translateZ(${half}px)`
			} }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
				...face,
				transform: `rotateX(90deg) translateZ(${half}px)`
			} }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
				...face,
				transform: `rotateX(-90deg) translateZ(${half}px)`
			} })
		]
	});
}
var EDITIONS$1 = [
	"Early Access",
	"Standard",
	"Collector's",
	"Patron"
];
var STORE_KEY = "nestris-delta-waitlist";
function WaitlistForm() {
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [edition, setEdition] = (0, import_react.useState)("Standard");
	const [done, setDone] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	function onSubmit(e) {
		e.preventDefault();
		setError("");
		if (!email.includes("@") || email.length < 5) {
			setError("Enter a valid email so we can phase you in.");
			return;
		}
		try {
			const existing = JSON.parse(localStorage.getItem(STORE_KEY) ?? "[]");
			existing.push({
				name,
				email,
				edition,
				at: Date.now()
			});
			localStorage.setItem(STORE_KEY, JSON.stringify(existing));
		} catch {}
		setDone(true);
	}
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-accent/30 bg-accent/10 px-6 py-8 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-display text-2xl text-fg",
			children: "You’re on the axis"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm text-muted",
			children: [
				edition,
				" reserved for ",
				email,
				". We’ll open the gate in waves with the v0.2 census."
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] tracking-[0.22em] uppercase text-subtle",
					children: "Name (optional)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: name,
					onChange: (e) => setName(e.target.value),
					className: "h-11 rounded-md border border-border bg-surface-2 px-3 text-sm text-fg outline-none transition-colors placeholder:text-subtle focus:border-accent/50 focus:ring-2 focus:ring-accent/30",
					placeholder: "Callsign"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] tracking-[0.22em] uppercase text-subtle",
					children: "Email"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "email",
					required: true,
					value: email,
					onChange: (e) => setEmail(e.target.value),
					className: "h-11 rounded-md border border-border bg-surface-2 px-3 text-sm text-fg outline-none transition-colors placeholder:text-subtle focus:border-accent/50 focus:ring-2 focus:ring-accent/30",
					placeholder: "you@brane.local"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
				className: "mb-2 text-[10px] tracking-[0.22em] uppercase text-subtle",
				children: "Edition"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2",
				children: EDITIONS$1.map((ed) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setEdition(ed),
					className: cn("h-11 rounded-md border text-sm transition-colors", edition === ed ? "border-accent/50 bg-accent/15 text-accent" : "border-border bg-surface-2 text-muted hover:text-fg"),
					children: ed
				}, ed))
			})] }),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-danger",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				className: "h-12 w-full",
				children: "Reserve my spot"
			})
		]
	});
}
var NAV = [
	{
		href: "#leap",
		label: "The Leap"
	},
	{
		href: "#mechanics",
		label: "Mechanics"
	},
	{
		href: "#editions",
		label: "Editions"
	}
];
var ROWS = [
	[
		"Mating product",
		"binary (2 parents)",
		"ternary (3 parents)"
	],
	[
		"Space",
		"16×16×32",
		"16×16×32×8 subcells"
	],
	[
		"Rotation group",
		"octahedral, order 24",
		"tesseract, order 192"
	],
	[
		"Slab (clear unit)",
		"256 subcells",
		"2048 subcells (full x·y·w layer)"
	],
	[
		"Pocket shielding",
		"≥4 of 6 dirs",
		"≥6 of 8 dirs"
	],
	[
		"CRADLE overhang",
		"8 cells",
		"HYPERCRADLE: 26 cells (3×3×3 plate)"
	],
	[
		"REACTOR",
		"2³ cube, V=8",
		"2⁴ tesseract, V=16"
	],
	[
		"PLATE",
		"V=16",
		"V=64"
	],
	[
		"Post-lock verb",
		"Seam Slide",
		"Phase Slide (along w)"
	]
];
var MECHANICS = [
	{
		title: "Phase Slide",
		body: "The w-axis instance of the generalized Slide. A ½× piece dropped down a shaft in brane w₀ phases laterally into a hyperpocket in brane w₁ whose ceiling and phase-walls blocked direct vertical entry."
	},
	{
		title: "Phase-locked hyperpockets",
		body: "Pockets open only along ±w (6 shielded of 8). Invisible to pure-3D play — reachable only by Phase Slide."
	},
	{
		title: "Hyperdensity penalty",
		body: "Stacking only in the visible brane inflates local density but leaves hyperdensity low (w-extent is in the denominator), accelerating death. Only cross-brane nesting raises true hyperdensity."
	},
	{
		title: "Triple-bag randomizer",
		body: "Independent shape, size, and phase bags — Thin / True / Hyper w-extent classes — so no two runs share the same dimensional rhythm."
	}
];
var EDITIONS = [
	{
		name: "Early Access",
		price: "$19",
		tag: "First through the gate",
		items: [
			"Closed beta access",
			"Name in the launch credits",
			"Digital field-guide artbook"
		],
		featured: false
	},
	{
		name: "Standard",
		price: "$39",
		tag: "The full fourth dimension",
		items: [
			"Full game on release",
			"Original soundtrack",
			"Interactive 4D brane viewer",
			"All Phase-Slide modes"
		],
		featured: true
	},
	{
		name: "Collector's",
		price: "$79",
		tag: "For the dimension-curious",
		items: [
			"Everything in Standard",
			"Behind-the-scenes devlog",
			"Alternate hyper-skins",
			"Digital hypercube figurine"
		],
		featured: false
	},
	{
		name: "Patron",
		price: "$199",
		tag: "Co-author the transdimension",
		items: [
			"Everything in Collector's",
			"Executive producer credit",
			"Design-input session",
			"Signed manifesto PDF"
		],
		featured: false
	}
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border bg-bg/80 backdrop-blur-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#top",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeltaMark, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-display text-lg tracking-[0.18em]",
								children: ["NESTRIS ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-accent",
									children: "Δ"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-8 text-sm text-muted md:flex",
							children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: n.href,
								className: "transition-colors hover:text-fg",
								children: n.label
							}, n.href))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#editions",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "h-10 px-4",
								children: "Pre-order"
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "top",
				className: "relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--color-accent)_12%,transparent),transparent_62%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl items-center gap-6 px-5 py-16 lg:grid-cols-2 lg:py-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stagger-in relative z-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] tracking-[0.32em] text-accent uppercase",
								children: "Transdimensional puzzle"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-4 font-display text-6xl leading-[0.9] tracking-tight sm:text-8xl",
								children: ["NESTRIS ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-accent",
									children: "Δ"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-md text-lg text-muted",
								children: "The ternary mating product. Three tetrominoes, three perpendicular planes, one hidden fourth axis. The successor to NESTRIS 3D pushes the puzzle one dimension up."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#editions",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Pre-order now" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/play",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											children: "Play the prototype"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#leap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											children: "Explore the math"
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-12 flex gap-8 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
										value: "192",
										label: "rotation group"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
										value: "4D",
										label: "state lattice"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
										value: "3",
										label: "mating parents"
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TesseractHero, {})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "leap",
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-5 py-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] tracking-[0.32em] text-subtle uppercase",
							children: "The transdimensional leap"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-4xl sm:text-5xl",
							children: "From binary to ternary mating"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-2xl text-muted",
							children: "The 3D game mates two tetrominoes in perpendicular planes sharing the vertical axis. NESTRIS Δ mates three — opening a hidden fourth axis, w, in the unique minimal generalization: each added parent opens exactly one new spatial dimension."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 grid gap-4 md:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathCard, {
								title: "NESTRIS 3D",
								formula: "𝟙_M(x,y,z) = 𝟙_A(x,z) · 𝟙_B(y,z)",
								note: "binary · 2 parents"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathCard, {
								title: "NESTRIS Δ",
								formula: "𝟙_M(x,y,z,w) = 𝟙_A(x,z) · 𝟙_B(y,z) · 𝟙_C(w,z)",
								note: "ternary · 3 parents · V(M) = Σ_z r_A·r_B·r_C",
								accent: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-10 max-w-2xl text-muted",
							children: "The engine is a full 4D integer lattice — but the player sees and touches one 3D “brane” slice at a time, phasing between branes. True 4D state, 3D operational interface: that discriminating constraint is the whole game."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-5 py-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] tracking-[0.32em] text-subtle uppercase",
							children: "How the ancestors escalate"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-4xl",
							children: "3D → Δ, dimension by dimension"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 overflow-x-auto rounded-xl border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full min-w-[640px] text-left text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-surface-2 text-[11px] tracking-[0.18em] uppercase text-subtle",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3 font-medium",
											children: "Concept"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3 font-medium",
											children: "NESTRIS 3D"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3 font-medium text-accent",
											children: "NESTRIS Δ"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: ROWS.map(([a, b, c]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-border",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-muted",
											children: a
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-fg/80",
											children: b
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-fg",
											children: c
										})
									]
								}, a)) })]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "mechanics",
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-5 py-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] tracking-[0.32em] text-subtle uppercase",
							children: "New transdimensional mechanics"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-4xl",
							children: "Play across the fourth axis"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid gap-4 md:grid-cols-2",
							children: MECHANICS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rounded-xl border border-border bg-surface p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl",
									children: m.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-muted",
									children: m.body
								})]
							}, m.title))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 grid gap-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
									k: "HYPERCRADLE",
									v: "26-cell overhang"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
									k: "REACTOR",
									v: "2⁴ tesseract · V=16"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
									k: "PLATE",
									v: "V=64"
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "editions",
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-5 py-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] tracking-[0.32em] text-subtle uppercase",
							children: "Editions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-4xl",
							children: "Claim your axis"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-muted",
							children: "Pre-order funds the v0.2 census and the reference implementation. Every tier includes a place on the waitlist."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4",
							children: EDITIONS.map((ed) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: cn("relative flex flex-col rounded-xl border bg-surface p-5", ed.featured ? "border-accent/50" : "border-border"),
								children: [
									ed.featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -top-3 left-4 rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium tracking-[0.14em] text-accent-fg uppercase",
										children: "Most chosen"
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-2xl",
										children: ed.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 font-display text-4xl tabular-nums",
										children: ed.price
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted",
										children: ed.tag
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-5 flex flex-1 flex-col gap-2 text-sm text-fg/85",
										children: ed.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1 shrink-0 rounded-full bg-accent" }), it]
										}, it))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#waitlist",
										className: "mt-6",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: ed.featured ? "primary" : "outline",
											className: "w-full",
											children: ["Reserve ", ed.name]
										})
									})
								]
							}, ed.name))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "waitlist",
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl items-start gap-10 px-5 py-20 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] tracking-[0.32em] text-subtle uppercase",
							children: "Join the waitlist"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-4xl",
							children: "Phase into the build"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-md text-muted",
							children: "Reserve your edition. We open the gate in waves — early access ships with the v0.2 census."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaitlistForm, {})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display tracking-[0.18em] text-muted",
						children: ["NESTRIS ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-accent",
							children: "Δ"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "A transdimensional mating puzzle · v0.1 spec" })]
				})
			})
		]
	});
}
function Metric({ value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "font-display text-3xl leading-none",
		children: value
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1 text-[11px] tracking-[0.16em] text-subtle uppercase",
		children: label
	})] });
}
function MathCard({ title, formula, note, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-xl border bg-surface p-6", accent ? "border-accent/40" : "border-border"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("text-[11px] tracking-[0.2em] uppercase", accent ? "text-accent" : "text-subtle"),
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "mt-4 overflow-x-auto font-mono text-sm text-fg",
				children: formula
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 text-sm text-muted",
				children: note
			})
		]
	});
}
function Callout({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-surface-2 px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] tracking-[0.2em] text-subtle uppercase",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 text-sm text-fg",
			children: v
		})]
	});
}
//#endregion
export { Home as component };
