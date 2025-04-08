import { styles } from '@/app/styles/styles'
import { FC, useState } from 'react'
import toast from 'react-hot-toast'
import { IoAddCircle } from 'react-icons/io5'

type Props = {
  benefits: { title: string }[]
  setBenefits: (benefits: { title: string }[]) => void
  prerequisites: { title: string }[]
  setPrerequisites: (prerequisites: { title: string }[]) => void
  active: number
  setActive: (active: number) => void
}

const CourseData: FC<Props> = ({ benefits, setBenefits, prerequisites, setPrerequisites, active, setActive }) => {

  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits]
    updatedBenefits[index].title = value
    setBenefits(updatedBenefits)
  }

  const handlePrerequisitesChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites]
    updatedPrerequisites[index].title = value
    setPrerequisites(updatedPrerequisites)
  }

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }])
  }

  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, { title: "" }])
  }

  const prevButton = () => {
    setActive(active - 1)
  }

  const handleOptions = () => {
    if (benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length - 1]?.title !== "") setActive(active + 1)
    else toast.error("Por favor preencha todos os campos")
  }

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          Quais são os benefícios do aluno que assistir a este curso?
        </label>
        <br />
        {
          benefits.map((benefit: any, index: number) => (
            <input
              type="text"
              key={index}
              name="Benefit"
              placeholder="Você será capaz de construir o JARVIS"
              required
              className={`${styles.input} my-2`}
              value={benefit.title}
              onChange={(e) => handleBenefitChange(index, e.target.value)}
            />
          ))
        }
        <IoAddCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenefit}
        />
      </div>
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          Quais são os pré-requisitos para que o aluno possa acompanhar o curso?
        </label>
        <br />
        {
          prerequisites.map((prerequisites: any, index: number) => (
            <input
              type="text"
              key={index}
              name="Prerequisites"
              placeholder="Python intermediário"
              required
              className={`${styles.input} my-2`}
              value={prerequisites.title}
              onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
            />
          ))
        }
        <IoAddCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequisite}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37A39A] text-center text-[#FFF] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Voltar
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37A39A] text-center text-[#FFF] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Próximo
        </div>
      </div >

    </div >
  )
}

export default CourseData
