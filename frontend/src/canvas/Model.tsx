import React, { useState, useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const Model = ({ selectedColor }) => {
	const { scene } = useGLTF('/airforce1.glb')
	const [hoveredObject, setHoveredObject] = useState(null)
	const [selectedObjectColors, setSelectedObjectColors] = useState({})
	const raycaster = useRef(new THREE.Raycaster())
	const mouse = useRef(new THREE.Vector2())

	const handleMouseMove = event => {
		mouse.current.x = (event.clientX / window.innerWidth) * 1.75 - 1
		mouse.current.y = -(event.clientY / window.innerHeight) * 1.75 + 1
	}

	const handleClick = () => {
		if (hoveredObject) {
			setSelectedObjectColors(prevColors => ({
				...prevColors,
				[hoveredObject.uuid]: selectedColor,
			}))
		}
	}

	useEffect(() => {
		const onDocumentMouseMove = event => {
			handleMouseMove(event)
		}
		const onDocumentClick = () => {
			handleClick()
		}

		window.addEventListener('mousemove', onDocumentMouseMove)
		window.addEventListener('click', onDocumentClick)

		return () => {
			window.removeEventListener('mousemove', onDocumentMouseMove)
			window.removeEventListener('click', onDocumentClick)
		}
	}, [hoveredObject, selectedColor])

	useFrame(state => {
		raycaster.current.setFromCamera(mouse.current, state.camera)
		const intersects = raycaster.current.intersectObjects(scene.children, true)
		if (intersects.length > 0) {
			const firstIntersectedObject = intersects[0].object
			setHoveredObject(firstIntersectedObject)
		} else {
			setHoveredObject(null)
		}

		scene.traverse(object => {
			if (object.isMesh) {
				if (selectedObjectColors[object.uuid] !== undefined) {
					object.material.color.set(selectedObjectColors[object.uuid])
					if (object === hoveredObject) {
						const color = new THREE.Color(selectedObjectColors[object.uuid])
						object.material.emissive.set(color.multiplyScalar(0.5))
					} else {
						object.material.emissive.setHex(0x000000)
					}
				} else if (object === hoveredObject) {
					const color = new THREE.Color(object.material.color.getHex())
					object.material.emissive.set(color.multiplyScalar(0.5))
				} else {
					object.material.emissive.setHex(0x000000)
				}
			}
		})
	})

	return <primitive object={scene} />
}

export default Model
