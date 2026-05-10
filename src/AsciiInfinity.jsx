import { useEffect, useRef } from 'react'

const W = 121
const H = 55
const CHARS = ' .,:-=+*#@'
const TUBE_STEPS = 200
const TUBE_DETAIL = 22
const SCALE = 1.6
const R = 0.24
const K2 = 5.2       // camera distance
const K1 = 52.8      // projection scale
const ASPECT = 2.4 // char height/width correction

export default function AsciiInfinity() {
  const preRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef(null)

  useEffect(() => {
    const el = preRef.current
    if (!el) return

    let rotX = 0.4
    let rotY = 0.0
    let isDragging = false
    let paused = false
    let lastX = 0
    let lastY = 0

    const onMouseDown = (e) => { isDragging = true; lastX = e.clientX; lastY = e.clientY }
    const onMouseUp = () => { isDragging = false }
    const onMouseMove = (e) => {
      if (!isDragging) return
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      rotY += dx * 0.01
      rotX += dy * 0.01
      lastX = e.clientX
      lastY = e.clientY
    }
    const onKeyDown = (e) => { if (e.code === 'Space') { e.preventDefault(); paused = !paused } }

    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('keydown', onKeyDown)

    function tick() {
      if (!paused) rotY += 0.006

      const cosX = Math.cos(rotX), sinX = Math.sin(rotX)
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY)

      // Rotate vector around X then Y
      function rotate(px, py, pz) {
        const y1 = py * cosX - pz * sinX
        const z1 = py * sinX + pz * cosX
        const x2 = px * cosY + z1 * sinY
        const z2 = -px * sinY + z1 * cosY
        return [x2, y1, z2]
      }

      const zbuf = new Float32Array(W * H).fill(-Infinity)
      const cbuf = new Uint8Array(W * H)

      for (let si = 0; si < TUBE_STEPS; si++) {
        const t = (si / TUBE_STEPS) * Math.PI * 2

        // Lissajous infinity: x=cos(t), y=sin(2t)/2
        const cx = SCALE * Math.cos(t)
        const cy = SCALE * 0.5 * Math.sin(2 * t)

        // Analytical tangent
        const dtx = -SCALE * Math.sin(t)
        const dty = SCALE * Math.cos(2 * t)
        const tlen = Math.sqrt(dtx * dtx + dty * dty) || 1
        const tux = dtx / tlen
        const tuy = dty / tlen

        // Frame: n1 = out-of-plane, n2 = in-plane perpendicular to tangent
        const n2x = -tuy, n2y = tux

        for (let ti = 0; ti < TUBE_DETAIL; ti++) {
          const phi = (ti / TUBE_DETAIL) * Math.PI * 2
          const cp = Math.cos(phi), sp = Math.sin(phi)

          // Surface point (n1 is (0,0,1))
          const px = cx + R * (n2x * sp)
          const py = cy + R * (n2y * sp)
          const pz =      R * cp           // n1.z = 1

          // Surface normal
          const snx = n2x * sp
          const sny = n2y * sp
          const snz = cp

          const [fx, fy, fz] = rotate(px, py, pz)
          const [nx, ny, nz] = rotate(snx, sny, snz)

          const depth = fz + K2
          if (depth <= 0.01) continue
          const ooz = 1 / depth

          const sx = Math.floor(W / 2 + K1 * ooz * fx * ASPECT)
          const sy = Math.floor(H / 2 - K1 * ooz * fy)
          if (sx < 0 || sx >= W || sy < 0 || sy >= H) continue

          const idx = sx + sy * W
          if (ooz > zbuf[idx]) {
            zbuf[idx] = ooz
            // Diffuse lighting from front-upper-left
            const L = nx * 0.4 + ny * -0.3 + nz * -0.9
            const ci = Math.max(0, Math.min(CHARS.length - 1,
              Math.floor((L + 1) * 0.5 * (CHARS.length - 1))))
            cbuf[idx] = ci
          }
        }
      }

      let str = ''
      for (let r = 0; r < H; r++) {
        for (let c = 0; c < W; c++) str += CHARS[cbuf[c + r * W]]
        str += '\n'
      }
      el.textContent = str

      frameRef.current = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('keydown', onKeyDown)
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <pre
      ref={preRef}
      style={{
        margin: 0,
        fontFamily: 'monospace',
        fontSize: '13px',
        lineHeight: '1.2',
        color: '#000',
        userSelect: 'none',
        pointerEvents: 'auto',
        cursor: 'grab',
      }}
    />
  )
}
