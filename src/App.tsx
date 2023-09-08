import { useEffect, useState } from 'react'
import './App.css'

type ActiveItem = {
  number: number;
  active: boolean;
  position: number[];
}

function initializeBoardItems() {
  return [
    [{number: 1, active: false}, {number: 5, active: false}, {number: 6, active: false}, {number: 4, active: false}],
    [{number: 2, active: false}, {number: 5, active: false}, {number: 4, active: false}, {number: 2, active: false}],
    [{number: 3, active: false}, {number: 6, active: false}, {number: 3, active: false}, {number: 1, active: false}],
  ]
}

function App() {
  const [boardItems, setBoardItems] = useState(initializeBoardItems())
  const [activeItem, setActiveItem] = useState<ActiveItem | null>(null)
  const [matches, setMatches] = useState<number[]>([])
  const [isBoardBlocked, setIsBoardBlocked] = useState(false)

  useEffect(() => {
    
    // If there is an active item, check if they match (same number)
    
    
  }, [activeItem])

  function handleItemOnClick(rowIdx: number, colIdx: number) {
    if (isBoardBlocked) return
    if (activeItem?.position[0] === rowIdx && activeItem?.position[1] === colIdx) return

    // If there is no active item, set clicked item to active   
    const newBoardItems = [...boardItems]
    const newRow = boardItems[rowIdx]
    const newItem = newRow[colIdx]

    newItem.active = true
    newBoardItems[rowIdx][colIdx] = newItem

    if(activeItem) {
      
      setIsBoardBlocked(true)

      if (activeItem.number === newItem.number) {
        setMatches([...matches, activeItem.number])      
        setActiveItem(null)
        setIsBoardBlocked(false)
        return
      }

      setBoardItems(newBoardItems)
      setActiveItem(null)

      setTimeout(() => {
        setBoardItems(initializeBoardItems())
        setIsBoardBlocked(false)
      }, 2000)
      return
    }

    setBoardItems(newBoardItems)
    setActiveItem({...newItem, position: [rowIdx, colIdx]})
  }

  return (
    <main className="main">
      <h1>Memory Game</h1>

      <div className={'board'}>
        {boardItems.map((row, rowIdx) => (
          <div key={rowIdx} className='row'>
            {row.map((col, colIdx) => (
              <span 
                key={colIdx} 
                className={`item${col.active ? ' active' : ''}${matches.includes(col.number) ? ' match' :''}${isBoardBlocked ? ' blocked' : ''}`}
                onClick={() => handleItemOnClick(rowIdx, colIdx)}
              >
                {col.number}
              </span>
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}

export default App
