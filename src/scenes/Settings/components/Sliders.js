import React from 'react'
import { Slider } from './components/Slider'

const Sliders = () => {
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

  return (
    <>
      <Slider
        name="Work duration"
        defaultValue={25}
        marks={workMarks}
        step={5}
        min={5}
        max={60}
        unit="minutes"
      />

      <Slider
        name="Short break duration"
        defaultValue={5}
        marks={shortBreakMarks}
        step={5}
        min={5}
        max={30}
        unit="minutes"
      />

      <Slider
        name="Long break duration"
        defaultValue={20}
        marks={longBreakMarks}
        step={5}
        min={5}
        max={45}
        unit="minutes"
      />

      <Slider
        name="Rounds number"
        defaultValue={4}
        marks={roundsMarks}
        step={1}
        min={2}
        max={15}
        unit="rounds"
      />
    </>
  )
}

export { Sliders }
