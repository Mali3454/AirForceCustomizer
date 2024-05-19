import React, { useState, ChangeEvent } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Model from './Model'
import ColorPicker from '../components/Aside/ColorPicker'

const ModelViewer: React.FC = () => {
	const [selectedColor, setSelectedColor] = useState<string>('#ffffff')

	const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSelectedColor(event.target.value)
	}

	return (
		<div className='w-full h-full'>
			<ColorPicker selectedColor={selectedColor} onColorChange={handleColorChange} />
			<Canvas>
				<ambientLight intensity={0.5} />
				<Environment preset='city' />
				<Model selectedColor={selectedColor} />
				<OrbitControls />
			</Canvas>
		</div>
	)
}

export default ModelViewer
