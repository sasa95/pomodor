import React from 'react'
import { useSelector } from 'react-redux'
import { Slider } from './components/Slider'
import {
  startSetWorkDuration,
  startSetShortBreakDuration,
  startSetLongBreakDuration,
  startSetRounds,
} from '../../../data/settings/actions'

export const Sliders = () => {
  const {
    workDuration,
    shortBreakDuration,
    longBreakDuration,
    rounds,
  } = useSelector((state) => state.settings)

  return (
    <>
      <Slider
        name="Work duration"
        marks={workMarks}
        step={5}
        min={5}
        max={60}
        unit="minutes"
        action={startSetWorkDuration}
        value={workDuration}
      />

      <Slider
        name="Short break duration"
        value={shortBreakDuration}
        marks={shortBreakMarks}
        step={5}
        min={5}
        max={30}
        unit="minutes"
        action={startSetShortBreakDuration}
      />

      <Slider
        name="Long break duration"
        value={longBreakDuration}
        marks={longBreakMarks}
        step={5}
        min={5}
        max={45}
        unit="minutes"
        action={startSetLongBreakDuration}
      />

      <Slider
        name="Rounds"
        value={rounds}
        marks={roundsMarks}
        step={1}
        min={2}
        max={15}
        unit="rounds"
        action={startSetRounds}
      />
    </>
  )
}

const workMarks = [
  {
    value: 5,
    label: '5 min',
  },
  {
    value: 25,
    label: '25 min',
  },
  {
    value: 60,
    label: '60 min',
  },
]

const shortBreakMarks = [
  {
    value: 5,
    label: '5 min',
  },
  {
    value: 30,
    label: '30 min',
  },
]

const longBreakMarks = [
  {
    value: 5,
    label: '5 min',
  },
  {
    value: 20,
    label: '20 min',
  },
  {
    value: 45,
    label: '45 min',
  },
]

const roundsMarks = [
  {
    value: 2,
    label: '2',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 15,
    label: '15',
  },
]
