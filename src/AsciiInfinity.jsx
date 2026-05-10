import { useEffect, useRef } from 'react'

const CHARS = ' .,:-=+*#@'
const TUBE_STEPS = 200
const TUBE_DETAIL = 22
const SCALE = 1.6
const R = 0.24
const K2 = 5.2
const ASPECT = 2.4

export default function AsciiInfinity({ w = 121, h = 55, k1 = 52.8 }) {
  const preRef = useRef(null)
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
    const onTouchStart = (e) => {
      const rect = el.getBoundingClientRect()
      const touch = e.touches[0]
      if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
          touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
        isDragging = true
        lastX = touch.clientX
        lastY = touch.clientY
      }
    }
    const onTouchEnd = () => { isDragging = false }
    const onTouchMove = (e) => {
      if (!isDragging) return
      e.preventDefault()
      const dx = e.touches[0].clientX - lastX
      const dy = e.touches[0].clientY - lastY
      rotY += dx * 0.01
      rotX += dy * 0.01
      lastX = e.touches[0].clientX
      lastY = e.touches[0].clientY
    }
    const onKeyDown = (e) => { if (e.code === 'Space') { e.preventDefault(); paused = !paused } }

    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('keydown', onKeyDown)

    function tick() {
      if (!paused) rotY += 0.006

      const cosX = Math.cos(rotX), sinX = Math.sin(rotX)
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY)

      function rotate(px, py, pz) {
        const y1 = py * cosX - pz * sinX
        const z1 = py * sinX + pz * cosX
        const x2 = px * cosY + z1 * sinY
        return [x2, y1, -px * sinY + z1 * cosY]
      }

      const zbuf = new Float32Array(w * h).fill(-Infinity)
      const cbuf = new Uint8Array(w * h)

      for (let si = 0; si < TUBE_STEPS; si++) {
        const t = (si / TUBE_STEPS) * Math.PI * 2
        const cx = SCALE * Math.cos(t)
        const cy = SCALE * 0.5 * Math.sin(2 * t)
        const dtx = -SCALE * Math.sin(t)
        const dty = SCALE * Math.cos(2 * t)
        const tlen = Math.sqrt(dtx * dtx + dty * dty) || 1
        const n2x = -dty / tlen, n2y = dtx / tlen

        for (let ti = 0; ti < TUBE_DETAIL; ti++) {
          const phi = (ti / TUBE_DETAIL) * Math.PI * 2
          const cp = Math.cos(phi), sp = Math.sin(phi)

          const px = cx + R * (n2x * sp)
          const py = cy + R * (n2y * sp)
          const pz = R * cp

          const [fx, fy, fz] = rotate(px, py, pz)
          const [nx, ny] = rotate(n2x * sp, n2y * sp, cp)

          const depth = fz + K2
          if (depth <= 0.01) continue
          const ooz = 1 / depth

          const sx = Math.floor(w / 2 + k1 * ooz * fx * ASPECT)
          const sy = Math.floor(h / 2 - k1 * ooz * fy)
          if (sx < 0 || sx >= w || sy < 0 || sy >= h) continue

          const idx = sx + sy * w
          if (ooz > zbuf[idx]) {
            zbuf[idx] = ooz
            const L = Math.abs(nx * 0.4 + ny * -0.3 + cp * -0.9)
            const ci = Math.max(0, Math.min(CHARS.length - 1,
              Math.floor(L * (CHARS.length - 1))))
            cbuf[idx] = ci
          }
        }
      }

      let str = ''
      for (let r = 0; r < h; r++) {
        for (let c = 0; c < w; c++) str += CHARS[cbuf[c + r * w]]
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
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKeyDown)
      cancelAnimationFrame(frameRef.current)
    }
  }, [w, h, k1])

  return (
    <pre
      ref={preRef}
      className="ascii-pre"
      style={{
        margin: 0,
        fontFamily: 'monospace',
        fontSize: '13px',
        lineHeight: '1.2',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    />
  )
}
