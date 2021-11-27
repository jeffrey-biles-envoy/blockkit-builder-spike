import _ from 'lodash'
import Head from 'next/head'
import { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror';

export default function Home() {
  const [exampleJSON, editExampleJSON] = useState([
    {
      type: 'button',
      text: "It's my button"
    },
    {
      type: 'text',
      text: "I can make text"
    },
    {
      type: 'header',
      text: 'and headers'
    }
  ])

  const renderComponent = function(c) {
    if(c.type == 'button') {
      return (
        <button>{c.text}</button>
      )
    } else if(c.type == 'text') {
      return (
        <p>{c.text}</p>
      )
    } else if(c.type == 'header') {
      return (
        <h2>{c.text}</h2>
      )
    }
  }

  const addText = function(){
    editExampleJSON([...exampleJSON, {type: 'text', text: "I added some text"}])
  }
  const addHeader = function(){
    editExampleJSON([...exampleJSON, {type: 'header', text: 'I added a header'}])
  }
  const addButton = function(){
    editExampleJSON([...exampleJSON, {type: 'button', text: 'I added a button'}])
  }

  const onEditorUpdate = function(editorState) {
    const editorText = JSON.parse(editorState.state.doc.text.join('\n'))
    console.log(editorText, exampleJSON)
    if(!_.isEqual(editorText, exampleJSON)) {
      editExampleJSON(editorText)
    }
  }

  return (
    <div className="container">

      <main>
        <div className="grid">
          <div className="left-bar">
            <button onClick={addText}>+ text</button>
            <button onClick={addHeader}>+ header</button>
            <button onClick={addButton}>+ button</button>
          </div>
          <div className="preview">
            {exampleJSON.map(c => renderComponent(c))}
          </div>
          <div className="editor">
            <CodeMirror
              value={JSON.stringify(exampleJSON, null, 2)}
              onChange={(value, viewUpdate) => {
                editExampleJSON(JSON.parse(value))
              }}
            />
          </div>
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          width: 1020px;
          margin-top: 3rem;
        }

        .left-bar {
          width: 120px;
        }

        .left-bar button {
          width: 90%;
        }

        .preview {
          width: 400px;
        }

        .editor {
          width: 500px;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        button {
          cursor: pointer;
          padding: 8px;
          margin-top: 8px;
        }
      `}</style>
    </div>
  )
}
