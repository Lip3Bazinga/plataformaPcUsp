import { styles } from '@/app/styles/styles'
import { FC, useState } from 'react'
import { AiOutlineDelete, AiOutlinePlayCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { BiSolidPencil } from 'react-icons/bi'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { BsLink45Deg } from "react-icons/bs"
import toast from 'react-hot-toast'

type Props = {
  active: number
  setActive: (active: number) => void
  courseContentData: any
  setCourseContentData: (courseContentData: any) => void
  handleSubmit: any
}

const CourseContent: FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handleCourseSubmit
}) => {

  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  )

  const [activeSection, setActiveSection] = useState(1)

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed]
    updatedCollapsed[index] = !updatedCollapsed[index]
    setIsCollapsed(updatedCollapsed)
  }

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData]
    updatedData[index].links.splice(linkIndex, 1)
    setCourseContentData(updatedData)
  }

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData]
    updatedData[index].links.push({ title: "", url: "" })
    setCourseContentData(updatedData)
  }

  const newContentHandler = (item: any) => {
    if (
      !item.title.trim() ||
      !item.description.trim() ||
      !item.videoUrl.trim() ||
      !item.links.length ||  // Verifica se há pelo menos um link
      !item.links[0].title.trim() ||
      !item.links[0].url.trim()
    ) {
      console.log(item.title, item.description, item.videoUrl, item.links)
      toast.error("Por favor, preencha todos os campos primeiro!")
      return
    }
    else {
      let newVideoSection = ""

      if (courseContentData.length > 0) {
        const lastVideoSection = courseContentData[courseContentData.length - 1].videoSection
        if (lastVideoSection) {
          newVideoSection = lastVideoSection
        }
      }

      const newContent = {
        title: "",
        description: "",
        videoUrl: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }]
      }

      setCourseContentData([...courseContentData, newContent])

    }
  }

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) toast.error("Por favor, preencha todos os campos primeiro!")
    else {
      setActiveSection(activeSection + 1)
      const newContent = {
        title: "",
        description: "",
        videoUrl: "",
        videoSection: `Sessão sem título ${activeSection}`,
        links: [{ title: "", url: "" }]
      }

      setCourseContentData([...courseContentData, newContent])
    }
  }

  const prevButton = () => {
    setActive(active - 1)
  }

  const handleOptions = () => {
    if (courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) toast.error("Por favor, preencha todos os campos primeiro!")
    else {
      setActive(active + 1)
      handleCourseSubmit()
    }
  }

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        {
          courseContentData?.map((item: any, index: number) => {
            const showSectionInput = index === 0 || item.videoSection !== courseContentData[index - 1].videoSection
            return (
              <>
                <div className={`w-full bg-[#CDC8C817] p-4 ${showSectionInput ? "mt-10" : "mb-0"}`}>

                  {
                    showSectionInput && (
                      <>
                        <div className="flex w-full items-center">
                          <input type="text" className={`text-[20px] ${item.videoSection === "Seção sem título" ? "w-[180px]" : "w-min"} font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                            value={item.videoSection}
                            onChange={(e) => {
                              const updatedData = [...courseContentData]
                              updatedData[index].videoSection = e.target.value
                              setCourseContentData(updatedData)
                            }}
                          />
                          <BiSolidPencil className="cursor-pointer dark:text-white text-black" />
                        </div>
                        <br />
                      </>
                    )
                  }
                  <div className="flex w-full items-center justify-between my-0">
                    {
                      isCollapsed[index] ? (
                        <>
                          {
                            item.title ? (
                              <p className="font-Poppins dark:text-white text-black">
                                {index + 1}. {item.title}
                              </p>
                            ) : (
                              <></>
                            )
                          }
                        </>
                      ) : (
                        <div></div>
                      )
                    }
                    {/* Arrow to collapsed content video */}
                    <div className="flex items-center">
                      <AiOutlineDelete className={`dark:text-white text-[20px] mr-2 text-black ${index > 0 ? "cursor-pointer" : "cursor-no-drop"}`}
                        onClick={() => {
                          if (index > 0) {
                            const updateData = [...courseContentData]
                            updateData.splice(index, 1)
                            setCourseContentData(updateData)
                          }
                        }}
                      />
                      <MdOutlineKeyboardArrowDown
                        fontSize="large"
                        className="dark:text-white text-black cursor-pointer"
                        style={{ transform: isCollapsed[index] ? "rotate(180deg)" : "rotate(0deg)", cursor: "pointer" }}
                        onClick={() => handleCollapseToggle(index)}
                      />
                    </div>
                  </div>
                  {
                    !isCollapsed[index] && (
                      <>
                        <div className="my-3">
                          <label className={styles.label}>Video Title</label>
                          <input
                            type="text"
                            placeholder="Plano de projeto..."
                            className={`${styles.input}`}
                            value={item.title}
                            onChange={(e) => {
                              const updatedData = [...courseContentData]
                              updatedData[index].title = e.target.value
                              setCourseContentData(updatedData)
                            }}
                          />
                        </div>

                        <div className="my-3">
                          <label className={styles.label}>Url do vídeo</label>
                          <input
                            type="text"
                            placeholder="sdder"
                            className={`${styles.input}`}
                            value={item.videoUrl}
                            onChange={(e) => {
                              const updatedData = [...courseContentData]
                              updatedData[index].videoUrl = e.target.value
                              setCourseContentData(updatedData)
                            }}
                          />
                        </div>

                        <div className="my-3">
                          <label className={styles.label}>Descrição do vídeo</label>
                          <textarea
                            rows={8}
                            cols={30}
                            placeholder="O curso tem como objetivo estruturar os conceitos de..."
                            className={`${styles.input} !h-min py-2`}
                            value={item.description}
                            onChange={(e) => {
                              const updatedData = [...courseContentData]
                              updatedData[index].description = e.target.value
                              setCourseContentData(updatedData)
                            }}
                          />
                          <br />
                        </div>

                        {
                          item?.links.map((link: any, linkIndex: number) => (
                            <div className="mb-3 block">
                              <div className="w-full flex items-center justify-between">
                                <label className={styles.label}>
                                  Link {linkIndex + 1}
                                </label>
                                <AiOutlineDelete
                                  className={`${linkIndex === 0
                                    ? "cursor-no-drop"
                                    : "cursor-pointer"
                                    } text-black dark:text-white text-[20px]`}
                                  onClick={() =>
                                    linkIndex === 0
                                      ? null
                                      : handleRemoveLink(index, linkIndex)
                                  }
                                />
                              </div>
                              <input type="text" placeholder="Código fonte... (Título do Link)"
                                className={`${styles.input}`}
                                value={link.title}
                                onChange={(e) => {
                                  const updatedData = [...courseContentData]
                                  updatedData[index].links[linkIndex].title = e.target.value
                                  setCourseContentData(updatedData)
                                }}
                              />
                              <input type="text" placeholder="https://github.com/lip3Bazinga/"
                                className={`${styles.input}`}
                                value={link.url}
                                onChange={(e) => {
                                  const updatedData = [...courseContentData]
                                  updatedData[index].links[linkIndex].url = e.target.value
                                  setCourseContentData(updatedData)
                                }}
                              />
                            </div>
                          ))
                        }
                        <br />
                        <div className="inline-block mb-4">
                          <p className="flex items-center text-[18px] gap-1 dark:text-white text-black cursor-pointer bg-[#3B82F6] p-2 rounded-lg" onClick={() => handleAddLink(index)}>
                            <BsLink45Deg className="" /> Adicionar Link
                          </p>
                        </div>
                      </>
                    )
                  }
                  <br />
                  {/* Add new Content */}
                  {
                    index === courseContentData.length - 1 && (
                      <div>
                        <p
                          className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                          onClick={(e: any) => newContentHandler(item)}
                        >
                          <AiOutlinePlusCircle className="mr-2" /> Adicionar novo conteúdo
                        </p>
                      </div>
                    )
                  }
                </div>
              </>
            )
          })
        }
        <br />
        <div className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" />
          Adicionar nova sessão
        </div>
      </form>
      <br />
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

export default CourseContent
