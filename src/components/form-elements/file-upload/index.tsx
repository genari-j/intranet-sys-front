import { useRef } from 'react'

import { Textfield } from '~/components'

import { CloudUpload } from '~/assets'

interface FileUploadProps {
	files: File[]
	onFileChange: (files: File[]) => void
	isDragging: boolean
	setIsDragging: (isDragging: boolean) => void
}

export const FileUpload = ({ files, onFileChange, isDragging, setIsDragging }: FileUploadProps) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragging(false)
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			const droppedFiles = Array.from(e.dataTransfer.files)
			onFileChange(droppedFiles)
			e.dataTransfer.clearData()
		}
	}

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragging(true)
	}

	const handleDragLeave = () => setIsDragging(false)

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const selectedFiles = Array.from(e.target.files)
			onFileChange(selectedFiles)
		}
	}

	return (
		<div
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			onClick={() => inputRef.current?.click()}
			className={`flex flex-col items-center justify-center w-full h-35 relative cursor-pointer border-dashed border-2 rounded-lg transition-colors duration-300 ${isDragging ? 'border-teal-600 bg-teal-50' : 'border-gray-300 bg-white'}`}
		>
			<Textfield
				className="hidden"
				id="avatar"
				type="file"
				multiple
				label={
					<div className="w-full flex flex-col items-center gap-1 cursor-pointer font-medium">
						<p className="flex items-center gap-1">
							<CloudUpload size={23} /> Arraste os arquivos aqui ou
						</p>
						<p className="text-teal-600 underline">clique para selecionar</p>
					</div>
				}
				placeholder="Avatar"
				ref={inputRef}
				onChange={handleFileChange}
			/>
			{files.length > 0 && (
				<span className="absolute left-1 bottom-1 text-sm">📄 Total de arquivos: {files.length}</span>
			)}
		</div>
	)
}
