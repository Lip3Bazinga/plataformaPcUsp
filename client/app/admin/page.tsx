"use client"

import React from "react"
import Heading from "../utils/Heading"
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar"
import AdminProtected from "../hooks/adminProtected"
import DashboardHero from "../components/Admin/DashboardHero"

type Props = {

}

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="PCUSP - Admin"
          description="Plataforma que visa democratizar o ensino da computação de forma gratuita no Brasil"
          keywords="Programação, USP, PCUSP, Pensamento Computacional"
        />
        <div className="flex h-[200vh]">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
          </div>
        </div>
      </AdminProtected>
    </div>
  )
}

export default page