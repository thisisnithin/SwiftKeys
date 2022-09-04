import { cx } from '@emotion/css'
import randomWords from 'random-words'
import React, { useCallback } from 'react'
import { useEffect, useState } from 'react'
import { FaUndo } from 'react-icons/fa'
import { MdSpaceBar } from 'react-icons/md'
import Button from 'src/components/ui/Button'
import useCountdown from 'src/utils/useCountdown'
import { useMutation } from '../generated/nextjs'

type History = {
  word: string
  correct: boolean
}

const Results = ({
  history,
  timer,
  init,
}: {
  history: History[]
  timer: number
  init: () => void
}) => {
  const { mutate } = useMutation.saveResult()

  useEffect(() => {
    mutate({
      input: {
        accuracy:
          Math.round(
            (history.filter(h => h.correct).length / history.length) * 100
          ) || 0,
        correct: history.filter(h => h.correct).length,
        wpm: Math.round((history.filter(h => h.correct).length / timer) * 60),
        wrong: history.filter(h => !h.correct).length,
        time: timer,
      },
    })
  }, [history, mutate, timer])

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-y-12 overflow-x-hidden px-4'>
      <div className='flex flex-col gap-y-6 border px-8 pt-6 pb-12'>
        <h1 className='mx-auto -mt-10 w-max bg-zinc-900 px-4 text-2xl font-bold lg:m-0 lg:-mt-12 lg:text-4xl'>
          Results
        </h1>
        <div className='flex items-center gap-x-12 lg:gap-x-24'>
          {/* WPM */}
          <div className='flex flex-col items-start gap-y-2'>
            <p className='text-lg font-bold text-gray-300 lg:text-2xl'>wpm</p>
            <h2 className='text-4xl font-bold lg:text-7xl'>
              {Math.round((history.filter(h => h.correct).length / timer) * 60)}
            </h2>
          </div>
          {/* Accuracy */}
          <div className='flex flex-col items-start gap-y-2'>
            <p className='text-lg font-bold text-gray-300 lg:text-2xl'>acc</p>
            <h2 className='text-4xl font-bold lg:text-7xl'>
              {Math.round(
                (history.filter(h => h.correct).length / history.length) * 100
              ) || 0}
              %
            </h2>
          </div>
          {/* Correct words */}
          <div className='flex flex-col items-start gap-y-2'>
            <p className='text-lg font-bold text-gray-300 lg:text-2xl'>
              correct
            </p>
            <h2 className='text-4xl font-bold lg:text-7xl'>
              {history.filter(h => h.correct).length}
            </h2>
          </div>
          {/* Wrong words */}
          <div className='flex flex-col items-start gap-y-2'>
            <p className='text-lg font-bold text-gray-300 lg:text-2xl'>wrong</p>
            <h2 className='text-4xl font-bold lg:text-7xl'>
              {history.filter(h => !h.correct).length}
            </h2>
          </div>
        </div>
      </div>

      <Button
        className='mx-auto text-gray-400 hover:text-white'
        appearance='none'
        leftIcon={<FaUndo />}
        onClick={() => init()}
      >
        Reset
      </Button>
    </div>
  )
}

const Test = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentWordInput, setCurrentWordInput] = useState('')
  const [history, setHistory] = useState<History[]>([])
  const [isTestRunning, setIsTestRunning] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [timer, setTimer] = useState(30)
  const [snippet, setSnippet] = useState<string[]>([])

  const { timeLeft, start, reset } = useCountdown(timer * 1000, 1000)

  const init = useCallback(() => {
    const words = randomWords(40)
    setCurrentWordInput('')
    setCurrentWordIndex(0)
    setHistory([])
    setIsTestRunning(false)
    setShowResults(false)
    setSnippet(words)
    reset()
    document.getElementById('word-input')?.focus()
  }, [reset])

  useEffect(() => init(), [init])

  useEffect(() => {
    if (timeLeft === 0) {
      setIsTestRunning(false)
      setShowResults(true)
    }
  }, [timeLeft])

  if (showResults) {
    return <Results history={history} timer={timer} init={init} />
  }

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-y-4 '>
      {/* Your area */}
      <div className='flex w-full flex-wrap items-start text-3xl'>
        {snippet.map((word, wi) => (
          <div
            className={cx('my-1 mr-1 rounded-sm px-1.5 py-px', {
              'bg-zinc-700 transition-all': wi === currentWordIndex,
              'bg-red-800':
                wi === currentWordIndex &&
                currentWordInput !== word &&
                currentWordInput.length >= word.length,
            })}
            key={word + wi}
          >
            {word.split('').map((letter, li) => (
              <span
                className={cx({
                  'text-gray-500': wi !== currentWordIndex,
                  'text-gray-300': wi === currentWordIndex,
                  'text-red-500':
                    wi < currentWordIndex && !history[wi]?.correct,
                  '!text-white': wi < currentWordIndex && history[wi].correct,
                })}
                key={letter + li}
              >
                {letter}
              </span>
            ))}
          </div>
        ))}
      </div>
      {/* Input */}
      <div className='flex w-full items-center rounded-md border border-gray-600 transition-colors focus-within:border-gray-300'>
        <input
          id='word-input'
          autoFocus
          className='w-full bg-transparent px-4 py-2.5 text-3xl focus:outline-none'
          value={currentWordInput}
          onChange={e => {
            if (e.target.value !== ' ') {
              if (!isTestRunning) {
                setIsTestRunning(true)
                start(timer * 1000)
              }
              setCurrentWordInput(e.target.value)
            }
          }}
          onKeyDown={e => {
            if (e.key === ' ' && currentWordInput.length > 0) {
              setHistory([
                ...history,
                {
                  word: currentWordInput,
                  correct: currentWordInput === snippet[currentWordIndex],
                },
              ])
              setCurrentWordInput('')
              setCurrentWordIndex(currentWordIndex + 1)
            }
          }}
        />
        {isTestRunning && (
          <p className='flex-shrink-0'>{timeLeft / 1000 || 'Time up!'}</p>
        )}
        <kbd className='mx-4 rounded-sm bg-gray-600 px-2 py-px'>
          <MdSpaceBar size={36} />
        </kbd>
      </div>
      <div className='relative mt-12 flex w-full items-center'>
        <div className='flex gap-x-4'>
          <button
            type='button'
            className={cx('h-7 w-7 rounded-sm text-white transition-all', {
              'bg-blue-700': timer === 15,
            })}
            onClick={() => setTimer(15)}
          >
            15
          </button>
          <button
            type='button'
            className={cx('h-7 w-7 rounded-sm text-white transition-all', {
              'bg-blue-700': timer === 30,
            })}
            onClick={() => setTimer(30)}
          >
            30
          </button>
          <button
            type='button'
            className={cx('h-7 w-7 rounded-sm text-white transition-all', {
              'bg-blue-700': timer === 45,
            })}
            onClick={() => setTimer(45)}
          >
            45
          </button>
          <button
            type='button'
            className={cx('h-7 w-7 rounded-sm text-white transition-all', {
              'bg-blue-700': timer === 60,
            })}
            onClick={() => setTimer(60)}
          >
            60
          </button>
        </div>
        <Button
          className='absolute left-0 right-0 mx-auto text-gray-400 hover:text-white'
          appearance='none'
          leftIcon={<FaUndo />}
          onClick={() => init()}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

export default Test
