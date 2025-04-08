'use client'
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar"
import Heading from "@/app/utils/Heading"
import CreateCourse from "@/app/components/Admin/Course/CreateCourse"
import DashboardHeader from "@/app/components/Admin/DashboardHeader"

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <Heading
        title="PCUSP - Admin"
        description="Plataforma que visa democratizar o ensino da computação de forma gratuita no Brasil"
        keywords="Programação, USP, PCUSP, Pensamento Computacional"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[80%]">
          <DashboardHeader />
          <CreateCourse />
        </div>
      </div>
    </div>
  )
}

export default page
