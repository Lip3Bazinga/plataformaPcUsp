import { styles } from '@/app/styles/styles'
import { FC, useState } from 'react'

type Props = {
  courseInfo: any,
  setCourseInfo: (courseInfo: any) => void
  active: number,
  setActive: (active: number) => void
}

const CourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {

  const [dragging, setDragging] = useState(false)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setActive(active + 1)
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()

      reader.onload = (e: any) => {
        if (reader.readyState === 2) setCourseInfo({ ...courseInfo, thumbnail: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: any) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = (e: any) => {
    e.preventDefault()
    setDragging(false)
  }

  const handleDrop = (e: any) => {
    e.preventDefault()
    setDragging(false)

    const file = e.dataTransfer.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor="">
            Nome do curso
          </label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) => setCourseInfo({ ...courseInfo, name: e.target.value })}
            id="name"
            placeholder="Curso avançado de I.A com Python"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="">
          <label className={`${styles.label}`} htmlFor="">
            Descrição do curso
          </label>
          <textarea name="" id="" cols={30} rows={8} placeholder="Escreva sobre o curso..." className={`${styles.input} !h-min !py-2`} value={courseInfo.description} onChange={(e: any) => setCourseInfo({ ...courseInfo, description: e.target.value })}>
          </textarea>
        </div>
        {/*<div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Ranking necessário</label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.price}
              onChange={(e: any) => setCourseInfo({ ...courseInfo, price: e.target.value })}
              id="price"
              placeholder="Nível 10"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label}`}>Preço do estimado</label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.estimatedPrice}
              onChange={(e: any) => setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })}
              id="price"
              placeholder="99.99"
              className={`${styles.input}`}
            />
          </div>
        </div>
        */}
        <br />
        <div className="">
          <label className={`${styles.label}`}>Tags do Curso</label>
          <input
            type="text"
            name=""
            required
            value={courseInfo.tags}
            onChange={(e: any) => setCourseInfo({ ...courseInfo, tags: e.target.value })}
            id="tags"
            placeholder="Python, I.A, Machine Learning, Deep Learning"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Nível do curso</label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.level}
              onChange={(e: any) => setCourseInfo({ ...courseInfo, level: e.target.value })}
              id="level"
              placeholder="Intermediário / Avançado"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>Demo Url</label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) => setCourseInfo({ ...courseInfo, demoUrl: e.target.value })}
              id="demoUrl"
              placeholder="eer74fd"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label htmlFor="file" className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${dragging ? "bg-blue-500" : "bg-transparent"}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
            {
              courseInfo.thumbnail ? (
                <img src={courseInfo.thumbnail} alt="" className="max-h-full w-full object-cover" />
              ) : (
                <span className="text-black dark:text-white cursor-pointer">
                  Arraste e solte sua thumb aqui ou clique para navegar
                </span>
              )
            }
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37A39A] text-center text-[#FFF] rounded mt-8 cursor-pointer"
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  )
}

export default CourseInformation
