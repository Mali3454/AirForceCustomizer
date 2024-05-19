import React from 'react'

interface ColorPickerProps {
	selectedColor: string
	onColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorChange }) => {
	return (
		<div className='flex flex-col items-center p-4'>
			<label className='mb-2 text-gray-700 text-sm font-medium'>Wybierz kolor:</label>
			<input
				type='color'
				value={selectedColor}
				onChange={onColorChange}
				className='w-16 h-16 border-2 border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500'
			/>
		</div>
	)
}

export default ColorPicker
