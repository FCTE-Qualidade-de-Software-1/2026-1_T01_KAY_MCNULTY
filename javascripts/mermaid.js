document$.subscribe(async () => {
  const { default: mermaid } = await import("https://unpkg.com/mermaid@11/dist/mermaid.esm.min.mjs")
  mermaid.initialize({ startOnLoad: false })
  await mermaid.run({ querySelector: ".mermaid" })
})
