import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#0d0d0d',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#f5f5f0',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="34" height="34" stroke="#f5f5f0" strokeWidth="1.5" />
          <path d="M9 11h18L9 25h18" stroke="#f5f5f0" strokeWidth="2" strokeLinecap="square" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
