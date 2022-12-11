import { useState } from 'react'
import './App.css'

function App() {
  const [borderTopLeftRadius, setBorderTopLeftRadius] = useState(20)
  const [borderTopRightRadius, setBorderTopRightRadius] = useState(20)
  const [borderBottomLeftRadius, setBorderBottomLefttRadius] = useState(20)
  const [borderBottomRightRadius, setBorderBottomRightRadius] = useState(20)

  const [copied, setCopied] = useState(false)

  function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement('textarea')
    textArea.value = text

    // Avoid scrolling to bottom
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      var successful = document.execCommand('copy')
      var msg = successful ? 'successful' : 'unsuccessful'
      console.log('Fallback: Copying text command was ' + msg)
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err)
    }

    document.body.removeChild(textArea)
  }
  function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text)
      return
    }
    navigator.clipboard.writeText(text).then(
      function () {
        setCopied(true)
        console.log('Async: Copying to clipboard was successful!')
        return true
      },
      function (err) {
        console.error('Async: Could not copy text: ', err)
      }
    )
  }

  const getCSS = () => {
    return `border-radius: ${borderTopLeftRadius}px ${borderTopRightRadius}px ${borderBottomRightRadius}px ${borderBottomLeftRadius}px;`
  }

  return (
    <div className='App'>
      <div style={{ position: 'relative' }}>
        <h1>Border Radius Previewer</h1>

        <div className='copy-box'>
          <p>{getCSS()}</p>
          <p
            className='copy-to-clipboard'
            onClick={() => copyTextToClipboard(getCSS())}
            onMouseEnter={() => setCopied(false)}
          >
            {!copied ? 'Copy To Clipboard!' : 'Copy Successfull'}
          </p>
        </div>

        <div className='block'>
        <div className='radius-input top-left'>
          <input
            type='text'
            value={borderTopLeftRadius}
            onChange={(e) => setBorderTopLeftRadius(e.target.value)}
          />{' '}
          px
        </div>
        <div className='radius-input top-right'>
          <input
            type='text'
            value={borderTopRightRadius}
            onChange={(e) => setBorderTopRightRadius(`${e.target.value}`)}
          />{' '}
          px
        </div>
        <div className='radius-input bottom-left'>
          <input
            type='text'
            value={borderBottomLeftRadius}
            onChange={(e) => setBorderBottomLefttRadius(`${e.target.value}`)}
          />{' '}
          px
        </div>

        <div className='radius-input bottom-right'>
          <input
            type='text'
            value={borderBottomRightRadius}
            onChange={(e) => setBorderBottomRightRadius(`${e.target.value}`)}
          />{' '}
          px
        </div>

        <div
          style={{
            borderTopLeftRadius: `${borderTopLeftRadius}px`,
            borderTopRightRadius: `${borderTopRightRadius}px`,
            borderBottomLeftRadius: `${borderBottomLeftRadius}px`,
            borderBottomRightRadius: `${borderBottomRightRadius}px`,
            width: '300px',
            height: '300px',
            border: '2px solid red',
          }}
        ></div>
        </div>
      </div>
    </div>
  )
}

export default App
