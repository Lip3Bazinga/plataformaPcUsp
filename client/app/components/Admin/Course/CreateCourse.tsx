"use client"

import { FC, useState } from "react"
import CourseInformation from "./CourseInformation"
import CourseOptions from "./CourseOptions"
import CourseData from "./CourseData"
import CourseContent from "./CourseContent"
import CoursePreview from "./CoursePreview"

type Props = {

}


const CreateCourse = () => {

  const [active, setActive] = useState(0)
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: ""
  })
  const [benefits, setBenefits] = useState([{ title: "" }])
  const [prerequisites, setPrerequisites] = useState([{ title: "" }])
  const [courseContentData, setCourseContentData] = useState([
    {
      title: "",
      description: "",
      videoUrl: "",
      videoSection: "Sessão sem título",
      links: [
        { title: "", url: "" },
      ],
      suggestion: "",
    },
  ])
  const [courseData, setCourseData] = useState({})

  const handleSubmit = async () => {
    const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }))
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({ title: prerequisite.title }))
    const formattedCourseContentData = courseContentData.map((courseContent) => ({
      title: courseContent.title,
      description: courseContent.description,
      videoUrl: courseContent.videoUrl,
      videoSection: courseContent.videoSection,
      links: courseContent.links.map((link) => ({
        title: link.title,
        url: link.url
      })),
      suggestion: courseContent.suggestion
    }))
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseContent: formattedCourseContentData
    }

    setCourseData(data)
  }

  const handleCourseCreate = async (e: any) => {
    const data = courseData
  }


  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {
          active === 0 && (
            <CourseInformation
              courseInfo={courseInfo}
              setCourseInfo={setCourseInfo}
              active={active}
              setActive={setActive}
            />
          )
        }
        {
          active === 1 && (
            <CourseData
              benefits={benefits}
              setBenefits={setBenefits}
              prerequisites={prerequisites}
              setPrerequisites={setPrerequisites}
              active={active}
              setActive={setActive}
            />
          )
        }
        {
          active === 2 && (
            <CourseContent
              active={active}
              setActive={setActive}
              courseContentData={courseContentData}
              setCourseContentData={setCourseContentData}
              handleSubmit={handleSubmit}
            />
          )
        }
        {
          active === 3 && (
            <CoursePreview
              active={active}
              setActive={setActive}
              courseData={courseData}
              handleCourseCreate={handleCourseCreate}
            />
          )
        }
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  )
}

export default CreateCourse